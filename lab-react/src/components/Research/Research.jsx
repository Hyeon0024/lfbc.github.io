import React from 'react';
import './Research.css';

const Research = () => {
  const researchItems = [
    {
      image: "/images/research_ai.jpg",
      title: "인공지능 및 머신러닝",
      description: "최신 딥러닝 기술을 활용한 데이터 분석, 예측 모델 개발 및 자율 시스템 연구를 진행합니다.",
      guideText: "(사진: AI 관련 장비 또는 데이터 시각화 이미지. 콘텐츠: 연구 분야 상세 설명)"
    },
    {
      image: "/images/research_bio.jpg",
      title: "바이오메디컬 공학",
      description: "의료 영상 분석, 생체 신호 처리, 질병 진단 및 치료 기술 개발에 힘쓰고 있습니다.",
      guideText: "(사진: 현미경, 생체 신호 그래프 또는 연구실 내부 모습. 콘텐츠: 연구 분야 상세 설명)"
    },
    {
      image: "/images/research_robotics.jpg",
      title: "로봇 공학 및 제어 시스템",
      description: "다양한 환경에서 활용 가능한 지능형 로봇 시스템 설계 및 제어 알고리즘을 연구합니다.",
      guideText: "(사진: 로봇 팔 또는 드론. 콘텐츠: 연구 분야 상세 설명)"
    }
  ];

  return (
    <section id="research" className="research-section section-padding">
      <div className="container">
        <h2>🔬 연구 소개</h2>
        <div className="research-grid">
          {researchItems.map((item, index) => (
            <div key={index} className="research-item">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="guide-text">
                <em>{item.guideText}</em>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;