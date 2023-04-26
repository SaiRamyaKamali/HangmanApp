import React, { useState } from 'react';
import db from '../firebase';
import { useEffect } from "react";
import './index.css';

var userName = "";
const randomWords = ['absolute',
    'accident',
    'accustom',
    'admission',
    'adoption',
    'advantage',
    'adventure',
    'advertise',
    'afternoon',
    'agriculture',
    'airplane',
    'allowance',
    'although',
    'altogether',
    'ambition',
    'ambitious',
    'annoyance',
    'anything',
    'anywhere',
    'appearance',
    'applause',
    'application',
    'artificial',
    'association',
    'astonish',
    'attention',
    'attentive',
    'attraction',
    'attractive',
    'audience',
    'avoidance',
    'backward',
    'behavior',
    'boundary',
    'breakfast',
    'brighten',
    'broadcast',
    'business',
    'businesslike',
    'businessman',
    'calculate',
    'calculation',
    'calculator',
    'carriage',
    'cautious',
    'ceremony',
    'certainty',
    'chairman',
    'character',
    'childhood',
    'christmas',
    'circular',
    'civilize',
    'classification',
    'classify',
    'collection',
    'collector',
    'commerce',
    'commercial',
    'committee',
    'companion',
    'companionship',
    'comparison',
    'competition',
    'competitor',
    'complain',
    'complaint',
    'complete',
    'completion',
    'complicate',
    'complication',
    'composition',
    'condition',
    'confession',
    'confidence',
    'confident',
    'confidential',
    'confusion',
    'congratulate',
    'congratulation',
    'connection',
    'conqueror',
    'conquest',
    'conscience',
    'conscious',
    'consider',
    'continue',
    'convenience',
    'convenient',
    'conversation',
    'correction',
    'cowardice',
    'creature',
    'criminal',
    'cultivate',
    'cultivation',
    'cultivator',
    'cupboard',
    'customary',
    'customer',
    'daughter',
    'daylight',
    'decision',
    'decisive',
    'decrease',
    'defendant',
    'delicate',
    'delivery',
    'department',
    'dependence',
    'dependent',
    'descendant',
    'describe',
    'description',
    'destruction',
    'destructive',
    'determine',
    'dictionary',
    'difference',
    'different',
    'difficult',
    'difficulty',
    'direction',
    'director',
    'disagree',
    'disappear',
    'disappearance',
    'disappoint',
    'disapprove',
    'discipline',
    'discomfort',
    'discontent',
    'discover',
    'discovery',
    'discussion',
    'disregard',
    'disrespect',
    'dissatisfaction',
    'dissatisfy',
    'distance',
    'distinguish',
    'district',
    'division',
    'education',
    'educator',
    'effective',
    'efficiency',
    'efficient',
    'election',
    'electric',
    'electrician',
    'elephant',
    'elsewhere',
    'employee',
    'enclosure',
    'encourage',
    'engineer',
    'entertain',
    'entrance',
    'envelope',
    'especially',
    'essential',
    'everlasting',
    'everybody',
    'everyday',
    'everyone',
    'everything',
    'everywhere',
    'excellence',
    'excellent',
    'exception',
    'excessive',
    'exchange',
    'exercise',
    'existence',
    'expensive',
    'experience',
    'experiment',
    'explosion',
    'explosive',
    'expression',
    'extension',
    'extensive',
    'extraordinary',
    'familiar',
    'favorite',
    'fellowship',
    'fortunate',
    'framework',
    'frequency',
    'frequent',
    'friendly',
    'friendship',
    'frighten',
    'furniture',
    'generous',
    'gentleman',
    'governor',
    'grammatical',
    'grateful',
    'handkerchief',
    'handshake',
    'handwriting',
    'headache',
    'headdress',
    'heavenly',
    'heighten',
    'hesitate',
    'hesitation',
    'hindrance',
    'homecoming',
    'homemade',
    'homework',
    'horizontal',
    'hospital',
    'imaginary',
    'imaginative',
    'imitation',
    'immediate',
    'importance',
    'important',
    'impossible',
    'inclusive',
    'increase',
    'industry',
    'influence',
    'influential',
    'instrument',
    'insurance',
    'intention',
    'interest',
    'interfere',
    'interference',
    'international',
    'interrupt',
    'interruption',
    'introduce',
    'introduction',
    'invention',
    'inventor',
    'jealousy',
    'knowledge',
    'landlord',
    'language',
    'laughter',
    'leadership',
    'lengthen',
    'librarian',
    'lipstick',
    'literary',
    'literature',
    'machinery',
    'manufacture',
    'marriage',
    'material',
    'meantime',
    'meanwhile',
    'mechanic',
    'mechanism',
    'medicine',
    'membership',
    'merchant',
    'messenger',
    'minister',
    'miserable',
    'moderate',
    'moderation',
    'momentary',
    'moonlight',
    'moreover',
    'motherhood',
    'motherly',
    'mountain',
    'multiplication',
    'multiply',
    'musician',
    'necessary',
    'necessity',
    'neighbor',
    'neighborhood',
    'newspaper',
    'northern',
    'notebook',
    'nowadays',
    'nuisance',
    'numerous',
    'obedience',
    'obedient',
    'objection',
    'occasion',
    'official',
    'old-fashioned',
    'omission',
    'operation',
    'operator',
    'opportunity',
    'opposite',
    'opposition',
    'ordinary',
    'organize',
    'ornament',
    'otherwise',
    'overcome',
    'overflow',
    'ownership',
    'particle',
    'particular',
    'passenger',
    'patience',
    'patriotic',
    'peculiar',
    'perfection',
    'performance',
    'permanent',
    'permission',
    'persuade',
    'persuasion',
    'photograph',
    'photography',
    'pleasant',
    'pleasure',
    'political',
    'politician',
    'politics',
    'population',
    'position',
    'possession',
    'possessor',
    'possible',
    'postpone',
    'practical',
    'practice',
    'precious',
    'preference',
    'prejudice',
    'presence',
    'preserve',
    'president',
    'pressure',
    'pretense',
    'prevention',
    'probable',
    'procession',
    'production',
    'profession',
    'progress',
    'pronounce',
    'pronunciation',
    'property',
    'proposal',
    'protection',
    'punctual',
    'qualification',
    'quantity',
    'question',
    'railroad',
    'reasonable',
    'recognition',
    'recognize',
    'recommend',
    'reduction',
    'reference',
    'reflection',
    'relation',
    'relative',
    'religion',
    'remember',
    'repetition',
    'represent',
    'representative',
    'reproduce',
    'reproduction',
    'republic',
    'reputation',
    'resistance',
    'responsible',
    'restaurant',
    'sacrifice',
    'salesman',
    'satisfaction',
    'satisfactory',
    'scientific',
    'scientist',
    'scissors',
    'secretary',
    'sensitive',
    'sentence',
    'separate',
    'separation',
    'shilling',
    'shoulder',
    'signature',
    'simplicity',
    'situation',
    'slippery',
    'solution',
    'somebody',
    'something',
    'sometime',
    'sometimes',
    'somewhere',
    'splendid',
    'standard',
    'stocking',
    'straight',
    'straighten',
    'strength',
    'strengthen',
    'struggle',
    'substance',
    'suggestion',
    'surprise',
    'surround',
    'suspicion',
    'suspicious',
    'sympathetic',
    'sympathy',
    'telegraph',
    'telephone',
    'temperature',
    'terrible',
    'theatrical',
    'therefore',
    'thorough',
    'threaten',
    'together',
    'tomorrow',
    'translate',
    'translation',
    'translator',
    'treasure',
    'treasury',
    'umbrella',
    'underneath',
    'understand',
    'universal',
    'universe',
    'university',
    'uppermost',
    'valuable',
    'violence',
    'whatever',
    'whenever',
    'wherever',
    'whichever',
    'yesterday'];

