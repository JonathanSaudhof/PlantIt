class Player {
  constructor() {
    console.log('Player Constructor');
    this.img = {
      down: loadImage('assets/player/farmer-pixilart.png'),
    };
    this._posX = 50;
    this._posY = 50;
  }

  grapOrRelease() {
    let count = 0;
  }

  draw() {
    push();
    image(this.img.down, this._posX, this._posY);
    pop();
  }

  move(direction) {
    //array [x, y] +/-
    this._posY += direction[1];
    this._posX += direction[0];
  }
}
