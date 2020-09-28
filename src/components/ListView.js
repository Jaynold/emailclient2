import React, { useState } from "react";
import Filter from "./Filter";
import Search from "antd/lib/input/Search";
import { List } from "antd/lib/form/Form";
import { Link } from "react-router-dom";
import { Skeleton, Empty } from "antd";

const ListView = ({ data, deleteData }) => {
  const [filter, setFilter] = useState(false);
  const onSearch = (searchText) => {
    setFilter((filter) => {
      return { ...filter, name: searchText.toLowerCase() };
    });
  };

  const filterData = () => {
    const d = filter.name
      ? data.filter((f) => f.name.toLowerCase().includes(filter?.name))
      : data;

    if (filter.type || filter.isActive) {
      return d.filter((f) => {
        let cond = f.type.join(", ").toLowerCase().includes(filter?.type);
        const isActive = f.isActive ? "true" : "false";
        cond = filter.isActive
          ? isActive === filter.isActive && (!filter.type || cond)
          : cond;
        return cond;
      });
    }
    console.log(d)
    return d;
  };

  return (
      data && 
    <div className="list-view">
          <div className="list-view-left">
            Filters:
            <Filter setFilter={setFilter} layout="column"/>
          </div>
          <div className="list-view-right">
          {data.length > 0 ? (
            <>
              <Search
                placeholder="Search By Name"
                onSearch={onSearch}
                enterButton
                style={{ width: "50%"}}
              />
              <Filter setFilter={setFilter} layout="row"/>
              <section className="facilities">
                <List
                  className="demo-loadmore-list"
                  itemLayout="vertical"
                  size="large"
                  dataSource={filterData()}
                  pagination={{
                    pageSize: 3,
                    responsive: true,
                  }}
                  renderItem={(item) => (
                    <List.Item
                      className="facility"
                      actions={[
                        <Link
                          className="update"
                          to={{ pathname: `/update/${item.id}`, data: item }}
                        >
                          Update
                        </Link>,
                        <a
                          className="delete"
                          href={`#delete-${item.id}`}
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
                          {" "}
                          {item.isActive ? "Active" : "Not Active"}
                        </div>
                      </Skeleton>
                    </List.Item>
                  )}
                />
              </section>
            </>
          ) : (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={<span>No Facilities</span>}
            >
            </Empty>
          )}
          </div>
        </div>
  );
};

export default ListView;
