import faveGamesService from "../../services/fave-games.service";
import React, { useState } from "react";
import "./FaveGamePicker.css";

const FaveGamePicker = (props) => {
  const [platformId, setPlatformId] = useState(undefined);
  const [gameId, setGameId] = useState(undefined);
  const [gameSearchTerm, setGameSearchTerm] = useState("");
  const [gameResults, setGameResults] = useState([]);
  const [gamePlatforms, setGamePlatforms] = useState([]);
  const [reasons, setReasons] = useState("");

  const searchForGame = (event) => {
    event.preventDefault();
    faveGamesService.searchGames(gameSearchTerm, (results) => {
      setGameResults(results);
      setGameId(results[0] && results[0].id);
      const platformIds = (results[0] && results[0].platforms) || [];
      faveGamesService.platformsByIds(platformIds, (platforms) => {
        setGamePlatforms(platforms);
        setPlatformId(platforms[0] && platforms[0].id);
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
      <form onSubmit={(event) => searchForGame(event)}>
        <input
          name="gameName"
          type="text"
          placeholder="game name"
          value={gameSearchTerm}
          onChange={(event) => handleGameSearchTermChange(event)}
        ></input>
        <input type="submit" value="search"></input>
      </form>
      {gameId ? (
        <form onSubmit={(event) => addFaveGame(event)} name="gameForm">
          <select onChange={(event) => handleGameChange(event)}>
            {gameResults.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          <select onChange={(event) => handlePlatformChange(event)}>
            {gamePlatforms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <textarea
            className="fave-game-picker__reasons"
            placeholder="what is good about it?"
            onChange={(event) => handleReasonsChange(event)}
          />
          <input type="submit" value="add"></input>
        </form>
      ) : null}
    </React.Fragment>
  );
};

export default FaveGamePicker;
