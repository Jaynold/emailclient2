import React, { useState } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { Input, Select } from "antd";

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
                <span style={{ fontSize: "1rem", fontWeight: "bolder" }}>
                  Filters
                </span>
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
              <section className="facilities">
                {(filter.type || filter.isActive
                  ? facilities.filter((f) => {
                      let cond = f.type.toLowerCase().includes(filter?.type);
                      const isActive = f.isActive ? "true" : "false";
                      cond = filter.isActive
                        ? isActive === filter.isActive && (!filter.type || cond)
                        : cond;
                      return cond;
                    })
                  : facilities
                )?.map((f) => {
                  return (
                    <div className="facility" key={f.id}>
                      <span className="id">{f.id}</span> {f.name}
                      <span className="isActive">
                        {f.isActive ? "Active" : "Not Active"}
                      </span>
                      <br />
                      <br />
                      <div className="type">Type: {f.type}</div>
                      <div className="description">
                        Description: {f.description}
                      </div>
                      <div className="address">Address: {f.address}</div>
                      <Link to={{ pathname: "/update", data: f }}>Update</Link>
                      <div
                        className="delete"
                        onClick={() => deleteFaciltity(f.id)}
                      >
                        X
                      </div>
                    </div>
                  );
                })}
              </section>
            </div>
          ) : (
            <div>No Facilities available...</div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
