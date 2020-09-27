'use strict';

const bcryptJs = require('bcryptjs');

module.exports = {
  hashPassword: async ({password}) => {
    const salt = await bcryptJs.genSalt(10);
    const hashedPassword = await bcryptJs.hash(password, salt);
    
    return hashedPassword;
  },
  comparePasword: async ({ password, hashedPassword }) => {
    const result = await bcryptJs.compare(password, hashedPassword);

    return result;
  }
};
