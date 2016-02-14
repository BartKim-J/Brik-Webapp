let Immutable = require('seamless-immutable');

let omit = require('lodash/object/omit');

let messages = Immutable({
  emailPlaceholder: `E-mail address`,
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

  'index.heading': `Spend everywhere with one device`,
  'index.design.heading': `Splendid Design`,
  'index.design.description': `The frame is made of aluminum, one of the strongest and lightest materials on earth. This makes the device strong and durable enough for everyday use in your pocket. Plastic on the front and back cover finishes up the design with style. SpendWallet has been engineered to seamlessly work with your smooth payment experience.`,
  'index.measure.heading': `Slim. Solid.<br /> SpendWallet`,
  'index.measure.dimensions': `6.0mm / 65grams`,
  'index.measure.dimensions2': `Thickness: 6.0mm Dimension: 60.5mm x 105mm`,
  'index.display.heading': `Hidden LED Display`,
  'index.display.description': `The hidden LED display aboard SpendWallet will not be shown on the surface of the device when not in use. When necessary, it will show which card you’ve selected, whether it is correctly connected to your phone, and how low the battery is.`,
  'index.charge.heading': `Simply Rechargeable`,
  'index.charge.description': `SpendWallet has a rechargeable battery that generally lasts for a month. When you are notified of low battery, simply charge it with the included micro USB cable.`,
  'index.charge.batterylife': `Up to 4 weeks of battery life`,
  'index.electronicwallet.heading': `True Electronic Wallet`,
  'index.electronicwallet.description': `Your heavy, thick traditional wallet should better evolve into a smart digital wallet.<br /> Finally, a real physical electronic wallet that consolidates all your cards.`,
  'index.security.alert.name': `Proximity Alert`,
  'index.security.alert.description': `Automatic lock &\nself-destruction when lost`,
  'index.security.passcode.name': `Security Passcode`,
  'index.security.passcode.description': `Protect your card data\nwith passcode or fingerprint`,
  'index.security.encrypt.name': `Bank Level Encyrption`,
  'index.security.encrypt.description': `256 bit encryption\nfor all your personal data`,
  'index.application.heading': `application`,
  'index.application.description': `Meet the app that is all-in-one for your financial management. With this app, you can easily manage credit cards, save barcodes and coupons and see expenditure analysis. As much as we care about how much you spend, we put our most effort into how smart you spend.`,
  'index.button.video': `Video coming soon`,
  'index.button.preorder': `Pre-Order Coming Soon`,
  'index.preorder.heading': `Worldwide Shipping`,
  'index.preorder.description': `Pre-Order Coming Soon`,

  jobOpenings: require('./data/jobOpenings'),
  legalDocs: require('./data/legalDocs'),
  team: require('./data/team'),
  faqSections: require('./data/faqSections'),
  'faq.furtherAssistance': `Do you need any further assistance?`,
  'faq.dontHesitate': `Please do not hesitate to contact us.`,
  'faq.title': `F<span class="visible-md-inline visible-lg-inline">requently </span>A<span class="visible-md-inline visible-lg-inline">sked </span>Q<span class="visible-md-inline visible-lg-inline">uestions</span>`,
  'faq.description': `You can find some answers to commonly asked questions below.`,
  'faq.emailUs': `Email Us`,

  'jobs.title': `Join <span class="SpendLogo">spend.</span> <span class="visible-md-inline visible-lg-inline"> Journey</span>`,
  'jobs.description': `Working at Spend is more than a job`,
  'jobs.whatIsSpend': `What is <span class="SpendLogo">spend.</span>?`,
  'jobs.weAreLooking': `We are looking for an X Engineer who can join the journey of developing a valuable product with technology we create.`,
  'jobs.whatIsSpendDescription': `We are developing SpendWallet that can be used not only online but also offline that comprises 90% of total commercial transaction. X Engineering believes that everyone stands to benefit from the advance of technology.`,
  'jobs.additionalPositions': `Don't see the position you're looking for?`,
  'jobs.hearFromYou': `We'd still love to hear from you! Email us at <a href="mailto:recruit@xengineering.co">recruit@xengineering.co</a>`,
  'jobs.openRoles': `Open Roles`,

  'team.title': `Meet the team behind <span class="SpendLogo">spend.</span>`,
  'team.description': `We dream about incredible things`,
  'team.joinTheTeam': `Join the Team`,
  'team.weAreHiring': `We're hiring for a number of different positions`,
  'team.viewOpenings': `View Openings`,

  'menu.team': `Team`,
  'menu.jobs': `Jobs`,
  'menu.faq': `FAQ`,

  'footer.team': `Team`,
  'footer.jobs': `Jobs`,
  'footer.faq': `FAQ`,
  'footer.legal': `Legal`,
  'footer.copyrights': `2016 X Lab Inc. All Rights Reserved.`,

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
