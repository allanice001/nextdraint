"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Slide } from "@/types/slides";

interface SlidesCarouselProps {
  slides: Slide[];
}

export function SlidesCarousel({ slides }: SlidesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Fix: Move early return after all hooks
  const isEmpty = !slides || slides.length === 0;

  // For debugging
  useEffect(() => {
    if (isEmpty) return;
    console.log("Carousel slides:", slides);
  }, [slides, isEmpty]);

  const nextSlide = () => {
    if (isTransitioning || isEmpty) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match this with your transition duration
  };

  const prevSlide = () => {
    if (isTransitioning || isEmpty) return;

    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
    );

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match this with your transition duration
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (isEmpty) return;

    let intervalId: NodeJS.Timeout | null = null;

    const startAutoPlay = () => {
      intervalId = setInterval(nextSlide, 5000);
      autoPlayRef.current = intervalId;
    };

    const clearAutoPlay = () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };

    clearAutoPlay();
    startAutoPlay();

    return () => {
      clearAutoPlay();
    };
  }, [currentIndex, isTransitioning, isEmpty, slides?.length, nextSlide]);

  // Handle empty slides array
  if (isEmpty) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          No featured artworks available at the moment.
        </p>
      </div>
    );
  }

  // Create a duplicate array with the first slide at the end and the last slide at the beginning
  // This creates the illusion of infinite looping
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Debugging info - remove in production */}
      <div className="absolute top-0 right-0 bg-black/50 text-white text-xs p-1 z-50">
        Slides: {slides.length} | Current: {currentIndex}
      </div>

      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${(currentIndex + 1) * 100}%)` }}
      >
        {extendedSlides.map((slide, index) => (
          <div key={`${slide.id}-${index}`} className="min-w-full">
            <div className="relative h-[500px] w-full">
              <Image
                src={slide.primary_image || "//placehold.co/800x1200"}
                alt={slide.title || "Featured artwork"}
                fill
                className="object-cover"
                priority={index === 1} // Priority for the first real slide
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.src = "//placehold.co/800x1200";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                {slide.author && (
                  <p className="text-sm font-medium mb-1">{slide.author}</p>
                )}
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {slide.title}
                </h3>
                {slide.button && (
                  <Link href={slide.url || "#"}>
                    <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                      {slide.button}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full"
        onClick={prevSlide}
        disabled={isTransitioning}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full"
        onClick={nextSlide}
        disabled={isTransitioning}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => {
                  setIsTransitioning(false);
                }, 500);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
