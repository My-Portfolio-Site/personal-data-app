'use server'
import { z } from "zod/v4";
import { revalidatePath } from 'next/cache'

import type { EducationSchemaType, EducationSchemaErrorType } from '@/schemas/education'
import { educationSchema, EducationActionState } from '@/schemas/education'
import { fetchApi } from '@/server/utils/fetchWrapper'

// Add a new education
export async function addEducation(_prev: EducationActionState, formData: FormData): Promise<EducationActionState> {
  const data = Object.fromEntries(formData)
  console.log('Action: Adding education with data:', data);

  const validationResult = educationSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as EducationSchemaType,
      errors: z.flattenError(validationResult.error) as EducationSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi<EducationSchemaType>('/education', 'POST', validationResult.data)

    if (!response.ok) {
      console.log('API Response: Failed to create education,', 'status:', response.status)
      return {
        data: data as EducationSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as EducationSchemaErrorType,
        message: { success: false, message: `Failed to create education.` }
      }
    }

    revalidatePath('/education')
    return {
      data: data as EducationSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as EducationSchemaErrorType,
      message: { success: true, message: 'Education created successfully' }
    }
  } catch (err) {
    console.error('Error updating education:', err)
    return {
      data: data as EducationSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as EducationSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}

// Update an existing education
export async function updateEducation(_prev: EducationActionState, formData: FormData): Promise<EducationActionState> {
  const data = Object.fromEntries(formData)

  console.log("RD:", data)

  const validationResult = educationSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as EducationSchemaType,
      errors: z.flattenError(validationResult.error) as EducationSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi<EducationSchemaType>('/education', 'PUT', validationResult.data)

    if (!response.ok) {
      console.log('Action: Failed to update education with data:', data);

      console.log('API Response: Failed to update education,', 'status:', response.status)
      return {
        data: data as EducationSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as EducationSchemaErrorType,
        message: { success: false, message: `Failed to update education.` }
      }
    }

    revalidatePath('/education')
    return {
      data: data as EducationSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as EducationSchemaErrorType,
      message: { success: true, message: 'Education updated successfully.' }
    }
  } catch (err) {
    console.error('Error creating education:', err)
    return {
      data: data as EducationSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as EducationSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}

// Delete an education
export async function deleteEducationById(id: string) {
  try {
    const response = await fetchApi(`/education?educationId=${id}`, 'DELETE')

    if (!response.ok) {
      console.log('Failed to delete education,', 'status:', response.status)
      throw new Error('Failed to delete education')
    }
    revalidatePath('/education')
    return { message: 'Education deleted successfully', status: 200, success: true } as ActionResponse
  } catch (err) {
    return { message: (err as Error).message, status: 400, success: false } as ActionResponse
  }
}
