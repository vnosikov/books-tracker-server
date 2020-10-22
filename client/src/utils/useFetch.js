import { useState, useEffect } from 'react';

const useFetch = requestFunc => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchUrl = async () => {
    try {
      const res = await requestFunc();
      setData(res);
      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };
  
  useEffect(() => { fetchUrl(); }, []);

  return [data, loading, error];
};

export default useFetch;
