import React, { useEffect, useState } from "react";
import faveGamesService from "../../services/fave-games.service";

const FaveGame = (props) => {
  const [platform, setPlatform] = useState({});
  const [game, setGame] = useState({});

  const { platformId, gameId, reasons } = props.faveGame;

  useEffect(() => {
    faveGamesService.platformsByIds(platformId, (platforms) => {
      setPlatform(platforms[0]);
    });

    faveGamesService.gameById(gameId, (fetchedGame) => {
      setGame(fetchedGame);
    });
  }, [platformId, gameId]);

  return (
    <div>
      <h3>{game.name}</h3>
      <h3>{platform.name}</h3>
      <p>{reasons}</p>
    </div>
  );
};

export default FaveGame;
