import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Button, Table, Space, Tag, Modal } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import CreateCarForm from './CreateCarForm';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'User Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Phone',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a>View</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Car Name',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Status',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default function UserManagement() {
  return (
    <div className='m-12 max-h-full overflow-auto bg-white'>
      <Row className='p-2'></Row>
      <div className='p-2'>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}
