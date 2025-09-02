import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsNavOpen(false); // Close mobile menu after clicking
  };

  return (
    <header className="main-header">
      <div className="container">
        <h1 className="logo">
          <a href="#home" onClick={() => scrollToSection('home')}>
            우리 실험실
          </a>
        </h1>
        <nav className={`main-nav ${isNavOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <a href="#home" onClick={() => scrollToSection('home')}>
                실험실 소개
              </a>
            </li>
            <li>
              <a href="#research" onClick={() => scrollToSection('research')}>
                연구 소개
              </a>
            </li>
            <li>
              <a href="#papers" onClick={() => scrollToSection('papers')}>
                최신 논문
              </a>
            </li>
            <li>
              <a href="#patents" onClick={() => scrollToSection('patents')}>
                최신 특허
              </a>
            </li>
            <li>
              <a href="#news" onClick={() => scrollToSection('news')}>
                최신 소식
              </a>
            </li>
            <li>
              <a href="#photos" onClick={() => scrollToSection('photos')}>
                사진
              </a>
            </li>
          </ul>
        </nav>
        <button className="nav-toggle" onClick={toggleNav} aria-label="메뉴 토글">
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;