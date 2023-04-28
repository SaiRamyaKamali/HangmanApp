import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import correctSound from "../public/sounds/correctSound.wav";
import errorSound from "../public/sounds/errorSound.mp3";
import winSound from "../public/sounds/winSound.mp3";
import lostSound from '../public/sounds/lostSound.wav'
import image_0 from '../public/images/image_0.jpg';
import image_1 from '../public/images/image_1.jpg';
import image_2 from '../public/images/image_2.jpg';
import image_3 from '../public/images/image_3.jpg';
import image_4 from '../public/images/image_4.jpg';
import image_5 from '../public/images/image_5.jpg';
import image_7 from '../public/images/image_7.jpg';

import db from '../firebase';
import { useEffect } from "react";
import './index.css';


var userName = "";
const words = ['absolute',
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

const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map((letter) => ({
    letter,
    clicked: false,
}));

const randomWords = words.map(each => each.toUpperCase());


const images = [image_0, image_1, image_2, image_3, image_4, image_5, image_7];
console.log('1st image')
console.log(images[0])

const Game = ({ username, customWord, onBackClick }) => {
    //generate random word and store in the state
    userName = username;
    console.log("Test " + customWord);
    const [randomWord, setRandomWord] = useState(() => {
        if (customWord) {
            return customWord.toUpperCase();
        }
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

    const [currentImage, setCurrentImage] = useState(images[0].src);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    function playCorrectSound() {
        console.log('playing correct sound')
        const audio = new Audio(correctSound)
        audio.play();
    }

    function playErrorSound() {
        console.log('playing correct sound')
        const audio = new Audio(errorSound)
        audio.play();
    }

    function playWinSound() {
        console.log('playing correct sound')
        const audio = new Audio(winSound)
        audio.play();
    }

    function playLostSound() {
        console.log('playing correct sound')
        const audio = new Audio(lostSound)
        audio.play();
    }

    useEffect(() => {
        if (isCorrectGuess) {
            playWinSound();
        }
    }, [isCorrectGuess]);

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
                playCorrectSound();
            }
        }
        setWordState(newWordState);

        if (!correctGuess) {
            playErrorSound();
            setScore((prevScore) => prevScore - 100);
            setGuesses(guesses + 1);
            setCurrentImage(images[guesses + 1].src)
            console.log(guesses);
        } else if (!newWordState.includes(null)) {
            // setFinalScore(finalScore+score);
            setIsCorrectGuess(true);
        }
    }

    //if user guesses the word correctly a new word will be generated after 2 seconds
    useEffect(() => {
        if (isCorrectGuess) {
            // update score in the database
            setFinalScore((prevScore) => prevScore + score);
            if(customWord=="")
            {
            const timeoutId = setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * randomWords.length);
                setRandomWord(randomWords[randomIndex]);
                setClickedLetters(alphabet);
                setWordState(Array(randomWords[randomIndex].length).fill(null));
                setGuesses(0);
                setIsCorrectGuess(false);
                setFinalScore(finalScore + score);
                setScore(1000);
                setCurrentImage(images[0].src);
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
        }
    }
        , [isCorrectGuess, randomWords]);

    //when game is over the score is automatically updated
    useEffect(() => {
        if (guesses >= 6) {
            setFinalScore(finalScore + score);
            playLostSound();
            // update score in the database
            console.log("final Scoring"+finalScore);
            db.collection("scores").add({
                Name: username,
                sc: finalScore+score,
            });
        }
    }, [guesses]);

    function onClickExit() {
        const confirmed = window.confirm("Your Score will not be saved until you finish the game. Are you sure you want to exit?");

        if (confirmed) {
            onBackClick();
        }
    } 
    function handleClick()
    {
        const url = new URL(window.location.href);
        url.searchParams.delete('word');
        window.history.replaceState({}, '', url.toString());
        onBackClick();
    }
    return (
        <div className="game-page-bg">
            <div>
                <div className="leader-board-exit-container">
                    <button onClick={onClickExit} className='exit-button'> <FontAwesomeIcon icon={faTimes} className="exit-icon" /></button>
                </div>
                <div className="topSection">
                    <p className="current-score">Current Score: <span className="score">{score}</span></p>
                    <p className="your-score">Total Score: <span className="final-score">{finalScore}</span></p>
                </div>
            </div>
            <div className="gameContainer">
                <h1 className="greeting">Hello, {username}!</h1>
                <p className="guessWord">Guess the word:</p>
                {guesses >= 6 ? <p className="game-over">{randomWord}</p> : <p>
                    {wordState.map((letter, index) => (
                        <span key={index} className="letter">
                            {letter ? `${letter} ` : '_ '}
                        </span>
                    ))}
                </p>}
                {isCorrectGuess && <p className="correct-message">Correct <br /> Your Score: {finalScore}</p>}
                {customWord&&(isCorrectGuess)&&<button className="playAgain-button" onClick={handleClick}>Continue Playing</button>}
                {customWord&&(guesses >= 6)&&<button className="playAgain-button" onClick={handleClick}>Continue Playing</button>}
                {!customWord&&guesses >= 6 && <div className="gameover-container"> <p className="gameover-message">InCorrect!! Game Over <br /> Your Score: {finalScore}</p> <button onClick={onBackClick} className="playAgain-button">Play Again</button></div>}
                <div className="image-button-container">
                    <div>
                        <img src={currentImage} className="image-hangman" />
                    </div>
                    <div className='buttons-container'>
                        {clickedLetters.map((letterObj) => (
                            <button
                                key={letterObj.letter}
                                disabled={letterObj.clicked || guesses >= 6 || isCorrectGuess}
                                onClick={() => handleLetterClick(letterObj.letter)}
                                className={isCorrectGuess ? 'enabled-button' : guesses >= 6 ? 'disabled-button' : letterObj.clicked ? randomWord.includes(letterObj.letter) ? "enabled-button" : "disabled-button" : "letter-button"}
                            >
                                {letterObj.letter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );

};

export default Game;