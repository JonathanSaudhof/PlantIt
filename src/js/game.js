class Game {
  constructor() {
    console.log('Game constructor');
    this.playerList = [];
    this.player1Name = 'Player1'; // TODO: Has to be set from outside (UI)
    this.player2Name = 'Player2'; // TODO: Has to be set from outside (UI)
    this.multiplayer = false;
    //Duration of a Game in Seconds 5 * 60
    this.duration = 300;
    this.parts = [];
  }

  init() {
    createCanvas(20 * SQUARE_SIZE, 10 * SQUARE_SIZE);

    // TODO What if the parts are out of the canvas

    this.world = new World(width / SQUARE_SIZE, height / SQUARE_SIZE);
    this.player1 = new Player(); // add player character and Name

    if (this.multiplayer) {
      this.player2 = new Player(); // add player character and Name
    }

    this.parts[0] = new Field(5, 5);
    this.parts[1] = new Field(8, 5);
    this.parts[2] = new Stock(1, 2);
  }

  setup() {
    console.log('Setup');
    angleMode(DEGREES);
    rectMode(CENTER);
  }

  draw() {
    this.world.drawWorld();

    if (this.multiplayer) {
      this.player2.draw();
    }
    this.parts[0].draw();
    this.parts[1].draw();
    this.parts[2].draw();
    this.player1.draw();
  }
}
