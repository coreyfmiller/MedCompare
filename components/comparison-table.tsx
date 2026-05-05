"use client"

import { useState, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Medication } from "@/lib/medications-data"
import { Search, ArrowUpDown, Info, Filter } from "lucide-react"

interface ComparisonTableProps {
  medications: Array<{ medication: Medication; matchScore: number | null }>
  onViewDetails: (medication: Medication) => void
}

export function ComparisonTable({ medications, onViewDetails }: ComparisonTableProps) {
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState<"all" | "SSRI" | "SNRI" | "NDRI" | "NaSSA">("all")
  const [sortField, setSortField] = useState<"matchScore" | "halfLifeHours" | "name">("matchScore")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const filteredAndSorted = useMemo(() => {
    return medications
      .filter((item) => {
        const matchesSearch =
          item.medication.name.toLowerCase().includes(search.toLowerCase()) ||
          item.medication.brand.toLowerCase().includes(search.toLowerCase()) ||
          item.medication.genericName.toLowerCase().includes(search.toLowerCase())
        const matchesClass = classFilter === "all" || item.medication.class === classFilter
        return matchesSearch && matchesClass
      })
      .sort((a, b) => {
        let comparison = 0
        if (sortField === "matchScore") {
          comparison = (a.matchScore ?? 0) - (b.matchScore ?? 0)
        } else if (sortField === "halfLifeHours") {
          comparison = a.medication.halfLifeHours - b.medication.halfLifeHours
        } else if (sortField === "name") {
          comparison = a.medication.name.localeCompare(b.medication.name)
        }
        return sortDirection === "asc" ? comparison : -comparison
      })
  }, [medications, search, classFilter, sortField, sortDirection])

  const toggleSort = (field: "matchScore" | "halfLifeHours" | "name") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection(field === "name" ? "asc" : "desc")
    }
  }

  const getMatchColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
    if (score >= 60) return "bg-amber-500/10 text-amber-600 border-amber-500/20"
    return "bg-slate-500/10 text-slate-600 border-slate-500/20"
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search medications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={classFilter} onValueChange={(v) => setClassFilter(v as typeof classFilter)}>
            <SelectTrigger className="w-[130px] bg-background/50">
              <SelectValue placeholder="Filter class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="SSRI">SSRI Only</SelectItem>
              <SelectItem value="SNRI">SNRI Only</SelectItem>
              <SelectItem value="NDRI">NDRI Only</SelectItem>
              <SelectItem value="NaSSA">NaSSA Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[200px]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 font-semibold"
                  onClick={() => toggleSort("name")}
                >
                  Drug Name
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-[80px]">Class</TableHead>
              <TableHead className="hidden md:table-cell">
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 font-semibold"
                  onClick={() => toggleSort("halfLifeHours")}
                >
                  Half-life
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="hidden lg:table-cell">Primary Action</TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="-mr-3 h-8 font-semibold"
                  onClick={() => toggleSort("matchScore")}
                >
                  Match Score
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSorted.map(({ medication, matchScore }) => (
              <TableRow 
                key={medication.id}
                className="group cursor-pointer"
                onClick={() => onViewDetails(medication)}
              >
                <TableCell className="font-medium">
                  <div>
                    <p>{medication.name}</p>
                    <p className="text-xs text-muted-foreground">{medication.brand}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={medication.class === "SSRI" ? "default" : "secondary"}
                    className="font-medium"
                  >
                    {medication.class}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {medication.halfLife}
                </TableCell>
                <TableCell className="hidden lg:table-cell max-w-[250px]">
                  <p className="truncate text-sm text-muted-foreground">
                    {medication.primaryReceptorAction}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  {matchScore !== null ? (
                    <Badge 
                      variant="outline" 
                      className={`font-semibold tabular-nums ${getMatchColor(matchScore)}`}
                    >
                      {matchScore}%
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewDetails(medication)
                    }}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredAndSorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">No medications found</p>
            <p className="text-xs text-muted-foreground/70">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
