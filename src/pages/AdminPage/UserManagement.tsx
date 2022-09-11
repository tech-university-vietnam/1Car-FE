import { Row, Table, Space, Modal } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import User, { getAllUsersForAdminAction } from '../../redux/reducer/user';
import { useAppDispatch, useAppSelector } from '../../redux';
import UpdateUserModal from '../../components/UpdateUserModal';

export default function UserManagement() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.allUsers);
  const [currentUserData, setData] = useState(null);
  const modalRef: React.RefObject<any> = React.createRef();

  const openModal = (record: any) => {
    setData(record);
    modalRef?.current.open();
  };

  // @ts-ignore
  const columns: ColumnsType<User> = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a>{text}</a>,
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
          <a onClick={() => openModal(record)}>Update</a>
          <a>Change to admin</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllUsersForAdminAction());
  }, []);
  return (
    <div className='m-12 max-h-full overflow-auto bg-white'>
      <Row className='p-2'></Row>
      <div className='p-2'>
        <Table columns={columns} dataSource={users} />
      </div>
      <UpdateUserModal
        ref={modalRef}
        isEdit={true}
        isAdmin={true}
        user={currentUserData}
      />
    </div>
  );
}
