import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET() {
	const slides = await prisma.homepage_sliders.findMany({
		where: {
			is_active: true
		},
		orderBy: [{updated_at: 'desc'}],
		take: 4
	})
	return NextResponse.json({slides})
}