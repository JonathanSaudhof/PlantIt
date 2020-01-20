class Player {
  constructor() {
    console.log('Player Constructor');
    this.img = {
      down: loadImage('assets/player/farmer-pixilart.png'),
    };
    this._activeImg = this.img.down;
    this._posX = 50;
    this._posY = 50;
    this._speed = 10;
  }

  grapOrRelease() {
    game.parts.forEach((part) => {
      console.log(
        'parts',
        part._posX - part._activeImage.width,
        part._posY - part._activeImage.height,
      );
    });
    // check if player is on a field || stock or sth else

    //current position (center )

    // if yes: call the objects get inventory by passing the player
  }

  draw() {
    push();
    image(this.img.down, this._posX, this._posY);
    pop();
  }

  collides(part) {
    // check if obj collides with self
    // self completely to the left || self completely to the right
    if (this.x + this.width < obj.x || obj.x + obj.width < this.x) {
      return false;
    }
    // self completely to the top || self completely to the bottom
    if (this.y + this.height < obj.y || obj.y + obj.height < this.y) {
      return false;
    }

    // collision detected -> we can play the sound
    game.coinSound.play();

    return true;
  }

  move(direction) {
    //array [x, y] +/-

    this._posY += this._speed * direction[1];
    this._posX += this._speed * direction[0];
    console.log('move');
  }
}
