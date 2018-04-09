let React = require('react');
let classNames = require('classnames');
let {intlShape} = require('react-intl');
let {LanguageButton} = require('../buttons');

let {Link} = require('../router');

let {FormattedHTMLMessage} = require('../intl');
let Logo = require('./logo');
let SocialLinks = require('./socialLinks');

let SpendFooter = React.createClass({
  statics: {
    LINKS: [
      {key: 'twitter', url: 'https://twitter.com/astera_io', img:'https://s3.ap-northeast-2.amazonaws.com/astera/ASTERA.com/twiiter_footer.png' },
      {key: 'medium', url: 'https://medium.com/@asteraio', img:'https://s3.ap-northeast-2.amazonaws.com/astera/ASTERA.com/medium_footer.png'},
      {key: 'telegram', url: 'https://t.me/asteraio', img:'https://s3.ap-northeast-2.amazonaws.com/astera/ASTERA.com/telegram_footer.png'}
    ]
  },

  contextTypes: {
    routeNames: React.PropTypes.array.isRequired,
    intl: intlShape.isRequired
  },

  render() {
    const {LINKS} = SpendFooter;
    let isRouteIndex = (this.context.routeNames[0] === 'index');
    let {formatMessage} = this.context.intl;

    return (
      <footer
        className={classNames('SpendFooter', {
          'SpendFooter-index': isRouteIndex
        })}
      >
        <div
          className={classNames('SpendFooter-inner', {
            'SpendFooter-index-inner': isRouteIndex
          })}
        >
          <div className="SpendFooter-index-inner-inner-line"></div>
          <div className={classNames('SpendFooter-inner-inner', {
              'SpendFooter-index-inner-inner': isRouteIndex
            })}
          >
            <div className="SpendFooter-inner-inner-inner">
              <ul
                className="SpendFooter-link-items listUnstyled text-uppercase"
              >
                {LINKS.map(({key, url, img}, i) => (
                  <li
                    className={classNames('SpendFooter-link-item pull-left', {
                      'SpendFooter-link-item-last': i === LINKS.length - 1
                    })}
                    key={key}
                  >
                    <Link className="SpendFooter-link" url={url} clickEvent={{category: 'Footer', label: key}}><img src={img}/></Link>
                  </li>
                ))}
              </ul>
              <div className="SpendFooter-copyrights">
                <a className="SpendFooter-mail-link" href="mailto:hey@aster.io"> {formatMessage({id: `footer.email`})} </a>
                 <br/>
                  {formatMessage({id: `footer.copyrights`})}
              </div>
              <div className="SpendFooter-Logo"><img className="SpendLogo" src="https://s3.ap-northeast-2.amazonaws.com/astera/ASTERA.com/grayscale-logo.png" alt="footer-logo"></img></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = SpendFooter;
