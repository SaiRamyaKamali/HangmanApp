import React, { useState } from 'react';
import Result from '../Result'

const randomWords = [
    'abroad',
    'chairman',
    'icecream',
    'iceberg'
];

const alphabet = [...'abcdefghijklmnopqrstuvwxyz'].map((letter) => ({
    letter,
    clicked: false,
}));

const Game = ({ username, onBackClick }) => {
    //generate random word and store in the state
    const [randomWord, setRandomWord] = useState(() => {
        const randomIndex = Math.floor(Math.random() * randomWords.length);
        return randomWords[randomIndex];
    });

    //letters
    const [clickedLetters, setClickedLetters] = useState(alphabet);

    //wordState with null values
    const [wordState, setWordState] = useState(
        Array(randomWord.length).fill(null)
    );
    
    //keep track of no.of guesses
    const [guesses, setGuesses] = useState(0);
    
    //keep track if user guessed the word coorectly
    const [isCorrectGuess, setIsCorrectGuess] = useState(false);


    function handleLetterClick(letter) {
        const newClickedLetters = clickedLetters.map((l) =>
            l.letter === letter ? { ...l, clicked: true } : l
        );
        setClickedLetters(newClickedLetters);
    
        const newWordState = [...wordState];
        let correctGuess = false;
        for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === letter) {
                newWordState[i] = letter;
                correctGuess = true;
            }
        }
        setWordState(newWordState);
    
        if (!correctGuess) {
            setGuesses(guesses + 1);
        } else if (!newWordState.includes(null)) {
            setIsCorrectGuess(true);
        }
    }
    
    if(isCorrectGuess ||guesses >= 6){
        return(
            <Result isCorrectGuess={isCorrectGuess} randomWord={randomWord}/>
        )

    }
    return (
        <div>
            <h1>Hello, {username}!</h1>
            <p>Guess the word:</p>
            <p>
                {wordState.map((letter, index) => (
                    <span key={index} className="letter">
                        {letter ? `${letter} ` : '_ '}
                    </span>
                ))}
            </p>
            <div>
                {clickedLetters.map((letterObj) => (
                    <button
                        key={letterObj.letter}
                        disabled={letterObj.clicked || guesses >= 6 || isCorrectGuess}
                        onClick={() => handleLetterClick(letterObj.letter)}
                    >
                        {letterObj.letter}
                    </button>
                ))}
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
    
};

export default Game;
