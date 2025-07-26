'use client'

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"
import { ZodType, z } from "zod/v4"

interface ValidatedInputProps {
  name: string
  label: string
  wasSubmitted?: boolean
  errors?: string[]
  fieldSchema: ZodType
  isRequired: boolean
  defaultValue?: string
  [key: string]: any
}

const ValidatedInput = ({
  name,
  label,
  wasSubmitted,
  errors,
  fieldSchema,
  isRequired = false,
  defaultValue,
  ...props
}: ValidatedInputProps) => {
  const [value, setValue] = useState(defaultValue || "")
  const [touched, setTouched] = useState(false)

  const getErrors = useCallback(() => {
    // Don't validate on first render (when untouched and not submitted)
    if (!touched && !wasSubmitted) return [];
    const validationResult = fieldSchema.safeParse(value)
    
    return validationResult.success
      ? []
      : z.flattenError(validationResult.error).formErrors
  }, [fieldSchema, value, touched, wasSubmitted])

  const fieldErrors = errors || getErrors()
  const shouldRenderErrors = errors || wasSubmitted || touched
  // console.log(fieldSchema, fieldErrors)

  const handleBlur = () => setTouched(true)
  const handleChange = (e: any) => setValue(e.currentTarget.value)

  return (
    <>
      <Label htmlFor={name}>{label} {isRequired && <span className="text-red-500">*</span>}</Label>
      <Input
        id={name}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        className={fieldErrors.length > 0 ? "border-destructive" : ""}
        defaultValue={value}
        {...props}
      />
      {shouldRenderErrors && (
        <span className="text-sm text-destructive">{fieldErrors}</span>
      )}
    </>
  )
}

const ValidatedTextarea = ({
  name,
  label,
  wasSubmitted,
  errors,
  fieldSchema,
  isRequired = false,
  defaultValue,
  ...props
}: ValidatedInputProps) => {
  const [value, setValue] = useState(defaultValue || "")
  const [touched, setTouched] = useState(false)

  const getErrors = useCallback(() => {
    // Don't validate on first render (when untouched and not submitted)
    if (!touched && !wasSubmitted) return [];
    const validationResult = fieldSchema.safeParse(value)
    return validationResult.success
      ? []
      : z.flattenError(validationResult.error).formErrors
  }, [fieldSchema, value, touched, wasSubmitted])

  const fieldErrors = errors || getErrors()
  const shouldRenderErrors = errors || wasSubmitted || touched

  const handleBlur = () => setTouched(true)
  const handleChange = (e: any) => setValue(e.currentTarget.value)

  return (
    <>
      <Label htmlFor={name}>{label} {isRequired && <span className="text-red-500">*</span>}</Label>
      <Textarea
        id={name}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        defaultValue={value}
        className={
          fieldErrors.length > 0
            ? 'outline-red-500'
            : 'outline-red-500'
        }
        {...props}
      />
      {shouldRenderErrors && (
        <span className="text-sm text-destructive">{fieldErrors}</span>
      )}
    </>
  )
}
export { ValidatedInput, ValidatedTextarea }