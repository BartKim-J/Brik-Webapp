let Immutable = require('seamless-immutable');

// `entry.answer`: Markdown; support for paragraph checked

module.exports = Immutable({
  col1: [{
    title: `General`,
    entries: [{
      question: `What is Spendwallet?`,
      answer: `Spendwallet is the world's first physical electronic wallet that pays with just a tap. With its magnetic flux emulation technology, Spendwallet can be used anywhere that accepts magnetic payment cards.`
    }, {
      question: `What types of cards can I store on Spendwallet?`,
      answer: `As long as the backside of the cards has a magnetic stripe, you can store credit, debit, gift and all other types of cards into one device. The point cards with barcode can be saved on Spendwallet mobile application and easily used.`
    }, {
      question: `How many cards can be stored on Spendwallet?`,
      answer: `Up to 20 cards can be stored on Spendwallet.`
    }, {
      question: `How do I store my cards on Spendwallet?`,
      answer: `First install Spendwallet mobile application and connect your Spendwallet reader to headphone jack. After you connect mobile phone and device via Bluetooth, swipe the payment cards smoothly through the reader to store your cards on Spendwallet.`
    }, {
      question: `How can I select which card to use on Spendwallet?`,
      answer: `With the help of the Spendwallet's left and right button, select which card to use and make sure whether your card's nickname is correctly appeared on LED display.`
    }, {
      question: `How can I make a payment with Spendwallet?`,
      answer: `After making sure whether the right card was selected on LED display, bring your Spendwallet near to the card reader and press “SPEND” button on Spendwallet to make a payment.`
    }, {
      question: `How can I store my identification card on Spendwallet?`,
      answer: `You can store your identification card on backside slot of Spendwallet.`
    }, {
      question: `What mobile devices does Spendwallet support?`,
      answer: `Spendwallet suppots Android as well as Iphone.`
    }, {
      question: `How long does the battery last?`,
      answer: `When Spendwallet is fully charged, the battery lasts up to 30 days.`
    }, {
      question: `Where can I purchase Spendwallet?`,
      answer: `You can purchase Spendwallet at either our website(spendwallet.com) or Kickstarter.`
    }]
  }],
  col2: [{
    title: `Security`,
    entries: [{
      question: `How do I transfer my card information onto Spendwallet? Any security problems?`,
      answer: `The information stored on Spendwallet mobile application will be safely transferred to Spendwallet device through Bluetooth connection. As the communication is completed according to Bluetooth standard security standard, there is no such problem with security.`
    }, {
      question: `What happens when I lose Spendwallet?`,
      answer: `When your smartphone and Spendwallet is connected via Bluetooth, you don't need to worry about losing your wallet. When the Spendwallet is 20m away from your smarthpone, you will be kindly notified that you left your Spendwallet behind. Even if you did not have a Bluetooth connection and lost your Spendwallet, the passcode you first entered will safely protect Spendwallet from other's hands. In addition, when Spendwallet remains as lost mode for a certain period of time, all the information stored on Spendwallet will be completely deleted. The Spendwallet is safer than any other wallet, credit card, and other payment service, and thus safely protect your card information.`
    }, {
      question: `How can I maintain SPEND's security without turning on Bluetooth on my phone?`,
      answer: `Even when you did not turn on Bluetooth on your phone, you can still use your Spendwallet. If you prefer to turn off Bluetooth, you can either enter passcode for each transaction for security or simply turn off the security function.`
    }, {
      question: `What is passcode and how do I set it up?`,
      answer: `passcode is the security equipment for you to safely protect your card information. You can set your passcode when you first open the mobile application. Since the passcode is set with the left and right button as well as SPEND button, the passcode can be identically used on Spendwallet.`
    }, {
      question: `What if I forget the passcode?`,
      answer: `When you forget the passcode, you can reset your passcode on your mobile application after verifying yourself.`
    }]
  }, {
    title: `Shipment`,
    entries: [{
      question: `When will I get my Spendwallet?`,
      answer: `You will receive Spendwallet within 3 months. Though, we will try our best to ship the product to you as soon as possible. -> We estimate shipping no later than by April 2016.`
    }, {
      question: `Do you ship internationally?`,
      answer: `We do ship internationally, but shipping cost will vary depending on countries.`
    }]
  }]
});
