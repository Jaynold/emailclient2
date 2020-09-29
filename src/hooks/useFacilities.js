import Axios from "axios";
import { useEffect, useState } from "react";

export const useFacilities = (init) => {
  const [config, setConfig] = useState(false);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    let didCancel = false;
    const executeQuery = async (setResponse, config) => {
      if (config.method !== "get")
        await Axios.request({
          ...config,
          baseURL: process.env.REACT_APP_BASE_URL,
          headers: { Authorization: process.env.REACT_APP_AUTHORIZATION },
        });
      if (!(config.method === "post" || config.method === "patch")) {
        const result = await Axios.get(process.env.REACT_APP_BASE_URL + config.url, {
          headers: { Authorization: process.env.REACT_APP_AUTHORIZATION},
        });
        setResponse(result.data);
      }
    };

    if (!didCancel && config) executeQuery(setResponse, config);

    return () => (didCancel = true);
  }, [config]);

  return [response, setConfig];
};