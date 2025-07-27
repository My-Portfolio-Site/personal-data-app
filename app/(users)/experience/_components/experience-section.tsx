'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building, Calendar, MapPin } from 'lucide-react'

import type { ExperienceSchemaType } from '@/schemas/experience'
import DeleteExperienceButton from '@/app/(users)/experience/_components/delete-experience-button'
import EditExperienceButton from '@/app/(users)/experience/_components/edit-experience-button'


interface ExperienceSectionProps {
  experience: ExperienceSchemaType
}

export default function ExperienceSection({
  experience
}: ExperienceSectionProps) {
  const achievements = JSON.parse(experience.achievements || "[]") as string[];
  const technologies = JSON.parse(experience.technologies || "[]") as string[];
  
  return (
    <Card key={experience.id}>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='space-y-1'>
            <CardTitle className='flex items-center gap-2'>
              <Building className='w-5 h-5' />
              {experience.position}
            </CardTitle>
            <CardDescription>
              <div className='flex flex-col md:flex-row lg:flex-row md:items-center gap-1 md:gap-4'>
                <span className='font-medium'>{experience.company}</span>
                <div className='flex md:items-center flex-col md:flex-row md:gap-4 text-xs md:text-sm'>
                  <span className='flex items-center gap-1'>
                    <MapPin className='w-3 h-3' />
                    {experience.location}
                  </span>
                  <span className='flex items-center gap-1'>
                    <Calendar className='w-4 h-4' />
                    {experience.startDate} -{' '}
                    {experience.endDate ? experience.endDate : 'Present'}
                  </span>
                </div>
              </div>
            </CardDescription>
          </div>
          <div className='flex gap-2'>
            {experience.id && (
              <EditExperienceButton experienceId={experience.id} />)}
            {experience.id && (
              <DeleteExperienceButton experienceId={experience.id} company={experience.company} />)
            }
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-sm text-muted-foreground'>{experience.description}</p>

        {achievements.length > 0 && (
          <div>
            <h4 className='font-medium mb-2'>Key Achievements:</h4>
            <ul className='space-y-1'>
              {achievements.map((achievement, index) => (
                <li key={index} className='text-sm flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {technologies.length > 0 && (
          <div>
            <h4 className='font-medium mb-2'>Technologies:</h4>
            <div className='flex flex-wrap gap-2'>
              {technologies.map((tech) => (
                <Badge key={tech} variant='secondary'>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>


  )
}
