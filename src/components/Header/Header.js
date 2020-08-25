import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/my-fave-games">My fave games</Link>
          </li>
          <li>
            <Link to="/user-search">Find a user</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
