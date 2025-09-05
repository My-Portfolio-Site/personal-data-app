"use client"

import { z, ZodOptional, ZodType } from 'zod/v4'
import { useState, useActionState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ValidatedInput, ValidatedTextarea } from "@/components/validated-input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Building, X, Plus, Save, Trash2, CalendarIcon } from "lucide-react"
import type { ProjectSchemaType, ProjectSchemaErrorType } from "@/schemas/project"
import { projectSchema } from "@/schemas/project"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { addProject, updateProject } from "@/app/(resume)/projects/actions"
import { toast } from "sonner"
import { redirect } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProjectFormProps {
  initialData: ProjectSchemaType
  mode: "add" | "edit"
}

export function ProjectForm({
  initialData,
  mode
}: ProjectFormProps) {
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [state, formAction, isPending] = useActionState(mode === 'add' ? addProject : updateProject, {
    data: {
      ...initialData
    },
    errors: { fieldErrors: [], formErrors: [] } as ProjectSchemaErrorType,
    message: null
  })
  // console.log(state.errors)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setWasSubmitted(true)

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const validationResult = projectSchema.safeParse(data)
    
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
    redirect('/projects')
  }

  return (
    <Card className='gap-2'>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          <div>
            <CardTitle>{mode === "add" ? "Add Project" : "Edit Project"}</CardTitle>
            <CardDescription>
              {mode === "add"
                ? "Add new project"
                : "Update your project details"}
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
            <ValidatedInput
              type='text'
              name="title"
              label="Project Title"
              isRequired={!(projectSchema.shape.title instanceof ZodOptional)}
              fieldSchema={projectSchema.shape.title}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.title}
              errors={state.errors?.fieldErrors.title}
              placeholder="e.g., Senior Software Engineer"
              className="max-w-[700px]"
            />

            <ValidatedTextarea
              name='description'
              label='Description'
              type='text'
              isRequired={!(projectSchema.shape.description instanceof ZodOptional)}
              fieldSchema={projectSchema.shape.description}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.description}
              errors={state.errors?.fieldErrors.description}
              placeholder="e.g., San Francisco, CA or Remote"
              rows={2}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <ValidatedInput
                type='text'
                name="role"
                label="Role"
                isRequired={!(projectSchema.shape.role instanceof ZodOptional)}
                fieldSchema={projectSchema.shape.role}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.role}
                errors={state.errors?.fieldErrors.role}
                placeholder="e.g., Developer"
              />
              <ValidatedInput
                type='text'
                name="year"
                label="Year"
                isRequired={!(projectSchema.shape.year instanceof ZodOptional)}
                fieldSchema={projectSchema.shape.year}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.year}
                errors={state.errors?.fieldErrors.year}
                placeholder="e.g., 2021"
              />
              <ValidatedInput
                type='text'
                name="duration"
                label="Duration"
                isRequired={!(projectSchema.shape.duration instanceof ZodOptional)}
                fieldSchema={projectSchema.shape.duration}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.duration}
                errors={state.errors?.fieldErrors.duration}
                placeholder="e.g., 1 year"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatusSelect
                initialStatus={state.data?.status}
                errors={state.errors?.fieldErrors.status}
                wasSubmitted={wasSubmitted}
                fieldSchema={projectSchema.shape.status}
              />

              <ValidatedInput
                type='text'
                name="company"
                label="Company"
                isRequired={!(projectSchema.shape.company instanceof ZodOptional)}
                fieldSchema={projectSchema.shape.company}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.company}
                errors={state.errors?.fieldErrors.company}
                placeholder="e.g., Microsoft, Google"
              />
            </div>
            <ValidatedInput
              type='text'
              name="liveUrl"
              label="Live Url"
              isRequired={!(projectSchema.shape.liveUrl instanceof ZodOptional)}
              fieldSchema={projectSchema.shape.liveUrl}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.liveUrl}
              errors={state.errors?.fieldErrors.liveUrl}
              placeholder="e.g., https://example.com"
            />
            <ValidatedInput
              type='text'
              name="githubUrl"
              label="Github Url"
              isRequired={!(projectSchema.shape.githubUrl instanceof ZodOptional)}
              fieldSchema={projectSchema.shape.githubUrl}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.githubUrl}
              errors={state.errors?.fieldErrors.githubUrl}
              placeholder="e.g., https://github.com/johnsmith/project"
            />

          </div>
          <Separator className='mb-3' />

          {/* Key Features */}
          <div className="space-y-2">
            <div>
              <h3 className="text-md font-semibold">Key Features</h3>
              <p className="text-sm text-muted-foreground">List the key features of this project.</p>
            </div>
            <FeaturesInput featuresString={state.data?.features} />
          </div>

          <Separator className='mb-3' />

          {/* Technologies */}
          <div className="space-y-2">
            <div>
              <h3 className="text-md font-semibold">Technologies Used</h3>
              <p className="text-sm text-muted-foreground">
                Add the technologies and tools you used in this role.
              </p>
            </div>
            <TechnologiesInput technologiesString={state.data?.technologies} />
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




