"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Mock data - in a real app, this would come from the database
const ARTWORKS = [
  {
    id: "1",
    title: "Abstract Harmony",
    artist: "Elena Martinez",
    price: 450,
    imageUrl: "//placehold.co/300x400",
    artistId: "elena-martinez",
  },
  {
    id: "2",
    title: "Urban Reflections",
    artist: "Marcus Chen",
    price: 620,
    imageUrl: "//placehold.co/300x400",
    artistId: "marcus-chen",
  },
  {
    id: "3",
    title: "Coastal Dreams",
    artist: "Sophie Williams",
    price: 380,
    imageUrl: "//placehold.co/300x400",
    artistId: "sophie-williams",
  },
  {
    id: "4",
    title: "Misty Mountains",
    artist: "David Kim",
    price: 550,
    imageUrl: "//placehold.co/300x400",
    artistId: "david-kim",
  },
];

export default function FeaturedArtworks() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {ARTWORKS.map((artwork) => (
        <Card key={artwork.id} className="overflow-hidden">
          <div className="relative">
            <Link href={`/artworks/${artwork.id}`}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={artwork.imageUrl || "//placehold.co/300x400"}
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full h-8 w-8 p-1.5"
              onClick={() => toggleFavorite(artwork.id)}
            >
              <Heart
                className={`h-full w-full ${favorites[artwork.id] ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>
          <CardContent className="p-4">
            <Link
              href={`/artworks/${artwork.id}`}
              className="font-medium hover:underline"
            >
              {artwork.title}
            </Link>
            <div className="mt-1">
              <Link
                href={`/artists/${artwork.artistId}`}
                className="text-sm text-gray-500 hover:text-purple-600"
              >
                by {artwork.artist}
              </Link>
            </div>
            <div className="mt-2 font-semibold">€{artwork.price}</div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button variant="outline" size="sm" className="w-full">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
