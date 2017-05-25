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
  'index.contactless.paragraphs': /* Markdown */ `It's more than NFC. With our self-developed Magnetic Flux Emulation (MFE) technology, Spendwallet allows you to tap to pay on regular card swiping terminal as well as NFC terminal.`,
  'index.physicalCards.article': /* Markdown */ `## Born to replace your wallet, completely.

Spendwallet is seductively designed to completely replace your existing wallet. The backside pocket is for your ID, cash, or anything that cannot be stored digitally on the device.`,

  'index.heading.fat': `Meet Spendwallet`,
  'index.heading': `The thinnest electronic wallet<br> that consolidates all your cards`,
  'index.newsletter.heading': `Sign up for our newsletter now.`,
  'index.newsletter.description': `To stay in touch on our latest updates.`,
  'index.design.heading': `Splendid Design`,
  'index.design.description': `The frame and body is made out of aluminum and plastic. This makes the device strong and durable enough for everyday use in your pocket. Spendwallet has been engineered to seamlessly work with your smooth payment experience.`,
  'index.measure.heading': `Slim. Solid.<br /> Spendwallet`,
  'index.measure.dimensions': `5.8mm / 54grams`,
  'index.measure.dimensions2': `Thickness: 5.8mm Dimensions: 60.5mm x 105mm`,
  'index.charge.heading': `Introducing True Electronic wallet.`,
  'index.charge.description': `Your heavy, thick traditional wallet should better evolve into a smart digital wallet. Finally, a real physical electronic wallet that consolidates all your credit, debit, and gift cards.`,
  'index.tech.section.heading': `Tech Specifications`,
  'index.tech.heading': `True Electronic Wallet`,
  'index.tech.description': `Your heavy, thick traditional wallet should better evolve into a smart digital wallet.<br /> Finally, a real physical electronic wallet that consolidates all your cards.`,
  'index.tech.touch.title': `Capacitive<br /> Touch Sensors`,
  'index.tech.touch.description': `Easy button to select the card`,
  'index.tech.battery.title': `Simply<br /> Rechargeable`,
  'index.tech.battery.description': `Up to 4 weeks of battery life`,
  'index.tech.led.title': `Hidden<br /> LED Display`,
  'index.tech.led.description': `Shown only when in use`,
  'index.security.section.heading': `Security`,
  'index.security.section.description': `Meet the world’s most secure wallet.`,
  'index.security.alert.name': `Proximity Alert`,
  'index.security.alert.description': `When lost, automatic lock &\nself-destruction of data`,
  'index.security.passcode.name': `Security Passcode`,
  'index.security.passcode.description': `Protect your card data\nwith passcode or fingerprint`,
  'index.security.encrypt.name': `Bank Level Encryption`,
  'index.security.encrypt.description': `256 bit encryption\nfor all your personal data`,
  'index.application.heading': `application`,
  'index.application.description': `Manage credit cards, save barcodes & coupons, and see expenditure analysis on your smartphone through Spend mobile application.`,
  'index.button.video': `Video coming soon`,
  'index.button.preorder': `Pre-order on `,
  'index.button.language': `언어: 한국어`,
  'index.button.scroll': `SUBSCRIBE TO OUR NEWS`,

  'index.preorder.heading': `Worldwide Shipping`,
  'index.preorder.description': `Ships August 2017`,

  jobOpenings: require('./data/jobOpenings'),
  legalDocs: require('./data/legalDocs'),
  team: require('./data/team'),
  faqSections: require('./data/faqSections'),
  'faq.furtherAssistance': `More questions?`,
  'faq.dontHesitate': `Please do not hesitate to contact us.`,
  'faq.title': `F<span class="visible-md-inline visible-lg-inline">requently </span>A<span class="visible-md-inline visible-lg-inline">sked </span>Q<span class="visible-md-inline visible-lg-inline">uestions</span>`,
  'faq.description': `We care to answer before you ask.`,
  'faq.emailUs': `Email Us`,

  'jobs.title': `Join <span class="SpendLogo">spend.</span> <span class="visible-md-inline visible-lg-inline"></span>`,
  'jobs.description': `When we get off work, we say it's been a splendid day.`,
  'jobs.whatIsSpend': `Why are we at <span class="SpendLogo">spend.</span>?`,
  'jobs.weAreLooking': `In the name of our core belief that everyone stands to benefit from the advance of technology, we are looking for those who aspire to take our commitment to new heights.`,
  'jobs.whatIsSpendDescription': `At Spend, we take great pride in ourselves that we undertake pioneering work on a product that underpins the payment industry. The work we do matters.`,
  'jobs.additionalPositions': `Don't see the position you're looking for?`,
  'jobs.hearFromYou': `We'd still love to hear from you! Email us at <a href="mailto:recruit@xengineering.co">recruit@xengineering.co</a>`,
  'jobs.openRoles': `Open Roles`,

  'team.title': `Meet the team behind <span class="SpendLogo">spend.</span>`,
  'team.description': `We make things to change the world better.`,
  'team.joinTheTeam': `Join the Team`,
  'team.weAreHiring': `We're hiring for a number of different positions.`,
  'team.viewOpenings': `View Openings`,

  'menu.team': `Team`,
  'menu.jobs': `Jobs`,
  'menu.faq': `FAQ`,
  'menu.promotion': `Promotion`,

  'footer.team': `Team`,
  'footer.jobs': `Jobs`,
  'footer.faq': `FAQ`,
  'footer.legal': `Legal`,
  'footer.copyrights': `2017 X Lab Inc. Newport Beach, California. All Rights Reserved.`,
  'footer.email': `hey@spendwallet.com`,
  'footer.presskit': `Press`,

  'promotion.title': `Thank you!`,
  'promotion.description': `Spendwallet’s launch date is just around the corner. We'll make sure to keep you posted and to provide an access to EXCLUSIVE sales!`,
  'promotion.descriptionSecond': `Enter the free Spendwallet lottery below by completing each task. More tasks you do, more entries you get. You start with one entry. Complete one more and double your chance of winning. Though, why stop there? Go get them all!`,
  'promotion.callToAction': `Best of luck to you.`,

  'success.title': `Thank you!`,
  'success.description': ` Thank you for subscribing to our newsletter.<br>Please check your email for more information.`,
  'success.back': `Back to home`,

  'presskit.title': `Press Kit`,
  'presskit.description': `If you need more information, please contact us at pr@spendwallet.com`,

  'presskit.message.title': `Press Release (TC Disrupt NY 2017)`,
  'presskit.message.date': `Last updated on May 08, 2017`,
  'presskit.message': `
    <p><b>*X Lab unveils two new products that implement their innovative magnetic payment solution at TC Disrupt NY 2017*</b></p>
    <p><i>A microscopic chip with X Lab's patented magnetic payment solution is ready to make big waves in the payment industry as it transforms the way people pay. This tiny chip that consolidates all types of magnetic stripe cards can be installed in any small form factor to be used in every traditional magnetic card readers with a single tap.</i></p>
    <p>At Tech Crunch New York 2017, X Lab announced to uncover details of how its chip can be easily embedded in even a regular card-sized format and seamlessly used at traditional payment terminal. This was after they pulled off a successful crowdfunding campaign that secured $157,000 worth of pre-sales of their proof-of-concept-product, Spendwallet. To address the problem of traditional wallet that lacks storage and security, Spendwallet digitally consolidates all types of cards into one device using Magnetic Flux Emulation (MFE) technology and was awarded the best mobile accessory of 2017 MWC Barcelona.</p>
    <p>As the size and cost of X Lab's payment chip continues to dwindle, its potential use is expanding well beyond the payment sector, making this one technology that no business can afford to ignore. At MWC 2017, X Lab packaged their payment technology into a simple solution to be used by other IoT manufacturers and fashion brands who seek for new business opportunity of providing contactless payment solution that can be integrated with wearable devices. It solution was well received as it easily adapts to client’s needs with multi-form factors ranging from watch to ring to bracelet, and offers the assurance to the highest level of security by generating a tokenized temporary card number for each transaction.</p>
    <p>After confirming a growing market demand of its payment solution, X Lab carefully calibrated next Spend model and found TC Disrupt NY 2017 to be right place to bring their payment solution to life in two form factors - wearable and card. Spend Wearable may be already expected from X Lab, but Spend in card format was spotlighted for its compatibility of being put in original wallet or mobile phone case. It should be well noted that its solution with customized RF antenna can be integrated into as small as fitness tracker and as thin as card size.</p>
    <p>"For those who wish to keep using their original wallet with a sleek technology in it, Spend Card will be more than a right option." said Kevin Kang, a founder and CEO of X Lab. “The value of using Spend models will be further reinforced by Spend mobile app that effectively manages all types of cards through expenditure analysis and location based real-time card recommendation.”</p>
    <strong>Visit X Lab at TC Disrupt NY 2017</strong>
    <p>Attendees and media are invited to experience a demonstration of smart, secure payment with Spend lineup at TC Disrupt NY Startup Alley on May 16th.</p>
    <strong>ABOUT X LAB</strong>
    <p>X Lab is a Fintech IoT startup inaugurated in February 2015 to disrupt the offline payment system with its self-developed magnetic flux emulation technology as well as three patent pending payment and security technologies. The company, which consists of notable engineers from Cisco, LG Electronics, Qualcomm, Sony Mobile, etc., has received two rounds of funding to date. For more information, please go to http://www.spendwallet.com</p>
  `,

  'presskit2.message.title': `Press Release (MWC 2017)`,
  'presskit2.message.date': `Last updated on February 23, 2017`,
  'presskit2.message': `
    <p><b>X Lab opens their innovative magnetic payment platform for future wearables and IoT devices at MWC 2017</b></p>
    <p><i>A contactless magnetic payment solution consolidates all types of magnetic stripe cards onto a single chip that can be installed in any wearable devices to be used in every traditional magnetic card readers.</i></p>
    <p>(Los Angeles, CA) – X Lab announced a launch of MFE Payment Solution at MWC 2017 after they pulled off a successful crowdfunding campaign with their proof-of-concept product, Spendwallet. To address the problem of traditional wallet that lacks storage and security, Spendwallet digitally consolidates all types of cards into one device using Magnetic Flux Emulation (MFE) technology. After securing $142,000 worth of pre-sales on Indiegogo last summer, they decided to package their payment technology into a simple solution to be used by other IoT manufacturers.</p>
    <p>As consumers eagerly embrace the speed and convenience of tap-to-pay technology, many seek for new business opportunity of providing contactless payment solution that can be integrated with wearable devices. Apple and Android Pay are one of those which tried to deploy NFC payments on mobile and wearables, but currently only 6% of NFC terminals globally are compatible and additional installation of terminals makes mass adoption extremely tough. X Lab’s embedded MFE payment solution has been spotlighted for its compatibility of tapping to pay virtually anywhere that accepts magnetic cards, as MFE works by emitting magnetic fields through the air. </p>
    <p>This solution easily adapts to client’s needs with multi-form factors ranging from watch to ring to bracelet, and offers the assurance to the highest level of security by generating a tokenized temporary card number for each transaction. Further, X-Lab has established exciting feature that reinforces the value of MFE technology as the solution package includes mobile app that effectively manages all types of cards through expenditure analysis and location based real-time card recommendation.</p>
    <p>At MWC 2017, X-Lab unveils details of their solution for IoT manufacturers who have tried to come up with content that will make their product wearable enough to be worn on the user's wrist for a longer time. Indeed, wearable manufacturers prioritize “payment” feature as content to add to existing fitness tracking and healthcare features, as seen from Fitbit's acquisition of Coin. Existing fashion brands that are threatened by the growth of the wearable market are also producing products equipped with IoT functions, as evidenced by the collaboration of Tag Heuer and Android Wear.</p>
    <p>However, it is never easy for them to add payment feature themselves to their products. “Starting from software and hardware development, partnerships with banks, credit card companies, tokenization and secure elements for security, and to finally EMVCo. and PCI DSS certification, adding a payment feature on wearable devices are bound to be time-consuming, expensive, and complicated” said Kevin Kang, a founder and CEO of X Lab. “Our payment solution would save up to two years of development time, reduce cost dramatically and guarantee the highest levels of security.”</p>
    <strong>Visit X Lab at MWC 2017</strong>
    <p>Attendees and media are invited to experience a demonstration of smart, secure payment with Spendwallet at MWC from February 27-March 2 at 1C19 in MWC Hall 1 and C1.2 in 4YFN Montjuic Hall M8.</p>
    <strong>ABOUT X LAB</strong>
    <p>X Lab is a Fintech IoT startup inaugurated in February 2015 to disrupt the offline payment system with its self-developed magnetic flux emulation technology as well as three patent pending payment and security technologies. The company, which consists of notable engineers from Cisco, LG Electronics, Qualcomm, Sony Mobile, etc., has received two rounds of funding to date. For more information, please go to http://www.spendwallet.com</p>
  `,

  'presskit3.message.title': `Press Release`,
  'presskit3.message.date': `Last updated on May 15, 2016`,
  'presskit3.message': `
    <p><b>X Lab Announces Launch of Indiegogo Campaign for Spendwallet – An Innovative Smart Wallet</b></p>
    <p><i>Revolutionary Payment Technology Digitally Contains Consumer’s Credit, Debit and Gift Cards Securely in One Device that is Compatible with Any Retail Card Reader </i></p>
    <p>(Los Angeles, CA) – X Lab today introduced Spendwallet, its cutting-edge #smart #wallet that electronically consolidates #credit, #debit and #giftcards onto one physical, electronic device that removes the bulk of traditional, overflowing wallets.  Featuring a secure and easy-to-use interface, it allows users to instantly make a #payment anywhere with just a tap on existing #retail store card swipe equipment.  To help bring Spendwallet to market, X Lab has launched an #Indiegogo campaign (http://igg.me/at/spendwallet).  A limited number of Early Bird specials of 39% off MSRP will be available, as well as other offers.</p>
    <p>Unlike other payment services including Apple Pay and Android Pay, which are accepted in less than 5% of retailers, Spendwallet allows users to use their smartwallet in close to a 100% of all retail stores.  Spendwallet utilizes a revolutionary self-developed antenna and pulse emitting technology called magnetic flux emulation technology (MFE) that ensures consumers to securely and electronically store all types of cards on one device, without the need for the physical card.  When using Spendwallet, the MFE technology generates a magnetic field, which makes the card reader respond as if a card has been swiped. So instead of swiping, the users simply tap and finish their payment.</p>
    <p>Spendwallet is seductively designed to completely replace an existing wallet. Its frame and body are made out of aluminum and plastic, making the device strong and durable enough for everyday use in users’ pockets while also being lightweight to be convenient. The wallet can store the account information of up to 20 cards at a time and has a backside pocket for ID, cash, or anything that cannot be stored digitally on the device. </p>
    <p>Spendwallet also features bank level encryption, passcodes and automatic lock and data self-destruction mode when lost, making it one of the world’s most secure wallets. Both Spendwallet and the user’s smartphone constantly monitor each other's status through Bluetooth technology.  Thus, smartwallet can only be activated when it is near the user’s smartphone. If lost or stolen, Spendwallet automatically locks and data self-destructs. Additionally, the hidden LED display aboard Spendwallet will not be shown on the surface of the device when not in use to maintain the utmost privacy.</p>
    <p>“We are disrupting the offline payment system and marketplace with Spendwallet’s proprietary MFE technology that allows users to store their card data on one safe, portable and secure device,” said Kevin Kang, CEO of X Lab.  “We believe payments should be convenient and highly secure to empower users with the flexibility to pay anywhere with a simple tap.  Now if someone loses their wallet, they can be assured that nobody will have access to their cards to make unauthorized purchases.”</p>
    <p>Setup is easy with Spendwallet – users simply connect the included card reader to the headphone jack on their smartphone and swipe the payment cards through the reader to transfer the card data via Bluetooth to the Spendwallet app. Its easy-to-use interface allows users to swipe left and right on the display to select which card they want to use, and can make an instant payment at already existing retail credit machines by placing Spendwallet close to the card reader and tapping the ‘SPEND’ button. The Spendwallet will function for a month on one charge, making it the perfect digital wallet.</p>
    <strong>ABOUT X LAB</strong>
    <p>X Lab is a Fintech IoT startup inaugurated in February 2015 to disrupt the offline payment system with its self-developed magnetic flux emulation technology as well as three patent pending payment and security technologies. The company, which consists of notable engineers from Cisco, LG Electronics, Qualcomm, Sony Mobile, etc., has received two rounds of funding to date.  For more info, please go to http://www.spendwallet.com</p>
  `,

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
