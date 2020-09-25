const gamesById = {};

const platformsById = {
  6: {
    id: 6,
    name: "PC",
    platform_logo: 203,
  },
};

let platformFaveGames = {};

let cachedFaveGames = undefined;

let cachedUser = undefined;

const searchGames = (searchTerm, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/games?search=${searchTerm}`)
    .then((response) => response && response.json())
    .then((data) => {
      callback(data);
    });
};

const searchPlatforms = (searchTerm, callback) => {
  fetch(
    `${process.env.REACT_APP_FAVE_GAMES_API}/platforms?search=${searchTerm}`
  )
    .then((response) => response && response.json())
    .then((data) => {
      callback(data);
    });
};

const searchUsers = (searchTerm, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/users?search=${searchTerm}`)
    .then((response) => response && response.json())
    .then((data) => {
      callback(data);
    });
};

const userById = (userId, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/users/${userId}`)
    .then((response) => response && response.json())
    .then((data) => {
      callback(data);
    });
};

const me = (token, callback) => {
  if (cachedUser) {
    callback(cachedUser);
  } else {
    fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response && response.json();
        } else {
          cachedUser = undefined;
          return {};
        }
      })
      .then((data) => {
        cachedUser = data;
        callback(data);
      });
  }
};

const gameById = (id, callback) => {
  if (gamesById[id] && gamesById[id].name) {
    callback(gamesById[id]);
  } else {
    fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/games/${id}`)
      .then((response) => {
        return response && response.json();
      })
      .catch(() => {
        callback({});
      })
      .then((data) => {
        gamesById[id] = data;
        callback(data);
      });
  }
};

const gamesByIds = (ids, callback) => {
  let allIdsCached = true;

  for (let id of ids) {
    if (!gamesById[id]) {
      allIdsCached = false;
      break;
    }
  }

  if (allIdsCached) {
    callback(ids.map((id) => gamesById[id]));
  } else {
    fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/games?gameIds=${ids}`)
      .then((response) => {
        return response && response.json();
      })
      .then((data) => {
        data.forEach((game) => (gamesById[game.id] = game));
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
      .then((response) => response && response.json())
      .then((data) => {
        data.forEach((p) => {
          if (p.id === 6) {
            p.name = "PC";
          }
          platformsById[p.id] = p;
        });
        callback(data);
      });
  }
};

const platformById = (id, callback) => {
  if (platformsById[id]) {
    callback(platformsById[id]);
  } else {
    fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/platforms?platformIds=${id}`)
      .then((response) => response && response.json())
      .then((data) => {
        platformsById[id] = data[0];
        callback(data[0]);
      });
  }
};

const faveGamesByPlatform = (platformId, callback) => {
  if (platformFaveGames[platformId]) {
    callback(platformFaveGames[platformId]);
  } else {
    fetch(
      `${process.env.REACT_APP_FAVE_GAMES_API}/platform-fave-games/${platformId}`
    )
      .then((response) => response && response.json())
      .then((data) => {
        callback(data);
        platformFaveGames[platformId] = data;
      });
  }
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
    .then((response) => response && response.json())
    .then((createdGame) => {
      cachedFaveGames.push(createdGame);
      callback(createdGame);
    });
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
  ).then(() => {
    cachedFaveGames = cachedFaveGames.map((g) =>
      g.id === update.gameId ? { ...g, reasons: update.reasons } : g
    );
    callback();
  });
};

const deleteFaveGame = (token, faveGameId, callback) => {
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/my-fave-games/${faveGameId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(() => {
    cachedFaveGames = cachedFaveGames.filter((g) => g.id !== faveGameId);
    callback();
  });
};

const userFaveGames = (userId, callback) => {
  if (cachedUser && userId === cachedUser.userId && cachedFaveGames) {
    callback(cachedFaveGames);
  } else {
    fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/my-fave-games/${userId}`)
      .then((response) => response && response.json())
      .then((data) => {
        callback(data);
      });
  }
};

const myFaveGames = (token, callback) => {
  if (cachedFaveGames) {
    callback(cachedFaveGames);
  } else {
    fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/my-fave-games`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response && response.json())
      .then((data) => {
        callback(data);
        cachedFaveGames = data;
      });
  }
};

export default {
  clearCachedUser: () => {
    cachedUser = undefined;
  },
  searchGames,
  searchPlatforms,
  searchUsers,
  me,
  userById,
  gameById,
  gamesByIds,
  platformsByIds,
  platformById,
  faveGamesByPlatform,
  createFaveGame,
  editFaveGame,
  deleteFaveGame,
  userFaveGames,
  myFaveGames,
};
