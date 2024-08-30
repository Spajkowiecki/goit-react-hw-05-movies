import { NavLink } from 'react-router-dom';
import camera from './film-strip.png';
import styles from './Heading.module.css';

export default function Heading() {
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
}
