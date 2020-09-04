import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../shared-styles/Buttons.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      className="mfg-button"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
