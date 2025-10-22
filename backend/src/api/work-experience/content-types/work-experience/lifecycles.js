'use strict';

/**
 * Lifecycle callbacks for the `work-experience` content type.
 */

module.exports = {
  async afterCreate(event) {
    await triggerCVGeneration();
  },

  async afterUpdate(event) {
    await triggerCVGeneration();
  },

  async afterDelete(event) {
    await triggerCVGeneration();
  },
};

async function triggerCVGeneration() {
  try {
    await strapi.service('api::cv-generator.cv-generator').generateCV();
    strapi.log.info('CV regenerated after work experience change');
  } catch (error) {
    strapi.log.error('Failed to regenerate CV:', error);
  }
}

