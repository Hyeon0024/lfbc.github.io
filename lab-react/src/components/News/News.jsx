import React, { useState } from 'react';
import './News.css';

const News = () => {
  const [showAll, setShowAll] = useState(false);
  const initialVisibleCount = 5;

  const newsItems = [
    {
      date: "2025.06.28",
      title: "[수상] 김민준 학생, 국제 학술대회 최우수 논문상 수상",
      description: "김민준 석사 과정 학생이 IEEE 국제 인공지능 학술대회에서 '신경망 기반 이미지 인식 시스템' 논문으로 최우수 논문상을 수상했습니다.",
      link: "#"
    },
    {
      date: "2025.06.15",
      title: "우리 실험실, 산업통상자원부 국책과제 선정",
      description: "AI 기반 스마트 팩토리 구축 기술 개발 과제에 우리 실험실이 주관 연구기관으로 선정되었습니다.",
      link: "#"
    },
    {
      date: "2025.05.01",
      title: "[세미나] '미래 로봇 기술의 발전 방향' 특별 초청 강연 개최",
      description: "5월 15일, Dr. Jane Doe 교수를 모시고 미래 로봇 기술에 대한 특별 세미나를 개최합니다.",
      link: "#"
    },
    {
      date: "2025.04.10",
      title: "연구실 워크샵 개최 및 신입생 환영회",
      description: "새로운 연구 주제 논의와 신입생들의 빠른 적응을 위한 워크샵 및 환영회가 성공적으로 진행되었습니다.",
      link: "#"
    },
    {
      date: "2025.03.05",
      title: "[성과] OOO 특허 출원 완료",
      description: "우리 연구실의 핵심 기술인 'OOO'에 대한 국내 특허 출원을 성공적으로 완료했습니다.",
      link: "#"
    }
  ];

  const visibleNews = showAll ? newsItems : newsItems.slice(0, initialVisibleCount);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section id="news" className="news-section section-padding">
      <div className="container">
        <h2>📢 최신 소식</h2>
        <div className="news-list">
          {visibleNews.map((news, index) => (
            <article key={index} className="news-item">
              <span className="news-date">{news.date}</span>
              <h3>{news.title}</h3>
              <p>{news.description}</p>
              <a href={news.link} className="read-more">더 알아보기</a>
            </article>
          ))}
        </div>
        
        {newsItems.length > initialVisibleCount && (
          <button className="more-btn" onClick={toggleShowAll}>
            {showAll ? '접기' : '더 보기'}
          </button>
        )}
      </div>
    </section>
  );
};

export default News;