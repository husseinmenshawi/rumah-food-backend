"use stict";

const express = require("express");
const glob = require("glob");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const pino = require("pino");
const pinoExpress = require("express-pino-logger");

const flow = require("lodash/fp/flow");
const map = require("lodash/fp/map");
const filter = require("lodash/fp/filter");

const config = require("../config");
const constants = require("../constants");
const primaryDb = require("../models/primary");
const Utilities = require("../utilities");

async function seedRoleMasterData() {
  if (!config.db.primary.dbMasterDataRoleSeedEnabled) {
    return;
  }

  const roles = constants.USER_ROLES.DB_ROLES;
  const promises = roles.map((role) => {
    const { id } = role;

    return primaryDb.sequelizeInstance.models.Roles.findOrCreate({
      where: {
        id,
      },
      defaults: { ...role },
    });
  });
  const dbResults = await Promise.all(promises);

  if (!config.db.primary.dbMasterDataRoleSeedOverwriteEnabled) {
    return;
  }

  const existingEntries = flow(
    map((x) => {
      return {
        row: x[0],
        created: x[1],
      };
    }),
    filter((x) => x.created == false)
  )(dbResults);

  if (!existingEntries || existingEntries.length < 1) {
    return;
  }

  const updatePromises = existingEntries.map((x) => {
    const { row } = x;
    const { id } = row;
    const baseEntry = roles.find((x) => x.id == id);
    Object.keys(baseEntry).forEach((key) => {
      if (key !== "id") {
        row[key] = baseEntry[key];
      }
    });

    return row.save();
  });

  await Promise.all(updatePromises);
}

async function seedCuisineTypeMasterData() {
  if (!config.db.primary.dbMasterDataCuisineTypeSeedEnabled) {
    return;
  }

  const cuisineTypes = constants.CUISINE_TYPES.DB_CUISINE;
  const promises = cuisineTypes.map((cuisine) => {
    const { id } = cuisine;

    return primaryDb.sequelizeInstance.models.CuisineTypes.findOrCreate({
      where: {
        id,
      },
      defaults: { ...cuisine },
    });
  });
  const dbResults = await Promise.all(promises);

  if (!config.db.primary.dbMasterDataCuisineTypeSeedOverwriteEnabled) {
    return;
  }

  const existingEntries = flow(
    map((x) => {
      return {
        row: x[0],
        created: x[1],
      };
    }),
    filter((x) => x.created == false)
  )(dbResults);

  if (!existingEntries || existingEntries.length < 1) {
    return;
  }

  const updatePromises = existingEntries.map((x) => {
    const { row } = x;
    const { id } = row;
    const baseEntry = cuisineTypes.find((x) => x.id == id);
    Object.keys(baseEntry).forEach((key) => {
      if (key !== "id") {
        row[key] = baseEntry[key];
      }
    });

    return row.save();
  });

  await Promise.all(updatePromises);
}

async function seedFlavourMasterData() {
  if (!config.db.primary.dbMasterDataFlavourSeedEnabled) {
    return;
  }

  const flavours = constants.FLAVOURS.DB_FLAVOUR;
  const promises = flavours.map((flavour) => {
    const { id } = flavour;

    return primaryDb.sequelizeInstance.models.Flavours.findOrCreate({
      where: {
        id,
      },
      defaults: { ...flavour },
    });
  });
  const dbResults = await Promise.all(promises);

  if (!config.db.primary.dbMasterDataFlavourSeedOverwriteEnabled) {
    return;
  }

  const existingEntries = flow(
    map((x) => {
      return {
        row: x[0],
        created: x[1],
      };
    }),
    filter((x) => x.created == false)
  )(dbResults);

  if (!existingEntries || existingEntries.length < 1) {
    return;
  }

  const updatePromises = existingEntries.map((x) => {
    const { row } = x;
    const { id } = row;
    const baseEntry = flavours.find((x) => x.id == id);
    Object.keys(baseEntry).forEach((key) => {
      if (key !== "id") {
        row[key] = baseEntry[key];
      }
    });

    return row.save();
  });

  await Promise.all(updatePromises);
}

