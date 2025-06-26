import { connectDB } from "@/lib/mongoose";
import { Vote } from "@/models/Vote";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { category, nominee } = await req.json();

    if (!category || !nominee) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const vote = await Vote.create({ category, nominee });

    return NextResponse.json({ success: true, vote });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const results = await Vote.aggregate([
      {
        $group: {
          _id: { category: "$category", nominee: "$nominee" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.category",
          nominees: {
            $push: {
              nominee: "$_id.nominee",
              votes: "$count",
            },
          },
        },
      },
    ]);

    return NextResponse.json(results);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
