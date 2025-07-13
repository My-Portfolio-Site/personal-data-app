'use server'

import { getCurrentUrl } from '@/lib/helpers'
import { headers, cookies } from 'next/headers'
import { deleteExperienceSchema, Experience, ExperienceFormSchema, ExperienceFormData, ExperienceSchema } from '@/schemas/experience'
import { revalidatePath } from 'next/cache'


//==============================Experience=====================================//
// Fetch all experience
export async function fetchAllUserExperience() {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    const API_BASE_URL = getCurrentUrl(await headers())
    const API_EXPERIENCE_URL = API_BASE_URL + '/api/experience'
    
    console.log('Fetching all experience...', API_EXPERIENCE_URL)

    const response = await fetch(API_EXPERIENCE_URL, { method: 'GET', headers: { 'Cookie': cookieHeader } })
    // if (!response.ok) {
    //   console.log(response?.error', 'status:', response.status)
    //   throw new Error('Failed to fetch experience')
    // }
    return (await response.json()) as Experience[]
  } catch (err) {
    return { error: (err as Error).message } as ApiError
  }
}

export async function fetchExperienceById(id: string){
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    const API_BASE_URL = getCurrentUrl(await headers())
    const API_EXPERIENCE_URL = API_BASE_URL + '/api/experience'

    console.log('Fetching experience by id:', id)
    const response = await fetch(`${API_EXPERIENCE_URL}?experienceId=${id}`, { method: 'GET', headers: { 'Cookie': cookieHeader } })
    if (!response.ok) {
      console.log('Failed to fetch experience,', 'status:', response.status)
      throw new Error('Failed to fetch experience')
    }
    const responseData = await response.json()
    console.log('Fetched experience from DB:', responseData)
    return responseData as Experience
  } catch (err) {
    console.log('Error fetching experience:', err)
    return { error: (err as Error).message, status: 400 } as ApiError
  }
}

// Delete an invite
export async function deleteExperienceById(id: string) {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    const API_BASE_URL = getCurrentUrl(await headers())
    const API_EXPERIENCE_URL = API_BASE_URL + '/api/experience'

    const parsedData = deleteExperienceSchema.parse({ id })
    const response = await fetch(API_EXPERIENCE_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader },
      body: JSON.stringify(parsedData),
    })
    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(error.error || 'Failed to delete invite')
    }
    revalidatePath('/experience')
    return (await response.json()) as ApiResponseMessage
  } catch (err) {
    return { error: (err as Error).message } as ApiError
  }
}

// Add a new experience
export async function createExperience(data: ExperienceFormData) {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    const API_BASE_URL = getCurrentUrl(await headers())
    const API_EXPERIENCE_URL = API_BASE_URL + '/api/experience'

    const parsedData = ExperienceFormSchema.parse(data)

    console.log('Creating experience: ', parsedData)
    const response = await fetch(API_EXPERIENCE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader },
      body: JSON.stringify(parsedData),
    })
    if (!response.ok) {
      const error: ApiError = await response.json()
      console.log('Failed to create experience: ', error)
      throw new Error(error.error || 'Failed to create experience')
    }
    revalidatePath('/experience')
    return (await response.json()) as ApiResponseMessage
  } catch (err) {
    return { error: (err as Error).message } as ApiError
  }
}

// Update an invite
export async function updateExperience(data: Experience) {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_EXPERIENCE_URL = API_BASE_URL + '/api/experience'

    const parsedData = ExperienceSchema.parse(data)
    const response = await fetch(API_EXPERIENCE_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader },
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