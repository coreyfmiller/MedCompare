"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Medication, Concern, concerns } from "@/lib/medications-data"
import { Info, Clock, Pill } from "lucide-react"
import { cn } from "@/lib/utils"

interface MedicationCardProps {
  medication: Medication
  matchScore: number | null
  selectedConcerns: Concern[]
  onViewDetails: (medication: Medication) => void
}

const classColors: Record<string, { bg: string; border: string; text: string; icon: string; badge: string }> = {
  SSRI: {
    bg: "bg-indigo-500/8",
    border: "hover:border-indigo-400/40",
    text: "text-indigo-600 dark:text-indigo-400",
    icon: "bg-indigo-500/10",
    badge: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  },
  SNRI: {
    bg: "bg-amber-500/8",
    border: "hover:border-amber-400/40",
    text: "text-amber-600 dark:text-amber-400",
    icon: "bg-amber-500/10",
    badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  NDRI: {
    bg: "bg-emerald-500/8",
    border: "hover:border-emerald-400/40",
    text: "text-emerald-600 dark:text-emerald-400",
    icon: "bg-emerald-500/10",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  NaSSA: {
    bg: "bg-violet-500/8",
    border: "hover:border-violet-400/40",
    text: "text-violet-600 dark:text-violet-400",
    icon: "bg-violet-500/10",
    badge: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  },
}

export function MedicationCard({
  medication,
  matchScore,
  selectedConcerns,
  onViewDetails,
}: MedicationCardProps) {
  const colors = classColors[medication.class] ?? classColors.SSRI

  const getMatchColor = (score: number) => {
    if (score >= 75) return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
    if (score >= 55) return "bg-amber-500/10 text-amber-600 border-amber-500/20"
    return "bg-slate-500/10 text-slate-600 border-slate-500/20"
  }

  const getBarColor = (score: number) => {
    if (score >= 75) return "bg-emerald-500"
    if (score >= 55) return "bg-amber-500"
    return "bg-slate-400"
  }

  // Build bar data from selected concerns
  const barData = selectedConcerns.length > 0
    ? selectedConcerns.map((concernId) => {
        const info = concerns.find((c) => c.id === concernId)
        return {
          label: info?.label ?? concernId,
          value: medication.scores[concernId],
        }
      })
    : null

  return (
    <Card className={cn(
      "group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:shadow-lg",
      colors.border
    )}>
      {matchScore !== null && (
        <div className="absolute right-3 top-3">
          <Badge
            variant="outline"
            className={`text-xs font-semibold tabular-nums ${getMatchColor(matchScore)}`}
          >
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
            <p className="text-sm text-muted-foreground">{medication.brand}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 text-xs">
          <Badge variant="outline" className={cn("font-medium", colors.badge)}>
            {medication.class}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{medication.halfLife}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{medication.doseRange}</p>

        {/* Mini bar chart for selected concerns */}
        {barData ? (
          <div className="space-y-2 py-1">
            {barData.map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground truncate max-w-[70%]">{label}</span>
                  <span className={cn("text-[11px] font-semibold tabular-nums", getBarColor(value).replace("bg-", "text-"))}>{value}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted/50">
                  <div
                    className={cn("h-full rounded-full transition-all", getBarColor(value))}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="line-clamp-3 text-xs text-muted-foreground leading-relaxed py-2">
            {medication.clinicalNotes}
          </p>
        )}

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onViewDetails(medication)}
        >
          <Info className="mr-2 h-3 w-3" />
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}
