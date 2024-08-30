import styles from './Reviews.module.css';

export default function SingleReview({ username, review, creationData }) {
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
}
