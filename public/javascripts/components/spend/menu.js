let React = require('react');
let classNames = require('classnames');
let {intlShape} = require('react-intl');

let TransitionMixin = require('../../mixins/transition');

let {PseudoButton} = require('../buttons');
let {LinkBlock} = require('../links');
let {Link} = require('../router');
let WindowListener = require('../windowListener');

let {FormattedHTMLMessage} = require('../intl');
let Logo = require('./logo');
let SocialLinks = require('./socialLinks');

let AsteraMenu = React.createClass({
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
    routeNames: React.PropTypes.array.isRequired,
    intl: intlShape.isRequired
  },

  // Instance variables
  // - _ref
  // - _logoRef
  // - _winListenerRef
  // - _isRouteIndexPrev
  // - _isScrollPrevented
  // - _pageYOffset
  // - _scrollThreshold

  getInitialState() {
    return {
      isScrolling: false,
      indexEnteredClass: '',

      openClasses: this.props.isOpen ?
        'is-AsteraMenu-open is-AsteraMenu-open-in' :
        '',
      indexLogoClasses: ''
    };
  },

  isRouteIndex() {
    return (this.context.routeNames[0] === 'index');
  },
  updateIsScrolling() {
    this.setState({
      isScrolling: (this._pageYOffset > this._scrollThreshold)
    });
  },
  /* public */ updateScrolling(pageYOffset = window.pageYOffset) {
    let prevPageYOffset = this._pageYOffset || 0;
    this._pageYOffset = pageYOffset;

    if (this._scrollThreshold) {
      this.updateIsScrolling();
    }
    if (this.isRouteIndex()) {
      // TEMP: 32 hardcoded
      if (prevPageYOffset <= 32 && pageYOffset > 32) {
        this.transitionIn('is-AsteraMenu-index-Logo-forceShown');
      } else if (prevPageYOffset > 32 && pageYOffset <= 32) {
        this.transitionOut('is-AsteraMenu-index-Logo-forceShown');
      }
    }

    return this;
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
      'is-AsteraMenu-open': {
        key: 'openClasses',
        refKey: '_ref',
        duration: 500
      },
      'is-AsteraMenu-index-Logo-forceShown': {
        key: 'indexLogoClasses',
        refKey: '_logoRef',
        duration: 500
      }
    };
  },
  componentDidMount() {
    this._isRouteIndexPrev = this.isRouteIndex();
  },
  componentWillReceiveProps(nextProps) {
    const {isOpen} = this.props;
    const {isOpen: isOpenNext} = nextProps;
    if (!isOpen && isOpenNext) {
      this.transitionIn('is-AsteraMenu-open');
    } else if (isOpen && !isOpenNext) {
      this.transitionOut('is-AsteraMenu-open');
    }
  },
  componentDidUpdate(prevProps, prevState) {
    let isRouteIndex = this.isRouteIndex();

    if (isRouteIndex) {
      if (!this._isRouteIndexPrev) {
        let state = {
          indexEnteredClass: 'is-AsteraMenu-index-entered-done'
        };
        if (this._pageYOffset > 32) {
          state.indexLogoClasses = 'is-AsteraMenu-index-Logo-forceShown is-AsteraMenu-index-Logo-forceShown-in';
        }
        this.setState(state);
      } else {
        const {isScrolling, openClasses} = this.state;
        const {
          isScrolling: isScrollingPrev,
          openClasses: prevOpenClasses
        } = prevState;

        if ((!isScrollingPrev && isScrolling) ||
          (!prevOpenClasses && openClasses))
        {
          this.setState({
            indexEnteredClass: 'is-AsteraMenu-index-entered-done',
          });
        }
      }
    } else if (this._isRouteIndexPrev) {
      this.setState({indexEnteredClass: ''});
      this.resetTransition('is-AsteraMenu-index-Logo-forceShown');
    }

    this._isRouteIndexPrev = isRouteIndex;
  },

  handleButtonClick(e, tracker) {
    const {isOpen, onToggle} = this.props;
    tracker({
      category: 'Menu',
      action: isOpen ? 'close' : 'open'
    });
    onToggle();
  },
  handleScreenChange(prevScreen, screen) {
    const {isOpen, onToggle} = this.props;
    let isInit = (typeof prevScreen !== 'number');
    let isScreenMd = (screen >= WindowListener.SCREEN_NAMES.MD);
    this._scrollThreshold = isScreenMd ? 27 : 5; // TEMP

    if (isInit && typeof this._pageYOffset === 'number') {
      this.updateIsScrolling();
    }

    if (this.isRouteIndex()) {
      if (isScreenMd) {
        if (isInit) {
          this.setState({indexEnteredClass: 'is-AsteraMenu-index-entered'});
        }
      } else {
        this.setState({
          indexEnteredClass: 'is-AsteraMenu-index-entered-done'
        });
      }
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
    const {
      isScrolling, indexEnteredClass,
      openClasses, indexLogoClasses
    } = this.state;

    let isRouteIndex = this.isRouteIndex();
    let {formatMessage} = this.context.intl;

    return (
      <header
        className={classNames('AsteraMenu', {
          'AsteraMenu-index': isRouteIndex,
          'is-AsteraMenu-scrolling': isScrolling
        }, openClasses, indexEnteredClass)}
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
          className={classNames('AsteraMenu-inner', {
            'AsteraMenu-index-inner': isRouteIndex
          })}
        >
          <div
            className={classNames('AsteraMenu-inner-inner clearfix', {
              'AsteraMenu-index-inner-inner': isRouteIndex
            })}
          >
            <div
              className={classNames('AsteraMenu-Logo pull-left', {
                'AsteraMenu-index-Logo': isRouteIndex
              }, indexLogoClasses)}
              ref={ref => {
                this._logoRef = ref;
              }}
            >
              <Link className="AsteraMenu-Logo-link" url="/" clickEvent={{category: 'Menu', label: 'Logo'}}><Logo /></Link>
            </div>
            <nav className="AsteraMenu-nav">
              <div className="AsteraMenu-nav-inner">
                  <p className="AsteraMenu-Whitepaper-text">
                    {formatMessage({id: 'index.menu.whitepaper'})}
                    <a className="AsteraMenu-Whitepaper-button" href={formatMessage({id: 'index.menu.whitepaper_short.content'})} target="_blank">
                      {formatMessage({id: 'index.menu.whitepaper_short'})}
                    </a>
                    /
                    <a className="AsteraMenu-Whitepaper-button" href={formatMessage({id: 'index.menu.whitepaper_full.content'})} target="_blank">
                      {formatMessage({id: 'index.menu.whitepaper_full'})}
                    </a>
                  </p>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
});

module.exports = AsteraMenu;
