// const users = {
//   robt1019: {
//     name: "Rob Taylor",
//     top5: [
//       { gameId: "uuid-312", platformId: "uuid-222" },
//       { gameId: "uuid-313", platformId: "uuid-223" },
//     ],
//   },
// };

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

export default {
  searchGames,
  platformsByIds,
};
