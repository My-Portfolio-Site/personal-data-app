"use client"
import { useCallback, useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ZodType, z } from "zod/v4"
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
  if (!date) return undefined
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

interface DatePickerProps {
  label: string
  name: string
  initialDate: string | undefined
  isRequired: boolean
  fieldSchema: ZodType
  disabled?: boolean
  wasSubmitted?: boolean
  errors?: string[]
  [key: string]: any
}

export function DatePicker({
  label,
  name,
  initialDate,
  wasSubmitted,
  isRequired,
  fieldSchema,
  errors,
  disabled = false,
  ...props
}: DatePickerProps) {

  const [date, setDate] = useState<string | undefined>(initialDate)
  const [touched, setTouched] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date ? new Date(date) : undefined)
  console.log('sd:', selectedDate);

  const getErrors = useCallback(() => {
    // Don't validate on first render (when untouched and not submitted)
    if (!touched && !wasSubmitted) return [];
    const validationResult = fieldSchema.safeParse(date)
    return validationResult.success
      ? []
      : z.flattenError(validationResult.error).formErrors
  }, [fieldSchema, date, touched, wasSubmitted])

  console.log('rd:', date);
  const fieldErrors = errors || getErrors()
  const shouldRenderErrors = errors || wasSubmitted || touched
  // console.log(fieldSchema, fieldErrors)

  const handleBlur = () => setTouched(true)

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date">{label} {isRequired && <span className="text-red-500">*</span>}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-invalid={fieldErrors.length > 0 ? 'true' : 'false'}
            variant="outline"
            className={"w-fit justify-start text-left font-normal"}
            disabled={disabled}
            {...props}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDate(selectedDate) || "No date selected"}
          </Button>
        </PopoverTrigger>
        <PopoverContent
        // className="w-auto overflow-hidden p-0"
        // align="end"
        // alignOffset={-8}
        // sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }

            onSelect={(selectedDate) => {
              console.log("esd",selectedDate);
              if (selectedDate) {
                const formattedDate = selectedDate?.getFullYear() + '-' + (selectedDate?.getMonth() + 1).toString().padStart(2, '0') + '-' +
                  selectedDate.getDate().toString().padStart(2, '0');
                setSelectedDate(selectedDate);
                setDate(formattedDate);
                handleBlur()
              }
            }}
          />
        </PopoverContent>
      </Popover>
      {shouldRenderErrors && (
        <span className="text-sm text-destructive">{fieldErrors}</span>
      )}
    </div>
  )
}