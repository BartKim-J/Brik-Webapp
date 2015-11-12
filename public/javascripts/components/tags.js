'use strict';

let React = require('react');
let classNames = require('classnames');

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

let LinkBlock = React.createClass({
  render() {
    const {className, children} = this.props;
    return (
      <div className={classNames('LinkBlock', className)}>
        {children}
      </div>
    );
  }
});

module.exports = {
  BlankLink, LinkBlock
};
