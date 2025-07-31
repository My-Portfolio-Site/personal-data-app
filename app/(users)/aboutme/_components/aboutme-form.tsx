'use client'

import { useState, useActionState } from "react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User } from "lucide-react"
import { toast } from "sonner"
import { ValidatedInput, ValidatedTextarea } from "@/components/validated-input"

import { profileSchema } from "@/schemas/profile"
import type { ProfileSchemaErrorType, ProfileSchemaType } from "@/schemas/profile"

import { createProfile, updateProfile } from "@/app/(users)/aboutme/actions"
import { ZodOptional } from "zod/v4"

interface AboutmeFormProps {
  initialData: ProfileSchemaType
  mode: "add" | "edit"
}

export function AboutmeForm({ initialData, mode }: AboutmeFormProps) {
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [state, formAction, isPending] = useActionState(mode === 'add' ? createProfile : updateProfile, {
    data: {
      ...initialData
    },
    errors: { fieldErrors: [], formErrors: [] } as ProfileSchemaErrorType,
    message: null
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setWasSubmitted(true)

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const validationResult = profileSchema.safeParse(data)
    if (!validationResult.success) {
      event.preventDefault()
    }
  }

  if (state.message && !state.message?.success) {
    toast.error(state.message?.message)
  }

  if (state.message?.success && wasSubmitted) {
    toast.success(state.message?.message)
    setWasSubmitted(false)
    redirect('/aboutme')
  }

  return (
    <Card className="gap-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <div>
            <CardTitle>{mode === 'add' ? 'Create' : 'Update'} Your Profile</CardTitle>
            <CardDescription>
              {mode === 'add'
                ? "Let's start by adding your basic information and professional summary"
                : "Update your basic information and professional summary"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent >
        {/* Basic Information Form */}
        <form onSubmit={handleSubmit} action={formAction} noValidate className="space-y-4">
          <input type="hidden" name="id" value={state.data?.id || ''} />
          <input type="hidden" name="userId" value={state.data?.userId || ''} />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <ValidatedInput
                type="text"
                name="firstName"
                label="First Name"
                isRequired={!(profileSchema.shape.firstName instanceof ZodOptional)}
                fieldSchema={profileSchema.shape.firstName}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.firstName}
                errors={state.errors?.fieldErrors.firstName}
                placeholder="Enter your first name"
              />
              <ValidatedInput
                type="text"
                name="lastName"
                label="Last Name"
                isRequired={!(profileSchema.shape.lastName instanceof ZodOptional)}
                fieldSchema={profileSchema.shape.lastName}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.lastName}
                errors={state.errors?.fieldErrors.lastName}
                placeholder="Enter your last name"
              />
            </div>

            <ValidatedInput
              name="title"
              type="text"
              label="Professional Title"
              isRequired={!(profileSchema.shape.title instanceof ZodOptional)}
              fieldSchema={profileSchema.shape.title}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.title}
              errors={state.errors?.fieldErrors.title}
              placeholder="e.g., Senior Software Engineer, Product Manager"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <ValidatedInput
                type="email"
                name="email"
                label="Email"
                isRequired={!(profileSchema.shape.email instanceof ZodOptional)}
                fieldSchema={profileSchema.shape.email}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.email}
                errors={state.errors?.fieldErrors.email}
                placeholder="your.email@example.com"
              />
              <ValidatedInput
                type="tel"
                name="phone"
                label="Phone"
                isRequired={!(profileSchema.shape.phone instanceof ZodOptional)}
                fieldSchema={profileSchema.shape.phone}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.phone}
                errors={state.errors?.fieldErrors.phone}
                placeholder="+977-123456789"
              />
            </div>

            <ValidatedInput
              name="location"
              type="text"
              label="Location"
              isRequired={!(profileSchema.shape.location instanceof ZodOptional)}
              fieldSchema={profileSchema.shape.location}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.location}
              errors={state.errors?.fieldErrors.location}
              placeholder="City, State/Country"
            />
          </div>

          <Separator className="mb-3" />

          {/* Professional Summary Form */}
          <div className="space-y-2">
            <div>
              <h3 className="text-lg font-semibold">Professional Summary</h3>
              <p className="text-sm text-muted-foreground">
                Write a brief overview of your professional background, key skills, and career objectives.
              </p>
            </div>
            <ValidatedTextarea
              rows={6}
              name="summary"
              label="About Me"
              type='text'
              isRequired={!(profileSchema.shape.summary instanceof ZodOptional)}
              fieldSchema={profileSchema.shape.summary}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.summary}
              errors={state.errors?.fieldErrors.summary}
              placeholder="Experienced professional with expertise in... Passionate about... Proven track record of..."
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">{state.data?.summary?.toString().length || 0}/500 characters recommended</p>
          </div>

          <Separator className="mb-3" />

          {/* Online Presence Form */}
          <div className="space-y-2">
            <div>
              <h3 className="text-lg font-semibold">Online Presence</h3>
              <p className="text-sm text-muted-foreground">Add your professional links and social media profiles.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ValidatedInput
                name="website"
                type="url"
                label="Website"
                isRequired={!(profileSchema.shape.website instanceof ZodOptional)}
                fieldSchema={profileSchema.shape.website}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.website}
                errors={state.errors?.fieldErrors.website}
                placeholder="https://yourwebsite.com"
              />
              <ValidatedInput
                name="linkedin"
                type="url"
                label="LinkedIn Profile"
                isRequired={!(profileSchema.shape.linkedin instanceof ZodOptional)}
                fieldSchema={profileSchema.shape.linkedin}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.linkedin}
                errors={state.errors?.fieldErrors.linkedin}
                placeholder="https://linkedin.com/in/yourprofile"
              />
              <ValidatedInput
                name="github"
                type="url"
                label="GitHub Profile"
                isRequired={!(profileSchema.shape.github instanceof ZodOptional)}
                fieldSchema={profileSchema.shape.github}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.github}
                errors={state.errors?.fieldErrors.github}
                placeholder="https://github.com/yourusername"
              />
            </div>
          </div>
          <Separator className="mb-3" />
          {state.message && !state.message?.success && (
            <div className={"p-3 rounded-md text-sm bg-red-50 text-red-700 border border-red-200"}>
              {state.message?.message}
            </div>
          )}
          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button type="submit" disabled={isPending} className="flex-1 sm:flex-none">
              {isPending ? mode === "add" ? "Saving..." : 'Updating...' : mode === "add" ? "Save Profile" : "Update Profile"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
