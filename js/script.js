// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // 햄버거 메뉴 토글
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // "더 보기" 기능 구현 (논문 및 특허)
    const moreButtons = document.querySelectorAll('.more-btn');

    moreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const year = button.dataset.year;
            // 논문 또는 특허 리스트를 찾습니다.
            const targetList = document.querySelector(`.paper-list[data-year="${year}"]`) || 
                               document.querySelector(`.patent-list[data-year="${year}"]`);
            
            if (!targetList) return; // 대상 리스트가 없으면 종료

            const hiddenItems = targetList.querySelectorAll('.hidden-item');
            
            // 모든 숨겨진 아이템을 보여주거나 숨깁니다.
            hiddenItems.forEach(item => {
                // 현재 display 상태를 확인하여 토글
                if (window.getComputedStyle(item).display === 'none') {
                    item.style.display = 'flex'; // grid item은 flex로 설정하는 경우가 많으므로 flex로 설정
                } else {
                    item.style.display = 'none';
                }
            });

            // 버튼 텍스트 변경: "더 보기" 또는 "접기"
            if (button.textContent === '더 보기') {
                button.textContent = '접기';
            } else {
                button.textContent = '더 보기';
            }

            // 스크롤 이동 (선택 사항: 펼쳐진 콘텐츠의 시작점으로 스크롤)
            // 논문/특허 목록의 시작 부분으로 스크롤
            targetList.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // 스크롤 시 헤더 그림자 효과 (선택 사항)
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // 50px 이상 스크롤 시
                header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = 'var(--box-shadow)';
            }
        });
    }
});