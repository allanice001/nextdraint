import formData from "form-data"
import Mailgun from "mailgun.js"

// Initialize Mailgun
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
	username: "api",
	key: process.env.MAILGUN_API_KEY || "",
	url: process.env.MAILGUN_URL || "https://api.mailgun.net",
})

const domain = process.env.MAILGUN_DOMAIN || ""

export interface SendEmailProps {
	to: string
	subject: string
	html: string
	from?: string
}

export async function sendEmail({
	                                to,
	                                subject,
	                                html,
	                                from = 'Draint <draint@draintart.gallery>',
                                }: SendEmailProps): Promise<any> {
	if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
		console.error("MAILGUN_API_KEY or MAILGUN_DOMAIN is not defined")
		throw new Error("MAILGUN_API_KEY or MAILGUN_DOMAIN is not defined")
	}

	try {
		const result = await mg.messages.create(domain, {
			from,
			to,
			subject,
			html,
		})

		return result
	} catch (error) {
		console.error("Failed to send email:", error)
		throw error
	}
}

