let React = require('react');
let classNames = require('classnames');

let {BlankLink} = require('../links');

let SpendIndiegogoLink = React.createClass({
  propTypes: {
    eventLabel: React.PropTypes.string.isRequired
  },

  render() {
    const {eventLabel, className} = this.props;
    return (
      <BlankLink className={classNames('SpendIndiegogoLink text-uppercase', className)} href={CONF.INDIEGOGO_URL} clickEvent={{category: 'Indiegogo Link', label: eventLabel}}>Support us on <span className="SpendIndiegogoLink-logo text-hide">Indiegogo</span></BlankLink>
    );
  }
});

module.exports = SpendIndiegogoLink;
