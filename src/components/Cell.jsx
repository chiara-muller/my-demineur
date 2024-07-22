import styled from 'styled-components'

export default function Cells({onClick, onContextMenu, value, clicked, flagged}) {

  let displayValue = '';
  if (clicked) {
      displayValue = value;
  } else if (flagged) {
      displayValue = '🚩';
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    onContextMenu()
  }

  return (
    <CellStyled onClick={onClick} onContextMenu={handleContextMenu}>
      {displayValue}
    </CellStyled>
  )
}

const CellStyled = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid black;
  background-color: grey;
`;
