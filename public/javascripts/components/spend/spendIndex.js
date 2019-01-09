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
let {Link} = require('../router');
let {ScrollLink} = require('../links');
let Markdown = require('../markdown');
let MessageBoard = require('../messageBoard');
let WindowListener = require('../windowListener');

let IndiegogoLink = require('./indiegogoLink');
let Logo = require('./logo');
let Consolidation = require('./consolidation');

let Immutable = require('seamless-immutable');


var AsteraSliderImages = React.createClass({
  getInitialState: function() {
    return {
      slider: ["first", "second", "third", "fourth", "fifth"],
      activeIndex: 1,
      left: 0
    }
  },
  prevSlide: function() {
    this.setState({
      activeIndex: this.state.activeIndex - 1,
      left: this.state.left + 400 // this.props.sliderWidth not working for some reason
    })
    if (this.state.activeIndex === 1) {
      this.setState({
        activeIndex: this.state.activeIndex + this.state.slider.length - 1,
        left: this.state.left - this.props.sliderWidth * (this.state.slider.length - 1)
      })
    }
  },
  nextSlide: function() {
    this.setState({
      activeIndex: this.state.activeIndex + 1,
      left: this.state.left - this.props.sliderWidth
    })
    if (this.state.activeIndex === this.state.slider.length) {
      this.setState({
        activeIndex: this.state.activeIndex - this.state.slider.length + 1,
        left: 0
      })
    }
  },
  clickIndicator: function(e) {
    this.setState({
      activeIndex: parseInt(e.target.textContent),
      left: this.props.sliderWidth - parseInt(e.target.textContent) * this.props.sliderWidth
    })
  },
  render: function() {
    return (
      <div>
        <div  className="slider-wrapper">
        <ul className="slider">
        {this.state.slider.map(function(item,index) {
          return (
          <li className={index+1 === this.state.activeIndex ? 'slider-item' : 'slider-item-hide'}>
              <div className="AsteraIndex-Sub-render-image">
                  <img src="https://s3.ap-northeast-2.amazonaws.com/brikweb/brik.com/brik_slice_1.png"></img>
              </div>
          </li>

          )
        },this)
        }
        </ul>
        </div>
        <div className="buttons-wrapper">
        <button className="prev-button" onClick={this.prevSlide}></button>
        <button className="next-button" onClick={this.nextSlide}></button>
        </div>
        <div className="indicators-wrapper">
          <ul className="indicators">
         {this.state.slider.map(function(item,index) {
          return (
          <li className={index+1 === this.state.activeIndex ? 'active-indicator' : ''}onClick={this.clickIndicator}>{index+1}</li>
          )
        },this)
        }
          </ul>
        </div>
      </div>
    );
  }
});

