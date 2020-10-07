import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import faveGamesService from "./services/fave-games.service";
import "./shared-styles/Buttons.css";
import "./shared-styles/Inputs.css";

require("dotenv").config();

export const quickPlatformLinkIds = [48, 130, 6, 49];

let dataLoaded = 0;
let platformsLoaded = false;

quickPlatformLinkIds.forEach((platformId) => {
  faveGamesService.faveGamesByPlatform(platformId, (faveGames) => {
    faveGamesService.gamesByIds(
      faveGames.map((g) => g.gameId),
      (fetchedGames) => {
        dataLoaded += 1;

        if (dataLoaded === quickPlatformLinkIds.length && platformsLoaded) {
          ReactDOM.render(
            <React.StrictMode>
              <App />
            </React.StrictMode>,
            document.getElementById("root")
          );

          // If you want your app to work offline and load faster, you can change
          // unregister() to register() below. Note this comes with some pitfalls.
          // Learn more about service workers: https://bit.ly/CRA-PWA
          serviceWorker.unregister();
        }

        fetchedGames.forEach((fetchedGame) => {
          const img = new Image();
          img.src = fetchedGame.screenshots[0].url;
        });
      }
    );
  });
});

faveGamesService.platformsByIds(quickPlatformLinkIds, () => {
  platformsLoaded = true;
});
