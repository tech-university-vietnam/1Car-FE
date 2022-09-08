import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Row, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { useAppDispatch } from '../../redux';
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
    title: 'Car Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Status',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Price/Hour',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Attribute',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
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

export default function CarManagement() {
  const dispatch = useAppDispatch();
  const [createVisible, setCreateVisible] = useState(false);

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
        <Table columns={columns} dataSource={data} />
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
