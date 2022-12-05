import { useState, useEffect } from "react";

function useFetch(url) {
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  const [response, setResponse] = useState({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    (async () => {
      // loader turn on
      setResponse((prev) => {
        return {
          ...prev,
          loading: true,
        };
      });
      // try to fetch
      try {
        const rawRes = await fetch(url);
        const jsonRes = await rawRes.json();

        setResponse((prev) => {
          return {
            ...prev,
            data: jsonRes,
            loading: false,
            error: null,
          };
        });

      } catch (err) {
        setResponse((prev) => {
          return {
            ...prev,
            error: `${err.message}`,
            loading: false,
          };
        });
      }
    })();
  }, [url]);

  return { data: response.data, error: response.error, loading: response.loading };
}

export default useFetch;

// function useFetch(url) {
//   const [res, setRes] = useState({ pending: false, data: null, error: null });

//   useEffect(() => {
//     setRes({ pending: true, data: null, error: null });
//     fetch(url)
//       .then((res) => res.json())
//       .then((res) => setRes({ pending: false, data: res, error: null }))
//       .catch((err) => setRes({ pending: false, data: null, error: err }));
//   }, [url]);

//   return res;
// }
