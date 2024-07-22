import React, { useState } from 'react'
import Board from './Board'
import styled from 'styled-components'

const Game = () =>  {

  const [rows, setRows] = useState(10)
  const [cols, setCols] = useState(10)
  const [grid, setGrid] = useState(createGrid(rows, cols))

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setGrid(createGrid(rows, cols))
  }

  return (
    <GameStyled>
      <form onSubmit={handleFormSubmit}>
        <input type="number" placeholder="Nombre de ligne" value={rows} onChange={(e) => setRows(Number(e.target.value))}/>
        <input type="number" placeholder="Nombre de colonne" value={cols} onChange={(e) => setCols(Number(e.target.value))}/>
        <button type="submit">Crée ta grille</button>
      </form>
      <Board grid={grid}/>
    </GameStyled>
  )

}

const createGrid = (rows, cols) => {
  return [...Array(rows)].map(() => Array(cols).fill({
    value: 0,
    clicked: false,
    flagged: false
  }))
}

export default Game

const GameStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
