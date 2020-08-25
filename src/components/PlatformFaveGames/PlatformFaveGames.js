import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import faveGamesService from "../../services/fave-games.service";

const PlatformFaveGames = () => {
  const [platform, setPlatform] = useState({});

  const { platformId } = useParams();

  useEffect(() => {
    faveGamesService.platformsByIds(platformId, (platforms) => {
      setPlatform(platforms[0]);
    });
  }, [platformId]);

  return (
    <div>
      <h1>{platform.name} fave games</h1>
    </div>
  );
};

export default PlatformFaveGames;
