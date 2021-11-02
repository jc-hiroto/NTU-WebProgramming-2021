/****************************************************************************
  FileName      [ Modal.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Modal component. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from "react";
import './css/Modal.css'

export default function Modal({restartGame, backToHome, win}){
    const [render, setRender] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setRender(true);
        }, 1000);
    }, []);

    return (
        <div className="modal">
            <div className="modalWrapper"></div>
            <div className="modalContent">
                <div className="modalResult">
                    {win ? "WIN" : "Game Over"}
                </div>
                <div className="modalBtnWrapper">
                    <button className="modalBtn" onClick={restartGame}>{win ? "New Game":"Try Again"}</button>
                    <button className="modalBtn" onClick={backToHome}>Back to Home</button>
                </div>
            </div>
            <div className="modalWrapper"></div>
        </div>
    );
}