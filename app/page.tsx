"use client"

import { useState, useMemo } from "react"
import { PreferenceTuner } from "@/components/preference-tuner"
import { MedicationCard } from "@/components/medication-card"
import { ComparisonTable } from "@/components/comparison-table"
import { MedicationDetailModal } from "@/components/medication-detail-modal"
import { medications, Medication, Priority } from "@/lib/medications-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Pill, 
  LayoutGrid, 
  Table as TableIcon, 
  Info,
  Sparkles,
  Menu,
  X
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MedicationDashboard() {
  const [weights, setWeights] = useState<Record<Priority, number>>({
    autonomicStability: 50,
    sexualHealth: 50,
    adrenalineSensitivity: 50,
    metabolicNeutrality: 50,
  })

  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const calculateMatchScore = (medication: Medication): number => {
    const totalWeight = 
      weights.autonomicStability + 
      weights.sexualHealth + 
      weights.adrenalineSensitivity + 
      weights.metabolicNeutrality

    if (totalWeight === 0) return 50

    const weightedSum =
      (medication.scores.autonomicStability * weights.autonomicStability) +
      (medication.scores.sexualHealth * weights.sexualHealth) +
      (medication.scores.adrenalineSensitivity * weights.adrenalineSensitivity) +
      (medication.scores.metabolicNeutrality * weights.metabolicNeutrality)

    return Math.round(weightedSum / totalWeight)
  }

  const rankedMedications = useMemo(() => {
    return medications
      .map((medication) => ({
        medication,
        matchScore: calculateMatchScore(medication),
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
  }, [weights])

  const handleViewDetails = (medication: Medication) => {
    setSelectedMedication(medication)
    setIsDetailOpen(true)
  }

  const selectedMatchScore = selectedMedication 
    ? calculateMatchScore(selectedMedication) 
    : 0

  const topMatches = rankedMedications.filter(m => m.matchScore >= 75)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Pill className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">MedCompare</h1>
              <p className="hidden sm:block text-xs text-muted-foreground">SSRI & SNRI Comparison</p>
            </div>
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
                <div className="p-4">
                  <PreferenceTuner weights={weights} onWeightsChange={setWeights} />
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
            <div className="sticky top-[88px]">
              <PreferenceTuner weights={weights} onWeightsChange={setWeights} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1 space-y-6">
            {/* Top Recommendations */}
            {topMatches.length > 0 && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h2 className="font-medium text-sm">Top Recommendations Based on Your Priorities</h2>
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
                      <Badge variant="outline" className="ml-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                        {matchScore}%
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* View Toggle */}
            <Tabs defaultValue="cards" className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Medication Comparison</h2>
                  <p className="text-sm text-muted-foreground">
                    Ranked by your personalized preferences
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
                  SSRIs primarily affect serotonin and generally have fewer effects on adrenaline/norepinephrine. 
                  SNRIs increase both serotonin and norepinephrine, which may cause more autonomic effects. 
                  Adjust the sliders to prioritize what matters most to you.
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
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  )
}
