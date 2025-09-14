"use client"

import { z, ZodOptional } from 'zod/v4'
import { useState, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ValidatedInput, ValidatedTextarea, ValidatedCheckbox } from "@/components/validated-input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Building, X, Plus, Save, Trash2, CalendarIcon } from "lucide-react"
import type { ReferenceSchemaType, ReferenceSchemaErrorType } from "@/schemas/reference"
import { referenceSchema } from "@/schemas/reference"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { addReference, updateReference } from "@/app/(resume)/references/actions"
import { toast } from "sonner"
import { redirect } from 'next/navigation'

interface ReferenceFormProps {
  initialData: ReferenceSchemaType
  mode: "add" | "edit"
}

export function ReferenceForm({
  initialData,
  mode
}: ReferenceFormProps) {
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [state, formAction, isPending] = useActionState(mode === 'add' ? addReference : updateReference, {
    data: {
      ...initialData
    },
    errors: { fieldErrors: [], formErrors: [] } as ReferenceSchemaErrorType,
    message: null
  })
  // console.log(state.errors)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setWasSubmitted(true)

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const validationResult = referenceSchema.safeParse(data)
    // console.log(validationResult)
    // console.log("Submitting form with data:", data);
    
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
    redirect('/references')
  }

  return (
    <Card className='gap-2'>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          <div>
            <CardTitle>{mode === "add" ? "Add Reference" : "Edit Reference"}</CardTitle>
            <CardDescription>
              {mode === "add"
                ? "Add your professional reference"
                : "Update your reference details"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <form action={formAction} onSubmit={handleSubmit} noValidate className='space-y-4'>
          <input type="hidden" name="id" value={state.data?.id || ''} />
          <input type="hidden" name="userId" value={state.data?.userId || ''} />
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ValidatedInput
                type='text'
                name="name"
                label="Name"
                isRequired={!(referenceSchema.shape.name instanceof ZodOptional)}
                fieldSchema={referenceSchema.shape.name}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.name}
                errors={state.errors?.fieldErrors.name}
                placeholder="e.g., John Doe"
              />
              <ValidatedInput
                type='text'
                name="designation"
                label="Designation"
                isRequired={!(referenceSchema.shape.designation instanceof ZodOptional)}
                fieldSchema={referenceSchema.shape.designation}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.designation}
                errors={state.errors?.fieldErrors.designation}
                placeholder="e.g., Senior Software Engineer"
              />

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ValidatedInput
                type='text'
                name="company"
                label="Company"
                isRequired={!(referenceSchema.shape.company instanceof ZodOptional)}
                fieldSchema={referenceSchema.shape.company}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.company}
                errors={state.errors?.fieldErrors.company}
                placeholder="e.g., Google, Microsoft, Startup Inc."
              />
              <ValidatedInput
                type='text'
                name="linkedin"
                label="LinkedIn"
                isRequired={!(referenceSchema.shape.linkedin instanceof ZodOptional)}
                fieldSchema={referenceSchema.shape.linkedin}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.linkedin}
                errors={state.errors?.fieldErrors.linkedin}
                placeholder="e.g., https://www.linkedin.com/in/johndoe"
              />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ValidatedInput
                type='text'
                name="email"
                label="Email"
                isRequired={!(referenceSchema.shape.email instanceof ZodOptional)}
                fieldSchema={referenceSchema.shape.email}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.email}
                errors={state.errors?.fieldErrors.email}
                placeholder="e.g., john.doe@example.com"
              />

              <ValidatedInput
                type='text'
                name="phone"
                label="Phone"
                isRequired={!(referenceSchema.shape.phone instanceof ZodOptional)}
                fieldSchema={referenceSchema.shape.phone}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.phone}
                errors={state.errors?.fieldErrors.phone}
                placeholder="e.g., +1 (555) 123-4567"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ValidatedInput
                type='text'
                name="workingPeriod"
                label="Working Period"
                isRequired={!(referenceSchema.shape.workingPeriod instanceof ZodOptional)}
                fieldSchema={referenceSchema.shape.workingPeriod}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.workingPeriod}
                errors={state.errors?.fieldErrors.workingPeriod}
                placeholder="e.g., 2020 - Present"
              />

              <ValidatedInput
                type='text'
                name="relationship"
                label="Relationship"
                isRequired={!(referenceSchema.shape.relationship instanceof ZodOptional)}
                fieldSchema={referenceSchema.shape.relationship}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.relationship}
                errors={state.errors?.fieldErrors.relationship}
                placeholder="e.g., Manager, Colleague"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* <Label htmlFor="canContact">I can be contacted</Label> */}
            <ValidatedCheckbox
              name='canContact'
              label='I can be contacted'
              isRequired={!(referenceSchema.shape.canContact instanceof ZodOptional)}
              fieldSchema={referenceSchema.shape.canContact}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.canContact}
              errors={state.errors?.fieldErrors.canContact}
            />
          </div>

          <Separator className='mb-3' />

          {/* Description */}
          <div className="space-y-2">
            <ValidatedTextarea
              name='testimonial'
              label='Testimonial'
              type='text'
              isRequired={!(referenceSchema.shape.testimonial instanceof ZodOptional)}
              fieldSchema={referenceSchema.shape.testimonial}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.testimonial}
              errors={state.errors?.fieldErrors.testimonial}
              placeholder="Type your testimonial here..."
              rows={2}
            />
          </div>

          <Separator className='mb-3' />

          {state.message && !state.message?.success && (
            <div className={"p-3 rounded-md text-sm bg-red-50 text-red-700 border border-red-200"}>
              {state.message?.message}
            </div>
          )}
          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button disabled={isPending} type='submit' className="flex-1 sm:flex-none text-white">
              <Save className="w-4 h-4" />
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
