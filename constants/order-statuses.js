"use strict";

const STATUS_ENUMS = {
  BOOKED: {
    id: 1,
    status: "Booked",
  },
  CONFIRMED: {
    id: 2,
    status: "Confirmed",
  },
  DELIVERED: {
    id: 3,
    status: "Delivered",
  },
};

const statusKeys = Object.keys(STATUS_ENUMS);

const DB_STATUSES = new Array(statusKeys.length);

for (let i = 0; i < DB_STATUSES.length; i += 1) {
  const key = statusKeys[i];
  const values = STATUS_ENUMS[key];
  DB_STATUSES[i] = values;
}

module.exports = {
  STATUS_ENUMS,
  DB_STATUSES,
};
