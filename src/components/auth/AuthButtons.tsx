import React, { ReactElement } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AntButton from '../AntButton';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Space } from 'antd';
import { useAppSelector } from '../../redux';
import { UserRole } from '../../redux/reducer/user';
import { logoutWithAuth0 } from '../../utils/utils';
import {
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <AntButton onClickFunction={() => loginWithRedirect()} label='Sign in' />
  );
};

export const AuthInfoComponentSubMenu = () => {
  const { logout } = useAuth0();
  const logOutFunction = () => logoutWithAuth0(logout);

  const userData = useAppSelector((state) => state.user.info);
  const subMenuItems: Array<{
    label: string | ReactElement;
    key: string;
    icon?: ReactElement;
  }> = [
    {
      label: (
        <Link to='/user' className='text-gray text-sm md:text-base'>
          Profile
        </Link>
      ),
      key: 'user',
      icon: <UserOutlined />,
    },
    {
      label: (
        <span
          onClick={logOutFunction}
          className='text-gray text-sm md:text-base'
        >
          Logout
        </span>
      ),
      key: 'logout',
      icon: <LogoutOutlined />,
    },
  ];

  const getSubMenuItems = (): Array<{
    label: string | ReactElement;
    key: string;
    icon?: ReactElement;
  }> => {
    if (userData.userRole === UserRole.ADMIN) {
      return [
        ...subMenuItems,
        {
          label: (
            <Link to='/admin' className='text-gray text-sm md:text-base'>
              Admin dashboard
            </Link>
          ),
          key: 'admin',
          icon: <DashboardOutlined />,
        },
      ];
    }
    return subMenuItems;
  };

  return <Menu items={getSubMenuItems()} />;
};

export const AuthInfoComponent = () => {
  const { user } = useAuth0();

  const overlayStyle: React.CSSProperties = {
    paddingTop: '.5rem',
  };
  return (
    <div>
      <Dropdown
        overlay={<AuthInfoComponentSubMenu />}
        overlayStyle={overlayStyle}
      >
        <a
          className='text-base text-black md:text-lg'
          onClick={(e) => e.preventDefault()}
          href='#'
        >
          <Space>Hi, {user?.name}</Space>
        </a>
      </Dropdown>
    </div>
  );
};
