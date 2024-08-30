import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MovieDetails from './MovieDetails/MovieDetails';
import Heading from './Heading/Heading';
import Home from './Home/Home';
import Reviews from './Reviews/Reviews';

const Movies = () => {};

const Cast = () => {
  return <p>CAST!</p>;
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
