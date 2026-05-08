"use client"

import { useState, useMemo } from "react"
import { PreferenceTuner } from "@/components/preference-tuner"
import { MedicationCard } from "@/components/medication-card"
import { ComparisonTable } from "@/components/comparison-table"
import { MedicationDetailModal } from "@/components/medication-detail-modal"
import { DisclaimerGate } from "@/components/disclaimer-gate"
import { medications, Medication, Concern, concerns } from "@/lib/medications-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutGrid,
  Table as TableIcon,
  Info,
  Sparkles,
  Menu,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export default function MedicationDashboard() {
  const [selectedConcerns, setSelectedConcerns] = useState<Concern[]>([])
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const calculateMatchScore = (medication: Medication, activeConcerns: Concern[]): number => {
    if (activeConcerns.length === 0) {
      const allScores = Object.values(medication.scores)
      return Math.round(allScores.reduce((sum, s) => sum + s, 0) / allScores.length)
    }
    const total = activeConcerns.reduce((sum, concern) => sum + medication.scores[concern], 0)
    return Math.round(total / activeConcerns.length)
  }

  const rankedMedications = useMemo(() => {
    if (selectedConcerns.length === 0) {
      return medications
        .map((medication) => ({
          medication,
          matchScore: null as number | null,
        }))
        .sort((a, b) => a.medication.name.localeCompare(b.medication.name))
    }
    return medications
      .map((medication) => ({
        medication,
        matchScore: calculateMatchScore(medication, selectedConcerns),
      }))
      .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
  }, [selectedConcerns])

  const handleViewDetails = (medication: Medication) => {
    setSelectedMedication(medication)
    setIsDetailOpen(true)
  }

  const selectedMatchScore = selectedMedication && selectedConcerns.length > 0
    ? calculateMatchScore(selectedMedication, selectedConcerns)
    : null

  const topMatches = rankedMedications.filter((m) => m.matchScore !== null && m.matchScore >= 75)

  return (
    <DisclaimerGate>
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Header — compact */}
      <header className="shrink-0 border-b border-slate-200 bg-white z-50">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6">
          <Link href="/">
            <img
              src="/logo.png"
              alt="MedCompare"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="hidden sm:flex items-center gap-1.5 font-medium text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {medications.length} Medications
            </Badge>
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden h-8 w-8">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] p-0">
                <div className="p-4 pt-12 h-full overflow-y-auto">
                  <PreferenceTuner
                    selectedConcerns={selectedConcerns}
                    onConcernsChange={setSelectedConcerns}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Body — fills remaining height */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar — scrolls independently */}
        <aside className="hidden lg:flex w-[300px] shrink-0 border-r border-slate-100 flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <PreferenceTuner
              selectedConcerns={selectedConcerns}
              onConcernsChange={setSelectedConcerns}
            />
          </div>
        </aside>

        {/* Main Content — scrolls independently */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-6 space-y-6">
            {/* Top Recommendations */}
            {selectedConcerns.length > 0 && topMatches.length > 0 && (
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <h2 className="font-medium text-sm text-slate-900">
                    Top Matches for Your Priorities
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {topMatches.slice(0, 4).map(({ medication, matchScore }) => (
                    <Button
                      key={medication.id}
                      variant="secondary"
                      size="sm"
                      className="h-auto py-1.5 bg-white border border-slate-200 hover:bg-slate-50"
                      onClick={() => handleViewDetails(medication)}
                    >
                      <span className="font-medium text-slate-700">{medication.name}</span>
                      <Badge
                        variant="outline"
                        className="ml-2 bg-emerald-50 text-emerald-600 border-emerald-200"
                      >
                        {matchScore}%
                      </Badge>
                    </Button>
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
                  Pick up to 5 concerns from the sidebar and medications will re-rank based on what matters to you
                </p>
              </div>
            )}

            {/* Active Priorities Strip */}
            {selectedConcerns.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Your priorities:</span>
                {selectedConcerns.map((concernId) => {
                  const info = concerns.find((c) => c.id === concernId)
                  return (
                    <span
                      key={concernId}
                      className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-1 text-xs font-medium text-indigo-700"
                    >
                      {info?.label}
                    </span>
                  )
                })}
              </div>
            )}

            {/* View Toggle */}
            <Tabs defaultValue="cards" className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Medication Comparison</h2>
                  <p className="text-sm text-slate-500">
                    {selectedConcerns.length > 0
                      ? "Ranked by your selected priorities"
                      : "Select priorities to see personalized rankings"}
                  </p>
                </div>
                <TabsList className="grid w-full sm:w-auto grid-cols-2">
                  <TabsTrigger value="cards" className="gap-2">
                    <LayoutGrid className="h-4 w-4" />
                    <span className="hidden sm:inline">Cards</span>
                  </TabsTrigger>
                  <TabsTrigger value="table" className="gap-2">
                    <TableIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Table</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="cards" className="mt-0">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {rankedMedications.map(({ medication, matchScore }) => (
                    <MedicationCard
                      key={medication.id}
                      medication={medication}
                      matchScore={matchScore}
                      selectedConcerns={selectedConcerns}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="table" className="mt-0">
                <ComparisonTable
                  medications={rankedMedications}
                  onViewDetails={handleViewDetails}
                />
              </TabsContent>
            </Tabs>

            {/* Info Banner */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3">
              <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed">
                SSRIs primarily affect serotonin with fewer effects on adrenaline. SNRIs increase both
                serotonin and norepinephrine. NDRIs target dopamine and norepinephrine. NaSSAs work through
                adrenergic and serotonin receptor antagonism. Select your top concerns to see which
                medications best match your priorities.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      <MedicationDetailModal
        medication={selectedMedication}
        matchScore={selectedMatchScore}
        selectedConcerns={selectedConcerns}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
    </DisclaimerGate>
  )
}
