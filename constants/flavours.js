"use strict";

const FLAVOUR_ENUMS = {
  VANILLA: {
    id: 1,
    flavourName: "Vanilla",
  },
  CHOCOLATE: {
    id: 2,
    flavourName: "Chocolate",
  },
  BUTTER: {
    id: 3,
    flavourName: "Butter",
  },
  STRAWBERRY: {
    id: 4,
    flavourName: "Strawberry",
  },
  GREENTEA: {
    id: 5,
    flavourName: "Green Tea",
  },
};

const flavourKeys = Object.keys(FLAVOUR_ENUMS);

const DB_FLAVOUR = new Array(flavourKeys.length);

for (let i = 0; i < DB_FLAVOUR.length; i += 1) {
  const key = flavourKeys[i];
  const values = FLAVOUR_ENUMS[key];
  DB_FLAVOUR[i] = values;
}

module.exports = {
  FLAVOUR_ENUMS,
  DB_FLAVOUR,
};
