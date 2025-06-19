'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Edit,
  Trash2,
  Building,
  Calendar,
  MapPin,
  Copy,
  MoreHorizontal,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Experience } from '@/schemas/experience'

interface ExperienceSectionProps {
  experiences: Experience[]
  onDelete: (id: string) => void
  onDuplicate?: (experience: Experience) => void
  onBulkDelete?: (ids: string[]) => void
  isLoading?: boolean
}

export function ExperienceSection({
  experiences,
  onDelete,
  onDuplicate,
  isLoading = false,
}: ExperienceSectionProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present'
    const [year, month] = dateString.split('-')
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <div className='space-y-4'>
      {/* Experience List */}
      {experiences.map((exp) => (
        <Card key={exp.id} className={isLoading ? 'opacity-50' : ''}>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div className='space-y-1'>
                <CardTitle className='flex items-center gap-2'>
                  <Building className='w-5 h-5' />
                  {exp.position}
                </CardTitle>
                <CardDescription>
                  <div className='flex flex-col md:flex-row lg:flex-row md:items-center gap-1 md:gap-4'>
                    <span className='font-medium'>{exp.company}</span>
                    <div className='flex md:items-center flex-col md:flex-row md:gap-4 text-xs md:text-sm'>
                      <span className='flex items-center gap-1'>
                        <MapPin className='w-3 h-3' />
                        {exp.location}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        {formatDate(exp.startDate)} -{' '}
                        {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </span>
                    </div>
                  </div>
                </CardDescription>
              </div>
              <div className='flex gap-2'>
                <Button variant='ghost' size='sm' asChild disabled={isLoading}>
                  <Link href={`/experience/edit/${exp.id}`}>
                    <Edit className='w-4 h-4' />
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='sm' disabled={isLoading}>
                      <MoreHorizontal className='w-4 h-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    {onDuplicate && (
                      <DropdownMenuItem onClick={() => onDuplicate(exp)}>
                        <Copy className='w-4 h-4 mr-2' />
                        Duplicate
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => onDelete(exp.id!)}
                      className='text-destructive focus:text-destructive'
                    >
                      <Trash2 className='w-4 h-4 mr-2' />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-sm text-muted-foreground'>{exp.description}</p>

            {exp.achievements.length > 0 && (
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
            )}

            {exp.technologies.length > 0 && (
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
            )}
          </CardContent>
        </Card>
      ))}

      {/* Empty State */}
      {experiences.length === 0 && (
        <Card className='border-dashed'>
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
