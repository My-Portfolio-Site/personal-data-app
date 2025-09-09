import 'server-only';


import type { ExperienceSchemaType } from '@/schemas/experience'
import { fetchApi } from '@/server/utils/fetchWrapper'

// Fetch all experience
export async function fetchExperiences() {
  try {
    const response = await fetchApi('/experience', 'GET')

    if (!response.ok) {
      console.log('Server: Failed to fetch experiences,', 'status:', response.status)
      throw new Error('Failed to fetch experiences')
    }
    const responseData = await response.json() as ExperienceSchemaType[];
    return { success: true, data: responseData } as ActionResponse<ExperienceSchemaType[]>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}

// Fetch an experience by ID
export async function fetchExperienceById(id: string) {
  try {
    const response = await fetchApi(`/experience?experienceId=${id}`, 'GET')

    if (!response.ok) {
      console.log('Server: Failed to fetch experience,', 'status:', response.status)
      throw new Error('Failed to fetch experience')
    }

    const responseData = await response.json() as ExperienceSchemaType
    return { success: true, data: responseData } as ActionResponse<ExperienceSchemaType>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}

