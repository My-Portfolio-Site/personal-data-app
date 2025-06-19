import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { ExperienceFormSchema, ExperienceSchema, deleteExperienceSchema, Experience } from "@/schemas/experience";
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

    const url = new URL(req.url);
    const experienceId = url.searchParams.get("experienceId");

    if (!userId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }
    if (experienceId) {
      // Fetch a single
      console.log(`Fetching experiences for userId: ${userId} and experienceId: ${experienceId}`);
      const query = `SELECT * FROM "experiences" WHERE "id" = ? AND "userId" = ?;`;
      const result = await db.prepare(query).bind(experienceId, userId).first();
      if (!result) {
        return NextResponse.json({ error: "Experience not found" }, { status: 404 });
      }
      const experience = {
        ...(result as any),
        technologies: JSON.parse(result?.technologies as string || "[]"),
        achievements: JSON.parse(result?.achievements as string || "[]")
      } as Experience;
  
      return NextResponse.json(experience, { status: 200 });
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
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }
    const body = await req.json();
    console.log("API request received:", body);

    // Validate the request body using the ExperienceFormSchema
    const { company, location, position, achievements, technologies, description, startDate, endDate } = ExperienceFormSchema.parse(body);

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

// Update existing experience
export async function PUT(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    const { id, userId, company, location, position, achievements, technologies, description, startDate, endDate } = ExperienceSchema.parse(await req.json());

    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }
    if (currentUserId !== userId) {
      console.log("Not authorized. User ID mismatch.");
      return NextResponse.json(
        { error: "Not authorized. User ID mismatch." },
        { status: 403 }
      );
    }

    const query = `
      UPDATE "experiences"
      SET
        "company" = COALESCE(?, "company"),
        "location" = COALESCE(?, "location"),
        "position" = COALESCE(?, "position"),
        "achievements" = COALESCE(?, "achievements"),
        "technologies" = COALESCE(?, "technologies"),
        "description" = COALESCE(?, "description"),
        "startDate" = COALESCE(?, "startDate"),
        "endDate" = COALESCE(?, "endDate")
      WHERE "id" = ? AND "userId" = ?;
    `;
    await db.prepare(query).bind(company, location, position, JSON.stringify(achievements), JSON.stringify(technologies), description, startDate, endDate, id, userId).run();
    return NextResponse.json({ message: "Experience updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating experience:", error.message);
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

// Delete an experience by ID
export async function DELETE(req: Request) {
  try {
    const { id } = deleteExperienceSchema.pick({ id: true }).parse(await req.json());
    const query = `DELETE FROM "experiences" WHERE "id" = ?;`;
    await db.prepare(query).bind(id).run();
    return NextResponse.json({ message: "Experience deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting experience:", error.message);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}