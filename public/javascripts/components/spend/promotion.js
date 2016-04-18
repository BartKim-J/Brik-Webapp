let React = require('react');
let classNames = require('classnames');
let Helmet = require('react-helmet');
let {intlShape} = require('react-intl');

let Collapse = require('../collapse');
let {EmailLink, LinkBlock} = require('../links');
let Markdown = require('../markdown');

let {FormattedHTMLMessage} = require('../intl');

let Promotion = React.createClass({
  propTypes: {
    sections: React.PropTypes.object
  },

  contextTypes: {
    intl: intlShape.isRequired
  },

  componentDidMount: function() {
    var params = window.location.search.match(new RegExp('(?:[\?\&]email=)([^&]+)'));
    var email = params ? params[1] : "";
    document.getElementById('SpendPromotionIframe').src = "https://gleam.io/KL1Df/win-a-free-spendwallet-every-week?email="+email
  },

  render() {

    let {formatMessage} = this.context.intl;

    return (
      <div className="SpendPromotion">
        <Helmet title={`Promotion${CONF.TITLE_SUFFIX}`} />
        <div className="SpendPromotion-container">
          <h1 className="SpendPromotion-h1">{formatMessage({id: 'promotion.title'})}</h1>
          <h2 className="SpendPromotion-h2">{formatMessage({id: 'promotion.description'})}</h2>
          <h2 className="SpendPromotion-h2">{formatMessage({id: 'promotion.descriptionSecond'})}</h2>
          <h2 className="SpendPromotion-h2 bold">{formatMessage({id: 'promotion.callToAction'})}</h2>
        </div>
        <div>
          <iframe id="SpendPromotionIframe" className="SpendPromotion-iframe" src="https://gleam.io/KL1Df/win-a-free-spendwallet-every-week" frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
    );
  }
});

module.exports = Promotion;
