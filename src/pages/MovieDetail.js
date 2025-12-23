import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import Backup from "../assets/images/backup.png";

export const MovieDetail = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});

  // ✅ Correct usage (no unused variable)
  useTitle(movie.title);

  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : Backup;

  useEffect(() => {
    async function fetchMovie() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const json = await response.json();
      setMovie(json);
    }

    fetchMovie();
  }, [params.id]); // ✅ ESLint-safe

  return (
    <main>
      <section className="flex justify-around flex-wrap py-5">
        <div className="max-w-sm">
          <img className="rounded" src={image} alt={movie.title} />
        </div>

        <div className="max-w-2xl text-gray-700 text-lg dark:text-white">
          <h1 className="text-4xl font-bold my-3 text-center lg:text-left">
            {movie.title}
          </h1>

          <p className="my-4">{movie.overview}</p>

          {movie.genres && (
            <p className="my-7 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="mr-2 border border-gray-200 rounded dark:border-gray-600 p-2"
                >
                  {genre.name}
                </span>
              ))}
            </p>
          )}

          <div className="flex items-center">
            <p className="ml-2">{movie.vote_average}</p>
            <span className="mx-2">•</span>
            <span>{movie.vote_count} reviews</span>
          </div>

          <p className="my-4"><strong>Runtime:</strong> {movie.runtime} min</p>
          <p className="my-4"><strong>Budget:</strong> {movie.budget}</p>
          <p className="my-4"><strong>Revenue:</strong> {movie.revenue}</p>
          <p className="my-4"><strong>Release Date:</strong> {movie.release_date}</p>

          <p className="my-4">
            <strong>IMDB Code:</strong>{" "}
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noreferrer"
            >
              {movie.imdb_id}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};
