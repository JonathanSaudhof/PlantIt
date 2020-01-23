

class Parts {
  constructor(col, row, scaleIt = 1, product = 'default', type = '') {
    this.posX = col * SQUARE_SIZE + SQUARE_SIZE / 2;
    this.posY = row * SQUARE_SIZE + SQUARE_SIZE / 2;
    this.product = product;
    this.type = type; // e.g. "Tomato"
    this.inventory = {
      product: this.product,
      type: this.type,
      amount: 0,
    };
    this.scale = scaleIt;
    this.acceptedProducts = [];
  }

  withdraw() {
    // if something is in the inventory

    if (this.inventory.amount === 1) {
      this.inventory.amount = 0;
      return {
        product: this.product,
        type: this.type,
        amount: 1,
      };
    }
  }

  deposit(item) {
    if (this.gatekeeper(item) && this.inventory.amount == 0) {
      console.log('item accepted', item);
      this.inventory = {
        product: this.product,
        type: item.type,
        amount: 0.25,
      };
      this.type = item.type;
      return null;
    }
    console.log('item forbidden');
    return item;
  }

  gatekeeper(item) {
    if (this.acceptedProducts.length === 0 || !item) return false;
    console.log(item, this.acceptedProducts);
    return this.acceptedProducts.includes(`${item.product}`);
  }

  draw() {
    push();
    translate(this.posX, this.posY);
    // TODO Add global scale
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

class Shop extends Parts {
  constructor(posX, posY, scale) {
    super(posX, posY, scale);
    /*
    - just receives things no withdraw()
    */
    this.activeImage = loadImage('assets/parts/shop-animated.gif');
    this.acceptedProducts = ['fruit', 'cooked', 'product'];
    this.inventory = [];
  }

  deposit(item) {
    if (this.gatekeeper(item) && this.inventory.length === 0) {
      this.inventory.push({
        product: item.product,
        type: item.type,
        amount: 1,
      });
      return null;
    }

    return item;
  }

  scored() {
    if (this.inventory) {
      this.inventory.forEach((item) => {});
      game.queueItemList.forEach((item) => {
        item.name = this.inventory.product;
      });
    }
  }

  draw() {
    super.draw();
    this.scored();
  }
}



class Processor extends Parts {
  constructor(name, col, row, type) {
    super(col, row, 1.5, type);
    this.name = name;
    this.product = processorData[this.name].product;
    this.img = {
      0: loadImage(`assets/parts/${name}-empty.png`),
      1: loadImage(`assets/parts/${name}-1.png`),
      2: loadImage(`assets/parts/${name}-2.png`),
      3: loadImage(`assets/parts/${name}-active.gif`),
    };
    this.activeImage = this.img.empty;
    this.inventoryMax = processorData[this.name].inventoryMax;
    this.processTime = processorData[this.name].processTime;
    this.acceptedProducts = processorData[this.name].acceptedProducts;
    this.isProcessing = 0;
    
  }
  // deposits just the same items once
  

  process() {
    if (this.inventory.amount === 0.25 && this.isProcessing) {
      this.isProcessing = true;
      this.activeImage = this.img.active;
      // console.log('starts to grow');
      // console.log(this.inventory.amount === 0.25, this.isProcessing === false);
      for (let counter = 1; counter <= 3; counter++) {
        setTimeout(() => {
          this.isProcessing += 1;
          // console.log(this.inventory.amount);
        }, (this.processTime / 3) * counter * 1000);
      }
    }
    //
    if (this.inventory.amount === this. && this.isProcessing === true) {
      // console.log('stop growing');
      this.imgTop =
        loadImage(
          `assets/products/${this.product}-${this.inventory.type}.png`,
        ) || '';
      this.isProcessing = false;
      this.activeImage = this.img.empty;
    }
  }

  draw() {
    this.activeImage = this.img[this.inventory.amount];
    super.draw();
    this.process();
  }
}

class Stock extends Parts {
  constructor(col, row, type = 'plain') {
    super(col, row, 1.5, 'Seed', type);

    this.img = {
      empty: loadImage(`assets/parts/seed-stock-plain-empty.png`),
      full: loadImage(`assets/parts/seed-stock-plain-full.png`),
    };
    this.imgTop = loadImage(`assets/products/${type}.png`);
    this.activeImage = this.img.empty;
    this.reloadTime = 2; // in seconds
    this.isReloading = false;
  }

  reload() {
    if (this.inventory.amount === 0 && this.isReloading === false) {
      this.isReloading = true;

      for (let counter = 1; counter <= 4; counter++) {
        setTimeout(() => {
          this.inventory.amount += 0.25;
        }, (this.reloadTime / 4) * counter * 1000);
      }
    }
    //
    if (this.inventory.amount === 1 && this.isReloading) {
      this.isReloading = false;
    }
  }

  draw() {
    if (this.inventory.amount < 1) {
      this.activeImage = this.img.empty;
    } else {
      this.activeImage = this.img.full;
    }

    super.draw();
    image(this.imgTop, this.posX + 10, this.posY, 16, 16);
    this.reload();
  }
}

class Field extends Parts {
  constructor(col, row) {
    super(col, row, 2, 'fruit');

    this.img = {
      0: loadImage('assets/parts/field-empty.png'),
      0.25: loadImage('assets/parts/field-25.png'),
      0.5: loadImage('assets/parts/field-50.png'),
      0.75: loadImage('assets/parts/field-75.png'),
      1: loadImage('assets/parts/field-empty.png'),
    };
    this.activeImage = this.img[0];

    this.isGrowing = false;
    this.acceptedProducts = ['Seed'];
    this.growTime = 2;
    this.progress = 0;
  }

  grow() {
    if (this.inventory.amount === 0.25 && this.isGrowing === false) {
      this.isGrowing = true;
      // console.log('starts to grow');
      // console.log(this.inventory.amount === 0.25, this.isGrowing === false);
      for (let counter = 1; counter <= 3; counter++) {
        setTimeout(() => {
          this.inventory.amount += 0.25;
          // console.log(this.inventory.amount);
        }, (this.growTime / 3) * counter * 1000);
      }
    }
    //
    if (this.inventory.amount === 1 && this.isGrowing === true) {
      // console.log('stop growing');
      this.imgTop =
        loadImage(`assets/products/${this.inventory.type}.png`) || '';
      this.isGrowing = false;
    }
  }
  // if there is something on a field. Than let it grow until it is ready

  draw() {
    this.grow();
    this.activeImage = this.img[this.inventory.amount];
    super.draw();
    if (this.imgTop && this.inventory.amount === 1) {
      fill(color(255, 255, 255));
      rect(this.posX, this.posY, 50, 50);
      image(this.imgTop, this.posX, this.posY);
    }
  }
}
