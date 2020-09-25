import React, { useState } from "react";
import faveGamesService from "../../services/fave-games.service";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import "../../shared-styles/Inputs.css";
import "../../shared-styles/Buttons.css";
import "./UserSearch.css";

const UserFaveGames = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    faveGamesService.searchUsers(searchTerm, (fetchedResults) => {
      setResults(fetchedResults);
      setLoading(false);
    });
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="user-search">
          <h1>User Search</h1>
          <form>
            <input
              type="text"
              className="mfg-input user-search__search-term"
              onChange={(event) => handleSearchTermChange(event)}
            />
            <button
              className="mfg-button dark"
              onClick={(event) => handleFormSubmit(event)}
            >
              Search for user
            </button>
          </form>
          <ul>
            {results.map((user) => (
              <li key={user.userId}>
                <Link to={`fave-games/${user.userId}`}>{user.username}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserFaveGames;
