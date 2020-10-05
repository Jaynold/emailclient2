import React, { useState, useEffect } from "react";

const setCondition = filtervalue => {
  return data => {
    if (filtervalue === undefined) return true;
    else {
      filtervalue = filtervalue.toString().toLowerCase();
      switch (typeof data) {
        case "string":
          return data.toLowerCase().includes(filtervalue);
        case "object":
          return data.join(", ").toLowerCase().includes(filtervalue);
        case "boolean":
          return (data ? "Active" : "not active").toLowerCase() === filtervalue;
        default:
          throw new Error("Filter value data type unknown!");
      }
    }
  };
};

const Filter = ({ datasource, onFiltered, layout, render, fieldNames }) => {
  const [filters, setFilters] = useState(false);

  useEffect(() => {
    let didCancel = false;

    const isFiltersEmpty = () => {
      let property;
      for (let index = 0; index < fieldNames.length; index++) {
        property = fieldNames[index];
        if (filters[property] !== undefined && !filters[property]?.isEmpty)
          return false;
      }
      return true;
    };

    const getFilteredData = () => {
      //Multiple Filters section
      if (!isFiltersEmpty()) {
        //get filtered data if filters are not empty
        let property;
        return datasource.filter(f => {
          for (let index = 0; index < fieldNames.length; index++) {
            property = fieldNames[index];
            if (filters[property])
              if (!filters[property].condition(f[property])) return false;
          }
          return true;
        });
      } else return false;
    };

    if (!didCancel) onFiltered(getFilteredData());
    return () => (didCancel = true);
  }, [filters, datasource, onFiltered]);

  const onSearch = searchText =>
    onFiltered(
      datasource.filter(f =>
        f.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );

  const filterData = (id, filtervalue) =>
    setFilters(filter => {
      return {
        ...filter,
        [id]: {
          condition: setCondition(filtervalue),
          isEmpty: !Boolean(filtervalue),
        },
      };
    });

  const filterContainerStyle =
    layout === "column"
      ? {
          display: "flex",
          flexDirection: layout,
          margin: "0 0.3rem",
        }
      : {};

  return (
    render && (
      <div className="filters" style={filterContainerStyle}>
        {layout === "column" && (
          <div style={{ textAlign: "left", color: "snow" }}>Filters: </div>
        )}
        {render(filterData, onSearch)}
      </div>
    )
  );
};

export default Filter;
