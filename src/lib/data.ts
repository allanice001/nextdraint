import { prisma } from "@/lib/prisma";
import type { Artwork, Category, User } from "@prisma/client";

export type ArtworkWithArtist = Artwork & {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

export type ArtworkWithDetails = ArtworkWithArtist & {
  categories: Category[];
};

export async function getArtworks(limit = 6): Promise<ArtworkWithArtist[]> {
  try {
    return await prisma.artwork.findMany({
      where: {
        published: true,
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
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return [];
  }
}

export async function getArtworkById(
  id: string,
): Promise<ArtworkWithDetails | null> {
  try {
    return await prisma.artwork.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        categories: true,
      },
    });
  } catch (error) {
    console.error(`Error fetching artwork with id ${id}:`, error);
    return null;
  }
}

export async function getArtworksByArtist(
  artistId: string,
  limit = 4,
  excludeArtworkId?: string,
): Promise<ArtworkWithArtist[]> {
  try {
    return await prisma.artwork.findMany({
      where: {
        userId: artistId,
        published: true,
        ...(excludeArtworkId ? { id: { not: excludeArtworkId } } : {}),
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
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  } catch (error) {
    console.error(`Error fetching artworks by artist ${artistId}:`, error);
    return [];
  }
}

export async function getSimilarArtworks(
  categoryIds: string[],
  excludeArtworkId: string,
  limit = 4,
): Promise<ArtworkWithArtist[]> {
  try {
    if (!categoryIds.length) return [];

    return await prisma.artwork.findMany({
      where: {
        id: { not: excludeArtworkId },
        published: true,
        categories: {
          some: {
            id: { in: categoryIds },
          },
        },
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
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  } catch (error) {
    console.error(`Error fetching similar artworks:`, error);
    return [];
  }
}

export async function getFeaturedArtists(limit = 6): Promise<User[]> {
  try {
    return await prisma.user.findMany({
      where: {
        artworks: {
          some: {
            published: true,
          },
        },
      },
      include: {
        _count: {
          select: {
            artworks: {
              where: {
                published: true,
              },
            },
          },
        },
      },
      orderBy: {
        artworks: {
          _count: "desc",
        },
      },
      take: limit,
    });
  } catch (error) {
    console.error("Error fetching featured artists:", error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getArtworksByCategory(
  categorySlug: string,
  limit = 12,
  page = 1,
): Promise<{ artworks: ArtworkWithArtist[]; total: number }> {
  try {
    const skip = (page - 1) * limit;

    const [artworks, total] = await Promise.all([
      prisma.artwork.findMany({
        where: {
          published: true,
          categories: {
            some: {
              slug: categorySlug,
            },
          },
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
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.artwork.count({
        where: {
          published: true,
          categories: {
            some: {
              slug: categorySlug,
            },
          },
        },
      }),
    ]);

    return { artworks, total };
  } catch (error) {
    console.error(
      `Error fetching artworks by category ${categorySlug}:`,
      error,
    );
    return { artworks: [], total: 0 };
  }
}
