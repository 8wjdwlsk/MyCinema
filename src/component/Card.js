import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import '../App.css';

const Card = ({ movies }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const genres = Array.isArray(movies.genre)
    ? movies.genre
    : movies.genre
      ? movies.genre.split(',').map(g => g.trim())
      : [];

  return (
    <div className="movie-card">
      {/* 포스터 */}
      <div className="movie-poster-container">
        <img src={movies.poster} alt={movies.title} className="movie-poster" />
      </div>

      {/* 영화 정보 */}
      <div className="movie-info">
        <div className="title-row">
          <h3 className="movie-title">{movies.title}</h3>
          <button
            onClick={toggleFavorite}
            className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
          >
            ❤
          </button>
        </div>

        <div className="movie-genres">
          {movies.genres && movies.genres.map((g, index) => (
            <span key={index} className="genre-tag">
              #{g}
            </span>
          ))}
        
        </div>
        <div className="movie-meta">
          <span className="movie-year">{movies.year}년</span>
          <span className="movie-duration">{movies.duration}분</span>
          {movies.rating && <span className="rating">⭐ {movies.rating}</span>}
        </div>



        <p className="movie-description">{movies.description}</p>
      </div>
    </div>
  );
};

export default Card;