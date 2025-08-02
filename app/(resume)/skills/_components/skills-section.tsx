"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Edit, Code, Palette, Users, Zap } from "lucide-react"

const mockSkills = {
  technical: [
    { name: "JavaScript/TypeScript", level: 95, years: 8 },
    { name: "React/Next.js", level: 90, years: 6 },
    { name: "Node.js", level: 85, years: 7 },
    { name: "Python", level: 80, years: 5 },
    { name: "AWS/Cloud", level: 85, years: 4 },
    { name: "Docker/Kubernetes", level: 75, years: 3 },
    { name: "PostgreSQL/MongoDB", level: 80, years: 6 },
    { name: "GraphQL/REST APIs", level: 85, years: 5 },
  ],
  frameworks: ["React", "Next.js", "Vue.js", "Express.js", "FastAPI", "Django", "Tailwind CSS", "Material-UI"],
  tools: ["Git", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Figma", "Postman", "VS Code"],
  soft: [
    { name: "Leadership", description: "Led cross-functional teams of 8+ members" },
    { name: "Communication", description: "Presented to C-level executives and stakeholders" },
    { name: "Problem Solving", description: "Architected solutions for complex technical challenges" },
    { name: "Mentoring", description: "Mentored 10+ junior developers throughout career" },
    { name: "Project Management", description: "Managed multiple projects using Agile methodologies" },
  ],
}

export function SkillsSection() {
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technical Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Technical Skills
            </CardTitle>
            <CardDescription>Programming languages and core technologies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSkills.technical.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{skill.years} years</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Soft Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Soft Skills
            </CardTitle>
            <CardDescription>Leadership and interpersonal abilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSkills.soft.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Frameworks & Libraries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Frameworks & Libraries
            </CardTitle>
            <CardDescription>Frontend and backend frameworks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockSkills.frameworks.map((framework) => (
                <Badge key={framework} variant="secondary" className="mb-2">
                  {framework}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tools & Technologies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Tools & Technologies
            </CardTitle>
            <CardDescription>Development and productivity tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockSkills.tools.map((tool) => (
                <Badge key={tool} variant="outline" className="mb-2">
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
