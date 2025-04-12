import { Prisma } from "@prisma/client";

type UserWithFavourites = Prisma.UserGetPayload<{
  include: {
    favorites: true;
  };
}>;

export type CurrentUser = Omit<
  UserWithFavourites,
  "password" | "createdAt" | "updatedAt"
> & {
  createdAt: Date;
  updatedAt: Date;
};
