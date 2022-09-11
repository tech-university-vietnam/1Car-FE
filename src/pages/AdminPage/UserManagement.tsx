import { Row, Table, Space, Modal, Descriptions, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import User, { getAllUsersForAdminAction } from '../../redux/reducer/user';
import { useAppDispatch, useAppSelector } from '../../redux';
import UpdateUserModal from '../../components/UpdateUserModal';
import DescriptionsItem from 'antd/es/descriptions/Item';
import { changeUserToAdmin } from '../../apis';

const ViewUserContent = (props: any) => {
  const userData = props.user;

  return (
    <div>
      <h2 className='mb-6 text-center text-2xl'>User information</h2>
      <Descriptions layout='vertical' bordered>
        <DescriptionsItem label='Id'>{userData.id}</DescriptionsItem>
        <DescriptionsItem label='Name'>{userData.name}</DescriptionsItem>
        <DescriptionsItem label='Email'>{userData.email}</DescriptionsItem>
        <DescriptionsItem label='Phone Number'>
          {userData.phoneNumber}
        </DescriptionsItem>
        <DescriptionsItem label='DOB'>{userData.dateOfBirth}</DescriptionsItem>
        <DescriptionsItem label='Role'>{userData.userRole}</DescriptionsItem>
      </Descriptions>
    </div>
  );
};

const ChangeToAdminContent = (props: any) => {
  const onChangeToAdmin = async () => {
    try {
      if (props.record?.id) {
        await changeUserToAdmin(props?.record?.id);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <h2 className='mb-6 text-center text-2xl'>
        Confirm changing this user to admin
      </h2>
      <p>Are you sure you want to change this user to be an admin?</p>
      <div className='my-3 flex gap-x-5'>
        <Button type='primary' className='flex-1' onClick={onChangeToAdmin}>
          Yes
        </Button>
        <Button className='flex-1' onClick={props.onClose}>
          No
        </Button>
      </div>
    </div>
  );
};

export default function UserManagement() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.allUsers);

  const [currentUserData, setData] = useState(null);
  const [active, setActive] = useState(false);
  const [modalContent, setContent] = useState<JSX.Element>(<div></div>);

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
      render: (text, record) => (
        <a
          onClick={() => {
            setActive(true);
            setContent(<ViewUserContent user={record} />);
          }}
        >
          {text}
        </a>
      ),
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
          <a
            onClick={() => {
              setActive(true);
              setContent(
                <ChangeToAdminContent
                  record={record}
                  onClose={() => setActive(false)}
                />
              );
            }}
          >
            Change to admin
          </a>
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
      <Modal
        width='750px'
        visible={active}
        footer={null}
        onCancel={() => setActive(false)}
      >
        {modalContent}
      </Modal>
    </div>
  );
}
