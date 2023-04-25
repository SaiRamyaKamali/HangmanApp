import db from "../firebase";
import { useEffect } from "react";

const Result = ({ isCorrectGuess, randomWord, score, user }) =>{
    useEffect(() =>{
        db.collection("scores").
      add({
        Name: user,
        sc: score, 
      });
    },[])
   if(isCorrectGuess){
    return(
        <div>
        <p>Congratulations, you guessed the word right! Your Score : {score}</p>
        <p>The word is {randomWord}</p>
        <button>Play Again</button>
        <button>Logout</button>
    </div>
    )
   }
   return(
    <div>
        <p>Sorry you didn't guess the word right!</p>
        <p>The word is {randomWord}</p>
        <button>Play Again</button>
        <button>Logout</button>
    </div>
   )
}

export default Result