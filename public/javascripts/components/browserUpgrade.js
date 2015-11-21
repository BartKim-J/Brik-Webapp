let React = require('react');

let {BlankLink} = require('./tags');

let BrowserUpgrade = React.createClass({
  render() {
    return (
      <p className="BrowserUpgrade">
        You are using an <strong>outdated</strong> browser. Please <BlankLink href="http://browsehappy.com">upgrade your browser</BlankLink> to improve your experience.
      </p>
    );
  }
});

module.exports = BrowserUpgrade;
