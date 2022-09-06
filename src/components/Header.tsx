import { Button, Collapse, Divider, Drawer } from 'antd';
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
    <li className="mr-4 w-24 text-xs md:text-base">
      <Link to={path} className="text-base text-black md:text-lg">
        {text}
      </Link>
    </li>
  );

  const SmallMenuItem = ({ text, path }: { text: string; path: string }) => (
    <li className="mr-4 mb-4 w-full border-b pb-4 pl-2 text-xs md:text-base">
      <Link to={path} className="text-base text-black">
        {text}
      </Link>
    </li>
  );

  const CollapseMenuItem = () => {
    const { Panel } = Collapse;
    const { logout, loginWithRedirect } = useAuth0();
    const logOutFunction = () => {
      logout({ returnTo: window.location.origin });
      document.cookie =
        'cookiename=access_token; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    };
    return (
      <li className="mr-4 mb-4 w-full border-b pb-4 pl-2 text-xs md:text-base">
        <Collapse ghost>
          <Panel header="User" key="1">
            <Link to="/user" className="text-base text-black"></Link>
            <div>
              {isAuthenticated ? (
                <ul>
                  <li className="text-base text-black">My Profile</li>
                  <Divider />
                  <li
                    className="text-base text-black"
                    onClick={() => logOutFunction()}
                  >
                    Logout
                  </li>
                </ul>
              ) : (
                <div
                  className="text-base text-black"
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
    <header className="flex w-full items-center py-2 px-8 shadow-sm">
      <img src={'car.png'} alt="Logo" className="h-16 w-16" />
      <ul className="ml-8 mb-0 hidden items-center p-0 md:flex">
        <WideMenuItem path="/" text="Home" />
        <WideMenuItem path="/about" text="About" />
        <WideMenuItem path="/more" text="More" />
      </ul>
      <div className="ml-auto hidden items-center md:flex">
        {isAuthenticated ? (
          <div>
            <UserProfileButton />
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
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
          <SmallMenuItem path="/" text="Home" />
          <SmallMenuItem path="/about" text="About" />
          <SmallMenuItem path="/more" text="More" />
          <CollapseMenuItem />
        </ul>
      </Drawer>
    </header>
  );
}
