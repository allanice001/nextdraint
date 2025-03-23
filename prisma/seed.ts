import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
	const sliders = [
		{
			title: 'We Sell your Paintings Worldwide',
			primary_image: 'https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/07/98efcb97-2e1b-4a04-85b8-e41e71ef3827/1641559863743-dfffab97-40e3-4e53-86fc-ca962847af8d/image.source.jpeg',
			url: '/signup/artist',
			button: 'Artist SignUp',
			author: 'Ivan Kolisnyk',
			name: 'Two Poplars',
			is_active: true,
			small_image: '{"276":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/07/98efcb97-2e1b-4a04-85b8-e41e71ef3827/1641559863743-dfffab97-40e3-4e53-86fc-ca962847af8d/276.jpeg","552":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/07/98efcb97-2e1b-4a04-85b8-e41e71ef3827/1641559863743-dfffab97-40e3-4e53-86fc-ca962847af8d/552.jpeg","640":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/07/98efcb97-2e1b-4a04-85b8-e41e71ef3827/1641559863743-dfffab97-40e3-4e53-86fc-ca962847af8d/640.jpeg","728":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/07/98efcb97-2e1b-4a04-85b8-e41e71ef3827/1641559863743-dfffab97-40e3-4e53-86fc-ca962847af8d/728.jpeg","816":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/07/98efcb97-2e1b-4a04-85b8-e41e71ef3827/1641559863743-dfffab97-40e3-4e53-86fc-ca962847af8d/816.jpeg","904":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/07/98efcb97-2e1b-4a04-85b8-e41e71ef3827/1641559863743-dfffab97-40e3-4e53-86fc-ca962847af8d/904.jpeg","992":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/07/98efcb97-2e1b-4a04-85b8-e41e71ef3827/1641559863743-dfffab97-40e3-4e53-86fc-ca962847af8d/992.jpeg","1080":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/07/98efcb97-2e1b-4a04-85b8-e41e71ef3827/1641559863743-dfffab97-40e3-4e53-86fc-ca962847af8d/1080.jpeg","1350":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/07/98efcb97-ƒ2e1b-4a04-85b8-e41e71ef3827/1641559863743-dfffab97-40e3-4e53-86fc-ca962847af8d/1350.jpeg","1620":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/07/98efcb97-2e1b-4a04-85b8-e41e71ef3827/1641559863743-dfffab97-40e3-4e53-86fc-ca962847af8d/1620.jpeg","1890":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/01/07/98efcb97-2e1b-4a04-85b8-e41e71ef3827/1641559863743-dfffab97-40e3-4e53-86fc-ca962847af8d/1890.jpeg"}',
			artwork_id: '98efcb97-2e1b-4a04-85b8-e41e71ef3827',
			createdAt: '2021-12-27T13:08:56.325972Z',
			updatedAt: '2021-12-27T13:08:56.325972Z',
		},
		{
			title: 'Re-Sell purchased Paintings',
			primary_image: 'https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/image.source.jpeg',
			url: '/trade',
			button: 'Trade your Art',
			author: 'Bereziy Lubov',
			name: 'On the grass',
			is_active: true,
			small_image: '{"276":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/276.jpeg","552":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/552.jpeg","640":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/640.jpeg","728":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/728.jpeg","816":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/816.jpeg","904":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/904.jpeg","992":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/992.jpeg","1080":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/1080.jpeg","1350":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/1350.jpeg","1620":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/1620.jpeg","1890":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/1890.jpeg","2160":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/2160.jpeg","2400":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/25/17e8f2a2-536a-4862-999e-25e7b6cda66c/1635177307958-136e754f-598d-4ef0-b580-82396ddc7b7a/2400.jpeg"}',
			artwork_id: '17e8f2a2-536a-4862-999e-25e7b6cda66c',
			createdAt: '2021-12-27T13:08:56.325972Z',
			updatedAt: '2021-12-27T13:08:56.325972Z'
		},
		{
			title: "We offer you the best 'Website Builder' tailored to artists",
			primary_image: 'https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/image.source.jpeg',
			url: '/features/artists',
			button: 'Profile Features',
			author: 'Carlos Justiniano',
			name: 'Schiltach ',
			is_active: true,
			small_image: '{"276":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/276.jpeg","552":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/552.jpeg","640":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/640.jpeg","728":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/728.jpeg","816":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/816.jpeg","904":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/904.jpeg","992":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/992.jpeg","1080":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/1080.jpeg","1350":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/1350.jpeg","1620":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/1620.jpeg","1890":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/1890.jpeg","2160":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/2160.jpeg","2400":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2021/10/29/18c5b5ba-2c70-4fb1-850f-8421d87c2ac4/1635607082067-c4d76d8e-2d79-494f-bb59-7cae65cfe69b/2400.jpeg"}',
			artwork_id: '18c5b5ba-2c70-4fb1-850f-8421d87c2ac4',
			createdAt: '2021-12-27T13:08:56.325972Z',
			updatedAt: '2021-12-27T13:08:56.325972Z'
		},
		{
			title: "Artist's websitebuilder. Promote, sell and ship at 5% fees.",
			primary_image:'https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/04/03/ea8c6d5e-84aa-48ed-b812-09e3ac3de443/1648973008272-38ef5119-5b44-40c5-b05c-a9fb41f3bc08/image.source.jpeg',
			url: '/signup/artist',
			button: 'Start Now',
			author: 'Kishore Pratim Biswas',
			name: 'Freedom of Beauty_30',
			is_active: true,
			small_image: '{"276":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/04/03/ea8c6d5e-84aa-48ed-b812-09e3ac3de443/1648973008272-38ef5119-5b44-40c5-b05c-a9fb41f3bc08/276.jpeg","552":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/04/03/ea8c6d5e-84aa-48ed-b812-09e3ac3de443/1648973008272-38ef5119-5b44-40c5-b05c-a9fb41f3bc08/552.jpeg","640":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/04/03/ea8c6d5e-84aa-48ed-b812-09e3ac3de443/1648973008272-38ef5119-5b44-40c5-b05c-a9fb41f3bc08/640.jpeg","728":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/04/03/ea8c6d5e-84aa-48ed-b812-09e3ac3de443/1648973008272-38ef5119-5b44-40c5-b05c-a9fb41f3bc08/728.jpeg","816":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/04/03/ea8c6d5e-84aa-48ed-b812-09e3ac3de443/1648973008272-38ef5119-5b44-40c5-b05c-a9fb41f3bc08/816.jpeg","904":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/04/03/ea8c6d5e-84aa-48ed-b812-09e3ac3de443/1648973008272-38ef5119-5b44-40c5-b05c-a9fb41f3bc08/904.jpeg","992":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/04/03/ea8c6d5e-84aa-48ed-b812-09e3ac3de443/1648973008272-38ef5119-5b44-40c5-b05c-a9fb41f3bc08/992.jpeg","1080":"https://media-draint-art-ams3.ams3.digitaloceanspaces.com/media/artworks/2022/04/03/ea8c6d5e-84aa-48ed-b812-09e3ac3de443/1648973008272-38ef5119-5b44-40c5-b05c-a9fb41f3bc08/1080.jpeg"}',
			artwork_id: 'ea8c6d5e-84aa-48ed-b812-09e3ac3de443',
			createdAt: '2022-02-03T15:49:04.05075Z',
			updatedAt: '2022-04-12T11:43:35.278Z'
		}
	]
	for (const slider of sliders) {
		await prisma.homepageSliders.create({data: slider})
	}
}

main()
.catch((e) => {
	console.error(e)
	process.exit(1)
})
.finally(async () => {
	await prisma.$disconnect()
})