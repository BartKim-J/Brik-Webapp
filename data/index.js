'use strict';

function requireData(id) {
  try {
    return require(`./${id}`);
  } catch (e) {
    return require(`./examples/${id}`);
  }
}

module.exports = {
  faqSections: requireData('faqSections'),
  jobOpenings: requireData('jobOpenings'),
  team: requireData('team')
};
