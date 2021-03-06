import React, { useEffect, useState } from "react";
import faveGamesService from "../../services/fave-games.service";
import "./FaveGame.css";
import Loading from "../Loading/Loading";

const FaveGame = (props) => {
  const [platform, setPlatform] = useState({});
  const [game, setGame] = useState({});
  const [screenshot, setScreenshot] = useState("");
  const [editingReasons, setEditingReasons] = useState(false);
  const [reasonsUpdate, setReasonsUpdate] = useState("");
  const [platformLoaded, setPlatformLoaded] = useState(false);
  const [gameLoaded, setGameLoaded] = useState(false);

  const { platformId, gameId, reasons } = props.faveGame;

  const { isEditable } = props;

  const handleReasonsChange = (event) => {
    setReasonsUpdate(event.target.value);
  };

  const edit = (event) => {
    event.preventDefault();
    props.onEdit(reasonsUpdate);
    setEditingReasons(false);
  };

  useEffect(() => {
    faveGamesService.platformById(platformId, (platform) => {
      setPlatform(platform);
      setPlatformLoaded(true);
    });

    faveGamesService.gameById(gameId, (fetchedGame) => {
      setGame(fetchedGame);
      setScreenshot(fetchedGame.screenshots[0].url);
      setGameLoaded(true);
    });
  }, [platformId, gameId]);

  return (
    <React.Fragment>
      {gameLoaded && platformLoaded ? (
        <div className="fave-game">
          <h2 className="fave-game__name">
            {game.name} ({platform.name})
          </h2>
          {isEditable ? (
            <React.Fragment>
              <button className="mfg-button" onClick={() => props.onDelete()}>
                delete
              </button>
              <button
                className="mfg-button"
                onClick={() => {
                  setEditingReasons(true);
                  setReasonsUpdate(reasons);
                }}
              >
                edit
              </button>
            </React.Fragment>
          ) : null}
          <div className="fave-game__screenshot">
            <img src={screenshot} alt={`${game.name} screenshot`}></img>
          </div>
          <div className="fave-game__info">
            <h3>Why is it good?</h3>
            {editingReasons ? (
              <form>
                <textarea
                  value={reasonsUpdate}
                  onChange={(event) => handleReasonsChange(event)}
                  className="fave-game__edit-reasons mfg-input"
                ></textarea>
                <button
                  className="mfg-button dark"
                  onClick={(event) => edit(event)}
                >
                  save
                </button>
              </form>
            ) : (
              <p className="fave-game__reasons">{reasons}</p>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
};

export default FaveGame;
