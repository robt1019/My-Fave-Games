import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../shared-styles/Buttons.css";
import faveGamesService from "../../services/fave-games.service";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => {
        logout({ returnTo: window.location.origin });
        faveGamesService.clearCachedUser();
      }}
      className="mfg-button"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
