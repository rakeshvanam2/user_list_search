import React, { useState } from "react";
import UserList from "./UserList";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setSearchHistory((prevHistory) => [...prevHistory, newSearchTerm]);
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontFamily: "sans-serif",
          color: "rgb(20, 211, 122)",
        }}
      >
        User Name Search{" "}
      </h1>
      <div>
        <ul>
          {searchHistory.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
      <UserList
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
      />
    </div>
  );
};

export default App;
