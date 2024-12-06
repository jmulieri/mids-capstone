import {useState, useEffect, SetStateAction} from 'react';

const useEnrollmentsByAge = (): {data: any[] | undefined, loading: boolean, error: any } => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_APP_API_URL;
        const response = await fetch(`${apiUrl}/analytics/enrollments_by_age`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        setError(error as SetStateAction<null>);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useEnrollmentsByAge;