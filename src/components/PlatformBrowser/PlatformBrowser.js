import React, { useEffect, useState } from "react";
import PlatformCard from "../PlatformCard/PlatformCard";
import faveGamesService from "../../services/fave-games.service";
import { Link } from "react-router-dom";

function Home() {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    faveGamesService.platformsByIds("48,130,6,49,34, 39", (results) => {
      setPlatforms(results);
    });
  }, []);

  return (
    <div>
      <h1>Fave games by platform</h1>
      {platforms && platforms.length ? (
        platforms.map((p) => (
          <Link to={`platform-fave-games/${p.id}`}>
            <PlatformCard platform={p} key={p.id} />
          </Link>
        ))
      ) : (
        <React.Fragment />
      )}
    </div>
  );
}

export default Home;
