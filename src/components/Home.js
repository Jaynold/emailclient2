import React, { useState } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { Input, Select, List, Skeleton, Spin } from "antd";

import { useFacilities } from "../hooks/useFacilities";
import Search from "antd/lib/input/Search";

const Home = () => {
  const [filter, setFilter] = useState(false);
  const [facilities, setConfig] = useFacilities(false);

  const deleteFaciltity = async (id) => {
    setConfig({ url: `/${id}`, method: "delete" });
  };

  const filterByType = (type) =>
    setFilter({ ...filter, type: type.toLowerCase() });

  const filterByActive = (isActive) => setFilter({ ...filter, isActive });

  const onSearch = (searchText) => {
    setFilter({ ...filter, name: searchText.toLowerCase() });
  };
  return (
    <>
      <h1 className="heading">Facilities</h1>
      {!facilities ? (
        <Spin />
      ) : (
        <>
          <a href="/create">Need more facilities? Click Here!</a>
          <br />
          <br />

          {facilities.length > 0 ? (
            <div className="facil-section">
              <Search
                  placeholder="Search By Name"
                  onSearch={onSearch}
                  enterButton
                  options={facilities.name}
                  style={{width: "50%"}}
                />
                <br/>
              <div className="filters">
                <Input
                  placeholder="Filter By Type"
                  onChange={(event) => filterByType(event.target.value)}
                />
                <Select
                  style={{
                    width: "100%",
                    background: "white",
                    borderRadius: "0.2rem",
                  }}
                  onChange={(value) => filterByActive(value)}
                  placeholder="Filter By Activity status"
                  options={[
                    { label: "--Filter By Activity status--", value: "" },
                    { label: "Active", value: "true" },
                    { label: "Not Active", value: "false" },
                  ]}
                />
              </div>
              <br />
              <section className="facilities">
                <List
                  className="demo-loadmore-list"
                  itemLayout="vertical"
                  size="large"
                  dataSource={
                    filter.type || filter.isActive || filter.name
                      ? facilities.filter((f) => {
                          let cond = f.type
                            .toLowerCase()
                            .includes(filter?.type);
                          const isActive = f.isActive ? "true" : "false";
                          cond = filter.isActive
                            ? isActive === filter.isActive &&
                              (!filter.type || cond)
                            : cond;
                            cond = filter.name
                            ? f.name.toLowerCase()
                            .includes(filter?.name) &&
                              (!filter.isActive || cond)
                            : cond;
                          return cond;
                        })
                      : facilities
                  }
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 4,
                    position: "top",
                    responsive: true,
                  }}
                  renderItem={(item) => (
                    <List.Item
                      className="facility"
                      actions={[
                        <Link
                          className="update"
                          to={{ pathname: "/update", data: item }}
                        >
                          Update
                        </Link>,
                        <a
                          className="delete"
                          href="#delete"
                          onClick={() => deleteFaciltity(item.id)}
                        >
                          Delete
                        </a>,
                      ]}
                    >
                      <Skeleton
                        avatar
                        title={false}
                        loading={item.loading}
                        active
                      >
                        <List.Item.Meta
                          title={
                            <div>
                              <span className="id">{item.id}</span> {item.name}{" "}
                              (Location: {item.address})
                            </div>
                          }
                          description={
                            <div>
                              <b>Type:</b> {item.type}
                              <br />
                              <b>Description:</b> {item.description}
                            </div>
                          }
                        />
                        <div style={{width:"fit-content" ,color: item.isActive ? "green" : "crimson"}}> {item.isActive ? "Active" : "Not Active"}</div>
                      </Skeleton>
                    </List.Item>
                  )}
                />
              </section>
            </div>
          ) : (
            <div>No Facilities available...</div>
          )}
        </>
      )}
      <br />
      <br />
    </>
  );
};

export default Home;
