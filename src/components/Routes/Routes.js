import React from "react";
import PlatformBrowser from "../PlatformBrowser/PlatformBrowser";
import UserSearch from "../UserSearch/UserSearch";
import UserFaveGames from "../UserFaveGames/UserFaveGames";
import MyFaveGames from "../MyFaveGames/MyFaveGames";
import PlatformFaveGames from "../PlatformFaveGames/PlatformFaveGames";
import { Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Routes = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Routes;
