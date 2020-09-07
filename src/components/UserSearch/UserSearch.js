import React, { useState } from "react";
import faveGamesService from "../../services/fave-games.service";
import { Link } from "react-router-dom";

const UserFaveGames = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    faveGamesService.searchUsers(searchTerm, (fetchedResults) => {
      setResults(fetchedResults);
    });
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <React.Fragment>
      <h1>User Search</h1>
      <form
        onSubmit={(event) => {
          handleFormSubmit(event);
        }}
      >
        <input
          type="text"
          onChange={(event) => handleSearchTermChange(event)}
        />
        <input type="submit" value="Search for user"></input>
      </form>
      <ul>
        {results.map((user) => (
          <li key={user.userId}>
            <Link to={`fave-games/${user.userId}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default UserFaveGames;
