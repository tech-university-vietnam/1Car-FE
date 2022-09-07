import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Switch,
  TreeSelect,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { createCarAttribute } from '../../apis';
import { useAppDispatch, useAppSelector } from '../../redux';
import { getCarAttributeAction } from '../../redux/reducer/car';

const CreateCarAttribute = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();

  const types = useAppSelector((state) => state.car.attributeTypes);

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const value = await form.validateFields();
      await createCarAttribute(value);
      form.resetFields();
      dispatch(getCarAttributeAction());
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getCarAttributeAction());
  }, []);

  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout='horizontal'
        size={'large'}
      >
        <Form.Item label='Input' name='value' rules={[{ required: true }]}>
          <Input placeholder='Enter your attribute name' />
        </Form.Item>

        <Form.Item label='Type' name='type'>
          <Select placeholder="Attribute's type">
            {types.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            offset: 20,
            span: 4,
          }}
        >
          <Button
            className='ml-auto flex'
            type='primary'
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateCarAttribute;
