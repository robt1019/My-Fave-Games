import faveGamesService from "../../services/fave-games.service";
import React, { useState } from "react";
import "./FaveGamePicker.css";
import Loading from "../Loading/Loading";

const FaveGamePicker = (props) => {
  const [platformId, setPlatformId] = useState(undefined);
  const [gameId, setGameId] = useState(undefined);
  const [gameSearchTerm, setGameSearchTerm] = useState("");
  const [gameResults, setGameResults] = useState([]);
  const [gamePlatforms, setGamePlatforms] = useState([]);
  const [reasons, setReasons] = useState("");
  const [loading, setLoading] = useState(false);

  const searchForGame = (event) => {
    event.preventDefault();
    setLoading(true);
    faveGamesService.searchGames(gameSearchTerm, (results) => {
      setGameResults(results);
      setGameId(results[0] && results[0].id);
      const platformIds = (results[0] && results[0].platforms) || [];
      faveGamesService.platformsByIds(platformIds, (platforms) => {
        setGamePlatforms(platforms);
        setPlatformId(platforms[0] && platforms[0].id);
        setLoading(false);
      });
    });
  };

  const handleGameSearchTermChange = (event) => {
    setGameSearchTerm(event.target.value);
  };

  const handleGameChange = (event) => {
    const gameId = event.target.value;
    setGameId(gameId);
    const platformIds = gameResults.find((result) => `${result.id}` === gameId)
      .platforms;
    if (platformIds && platformIds.length) {
      setPlatformId(platformIds[0]);
    }
    faveGamesService.platformsByIds(platformIds, (platforms) => {
      setGamePlatforms(platforms);
    });
  };

  const handlePlatformChange = (event) => {
    const platformId = event.target.value;
    setPlatformId(platformId);
  };

  const handleReasonsChange = (event) => {
    const reasons = event.target.value;
    setReasons(reasons);
  };

  const addFaveGame = (event) => {
    event.preventDefault();
    props.gamePicked({ platformId, gameId, reasons });
  };

  return (
    <React.Fragment>
      {!loading ? (
        <div className="fave-game-picker">
          <form>
            <input
              className="mfg-input fave-game-picker__game-name"
              name="gameName"
              type="text"
              placeholder="game name"
              value={gameSearchTerm}
              onChange={(event) => handleGameSearchTermChange(event)}
            ></input>
            <button
              className="mfg-button dark"
              value="search"
              onClick={(event) => searchForGame(event)}
            >
              search
            </button>
          </form>
          {gameId ? (
            <form>
              <select
                className="mfg-select"
                onChange={(event) => handleGameChange(event)}
              >
                {gameResults.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
              <select
                className="mfg-select"
                onChange={(event) => handlePlatformChange(event)}
              >
                {gamePlatforms.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <textarea
                className="mfg-input fave-game-picker__reasons"
                placeholder="what is good about it?"
                onChange={(event) => handleReasonsChange(event)}
              />
              <button
                className="mfg-button dark"
                onClick={(event) => addFaveGame(event)}
              >
                add
              </button>
            </form>
          ) : null}
        </div>
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
};

export default FaveGamePicker;
