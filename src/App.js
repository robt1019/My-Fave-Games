import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import PlatformBrowser from "./components/PlatformBrowser/PlatformBrowser";
import UserSearch from "./components/UserSearch/UserSearch";
import UserFaveGames from "./components/UserFaveGames/UserFaveGames";
import PlatformFaveGames from "./components/PlatformFaveGames/PlatformFaveGames";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <Auth0Provider
      domain="my-fave-games-dev.eu.auth0.com"
      clientId="Ds9RwOfpdFO79wHCM4xEuWN4PqVWxxeS"
      scope="offline_access"
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/platform-fave-games/:platformId">
              <PlatformFaveGames />
            </Route>
            <Route path="/my-fave-games">
              <UserFaveGames />
            </Route>
            <Route path="/user-search">
              <UserSearch />
            </Route>
            <Route path="/">
              <PlatformBrowser />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
