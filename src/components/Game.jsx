import React, { useState } from 'react'
import styled from 'styled-components'
import Board from './Board'

const Game = () =>  {

  const [rows, setRows] = useState(10)
  const [cols, setCols] = useState(10)
  const [mines, setMines] = useState(10)
  const [gameOver, setGameOver] = useState(false)
  const [grid, setGrid] = useState(createGrid(rows, cols, mines))

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
  }

  const onRefreshClick = () => {
    setGrid(createGrid(rows, cols, mines));
    setGameOver(false);
  }

  return (
    <GameStyled>
      <div className="button-container">
        <button onClick={() => onGameSettings(10, 10, 10)}>Easy</button>
        <button onClick={() => onGameSettings(20, 20, 40)}>Medium</button>
        <button onClick={() => onGameSettings(30, 16, 99)}>Hard</button>
        <button onClick={onRefreshClick}>😵</button>
      </div>
      <Board
        grid={grid}
        onCellClicked={handleCellClicked}
        onCellContextMenu={handleCellContextMenu}
      />
    </GameStyled>
  )
}

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

export default Game

const GameStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .button-container {
    display: flex;
    flex-direction: column;
  }
`;
