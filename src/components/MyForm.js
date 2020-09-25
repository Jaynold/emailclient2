import React from "react";
import { Form, Input, Button, Select, Switch } from "antd";
import "../styles/CreateFacility.css";
import Axios from "axios";

const MyForm = (props) => {
  console.log(props.type);
  const onFinish = async (values) => {
    if (props.type === "Create")
      await Axios.post("http://localhost:8082/facilities", values.facility, {
        headers: { Authorization: "Bearer sasadssad" },
      });
    else
      await Axios.patch(
        "http://localhost:8082/facilities/" + props.location.data.id,
        values.facility,
        {
          headers: { Authorization: "Bearer sasadssad" },
        }
      );
    props.history.push("/");
  };

  const types = [
    { label: "Electricity", value: "Electricity" },
    { label: "Furniture", value: "Furniture" },
    { label: "Computers", value: "Computers" },
  ];

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };

  const buttonLayout = {
    wrapperCol: { offset: 7 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not valid email!",
    },
  };
  return (
    <>
      <h1 className="heading">
        {props.type === "Update"
          ? "Update Facility " + props.location.data.id
          : "Create a Facility"}
      </h1>
      <Form
        {...layout}
        layout="horizontal"
        className="login-form"
        name="nest-messages"
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <Form.Item
          name={["facility", "name"]}
          label="Name"
          className="formName"
          rules={[
            {
              required: true,
              message: "Please input facility  name!",
              whitespace: true,
            },
          ]}
        >
          <Input defaultValue={props.location.data?.name} />
        </Form.Item>

        <Form.Item
          name={["facility", "description"]}
          label="Description"
          className="formName"
          rules={[
            {
              required: true,
              message: "Please input descriptioon fof facility!",
              whitespace: true,
            },
          ]}
        >
          <Input defaultValue={props.location.data?.description} />
        </Form.Item>

        <Form.Item
          name={["facility", "type"]}
          label="Type"
          rules={[{ required: true, message: "Missing type" }]}
        >
          <Select
            placeholder="Select a Facility Type"
            options={types}
            style={{ backgroundColor: "white" }}
            defaultValue={props.location.data?.type}
          />
        </Form.Item>

        <Form.Item
          name={["facility", "isActive"]}
          label="isActive"
          rules={[{ required: true }]}
        >
          <Switch value={props.location.data?.isActive} />
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
          <Input defaultValue={props.location.data?.address} />
        </Form.Item>

        <Form.Item {...buttonLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default MyForm;
