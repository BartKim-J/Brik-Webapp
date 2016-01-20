let React = require('react');
let classNames = require('classnames');

let {Link} = require('../router');

let Logo = require('./logo');
let SocialLinks = require('./socialLinks');

let SpendFooter = React.createClass({
  contextTypes: {
    routeNames: React.PropTypes.array.isRequired
  },

  render() {
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
              <li className="SpendFooter-link-item pull-left">
                <Link className="SpendFooter-link" url="/about">About</Link>
              </li>
              <li className="SpendFooter-link-item pull-left">
                <Link className="SpendFooter-link" url="/faq">FAQ</Link>
              </li>
              <li className="SpendFooter-link-item pull-left">
                <Link className="SpendFooter-link" url="/jobs">Jobs</Link>
              </li>
              <li
                className="SpendFooter-link-item SpendFooter-link-item-last
                  pull-left"
              >
                <Link className="SpendFooter-link" url="/legal">Legal</Link>
              </li>
            </ul>
            <div className="SpendFooter-copyrights">
              {`2015 ${CONF.BRAND}. All Rights Reserved. Patents Pending.`}
            </div>
            <SocialLinks
              className="SpendFooter-SocialLinks"
              linkClassName="SpendFooter-SocialLinks-link" />
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = SpendFooter;
