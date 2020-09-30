import React from "react";
import "../styles/Home.css";
import { Input, Select } from "antd";
import { debounce } from "lodash";

const Filter = ({ filter, layout }) => {
  const filterByType = (type) =>
    filter.setstate((filter) => {
      return { ...filter, type: type.toLowerCase() };
    });

  const filterByActive = (isActive) =>
    filter.setstate((filter) => {
      return { ...filter, isActive };
    });

  const filterColStyle =
    layout === "column" ? { display: "flex", flexDirection: layout, margin: "0 0.3rem" } : {};

  return (
    <div className="filters" style={filterColStyle}>
      {layout === "column" && (
        <div style={{ textAlign: "left", color: "snow" }}>Filters: </div>
      )}
      <Input
        placeholder="Filter By Type"
        onChange={(event) =>
          debounce(filterByType, 250, { maxWait: 500 })(event.target.value)
        }
      />
      <Select
        style={{
          width: "100%",
          background: "white",
        }}
        defaultActiveFirstOption="false"
        allowClear
        onChange={debounce(filterByActive, 250, { maxWait: 500 })}
        placeholder="Filter By Activity status"
        options={[
          { label: "Active", value: "true" },
          { label: "Not Active", value: "false" },
        ]}
      />
    </div>
  );
};

export default Filter;
