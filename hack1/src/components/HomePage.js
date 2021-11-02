/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useState } from 'react';
import './css/HomePage.css';

{/* -- TODO 2 -- */}
const HomePage = ({startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */}) => {
    const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
    const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.
    const checkError = () => {
      if(mineNum > boardSize*boardSize) {
        setError(true);
      }
      else{
        setError(false);
      }
    }
    const renderControlPanel = () => {
      if (showPanel) {
            return (
                <div className="controlWrapper">
                    <div className="error" style={{color: 'darkred'}}>{error ? 'ERROR: Mines number and board size are invalid!' : ''}</div>
                    <div className="controlPanel">
                        <div className="controlCol">
                            <div className="controlTitle">Mines Number</div>
                            <input id="minenum-slider" type="range" min="1" max="50" defaultValue={mineNum} onChange={() => { mineNumOnChange(); checkError();}} />
                            <p className="controlNum" style={error? {color: 'darkred'}:{}}>{mineNum}</p>
                        </div>
                        <div className="controlCol">
                            <div className="controlTitle">Board Size (nxn)</div>
                            <input id="boardsize-slider" type="range" min="1" max="20" defaultValue={boardSize} onChange={() => { boardSizeOnChange(); checkError();}} />
                            <p className="controlNum" style={error? {color: 'darkred'}:{}}>{boardSize}</p>
                        </div>
                    </div>
                </div>
            );
        }else{
            return null;
        }
    }  

    return(
      <div className="mineSweeper">
      <div className = 'HomeWrapper'>
          <p className = 'title'>MineSweeper</p>
          <button className = 'btn' onClick={error? null:startGameOnClick}>Start Game</button>
          <div className = 'controlContainer'>
            <button className = 'btn' onClick={() => setShowPanel(!showPanel)}>Difficulty Adjustment</button>
            {renderControlPanel()}
          </div>
          
            {/* -- TODO 6-2 -- */}
            {/* Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> */}
            {/* Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' */}
            {/* Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
            
        </div>
      </div>
    );

}
export default HomePage;   