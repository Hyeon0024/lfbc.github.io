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
            const targetType = button.dataset.target; // 'papers' 또는 'patents'

            // 대상 리스트를 찾습니다.
            let targetList;
            if (targetType === 'papers') {
                targetList = document.querySelector(`.paper-list[data-year="${year}"]`);
            } else if (targetType === 'patents') {
                targetList = document.querySelector(`.patent-list[data-year="${year}"]`);
            }
            
            if (!targetList) {
                console.error(`Error: Target list not found for year ${year} and type ${targetType}`);
                return; // 대상 리스트가 없으면 종료
            }

            const allItems = targetList.querySelectorAll('.paper-item, .patent-item');
            const initialVisibleCount = 5; // 초기에 보여줄 항목 수
            let hiddenItemsCount = 0;

            allItems.forEach((item, index) => {
                if (index >= initialVisibleCount) {
                    if (item.classList.contains('hidden-item')) { // 현재 숨겨져 있다면
                        item.classList.remove('hidden-item'); // 보이게 하기
                    } else { // 현재 보인다면
                        item.classList.add('hidden-item'); // 숨기기
                        hiddenItemsCount++;
                    }
                }
            });

            // 버튼 텍스트 변경: "더 보기" 또는 "접기"
            // 모든 항목이 보인 상태에서 클릭했는지 (즉, 숨겨진 항목 수가 0이 아닌 경우)
            if (hiddenItemsCount === 0) { // 클릭 후 모든 항목이 보인 상태
                button.textContent = '접기';
            } else { // 클릭 후 다시 숨겨진 항목이 생긴 상태
                button.textContent = '더 보기';
            }

            // 스크롤 이동 (선택 사항: 펼쳐진 콘텐츠의 시작점으로 스크롤)
            // '더 보기' 버튼을 눌러 펼칠 때만 스크롤
            if (button.textContent === '접기') {
                targetList.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        // 초기 로드 시 5개 초과하는 항목 숨기기 및 '더 보기' 버튼 표시 여부 결정
        const year = button.dataset.year;
        const targetType = button.dataset.target;
        let targetList;
        if (targetType === 'papers') {
            targetList = document.querySelector(`.paper-list[data-year="${year}"]`);
        } else if (targetType === 'patents') {
            targetList = document.querySelector(`.patent-list[data-year="${year}"]`);
        }

        if (targetList) {
            const allItems = targetList.querySelectorAll('.paper-item, .patent-item');
            const initialVisibleCount = 5;
            if (allItems.length > initialVisibleCount) {
                button.style.display = 'block'; // 5개 초과 시 버튼 보이기
                for (let i = initialVisibleCount; i < allItems.length; i++) {
                    allItems[i].classList.add('hidden-item'); // 초기 5개 초과 항목 숨기기
                }
                button.textContent = '더 보기';
            } else {
                button.style.display = 'none'; // 5개 이하면 버튼 숨기기
            }
        }
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

    // 논문 파일명으로부터 정보 추출 (프론트엔드에서 보여주기 위함)
    document.querySelectorAll('.paper-item').forEach(item => {
        const filename = item.dataset.filename;
        if (filename) {
            const regex = /(\d{4})_(\d{2})_([^\.]+)\.pdf/i; // YYYY_NN_제목.pdf
            const match = filename.match(regex);
            
            if (match) {
                const year = match[1];
                // const sequence = match[2]; // 순서는 현재 표시하지 않음
                const title = match[3].replace(/_/g, ' '); // 제목의 밑줄을 공백으로 변경

                // HTML 요소 업데이트 (필요하다면)
                // 현재는 HTML에 직접 작성된 내용을 사용하지만,
                // 만약 파일명에서 제목을 동적으로 파싱하여 넣고 싶다면 아래 주석 해제
                // item.querySelector('h4').textContent = title;
                // item.querySelector('p strong').nextSibling.textContent = ` ${year}`; // 연도 업데이트

                // 썸네일 이미지 경로 업데이트
                const thumbImg = item.querySelector('img');
                const thumbFilename = filename.replace('.pdf', '_thumb.jpg'); // jpg를 기본으로 가정
                thumbImg.src = `images/papers/${thumbFilename}`;
                thumbImg.alt = `${title} 썸네일`;

                // PDF 보기 링크 업데이트
                const pdfLink = item.querySelector('.download-link');
                pdfLink.href = `papers/${filename}`;
            } else {
                console.warn(`경고: 논문 아이템의 파일명 형식이 올바르지 않습니다: ${filename}`);
            }
        }
    });
});