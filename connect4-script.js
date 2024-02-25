let board = [
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
];
let turn = 'Red';
let turnValue = 1;

function getGridElement(row, column) {
  return document.querySelector(`._${row}${column}`);
}

for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 7; j++) {
    const buttonElement = getGridElement(i, j);
    buttonElement.addEventListener('click', () => {
      playGame(j);
    })
  }
}

document.querySelector('.reset-button').addEventListener('click', () => {
  resetBoard();
});

for (let i = 0; i < 7; i++) {
  document.querySelector(`._${i}`).addEventListener('click', () => {
    playGame(i);
  })
}

function playGame(column) {
  if (board[0][column] === 1) {
    alert('Please pick a valid column');
    return;
  }
  else {
    for (let i = 5; i >= 0; i--) {
      if (board[i][column] === 0) {
        const buttonElement = getGridElement(i, column);
        buttonElement.classList.add(`${turn}-button`);
        if (turn === 'Red') {
          board[i][column] = 1;
        }
        else {
          board[i][column] = 2;
        }
        if (isGameWon(i, column)){
          alert(`${turn} wins! The board will be reset!`);
          resetBoard();
          return;
        }
        if (turn === 'Red') {
          turn = 'Yellow';
          turnValue = 2;
        } else {
          turn = 'Red';
          turnValue = 1;
        }
        document.querySelector('.turn-info').innerHTML = `Turn: ${turn}`;
        break;
      }
    }
  }
}

function isGameWon(row, column) {
  //vertical
  //check above
  let consecutive = 1;
  for (let i = row - 1; i >= 0; i--) {
    if (board[i][column] === turnValue) {
      consecutive++;
    } else {break;}
  }
  //check below
  for (let i = row + 1; i < 6; i++) {
    if (board[i][column] === turnValue) {
      consecutive++;
    } else {break;}
  }
  if (consecutive >= 4) {
    return true;
  }
  //horizontal
  //check left
  consecutive = 1;
  for (let i = column - 1; i >= 0; i--) {
    if (board[row][i] === turnValue) {
      consecutive++;
    } else {break;}
  }
  //check right
  for (let i = column + 1; i < 7; i++) {
    if (board[row][i] === turnValue) {
      consecutive++;
    } else {break;}
  }
  if (consecutive >= 4) {
    return true;
  }
  //diagonal left
  //check bottom left
  consecutive = 1;
  let i = row + 1;
  let j = column -1;
  while (i < 6 && j >= 0) {
    if (board[i][j] === turnValue) {
      consecutive++;
      i++;
      j--;
    } else {break;}
  }
  //check top right
  i = row - 1;
  j = column + 1;
  while (i >= 0 && j < 7) {
    if (board[i][j] === turnValue) {
      consecutive++;
      i--;
      j++;
    } else {break;}
  }
  if (consecutive >= 4) {
    return true;
  }
  //diagonal right
  //check bottom right
  consecutive = 1;
  i = row + 1;
  j = column + 1;
  while (i < 6 && j < 7) {
    if (board[i][j] === turnValue) {
      consecutive++;
      i++;
      j++;
    } else {break;}
  }
  //check top left
  i = row - 1;
  j = column - 1;
  while (i >= 0 && j >= 0) {
    if (board[i][j] === turnValue) {
      consecutive++;
      i--;
      j--;
    } else {break;}
  }
  if (consecutive >= 4) {
    return true;
  }
  return false;
 }

function resetBoard() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      board[i][j] = 0;
      const buttonElement = getGridElement(i, j);
      if (buttonElement.classList.contains('Yellow-button')) {
        buttonElement.classList.remove('Yellow-button');
      }
      else if (buttonElement.classList.contains('Red-button')) {
        buttonElement.classList.remove('Red-button');
      }
    }
  }
  turn = 'Red'
  turnValue = 1;
  document.querySelector('.turn-info').innerHTML = `Turn: ${turn}`;
}