"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Medication, Concern, concerns } from "@/lib/medications-data"
import { ChartContainer } from "@/components/ui/chart"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import {
  Pill,
  Clock,
  AlertTriangle,
  FileText,
  Activity,
  CheckCircle2,
} from "lucide-react"

interface MedicationDetailModalProps {
  medication: Medication | null
  matchScore: number | null
  selectedConcerns: Concern[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MedicationDetailModal({
  medication,
  matchScore,
  selectedConcerns,
  open,
  onOpenChange,
}: MedicationDetailModalProps) {
  if (!medication) return null

  // Build radar data from selected concerns or default set
  const radarData =
    selectedConcerns.length >= 3
      ? selectedConcerns.map((concernId) => {
          const info = concerns.find((c) => c.id === concernId)
          return {
            subject: info?.label ?? concernId,
            value: medication.scores[concernId],
            fullMark: 100,
          }
        })
      : [
          { subject: "Autonomic Stability", value: medication.scores.autonomicStability, fullMark: 100 },
          { subject: "Sexual Health", value: medication.scores.libido, fullMark: 100 },
          { subject: "Weight Neutrality", value: medication.scores.weightNeutrality, fullMark: 100 },
          { subject: "Mental Clarity", value: medication.scores.mentalClarity, fullMark: 100 },
          { subject: "Anxiety Reduction", value: medication.scores.anxietyReduction, fullMark: 100 },
        ]

  // Force remount when selections change
  const chartKey = selectedConcerns.length >= 3
    ? selectedConcerns.join("-")
    : "default-modal"

  const chartConfig = {
    value: {
      label: "Score",
      color: "hsl(var(--primary))",
    },
  }

  const getMatchColor = (score: number) => {
    if (score >= 75) return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
    if (score >= 55) return "bg-amber-500/10 text-amber-600 border-amber-500/20"
    return "bg-slate-500/10 text-slate-600 border-slate-500/20"
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-emerald-600"
    if (score >= 50) return "text-amber-600"
    return "text-red-500"
  }

  // Show scores for selected concerns, or a default set
  const displayConcerns: { id: Concern; label: string }[] =
    selectedConcerns.length > 0
      ? selectedConcerns.map((id) => ({
          id,
          label: concerns.find((c) => c.id === id)?.label ?? id,
        }))
      : [
          { id: "autonomicStability" as Concern, label: "Autonomic Stability" },
          { id: "libido" as Concern, label: "Libido Preservation" },
          { id: "weightNeutrality" as Concern, label: "Weight Neutrality" },
          { id: "mentalClarity" as Concern, label: "Mental Clarity" },
          { id: "anxietyReduction" as Concern, label: "Anxiety Reduction" },
        ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Pill className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">{medication.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-1">
                  <span>{medication.brand}</span>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="text-muted-foreground">{medication.genericName}</span>
                </DialogDescription>
              </div>
            </div>
            {matchScore !== null && (
              <Badge
                variant="outline"
                className={`text-sm font-semibold tabular-nums px-3 py-1 ${getMatchColor(matchScore)}`}
              >
                {matchScore}% Match
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="grid gap-6 mt-2">
          {/* Quick Info */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant={medication.class === "SSRI" ? "default" : "secondary"}
              className="font-medium"
            >
              {medication.class}
            </Badge>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Half-life: {medication.halfLife}</span>
            </div>
          </div>

          {/* Dosing Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">Dose Range</p>
              <p className="text-sm font-medium">{medication.doseRange}</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">Time to Effect</p>
              <p className="text-sm font-medium">{medication.timeToEffect}</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-muted/30 p-3 sm:col-span-2">
              <p className="text-xs font-medium text-muted-foreground mb-1">Available Doses</p>
              <p className="text-sm">{medication.availableDoses}</p>
            </div>
          </div>

          {/* Primary Action */}
          <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm">Primary Receptor Action</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {medication.primaryReceptorAction}
            </p>
          </div>

          <Separator />

          {/* Radar Chart & Scores */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-sm mb-4">
                {selectedConcerns.length > 0 ? "Your Priority Profile" : "Profile Overview"}
              </h4>
              <div className="h-[200px]" key={chartKey}>
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{
                        fill: "hsl(var(--muted-foreground))",
                        fontSize: 10,
                      }}
                      tickLine={false}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Profile"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.25}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ChartContainer>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-sm flex items-center gap-2">
                {selectedConcerns.length > 0 && <CheckCircle2 className="h-4 w-4 text-primary" />}
                {selectedConcerns.length > 0 ? "Scores for Your Priorities" : "Key Scores"}
              </h4>
              {displayConcerns.map(({ id, label }) => (
                <div key={id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span
                      className={`font-semibold tabular-nums ${getScoreColor(medication.scores[id])}`}
                    >
                      {medication.scores[id]}%
                    </span>
                  </div>
                  <Progress value={medication.scores[id]} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Side Effects */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h4 className="font-medium text-sm">Common Side Effects</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {medication.sideEffects.map((effect) => (
                <Badge key={effect} variant="outline" className="bg-muted/30">
                  {effect}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Clinical Notes */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm">Clinical Notes</h4>
            </div>
            <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {medication.clinicalNotes}
              </p>
            </div>
          </div>

          <Separator />

          {/* FDA Indications */}
          <div>
            <h4 className="font-medium text-sm mb-3">FDA-Approved Indications</h4>
            <div className="flex flex-wrap gap-2">
              {medication.fdaIndications.map((indication) => (
                <Badge key={indication} variant="secondary" className="font-normal">
                  {indication}
                </Badge>
              ))}
            </div>
          </div>

          {/* Pregnancy Risk */}
          <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Pregnancy Risk</p>
            <p className="text-sm">{medication.pregnancyRisk}</p>
          </div>

          {/* Disclaimer */}
          <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-4">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Disclaimer:</strong> This information is for educational purposes only and
              should not be considered medical advice. Always consult with a qualified healthcare
              provider before starting, stopping, or changing any medication.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
