class Player {
  constructor() {
    console.log('Player Constructor');
    this.img = {
      down: loadImage('assets/player/farmer-pixilart.png'),
    };
    this._posX = 50;
    this._posY = 50;
    this._speed = 10;
  }

  grapOrRelease() {
    let count = 0;
    console.log(game.field2);
    // check if player is on a fiel || stock or ...
    // if yes: call the objects get inventory by passing the player
  }

  draw() {
    push();
    image(this.img.down, this._posX, this._posY);
    pop();
  }

  move(direction) {
    //array [x, y] +/-

    this._posY += this._speed * direction[1];
    this._posX += this._speed * direction[0];
    console.log('move');
  }
}
