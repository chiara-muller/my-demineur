import React, { useState } from 'react'
import styled from 'styled-components'

export default function Cells({value, clicked, flagged}) {

  const [cell, setCell] = useState('')

  const handleClick = () => {
    if (clicked) {
      setCell(value)
    } else if (flagged) {
      setCell('🚩')
    }
  }

  return (
    <CellStyled onClick={handleClick}>
      {cell}
    </CellStyled>
  )
}

const CellStyled = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid black;
  background-color: grey;
`;
