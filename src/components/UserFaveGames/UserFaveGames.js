import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FaveGame from "../FaveGame/FaveGame";
import faveGamesService from "../../services/fave-games.service";

const UserFaveGames = () => {
  const { userId } = useParams();

  const [faveGames, setFaveGames] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (userId) {
      faveGamesService.userById(userId, (userInfo) => {
        setUser(userInfo);
      });
      faveGamesService.userFaveGames(userId, (games) => {
        setFaveGames(games);
      });
    }
  }, [userId]);

  return (
    <div>
      <h1>{user.username} Fave Games</h1>
      {faveGames.map((g) => (
        <FaveGame key={g.id} faveGame={g} />
      ))}
    </div>
  );
};

export default UserFaveGames;
