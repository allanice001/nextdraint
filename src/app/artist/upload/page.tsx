import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth-utils"
import { ArtworkUploadForm } from "@/components/artists/artwork-upload-form"
import { getCategories } from "@/lib/data"
import { getMediums, getStyles, getSurfaces } from "@/app/actions/artwork"

export const metadata: Metadata = {
	title: "Upload Artwork | Draint",
	description: "Upload your artwork to Draint",
}

export default async function UploadArtworkPage() {
	const session = await auth()

	// Redirect if not logged in
	if (!session?.user) {
		redirect("/login?callbackUrl=/artist/upload")
	}

	// Fetch categories, mediums, styles, and surfaces
	const [categoriesResult, mediumsResult, stylesResult, surfacesResult] = await Promise.all([
		getCategories(),
		getMediums(),
		getStyles(),
		getSurfaces(),
	])

	return (
		<div className="container py-10">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold mb-6">Upload Your Artwork</h1>
				<p className="text-muted-foreground mb-8">
					Share your creativity with the world. Fill in the details below to upload your artwork to Draint.
				</p>

				<ArtworkUploadForm
					categories={categoriesResult}
					mediums={mediumsResult.success && mediumsResult.mediums ? mediumsResult.mediums : []}
					styles={stylesResult.success && stylesResult.styles ? stylesResult.styles : []}
					surfaces={surfacesResult.success && surfacesResult.surfaces ? surfacesResult.surfaces : []}
				/>
			</div>
		</div>
	)
}

