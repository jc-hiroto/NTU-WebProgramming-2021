/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
  board[x][y].revealed = true;
  board[x][y].flagged = false;
  if(board[x][y].value === "💣") {
    console.log("You Lose!");
    return {board, newNonMinesCount, gameOver: true};
  }else{
    newNonMinesCount--;
  }
  if(board[x][y].value === 0) {
    for(let i = -1; i <= 1; i++) {
      for(let j = -1; j <= 1; j++) {
        if(x + i >= 0 && x + i < board.length && y + j >= 0 && y + j < board[0].length) {
          if(!board[x + i][y + j].revealed && !board[x + i][y + j].flagged) {
            newNonMinesCount = revealed(board, x + i, y + j, newNonMinesCount).newNonMinesCount;
          }
        }
      }
    }
  }
  return {board, newNonMinesCount, gameOver: false};
};
