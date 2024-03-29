import React, { useState, useEffect } from "react";
import Slot from "../Slot";
import PlayerName from "../PlayerNames";
import { motion } from "framer-motion";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { darken } from "polished";

import logo from "../../assets/logo.svg";
import red_smiley from "../../assets/red_smiley.svg";
import yellow_smiley from "../../assets/yellow_smiley.svg";

import { Button } from "@chakra-ui/react";

const Board: React.FC = () => {
  const { width, height } = useWindowSize();
  const [board, setBoard] = useState<string[][]>([
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);
  const [winningSlots, setWinningSlots] = useState<number[][]>([]);

  const [currPlayer, setCurrPlayer] = useState<"player1" | "player2">(
    "player1"
  );
  const [oppPlayer, setOppPlayer] = useState<"player1" | "player2">("player2");
  const [gameOver, setGameOver] = useState(false);

  const local_player1 = localStorage.getItem("player1");
  const [player1, setPlayer1] = useState(
    local_player1 == null ? "player1" : local_player1
  );

  const local_player2 = localStorage.getItem("player2");
  const [player2, setPlayer2] = useState(
    local_player2 == null ? "player2" : local_player2
  );

  let [player1Score, setPlayer1Score] = useState(0);
  let [player2Score, setPlayer2Score] = useState(0);

  const [colorTurn, setColorTurn] = useState(
    currPlayer === "player1" ? "#FFCF5B" : "#FF4380"
  );
  const [footerColor, setFooterColor] = useState("#0F61E7");

  useEffect(() => {
    if (!gameOver) {
      setColorTurn(currPlayer === "player1" ? "#FFCF5B" : "#FF4380");
    }
  }, [currPlayer]);
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
    const slots: number[][] = [];
    slots.push([row, column]);

    for (const [dx, dy] of directions) {
      const slots: number[][] = [];
      slots.push([row, column]);

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
        slots.push([nextRow, nextColumn]);
        i++;
        count++;
      }
      if (count === 4) {
        setWinningSlots(slots);
        if (currPlayer === "player1") {
          setPlayer1Score((player1Score += 1));
          setFooterColor("#FFCF5B");
          speakWinning(player1);
        } else {
          setPlayer2Score((player2Score += 1));
          setFooterColor("#FF4380");
          speakWinning(player2);
        }
        return true;
      }
    }

    return false;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameOver) return;
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

  const handleChangeNames = () => {
    setPlayer1(localStorage.getItem("player1"));
    setPlayer2(localStorage.getItem("player2"));
  };

  const handleRestart = () => {
    setBoard([
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ]);
    setGameOver(false);
    setWinningSlots([]);
    setFooterColor("#0F61E7");
    setColorTurn(currPlayer === "player1" ? "#FFCF5B" : "#FF4380");
  };

  const speakWinning = (winner) => {
    const speechText = `${winner} is the winner!`;

    const utterance = new SpeechSynthesisUtterance(speechText);

    speechSynthesis.speak(utterance);
  };

  return (
    <div className="game-body">
      {gameOver && <Confetti width={width} height={height} />}
      <div className="navbar">
        <div>
          <PlayerName activateFunction={handleChangeNames} />
        </div>
        <div>
          <img src={logo} alt="" />
        </div>
        <div>
          <Button
            onClick={handleRestart}
            bg="rgb(235, 190, 70)"
            color="#fff"
            _hover={{
              bg: darken(0.1, "rgb(235, 190, 70)"),
            }}
          >
            Restart Game
          </Button>
        </div>
      </div>

      <div className="players">
        <div className="player yellow-player">
          <div className="yellow-smiley">
            <img src={yellow_smiley} alt="" />
          </div>
          <div>{player1}</div>
          <div className="yell-score">{player1Score}</div>
        </div>
        <div className="player-turn" style={{ backgroundColor: colorTurn }}>
          {gameOver && (
            <h2>
              Game Over!
              <br /> {oppPlayer === "player1" ? player1 : player2} Wins!
            </h2>
          )}
          {!gameOver && (
            <h2 className="playerDisplay">
              {currPlayer === "player1" ? player1 : player2}'s Turn
            </h2>
          )}
        </div>
        <div className="player red-player">
          <div className="red-score">{player2Score}</div>
          <div>{player2}</div>
          <div className="red-smiley">
            <img src={red_smiley} alt="" />
          </div>
        </div>
      </div>

      <div className="board" onClick={gameOver ? undefined : handleClick}>
        {board.map((row, i) => (
          <div className="row" key={i}>
            {row.map((player, j) => {
              const isWinningSlot = winningSlots.some(
                ([row, column]) => row === i && column === j
              );
              return (
                <div className="slot-div" key={j}>
                  <motion.div
                    className={`slot ${isWinningSlot ? "winning-slot" : ""}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Slot player={player} y={i} x={j} />
                  </motion.div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div
        className="game-footer"
        style={{ backgroundColor: footerColor }}
      ></div>
    </div>
  );
};

export default Board;
