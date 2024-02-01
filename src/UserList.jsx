// src/UserList.jsx
import React, { useState, useEffect } from "react";

const UserList = ({ onSearchTermChange }) => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Load past searches from local storage
    const storedSearchHistory = localStorage.getItem("searchHistory");
    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory));
    }

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setSortedUsers(data);
      })
      .catch((error) => console.error("Error fetching users", error));
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSortedUsers(filteredUsers);
  }, [searchTerm, users]);

  const handleSortByName = () => {
    const sortedByName = [...sortedUsers].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    setSortedUsers(sortedByName);
  };

  const handleSaveSearch = () => {
    // Save search term to history when the button is clicked
    setSearchHistory((prevHistory) => [...prevHistory, searchTerm]);

    // Save the updated search history to local storage
    localStorage.setItem(
      "searchHistory",
      JSON.stringify([...searchHistory, searchTerm]),
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSortByName} style={styles.button}>
          Sort by Name
        </button>
        <button onClick={handleSaveSearch} style={styles.button}>
          Save Search
        </button>
      </div>
      <ul style={styles.userList}>
        {sortedUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <div>
        <h2>Past Searches</h2>
        <ul style={styles.historyList}>
          {searchHistory.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    maxWidth: "600px",
    margin: "auto",
  },
  inputContainer: {
    marginBottom: "10px",
  },
  input: {
    padding: "5px",
    marginRight: "10px",
  },
  button: {
    padding: "5px 10px",
    margin: "5px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  historyList: {
    listStyleType: "none",
    padding: "0",
    marginBottom: "10px",
  },
  userList: {
    listStyleType: "none",
    padding: "0",
  },
};

export default UserList;