async function seedInitialSellerData() {
  if (!config.db.primary.dbDefaultSellerUser.seedEnabled) {
    return;
  }

  const email = config.db.primary.dbDefaultSellerUser.email;

  const kitchenMetadata = {
    name: "Default Seller Kitchen",
    email,
  };
  const kitchenCreatedResult = await primaryDb.sequelizeInstance.models.Kitchens.findOrCreate(
    {
      where: {
        email
      },
      defaults: {
        ...kitchenMetadata,
      },
    }
  );

  const kitchenRow = kitchenCreatedResult[0].toJSON();

  const superUser = {
    name: "Hussein Seller",
    email,
    phoneNumber: "0176291725",
    addressLine1: "H7-3-2 Menara Polo",
    roleId: 2,
    kitchenId: kitchenRow.id,
  };

  const userCreationResult = await primaryDb.sequelizeInstance.models.Users.findOrCreate(
    {
      where: {
        email: superUser.email,
      },
      defaults: {
        ...superUser,
      },
    }
  );

  const dbSuperUser = {
    row: userCreationResult[0].toJSON(),
    created: userCreationResult[1],
  };

  const hashedPassword = await Utilities.Bcrypt.hashPassword({
    password: config.db.primary.dbDefaultSellerUser.password,
  });
  const { id: userId } = dbSuperUser.row;
  const createPasswordEntryPromise = primaryDb.sequelizeInstance.models.UserCredentials.findOrCreate(
    {
      where: {
        userId,
      },
      defaults: {
        password: hashedPassword,
      },
    }
  );

  await Promise.all([createPasswordEntryPromise]);
}

// async function seedOrderTypesData() {
//   if (!config.db.primary.dbMasterDataOrderTypesSeedEnabled) {
//     return;
//   }

//   const orderTypes = constants.ORDER_TYPES.DB_ORDER_TYPES;
//   const promises = orderTypes.map((type) => {
//     const { id } = type;

//     return primaryDb.sequelizeInstance.models.OrderTypes.findOrCreate({
//       where: {
//         id,
//       },
//       defaults: { ...type },
//     });
//   });
//   const dbResults = await Promise.all(promises);

//   if (!config.db.primary.dbMasterDataOrderTypesSeedOverwriteEnabled) {
//     return;
//   }

//   const existingEntries = flow(
//     map((x) => {
//       return {
//         row: x[0],
//         created: x[1],
//       };
//     }),
//     filter((x) => x.created == false)
//   )(dbResults);

//   if (!existingEntries || existingEntries.length < 1) {
//     return;
//   }
//   const updatePromises = existingEntries.map((x) => {
//     const { row } = x;
//     const { id } = row;
//     const baseEntry = orderTypes.find((x) => x.id == id);
//     Object.keys(baseEntry).forEach((key) => {
//       if (key !== "id") {
//         row[key] = baseEntry[key];
//       }
//     });

//     return row.save();
//   });

//   await Promise.all(updatePromises);
// }

async function setupPrimaryDb() {
  if (config.db.primary.dbSyncEnabled) {
    await primaryDb.sequelizeInstance.sync();
  }

  await seedRoleMasterData();
  await seedCuisineTypeMasterData();
  await seedInitialSellerData();
  await seedFlavourMasterData();
  // await seedOrderTypesData();
}

module.exports = () => {
  const app = express();

  // setup app variable constants
  app.locals.ENV = config.env;

  // setup web server logging
  const webServerLoggerBase = pino({
    name: config.app.name,
    level: config.logging.level,
    prettyPrint: { colorize: true },
  });
  const webServerLogger = pinoExpress({
    logger: webServerLoggerBase,
  });

  app.use(webServerLogger);
  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser());
  app.use(compress());
  app.use(methodOverride());

  // setup controllers
  const controllers = glob.sync(`${config.rootPath}/controllers/*.js`);
  controllers.forEach((controller) => {
    require(controller)(app);
  });

  // error handing setup
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.httpErrorCode = 404;
    next(err);
  });
  app.use((error, req, res, next) => {
    const status = error.httpErrorCode || 500;
    res.status(status);

    if (config.env !== "production") {
      // ensures error object gets all details
      const jsonString = JSON.stringify(error, (key, value) => {
        if (value instanceof Error) {
          const error = {};

          Object.getOwnPropertyNames(value).forEach((key) => {
            error[key] = value[key];
          });

          return error;
        }

        return value;
      });
      const jsonObject = JSON.parse(jsonString);
      res.send({
        ...jsonObject,
      });
      return;
    }

    res.json({
      status,
      message: error.message,
    });
  });

  // Startup routine
  setupPrimaryDb()
    .then(() => {
      console.log("DB setup complete");
      app.listen(config.port, () => {
        console.log("Express server listening on port " + config.port);
      });
    })
    .catch((error) => console.error("Startup failed", error));
};
