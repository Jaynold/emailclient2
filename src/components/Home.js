import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { List, Skeleton, Spin, Empty, Button } from "antd";
import { debounce } from "lodash";

import { useFacilities } from "../hooks/useFacilities";
import Search from "antd/lib/input/Search";
import Filter from "./Filter";

const Home = () => {
  const [filter, setFilter] = useState(false);
  const [facilities, setConfig] = useFacilities(false);

  useEffect(() => {
    setConfig({ url: "", method: "get" });
  }, [setConfig]);

  const deleteFaciltity = (id) => {
    setConfig({ url: `/${id}`, method: "delete" });
  };

  const onSearch = (searchText) => {
    setFilter((filter) => {
      return { ...filter, name: searchText.toLowerCase() };
    });
  };

  const filterFacilities = () => {
    const data = filter.name
      ? facilities.filter((f) => f.name.toLowerCase().includes(filter?.name))
      : facilities;

    if (filter.type || filter.isActive) {
      return data.filter((f) => {
        let cond = f.type.join(", ").toLowerCase().includes(filter?.type);
        const isActive = f.isActive ? "true" : "false";
        cond = filter.isActive
          ? isActive === filter.isActive && (!filter.type || cond)
          : cond;
        return cond;
      });
    }
    return data;
  };

  return (
    <>
      <h1 className="heading" style={{ fontSize: "2rem" }}>
        Facilities
      </h1>
      <a href="/create">Need more facilities? Click Here!</a> <br />
      <br />
      {!facilities ? (
        <Spin />
      ) : (
        <div className="home">
          {facilities.length > 0 ? (
            <>
              <Search
                className="search"
                placeholder="Search By Name"
                onSearch={debounce(onSearch, 250, { maxWait: 1000 })}
                enterButton
              />
              <Filter setFilter={setFilter} debounce={debounce} layout="row" />
              <List
                className="facilities-data"
                itemLayout="vertical"
                size="large"
                loadingIndicator={<Spin />}
                loading={filterFacilities() ? false : <Spin />}
                dataSource={filterFacilities()}
                pagination={{
                  pageSize: 5,
                  responsive: true,
                }}
                renderItem={(item) => (
                  <List.Item
                    className="facility"
                    actions={[
                      <Button
                        type="primary"
                        style={{background: 'goldenrod', borderColor: "gold"}}
                        onClick={() =>
                          (document.location.href = `/update/${item.id}`)
                        }
                      >
                        Update
                      </Button>,
                      <Button
                        type="danger"
                        onClick={() => deleteFaciltity(item.id)}
                      >
                        Delete
                      </Button>,
                    ]}
                  >
                    <Skeleton
                      title={false}
                      loading={facilities ? false : true}
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
                            <b>Email:</b> {item.email}
                            <br />
                            <b>Type:</b> {item.type.join(", ")}
                            <br />
                            <b>Description:</b> {item.description}
                          </div>
                        }
                      />
                      <div
                        style={{
                          width: "fit-content",
                          color: item.isActive ? "green" : "crimson",
                        }}
                      >
                        {item.isActive ? "Active" : "Not Active"}
                      </div>
                    </Skeleton>
                  </List.Item>
                )}
              />
            </>
          ) : (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={<span>No Facilities</span>}
            />
          )}
        </div>
      )}
      <br />
      <br />
    </>
  );
};

export default Home;
