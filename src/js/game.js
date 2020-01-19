class Game {
  constructor() {
    console.log('Game constructor');
    this.playerList = [];
    this.playerName = 'Player1';

    //Duration of a Game in Seconds 5 * 60
    this.duration = 300;

    //
  }

  init() {
    
    createCanvas(30 * 32, 20 * 32);
    this.world = new World(30, 20);
    this.player = new Player();
    //this.player = new Player(); //TODO: add Player Name (for some reason)
  }

  setup() {
    console.log('Setup');
    angleMode(DEGREES);
  }

  draw() {
    this.world.drawWorld();
    this.player.draw();
  }
}
