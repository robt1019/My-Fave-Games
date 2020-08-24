const platforms = {
  "uuid-222": { name: "PS4" },
  "uuid-223": { name: "switch" },
  "uuid-224": { name: "X Box One" },
  "uuid-225": { name: "PC" },
};

const games = {
  "uuid-313": {
    name: "Zelda Breath of the Wild",
    platforms: ["uuid-223"],
  },
  "uuid-312": {
    name: "Hitman 2",
    platforms: ["uuid-222", "uuid-223", "uuid-224", "uuid-225"],
  },
};

const includedBy = {
  "uuid-222": {
    "uuid-312": {
      robt1019: "I loved throwing coconut at ppls hedz",
    },
  },
  "uuid-223": {
    "uuid-313": {
      robt1019: "Zelda horses are fun. I like horse",
    },
  },
};

const users = {
  robt1019: {
    name: "Rob Taylor",
    top5: [
      { gameId: "uuid-312", platformId: "uuid-222" },
      { gameId: "uuid-313", platformId: "uuid-223" },
    ],
  },
};

export function getGame(gameId, callback) {
  callback(games[gameId]);
}
export function getUser(username, callback) {
  callback(users[username]);
}
export function getPlatforms(callback) {
  callback(platforms);
}
export function whyDoILike(query, callback) {
  callback(includedBy[query.platformId][query.gameId][query.username]);
}
