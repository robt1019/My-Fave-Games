import React, { useState } from "react";
import { Link } from "react-router-dom";
import faveGamesService from "../../services/fave-games.service";
import "../../shared-styles/Inputs.css";
import "../../shared-styles/Buttons.css";
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
    <div class="platform-search">
      <form>
        <input
          class="mfg-input platform-search__text"
          onChange={(event) => onSearchTermChange(event)}
          type="text"
          placeholder="Another platform?"
        />
        <button
          class="mfg-button"
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
