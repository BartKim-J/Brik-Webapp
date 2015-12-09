let React = require('react');
let classNames = require('classnames');

let {BlankLink} = require('../links');

let SpendIndiegogoLink = React.createClass({
  render() {
    return (
      <BlankLink className={classNames('SpendIndiegogoLink text-uppercase', this.props.className)} href={CONF.INDIEGOGO_URL}>Support us on <span className="SpendIndiegogoLink-logo text-hide">Indiegogo</span></BlankLink>
    );
  }
});

module.exports = SpendIndiegogoLink;
