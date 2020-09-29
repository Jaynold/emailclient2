import React, { useEffect } from "react";
import { Form, Input, Button, Select, Switch, Spin } from "antd";
import "../styles/CreateFacility.css";
import { useFacilities } from "../hooks/useFacilities";
import { useParams } from "react-router";

const MyForm = (props) => {
  const [response, setConfig] = useFacilities(false);
  const { id } = useParams();

  useEffect(() => {
    setConfig({ url: "/1", method: "get" });
  }, [setConfig]);

  const onFinish = (values) => {
    if (props.type === "Create")
      setConfig({ url: "", method: "post", data: values.facility });
    else
      setConfig({
        url: `/${id}`,
        method: "patch",
        data: values.facility,
      });
    props.history.push("/");
  };

  const facility_types = [
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
    whitespace: "${label} cannot be empty!",
  };

  return (
    <>
      <h1 className="heading">
        {props.type === "Update"
          ? "Update Facility " + id
          : "Create a Facility"}
      </h1>
      {props.type === "Create" || (props.type === "Update" && response) ? 
      <Form
      {...layout}
      className="myForm"
      name="myForm"
      size="large"
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <Form.Item
        name={["facility", "name"]}
        initialValue={response ? response.name : ''}
        label="Name"
        rules={[
          {
            required: true,
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["facility", "email"]}
        label="Email"
        initialValue={response ? response.email : ''}
        rules={[
          {
            type: "email",
            required: true,
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["facility", "description"]}
        label="Description"
        initialValue={response ? response.description : ''}
        rules={[
          {
            required: true,
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["facility", "type"]}
        label="Type"
        rules={[{ required: true }]}
      >
        <Select
          mode="multiple"
          allowClear
          placeholder="Select a Facility Type"
          options={facility_types}
          style={{ backgroundColor: "white" }}
          defaultValue={response ? response.type : ''}
        />
      </Form.Item>

      <Form.Item name={["facility", "isActive"]} label="isActive">
        <Switch defaultChecked={response ? response.isActive : ''} />
      </Form.Item>

      <Form.Item
        name={["facility", "address"]}
        label="Address"
          initialValue={response ? response.address : ''}
          rules={[
          {
            whitespace: true,
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...buttonLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form> : <Spin/>}
    </>
  );
};

export default MyForm;
