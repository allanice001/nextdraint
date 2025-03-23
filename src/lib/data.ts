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
  return prisma.artwork.findMany({
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
}

export async function getArtworkById(
  id: string,
): Promise<ArtworkWithDetails | null> {
  return prisma.artwork.findUnique({
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
}

export async function getArtworksByArtist(
  artistId: string,
  limit = 4,
  excludeArtworkId?: string,
): Promise<ArtworkWithArtist[]> {
  return prisma.artwork.findMany({
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
}

export async function getSimilarArtworks(
  categoryIds: string[],
  excludeArtworkId: string,
  limit = 4,
): Promise<ArtworkWithArtist[]> {
  return prisma.artwork.findMany({
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
}

export async function getFeaturedArtists(limit = 6): Promise<User[]> {
  return prisma.user.findMany({
    where: {
      role: "OWNER",
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
}

export async function getCategories(): Promise<Category[]> {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getArtworksByCategory(
  categorySlug: string,
  limit = 12,
  page = 1,
): Promise<{ artworks: ArtworkWithArtist[]; total: number }> {
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
}
