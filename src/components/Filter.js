import React from "react";

const Filter = ({ customFilter, layout, render }) => {
  const checkType = (value) => {
    return {
      data: value && value.toLowerCase(),
      condition: (data) => {
        if (value === undefined) return true;
        else {
          value = value.toLowerCase();
          switch (typeof data) {
            case "string":
              return data.toLowerCase().includes(value);
            case "object":
              return data.join(", ").toLowerCase().includes(value);
            case "boolean":
              return (data ? "Active" : "not active").toLowerCase() === value;
            default:
              return !!value;
          }
        }
      },
    };
  };

  const filterData = (id, value) =>
    customFilter((filter) => {
      return { ...filter, [id]: checkType(value) };
    });

  const filterColStyle =
    layout === "column"
      ? { display: "flex", flexDirection: layout, margin: "0 0.3rem" }
      : {};

  return (
    render && (
      <div className="filters" style={filterColStyle}>
        {layout === "column" && (
          <div style={{ textAlign: "left", color: "snow" }}>Filters: </div>
        )}
        {render(filterData)}
      </div>
    )
  );
};

export default Filter;
