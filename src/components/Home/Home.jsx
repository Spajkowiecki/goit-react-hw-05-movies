import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const trendingMovies = async () => {
      const { data } = await axios.get(
        ' https://api.themoviedb.org/3/trending/movie/day?api_key=4119fccccb88ea5143a30bde6164b546'
      );
      setTrending(data.results);
    };
    trendingMovies();
  }, []);

  return (
    <>
      <h3>Sprawdź filmy na czasie!</h3>
      {trending.map(movie => (
        <p key={movie.id}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </p>
      ))}
    </>
  );
}
