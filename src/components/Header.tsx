import { Button, Drawer } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuFoldOutlined } from '@ant-design/icons';

export default function Header() {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <header className="flex w-full items-center py-2 px-8 shadow-sm">
      <img src={'car.png'} alt="Logo" className="h-16 w-16" />
      <ul className="ml-8 mb-0 hidden items-center p-0 md:flex">
        <li className="mr-4 w-24 text-xs md:text-base">
          <Link to="/" className="text-base text-black md:text-lg">
            Home
          </Link>
        </li>
        <li className="mr-4 w-24 text-xs md:text-base">
          <Link to="/about" className="text-base text-black md:text-lg">
            About
          </Link>
        </li>
        <li className="mr-4 w-24 text-xs md:text-base">
          <Link to="/more" className="text-base text-black md:text-lg">
            More
          </Link>
        </li>
      </ul>
      <div className="ml-auto hidden items-center md:flex">
        <Button className="mr-2">Sign In</Button>
        <Button type="primary" className="bg-red-500 p-2">
          Sign Up
        </Button>
      </div>
      <div className="ml-auto flex items-center md:hidden">
        <Button onClick={() => setShowDrawer(true)}>
          <MenuFoldOutlined />
        </Button>
      </div>
      <Drawer
        placement="right"
        onClose={() => setShowDrawer(false)}
        width="60%"
        visible={showDrawer}
      >
        <ul className="ml-0 w-full items-center p-0">
          <li className="mr-4 mb-4 w-full border-b pb-4 pl-2 text-xs md:text-base">
            <Link to="/" className="text-base text-black">
              Home
            </Link>
          </li>
          <li className="mr-4 mb-4 w-full border-b pb-4 pl-2 text-xs md:text-base">
            <Link to="/about" className="text-base text-black">
              About
            </Link>
          </li>
          <li className="mr-4 mb-4 w-full border-b pb-4 pl-2 text-xs md:text-base">
            <Link to="/more" className="text-base text-black">
              More
            </Link>
          </li>
        </ul>
      </Drawer>
    </header>
  );
}
