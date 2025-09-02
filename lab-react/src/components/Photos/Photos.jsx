import React, { useState } from 'react';
import './Photos.css';

const Photos = () => {
  const [expandedYears, setExpandedYears] = useState({});
  const initialVisibleCount = 5;

  const photosByYear = {
    2024: [
      '/images/lab_2024_1.jpg',
      '/images/lab_2024_2.jpg',
      '/images/lab_2024_3.jpg',
      '/images/lab_2024_4.jpg',
      '/images/lab_2024_5.jpg',
      '/images/lab_2024_6.jpg'
    ],
    2023: [
      '/images/lab_2023_1.jpg',
      '/images/lab_2023_2.jpg',
      '/images/lab_2023_3.jpg',
      '/images/lab_2023_4.jpg'
    ]
  };

  const toggleYearExpansion = (year) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  return (
    <section id="photos" className="photos-section section-padding">
      <div className="container">
        <h2>📸 사진</h2>
        <div className="photo-gallery">
          {Object.entries(photosByYear).map(([year, yearPhotos]) => {
            const isExpanded = expandedYears[year] || false;
            const visiblePhotos = isExpanded ? yearPhotos : yearPhotos.slice(0, initialVisibleCount);

            return (
              <div key={year}>
                <h3>{year}년</h3>
                <div className="photo-grid">
                  {visiblePhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`${year}년 실험실 사진 ${index + 1}`}
                    />
                  ))}
                </div>
                
                {yearPhotos.length > initialVisibleCount && (
                  <button 
                    className="more-btn"
                    onClick={() => toggleYearExpansion(year)}
                  >
                    {isExpanded ? '접기' : '더 보기'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Photos;