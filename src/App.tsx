import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouters from './Routes';
import ErrorBoundary from './components/ErrorBoundary';
import Cookies from "universal-cookie";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  
  useEffect(() => {
    const getAccessToken = async () => { 
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          });
          const cookies = new Cookies();
          cookies.set('access_token', accessToken, { path: "/" });
        }
        
      } catch (e: any) {
        console.log(e.message)
      }
    }
    getAccessToken();
  }, [getAccessTokenSilently]);

  useEffect(() => console.log(isAuthenticated), [isAuthenticated]);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRouters />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
