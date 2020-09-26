import React, { useState } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { Input, Select, List, Skeleton } from "antd";

import  {useFacilities} from "../reducer/useFacilities"

const Home = () => {
  const [filter, setFilter] = useState(false);
  const [facilities, setConfig] = useFacilities(false);

  const deleteFaciltity = async (id) => {
    setConfig({url: `/${id}`, method: 'delete'});
  };

  const filterByType = (type) =>
    setFilter({ ...filter, type: type.toLowerCase() });

  const filterByActive = (isActive) => setFilter({ ...filter, isActive });

  return (
    <>
      <h1 className="heading">Facilities</h1>
      {!facilities ? (
        <div>Loading...</div>
      ) : (
        <>
          <a href="/create">Need more facilities? Click Here!</a>
          <br />
          <br />

          {facilities.length > 0 ? (
            <div className="facil-section">
              <div className="filters">
                <Input
                  placeholder="Filter By Name"
                  onChange={(event) => filterByType(event.target.value)}
                />
                <Input
                  placeholder="Filter By Type"
                  onChange={(event) => filterByType(event.target.value)}
                />
                <Select
                    style={{width: "100%", background:"white", borderRadius: "0.2rem"}}
                    onChange={(value) => filterByActive(value)}
                  placeholder="Filter By Activity status"
                  options={[{ label: "--Filter By Activity status--", value: "" },{ label: "Active", value: "true" }, { label: "Not Active", value: "false" }]}
                />
              </div>
              <br/>
              <section className="facilities">
              <List
                className="demo-loadmore-list"
                itemLayout="vertical"
                size="large"
                dataSource={(filter.type || filter.isActive
                  ? facilities.filter((f) => {
                      let cond = f.type.toLowerCase().includes(filter?.type);
                      const isActive = f.isActive ? "true" : "false";
                      cond = filter.isActive
                        ? isActive === filter.isActive && (!filter.type || cond)
                        : cond;
                      return cond;
                    })
                  : facilities
                )}
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 4,
                  position: "top",
                  responsive: true
                }}
                renderItem={item => (
                  <List.Item
                  className="facility"
                    actions={[<Link className="update" to={{ pathname: "/update", data: item }}>Update</Link>,
                      <a className="delete" href="#delete"
                        onClick={() => deleteFaciltity(item.id)}
                      >Delete</a>]}
                  >
                    <Skeleton avatar title={false} loading={item.loading} active>
                      <List.Item.Meta
                        title={<div><span className="id">{item.id}</span> {item.name} (Location: {item.address})</div>}
                        description={<div>
                          <b>Type:</b> {item.type}<br/>
                          <b>Description:</b> {item.description}
                        </div>}
                      />
                      <div>{item.isActive ? "Active" : "Not Active"}</div>
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
      <br/>
      <br/>
    </>
  );
};

export default Home;
