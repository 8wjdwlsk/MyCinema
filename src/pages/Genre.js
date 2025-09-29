import React, { useEffect, useState } from "react";
import MovieCard from "../component/MovieCard";
import Modal from "../component/Modal";
import "../App.css";

const Genre = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("전체");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMoreGenres, setShowMoreGenres] = useState(false);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setMovies(data.movies || []))
      .catch((err) => console.error("db.json 로드 실패:", err));
  }, []);

  const allGenres = movies.flatMap((m) => m.genres || []);
  const genres = ["전체", ...new Set(allGenres)];

  const filteredMovies =
    selectedGenre === "전체"
      ? movies
      : movies.filter((movie) => movie.genres.includes(selectedGenre));

  const visibleGenres = showMoreGenres ? genres : genres.slice(0, 4);
  return (
    <div className="genre-page">
      <div className="genre-filter">
        <h2 className="page-title">장르별 영화</h2>
        <div className="genre-buttons-wrapper">
          <div
            className={`genre-buttons ${showMoreGenres ? "expanded" : ""}`}
          >
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`genre-button ${selectedGenre === genre ? "active" : ""
                  }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {genres.length > 4 && (
            <button
              className="genre-button toggle-button"
              onClick={() => setShowMoreGenres(!showMoreGenres)}
            >
              {showMoreGenres ? "접기 ▲" : "더보기 ▼"}
            </button>
          )}
        </div>
      </div>

      <p className="movie-count">{filteredMovies.length}개의 영화</p>

      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>

      {selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default Genre;