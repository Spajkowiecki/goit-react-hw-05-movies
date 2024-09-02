import { NavLink, Outlet } from 'react-router-dom';
import camera from './film-strip.png';
import styles from './Heading.module.css';
import { Suspense } from 'react';

export default function Heading() {
  return (
    <div>
      <header className={styles.heading}>
        <NavLink>
          <img src={camera} alt="xd" />
        </NavLink>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
        </nav>
      </header>
      <Suspense fallback={<p>Loading .... </p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
