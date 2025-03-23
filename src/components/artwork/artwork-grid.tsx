import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ArtworkGrid() {
	const artworks = [
		{
			id: 1,
			title: "Digital Dream",
			artist: {
				name: "Jane Cooper",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			image: "/placeholder.svg?height=500&width=500",
			price: "0.85 ETH",
		},
		{
			id: 2,
			title: "Abstract Harmony",
			artist: {
				name: "Darlene Robertson",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			image: "/placeholder.svg?height=500&width=500",
			price: "1.2 ETH",
		},
		{
			id: 3,
			title: "Neon Cityscape",
			artist: {
				name: "Robert Fox",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			image: "/placeholder.svg?height=500&width=500",
			price: "0.75 ETH",
		},
		{
			id: 4,
			title: "Digital Wilderness",
			artist: {
				name: "Leslie Alexander",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			image: "/placeholder.svg?height=500&width=500",
			price: "2.0 ETH",
		},
		{
			id: 5,
			title: "Futuristic Portal",
			artist: {
				name: "Guy Hawkins",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			image: "/placeholder.svg?height=500&width=500",
			price: "1.5 ETH",
		},
		{
			id: 6,
			title: "Cosmic Journey",
			artist: {
				name: "Jenny Wilson",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			image: "/placeholder.svg?height=500&width=500",
			price: "0.9 ETH",
		},
	]

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{artworks.map((artwork) => (
				<Card key={artwork.id} className="overflow-hidden transition-all hover:shadow-md">
					<Link href={`/artwork/${artwork.id}`}>
						<AspectRatio ratio={1 / 1}>
							<Image
								src={artwork.image || "/placeholder.svg"}
								alt={artwork.title}
								fill
								className="object-cover transition-transform hover:scale-105"
							/>
						</AspectRatio>
					</Link>
					<CardContent className="p-4">
						<div className="flex justify-between items-start">
							<div>
								<Link href={`/artwork/${artwork.id}`} className="font-medium hover:underline">
									{artwork.title}
								</Link>
								<div className="flex items-center mt-1">
									<Avatar className="h-6 w-6 mr-2">
										<AvatarImage src={artwork.artist.avatar} alt={artwork.artist.name} />
										<AvatarFallback>{artwork.artist.name.charAt(0)}</AvatarFallback>
									</Avatar>
									<Link
										href={`/artist/${artwork.artist.name}`}
										className="text-sm text-muted-foreground hover:text-foreground"
									>
										{artwork.artist.name}
									</Link>
								</div>
							</div>
							<div className="text-right">
								<span className="font-medium text-sm">{artwork.price}</span>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

