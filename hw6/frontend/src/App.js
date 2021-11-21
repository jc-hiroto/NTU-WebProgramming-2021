import './App.css';
import { useState } from 'react';
import {sendStart, sendGuess, sendRestart} from './axios';

function App() {
  
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');    


  const handleStart = async() => {
    const resp = await sendStart();
    if(resp.status === 200) {
      setHasStarted(true);
    }else {
      setStatus(resp);
    }
  };

  const handleGuess = async() => {
    console.log('handleGuess');
    try{
      const resp = await sendGuess(number);
      if (resp.data.status === 0) {
        setHasWon(true);
      }else{
        setStatus(resp.data.msg);
        setNumber('');
      }
    }catch(err){
      setStatus("Invalid guess. Number illegal. (Number should be in the range of 1 to 100)");
    }
  };
  const handleRestart = async() => {
    const resp = await sendRestart();
    if (resp.status === 200) {
      setHasWon(false);
      setHasStarted(true);
      setNumber('');
      setStatus('');
    }else{
      setStatus(resp);
    }
  };
  const startView = 
    <div>
      <button onClick={handleStart}>Start</button>
    </div>
  const gameView =
    <div>
      <p>Guess a Number between 1 to 100!</p>
      <input type="text" onChange={(e) => setNumber(e.target.value)}/>
      <button onClick={handleGuess} disabled={!number}>GUESS!</button>
      <p>{status}</p>
    </div>
  const winView =
    <div>
      <p>You Won! The number is {number}!</p>
      <button onClick={handleRestart}>Play Again</button>
    </div>
  const mainView = 
    <div>
      {hasWon ? winView : gameView}
    </div>
  return (
    <div className="App">
      {hasStarted ? mainView : startView}
    </div>
  );
}

export default App;
