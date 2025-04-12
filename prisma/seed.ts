import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Digital Art", slug: "digital-art" },
    { name: "Illustration", slug: "illustration" },
    { name: "Photography", slug: "photography" },
    { name: "3D Art", slug: "3d-art" },
    { name: "Pixel Art", slug: "pixel-art" },
    { name: "Abstract", slug: "abstract" },
    { name: "Portrait", slug: "portrait" },
  ];

  const mediums = [
    { medium: "Acrylic" },
    { medium: "Enamel" },
    { medium: "Encaustic" },
    { medium: "Gesso" },
    { medium: "Gouache" },
    { medium: "Ink" },
    { medium: "Oil" },
    { medium: "Pastel" },
    { medium: "Spray Paint" },
    { medium: "Tempera" },
    { medium: "Template" },
    { medium: "Watercolor" },
    { medium: "Mixed" },
    { medium: "Other" },
    { medium: "Airbrush" },
  ];

  const surfaces = [
    { surface: "Acrylic Glass" },
    { surface: "Aluminum" },
    { surface: "Bronze" },
    { surface: "Canvas" },
    { surface: "Carbon Fiber" },
    { surface: "Ceramics" },
    { surface: "Cotton" },
    { surface: "Glass" },
    { surface: "Material" },
    { surface: "Metal" },
    { surface: "Paper" },
    { surface: "Plastic" },
    { surface: "Pulp board" },
    { surface: "Sand" },
    { surface: "Soap" },
    { surface: "Stainless Steel" },
    { surface: "Stone" },
    { surface: "Vegetable" },
    { surface: "Wood" },
    { surface: "Other" },
  ];

  const styles = [
    { style: "Abstract Art" },
    { style: "Abstract Expressionism" },
    { style: "Action Painting" },
    { style: "Art Deco" },
    { style: "Art Nouveau" },
    { style: "Animal portrait" },
    { style: "Classicism" },
    { style: "Color Field Painting" },
    { style: "Comic Art" },
    { style: "Concept Art" },
    { style: "Concrete Art" },
    { style: "Contemporary Painting" },
    { style: "Country Art" },
    { style: "Cubism" },
    { style: "Culinary Motive" },
    { style: "Dada" },
    { style: "Documentary Art" },
    { style: "Drip Painting" },
    { style: "Environmental Art \/ Nature Art" },
    { style: "Expressionism" },
    { style: "Fauvism" },
    { style: "Figurative Art" },
    { style: "Gothic" },
    { style: "Hyper Realism" },
    { style: "Illustration" },
    { style: "Impressionism" },
    { style: "Informal Art" },
    { style: "Minimalism" },
    { style: "Modernism" },
    { style: "Monochrome Painting" },
    { style: "Naive art" },
    { style: "Neoexpressionismus" },
    { style: "Op-Art" },
    { style: "Outsider Art" },
    { style: "Paper Art" },
    { style: "Photorealism" },
    { style: "Pop Art" },
    { style: "Pop Surrealism \/ Lowbrow" },
    { style: "Popular" },
    { style: "Portrait" },
    { style: "Process Art" },
    { style: "Psychedelic Art" },
    { style: "Romantic Art" },
    { style: "Shaped Canvas" },
    { style: "Street Art \/ Urban Art" },
    { style: "Surrealism" },
    { style: "Symbolism" },
    { style: "Tonalism" },
    { style: "Other" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  for (const medium of mediums) {
    await prisma.mediums.upsert({
      where: { medium: medium.medium },
      update: {},
      create: medium,
    });
  }

  for (const surface of surfaces) {
    await prisma.surfaces.upsert({
      where: { surface: surface.surface },
      update: {},
      create: {
        surface: surface.surface,
      },
    });
  }

  for (const style of styles) {
    await prisma.styles.upsert({
      where: { style: style.style },
      update: {},
      create: style,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
