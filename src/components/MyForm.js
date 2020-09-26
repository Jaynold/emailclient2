import React from "react";
import { Form, Input, Button, Select, Switch } from "antd";
import "../styles/CreateFacility.css";
import { useFacilities } from "../reducer/FacilitiesReducer";

const MyForm = (props) => {
  const [, setConfig] = useFacilities(false);

  const onFinish = async (values) => {
    if (props.type === "Create")
      setConfig({ url: "", method: "post", data: values.facility });
    else
      setConfig({
        url: `/${props.location.data.id}`,
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
    whitespace: "${label} cannot be empty!"
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
        className="myForm"
        name="myForm"
        size="large"
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
              whitespace: true,
            },
          ]}
        >
          <Input defaultValue={props.location.data?.description} />
        </Form.Item>

        <Form.Item
          name={["facility", "type"]}
          label="Type"
          rules={[{ required: true}]}
        >
          <Select
            placeholder="Select a Facility Type"
            options={facility_types}
            style={{ backgroundColor: "white" }}
            defaultValue={props.location.data?.type}
          />
        </Form.Item>

        <Form.Item
          name={["facility", "isActive"]}
          label="isActive"
        >
          <Switch defaultChecked={props.location.data?.isActive} />
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