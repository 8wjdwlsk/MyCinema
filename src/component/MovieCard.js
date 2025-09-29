import React, { useState } from 'react';
import "../App.css";
import { Heart, Star } from "lucide-react";

const MovieCard = ({ movie, onClick }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };
  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-poster-container">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
      </div>


      <div className="movie-info">
        <div className="title-row">
          <h3 className="movie-title">{movie.title}</h3>


          <button
            onClick={toggleFavorite}
            className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
          >
            ❤
          </button>
        </div>

        <div className="movie-genres">
          {movie.genres && movie.genres.map((g, index) => (
            <span key={index} className="genre-tag">
              #{g}
            </span>
          ))}
        </div>

        <div className="movie-meta">
          <span className="movie-year">{movie.year}년 </span>
          <span className="movie-duration">{movie.duration}분</span>
          {movie.rating && <span className="rating">⭐ {movie.rating}</span>}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;