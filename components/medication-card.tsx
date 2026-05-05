"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Medication, Concern, concerns } from "@/lib/medications-data"
import { ChartContainer } from "@/components/ui/chart"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { Info, Clock, Pill } from "lucide-react"

interface MedicationCardProps {
  medication: Medication
  matchScore: number
  selectedConcerns: Concern[]
  onViewDetails: (medication: Medication) => void
}

export function MedicationCard({
  medication,
  matchScore,
  selectedConcerns,
  onViewDetails,
}: MedicationCardProps) {
  // Build radar data from selected concerns (or top 4 scores if none selected)
  const radarData = selectedConcerns.length > 0
    ? selectedConcerns.map((concernId) => {
        const info = concerns.find((c) => c.id === concernId)
        return {
          subject: info?.label.replace(/\s+/g, "\n").split("\n")[0] ?? concernId,
          value: medication.scores[concernId],
          fullMark: 100,
        }
      })
    : [
        { subject: "Autonomic", value: medication.scores.autonomicStability, fullMark: 100 },
        { subject: "Sexual", value: medication.scores.libido, fullMark: 100 },
        { subject: "Metabolic", value: medication.scores.weightNeutrality, fullMark: 100 },
        { subject: "Cognitive", value: medication.scores.mentalClarity, fullMark: 100 },
      ]

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

  // Shorten labels for radar chart display
  const shortenLabel = (label: string) => {
    if (label.length > 12) return label.slice(0, 10) + "…"
    return label
  }

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="absolute right-3 top-3">
        <Badge
          variant="outline"
          className={`text-xs font-semibold tabular-nums ${getMatchColor(matchScore)}`}
        >
          {matchScore}% Match
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Pill className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-lg leading-tight">{medication.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{medication.brand}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-xs">
          <Badge variant="secondary" className="font-medium">
            {medication.class}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{medication.halfLife}</span>
          </div>
        </div>

        <div className="h-[140px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 9,
                }}
                tickLine={false}
                tickFormatter={shortenLabel}
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

        <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
          {medication.primaryReceptorAction}
        </p>

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
