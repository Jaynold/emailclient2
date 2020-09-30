import Axios from "axios";
import { useEffect, useState } from "react";

export const useFacilities = (init) => {
  const [response, setResponse] = useState(false);
  const [action, setAction] = useState(false);

  useEffect(() => {
    let didCancel = false;
    const executeQuery = async (setResponse, action) => {
      let config, result;
      switch (action.type) {
        case "GET_FACILITIES":
          break;
        case "GET_FACILITY":
          config = {
            url: `/${action.id}`,
            method: "get",
          };
          break;
        case "CREATE_FACILITY":
          config = {
            url: "",
            method: "post",
            data: action.data,
          };
          break;
        case "UPDATE_FACILITY":
          config = {
            url: `/${action.id}`,
            method: "patch",
            data: action.data,
          };
          break;
        case "DELETE_FACILITY":
          config = {
            url: `/${action.id}`,
            method: "delete",
          };
          break;
        default:
          throw new Error("NO state transition found!");
      }
      result = await Axios.request({
        ...config,
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: { Authorization: process.env.REACT_APP_AUTHORIZATION },
      });

      if (
        action.type === "GET_FACILITITES" ||
        action.type === "DELETE_FACILITY"
      )
        result = await Axios.request({
          method: "get",
          baseURL: process.env.REACT_APP_BASE_URL,
          headers: { Authorization: process.env.REACT_APP_AUTHORIZATION },
        });
      setResponse(result.data);
    };

    if (!didCancel && action) executeQuery(setResponse, action);

    return () => (didCancel = true);
  }, [action]);

  return [response, setAction];
};
