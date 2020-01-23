class Player {
  constructor(col, row) {
    // console.log('Player Constructor');
    this.img = {
      down: [
        loadImage('assets/player/farmer-down.png'),
        loadImage('assets/player/farmer-down-c.png'),
      ],
    };
    this._activeImage = this.img.down;
    this.posX = col * SQUARE_SIZE + SQUARE_SIZE / 2;
    this.posY = row * SQUARE_SIZE + SQUARE_SIZE / 2;
    this.direction = 'down';
    this.speed = 10;
    this.scale = 1.5;
    this.inventory = null;
  }

  grapOrRelease() {
    game.parts.forEach((part) => {
      if (this.collides(part)) {
        // if the player's inventory is empty --> call part.pickUp --> else part.recieve

        // call pickUp
        if (!this.inventory) {
          this.inventory = part.withdraw();
        } else {
          this.inventory = part.deposit(this.inventory);
        }
        // put a item into the inventory depending on the field you are standing on
      }
    });
  }

  draw() {
    push();
    this.activeImage = !this.inventory
      ? this.img[this.direction][0]
      : this.img[this.direction][1];
    image(
      this.activeImage,
      this.posX,
      this.posY,
      this.activeImage.width * this.scale,
      this.activeImage.height * this.scale,
    );
    pop();
  }

  collides(part) {
    // check if obj collides with self
    // self completely to the left || self completely to the right
    // [[x0, x1],[y0, y1]]

    // console.log(part);
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
      this.posX > partCor[0][1] ||
      this.posX < partCor[0][0] ||
      this.posY > partCor[1][1] ||
      this.posY < partCor[1][0]
    ) {
      return false;
    } else {
      return true;
    }
  }

  move(direction) {
    //array [x, y] +/-

    this.posY += this.speed * direction[1];
    this.posX += this.speed * direction[0];
    // console.log('move');
  }
}
