"use client"

import { z, ZodOptional, ZodType } from 'zod/v4'
import { useState, useActionState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ValidatedInput, ValidatedTextarea } from "@/components/validated-input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Building, X, Plus, Save, Trash2, CalendarIcon } from "lucide-react"
import type { SkillSchemaType, SkillSchemaErrorType } from "@/schemas/skill"
import { skillSchema } from "@/schemas/skill"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { addSkill, updateSkill } from "@/app/(resume)/skills/actions"
import { toast } from "sonner"
import { redirect } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SkillFormProps {
  initialData: SkillSchemaType
  mode: "add" | "edit"
}

// category field map
const categoryOptions = [
  { title: "Programming Languages", value: "languages" },
  { title: "Frameworks & Libraries", value: "frameworks" },
  { title: "Tools & Technologies", value: "tools" },
  { title: "Core Competencies", value: "competencies" },
  { title: "Soft Skills", value: "soft" },
]

export function SkillForm({
  initialData,
  mode
}: SkillFormProps) {
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [state, formAction, isPending] = useActionState(mode === 'add' ? addSkill : updateSkill, {
    data: {
      ...initialData
    },
    errors: { fieldErrors: [], formErrors: [] } as SkillSchemaErrorType,
    message: null
  })


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setWasSubmitted(true)

    const formData = new FormData(event.currentTarget)
    
    const data = Object.fromEntries(formData)
    // console.log(data);
    
    const validationResult = skillSchema.safeParse(data)
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
    redirect('/skills')
  }

  return (
    <Card className='gap-2'>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          <div>
            <CardTitle>{mode === "add" ? "Add New Skill" : "Edit Skill"}</CardTitle>
            <CardDescription>
              {mode === "add"
                ? "Add your professional skills and expertise"
                : "Update your skill details"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <form action={formAction} onSubmit={handleSubmit} noValidate className='space-y-4'>
          <input type="hidden" name="id" value={state.data?.id || ''} />
          <input type="hidden" name="userId" value={state.data?.userId || ''} />
          <div className="space-y-4">
            <ValidatedInput
              type='text'
              name="name"
              label="Title"
              isRequired={!(skillSchema.shape.name instanceof ZodOptional)}
              fieldSchema={skillSchema.shape.name}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.name}
              errors={state.errors?.fieldErrors.name}
              placeholder="e.g., Python, ReactJs, MongoDB..."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CategorySelect
                initialDataCategory={state.data?.category}
                errors={state.errors?.fieldErrors.category}
                wasSubmitted={wasSubmitted}
                fieldSchema={skillSchema.shape.category}
              />
              <ValidatedInput
                type='text'
                name="level"
                label="Skill Level (0 - 100)"
                isRequired={!(skillSchema.shape.level instanceof ZodOptional)}
                fieldSchema={skillSchema.shape.level}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.level}
                errors={state.errors?.fieldErrors.level}
                placeholder="e.g., 40, 70, 90..."
              />
            </div>
            <div className="space-y-2">
              <ValidatedTextarea
                name='description'
                label='Description'
                type='text'
                isRequired={!(skillSchema.shape.description instanceof ZodOptional)}
                fieldSchema={skillSchema.shape.description}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.description}
                errors={state.errors?.fieldErrors.description}
                placeholder="e.g., San Francisco, CA or Remote"
                rows={2}
              />
            </div>
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


const CategorySelect = ({
  initialDataCategory,
  errors,
  wasSubmitted,
  fieldSchema
}: {
  initialDataCategory: string | undefined
  errors?: string[]
  wasSubmitted?: boolean
  fieldSchema: ZodType
}) => {
  const [category, setCategory] = useState<string>(initialDataCategory || '')

  const [touched, setTouched] = useState(false)

  const getErrors = useCallback(() => {
    // Don't validate on first render (when untouched and not submitted)
    if (!touched && !wasSubmitted) return [];
    const validationResult = fieldSchema.safeParse(category)
    return validationResult.success
      ? []
      : z.flattenError(validationResult.error).formErrors
  }, [fieldSchema, category, touched, wasSubmitted])

  const fieldErrors = errors || getErrors()
  const shouldRenderErrors = errors || wasSubmitted || touched

  const handleBlur = () => setTouched(true)

  return (
    <div className='flex flex-col gap-2'>
      <input type="hidden" name="category" value={category || ''} />
      <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
      <Select
        onValueChange={(val) => {
          const option = categoryOptions.find((c) => c.value === val)
          if (option) {
            setCategory(option.value)
          }
        }}
        defaultValue={category}
      >
        <SelectTrigger
          className={'w-full ' +
            (fieldErrors.length > 0
              ? 'outline-red-500'
              : 'outline-red-500'
            )} 
        onBlur={handleBlur}>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categoryOptions.map((opt) => (
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

