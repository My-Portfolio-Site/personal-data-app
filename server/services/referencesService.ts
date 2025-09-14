import 'server-only';

import type { ReferenceSchemaType } from '@/schemas/reference'
import { fetchApi } from '@/server/utils/fetchWrapper'

// Fetch all references
export async function fetchReferences() {
  try {
    const response = await fetchApi('/references', 'GET')

    if (!response.ok) {
      console.log('Action: Failed to fetch references,', 'status:', response.status)
      throw new Error('Failed to fetch references')
    }
    const responseData = await response.json() as ReferenceSchemaType[];
    return { success: true, data: responseData } as ActionResponse<ReferenceSchemaType[]>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}

// Fetch a reference by ID
export async function fetchReferenceById(id: string) {
  try {
    const response = await fetchApi(`/references/${id}`, 'GET')

    if (!response.ok) {
      console.log('Failed to fetch reference,', 'status:', response.status)
      throw new Error('Failed to fetch reference')
    }

    const responseData = await response.json() as ReferenceSchemaType
    return { success: true, data: responseData } as ActionResponse<ReferenceSchemaType>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}

