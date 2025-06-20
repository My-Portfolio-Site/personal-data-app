'use server'
import { ExperienceSchema, Experience } from '@/schemas/experience'
import { getCloudflareContext } from "@opennextjs/cloudflare";

type ApiError = {
  error: string
  status?: number
}
type ApiResponseMessage = {
  message: string
  status?: number
}

// Update an invite
export async function updateExperience(data: Experience) {
  try {
    const { env } = await getCloudflareContext({ async: true })
    const API_BASE_URL = env.API_URL
    const API_EXPERIENCE_URL = API_BASE_URL + '/experience'

    const parsedData = ExperienceSchema.parse(data)
    const response = await fetch(API_EXPERIENCE_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedData),
    })
    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(error.error || 'Failed to update invite')
    }
    return (await response.json()) as ApiResponseMessage
  } catch (err) {
    return { error: (err as Error).message } as ApiError
  }
}