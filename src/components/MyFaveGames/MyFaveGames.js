import React, { useState, useEffect } from "react";
import FaveGame from "../FaveGame/FaveGame";
import { useAuth0 } from "@auth0/auth0-react";

const FaveGames = () => {
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState();

  useEffect(() => {
    async function getUserStuff() {
      try {
        const userInfo = await getIdTokenClaims();
        setUserInfo(userInfo);
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (err) {
        alert("you are not logged in. Maybe do that?");
      }
    }
    getUserStuff();
  }, [getAccessTokenSilently, getIdTokenClaims]);

  return (
    <div>
      <h1>My fave games</h1>
      <FaveGame />
    </div>
  );
};

export default FaveGames;
