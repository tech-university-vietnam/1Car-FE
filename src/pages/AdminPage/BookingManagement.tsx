import { Row, Table, Space, Modal, Select, message, DatePicker } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { updateBookingForAdmin } from '../../apis';
import { useAppDispatch, useAppSelector } from '../../redux';
import {
  BookingData,
  getAllBookingForAdminAction,
} from '../../redux/reducer/booking';
import BookingDetail from './BookingDetail';
import { Link } from 'react-router-dom';

const PICKUP_STATUS = ['PICKUP', 'PENDING', 'RETURNED'];
const BOOKING_STATUS = ['PENDING', 'SUCCESS', 'FAILED'];

export default function BookingManagement() {
  const dispatch = useAppDispatch();
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<BookingData | null>(
    null
  );

  const allBooking = useAppSelector((state) => state.booking.allBooking);

  const columns: ColumnsType<BookingData> = [
    {
      title: 'User Name',
      dataIndex: 'user',
      key: 'user',
      render: (user) => <span>{user.name}</span>,
    },
    {
      title: 'Car Name',
      dataIndex: 'car',
      key: 'car',
      render: (car) => (
        <Link to={'/details/' + car.id}>
          <a>{car.name}</a>
        </Link>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'receivedDateTime',
      key: 'receivedDateTime',
      width: 200,
      render: (date, { id }) => (
        <DatePicker
          defaultValue={moment(date)}
          placeholder='Receive date'
          onChange={(value) =>
            updateBooking(id, { receivedDateTime: value?.toISOString() })
          }
        />
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'returnDateTime',
      key: 'returnDateTime',
      width: 200,
      render: (date, { id }) => (
        <DatePicker
          defaultValue={moment(date)}
          placeholder='Return date'
          onChange={(value) =>
            updateBooking(id, { returnDateTime: value?.toISOString() })
          }
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) =>
        Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price),
    },
    {
      title: 'Payment Status',
      dataIndex: 'bookingStatus',
      key: 'bookingStatus',
      render: (status, { id }) => (
        <Select
          defaultValue={status}
          style={{ width: '100%' }}
          size='small'
          onChange={(value) => updateBooking(id, { status: value })}
        >
          {BOOKING_STATUS.map((item) => (
            <Select.Option value={item}>{item}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Pickup status',
      dataIndex: 'pickUpStatus',
      key: 'pickUpStatus',
      width: 150,
      render: (status, { id }) => (
        <Select
          defaultValue={status}
          style={{ width: '100%' }}
          size='small'
          onChange={(value) => updateBooking(id, { pickUpStatus: value })}
        >
          {PICKUP_STATUS.map((item) => (
            <Select.Option value={item}>{item}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a
            onClick={() => {
              setVisibleInfo(true);
              setCurrentBooking(record);
            }}
          >
            View
          </a>
        </Space>
      ),
    },
  ];

  const updateBooking = async (id: string, data: any) => {
    confirm({
      title: 'Confirm update',
      content: 'Are you sure to update this booking detail?',
      onOk: async () => {
        try {
          await updateBookingForAdmin(id, data);
          dispatch(getAllBookingForAdminAction());
          message.success('Update successfully!');
        } catch (err) {
          message.error('Update failed, please try again.');
        }
      },
    });
  };

  useEffect(() => {
    dispatch(getAllBookingForAdminAction());
  }, []);

  return (
    <div className='m-12 max-h-full overflow-auto bg-white'>
      <Row className='p-2'></Row>
      <div className='p-2'>
        <Table columns={columns} dataSource={allBooking} />
      </div>
      <Modal
        visible={visibleInfo}
        onCancel={() => setVisibleInfo(false)}
        title='Booking'
        width={'60%'}
        key={currentBooking?.id}
      >
        <BookingDetail booking={currentBooking} />
      </Modal>
    </div>
  );
}
