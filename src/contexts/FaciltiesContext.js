import React, { useState } from "react";
import { useFacilities } from "../hooks/useFacilities";

export const FacilitiesContext = React.createContext();

const FacilitiesProvider = props => {
  const [facilities, setConfig] = useFacilities(null);
  const [filtered, setFiltered] = useState(null);

  return (
    <FacilitiesContext.Provider
      value={{ facilities, setConfig, filtered, setFiltered }}
    >
      {props.children}
    </FacilitiesContext.Provider>
  );
};

export default FacilitiesProvider;
