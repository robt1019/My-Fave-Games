import React, { useEffect, useState } from "react";
import faveGamesService from "../../services/fave-games.service";
import "./PlatformFaveGame.css";

const FaveGame = (props) => {
  const [game, setGame] = useState({});
  const [screenshot, setScreenshot] = useState("");

  const { gameId, reasons } = props.game;
  useEffect(() => {
    faveGamesService.gameById(gameId, (fetchedGame) => {
      setGame(fetchedGame);
      setScreenshot(fetchedGame.screenshot);
    });
  }, [gameId]);

  return (
    <div className="platform-fave-game">
      <h2 className="platform-fave-game__name">{game.name}</h2>
      <div>
        <img
          className="platform-fave-game__screenshot"
          src={screenshot}
          alt={`${game.name} screenshot`}
        ></img>
      </div>
      <div className="platform-fave-game__info">
        <h3>Why people love it:</h3>
        <ul>
          {reasons.map((r) => (
            <li className="platform-fave-game__reason" key={r}>
              "{r}"
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FaveGame;
