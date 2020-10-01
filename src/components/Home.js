import React, { useEffect, useContext } from "react";
import "../styles/Home.css";
import { List, Skeleton, Spin, Empty, Button } from "antd";
import { debounce } from "lodash";

import { useFacilities } from "../hooks/useFacilities";
import Search from "antd/lib/input/Search";
import Filter from "./Filter";
import { FilterContext } from "../contexts/FilterContext";
import FilterItems from "./FilterItems";

const Home = () => {
  const filter = useContext(FilterContext);
  const [facilities, setConfig] = useFacilities(false);

  useEffect(() => setConfig({ type: "GET_FACILITIES" }), [setConfig]);

  const deleteFaciltity = (id) => setConfig({ type: "DELETE_FACILITY", id });

  const onSearch = (searchText) => {
    filter.setstate((filter) => {
      return { ...filter, name: searchText.toLowerCase() };
    });
  };

  const filterFacilities = (data) => {
    //Multiple Dynamic Conditions
    if (!filter.state?.name) {
      const fieldNames = ["type", "isActive", "address"];  //add new filter id

      return facilities.filter((f) => {
        const conditions = [];
        fieldNames.forEach((val) =>
          conditions.push(
            filter.state[val] === undefined ||
              filter.state[val].condition(f[val])
          )
        );

        for (let count = 0; count < conditions.length; count++)
          if (!conditions[count]) return false;
        return true;
      });
    }

    //Search Condition
    return data.filter((f) =>
        f.name.toLowerCase().includes(filter.state?.name)
      );
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
                customFilter={filter.setstate}
                layout="row"
                render={(setFilter) => <FilterItems setFilter={setFilter} />}
              />
              <List
                className="facilities-data"
                itemLayout="vertical"
                size="large"
                dataSource={filterFacilities(facilities) || facilities}
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
