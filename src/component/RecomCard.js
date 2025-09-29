import React, { useState } from 'react';
import "../App.css";
import { Heart, Star } from "lucide-react";

const RecomCard = ({ movie }) => {
  const [isFavorited, setIsFavorited] = useState(
    localStorage.getItem(`fav-${movie.id}`) === "true"
  );

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    localStorage.setItem(`fav-${movie.id}`, !isFavorited);
  };

  return (
    <div className="ai-movie-card">
      <div className="ai-movie-poster">
        <img src={movie.poster} alt={movie.title} />
        <div className="ai-movie-rating">⭐ {movie.rating}</div>
        <button
          onClick={toggleFavorite}
          className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
        >
          ❤
        </button>
      </div>
      <div className="ai-movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.genres?.join(", ")}</p>
        <p>{movie.year}</p>
      </div>
    </div>
  );
};

export default RecomCard;