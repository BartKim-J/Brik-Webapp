let React = require('react');
let classNames = require('classnames');
let {intlShape} = require('react-intl');

let {FormattedHTMLMessage} = require('../intl');
let {BlankLink} = require('../links');

let SpendIndiegogoLink = React.createClass({
  propTypes: {
    eventLabel: React.PropTypes.string.isRequired
  },
  contextTypes: {
    intl: intlShape.isRequired
  },

  render() {
    const {eventLabel, className} = this.props;
    let {formatMessage} = this.context.intl;
    return (
      <BlankLink className={classNames('SpendIndiegogoLink text-uppercase', className)} href={CONF.INDIEGOGO_URL} clickEvent={{category: 'Indiegogo Link', label: eventLabel}}>{formatMessage({id: `index.button.preorder`})}</BlankLink>
    );
  }
});

module.exports = SpendIndiegogoLink;
