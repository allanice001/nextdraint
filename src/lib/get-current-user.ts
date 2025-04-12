import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getCurrentSession();
    if (!session?.user.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      omit: { password: true },
      where: {
        email: session.user.email,
      },
      include: {
        favorites: true,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      created_at: currentUser.createdAt.toISOString(),
      updated_at: currentUser.updatedAt.toISOString(),
    };
  } catch {
    return null;
  }
}
