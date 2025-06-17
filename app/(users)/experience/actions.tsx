'use server'

import {createExperienceSchema, updateExperienceSchema, deleteExperienceSchema, Experience, ExperienceSchema,  CreateExperience, UpdateExperience} from '@/schemas/experience'


type ApiError = {
  error: string
  status?: number
}
type ApiResponseMessage = {
  message: string
  status?: number
}
// Base URL for the API
const API_BASE_URL = 'http://localhost:3000/api'

//==============================Experience=====================================//
const API_EXPERIENCE_URL = API_BASE_URL + '/experience'
// Fetch all experience
export async function fetchAllExperience() {
  try {
    console.log('Fetching all experience...', API_EXPERIENCE_URL)

    const response = await fetch(API_EXPERIENCE_URL, { method: 'GET' })
    if (!response.ok) {
      console.log('Failed to fetch experience,', 'status:', response.status)
      throw new Error('Failed to fetch experience')
    }
    return (await response.json()) as Experience[]
  } catch (err) {
    return { error: (err as Error).message } as ApiError
  }
}

export async function fetchExperienceById(id: string){
  try {
    console.log('Fetching experience by id:', id)
    const response = await fetch(`${API_EXPERIENCE_URL}?experienceId=${id}`, { method: 'GET' })
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

// Add a new invite
export async function createExperience(data: CreateExperience) {
  try {
    const parsedData = createExperienceSchema.parse(data)

    console.log('Creating invite: ', parsedData)
    const response = await fetch(API_EXPERIENCE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedData),
    })
    if (!response.ok) {
      const error: ApiError = await response.json()
      console.log('Failed to create invite: ', error)
      throw new Error('Failed to create invite')
    }
    return (await response.json()) as ApiResponseMessage
  } catch (err) {
    return { error: (err as Error).message } as ApiError
  }
}

// Update an invite
export async function updateExperience(data: UpdateExperience) {
  try {
    const parsedData = updateExperienceSchema.parse(data)
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

// Delete an invite
export async function deleteExperience(id: string) {
  try {
    const parsedData = deleteExperienceSchema.parse({ id })
    const response = await fetch(API_EXPERIENCE_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedData),
    })
    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(error.error || 'Failed to delete invite')
    }
    return (await response.json()) as ApiResponseMessage
  } catch (err) {
    return { error: (err as Error).message } as ApiError
  }
}
