class Game {
  constructor(name1, name2) {
    // console.log('Game constructor');
    this.playerList = [];
    this.player1Name = name1; // TODO: Has to be set from outside (UI)
    this.player2Name = name2; // TODO: Has to be set from outside (UI)
    this.multiplayer = false;
    //Duration of a Game in Seconds 5 * 60
    this.duration = 300; // how many time for the whole game
    this.parts = [];
    this.cols = 20;
    this.rows = 10;
    this.score = 0;
    this.queueItemList = [
      {
        id: 1,
        itemName: 'product-ketchup',
        score: 500,
      },
      {
        id: 2,
        itemName: 'intermediate-tomato',
        score: 100,
      },
      {
        id: 3,
        itemName: 'fruit-tomato',
        score: 50,
      },
    ];
  }

  init() {
    createCanvas(this.cols * SQUARE_SIZE, this.rows * SQUARE_SIZE);

    // TODO What if the parts are out of the canvas

    this.world = new World(width / SQUARE_SIZE, height / SQUARE_SIZE);
    this.player1 = new Player(9, 8); // add player character and Name

    if (this.multiplayer) {
      this.player2 = new Player(10, 8); // add player character and Name
    }

    this.parts[0] = new Field(4, 3);
    this.parts[1] = new Field(4, 5);
    this.parts[2] = new Field(6, 5);
    this.parts[3] = new Field(6, 3);
    this.parts[4] = new Stock(1, 2, 'tomato');
    this.parts[5] = new Stock(1, 4, 'apple');
    this.parts[6] = new Stock(1, 6, 'onion');
    this.parts[7] = new Shop(18, 5, 2);
    this.parts[8] = new Processor('stove', 10, 1);
    this.parts[10] = new Processor('stove', 12, 1);
    this.parts[9] = new Combiner('mixer', 14, 1);
    // this.parts[11] = new Trash(16, 1);
  }

  setup() {
    // console.log('Setup');
    angleMode(DEGREES);
    rectMode(CENTER);
  }

  createOrder() {
    //every 30s a Queueitem is randomly created
  }
  drawQueue() {
    let queueStr = '';

    this.queueItemList.forEach((item) => {
      queueStr += `<item id="${item.id}"><img src="assets/products/${item.itemName}.png" ></item>`;
    });
    document.querySelector('queue').innerHTML = queueStr;
  }

  drawScore() {
    let scoreStr = `Score: ${this.score}`;
    document.querySelector('score').innerHTML = scoreStr;
  }

  drawTime() {

    this.duration
    document.querySelector('time').innerHTML = `${this.duration % 60}:{}`;
    

  }

  draw() {
    this.world.drawWorld();

    if (this.multiplayer) {
      this.player2.draw();
    }
    this.parts.forEach((part) => part.draw());
    this.drawQueue();
    this.drawScore();
    this.player1.draw();
  }
}
