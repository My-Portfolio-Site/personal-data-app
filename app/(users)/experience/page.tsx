import ExperienceSection from "./_components/experience-section"
import AddExperienceButton from "./_components/add-experience-button"

import { Experience } from "@/schemas/experience"
import Loading from './loading'
import { fetchAllUserExperience, } from '@/app/(users)/experience/actions'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function ExperiencePage() {
  const experiences = await fetchAllUserExperience() as Experience[]

  return (
    <div className="px-6 py-2 space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground text-sm md:text-base">Manage your work history and achievements</p>
        </div>
        <AddExperienceButton />
      </div>
      {experiences.map((experience) => (
        <ExperienceSection key={experience.id}
          experience={experience}
        />
      ))}
      {/* Empty State */}
      {experiences.length === 0 && (
        <Card className='border-dashed bg-card/50'>
          <CardHeader className='text-center'>
            <CardTitle>No Experience Added</CardTitle>
            <CardDescription>
              Click "Add Experience" to get started with your work history
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
