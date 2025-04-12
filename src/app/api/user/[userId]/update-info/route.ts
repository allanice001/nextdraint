import { getCurrentUser } from "@/lib/get-current-user";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ message: "Not authorised" }, { status: 401 });
    }

    const { name, email, bio, website, location } = await request.json();

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        bio,
        website,
        location,
      },
    });

    return NextResponse.json(
      {
        message: "Profile has been updated",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Profile Error:", error);
    return NextResponse.json(
      { message: "Profile error occurred" },
      { status: 500 },
    );
  }
}
