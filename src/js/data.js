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
    acceptedProducts: ['cooked', 'fruit'],
    processTime: 2,
    inventoryMax: 3,
  },
};

// for the mixer ( combiner )
const recieps = {
  ketchup: ['cooked-tomato', 'cooked-apple', 'cooked-onion'],
  applePuree: ['cooked-apple', 'cooked-apple', 'cooked-apple'],
  tomatoPuree: ['cooked-tomato', 'cooked-tomato', 'cooked-tomato'],
};
