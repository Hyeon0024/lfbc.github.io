import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <h2>새로운 지식의 지평을 여는, 우리 실험실</h2>
        <p>
          우리 실험실은 혁신적인 연구와 끊임없는 도전을 통해 미래 사회에 기여하는 것을 목표로 합니다. 
          최첨단 기술과 창의적인 아이디어를 바탕으로 다양한 분야에서 선도적인 연구를 수행하고 있습니다.
        </p>
        <p>세상을 변화시킬 다음 발견을 향해 나아가는 우리와 함께하세요.</p>
      </div>
    </section>
  );
};

export default Hero;