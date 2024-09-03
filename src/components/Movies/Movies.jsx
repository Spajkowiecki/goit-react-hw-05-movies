import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './Movies.module.css';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const prevPage = location.pathname + location.search;

  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const MoviesSearch = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=4119fccccb88ea5143a30bde6164b546`
      );
      setMovies(data.results);
    };

    MoviesSearch();
  }, [query]);

  const updateQuery = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const search = form.elements.search.value;
    setSearchParams({
      query: search,
    });
    setQuery(search);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={updateQuery}>
        <input type="text" name="search" placeholder="search for movie..." />
        <button type="submit">search</button>
      </form>
      <div>
        <ul className={styles.movies}>
          {movies.map(movie => (
            <li key={movie.id} className={styles.movie}>
              <Link state={{ prevPage }} to={`/movies/${movie.id}`}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
