import React from "react";
import "./App.css";
import { Auth0Provider } from "@auth0/auth0-react";
import Routes from "./components/Routes/Routes";
import Header from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";

function App() {
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
