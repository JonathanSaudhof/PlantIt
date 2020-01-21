class Parts {
  constructor(col, row, product) {
    this.posX = col * SQUARE_SIZE + SQUARE_SIZE / 2;
    this.posY = row * SQUARE_SIZE + SQUARE_SIZE / 2;
    this.product = product;
    this.inventory = 0;
  }
}

class Stock extends Parts {
  constructor(col, row, type = 'plain') {
    super(col, row, 'Seed');

    this.type = type; // e.g. "Tomato"
    this.img = {
      empty: loadImage(`assets/parts/seed-stock-${type}-empty.png`),
      full: loadImage(`assets/parts/seed-stock-${type}-full.png`),
    };
    this.activeImage = this.img.empty;
    this.reloadTime = 2; // in seconds
    this.isReloading = false;
    this.scale = 1.5;
  }

  reload() {
    // automatically reloads the seeeds, stock
    // wenn das inventory leer ist (=0) und reloading nicht aktiv ist
    if (this.inventory === 0 && this.isReloading === false) {
      this.isReloading = true;
      // four timeouts for 15 seconds , 30 seconds, 45 seconds,  60 seconds
      // always increase inventory by 0.25

      for (let counter = 1; counter <= 4; counter++) {
        setTimeout(() => {
          this.inventory += 0.25;
          console.log(this.inventory);
        }, (this.reloadTime / 4) * counter * 1000);
      }
    }
    //
    if (this.inventory === 1 && this.isReloading) {
      this.isReloading = false;
    }
  }

  withdraw() {
    // if something is in the inventory

    if (this.inventory === 1) {
      this.inventory = 0;
      return {
        category: this.product,
        type: this.type,
        amount: 1,
      };
    }
  }

  draw() {
    push();
    // scale(2);
    translate(this.posX, this.posY);
    if (this.inventory < 1) {
      this.activeImage = this.img.empty;
    } else {
      this.activeImage = this.img.full;
    }

    image(
      this.activeImage,
      0,
      0,
      this.activeImage.width * this.scale,
      this.activeImage.height * this.scale,
    );

    pop();
    this.reload();
  }
}

class Field extends Parts {
  constructor(col, row) {
    super(col, row, 'Fruit');
    this.type = '';
    this.img = {
      0: loadImage('assets/parts/field-empty.png'),
      0.25: loadImage('assets/parts/field-25.png'),
      0.5: loadImage('assets/parts/field-50.png'),
      0.75: loadImage('assets/parts/field-75.png'),
      1: loadImage('assets/parts/field-empty.png'),
    };
    this.activeImage = this.img;
    this.isGrowing = false;
    this.growTime = 20;
    this.progress = 0;
    this.scale = 3;
  }

  deposit(item) {
    console.log(item);
    if (item.category === 'Seed' && this.inventory == 0) {
      console.log('item accepted');
      this.inventory = 0.25;
      this.type = item.type;
      return true;
    }
    return false;
  }

  grow() {
    if (this.inventory === 0.25 && this.isGrowing === false) {
      this.isGrowing = true;
      console.log('starts to grow');
      console.log(this.inventory === 0.25, this.isGrowing === false);
      for (let counter = 1; counter <= 3; counter++) {
        setTimeout(() => {
          this.inventory += 0.25;
          console.log(this.inventory);
        }, (this.growTime / 3) * counter * 1000);
      }
    }
    //
    if (this.inventory === 1 && this.isGrowing === true) {
      console.log('stop growing');
      this.isGrowing = false;
    }
  }
  // if there is something on a field. Than let it grow until it is ready

  draw() {
    push();
    translate(this.posX, this.posY);
    this.grow();
    this.activeImage = this.img[this.inventory];
    image(
      this.activeImage,
      0,
      0,
      this.activeImage.width * this.scale,
      this.activeImage.height * this.scale,
    );
    pop();
  }
}
