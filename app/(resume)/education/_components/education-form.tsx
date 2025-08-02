"use client"

import { z, ZodOptional } from 'zod/v4'
import { useState, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ValidatedInput, ValidatedTextarea } from "@/components/validated-input"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, X, Plus, Save } from "lucide-react"
import type { EducationSchemaType, EducationSchemaErrorType } from "@/schemas/education"
import { educationSchema } from "@/schemas/education"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { addEducation, updateEducation } from "@/app/(resume)/education/actions"
import { toast } from "sonner"
import { redirect } from 'next/navigation'

interface EducationFormProps {
  initialData: EducationSchemaType
  mode: "add" | "edit"
}

export function EducationForm({
  initialData,
  mode
}: EducationFormProps) {
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [state, formAction, isPending] = useActionState(mode === 'add' ? addEducation : updateEducation, {
    data: {
      ...initialData
    },
    errors: { fieldErrors: [], formErrors: [] } as EducationSchemaErrorType,
    message: null
  })
  // console.log(state.errors)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setWasSubmitted(true)

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const validationResult = educationSchema.safeParse(data)
    if (!validationResult.success) {
      event.preventDefault()
    }
  }

  const [isCurrentEducation, setIsCurrentEducation] = useState(state.data?.endDate === null)

  if (state.message && !state.message?.success) {
    toast.error(state.message?.message)
  }

  if (state.message?.success && wasSubmitted) {
    toast.success(state.message?.message)
    setWasSubmitted(false)
    redirect('/education')
  }

  return (
    <Card className='gap-2'>
      <CardHeader>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          <div>
            <CardTitle>{mode === "add" ? "Add Education" : "Edit Education"}</CardTitle>
            <CardDescription>
              {mode === "add"
                ? "Add your educational background and achievements"
                : "Update your educational details"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <form action={formAction} onSubmit={handleSubmit} noValidate className='space-y-4'>
          <input type="hidden" name="id" value={state.data?.id || ''} />
          <input type="hidden" name="userId" value={state.data?.userId || ''} />
          <ValidatedInput
            type='text'
            name="institution"
            label="Institution"
            isRequired={!(educationSchema.shape.institution instanceof ZodOptional)}
            fieldSchema={educationSchema.shape.institution}
            wasSubmitted={wasSubmitted}
            defaultValue={state.data?.institution}
            errors={state.errors?.fieldErrors.institution}
            placeholder="e.g., Harvard University"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ValidatedInput
              type='text'
              name="degree"
              label="Degree"
              isRequired={!(educationSchema.shape.degree instanceof ZodOptional)}
              fieldSchema={educationSchema.shape.degree}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.degree}
              errors={state.errors?.fieldErrors.degree}
              placeholder="e.g., Master of Science"
            />
            <ValidatedInput
              type='text'
              name="field"
              label="Field"
              isRequired={!(educationSchema.shape.field instanceof ZodOptional)}
              fieldSchema={educationSchema.shape.field}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.field}
              errors={state.errors?.fieldErrors.field}
              placeholder="e.g., Computer Science"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ValidatedInput
              type='text'
              name="location"
              label="Location"
              isRequired={!(educationSchema.shape.location instanceof ZodOptional)}
              fieldSchema={educationSchema.shape.location}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.location}
              errors={state.errors?.fieldErrors.location}
              placeholder="e.g., Massachusetts, USA"
            />
            <ValidatedInput
              type='text'
              name="gpa"
              label="GPA"
              isRequired={!(educationSchema.shape.gpa instanceof ZodOptional)}
              fieldSchema={educationSchema.shape.gpa}
              wasSubmitted={wasSubmitted}
              defaultValue={state.data?.gpa}
              errors={state.errors?.fieldErrors.gpa}
              placeholder="e.g., 3.8"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ValidatedInput
              type='date'
              name="startDate"
              label="Start Date"
              defaultValue={state.data?.startDate}
              fieldSchema={educationSchema.shape.startDate}
              wasSubmitted={wasSubmitted}
              isRequired={true}
              errors={state.errors?.fieldErrors.startDate}
              className="w-fit"
            // disabled={isCurrentEducation}
            />
            <ValidatedInput
              type='date'
              name="endDate"
              label="End Date"
              defaultValue={state.data?.endDate}
              fieldSchema={educationSchema.shape.endDate}
              wasSubmitted={wasSubmitted}
              isRequired={!isCurrentEducation}
              errors={state.errors?.fieldErrors.endDate}
              className="w-fit"
              disabled={isCurrentEducation}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isCurrentEducation"
              checked={isCurrentEducation}
              onCheckedChange={(checked) => {
                // updateField("isCurrentEducation", checked)
                setIsCurrentEducation(Boolean(checked))
              }}
            />
            <Label htmlFor="isCurrentEducation">Ongoing degree</Label>
          </div>

          <Separator className='mb-3' />
          {/* Honors */}
          <div className="space-y-2">
            <div>
              <h3 className="text-lg font-semibold">Honors</h3>
              <p className="text-sm text-muted-foreground">List your major honors and recognitions in this role.</p>
            </div>
            <HonorsInput honorsString={state.data?.honors} />
          </div>

          <Separator className='mb-3' />
          {/* Coursework */}
          <div className="space-y-2 ">
            <div>
              <h3 className="text-lg font-semibold">Relevant Coursework</h3>
              <p className="text-sm text-muted-foreground">List your major coursework in this role.</p>
            </div>
            <CourseworkInput courseworkString={state.data?.coursework} />

          </div>

          <Separator className='mb-3' />
          {/* Activities */}
          <div className="space-y-2 ">
            <div>
              <h3 className="text-lg font-semibold">Activities</h3>
              <p className="text-sm text-muted-foreground">List your extra activities done during study.</p>
            </div>
            <ActivitieskInput activitiesString={state.data?.activities} />

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
    </Card >
  )
}


