import {
  FacebookFilled,
  GoogleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Checkbox, Divider, Form, Input, Modal } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

export default forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const onClose = () => setVisible(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true);
    },
  }));

  return (
    <Modal visible={visible} onCancel={onClose} footer={null} closable={false}>
      <h2 className="mb-6 text-center text-2xl">Welcome Back</h2>
      <SignInForm />
    </Modal>
  );
});

export function SignInForm() {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const onFormChange = async () => {
    try {
      await form.validateFields(['email', 'password']);
      setDisable(false);
    } catch (err: any) {
      if (err?.errorFields?.length === 0) {
        setDisable(false);
      } else setDisable(true);
    }
  };

  const onSubmit = async () => {
    const fields = form.getFieldsValue();

    //simulate call api
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Form
      form={form}
      validateTrigger="onBlur"
      autoComplete={'off'}
      onChange={onFormChange}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, type: 'email', message: 'Please enter your email' },
        ]}
      >
        <Input
          size="large"
          placeholder="Email"
          className="w-full rounded border border-gray-200 p-3"
          type={'email'}
          autoComplete={'off'}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input
          size="large"
          placeholder="Password"
          className="w-full rounded border border-gray-200 p-3"
          type={'password'}
          autoComplete={'off'}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox>
          <span className="opacity-50">Remember me.</span>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <button
          disabled={disable || loading}
          onClick={onSubmit}
          className="flex h-10 w-full items-center justify-center rounded text-base text-white disabled:opacity-50"
          style={{ background: '#66BFBF', borderColor: '#66BFBF' }}
        >
          {loading ? <LoadingOutlined /> : 'Login'}
        </button>
      </Form.Item>
      <Divider>
        <span className="text-xs text-gray-400">Or</span>
      </Divider>
      <div>
        <button className="my-3 flex w-full items-center justify-center rounded bg-blue-500 p-2 text-white">
          <FacebookFilled className="mr-2" /> Login with Facebook
        </button>
        <button className="my-3 flex w-full items-center justify-center rounded bg-red-500 p-2 text-white ">
          <GoogleOutlined className="mr-2" /> Login with Google
        </button>
      </div>
    </Form>
  );
}
