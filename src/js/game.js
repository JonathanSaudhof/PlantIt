class Game {
  constructor() {
    console.log('Game constructor');
    this.playerList = [];
    this.player1Name = 'Player1'; // TODO: Has to be set from outside (UI)
    this.player2Name = 'Player2'; // TODO: Has to be set from outside (UI)
    this.multiplayer = false;
    //Duration of a Game in Seconds 5 * 60
    this.duration = 300;
    this.fields = [];
  }

  init() {
    createCanvas(20 * SQUARE_SIZE, 10 * SQUARE_SIZE);

    // TODO What if the parts are out of the canvas

    this.world = new World(width / SQUARE_SIZE, height / SQUARE_SIZE);
    this.player1 = new Player(); // add player character and Name

    if (this.multiplayer) {
      console.log('player2');
      this.player2 = new Player(); // add player character and Name
    }

    this.fields[0] = new Field(5, 5);
    this.fields[1] = new Field(8, 5);
    this.stock = new Stock(1, 2);
  }

  setup() {
    console.log('Setup');
    angleMode(DEGREES);
  }

  draw() {
    this.world.drawWorld();

    if (this.multiplayer) {
      this.player2.draw();
    }
    this.fields[0].draw();
    this.fields[1].draw();
    this.stock.draw();
    this.player1.draw();
  }
}
