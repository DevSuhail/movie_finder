import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'use-debounce';
import Footer from './components/Footer';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) { throw new Error('failed to fetch') }

      const data = await response.json();

      if (data.Response === "false") {
        setErrorMessage(data.Error || "failed to fetch movies.");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

    } catch (error) {
      console.log(`Error fetching movies : ${error}`);
      setErrorMessage("error fetching movies. please try later.");
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);


  return (
    <main className='atma-light'>
      <div className='pattern' />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1 className=''>Find <span className='text-gradient'>Movies</span> that u'll Enjoy Without any Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className='all-movies'>
          <h2 className='mt-[20px] flex justify-center text-purple-400'>All Movies</h2>
          {isLoading ? (<Spinner />)
            : errorMessage ? (<p className='text-red-500'>(errorMessage)</p>)
              : (
                <ul>
                  {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
              )}
        </section>
        <h1 className='text-white'>{searchTerm}</h1>
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      </div>
      <Footer/>
    </main>
  )
}

export default App
