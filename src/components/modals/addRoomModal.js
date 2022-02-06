import React from 'react';
import { Form, Modal, Input } from 'antd';
export default function AddRoomModal() {
  const [form] = Form.useForm();
  const handleOk = () => {
    // handle logic
    // add new room to firestore
    //addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });

    // reset form value
    form.resetFields();

   // setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();

  //  setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title='Tạo phòng'
        visible={true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Tên phòng' name='name'>
            <Input placeholder='Nhập tên phòng' />
          </Form.Item>
          <Form.Item label='Mô tả' name='description'>
            <Input.TextArea placeholder='Nhập mô tả' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}