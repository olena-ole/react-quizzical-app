import React from 'react';
import './App.css';
import topBigBlob from './images/top-big-blob.png'
import topSmallBlob from './images/top-small-blob.png'
import bottomBigBlob from './images/bottom-big-blob.png'
import bottomSmallBlob from './images/bottom-small-blob.png'
import Intro from './components/Intro/Intro';
import Quiz from './components/Quiz/Quiz';

function App() {

  const [isStarted, setIsStarted] = React.useState(false);
  const classes = `app ${isStarted ? 'app-quiz' : 'app-intro'}`;

  function startGame() {
    setIsStarted(true);
  }

  return (
    <div className={classes}>
      {isStarted ? 
        <Quiz /> : 
        <Intro handleClick={startGame} />}
        <img src={isStarted ? topSmallBlob : topBigBlob} alt="" className="top__blob" />
        <img src={isStarted ? bottomSmallBlob : bottomBigBlob} alt="" className="bottom__blob" />
    </div>
  );
}

export default App;
