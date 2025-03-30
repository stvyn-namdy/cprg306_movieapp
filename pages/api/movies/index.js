import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const movies = await prisma.movie.findMany({
        include: {
          actors: true,
        },
      });
      return res.status(200).json(movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
      return res.status(500).json({ error: "Failed to fetch movies" });
    }
  } else if (req.method === 'POST') {
    const { title, releaseYear, actors } = req.body;
    
    try {
      // First create or find actors
      const actorOperations = await Promise.all(
        actors.map(async (actor) => {
          const existingActor = await prisma.actor.findFirst({
            where: { name: actor.name }
          });
          
          if (existingActor) {
            return existingActor;
          } else {
            return await prisma.actor.create({
              data: { name: actor.name }
            });
          }
        })
      );
      
      // Then create the movie with connections to actors
      const newMovie = await prisma.movie.create({
        data: {
          title,
          releaseYear,
          actorIds: actorOperations.map(actor => actor.id)
        },
        include: {
          actors: true,
        },
      });
      
      // Update actors to point back to this movie
      await Promise.all(
        actorOperations.map(actor => 
          prisma.actor.update({
            where: { id: actor.id },
            data: { 
              movieIds: {
                push: newMovie.id
              }
            }
          })
        )
      );
      
      return res.status(201).json(newMovie);
    } catch (error) {
      console.error("Error creating movie:", error);
      return res.status(500).json({ error: "Failed to create movie" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}