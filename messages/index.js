let Immutable = require('seamless-immutable');

let omit = require('lodash/object/omit');

let messages = Immutable({
  emailPlaceholder: `E-mail address`,
  faqSections: require('./data/faqSections'),
  'index.contactless.header': `
    <h2 class="SpendIndex-contactless-h2">
      Contactless Payment, Anywhere.
    </h2>
    <p class="SpendIndex-contactless-h2-p">
      Tap to pay on existing card readers
    </p>
  `,
  'index.contactless.paragraphs': /* Markdown */ `No NFC. Our self-developed Magnetic Flux Emulation (MFE) technology generates changing magnetic fields over a short period of time, which makes the card reader to respond as if a card has been swiped. So no more swiping. Just tap and finish your payment anywhere.`,
  'index.formMessageBoard': `Stay updated with our campaign`,
  'index.physicalCards.article': /* Markdown */ `## Born to replace your wallet, completely.

SpendWallet is seductively designed to completely replace your existing wallet. The backside pocket is for your ID, cash, or anything that cannot be stored digitally on the device.`,
  jobOpenings: require('./data/jobOpenings'),
  legalDocs: require('./data/legalDocs'),
  team: require('./data/team'),

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
