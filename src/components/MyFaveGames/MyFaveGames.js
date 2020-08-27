import React, { useState, useEffect } from "react";
import FaveGame from "../FaveGame/FaveGame";
import { useAuth0 } from "@auth0/auth0-react";
import faveGamesService from "../../services/fave-games.service";

const FaveGames = () => {
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState();
  const [faveGames, setFaveGames] = useState([]);

  useEffect(() => {
    async function getUserStuff() {
      try {
        const userInfo = await getIdTokenClaims();
        setUserInfo(userInfo);
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
        faveGamesService.userFaveGames(userInfo.sub, (games) => {
          setFaveGames(games);
        });
      } catch (err) {
        alert("you are not logged in. Maybe do that?");
      }
    }
    getUserStuff();
  }, [getAccessTokenSilently, getIdTokenClaims]);

  const addNewGame = () => {
    // faveGamesService.createFaveGame(token, {
    //   gameId: 7346,
    //   platformId: 130,
    // });
    faveGamesService.createFaveGame(token, {
      gameId: 26758,
      platformId: 130,
    });
  };

  return (
    <div>
      <h1>My fave games</h1>
      <button
        onClick={() => {
          addNewGame();
        }}
      >
        +
      </button>
      {faveGames.map((g) => (
        <FaveGame faveGame={g} />
      ))}
    </div>
  );
};

export default FaveGames;
