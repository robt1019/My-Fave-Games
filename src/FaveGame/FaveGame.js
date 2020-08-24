import React from "react";
import {
  getGame,
  getPlatforms,
  whyDoILike,
} from "../services/fave-games.service";

const faveGame = (props) => {
  let game;
  let platforms;
  let whyILikeIt;
  let platform;

  whyDoILike(
    {
      gameId: props.gameId,
      username: props.username,
      platformId: props.platformId,
    },
    (reasonILikeIt) => {
      whyILikeIt = reasonILikeIt;
    }
  );

  getPlatforms((fetchedPlatforms) => {
    platforms = fetchedPlatforms;
    platform = platforms[props.platformId];
  });

  getGame(props.gameId, (fetchedGame) => {
    game = fetchedGame;
  });

  return (
    <div>
      <h1>{game.name}</h1>
      <h3>{platform.name}</h3>
      <p>{whyILikeIt}</p>
      <button>delete</button>
    </div>
  );
};

export default faveGame;
