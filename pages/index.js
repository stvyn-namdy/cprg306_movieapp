import { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieForm from '../components/MovieForm';
import MovieList from '../components/MovieList';

export default function Home({ initialMovies }) {
    const [movies, setMovies] = useState(initialMovies);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null);

    const addMovie = async (movie) => {
        try {
            const response = await fetch('/api/movies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(movie)
            });

            if (response.ok) {
                const newMovie = await response.json();
                setMovies([...movies, newMovie])
            } 
        } catch (error) {
            console.error('Failed to add movie: ', error);
        }
    };

    const updateMovie = async (id, updatedMovie) => {
        try {
            const response = await fetch(`/api/movies/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(updatedMovie)
            });

            if (response.ok) {
                const updated = await response.json();
                setMovies(movies.map(movie => movie.id === id ? updated : movie));
                setIsEditing(false);
                setCurrentMovie(null);
            }
        } catch (error) {
            console.error("Failed to update movie:", error);
        }
    };

    const deleteMovie = async (id) => {
        try {
            const response = await fetch(`/api/movies/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setMovies(movies.filter(movie => movie.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete movies: ", error);
        }
    };

    const editMovie = (movie) => {
        setIsEditing(true);
        setCurrentMovie(movie);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className='flex-grow container mx-auto py-8 px-4'>
                <h1 className='text-3xl font-bold mb-6'>Internet Movies Rental Company (IMR) </h1>

                <MovieForm 
                    addMovie={addMovie}
                    updateMovie={updateMovie}
                    isEditing={isEditing}
                    currentMovie={currentMovie}
                    setIsEditing={setIsEditing}
                />
                <MovieList 
                    movies={movies}
                    onEdit={editMovie}
                    onDelete={deleteMovie}
                />
            </main>
            <Footer />
        </div>
    )
}

export async function getServerSideProps() {
    const prisma = new PrismaClient();

    try {
        const movies = await prisma.movie.findMany({
            include: {
                actors: true,
            },
        });

        return {
            props: {
                initialMovies: JSON.parse(JSON.stringify(movies))
            },
        }
    } catch (error) {
        console.error("Failed to fetch movies: ", error);
        return {
            props: {
                initialMovies: [],
            },
        }
    } finally {
        await prisma.$disconnect();
    }
}