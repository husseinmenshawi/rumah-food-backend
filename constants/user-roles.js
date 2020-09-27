"use strict";

const ROLE_ENUMS = {
  SUPER_USER: {
    id: 1,
    roleName: "Super User",
  },
  SELLER: {
    id: 2,
    roleName: "Seller",
  },
  BUYER: {
    id: 3,
    roleName: "Buyer",
  },
};

const roleKeys = Object.keys(ROLE_ENUMS);

const DB_ROLES = new Array(roleKeys.length);

for (let i = 0; i < DB_ROLES.length; i += 1) {
  const key = roleKeys[i];
  const values = ROLE_ENUMS[key];
  DB_ROLES[i] = values;
}

module.exports = {
  ROLE_ENUMS,
  DB_ROLES,
};
