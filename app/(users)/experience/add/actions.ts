'use server'
import { getCurrentUrl } from '@/lib/helpers'
import { headers } from 'next/headers'
import {ExperienceFormSchema, ExperienceFormData} from '@/schemas/experience'


// Add a new experience
export async function createExperience(data: ExperienceFormData) {
  try {
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_EXPERIENCE_URL = API_BASE_URL + '/api/experience'

    const parsedData = ExperienceFormSchema.parse(data)

    console.log('Creating experience: ', parsedData)
    const response = await fetch(API_EXPERIENCE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedData),
    })
    if (!response.ok) {
      const error: ApiError = await response.json()
      console.log('Failed to create experience: ', error)
      throw new Error('Failed to create experience')
    }
    return (await response.json()) as ApiResponseMessage
  } catch (err) {
    return { error: (err as Error).message } as ApiError
  }
}
