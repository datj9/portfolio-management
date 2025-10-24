'use strict';

/**
 * cv-generator router
 */

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/cv-generator/generate',
      handler: 'cv-generator.generate',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

