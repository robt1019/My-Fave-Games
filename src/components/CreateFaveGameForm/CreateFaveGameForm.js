import React from "react";
import FaveGamePicker from "../FaveGamePicker/FaveGamePicker";

const CreateFaveGameForm = (props) => {
  const onGamePicked = (game) => {
    props.gameAdded(game);
    props.formClosed();
  };

  return (
    <div>
      <button
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

export default CreateFaveGameForm;
