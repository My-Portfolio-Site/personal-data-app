'use server'
import { getCurrentUrl } from '@/lib/helpers'
import { headers } from 'next/headers'
import { ExperienceSchema, Experience } from '@/schemas/experience'


// Update an invite
export async function updateExperience(data: Experience) {
  try {
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_EXPERIENCE_URL = API_BASE_URL + '/api/experience'

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