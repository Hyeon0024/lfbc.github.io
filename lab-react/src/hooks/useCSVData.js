import { useState, useEffect } from 'react';

const useCSVData = (csvUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const parseCSV = async (url) => {
      console.log(`[CSV 로드] 시도: ${url}`);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태: ${response.status}, URL: ${url}`);
        }
        const text = await response.text();
        
        // 첫 줄은 헤더, 나머지 줄은 데이터
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        const parsedData = lines.slice(1).map(line => {
          const values = line.split(',');
          let item = {};
          headers.forEach((header, i) => {
            item[header] = values[i] ? values[i].trim() : '';
          });
          return item;
        });
        
        console.log(`[CSV 로드] 성공: ${url}, 데이터 ${parsedData.length}개 로드됨.`);
        return parsedData;
      } catch (error) {
        console.error(`[CSV 로드] 실패: ${url}`, error);
        throw error;
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await parseCSV(csvUrl);
        setData(result);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (csvUrl) {
      fetchData();
    }
  }, [csvUrl]);

  return { data, loading, error };
};

export default useCSVData;