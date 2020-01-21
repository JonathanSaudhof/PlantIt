const $startingScreen = document.querySelector('.starting-screen');
const $playersNameInput = document.getElementById('playser-name-input');
const $createGameBtn = document.getElementById('create-game-btn');
const $canvas = document.querySelector('div.canvas');
const $nameField = document.querySelector('.menu .name');
const $menu = document.querySelector('.menu');
const $pause = document.querySelector('button.pause');

// Name of the Player

let playersName = 'Test';
const inProduction = false;
let multiplayer = false;

// Game
// new Game Object
const game = new Game();

//TODO:

/* 
  Game Lifecycle:

    #1 Starting Screen where you enter 
    #2 Dashboard (optional)
    #3 Actual Game with menu.

*/

if (inProduction) {
  // Production Code
  let gameRunning = false;
  $createGameBtn.onclick = function() {
    if (!$playersNameInput.value) {
      alert('Please Type in a name!');
    } else {
      //TODO: Implement Loading Screen
      $startingScreen.classList.remove('show');
      playersName = $playersNameInput.value;

      gameRunning = true;
      //set Name in Menu in the actual game
      $nameField.innerHTML = `Hello, ${playersName}! Let go farming!`;
    }
  };
} else {
  // Development
  $nameField.innerHTML = `Hello, ${playersName}! Let go farming!`;
  gameRunning = true;
  $startingScreen.classList.remove('show');
}

// --- > GAME SETUP AND LOOP

function preload() {
  console.log('PRELOAD');
}

function setup() {
  game.init();
  frameRate(17);
  game.setup();
}

function draw() {
  if (gameRunning) {
    // console.log('GAMELOOP RUNNING');
    game.draw();
    singleplayerInputs();
    if (multiplayer) {
      multiplayerInputs();
    }
  }
}

// Input Handling

function pause(event) {
  console.log('pause', event);
  gameRunning = !gameRunning;
  if ($pause.innerHTML === 'Pause') {
    $pause.innerHTML = 'Play';
  } else {
    $pause.innerHTML = 'Pause';
  }

  //TODO: show pause popup
}

function singleplayerInputs() {
  // Player 1

  if (keyIsDown(38)) {
    // move up
    game.player1.move([0, -1]);
  }
  if (keyIsDown(40)) {
    // move down
    game.player1.move([0, 1]);
  }
  if (keyIsDown(37)) {
    // move left
    game.player1.move([-1, 0]);
  }
  if (keyIsDown(39)) {
    // move right
    game.player1.move([1, 0]);
  }
  // Pause
}
function keyPressed() {
  if (keyCode === 80) {
    // move right
    pause();
  }

  if (keyCode === 32) {
    game.player1.grapOrRelease();
  }
}

function multiplayerInputs() {
  // Player 1

  if (keyIsDown(32)) {
    game.player1.grapOrRelease();
  }

  //Player 1: Move up or down

  if (keyIsDown(38)) {
    // move up
    game.player1.move([0, -1]);
  }
  if (keyIsDown(40)) {
    // move down
    game.player1.move([0, 1]);
  }
  if (keyIsDown(37)) {
    // move left
    game.player1.move([-1, 0]);
  }
  if (keyIsDown(39)) {
    // move right
    game.player1.move([1, 0]);
  }
  // Pause
  if (keyIsPressed(80)) {
    // move right
    pause();
  }

  // Player 2

  if (keyCode === 32) {
    game.player.grapOrRelease();
  }

  //Player 1: Move up or down

  if (keyCode === 79) {
    // move up
    game.player2.move([0, -1]);
  }
  if (keyCode === 76) {
    // move down
    game.player2.move([0, 1]);
  }
  if (keyCode === 75) {
    // move left
    game.player2.move([-1, 0]);
  }
  if (keyCode === 186) {
    // move right
    game.player2.move([1, 0]);
  }
  // Pause
  if (keyCode === 16) {
    // move right
    pause();
  }
}
