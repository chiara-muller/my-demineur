import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Board from './Board'

const createGrid = (rows, cols, mines) => {
  let grid = [...Array(rows)].map(() =>
      Array(cols).fill().map(() => ({
          value: 0,
          clicked: false,
          flagged: false,
          mine: false,
      }))
  );

  let minesToPlace = mines;
  while (minesToPlace > 0) {
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * cols);

    if (!grid[row][col].mine) {
      grid[row][col].mine = true;
      minesToPlace--;
    }
  }

  const updateAdjacentCells = (grid, row, col) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let newRow = row + i;
        let newCol = col + j;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !(i === 0 && j === 0)) {
          grid[newRow][newCol].value++;
        }
      }
    }
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j].mine) {
        updateAdjacentCells(grid, i, j);
      }
    }
  }

  return grid;
}

const Game = () =>  {

  const [rows, setRows] = useState(12)
  const [cols, setCols] = useState(10)
  const [mines, setMines] = useState(10)
  const [gameOver, setGameOver] = useState(false)
  const [grid, setGrid] = useState(createGrid(rows, cols, mines))
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval;
    if (isRunning && !gameOver) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1)
      }, 1000)
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning, gameOver])

  useEffect(() => {
    setIsRunning(true)
  }, [])


  const revealAllMines = (grid) => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        if (newGrid[i][j].mine) {
          newGrid[i][j].clicked = true;
        }
      }
    }
    return newGrid;
  };

  const revealAdjacentCells = (grid, row, col) => {
    const stack = [[row, col]];
    const newGrid = JSON.parse(JSON.stringify(grid));

    while (stack.length > 0) {
      const [currentRow, currentCol] = stack.pop();
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = currentRow + i;
          const newCol = currentCol + j;
          if (
            newRow >= 0 && newRow < newGrid.length &&
            newCol >= 0 && newCol < newGrid[0].length &&
            !newGrid[newRow][newCol].clicked &&
            !newGrid[newRow][newCol].flagged
          ) {
            newGrid[newRow][newCol].clicked = true;
            if (newGrid[newRow][newCol].value === 0 && !newGrid[newRow][newCol].mine) {
              stack.push([newRow, newCol]);
            }
          }
        }
      }
    }
    return newGrid;
  };

  const handleCellClicked = (row, col) => {
    if (gameOver || grid[row][col].clicked || grid[row][col].flagged) return;

    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[row][col].clicked = true;

    if (newGrid[row][col].mine) {
      setGameOver(true);
      setGrid(revealAllMines(newGrid));
    } else if (newGrid[row][col].value === 0) {
      newGrid = revealAdjacentCells(newGrid, row, col);
      setGrid(newGrid);
    } else {
      setGrid(newGrid);
    }
  };

  const handleCellContextMenu = (row, col) => {
    if (gameOver || grid[row][col].clicked) return;
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[row][col].flagged = !newGrid[row][col].flagged;
    setGrid(newGrid);
  }

  const onGameSettings = (newRows, newCols, newMines) => {
    setRows(newRows);
    setCols(newCols);
    setMines(newMines);
    setGrid(createGrid(newRows, newCols, newMines));
    setGameOver(false);
    setTimer(0)
    setIsRunning(true)
  }

  const onRefreshClick = () => {
    setGrid(createGrid(rows, cols, mines));
    setGameOver(false);
    setTimer(0)
    setIsRunning(true)
  }

  return (
    <GameStyled>
      <div className="game-container">
        <div className="head-container">
          <p>{mines + " " + "💣"}</p>
          <button className="refresh-button" onClick={onRefreshClick}>{gameOver ? "🫠": "🥸"}</button>
          <div>{timer}s</div>
        </div>
      <Board
        grid={grid}
        onCellClicked={handleCellClicked}
        onCellContextMenu={handleCellContextMenu}
      />
      <div className="button-container">
        <button onClick={() => onGameSettings(12, 10, 10)}>Easy</button>
        <button onClick={() => onGameSettings(20, 20, 40)}>Medium</button>
        <button onClick={() => onGameSettings(30, 16, 99)}>Hard</button>
      </div>
      </div>
    </GameStyled>
  )
}

export default Game

const GameStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .game-container {
    background-color: #a9def9;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .head-container {
    padding: 20px 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 40px;

    div {
      width: 30px;
    }
  }

  .button-container {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    gap: 10px;
     button {
      cursor: pointer;
      width: 100px;
      height: 30px;
      border: 3px solid #fcf6bd;
      border-radius: 30px;
      background-color: #ff99c8;
     }
  }

  .refresh-button {
    cursor: pointer;
    font-size: 30px;
    border: 3px solid #fcf6bd;
    background-color: #ff99c8;
    width: 70px;
    height: 60px;
    border-radius: 20px;
  }
`;
