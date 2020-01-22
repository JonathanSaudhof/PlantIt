class Game {
  constructor() {
    console.log('Game constructor');
    this.playerList = [];
    this.player1Name = 'Player1'; // TODO: Has to be set from outside (UI)
    this.player2Name = 'Player2'; // TODO: Has to be set from outside (UI)
    this.multiplayer = false;
    //Duration of a Game in Seconds 5 * 60
    this.duration = 300; // how many time for the whole game
    this.parts = [];
    this.cols = 20;
    this.rows = 10;
    this.queueItemList = [
      {
        id: 1,
        name: 'tomato',
        ingredients: [{ product: 'Seed', type: 'tomato' }],
        timeLeft: 60,
      },
    ];
  }

  init() {
    createCanvas(this.cols * SQUARE_SIZE, this.rows * SQUARE_SIZE);

    // TODO What if the parts are out of the canvas

    this.world = new World(width / SQUARE_SIZE, height / SQUARE_SIZE);
    this.player1 = new Player(); // add player character and Name

    if (this.multiplayer) {
      this.player2 = new Player(); // add player character and Name
    }

    this.parts[0] = new Field(5, 5);
    this.parts[1] = new Field(8, 5);
    this.parts[2] = new Stock(1, 2, 'tomato');
    this.parts[3] = new Shop(18, 5, 2);
  }

  setup() {
    console.log('Setup');
    angleMode(DEGREES);
    rectMode(CENTER);
  }

  countDown() {}

  createOrder() {
    //every 30s a Queueitem is randomly created
  }
  drawQueue() {
    this.queueItemList.forEach((item) => {
      if (!document.getElementById(item.id.toString())) {
        const newItem = document.createElement('item');
        newItem.id = item.id;
        newItem.innerHTML = `<img src="assets/products/${item.name}.png`;
        document.querySelector('queue').appendChild(newItem);
      }
    });
  }

  drawTime() {}

  draw() {
    this.world.drawWorld();

    if (this.multiplayer) {
      this.player2.draw();
    }
    this.parts.forEach((part) => part.draw());
    this.drawQueue();
    this.player1.draw();
  }
}
