let React = require('react');
let classNames = require('classnames');
let Helmet = require('react-helmet');
let {intlShape} = require('react-intl');

let Collapse = require('../collapse');
let {EmailLink, LinkBlock} = require('../links');
let Markdown = require('../markdown');

let {FormattedHTMLMessage} = require('../intl');

let Event = React.createClass({
  propTypes: {
    sections: React.PropTypes.object
  },

  contextTypes: {
    intl: intlShape.isRequired
  },

  render() {

    let {formatMessage} = this.context.intl;

    return (
      <div className="SpendEvent">
        <Helmet title={`Event${CONF.TITLE_SUFFIX}`} />
        <div className="SpendEvent-container">
          <h1 className="SpendEvent-h1">{formatMessage({id: 'event.title'})}</h1>
          <h2 className="SpendEvent-h2">{formatMessage({id: 'event.description'})}</h2>
          <h2 className="SpendEvent-h2">{formatMessage({id: 'event.descriptionSecond'})}</h2>
          <h2 className="SpendEvent-h2 bold">{formatMessage({id: 'event.callToAction'})}</h2>
        </div>
        <div>
          <iframe className="SpendEvent-iframe" src="https://gleam.io/KL1Df/win-a-free-spendwallet-every-week" frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
    );
  }
});

module.exports = Event;
