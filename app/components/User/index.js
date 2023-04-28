    "use client"
    import React, { useState, useEffect } from "react";
    import Game from "../Game";
    import db from "../firebase";
    import queryString from "query-string";
    import { useRouter } from "next/navigation";
    import { useLocation } from 'react-router-dom';
    import '../User/index.css';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'


    function User() {
        const [username, setUsername] = useState("");
        const [renderGame, setRenderGame] = useState(false);
        const [renderBoard, setRenderBoard] = useState(false);
        const [scores, setScores] = useState([]);
        const [customWord, setCustomWord] = useState("");
        const [link, setLink] = useState("");
        const [word, setWord] = useState('');
        var queryParameters;
       // var word;
        useEffect(() => {
            if (typeof window !== "undefined") {
                queryParameters = new URLSearchParams(window.location.search);
               setWord(queryParameters.get("word"));
              console.log("custom word", word);
            }
          }, []);
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
            setWord(null);
            setCustomWord('');
        }
        function handleBoardClick(){
            setRenderBoard(true);
        }
        
        function copyLink() {

        const linkField = { link }.link
        const tempInput = document.createElement("input");
        tempInput.value = linkField
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        alert("Copied the link: " + linkField);

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
                    <div className="main-page-container">
                        <h1 className="first">Welcome to Hangman!!</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                            Enter Username to Play
                                <br/>
                                <input type="text" value={username} onChange={handleInputChange} className="username-input" placeholder="username"/>
                            </label>
                            <button className="submit" type="submit">Play</button>
                        </form>
                        {word==null?(
                        <form onSubmit={handleSubmit2}>
                            <label>
                            Create a Custom Word and Challenge others
                            <br/>
                                <input type="text" value={customWord} onChange={handleInputChange2}  className="username-input" placeholder="custom word"/>
                            </label>
                            <button className="submit" type="submit">Get Link</button>
                        </form>
                        ):null}
                        {link&&(
                        <div className="link-box">
                            <p>Here is the Link:</p>
                            <a className="link" href={`${link}`} target="_blank">{link}</a>
                            <button onClick={copyLink} className="copy-button">Copy to Clipboard<FontAwesomeIcon icon={faClipboard} /></button>
                        </div>
                        )}
                        {word==null?(
                            <div className="scorebord-button">
                            <button className="submit" onClick={handleBoardClick}>Score Board</button>
                        </div>
                        ):null}
                    </div>
                    </>
                ) : !renderBoard? (
                    <Game username={username} customWord = {customWord}onBackClick={handleBackClick} />
                ):(
                    <div>
                        <button className="submit" onClick={handleBackClick}>Back
                        </button>
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
