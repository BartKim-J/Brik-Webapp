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
      //{key: 'presskit', url: '/presskit'}
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
              <div className="SpendFooter-Logo"><img className="SpendLogo" src="https://s3.ap-northeast-2.amazonaws.com/astera/ASTERA.com/grayscale-logo.png" alt="footer-logo"></img></div>
              <ul
                className="SpendFooter-link-items listUnstyled text-uppercase"
              >
                {LINKS.map(({key, url}, i) => (
                  <li
                    className={classNames('SpendFooter-link-item pull-left', {
                      'SpendFooter-link-item-last': i === LINKS.length - 1
                    })}
                    key={key}
                  >
                    <Link className="SpendFooter-link" url={url} clickEvent={{category: 'Footer', label: key}}>{formatMessage({id: `footer.${key}`})}</Link>
                  </li>
                ))}
              </ul>
              <div className="SpendFooter-copyrights">
              <a className="SpendFooter-mail-link" href="mailto:hey@aster.io"> {formatMessage({id: `footer.email`})} </a>
               <br/>
                {formatMessage({id: `footer.copyrights`})}
              </div>
              <SocialLinks
                className="SpendFooter-SocialLinks"
                linkClassName="SpendFooter-SocialLinks-link"
                eventCategory="Footer" />

            </div>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = SpendFooter;
