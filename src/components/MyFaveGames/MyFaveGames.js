import React, { useState, useEffect } from "react";
import "./MyFaveGames.css";
import FaveGame from "../FaveGame/FaveGame";
import FaveGameForm from "../FaveGameForm/FaveGameForm";
import { useAuth0 } from "@auth0/auth0-react";
import faveGamesService from "../../services/fave-games.service";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const FaveGames = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [token, setToken] = useState();
  const [faveGames, setFaveGames] = useState([]);
  const [showGameModal, setShowGameModal] = useState(false);
  const [user, setUser] = useState({});
  const [gamesLoaded, setGamesLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    async function getUserStuff() {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
        faveGamesService.me(accessToken, (userInfo) => {
          setUser(userInfo);
          setUserLoaded(true);
        });
        faveGamesService.myFaveGames(accessToken, (games) => {
          faveGamesService.gamesByIds(
            games.map((g) => g.gameId),
            () => {
              setFaveGames(games);
              setGamesLoaded(true);
            }
          );
        });
      } catch (err) {
        console.error(err);
      }
    }
    getUserStuff();
  }, [getAccessTokenSilently]);

  const addNewGame = () => {
    if (faveGames.length < 5) {
      setShowGameModal(true);
    } else {
      window.alert(
        "Sorry there. You can only have 5 favourite games at one time. Look, I know its tough, but you are going to have to be more ruthless. For somewhat arbitrary reasons you are only allowed 5. So go back, think hard and delete one if you really want to add this new one."
      );
    }
  };

  const gameAdded = (game) => {
    setGamesLoaded(false);
    faveGamesService.createFaveGame(token, game, (createdGame) => {
      if (createdGame) {
        setFaveGames([...faveGames, createdGame]);
      }
      setGamesLoaded(true);
    });
  };

  const deleteGame = (gameId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this previously favourited game!?! I won't be able to get it back for you if you change your mind..."
    );
    if (shouldDelete) {
      setGamesLoaded(false);
      faveGamesService.deleteFaveGame(token, gameId, () => {
        setFaveGames(faveGames.filter((g) => g.id !== gameId));
        setGamesLoaded(true);
      });
    }
  };

  const editGame = (gameId, reasons) => {
    setGamesLoaded(false);
    faveGamesService.editFaveGame(token, { gameId, reasons }, () => {
      setFaveGames(
        faveGames.map((g) => (g.id === gameId ? { ...g, reasons } : g))
      );
      setGamesLoaded(true);
    });
  };

  return (
    <div>
      {userLoaded && gamesLoaded ? (
        <div className="my-fave-games">
          {!showGameModal ? (
            <div>
              <h1>{user.username} Top 5</h1>
              <button
                onClick={() => {
                  addNewGame();
                }}
                className="mfg-button"
              >
                Add new fave game
              </button>
              <div className="my-fave-games__public-list-link">
                <Link to={`/fave-games/${user.userId}`}>Shareable list</Link>
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
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default FaveGames;
