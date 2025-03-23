import { DefaultSession, DefaultUser } from "next-auth";
import type { Role } from "@prisma/client";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    name: string;
    role: Role;
  }
  interface Session extends DefaultSession {
    user: User & {
      id: string;
      role: Role;
      name: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
    name: string;
  }
}
