const searchGames = (searchTerm, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/games?search=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => callback(data));
};

const gameById = (id, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/games/${id}`)
    .then((response) => response.json())
    .then((data) => callback(data));
};

const platformsByIds = (ids, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/platforms?platformIds=${ids}`)
    .then((response) => response.json())
    .then((data) => callback(data));
};

const faveGamesByPlatform = (platformId, callback) => {
  fetch(
    `${process.env.REACT_APP_FAVE_GAMES_API}/platform-fave-games/${platformId}`
  )
    .then((response) => response.json())
    .then((data) => callback(data));
};

const createFaveGame = (token, faveGame, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/my-fave-games`, {
    method: "POST",
    body: JSON.stringify(faveGame),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(() => callback());
};

const deleteFaveGame = (token, faveGameId, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/my-fave-games/${faveGameId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(() => callback());
};

const userFaveGames = (userId, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/my-fave-games/${userId}`)
    .then((response) => response.json())
    .then((data) => callback(data));
};

export default {
  searchGames,
  gameById,
  platformsByIds,
  faveGamesByPlatform,
  createFaveGame,
  deleteFaveGame,
  userFaveGames,
};
