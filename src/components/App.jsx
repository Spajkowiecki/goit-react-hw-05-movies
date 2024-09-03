import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Heading from './Heading/Heading';
import { lazy } from 'react';
import Cast from './Cast/Cast';

const Home = lazy(() => import('./Home/Home'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
const Movies = lazy(() => import('./Movies/Movies'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Heading />}>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="reviews" element={<Reviews />} />
            <Route path="cast" element={<Cast />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
