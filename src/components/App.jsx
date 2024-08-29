import {
  BrowserRouter,
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';
import camera from '../images/film-strip.png';
import styles from './App.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Movies = () => {};

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [images, setImages] = useState({});

  useEffect(() => {
    const choosenMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=4119fccccb88ea5143a30bde6164b546`
      );
      console.log(data);
      setMovie(data);
    };
    choosenMovie();
  }, [movieId]);

  useEffect(() => {
    const movieImages = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=4119fccccb88ea5143a30bde6164b546`
      );

      //console.log(data.posters);
      setImages(data.posters);
    };
    movieImages();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.movieTitle}>{movie.title}</h2>
      <div className={styles.movieDetails}>
        <div className={styles.visualDetails}>
          <img
            width="400px"
            src={`https://image.tmdb.org/t/p/original/${images[0]?.file_path.slice(
              1,
              images[0]?.file_path.length
            )}`}
            alt="movie poster"
          />
        </div>
        <div className={styles.textDetails}>
          <ul>
            <li className={styles.overview}>
              <strong>Overview:</strong> <p>{movie?.overview}</p>
            </li>
            <li className={styles.genres}>
              <strong>Genres:</strong>
              {movie.genres?.map(genre => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </li>
            <li className={styles.addDetails}>
              <div>
                <strong>Additional informations:</strong>
                <p className={styles.cr}>
                  <NavLink to="cast">Cast</NavLink>
                  <NavLink to="reviews">reviews</NavLink>
                </p>
              </div>
              <Outlet />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Cast = () => {
  return <p>CAST!</p>;
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const SingleReview = ({ username, review, creationData }) => {
    return (
      <div className={styles.review}>
        <p>
          <span>
            {username} | {creationData.slice(0, 10)}
          </span>
        </p>
        <p>{review}</p>
      </div>
    );
  };

  const { movieId } = useParams();
  useEffect(() => {
    const movieRevs = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=4119fccccb88ea5143a30bde6164b546`
      );
      console.log(data.results);
      setReviews(data.results);
    };

    movieRevs();
  }, [movieId]);

  return (
    <div className={styles.reviews}>
      {reviews?.map(rev => (
        <SingleReview
          key={rev.id}
          username={rev.author}
          review={rev.content}
          creationData={rev.created_at}
        />
      ))}
    </div>
  );
};

const Heading = () => {
  return (
    <header className={styles.heading}>
      <NavLink>
        <img src={camera} alt="xd" />
      </NavLink>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
    </header>
  );
};

const Home = () => {
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
};

export default function App() {
  return (
    <BrowserRouter>
      <Heading />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="/movies/:movieId/reviews" element={<Reviews />} />
          <Route path="/movies/:movieId/cast" element={<Cast />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
