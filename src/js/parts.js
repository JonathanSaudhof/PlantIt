class Parts {
  constructor(col, row, scaleIt = 1, delivery, type = '') {
    this.posX = col * SQUARE_SIZE + SQUARE_SIZE / 2;
    this.posY = row * SQUARE_SIZE + SQUARE_SIZE / 2;
    this.delivery = delivery;
    this.scale = scaleIt;
    this.type = type; // e.g. "Tomato"
    this.acceptedProducts = []; // for stock
    this.inventory = {
      category: this.delivery,
      type: this.type,
      amount: 0, // TODO: check if should changed to feeSlots (and set per definition)
    };
  }

  withdraw() {
    // if something is in the inventory
    if (this.inventory.amount === 1) {
      this.inventory.amount = 0;
      return {
        category: this.delivery,
        type: this.type,
        amount: 1,
      };
    }
  }

  deposit(item) {
    if (this.gatekeeper(item) && this.inventory.amount == 0) {
      console.log('item accepted', item);
      this.inventory = {
        category: this.delivery,
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

    // TODO: check : if inventory.amount < inventoryMax
    return (
      this.inventory.amount < this.inventoryMax &&
      this.acceptedProducts.includes(`${item.category}`)
    );
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
class Stock extends Parts {
  constructor(col, row, type) {
    super(col, row, 1.5, processorData.stock.delivery, type);
    this.img = {
      empty: loadImage(`assets/parts/seed-stock-plain-empty.png`),
      full: loadImage(`assets/parts/seed-stock-plain-full.png`),
    };
    this.imgTop = loadImage(`assets/products/${type}.png`);
    this.activeImage = this.img.empty;
    this.processTime = processorData.stock.processTime; // TODO: exclude to object
    this.acceptedProducts = processorData.stock.acceptedProducts;
    this.inventoryMax = processorData.stock.inventoryMax;
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
    this.inventoryMax = processorData.field.inventoryMax;
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
class Processor extends Parts {
  constructor(name, col, row, type) {
    super(col, row, 1.5, type);
    this.name = name;
    this.delivery = processorData.processor.delivery;
    this.img = {
      empty: loadImage(`assets/parts/${name}-empty.png`),
      active: loadImage(`assets/parts/${name}-active.gif`),
    };
    this.activeImage = this.img.empty;
    this.inventoryMax = processorData.processor.inventoryMax;
    this.processTime = processorData.processor.processTime;
    this.acceptedProducts = processorData.processor.acceptedProducts;
    this.isProcessing = false;
  }
  // deposits just the same items once

  process() {
    if (this.inventory.amount === 0.25 && this.isProcessing === false) {
      this.isProcessing = true;
      this.activeImage = this.img.active;
      // console.log('starts to process');
      // console.log(this.inventory.amount === 0.25, this.isProcessing === false);
      for (let counter = 1; counter <= 3; counter++) {
        setTimeout(() => {
          this.inventory.amount += 0.25;
        }, (this.processTime / 3) * counter * 1000);
      }
    }
    //
    if (
      this.inventory.amount === this.inventoryMax &&
      this.isProcessing === true
    ) {
      // console.log('stop growing');
      this.imgTop =
        loadImage(
          `assets/products/${this.delivery}-${this.inventory.type}.png`,
        ) || '';
      this.isProcessing = false;
      this.activeImage = this.img.empty;
    }
  }

  draw() {
    super.draw();
    if (this.imgTop && this.inventory.amount === 1) {
      fill(color(255, 255, 255));
      rect(this.posX, this.posY, 50, 50);
      image(this.imgTop, this.posX, this.posY);
    }
    this.process();
  }
}
class Combiner extends Parts {
  constructor(name, col, row, type) {
    super(col, row, 1.5, type);
    this.name = name;
    this.delivery = processorData.combiner.delivery;
    this.img = {
      0: loadImage(`assets/parts/${name}-empty.png`),
      1: loadImage(`assets/parts/${name}-1.png`),
      2: loadImage(`assets/parts/${name}-2.png`),
      active: loadImage(`assets/parts/${name}-active.gif`),
    };
    this.activeImage = this.img.empty;
    this.inventoryMax = processorData.combiner.inventoryMax;
    this.processTime = processorData.combiner.processTime;
    this.acceptedProducts = processorData.combiner.acceptedProducts;
    this.isProcessing = false;
  }

  deposit(item) {
    // if item.category =
    // if inventory.amount < inventoryMax
    console.log('combiner method');
    console.log(this.gatekeeper(item));

    if (this.gatekeeper(item) && this.inventory.amount < this.inventoryMax) {
      if (this.inventory.amount > 0 && item.type !== this.inventory.type) {
        return item;
      }

      this.inventory = {
        category: this.delivery,
        type: item.type,
        amount: 1,
      };
      this.type = item.type;
      return null;
    }
    return item;
  }

  fitsToRecipe(intermediate){
    // does the current inventory + the item what i like to add is part of a reciep
    // loop all recieps
    
  }

  process() {
    if (
      this.inventory.amount === this.inventoryMax &&
      this.isProcessing === false
    ) {
      this.isProcessing = true;
      this.activeImage = this.img.active;
      // console.log('starts to process');
      // console.log(this.inventory.amount === 0.25, this.isProcessing === false);
      for (let counter = 1; counter <= 3; counter++) {
        setTimeout(() => {
          this.inventory.amount += 0.25;
        }, (this.processTime / 3) * counter * 1000);
      }
    }
    //
    if (
      this.inventory.amount === this.inventoryMax &&
      this.isProcessing === true
    ) {
      // console.log('stop growing');
      this.imgTop =
        loadImage(
          `assets/products/${this.delivery}-${this.inventory.type}.png`,
        ) || '';
      this.isProcessing = false;
      this.activeImage = this.img.empty;
    }
  }
  draw() {
    this.activeImage = this.img[this.inventory.amount];
    super.draw();
  }
}
class Shop extends Parts {
  constructor(posX, posY, scale) {
    super(posX, posY, scale, 'score');
    this.activeImage = loadImage('assets/parts/shop-animated.gif');
    this.acceptedProducts = ['fruit', 'cooked', 'product'];
    this.inventory = [];
  }

  deposit(item) {
    if (this.gatekeeper(item) && this.inventory.length === 0) {
      this.inventory.push({
        category: item.product,
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