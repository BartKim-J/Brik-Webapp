let React = require('react');
let Helmet = require('react-helmet');

let {Button} = require('../buttons');
let {Form} = require('../forms');
let {ImageBlock, RImage} = require('../images');
let {LinkBlock} = require('../links');

let Logo = require('./logo');
let IndiegogoLink = require('./indiegogoLink');

let SpendIndex = React.createClass({
  propTypes: {
    onNewSubscription: React.PropTypes.func.isRequired
  },

  // Instance variables
  // - _formRef

  handleNewSubscription({email}) {
    this.props.onNewSubscription(email)
      .then(() => {
        // TODO
        this._formRef.reset();
      }, error => {
        // TODO
      });
  },

  render() {
    return (
      <div className="SpendIndex">
        <Helmet title={CONF.BRAND} />

        <div className="container-fluid SpendIndex-container">
          <section className="SpendIndex-index">
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
                autoPlay
              >
                <source src="/videos/Main2_h.264.mov" type="video/mp4" />
              </video>
            </div>
          </section>
          <section className="SpendIndex-contactless">
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
            <div className="SpendIndex-contactless-bg">
              <div className="SpendIndex-contactless-bg-inner" />
            </div>
          </section>
          <section className="SpendIndex-display">
            <div className="SpendIndex-display-inner">
              <h2 className="SpendIndex-display-h2">
                Matrix Display
              </h2>
              <p className="SpendIndex-display-p SpendIndex-display-p-last">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
            </div>
            <div className="SpendIndex-display-bg">
              <div className="SpendIndex-display-bg-inner" />
            </div>
          </section>
          <section className="SpendIndex-charge">
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
            <div className="SpendIndex-charge-bg">
              <div className="SpendIndex-charge-bg-inner" />
            </div>
          </section>
          <section className="SpendIndex-physicalCards">
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
            <div className="SpendIndex-physicalCards-bg">
              <div className="SpendIndex-physicalCards-bg-inner" />
            </div>
          </section>
          <section className="SpendIndex-tech">
            <div className="SpendIndex-tech-bg">
              <div className="SpendIndex-tech-bg-inner" />
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
          <section className="SpendIndex-app">
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
            <div className="SpendIndex-app-bg">
              <div className="SpendIndex-app-bg-inner" />
            </div>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = SpendIndex;
