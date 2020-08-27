import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FaveGame from "../FaveGame/FaveGame";
import faveGamesService from "../../services/fave-games.service";

const UserFaveGames = () => {
  const { userId } = useParams();

  const [faveGames, setFaveGames] = useState([]);

  useEffect(() => {
    if (userId) {
      faveGamesService.userFaveGames(userId, (games) => {
        setFaveGames(games);
      });
    }
  }, [userId]);

  return (
    <div>
      <h1>User fave games</h1>
      {faveGames.map((g) => (
        <FaveGame faveGame={g} />
      ))}
    </div>
  );
};

export default UserFaveGames;
