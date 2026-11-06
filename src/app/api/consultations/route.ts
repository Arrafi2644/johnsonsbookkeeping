import { NextResponse } from "next/server";
import { consultationSchema } from "@/lib/schema";
import { getDb } from "@/lib/mongodb";

export async function POST(req: Request) {
  const parsed = consultationSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }
  try {
    const db = await getDb();
    await db.collection("consultations").insertOne({ ...parsed.data, createdAt: new Date() });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Consultation save failed:", error);
    return NextResponse.json({ error: "Could not save your request" }, { status: 500 });
  }
}
