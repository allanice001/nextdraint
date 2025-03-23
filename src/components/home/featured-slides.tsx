import { Suspense } from "react";
import { InfiniteCarousel } from "./infinite-carousel";

async function getSlides() {
  try {
    // Use absolute URL in production, relative URL in development
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "";

    const res = await fetch(`${baseUrl}/api/site/slides`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch slides");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching slides:", error);
    return { slides: [] };
  }
}

export default async function FeaturedSlides() {
  const { slides } = await getSlides();

  return (
    <section className="w-full py-12">
      <div className="container px-4">
        <Suspense fallback={<SlidesSkeleton />}>
          <InfiniteCarousel slides={slides} />
        </Suspense>
      </div>
    </section>
  );
}

function SlidesSkeleton() {
  return (
    <div className="relative h-[500px] w-full rounded-lg overflow-hidden bg-gray-200 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute bottom-8 left-8 space-y-4">
        <div className="h-8 w-64 bg-gray-300 rounded"></div>
        <div className="h-10 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
