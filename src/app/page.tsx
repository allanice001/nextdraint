import FeaturedSlides from "@/components/home/featured-slides";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {ArtworkGrid} from "@/components/artwork/artwork-grid";
import {getArtworks, getFeaturedArtists} from "@/lib/data";

export default async function Home() {
  const [trendingArtworks, featuredArtists] = await Promise.all([getArtworks(6), getFeaturedArtists(6)])

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <FeaturedSlides />

      {/* Trending Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Trending Artwork</h2>
              <p className="text-muted-foreground">Explore the latest artwork trending on Draint</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/artworks">View All</Link>
            </Button>
          </div>
          <ArtworkGrid artworks={trendingArtworks} />
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Artists</h2>
              <p className="text-muted-foreground">Discover amazing creators and their work</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/artists">View All Artists</Link>
            </Button>
          </div>

          {featuredArtists.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {featuredArtists.map((artist) => (
                <Link
                  key={artist.id}
                  href={`/artist/${artist.id}`}
                  className="group relative flex flex-col items-center text-center"
                >
                  <div className="relative h-32 w-32 overflow-hidden rounded-full mb-3 border-2 border-background group-hover:border-primary transition-colors">
                    <Image
                      src={
                        artist.image ||
                        `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(artist.name || "Artist")}`
                      }
                      width={200}
                      height={200}
                      alt={artist.name || "Artist"}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-medium">{artist.name || "Anonymous Artist"}</h3>
                  <p className="text-sm text-muted-foreground">
                    Some Data HERE
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No featured artists available</p>
            </div>
          )}
        </div>
      </section>


      {/* How It Works */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">How It Works</h2>
            <p className="text-muted-foreground max-w-[800px]">
              Draint makes it simple to create, buy, and sell digital art
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Create & Upload",
                description: "Create your artwork and upload it to your portfolio",
              },
              {
                title: "List & Sell",
                description: "Set your price and list your artwork for sale",
              },
              {
                title: "Collect & Trade",
                description: "Build your collection and trade with other collectors",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <span className="text-xl font-bold text-primary">{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">Art with Environmental Impact</h2>
              <p className="mb-4">
                We believe in sustainable art. That&#39;s why Draint contributes 1% of every payment to remove CO₂ from the
                atmosphere.
              </p>
              <p className="mb-6">
                Join us in our mission to support both artists and the environment through beautiful digital creations.
              </p>
              <Button asChild>
                <Link href="/impact">Learn More</Link>
              </Button>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              <div className="w-full max-w-md aspect-video relative">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Environmental+Impact"
                  width={600}
                  height={400}
                  alt="Environmental Impact"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
