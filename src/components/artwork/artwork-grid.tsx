import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ArtworkWithArtist } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

interface ArtworkGridProps {
  artworks: ArtworkWithArtist[];
}

export function ArtworkGrid({ artworks }: ArtworkGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No artworks found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks.map((artwork) => (
        <Card
          key={artwork.id}
          className="overflow-hidden transition-all hover:shadow-md"
        >
          <Link href={`/artwork/${artwork.id}`}>
            <AspectRatio ratio={1 / 1}>
              <Image
                src={artwork.image || "/placeholder.svg?height=500&width=500"}
                alt={artwork.title}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </AspectRatio>
          </Link>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <Link
                  href={`/artwork/${artwork.id}`}
                  className="font-medium hover:underline"
                >
                  {artwork.title}
                </Link>
                <div className="flex items-center mt-1">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage
                      src={artwork.user.image || ""}
                      alt={artwork.user.name || ""}
                    />
                    <AvatarFallback>
                      {artwork.user.name?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <Link
                    href={`/artist/${artwork.user.id}`}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {artwork.user.name || "Anonymous Artist"}
                  </Link>
                </div>
              </div>
              <div className="text-right">
                <span className="font-medium text-sm">
                  {formatPrice(artwork.price.toString(), artwork.currency)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
