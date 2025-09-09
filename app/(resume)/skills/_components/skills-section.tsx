"use client"

import { Info, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { SkillSchemaType } from "@/schemas/skill"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { deleteSkillById } from "@/app/(resume)/skills/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

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
    hover: "hover:border-orange-600 dark:hover:border-orange-400",
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        <p className='font-bold text-md'>{title}</p>
      </div>
      <TooltipProvider>
        <div className="flex flex-wrap gap-2">
          {skills.length === 0 && (
            <div className="border-1 border-dashed text-center px-4 py-2 rounded-lg">
              <p className="text-muted-foreground italic text-sm">No skills found</p>
            </div>
          )}
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`group relative px-3 py-2 rounded-lg border border-border bg-background hover:shadow-sm transition-all duration-200 min-w-[120px] overflow-hidden ${colorScheme.hover}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground text-md">{skill.name}</span>
                <div className="flex items-center ml-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="ghost" className="size-7">
                        <Info />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className={`max-w-64`}>
                      {/* <div className="font-medium mb-1">{skill.name}</div> */}
                      <div className={`text-sm text-white`}>{skill.description}</div>
                    </TooltipContent>
                  </Tooltip>
                  <SkillContextMenu skill={skill} />
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
        <p className='font-bold text-md'>{title}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {competencies.length === 0 && (
          <div className="border-1 border-dashed text-center px-4 py-2 rounded-lg">
            <p className="text-muted-foreground italic text-sm">No skills found</p>
          </div>
        )}
        {competencies.map((competency) => (
          <Badge
            key={competency.name}
            variant="outline"
            className={`px-3 py-1 text-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-default rounded-full ${colorScheme.hover}`}
          >
            {competency.name}
            <SkillContextMenu skill={competency} />
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
        <p className='font-bold text-md'>{title}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.length === 0 && (
          <div className="border-1 border-dashed text-center px-4 py-2 rounded-lg w-fit">
            <p className="text-muted-foreground italic text-sm">No skills found</p>
          </div>
        )}
        {skills.map((skill) => (
          <div key={skill.name} className={`flex flex-col justify-between group p-4 rounded-md ${colorScheme.badge} ${colorScheme.hover}`}>
            <div className="flex flex-row justify-between">
              <h4 className="font-medium text-foreground mb-1 mt-0">{skill.name}</h4>
              <SkillContextMenu skill={skill} />
            </div>
            <p className="text-sm text-muted-foreground">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkillContextMenu({ skill }: { skill: SkillSchemaType }) {
  const router = useRouter();

  const onEdit = (id: string) => {
    // Handle edit action
    router.push(`/skills/edit/${id}`);
  }

  const onDelete = async (id: string) => {
    // Handle delete action
    const res = await deleteSkillById(id);
    if (res.success) {
      toast.success("Skill " + skill.name + " deleted successfully");
    } else {
      toast.error("Failed to delete skill: " + res.message);
    }
  }
  
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="size-7">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-20 w-10">
          <DropdownMenuItem onClick={() => onEdit(skill.id!)}>Edit</DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => onDelete(skill.id!)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}