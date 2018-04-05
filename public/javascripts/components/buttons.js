let React = require('react');

let ExtendChildMixin = require('../mixins/extendChild');
let TrackClickMixin = require('../mixins/trackClick');
let {intlShape} = require('react-intl');

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
  mixins: [ExtendChildMixin, TrackClickMixin],

  propTypes: {
    clickEvent: React.PropTypes.object,
    onClick: React.PropTypes.func.isRequired
  },

  handleClick(e) {
    const {clickEvent, onClick} = this.props;
    onClick(e, this.trackClick);
    if (clickEvent) {
      this.trackClick(clickEvent);
    }
  },

  render() {
    return this.extendChild({
      onClick: this.handleClick,

      // Prevent double-click selection.
      onMouseDown: e => {
        e.preventDefault();
      },

      role: 'button'
    });
  }
});

var LanguageButton = React.createClass({
  setLanguage: function() {
      window.location.assign("/swaplang")
  },
  contextTypes: {
    intl: intlShape.isRequired
  },
  render: function(){
    let {formatMessage} = this.context.intl;
    return (
        <button type="button" className="SpendFooter-LangButton" onClick={this.setLanguage}>
        <span>{formatMessage({id: `index.button.language`})}</span></button>
    );
  }
});

module.exports = {
  Button, PseudoButton, LanguageButton
};
