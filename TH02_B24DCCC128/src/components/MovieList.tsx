import React from 'react';
import type { SearchMovie } from '../types/movie';

interface MovieListProps {
  movies: SearchMovie[];
  onMovieClick: (imdbID: string) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieClick }) => {
  if (movies.length === 0) {
    return <p>Không có phim nào được tìm thấy.</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
      {movies.map(movie => (
        <div 
          key={movie.imdbID} 
          onClick={() => onMovieClick(movie.imdbID)}
          style={{ 
            border: '1px solid #ddd', 
            padding: '10px', 
            cursor: 'pointer',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}
        >
          <img 
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} 
            alt={movie.Title} 
            style={{ width: '100%', height: '250px', objectFit: 'cover', marginBottom: '10px' }} 
          />
          <p><strong>{movie.Title}</strong></p>
          <p>Năm: {movie.Year}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;