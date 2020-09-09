import React, { useEffect } from "react";
import "./Routes.css";
import PlatformBrowser from "../PlatformBrowser/PlatformBrowser";
import UserSearch from "../UserSearch/UserSearch";
import UserFaveGames from "../UserFaveGames/UserFaveGames";
import MyFaveGames from "../MyFaveGames/MyFaveGames";
import PlatformFaveGames from "../PlatformFaveGames/PlatformFaveGames";
import { Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import faveGamesService from "../../services/fave-games.service";

const Routes = () => {
  const { isAuthenticated } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        faveGamesService.myFaveGames(token, (faveGames) => {
          faveGamesService.gamesByIds(
            faveGames.map((g) => g.gameId),
            (fetchedGames) => {
              fetchedGames.forEach((fetchedGame) => {
                faveGamesService.platformById(fetchedGame.platformId, () => {});
                const img = new Image();
                img.src = fetchedGame.screenshots[0].url;
              });
            }
          );
        });
      });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div className="routes">
      <Switch>
        <Route path="/platform-fave-games/:platformId">
          <PlatformFaveGames />
        </Route>
        <Route path="/fave-games/:userId">
          <UserFaveGames />
        </Route>
        {isAuthenticated ? (
          <Route path="/my-fave-games">
            <MyFaveGames />
          </Route>
        ) : null}
        <Route path="/user-search">
          <UserSearch />
        </Route>
        <Route path="/">
          <PlatformBrowser />
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
