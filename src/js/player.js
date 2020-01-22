class Player {
  constructor(posX = 25, posY = 25) {
    console.log('Player Constructor');
    this.img = {
      down: [
        loadImage('assets/player/farmer-down.png'),
        loadImage('assets/player/farmer-down-c.png'),
      ],
    };
    this._activeImage = this.img.down;
    this._posX = posX;
    this._posY = posY;
    this.direction = 'down';
    this._speed = 10;
    this.scale = 1.5;
    this._inventory = null;
  }

  grapOrRelease() {
    game.parts.forEach((part) => {
      if (this.collides(part)) {
        // if the player's inventory is empty --> call part.pickUp --> else part.recieve
        console.log(part);
        // call pickUp
        if (!this._inventory) {
          this._inventory = part.withdraw();
        } else {
          part.deposit(this._inventory);
          this._inventory = null;
        }
        // put a item into the inventory depending on the field you are standing on
      }
    });
  }

  draw() {
    push();
    this.activeImage = !this._inventory
      ? this.img[this.direction][0]
      : this.img[this.direction][1];
    image(
      this.activeImage,
      this._posX,
      this._posY,
      this.activeImage.width * this.scale,
      this.activeImage.height * this.scale,
    );
    pop();
  }

  collides(part) {
    // check if obj collides with self
    // self completely to the left || self completely to the right
    // [[x0, x1],[y0, y1]]

    console.log(part);
    let partCor = [
      [
        part.posX - (part.activeImage.width * part.scale || 1) / 2,
        part.posX + (part.activeImage.width * part.scale || 1) / 2,
      ],
      [
        part.posY - (part.activeImage.height * part.scale || 1) / 2,
        part.posY + (part.activeImage.height * part.scale || 1) / 2,
      ],
    ];
    // [[x0, x1],[y0, y1]]

    if (
      this._posX > partCor[0][1] ||
      this._posX < partCor[0][0] ||
      this._posY > partCor[1][1] ||
      this._posY < partCor[1][0]
    ) {
      return false;
    } else {
      return true;
    }
  }

  move(direction) {
    //array [x, y] +/-

    this._posY += this._speed * direction[1];
    this._posX += this._speed * direction[0];
    console.log('move');
  }
}
