const gamesById = {};

const platformsById = {};

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

const userById = (userId, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/users/${userId}`)
    .then((response) => response.json())
    .then((data) => callback(data));
};

const me = (token, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => callback(data));
};

const gameById = (id, callback) => {
  if (gamesById[id]) {
    callback(gamesById[id]);
  } else {
    fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/games/${id}`)
      .then((response) => response.json())
      .then((data) => {
        gamesById[id] = data;
        callback(data);
      });
  }
};

const platformsByIds = (ids, callback) => {
  let allIdsCached = true;

  for (let id of ids) {
    if (!platformsById[id]) {
      allIdsCached = false;
      break;
    }
  }

  if (allIdsCached) {
    callback(ids.map((id) => platformsById[id]));
  } else {
    fetch(
      `${process.env.REACT_APP_FAVE_GAMES_API}/platforms?platformIds=${ids}`
    )
      .then((response) => response.json())
      .then((data) => {
        data.forEach((platform) => (platformsById[data.id] = platform));
        callback(data);
      });
  }
};

const platformById = (id, callback) => {
  if (platformsById[id]) {
    callback(platformsById[id]);
  } else {
    fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/platforms?platformIds=${id}`)
      .then((response) => response.json())
      .then((data) => {
        platformsById[id] = data[0];
        callback(data[0]);
      });
  }
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
  me,
  userById,
  gameById,
  platformsByIds,
  platformById,
  faveGamesByPlatform,
  createFaveGame,
  editFaveGame,
  deleteFaveGame,
  userFaveGames,
  myFaveGames,
};
