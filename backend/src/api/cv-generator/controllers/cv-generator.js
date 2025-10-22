'use strict';

/**
 * cv-generator controller
 */

module.exports = {
  async generate(ctx) {
    try {
      const result = await strapi.service('api::cv-generator.cv-generator').generateCV();
      
      ctx.body = {
        success: true,
        message: 'CV generated successfully',
        data: result,
      };
    } catch (error) {
      strapi.log.error('Error generating CV:', error);
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Failed to generate CV',
        error: error.message,
      };
    }
  },
};

