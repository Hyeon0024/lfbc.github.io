// 데이터를 연도별로 그룹화하는 함수
export const groupDataByYear = (data) => {
  const grouped = {};
  data.forEach(item => {
    const year = item.year;
    if (year) {
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(item);
    }
  });
  
  // 최신 연도가 먼저 오도록 정렬
  return Object.keys(grouped)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .reduce((obj, key) => {
      obj[key] = grouped[key];
      return obj;
    }, {});
};

// 논문을 number 기준으로 정렬하는 함수
export const sortPapersByNumber = (papers) => {
  return papers.sort((a, b) => parseInt(a.number) - parseInt(b.number));
};