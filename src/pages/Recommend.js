import React, { useState, useEffect } from 'react';
import '../App.css';
import RecomCard from "../component/RecomCard";

const Recommend = () => {
  const [movies, setMovies] = useState([]);
  const [activeTab, setActiveTab] = useState('ai-recommend');
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState("맑음");
  const weatherOptions = ["맑음", "비", "눈", "흐림"];

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${process.env.PUBLIC_URL}/db.json`);
        const data = await res.json();
        setMovies(data.movies);

        const shuffled = [...data.movies].sort(() => 0.5 - Math.random());
        setRecommendedMovies(shuffled.slice(0, 3));

      } catch (error) {
        console.error("영화 데이터를 불러오는 중 오류 발생:", error);
      }

      setLoading(false);
    };

    loadMovies();
  }, []);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const refreshRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      const shuffled = movies.sort(() => 0.5 - Math.random());
      setRecommendedMovies(shuffled.slice(0, 3));
      setLoading(false);
    }, 500);
  };

  const handleWeatherChange = (weather) => {
    setCurrentWeather(weather);
  };

  const getWeatherMovies = (weather) => {
    return Array.isArray(movies)
      ? movies.filter((movie) => {
        if (!movie.weather) return false;
        const weathers = Array.isArray(movie.weather)
          ? movie.weather
          : movie.weather.split(",");
        return weathers.includes(weather);
      })
      : [];
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "맑음":
        return "☀️";
      case "비":
        return "🌧️";
      case "눈":
        return "❄️";
      case "흐림":
        return "☁️";
      default:
        return "🌤️";
    }
  };


  return (
    <div className="movie-app">
      <nav className="nav-bar">
        <div className="nav-brand">
          <h2>Ai 영화 추천</h2>
        </div>
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'ai-recommend' ? 'active' : ''}`}
            onClick={() => handleTabClick('ai-recommend')}
          >
            🤖 AI 추천
          </button>
          <button
            className={`nav-tab ${activeTab === 'popular' ? 'active' : ''}`}
            onClick={() => handleTabClick('popular')}
          >
            🔥 인기작
          </button>
          <button
            className={`nav-tab ${activeTab === 'new' ? 'active' : ''}`}
            onClick={() => handleTabClick('new')}
          >
            🆕 최신작
          </button>
          <button
            className={`nav-tab ${activeTab === 'weather' ? 'active' : ''}`}
            onClick={() => handleTabClick('weather')}
          >
            🌤️ 날씨별
          </button>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'ai-recommend' && (
          <div className="ai-recommend-section">
            <div className="section-header">
              <p className='title-p'>당신의 취향을 분석해서 완벽한 영화를 추천해드려요!</p>
              <button className="refresh-btn" onClick={refreshRecommendations} disabled={loading}>
                🔄 새로운 추천받기
              </button>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className='title-p'>AI가 추천 영화를 분석중입니다...</p>
              </div>
            ) : (
              <div className="movies-grid">
                {recommendedMovies.map(movie => (
                  <RecomCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'popular' && (
          <div className="section">
            <p className='title-p'>지금 핫한 인기상영작을 만나보세요</p>
            <div className="movies-grid">
              {movies.slice(0, 6).map(movie => (
                <RecomCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'new' && (
          <div className="section">
            <p className='title-p'>따끈따끈한 최신작을 들고왔어요</p>
            <div className="movies-grid">
              {movies.filter(movie => movie.year >= 2018).map(movie => (
                <RecomCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="section">
            <p className='title-p'>날씨에 맞는 영화를 추천해드려요!</p>
            <div className="weather-selector">
              {weatherOptions.map(weather => (
                <button
                  key={weather}
                  className={`weather-btn ${currentWeather === weather ? 'active' : ''}`}
                  onClick={() => handleWeatherChange(weather)}
                >
                  {getWeatherIcon(weather)} {weather}
                </button>
              ))}
            </div>
            <div className="weather-info">
              <h3>{getWeatherIcon(currentWeather)} {currentWeather} 날씨에 어울리는 영화</h3>
            </div>
            <div className="movies-grid">
              {getWeatherMovies(currentWeather).length > 0 ? (
                getWeatherMovies(currentWeather).map(movie => (
                  <RecomCard key={movie.id} movie={movie} />
                ))
              ) : (
                <div className="no-movies">
                  <p>😅 {currentWeather} 날씨에 맞는 영화가 없어요!</p>
                  <p>다른 날씨를 선택해보세요.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Recommend;