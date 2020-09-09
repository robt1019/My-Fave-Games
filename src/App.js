import React from "react";
import "./App.css";
import { Auth0Provider } from "@auth0/auth0-react";
import Routes from "./components/Routes/Routes";
import Header from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import faveGamesService from "./services/fave-games.service";

export const quickPlatformLinkIds = [48, 130, 6, 49];

function App() {
  // preload platforms and images
  quickPlatformLinkIds.forEach((platformId) => {
    faveGamesService.faveGamesByPlatform(platformId, (faveGames) => {
      faveGamesService.gamesByIds(
        faveGames.map((g) => g.gameId),
        (fetchedGames) => {
          fetchedGames.forEach((fetchedGame) => {
            const img = new Image();
            img.src = fetchedGame.screenshots[0].url;
          });
        }
      );
    });
  });

  faveGamesService.platformsByIds(quickPlatformLinkIds, () => {});

  return (
    <Auth0Provider
      domain="my-fave-games-dev.eu.auth0.com"
      clientId="Ds9RwOfpdFO79wHCM4xEuWN4PqVWxxeS"
      scope="offline_access"
      useRefreshTokens={true}
      cacheLocation="localstorage"
      audience={process.env.REACT_APP_FAVE_GAMES_API}
      redirectUri={window.location.origin}
    >
      <div className="app__container">
        <BrowserRouter>
          <Header />
          <Routes />
        </BrowserRouter>
      </div>
    </Auth0Provider>
  );
}

export default App;
