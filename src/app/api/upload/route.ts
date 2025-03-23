import { type NextRequest, NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { auth } from "@/lib/auth-utils"
import crypto from "crypto"

// Initialize S3 client for DigitalOcean Spaces
const s3Client = new S3Client({
	region: "us-east-1", // DigitalOcean Spaces use this region identifier
	endpoint: process.env.DO_SPACES_ENDPOINT,
	credentials: {
		accessKeyId: process.env.DO_SPACES_KEY || "",
		secretAccessKey: process.env.DO_SPACES_SECRET || "",
	},
})

const spaceName = process.env.DO_SPACES_NAME || ""

export async function POST(request: NextRequest) {
	try {
		// Check authentication
		const session = await auth()
		if (!session?.user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		// Get the file from the request
		const formData = await request.formData()
		const file = formData.get("file") as File | null

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 })
		}

		// Validate file type
		const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
		if (!validTypes.includes(file.type)) {
			return NextResponse.json(
				{ error: "Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image." },
				{ status: 400 },
			)
		}

		// Generate a unique file name
		const uniqueId = crypto.randomBytes(16).toString("hex")
		const uniqueFileName = `artworks/${uniqueId}-${file.name}`

		// Convert file to buffer
		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		// Upload to DigitalOcean Spaces
		const command = new PutObjectCommand({
			Bucket: spaceName,
			Key: uniqueFileName,
			Body: buffer,
			ContentType: file.type,
			ACL: "public-read",
		})

		await s3Client.send(command)

		// Construct the public URL for the file
		const fileUrl = `https://${spaceName}.${process.env.DO_SPACES_ENDPOINT?.replace("https://", "")}/${uniqueFileName}`

		return NextResponse.json({ success: true, fileUrl })
	} catch (error) {
		console.error("Error uploading file:", error)
		return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
}

