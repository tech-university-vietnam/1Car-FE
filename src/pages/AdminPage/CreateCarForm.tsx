import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Select,
  Space,
  Switch,
  TreeSelect,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { createCar } from '../../apis';
import { useAppDispatch, useAppSelector } from '../../redux';
import { getCarAttributeAction } from '../../redux/reducer/car';
import CreateCarAttribute from './CreateCarAttribute';

const CreateCarForm = () => {
  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const attributes = useAppSelector((state) => state.car.attributes);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [selecteImages, setSelectedImages] = useState<any>([]);
  const [locationId, setLocationId] = useState('');

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const value = await form.validateFields();
      const formData = new FormData();

      const { images, attributes, ...data } = value;

      data['status'] = data['status'] === true ? 'AVAILABLE' : 'UNAVAILABLE';

      Object.keys(data).map((key) => {
        formData.append(key, data[key]);
      });
      attributes.forEach((item: any) => formData.append('attributes', item));
      formData.append('locationId', locationId);

      for (let i = 0; i < selecteImages.length; i++) {
        formData.append('images', selecteImages[i]);
      }

      await createCar(formData);
      message.success('Create car successfully!');
      form.resetFields();
      setSelectedImages([]);
    } catch (err) {
      message.error('Create car failed, please try again!');
      console.log(err);
    }
  };

  useEffect(() => {
    form?.resetFields();
    setSelectedImages([]);
    dispatch(getCarAttributeAction());
  }, []);

  return (
    <>
      <Form
        ref={ref}
        form={form}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
        layout='horizontal'
        size={'large'}
      >
        <Form.Item label='Input' name='name' rules={[{ required: true }]}>
          <Input placeholder='Enter your car name' />
        </Form.Item>
        <Form.Item
          label='Price/day'
          name='pricePerDate'
          rules={[{ required: true }]}
        >
          <InputNumber
            addonAfter='$'
            style={{ width: 300 }}
            placeholder='Price for rent/day'
          />
        </Form.Item>
        <Form.Item label='Number of trips' name='numberOfTrips'>
          <InputNumber style={{ width: 300 }} />
        </Form.Item>

        <Form.Item label='Number of kms' name='numberOfKilometer'>
          <InputNumber style={{ width: 300 }} addonAfter='KM' />
        </Form.Item>
        <Form.Item label='Location' name='locationId'>
          <GooglePlacesAutocomplete apiKey={process.env.REACT_APP_GG_API_KEY} />
        </Form.Item>
        <Form.Item
          label='Available'
          valuePropName='checked'
          name='status'
          initialValue={true}
        >
          <Switch defaultChecked={true} />
        </Form.Item>
        <Form.Item label='Attributes' name='attributes'>
          <Select
            mode='tags'
            placeholder="Car's attribute"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <Button
                    className='flex items-center justify-center'
                    type='text'
                    icon={<PlusOutlined />}
                    onClick={() => setVisibleCreateModal(true)}
                  >
                    Add new
                  </Button>
                </Space>
              </>
            )}
          >
            {attributes.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.type.type}: {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Description'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label='Image' name='images'>
          <input
            type='file'
            accept='png'
            multiple={true}
            onChange={(event) => setSelectedImages(event.target.files)}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 4,
            offset: 20,
          }}
        >
          <Button onClick={handleSubmit} type='primary'>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title='Create new attribute'
        visible={visibleCreateModal}
        onCancel={() => setVisibleCreateModal(false)}
        footer={null}
      >
        <CreateCarAttribute onClose={() => setVisibleCreateModal(false)} />
      </Modal>
    </>
  );
};

export default CreateCarForm;
