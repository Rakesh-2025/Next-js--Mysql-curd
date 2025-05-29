import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

// GET employee by ID
export async function GET(_, { params }) {
  try {
    const db = await createConnection();
    const id = params.id;

    const sql = "SELECT * FROM Employees WHERE ID = ?";
    const [result] = await db.query(sql, [id]);

    if (!result.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("GET by ID error:", error);
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}
