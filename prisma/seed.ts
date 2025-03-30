import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.movie.createMany({
    data: [
      {
        title: "Dilwale Dulhania Le Jayenge",
        actors: ["Shahrukh Khan", "Kajol"],
        releaseYear: 1995,
      },
      {
        title: "My Name Is Khan",
        actors: ["Shahrukh Khan", "Kajol"],
        releaseYear: 2010,
      },
      {
        title: "Chennai Express",
        actors: ["Shahrukh Khan", "Deepika Padukone"],
        releaseYear: 2013,
      },
    ],
  });
}
main();
