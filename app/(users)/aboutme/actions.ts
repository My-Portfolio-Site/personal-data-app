'use server'

import { getCurrentUrl } from '@/lib/helpers'
import { headers } from 'next/headers'
import { ProfileSchema, Profile, ProfileUpdateData, ProfileUpdateSchema, ProfileStatsUpdateData } from '@/schemas/profile'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

//==============================Profile=====================================//
// Fetch profile
export async function fetchProfile() {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    const API_BASE_URL = getCurrentUrl(await headers())
    const API_PROFILE_URL = API_BASE_URL + '/api/profile'

    console.log('Fetching profile...', API_PROFILE_URL)

    const response = await fetch(API_PROFILE_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader }
    })
    if (!response.ok) {
      console.log('Failed to fetch profile,', 'status:', response.status)
      throw new Error('Failed to fetch profile')
    }
    return (await response.json()) as Profile;
  } catch (err) {
    return { error: (err as Error).message } as ApiError;
  }
}

// Update profile
export async function updateProfile(profileData: ProfileUpdateData) {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    const API_BASE_URL = getCurrentUrl(await headers())
    const API_PROFILE_URL = API_BASE_URL + '/api/profile'

    console.log('Updating profile...', API_PROFILE_URL)

    console.log('Update Profile Action:: submitted data: ', profileData);
    const parsedData = ProfileUpdateSchema.safeParse(profileData)

    const response = await fetch(API_PROFILE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader
      },
      body: JSON.stringify(parsedData),
    })

    if (!response.ok) {
      console.log('Failed to update profile,', 'status:', response.status)
      throw new Error('Failed to update profile')
    }
    revalidatePath('/aboutme')
    // If you expect a data payload, specify the type, e.g. ActionResponse<Profile>
    return (await response.json()) as Profile;
  } catch (err) {
    return { error: (err as Error).message } as ApiError;
  }
}

//==============================Profile Stats=====================================//
// Update profile stats
export async function updateProfileStats(profileStatsData: ProfileStatsUpdateData) {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    const API_BASE_URL = getCurrentUrl(await headers())
    const API_PROFILE_URL = API_BASE_URL + '/api/profile/stats'

    console.log('Updating profile stats...', API_PROFILE_URL)

    const response = await fetch(API_PROFILE_URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader
      },
      body: JSON.stringify(profileStatsData),
    })

    if (!response.ok) {
      console.log('Failed to update profile stats,', 'status:', response.status)
      throw new Error('Failed to update profile stats')
    }
    revalidatePath('/aboutme')
    return (await response.json()) as ApiResponseMessage;
  } catch (err) {
    return { error: (err as Error).message } as ApiError;
  }
}