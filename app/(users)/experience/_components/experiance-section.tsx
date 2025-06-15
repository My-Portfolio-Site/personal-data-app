'use client'
import { fetchAllExperience } from '../actions'
import { useEffect, useState } from 'react'

import { toast } from 'sonner'
import { Experience } from '@/schemas/experience'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Building, Calendar } from 'lucide-react'

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<boolean>(false)

  async function loadUsers() {
    setIsLoading(true)
    const result = await fetchAllExperience()
    if ('error' in result) {
      toast.error(error)
      setError(result.error)
    } else {
      console.log('Experiance', result)
      setExperiences(result)
    }
    setIsLoading(false)
    return
  }

  useEffect(() => {
    loadUsers()
  }, [refresh])
  return (
    <div>
      <ExperienceShow experiences={experiences}/>
    </div>
  )
}

const mockExperience: Experience[] = [
  {
    "id": "awdaoi1",
    "userId": "asjsandlandla",
    "company": 'TechCorp Inc.',
    "position": 'Senior Software Engineer',
    "location": 'San Francisco, CA',
    "startDate": 'Jan 2021',
    "endDate": 'Present',
    "description":
      'Lead development of microservices architecture serving 10M+ users. Mentored 5 junior developers and improved deployment efficiency by 40%.',
    "achievements": [
      'Architected and implemented scalable microservices handling 10M+ daily requests',
      'Led migration from monolith to microservices, reducing deployment time by 60%',
      'Mentored 5 junior developers, with 3 receiving promotions within 18 months',
      'Implemented CI/CD pipelines reducing bug reports by 35%',
    ],
    "technologies": ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
  },
  {
    "id": "awdaoi2",
    "userId": "asjsandlandla",
    "company": 'StartupXYZ',
    "position": 'Full Stack Developer',
    "location": 'Remote',
    "startDate": 'Mar 2019',
    "endDate": 'Dec 2020',
    "description":
      'Built core platform features for B2B SaaS product. Collaborated with design and product teams to deliver user-centric solutions.',
    "achievements": [
      'Developed responsive web application serving 50,000+ active users',
      'Integrated payment processing system increasing revenue by 25%',
      'Optimized database queries reducing page load times by 45%',
      'Collaborated with UX team to improve user retention by 30%',
    ],
    "technologies": ['Vue.js', 'Python', 'PostgreSQL', 'Redis', 'Stripe API'],
  },
]

function ExperienceShow({experiences}: {experiences: Experience[]}) {
  return (
    <div className='space-y-4'>
      {experiences.map((exp) => (
        <Card key={exp.id}>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div className='space-y-1'>
                <CardTitle className='flex items-center gap-2'>
                  <Building className='w-5 h-5' />
                  {exp.position}
                </CardTitle>
                <CardDescription className='flex sm:items-center flex-col sm:flex-row sm:gap-4'>
                  <span className='font-medium'>{exp.company}</span>
                  <span className='hidden sm:block'>•</span>
                  <span>{exp.location}</span>
                  <span className='hidden sm:block'>•</span>
                  <span className='flex items-center gap-1'>
                    <Calendar className='w-4 h-4' />
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </CardDescription>
              </div>
              <div className='flex gap-2'>
                <Button variant='ghost' size='sm'>
                  <Edit className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size='sm'>
                  <Trash2 className='w-4 h-4' />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-sm text-muted-foreground'>{exp.description}</p>

            <div>
              <h4 className='font-medium mb-2'>Key Achievements:</h4>
              <ul className='space-y-1'>
                {exp.achievements.map((achievement, index) => (
                  <li key={index} className='text-sm flex items-start gap-2'>
                    <span className='text-primary mt-1'>•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className='font-medium mb-2'>Technologies:</h4>
              <div className='flex flex-wrap gap-2'>
                {exp.technologies.map((tech) => (
                  <Badge key={tech} variant='secondary'>
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
