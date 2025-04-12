import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ArtworkWithArtist } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

interface SimilarArtworksProps {
  artworks: ArtworkWithArtist[];
  title?: string;
}

export function SimilarArtworks({
  artworks,
  title = "You might also like",
}: SimilarArtworksProps) {
  if (artworks.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="relative">
        <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 scrollbar-hide">
          {artworks.map((artwork) => (
            <Card key={artwork.id} className="min-w-[250px] overflow-hidden">
              <Link href={`/artwork/${artwork.id}`}>
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={
                      artwork.image || "/placeholder.svg?height=500&width=500"
                    }
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </AspectRatio>
              </Link>
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <Link
                    href={`/artwork/${artwork.id}`}
                    className="font-medium hover:underline"
                  >
                    {artwork.title}
                  </Link>
                  <span className="text-sm font-medium">
                    {formatPrice(artwork.price.toString(), artwork.currency)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {artworks.length > 3 && (
          <>
            <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
            </div>
            <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
