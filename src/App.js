import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import PlatformBrowser from "./components/PlatformBrowser/PlatformBrowser";
import UserSearch from "./components/UserSearch/UserSearch";
import UserFaveGames from "./components/UserFaveGames/UserFaveGames";
import PlatformFaveGames from "./components/PlatformFaveGames/PlatformFaveGames";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
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
  );
}

export default App;
