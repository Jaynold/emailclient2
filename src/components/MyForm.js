import React, { useEffect } from "react";
import { Form, Input, Button, Select, Switch, Spin } from "antd";
import { useFacilities } from "../hooks/useFacilities";
import { useParams, useHistory } from "react-router";
import "../styles/MyForm.css";

const MyForm = (props) => {
  const [response, setConfig] = useFacilities(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    let didCancel = false;
    if (!didCancel && props.type === "Update")
      setConfig({ type: "GET_FACILITY", id });
    return () => (didCancel = true);
  }, [id, props.type, setConfig]);

  const onFinish = (values) => {
    if (props.type === "Create")
      setConfig({ type: "CREATE_FACILITY", data: values.facility });
    else setConfig({ type: "UPDATE_FACILITY", id, data: values.facility });
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
        {props.type === "Update"
          ? "Update Facility " + id
          : "Create a Facility"}
      </h1>
      {props.type === "Create" || (props.type === "Update" && response) ? (
        <Form
          {...layout}
          className="frm"
          name="myForm"
          size="large"
          validateMessages={validateMessages}
          onFinish={onFinish}
        >
          <Form.Item
            name={["facility", "name"]}
            initialValue={response?.name}
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
            initialValue={response?.email}
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
            initialValue={response?.description}
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
            initialValue={response?.type}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Select a Facility Type"
              options={facility_types}
            />
          </Form.Item>
          {console.log(response.isActive)}
          <Form.Item name={["facility", "isActive"]} label="isActive">
            <Switch defaultChecked={response?.isActive} />
          </Form.Item>

          <Form.Item
            name={["facility", "address"]}
            label="Address"
            initialValue={response?.address}
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
      ) : (
        <Spin />
      )}
    </>
  );
};

export default MyForm;