const alphabet = [...'abcdefghijklmnopqrstuvwxyz'].map((letter) => ({
    letter,
    clicked: false,
}));

const Game = ({ username, onBackClick }) => {
    //generate random word and store in the state
    userName = username;
    const [randomWord, setRandomWord] = useState(() => {
        const randomIndex = Math.floor(Math.random() * randomWords.length);
        return randomWords[randomIndex];
    });

    console.log(randomWord)

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

    const [score, setScore] = useState(1000);

    const [finalScore, setFinalScore] = useState(0);

    const [correctLetter, setCorrectLetter] = useState(false)

    const [wrongLetter, setWrongLetter] = useState(false)


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
                setCorrectLetter(true)
                setWrongLetter(false)
            }
        }
        setWordState(newWordState);

        if (!correctGuess) {
            setCorrectLetter(false)
            setWrongLetter(true)
            setScore((prevScore) => prevScore - 100);
            setGuesses(guesses + 1);
            console.log(guesses);
            if(guesses>=5)
            {
              setScore(0);
            }
        } else if (!newWordState.includes(null)) {
            // setFinalScore(finalScore+score);
            setIsCorrectGuess(true);
        } else {
            for (let i = 0; i < randomWord.length; i++) {
                if (randomWord[i] === letter) {
                    newWordState[i] = letter;
                }
            }
            setWordState(newWordState);
        }

    }

    //if user guesses the word correctly a new word will be generated after 2 seconds
    useEffect(() => {
        if (isCorrectGuess) {
          // update score in the database
          setFinalScore((prevScore)=>prevScore+score);
          const timeoutId = setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * randomWords.length);
            setRandomWord(randomWords[randomIndex]);
            setClickedLetters(alphabet);
            setWordState(Array(randomWords[randomIndex].length).fill(null));
            setGuesses(0);
            setIsCorrectGuess(false);
            setFinalScore(finalScore+score);
            setScore(1000);
          }, 2000);
          
          return () => clearTimeout(timeoutId);
        }
      }
      , [isCorrectGuess, randomWords]);

    //when user clicks exit save the current total score/ cumulative score and exit
    function onClickExit() {
        db.collection("scores").add({
          Name: username,
          sc: finalScore,
        }).then(() => {
            onBackClick();
        }).catch((error) => {
            console.log("Error saving score:", error);
        });
    }

    return (
        <div>
            <h1>Hello, {username}!</h1>
            <p>Guess the word:</p>
            <p>Current Score: {score}</p>
            <p>Total Score:{finalScore}</p>
            {guesses>=6 ?<p>{randomWord}</p>:<p>
                {wordState.map((letter, index) => (
                    <span key={index} className="letter">
                        {letter ? `${letter} ` : '_ '}
                    </span>
                ))}
            </p>}
            <div>
                <button onClick={onClickExit}>Exit</button>
                <div className="topSection">
                    <p>Current Score: {score}</p>
                    <p>Your Score:0</p>
                </div>
            </div>
            <div className="gameContainer">
                <h1>Hello, {username}!</h1>
                <p>Guess the word:</p>
                {guesses >= 6 ? <p>{randomWord}</p> : <p>
                    {wordState.map((letter, index) => (
                        <span key={index} className="letter">
                            {letter ? `${letter} ` : '_ '}
                        </span>
                    ))}
                </p>}
                <div>
                    {clickedLetters.map((letterObj) => (
                        <button
                            key={letterObj.letter}
                            //disabled={letterObj.clicked || guesses >= 6 || isCorrectGuess}
                            onClick={() => handleLetterClick(letterObj.letter)}
                            className={`letter-button ${
                                letterObj.clicked 
                                  ? correctLetter ? 'enabled-button' : wrongLetter?'disabled-button': letter-button
                                  : 'initial-button'
                              }`}
                            //className={`letter-button ${letterObj.clicked || guesses >= 6 || isCorrectGuess ? "disabled-button" : "enabled-button"}`}
                            //className={
                                //letterObj.clicked ? (correctLetter?'enabled-button':wrongLetter?'disabled-button'):'letter-button'
                             // }
                        >
                            {letterObj.letter}
                        </button>
                    ))}
                </div>
                {isCorrectGuess && <p>Correct <br /> Your Score: {score}</p>}
                {guesses >= 6 && <div> <p>InCorrect!! Game Over <br /> Your Score: {score}</p> <button onClick={onBackClick}>Play Again</button></div>}
            </div>
            <button onClick={onClickExit}>Exit</button>
            {isCorrectGuess && <p>Correct <br/> Your Score: {score}</p>}
            {guesses >= 6 &&<div> <p>InCorrect!! Game Over <br/> Your Score: {finalScore}</p> <button onClick={onBackClick}>Play Again</button></div>}
        </div>
    );

};

export default Game;