import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus("loading");
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };
    fetchData();
  }, [url]);
  return { data, status };
};

export default useFetchData;
