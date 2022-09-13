import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Row,
  Button,
  Table,
  Space,
  Tag,
  Modal,
  TablePaginationConfig,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import CreateCarForm from './CreateCarForm';

import {
  Attribute,
  Car,
  CarAdminFilter,
  getCarForAdminAction,
} from '../../redux/reducer/car';
import { Link } from 'react-router-dom';
import UpdateCarForm from './UpdateCarForm';
import { useAppDispatch, useAppSelector } from '../../redux';

export default function CarManagement() {
  const columns: ColumnsType<Car> = [
    {
      title: 'Car Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={'/details/' + record.id}>
          <a>{text}</a>
        </Link>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Price/Date',
      dataIndex: 'pricePerDate',
      key: 'pricePerDate',
    },
    {
      title: 'Attribute',
      key: 'attributes',
      dataIndex: 'attributes',
      render: (_, { attributes }) => (
        <>
          {attributes.map((attribute: Attribute, index: number) => {
            let colors = ['geekblue', 'green', 'volcano'];
            let color = colors[index % 3];
            return (
              <Tag color={color} key={attribute.id}>
                {attribute.value.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            onClick={() => {
              setModalTitle('Update a car');
              setCreateVisible(true);
              setModalContent(
                <UpdateCarForm
                  onClose={() => setCreateVisible(false)}
                  car={record}
                />
              );
            }}
            icon={<EditOutlined />}
          />
        </Space>
      ),
    },
  ];
  const dispatch = useAppDispatch();
  const [createVisible, setCreateVisible] = useState(false);
  const [page, setPage] = useState(1);
  const data = useAppSelector((state) => state.car.adminCars);
  const total = useAppSelector((state) => state.car.totalRecords);
  const [modalTitle, setModalTitle] = useState('Create new car');
  const [modalContent, setModalContent] = useState(
    <CreateCarForm onClose={() => setCreateVisible(false)} />
  );
  const filter: CarAdminFilter = {
    page: page,
    limit: 10,
  };

  const getCarToDisplay = async (page: number, pageSize: number) => {
    dispatch(getCarForAdminAction({ page, limit: pageSize }));
  };

  useEffect(() => {
    getCarToDisplay(filter.page || 1, filter.limit || 10);
  }, []);

  const onChangePagination = (pagination: TablePaginationConfig) => {
    setPage(page);
    getCarToDisplay(pagination.current || 1, pagination.pageSize || 1);
  };

  return (
    <div className='m-12 max-h-full overflow-auto bg-white'>
      <Row className='p-2'>
        <Button
          style={{ display: 'flex !important' }}
          className='ml-auto flex items-center justify-center'
          onClick={() => {
            setModalTitle('Create new car');
            setModalContent(
              <CreateCarForm onClose={() => setCreateVisible(false)} />
            );
            setCreateVisible(true);
          }}
        >
          <span>Add new</span> <PlusOutlined size={50} />
        </Button>
      </Row>
      <div className='p-2'>
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChangePagination}
          pagination={{
            total: total,
            defaultPageSize: filter.limit,
          }}
        />
      </div>
      <Modal
        visible={createVisible}
        title={modalTitle}
        footer={null}
        width='60%'
        onCancel={() => setCreateVisible(false)}
      >
        {modalContent}
      </Modal>
    </div>
  );
}
