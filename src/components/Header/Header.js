import React from "react";
import { Link } from "react-router-dom";

const header = () => {
  return (
    <div>
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

export default header;
