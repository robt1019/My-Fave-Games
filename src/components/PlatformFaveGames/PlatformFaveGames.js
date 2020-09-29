import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import faveGamesService from "../../services/fave-games.service";
import Loading from "../Loading/Loading";
import PlatformFaveGame from "../PlatformFaveGame/PlatformFaveGame";

const PlatformFaveGames = () => {
  const [faveGames, setFaveGames] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [platformLoaded, setPlatformLoaded] = useState(false);
  const [gamesLoaded, setGamesLoaded] = useState(false);

  const { platformId } = useParams();

  useEffect(() => {
    faveGamesService.platformById(platformId, (platform) => {
      setPlatform(platform);
      setPlatformLoaded(true);
    });
    faveGamesService.faveGamesByPlatform(platformId, (results) => {
      setFaveGames(results);
      setGamesLoaded(true);
    });
  }, [platformId]);

  return (
    <React.Fragment>
      {platformLoaded && gamesLoaded ? (
        <div>
          <h1>Top 5 {platform.name} Games</h1>
          {faveGames.map((g) => (
            <React.Fragment key={g.gameId}>
              <PlatformFaveGame game={g} />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
};

export default PlatformFaveGames;
