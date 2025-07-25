import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Experience } from "@/schemas/experience"
import ExperienceSection from "@/app/(users)/experience/_components/experience-section"
import ExperienceHeader from "@/app/(users)/experience/_components/experience-header"

import { fetchAllUserExperience, } from '@/app/(users)/experience/actions'

export default async function ExperiencePage() {
  const experiences = await fetchAllUserExperience() as Experience[]

  return (
    <div className="section">
      <ExperienceHeader />
      {experiences.map((experience) => (
        <ExperienceSection key={experience.id}
          experience={experience}
        />
      ))}
      {/* Empty State */}
      {experiences.length === 0 && (
        <Card className='border-dashed text-center'>
          <CardHeader>
            <CardTitle>No Experience Added</CardTitle>
            <CardDescription>
              Click "+" to get started with your work history
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
