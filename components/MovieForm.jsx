import { useState, useEffect } from 'react';

export default function MovieForm({ addMovie, updateMovie, isEditing, currentMovie, setIsEditing }) {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [actorInput, setActorInput] = useState('');
  const [actors, setActors] = useState([]);

  useEffect(() => {
    if (isEditing && currentMovie) {
      setTitle(currentMovie.title);
      setReleaseYear(currentMovie.releaseYear.toString());
      setActors(currentMovie.actors.map(actor => actor.name));
    }
  }, [isEditing, currentMovie]);

  const resetForm = () => {
    setTitle('');
    setReleaseYear('');
    setActorInput('');
    setActors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const movieData = {
      title,
      releaseYear: parseInt(releaseYear),
      actors: actors.map(name => ({ name })),
    };
    
    if (isEditing && currentMovie) {
      updateMovie(currentMovie.id, movieData);
    } else {
      addMovie(movieData);
    }
    
    resetForm();
  };

  const handleCancel = () => {
    setIsEditing(false);
    resetForm();
  };

  const addActor = () => {
    if (actorInput.trim() !== '' && !actors.includes(actorInput.trim())) {
      setActors([...actors, actorInput.trim()]);
      setActorInput('');
    }
  };

  const removeActor = (index) => {
    setActors(actors.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {isEditing ? 'Edit Movie' : 'Add New Movie'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="releaseYear" className="block text-gray-700 mb-2">
            Release Year
          </label>
          <input
            type="number"
            id="releaseYear"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="w-full p-2 border rounded-md"
            min="1900"
            max={new Date().getFullYear()}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="actors" className="block text-gray-700 mb-2">
            Actors
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="actors"
              value={actorInput}
              onChange={(e) => setActorInput(e.target.value)}
              className="flex-grow p-2 border rounded-md"
              placeholder="Enter actor name"
            />
            <button
              type="button"
              onClick={addActor}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          
          {actors.length > 0 && (
            <div className="mt-2">
              <h4 className="font-semibold mb-2">Actor List:</h4>
              <ul className="bg-white border rounded-md p-2">
                {actors.map((actor, index) => (
                  <li key={index} className="flex justify-between items-center py-1">
                    {actor}
                    <button
                      type="button"
                      onClick={() => removeActor(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isEditing ? 'Update Movie' : 'Add Movie'}
          </button>
        </div>
      </form>
    </div>
  );
}
