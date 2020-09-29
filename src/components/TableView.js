import React, { useEffect } from 'react';
import { Tag, Table } from "antd";
import { useFacilities } from '../hooks/useFacilities';
const TableView = () => {
  const [facilities, setConfig] = useFacilities(false);
  
  useEffect(() => {
    setConfig({url: '', method: 'get'})
  }, [setConfig])
  
  const deleteFaciltity = (id) => {
    setConfig({ url: `/${id}`, method: "delete" });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key :'name',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      filterMultiple: true,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filterMultiple: true,
      onFilter: (value, record) => record.description.indexOf(value) === 0,
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      render: type => (
        <span>
          {type.map(type => {
            let color = type.length > 10 ? 'geekblue' : 'green';
            return  (
              <Tag color={color} key={type}>
                {type.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'isActive',
      key: 'isActive',
      dataIndex: 'isActive',
      render: type => type ? "Active" : "Not active",
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (<><a href="/">Delete</a><br/><a href="/">Update</a></>),
    },
  ];
  return (
    <>
    <h1 className="heading">Facilities</h1>
      <a href="/create">Need more facilities? Click Here!</a> <br/><br/>
      
    <Table style={{width: "80%", margin: "0rem auto"}} columns={columns} dataSource={facilities} />
    </>
  )
};

export default TableView;