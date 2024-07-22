import React from 'react'
import Cell from './Cell'
import styled from 'styled-components';

export default function Board ({grid}) {

  return (
    <BoardStyled>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              value={cell.value}
              open={cell.open}
              flagged={cell.flagged}
            />
          ))}
        </div>
      ))}

    </BoardStyled>
  )
}

const BoardStyled = styled.div`
  display: flex;
  width: 300px;
  border: 2px solid black;
`;
