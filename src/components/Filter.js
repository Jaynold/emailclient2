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
      const emptyFiltersCondition = [];
      fieldNames.forEach(val =>
        emptyFiltersCondition.push(
          !(filters[val] === undefined) && filters[val]?.isEmpty
        )
      );
      return emptyFiltersCondition.reduce((acc, curr) => acc + curr);
    };

    const getFilteredData = () => {
      //Multiple Filters section
      if (isFiltersEmpty())
        return datasource.filter(f => {
          //get filtered data if filters are not empty
          const conditions = [];
          fieldNames.map(
            val =>
              filters[val] && conditions.push(filters[val].condition(f[val]))
          );

          for (let count = 0; count < conditions.length; count++)
            if (!conditions[count]) return false;
          return true;
        });
      else return false;
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
          isEmpty: !!filtervalue,
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
