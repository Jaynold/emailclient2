import React from "react";
import { Link } from "react-router-dom";
import { Button, Skeleton, List } from "antd";

const DataList = ({ data, filteredData, dataFunctions }) => {
  const { deleteFaciltity } = dataFunctions;
  return (
    <List
      className="facilities-data"
      itemLayout="vertical"
      size="large"
      dataSource={filteredData || data}
      pagination={{
        pageSize: 5,
        responsive: true,
        hideOnSinglePage: true,
      }}
      renderItem={item => (
        <List.Item
          className="facility"
          actions={[
            <Link
              style={{
                color: "white",
                background: "goldenrod",
                padding: "0.35rem",
              }}
              to={{
                pathname: `/update/${item.id}`,
                state: item,
              }}
            >
              Update
            </Link>,
            <Button type="danger" onClick={() => deleteFaciltity(item.id)}>
              Delete
            </Button>,
          ]}
        >
          <Skeleton loading={!data}>
            <List.Item.Meta
              title={
                <div>
                  <span className="id">{item.id}</span> {item.name} (Location:{" "}
                  {item.address})
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
  );
};

export default DataList;
