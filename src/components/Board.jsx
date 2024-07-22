import React from 'react'
import Cell from './Cell'
import styled from 'styled-components';

export default function Board ({grid, onCellClicked, onCellContextMenu}) {

  return (
    <BoardStyled>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              value={cell.value}
              clicked={cell.clicked}
              flagged={cell.flagged}
              onClick={() => onCellClicked(rowIndex, colIndex)}
              onContextMenu={() => onCellContextMenu(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}

    </BoardStyled>
  )
}

const BoardStyled = styled.div`
  display: inline-flex;
  border: 2px solid black;
`;
