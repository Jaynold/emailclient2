import React from "react";
import "../styles/Home.css";
import { Input, Select } from "antd";

const Filter = ({ setFilter, layout }) => {
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
        onChange={(event) => filterByType(event.target.value)}
      />
      <Select
        style={{
          width: "100%",
          background: "white",
        }}
        defaultActiveFirstOption="false"
        allowClear
        onChange={(value) => filterByActive(value)}
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
