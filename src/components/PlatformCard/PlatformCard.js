import React from "react";
import "./PlatformCard.css";

const platformFaveGames = (props) => {
  return (
    <div className="platform-card">
      <h1>{props.platform.name} fave games</h1>
    </div>
  );
};

export default platformFaveGames;
