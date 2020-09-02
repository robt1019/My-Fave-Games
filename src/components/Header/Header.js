import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to="/my-fave-games">My fave games</Link>
            </li>
          ) : null}
          <li>
            <Link to="/user-search">Find a user</Link>
          </li>
          <li>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
