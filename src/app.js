import React, { useState, useEffect } from "react";
import "./app.css";

const App = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("O");
    const [winner, setWinner] = useState(null);
    const [gameEnded, setGameEnded] = useState(false);
    const [availableSquares, setAvailableSquares] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const [message, setMessage] = useState("בהצלחה")

    const checkForWinner = () => {
        const winningCombinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
    
        // Loop through the winning combinations
        for (let i = 0; i < winningCombinations.length; i++) {
          const [a, b, c] = winningCombinations[i];
          if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            setWinner(board[a]);
            setGameEnded(true);
            if (board[a] === "X") {
              setMessage("!ניצחת")
            } else {
              setMessage(":( ...לא ניצחת")
            }
            return true;
          }
        }
    
        function countNullFields(board) {
          return board.filter(field => field === null).length;
        }
        const tie = countNullFields(board);
        
        if (tie === 0) {
          setWinner("tie");
          setGameEnded(true);
          setMessage("!תיקו")
          return true;
        }
    };
    
    const handleClick = index => {
      //console.log(board)
      //console.log(index)
      //fetch('http://192.168.1.147:3001/tictactoe', {
      //  method: 'POST',
      //  headers: {
      //    'Content-Type': 'application/json',
      //  },
      //  body: JSON.stringify({
      //    prompt: board,
      //    completion: index
      //  })
      //})
      //  .then(response => response.json())
      //  .then(response => {
      //    console.log(response);
      //  });

      if (board[index] || gameEnded) return;
      
      const updatedBoard = [...board];
      updatedBoard[index] = currentPlayer;
      setBoard(updatedBoard);
      
      const updatedAvailableSquares = availableSquares.filter(
        square => square !== index
        );
        setAvailableSquares(updatedAvailableSquares);

        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      };

    useEffect(() => {
      checkForWinner();
    }, [board]);
  
    useEffect(() => {
        const end = checkForWinner()
        if (currentPlayer === "O" && end !== true) {
          // Find all the available squares
          const availableSquares = board.reduce((acc, curr, index) => {
            if (curr === null) {
              acc.push(index);
            }
            return acc;
          }, []);
    
          if (availableSquares.length > 0) {
            // Pick a random square from the available squares
            const randomSquareIndex = availableSquares[Math.floor(Math.random() * availableSquares.length)];
    
            // Place an "O" on the board
            const updatedBoard = [...board];
            updatedBoard[randomSquareIndex] = "O";
            setBoard(updatedBoard);
            setCurrentPlayer("X");
          }
        }
    }, [board, currentPlayer]);
    
    return (
      <React.Fragment>
          <div className="mainContainer">
              <div className="board">
                  {board.map((square, index) => (
                      <div key={index} className="square" onClick={() => handleClick(index)}>{square}</div>
                  ))}
              </div>
              <div className="message" style={{ visibility: gameEnded ? "visible" : "hidden" }}>{message}</div>
              <div>
                <button className="playAgain" onClick={() => {window.location.reload()}}>משחק חדש</button>
              </div>
          </div>
      </React.Fragment>
    );
  };
  
  export default App;
  
