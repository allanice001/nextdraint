import { render } from "@react-email/render"
import type { ReactElement } from "react"

export async function renderReactEmail(email: ReactElement): Promise<string> {
	return await render(email, {
		pretty: true,
	})
}

