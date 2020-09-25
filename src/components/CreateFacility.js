import React from "react";
import { Form, Input, Button, Select, Switch } from "antd";
import "../styles/CreateFacility.css";
import Axios from "axios";
import { useHistory } from "react-router";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not valid email!",
  },
};

const CreateFacility = () => {
  const history = useHistory();
  const onFinish = async (values) => {
    await Axios.post("http://localhost:8082/facilities", values.facility, {
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
      <h1 className="heading">Create a Facility</h1>
      <Form
        className="login-form"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["facility", "name"]}
          label="Name"

        className="formName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          name={["facility", "description"]}
          label="Description"
          className="formName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["facility", "type"]}
          label="Type"
          rules={[{ required: true, message: "Missing type" }]}
        >
          <Select placeholder="Select a Facility Type" options={types} />
        </Form.Item>

        <Form.Item
          name={["facility", "isActive"]}
          label="isActive"
          rules={[{ required: true }]}
        >
          <Switch />
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
          <Input />
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

export default CreateFacility;
