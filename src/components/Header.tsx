import { Button, Collapse, Drawer, Spin } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuFoldOutlined, RightOutlined } from '@ant-design/icons';
import { AuthInfoComponent, LoginButton } from './auth/AuthButtons';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from '../redux';
import { commonLogoutFunction } from '../utils/utils';
import { UserRole } from '../redux/reducer/user';

export default function Header() {
  const [showDrawer, setShowDrawer] = useState(false);
  const { isAuthenticated, isLoading } = useAuth0();

  const WideMenuItem = ({ text, path }: { text: string; path: string }) => (
    <li className='mr-4 w-24 text-xs md:text-base'>
      <Link to={path} className='text-base text-black md:text-lg'>
        {text}
      </Link>
    </li>
  );

  const SmallMenuItem = ({ text, path }: { text: string; path: string }) => (
    <li className='mr-4 mb-4 w-full border-b pb-4 pl-2 text-xs md:text-base'>
      <Link to={path} className='text-base text-black'>
        {text}
      </Link>
    </li>
  );

  const SubSmallMenuItem = (props: any) => (
    <li
      onClick={() => props.onClickFunction}
      className='mr-4 mb-4 w-full border-b pb-4 pl-2 text-xs md:text-base'
    >
      {props.path !== '#' ? (
        <Link to={props.path} className='text-base text-black'>
          <RightOutlined className='pr-2 text-xs' />
          <span className='mr-2'>{props.text}</span>
        </Link>
      ) : (
        <div className='text-base text-black'>
          <RightOutlined className='pr-2 text-xs' />
          <span className='mr-2'>{props.text}</span>
        </div>
      )}
    </li>
  );

  const CollapseMenuItem = () => {
    const user = useAppSelector((state) => state.user.info);
    const { Panel } = Collapse;
    const { logout, loginWithRedirect } = useAuth0();
    const logOutFunction = () => {
      logout({ returnTo: window.location.origin });
      commonLogoutFunction();
    };
    return isAuthenticated ? (
      <li className='w-full border-b pb-3'>
        <Collapse ghost>
          <Panel
            header={<div className='text-base text-black'>User</div>}
            key='1'
            showArrow={false}
            className='w-full'
          >
            <div>
              <ul>
                <SubSmallMenuItem path='user' text='My profile' />
                {user?.userRole === UserRole.ADMIN && (
                  <SubSmallMenuItem path='admin' text='Admin dashboard' />
                )}
                <SubSmallMenuItem
                  path='#'
                  text='Logout'
                  onClickFunction={logOutFunction}
                />
              </ul>
            </div>
          </Panel>
        </Collapse>
      </li>
    ) : (
      <li className='mr-4 mb-4 w-full border-b pb-4 pl-2 text-xs md:text-base'>
        <a
          href='#'
          className='text-base text-black'
          onClick={() => loginWithRedirect()}
        >
          Login
        </a>
      </li>
    );
  };

  return (
    <header className='flex w-full items-center py-2 px-8 shadow-sm'>
      <Link to='/'>
        <img src={'/car_2.png'} alt='Logo' className='h-12 w-28' />
      </Link>
      <ul className='ml-8 mb-0 hidden items-center p-0 md:flex'>
        <WideMenuItem path='/' text='Home' />
        <WideMenuItem path='/about' text='About' />
        <WideMenuItem path='/more' text='More' />
      </ul>
      <div className='ml-auto hidden items-center md:flex'>
        {isLoading ? (
          <Spin />
        ) : isAuthenticated ? (
          <AuthInfoComponent />
        ) : (
          <LoginButton />
        )}
      </div>
      <div className='ml-auto flex items-center md:hidden'>
        <Button onClick={() => setShowDrawer(true)}>
          <MenuFoldOutlined />
        </Button>
      </div>
      <Drawer
        placement='right'
        onClose={() => setShowDrawer(false)}
        width='60%'
        visible={showDrawer}
      >
        <ul className='ml-0 w-full items-center p-0'>
          <SmallMenuItem path='/' text='Home' />
          <SmallMenuItem path='/about' text='About' />
          <SmallMenuItem path='/more' text='More' />
          <CollapseMenuItem />
        </ul>
      </Drawer>
    </header>
  );
}
