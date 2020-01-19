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

// Game
// new Game Object
const game = new Game();
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
    console.log('GAMELOOP RUNNING');
    game.draw();
  }

  keyPressed();
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
}

function keyPressed() {
  //Player 1: Grap or Release on Space
  if (keyCode === 32) {
    game.player.grapOrRelease();
  }

  //Player 1: Move forward or backward

  if (keyCode === 38) {
    game.player.move([1, 0]);
  }

  // orientation (starts with 180, looking down!)

  //Player 1: go left or right

  //Player 2: Grap or Release on CTRL

  //Player 2: Move forward or backward

  // Player 2: go left or right

  //Pause on P
}
