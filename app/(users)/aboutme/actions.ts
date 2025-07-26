'use server'
import { z } from "zod/v4";
import { revalidatePath } from 'next/cache'

import type { ProfileSchemaType, ProfileSchemaErrorType } from '@/schemas/profile'
import { ProfileActionState, profileSchema } from '@/schemas/profile'
import { fetchApi } from '@/lib/helpers'
import { redirect, RedirectType } from "next/navigation";

//==============================Profile=====================================//
// Fetch profile
export async function fetchProfile() {
  try {
    const response = await fetchApi('/profile', 'GET')

    if (!response.ok) {
      console.log('Action: Failed to fetch profile,', 'status:', response.status)
      throw new Error('Failed to fetch profile')
    }
    const profileData = await response.json() as ProfileSchemaType;
    return {success: true, data: profileData} as ActionResponse<ProfileSchemaType>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}

// Update profile
export async function updateProfile(_prev: ProfileActionState, formData: FormData): Promise<ProfileActionState> {
  const data = Object.fromEntries(formData)
  const validationResult = profileSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as ProfileSchemaType,
      errors: z.flattenError(validationResult.error) as ProfileSchemaErrorType,
      message: {success: false, message: 'One or more fields are invalid.'}
    }
  }

  try {
    const response = await fetchApi('/profile', 'PUT', validationResult.data)

    if (!response.ok) {
      console.log('API Response: Failed to update profile,', 'status:', response.status)
      return {
        data: data as ProfileSchemaType,
        errors: { fieldErrors: [], formErrors: [] } as ProfileSchemaErrorType,
        message: {success: false, message: `Failed to update profile.`}
      }
    }

    // revalidatePath('/aboutme')
    return {
      data: data as ProfileSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ProfileSchemaErrorType,
      message: {success: true, message: 'Profile updated successfully.'}
    }
  } catch (err) {
    console.error('Error updating profile:', err)
    return {
      data: data as ProfileSchemaType,
      errors: { fieldErrors: [], formErrors: [] } as ProfileSchemaErrorType,
      message: {success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred'}
    }
  }
}

// Create profile
export async function createProfile(_prev: ProfileActionState, formData: FormData): Promise<ProfileActionState> {
  const data = Object.fromEntries(formData)
  const validationResult = profileSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      data: data as ProfileSchemaType,
      errors: z.flattenError(validationResult.error) as ProfileSchemaErrorType,
      message: {success: false, message: 'One or more fields are invalid.'}
    }
  }

  try {
    const response = await fetchApi('/profile', 'POST', validationResult.data)
    if (!response.ok) {
      console.log('API Response: Failed to create profile,', 'status:', response.status)
      return {
        data: data as ProfileSchemaType,
        errors: {fieldErrors: [], formErrors: []} as ProfileSchemaErrorType,
        message: {success: false, message: `Failed to create profile.`}
      }
    }

    revalidatePath('/aboutme')
    return {
      data: data as ProfileSchemaType,
      errors: {fieldErrors: [], formErrors: []} as ProfileSchemaErrorType,
      message: {success: true, message: 'Profile created successfully.'}
    }
  } catch (err) {
    console.error('Error creating profile:', err)
    return {
      data: data as ProfileSchemaType,
      errors: {fieldErrors: [], formErrors: []} as ProfileSchemaErrorType,
      message: {success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred'}
    }
  }
}


//==============================Profile Stats=====================================//
// // Update profile stats
// export async function updateProfileStats(profileStatsData: UpdateProfileStatsData) {
//   try {
//     const cookieStore = await cookies()
//     const cookieHeader = cookieStore.toString()

//     const API_BASE_URL = getCurrentUrl(await headers())
//     const API_PROFILE_URL = API_BASE_URL + '/api/profile/stats'

//     console.log('Updating profile stats...', API_PROFILE_URL)

//     const response = await fetch(API_PROFILE_URL, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Cookie': cookieHeader
//       },
//       body: JSON.stringify(profileStatsData),
//     })

//     if (!response.ok) {
//       console.log('Failed to update profile stats,', 'status:', response.status)
//       throw new Error('Failed to update profile stats')
//     }
//     revalidatePath('/aboutme')
//     return (await response.json()) as ApiResponseMessage;
//   } catch (err) {
//     return { error: (err as Error).message } as ApiError;
//   }
// }