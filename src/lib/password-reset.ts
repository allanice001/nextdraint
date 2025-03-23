import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"
import { addHours } from "date-fns"

export async function generatePasswordResetToken(email: string): Promise<string> {
	const token = randomBytes(32).toString("hex")
	const expires = addHours(new Date(), 1) // Token expires in 1 hour

	try {
		// Check if there are any existing tokens
		const existingTokens = await prisma.passwordResetToken.findMany({
			where: {
				email
			}
		})

		// Delete any existing tokens for this email
		if (existingTokens) {
			await prisma.passwordResetToken.deleteMany({
				where: {
					email,
				},
			})
		}
	} catch (e) {
		// most likely no tokens found
		console.log(e)
	}

	// Create a new token
	const passwordResetToken = await prisma.passwordResetToken.create({
		data: {
			email,
			token,
			expires,
		},
	})

	return passwordResetToken.token
}

export async function validatePasswordResetToken(token: string): Promise<string | null> {
	const passwordResetToken = await prisma.passwordResetToken.findUnique({
		where: {
			token,
		},
	})

	if (!passwordResetToken) {
		return null
	}

	// Check if token has expired
	if (new Date() > passwordResetToken.expires) {
		// Delete expired token
		await prisma.passwordResetToken.delete({
			where: {
				id: passwordResetToken.id,
			},
		})
		return null
	}

	return passwordResetToken.email
}

export async function deletePasswordResetToken(token: string): Promise<void> {
	await prisma.passwordResetToken.delete({
		where: {
			token,
		},
	})
}

