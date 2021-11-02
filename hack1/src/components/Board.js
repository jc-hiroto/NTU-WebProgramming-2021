/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import './css/Board.css'


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(0);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(10);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        setBoard(createBoard(boardSize, mineNum).board);
        setMineLocations(createBoard(boardSize, mineNum).mineLocations);
        setNonMineCount(boardSize * boardSize - mineNum);
        setRemainFlagNum(mineNum);
        setGameOver(false);
        setWin(false);
    }

    const restartGame = () => {
        freshBoard();
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        
        if(!board[x][y].revealed){    
            var prevBoard = board.map(function(arr) {
                return arr.slice();
            });
            if(!board[x][y].flagged && remainFlagNum > 0) {
                prevBoard[x][y].flagged = true;
                setRemainFlagNum(remainFlagNum - 1);
            }else if(board[x][y].flagged) {
                prevBoard[x][y].flagged = false;
                setRemainFlagNum(remainFlagNum + 1);
            }
            setBoard(prevBoard);
            console.log(board);
        }


        {/* -- TODO 3-2 -- */}
        {/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */}
        {/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */}
        {/* Reminder: The cell can be flagged only when it is not revealed. */}
        
    };

    const revealCell = (x, y) => {
        if (board[x][y].flagged || board[x][y].revealed) {
            return;
        }
        const r = revealed(board, x, y, nonMineCount)
        setBoard(r.board);
        setNonMineCount(r.newNonMinesCount);
        setGameOver(r.gameOver);
        if(nonMineCount === 1 && board[x][y].value !== '💣') {
            setWin(true);
        }
        console.log(nonMineCount);
        {/* -- TODO 4-1 -- */}
        {/* Reveal the cell */}
        {/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */}
        {/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */}
        
    };

    const modalRenderer = () => { 
        if (gameOver || win) {
            return (
                <Modal restartGame = {restartGame} backToHome = {backToHome} gameOver = {gameOver} win = {win}/>
            );
        }
    }
    return(
        <div className = 'boardPage' >
            <div className = 'boardWrapper' >
            {modalRenderer()}
                <div className = 'boardContainer'>
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}/>
                    {board.map((row, x) => {
                        return (
                            <div id={"row"+x} style={{display: 'flex'}}>
                                {row.map((cell, y) => {
                                    const detail = {
                                        x,
                                        y,
                                        value: cell.value,
                                        revealed: cell.revealed,
                                        flagged: cell.flagged
                                    }
                                    return (
                                        <Cell rowIdx={x} colIdx={y} detail={detail} updateFlag={updateFlag} revealCell={revealCell}/>
                                    )
                                })}
                            </div>
                        )
                        })
                    }
                </div>
            
            {/* -- TODO 3-1 -- */}
            {/* Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.  */}
            {/* Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
            
            </div>
        </div>
    ); 

    

}

export default Board