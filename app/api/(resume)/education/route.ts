import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/server/db/dbBinding";
import { getCurrentUserId } from "@/lib/dal";
import { educationSchema, EducationSchemaType } from "@/schemas/education";

// Get all education records
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

    // Fetch educations for the given currentUserId
    console.log(`Fetching educations for userId: ${currentUserId}`);
    const query = `SELECT * FROM "educations" WHERE "userId" = ?;`;
    const { results } = await db.prepare(query).bind(currentUserId).all<EducationSchemaType>();

    return NextResponse.json(results, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching educations:", error.message);
    return NextResponse.json({ error: "Failed to fetch educations" }, { status: 500 });
  }
}

// Add a new education
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
    const { institution, degree, field, location, startDate, endDate, gpa, honors, coursework, activities } = educationSchema.parse(body);

    // Generate a unique ID for the education
    const educationId = uuidv4();
    console.log("Creating education with ID:", educationId, currentUserId, institution, degree, field, location, startDate, endDate, gpa, honors, coursework, activities);

    // Insert the new education into the database
    const query = `
      INSERT INTO "educations" ("id", "userId", "institution", "degree", "field", "location", "startDate", "endDate", "gpa", "honors", "coursework", "activities")
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    await db.prepare(query).bind(educationId, currentUserId, institution, degree, field, location, startDate, endDate || null, gpa, honors || null, coursework || null, activities || null).run();
    return NextResponse.json({ message: "Education created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating education:", error);
    return NextResponse.json({ error: error.message || "Failed to create education" }, { status: 500 });
  }
}

// Update existing education
export async function PUT(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    const { id, userId, institution, degree, field, location, startDate, endDate, gpa, honors, coursework, activities } = educationSchema.parse(await req.json());

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

    const queryFind = `SELECT * FROM "educations" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(id, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: "Education not found" }, { status: 404 });
    }

    const query = `
      UPDATE "educations"
      SET
        "institution" = COALESCE(?, "institution"),
        "degree" = COALESCE(?, "degree"),
        "field" = COALESCE(?, "field"),
        "location" = COALESCE(?, "location"),
        "startDate" = COALESCE(?, "startDate"),
        "endDate" = COALESCE(?, "endDate"),
        "gpa" = COALESCE(?, "gpa"),
        "honors" = COALESCE(?, "honors"),
        "coursework" = COALESCE(?, "coursework"),
        "activities" = COALESCE(?, "activities")
      WHERE "id" = ? AND "userId" = ?;
    `;
    const res = await db.prepare(query).bind(
      institution,
      degree,
      field,
      location,
      startDate,
      endDate || null,
      gpa,
      honors || null,
      coursework || null,
      activities || null,
      id,
      userId).run();
    console.log("API: Education updated successfully", res);

    return NextResponse.json({ message: "Education updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating education:", error.message);
    return NextResponse.json({ error: "Failed to update education" }, { status: 500 });
  }
}
