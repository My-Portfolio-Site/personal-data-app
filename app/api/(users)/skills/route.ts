import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/dal";
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
    const { name, level, category, categoryTitle, description } = skillSchema.parse(body);

    // Generate a unique ID for the skill
    const skillId = uuidv4();
    console.log("Creating skill with ID:", skillId, currentUserId, name, level, category, categoryTitle, description);

    // Insert the new skill into the database
    const query = `
      INSERT INTO "skills" ("id", "userId", "name", "level", "category", "categoryTitle", "description")
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    await db.prepare(query).bind(skillId, currentUserId, name, level, category, categoryTitle, description).run();
    return NextResponse.json({ message: "Skill created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating skill:", error);
    return NextResponse.json({ error: error.message || "Failed to create skill" }, { status: 500 });
  }
}

// Update existing skill
export async function PUT(req: Request) {
  try {
    const currentUserId = await getCurrentUserId();
    const { id, userId, name, level, category, categoryTitle, description } = skillSchema.parse(await req.json());

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

    const queryFind = `SELECT * FROM "skills" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(id, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    const query = `
      UPDATE "skills"
      SET
        "name" = COALESCE(?, "name"),
        "level" = COALESCE(?, "level"),
        "categoryTitle" = COALESCE(?, "categoryTitle"),
        "category" = COALESCE(?, "category"),
        "description" = COALESCE(?, "description"),
      WHERE "id" = ? AND "userId" = ?;
    `;
    const res = await db.prepare(query).bind(
      name,
      level,
      categoryTitle,
      category,
      description,
      id,
      userId).run();
    console.log("API: SSkill updated successfully", res);

    return NextResponse.json({ message: "Skill updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating skill:", error.message);
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}



// Delete an skill by ID
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
    const skillId = url.searchParams.get("skillId");

    if (!skillId) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
    }
    const queryFind = `SELECT * FROM "skills" WHERE "id" = ? AND "userId" = ?;`;
    const resultFind = await db.prepare(queryFind).bind(skillId, currentUserId).first();
    if (!resultFind) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    const query = `DELETE FROM "skills" WHERE "id" = ? AND "userId" = ?;`;
    await db.prepare(query).bind(skillId, currentUserId).run();
    return NextResponse.json({ message: "Skill deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting skill:", error.message);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}