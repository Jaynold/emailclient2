import React, { useEffect, useState } from "react";
import { Tag, Table, Input } from "antd";
import { useFacilities } from "../hooks/useFacilities";
import { Link } from "react-router-dom";

const TableView = () => {
  const [facilities, setConfig] = useFacilities(false);
  const [filterValues, setfilterValues] = useState({name: '', description: ''});

  useEffect(() => {
    setConfig({ url: "", method: "get" });
  }, [setConfig]);

  const deleteFaciltity = (id) => {
    setConfig({ url: `/${id}`, method: "delete" });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filteredValue: [filterValues.name.toLowerCase()],
      filterDropdown: (
        <Input placeholder="Filter by name" onChange={(val) => setfilterValues(filter => {return {...filter, name: val.target.value}})} />
      ),
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      filterMultiple: true,
      onFilter: (_, record) => record.name.indexOf(filterValues.name) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      filteredValue: [filterValues.description.toLowerCase()],
      filterDropdown: (
        <Input placeholder="Filter by description" onChange={(val) => setfilterValues(filter => {return {...filter, description: val.target.value}})} />
      ),
      filterMultiple: true,
      onFilter: (_, record) => record.name.indexOf(filterValues.description) === 0,
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (type) => (
        <span>
          {type.map((type) => {
            let color = type.length > 10 ? "geekblue" : "green";
            return (
              <Tag color={color} key={type}>
                {type.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "isActive",
      key: "isActive",
      dataIndex: "isActive",
      render: (type) => (type ? "Active" : "Not active"),
    },
    {
      title: "Action",
      key: "action",
      render: (facility) => (
        <>
          <Link
            className="update"
            to={{ pathname: `/update/${facility.id}`, data: facility }}
          >
            Update
          </Link>
          ,
          <a
            className="delete"
            href={`#delete-${facility.id}`}
            onClick={() => deleteFaciltity(facility.id)}
          >
            Delete
          </a>
          ,
        </>
      ),
    },
  ];
  return (
    <>
      <h1 className="heading">Facilities</h1>
      <a href="/create">Need more facilities? Click Here!</a> <br />
      <br />
      <Table
        loading={facilities ? false : true}
        style={{ width: "80%", margin: "0rem auto" }}
        columns={columns}
        dataSource={facilities}
      />
    </>
  );
};

export default TableView;
