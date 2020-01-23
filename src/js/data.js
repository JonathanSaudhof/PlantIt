const score = 300;

const processorData = {
  stock: {
    delivery: 'Seed',
    acceptedProducts: [],
    processTime: 2,
  },

  field: {
    delivery: 'Fruit',
    acceptedProducts: ['Seed'],
    processTime: 2,
    inventoryMax: 1,
  },

  processor: {
    delivery: 'intermediate',
    acceptedProducts: ['fruit'],
    processTime: 2,
    inventoryMax: 1,
  },

  combiner: {
    delivery: 'product',
    acceptedProducts: ['intermediate', 'fruit'],
    processTime: 2,
    inventoryMax: 3,
  },
};

// for the mixer ( combiner )
const recieps = {
  ketchup: ['intermediate-tomato', 'intermediate-apple', 'intermediate-onion'],
  applePuree: ['fruit-apple', 'fruit-apple', 'fruit-apple'],
  tomatoPuree: ['fruit-tomato', 'fruit-tomato', 'fruit-tomato'],
};
