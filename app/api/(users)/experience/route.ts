import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/dal";
import { experienceSchema, ExperienceSchemaType } from "@/schemas/experience";

// Get all experiences
export async function GET(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }
    
    const url = new URL(req.url);
    const experienceId = url.searchParams.get("experienceId");
    if (experienceId) {
      // Fetch a single
      console.log(`Fetching experiences for currentUserId: ${currentUserId} and experienceId: ${experienceId}`);

      const query = `SELECT * FROM "experiences" WHERE "id" = ? AND "userId" = ?;`;
      const result = await db.prepare(query).bind(experienceId, currentUserId).first();
      if (!result) {
        return NextResponse.json({ error: "Experience not found" }, { status: 404 });
      }

      return NextResponse.json(result, { status: 200 });
    }

    // Fetch experiences for the given currentUserId
    console.log(`Fetching experiences for userId: ${currentUserId}`);
    const query = `SELECT * FROM "experiences" WHERE "userId" = ?;`;
    const { results } = await db.prepare(query).bind(currentUserId).all<ExperienceSchemaType>();

    return NextResponse.json(results, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching experiences:", error.message);
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

// Add a new experience
export async function POST(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();

    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }
    const body = await req.json();
    console.log("API request received:", body);

    // Validate the request body
    const { company, location, position, achievements, technologies, description, startDate, endDate } = experienceSchema.parse(body);

    // Generate a unique ID for the experience
    const experienceId = uuidv4();
    console.log("Creating experience with ID:", experienceId, currentUserId, company, location, position, achievements, technologies, description, startDate, endDate);

    // Insert the new experience into the database
    const query = `
      INSERT INTO "experiences" ("id", "userId", "company", "location", "position", "achievements", "technologies", "description", "startDate", "endDate")
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    await db.prepare(query).bind(experienceId, currentUserId, company, location, position, achievements || null, technologies || null, description, startDate, endDate || null).run();
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
    const { id, userId, company, location, position, achievements, technologies, description, startDate, endDate } = experienceSchema.parse(await req.json());

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

    const queryFind = `SELECT * FROM "experiences" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(id, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
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
    const res = await db.prepare(query).bind(
      company,
      location,
      position,
      achievements || null,
      technologies || null,
      description,
      startDate,
      endDate || null,
      id,
      userId).run();
    console.log("API: Experience updated successfully", res);

    return NextResponse.json({ message: "Experience updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating experience:", error.message);
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

// Delete an experience by ID
export async function DELETE(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();

    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }
    const url = new URL(req.url);
    const experienceId = url.searchParams.get("experienceId");

    if (!experienceId) {
      return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });
    }
    const queryFind = `SELECT * FROM "experiences" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(experienceId, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    const query = `DELETE FROM "experiences" WHERE "id" = ? AND "userId" = ?;`;
    await db.prepare(query).bind(experienceId, currentUserId).run();
    return NextResponse.json({ message: "Experience deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting experience:", error.message);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}