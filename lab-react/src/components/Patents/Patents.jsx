import React, { useState } from 'react';
import useCSVData from '../../hooks/useCSVData';
import { groupDataByYear } from '../../utils/dataUtils';
import './Patents.css';

const Patents = () => {
  const { data: patentsData, loading, error } = useCSVData('/data/patents.csv');
  const [expandedYears, setExpandedYears] = useState({});
  
  const initialVisibleCount = 5;

  const toggleYearExpansion = (year) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  if (loading) return <div className="section-padding">특허 데이터를 로딩 중...</div>;
  if (error) return <div className="section-padding">특허 데이터 로딩 실패: {error}</div>;

  const groupedPatents = groupDataByYear(patentsData);

  return (
    <section id="patents" className="patents-section section-padding">
      <div className="container">
        <h2>📄 최신 특허</h2>
        <div className="patent-gallery">
          {Object.entries(groupedPatents).map(([year, yearPatents]) => {
            const isExpanded = expandedYears[year] || false;
            const visiblePatents = isExpanded ? yearPatents : yearPatents.slice(0, initialVisibleCount);

            return (
              <div key={year}>
                <h3>{year}년</h3>
                <div className="patent-list">
                  {visiblePatents.map((patent, index) => (
                    <div key={index} className="patent-item">
                      <h4>{patent.title}</h4>
                      <p><strong>출원번호:</strong> {patent.application_number || '정보 없음'}</p>
                      <p><strong>등록일:</strong> {patent.registration_date || '정보 없음'}</p>
                      <p><strong>발명자:</strong> {patent.inventors || '정보 없음'}</p>
                    </div>
                  ))}
                </div>
                
                {yearPatents.length > initialVisibleCount && (
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

export default Patents;