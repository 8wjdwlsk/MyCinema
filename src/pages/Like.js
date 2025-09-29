import React, { useEffect, useState } from "react";
import RecomCard from "../component/RecomCard";

const Like = () => {
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    // localStorage에서 찜한 영화 ID 가져오기
    const storedMovies = Object.keys(localStorage)
      .filter(key => key.startsWith("fav-") && localStorage.getItem(key) === "true")
      .map(key => parseInt(key.replace("fav-", "")));

    // db.json에서 영화 데이터를 가져와서 찜한 영화만 필터
    const fetchMovies = async () => {
      try {
        const res = await fetch(`${process.env.PUBLIC_URL}/db.json`);
        const data = await res.json();
        const favMovies = data.movies.filter(movie => storedMovies.includes(movie.id));
        setLikedMovies(favMovies);
      } catch (error) {
        console.error("찜한 영화 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="liked-movies-page">
      <h2>💗 찜한 영화 목록</h2>
      {likedMovies.length > 0 ? (
        <div className="movies-grid">
          {likedMovies.map(movie => (
            <RecomCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>아직 찜한 영화가 없어요!</p>
      )}
    </div>
  );
};

export default Like;