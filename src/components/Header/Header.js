import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const login = (event) => {
    event.preventDefault();
    loginWithRedirect({
      redirectUri: `${window.origin}/my-fave-games`,
    });
  };

  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to="/my-fave-games">My list</Link>
            </li>
          ) : (
            <li>
              <Link to="" onClick={(event) => login(event)}>
                My list
              </Link>
            </li>
          )}
          <li>{isAuthenticated ? <LogoutButton /> : null}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
