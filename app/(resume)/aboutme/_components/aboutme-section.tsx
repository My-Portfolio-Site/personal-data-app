'use client'

import { useState, useEffect } from 'react'
import { ProfileSchemaType } from '@/schemas/profile'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Edit,
  Camera,
  Save,
  X,
} from 'lucide-react'


// Quick Stats Component
function QuickStats({
  yearsOfExperience,
  projectsDone,
  totalSkills,
  certificationCompleted,
}: {
  yearsOfExperience: number,
  projectsDone: number,
  totalSkills: number,
  certificationCompleted: number
}) {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
      <Card>
        <CardContent className='p-3 sm:p-4 text-center'>
          <div className='text-lg sm:text-xl lg:text-2xl font-bold text-primary'>
            {yearsOfExperience}+
          </div>
          <p className='text-xs sm:text-sm text-muted-foreground leading-tight'>
            Years Experience
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='p-3 sm:p-4 text-center'>
          <div className='text-lg sm:text-xl lg:text-2xl font-bold text-primary'>
            {projectsDone}+
          </div>
          <p className='text-xs sm:text-sm text-muted-foreground leading-tight'>
            Projects Completed
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='p-3 sm:p-4 text-center'>
          <div className='text-lg sm:text-xl lg:text-2xl font-bold text-primary'>
            {totalSkills}+

          </div>
          <p className='text-xs sm:text-sm text-muted-foreground leading-tight'>
            Total Skills
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='p-3 sm:p-4 text-center'>
          <div className='text-lg sm:text-xl lg:text-2xl font-bold text-primary'>
            {certificationCompleted}+
          </div>
          <p className='text-xs sm:text-sm text-muted-foreground leading-tight'>
            Certifications
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Main Personal Info Section Component
export function AboutMeSection({ data }: { data: ProfileSchemaType }) {
  
  return (
    <div className='space-y-4 md:space-y-6'>
      <Card>
        <CardContent className=''>
          <div className='flex flex-col items-center sm:items-start md:flex-row gap-4 sm:gap-6'>
            <div className='flex-1 w-full space-y-3 sm:space-y-4'>
              <div className='text-center sm:text-left'>
                <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
                  <div className='space-y-1'>
                    <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold leading-tight'>
                      {data.firstName} {data.lastName}
                    </h2>
                    <p className='text-base sm:text-lg lg:text-xl text-muted-foreground'>
                      {data.title}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              {/* Contact Information */}
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-base sm:text-lg font-medium flex items-center gap-2'>
                    Contact Info
                  </h3>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                  <div className='space-y-3'>
                    <div className='flex items-start gap-3'>
                      <Mail className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5' />
                      <div className='min-w-0 flex-1'>
                        <p className='text-xs sm:text-sm font-medium'>Email</p>
                        <p className='text-xs sm:text-sm text-muted-foreground break-all'>
                          {data.email}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start gap-3'>
                      <Phone className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5' />
                      <div className='min-w-0 flex-1'>
                        <p className='text-xs sm:text-sm font-medium'>Phone</p>
                        <p className='text-xs sm:text-sm text-muted-foreground'>
                          {data.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='space-y-3'>
                    <div className='flex items-start gap-3'>
                      <MapPin className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5' />
                      <div className='min-w-0 flex-1'>
                        <p className='text-xs sm:text-sm font-medium'>
                          Location
                        </p>
                        <p className='text-xs sm:text-sm text-muted-foreground'>
                          {data.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className=''>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
            <div className='space-y-1'>
              <CardTitle className='text-base sm:text-lg'>
                Professional Summary
              </CardTitle>
              <CardDescription className='text-xs sm:text-sm'>
                A brief overview of your professional background
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className='pt-0'>
          <p className='text-xs sm:text-sm leading-relaxed'>{data.summary}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className=''>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
            <div className='space-y-1'>
              <CardTitle className='text-base sm:text-lg'>
                Online Presence
              </CardTitle>
              <CardDescription className='text-xs sm:text-sm'>
                Your professional links and social media
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className='pt-0'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4'>
            {data.website && (
              <div className='flex items-center gap-3 p-3 sm:p-4 rounded-lg border'>
                <Globe className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0' />
                <div className='flex-1 min-w-0'>
                  <p className='text-xs sm:text-sm font-medium'>Portfolio</p>
                  <a
                    href={data.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-xs sm:text-sm text-primary hover:underline truncate block'
                  >
                    {data.website}
                  </a>
                </div>
              </div>
            )}
            {data.linkedin && (
              <div className='flex items-center gap-3 p-3 sm:p-4 rounded-lg border'>
                <Linkedin className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0' />
                <div className='flex-1 min-w-0'>
                  <p className='text-xs sm:text-sm font-medium'>LinkedIn</p>
                  <a
                    href={data.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-xs sm:text-sm text-primary hover:underline truncate block'
                  >
                    {data.linkedin}
                  </a>
                </div>
              </div>
            )}
            {data.github && (
              <div className='flex items-center gap-3 p-3 sm:p-4 rounded-lg border'>
                <Github className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0' />
                <div className='flex-1 min-w-0'>
                  <p className='text-xs sm:text-sm font-medium'>GitHub</p>
                  <a
                    href={data.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-xs sm:text-sm text-primary hover:underline truncate block'
                  >
                    {data.github}
                  </a>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <QuickStats
        yearsOfExperience={3}
        projectsDone={5}
        totalSkills={10}
        certificationCompleted={2}
      />
    </div>
  )
}
