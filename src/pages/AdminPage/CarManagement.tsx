import { PlusOutlined } from '@ant-design/icons';
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
import { getCarForAdmin } from '../../apis';
import { Attribute, CarAdminFilter } from '../../redux/reducer/car';

interface CarData {
  id: string;
  name: string;
  description?: any;
  status: string;
  pricePerDate: number;
  attributes: Attribute[];
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<CarData> = [
  {
    title: 'Car Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Price/Hour',
    dataIndex: 'pricePerDate',
    key: 'pricePerDate',
  },
  {
    title: 'Attribute',
    key: 'attributes',
    dataIndex: 'attributes',
    render: (_, { attributes }) => (
      <>
        {attributes.map((attribute: Attribute) => {
          let color = attribute.value.length > 5 ? 'geekblue' : 'green';
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
        <a>Update</a>
        <a>View</a>
      </Space>
    ),
  },
];

export default function CarManagement() {
  const [createVisible, setCreateVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setCarData] = useState<any[]>([]);
  const [total, setTotalRecords] = useState(0);
  const filter: CarAdminFilter = {
    page: page,
    limit: 1,
  };

  const getCarToDisplay = async (page: number, pageSize: number) => {
    const res = await getCarForAdmin({
      page: page,
      limit: pageSize,
    });
    setCarData(res.cars);
    setTotalRecords(res.totalRecords);
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
          onClick={() => setCreateVisible(true)}
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
        title={'Create new car'}
        footer={null}
        width='60%'
        onCancel={() => setCreateVisible(false)}
      >
        <CreateCarForm onClose={() => setCreateVisible(false)} />
      </Modal>
    </div>
  );
}
