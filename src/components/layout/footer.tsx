import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center">
              <div className="relative h-8 w-24">
                <Image
                  width="96"
                  height="32"
                  alt="Logo"
                  src="https://media.draintart.gallery/media/static/image/c29cea01-f05c-426e-bf96-eeb94b526534/source.png"
                />
              </div>
            </Link>
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="E-Mail-Address"
                  className="h-9 w-full"
                />
                <Button className="bg-purple-600 hover:bg-purple-700">
                  News
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Thanks for joining our Newsletter!
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-gray-600"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-gray-600"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-200">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-full w-full p-2"
                >
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M7 13l3 3 7-7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-sm">
                <p className="font-medium">
                  Draint will contribute{" "}
                  <span className="font-bold">1% of your Payment</span> to
                  remove CO₂ from the Atmosphere.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">SOCIAL</h3>
            <Link
              href="#"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Facebook
            </Link>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">ARTISTS</h3>
            <Link
              href="/profile"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Profile Overview
            </Link>
            <Link
              href="/signup"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              SignUp
            </Link>
            <Link
              href="/why-draint"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Why Draint
            </Link>
            <Link
              href="/mission"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Mission & Vision
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Blog
            </Link>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">COLLECTORS</h3>
            <Link
              href="/trade"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Trade your Paintings
            </Link>
            <Link
              href="/signup"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              SignUp
            </Link>
            <Link
              href="/search-artists"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Search for Artists
            </Link>
            <Link
              href="/search-paintings"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Search for Paintings
            </Link>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">LEGAL</h3>
            <Link
              href="/shipping"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Shipping
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/imprint"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Imprint
            </Link>
            <Link
              href="/legals"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Legals
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
