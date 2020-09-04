import React from "react";
import FaveGamePicker from "../FaveGamePicker/FaveGamePicker";
import "../../shared-styles/Buttons.css";

const FaveGame = (props) => {
  const onGamePicked = (game) => {
    props.gameAdded(game);
    props.formClosed();
  };

  return (
    <div>
      <button
        className="mfg-button"
        onClick={() => {
          props.formClosed();
        }}
      >
        back
      </button>
      <FaveGamePicker
        gamePicked={(game) => {
          onGamePicked(game);
        }}
      ></FaveGamePicker>
    </div>
  );
};

export default FaveGame;
