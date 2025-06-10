"use server";

import { addInviteSchema, updateInviteSchema, deleteInviteSchema, Invite, AddInvite, UpdateInvite, DeleteInvite } from "@/schemas/invite";
// Error type for API responses
type ApiError = {
  error: string;
  status?: number;
};
// Base URL for the API
const API_BASE_URL = "http://localhost:3000/api/invites";

// Fetch all invites
export async function fetchAllInvites(): Promise<Invite[]> {
  const response = await fetch(API_BASE_URL, { method: "GET" });
  if (!response.ok) {
    throw new Error("Failed to fetch invites");
  }
  return (await response.json()) as Invite[];
}

// // Accept or reject an invite
// export async function handleInviteResponse(
//   token: string,
//   accept: boolean
// ): Promise<{ message: string }> {
//   const url = `${API_BASE_URL}?accept=${accept}&token=${token}`;
//   const response = await fetch(url, { method: "GET" });
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error || "Failed to handle invite response");
//   }
//   return await response.json();
// }

// Add a new invite
export async function createInvite(data: AddInvite): Promise<{ message: string }> {
  const parsedData = addInviteSchema.parse(data);
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsedData),
  });
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || "Failed to create invite");
  }
  return await response.json();
}

// Update an invite
export async function updateInvite(data: UpdateInvite): Promise<{ message: string }> {
  const parsedData = updateInviteSchema.parse(data);
  const response = await fetch(API_BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsedData),
  });
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || "Failed to update invite");
  }
  return await response.json();
}

// Delete an invite
export async function deleteInvite(data: DeleteInvite): Promise<{ message: string }> {
  const parsedData = deleteInviteSchema.parse(data);
  const response = await fetch(API_BASE_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsedData),
  });
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || "Failed to delete invite");
  }
  return await response.json();
}