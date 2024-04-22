import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchDONKI = (endpoint, startDate, endDate) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://api.nasa.gov/DONKI/${endpoint}`, {
          params: {
            startDate,
            endDate,
            api_key: 'YOUR_API_KEY', // Replace with your NASA API key
          },
        });
        setData(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, startDate, endDate]);

  return { data, loading, error };
};

export default useFetchDONKI;
