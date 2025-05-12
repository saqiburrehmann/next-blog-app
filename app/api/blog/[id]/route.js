import { connectDB } from "@/lib/config/db.js";
import { getBlogById } from "@/lib/controllers/blogController";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  await connectDB();

  const result = await getBlogById(params.id);

  if (!result) {
    return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, blog: result });
}
