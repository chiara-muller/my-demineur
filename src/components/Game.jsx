import React, { useState } from 'react'
import styled from 'styled-components'
import Board from './Board'

const Game = () =>  {

  const [rows, setRows] = useState(10)
  const [cols, setCols] = useState(10)
  const [mines, setMines] = useState(10)
  const [gameOver, setGameOver] = useState(false)
  const [grid, setGrid] = useState(createGrid(rows, cols, mines))

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setGrid(createGrid(rows, cols, mines))
  }

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

  const handleCellClicked = (row, col) => {
    if (gameOver || grid[row][col].clicked || grid[row][col].flagged) return;

    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[row][col].clicked = true;

    if (newGrid[row][col].mine) {
      setGameOver(true);
      setGrid(revealAllMines(newGrid));
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

  return (
    <GameStyled>
      <form onSubmit={handleFormSubmit}>
        <label>Nombre de ligne:</label>
        <input type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))}/>
        <label>Nombre de colonne:</label>
        <input type="number" value={cols} onChange={(e) => setCols(Number(e.target.value))}/>
        <label>Nombre de mine:</label>
        <input type="number" value={mines} onChange={(e) => setMines(Number(e.target.value))}/>
        <button type="submit">Crée ta grille</button>
      </form>
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

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
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

  form {
    display: flex;
    flex-direction: column;
  }
`;
