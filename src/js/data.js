const score = 300;

const processorData = {
  stock: {
    delivery: "seed",
    acceptedProducts: [],
    processTime: 2,
  },

  field: {
    delivery: "fruit",
    acceptedProducts: ["seed"],
    processTime: 5,
    inventoryMax: 1,
  },

  processor: {
    delivery: "intermediate",
    acceptedProducts: ["fruit"],
    processTime: 3,
    inventoryMax: 1,
  },

  combiner: {
    delivery: "product",
    acceptedProducts: ["intermediate", "fruit"],
    processTime: 3,
    inventoryMax: 3,
  },
};

// for the mixer ( combiner )
const recieps = {
  ketchup: ["intermediate-tomato", "intermediate-apple", "intermediate-onion"],
  applePuree: ["fruit-apple", "fruit-apple", "fruit-apple"],
  tomatoPuree: ["fruit-tomato", "fruit-tomato", "fruit-tomato"],
};
