"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Artists", href: "/artists" },
  { name: "Artworks", href: "/artworks" },
  { name: "Trade", href: "/trade" },
  { name: "Pricing", href: "/pricing" },
];

export default function Header({ session }: { session: Session | null }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-purple-600"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                {session?.user ? (
                  <>
                    <div className="text-sm text-gray-500 mb-2">
                      Signed in as {session.user.email}
                    </div>
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/profile">My Profile</Link>
                    </Button>
                    <Button
                      className="w-full"
                      variant="destructive"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/signup">Sign up</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center mr-6">
          <div className="relative h-10 w-24">
            <svg
              viewBox="0 0 100 40"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <text
                x="10"
                y="30"
                fontFamily="Arial"
                fontSize="24"
                fontWeight="bold"
              >
                dra<tspan fill="#7C3AED">i</tspan>nt
              </text>
              <path
                d="M65 32c0 3.314-2.686 6-6 6s-6-2.686-6-6"
                stroke="#7C3AED"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </Link>

        {isSearchOpen ? (
          <div className="hidden md:flex flex-1 items-center">
            <Input
              type="search"
              placeholder="Search for artist, style, country, tag..."
              className="h-9 md:w-80 lg:w-96"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-400">
              Search for artist, style, country, tag...
            </span>
          </div>
        )}

        <div className="hidden md:flex items-center gap-4 ml-auto">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-purple-600",
                  pathname === item.href
                    ? "text-purple-600 font-semibold"
                    : "text-gray-600",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favorites">Favorites</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Link href="/signup">Sign Up!</Link>
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white">
                0
              </span>
            </Button>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="ml-auto md:hidden">
          <Search className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="ml-2 md:hidden relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white">
            0
          </span>
        </Button>
      </div>
    </header>
  );
}
