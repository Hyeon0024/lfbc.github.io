import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <p>&copy; 2025 우리 실험실. All rights reserved.</p>
        <p>주소: 경상남도 진주시 XXX로 XXX | 전화: 0XX-XXXX-XXXX | 이메일: lab@email.com</p>
        <div className="social-links">
          <a href="#" aria-label="GitHub">GitHub</a>
          <a href="#" aria-label="LinkedIn">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;