const searchGames = (searchTerm, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/games?search=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => callback(data));
};

const searchUsers = (searchTerm, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/users?search=${searchTerm}`)
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
  })
    .then((response) => response.json())
    .then((createdGame) => callback(createdGame));
};

const editFaveGame = (token, update, callback) => {
  fetch(
    `${process.env.REACT_APP_FAVE_GAMES_API}/my-fave-games/${update.gameId}`,
    {
      method: "PUT",
      body: JSON.stringify({ reasons: update.reasons }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then(() => callback());
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

const myFaveGames = (token, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/my-fave-games`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => callback(data));
};

export default {
  searchGames,
  searchUsers,
  gameById,
  platformsByIds,
  faveGamesByPlatform,
  createFaveGame,
  editFaveGame,
  deleteFaveGame,
  userFaveGames,
  myFaveGames,
};
