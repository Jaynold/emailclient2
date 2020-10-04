import Axios from "axios";
import { useEffect, useState } from "react";

export const useFacilities = init => {
  const [response, setResponse] = useState(init);
  const [config, setConfig] = useState(init);

  useEffect(() => {
    let didCancel = false;
    const executeQuery = async () => {
      let result;
      result = await Axios.request({
        ...config,
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: { Authorization: process.env.REACT_APP_AUTHORIZATION },
      });
      if (config.method === "delete")
        result = await Axios.get(process.env.REACT_APP_BASE_URL, {
          headers: { Authorization: process.env.REACT_APP_AUTHORIZATION },
        });
      if (
        config.method === "get" ||
        (config.url && config.method === "get") ||
        config.method === "delete"
      ) {
        setResponse(result.data);
      }
    };

    if (!didCancel && config) executeQuery();

    return () => (didCancel = true);
  }, [config]);

  return [response, setConfig];
};
