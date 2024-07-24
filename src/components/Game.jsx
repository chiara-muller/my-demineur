import React, { useState } from 'react'
import Board from './Board'
import styled from 'styled-components'

const Game = () =>  {

  const [rows, setRows] = useState(10)
  const [cols, setCols] = useState(10)
  const [mines, setMines] = useState(10)
  const [grid, setGrid] = useState(createGrid(rows, cols, mines))

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setGrid(createGrid(rows, cols, mines))
  }

  const handleCellClicked = (row, col) => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[row][col].clicked || newGrid[row][col].flagged) return;
    newGrid[row][col].clicked = true;
    setGrid(newGrid);
  }

  const handleCellContextMenu = (row, col) => {
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

    console.log(row)
    if (!grid[row][col].mine) {
      grid[row][col].mine = true;
      minesToPlace--;
    }
  }

  console.log(grid);
  return grid;
}

export default Game

const GameStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
