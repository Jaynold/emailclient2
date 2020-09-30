import React from "react";

const Filter = ({ filter, layout, render }) => {
    const filterData = (id, value) =>
    filter((filter) => {
      return { ...filter, [id]: value };
    });

  const filterColStyle =
    layout === "column" ? { display: "flex", flexDirection: layout, margin: "0 0.3rem" } : {};

  return (
    render && 
    <div className="filters" style={filterColStyle}>
      {layout === "column" && (
        <div style={{ textAlign: "left", color: "snow" }}>Filters: </div>
      )}
      {render(filterData)}
    </div>
  );
};

export default Filter;
