import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { createExperienceSchema, updateExperienceSchema, deleteExperienceSchema, Experience } from "@/schemas/experience";
import { auth } from '@/lib/auth'

async function getCurrentUserId(): Promise<string> {
  const currentUserSession = await auth();
  if (!currentUserSession?.user?.id) {
    console.warn("User not authenticated, using default id: ", "b1612ca5-1403-45ee-9cef-c5af8a909c81");
    return 'b1612ca5-1403-45ee-9cef-c5af8a909c81'; // Default email for unauthenticated users
  }
  return currentUserSession.user.id;
}

// Get all experiences
export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      console.log("Missing userId in query parameters");
      return NextResponse.json(
        { error: "userId is required in query parameters" },
        { status: 400 }
      );
    }

    // Fetch experiences for the given userId
    console.log(`Fetching experiences for userId: ${userId}`);
    const query = `SELECT * FROM "experiences" WHERE "userId" = ?;`;
    const result = await db.prepare(query).bind(userId).all();
    const experiences = (result.results || []).map((experience: any) => ({
      ...experience,
      technologies: JSON.parse(experience.technologies || "[]"),
      achievements: JSON.parse(experience.achievements || "[]"),
    })) as Experience[];
    return NextResponse.json(experiences, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching experiences:", error.message);
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

// Add a new invite
export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      console.log("Missing userId in query parameters");
      return NextResponse.json(
        { error: "userId is required in query parameters" },
        { status: 400 }
      );
    }
    const body = await req.json();
    console.log("API request received:", body);

    // Validate the request body using the createExperienceSchema
    const { company, location, position, achievements, technologies, description, startDate, endDate } = createExperienceSchema.parse(body);

    // Generate a unique ID for the experience
    const experienceId = uuidv4();
    console.log("Creating experience with ID:", experienceId, userId, company, location, position, achievements, technologies, description, startDate, endDate );

    // Insert the new experience into the database
    const query = `
      INSERT INTO "experiences" ("id", "userId", "company", "location", "position", "achievements", "technologies", "description", "startDate", "endDate")
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    await db.prepare(query).bind(experienceId, userId, company, location, position, JSON.stringify(achievements), JSON.stringify(technologies), description, startDate, endDate).run();

    return NextResponse.json({ message: "Experience created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating experience:", error);
    return NextResponse.json({ error: error.message || "Failed to create experience" }, { status: 500 });
  }
}

// // Update an invite
// export async function PUT(req: Request) {
//   try {
//     // Handle normal invite update
//     const { id, email, role } = updateInviteSchema.parse(await req.json());
//     const query = `
//         UPDATE "invites"
//         SET 
//           "email" = COALESCE(?, "email"),
//           "role" = COALESCE(?, "role"),
//           "updatedAt" = COALESCE(?, "updatedAt")
//         WHERE "id" = ?;
//       `;
//     const updatedAt = new Date().toISOString();
//     await db.prepare(query).bind(email, role, updatedAt, id).run();
//     return NextResponse.json({ message: "Invite updated successfully" }, { status: 200 });
//   } catch (error: any) {
//     console.error("Error updating invite:", error.message);
//     return NextResponse.json({ error: "Failed to update invite" }, { status: 500 });
//   }
// }

// Delete an invite by ID
export async function DELETE(req: Request) {
  try {
    const { id } = deleteExperienceSchema.pick({ id: true }).parse(await req.json());
    const query = `DELETE FROM "invites" WHERE "id" = ?;`;
    await db.prepare(query).bind(id).run();
    return NextResponse.json({ message: "Invite deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting invite:", error.message);
    return NextResponse.json({ error: "Failed to delete invite" }, { status: 500 });
  }
}