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
      answer: `You can store a card as long as the backside of the card has a magnetic stripe. Membership cards with barcodes can be saved on Spendwallet mobile application.`
    }, {
      question: `How many cards can be stored on Spendwallet?`,
      answer: `Up to 20 cards can be stored on Spendwallet.`
    }, {
      question: `How long does the battery last?`,
      answer: `When Spendwallet is fully charged, the battery lasts up to 30 days.`
    }, {
      question: `What mobile devices does Spendwallet support?`,
      answer: `Spendwallet supports devices with Android version 4.3 and above, and iOS 8 and above.`
    }]
  },
  {
    title: `How to Use`,
    entries: [{
      question: `How do I store my cards on Spendwallet?`,
      answer: `Install Spendwallet mobile application and connect your Spendwallet reader to your phone's headphone jack. Then, swipe the payment cards smoothly through the reader and sync with Spendwallet via Bluetooth to transfer card data to Spendwallet.`
    }, {
      question: `How can I select which card to use on Spendwallet?`,
      answer: `Select which card to use using left and right button, and make sure whether your card’s nickname is correctly appeared on LED display.`
    }, {
      question: `How can I make a payment with Spendwallet?`,
      answer: `Tap 'SPEND' button on Spendwallet and bring it close to the card reading terminal.`
    }, {
      question: `How can I store my identification card on Spendwallet?`,
      answer: `You can use the backside card slot of Spendwallet for your ID or any extra plastic cards you need to carry around.`
    }, {
      question: `Should I turn on Bluetooth while using Spendwallet?`,
      answer: `We recommend turning on Bluetooth while using Spendwallet, but you can still use your Spendwallet without the Bluetooth.`
    }, {
      question: `Can I use Spendwallet in a restaurant or a drive-thru where I hand over the Spendwallet to the waiter or cashier?`,
      answer: `For restaurants and drive-thru, you can leverage the waiter mode. You can lock unto one specific card type on Spendwallet, and hand it over to the waiter or cashier. They only have to bring the device near the reader to make it work.`
    }, {
      question: `How does Spendwallet work at the gas station or ATM where you must slide a card in?`,
      answer: `Unfortunately, Spendwallet does not support payments at gas station or ATM. This is why we placed a backside cardslot on Spendwallet for you to carry an ATM card or an emergency card.`
    }]
  }],
  col2: [{
    title: `Technology`,
    entries: [{
      question: `How is it possible to make a payment everywhere?`,
      answer: `When you bring Spendwallet near to the card reader, our self-developed Magnetic Flux Emulation (MFE) technology generates magnetic field, which makes the card reader to respond as if a card were swiped. Hence, Spendwallet can be used anywhere that accepts magnetic payment cards.`
    }, {
      question: `How is Spendwallet different from all those all-in-one smart cards?`,
      answer: `Spendwallet works better. We’ve tested all available smart cards in the market and concluded that using rewritable magnetic stripe cannot guarantee 100% reliability due to technological deficiency. Instead of swiping, Spendwallet adopts a tap-to-pay method, providing the highest coverage.`
    }, {
      question: `Some retailers require EMV chip payments. Will Spendwallet support EMV?`,
      answer: `We have been preparing for the EMV shift since early this year. We are currently in talk with banks and card issuers to support EMV on Spendwallet using tokenized MFE. We will try our best to support this feature before the ship date, but if that does not work out, we will provide a software update as soon as it is ready. After the update, you will be able to use Spendwallet with no problem on chip requiring terminals.`
    }]
  },
  {
    title: `Security`,
    entries: [{
      question: `Should I worry about security problem when transferring my card information onto Spendwallet?`,
      answer: `No, the information stored on Spendwallet mobile application will be safely transferred to Spendwallet device according to Bluetooth standard security. Also, Spendwallet provides bank level 256-bit encryption to secure all personal data.`
    }, {
      question: `What happens when I lose Spendwallet?`,
      answer: `When your smartphone and Spendwallet is connected via Bluetooth and the Spendwallet is 20m away from your smartphone, you will be kindly notified that you left your Spendwallet behind. In addition, Spendwallet will automatically lock itself and self-destruct included data when lost.`
    }, {
      question: `How can I maintain Spendwallet's security without turning on Bluetooth on my phone?`,
      answer: `If you prefer to turn off Bluetooth, you can choose to use passcode authentication before each transaction for security. It is also possible to turn off all security function.`
    }, {
      question: `What is passcode and how do I set it up?`,
      answer: `Passcode is the security equipment for you to safely protect your card information. As the passcode is set with the left, right, and SPEND button on the mobile application, this passcode can be identically used on Spendwallet.`
    }, {
      question: `What if I forget the passcode?`,
      answer: `When you forget the passcode, you can reset your passcode on your mobile application after verifying your identity.`
    }
  ]
  }, {
    title: `Order & Shipping`,
    entries: [{
      question: `Where can I purchase Spendwallet?`,
      answer: `You can purchase Spendwallet at our Indiegogo page(http://igg.me/at/spendwallet) starting on May 17.`
    }, {
      question: `When will I get my Spendwallet?`,
      answer: `Spendwallet will be delivered sequentially from April 2017.`
    }, {
      question: `Do you ship internationally?`,
      answer: `We do ship internationally, but shipping cost will vary depending on countries.`
    }]
  }]
});
