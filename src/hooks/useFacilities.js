import Axios from "axios";
import { useEffect, useState } from "react";

export const useFacilities = (init) => {
  const [config, setConfig] = useState({
    url: '',
    method: 'get',
    data: {},
  });
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
      if (config.method === "get" || config.method === "delete")
        Axios.get("http://localhost:8082/facilities", {
          headers: { Authorization: "Bearer sasadssad" },
        }).then((result) => setResponse(result.data));
    };

    if (!didCancel) executeQuery(setResponse, config);
    
    return () => {
      didCancel = true;
    };
  }, [config]);

  return [response, setConfig];
};
