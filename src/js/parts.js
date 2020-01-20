class Parts {
  constructor(col, row) {
    this._posX = col * SQUARE_SIZE + SQUARE_SIZE / 2;
    this._posY = row * SQUARE_SIZE + SQUARE_SIZE / 2;
    this._inventory = 0;
  }
}

class Stock extends Parts {
  constructor(col, row, type = 'plain') {
    super(col, row);
    this._type = type; // e.g. "Tomato"
    this._img = {
      empty: loadImage(`assets/parts/seed-stock-${type}-empty.png`),
      full: loadImage(`assets/parts/seed-stock-${type}-full.png`),
    };
    this._reloadTime = 2; // in seconds
    this._isReloading = false;
  }

  _reload() {
    // automatically reloads the seeeds, stock
    // wenn das inventory leer ist (=0) und reloading nicht aktiv ist
    if (this._inventory === 0 && this._isReloading === false) {
      this._isReloading = true;
      // four timeouts for 15 seconds , 30 seconds, 45 seconds,  60 seconds
      // always increase inventory by 0.25

      for (let counter = 1; counter <= 4; counter++) {
        setTimeout(() => {
          this._inventory += 0.25;
        }, (this._reloadTime / 4) * counter * 1000);
      }
    }
    //
    if (this._inventory === 0 && !this._isReloading) {
      this._isReloading = false;
    }
  }

  transferToPlayer(player) {
    //except

    // if something is in the inventory
    if (!this._inventory === 1) {
      player.setInventory(this._inventory[0]);
    }
    // manipulate push the item to the players inventory

    // set _inventory to zero
  }

  draw() {
    push();
    // scale(2);
    translate(this._posX, this._posY);
    if (this._inventory < 1) {
      this._activeImage = this._img.empty;
      console.log('empty');
    } else {
      this._activeImage = this._img.full;
    }

    image(this._activeImage, 0, 0);

    pop();
    this._reload();
  }
}

class Field extends Parts {
  constructor(col, row) {
    super(col, row);
    this._type = 'field';
    this._img = {
      empty: loadImage('assets/parts/field-empty.png'),
      full: loadImage('assets/parts/field-empty.png'),
    };
    this._activeImage = this._img.empty;
  }

  grow() {
    // if there is something on a field. Than let it grow until it is ready
  }

  draw() {
    push();
    translate(this._posX, this._posY);
    fill(33);
    stroke(0);
    image(this._activeImage, 0, 0);
    pop();
  }
}
