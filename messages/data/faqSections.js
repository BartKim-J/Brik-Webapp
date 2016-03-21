let Immutable = require('seamless-immutable');

// `entry.answer`: Markdown; support for paragraph checked

module.exports = Immutable({
  col1: [{
    title: `About Spendwallet`,
    entries: [{
      question: `What is Spendwallet?`,
      answer: `Spendwallet is a cutting-edge smart wallet that digitally consolidates credit, debit and gift cards securely into one device.`
    }, {
      question: `Why do I need Spendwallet?`,
      answer: `Too many cards. Too much hassle. If the reason for your thick wallet was a large number of cards with which you would like to have the utmost benefit, neither your smart spending nor your slim pocket should be given up. It is time for your heavy, thick traditional wallet to evolve into smart wallet that converts all those cards into digital information.`
    }, {
      question: `What types of cards can I store on Spendwallet?`,
      answer: `As long as the backside of the cards has a magnetic stripe, you can store credit, debit, gift and all other types of cards into one device. The point cards with barcode can be saved on Spendwallet mobile application.`
    }, {
      question: `How many cards can be stored on Spendwallet?`,
      answer: `Up to 20 cards can be stored on Spendwallet.`
    }, {
      question: `How long does the battery last?`,
      answer: `When Spendwallet is fully charged, the battery lasts up to 30 days.`
    }, {
      question: `What mobile devices does Spendwallet support?`,
      answer: `Spendwallet supports Android as well as Iphone.`
    }]
  },
  {
    title: `How to Use`,
    entries: [{
      question: `How do I store my cards on Spendwallet?`,
      answer: `Install Spendwallet mobile application and connect your Spendwallet reader to headphone jack. Then, swipe the payment cards smoothly through the reader and sync with Spendwallet via Bluetooth to transfer card data to Spendwallet.`
    }, {
      question: `How can I select which card to use on Spendwallet?`,
      answer: `Select which card to use using left and right button, and make sure whether your card’s nickname is correctly appeared on LED display.`
    }, {
      question: `How can I make a payment with Spendwallet?`,
      answer: `Tap 'SPEND' button on Spendwallet and bring it close to the card reader.`
    }, {
      question: `How can I store my identification card on Spendwallet?`,
      answer: `You can store your identification card on backside slot of Spendwallet.`
    }, {
      question: `Should I turn on Bluetooth while using Spendwallet?`,
      answer: `Even when you do not turn on Bluetooth on your phone, you can still use your Spendwallet.`
    }]
  }],
  col2: [{
    title: `Technology`,
    entries: [{
      question: `How is it possible to make a payment everywhere?`,
      answer: `When you bring Spendwallet near to the card reader, our self-developed Magnetic Flux Emulation (MFE) technology generates magnetic field, which makes the card reader to respond as if a card were swiped. Hence, Spendwallet can be used anywhere that accepts magnetic payment cards.`
    }, {
      question: `How is Spendwallet different from all those all-in-one smart cards?`,
      answer: `SpendWallet works better. We’ve tested all available smart cards in the market and concluded that the method of swiping cannot guarantee 100% reliability due to technological deficiency. Instead of swiping, SpendWallet adopts a tap-to-pay method, providing the highest coverage.`
    }]
  },
  {
    title: `Security`,
    entries: [{
      question: `Should I worry about security problem when transferring my card information onto Spendwallet?`,
      answer: `No, the information stored on Spendwallet mobile application will be safely transferred to Spendwallet device according to Bluetooth standard security. Also, Spendwallet provides bank level (256 bit) encryption for all personal data.`
    }, {
      question: `What happens when I lose Spendwallet?`,
      answer: `When your smartphone and Spendwallet is connected via Bluetooth, and the Spendwallet is 20m away from your smarthpone, you will be kindly notified that you left your Spendwallet behind. In addition, Spendwallet is automatically locked and included data will be self-destructed when lost.`
    }, {
      question: `How can I maintain Spendwallet's security without turning on Bluetooth on my phone?`,
      answer: `If you prefer to turn off Bluetooth, you can either enter passcode for each transaction for security or simply turn off the security function.`
    }, {
      question: `What is passcode and how do I set it up?`,
      answer: `Passcode is the security equipment for you to safely protect your card information. As the passcode is set with the left and right button as well as SPEND button on mobile application, the passcode can be identically used on Spendwallet.`
    }, {
      question: `What if I forget the passcode?`,
      answer: `When you forget the passcode, you can reset your passcode on your mobile application after verifying yourself.`
    }
  ]
  }, {
    title: `Order & Shipping`,
    entries: [{
      question: `Where can I purchase Spendwallet?`,
      answer: `You can currently buy Spendwallet at our Indiegogo page only.`
    }, {
      question: `When will I get my Spendwallet?`,
      answer: `We estimate shipping no later than by August 2016.`
    }, {
      question: `Do you ship internationally?`,
      answer: `We do ship internationally, but shipping cost will vary depending on countries.`
    }]
  }]
});
