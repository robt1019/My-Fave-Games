import React from "react";
import { Link } from "react-router-dom";

const platformFaveGames = (props) => {
  return (
    <Link to={`platform-fave-games/${props.platform.id}`}>
      <h1>{props.platform.name} fave games</h1>
    </Link>
  );
};

export default platformFaveGames;
