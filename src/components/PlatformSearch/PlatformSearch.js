import React, { useState } from "react";
import { Link } from "react-router-dom";
import faveGamesService from "../../services/fave-games.service";
import "./PlatformSearch.css";

function PlatformSearch() {
  const [platforms, setPlatforms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchForPlatform = (event) => {
    event.preventDefault();
    faveGamesService.searchPlatforms(searchTerm, (platforms) => {
      setPlatforms(platforms);
    });
  };

  const onSearchTermChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  return (
    <div className="platform-search">
      <form>
        <input
          className="mfg-input platform-search__text"
          onChange={(event) => onSearchTermChange(event)}
          type="text"
          placeholder="Another platform?"
        />
        <button
          className="mfg-button"
          onClick={(event) => searchForPlatform(event)}
        >
          Search
        </button>
      </form>
      <ul>
        {platforms.map((p) => (
          <li>
            <Link to={`platform-fave-games/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlatformSearch;
