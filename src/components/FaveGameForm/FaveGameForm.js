import React, { useState } from "react";
import faveGamesService from "../../services/fave-games.service";

const FaveGame = (props) => {
  const [platformId, setPlatformId] = useState({});
  const [gameId, setGameId] = useState({});
  const [gameSearchTerm, setGameSearchTerm] = useState("");
  const [gameResults, setGameResults] = useState([]);
  const [gamePlatforms, setGamePlatforms] = useState([]);

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

  const addFaveGame = (event) => {
    event.preventDefault();
    props.gameAdded({ platformId, gameId });
    props.formClosed();
  };

  return (
    <div>
      <button
        onClick={() => {
          props.formClosed();
        }}
      >
        x
      </button>
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
      <form onSubmit={(event) => addFaveGame(event)}>
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
        <input type="submit" value="add"></input>
      </form>
    </div>
  );
};

export default FaveGame;
