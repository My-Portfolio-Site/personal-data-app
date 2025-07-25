import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/dal";
import { profileSchema, ProfileSchemaType } from "@/schemas/profile";

// Get profile for current user
export async function GET(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("API: Get Profile Request:", currentUserId);
    const query = `
      SELECT * FROM "profiles" WHERE "userId" = ?;
    `;
    const result = await db.prepare(query).bind(currentUserId).first<ProfileSchemaType>();
    if (!result) {
      console.warn("API: Profile not found for userId:", currentUserId);
      // return NextResponse.json({ error: "Profile not found" }, { status: 404 });
      return NextResponse.json({}, { status: 200 }); // Return null if no profile found
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("API: Error fetching profile:", error.message);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
// Create profile for the current user
export async function POST(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const validationResult = profileSchema.safeParse(await req.json())
    if (!validationResult.success) {
      return {
        errors: z.flattenError(validationResult.error).fieldErrors
      }
    }
    console.log("API Create Profile Request:", validationResult.data);
    
    const { firstName, lastName, title, email, phone, location, website, linkedin, github, summary } = validationResult.data;
    const profileId = uuidv4();

    const query = `
      INSERT INTO "profiles" ("id", "userId", "firstName", "lastName", "title", "email", "phone", "location", "website", "linkedin", "github", "summary")
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    await db.prepare(query).bind(
      profileId,
      currentUserId,
      firstName,
      lastName,
      title,
      email,
      phone || null,
      location,
      website || null,
      linkedin || null,
      github || null,
      summary
    ).run();

    console.log("Profile created successfully:", profileId);
    return NextResponse.json({ success: "Profile created successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating profile:", error.message);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

// Update profile for the current user
export async function PUT(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, userId, firstName, lastName, title, email, phone, location, website, linkedin, github, summary } = profileSchema.parse(await req.json());
    console.log("API Update Profile Request:", id);

    const updateQuery = `
      UPDATE "profiles"SET
        "firstName" = COALESCE(?, "firstName"),
        "lastName" = COALESCE(?, "lastName"),
        "title" = COALESCE(?, "title"),
        "email" = COALESCE(?, "email"),
        "phone" = COALESCE(?, "phone"),
        "location" = COALESCE(?, "location"),
        "website" = COALESCE(?, "website"),
        "linkedin" = COALESCE(?, "linkedin"),
        "github" = COALESCE(?, "github"),
        "summary" = COALESCE(?, "summary")
      WHERE "userId" = ? AND "id" = ?;
    `;

    await db.prepare(updateQuery).bind(
      firstName,
      lastName,
      title,
      email,
      phone || null,
      location,
      website || null,
      linkedin || null,
      github || null,
      summary,
      userId,
      id
    ).run();

    console.log("Profile updated successfully:", { id, userId, firstName, lastName, title, email, phone, location, website, linkedin, github });
    return NextResponse.json({ success: "Profile " + id + " Updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating profile:", error.message);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}