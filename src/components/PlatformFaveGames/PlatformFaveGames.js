import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import faveGamesService from "../../services/fave-games.service";
import FaveGame from "../FaveGame/FaveGame";

const PlatformFaveGames = () => {
  const [faveGames, setFaveGames] = useState([]);
  const [platform, setPlatform] = useState([]);

  const { platformId } = useParams();

  useEffect(() => {
    faveGamesService.platformsByIds([platformId], (results) => {
      setPlatform(results && results[0]);
    });
    faveGamesService.faveGamesByPlatform(platformId, (results) => {
      setFaveGames(results);
    });
  }, [platformId]);

  return (
    <React.Fragment>
      <h1>{platform.name} fave games</h1>
      {faveGames.map((g) => (
        <React.Fragment>
          <p>count: {g.count}</p>
          <FaveGame
            key={g.gameId}
            faveGame={{ platformId, gameId: g.gameId }}
          />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default PlatformFaveGames;
