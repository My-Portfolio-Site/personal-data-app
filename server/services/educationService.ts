import 'server-only';
// import { revalidatePath } from 'next/cache'

import type { EducationSchemaType } from '@/schemas/education'
import { fetchApi } from '@/server/utils/fetchWrapper'

// Fetch all education
export async function fetchEducations() {
  try {
    const response = await fetchApi('/education', 'GET')

    if (!response.ok) {
      console.log('Action: Failed to fetch educations,', 'status:', response.status)
      throw new Error('Failed to fetch educations')
    }
    const responseData = await response.json() as EducationSchemaType[];
    return { success: true, data: responseData } as ActionResponse<EducationSchemaType[]>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}

export async function fetchEducationById(id: string) {
  try {
    const response = await fetchApi(`/education/${id}`, 'GET')

    if (!response.ok) {
      console.log('Failed to fetch education,', 'status:', response.status)
      throw new Error('Failed to fetch education')
    }

    const responseData = await response.json() as EducationSchemaType
    return { success: true, data: responseData } as ActionResponse<EducationSchemaType>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}
