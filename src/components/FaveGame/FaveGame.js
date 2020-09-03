import React, { useEffect, useState } from "react";
import faveGamesService from "../../services/fave-games.service";
import "./FaveGame.css";

const FaveGame = (props) => {
  const [platform, setPlatform] = useState({});
  const [game, setGame] = useState({});
  const [screenshot, setScreenshot] = useState("");

  const { platformId, gameId, reasons } = props.faveGame;

  const { isEditable } = props;

  const randomScreenshot = (screenshots) => {
    if (!(screenshots && screenshots.length)) {
      return;
    }
    const screenshot =
      screenshots[Math.floor(Math.random() * screenshots.length)];
    return screenshot && screenshot.url;
  };

  useEffect(() => {
    faveGamesService.platformsByIds(platformId, (platforms) => {
      setPlatform(platforms[0]);
    });

    faveGamesService.gameById(gameId, (fetchedGame) => {
      setGame(fetchedGame);
      setScreenshot(randomScreenshot(fetchedGame.screenshots));
    });
  }, [platformId, gameId]);

  return (
    <div className="fave-game">
      <h2 className="fave-game__name">
        {game.name} ({platform.name})
      </h2>
      {isEditable ? (
        <button onClick={() => props.onDelete()}>delete</button>
      ) : null}
      <div>
        <img
          src={screenshot}
          alt={`${game.name} screenshot`}
          className="fave-game__screenshot"
        ></img>
      </div>
      <div className="fave-game__info">
        <h3>Why is it good?</h3>
        <p className="fave-game__reasons">{reasons}</p>
      </div>
    </div>
  );
};

export default FaveGame;
