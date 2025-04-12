"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Slide } from "@/types/slides";

interface InfiniteCarouselProps {
  slides: Slide[];
}

export function InfiniteCarousel({ slides }: InfiniteCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fix: Move early return after all hooks
  const isEmpty = !slides || slides.length === 0;

  const goToSlide = (index: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex(index);

    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const goToNextSlide = () => {
    if (isEmpty) return;
    const nextIndex = (activeIndex + 1) % slides.length;
    goToSlide(nextIndex);
  };

  const goToPrevSlide = () => {
    if (isEmpty) return;
    const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  };

  // Pause auto-advance when user interacts with carousel
  const pauseAutoAdvance = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Resume auto-advance when user stops interacting
  const resumeAutoAdvance = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(goToNextSlide, 5000);
  };

  // Auto-advance slides
  useEffect(() => {
    if (isEmpty) return;

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Set up new timer
    timerRef.current = setInterval(goToNextSlide, 5000);

    // Clean up on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeIndex, isAnimating, isEmpty, slides?.length, goToNextSlide]);

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

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      onMouseEnter={pauseAutoAdvance}
      onMouseLeave={resumeAutoAdvance}
    >
      <div
        className="relative w-full items-center justify-center"
        style={{ height: "500px" }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.primary_image || "//placehold.co/800x1200"}
              alt={slide.title || "Featured artwork"}
              fill
              className="object-cover"
              priority={index === 0}
              onError={(e) => {
                e.currentTarget.src = "//placehold.co/800x1200";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
              <h2 className="max-w-[550px] text-[44px] leading-[50px]">
                {slide.title}
              </h2>
              {slide.button && (
                <Link href={slide.url || "#"}>
                  <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                    {slide.button}
                  </Button>
                </Link>
              )}

              {slide.author && (
                <p className="text-sm font-medium mb-1">
                  Artwork - <b>{slide.name}</b> by {slide.author}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full z-20"
        onClick={goToPrevSlide}
        disabled={isAnimating}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full z-20"
        onClick={goToNextSlide}
        disabled={isAnimating}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${index === activeIndex ? "bg-white" : "bg-white/50"}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
