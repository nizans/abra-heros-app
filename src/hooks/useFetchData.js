import { useEffect, useState } from "react";

export const StatusState = {
  loading: "loading",
  idle: "idle",
  error: "error",
  success: "success",
};

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(StatusState.idle);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(StatusState.loading);
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
        setStatus(StatusState.success);
      } catch (error) {
        console.error(error);
        setStatus(StatusState.error);
      }
    };
    fetchData();
  }, [url]);
  return { data, status };
};

export default useFetchData;
