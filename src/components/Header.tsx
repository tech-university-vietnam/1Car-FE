import { Button, Collapse, Drawer } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuFoldOutlined, RightOutlined } from '@ant-design/icons';
import {
  LoginButton,
  LogoutButton,
  UserProfileButton,
} from './auth/AuthButtons';
import { useAuth0 } from '@auth0/auth0-react';
import Cookies from 'universal-cookie';

export default function Header() {
  const [showDrawer, setShowDrawer] = useState(false);
  const { isAuthenticated } = useAuth0();

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
      <Link to={props.path} className='text-base text-black'>
        <RightOutlined className='pr-2 text-xs' />
        <span className='mr-2'>{props.text}</span>
      </Link>
    </li>
  );

  const CollapseMenuItem = () => {
    const { Panel } = Collapse;
    const { logout, loginWithRedirect } = useAuth0();
    const logOutFunction = () => {
      logout({ returnTo: window.location.origin });
      const cookies = new Cookies();
      cookies.remove('access_token', { path: '/' });
      localStorage.removeItem('userEmail');
    };
    return (
      <li className='w-full border-b pb-3'>
        <Collapse ghost>
          <Panel
            header={<div className='text-base text-black'>User</div>}
            key='1'
            showArrow={false}
            className='w-full'
          >
            <div>
              {isAuthenticated ? (
                <ul>
                  <SubSmallMenuItem path='user' text='My profile' />
                  <SubSmallMenuItem
                    path='#'
                    text='Logout'
                    onClickFunction={logOutFunction}
                  />
                </ul>
              ) : (
                <div
                  className='text-base text-black'
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </div>
              )}
            </div>
          </Panel>
        </Collapse>
      </li>
    );
  };

  return (
    <header className='flex w-full items-center py-2 px-8 shadow-sm'>
      <Link to='/'>
        <img src={'/car.png'} alt='Logo' className='h-16 w-16' />
      </Link>
      <ul className='ml-8 mb-0 hidden items-center p-0 md:flex'>
        <WideMenuItem path='/' text='Home' />
        <WideMenuItem path='/about' text='About' />
        <WideMenuItem path='/more' text='More' />
      </ul>
      <div className='ml-auto hidden items-center md:flex'>
        {isAuthenticated ? (
          <div>
            <UserProfileButton />
            <LogoutButton />
          </div>
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
