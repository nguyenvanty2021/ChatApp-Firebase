import React, { useState } from "react";
import { Form, Modal, Input, Button } from "antd";
import { addDocument } from "../../firebase/services";
export default function AddRoomModal({ visible, handleModal, user }) {
  const [form] = Form.useForm();

  // const handleOk = () => {

  // };

  const handleCancel = () => {
    // reset form value
    form.resetFields();

    handleModal(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    // handle logic
    // add new room to firestore
    addDocument("rooms", { ...values, members: [user?.uid || ""] });

    // reset form value
    form.resetFields();

    handleModal(false);
  };
  return (
    <div>
      <Modal
        title="Tạo phòng"
        visible={visible}
        footer={null}
        //     onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item
            rules={[
              { required: true, message: "Please input your room name!" },
            ]}
            label="Tên phòng"
            name="rooms"
          >
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
            label="Mô tả"
            name="description"
          >
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
