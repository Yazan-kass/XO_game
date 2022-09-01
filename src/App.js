import "./App.css";
import { useState, useEffect } from "react";

const initialValue = ["", "", "", "", "", "", "", "", ""];

const stander = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [values, setValues] = useState(initialValue);
  const [turn, setTurn] = useState("O");
  const [info, setInfo] = useState({ winner: "none", state: "none" });

  useEffect(() => {
    if (info.state !== "none") {
      alert(`The Winner is: ${info.winner}`);
      setValues(initialValue);
    }
  }, [info]);

  useEffect(() => {
    checkWin();
    if (turn === "X") setTurn("O");
    else setTurn("X");
  }, [values]);

  const handleClick = (square) => {
    const cloneArr = values.map((val, idx) => {
      if (idx === square && val === "") {
        return turn;
      }

      return val;
    });
    setValues(cloneArr);
    const isFull = cloneArr.every((item) => item !== "");
    if (isFull) {
      alert("No winner!!!");
      setValues(initialValue);
    }
  };

  const checkWin = () => {
    stander.forEach((currStander) => {
      const firstTurn = values[currStander[0]];
      if (firstTurn === "") return;
      let foundWinningStander = true;
      currStander.forEach((idx) => {
        if (values[idx] !== firstTurn) {
          foundWinningStander = false;
        }
      });

      if (foundWinningStander) {
        setInfo({ winner: turn, state: "win" });
      }
    });
  };

  return (
    <div className="container">
      {values.map((cell, cellIndex) => (
        <div
          className="req"
          key={String("index" + cellIndex)}
          onClick={() => handleClick(cellIndex)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
}

export default App;
