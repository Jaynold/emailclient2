import React, { useEffect, useContext } from "react";
import "../styles/Home.css";
import { List, Skeleton, Spin, Empty, Button, Select, Input } from "antd";
import { debounce } from "lodash";

import { useFacilities } from "../hooks/useFacilities";
import Search from "antd/lib/input/Search";
import Filter from "./Filter";
import { FilterContext } from "../contexts/FilterContext";

const Home = () => {
  const filter = useContext(FilterContext);
  const [facilities, setConfig] = useFacilities(false);

  useEffect(() => {
    setConfig({ type: "GET_FACILITIES" });
  }, [setConfig]);

  const deleteFaciltity = (id) => {
    setConfig({ type: "DELETE_FACILITY", id });
  };

  const onSearch = (searchText) => {
    filter.setstate((filter) => {
      return { ...filter, name: searchText.toLowerCase() };
    });
  };

  const filterFacilities = () => {
    const typeCondition = (f) =>
      f.type
        .join(", ")
        .toLowerCase()
        .includes(filter.state?.type?.toLowerCase());
    const isActiveCondition = (f) => (f.isActive ? "true" : "false");

    const data = filter.state?.name
      ? facilities.filter((f) =>
          f.name.toLowerCase().includes(filter.state?.name?.toLowerCase())
        )
      : facilities;

    if (filter.state?.type || filter.state?.isActive || filter.state?.address) {
      return data.filter((f) => {
        console.log(filter.state.isActive);
        let cond = typeCondition(f);

        cond = filter.state.address
          ? f.address
              .toLowerCase()
              .includes(filter.state?.address?.toLowerCase()) &&
            (!filter.state?.type || cond)
          : cond;
        cond = filter.state.isActive
          ? isActiveCondition(f) === filter.state.isActive &&
            (!filter.state?.address || cond)
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
              <Filter
                filter={filter.setstate}
                layout="row"
                render={(setFilter) => {
                  return (
                    <>
                      <Input
                        placeholder="Filter By Type"
                        onChange={(event) =>
                          debounce(setFilter, 250, { maxWait: 500 })(
                            "type",
                            event.target.value
                          )
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
                          debounce(setFilter, 250, { maxWait: 500 })(
                            "isActive",
                            value
                          )
                        }
                        placeholder="Filter By Activity status"
                        options={[
                          { label: "Active", value: "true" },
                          { label: "Not Active", value: "false" },
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
                    </>
                  );
                }}
              />
              <List
                className="facilities-data"
                itemLayout="vertical"
                size="large"
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
                        style={{ background: "goldenrod", borderColor: "gold" }}
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
              style={{ gridColumn: "span 2 / 4" }}
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
