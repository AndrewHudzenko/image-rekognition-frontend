import "../styles/Search.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/images/recognize",
        {
          params: {
            objectName: searchTerm,
          },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
      setSearchResults([]);
    }
  };

  return (
    <div className="search-container">
      <h4>Please find me images that contain the following items: </h4>
      <input
        type="text"
        placeholder="Object name or item"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      {searchResults.length > 0 && (
        <ul className="image-grid">
          {searchResults.map((imageUrl) => (
            <li key={imageUrl} className="image-item">
              <img src={imageUrl} alt={searchTerm} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
