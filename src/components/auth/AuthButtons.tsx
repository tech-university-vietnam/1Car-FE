import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AntButton from '../AntButton';
import Cookies from 'universal-cookie';
import authApi from '../../api/axiosConfig';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <AntButton
      onClickFunction={() =>
        loginWithRedirect({ prompt: 'consent', scope: 'read:current_user' })
      }
      label="Sign in"
    />
  );
};

export const LogoutButton = () => {
  const { logout } = useAuth0();
  const logOutFunction = () => {
    logout({ returnTo: window.location.origin });
    document.cookie =
      'cookiename=access_token; expires = Thu, 01 Jan 1970 00:00:00 GMT';
  };
  return <AntButton onClickFunction={() => logOutFunction()} label="Logout" />;
};

export const UserProfileButton = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userMetaData, setUserMetaData] = useState(null);

  useEffect(() => {
    const getUserMetaData = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;
      const cookies = new Cookies();
      try {
        const accessToken = cookies.get('access_token');
        if (accessToken) {
          const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
          const metadataResponse = await fetch(userDetailsByIdUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const { user_metadata } = await metadataResponse.json();
          setUserMetaData(user_metadata);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getUserMetaData();
  }, [user?.sub]);

  useEffect(() => {
    // Check if there is user info in storage
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      const getUserInfo = async () => {
        try {
          const userData = await authApi.get('/user/me');
          localStorage.setItem('userInfo', userData.data);
        } catch (error: any) {
          console.log(error.message);
        }
      };
      getUserInfo();
    }
  }, []);

  return <div>{isAuthenticated ? <p>Hi, {user?.name}</p> : <></>}</div>;
};
