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

let loadingStateListener;

const loadingEvents = [];

const onLoadingStateChange = (callback) => {
  if (loadingStateListener) {
    throw new Error("loading listener should be registered once, in app root");
  }
  loadingStateListener = callback;
};

const loading = () => {
  loadingEvents.push("");
  if (loadingStateListener && loadingEvents.length === 1) {
    loadingStateListener("loading");
  }
};

const loaded = () => {
  loadingEvents.pop();
  if (loadingStateListener) {
    if (!loadingEvents.length);
    loadingStateListener("loaded");
  }
};

const searchGames = (searchTerm, callback) => {
  loading();
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/games?search=${searchTerm}`)
    .then((response) => response && response.json())
    .then((data) => {
      loaded();
      callback(data);
    });
};

const searchPlatforms = (searchTerm, callback) => {
  loading();
  fetch(
    `${process.env.REACT_APP_FAVE_GAMES_API}/platforms?search=${searchTerm}`
  )
    .then((response) => response && response.json())
    .then((data) => {
      loaded();
      callback(data);
    });
};

const searchUsers = (searchTerm, callback) => {
  loading();
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/users?search=${searchTerm}`)
    .then((response) => response && response.json())
    .then((data) => {
      loaded();
      callback(data);
    });
};

const userById = (userId, callback) => {
  loading();
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/users/${userId}`)
    .then((response) => response && response.json())
    .then((data) => {
      loaded();
      callback(data);
    });
};

const me = (token, callback) => {
  loading();
  if (cachedUser) {
    loaded();
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
        loaded();
        callback(data);
      });
  }
};

const gameById = (id, callback) => {
  loading();
  if (gamesById[id] && gamesById[id].name) {
    loaded();
    callback(gamesById[id]);
  } else {
    fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/games/${id}`)
      .then((response) => {
        return response && response.json();
      })
      .catch(() => {
        loaded();
        callback({});
      })
      .then((data) => {
        gamesById[id] = data;
        loaded();
        callback(data);
      });
  }
};

const gamesByIds = (ids, callback) => {
  loading();

  let allIdsCached = true;

  for (let id of ids) {
    if (!gamesById[id]) {
      allIdsCached = false;
      break;
    }
  }

  if (allIdsCached) {
    loaded();
    callback(ids.map((id) => gamesById[id]));
  } else {
    fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/games?gameIds=${ids}`)
      .then((response) => {
        return response && response.json();
      })
      .then((data) => {
        data.forEach((game) => (gamesById[game.id] = game));
        loaded();
        callback(data);
      });
  }
};

const platformsByIds = (ids, callback) => {
  loading();

  let allIdsCached = true;

  for (let id of ids) {
    if (!platformsById[id]) {
      allIdsCached = false;
      break;
    }
  }

  if (allIdsCached) {
    loaded();
    callback(ids.map((id) => platformsById[id]));
  } else {
    fetch(
      `${process.env.REACT_APP_FAVE_GAMES_API}/platforms?platformIds=${ids}`
    )
      .then((response) => response && response.json())
      .then((data) => {
        data.forEach((p) => {
          platformsById[p.id] = p;
        });
        loaded();
        callback(data);
      });
  }
};

const platformById = (id, callback) => {
  loading();
  if (platformsById[id]) {
    loaded();
    callback(platformsById[id]);
  } else {
    fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/platforms?platformIds=${id}`)
      .then((response) => response && response.json())
      .then((data) => {
        platformsById[id] = data[0];
        loaded();
        callback(data[0]);
      });
  }
};

const faveGamesByPlatform = (platformId, callback) => {
  loading();
  if (platformFaveGames[platformId]) {
    callback(platformFaveGames[platformId]);
    loaded();
  } else {
    fetch(
      `${process.env.REACT_APP_FAVE_GAMES_API}/platform-fave-games/${platformId}`
    )
      .then((response) => response && response.json())
      .then((data) => {
        loaded();
        callback(data);
        platformFaveGames[platformId] = data;
      });
  }
};

const createFaveGame = (token, faveGame, callback) => {
  loading();
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
      loaded();
      callback(createdGame);
    });
};

const editFaveGame = (token, update, callback) => {
  loading();
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
    loaded();
  });
};

const deleteFaveGame = (token, faveGameId, callback) => {
  loading();
  fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/my-fave-games/${faveGameId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(() => {
    cachedFaveGames = cachedFaveGames.filter((g) => g.id !== faveGameId);
    loaded();
    callback();
  });
};

const userFaveGames = (userId, callback) => {
  loading();
  if (cachedUser && userId === cachedUser.userId && cachedFaveGames) {
    callback(cachedFaveGames);
    loaded();
  } else {
    fetch(`${process.env.REACT_APP_FAVE_GAMES_API}/my-fave-games/${userId}`)
      .then((response) => response && response.json())
      .then((data) => {
        loaded();
        callback(data);
      });
  }
};

const myFaveGames = (token, callback) => {
  loading();
  if (cachedFaveGames) {
    loaded();
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
        loaded();
      });
  }
};

export default {
  onLoadingStateChange,
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
