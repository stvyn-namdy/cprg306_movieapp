export default function MovieList({ movies, onEdit, onDelete }) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Movies</h2>
        {movies.length === 0 ? (
          <p className="text-gray-500">No movies found. Add a movie to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="border rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                  <p className="text-gray-600 mb-4">Released: {movie.releaseYear}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-1">Actors:</h4>
                    {movie.actors.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {movie.actors.map((actor) => (
                          <li key={actor.id}>{actor.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No actors listed</p>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => onEdit(movie)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(movie.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }