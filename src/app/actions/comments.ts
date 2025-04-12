"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";

export async function getComments(artworkId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { artworkId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return { success: true, comments };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { success: false, error: "Failed to fetch comments" };
  }
}

export async function addComment(artworkId: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to comment");
  }

  try {
    // Check if the artwork exists
    const artwork = await prisma.artwork.findUnique({
      where: { id: artworkId },
    });

    if (!artwork) {
      throw new Error("Artwork not found");
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content,
        userId: session.user.id,
        artworkId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    revalidatePath(`/artwork/${artworkId}`);

    return { success: true, comment };
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment");
  }
}
