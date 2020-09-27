"use strict";

const CUISINE_ENUMS = {
  BAKERY: {
    id: 1,
    cuisineName: "Bakery",
  },
};

const cuisineKeys = Object.keys(CUISINE_ENUMS);

const DB_CUISINE = new Array(cuisineKeys.length);

for (let i = 0; i < DB_CUISINE.length; i += 1) {
  const key = cuisineKeys[i];
  const values = CUISINE_ENUMS[key];
  DB_CUISINE[i] = values;
}

module.exports = {
  CUISINE_ENUMS,
  DB_CUISINE,
};
