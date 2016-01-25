let React = require('react');

let {BlankLink} = require('./links');

let BrowserUpgrade = React.createClass({
  render() {
    return (
      <p className="BrowserUpgrade">
        You are using an <strong>outdated</strong> browser. Please <BlankLink href="http://browsehappy.com" clickEvent={{category: 'Upgrade Your Browser'}}>upgrade your browser</BlankLink> to improve your experience.
      </p>
    );
  }
});

module.exports = BrowserUpgrade;
