export interface Slide {
	id: string
	title: string
	primary_image: string
	small_image?: string
	url: string
	button: string
	author?: string
	name?: string
	is_active: boolean
	artwork_id?: string
	show_for_role?: string
	username?: string
	is_username?: string
	created_at: string
	updated_at: string
}

export interface SlidesResponse {
	slides: Slide[]
}

