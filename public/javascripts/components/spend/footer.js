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
      {key: 'team', url: '/team'},
      {key: 'faq', url: '/faq'},
      {key: 'jobs', url: '/jobs'},
      {key: 'legal', url: '/legal'},
      {key: 'presskit', url: '/presskit'}
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
          <div
            className={classNames('SpendFooter-inner-inner', {
              'SpendFooter-index-inner-inner': isRouteIndex
            })}
          >
            <div className="SpendFooter-inner-inner-inner">
              <div className="SpendFooter-Logo"><Logo /></div>
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
                {formatMessage({id: `footer.copyrights`})} <br/>
                <a className="SpendFooter-mail-link" href="mailto:hey@spendwallet.com"> {formatMessage({id: `footer.email`})} </a>
              </div>
              <SocialLinks
                className="SpendFooter-SocialLinks"
                linkClassName="SpendFooter-SocialLinks-link"
                eventCategory="Footer" />
                <LanguageButton/>
            </div>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = SpendFooter;
