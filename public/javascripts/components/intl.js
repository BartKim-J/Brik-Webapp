let React = require('react');
let {intlShape} = require('react-intl');

let ExtendChildMixin = require('../mixins/extendChild');

let FormattedHTMLMessage = React.createClass({
  mixins: [ExtendChildMixin],

  propTypes: {
    id: React.PropTypes.string.isRequired
  },

  contextTypes: {
    intl: intlShape.isRequired
  },

  makeInnerHTML() {
    const {id} = this.props;
    return {
      __html: this.context.intl.formatHTMLMessage({id})
    };
  },

  render() {
    return this.extendChild({
      dangerouslySetInnerHTML: this.makeInnerHTML()
    });
  }
});

module.exports = {
  FormattedHTMLMessage
};
