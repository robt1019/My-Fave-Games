import React, { useEffect, useState } from "react";
import PlatformCard from "../PlatformCard/PlatformCard";
import faveGamesService from "../../services/fave-games.service";
import { Link } from "react-router-dom";

function Home() {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    faveGamesService.platformsByIds("48,130,6,49", (results) => {
      setPlatforms(results);
    });
  }, []);

  return (
    <div>
      <h1>Fave games by platform</h1>
      {platforms && platforms.length ? (
        platforms.map((p) => (
          <Link key={p.id} to={`platform-fave-games/${p.id}`}>
            <PlatformCard platform={p} />
          </Link>
        ))
      ) : (
        <React.Fragment />
      )}
    </div>
  );
}

export default Home;
