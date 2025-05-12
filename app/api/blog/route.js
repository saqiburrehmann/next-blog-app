import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db.js";
import {
  createBlog,
  getBlog,
} from "../../../lib/controllers/blogController.js";

//  Getting all blogs
export async function GET(request) {
  await connectDB();

  const blogResult = await getBlog(request);

  return NextResponse.json({ msg: "API working", ...blogResult });
}

// create blog
export async function POST(request) {
  await connectDB();

  const result = await createBlog(request);
  return NextResponse.json(result);
}
