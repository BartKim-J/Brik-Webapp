let React = require('react');
let classNames = require('classnames');

let TransitionMixin = require('../../mixins/transition');

let {PseudoButton} = require('../buttons');
let {BlankLink, LinkBlock} = require('../links');
let {Link} = require('../router');
let {SCREEN_NAMES, WindowListener} = require('../windowListener');

let Logo = require('./logo');
let IndiegogoLink = require('./indiegogoLink');

let SpendMenu = React.createClass({
  mixins: [TransitionMixin],

  propTypes: {
    isOpen: React.PropTypes.bool,

    onToggle: React.PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      isOpen: false
    };
  },

  contextTypes: {
    routeNames: React.PropTypes.array.isRequired
  },

  // Instance variables
  // - _ref
  // - _logoRef
  // - _isScrollPrevented
  // - _pageYOffset
  // - _scrollThreshold

  getInitialState() {
    return {
      isLogoForceShown: false,
      isScrolling: false,
      isVisuallyOpen: this.props.isOpen
    };
  },

  isRouteIndex() {
    return (this.context.routeNames[0] === 'index');
  },

  updateScrolling() {
    let isScrolling = (this._pageYOffset > this._scrollThreshold);
    if (isScrolling !== this.state.isScrolling) {
      this.setState({isScrolling});
    }
  },

  componentWillMount() {
    this._transitions = {
      isLogoForceShown: {
        refKey: '_logoRef',
        className: 'is-SpendMenu-index-Logo-forceShown',
        duration: 500
      },
      isVisuallyOpen: {
        refKey: '_ref',
        className: 'is-SpendMenu-open',
        duration: 500
      }
    };
  },
  componentWillReceiveProps(nextProps) {
    const {isOpen} = this.props;
    const {isOpen: isOpenNext} = nextProps;
    if (!isOpen && isOpenNext) {
      this.transitionIn('isVisuallyOpen');
    } else if (isOpen && !isOpenNext) {
      this.transitionOut('isVisuallyOpen');
    }
  },

  handleButtonClick(e) {
    this.props.onToggle();
  },
  handleScreenChange(prevScreen, screen) {
    const {isOpen, onToggle} = this.props;
    let isScreenMd = (screen >= SCREEN_NAMES.MD);

    this._scrollThreshold = isScreenMd ? 27 : 5; // TEMP

    if (typeof prevScreen !== 'number' &&
      typeof this._pageYOffset !== 'number')
    {
      this.updateScrolling();
    }

    if (isOpen && isScreenMd) {
      onToggle();
    }
  },
  handleWindowScroll({pageYOffset}) {
    if (this.props.isOpen) {
      this._isScrollPrevented = true;
    } else if (this._isScrollPrevented) {
      this._isScrollPrevented = false;
    } else {
      let prevPageYOffset = this._pageYOffset || 0;
      this._pageYOffset = pageYOffset;

      if (this._scrollThreshold) {
        this.updateScrolling();
      }
      if (this.isRouteIndex()) {
        // TEMP: 32 hardcoded
        if (prevPageYOffset <= 32 && pageYOffset > 32) {
          this.transitionIn('isLogoForceShown');
        } else if (prevPageYOffset > 32 && pageYOffset <= 32) {
          this.transitionOut('isLogoForceShown');
        }
      }
    }
  },

  render() {
    const {FACEBOOK_URL, TWITTER_URL, LINKEDIN_URL} = CONF;
    const {isLogoForceShown, isScrolling, isVisuallyOpen} = this.state;

    let isRouteIndex = this.isRouteIndex();

    return (
      <header
        className={classNames('SpendMenu', {
          'SpendMenu-index': isRouteIndex,
          'is-SpendMenu-scrolling': isScrolling,
          'is-SpendMenu-open is-SpendMenu-open-in': isVisuallyOpen
        })}
        ref={ref => {
          this._ref = ref;
        }}
      >
        <WindowListener
          onScreenChange={this.handleScreenChange}
          onScroll={this.handleWindowScroll} />

        <div
          className={classNames('SpendMenu-inner clearfix', {
            'SpendMenu-index-inner': isRouteIndex
          })}
        >
          <div
            className={classNames('SpendMenu-Logo pull-left', {
              'SpendMenu-index-Logo': isRouteIndex,
              'is-SpendMenu-index-Logo-forceShown is-SpendMenu-index-Logo-forceShown-in': isRouteIndex && isLogoForceShown
            })}
            ref={ref => {
              this._logoRef = ref;
            }}
          >
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
            <div className="SpendMenu-nav-inner">
              <div className="SpendMenu-lists">
                <ul className="SpendMenu-items listUnstyled text-uppercase">
                  <li className="SpendMenu-item">
                    <Link className="SpendMenu-item-link" url="/about">About</Link>
                  </li>
                  <li className="SpendMenu-item">
                    <Link className="SpendMenu-item-link" url="/jobs">Jobs</Link>
                  </li>
                  <li className="SpendMenu-item">
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
                    .map(([name, url], i, array) => (
                      <li
                        className={classNames('SpendMenu-socialLink-item pull-left', {
                          'SpendMenu-socialLink-item-last': i === array.length - 1
                        })}
                        key={name}
                      >
                        <BlankLink className="SpendMenu-socialLink" href={url}><i className={`fa fa-${name} SpendMenu-socialLink-icon`} /></BlankLink>
                      </li>
                    ))}
                </ul>
              </div>
              <LinkBlock className="SpendMenu-Indiegogo-LinkBlock">
                <IndiegogoLink className="SpendMenu-IndiegogoLink" />
              </LinkBlock>
            </div>
          </nav>
        </div>
      </header>
    );
  }
});

module.exports = SpendMenu;
