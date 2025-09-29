import React, { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import "../App.css";
import "react-multi-carousel/lib/styles.css";
import Card from '../component/Card';

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};


const Home = () => {
    const [recs, setRecs] = useState([]);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/db.json`)
            .then((r) => r.json()) //요청한 데이터를 json형태로 바꿔줘
            .then((data) => {
                //console.log("전체데이터:", data);
                const movies = data.movies || []; //data.movies가 있으면 그 값 그대로 보여주고 없으면 빈 배열로 처리 -> movies 데이터가 항상 배열로 처리되도록 해주는 구문
                console.log("movies 배열:", movies);

                //db.json 에서 reconmmened라는 값이 true인 요소만 모아서 새 배열로 만든다면 onlyrecommended에 담음.
                const onlyRecommended = movies.filter((m) => m.recommended);
                //console.log("추천만:", onlyrecommended)

                const firstFive = onlyRecommended.slice(0, 5);
                //console.log ('앞 5개 :' firstFive)

                setRecs(firstFive);
            })
            .catch((err) => {
                console.log("db.json 로드 실패 :", err)
            })
    }, []); //[]은 처음 실행했을때 한번만 실행

    return (
        <div className="contents">
            <h2>이번주 신작</h2>
            <Carousel
                responsive={responsive}
                swipeable={true}
                autoPlaySpeed={2500}
                infinite
                className="hero-slide"
            >
                <div>
                    <img src="https://cdn.cgv.co.kr//cgvpomsfilm/Movie/Thumbnail/Poster/030000/30000104/30000104_320.jpg" alt="얼굴" />
                </div>
                <div>
                    <img src="https://image.cine21.com/resize/cine21/poster/2025/0926/15_34_08__68d633e07bda4[X280,400].jpg" alt="어쩔수가없다" />
                </div>
                <div>
                    <img src="https://image.cine21.com/resize/cine21/poster/2025/0908/13_32_07__68be5c47cb48d[X280,400].jpg" alt="살인자리포트" />
                </div>
            </Carousel>

            <div className="intro-text">
                <h2>오늘의 영화 한 편</h2>
                <div className="text">
                    <p>
                        수많은 영화 중, 지금 당신에게 딱 맞는 한 편 <br />
                        장르, 분위기, 테마별로 엄선한 영화를 소개합니다. <br />
                        오늘 밤, 어떤 영화를 볼지 고민이라면? <br />
                        새로운 영화 세계로 떠나는 여정, <br /> Mycinema과 함께하세요.
                    </p>
                </div>
            </div>

            {/* 추천 영화 카드 */}
            <div className="recommend-area">
                <h2>오늘의 추천 영화 5편</h2>
                <div className="recom-card">
                    {recs.map((item) => (
                        <Card key={item.id} movies={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home