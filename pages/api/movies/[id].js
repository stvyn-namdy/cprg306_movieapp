import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    try {
      const movie = await prisma.movie.findUnique({
        where: { id },
        include: { actors: true },
      });
      
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }
      
      return res.status(200).json(movie);
    } catch (error) {
      console.error("Error fetching movie:", error);
      return res.status(500).json({ error: "Failed to fetch movie" });
    }
  } else if (req.method === 'PUT') {
    const { title, releaseYear, actors } = req.body;
    
    try {
      // Get current movie with its actors
      const currentMovie = await prisma.movie.findUnique({
        where: { id },
        include: { actors: true },
      });
      
      if (!currentMovie) {
        return res.status(404).json({ error: "Movie not found" });
      }
      
      // Remove this movie from the movieIds array of all actors
      await Promise.all(
        currentMovie.actors.map(actor => 
          prisma.actor.update({
            where: { id: actor.id },
            data: { 
              movieIds: {
                set: actor.movieIds.filter(movieId => movieId !== id)
              }
            }
          })
        )
      );
      
      // Find or create actors
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
      
      // Update movie with new data
      const updatedMovie = await prisma.movie.update({
        where: { id },
        data: {
          title,
          releaseYear,
          actorIds: actorOperations.map(actor => actor.id)
        },
        include: {
          actors: true,
        },
      });
      
      // Update actors to include this movie
      await Promise.all(
        actorOperations.map(actor => 
          prisma.actor.update({
            where: { id: actor.id },
            data: { 
              movieIds: {
                push: id
              }
            }
          })
        )
      );
      
      return res.status(200).json(updatedMovie);
    } catch (error) {
      console.error("Error updating movie:", error);
      return res.status(500).json({ error: "Failed to update movie" });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Get current movie with its actors
      const currentMovie = await prisma.movie.findUnique({
        where: { id },
        include: { actors: true },
      });
      
      if (!currentMovie) {
        return res.status(404).json({ error: "Movie not found" });
      }
      
      // Remove this movie from the movieIds array of all actors
      await Promise.all(
        currentMovie.actors.map(actor => 
          prisma.actor.update({
            where: { id: actor.id },
            data: { 
              movieIds: {
                set: actor.movieIds.filter(movieId => movieId !== id)
              }
            }
          })
        )
      );
      
      // Delete the movie
      await prisma.movie.delete({
        where: { id },
      });
      
      return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      console.error("Error deleting movie:", error);
      return res.status(500).json({ error: "Failed to delete movie" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}