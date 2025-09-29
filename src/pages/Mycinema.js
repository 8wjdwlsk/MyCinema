import React, { useState } from "react";
import "../App.css";

const Mycinema = () => {
  const [user, setUser] = useState({
    nickname: "영화조아",
    profilePic: "https://i.pinimg.com/1200x/2e/bb/b1/2ebbb19db7b510925bfc4c793f94c035.jpg",
    level: "골드"
  });

  const [settings, setSettings] = useState({
    darkMode: false,
    language: "한국어",
    notifications: true
  });

  const toggleDarkMode = () => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const toggleNotifications = () => {
    setSettings(prev => ({ ...prev, notifications: !prev.notifications }));
  };

  return (
    <div className="my-page">
      <h2>My Cinema</h2>
      <section className="my-section">
        <h3>계정 / 프로필</h3>
        <div className="profile-info">
          <img src={user.profilePic} alt="프로필" className="profile-pic" />
          <div>
            <p>닉네임: {user.nickname}</p>
            <p>회원 등급: {user.level}</p>
          </div>
        </div>
        <div className="account-settings">
          <button>로그인 / 로그아웃</button>
          <button>비밀번호 변경</button>
          <button>SNS 연동</button>
        </div>
      </section>

      {/* 알림 & 소식 */}
      <section className="my-section">
        <h3>알림 / 소식</h3>
        <div className="notifications">
          <p><span>신작 알림:</span> 관심 장르/배우 신작 알림</p>
          <p><span>이벤트 & 혜택:</span> 앱 내 이벤트, 프로모션 정보</p>
        </div>
      </section>

      {/* 기타 편의 기능 */}
      <section className="my-section">
        <h3>기타 편의 기능</h3>
        <div className="other-settings">
          <p>
            설정: 
            <button onClick={toggleDarkMode}>
              테마 {settings.darkMode ? "🌙 다크모드" : "☀️ 라이트모드"}
            </button>
          </p>
          <p>언어: {settings.language}</p>
          <p>
            알림 설정: 
            <button onClick={toggleNotifications}>
              {settings.notifications ? "🔔 켬" : "🔕 끔"}
            </button>
          </p>
          <button>문의 / 도움말 (FAQ, 고객센터, 피드백)</button>
        </div>
      </section>
    </div>
  );
};

export default Mycinema;