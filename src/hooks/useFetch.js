import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(false);
    axios
      .get(url)
      .then(response => setData(response.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
