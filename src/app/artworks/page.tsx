import { ArtworkGrid } from "@/components/artwork/artwork-grid"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function ArtworksPage() {
	return (
		<div className="container py-10">
			<div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold">Explore Artworks</h1>
					<p className="text-muted-foreground">Discover unique digital art from creators around the world</p>
				</div>
				<div className="flex items-center gap-2">
					<Select defaultValue="recent">
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="recent">Recently Added</SelectItem>
							<SelectItem value="price-low">Price: Low to High</SelectItem>
							<SelectItem value="price-high">Price: High to Low</SelectItem>
							<SelectItem value="popular">Most Popular</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-10">
				<div className="space-y-6">
					<div>
						<h3 className="font-medium mb-3">Categories</h3>
						<div className="space-y-2">
							{["Digital Art", "Illustration", "Photography", "3D Art", "Pixel Art", "Abstract", "Portrait"].map(
								(category) => (
									<div key={category} className="flex items-center">
										<Button variant="link" className="h-auto p-0">
											{category}
										</Button>
									</div>
								),
							)}
						</div>
					</div>

					<div>
						<h3 className="font-medium mb-3">Price Range</h3>
						<Slider defaultValue={[0, 100]} max={100} step={1} className="mb-2" />
						<div className="flex items-center justify-between">
							<span className="text-sm">0 ETH</span>
							<span className="text-sm">5 ETH</span>
						</div>
					</div>
				</div>

				<div className="col-span-1 md:col-span-3">
					<ArtworkGrid />
					<div className="mt-10 flex justify-center">
						<Button variant="outline">Load More</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

