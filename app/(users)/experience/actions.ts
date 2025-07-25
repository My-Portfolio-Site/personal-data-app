'use server'
import { z } from "zod/v4";
import { revalidatePath } from 'next/cache'

import type { ExperienceSchemaType, ExperienceSchemaErrorType } from '@/schemas/experience'
import { experienceSchema, ExperienceActionState } from '@/schemas/experience'
import { fetchApi } from '@/lib/helpers'


//==============================Experience=====================================//
// Fetch all experience
export async function fetchExperiences() {
  try {
    const response = await fetchApi('/experience', {
      method: 'GET'
    })

    if (!response.ok) {
      console.log('Action: Failed to fetch experiences,', 'status:', response.status)
      throw new Error('Failed to fetch experiences')
    }
    return (await response.json()) as ExperienceSchemaType[];
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}

export async function fetchExperienceById(id: string) {
  try {
    console.log('Fetching experience by id:', id)
    const response = await fetchApi(`/experience?experienceId=${id}`, {
      method: 'GET'
    })
    if (!response.ok) {
      console.log('Failed to fetch experience,', 'status:', response.status)
      throw new Error('Failed to fetch experience')
    }
    const responseData = await response.json()
    return responseData as ExperienceSchemaType
  } catch (err) {
    console.log('Error fetching experience by id:', (err as Error).message);
    return { message: (err as Error).message, status: 400, success: false } as ActionResponse
  }
}

// Delete an experience
export async function deleteExperienceById(id: string) {
  try {
    const response = await fetchApi(`/experience?experienceId=${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      console.log('Failed to delete experience,', 'status:', response.status)
      throw new Error('Failed to delete experience')
    }
    return { message: 'Experience deleted successfully', success: true } as ActionResponse
  } catch (err) {
    return { message: (err as Error).message, status: 400, success: false } as ActionResponse
  }
}

// Add a new experience
export async function addExperience(_prev: ExperienceActionState, formData: FormData): Promise<ExperienceActionState> {
  const rawData = Object.fromEntries(formData)

  const data = {
    ...rawData,
    // andle array notation fields
    achievements: Array.from(formData.getAll('achievements[]')),
    technologies: Array.from(formData.getAll('technologies[]')),

    // Handle optional fields
    endDate: rawData.endDate || null,
    description: rawData.description || null
  }

  const validationResult = experienceSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as ExperienceSchemaType,
      errors: z.flattenError(validationResult.error) as ExperienceSchemaErrorType,
      error: null
    }
  }

  try {
    const response = await fetchApi('/experience', {
      method: 'POST',
      body: JSON.stringify(validationResult.data),
    })

    if (!response.ok) {
      console.log('API Response: Failed to create experience,', 'status:', response.status)
      return {
        data: data as ExperienceSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
        error: `Failed to create experience. Status: ${response.status}`
      }
    }

    revalidatePath('/experience')
    return {
      data: data as ExperienceSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
      error: null
    }
  } catch (err) {
    console.error('Error updating experience:', err)
    return {
      data: data as ExperienceSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
      error: err instanceof Error ? err.message : 'An unexpected error occurred'
    }
  }
}


// Update an existing experience
export async function updateExperience(_prev: ExperienceActionState, formData: FormData): Promise<ExperienceActionState> {
  const rawData = Object.fromEntries(formData)

  const data = {
    ...rawData,
    // andle array notation fields
    achievements: Array.from(formData.getAll('achievements[]')),
    technologies: Array.from(formData.getAll('technologies[]')),

    // Handle optional fields
    endDate: rawData.endDate || null,
    description: rawData.description || null
  }
  
  const validationResult = experienceSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as ExperienceSchemaType,
      errors: z.flattenError(validationResult.error) as ExperienceSchemaErrorType,
      error: null
    }
  }

  try {
    const response = await fetchApi('/experience', {
      method: 'PUT',
      body: JSON.stringify(validationResult.data),
    })

    if (!response.ok) {
      console.log('API Response: Failed to update experience,', 'status:', response.status)
      return {
        data: data as ExperienceSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
        error: `Failed to update experience. Status: ${response.status}`
      }
    }

    revalidatePath('/experience')
    return {
      data: data as ExperienceSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
      error: null
    }
  } catch (err) {
    console.error('Error creating experience:', err)
    return {
      data: data as ExperienceSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
      error: err instanceof Error ? err.message : 'An unexpected error occurred'
    }
  }
}