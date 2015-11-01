'use strict';

let React = require('react');

let BlankLink = React.createClass({
  propTypes: {
    href: React.PropTypes.string.isRequired
  },

  render() {
    const {href, children} = this.props;
    return (
      // TOOD: new window icon
      <a href={href} target="_blank">{children}</a>
    );
  }
});

module.exports = {
  BlankLink
};
