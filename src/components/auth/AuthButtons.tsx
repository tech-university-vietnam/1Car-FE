import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import AntButton from "../AntButton";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <AntButton onClickFunction={loginWithRedirect} label="login"/>
}

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return <AntButton onClickFunction={() => logout({returnTo: window.location.origin})}
                    label="Logout"
  />
}

