let React = require('react');
let classNames = require('classnames');

let TrackClickMixin = require('../mixins/trackClick');

let BlankLink = React.createClass({
  mixins: [TrackClickMixin],

  propTypes: {
    clickEvent: React.PropTypes.object.isRequired,
    href: React.PropTypes.string.isRequired
  },

  handleClick(e) {
    this.trackClick(this.props.clickEvent);
  },

  render() {
    const {href, className, children} = this.props;
    return (
      // TOOD: new window icon
      <a className={className} href={href} target="_blank" onClick={this.handleClick}>{children}</a>
    );
  }
});

let EmailLink = React.createClass({
  mixins: [TrackClickMixin],

  propTypes: {
    email: React.PropTypes.string.isRequired,
    eventLabel: React.PropTypes.string.isRequired
  },

  handleClick(e) {
    const {email, eventLabel} = this.props;
    this.trackClick({
      category: 'Email Link',
      label: `email: ${email}, ${eventLabel}`
    });
  },

  render() {
    const {email, className, children} = this.props;
    return (
      <a className={className} href={`mailto:${email}`} onClick={this.handleClick}>{React.Children.count(children) > 0 ? children : email}</a>
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
  BlankLink, EmailLink,
  LinkBlock
};
