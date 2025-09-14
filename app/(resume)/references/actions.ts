'use server'
import { z } from "zod/v4";
import { revalidatePath } from 'next/cache'

import type { ReferenceSchemaType, ReferenceSchemaErrorType } from '@/schemas/reference'
import { referenceSchema, ReferenceActionState } from '@/schemas/reference'
import { fetchApi } from '@/server/utils/fetchWrapper'

// Add a new reference
export async function addReference(_prev: ReferenceActionState, formData: FormData): Promise<ReferenceActionState> {
  const data = Object.fromEntries(formData)

  console.log('Action: Adding reference with data:', data);

  const validationResult = referenceSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as ReferenceSchemaType,
      errors: z.flattenError(validationResult.error) as ReferenceSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi<ReferenceSchemaType>('/references', 'POST', validationResult.data)

    if (!response.ok) {
      console.log('API Response: Failed to create reference,', 'status:', response.status)
      return {
        data: data as ReferenceSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as ReferenceSchemaErrorType,
        message: { success: false, message: `Failed to create reference.` }
      }
    }

    revalidatePath('/references')
    return {
      data: data as ReferenceSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ReferenceSchemaErrorType,
      message: { success: true, message: 'Reference created successfully' }
    }
  } catch (err) {
    console.error('Error creating reference:', err)
    return {
      data: data as ReferenceSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ReferenceSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}

// Update an existing reference
export async function updateReference(_prev: ReferenceActionState, formData: FormData): Promise<ReferenceActionState> {
  const data = Object.fromEntries(formData)

  console.log("RD:", data)

  const validationResult = referenceSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as ReferenceSchemaType,
      errors: z.flattenError(validationResult.error) as ReferenceSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi<ReferenceSchemaType>('/references', 'PUT', validationResult.data)

    if (!response.ok) {
      console.log('Action: Failed to update reference with data:', data);

      console.log('API Response: Failed to update reference,', 'status:', response.status)
      return {
        data: data as ReferenceSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as ReferenceSchemaErrorType,
        message: { success: false, message: `Failed to update reference.` }
      }
    }

    revalidatePath('/references')
    return {
      data: data as ReferenceSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ReferenceSchemaErrorType,
      message: { success: true, message: 'Reference updated successfully.' }
    }
  } catch (err) {
    console.error('Error creating reference:', err)
    return {
      data: data as ReferenceSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ReferenceSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}

// Delete an reference
export async function deleteReferenceById(id: string) {
  try {
    const response = await fetchApi(`/references/${id}`, 'DELETE')

    if (!response.ok) {
      console.log('Failed to delete reference,', 'status:', response.status)
      throw new Error('Failed to delete reference')
    }
    revalidatePath('/references')
    return { message: 'Reference deleted successfully', status: 200, success: true } as ActionResponse
  } catch (err) {
    return { message: (err as Error).message, status: 400, success: false } as ActionResponse
  }
}