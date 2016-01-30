let React = require('react');
let classNames = require('classnames');
let Helmet = require('react-helmet');
let {intlShape} = require('react-intl');

let size = require('lodash/collection/size');
let some = require('lodash/collection/some');

let {Button, PseudoButton} = require('../buttons');
let {Input, Form} = require('../forms');
let {Image, RImage, ImageBlock} = require('../images');
let {FormattedHTMLMessage} = require('../intl');
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
      physicalCards: 0,
      design: 0,
      display: 0,
      charge: 0,
      tech: 0,
      app: 0,
      preOrder: 0
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

  contextTypes: {
    intl: intlShape.isRequired
  },

  // Instance variables
  // - _formRef
  // - _indexVideoRef
  // - _sideViewVideoRef
  // - _securitySliderRef
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
        physicalCards: '',
        design: '',
        display: '',
        charge: '',
        tech: '',
        app: '',
        preOrder: ''
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
        physicalCards: 'is-SpendIndex-physicalCards-entered-done',
        design: 'is-SpendIndex-design-entered-done',
        display: 'is-SpendIndex-display-entered-done',
        charge: 'is-SpendIndex-charge-entered-done',
        tech: 'is-SpendIndex-tech-entered-done',
        app: 'is-SpendIndex-app-entered-done',
        preOrder: 'is-SpendIndex-preOrder-entered-done'
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
      physicalCards: [1861 - this._windowHeight, 1982 - halfHeight],
      design: [2559 - this._windowHeight, 2666 - halfHeight],
      display: [3887 - this._windowHeight, 3993 - halfHeight],
      charge: [4525 - this._windowHeight, 4633 - halfHeight],
      tech: [5236 - this._windowHeight, 5518],
      app: [6787 - this._windowHeight, 6907 - halfHeight],
      preOrder: [7566 - this._windowHeight, 7865]
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
      case 'design':
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
      physicalCards: [1861 - this._windowHeight, 2103],
      design: [2559 - this._windowHeight, 2773],
      display: [3887 - this._windowHeight, 4099],
      charge: [4525 - this._windowHeight, 4740],
      tech: [5236 - this._windowHeight, 5518],
      app: [6787 - this._windowHeight, 7027],
      preOrder: [7566 - this._windowHeight, 7865]
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
    /*
    let {duration} = this._sideViewVideoRef;

    if (!(Number.isNaN(duration)) && Modernizr.video) {
      let time;
      const TIME_MAX = Math.floor(duration);

      // TEMP: hardcoded numbers (2/3 of height and page offset)
      let min = 3446 - this._windowHeight;
      let max = 2988;

      if (this._pageYOffset <= min) {
        time = 0;
      } else if (this._pageYOffset < max) {
        time = ((this._pageYOffset - min)/(max - min))*TIME_MAX;
      } else {
        time = TIME_MAX;
      }

      this._sideViewVideoRef.currentTime = time;
    }
    */
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
    // TEMP
    this._sideViewVideoRef.currentTime = 0;
    // this.updateSideViewVideo();
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
      physicalCards: physicalCardsBgY,
      design: designBgY,
      display: displayBgY,
      charge: chargeBgY,
      tech: techBgY,
      app: appBgY,
      preOrder: preOrderBgY
    } = bgYOffsets;
    const {
      index: indexEnteredClass,
      contactless: contactlessEnteredClass,
      physicalCards: physicalCardsEnteredClass,
      design: designEnteredClass,
      display: displayEnteredClass,
      charge: chargeEnteredClass,
      tech: techEnteredClass,
      app: appEnteredClass,
      preOrder: preOrderEnteredClass
    } = enteredClasses;

    let overflowStyle = this._isScreenMd ?
      {overflow: 'hidden'} :
      null;

    let {formatMessage} = this.context.intl;

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
                <div className="SpendIndex-link-video-group">
                  <h2 className="SpendIndex-link-video-h2">
                    Spend everywhere with one device
                  </h2>
                  <LinkBlock className="SpendIndex-video-LinkBlock">
                    <a className="SpendIndex-link SpendIndex-link-video text-uppercase"><i className="fa fa-Spend-caret-right SpendIndex-link-video-icon" /> Video Coming Soon</a>
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
                    <Input className="SpendIndex-Form-email" type="email" name="email" placeholder={formatMessage({id: 'emailPlaceholder'})} />
                    <Button className="SpendIndex-Form-submit" type="submit"><i className="fa fa-Spend-paper-plane SpendIndex-Form-submit-icon" /></Button>
                  </Form>
                  <MessageBoard
                    className="SpendIndex-Form-MessageBoard"
                    message={subscriptionMsg}
                  >
                    {formatMessage({id: 'index.formMessageBoard'})}
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
              <FormattedHTMLMessage id="index.contactless.header">
                <header className="SpendIndex-contactless-header" />
              </FormattedHTMLMessage>
              <article className="SpendIndex-contactless-article">
                <Markdown>
                  {formatMessage({id: 'index.contactless.paragraphs'})}
                </Markdown>
              </article>
            </div>
            <div
              className="SpendIndex-contactless-bg SpendIndex-offsetY"
              style={this.offsetY2Style(contactlessBgY)}
            >
              <div className="SpendIndex-contactless-bg-inner" />
            </div>
          </section>
          <section
            className={classNames(
              'SpendIndex-physicalCards', physicalCardsEnteredClass
            )}
            style={overflowStyle}
          >
            <article className="SpendIndex-physicalCards-article">
              <Markdown>
                {formatMessage({id: 'index.physicalCards.article'})}
              </Markdown>
            </article>
            <div
              className="SpendIndex-physicalCards-bg SpendIndex-offsetY"
              style={this.offsetY2Style(physicalCardsBgY)}
            >
              <div className="SpendIndex-physicalCards-bg-inner" />
            </div>
          </section>
          <section
            className={classNames('SpendIndex-design', designEnteredClass)}
            style={overflowStyle}
          >
            <div className="SpendIndex-design-inner">
              <h2 className="SpendIndex-design-h2">
                Splendid Design
              </h2>
              <p className="SpendIndex-design-p SpendIndex-design-p-last">
                The frame is made of aluminum, one of the strongest and lightest materials on earth. This makes the device strong and durable enough for everyday use in your pocket. Plastic on the front and back cover finishes up the design with style. SpendWallet has been engineered to seamlessly work with your smooth payment experience.
              </p>
            </div>
            <div
              className="SpendIndex-design-bg SpendIndex-offsetY"
              style={this.offsetY2Style(designBgY)}
            >
              <div className="SpendIndex-design-bg-inner" />
            </div>
          </section>
          <section className="SpendIndex-measure text-center">
            <h2 className="SpendIndex-measure-h2">
              Slim. Solid.<br />
              SpendWallet
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
                6.0mm / 65grams
              </div>
              <div className="SpendIndex-measure-numbers-more">
                Thickness: 6.0mm Dimension: 60.5mm x 105mm
              </div>
            </div>
          </section>
          <section
            className={classNames('SpendIndex-display', displayEnteredClass)}
            style={overflowStyle}
          >
            <div className="SpendIndex-display-inner">
              <h2 className="SpendIndex-display-h2">
                Hidden LED Display
              </h2>
              <p className="SpendIndex-display-p SpendIndex-display-p-last">
                The hidden LED display aboard SpendWallet will not be shown on the surface of the device when not in use. When necessary, it will show the card you’ve selected, whether it is correctly connected to your phone, and how low the battery is.
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
                True Electronic Wallet
              </h2>
              <p className="SpendIndex-tech-p SpendIndex-tech-p-last">
                Your heavy, thick traditional wallet should better evolve into a smart digital wallet. Finally, a real physical electronic wallet that consolidates all your cards.
              </p>
            </div>
          </section>
          {this.renderSecurity()}
          <section
            className={classNames('SpendIndex-app', appEnteredClass)}
            style={overflowStyle}
          >
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
              'SpendIndex-preOrder', preOrderEnteredClass
            )}
            style={overflowStyle}
          >
            <div className="SpendIndex-preOrder-inner">
              <h2 className="SpendIndex-preOrder-h2">
                Worldwide Shipping<br />
                <em className="SpendIndex-preOrder-h2-em">Pre-Order Coming Soon</em>
              </h2>
              <ImageBlock
                className="SpendIndex-preOrder-ImageBlock text-center"
              >
                <Image src="/images/fin-spend-2.png" width={293} height={235} />
              </ImageBlock>
              <LinkBlock className="SpendIndex-preOrder-LinkBlock">
                <a className="SpendIndex-link SpendIndex-link-preOrder text-uppercase">Pre-Order Coming Soon</a>
              </LinkBlock>
            </div>
            <div className="SpendIndex-preOrder-bg">
              <div
                className="SpendIndex-preOrder-bg-inner SpendIndex-offsetY"
                style={this.offsetY2Style(preOrderBgY)} />
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
