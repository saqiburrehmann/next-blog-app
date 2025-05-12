import { connectDB } from "@/lib/config/db.js";
import { deleteBlog, getBlogById } from "@/lib/controllers/blogController";
import { NextResponse } from "next/server";

// For get blog by id
export async function GET(_, { params }) {
  await connectDB();

  const result = await getBlogById(params.id);

  if (!result) {
    return NextResponse.json(
      { success: false, msg: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, blog: result });
}

// For Delete blog by id
export async function DELETE(_, { params }) {
  await connectDB();

  const result = await deleteBlog(params.id);

  if (!result) {
    return NextResponse.json(
      { success: false, msg: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, blog: result });
}
