'use server'

import { getCurrentUrl } from '@/lib/helpers'
import { headers } from 'next/headers'
import { deleteExperienceSchema, Experience} from '@/schemas/experience'


//==============================Experience=====================================//
// Fetch all experience
export async function fetchAllExperience() {
  try {
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_EXPERIENCE_URL = API_BASE_URL + '/api/experience'
    
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
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_EXPERIENCE_URL = API_BASE_URL + '/api/experience'
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

// Get total experience in years
// export async function getTotalExperience() {
//   try {
//     const experiences = await fetchAllExperience()
//     if ('error' in experiences) {
//       throw new Error(experiences.error)
//     }
//     const totalExperience = experiences.reduce((total, exp) => total + (exp.years || 0), 0)

//     return totalExperience
//   } catch (err) {
//     return { error: (err as Error).message } as ApiError
//   }
// }

// Delete an invite
export async function deleteExperience(id: string) {
  try {
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_EXPERIENCE_URL = API_BASE_URL + '/api/experience'

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
