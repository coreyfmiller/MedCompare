"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DisclaimerGate } from "@/components/disclaimer-gate"
import {
  neuroMedications,
  neuroConcerns,
  NeuroMedication,
  NeuroConcern,
  NeuroConcernInfo,
} from "@/lib/neuro-data"
import {
  LayoutGrid,
  Table as TableIcon,
  Info,
  Sparkles,
  Menu,
  Clock,
  Pill,
  CheckCircle2,
  CircleDot,
  RotateCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const MAX_SELECTIONS = 5

const classColors: Record<string, { border: string; text: string; icon: string; badge: string }> = {
  Anticonvulsant: { border: "hover:border-indigo-400/40", text: "text-indigo-600", icon: "bg-indigo-500/10", badge: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" },
  "Beta-Blocker": { border: "hover:border-amber-400/40", text: "text-amber-600", icon: "bg-amber-500/10", badge: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  TCA: { border: "hover:border-rose-400/40", text: "text-rose-600", icon: "bg-rose-500/10", badge: "bg-rose-500/10 text-rose-600 border-rose-500/20" },
  "CGRP Inhibitor": { border: "hover:border-emerald-400/40", text: "text-emerald-600", icon: "bg-emerald-500/10", badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  "Calcium Channel Blocker": { border: "hover:border-violet-400/40", text: "text-violet-600", icon: "bg-violet-500/10", badge: "bg-violet-500/10 text-violet-600 border-violet-500/20" },
}

export default function NeuroDashboard() {
  const [selectedConcerns, setSelectedConcerns] = useState<NeuroConcern[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const calculateMatchScore = (med: NeuroMedication, active: NeuroConcern[]): number => {
    if (active.length === 0) return 0
    const total = active.reduce((sum, c) => sum + med.scores[c], 0)
    return Math.round(total / active.length)
  }

  const rankedMedications = useMemo(() => {
    if (selectedConcerns.length === 0) {
      return neuroMedications
        .map((m) => ({ medication: m, matchScore: null as number | null }))
        .sort((a, b) => a.medication.name.localeCompare(b.medication.name))
    }
    return neuroMedications
      .map((m) => ({ medication: m, matchScore: calculateMatchScore(m, selectedConcerns) }))
      .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
  }, [selectedConcerns])

  const topMatches = rankedMedications.filter((m) => m.matchScore !== null && m.matchScore >= 75)

  const handleToggle = (id: NeuroConcern) => {
    if (selectedConcerns.includes(id)) {
      setSelectedConcerns(selectedConcerns.filter((c) => c !== id))
    } else if (selectedConcerns.length < MAX_SELECTIONS) {
      setSelectedConcerns([...selectedConcerns, id])
    }
  }

  const grouped = neuroConcerns.reduce<Record<string, NeuroConcernInfo[]>>((acc, c) => {
    if (!acc[c.category]) acc[c.category] = []
    acc[c.category].push(c)
    return acc
  }, {})

  const remaining = MAX_SELECTIONS - selectedConcerns.length

  const getMatchColor = (score: number) => {
    if (score >= 75) return "bg-emerald-50 text-emerald-600 border-emerald-200"
    if (score >= 55) return "bg-amber-50 text-amber-600 border-amber-200"
    return "bg-slate-50 text-slate-600 border-slate-200"
  }

  const getBarColor = (score: number) => {
    if (score >= 75) return "bg-emerald-500"
    if (score >= 55) return "bg-amber-500"
    return "bg-slate-400"
  }

  return (
    <DisclaimerGate>
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Header */}
      <header className="shrink-0 border-b border-slate-200 bg-white z-50">
        <div className="mx-auto flex h-36 max-w-[1600px] items-center justify-between px-4 sm:px-6">
          <Link href="/">
            <img src="/logo.png" alt="MedCompare" className="h-[120px] w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="hidden sm:flex items-center gap-1.5 font-medium text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {neuroMedications.length} Medications
            </Badge>
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden h-8 w-8">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] p-0">
                <div className="p-4 pt-12 h-full overflow-y-auto">
                  <SidebarContent
                    selectedConcerns={selectedConcerns}
                    grouped={grouped}
                    remaining={remaining}
                    onToggle={handleToggle}
                    onReset={() => setSelectedConcerns([])}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-[380px] shrink-0 border-r border-slate-100 flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <SidebarContent
              selectedConcerns={selectedConcerns}
              grouped={grouped}
              remaining={remaining}
              onToggle={handleToggle}
              onReset={() => setSelectedConcerns([])}
            />
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-6 space-y-6">
            {/* Top Matches */}
            {selectedConcerns.length > 0 && topMatches.length > 0 && (
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <h2 className="font-medium text-sm text-slate-900">Top Matches</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {topMatches.slice(0, 4).map(({ medication, matchScore }) => (
                    <span key={medication.id} className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-sm">
                      <span className="font-medium text-slate-700">{medication.name}</span>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 text-xs">
                        {matchScore}%
                      </Badge>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {selectedConcerns.length === 0 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
                <div className="mx-auto h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <Sparkles className="h-5 w-5 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-700">Select your priorities to get personalized rankings</p>
                <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto">
                  Pick up to 5 concerns from the sidebar — seizure control, cognitive clarity, pregnancy safety, and more
                </p>
              </div>
            )}

            {/* Priority strip */}
            {selectedConcerns.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Your priorities:</span>
                {selectedConcerns.map((id) => {
                  const info = neuroConcerns.find((c) => c.id === id)
                  return (
                    <span key={id} className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-1 text-xs font-medium text-indigo-700">
                      {info?.label}
                    </span>
                  )
                })}
              </div>
            )}

            {/* Cards */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Seizure & Migraine Medications</h2>
                  <p className="text-sm text-slate-500">
                    {selectedConcerns.length > 0 ? "Ranked by your selected priorities" : "Select priorities to see personalized rankings"}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {rankedMedications.map(({ medication, matchScore }) => {
                  const colors = classColors[medication.class] ?? classColors.Anticonvulsant
                  const barData = selectedConcerns.length > 0
                    ? selectedConcerns.map((cId) => ({
                        label: neuroConcerns.find((c) => c.id === cId)?.label ?? cId,
                        value: medication.scores[cId],
                      }))
                    : null

                  return (
                    <Card key={medication.id} className={cn("group relative overflow-hidden border-slate-200 bg-white transition-all hover:shadow-lg", colors.border)}>
                      {matchScore !== null && (
                        <div className="absolute right-3 top-3">
                          <Badge variant="outline" className={`text-xs font-semibold tabular-nums ${getMatchColor(matchScore)}`}>
                            {matchScore}%
                          </Badge>
                        </div>
                      )}
                      <CardHeader className="pb-2">
                        <div className="flex items-start gap-3">
                          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", colors.icon)}>
                            <Pill className={cn("h-5 w-5", colors.text)} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-lg leading-tight">{medication.name}</CardTitle>
                            <p className="text-sm text-slate-500">{medication.brand}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-3 text-xs">
                          <Badge variant="outline" className={cn("font-medium", colors.badge)}>
                            {medication.class}
                          </Badge>
                          <div className="flex items-center gap-1 text-slate-500">
                            <Clock className="h-3 w-3" />
                            <span>{medication.halfLife}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">{medication.doseRange}</p>

                        {barData ? (
                          <div className="space-y-2 py-1">
                            {barData.map(({ label, value }) => (
                              <div key={label} className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] text-slate-500 truncate max-w-[70%]">{label}</span>
                                  <span className={cn("text-[11px] font-semibold tabular-nums", getBarColor(value).replace("bg-", "text-"))}>{value}</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-slate-100">
                                  <div className={cn("h-full rounded-full transition-all", getBarColor(value))} style={{ width: `${value}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="line-clamp-3 text-xs text-slate-500 leading-relaxed py-2">
                            {medication.clinicalNotes}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-1 pt-1">
                          {medication.fdaIndications.slice(0, 2).map((ind) => (
                            <span key={ind} className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5">
                              {ind.length > 30 ? ind.slice(0, 28) + "…" : ind}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Info */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3">
              <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed">
                Anticonvulsants work through various mechanisms including sodium channel blockade, GABA enhancement, and calcium channel modulation.
                CGRP inhibitors are targeted migraine preventives with minimal systemic effects. Beta-blockers and calcium channel blockers are
                cardiovascular drugs repurposed for headache prevention. Select your priorities to find the best match.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
    </DisclaimerGate>
  )
}

function SidebarContent({
  selectedConcerns,
  grouped,
  remaining,
  onToggle,
  onReset,
}: {
  selectedConcerns: NeuroConcern[]
  grouped: Record<string, NeuroConcernInfo[]>
  remaining: number
  onToggle: (id: NeuroConcern) => void
  onReset: () => void
}) {
  return (
    <Card className="border-slate-200 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
              <CircleDot className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-base">Your Priorities</CardTitle>
              <p className="text-xs text-slate-500">Pick up to 5 concerns</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onReset} className="h-8 px-2 text-slate-400 hover:text-slate-700" disabled={selectedConcerns.length === 0}>
            <RotateCcw className="mr-1 h-3 w-3" />
            Reset
          </Button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex gap-1">
            {Array.from({ length: MAX_SELECTIONS }).map((_, i) => (
              <div key={i} className={cn("h-2 w-2 rounded-full transition-colors", i < selectedConcerns.length ? "bg-indigo-500" : "bg-slate-200")} />
            ))}
          </div>
          <span className="text-xs text-slate-400">
            {selectedConcerns.length} of {MAX_SELECTIONS} selected
            {remaining > 0 && selectedConcerns.length > 0 && ` · ${remaining} remaining`}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">{category}</h4>
            <div className="flex flex-wrap gap-1.5">
              {items.map((concern) => {
                const isSelected = selectedConcerns.includes(concern.id)
                const isDisabled = !isSelected && selectedConcerns.length >= MAX_SELECTIONS
                return (
                  <button
                    key={concern.id}
                    onClick={() => onToggle(concern.id)}
                    disabled={isDisabled}
                    title={concern.description}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all border",
                      isSelected
                        ? "border-indigo-300 bg-indigo-50 text-indigo-700 shadow-sm"
                        : "border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:text-slate-700",
                      isDisabled && "opacity-40 cursor-not-allowed hover:border-slate-200 hover:text-slate-500"
                    )}
                  >
                    {isSelected && <CheckCircle2 className="h-3 w-3" />}
                    {concern.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