// ==================== Honors
const HonorsInput = ({ honorsString }: { honorsString: string | undefined }) => {
  const [honors, setHonors] = useState<string[]>(honorsString ? JSON.parse(honorsString) : [])
  const [newHonor, setNewHonor] = useState("")

  const addHonor = (honor: string) => {
    if (!honor.trim()) return
    if (honors.includes(honor.trim())) return
    setHonors((prev) => [...prev, honor])
    setNewHonor("")
  }

  const removeHonor = (index: number) => {
    setHonors(honors.filter((_, i) => i !== index))
  }
  return (
    <>
      <input name='honors' type='hidden' value={JSON.stringify(honors)} />
      <div className="flex gap-2 max-w-[400px] w-full">
        <Input
          id='honors'
          value={newHonor}
          onChange={(e) => setNewHonor(e.target.value)}
          placeholder="e.g., Dean's List..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addHonor(newHonor)
            }
          }}
        />
        <Button type="button" onClick={() => addHonor(newHonor)} disabled={!newHonor.trim()}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {honors.map((honor, index) => (
          <Badge key={honor} variant="secondary" className="flex items-center gap-1 py-1 pr-1">
            {honor}
            <ConfirmDialog
              title="Remove Honor"
              description={`Are you sure you want to remove "${honor}" honor? This action cannot be undone.`}
              confirmText="Remove"
              cancelText="Cancel"
              onConfirm={() => removeHonor(index)}
              variant="destructive"
            >
              <Button variant="ghost" size="icon" className="size-5 text-destructive hover:text-destructive">
                <X className="w-3 h-3" />
              </Button>
            </ConfirmDialog>
          </Badge>
        ))}
      </div>
    </>
  )
}


// ==================== Coursework
const CourseworkInput = ({ courseworkString }: { courseworkString: string | undefined }) => {
  const [coursework, setCoursework] = useState<string[]>(courseworkString ? JSON.parse(courseworkString) : [])
  const [newCourse, setNewCourse] = useState("")

  const addCourse = (course: string) => {
    if (!course.trim()) return
    if (coursework.includes(course.trim())) return
    setCoursework((prev) => [...prev, course])
    setNewCourse("")
  }

  const removeCourse = (index: number) => {
    setCoursework(coursework.filter((_, i) => i !== index))
  }
  return (
    <>
      <input name='coursework' type='hidden' value={JSON.stringify(coursework)} />
      <div className="flex gap-2 max-w-[400px] w-full">
        <Input
          id='coursework'
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          placeholder="e.g., Machine Learning, Data Science..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addCourse(newCourse)
            }
          }}
        />
        <Button type="button" onClick={() => addCourse(newCourse)} disabled={!newCourse.trim()}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {coursework.map((course, index) => (
          <Badge key={course} variant="secondary" className="flex items-center gap-1 py-1 pr-1">
            {course}
            <ConfirmDialog
              title="Remove Course"
              description={`Are you sure you want to remove "${course}" course? This action cannot be undone.`}
              confirmText="Remove"
              cancelText="Cancel"
              onConfirm={() => removeCourse(index)}
              variant="destructive"
            >
              <Button variant="ghost" size="icon" className="size-5 text-destructive hover:text-destructive">
                <X className="w-3 h-3" />
              </Button>
            </ConfirmDialog>
          </Badge>
        ))}
      </div>
    </>
  )
}


// ==================== Activities
const ActivitieskInput = ({ activitiesString }: { activitiesString: string | undefined }) => {
  const [activities, setActivities] = useState<string[]>(activitiesString ? JSON.parse(activitiesString) : [])
  const [newActivity, setNewActivity] = useState("")

  const addActivity = (activity: string) => {
    if (!activity.trim()) return
    if (activities.includes(activity.trim())) return
    setActivities((prev) => [...prev, activity])
    setNewActivity("")
  }

  const removeActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index))
  }
  return (
    <>
      <input name='activities' type='hidden' value={JSON.stringify(activities)} />
      <div className="flex gap-2 max-w-[400px] w-full">
        <Input
          id='activities'
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          placeholder="e.g., ACM Programming Team..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addActivity(newActivity)
            }
          }}
        />
        <Button type="button" onClick={() => addActivity(newActivity)} disabled={!newActivity.trim()}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {activities.map((activity, index) => (
          <Badge key={activity} variant="secondary" className="flex items-center gap-1 py-1 pr-1">
            {activity}
            <ConfirmDialog
              title="Remove Course"
              description={`Are you sure you want to remove "${activity}" activity? This action cannot be undone.`}
              confirmText="Remove"
              cancelText="Cancel"
              onConfirm={() => removeActivity(index)}
              variant="destructive"
            >
              <Button variant="ghost" size="icon" className="size-5 text-destructive hover:text-destructive">
                <X className="w-3 h-3" />
              </Button>
            </ConfirmDialog>
          </Badge>
        ))}
      </div>
    </>
  )
}