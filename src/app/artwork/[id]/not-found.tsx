import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ArtworkNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Artwork Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The artwork you&#39;re looking for doesn&#39;t exist or has been
        removed.
      </p>
      <Button asChild>
        <Link href="/artworks">Browse Artworks</Link>
      </Button>
    </div>
  );
}
