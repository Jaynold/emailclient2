import { useState, useEffect } from "react";

export const useFilter = (init) => {
  const [filter, setFilter] = useState(false);
  const [data, setData] = useState(init);

  useEffect(() => {
    const filterFacilities = (data) => {
        const d = filter.name
          ? data.filter((f) => f.name.toLowerCase().includes(filter?.name))
          : data;
    
        if (filter.type || filter.isActive) {
          return d.filter((f) => {
            let cond = f.type.join(', ').toLowerCase().includes(filter?.type);
            const isActive = f.isActive ? "true" : "false";
            cond = filter.isActive
              ? isActive === filter.isActive && (!filter.type || cond)
              : cond;
            return cond;
          });
        }
        setData(data);
      };
      filterFacilities(data);
  }, [data, filter])

  return [data, setData, setFilter];
}