let React = require('react');

let ExtendChildMixin = require('../mixins/extendChild');

let Button = React.createClass({
  propTypes: {
    type: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      type: 'button'
    };
  },

  render() {
    const {type, className, children} = this.props;
    return (
      <button className={className} type={type}>{children}</button>
    );
  }
});

let PseudoButton = React.createClass({
  mixins: [ExtendChildMixin],

  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    return this.extendChild({
      onClick: this.props.onClick,

      // Prevent double-click selection.
      onMouseDown: e => {
        e.preventDefault();
      },

      role: 'button'
    });
  }
});

module.exports = {
  Button, PseudoButton
};
