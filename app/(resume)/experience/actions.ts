'use server'
import { z } from "zod/v4";
import { revalidatePath } from 'next/cache'

import type { ExperienceSchemaType, ExperienceSchemaErrorType } from '@/schemas/experience'
import { experienceSchema, ExperienceActionState } from '@/schemas/experience'
import { fetchApi } from '@/server/utils/fetchWrapper'

// Add a new experience
export async function addExperience(_prev: ExperienceActionState, formData: FormData): Promise<ExperienceActionState> {
  const data = Object.fromEntries(formData)
  console.log('Action: Adding experience with data:', data);

  const validationResult = experienceSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as ExperienceSchemaType,
      errors: z.flattenError(validationResult.error) as ExperienceSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi<ExperienceSchemaType>('/experience', 'POST', validationResult.data)

    if (!response.ok) {
      console.log('API Response: Failed to create experience,', 'status:', response.status)
      return {
        data: data as ExperienceSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
        message: { success: false, message: `Failed to create experience.` }
      }
    }

    revalidatePath('/experience')
    return {
      data: data as ExperienceSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
      message: { success: true, message: 'Experience created successfully' }
    }
  } catch (err) {
    console.error('Error creating experience:', err)
    return {
      data: data as ExperienceSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}

// Update an existing experience
export async function updateExperience(_prev: ExperienceActionState, formData: FormData): Promise<ExperienceActionState> {
  const data = Object.fromEntries(formData)

  console.log("RD:", data)

  const validationResult = experienceSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as ExperienceSchemaType,
      errors: z.flattenError(validationResult.error) as ExperienceSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi<ExperienceSchemaType>('/experience', 'PUT', validationResult.data)

    if (!response.ok) {
      console.log('Action: Failed to update experience with data:', data);

      console.log('API Response: Failed to update experience,', 'status:', response.status)
      return {
        data: data as ExperienceSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
        message: { success: false, message: `Failed to update experience.` }
      }
    }

    revalidatePath('/experience')
    return {
      data: data as ExperienceSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
      message: { success: true, message: 'Experience updated successfully.' }
    }
  } catch (err) {
    console.error('Error creating experience:', err)
    return {
      data: data as ExperienceSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}

// Delete an experience
export async function deleteExperienceById(id: string) {
  try {
    const response = await fetchApi(`/experience?experienceId=${id}`, 'DELETE')

    if (!response.ok) {
      console.log('Failed to delete experience,', 'status:', response.status)
      throw new Error('Failed to delete experience')
    }
    revalidatePath('/experience')
    return { message: 'Experience deleted successfully', status: 200, success: true } as ActionResponse
  } catch (err) {
    return { message: (err as Error).message, status: 400, success: false } as ActionResponse
  }
}