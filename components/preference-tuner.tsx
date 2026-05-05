"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { concerns, Concern, ConcernInfo } from "@/lib/medications-data"
import { RotateCcw, CheckCircle2, CircleDot } from "lucide-react"
import { cn } from "@/lib/utils"

const MAX_SELECTIONS = 5

interface PreferenceTunerProps {
  selectedConcerns: Concern[]
  onConcernsChange: (concerns: Concern[]) => void
}

export function PreferenceTuner({ selectedConcerns, onConcernsChange }: PreferenceTunerProps) {
  const handleToggle = (concernId: Concern) => {
    if (selectedConcerns.includes(concernId)) {
      onConcernsChange(selectedConcerns.filter((c) => c !== concernId))
    } else if (selectedConcerns.length < MAX_SELECTIONS) {
      onConcernsChange([...selectedConcerns, concernId])
    }
  }

  const resetSelections = () => {
    onConcernsChange([])
  }

  // Group concerns by category
  const grouped = concerns.reduce<Record<string, ConcernInfo[]>>((acc, concern) => {
    if (!acc[concern.category]) acc[concern.category] = []
    acc[concern.category].push(concern)
    return acc
  }, {})

  const remaining = MAX_SELECTIONS - selectedConcerns.length

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <CircleDot className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Your Priorities</CardTitle>
              <CardDescription className="text-xs">Pick up to 5 concerns</CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetSelections}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
            disabled={selectedConcerns.length === 0}
          >
            <RotateCcw className="mr-1 h-3 w-3" />
            Reset
          </Button>
        </div>
        {/* Counter */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex gap-1">
            {Array.from({ length: MAX_SELECTIONS }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  i < selectedConcerns.length ? "bg-primary" : "bg-muted-foreground/20"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {selectedConcerns.length} of {MAX_SELECTIONS} selected
            {remaining > 0 && selectedConcerns.length > 0 && ` · ${remaining} remaining`}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 max-h-[calc(100vh-240px)] overflow-y-auto pr-2">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {category}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {items.map((concern) => {
                const isSelected = selectedConcerns.includes(concern.id)
                const isDisabled = !isSelected && selectedConcerns.length >= MAX_SELECTIONS

                return (
                  <button
                    key={concern.id}
                    onClick={() => handleToggle(concern.id)}
                    disabled={isDisabled}
                    title={concern.description}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-border/60 bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                      isDisabled && "opacity-40 cursor-not-allowed hover:border-border/60 hover:text-muted-foreground"
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
