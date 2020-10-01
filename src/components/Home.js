import React, { useEffect, useContext } from "react";
import "../styles/Home.css";
import { List, Skeleton, Spin, Empty, Button } from "antd";
import { debounce } from "lodash";

import { useFacilities } from "../hooks/useFacilities";
import Search from "antd/lib/input/Search";
import Filter from "./Filter";
import { FilterContext } from "../contexts/FilterContext";
import MyFilters from "./MyFilters";

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

  const filterFacilities = () => {
    const data = filter.state?.name
      ? facilities.filter((f) =>
          f.name.toLowerCase().includes(filter.state?.name)
        )
      : facilities;
    
    if (!filter.state?.name) {
      return data.filter((f) => {
        const conds = [
          filter.state.type === undefined || filter.state.type.condition(f.type),
          filter.state.isActive === undefined || filter.state.isActive.condition(f.isActive),
          filter.state.address === undefined || filter.state.address.condition(f.address),
          filter.state.email === undefined || filter.state.email.condition(f.email),
        ];
        let count = 0;
        while (count < conds.length) {
          if (!conds[count]) return false;
          count++;
        }
        return true;
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
                customFilter={filter.setstate}
                layout="row"
                render={(setFilter) => <MyFilters setFilter={setFilter}/>}
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
