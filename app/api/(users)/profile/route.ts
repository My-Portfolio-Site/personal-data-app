import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/helpers";
import { Profile, ProfileStatsUpdateSchema, ProfileUpdateSchema } from "@/schemas/profile";

// Get profile for current user
export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const query = `
      SELECT * FROM "profiles" WHERE "userId" = ?;
    `;
    const result = await db.prepare(query).bind(userId).first();
    if (!result) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    const profile = {
      ...result,
      yearsOfExperience: result.yearsOfExperience ?? 0.0,
      projectsDone: result.projectsDone ?? 0,
      totalSkills: result.totalSkills ?? 0,
      certificationCompleted: result.certificationCompleted ?? 0,
    } as Profile;

    return NextResponse.json(profile, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching profile:", error.message);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// Update profile for the current user
export async function PUT(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, userId, firstName, lastName, title, email, phone, location, website, linkedin, github, summary, avatar } = ProfileUpdateSchema.parse(await req.json());
    console.log("API Update Profile Request:", id);

    const updateQuery = `
      UPDATE "profiles"
        SET
        "firstName" = COALESCE(?, "firstName"),
        "lastName" = COALESCE(?, "lastName"),
        "title" = COALESCE(?, "title"),
        "email" = COALESCE(?, "email"),
        "phone" = COALESCE(?, "phone"),
        "location" = COALESCE(?, "location"),
        "website" = COALESCE(?, "website"),
        "linkedin" = COALESCE(?, "linkedin"),
        "github" = COALESCE(?, "github"),
        "summary" = COALESCE(?, "summary"),
        "avatar" = COALESCE(?, "avatar")
      WHERE "userId" = ? AND "id" = ?;
    `;

    await db.prepare(updateQuery).bind(
      firstName,
      lastName,
      title,
      email,
      phone,
      location,
      website,
      linkedin,
      github,
      summary,
      avatar,
      userId,
      id
    ).run();

    console.log("Profile updated successfully:", { id, userId, firstName, lastName, title, email, phone, location, website, linkedin, github });
    return NextResponse.json({ success: "Profile "+ id + " Updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating profile:", error.message);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

// Update profile stats for the current user
export async function PATCH(req: Request) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      yearsOfExperience,
      projectsDone,
      totalSkills,
      certificationCompleted,
    } = ProfileStatsUpdateSchema.parse(await req.json());

    const updateQuery = `
      UPDATE "profiles"
        SET
        "yearsOfExperience" = COALESCE(?, "yearsOfExperience"),
        "projectsDone" = COALESCE(?, "projectsDone"),
        "totalSkills" = COALESCE(?, "totalSkills"),
        "certificationCompleted" = COALESCE(?, "certificationCompleted")
      WHERE "userId" = ?;
    `;

    // Only run update if at least one field is provided
    await db.prepare(updateQuery).bind(
      yearsOfExperience ?? null,
      projectsDone ?? null,
      totalSkills ?? null,
      certificationCompleted ?? null,
      userId
    ).run();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating profile stats:", error.message);
    return NextResponse.json({ error: "Failed to update profile stats" }, { status: 500 });
  }
}