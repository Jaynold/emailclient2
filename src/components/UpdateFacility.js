import React from "react";
import { Form, Input, Button, Select, Switch } from "antd";
import "../styles/CreateFacility.css";
import Axios from "axios";
import { useHistory, withRouter } from "react-router";


const UpdateFacility = (props) => {
    console.log(props)
  const history = useHistory();
  const onFinish = async (values) => {
    await Axios.patch("http://localhost:8082/facilities/" + props.location.data.id, values.facility, {
      headers: { Authorization: "Bearer sasadssad" },
    });
    history.push("/");
  };

  const types = [
    { label: "Electricity", value: "Electricity" },
    { label: "Furniture", value: "Furniture" },
    { label: "Computers", value: "Computers" },
  ];

  return (
    <>
      <h1 className="heading">Update Facility {props.location.data.id}</h1>
      <Form
        className="login-form"
        name="nest-messages"
        onFinish={onFinish}
      >
        <Form.Item
          name={["facility", "name"]}
          label="Name"

        className="formName"
          rules={[
            {
              required: true,
              message: 'Please input your Last name!',
              whitespace: true,
            },
          ]}
        >
          <Input defaultValue={props.location.data.name}/>
        </Form.Item>

        <Form.Item
          name={["facility", "description"]}
          label="Description"
          className="formName"
          rules={[
            {
              message: 'Please input your Last name!',
              whitespace: true,
            },
          ]}
        >
          <Input defaultValue={props.location.data.description}/>
        </Form.Item>

        <Form.Item
          name={["facility", "type"]}
          label="Type"
          rules={[{ required: true, message: "Missing type" }]}
        >
          <Select placeholder="Select a Facility Type" options={types} defaultValue={props.location.data.type}/>
        </Form.Item>

        <Form.Item
          name={["facility", "isActive"]}
          label="isActive"
          rules={[{ required: true }]}
        >
          <Switch defaultValue={props.location.data.isActive}/>
        </Form.Item>

        <Form.Item
          name={["facility", "address"]}
          label="Address"
          className="formName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue={props.location.data.address}/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default withRouter(UpdateFacility);
