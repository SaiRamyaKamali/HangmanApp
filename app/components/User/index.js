"use client"
import React, { useState, useEffect } from "react";
import Game from "../Game";
import db from "../firebase";

function User() {
    const [username, setUsername] = useState("");
    const [renderGame, setRenderGame] = useState(false);
    const [scores, setScores] = useState([]);

    function handleInputChange(event) {
        setUsername(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!username){
            alert('Please Enter username');
        }
        else{
            setRenderGame(true);
        }
    }

    function handleBackClick() {
        setUsername("");
        setRenderGame(false);
    }

    useEffect(() => {
        const unsubscribe = db.collection('scores')
          .orderBy('sc', 'desc')
          .limit(10)
          .onSnapshot((querySnapshot) => {
            const newScores = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              console.log(data);
              newScores.push({
                id: doc.id,
                username: data.Name,
                score: data.sc,
              });
            });
            setScores(newScores);
            console.log(scores);
          });
        },[]);
    return (
        <div>
            {!renderGame ? (
                <>
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

                {/* <div className="scoreBoard">
                    <button className="board">ScoreBoard</button>
                </div> */}
                 <div>
                <h2>Top Scores</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scores.map((score, index) => (
                        <tr key={score.id}>
                        <td>{index + 1}</td>
                        <td>{score.username}</td>
                        <td>{score.score}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                </>
            ) : (
                <Game username={username} onBackClick={handleBackClick} />
            )}
        </div>
    );
}

export default User;
