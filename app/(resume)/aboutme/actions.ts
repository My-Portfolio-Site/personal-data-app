'use server'
import { z } from "zod/v4";
import { revalidatePath } from 'next/cache'

import type { AboutmeSchemaType, AboutmeSchemaErrorType } from '@/schemas/aboutme'
import { AboutmeActionState, aboutmeSchema } from '@/schemas/aboutme'
import { fetchApi } from '@/server/utils/fetchWrapper'

//==============================Aboutme=====================================//
// Fetch Aboutme
export async function fetchAboutme() {
  try {
    const response = await fetchApi('/aboutme', 'GET')

    if (!response.ok) {
      console.log('Action: Failed to fetch Aboutme,', 'status:', response.status)
      throw new Error('Failed to fetch Aboutme')
    }
    const AboutmeData = await response.json() as AboutmeSchemaType;
    return { success: true, data: AboutmeData } as ActionResponse<AboutmeSchemaType>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}

// Update Aboutme
export async function updateAboutme(_prev: AboutmeActionState, formData: FormData): Promise<AboutmeActionState> {
  const data = Object.fromEntries(formData)
  const validationResult = aboutmeSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as AboutmeSchemaType,
      errors: z.flattenError(validationResult.error) as AboutmeSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi('/aboutme', 'PUT', validationResult.data)

    if (!response.ok) {
      console.log('API Response: Failed to update Aboutme,', 'status:', response.status)
      return {
        data: data as AboutmeSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as AboutmeSchemaErrorType,
        message: { success: false, message: `Failed to update Aboutme.` }
      }
    }

    revalidatePath('/aboutme')
    return {
      data: data as AboutmeSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as AboutmeSchemaErrorType,
      message: { success: true, message: 'Aboutme updated successfully.' }
    }
  } catch (err) {
    console.error('Error updating Aboutme:', err)
    return {
      data: data as AboutmeSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as AboutmeSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}

// Create Aboutme
export async function createAboutme(_prev: AboutmeActionState, formData: FormData): Promise<AboutmeActionState> {
  const data = Object.fromEntries(formData)
  const validationResult = aboutmeSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as AboutmeSchemaType,
      errors: z.flattenError(validationResult.error) as AboutmeSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi('/aboutme', 'POST', validationResult.data)
    if (!response.ok) {
      console.log('API Response: Failed to create Aboutme,', 'status:', response.status)
      return {
        data: data as AboutmeSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as AboutmeSchemaErrorType,
        message: { success: false, message: `Failed to create Aboutme.` }
      }
    }

    revalidatePath('/aboutme')
    return {
      data: data as AboutmeSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as AboutmeSchemaErrorType,
      message: { success: true, message: 'Aboutme created successfully.' }
    }
  } catch (err) {
    console.error('Error creating Aboutme:', err)
    return {
      data: data as AboutmeSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as AboutmeSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}