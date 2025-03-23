"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth-utils"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import {Currencies} from "@prisma/client";

const artworkSchema = z.object({
	title: z.string().min(1, { message: "Title is required" }).max(100),
	description: z.string().optional(),
	price: z.string().min(1, { message: "Price is required" }),
	currency: z.string().default("EUR"),
	medium_id: z.string().min(1, { message: "Medium is required" }),
	surface_id: z.string().min(1, { message: "Surface is required" }),
	style_id: z.string().min(1, { message: "Style is required" }),
	height: z.string().optional(),
	width: z.string().optional(),
	thickness: z.string().optional(),
	categories: z.array(z.string()).optional(),
})

export async function createArtwork(formData: FormData) {
	try {
		const session = await auth()
		if (!session?.user) {
			return { success: false, message: "You must be logged in to create artwork" }
		}

		const title = formData.get("title") as string
		const description = formData.get("description") as string
		const price = formData.get("price") as string
		const currency = formData.get("currency") as Currencies
		const medium_id = formData.get("medium_id") as string
		const surface_id = formData.get("surface_id") as string
		const style_id = formData.get("style_id") as string
		const height = formData.get("height") as string
		const width = formData.get("width") as string
		const thickness = formData.get("thickness") as string
		const image = formData.get("image") as string
		const categoriesRaw = formData.get("categories") as string
		const categories = categoriesRaw ? JSON.parse(categoriesRaw) : []

		const validatedFields = artworkSchema.safeParse({
			title,
			description,
			price,
			currency,
			medium_id,
			surface_id,
			style_id,
			height,
			width,
			thickness,
			categories,
		})

		if (!validatedFields.success) {
			return { success: false, message: "Invalid input. Please check your form." }
		}

		if (!image) {
			return { success: false, message: "Image is required" }
		}

		// Create the artwork
		const artwork = await prisma.artwork.create({
			data: {
				title,
				description,
				price: Number.parseFloat(price),
				currency,
				medium_id,
				surface_id,
				style_id,
				height: height ? Number.parseInt(height) : null,
				weight: width ? Number.parseInt(width) : null, // Note: The schema has 'weight' but the form has 'width'
				thickness: thickness ? Number.parseInt(thickness) : null,
				image,
				userId: session.user.id,
				published: true,
				categories: {
					connect: categories.map((id: string) => ({ id })),
				},
			},
		})

		revalidatePath("/artworks")
		revalidatePath("/artist/[id]", "page")
		revalidatePath("/artwork/[id]", "page")

		return { success: true, message: "Artwork created successfully", artworkId: artwork.id }
	} catch (error) {
		console.error("Error creating artwork:", error)
		return { success: false, message: "Failed to create artwork" }
	}
}

export async function getMediums() {
	try {
		const mediums = await prisma.mediums.findMany({
			orderBy: {
				medium: "asc",
			},
		})
		return { success: true, mediums }
	} catch (error) {
		console.error("Error fetching mediums:", error)
		return { success: false, message: "Failed to fetch mediums" }
	}
}

export async function getSurfaces() {
	try {
		const surfaces = await prisma.surfaces.findMany({
			orderBy: {
				surface: "asc",
			},
		})
		return { success: true, surfaces }
	} catch (error) {
		console.error("Error fetching surfaces:", error)
		return { success: false, message: "Failed to fetch surfaces" }
	}
}

export async function getStyles() {
	try {
		const styles = await prisma.styles.findMany({
			orderBy: {
				style: "asc",
			},
		})
		return { success: true, styles }
	} catch (error) {
		console.error("Error fetching styles:", error)
		return { success: false, message: "Failed to fetch styles" }
	}
}

export async function getUploadUrl() {
	return null
}

