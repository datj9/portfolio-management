'use strict';

/**
 * contact-request controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact-request.contact-request', ({ strapi }) => ({
  async create(ctx) {
    try {
      const { name, email, company, subject, message } = ctx.request.body.data;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return ctx.badRequest('Missing required fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return ctx.badRequest('Invalid email format');
      }

      // Create the contact request
      const contactRequest = await strapi.entityService.create(
        'api::contact-request.contact-request',
        {
          data: {
            name,
            email,
            company: company || null,
            subject,
            message,
            publishedAt: null, // Keep as draft by default
          },
        }
      );

      return ctx.created({
        data: contactRequest,
        message: 'Contact request submitted successfully',
      });
    } catch (error) {
      strapi.log.error('Contact request creation failed:', error);
      return ctx.internalServerError('Failed to submit contact request');
    }
  },
}));
