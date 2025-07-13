'use client'

import { useState, useEffect } from 'react'
import { ProfileSchema, Profile } from '@/schemas/profile'
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
import { fetchProfile, updateProfile } from '../actions'
import Loading from '../loading'
import ShowError from './aboutme-show-error'

// Profile Header Component
function ProfileHeader({
  data,
  onUpdate,
}: {
  data: Profile
  onUpdate: (updates: Partial<Profile>) => void
}) {
  const [isEditingBasic, setIsEditingBasic] = useState(false)
  const [isEditingContact, setIsEditingContact] = useState(false)
  const [tempData, setTempData] = useState(data)

  const startEditingBasic = () => {
    setIsEditingBasic(true)
    setTempData(data)
  }

  const startEditingContact = () => {
    setIsEditingContact(true)
    setTempData(data)
  }

  const saveBasicChanges = () => {
    onUpdate({
      firstName: tempData.firstName,
      lastName: tempData.lastName,
      title: tempData.title,
    })
    setIsEditingBasic(false)
  }

  const saveContactChanges = () => {
    onUpdate({
      email: tempData.email,
      phone: tempData.phone,
      location: tempData.location,
    })
    setIsEditingContact(false)
  }

  const cancelBasicEditing = () => {
    setTempData(data)
    setIsEditingBasic(false)
  }

  const cancelContactEditing = () => {
    setTempData(data)
    setIsEditingContact(false)
  }

  const updateTempData = (field: keyof Profile, value: string) => {
    setTempData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardContent className=''>
        <div className='flex flex-col items-center sm:items-start md:flex-row gap-4 sm:gap-6'>
          {/* Avatar Section */}
          <div className='flex flex-col items-center space-y-3 sm:space-y-4'>
            <div className='relative'>
              <Avatar className='w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32'>
                <AvatarImage
                  src={data.avatar}
                  alt={`${data.firstName} ${data.lastName}`}
                />
                <AvatarFallback className='text-lg sm:text-xl lg:text-2xl'>
    
                  {data.firstName ? (data.firstName[0] + data.lastName[0]) : "NA"}
                </AvatarFallback>
              </Avatar>
              <Button
                size='sm'
                variant='outline'
                className='absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 h-7 w-7 sm:h-8 sm:w-8 rounded-full p-0'
              >
                <Camera className='h-3 w-3 sm:h-4 sm:w-4' />
              </Button>
            </div>
          </div>

          {/* Basic Info */}
          <div className='flex-1 w-full space-y-3 sm:space-y-4'>
            {isEditingBasic ? (
              <div className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input
                      id='firstName'
                      value={tempData.firstName}
                      onChange={(e) =>
                        updateTempData('firstName', e.target.value)
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input
                      id='lastName'
                      value={tempData.lastName}
                      onChange={(e) =>
                        updateTempData('lastName', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='title'>Professional Title</Label>
                  <Input
                    id='title'
                    value={tempData.title}
                    onChange={(e) => updateTempData('title', e.target.value)}
                  />
                </div>
                <div className='flex gap-2'>
                  <Button size='sm' onClick={saveBasicChanges}>
                    <Save className='w-4 h-4 mr-2' />
                    Save
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={cancelBasicEditing}
                  >
                    <X className='w-4 h-4 mr-2' />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
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
                  <Button variant='ghost' size='sm' onClick={startEditingBasic}>
                    <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                  </Button>
                </div>
              </div>
            )}

            <Separator />

            {/* Contact Information */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <h3 className='text-base sm:text-lg font-medium flex items-center gap-2'>
                  Contact Info
                </h3>
                {!isEditingContact && (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={startEditingContact}
                  >
                    <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                  </Button>
                )}
              </div>
              {isEditingContact ? (
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        value={tempData.email}
                        onChange={(e) =>
                          updateTempData('email', e.target.value)
                        }
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='phone'>Phone</Label>
                      <Input
                        id='phone'
                        value={tempData.phone}
                        onChange={(e) =>
                          updateTempData('phone', e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='location'>Location</Label>
                    <Input
                      id='location'
                      value={tempData.location}
                      onChange={(e) =>
                        updateTempData('location', e.target.value)
                      }
                    />
                  </div>
                  <div className='flex gap-2'>
                    <Button size='sm' onClick={saveContactChanges}>
                      <Save className='w-4 h-4 mr-2' />
                      Save
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={cancelContactEditing}
                    >
                      <X className='w-4 h-4 mr-2' />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Professional Summary Component
function ProfessionalSummary({
  summary,
  onUpdate,
}: {
  summary: string
  onUpdate: (summary: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempSummary, setTempSummary] = useState(summary)

  const startEditing = () => {
    setIsEditing(true)
    setTempSummary(summary)
  }

  const saveChanges = () => {
    onUpdate(tempSummary)
    setIsEditing(false)
  }

  const cancelEditing = () => {
    setTempSummary(summary)
    setIsEditing(false)
  }

  return (
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
          {!isEditing && (
            <Button variant='ghost' size='sm' onClick={startEditing}>
              <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className='pt-0'>
        {isEditing ? (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Textarea
                rows={6}
                value={tempSummary}
                onChange={(e) => setTempSummary(e.target.value)}
                className='resize-none'
              />
              <p className='text-xs text-muted-foreground'>
                {tempSummary.length}/500 characters recommended
              </p>
            </div>
            <div className='flex gap-2'>
              <Button size='sm' onClick={saveChanges}>
                <Save className='w-4 h-4 mr-2' />
                Save
              </Button>
              <Button size='sm' variant='outline' onClick={cancelEditing}>
                <X className='w-4 h-4 mr-2' />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className='text-xs sm:text-sm leading-relaxed'>{summary}</p>
        )}
      </CardContent>
    </Card>
  )
}

// Online Presence Component
function OnlinePresence({
  data,
  onUpdate,
}: {
  data: Pick<Profile, 'website' | 'linkedin' | 'github'>
  onUpdate: (
    updates: Pick<Profile, 'website' | 'linkedin' | 'github'>
  ) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempData, setTempData] = useState(data)

  const startEditing = () => {
    setIsEditing(true)
    setTempData(data)
  }

  const saveChanges = () => {
    onUpdate(tempData)
    setIsEditing(false)
  }

  const cancelEditing = () => {
    setTempData(data)
    setIsEditing(false)
  }

  const updateTempData = (field: keyof typeof tempData, value: string) => {
    setTempData((prev) => ({ ...prev, [field]: value }))
  }

  return (
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
          {!isEditing && (
            <Button variant='ghost' size='sm' onClick={startEditing}>
              <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className='pt-0'>
        {isEditing ? (
          <div className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='website'>Portfolio/Website</Label>
                <Input
                  id='website'
                  value={tempData.website}
                  onChange={(e) => updateTempData('website', e.target.value)}
                  placeholder='https://yourwebsite.com'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='linkedin'>LinkedIn</Label>
                <Input
                  id='linkedin'
                  value={tempData.linkedin}
                  onChange={(e) => updateTempData('linkedin', e.target.value)}
                  placeholder='https://linkedin.com/in/yourprofile'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='github'>GitHub</Label>
                <Input
                  id='github'
                  value={tempData.github}
                  onChange={(e) => updateTempData('github', e.target.value)}
                  placeholder='https://github.com/yourusername'
                />
              </div>
            </div>
            <div className='flex gap-2'>
              <Button size='sm' onClick={saveChanges}>
                <Save className='w-4 h-4 mr-2' />
                Save
              </Button>
              <Button size='sm' variant='outline' onClick={cancelEditing}>
                <X className='w-4 h-4 mr-2' />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  )
}

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
export function AboutMeSection({profileData}: {profileData: Profile}) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Handle Profile Update
  const handleProfileUpdate = async (updates: Partial<Profile>) => {
    try {
      setIsLoading(true)
      const updateFormData = {
        id: profileData.id,
        userId: profileData.userId,
        firstName: updates.firstName ?? profileData.firstName ?? null,
        lastName: updates.lastName ?? profileData.lastName ?? null,
        title: updates.title ?? profileData.title ?? null,
        email: updates.email ?? profileData.email ?? null,
        phone: updates.phone ?? profileData.phone ?? null,
        location: updates.location ?? profileData.location ?? null,
        website: updates.website ?? profileData.website ?? null,
        linkedin: updates.linkedin ?? profileData.linkedin ?? null,
        github: updates.github ?? profileData.github ?? null,
        summary: updates.summary ?? profileData.summary ?? null,
        avatar: updates.avatar ?? profileData.avatar ?? null,
      }

      console.log("Updating profile with:", updateFormData);
      const result = await updateProfile(updateFormData)
      if (!result || "error" in result) {
        setError(result?.error)
      } else {
        console.log("Profile updated successfully:", result);
        setError(null)
      }
    } catch (err) {
      setError("Failed to update profile")
      toast.error(error || "An error occurred while updating your profile.")
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    toast.error(error)
  }

  const updatePersonalData = (updates: Partial<Profile>) => {
    handleProfileUpdate(updates)
  }

  const updateSummary = (summary: string) => {
    handleProfileUpdate({ summary })
  }

  const updateOnlinePresence = (
    updates: Pick<Profile, 'website' | 'linkedin' | 'github'>
  ) => {
    handleProfileUpdate(updates)
  }

  console.log("PD:",profileData);
  // if(!profileData || Object.keys(profileData).length === 0) {
  //   return <ShowError error="Profile data is empty or not loaded." />
  // }
  return (
    <div className='space-y-4 md:space-y-6'>
      <ProfileHeader data={profileData} onUpdate={updatePersonalData} />
      <ProfessionalSummary
        summary={profileData.summary}
        onUpdate={updateSummary}
      />
      <OnlinePresence
        data={{
          website: profileData.website,
          linkedin: profileData.linkedin,
          github: profileData.github,
        }}
        onUpdate={updateOnlinePresence}
      />
      <QuickStats
        yearsOfExperience={profileData.yearsOfExperience}
        projectsDone={profileData.projectsDone}
        totalSkills={profileData.totalSkills}
        certificationCompleted={profileData.certificationCompleted}
      />
    </div>
  )
}
