import React, { useContext } from "react";
import { Form, Input, Button, Select, Switch } from "antd";
import "../styles/MyForm.css";
import { FacilitiesContext } from "../contexts/FaciltiesContext";

const MyForm = props => {
  const { setConfig } = useContext(FacilitiesContext);
  const { history, location, type } = props;
  const facility = location?.state;

  const formtype = {
    isCreate: type === "Create",
    isUpdate: type === "Update",
  };

  const onFinish = values => {
    if (formtype.isCreate) setConfig({ url: "", method: "post", data: values });
    else
      setConfig({
        url: `/${facility?.id}`,
        method: "patch",
        data: values,
      });
    history.push("/");
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
        {formtype.isUpdate
          ? `Update Facility ${facility?.id}`
          : "Create a Facility"}
      </h1>
      <Form
        {...layout}
        className="frm"
        name="myForm"
        size="large"
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          initialValue={facility?.name}
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
          name="email"
          label="Email"
          initialValue={facility?.email}
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          initialValue={facility?.description}
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
          name="type"
          label="Type"
          rules={[{ required: true }]}
          initialValue={facility?.type}
        >
          <Select
            mode="multiple"
            allowClear
            placeholder="Select a Facility Type"
            options={facility_types}
          />
        </Form.Item>
        <Form.Item name={"isActive"} label="isActive">
          <Switch defaultChecked={facility?.isActive} />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          initialValue={facility?.address}
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
      </Form>
      )}
    </>
  );
};

export default MyForm;
