import React, { useState, useEffect } from "react";
import "./MyFaveGames.css";
import FaveGame from "../FaveGame/FaveGame";
import FaveGameForm from "../FaveGameForm/FaveGameForm";
import { useAuth0 } from "@auth0/auth0-react";
import faveGamesService from "../../services/fave-games.service";

const FaveGames = () => {
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  const [token, setToken] = useState();
  const [faveGames, setFaveGames] = useState([]);
  const [showGameModal, setShowGameModal] = useState(false);

  useEffect(() => {
    async function getUserStuff() {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
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
      setFaveGames([...faveGames, createdGame]);
    });
  };

  const deleteGame = (gameId) => {
    faveGamesService.deleteFaveGame(token, gameId, () => {
      setFaveGames(faveGames.filter((g) => g.id !== gameId));
    });
  };

  return (
    <div className="my-fave-games">
      {!showGameModal ? (
        <div>
          <h1>My fave games</h1>
          <button
            onClick={() => {
              addNewGame();
            }}
          >
            Add new fave game
          </button>
          {faveGames.map((g) => (
            <div className="my-fave-games__fave-game" key={g.id}>
              <FaveGame
                faveGame={g}
                isEditable={true}
                onDelete={() => deleteGame(g.id)}
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
