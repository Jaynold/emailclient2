import React from "react";
import { Input, Select } from "antd";
import { debounce } from "lodash";
import Search from "antd/lib/input/Search";

const FilterItems = ({ setFilter, onSearch }) => {
  return (
    <>
      <Search
        className="search"
        placeholder="Search By Name"
        onSearch={debounce(onSearch, 250, { maxWait: 1000 })}
        enterButton
      />
      <Input
        placeholder="Filter By Type"
        onChange={event =>
          debounce(setFilter, 250, { maxWait: 500 })("type", event.target.value)
        }
      />
      <Select
        id="isActive"
        style={{
          width: "100%",
          background: "white",
        }}
        defaultActiveFirstOption="false"
        allowClear
        onChange={value =>
          debounce(setFilter, 250, { maxWait: 500 })("isActive", value)
        }
        placeholder="Filter By Activity status"
        options={[
          { label: "Active", value: "Active" },
          { label: "Not Active", value: "Not Active" },
        ]}
      />
      <Input
        placeholder="Filter By Address"
        onChange={event =>
          debounce(setFilter, 250, { maxWait: 500 })(
            "address",
            event.target.value
          )
        }
      />
    </>
  );
};

export default FilterItems;