let AsteraIndex = React.createClass({
    statics: {

    },

    propTypes: {
      onNewSubscription: React.PropTypes.func.isRequired
    },

    contextTypes: {
      intl: intlShape.isRequired
    },

    getInitialState() {
      return {

      };
    },

    componentDidMount() {

    },

    componentDidUpdate(prevProps, prevState) {

    },

    handleNewSubscription({email}) {
      this.props.onNewSubscription(email)
        .then(() => {
          this.setState({
            subscriptionMsg: Immutable({
              className: 'SpendIndex-Form-MessageBoard-success',
              content: 'https://s3.ap-northeast-2.amazonaws.com/spendwallet/spendwallet.com/email_check.png',
              isFading: true
            })
          });
          this._formRef.reset();
        }, error => {
          this.setState({
            subscriptionMsg: Immutable({
              className: 'SpendIndex-Form-MessageBoard-error',
              content: 'https://s3.ap-northeast-2.amazonaws.com/spendwallet/spendwallet.com/email_plane.png',
              isFading: false
            })
          });
        });
    },

  render() {
      const {
        subscriptionMsg
      } = this.state;

      var style = {
        left: this.state.left,
        width: this.props.sliderWidth,
        height: this.props.sliderHeight
      };

      let {formatMessage} = this.context.intl;

    return (
      <div className="Astera-Index">
        <Helmet title={CONF.BRAND} />
        <div className="AsteraIndex-container">

          <section className={classNames('AsteraIndex-Main')}>
            <div className="AsteraIndex-inner">
              <div className="AsteraIndex-content">
                <div className="AsteraIndex-text-group">
                    <p className="is-a-portable-screen">
                    <span className="AsteraIndex-text-logo">brik.</span> is a portable<br />
                    screen mirroring device.
                    </p>
                </div>


                <div className="AsteraIndex-Main-render-image">
                    <img src="https://s3.ap-northeast-2.amazonaws.com/brikweb/brik.com/brik_header.png"></img>
                </div>

              </div>
            </div>
          </section>

          <section className={classNames('AsteraIndex-descrip')}>
            <div className="AsteraIndex-descrip-text-group">
                <p className="Be-first-to-know-whe">
                Be first to know when <br />
                <span className=".Be-first-to-know-whe text-style-1">brik.</span> is on sale
                </p>
            </div>

            <div className="AsteraIndex-Form-group">
              <Form
                className="AsteraIndex-Form"
                action="/subscriptions" onSubmit={this.handleNewSubscription}
                ref={ref => {
                  this._formRef = ref;
                }}
              >
                <Input className="AsteraIndex-Form-email" type="email" name="email" placeholder="Type your email"/>
                <Button className="AsteraIndex-Form-submit" type="submit">
                    <h2 className="AsteraIndex-Form-submit-text">submit</h2>
                </Button>
              </Form>
            </div>
          </section>

          <section className={classNames('AsteraIndex-Desc')}>
            <div className="AsteraIndex-inner">
              <div className="AsteraIndex-Desc-content">

                <div className="AsteraIndex-Desc-text-group">
                    <p className="Brik-is-dead-simple">
                    Brik is dead simple. <br />
                    Connect and you are done.
                    </p>

                    <p className ="Take-brik-anywhere-t">
                    Take brik anywhere to cast your device to a bigger screen. set up once and your brik automatically and instantly connects with all of your devices. Just connect to HDMI and you are done. Brik provides the most simple and seamless screen mirroring experience.
                    </p>
                </div>


                <div className="AsteraIndex-Main-render-image_2">
                    <img src="https://s3.ap-northeast-2.amazonaws.com/brikweb/brik.com/brik_connect.png"></img>
                </div>

              </div>
            </div>
          </section>

          <section className={classNames('AsteraIndex-Desc_2')}>
            <div className="AsteraIndex-inner">
              <div className="AsteraIndex-Desc_2-content">

                <div className="AsteraIndex-Desc_2-text-group">
                    <p className="Brik-is-universal-w">
                        Brik is universal. <br />
                        works with all devices in the market.
                    </p>

                    <p className ="Brik-supports-all-st">
                        Brik supports all standard screen casting technology of the industry: Airplay, Mircast and Googlecast. There is no need to install any additional software. use brik to cast from your smartphones, tablets, laptops and PCs. Connect with any displays including TV, monitor and projector using HDMI.
                    </p>
                </div>


                <div className="AsteraIndex-Main-render-image_3">
                    <img src="https://s3.ap-northeast-2.amazonaws.com/brikweb/brik.com/brik_devices.png"></img>
                </div>

              </div>
            </div>
          </section>

          <section className={classNames('AsteraIndex-Desc_3')}>
            <div className="AsteraIndex-inner">
              <div className="AsteraIndex-Desc_3-content">

                <div className="AsteraIndex-Desc_3-text-all-group">
                    <div className="AsteraIndex-Desc_3-text-group">
                        <p className="brik-is-modular-min">
                            brik is modular. <br />
                            minimizing cost <br />
                            and maximizing <br />
                            usability.
                        </p>
                    </div>

                    <div className="AsteraIndex-Desc_3-text-group_2">
                        <p className ="brik-comes-with-a-de">
                            brik comes with a detachable battery, which can be reattached to different modules for different functions. customize your brik to best suit your needs. a new type of module will be released every three months. let us know what you want for the next module of brik by checking the box above.
                        </p>
                    </div>
                </div>

                <div className="AsteraIndex-Desc_3-vote-target">
                    <button onClick="" className="AsteraIndex-vote-item-hidden">
                        <img src="https://s3.ap-northeast-2.amazonaws.com/brikweb/brik.com/vote/vote_projector.png"></img>
                    </button>
                    <button onClick="" className="AsteraIndex-vote-item-hidden">
                        <img src="https://s3.ap-northeast-2.amazonaws.com/brikweb/brik.com/vote/vote_battery.png"></img>
                    </button>
                    <button onClick="" className="AsteraIndex-vote-item-hidden">
                        <img src="https://s3.ap-northeast-2.amazonaws.com/brikweb/brik.com/vote/vote_camera.png"></img>
                    </button>
                    <button onClick="" className="AsteraIndex-vote-item-hidden">
                        <img src="https://s3.ap-northeast-2.amazonaws.com/brikweb/brik.com/vote/vote_mood_light.png"></img>
                    </button>
                    <button onClick="" className="AsteraIndex-vote-item-hidden">
                        <img src="https://s3.ap-northeast-2.amazonaws.com/brikweb/brik.com/vote/vote_speaker.png"></img>
                    </button>
                </div>

                <div className="AsteraIndex-Desc_3-vote-form">
                    <button className="AsteraIndex-Desc_3-vote-box">
                        <p className="AsteraIndex-Desc_3-vote-box-p">
                            Vote
                        </p>
                    </button>
                </div>


                <div className="AsteraIndex-Main-render-image_3">
                </div>

              </div>
            </div>
          </section>

          <section className={classNames('AsteraIndex-Image-Slider')}>
            <div className="AsteraIndex-Slider">
                <AsteraSliderImages/>
            </div>
          </section>

          <section className={classNames('AsteraIndex-spec')}>
            <div className="AsteraIndex-spec-content">
                <div className="AsteraIndex-spec-text-all-group">
                    <div className="AsteraIndex-spec-text-group">
                        <div className="AsteraIndex-spec-text-spec">
                            <div className="AsteraIndex-Spec-render-image">
                                <img src="https://s3.ap-northeast-2.amazonaws.com/brikweb/brik.com/brik_spec.png"></img>
                            </div>

                            <p className="Technical-spec">
                            Technical spec.
                            </p>
                            <div className="CPU-Quad-Core-A17-W">
                                <span className="CPU-Quad-Core-A17-W-Bold">CPU:</span> Quad Core A17<br />
                                <div className="CPU-Quad-Core-A17-W-Line "/>
                            </div>

                            <div className="CPU-Quad-Core-A17-W">
                                <span className="CPU-Quad-Core-A17-W-Bold">Wireless chip:</span> 802.11b/g/n/ac<br />
                                <div className="CPU-Quad-Core-A17-W-Line "/>
                            </div>

                            <div className="CPU-Quad-Core-A17-W">
                                <span className="CPU-Quad-Core-A17-W-Bold">Battery:</span> 3800mAh (3.7V)<br />
                                <div className="CPU-Quad-Core-A17-W-Line "/>
                            </div>

                            <div className="CPU-Quad-Core-A17-W">
                                <span className="CPU-Quad-Core-A17-W-Bold">Streaming Protocol:</span> Airplay, Miracast, Google Cast<br />
                                <div className="CPU-Quad-Core-A17-W-Line "/>
                            </div>

                            <div className="CPU-Quad-Core-A17-W">
                                <span className="CPU-Quad-Core-A17-W-Bold">Size:</span> 45mm×90mm×45mm
                            </div>
                        </div>


                    </div>
                </div>
            </div>
          </section>

          <section className={classNames('AsteraIndex-descrip_2')}>
            <div className="AsteraIndex-descrip_2-text-group">
                <p className="Be-first-to-know-whe">
                Be first to know when <br />
                <span className=".Be-first-to-know-whe text-style-1">brik.</span> is on sale
                </p>
            </div>

            <div className="AsteraIndex-Form-group">
              <Form
                className="AsteraIndex-Form"
                action="/subscriptions" onSubmit={this.handleNewSubscription}
                ref={ref => {
                  this._formRef = ref;
                }}
              >
                <Input className="AsteraIndex-Form-email" type="email" name="email" placeholder="Type your email"/>
                <Button className="AsteraIndex-Form-submit" type="submit">
                    <h2 className="AsteraIndex-Form-submit-text">submit</h2>
                </Button>
              </Form>
            </div>

            <div className="AsteraIndex-Logo-Kickstarter">
                <img src="https://s3.ap-northeast-2.amazonaws.com/brikweb/brik.com/brik_logo_kickstarter.png"></img>
            </div>

          </section>

        </div>
      </div>
    );
  },
});

module.exports = AsteraIndex;
