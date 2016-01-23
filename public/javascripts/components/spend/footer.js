let React = require('react');
let classNames = require('classnames');

let {Link} = require('../router');

let Logo = require('./logo');
let SocialLinks = require('./socialLinks');

let SpendFooter = React.createClass({
  statics: {
    LINKS: [
      {key: 'About', url: '/about'},
      {key: 'FAQ', url: '/faq'},
      {key: 'Jobs', url: '/jobs'},
      {key: 'Legal', url: '/legal'}
    ]
  },

  contextTypes: {
    routeNames: React.PropTypes.array.isRequired
  },

  render() {
    const {LINKS} = SpendFooter;
    let isRouteIndex = (this.context.routeNames[0] === 'index');

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
          <div className="SpendFooter-inner-inner">
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
                  <Link className="SpendFooter-link" url={url} clickEvent={{category: 'Footer', label: key}}>{key}</Link>
                </li>
              ))}
            </ul>
            <div className="SpendFooter-copyrights">
              {`2015 ${CONF.BRAND}. All Rights Reserved. Patents Pending.`}
            </div>
            <SocialLinks
              className="SpendFooter-SocialLinks"
              linkClassName="SpendFooter-SocialLinks-link"
              eventCategory="Footer" />
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = SpendFooter;
