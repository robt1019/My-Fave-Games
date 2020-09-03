import React, { useEffect, useState } from "react";
import faveGamesService from "../../services/fave-games.service";
import "./FaveGame.css";

const FaveGame = (props) => {
  const [platform, setPlatform] = useState({});
  const [game, setGame] = useState({});
  const [screenshot, setScreenshot] = useState("");
  const [editingReasons, setEditingReasons] = useState(false);
  const [reasonsUpdate, setReasonsUpdate] = useState("");

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

  const handleReasonsChange = (event) => {
    setReasonsUpdate(event.target.value);
  };

  const edit = () => {
    props.onEdit(reasonsUpdate);
    setEditingReasons(false);
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
        <React.Fragment>
          <button onClick={() => props.onDelete()}>delete</button>
          <button
            onClick={() => {
              setEditingReasons(true);
              setReasonsUpdate(reasons);
            }}
          >
            edit
          </button>
        </React.Fragment>
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
        {editingReasons ? (
          <form onSubmit={() => edit()}>
            <textarea
              value={reasonsUpdate}
              onChange={(event) => handleReasonsChange(event)}
              className="fave-game__edit-reasons"
            ></textarea>
            <input type="submit" value="save"></input>
          </form>
        ) : (
          <p className="fave-game__reasons">{reasons}</p>
        )}
      </div>
    </div>
  );
};

export default FaveGame;
