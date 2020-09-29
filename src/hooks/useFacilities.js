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
          baseURL: "http://localhost:8082/facilities",
          headers: { Authorization: "Bearer sasadssad" },
        });
      if (!(config.method === "post" || config.method === "patch")) {
        const result = await Axios.get("http://localhost:8082/facilities", {
          headers: { Authorization: "Bearer sasadssad" },
        });
        setResponse(result.data);
      }
    };

    if (!didCancel && config) executeQuery(setResponse, config);

    return () => (didCancel = true);
  }, [config]);

  return [response, setConfig];
};
