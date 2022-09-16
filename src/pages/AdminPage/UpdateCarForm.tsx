import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Switch,
} from 'antd';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { updateCar } from '../../apis';
import { useAppDispatch, useAppSelector } from '../../redux';
import {
  Car,
  getCarAttributeAction,
  updateCarListOfAdmin,
} from '../../redux/reducer/car';
import UpdateCarAttribute from './CreateCarAttribute';

const UpdateCarForm = (props: any) => {
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const [carData, setCarData] = useState<any>(props.car);
  const attributes = useAppSelector((state) => state.car.attributes);
  const [visibleUpdateModal, setVisibleUpdateModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [locationId, setLocationId] = useState(carData.locationId);
  const [loading, setLoading] = useState(false);

  const [currentImages, setCurrentImages] = useState<string[]>([
    ...(carData.images || []),
  ]);

  useEffect(() => {
    if (carData.images) {
      setCurrentImages([...(carData.images || [])]);
    }
  }, [carData.images]);

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const value = await form.validateFields();
      const formData = new FormData();

      const { images, attributes, ...data } = value;

      data['status'] = data['status'] === true ? 'AVAILABLE' : 'UN_AVAILABLE';

      Object.keys(data).map((key) => {
        if (data[key]) formData.append(key, data[key]);
      });
      attributes.forEach((item: any) => {
        if (item.id) {
          formData.append('attributes', item.id);
        } else {
          formData.append('attributes', item);
        }
      });

      for (let i = 0; i < selectedImages.length; i++) {
        formData.append('images', selectedImages[i]);
      }

      for (let image of currentImages) {
        formData.append('existedImages', image);
      }

      const updatedCar: Car = await updateCar({
        id: carData.id,
        form: formData,
      });

      dispatch(updateCarListOfAdmin(updatedCar));

      message.success('Update car successfully!');
      form.resetFields();
      setSelectedImages([]);
      props.onClose();
    } catch (err) {
      message.error('Update car failed, please try again!');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form?.resetFields();
    setSelectedImages([]);
    dispatch(getCarAttributeAction());
  }, []);

  const setFormValue = (carData: Car) => {
    return {
      name: carData.name,
      pricePerDate: carData.pricePerDate,
      numberOfTrips: carData.numberOfTrips,
      numberOfKilometer: carData.numberOfKilometer,
      status: carData.status === 'AVAILABLE',
      description: carData.description,
      attributes: carData.attributes.map((attribute: any) => attribute.id),
    };
  };

  const removeLinkFromExistedLink = async (id: string, imageLink: string) => {
    const index = _.findIndex(currentImages, (item) => item == imageLink);
    const newData = [...currentImages];
    newData.splice(index, 1);
    setCurrentImages(newData);
  };

  useEffect(() => {
    form.setFieldsValue(setFormValue(props.car));
    setCarData(props.car);
  }, [form, props.car]);

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
        initialValues={{
          name: carData.name,
          pricePerDate: carData.pricePerDate,
          numberOfTrips: carData.numberOfTrips,
          numberOfKilometer: carData.numberOfKilometer,
          status: carData.status === 'AVAILABLE',
          description: carData.description,
          attributes: carData.attributes.map((attribute: any) => attribute.id),
        }}
      >
        <Form.Item label='Input' name='name' rules={[{ required: true }]}>
          <Input placeholder='Enter your car name' />
        </Form.Item>
        <Form.Item
          label='Price/day'
          name='pricePerDate'
          rules={[{ type: 'number', required: true }]}
        >
          <InputNumber
            addonAfter='$'
            style={{ width: 300 }}
            placeholder='Price for rent/day'
          />
        </Form.Item>
        <Form.Item
          label='Number of trips'
          name='numberOfTrips'
          rules={[{ type: 'number', min: 0 }]}
        >
          <InputNumber style={{ width: 300 }} />
        </Form.Item>

        <Form.Item
          label='Number of kms'
          name='numberOfKilometer'
          rules={[{ type: 'number', min: 0 }]}
        >
          <InputNumber style={{ width: 300 }} addonAfter='KM' />
        </Form.Item>
        <Form.Item label='Location' name='locationId' initialValue={''}>
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GG_API_KEY}
            selectProps={{
              value: locationId,
              onChange: setLocationId,
            }}
          />
        </Form.Item>
        <Form.Item label='Available' valuePropName='checked' name='status'>
          <Switch defaultChecked={true} />
        </Form.Item>
        <Form.Item
          label='Attributes'
          name='attributes'
          rules={[{ required: true }]}
        >
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
                    onClick={() => setVisibleUpdateModal(true)}
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
        <Form.Item label='Description' name='description'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label='Images' name='images'>
          <Image.PreviewGroup>
            <Space size='middle'>
              {currentImages.map((link: string) => (
                <div className='relative'>
                  <>
                    <Image key={link} width={80} src={link} preview={false} />
                    <DeleteTwoTone
                      className='absolute -top-2 right-0 text-red-500'
                      twoToneColor='#eb2f96'
                      style={{ fontSize: '20px' }}
                      onClick={() => {
                        removeLinkFromExistedLink(props.car.id, link);
                      }}
                    />
                  </>
                </div>
              ))}
            </Space>
          </Image.PreviewGroup>
          <input
            className='mt-3'
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            multiple={true}
            onChange={(event) => setSelectedImages(event.target.files)}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 5,
            offset: 19,
          }}
        >
          <div className='flex items-center justify-between'>
            <Button onClick={props.onClose} type='text'>
              Cancel
            </Button>
            <Button onClick={handleSubmit} type='primary' loading={loading}>
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>

      <Modal
        title='Create new attribute'
        visible={visibleUpdateModal}
        onCancel={() => setVisibleUpdateModal(false)}
        footer={null}
      >
        <UpdateCarAttribute onClose={() => setVisibleUpdateModal(false)} />
      </Modal>
    </>
  );
};

export default UpdateCarForm;
