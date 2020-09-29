import React from "react";
import "../styles/Home.css";
import { Input, Select } from "antd";

const Filter = ({ setFilter, layout, debounce }) => {
  const filterByType = (type) =>
    setFilter((filter) => {
      return { ...filter, type: type.toLowerCase() };
    });

  const filterByActive = (isActive) =>
    setFilter((filter) => {
      return { ...filter, isActive };
    });
    
  return (
    <div className="filters" style={{ flexDirection: layout }}>
      <Input
        placeholder="Filter By Type"
        onChange={(event) => debounce(filterByType, 250, { 'maxWait': 1000 })(event.target.value)}
      />
      <Select
        style={{
          width: "100%",
          background: "white",
        }}
        defaultActiveFirstOption="false"
        allowClear
        onChange={debounce(filterByActive, 250, { 'maxWait': 1000 })}
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
