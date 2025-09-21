'use server'
import { z } from "zod/v4";
import { revalidatePath } from 'next/cache'

import type { CertificationSchemaType, CertificationSchemaErrorType } from '@/schemas/certification'
import { certificationSchema, CertificationActionState } from '@/schemas/certification'
import { fetchApi } from '@/server/utils/fetchWrapper'

// Add a new certification
export async function addCertification(_prev: CertificationActionState, formData: FormData): Promise<CertificationActionState> {
  const data = Object.fromEntries(formData)
  console.log('Action: Adding certification with data:', data);

  const validationResult = certificationSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as CertificationSchemaType,
      errors: z.flattenError(validationResult.error) as CertificationSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi<CertificationSchemaType>('/certification', 'POST', validationResult.data)

    if (!response.ok) {
      console.log('API Response: Failed to create certification,', 'status:', response.status)
      return {
        data: data as CertificationSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as CertificationSchemaErrorType,
        message: { success: false, message: `Failed to create certification.` }
      }
    }

    revalidatePath('/certification')
    return {
      data: data as CertificationSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as CertificationSchemaErrorType,
      message: { success: true, message: 'Certification created successfully' }
    }
  } catch (err) {
    console.error('Error updating certification:', err)
    return {
      data: data as CertificationSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as CertificationSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}

// Update an existing certification
export async function updateCertification(_prev: CertificationActionState, formData: FormData): Promise<CertificationActionState> {
  const data = Object.fromEntries(formData)

  console.log("RD:", data)

  const validationResult = certificationSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as CertificationSchemaType,
      errors: z.flattenError(validationResult.error) as CertificationSchemaErrorType,
      message: { success: false, message: 'One or more fields are invalid.' }
    }
  }

  try {
    const response = await fetchApi<CertificationSchemaType>('/certification', 'PUT', validationResult.data)

    if (!response.ok) {
      console.log('Action: Failed to update certification with data:', data);

      console.log('API Response: Failed to update certification,', 'status:', response.status)
      return {
        data: data as CertificationSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as CertificationSchemaErrorType,
        message: { success: false, message: `Failed to update certification.` }
      }
    }

    revalidatePath('/certification')
    return {
      data: data as CertificationSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as CertificationSchemaErrorType,
      message: { success: true, message: 'Certification updated successfully.' }
    }
  } catch (err) {
    console.error('Error creating certification:', err)
    return {
      data: data as CertificationSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as CertificationSchemaErrorType,
      message: { success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' }
    }
  }
}

// Delete an certification
export async function deleteCertificationById(id: string) {
  try {
    const response = await fetchApi(`/certification?certificationId=${id}`, 'DELETE')

    if (!response.ok) {
      console.log('Failed to delete certification,', 'status:', response.status)
      throw new Error('Failed to delete certification')
    }
    revalidatePath('/certification')
    return { message: 'Certification deleted successfully', status: 200, success: true } as ActionResponse
  } catch (err) {
    return { message: (err as Error).message, status: 400, success: false } as ActionResponse
  }
}
