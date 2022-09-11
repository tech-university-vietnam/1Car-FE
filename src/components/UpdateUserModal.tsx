import { Checkbox, DatePicker, Form, Input, Modal } from 'antd';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../redux';
import { updateUserInfoAction } from '../redux/reducer/user';
import { updateUserInfoUsingAdminAccount } from '../apis';

export default forwardRef((props: any, ref) => {
  const [visible, setVisible] = useState(props.visible ? props.visible : false);

  const onClose = () => setVisible(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true);
    },
    close: () => {
      setVisible(false);
    },
  }));

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      closable={!!props.isEdit}
    >
      <h2 className='mb-6 text-center text-2xl'>
        {props.isEdit
          ? 'Update your information'
          : 'We need more information from you'}
      </h2>
      <UpdateUserInfoForm
        onSubmit={onClose}
        isEdit={props.isEdit}
        isAdmin={props.isAdmin}
        {...(props.isEdit ? { user: props.user } : {})}
      />
    </Modal>
  );
});

export function UpdateUserInfoForm(props: any) {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onFormChange = async () => {
    try {
      await form.validateFields([
        'name',
        'dateOfBirth',
        'phoneNumber',
        'accept',
      ]);
      setDisable(false);
    } catch (err: any) {
      if (err?.errorFields?.length === 0) {
        setDisable(false);
      } else setDisable(true);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    const fields = form.getFieldsValue(['name', 'dateOfBirth', 'phoneNumber']);
    fields.dateOfBirth = fields.dateOfBirth.format('YYYY-MM-DD');
    if (!props.isAdmin) {
      dispatch(updateUserInfoAction(fields));
    } else {
      try {
        await updateUserInfoUsingAdminAccount({
          id: props.user.id,
          ...fields,
        });
      } catch (err: any) {
        console.log(err);
      }
    }
    setLoading(false);
    props.onSubmit();
  };

  useEffect(() => {
    if (props.user) {
      // Load default value for form if onEdit
      for (const [key, value] of Object.entries(props.user)) {
        if (key !== 'dateOfBirth') {
          form.setFieldsValue({ [key]: value });
        }
      }
      form.setFieldsValue({ accept: true });
    }
  }, [props.user, form]);

  return (
    <Form
      form={form}
      validateTrigger='onBlur'
      autoComplete={'off'}
      onChange={onFormChange}
    >
      <Form.Item
        name='name'
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input
          size='large'
          placeholder='Name'
          className='w-full rounded border border-gray-200 p-3'
          autoComplete={'off'}
        />
      </Form.Item>
      <Form.Item
        name='phoneNumber'
        rules={[{ required: true, message: 'Please enter your phone number' }]}
      >
        <Input
          size='large'
          placeholder='Phone Number'
          className='w-full rounded border border-gray-200 p-3'
          type={'string'}
          autoComplete={'off'}
        />
      </Form.Item>
      <Form.Item
        name='dateOfBirth'
        rules={[
          {
            required: true,
            message: 'Please enter your date of birth',
          },
        ]}
      >
        <DatePicker
          className='w-full p-3'
          placeholder='Date of birth (yyyy-mm-dd)'
          size='large'
        />
      </Form.Item>
      <Form.Item name='accept' valuePropName=''>
        <Checkbox>
          <span className='opacity-50'>Is this information correct?</span>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <button
          disabled={disable || loading}
          onClick={onSubmit}
          className='w-full rounded p-2 text-base text-white disabled:opacity-50'
          style={{ background: '#66BFBF', borderColor: '#66BFBF' }}
        >
          {loading ? <LoadingOutlined /> : 'Send your information'}
        </button>
      </Form.Item>
    </Form>
  );
}
