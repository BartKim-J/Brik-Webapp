let React = require('react');
let classNames = require('classnames');
let Helmet = require('react-helmet');
let {intlShape} = require('react-intl');

let Collapse = require('../collapse');
let {EmailLink, LinkBlock} = require('../links');
let Markdown = require('../markdown');

let {FormattedHTMLMessage} = require('../intl');

let Success = React.createClass({
  propTypes: {
    sections: React.PropTypes.object
  },

  contextTypes: {
    intl: intlShape.isRequired
  },

  render() {

    let {formatMessage} = this.context.intl;

    return (
      <div className="SpendSuccess">
        <Helmet title={`Success${CONF.TITLE_SUFFIX}`} />
        <div className="SpendSuccess-container">
          <h1 className="SpendSuccess-h1">{formatMessage({id: 'success.title'})}</h1>
          <FormattedHTMLMessage id="success.description">
            <h2 className="SpendSuccess-h2"/>
          </FormattedHTMLMessage>
          <a className="SpendSuccess-a" href="/"><img src="/images/back.png" alt=""></img>{formatMessage({id: 'success.back'})}</a>
        </div>
      </div>
    );
  }
});

module.exports = Success;
