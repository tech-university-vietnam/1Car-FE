import { Button, Drawer } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuFoldOutlined } from '@ant-design/icons';
import {
  LoginButton,
  LogoutButton,
  UserProfileButton,
} from './auth/AuthButtons';
import { useAuth0 } from '@auth0/auth0-react';

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

  return (
    <header className='flex w-full items-center py-2 px-8 shadow-sm'>
      <img src={'car.png'} alt='Logo' className='h-16 w-16' />
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
        </ul>
      </Drawer>
    </header>
  );
}
