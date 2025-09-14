import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/server/db/dbBinding";
import { getCurrentUserId } from "@/lib/dal";
import { referenceSchema, ReferenceSchemaType } from "@/schemas/reference";

// Get all reference
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

    // Fetch references for the given currentUserId
    console.log(`Fetching reference for userId: ${currentUserId}`);
    const query = `SELECT * FROM "reference" WHERE "userId" = ?;`;
    const { results } = await db.prepare(query).bind(currentUserId).all<ReferenceSchemaType>();

    return NextResponse.json(results, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching reference:", error.message);
    return NextResponse.json({ error: "Failed to fetch reference" }, { status: 500 });
  }
}

// Add a new reference
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
    const { name, designation, company, relationship, email, phone, linkedin, workingPeriod, testimonial, canContact } = referenceSchema.parse(body);

    // Generate a unique ID for the reference
    const referenceId = uuidv4();
    console.log("Creating reference with ID:", referenceId, currentUserId, name, designation, company, relationship, email, phone, linkedin, workingPeriod, testimonial, canContact);

    // Insert the new reference into the database
    const query = `
      INSERT INTO "references" ("id", "userId", "name", "designation", "company", "relationship", "email", "phone", "linkedin", "workingPeriod", "testimonial", "canContact")
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    await db.prepare(query).bind(referenceId, currentUserId, name, designation, company, relationship, email, phone, linkedin, workingPeriod, testimonial, canContact).run();
    return NextResponse.json({ message: "References created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating reference:", error);
    return NextResponse.json({ error: error.message || "Failed to create reference" }, { status: 500 });
  }
}

// Update existing reference
export async function PUT(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    const { id, userId, name, designation, company, relationship, email, phone, linkedin, workingPeriod, testimonial, canContact } = referenceSchema.parse(await req.json());

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

    const queryFind = `SELECT * FROM "references" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(id, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: `Reference not found: ${id}` }, { status: 404 });
    }

    const query = `
      UPDATE "references"
      SET
        "name" = COALESCE(?, "name"),
        "designation" = COALESCE(?, "designation"),
        "company" = COALESCE(?, "company"),
        "relationship" = COALESCE(?, "relationship"),
        "email" = COALESCE(?, "email"),
        "phone" = COALESCE(?, "phone"),
        "linkedin" = COALESCE(?, "linkedin"),
        "workingPeriod" = COALESCE(?, "workingPeriod"),
        "testimonial" = COALESCE(?, "testimonial"),
        "canContact" = COALESCE(?, "canContact")
      WHERE "id" = ? AND "userId" = ?;
    `;
    const res = await db.prepare(query).bind(
      name,
      designation,
      company,
      relationship,
      email,
      phone,
      linkedin || null,
      workingPeriod || null,
      testimonial || null,
      canContact,
      id,
      userId).run();
    console.log("API: References updated successfully", res);

    return NextResponse.json({ message: "References updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating reference:", error.message);
    return NextResponse.json({ error: "Failed to update reference" }, { status: 500 });
  }
}
 