import React, { useState } from 'react'
import Board from './Board'
import styled from 'styled-components'

const Game = () =>  {

  const [grid, setGrid] = useState(createGrid())

  console.log({grid})

  return (
    <GameStyled>
      <Board grid={grid}/>
    </GameStyled>
  )

}

const createGrid = () => {
  return [...Array(11)].map(() => Array(10).fill({
    value: 0,
    open: false,
    flagged: false
  }))
}

export default Game

const GameStyled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
