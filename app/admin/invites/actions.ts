'use server'

import {
  createInviteFormSchema,
  updateInviteSchema,
  deleteInviteSchema,
  Invite,
  CreateInviteForm,
  UpdateInvite,
  createInviteSchema,
} from '@/schemas/invite'
import { auth } from '@/lib/auth'

import { getCurrentUrl } from '@/lib/helpers'
import { headers } from 'next/headers'
//==============================Invites=====================================//
// Fetch all invites
export async function fetchAllInvites() {
  try {
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_INVITES_URL = API_BASE_URL + '/api/invites'
    console.log('Fetching invites...', API_INVITES_URL)

    const response = await fetch(API_INVITES_URL, { method: 'GET' })
    if (!response.ok) {
      console.log('Failed to fetch invites,', 'status:', response.status)
      throw new Error('Failed to fetch invites')
    }
    return (await response.json()) as Invite[]
  } catch (err) {
    return { error: (err as Error).message } as ApiError
  }
}

// Add a new invite
export async function createInvite(data: CreateInviteForm) {
  try {
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_INVITES_URL = API_BASE_URL + '/api/invites'

    const currentUserSession = await auth()
    let currentUserEmail = ''
    if (!currentUserSession?.user?.email) {
      currentUserEmail = 'mnkesu1998@gmail.com'
      // throw new Error("User not authenticated");
    } else {
      currentUserEmail = currentUserSession?.user?.email
    }
    const dateExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const parsedData = createInviteFormSchema.parse(data)
    const allParsedData = createInviteSchema.parse({
      ...parsedData,
      expires: new Date(dateExpires).toISOString(), // 7 days from now
      invitedBy: currentUserEmail,
    })
    console.log('Creating invite: ', allParsedData)
    const response = await fetch(API_INVITES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(allParsedData),
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
export async function updateInvite(data: UpdateInvite) {
  try {
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_INVITES_URL = API_BASE_URL + '/api/invites'

    const parsedData = updateInviteSchema.parse(data)
    const response = await fetch(API_INVITES_URL, {
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
export async function deleteInvite(id: string) {
  try {
    const API_BASE_URL = getCurrentUrl(await headers())
    const API_INVITES_URL = API_BASE_URL + '/api/invites'

    const parsedData = deleteInviteSchema.parse({ id })
    const response = await fetch(API_INVITES_URL, {
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

