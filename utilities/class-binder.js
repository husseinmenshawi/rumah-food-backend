'use strict';

class ClassBinder {}

// eslint-disable-next-line max-len
ClassBinder.getAllMethods = (instance, cls) => Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
  .filter((name) => {
    const method = instance[name];
    return !(!(method instanceof Function) || method === cls);
  });

ClassBinder.bind = (instance, cls) => {
  ClassBinder.getAllMethods(instance, cls)
    .forEach((mtd) => {
      instance[mtd] = instance[mtd].bind(instance);
    });
};

module.exports = ClassBinder;
