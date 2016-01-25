let React = require('react');
let classNames = require('classnames');
let Helmet = require('react-helmet');

let size = require('lodash/collection/size');
let some = require('lodash/collection/some');

let {Button, PseudoButton} = require('../buttons');
let {Input, Form} = require('../forms');
let {Image, RImage, ImageBlock} = require('../images');
let {LinkBlock} = require('../links');
let Markdown = require('../markdown');
let MessageBoard = require('../messageBoard');
let WindowListener = require('../windowListener');

let IndiegogoLink = require('./indiegogoLink');
let Logo = require('./logo');

let Immutable = require('seamless-immutable');

let SpendIndex = React.createClass({
  statics: {
    BG_OFFSET_Y_MAX: 25,
    DEFAULT_BG_Y_OFFSETS: Immutable({
      contactless: 0,
      display: 0,
      charge: 0,
      physicalCards: 0,
      tech: 0,
      app: 0,
      indiegogo: 0
    }),
    SECURITY_FEATURES: [{
      key: 'alert',
      name: 'Proximity Alert',
      description: 'Auto-lock when lost.\nSelf-destruction after time.'
    }, {
      key: 'passcode',
      name: 'Security Passcode',
      description: 'Protect your card and\nbank information'
    }, {
      key: 'encrypt',
      name: 'Bank Level Encyrption',
      description: '256 bit encryption\nfor card data'
    }]
  },

  propTypes: {
    onNewSubscription: React.PropTypes.func.isRequired
  },

  // Instance variables
  // - _formRef
  // - _indexVideoRef
  // - _securitySliderRef
  // - _sideViewVideoRef
  // - _isScreenMd
  // - _pageYOffset
  // - _securitySwipe
  // - _windowHeight

  getInitialState() {
    return {
      bgYOffsets: SpendIndex.DEFAULT_BG_Y_OFFSETS,
      enteredClasses: Immutable({
        index: '',
        contactless: '',
        display: '',
        charge: '',
        physicalCards: '',
        tech: '',
        app: '',
        indiegogo: ''
      }),
      securitySwipePos: 0,
      subscriptionMsg: null
    };
  },

  setSmallScreenState() {
    let state = {
      enteredClasses: Immutable({
        index: 'is-SpendIndex-index-entered-done',
        contactless: 'is-SpendIndex-contactless-entered-done',
        display: 'is-SpendIndex-display-entered-done',
        charge: 'is-SpendIndex-charge-entered-done',
        physicalCards: 'is-SpendIndex-physicalCards-entered-done',
        tech: 'is-SpendIndex-tech-entered-done',
        app: 'is-SpendIndex-app-entered-done',
        indiegogo: 'is-SpendIndex-indiegogo-entered-done'
      })
    };
    if (some(this.state.bgYOffsets)) {
      state.bgYOffsets = SpendIndex.DEFAULT_BG_Y_OFFSETS;
    }
    this.setState(state);
  },

  updateAnimated(isEnteredReset = false) {
    if (this._isScreenMd &&
      typeof this._pageYOffset === 'number' &&
      typeof this._windowHeight === 'number')
    {
      this.updateBgYOffsets();
      this.updateEntered(isEnteredReset);
      this.updateSideViewVideo();
    }
  },
  updateBgYOffsets() {
    const {bgYOffsets} = this.state;
    let newBgYOffsets = {};
    const {BG_OFFSET_Y_MAX} = SpendIndex;
    let halfHeight = this._windowHeight/2;

    // TEMP
    // hardcoded numbers
    // (thresholds: 1/3s of section heights and vertical centers)
    let ranges = {
      contactless: [1015 - this._windowHeight, 1117.5 - halfHeight],
      display: [2378 - this._windowHeight, 2476 - halfHeight],
      charge: [2986 - this._windowHeight, 3093 - halfHeight],
      physicalCards: [3612 - this._windowHeight, 3710 - halfHeight],
      tech: [4287 - this._windowHeight, 4568],
      app: [5735 - this._windowHeight, 5895 - halfHeight],
      indiegogo: [6673 - this._windowHeight, 6972]
    };

    for (let key in ranges) {
      let bgOffsetY;
      let [min, max] = ranges[key];

      if (this._pageYOffset <= min) {
        bgOffsetY = BG_OFFSET_Y_MAX;
      } else if (this._pageYOffset < max) {
        bgOffsetY = (
          (max - this._pageYOffset)/(max - min)
        )*BG_OFFSET_Y_MAX;
      } else {
        bgOffsetY = 0;
      }

      switch (key) {
      case 'charge':
        bgOffsetY = -bgOffsetY;
        break;
      case 'tech':
        bgOffsetY = bgOffsetY*2 - 10;
        break;
      default:
        break;
      }

      if (bgYOffsets[key] !== bgOffsetY) {
        newBgYOffsets[key] = bgOffsetY;
      }
    }

    if (size(newBgYOffsets) > 0) {
      this.setState({bgYOffsets: bgYOffsets.merge(newBgYOffsets)});
    }
  },
  updateEntered(isReset) {
    const {enteredClasses} = this.state;
    let newEnteredClasses = {};

    // TEMP: hardcoded numbers (thresholds: 1/3s and 2/3s of heights)
    let ranges = {
      index: [0, 537],
      contactless: [1015 - this._windowHeight, 1225],
      display: [2378 - this._windowHeight, 2574],
      charge: [2986 - this._windowHeight, 3200],
      physicalCards: [3612 - this._windowHeight, 3808],
      tech: [4287 - this._windowHeight, 4568],
      app: [5735 - this._windowHeight, 6055],
      indiegogo: [6673 - this._windowHeight, 6972]
    };

    for (let key in ranges) {
      let [min, max] = ranges[key];
      let enteredClass = enteredClasses[key];
      if (!enteredClass) {
        if (this._pageYOffset >= min && this._pageYOffset <= max) {
          newEnteredClasses[key] = `is-SpendIndex-${key}-entered`;
        }
      } else if (isReset) {
        if (this._pageYOffset < min || this._pageYOffset > max) {
          newEnteredClasses[key] = '';
        }
      }
    }

    if (size(newEnteredClasses) > 0) {
      this.setState({
        enteredClasses: enteredClasses.merge(newEnteredClasses)
      });
    }
  },
  updateSideViewVideo() {
      /*let {duration} = this._sideViewVideoRef;

      if (!(Number.isNaN(duration)) && Modernizr.video) {
          let time;
          const TIME_MAX = Math.floor(duration);

          // TEMP: hardcoded numbers (2/3 of height and page offset)
          let min = 5227 - this._windowHeight;
          let max = 4850;

          if (this._pageYOffset <= min) {
              time = 0;
          } else if (this._pageYOffset < max) {
              time = ((this._pageYOffset - min)/(max - min)) * TIME_MAX;
          } else {
              time = TIME_MAX;
          }
          this._sideViewVideoRef.currentTime = time;
      }*/
  },

  offsetY2Style(offsetY) {
    return offsetY ? {
      WebkitTransform: `translate3d(0,${offsetY}%,0)`,
      transform: `translate3d(0,${offsetY}%,0)`
    } : null;
  },
  pauseIndexVideoAtTime(time) {
    if (Modernizr.video) {
      this._indexVideoRef.currentTime = time;
      if (!(this._indexVideoRef.paused)) {
        this._indexVideoRef.pause();
      }
    }
  },

  componentDidMount() {
    this._securitySwipe = new Swipe(this._securitySliderRef, {
      callback: (index, el) => {
        this.setState({securitySwipePos: index});
      }
    });
  },
  componentDidUpdate(prevProps, prevState) {
    if (Modernizr.video) {
      const indexEntered = this.state.enteredClasses.index;
      if (prevState.enteredClasses.index !== indexEntered) {
        let indexVideoDuration = this._indexVideoRef.duration;
        switch (indexEntered) {
        case '':
          this.pauseIndexVideoAtTime(0);
          break;
        case 'is-SpendIndex-index-entered':
          this._indexVideoRef.play();
          break;
        case 'is-SpendIndex-index-entered-done':
          if (!(Number.isNaN(indexVideoDuration))) {
            this.pauseIndexVideoAtTime(Math.floor(indexVideoDuration));
          }
          break;
        default:
          // TODO: error
          break;
        }
      }
    }
  },

  handleIndexVideoLoadedMetadata(e) {
    if (this.state.enteredClasses.index === 'is-SpendIndex-index-entered-done') {
      this.pauseIndexVideoAtTime(
        Math.floor(this._indexVideoRef.duration)
      );
    }
  },
  handleNewSubscription({email}) {
    this.props.onNewSubscription(email)
      .then(() => {
        this.setState({
          subscriptionMsg: Immutable({
            className: 'SpendIndex-Form-MessageBoard-success',
            content: 'Thank you for your subscription.',
            isFading: true
          })
        });
        this._formRef.reset();
      }, error => {
        this.setState({
          subscriptionMsg: Immutable({
            className: 'SpendIndex-Form-MessageBoard-error',
            content: error.message,
            isFading: false
          })
        });
      });
  },
  handleScreenChange(prevScreen, screen) {
    let isScreenMdPrev = this._isScreenMd;
    let isInit = (typeof isScreenMdPrev !== 'boolean');

    this._isScreenMd = (screen >= WindowListener.SCREEN_NAMES.MD);

    if ((isInit || !isScreenMdPrev) && this._isScreenMd) {
      this.updateAnimated(!isInit);
    } else if ((isInit || isScreenMdPrev) && !this._isScreenMd) {
      this.setSmallScreenState();
    }
  },
  handleSecuritySliderPrevClick(e) {
    this._securitySwipe.prev();
  },
  handleSecuritySliderNextClick(e) {
    this._securitySwipe.next();
  },
  handleSideViewVideoLoadedMetadata(e) {
    this.updateSideViewVideo();
  },
  handleWindowResize({height}) {
    this._windowHeight = height;
    this.updateAnimated();
  },
  handleWindowScroll({pageYOffset}) {
    this._pageYOffset = pageYOffset;
    this.updateAnimated();
  },

  render() {
    const {
      bgYOffsets,
      enteredClasses,
      subscriptionMsg
    } = this.state;
    const {
      contactless: contactlessBgY,
      display: displayBgY,
      charge: chargeBgY,
      physicalCards: physicalCardsBgY,
      tech: techBgY,
      app: appBgY,
      indiegogo: indiegogoBgY
    } = bgYOffsets;
    const {
      index: indexEnteredClass,
      contactless: contactlessEnteredClass,
      display: displayEnteredClass,
      charge: chargeEnteredClass,
      physicalCards: physicalCardsEnteredClass,
      tech: techEnteredClass,
      app: appEnteredClass,
      indiegogo: indiegogoEnteredClass
    } = enteredClasses;

    let overflowStyle = this._isScreenMd ?
      {overflow: 'hidden'} :
      null;

    return (
      <div className="SpendIndex">
        <Helmet title={CONF.BRAND} />
        <WindowListener
          onResize={this.handleWindowResize}
          onScreenChange={this.handleScreenChange}
          onScroll={this.handleWindowScroll} />

        <div className="container-fluid SpendIndex-container">
          <section
            className={classNames('SpendIndex-index', indexEnteredClass)}
          >
            <div className="SpendIndex-index-inner">
              <header className="SpendIndex-index-header text-center">
                <h1 className="SpendIndex-h1">
                  <Logo className="SpendIndex-h1-Logo" />
                </h1>
                <LinkBlock className="SpendIndex-h1-LinkBlock">
                  <IndiegogoLink eventLabel="In Index Page Index Section" />
                </LinkBlock>
              </header>
              <div className="SpendIndex-index-content">
                <div className="SpendIndex-videoLink-group">
                  <h2 className="SpendIndex-videoLink-h2">
                    Spend everywhere with one device
                  </h2>
                  <LinkBlock className="SpendIndex-video-LinkBlock">
                    <a className="SpendIndex-videoLink text-uppercase"><i className="fa fa-Spend-caret-right SpendIndex-videoLink-icon" /> VIDEO COMING SOON</a>
                  </LinkBlock>
                </div>
                <div className="SpendIndex-Form-group">
                  <Form
                    className="SpendIndex-Form"
                    action="/subscriptions" onSubmit={this.handleNewSubscription}
                    ref={ref => {
                      this._formRef = ref;
                    }}
                  >
                    <Input className="SpendIndex-Form-email" type="email" name="email" placeholder="E-mail address" />
                    <Button className="SpendIndex-Form-submit" type="submit"><i className="fa fa-Spend-paper-plane SpendIndex-Form-submit-icon" /></Button>
                  </Form>
                  <MessageBoard
                    className="SpendIndex-Form-MessageBoard"
                    message={subscriptionMsg}
                  >
                    Be first to find out when we launch campaign
                  </MessageBoard>
                </div>
              </div>
            </div>
            <div className="SpendIndex-index-bg">
              <video
                className="SpendIndex-index-bg-video"
                width="1440" height="806"
                poster="//dummyimage.com/683x403/ff/ff.png"
                onLoadedMetadata={this.handleIndexVideoLoadedMetadata}
                ref={ref => {
                  this._indexVideoRef = ref;
                }}
              >
                <source src="/videos/Main4_h.264.mp4" type="video/mp4" />
              </video>
            </div>
          </section>
          <section
            className={classNames(
              'SpendIndex-contactless', contactlessEnteredClass
            )}
            style={overflowStyle}
          >
            <div className="SpendIndex-contactless-inner">
              <header className="SpendIndex-contactless-header">
                <h2 className="SpendIndex-contactless-h2">
                  Contactless Payment, Anywhere.
                </h2>
                <p className="SpendIndex-contactless-h2-p">
                  Tap to pay on existing card readers
                </p>
              </header>
              <p
                className="SpendIndex-contactless-p
                  SpendIndex-contactless-p-last"
              >
                No NFC. Our self-developed Magnetic Flux Emulation (MFE) technology generates changing magnetic fields over a short period of time, which makes the card reader to respond as if a card has been swiped. So no more swiping. Just tap and finish your payment anywhere.
              </p>
            </div>
            <div
              className="SpendIndex-contactless-bg SpendIndex-offsetY"
              style={this.offsetY2Style(contactlessBgY)}
            >
              <div className="SpendIndex-contactless-bg-inner" />
            </div>
          </section>
          {this.renderSecurity()}
          <section
            className={classNames('SpendIndex-display', displayEnteredClass)}
            style={overflowStyle}
          >
            <div className="SpendIndex-display-inner">
              <h2 className="SpendIndex-display-h2">
                Hidden LED Display
              </h2>
              <p className="SpendIndex-display-p SpendIndex-display-p-last">
                The hidden LED display aboard SpendWallet will not be shown on the surface of the device when not in use.  When necessary, it will show the card you’ve selected, whether it is correctly connected to your phone, and how low the battery is.
              </p>
            </div>
            <div
              className="SpendIndex-display-bg SpendIndex-offsetY"
              style={this.offsetY2Style(displayBgY)}
            >
              <div className="SpendIndex-display-bg-inner" />
            </div>
          </section>
          <section
            className={classNames('SpendIndex-charge', chargeEnteredClass)}
            style={overflowStyle}
          >
            <div className="SpendIndex-charge-inner">
              <div className="SpendIndex-charge-content">
                <h2 className="SpendIndex-charge-h2">
                  Simply Rechargeable
                </h2>
                <p className="SpendIndex-charge-p">
                  SpendWallet has a rechargeable battery that generally lasts for a month. When you are notified of low battery, simply charge it with the included micro USB cable.
                </p>
              </div>
              <ImageBlock className="SpendIndex-charge-ImageBlock">
                <RImage
                  className="SpendIndex-charge-RImage"
                  src="/images/usbcharge.png" width={291} height={221} />
              </ImageBlock>
              <div className="SpendIndex-charge-battery">
                Up to 4 weeks of battery life
              </div>
            </div>
            <div
              className="SpendIndex-charge-bg SpendIndex-offsetY"
              style={this.offsetY2Style(chargeBgY)}
            >
              <div className="SpendIndex-charge-bg-inner" />
            </div>
          </section>
          <section
            className={classNames(
              'SpendIndex-physicalCards', physicalCardsEnteredClass
            )}
            style={overflowStyle}
          >
            <div className="SpendIndex-physicalCards-inner">
              <h2 className="SpendIndex-physicalCards-h2">
              Born to replace your wallet, completely.
              </h2>
              <p
                className="SpendIndex-physicalCards-p
                  SpendIndex-physicalCards-p-last"
              >
              SpendWallet is seductively designed to completely replace your existing wallet. The backside pocket is for your ID, cash, or anything that cannot be stored digitally on the device.
              </p>
            </div>
            <div
              className="SpendIndex-physicalCards-bg SpendIndex-offsetY"
              style={this.offsetY2Style(physicalCardsBgY)}
            >
              <div className="SpendIndex-physicalCards-bg-inner" />
            </div>
          </section>
          <section
            className={classNames('SpendIndex-tech', techEnteredClass)}
            style={overflowStyle}
          >
            <div className="SpendIndex-tech-bg">
              <div
                className="SpendIndex-tech-bg-inner SpendIndex-offsetY"
                style={this.offsetY2Style(techBgY)} />
            </div>
            <div className="SpendIndex-tech-inner">
              <h2 className="SpendIndex-tech-h2">
                Advanced payment technology
              </h2>
              <p className="SpendIndex-tech-p SpendIndex-tech-p-last">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </section>
          <section className="SpendIndex-measure text-center">
            <h2 className="SpendIndex-measure-h2">
              Most Slimmest<br />
              Lightest Smartwallet
            </h2>
            <div className="SpendIndex-measure-sideView">
              <video
                className="SpendIndex-measure-sideView-video"
                width="1280" height="906"
                poster="//dummyimage.com/640x453/ff/ff.png"
                onLoadedMetadata={this.handleSideViewVideoLoadedMetadata}
                ref={ref => {
                  this._sideViewVideoRef = ref;
                }}
              >
                <source src="/videos/sideview2_h.264.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="SpendIndex-measure-numbers">
              <div className="SpendIndex-measure-numbers-big">
                5.5mm / 65grams
              </div>
              <div className="SpendIndex-measure-numbers-more">
                Thickness: 5.5mm Dimension: 76mm x 120mm
              </div>
            </div>
          </section>
          <section
            className={classNames('SpendIndex-app', appEnteredClass)}
            style={overflowStyle}
          >
          <img className="SpendIndex-app-hand-background" src="images/hand_background.png"></img>
            <div className="SpendIndex-app-inner">
              <h2 className="SpendIndex-app-h2">
                <Logo /> application
              </h2>
              <p className="SpendIndex-app-p">
                Meet the app that is all-in-one for your financial management. With this app, you can easily manage credit cards, save barcodes and coupons and see expenditure analysis. As much as we care about how much you spend, we put our most effort into how smart you spend.
              </p>
              <div className="SpendIndex-app-stores text-hide">
                iOS Android
              </div>
            </div>
            <div
              className="SpendIndex-app-bg SpendIndex-offsetY"
              style={this.offsetY2Style(appBgY)}
            >
              <div className="SpendIndex-app-bg-inner" />
            </div>
          </section>
          <section
            className={classNames(
              'SpendIndex-indiegogo', indiegogoEnteredClass
            )}
            style={overflowStyle}
          >
            <div className="SpendIndex-indiegogo-inner">
              <h2 className="SpendIndex-indiegogo-h2">
                Worldwide Shipping<br />
                <em className="SpendIndex-indiegogo-h2-em">Pre-Order Coming Soon</em>
              </h2>
              <ImageBlock
                className="SpendIndex-indiegogo-ImageBlock text-center"
              >
                <Image src="/images/fin-spend-2.png" width={293} height={235} />
              </ImageBlock>
              <div className="SpendIndex-indiegogo-cta text-center">
                <LinkBlock className="SpendIndex-indiegogo-cta-LinkBlock">
                  <IndiegogoLink eventLabel="In Index Page Indiegogo Section" />
                </LinkBlock>
                <div className="SpendIndex-indiegogo-cta-info">
                  Shipping this Fall 2016
                </div>
              </div>
            </div>
            <div className="SpendIndex-indiegogo-bg">
              <div
                className="SpendIndex-indiegogo-bg-inner SpendIndex-offsetY"
                style={this.offsetY2Style(indiegogoBgY)} />
            </div>
          </section>
        </div>
      </div>
    );
  },
  renderSecurity() {
    const {securitySwipePos} = this.state;
    let {
      name: securitySwipeName
    } = SpendIndex.SECURITY_FEATURES[securitySwipePos];

    return (
      <section className="SpendIndex-security">
        <div
          className="SpendIndex-security-slider invisible"
          ref={ref => {
            this._securitySliderRef = ref;
          }}
        >
          {this.renderSecurityFeatures(true)}
          <div className="SpendIndex-security-slider-buttons">
            <PseudoButton
              onClick={this.handleSecuritySliderPrevClick}
              clickEvent={{
                category: 'Slider',
                action: 'prev',
                label: `After Viewed "${securitySwipeName}"`
              }}
            >
              <span
                className={classNames('SpendIndex-security-arrow SpendIndex-security-arrow-left text-hide', {
                  hidden: securitySwipePos <= 0
                })}
              >
                Previous
              </span>
            </PseudoButton>
            <PseudoButton
              onClick={this.handleSecuritySliderNextClick}
              clickEvent={{
                category: 'Slider',
                action: 'next',
                label: `After Viewed "${securitySwipeName}"`
              }}
            >
              <span
                className={classNames('SpendIndex-security-arrow SpendIndex-security-arrow-right text-hide', {
                  hidden: securitySwipePos >= 2
                })}
              >
                Next
              </span>
            </PseudoButton>
          </div>
        </div>
        <div className="SpendIndex-security-flatten">
          {this.renderSecurityFeatures()}
        </div>
      </section>
    );
  },
  renderSecurityFeatures(isSlider = false) {
    return (
      <ul
        className={classNames('SpendIndex-security-features listUnstyled', (
          isSlider ?
            'SpendIndex-security-slider-features' :
            'clearfix'
        ))}
      >
        {SpendIndex.SECURITY_FEATURES
          .map(({key, name, description}) => (
            <li
              className={classNames(`SpendIndex-security-feature SpendIndex-security-feature-${key} text-center`, (
                isSlider ?
                  `SpendIndex-security-slider-feature SpendIndex-security-slider-feature-${key}` :
                  'pull-left'
              ))}
              key={key}
            >
              <div
                className={classNames('SpendIndex-security-feature-name', {
                  'SpendIndex-security-slider-feature-name': isSlider
                })}
              >
                {name}
              </div>
              <Markdown
                className={classNames('SpendIndex-security-feature-desc', {
                  'SpendIndex-security-slider-feature-desc': isSlider
                })}
              >
                {description}
              </Markdown>
            </li>
          ))}
      </ul>
    );
  }
});

module.exports = SpendIndex;
