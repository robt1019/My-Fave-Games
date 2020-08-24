import React from "react";
import FaveGame from "../FaveGame/FaveGame";
import { getUser } from "../services/fave-games.service";

const faveGames = (props) => {
  const username = props.username;

  let user;

  getUser(username, (fetchedUser) => {
    user = fetchedUser;
  });

  return (
    <div>
      <h1>My Fave Games</h1>
      <button>Add new game</button>
      {user.top5.map((faveGame) => (
        <FaveGame
          username={username}
          gameId={faveGame.gameId}
          platformId={faveGame.platformId}
        ></FaveGame>
      ))}
    </div>
  );
};

export default faveGames;
