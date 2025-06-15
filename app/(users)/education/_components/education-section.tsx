'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, GraduationCap, Calendar, Award } from 'lucide-react'

const mockEducation = [
  {
    id: 1,
    institution: 'Stanford University',
    degree: 'Master of Science',
    field: 'Computer Science',
    location: 'Stanford, CA',
    startDate: 'Sep 2017',
    endDate: 'Jun 2019',
    gpa: '3.8/4.0',
    honors: ['Magna Cum Laude', "Dean's List"],
    coursework: [
      'Machine Learning',
      'Distributed Systems',
      'Advanced Algorithms',
      'Database Systems',
    ],
    activities: [
      'Computer Science Graduate Association',
      'Teaching Assistant for CS106A',
    ],
  },
  {
    id: 2,
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    location: 'Berkeley, CA',
    startDate: 'Aug 2013',
    endDate: 'May 2017',
    gpa: '3.7/4.0',
    honors: ['Cum Laude'],
    coursework: [
      'Data Structures',
      'Computer Architecture',
      'Software Engineering',
      'Operating Systems',
    ],
    activities: ['ACM Programming Team', 'Undergraduate Research Assistant'],
  },
]

export function EducationSection() {
  return (
    <div className='space-y-4'>
      {mockEducation.map((edu) => (
        <Card key={edu.id}>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div className='space-y-1'>
                <CardTitle className='flex items-center gap-2'>
                  <GraduationCap className='w-5 h-5' />
                  {edu.degree} in {edu.field}
                </CardTitle>
                <CardDescription className='flex items-center gap-4'>
                  <span className='font-medium'>{edu.institution}</span>
                  <span>•</span>
                  <span>{edu.location}</span>
                  <span>•</span>
                  <span className='flex items-center gap-1'>
                    <Calendar className='w-4 h-4' />
                    {edu.startDate} - {edu.endDate}
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
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <h4 className='font-medium mb-2 flex items-center gap-2'>
                  <Award className='w-4 h-4' />
                  GPA & Honors
                </h4>
                <p className='text-sm text-muted-foreground mb-2'>
                  GPA: {edu.gpa}
                </p>
                <div className='flex flex-wrap gap-2'>
                  {edu.honors.map((honor) => (
                    <Badge key={honor} variant='secondary'>
                      {honor}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className='font-medium mb-2'>Activities</h4>
                <ul className='space-y-1'>
                  {edu.activities.map((activity, index) => (
                    <li key={index} className='text-sm flex items-start gap-2'>
                      <span className='text-primary mt-1'>•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className='font-medium mb-2'>Relevant Coursework</h4>
              <div className='flex flex-wrap gap-2'>
                {edu.coursework.map((course) => (
                  <Badge key={course} variant='outline'>
                    {course}
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
