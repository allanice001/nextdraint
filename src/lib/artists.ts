import { prisma } from "@/lib/prisma";

export async function getArtists({
  page = 1,
  limit = 12,
}: { page?: number; limit?: number } = {}) {
  const skip = (page - 1) * limit;

  try {
    const whereClause = {
      reviewed: true,
      image: { not: null },
    };

    const [artists, count] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        omit: {
          password: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.user.count({ where: whereClause }),
    ]);

    return {
      artists,
      count,
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    console.error("Error fetching artists:", error);
    // Return empty data instead of throwing to prevent page crashes
    return {
      artists: [],
      count: 0,
      totalPages: 0,
    };
  }
}
