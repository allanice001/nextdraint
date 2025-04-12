import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Share2, Eye, ShoppingCart, Info } from "lucide-react";
import { SimilarArtworks } from "@/components/artwork/similar-artworks";
import {
  getArtworkById,
  getArtworksByArtist,
  getSimilarArtworks,
} from "@/lib/data";
import { formatPrice } from "@/lib/utils";

interface ArtworkPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ArtworkPageProps): Promise<Metadata> {
  const artwork = await getArtworkById(params.id);

  if (!artwork) {
    return {
      title: "Artwork Not Found | Draint",
      description: "The requested artwork could not be found",
    };
  }

  return {
    title: `${artwork.title} | Draint`,
    description:
      artwork.description || "View artwork details and purchase digital art",
  };
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const artwork = await getArtworkById(params.id);

  if (!artwork) {
    notFound();
  }

  // Get more artworks from the same artist
  const artistArtworks = await getArtworksByArtist(
    artwork.userId,
    4,
    artwork.id,
  );

  // Get similar artworks based on categories
  const categoryIds = artwork.categories.map((category) => category.id);
  const similarArtworks = await getSimilarArtworks(categoryIds, artwork.id, 4);

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={artwork.image || "/placeholder.svg?height=800&width=800"}
              alt={artwork.title}
              width={800}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to favorites</span>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">1,245 views</span>
            </div>
            <div className="flex gap-1">
              {artwork.categories.map((category) => (
                <Badge key={category.id} variant="outline">
                  {category.name}
                </Badge>
              ))}
              {artwork.categories.length === 0 && (
                <Badge variant="outline">Digital Art</Badge>
              )}
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
          <div className="flex items-center mb-6">
            <Link
              href={`/artist/${artwork.user.id}`}
              className="flex items-center gap-2 hover:underline"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={artwork.user.image || ""}
                  alt={artwork.user.name || "Artist"}
                />
                <AvatarFallback>
                  {artwork.user.name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">
                {artwork.user.name || "Anonymous Artist"}
              </span>
            </Link>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h2 className="text-xl font-semibold">Price</h2>
              <span className="text-sm text-muted-foreground">
                Limited Edition (1 of 10)
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {formatPrice(artwork.price.toString(), artwork.currency)}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <Button className="w-full gap-2" size="lg">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" className="w-full">
              Make an Offer
            </Button>
          </div>

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="space-y-4 py-4">
              {artwork.description ? (
                <p>{artwork.description}</p>
              ) : (
                <p>No description provided for this artwork.</p>
              )}
            </TabsContent>
            <TabsContent value="details" className="py-4">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Created</span>
                  <span>
                    {new Date(artwork.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Size</span>
                  <span>3000 x 3000 px</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Format</span>
                  <span>PNG</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Token Standard</span>
                  <span>ERC-721</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Blockchain</span>
                  <span>Ethereum</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="history" className="py-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage
                      src={artwork.user.image || ""}
                      alt={artwork.user.name || "Artist"}
                    />
                    <AvatarFallback>
                      {artwork.user.name?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      Created by {artwork.user.name || "Anonymous Artist"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(artwork.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=50&width=50"
                      alt="Listed"
                    />
                    <AvatarFallback>
                      <Info className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      Listed for{" "}
                      {formatPrice(artwork.price.toString(), artwork.currency)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(artwork.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {artistArtworks.length > 0 && (
        <SimilarArtworks
          artworks={artistArtworks}
          title="More from this artist"
        />
      )}

      {similarArtworks.length > 0 && (
        <SimilarArtworks
          artworks={similarArtworks}
          title="You might also like"
        />
      )}
    </div>
  );
}
