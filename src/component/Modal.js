import React from "react";
import "../App.css";

const Modal = ({ movie, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">{movie.title}</h2>
        <div className="modal-video">
          <iframe width="100%" height="315" src={movie.trailer ||"https://www.youtube.com/embed/jBdRhhSt3Bc"} title="&#39;기생충&#39; 1차 예고편" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen> title={movie.title} </iframe>
        </div>
        <div className="modal-info">
          <p>{movie.description}</p>
          <p>
            {movie.year} · {movie.duration}분
          </p>
          <div className="genres">
            {movie.genres.map((g, idx) => (
              <span key={idx} className="genre-tag">
                #{g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;