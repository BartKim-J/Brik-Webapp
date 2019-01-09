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
          <div className={classNames('SpendFooter-inner-inner', {
              'SpendFooter-index-inner-inner': isRouteIndex
            })}
          >
            <div className="SpendFooter-inner-inner-inner">
              <div className="SpendFooter-copyrights">
                <span className="SpendFooter-Logo">brik.</span><br />
                © Copyright 2018 brik.All rights reserved.
              </div>

              <div className="SpendFooter-index-inner-inner-line"></div>

              <div className="AsteraMenu-Footer-Lists">
                <div className="AsteraMenu-nav-inner">
                  <div className="AsteraMenu-lists">
                    <ul className="AsteraMenu-items listUnstyled">
                      {[
                        {key: 'Features', url: '/Features'},
                        {key: 'Technology', url: '/Technology'},
                        {key: 'Design', url: '/Design'},
                        {key: 'Tech', url: '/Tech'},
                        {key: 'Spec', url: '/Spec'},
                        {key: 'Design', url: '/Design'}/*,
                        {key: 'promotion', url: '/promotion'}*/
                      ].map(({key, url}) => (
                        <li className="AsteraFooterMenu-item" key={key}>
                          <a className="AsteraFooterMenu-item" url={url} clickEvent={{category: 'Menu', label: key}}>{formatMessage({id: `${key}`})}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = SpendFooter;
