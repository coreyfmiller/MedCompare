"use client"

import { useState, useMemo } from "react"
import { PreferenceTuner } from "@/components/preference-tuner"
import { MedicationCard } from "@/components/medication-card"
import { ComparisonTable } from "@/components/comparison-table"
import { MedicationDetailModal } from "@/components/medication-detail-modal"
import { DisclaimerGate } from "@/components/disclaimer-gate"
import { medications, Medication, Concern } from "@/lib/medications-data"
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
      // No ranking — show alphabetically, no scores
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-36 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="MedCompare"
              className="h-32 w-auto object-contain"
            />
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="hidden sm:flex items-center gap-1.5 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {medications.length} Medications
            </Badge>
            {/* Mobile sidebar trigger */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] p-0">
                <div className="p-4 pt-12">
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[320px] shrink-0">
            <div className="sticky top-[160px]">
              <PreferenceTuner
                selectedConcerns={selectedConcerns}
                onConcernsChange={setSelectedConcerns}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1 space-y-6">
            {/* Top Recommendations */}
            {selectedConcerns.length > 0 && topMatches.length > 0 && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h2 className="font-medium text-sm">
                    Top Matches for Your Priorities
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {topMatches.slice(0, 4).map(({ medication, matchScore }) => (
                    <Button
                      key={medication.id}
                      variant="secondary"
                      size="sm"
                      className="h-auto py-1.5"
                      onClick={() => handleViewDetails(medication)}
                    >
                      <span className="font-medium">{medication.name}</span>
                      <Badge
                        variant="outline"
                        className="ml-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      >
                        {matchScore}%
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state when no concerns selected */}
            {selectedConcerns.length === 0 && (
              <div className="rounded-xl border border-border/50 bg-muted/30 p-6 text-center">
                <CircleDotIcon className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm font-medium">Select your priorities to get personalized rankings</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Pick up to 5 concerns from the sidebar and medications will re-rank based on what matters to you
                </p>
              </div>
            )}

            {/* View Toggle */}
            <Tabs defaultValue="cards" className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Medication Comparison</h2>
                  <p className="text-sm text-muted-foreground">
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
            <div className="rounded-xl border border-border/50 bg-card/50 p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Understanding the Comparison</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  SSRIs primarily affect serotonin and generally have fewer effects on
                  adrenaline/norepinephrine. SNRIs increase both serotonin and norepinephrine,
                  which may cause more autonomic effects. Select your top concerns to see which
                  medications best match your priorities.
                </p>
              </div>
            </div>
          </main>
        </div>
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

function CircleDotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  )
}
