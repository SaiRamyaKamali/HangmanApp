"use client"
import React, { useState, useEffect } from "react";
import Game from "../Game";
import db from "../firebase";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import { useLocation } from 'react-router-dom';
import '../User/index.css';


function User() {
    const [username, setUsername] = useState("");
    const [renderGame, setRenderGame] = useState(false);
    const [renderBoard, setRenderBoard] = useState(false);
    const [scores, setScores] = useState([]);
    const [customWord, setCustomWord] = useState("");
    const [link, setLink] = useState("");
    const queryParameters = new URLSearchParams(window.location.search);
    const word = queryParameters.get("word");
    console.log(word);  
    // const query = new URLSearchParams(location.search);
    // const word = query.get('word');
    // console.log(router);
    //  const {word} = router.query;
    function handleInputChange(event) {
        setUsername(event.target.value);
    }
    function handleInputChange2(event) {
        setCustomWord(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!username){
            alert('Please Enter username');
        }
        else{
            // console.log(word);
            if(word)
            {
             setCustomWord(atob(word));
            }
            setRenderGame(true);
        }
    }
    function handleSubmit2(event) {
        event.preventDefault();
        if(!customWord){
            alert('Please Enter word');
        }
        else{
            console.log(customWord);
            const encodedWord = btoa(customWord);
            console.log(encodedWord);
            const queryParams = queryString.stringify({ word: encodedWord });
            const url = `${window.location.origin}?${queryParams}`;
            console.log(url);
            setLink(url);
        }
    }

    function handleBackClick() {
        setUsername("");
        setRenderGame(false);
        setRenderBoard(false);
    }
    function handleBoardClick(){
        setRenderBoard(true);
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
            {!renderGame && !renderBoard? (
                <>
                <div>
                    <h1>Enter your username</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Username:
                            <input type="text" value={username} onChange={handleInputChange} />
                        </label>
                        <button className="submit" type="submit">Submit</button>
                    </form>
                    <form onSubmit={handleSubmit2}>
                        <label>
                            Custom Word
                            <input type="text" value={customWord} onChange={handleInputChange2} />
                        </label>
                        <button className="submit" type="submit">Share</button>
                    </form>
                    <p>Here is the Link: {link}</p>
                    <div>
                        <button className="submit" onClick={handleBoardClick}>ScoreBoard</button>
                    </div>
                </div>

                {/* <div className="scoreBoard">
                    <button className="board">ScoreBoard</button>
                </div> */}
                 
                </>
            ) : !renderBoard? (
                <Game username={username} customWord = {customWord}onBackClick={handleBackClick} />
            ):(
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
            )}
        </div>
    );
}

export default User;
