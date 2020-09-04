import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../shared-styles/Buttons.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect()} className="mfg-button">
      Log In
    </button>
  );
};

export default LoginButton;
