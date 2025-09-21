import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/server/db/dbBinding";
import { getCurrentUserId } from "@/lib/dal";
import { certificationSchema, CertificationSchemaType } from "@/schemas/certification";

// Get all certification records
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

    // Fetch certifications for the given currentUserId
    console.log(`Fetching certifications for userId: ${currentUserId}`);
    const query = `SELECT * FROM "certifications" WHERE "userId" = ?;`;
    const { results } = await db.prepare(query).bind(currentUserId).all<CertificationSchemaType>();

    return NextResponse.json(results, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching certifications:", error.message);
    return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 });
  }
}

// Add a new certification
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
    const { title, issuer, issueDate, expiryDate, credentialId, credentialUrl, status, description } = certificationSchema.parse(body);

    // Generate a unique ID for the certification
    const certificationId = uuidv4();
    console.log("Creating certification with ID:", certificationId, currentUserId, title, issuer, issueDate, expiryDate, credentialId, credentialUrl, status, description);

    // Insert the new certification into the database
    const query = `
      INSERT INTO "certifications" ("id", "userId", "title", "issuer", "issueDate", "expiryDate", "credentialId", "credentialUrl", "status", "description")
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    await db.prepare(query).bind(certificationId, currentUserId, title, issuer, issueDate, expiryDate || null, credentialId || null, credentialUrl || null, status, description).run();
    return NextResponse.json({ message: "Certification created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating certification:", error);
    return NextResponse.json({ error: error.message || "Failed to create certification" }, { status: 500 });
  }
}

// Update existing certification
export async function PUT(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    const { id, userId, title, issuer, issueDate, expiryDate, credentialId, credentialUrl, status, description } = certificationSchema.parse(await req.json());

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

    const queryFind = `SELECT * FROM "certifications" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(id, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 });
    }

    const query = `
      UPDATE "certifications"
      SET
        "title" = COALESCE(?, "title"),
        "issuer" = COALESCE(?, "issuer"),
        "issueDate" = COALESCE(?, "issueDate"),
        "expiryDate" = COALESCE(?, "expiryDate"),
        "credentialId" = COALESCE(?, "credentialId"),
        "credentialUrl" = COALESCE(?, "credentialUrl"),
        "status" = COALESCE(?, "status"),
        "description" = COALESCE(?, "description")
      WHERE "id" = ? AND "userId" = ?;
    `;
    const res = await db.prepare(query).bind(
      title,
      issuer,
      issueDate,
      expiryDate || null,
      credentialId || null,
      credentialUrl || null,
      status,
      description,
      id,
      userId
    ).run();
    console.log("API: Certification updated successfully", res);

    return NextResponse.json({ message: "Certification updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating certification:", error.message);
    return NextResponse.json({ error: "Failed to update certification" }, { status: 500 });
  }
}