const TechnologiesInput = ({ technologiesString }: { technologiesString: string | undefined }) => {
  // ==================== Technologies
  const [technologies, setTechnologies] = useState<string[]>(technologiesString ? JSON.parse(technologiesString) : [])
  const [newTechnology, setNewTechnology] = useState("")

  const addTechnology = (technology: string) => {
    if (!technology.trim()) return
    if (technologies.includes(technology.trim())) return
    setTechnologies((prev) => [...prev, technology])
    setNewTechnology("")
  }

  const removeTechnology = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index))
  }

  return (
    <>
      <input name='technologies' type='hidden' value={JSON.stringify(technologies)} />
      <div className="space-y-2 max-w-[500px]">
        <div className="flex gap-2 items-center">
          <Textarea
            value={newTechnology}
            onChange={(e) => {
              setNewTechnology(e.target.value)
            }}
            placeholder="Add a new technology..."
            className="flex-1 min-h-[40px] resize-none overflow-hidden"
          />
          <Button type="button" size="sm" onClick={() => addTechnology(newTechnology)} disabled={!newTechnology.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className='space-y-2'>
          <div className="flex flex-wrap gap-2">
            {technologies.map((technology, index) => (
              <Badge key={technology} variant="secondary" className="flex items-center gap-1 py-1 pr-1">
                {technology}
                <ConfirmDialog
                  title="Remove Technology"
                  description={`Are you sure you want to remove "${technology}" technology? This action cannot be undone.`}
                  confirmText="Remove"
                  cancelText="Cancel"
                  onConfirm={() => removeTechnology(index)}
                  variant="destructive"
                >
                  <Button variant="ghost" size="icon" className="size-5 text-destructive hover:text-destructive">
                    <X className="w-3 h-3" />
                  </Button>
                </ConfirmDialog>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}


const FeaturesInput = ({ featuresString }: { featuresString: string | undefined }) => {
  // ==================== Features
  const [features, setFeatures] = useState<string[]>(featuresString ? JSON.parse(featuresString) : [])
  const [newFeature, setNewFeature] = useState("")

  const addFeature = (feature: string) => {
    if (!feature.trim()) return
    if (features.includes(feature.trim())) return
    setFeatures((prev) => [...prev, feature])
    setNewFeature("")
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  return (
    <>
      <input name='features' type='hidden' value={JSON.stringify(features)} />
      <div className="space-y-3 max-w-[500px]">
        <div className="flex gap-2 items-center">
          <Textarea
            value={newFeature}
            onChange={(e) => {
              setNewFeature(e.target.value)
            }}
            placeholder="Add a new feature..."
            className="flex-1 min-h-[40px] resize-none overflow-hidden"
          />
          <Button type="button" size="sm" onClick={() => addFeature(newFeature)} disabled={!newFeature.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className='space-y-2'>
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Textarea
                value={feature}
                onChange={(e) => {
                  const updatedFeatures = [...features]
                  updatedFeatures[index] = e.target.value
                  setFeatures(updatedFeatures)
                }}
                className="flex-1 min-h-[40px] resize-none overflow-hidden"
              />
              <ConfirmDialog
                title="Delete Feature"
                description="Are you sure you want to delete this feature? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={() => removeFeature(index)}
                variant="destructive"
              >
                <Button size="sm" variant="destructive" className="">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </ConfirmDialog>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}


const StatusSelect = ({
  initialStatus,
  errors,
  wasSubmitted,
  fieldSchema
}: {
  initialStatus: string | undefined
  errors?: string[]
  wasSubmitted?: boolean
  fieldSchema: ZodType
}) => {
  const [status, setStatus] = useState<string>(initialStatus || '')

  const [touched, setTouched] = useState(false)

  const statusOptions = [
    { value: 'Completed', title: 'Completed' },
    { value: 'In Progress', title: 'In Progress' },
    { value: 'On Hold', title: 'On Hold' },
  ]

  const getErrors = useCallback(() => {
    // Don't validate on first render (when untouched and not submitted)
    if (!touched && !wasSubmitted) return [];
    const validationResult = fieldSchema.safeParse(status)
    return validationResult.success
      ? []
      : z.flattenError(validationResult.error).formErrors
  }, [fieldSchema, status, touched, wasSubmitted])

  const fieldErrors = errors || getErrors()
  const shouldRenderErrors = errors || wasSubmitted || touched

  const handleBlur = () => setTouched(true)

  return (
    <div className='flex flex-col gap-1.5'>
      <input type="hidden" name="status" value={status || ''} />
      <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
      <Select
        onValueChange={(val) => {
          const option = statusOptions.find((c) => c.value === val)
          if (option) {
            setStatus(option.value)
          }
        }}
        defaultValue={status}
      >
        <SelectTrigger
          className={'max-w-[400px] w-full ' +
            (fieldErrors.length > 0
              ? 'outline-red-500'
              : 'outline-red-500'
            )}
          onBlur={handleBlur}>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {shouldRenderErrors && (
        <span className="text-sm text-destructive">{fieldErrors}</span>
      )}
    </div>
  )
}

