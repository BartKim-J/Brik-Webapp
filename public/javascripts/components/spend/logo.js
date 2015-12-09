let React = require('react');
let classNames = require('classnames');

let SpendLogo = React.createClass({
  render() {
    return (
      <span className={classNames('SpendLogo', this.props.className)}>spend.</span>
    );
  }
});

module.exports = SpendLogo;
