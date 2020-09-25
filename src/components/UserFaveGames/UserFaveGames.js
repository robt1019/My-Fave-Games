import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FaveGame from "../FaveGame/FaveGame";
import faveGamesService from "../../services/fave-games.service";
import Loading from "../Loading/Loading";

const UserFaveGames = () => {
  const { userId } = useParams();

  const [faveGames, setFaveGames] = useState([]);
  const [user, setUser] = useState({});
  const [userLoaded, setUserLoaded] = useState(false);
  const [gamesLoaded, setGamesLoaded] = useState(false);

  useEffect(() => {
    if (userId) {
      faveGamesService.userById(userId, (userInfo) => {
        setUser(userInfo);
        setUserLoaded(true);
      });
      faveGamesService.userFaveGames(userId, (games) => {
        setFaveGames(games);
        setGamesLoaded(true);
      });
    }
  }, [userId]);

  return (
    <div>
      {userLoaded && gamesLoaded ? (
        <div>
          <h1>{user.username} Fave Games</h1>
          {faveGames.map((g) => (
            <FaveGame key={g.id} faveGame={g} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default UserFaveGames;
