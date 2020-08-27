const searchGames = (searchTerm, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/games?search=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => callback(data));
};

const platformsByIds = (ids, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/platforms?platformIds=${ids}`)
    .then((response) => response.json())
    .then((data) => callback(data));
};

const createFaveGame = (faveGame) => {};

const updateFaveGame = (faveGame) => {};

const deleteFaveGame = (faveGameId) => {};

const userFaveGames = (userId, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/my-fave-games/${userId}`)
    .then((response) => response.json())
    .then((data) => callback(data));
};

export default {
  searchGames,
  platformsByIds,
  createFaveGame,
  updateFaveGame,
  deleteFaveGame,
  userFaveGames,
};
