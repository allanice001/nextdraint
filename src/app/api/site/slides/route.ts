import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET() {
  const slides = await prisma.homepageSliders.findMany({
    where: {
      is_active: true,
    },
    orderBy: [{ updatedAt: "desc" }],
  });
  return NextResponse.json({ slides });
}
