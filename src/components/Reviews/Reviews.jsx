import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SingleReview from './SingleReview';
import styles from './Reviews.module.css';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  const { movieId } = useParams();
  console.log('ID: ' + movieId);
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
}
