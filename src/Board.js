import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=3, ncols=3, chanceLightStartsOn=0.25 }) {
  const [board, setBoard] = useState(createBoard());

  console.log("BOARD WITH", board);
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {

    return Array.from(
      {length: nrows},
      () => Array.from(
          {length: ncols},
          () => getRandomLight(chanceLightStartsOn)
        )
    );
  }

  /** Function returns true or false at percent chance from input float */
  function getRandomLight(chance) {
    return Math.random() < chance;
  }

  /** Function accepts a grid (an array of arrays) of booleans
   *  Function returns true if every cell/boolean is false
   *  And returns false if any cell/boolean is true
   */
  function hasWon(board) {
    for(let row of board){
      if(row.includes(true)) return false;
    }

    return true;
  }

  /**
   *  Function accepts coord string like '1-2'
   *  invokes setBoard to flip cell at given coord and all coord's around
   *  the cardinal directions
   */
  function flipCellsAround(coord) {
    console.log(`flipCellsAround(${coord})`);
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number); // sample input '1-2', then y=1, x=2

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const boardCopy = [...oldBoard];

      // in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy); //boardCopy mutated in place
      flipCell(y+1, x, boardCopy); //boardCopy mutated in place
      flipCell(y-1, x, boardCopy); //boardCopy mutated in place
      flipCell(y, x+1, boardCopy); //boardCopy mutated in place
      flipCell(y, x-1, boardCopy); //boardCopy mutated in place

      // return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO

  return (
    <div className="Board">
      {hasWon(board)
        ? <div>You have won the game!</div>
        :
        <table>
          <tbody>
            {board.map((row, y) => {
              return (<tr key={`${y}`}>
                {row.map((cell, x) => {
                  return (
                  <Cell
                    key={`${y}-${x}`}
                    isLit={board[y][x]}
                    flipCellsAroundMe={() => {
                      return flipCellsAround(`${y}-${x}`)}
                    }/>
                  )
                })}
              </tr>)
            })}
          </tbody>
        </table>
      }
    </div>
  )
}

export default Board;
