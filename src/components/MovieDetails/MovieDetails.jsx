import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';

import styles from './MovieDetails.module.css';

export default function MovieDetails() {
  const location = useLocation();

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
      <div className={styles.movieDetails}>
        <div className={styles.visualDetails}>
          <img
            width="530px"
            src={`https://image.tmdb.org/t/p/original/${images[0]?.file_path.slice(
              1,
              images[0]?.file_path.length
            )}`}
            alt="movie poster"
          />
        </div>
        <div className={styles.textDetails}>
          <div className={styles.movieHeader}>
            <Link to={location.state?.prevPage || '/'}>Go back</Link>
            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <div className={styles.genres}>
              {movie.genres?.map(genre => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>
          </div>

          <ul className={styles.additionalInfos}>
            <li>
              <p>
                <strong>Overview:</strong>
                <br />
                <br />
                {movie?.overview}
              </p>
            </li>
            <li>
              <div className={styles.links}>
                <strong>Additional informations:</strong>
                <div className={styles.additionalNav}>
                  <NavLink to="cast">Cast</NavLink>
                  <NavLink to="reviews">Reviews</NavLink>
                </div>
                <div className={styles.outlet}>
                  <Outlet />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
