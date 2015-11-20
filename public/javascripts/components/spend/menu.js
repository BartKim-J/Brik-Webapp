'use strict';

let React = require('react');
let classNames = require('classnames');

let {Link} = require('../router');
let {PseudoButton, BlankLink} = require('../tags');
let {SCREEN_NAMES, WindowListener} = require('../windowListener');

let Logo = require('./logo');

let SpendMenu = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool,

    onToggle: React.PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      isOpen: false
    };
  },

  getInitialState() {
    return {
      isScrolling: false
    };
  },

  componentDidUpdate(prevProps, prevState) {
    const {isOpen: isOpenPrev} = prevProps;
    const {isOpen} = this.props;
    let docStyle = document.documentElement.style;
    if (!isOpenPrev && isOpen) {
      docStyle.overflow = 'hidden';
    } else if (isOpenPrev && !isOpen) {
      docStyle.overflow = '';
    }
  },

  handleButtonClick(e) {
    this.props.onToggle();
  },
  handleScreenChange(prevScreen, screen) {
    const {isOpen, onToggle} = this.props;
    if (isOpen && screen >= SCREEN_NAMES.MD) {
      onToggle();
    }
  },
  handleWindowScroll({pageYOffset}) {
    let isScrolling = (pageYOffset > 0);
    if (this.state.isScrolling != isScrolling) {
      this.setState({isScrolling});
    }
  },

  render() {
    const {FACEBOOK_URL, TWITTER_URL, LINKEDIN_URL} = CONF;
    return (
      <div
        className={classNames('SpendMenu', {
          'is-SpendMenu-scrolling': this.state.isScrolling,
          'is-SpendMenu-open': this.props.isOpen
        })}
      >
        <WindowListener
          onScreenChange={this.handleScreenChange}
          onScroll={this.handleWindowScroll} />

        <div className="SpendMenu-inner clearfix">
          <div className="SpendMenu-Logo pull-left">
            <Link className="SpendMenu-Logo-link" url="/"><Logo /></Link>
          </div>
          <nav className="SpendMenu-nav">
            <PseudoButton onClick={this.handleButtonClick}>
              <div className="SpendMenu-button pull-right">
                <span className="SpendMenu-button-bar SpendMenu-button-bar-1" />
                <span className="SpendMenu-button-bar SpendMenu-button-bar-2" />
                <span className="SpendMenu-button-bar SpendMenu-button-bar-3" />
              </div>
            </PseudoButton>
            <div className="SpendMenu-lists">
              <ul className="SpendMenu-items listUnstyled text-uppercase">
                <li className="SpendMenu-item">
                  <Link className="SpendMenu-item-link" url="/about">About</Link>
                </li>
                <li className="SpendMenu-item">
                  <Link className="SpendMenu-item-link" url="/jobs">Jobs</Link>
                </li>
                <li className="SpendMenu-item SpendMenu-item-last">
                  <Link className="SpendMenu-item-link" url="/faq">FAQ</Link>
                </li>
              </ul>
              <ul className="SpendMenu-socialLink-items listUnstyled clearfix">
                {[
                  ['facebook', FACEBOOK_URL],
                  ['twitter', TWITTER_URL],
                  ['linkedin', LINKEDIN_URL]
                ]
                  .filter(([name, url]) => url)
                  .map(([name, url], i, a) => (
                    <li
                      className={classNames('SpendMenu-socialLink-item pull-left', {
                        'SpendMenu-socialLink-item-last': i === a.length - 1
                      })}
                      key={name}
                    >
                      <BlankLink className="SpendMenu-socialLink" href={url}><i className={`fa fa-${name}`} /></BlankLink>
                    </li>
                  ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
});

module.exports = SpendMenu;
