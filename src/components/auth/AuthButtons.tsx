import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AntButton from '../AntButton';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <AntButton
      onClickFunction={() =>
        loginWithRedirect({ prompt: 'consent', scope: 'read:current_user' })
      }
      label='Sign in'
    />
  );
};

export const LogoutButton = () => {
  const { logout } = useAuth0();
  const logOutFunction = () => {
    logout({ returnTo: window.location.origin });
    const cookies = new Cookies();
    cookies.remove('access_token', { path: '/' });
    localStorage.removeItem('userEmail');
  };
  return <AntButton onClickFunction={() => logOutFunction()} label='Logout' />;
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

  return (
    <Link to='/user' className='text-black'>
      {isAuthenticated ? <p>Hi, {user?.name}</p> : <></>}
    </Link>
  );
};
