"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {Suspense, useEffect, useState} from "react";
import FeaturedArtworks from "@/components/featured-artworks";
import {
  Carousel, CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover Original Art Online
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Connect with talented artists worldwide. Buy original
                  paintings, support creators, and transform your space.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Link href="/artworks">Explore Artworks</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/artists">Meet Our Artists</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] relative aspect-square rounded-xl overflow-hidden shadow-xl">
              {/*

              */}
              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
              >
                <CarouselContent>
                  <CarouselItem>
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image
                          src="https://media.draintart.gallery/media/artworks/2021/08/05/89c746a9-0ec1-414e-94d1-9b8ac5e5a166/1628192845519-ed6621e7-c553-421d-965d-8b74d8e816ff/276.jpeg"
                          alt="Featured artwork"
                          className="object-cover"
                          fill
                          priority
                        />
                      </CardContent>
                      <CardFooter>
                        Side {current} of {count}
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image
                          src="https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/13/dbe44c1e-1963-48e1-8532-98e601f00224/1642070904789-cada58b0-7f6d-4938-b61d-7d5beea93dfa/276.jpeg"
                          alt="Featured artwork"
                          className="object-cover"
                          fill
                          priority
                        />
                      </CardContent>
                      <CardFooter>
                        Side {current} of {count}
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image
                          src="https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/29/428e5cef-052c-45da-ad24-0d365b390f56/1643489477591-34d6c608-14d9-4948-a3a8-8ad1d14efb5f/1620.jpeg"
                          alt="Featured artwork"
                          className="object-cover"
                          fill
                          priority
                        />
                      </CardContent>
                      <CardFooter>
                        Side {current} of {count}
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="w-full py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Artworks
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover handpicked creations from our talented artists
              </p>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="flex justify-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full border-t-transparent"></div>
              </div>
            }
          >
            <FeaturedArtworks />
          </Suspense>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Choose Draint
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We connect art lovers with unique original pieces while
                supporting sustainable practices
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-purple-100 p-3">
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
                  className="text-purple-600 h-6 w-6"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Original Artwork</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Every piece on our platform is an original creation directly
                from the artist.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-purple-100 p-3">
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
                  className="text-purple-600 h-6 w-6"
                >
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Fair Compensation</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Artists receive fair payment for their work through our
                transparent marketplace.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-purple-100 p-3">
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
                  className="text-purple-600 h-6 w-6"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Eco-Friendly</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                We contribute 1% of each payment to remove CO₂ from the
                atmosphere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
