import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 600;

export async function GET() {
  const slides = await prisma.homepageSliders.findMany({
    where: {
      is_active: true,
    },
    orderBy: [{ updatedAt: "desc" }],
    take: 4,
  });
  const response = NextResponse.json({ slides });
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=300",
  );

  return response;
}
