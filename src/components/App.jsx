import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MovieDetails from './MovieDetails/MovieDetails';
import Heading from './Heading/Heading';
import Home from './Home/Home';
import Reviews from './Reviews/Reviews';
import Movies from './Movies/Movies';

const Cast = () => {
  return <p>CAST!</p>;
};

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
