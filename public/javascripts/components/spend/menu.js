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
  // - _winListenerRef
  // - _isScrollPrevented
  // - _pageYOffset
  // - _scrollThreshold

  getInitialState() {
    return {
      isScrolling: false,
      openClasses: this.props.isOpen ?
        'is-SpendMenu-open is-SpendMenu-open-in' :
        '',
      indexLogoClasses: ''
    };
  },

  isRouteIndex() {
    return (this.context.routeNames[0] === 'index');
  },
  updateIsScrolling() {
    let isScrolling = (this._pageYOffset > this._scrollThreshold);
    if (isScrolling !== this.state.isScrolling) {
      this.setState({isScrolling});
    }
  },
  /* public */ updateScrolling(pageYOffset = window.pageYOffset) {
    let prevPageYOffset = this._pageYOffset || 0;
    let isRouteIndex = this.isRouteIndex();

    this._pageYOffset = pageYOffset;

    if (this._scrollThreshold) {
      this.updateIsScrolling();
    }

    // TEMP: 32 hardcoded
    if (prevPageYOffset <= 32 && pageYOffset > 32) {
      if (isRouteIndex) {
        this.transitionIn('is-SpendMenu-index-Logo-forceShown');
      } else {
        this.setState({
          indexLogoClasses: 'is-SpendMenu-index-Logo-forceShown is-SpendMenu-index-Logo-forceShown-in'
        });
      }
    } else if (prevPageYOffset > 32 && pageYOffset <= 32) {
      if (isRouteIndex) {
        this.transitionOut('is-SpendMenu-index-Logo-forceShown');
      } else {
        this.setState({indexLogoClasses: ''});
      }
    }
  },
  /* public */ pauseScrolling() {
    this._isScrollPrevented = true;
  },
  /* public */ resumeScrolling() {
    this._winListenerRef.one('loop', () => {
      this._isScrollPrevented = false;
    });
  },

  componentWillMount() {
    this._transitions = {
      'is-SpendMenu-open': {
        key: 'openClasses',
        refKey: '_ref',
        duration: 500
      },
      'is-SpendMenu-index-Logo-forceShown': {
        key: 'indexLogoClasses',
        refKey: '_logoRef',
        duration: 500
      }
    };
  },
  componentWillReceiveProps(nextProps) {
    const {isOpen} = this.props;
    const {isOpen: isOpenNext} = nextProps;
    if (!isOpen && isOpenNext) {
      this.transitionIn('is-SpendMenu-open');
    } else if (isOpen && !isOpenNext) {
      this.transitionOut('is-SpendMenu-open');
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
      this.updateIsScrolling();
    }

    if (isOpen && isScreenMd) {
      onToggle();
    }
  },
  handleWindowScroll({pageYOffset}) {
    if (!this._isScrollPrevented) {
      this.updateScrolling(pageYOffset);
    }
  },

  render() {
    const {FACEBOOK_URL, TWITTER_URL, LINKEDIN_URL} = CONF;
    const {isScrolling, openClasses, indexLogoClasses} = this.state;

    let isRouteIndex = this.isRouteIndex();

    return (
      <header
        className={classNames('SpendMenu', {
          'SpendMenu-index': isRouteIndex,
          'is-SpendMenu-scrolling': isScrolling
        }, openClasses)}
        ref={ref => {
          this._ref = ref;
        }}
      >
        <WindowListener
          onScreenChange={this.handleScreenChange}
          onScroll={this.handleWindowScroll}

          ref={ref => {
            this._winListenerRef = ref;
          }} />

        <div
          className={classNames('SpendMenu-inner clearfix', {
            'SpendMenu-index-inner': isRouteIndex
          })}
        >
          <div
            className={classNames('SpendMenu-Logo pull-left', {
              'SpendMenu-index-Logo': isRouteIndex,
              [indexLogoClasses]: isRouteIndex
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
