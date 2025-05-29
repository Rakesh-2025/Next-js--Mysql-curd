import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

// GET method - fetch data
export async function GET() {
  try {
    const db = await createConnection();
    const sql = "SELECT * FROM Employees"; // change table to Employees
    const [data] = await db.query(sql);
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// POST method - insert data
export async function POST(request) {
  try {
    const db = await createConnection();
    const body = await request.json(); // parse JSON body

    const { name, company, salary } = body;

    const sql =
      "INSERT INTO Employees (Name, Company, Salary) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [name, company, salary]);

    return NextResponse.json({
      message: "Employee added",
      id: result.insertId,
    });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to insert data" },
      { status: 500 }
    );
  }


}


// DELETE method - delete employee by ID
export async function DELETE(request) {
  try {
    const db = await createConnection();

    const { searchParams } = new URL(request.url); // get ID from query
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for deletion" },
        { status: 400 }
      );
    }

    const sql = "DELETE FROM Employees WHERE ID = ?";
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Employee deleted" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete data" },
      { status: 500 }
    );
  }
}


// PUT method - update employee by ID
export async function PUT(request) {
  try {
    const db = await createConnection();
    const body = await request.json(); // get updated data from body

    const { id, name, company, salary } = body;

    if (!id || !name || !company || !salary) {
      return NextResponse.json(
        { error: "All fields (id, name, company, salary) are required" },
        { status: 400 }
      );
    }

    const sql = "UPDATE Employees SET Name = ?, Company = ?, Salary = ? WHERE ID = ?";
    const [result] = await db.query(sql, [name, company, salary, id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Employee updated" });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  }
}


