import Axios from "axios";
import { useEffect, useState } from "react";

export const useFacilities = (init) => {
  const [config, setConfig] = useState(false);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    let didCancel = false;
    const executeQuery = (setResponse, config) => {
      if (config.method !== "get")
        Axios.request({
          ...config,
          baseURL: "http://localhost:8082/facilities",
          headers: { Authorization: "Bearer sasadssad" },
        });
      if(!(config.method === "post" || config.method === "patch"))
      Axios.get("http://localhost:8082/facilities", {
        headers: { Authorization: "Bearer sasadssad" },
      }).then((result) => setResponse(result.data));
    };

    if (!didCancel && config) executeQuery(setResponse, config);

    return () => (didCancel = true);
  }, [config]);

  return [response, setConfig];
};