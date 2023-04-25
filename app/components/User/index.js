"use client"
import React, { useState } from "react";
import Game from "../Game";

function User() {
  const [username, setUsername] = useState("");
  const [renderGame, setRenderGame] = useState(false);

  function handleInputChange(event) {
    setUsername(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Username entered: ${username}`);
    setRenderGame(true);
  }

  function handleBackClick() {
    setUsername("");
    setRenderGame(false);
  }

  return (
    <div>
      {!renderGame ? (
        <div>
          <h1>Enter your username</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={handleInputChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <Game username={username} onBackClick={handleBackClick} />
      )}
    </div>
  );
}

export default User;
