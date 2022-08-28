import React from 'react';
import './App.css';
import topBigBlob from './images/top-big-blob.png'
import topSmallBlob from './images/top-small-blob.png'
import bottomBigBlob from './images/bottom-big-blob.png'
import bottomSmallBlob from './images/bottom-small-blob.png'
import Intro from './components/Intro/Intro';
import Quiz from './components/Quiz/Quiz';

function generateAnswers(wrongArr, rightAns) {
  const randomIndex = Math.floor(Math.random() * (wrongArr.length + 1));
  const allAnswers = [...wrongArr];
  allAnswers.splice(randomIndex, 0, rightAns);
  return allAnswers;
}

function App() {

  const [isStarted, setIsStarted] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [playAgain, setPlayAgain] = React.useState(true);

  React.useEffect( () => {
    if (playAgain) {
      fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&encode=url3986')
        .then(res => res.json())
        .then(({results}) => setData(
          results.map(result => {
            return {
              allAnswers: generateAnswers(result.incorrect_answers, result.correct_answer),
              correctAnswer: result.correct_answer,
              question: result.question,
              selectedOption: ""
            };
          })  
        ));
      setPlayAgain(false)
    }
  }, [playAgain]);

  const classes = `app ${isStarted ? 'app-quiz' : 'app-intro'}`;

  function startGame() {
    setIsStarted(true);
  }

  function newGame() {
    setPlayAgain(true);
  }

  return (
    <div className={classes}>
      {isStarted ? 
        <Quiz data={data} newGame={newGame} /> : 
        <Intro handleClick={startGame} />}
        <img src={isStarted ? topSmallBlob : topBigBlob} alt="" className="top__blob" />
        <img src={isStarted ? bottomSmallBlob : bottomBigBlob} alt="" className="bottom__blob" />
    </div>
  );
}

export default App;
