import React, { useEffect, useContext } from "react";
import "../styles/Home.css";
import { Spin, Empty } from "antd";

import Filter from "./Filter";
import FilterItems from "./FilterItems";
import { Link } from "react-router-dom";
import { FacilitiesContext } from "../contexts/FaciltiesContext";
import DataList from "./DataList";

const Home = () => {
  const { setConfig, facilities, filtered, setFiltered } = useContext(
    FacilitiesContext
  );

  useEffect(() => setConfig({ url: "", method: "get" }), [setConfig]);

  const deleteFaciltity = id => setConfig({ url: `/${id}`, method: "delete" });

  return (
    <>
      <h1 className="heading" style={{ fontSize: "2rem" }}>
        Facilities
      </h1>
      <Link to={{ pathname: "/create" }}>
        Need more facilities? Click Here!
      </Link>{" "}
      <br />
      <br />
      {!facilities ? (
        <Spin />
      ) : (
        <div className="home">
          {facilities.length > 0 ? (
            <>
              <Filter
                datasource={facilities}
                onFiltered={setFiltered}
                layout="row"
                fieldNames={["type", "isActive", "address"]} //add filter field id here
                render={(setFilter, onSearch) => (
                  <FilterItems setFilter={setFilter} onSearch={onSearch} />
                )}
              />
              <DataList
                data={facilities}
                filteredData={filtered}
                dataFunctions={{ deleteFaciltity }}
              />
            </>
          ) : (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              className="empty-image"
              description={<span>No Facilities</span>}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Home;
