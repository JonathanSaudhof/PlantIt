class Field {
  constructor(col, row) {
    this.posX = col * SQUARE_SIZE;
    this.posY = row * SQUARE_SIZE;
  }

  draw() {
    push();
    translate(this.posX, this.posY);
    fill(33);
    stroke(0);
    rect(0, 0, 2 * SQUARE_SIZE, 2 * SQUARE_SIZE);
    pop();
  }

  grow() {
    // if there is something on a field. Than let it grow until it is ready
  }
}

class Stock {
  constructor(col, row, type = 'plain') {
    this._posX = col * SQUARE_SIZE + SQUARE_SIZE / 2;
    this._posY = row * SQUARE_SIZE + SQUARE_SIZE / 2;
    this._type = type;
    this._img = loadImage(`assets/stock/seed-stock-${type}-pixilart.png`);
    this._inventory = [
      {
        type: this._type,
      },
    ];
  }

  draw() {
    push();
    // scale(2);
    translate(this._posX, this._posY);
    image(this._img, 0, 0);
    pop();
    this._reload();
  }

  getInventory(player) {
    // manipulate the player objects inventory and store the current
    return this._inventory[0];
  }

  _reload() {
    if ((this._inventory.length = 0)) {
    }
  }
}
