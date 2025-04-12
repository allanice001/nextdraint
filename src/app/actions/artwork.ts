"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { Currencies } from "@prisma/client";

export async function likeArtwork(artworkId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to like an artwork");
  }

  try {
    // Check if the artwork exists
    const artwork = await prisma.artwork.findUnique({
      where: { id: artworkId },
    });

    if (!artwork) {
      throw new Error("Artwork not found");
    }

    // Check if the user has already liked this artwork
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_artworkId: {
          userId: session.user.id,
          artworkId,
        },
      },
    });

    if (existingLike) {
      return { success: true, message: "Artwork already liked" };
    }

    // Create the like
    await prisma.like.create({
      data: {
        userId: session.user.id,
        artworkId,
      },
    });

    // Update the likes count on the artwork
    await prisma.artwork.update({
      where: { id: artworkId },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });

    revalidatePath(`/artwork/${artworkId}`);
    revalidatePath(`/artist/${artwork.userId}`);

    return { success: true };
  } catch (error) {
    console.error("Error liking artwork:", error);
    throw new Error("Failed to like artwork");
  }
}

export async function unlikeArtwork(artworkId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to unlike an artwork");
  }

  try {
    // Check if the artwork exists
    const artwork = await prisma.artwork.findUnique({
      where: { id: artworkId },
    });

    if (!artwork) {
      throw new Error("Artwork not found");
    }

    // Check if the user has liked this artwork
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_artworkId: {
          userId: session.user.id,
          artworkId,
        },
      },
    });

    if (!existingLike) {
      return { success: true, message: "Artwork not liked" };
    }

    // Delete the like
    await prisma.like.delete({
      where: {
        userId_artworkId: {
          userId: session.user.id,
          artworkId,
        },
      },
    });

    // Update the likes count on the artwork
    await prisma.artwork.update({
      where: { id: artworkId },
      data: {
        likesCount: {
          decrement: 1,
        },
      },
    });

    revalidatePath(`/artwork/${artworkId}`);
    revalidatePath(`/artist/${artwork.userId}`);

    return { success: true };
  } catch (error) {
    console.error("Error unliking artwork:", error);
    throw new Error("Failed to unlike artwork");
  }
}

export async function getMediums() {
  try {
    const mediums = await prisma.mediums.findMany({
      orderBy: { medium: "asc" },
    });

    return { success: true, mediums };
  } catch (error) {
    console.error("Error fetching mediums:", error);
    return { success: false, error: "Failed to fetch mediums" };
  }
}

export async function getStyles() {
  try {
    const styles = await prisma.styles.findMany({
      orderBy: { style: "asc" },
    });

    return { success: true, styles };
  } catch (error) {
    console.error("Error fetching styles:", error);
    return { success: false, error: "Failed to fetch styles" };
  }
}

export async function getSurfaces() {
  try {
    const surfaces = await prisma.surfaces.findMany({
      orderBy: { surface: "asc" },
    });

    return { success: true, surfaces };
  } catch (error) {
    console.error("Error fetching surfaces:", error);
    return { success: false, error: "Failed to fetch surfaces" };
  }
}

export async function uploadArtwork(data) {
  try {
    const artwork = await prisma.artwork.create({
      data: {
        title: data.title,
        description: data.description || "",
        price: data.price,
        currency: data.currency as Currencies,
        medium_id: data.medium_id,
        surface_id: data.surface_id,
        style_id: data.style_id,
        height: Number(data.height),
        width: Number(data.width),
        thickness: Number(data.thickness),
        image: data.fileUrl,
        categories: data.categories || [],
      },
    });

    return { success: true, artwork };
  } catch (error) {
    console.error("Error uploading artwork:", error);
    return { success: false, error: "Failed to upload artwork" };
  }
}
