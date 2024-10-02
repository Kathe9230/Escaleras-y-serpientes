const board = document.getElementById("board");
const diceResult = document.getElementById("diceResult");
const playerTurnDisplay = document.getElementById("playerTurn");
const player1Icon = document.createElement("img");
const player2Icon = document.createElement("img");

let player1Position = 1;
let player2Position = 1;
let currentPlayer = 1;  // Jugador 1 comienza

player1Icon.src = 'Images/player1.png';
player1Icon.classList.add('player-icon');

player2Icon.src = 'Images/player2.png';
player2Icon.classList.add('player-icon');

const playerPosition1 = document.getElementById("playerPosition1");
const playerPosition2 = document.getElementById("playerPosition2");

const snakes = {
  16: 6,
  48: 26,
  64: 60,
  79: 19,
  93: 73,
  95: 75,
  98: 78
};

const ladders = {
  2: 38,
  7: 14,
  8: 31,
  15: 26,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  78: 98,
  87: 94
};

// tablero dinamico del 1 al 100
for (let i = 100; i > 0; i--) {
    const square = document.createElement("div");
    square.innerText = i;
    square.id = `square-${i}`;
    square.classList.add(i % 2 == 0 ? 'even' : 'odd');
  
    // Clases para escaleras y las serpientes
    if (ladders[i]) {
      square.classList.add('ladder');
    }
  
    if (snakes[i]) {
      square.classList.add('snake');
    }
    
    if (i == 1) {
      const startImg = document.createElement("img");
      startImg.src = "Images/start.png";  
      startImg.classList.add("start-img");
      square.appendChild(startImg);
    }

    if (i === 100) {
      const finishImg = document.createElement("img");
      finishImg.src = "Images/finish.png";  
      finishImg.classList.add("finish-img");
      square.appendChild(finishImg);
    }
  
    board.appendChild(square);
}

// Pop-up del ganador
function showWinnerPopup() {
  const popup = document.getElementById("winnerPopup");
  popup.style.display = "block";
}

document.getElementById("closePopup").addEventListener("click", () => {
  const popup = document.getElementById("winnerPopup");
  popup.style.display = "none";
});


document.getElementById('square-1').appendChild(player1Icon);
document.getElementById('square-1').appendChild(player2Icon);

function movePlayer(playerIcon, oldPosition, newPosition) {
  const oldSquare = document.getElementById(`square-${oldPosition}`);
  if (oldSquare && oldSquare.contains(playerIcon)) {
    oldSquare.removeChild(playerIcon);
  }

  
  const newSquare = document.getElementById(`square-${newPosition}`);
  newSquare.appendChild(playerIcon);
}

function checkForSnakesOrLadders(position) {
  if (snakes[position]) {
    alert("¡Oops! Una serpiente te ha bajado.");
    return snakes[position];
  } else if (ladders[position]) {
    alert("¡Genial! Subiste una escalera.");
    return ladders[position];
  }
  return position;
}

function resetGame() {
  player1Position = 1;
  player2Position = 1;
  movePlayer(player1Icon, player1Position, 1);
  movePlayer(player2Icon, player2Position, 1);
  playerPosition1.innerText = "Posición Jugador 1: 1";
  playerPosition2.innerText = "Posición Jugador 2: 1";
  currentPlayer = 1;
  playerTurnDisplay.innerText = "Turno del Jugador 1";
}


document.getElementById("rollDice").addEventListener("click", () => {
  const dice = Math.floor(Math.random() * 6) + 1; 
  diceResult.innerText = "Resultado del Dado: " + dice;

  document.getElementById("rollDice").src = `Images/dice${dice}.jpg`; 

  let oldPosition;
  if (currentPlayer == 1) {
    oldPosition = player1Position;
    player1Position += dice;
    if (player1Position > 100) player1Position = 100;

    player1Position = checkForSnakesOrLadders(player1Position);
    movePlayer(player1Icon, oldPosition, player1Position); 

    playerPosition1.innerText = "Posición Jugador 1: " + player1Position;
    if (player1Position == 100) {
      alert("¡Felicidades! Juagador 1 has ganado!");
      showWinnerPopup();
      resetGame();
      return;
    }
    currentPlayer = 2; 
    playerTurnDisplay.innerText = "Turno del Jugador 2";
  } else {
    oldPosition = player2Position;
    player2Position += dice;
    if (player2Position > 100) player2Position = 100;

    player2Position = checkForSnakesOrLadders(player2Position);
    movePlayer(player2Icon, oldPosition, player2Position); 

    playerPosition2.innerText = "Posición Jugador 2: " + player2Position;
    if (player2Position == 100) {
      alert("¡Felicidades! Jugador 2 has ganado!");
      showWinnerPopup();
      resetGame();
      return;
    }
    currentPlayer = 1; 
    playerTurnDisplay.innerText = "Turno del Jugador 1";
  }
});
