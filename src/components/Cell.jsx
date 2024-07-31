import styled from 'styled-components'

export default function Cells({onClick, onContextMenu, value, mine, clicked, flagged}) {

  let displayValue = '';
  if (clicked) {
    if (mine) {
      displayValue = '💣';
    } else {
      if (value === 0) {
        displayValue = ''
      } else {
        displayValue = value;
      }
    }
  } else if (flagged) {
    displayValue = '🚩';
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    onContextMenu()
  }

  return (
    <CellStyled onClick={onClick} onContextMenu={handleContextMenu} clicked={clicked}>
      {displayValue}
    </CellStyled>
  )
}

const CellStyled = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid white;
  background-color: ${({ clicked }) => clicked ? '#fcf6bd' : '#d0f4de'};
`;
