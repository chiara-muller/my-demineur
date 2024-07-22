import React, { useState } from 'react'
import styled from 'styled-components'

export default function Cells() {

  const [cell, setCell] = useState('')

  return (
    <CellStyled>
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
