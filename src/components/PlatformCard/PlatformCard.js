import React from "react";

const platformFaveGames = (props) => {
  return (
    <React.Fragment>
      <h1>{props.platform.name} fave games</h1>
      <img
        src={`https:${props.platform.logo.url}`}
        alt={`${props.platform.name} logo`}
      ></img>
    </React.Fragment>
  );
};

export default platformFaveGames;
