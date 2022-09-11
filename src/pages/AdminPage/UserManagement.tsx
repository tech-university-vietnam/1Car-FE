import { Row, Table, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect } from 'react';
import User, { getAllUsersForAdminAction } from '../../redux/reducer/user';
import { useAppDispatch, useAppSelector } from '../../redux';

// @ts-ignore
const columns: ColumnsType<User> = [
  {
    title: 'User Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'userRole',
    key: 'userRole',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a>Update</a>
        <a>Change to admin</a>
      </Space>
    ),
  },
];

export default function UserManagement() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.allUsers);

  useEffect(() => {
    dispatch(getAllUsersForAdminAction());
  }, []);
  return (
    <div className='m-12 max-h-full overflow-auto bg-white'>
      <Row className='p-2'></Row>
      <div className='p-2'>
        <Table columns={columns} dataSource={users} />
      </div>
    </div>
  );
}
