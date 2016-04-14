let React = require('react');
let classNames = require('classnames');
let Helmet = require('react-helmet');
let {intlShape} = require('react-intl');

let Collapse = require('../collapse');
let {EmailLink, LinkBlock} = require('../links');
let Markdown = require('../markdown');

let {FormattedHTMLMessage} = require('../intl');

let Contest = React.createClass({
  propTypes: {
    sections: React.PropTypes.object,

    onEmpty: React.PropTypes.func.isRequired
  },

  contextTypes: {
    intl: intlShape.isRequired
  },

  render() {
    return (
      <div className="SpendFaq">
        <Helmet title={`Contest${CONF.TITLE_SUFFIX}`} />
        <div>
          <iframe id="contestForm" src="https://gleam.io/KL1Df/win-a-free-spendwallet-every-week" frameBorder="0" allowfullscreen></iframe>
        </div>
      </div>
    );
  }
});

module.exports = Contest;
