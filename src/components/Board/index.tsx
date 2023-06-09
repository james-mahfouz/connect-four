import React, { useState } from "react";
import Slot from "../Slot";

const Board: React.FC = () => {
  const [board, setBoard] = useState<string[][]>([
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);

  const [currPlayer, setCurrPlayer] = useState<"player1" | "player2">(
    "player1"
  );
  const [oppPlayer, setOppPlayer] = useState<"player1" | "player2">("player2");
  const [gameOver, setGameOver] = useState(false);

  const updateBoard = (
    row: number,
    column: number,
    player: string
  ): boolean => {
    setBoard((prev) => {
      const boardCopy = [...prev];
      boardCopy[row][column] = player;
      return boardCopy;
    });
    return checkWin(row, column, player);
  };

  const checkWin = (row: number, column: number, player: string): boolean => {
    const directions: [number, number][] = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      let nextRow;
      let nextColumn;
      let flag = 0;

      let i = 1;
      while (i <= 3) {
        if (flag === 0) {
          nextRow = row + i * dx;
          nextColumn = column + i * dy;
        } else {
          nextRow = row - i * dx;
          nextColumn = column - i * dy;
        }

        if (
          nextRow < 0 ||
          nextRow >= board.length ||
          nextColumn < 0 ||
          nextColumn >= board[0].length ||
          board[nextRow][nextColumn] !== player
        ) {
          if (flag === 0) {
            flag = 1;
            i = 1;
            continue;
          } else {
            break;
          }
        }
        i++;
        count++;
      }
      if (count === 4) {
        return true;
      }
    }

    return false;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const column = parseInt(e.target.getAttribute("x"));
    let row = board.findIndex(
      (rowArr, index) => rowArr[column] !== "" || index === board.length - 1
    );
    if (row !== board.length - 1) row -= 1;
    if (board[row][column] !== "") row -= 1;

    setGameOver(updateBoard(row, column, currPlayer));

    if (!gameOver) {
      const currPlayerCopy = currPlayer;
      setCurrPlayer(oppPlayer);
      setOppPlayer(currPlayerCopy);
    }
  };

  return (
    <>
      {gameOver && (
        <h1>Game Over! {oppPlayer === "player1" ? "Red" : "Black"} Wins!</h1>
      )}

      <h2 id="playerDisplay">{currPlayer === "player1" ? "Red" : "Black"}</h2>
      <div id="board" onClick={gameOver ? undefined : handleClick}>
        {board.map((row, i) =>
          row.map((player, j) => (
            <Slot key={`${i}-${j}`} player={player} y={i} x={j} />
          ))
        )}
      </div>
    </>
  );
};

export default Board;
