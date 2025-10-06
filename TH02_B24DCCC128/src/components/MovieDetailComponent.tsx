import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import type { MovieDetail } from '../types/movie';

const API_KEY = 'thewdb'; 

const MovieDetailComponent: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imdbID) return;

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;
        const response = await axios.get<MovieDetail>(url);

        if (response.data.Title) {
          setMovieDetail(response.data);
        } else {
          setError('Không tìm thấy thông tin chi tiết phim.');
          setMovieDetail(null);
        }
      } catch (err) {
        setError('Lỗi khi lấy thông tin chi tiết phim.');
        setMovieDetail(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [imdbID]);

  if (loading) return <div>Đang tải chi tiết phim...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!movieDetail) return <div>Không tìm thấy chi tiết phim.</div>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '800px', margin: '20px auto' }}>
      <Link to="/bai3" style={{ display: 'block', marginBottom: '15px' }}>&larr; Quay lại danh sách tìm kiếm</Link>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <img 
          src={movieDetail.Poster !== 'N/A' ? movieDetail.Poster : 'https://via.placeholder.com/200'} 
          alt={movieDetail.Title} 
          style={{ width: '200px', height: 'auto', objectFit: 'cover' }} 
        />
        <div>
          <h3>{movieDetail.Title} ({movieDetail.Year})</h3>
          <p><strong>IMDb:</strong> {movieDetail.imdbRating} / 10</p>
          <p><strong>Thể loại:</strong> {movieDetail.Genre}</p>
          <p><strong>Đạo diễn:</strong> {movieDetail.Director}</p>
          <p><strong>Nội dung:</strong> {movieDetail.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailComponent;