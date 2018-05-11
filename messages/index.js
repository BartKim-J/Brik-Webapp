let Immutable = require('seamless-immutable');

let omit = require('lodash/object/omit');

let messages = Immutable({
  emailPlaceholder: `Subscribe for updates`,

  'index.heading_title': `Monitor your<br /> everyday health data.`,
  'index.heading_1': `Astera is a blockchain for your`,
  'index.heading_2': `personal health data. Collect and`,
  'index.heading_3': `control your everyday data with`,
  'index.heading_4': `Astera device we provide for free.`,
  'index.newsletter.heading': `Stay up to date with our latest updates`,
  'index.newsletter.submit': `Submit`,
  'index.newsletter.description': `To stay in touch on our latest updates.`,
  'index.charge.description': `IoMT hardware for<br /> health data blockchain.`,
  'index.menu.whitepaper': `Download Whitepaper `,
  'index.menu.whitepaper_full':'Full',
  'index.menu.whitepaper_full.content':'/WP/ASTERA_WP_EN_FULL.pdf',
  'index.menu.whitepaper_short':'Short',
  'index.menu.whitepaper_short.content':'/WP/ASTERA_WP_EN_SHORT.pdf',
  'index.button.language': `언어: 한국어`,

  jobOpenings: require('./data/jobOpenings'),
  legalDocs: require('./data/legalDocs'),
  team: require('./data/team'),
  faqSections: require('./data/faqSections'),

  'footer.copyrights': `©2018 Astera. All Rights Reserved.`,
  'footer.email': `hey@astera.io`,

  'success.title': `Thank you!`,
  'success.description': ` Thank you for subscribing to our newsletter.<br>Please check your email for more information.`,
  'success.back': `Back to home`,

  getNonData() {
    return Immutable(
      omit(this, 'faqSections', 'jobOpenings', 'legalDocs', 'team')
    );
  },

  lang(code) {
    try {
      return module.require(`./${code}`);
    } catch (e) {
      return messages;
    }
  }
});

module.exports = messages;
