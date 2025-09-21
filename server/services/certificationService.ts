import 'server-only';
// import { revalidatePath } from 'next/cache'

import type { CertificationSchemaType } from '@/schemas/certification'
import { fetchApi } from '@/server/utils/fetchWrapper'

// Fetch all certification
export async function fetchCertifications() {
  try {
    const response = await fetchApi('/certification', 'GET')

    if (!response.ok) {
      console.log('Action: Failed to fetch certifications,', 'status:', response.status)
      throw new Error('Failed to fetch certifications')
    }
    const responseData = await response.json() as CertificationSchemaType[];
    return { success: true, data: responseData } as ActionResponse<CertificationSchemaType[]>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}

export async function fetchCertificationById(id: string) {
  try {
    const response = await fetchApi(`/certification/${id}`, 'GET')

    if (!response.ok) {
      console.log('Failed to fetch certification,', 'status:', response.status)
      throw new Error('Failed to fetch certification')
    }

    const responseData = await response.json() as CertificationSchemaType
    return { success: true, data: responseData } as ActionResponse<CertificationSchemaType>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}
