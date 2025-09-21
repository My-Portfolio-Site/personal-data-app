import { NextResponse } from "next/server";

import { db } from "@/server/db/dbBinding";
import { getCurrentUserId } from "@/lib/dal";

interface Context {
  params: Promise<{ certificationId: string }>;
}
// Get a certification by ID
export async function GET(req: Request, context: Context) {
  try {
    const currentUserId = await getCurrentUserId();

    const params = await context.params;
    const certificationId = params.certificationId;

    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }

    console.log(`Fetching certification for currentUserId: ${currentUserId} and certificationId: ${certificationId}`);

    const query = `SELECT * FROM "certifications" WHERE "id" = ? AND "userId" = ?;`;
    const result = await db.prepare(query).bind(certificationId, currentUserId).first();
    if (!result) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching certifications:", error.message);
    return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 });
  }
}


// Delete an certification by ID
export async function DELETE(req: Request, context: Context) {
  try {
    const currentUserId = await getCurrentUserId();

    if (!currentUserId) {
      console.log("Not authenticated.");
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 400 }
      );
    }
    const params = await context.params;
    const certificationId = params.certificationId;

    if (!certificationId) {
      return NextResponse.json({ error: "Certification ID is required" }, { status: 400 });
    }
    const queryFind = `SELECT * FROM "certifications" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(certificationId, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 });
    }

    const query = `DELETE FROM "certifications" WHERE "id" = ? AND "userId" = ?;`;
    await db.prepare(query).bind(certificationId, currentUserId).run();
    return NextResponse.json({ message: "Certification deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting certification:", error.message);
    return NextResponse.json({ error: "Failed to delete certification" }, { status: 500 });
  }
}