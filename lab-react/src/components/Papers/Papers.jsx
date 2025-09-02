import React, { useState } from 'react';
import useCSVData from '../../hooks/useCSVData';
import { groupDataByYear, sortPapersByNumber } from '../../utils/dataUtils';
import './Papers.css';

const Papers = () => {
  const { data: papersData, loading, error } = useCSVData('/data/papers.csv');
  const [showAllYears, setShowAllYears] = useState(false);
  const [expandedYears, setExpandedYears] = useState({});
  
  const initialVisibleCount = 5;

  const toggleAllYears = () => {
    setShowAllYears(!showAllYears);
    if (!showAllYears) {
      // "모든 연도 보기"로 전환 시, 모든 연도를 초기 개수만 보이도록 설정
      const grouped = groupDataByYear(papersData);
      const resetExpanded = {};
      Object.keys(grouped).forEach(year => {
        resetExpanded[year] = false;
      });
      setExpandedYears(resetExpanded);
    }
  };

  const toggleYearExpansion = (year) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  if (loading) return <div className="section-padding">논문 데이터를 로딩 중...</div>;
  if (error) return <div className="section-padding">논문 데이터 로딩 실패: {error}</div>;

  const groupedPapers = groupDataByYear(papersData);
  const yearKeys = Object.keys(groupedPapers);
  const latestYear = yearKeys[0];

  return (
    <section id="papers" className="papers-section section-padding">
      <div className="container">
        <h2>📚 최신 논문</h2>
        <p className="guide-text" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <em>(논문 데이터는 `data/papers.csv`에서, PDF 파일은 `papers/` 폴더에, 썸네일 이미지는 `images/papers/` 폴더에 각각 업로드해 주세요.)</em>
        </p>
        
        {yearKeys.length > 1 && (
          <button 
            className="more-btn" 
            onClick={toggleAllYears}
            style={{ marginBottom: '30px' }}
          >
            {showAllYears ? '최신 연도만 보기' : '모든 연도 보기'}
          </button>
        )}
        
        <div className="paper-gallery">
          {yearKeys.map((year, index) => {
            const isLatestYear = year === latestYear;
            const shouldShowYear = showAllYears || isLatestYear;
            
            if (!shouldShowYear) return null;

            const yearPapers = sortPapersByNumber(groupedPapers[year]);
            const isExpanded = expandedYears[year] || false;
            const visiblePapers = isExpanded ? yearPapers : yearPapers.slice(0, initialVisibleCount);

            return (
              <div key={year}>
                <h3>{year}년</h3>
                <div className="paper-list">
                  {visiblePapers.map((paper, paperIndex) => (
                    <div key={paperIndex} className="paper-item">
                      <img 
                        src={`/images/papers/${paper.thumbnail}`} 
                        alt={`${paper.title} 썸네일`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder_error.jpg';
                        }}
                      />
                      <h4>{paper.title}</h4>
                      <p><strong>저자:</strong> {paper.authors || '정보 없음'}</p>
                      <p><strong>학술지:</strong> {paper.journal || '정보 없음'}</p>
                      <p><strong>연도:</strong> {paper.year}</p>
                      <a 
                        href={`/papers/${paper.filename}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="download-link"
                      >
                        PDF 보기
                      </a>
                    </div>
                  ))}
                </div>
                
                {yearPapers.length > initialVisibleCount && (
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

export default Papers;