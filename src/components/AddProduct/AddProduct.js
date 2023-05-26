import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const ProductFormModal = ({ isOpen, handleOk, handleCancel, onFinish }) => {
  return (
    <Modal title='Add Product' visible={isOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
        <Form.Item
          name='ProductTitle'
          rules={[{ required: true, message: 'Please input product name!' }]}
        >
          <Input placeholder='Enter product name' />
        </Form.Item>
        <Form.Item
          name='ProductDescription'
          rules={[{ required: true, message: 'Please input product description!' }]}
        >
          <TextArea rows={4} placeholder='Enter product description' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductFormModal;
