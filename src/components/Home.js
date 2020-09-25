import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [action, setAction] = useState({ type: "GET_FACILITIES" });
  const [facilities, setFacilities] = useState(false);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    let isCancel = false;
    const fetchFacilities = async () => {
      if (!isCancel) {
        switch (action.type) {
          case "DELETE_FACILITY":
            await Axios.delete(
              `http://localhost:8082/facilities/${action.id}`,
              { headers: { Authorization: "Bearer sasadssad" } }
            );
          case "GET_FACILITIES":
            const result = await Axios("http://localhost:8082/facilities", {
              headers: { Authorization: "Bearer sasadssad" },
            });
            setFacilities(result.data);
            break;
          default:
            break;
        }
      }
    };
    fetchFacilities();
    return () => {
      isCancel = true;
    };
  }, [action]);

  const deleteFaciltity = async (id) => {
    setAction({ type: "DELETE_FACILITY", id });
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
          <a href="/create">Create a new facility</a>
          <br />
          <br />

          {facilities.length > 0 ? (
            <div className="facil-section">
              <div className="filters">
              Filter By Type:
              <input
                type="text"
                onChange={(event) => filterByType(event.target.value)}
                style={{ color: "black" }}
              />
              <br />
              <select
                name="filterActive"
                style={{ color: "blue" }}
                onChange={(event) => filterByActive(event.target.value)}
              >
                <option value="">Filter By isActive</option>
                <option value="true">Active</option>
                <option value="false">Not Active</option>
              </select>
              </div>
              <section className="facilities">
                {(filter.type || filter.isActive
                  ? facilities.filter((f) => {
                      let cond = f.type.toLowerCase().includes(filter.type);
                      const isActive = f.isActive ? "true" : "false";
                      cond = filter.isActive
                        ? isActive === filter.isActive && cond
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
                      <br/><br/>
                      <div className="type">Type: {f.type}</div>
                      <div className="description">Description: {f.description}</div>
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
