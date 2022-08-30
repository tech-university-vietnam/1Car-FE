import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AntButton from '../AntButton';
import Cookies from 'universal-cookie';

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

  return (
    <AntButton
      onClickFunction={() => logout({ returnTo: window.location.origin })}
      label='Logout'
    />
  );
};

export const UserProfileButton = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userMetaData, setUserMetaData] = useState(null);

  const cookies = new Cookies();
  useEffect(() => {
    const getUserMetaData = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;

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
    <div>
      <p>Hi, {user?.name}</p>
    </div>
  );
};
