import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/dal";
import { experienceSchema, ExperienceSchemaType } from "@/schemas/experience";
import { skillSchema, SkillSchemaType } from "@/schemas/skill";

// Get all skills
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

    // Fetch skills for the given currentUserId
    console.log(`Fetching skills for userId: ${currentUserId}`);
    const query = `SELECT * FROM "skills" WHERE "userId" = ?;`;
    const { results } = await db.prepare(query).bind(currentUserId).all<SkillSchemaType>();

    return NextResponse.json(results, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching skills:", error.message);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

// Add a new skill
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
    const { name, level, category, description } = skillSchema.parse(body);

    // Generate a unique ID for the skill
    const skillId = uuidv4();
    console.log("Creating skill with ID:", skillId, currentUserId, name, level, category, description);

    // Insert the new skill into the database
    const query = `
      INSERT INTO "skills" ("id", "userId", "name", "level", "category", "description")
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    await db.prepare(query).bind(skillId, currentUserId, name, level, category, description).run();
    return NextResponse.json({ message: "Skill created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating skill:", error);
    return NextResponse.json({ error: error.message || "Failed to create skill" }, { status: 500 });
  }
}

// // Update existing skill
// export async function PUT(req: Request) {
//   try {
//     const currentUserId = await getCurrentUserId();
//     const { id, userId, company, location, position, achievements, technologies, description, startDate, endDate } = experienceSchema.parse(await req.json());

//     if (!currentUserId) {
//       console.log("Not authenticated.");
//       return NextResponse.json(
//         { error: "Not authenticated." },
//         { status: 400 }
//       );
//     }

//     if (currentUserId !== userId) {
//       console.log("Not authorized. User ID mismatch.");
//       return NextResponse.json(
//         { error: "Not authorized. User ID mismatch." },
//         { status: 403 }
//       );
//     }

//     const queryFind = `SELECT * FROM "experiences" WHERE "id" = ? AND "userId" = ?;`;
//     const resultFind = await db.prepare(queryFind).bind(id, currentUserId).first();
//     if (!resultFind) {
//       return NextResponse.json({ error: "Experience not found" }, { status: 404 });
//     }

//     const query = `
//       UPDATE "experiences"
//       SET
//         "company" = COALESCE(?, "company"),
//         "location" = COALESCE(?, "location"),
//         "position" = COALESCE(?, "position"),
//         "achievements" = COALESCE(?, "achievements"),
//         "technologies" = COALESCE(?, "technologies"),
//         "description" = COALESCE(?, "description"),
//         "startDate" = COALESCE(?, "startDate"),
//         "endDate" = COALESCE(?, "endDate")
//       WHERE "id" = ? AND "userId" = ?;
//     `;
//     const res = await db.prepare(query).bind(
//       company,
//       location,
//       position,
//       achievements || null,
//       technologies || null,
//       description,
//       startDate,
//       endDate || null,
//       id,
//       userId).run();
//     console.log("API: Experience updated successfully", res);

//     return NextResponse.json({ message: "Experience updated successfully" }, { status: 200 });
//   } catch (error: any) {
//     console.error("Error updating experience:", error.message);
//     return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
//   }
// }

// // Delete an experience by ID
// export async function DELETE(req: Request) {
//   try {
//     const currentUserId = await getCurrentUserId();

//     if (!currentUserId) {
//       console.log("Not authenticated.");
//       return NextResponse.json(
//         { error: "Not authenticated." },
//         { status: 400 }
//       );
//     }
//     const url = new URL(req.url);
//     const experienceId = url.searchParams.get("experienceId");

//     if (!experienceId) {
//       return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });
//     }
//     const queryFind = `SELECT * FROM "experiences" WHERE "id" = ? AND "userId" = ?;`;
//     const resultFind = await db.prepare(queryFind).bind(experienceId, currentUserId).first();
//     if (!resultFind) {
//       return NextResponse.json({ error: "Experience not found" }, { status: 404 });
//     }

//     const query = `DELETE FROM "experiences" WHERE "id" = ? AND "userId" = ?;`;
//     await db.prepare(query).bind(experienceId, currentUserId).run();
//     return NextResponse.json({ message: "Experience deleted successfully" }, { status: 200 });
//   } catch (error: any) {
//     console.error("Error deleting experience:", error.message);
//     return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
//   }
// }