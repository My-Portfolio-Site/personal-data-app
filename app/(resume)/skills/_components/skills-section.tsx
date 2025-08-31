"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Edit, Code, Palette, Users, Zap, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { SkillSchemaType } from "@/schemas/skill"


interface SkillsProps {
  title: string
  skills: SkillSchemaType[]
  colorScheme: {
    titleColor: string
    badge: string
    progress: string
    hover: string
  }
}


const categoryColors = {
  languages: {
    titleColor: "text-blue-600 dark:text-blue-400 text-md font-bold",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm",
    progress: "bg-blue-500",
    hover: "hover:border-blue-300 dark:hover:border-blue-600",
  },
  frameworks: {
    titleColor: "text-green-600 dark:text-green-400 text-md font-bold",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm",
    progress: "bg-green-500",
    hover: "hover:border-green-300 dark:hover:border-green-600",
  },
  tools: {
    titleColor: "text-purple-600 dark:text-purple-400 text-md font-bold",
    badge: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-sm",
    progress: "bg-purple-500",
    hover: "hover:border-purple-300 dark:hover:border-purple-600",
  },
  competencies: {
    titleColor: "text-orange-600 dark:text-orange-400 text-md font-bold",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-sm",
    progress: "bg-orange-500",
    hover: "hover:bg-orange-600 dark:hover:bg-orange-400",
  },
  soft: {
    titleColor: "text-teal-100 dark:text-teal-400 text-md font-bold",
    badge: "border-2 border-gray-100 dark:border-gray-700",
    progress: "bg-teal-500",
    hover: "hover:border-teal-100 dark:hover:border-teal-600",
  },
}

export function SkillsSection({ skills }: { skills: SkillSchemaType[] }) {
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, SkillSchemaType[]>,
  )
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <TechnicalSkills
        title="Programming Languages"
        skills={groupedSkills.languages || []}
        colorScheme={categoryColors.languages}
      />

      <TechnicalSkills
        title="Frameworks & Libraries"
        skills={groupedSkills.frameworks || []}
        colorScheme={categoryColors.frameworks}
      />

      <TechnicalSkills
        title="Tools & Technologies"
        skills={groupedSkills.tools || []}
        colorScheme={categoryColors.tools}
      />

      <CoreCompetencies
        title="Core Competencies"
        skills={groupedSkills.competencies || []}
        colorScheme={categoryColors.competencies}
      />

      <SoftSkills
        title="Soft Skills"
        skills={groupedSkills.soft || []}
        colorScheme={categoryColors.soft}
      />
    </div>
  )
}


export function TechnicalSkills({ title, skills, colorScheme }: SkillsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <p className={colorScheme.titleColor}>{title}</p>
      </div>
      <TooltipProvider>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`group relative px-3 py-2 rounded-lg border border-border bg-background hover:shadow-sm transition-all duration-200 min-w-[120px] overflow-hidden ${colorScheme.hover}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground text-sm">{skill.name}</span>
                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-foreground transition-colors opacity-100">
                        <Info size={15} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className={`max-w-64 mb-1 ${colorScheme.badge}`}>
                      <div className="font-medium mb-1">{skill.name}</div>
                      <div className="text-sm text-white">{skill.description}</div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                <div
                  className={`h-full transition-all duration-500 ease-out ${colorScheme.progress}`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </TooltipProvider>
    </div>
  )
}

export function CoreCompetencies({ title, skills: competencies, colorScheme }: SkillsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <p className={colorScheme.titleColor}>{title}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {competencies.map((competency) => (
          <Badge
            key={competency.name}
            variant="outline"
            className={`px-3 py-1 text-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-default rounded-full ${colorScheme.hover}`}
          >
            {competency.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export function SoftSkills({ title, skills, colorScheme }: SkillsProps) {
  return (
    <div className="col-span-1 lg:col-span-2">
      <div className="flex items-center gap-3 mb-2">
        <p className={colorScheme.titleColor}>{title}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill.name} className={`flex flex-col justify-between group p-4 rounded-md ${colorScheme.badge} ${colorScheme.hover}`}>
            <h4 className="font-medium text-foreground mb-1 mt-0">{skill.name}</h4>
            <p className="text-sm text-muted-foreground">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

