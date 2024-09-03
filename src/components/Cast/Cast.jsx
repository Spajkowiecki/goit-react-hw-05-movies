import { useParams } from 'react-router-dom';
import styles from './Cast.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cast() {
  const [casts, setCasts] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    const callForCast = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=4119fccccb88ea5143a30bde6164b546`
      );

      console.log(data.cast);
      setCasts(data.cast);
    };

    callForCast();
  }, [movieId]);

  const SingleCast = ({ name, character, profile_path }) => {
    return (
      <div className={styles.container}>
        <div>
          <img
            width="100"
            src={`https://image.tmdb.org/t/p/original/${profile_path}`}
            alt={`profile of: ${name}`}
          />
        </div>
        <div>
          <p>
            <strong>{name}</strong> <br />
            <br /> played as:
            <strong>{character}</strong>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      {casts.map(cast => (
        <SingleCast
          key={cast.id}
          name={cast.name}
          character={cast.character}
          profile_path={cast.profile_path}
        />
      ))}
    </div>
  );
}
