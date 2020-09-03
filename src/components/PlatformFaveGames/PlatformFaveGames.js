import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import faveGamesService from "../../services/fave-games.service";
import PlatformFaveGame from "../PlatformFaveGame/PlatformFaveGame";

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
        <React.Fragment key={g.gameId}>
          <PlatformFaveGame game={g} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default PlatformFaveGames;
