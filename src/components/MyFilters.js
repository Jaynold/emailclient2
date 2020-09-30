import React from "react";
import { Input, Select } from "antd";
import { debounce } from "lodash";

const MyFilters = ({ setFilter }) => {
  return (
    <>
      <Input
        placeholder="Filter By Type"
        onChange={(event) =>
          debounce(setFilter, 250, { maxWait: 500 })("type", event.target.value)
        }
      />
      <Select
        style={{
          width: "100%",
          background: "white",
        }}
        defaultActiveFirstOption="false"
        allowClear
        onChange={(value) =>
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
        onChange={(event) =>
          debounce(setFilter, 250, { maxWait: 500 })(
            "address",
            event.target.value
          )
        }
      />
      <Input
        placeholder="Filter By Email"
        onChange={(event) =>
          debounce(setFilter, 250, { maxWait: 500 })(
            "email",
            event.target.value
          )
        }
      />
    </>
  );
};

export default MyFilters;
