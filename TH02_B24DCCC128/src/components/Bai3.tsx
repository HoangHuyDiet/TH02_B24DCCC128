import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetailComponent from './MovieDetailComponent';
import type { SearchMovie, SearchResponse } from '../types/movie';

const API_KEY = 'thewdb'; 

const Bai3: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('Avatar'); 
  const [movies, setMovies] = useState<SearchMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputSearch, setInputSearch] = useState('Avatar'); 
  const navigate = useNavigate();

  const fetchMovies = async (title: string) => {
    if (title.length < 1) return; 

    setLoading(true);
    setError(null);
    try {
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`;
      const response = await axios.get<SearchResponse>(url);
      
      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
      } else {
        setMovies([]);
        setError(response.data.Error || 'Không tìm thấy phim.');
      }
    } catch (err) {
      setError('Lỗi khi kết nối tới API.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputSearch.trim()) {
      setSearchTerm(inputSearch.trim());
      navigate('/bai3'); 
    }
  };

  const handleMovieClick = (imdbID: string) => {
    navigate(`detail/${imdbID}`);
  };

  return (
    <div>
      <h2>Bài 3: Ứng dụng Tìm kiếm Phim</h2>
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder="Nhập tên phim..."
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }} disabled={loading}>
          Tìm kiếm
        </button>
      </form>

      {loading && <p>Đang tải phim...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Routes>
        <Route 
            path="/" 
            element={
                <MovieList 
                    movies={movies} 
                    onMovieClick={handleMovieClick} 
                />
            } 
        />
        <Route 
            path="detail/:imdbID" 
            element={<MovieDetailComponent />} 
        />
      </Routes>
    </div>
  );
};

export default Bai3;