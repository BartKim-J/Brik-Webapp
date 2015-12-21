let React = require('react');
let classNames = require('classnames');
let Helmet = require('react-helmet');

let size = require('lodash/collection/size');
let some = require('lodash/collection/some');

let {Button} = require('../buttons');
let {Form} = require('../forms');
let {ImageBlock, RImage} = require('../images');
let {LinkBlock} = require('../links');
let WindowListener = require('../windowListener');

let Logo = require('./logo');
let IndiegogoLink = require('./indiegogoLink');

let Immutable = require('seamless-immutable');

let SpendIndex = React.createClass({
  statics: {
    DEFAULT_BG_Y_OFFSETS: Immutable({
      contactless: 0,
      display: 0,
      charge: 0,
      physicalCards: 0,
      tech: 0,
      app: 0
    }),
    BG_OFFSET_Y_MAX: 10
  },

  propTypes: {
    onNewSubscription: React.PropTypes.func.isRequired
  },

  // Instance variables
  // - _formRef
  // - _videoRef
  // - _isScreenMd
  // - _pageYOffset
  // - _windowHeight

  getInitialState() {
    return {
      enteredClasses: Immutable({
        index: '',
        contactless: '',
        display: '',
        charge: '',
        physicalCards: '',
        tech: '',
        app: ''
      }),
      bgYOffsets: SpendIndex.DEFAULT_BG_Y_OFFSETS
    };
  },

  setSmallScreenState(isInit) {
    let state = {
      enteredClasses: Immutable({
        index: 'is-SpendIndex-index-entered-done',
        contactless: 'is-SpendIndex-contactless-entered-done',
        display: 'is-SpendIndex-display-entered-done',
        charge: 'is-SpendIndex-charge-entered-done',
        physicalCards: 'is-SpendIndex-physicalCards-entered-done',
        tech: 'is-SpendIndex-tech-entered-done',
        app: 'is-SpendIndex-app-entered-done'
      })
    };
    if (!isInit && some(this.state.bgYOffsets)) {
      state.bgYOffsets = SpendIndex.DEFAULT_BG_Y_OFFSETS;
    }
    this.setState(state);
  },

  updateEntered(isReset = false) {
    if (typeof this._isScreenMd !== 'boolean' ||
      typeof this._pageYOffset !== 'number' ||
      typeof this._windowHeight !== 'number')
    {
      return;
    }

    if (this._isScreenMd) {
      const {enteredClasses} = this.state;
      let newEnteredClasses = {};

      // TEMP: hardcoded numbers (thresholds: 1/3s and 2/3s of heights)
      let ranges = {
        index: [0, 537],
        contactless: [1015 - this._windowHeight, 1225],
        display: [1626 - this._windowHeight, 1822],
        charge: [2234 - this._windowHeight, 2448],
        physicalCards: [2860 - this._windowHeight, 3056],
        tech: [3535 - this._windowHeight, 3816],
        app: [4984 - this._windowHeight, 5304]
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
    }
  },
  updateBgYOffsets() {
    if (typeof this._isScreenMd !== 'boolean' ||
      typeof this._pageYOffset !== 'number' ||
      typeof this._windowHeight !== 'number')
    {
      return;
    }

    if (this._isScreenMd) {
      const {bgYOffsets} = this.state;
      let newBgYOffsets = {};
      const {BG_OFFSET_Y_MAX} = SpendIndex;
      let halfHeight = this._windowHeight/2;

      // TEMP
      // hardcoded numbers
      // (thresholds: 1/3s of section heights and vertical centers)
      let ranges = {
        contactless: [1015 - this._windowHeight, 1117.5 - halfHeight],
        display: [1626 - this._windowHeight, 1724 - halfHeight],
        charge: [2234 - this._windowHeight, 2341 - halfHeight],
        physicalCards: [2860 - this._windowHeight, 2958 - halfHeight],
        tech: [3535 - this._windowHeight, 3816],
        app: [4984 - this._windowHeight, 5144 - halfHeight]
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
    }
  },

  offsetY2Style(offsetY) {
    return offsetY ? {
      WebkitTransform: `translate3d(0,${offsetY}%,0)`,
      transform: `translate3d(0,${offsetY}%,0)`
    } : null;
  },

  componentDidUpdate(prevProps, prevState) {
    if (Modernizr.video) {
      const {index: prevIndexEntered} = prevState.enteredClasses;
      const {index: indexEntered} = this.state.enteredClasses;
      if (!prevIndexEntered) {
        let videoDuration = this._videoRef.duration;
        switch (indexEntered) {
        case 'is-SpendIndex-index-entered':
          this._videoRef.play();
          break;
        case 'is-SpendIndex-index-entered-done':
          if (videoDuration !== NaN) {
            this._videoRef.currentTime = Math.floor(videoDuration);
          }
          break;
        default:
          break;
        }
      } else if (!indexEntered) {
        this._videoRef.currentTime = 0;
      }
    }
  },

  handleNewSubscription({email}) {
    this.props.onNewSubscription(email)
      .then(() => {
        // TODO
        this._formRef.reset();
      }, error => {
        // TODO
      });
  },
  handleScreenChange(prevScreen, screen) {
    let isScreenMdPrev = this._isScreenMd;
    let isInit = (typeof isScreenMdPrev !== 'boolean');

    this._isScreenMd = (screen >= WindowListener.SCREEN_NAMES.MD);

    if ((isInit || !isScreenMdPrev) && this._isScreenMd) {
      this.updateEntered(!isInit);
      this.updateBgYOffsets();
    } else if ((isInit || isScreenMdPrev) && !this._isScreenMd) {
      this.setSmallScreenState(isInit);
    }
  },
  handleVideoLoadedMetadata(e) {
    if (this.state.enteredClasses.index === 'is-SpendIndex-index-entered-done') {
      this._videoRef.currentTime = Math.floor(this._videoRef.duration);
    }
  },
  handleWindowResize({height}) {
    this._windowHeight = height;

    this.updateEntered();
    this.updateBgYOffsets();
  },
  handleWindowScroll({pageYOffset}) {
    this._pageYOffset = pageYOffset;

    this.updateEntered();
    this.updateBgYOffsets();
  },

  render() {
    const {enteredClasses, bgYOffsets} = this.state;
    const {
      index: indexEnteredClass,
      contactless: contactlessEnteredClass,
      display: displayEnteredClass,
      charge: chargeEnteredClass,
      physicalCards: physicalCardsEnteredClass,
      tech: techEnteredClass,
      app: appEnteredClass
    } = enteredClasses;
    const {
      contactless: contactlessBgY,
      display: displayBgY,
      charge: chargeBgY,
      physicalCards: physicalCardsBgY,
      tech: techBgY,
      app: appBgY
    } = bgYOffsets;

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
              <header className="SpendIndex-index-header">
                <h1 className="SpendIndex-h1">
                  <Logo className="SpendIndex-h1-Logo" />
                </h1>
                <LinkBlock className="SpendIndex-h1-LinkBlock">
                  <IndiegogoLink />
                </LinkBlock>
              </header>
              <div className="SpendIndex-index-content">
                <div className="SpendIndex-videoLink-group">
                  <h2 className="SpendIndex-videoLink-h2">
                    Spend everywhere with one device
                  </h2>
                  <LinkBlock className="SpendIndex-video-LinkBlock">
                    <a className="SpendIndex-videoLink text-uppercase" href=""><i className="fa fa-Spend-caret-right SpendIndex-videoLink-icon" /> Watch Video</a>
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
                    <input className="SpendIndex-Form-email" type="email" name="email" placeholder="E-mail address" />
                    <Button className="SpendIndex-Form-submit" type="submit"><i className="fa fa-Spend-paper-plane SpendIndex-Form-submit-icon" /></Button>
                  </Form>
                  <p className="SpendIndex-Form-p SpendIndex-Form-p-last">
                    Be first to find out when we launch campaign
                  </p>
                </div>
              </div>
            </div>
            <div className="SpendIndex-index-bg">
              <video
                className="SpendIndex-index-bg-video"
                width="1366" height="806" poster="/images/white.png"
                onLoadedMetadata={this.handleVideoLoadedMetadata}
                ref={ref => {
                  this._videoRef = ref;
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
                  Contactless Payment
                </h2>
                <p className="SpendIndex-contactless-h2-p">
                  All your cards in one smart device
                </p>
              </header>
              <p
                className="SpendIndex-contactless-p
                  SpendIndex-contactless-p-last"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div
              className="SpendIndex-contactless-bg"
              style={this.offsetY2Style(contactlessBgY)}
            >
              <div className="SpendIndex-contactless-bg-inner" />
            </div>
          </section>
          <section
            className={classNames('SpendIndex-display', displayEnteredClass)}
            style={overflowStyle}
          >
            <div className="SpendIndex-display-inner">
              <h2 className="SpendIndex-display-h2">
                Matrix Display
              </h2>
              <p className="SpendIndex-display-p SpendIndex-display-p-last">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
            </div>
            <div
              className="SpendIndex-display-bg"
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
                  USB Cable Charger
                </h2>
                <p className="SpendIndex-charge-p">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                </p>
              </div>
              <ImageBlock className="SpendIndex-charge-ImageBlock">
                <RImage
                  className="SpendIndex-charge-RImage"
                  src="/images/usbcharge.png" width={291} height={221} />
              </ImageBlock>
              <div className="SpendIndex-charge-battery">
                Battery life 2-4 weeks
              </div>
            </div>
            <div
              className="SpendIndex-charge-bg"
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
                Put physical cards
              </h2>
              <p
                className="SpendIndex-physicalCards-p
                  SpendIndex-physicalCards-p-last"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
            </div>
            <div
              className="SpendIndex-physicalCards-bg"
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
                className="SpendIndex-tech-bg-inner"
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
            <div className="SpendIndex-measure-sideView" />
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
            <div className="SpendIndex-app-inner">
              <h2 className="SpendIndex-app-h2">
                <Logo /> application
              </h2>
              <p className="SpendIndex-app-p">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable
              </p>
              <div className="SpendIndex-app-stores text-hide">
                iOS Android
              </div>
            </div>
            <div
              className="SpendIndex-app-bg"
              style={this.offsetY2Style(appBgY)}
            >
              <div className="SpendIndex-app-bg-inner" />
            </div>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = SpendIndex;
