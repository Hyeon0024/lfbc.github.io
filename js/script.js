// js/script.js

document.addEventListener('DOMContentLoaded', async () => {
    // 햄버거 메뉴 토글
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    const initialVisibleCount = 4; // 초기 표시할 항목 수 (각 연도별 또는 섹션별)

    // CSV 파일을 파싱하는 함수
    async function parseCSV(url) {
        console.log(`[CSV 로드] 시도: ${url}`);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태: ${response.status}, URL: ${url}`);
            }
            const text = await response.text();
            // 첫 줄은 헤더, 나머지 줄은 데이터
            const lines = text.trim().split('\n');
            const headers = lines[0].split(',').map(h => h.trim()); // 헤더 공백 제거
            
            const data = lines.slice(1).map(line => {
                const values = line.split(',');
                let item = {};
                headers.forEach((header, i) => {
                    item[header] = values[i] ? values[i].trim() : ''; // 값이 없는 경우 빈 문자열
                });
                return item;
            });
            console.log(`[CSV 로드] 성공: ${url}, 데이터 ${data.length}개 로드됨.`);
            return data;
        } catch (error) {
            console.error(`[CSV 로드] 실패: ${url}`, error);
            return []; // 에러 발생 시 빈 배열 반환
        }
    }

    // 데이터를 연도별로 그룹화하는 함수
    function groupDataByYear(data) {
        const grouped = {};
        data.forEach(item => {
            const year = item.year; // CSV에 'year' 컬럼이 있다고 가정
            if (year) { // year 값이 유효한 경우만 처리
                if (!grouped[year]) {
                    grouped[year] = [];
                }
                grouped[year].push(item);
            }
        });
        // 최신 연도가 먼저 오도록 정렬 (숫자형으로 변환하여 비교)
        return Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a)).reduce((obj, key) => {
            obj[key] = grouped[key];
            return obj;
        }, {});
    }

    // 논문 목록을 HTML로 렌더링하는 함수
    function renderPapers(papersData, targetElementId) {
        const gallery = document.getElementById(targetElementId);
        if (!gallery) {
            console.error(`Error: Target element ID not found: ${targetElementId}`);
            return;
        }

        gallery.innerHTML = ''; // 기존 내용 지우기
        const groupedPapers = groupDataByYear(papersData);
        console.log("[논문 렌더링] 연도별 그룹:", groupedPapers);

        for (const year in groupedPapers) {
            const yearSection = document.createElement('div');
            yearSection.innerHTML = `<h3>${year}년</h3>`;
            gallery.appendChild(yearSection);

            const paperListDiv = document.createElement('div');
            paperListDiv.classList.add('paper-list');
            paperListDiv.dataset.year = year; // 연도 데이터셋 추가
            paperListDiv.dataset.target = 'papers'; // 섹션 타입 데이터셋 추가
            gallery.appendChild(paperListDiv);

            // 연도 내 논문을 'number' 기준으로 정렬 (오름차순)
            // number 컬럼이 문자열일 수 있으므로 parseInt
            groupedPapers[year].sort((a, b) => parseInt(a.number) - parseInt(b.number));

            groupedPapers[year].forEach(paper => {
                const paperItem = document.createElement('div');
                paperItem.classList.add('paper-item');
                // CSV의 thumbnail과 filename 컬럼에 바로 파일명만 있도록 가정
                const thumbSrc = `images/papers/${paper.thumbnail}`;
                const pdfHref = `papers/${paper.filename}`;

                paperItem.innerHTML = `
                    <img src="${thumbSrc}" alt="${paper.title} 썸네일" onerror="this.onerror=null;this.src='images/placeholder_error.jpg';">
                    <h4>${paper.title}</h4>
                    <p><strong>저자:</strong> ${paper.authors || '정보 없음'}</p>
                    <p><strong>학술지:</strong> ${paper.journal || '정보 없음'}</p>
                    <p><strong>연도:</strong> ${paper.year}</p>
                    <a href="${pdfHref}" target="_blank" class="download-link">PDF 보기</a>
                `;
                paperListDiv.appendChild(paperItem);
            });

            // "더 보기" 버튼 추가 (연도별)
            if (groupedPapers[year].length > initialVisibleCount) {
                const moreButton = document.createElement('button');
                moreButton.classList.add('more-btn');
                moreButton.dataset.year = year;
                moreButton.dataset.target = 'papers';
                moreButton.textContent = '더 보기';
                moreButton.dataset.status = 'collapsed';
                gallery.appendChild(moreButton);
            }
        }
    }

    // 특허 목록을 HTML로 렌더링하는 함수
    function renderPatents(patentsData, targetElementId) {
        const gallery = document.getElementById(targetElementId);
        if (!gallery) {
            console.error(`Error: Target element ID not found: ${targetElementId}`);
            return;
        }

        gallery.innerHTML = ''; // 기존 내용 지우기
        const groupedPatents = groupDataByYear(patentsData); // 특허도 year 컬럼이 있다고 가정
        console.log("[특허 렌더링] 연도별 그룹:", groupedPatents);

        for (const year in groupedPatents) {
            const yearSection = document.createElement('div');
            yearSection.innerHTML = `<h3>${year}년</h3>`;
            gallery.appendChild(yearSection);

            const patentListDiv = document.createElement('div');
            patentListDiv.classList.add('patent-list');
            patentListDiv.dataset.year = year; // 연도 데이터셋 추가
            patentListDiv.dataset.target = 'patents'; // 섹션 타입 데이터셋 추가
            gallery.appendChild(patentListDiv);

            // 특허는 number가 없으므로 연도 내 정렬은 CSV에 따라 로드된 순서대로
            groupedPatents[year].forEach(patent => {
                const patentItem = document.createElement('div');
                patentItem.classList.add('patent-item');
                patentItem.innerHTML = `
                    <h4>${patent.title}</h4>
                    <p><strong>출원번호:</strong> ${patent.application_number || '정보 없음'}</p>
                    <p><strong>등록일:</strong> ${patent.registration_date || '정보 없음'}</p>
                    <p><strong>발명자:</strong> ${patent.inventors || '정보 없음'}</p>
                `;
                patentListDiv.appendChild(patentItem);
            });

            // "더 보기" 버튼 추가 (연도별)
            if (groupedPatents[year].length > initialVisibleCount) {
                const moreButton = document.createElement('button');
                moreButton.classList.add('more-btn');
                moreButton.dataset.year = year;
                moreButton.dataset.target = 'patents';
                moreButton.textContent = '더 보기';
                moreButton.dataset.status = 'collapsed';
                gallery.appendChild(moreButton);
            }
        }
    }


    // 섹션별 초기 항목 숨김 및 "더 보기" 버튼 상태 설정 함수
    // 이 함수는 초기 로드 시 및 '더 보기' 버튼 클릭 후에도 호출되어야 함.
    // DOM에 동적으로 추가된 요소들을 포함하여 처리합니다.
    function setupInitialVisibility() {
        console.log("[초기 가시성 설정] 시작.");

        // 논문, 특허, 사진 섹션 (연도별로 '더 보기' 버튼이 있는 경우)
        document.querySelectorAll('.paper-list, .patent-list, .photo-grid').forEach(listElement => {
            const items = listElement.querySelectorAll(
                listElement.classList.contains('paper-list') ? '.paper-item' :
                listElement.classList.contains('patent-list') ? '.patent-item' : 'img' // photo-grid
            );
            
            const year = listElement.dataset.year;
            const targetType = listElement.dataset.target;
            const moreButton = document.querySelector(`.more-btn[data-year="${year}"][data-target="${targetType}"]`);

            if (!moreButton) return;

            if (items.length > initialVisibleCount) {
                for (let i = initialVisibleCount; i < items.length; i++) {
                    items[i].classList.add('hidden-item');
                }
                moreButton.style.display = 'block';
                moreButton.textContent = '더 보기';
                moreButton.dataset.status = 'collapsed';
            } else {
                moreButton.style.display = 'none';
            }
        });

        // 소식 섹션 (연도 구분이 없는 경우)
        const newsList = document.querySelector('.news-list[data-section="news"]');
        const newsMoreButton = document.querySelector('.more-btn[data-target="news"][data-section-id="news"]');
        if (newsList && newsMoreButton) {
            const newsItems = newsList.querySelectorAll('.news-item');
            if (newsItems.length > initialVisibleCount) {
                for (let i = initialVisibleCount; i < newsItems.length; i++) {
                    newsItems[i].classList.add('hidden-item');
                }
                newsMoreButton.style.display = 'block';
                newsMoreButton.textContent = '더 보기';
                newsMoreButton.dataset.status = 'collapsed';
            } else {
                newsMoreButton.style.display = 'none';
            }
        }
        console.log("[초기 가시성 설정] 완료.");
    }


    // "더 보기" 버튼 클릭 이벤트 핸들러 (이벤트 위임 방식으로 개선)
    // 부모 요소에 이벤트를 걸고 실제 클릭된 자식 요소를 확인하는 방식
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('more-btn')) {
            const button = event.target;
            const year = button.dataset.year;
            const targetType = button.dataset.target;
            const sectionId = button.dataset.sectionId || targetType; // news 섹션을 위한 data-section-id 사용

            let targetListElement;
            if (targetType === 'papers') {
                targetListElement = document.querySelector(`.paper-list[data-year="${year}"]`);
            } else if (targetType === 'patents') {
                targetListElement = document.querySelector(`.patent-list[data-year="${year}"]`);
            } else if (targetType === 'news') {
                targetListElement = document.querySelector(`.news-list[data-section="news"]`);
            } else if (targetType === 'photos') {
                targetListElement = document.querySelector(`.photo-grid[data-year="${year}"]`);
            }

            if (!targetListElement) {
                console.error(`[더 보기 클릭] 대상 리스트를 찾을 수 없음: year=${year}, targetType=${targetType}`);
                return;
            }

            const items = targetListElement.querySelectorAll(
                targetType === 'papers' ? '.paper-item' :
                targetType === 'patents' ? '.patent-item' :
                targetType === 'news' ? '.news-item' : 'img' // photos
            );

            let isShowingAll = button.dataset.status === 'expanded';

            if (isShowingAll) { // 현재 확장 상태이면 접기
                for (let i = initialVisibleCount; i < items.length; i++) {
                    items[i].classList.add('hidden-item');
                }
                button.textContent = '더 보기';
                button.dataset.status = 'collapsed';
            } else { // 현재 접힘 상태이면 확장
                items.forEach(item => {
                    item.classList.remove('hidden-item');
                });
                button.textContent = '접기';
                button.dataset.status = 'expanded';
            }

            // 스크롤 이동
            if (button.dataset.status === 'expanded') {
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    });

    // 스크롤 시 헤더 그림자 효과
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = 'var(--box-shadow)';
            }
        });
    }

    // --- 초기 데이터 로드 및 UI 설정 실행 ---
    try {
        const papersData = await parseCSV('data/papers.csv');
        renderPapers(papersData, 'paperGallery');

        const patentsData = await parseCSV('data/patents.csv');
        renderPatents(patentsData, 'patentGallery');
        
        // CSV 로드 후 동적으로 생성된 요소들과 기존 요소들에 대해 초기 가시성 설정
        // 이 함수는 모든 콘텐츠가 DOM에 로드된 후에 실행되어야 합니다.
        setupInitialVisibility();

    } catch (error) {
        console.error("페이지 초기화 중 오류가 발생했습니다:", error);
    }
});