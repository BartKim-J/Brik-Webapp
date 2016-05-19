let React = require('react');
let classNames = require('classnames');
let Helmet = require('react-helmet');
let {intlShape} = require('react-intl');

let Collapse = require('../collapse');
let {EmailLink, LinkBlock} = require('../links');
let Markdown = require('../markdown');
let Logo = require('./logo');

let {FormattedHTMLMessage} = require('../intl');

let Presskit = React.createClass({
  propTypes: {
    sections: React.PropTypes.object
  },

  contextTypes: {
    intl: intlShape.isRequired
  },

  render() {

    let {formatMessage} = this.context.intl;

    return (
      <div className="SpendPresskit">
        <Helmet title={`Presskit${CONF.TITLE_SUFFIX}`} />
        <div className="SpendPresskit-container">
          <h1 className="SpendPresskit-h1">{formatMessage({id: 'presskit.title'})}</h1>
          <h2 className="SpendPresskit-h2">{formatMessage({id: 'presskit.description'})}</h2>
          <section className="SpendPresskit-section">
            <div className="SpendPresskit-heading-row">
              <h3 className="SpendPresskit-left-h3">Identity</h3>
              <a href="https://drive.google.com/drive/u/1/folders/0B2H-wBDhvTCbZ0RTcUFzTWZQdzg" target="_blank">
                <h3 className="SpendPresskit-right-h3"><span>Download</span> <img src="/images/presskit-download.png" alt=""></img></h3>
              </a>
            </div>
            <a href="https://drive.google.com/drive/u/1/folders/0B2H-wBDhvTCbZ0RTcUFzTWZQdzg" target="_blank">
              <img className="SpendPresskit-image white" src="https://s3.ap-northeast-2.amazonaws.com/spendwallet/spendwallet.com/presskit-identity.png" alt=""></img>
            </a>
          </section>
          <section className="SpendPresskit-section">
            <div className="SpendPresskit-heading-row">
              <h3 className="SpendPresskit-left-h3">Device Images</h3>
              <a href="https://drive.google.com/drive/u/1/folders/0B2H-wBDhvTCbTmhBUU1NSlFpMk0" target="_blank">
                <h3 className="SpendPresskit-right-h3"><span>Download</span> <img src="/images/presskit-download.png" alt=""></img></h3>
              </a>
            </div>
            <a href="https://drive.google.com/drive/u/1/folders/0B2H-wBDhvTCbTmhBUU1NSlFpMk0" target="_blank">
            <img className="SpendPresskit-image white" src="https://s3.ap-northeast-2.amazonaws.com/spendwallet/spendwallet.com/presskit-devices.png" alt=""></img>
            </a>
          </section>
          <section className="SpendPresskit-section">
            <div className="SpendPresskit-heading-row">
              <h3 className="SpendPresskit-left-h3">Lifestyle</h3>
              <a href="https://drive.google.com/drive/u/1/folders/0B2H-wBDhvTCbOUQtaHg3SHpqOGs" target="_blank">
                <h3 className="SpendPresskit-right-h3"><span>Download</span> <img src="/images/presskit-download.png" alt=""></img></h3>
              </a>
            </div>
            <a href="https://drive.google.com/drive/u/1/folders/0B2H-wBDhvTCbOUQtaHg3SHpqOGs" target="_blank">
              <img className="SpendPresskit-image white" src="https://s3.ap-northeast-2.amazonaws.com/spendwallet/spendwallet.com/presskit-irl2.png" alt=""></img>
            </a>
          </section>
          {/*<section className="SpendPresskit-section">
            <div className="SpendPresskit-heading-row">
              <h3 className="SpendPresskit-left-h3">Video Commerce</h3>
              <a href="http://test.com" target="_blank">
                <h3 className="SpendPresskit-right-h3">Link <img src="/images/presskit-link.png" alt=""></img></h3>
              </a>
            </div>
            <a href="http://test.com" target="_blank">
              <img className="SpendPresskit-image black" src="https://s3.ap-northeast-2.amazonaws.com/spendwallet/spendwallet.com/presskit-video.png" alt=""></img>
            </a>
          </section>}*/}
          <section className="SpendPresskit-section press-release">
              <h2>{formatMessage({id: 'presskit.message.title'})}</h2>
              <h3>{formatMessage({id: 'presskit.message.date'})}</h3>
              <FormattedHTMLMessage id="presskit.message">
                <div className="SpendPresskit-message" />
              </FormattedHTMLMessage>
              <div className="SpendPresskit-logo"><Logo /></div>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = Presskit;
