"use client"

import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Priority, priorityLabels, priorityDescriptions } from "@/lib/medications-data"
import { 
  Heart, 
  Brain, 
  Zap, 
  Scale,
  RotateCcw,
  SlidersHorizontal
} from "lucide-react"

interface PreferenceTunerProps {
  weights: Record<Priority, number>
  onWeightsChange: (weights: Record<Priority, number>) => void
}

const priorityIcons: Record<Priority, React.ReactNode> = {
  autonomicStability: <Heart className="h-4 w-4" />,
  sexualHealth: <Brain className="h-4 w-4" />,
  adrenalineSensitivity: <Zap className="h-4 w-4" />,
  metabolicNeutrality: <Scale className="h-4 w-4" />,
}

export function PreferenceTuner({ weights, onWeightsChange }: PreferenceTunerProps) {
  const handleSliderChange = (priority: Priority, value: number[]) => {
    onWeightsChange({
      ...weights,
      [priority]: value[0],
    })
  }

  const resetWeights = () => {
    onWeightsChange({
      autonomicStability: 50,
      sexualHealth: 50,
      adrenalineSensitivity: 50,
      metabolicNeutrality: 50,
    })
  }

  const priorities: Priority[] = [
    "autonomicStability",
    "sexualHealth",
    "adrenalineSensitivity",
    "metabolicNeutrality",
  ]

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Preference Tuner</CardTitle>
              <CardDescription className="text-xs">Adjust your health priorities</CardDescription>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetWeights}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="mr-1 h-3 w-3" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {priorities.map((priority) => (
          <div key={priority} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  {priorityIcons[priority]}
                </div>
                <span className="text-sm font-medium">{priorityLabels[priority]}</span>
              </div>
              <Badge 
                variant={weights[priority] >= 70 ? "default" : "secondary"} 
                className="text-xs tabular-nums"
              >
                {weights[priority]}%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {priorityDescriptions[priority]}
            </p>
            <Slider
              value={[weights[priority]]}
              onValueChange={(value) => handleSliderChange(priority, value)}
              max={100}
              min={0}
              step={5}
              className="py-1"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
