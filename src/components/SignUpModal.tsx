import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
} from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  FacebookFilled,
  GoogleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

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
      <h2 className="mb-6 text-center text-2xl">Welcome to 1Car</h2>
      <SignUpForm />
    </Modal>
  );
});

export function SignUpForm() {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const onFormChange = async () => {
    try {
      await form.validateFields([
        'email',
        'password',
        'name',
        'accept',
        'dateOfBirth',
      ]);
      setDisable(false);
    } catch (err: any) {
      if (err?.errorFields?.length === 0) {
        setDisable(false);
      } else setDisable(true);
    }
  };

  const onSubmit = async () => {
    const fields = form.getFieldsValue();
    console.log(fields);
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
        name="name"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input
          size="large"
          placeholder="Name"
          className="w-full rounded border border-gray-200 p-3"
          autoComplete={'off'}
        />
      </Form.Item>
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
        name="dateOfBirth"
        rules={[
          {
            required: true,
            message: 'Please enter your date of birth',
          },
        ]}
      >
        <DatePicker
          className="w-full p-3"
          placeholder="Date of birth (yyyy-mm-dd)"
          size="large"
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
      <Form.Item name="accept" valuePropName="checked">
        <Checkbox>
          <span className="opacity-50">
            I accept with <a>terms and conditions</a>.
          </span>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <button
          disabled={disable || loading}
          onClick={onSubmit}
          className="w-full rounded p-2 text-base text-white disabled:opacity-50"
          style={{ background: '#66BFBF', borderColor: '#66BFBF' }}
        >
          {loading ? <LoadingOutlined /> : 'Sign Up'}
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
