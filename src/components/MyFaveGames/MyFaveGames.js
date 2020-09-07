import React, { useState, useEffect } from "react";
import "./MyFaveGames.css";
import FaveGame from "../FaveGame/FaveGame";
import FaveGameForm from "../FaveGameForm/FaveGameForm";
import { useAuth0 } from "@auth0/auth0-react";
import faveGamesService from "../../services/fave-games.service";
import "../../shared-styles/Buttons.css";
import { Link } from "react-router-dom";

const FaveGames = () => {
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  const [token, setToken] = useState();
  const [faveGames, setFaveGames] = useState([]);
  const [showGameModal, setShowGameModal] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUserStuff() {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
        faveGamesService.me(accessToken, (userInfo) => {
          setUser(userInfo);
        });
        faveGamesService.myFaveGames(accessToken, (games) => {
          setFaveGames(games);
        });
      } catch (err) {
        console.error(err);
      }
    }
    getUserStuff();
  }, [getAccessTokenSilently, getIdTokenClaims]);

  const addNewGame = () => {
    setShowGameModal(true);
  };

  const gameAdded = (game) => {
    faveGamesService.createFaveGame(token, game, (createdGame) => {
      faveGamesService.gameById(createdGame.gameId, () => {
        setFaveGames([...faveGames, createdGame]);
      });
    });
  };

  const deleteGame = (gameId) => {
    faveGamesService.deleteFaveGame(token, gameId, () => {
      setFaveGames(faveGames.filter((g) => g.id !== gameId));
    });
  };

  const editGame = (gameId, reasons) => {
    faveGamesService.editFaveGame(token, { gameId, reasons }, () => {
      setFaveGames(
        faveGames.map((g) => (g.id === gameId ? { ...g, reasons } : g))
      );
    });
  };

  return (
    <div className="my-fave-games">
      {!showGameModal ? (
        <div>
          <h1>{user.username} Fave Games</h1>
          <button
            onClick={() => {
              addNewGame();
            }}
            className="mfg-button"
          >
            Add new fave game
          </button>
          <div className="my-fave-games__public-list-link">
            <Link to={`/fave-games/${user.userId}`}>See public list</Link>
          </div>
          {faveGames.map((g) => (
            <div className="my-fave-games__fave-game" key={g.id}>
              <FaveGame
                faveGame={g}
                isEditable={true}
                onDelete={() => deleteGame(g.id)}
                onEdit={(reasons) => editGame(g.id, reasons)}
              />
            </div>
          ))}
        </div>
      ) : (
        <FaveGameForm
          gameAdded={(game) => gameAdded(game)}
          formClosed={() => setShowGameModal(false)}
        />
      )}
    </div>
  );
};

export default FaveGames;
