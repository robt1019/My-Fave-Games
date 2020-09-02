import React, { useEffect, useState } from "react";
import faveGamesService from "../../services/fave-games.service";
import "./FaveGame.css";

const FaveGame = (props) => {
  const [platform, setPlatform] = useState({});
  const [game, setGame] = useState({});

  const { platformId, gameId, reasons } = props.faveGame;

  const { isEditable } = props;

  useEffect(() => {
    faveGamesService.platformsByIds(platformId, (platforms) => {
      setPlatform(platforms[0]);
    });

    faveGamesService.gameById(gameId, (fetchedGame) => {
      setGame(fetchedGame);
    });
  }, [platformId, gameId]);

  return (
    <div className="fave-game">
      <img
        className="fave-game__logo"
        src={`https:${platform.logo && platform.logo.url}`}
        alt={`${platform.name} logo`}
      ></img>
      <h3>{game.name}</h3>
      <p>{reasons}</p>
      {isEditable ? (
        <button onClick={() => props.onDelete()}>delete</button>
      ) : null}
    </div>
  );
};

export default FaveGame;
