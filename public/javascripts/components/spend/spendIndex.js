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

      let {formatMessage} = this.context.intl;

    return (
      <div className="AsteraIndex">
        <Helmet title={CONF.BRAND} />
        <div className="container-fluid SpendIndex-container">

          <section className={classNames('AsteraIndex-Main')}>
            <div className="AsteraIndex-inner">
              <div className="AsteraIndex-content">
                <div className="AsteraIndex-text-group">
                  <FormattedHTMLMessage id="index.heading.fat">
                    <h1 className="AsteraIndex-text-h1"/>
                  </FormattedHTMLMessage>
                  <FormattedHTMLMessage id="index.heading">
                    <p className="AsteraIndex-text-p"/>
                  </FormattedHTMLMessage>
                  <div className="AsteraIndex-text-p-oval">
                    <FormattedHTMLMessage id="index.heading.oval">
                      <p className="AsteraIndex-text-p"/>
                    </FormattedHTMLMessage>
                  </div>
                  <div className="AsteraIndex-Main-Circle">
                    <img src="https://s3.ap-northeast-2.amazonaws.com/astera/ASTERA.com/background-circle.png" alt="Circle" />
                  </div>
                </div>
                <div className="AsteraIndex-Form-group">
                  <Form
                    className="AsteraIndex-Form"
                    action="/subscriptions" onSubmit={this.handleNewSubscription}
                    ref={ref => {
                      this._formRef = ref;
                    }}
                  >
                    <Input className="AsteraIndex-Form-email" type="email" name="email" placeholder={formatMessage({id: 'emailPlaceholder'})} />
                    <Button className="AsteraIndex-Form-submit" type="submit">
                      <FormattedHTMLMessage id="index.newsletter.submit">
                        <h2 className="AsteraIndex-Form-submit-text"/>
                      </FormattedHTMLMessage>
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </section>

          <section className={classNames('AsteraIndex-descrip')}>
            <div className="AsteraIndex-descrip-text-group">
              <FormattedHTMLMessage id="index.charge.description">
                <h1 className="AsteraIndex-descrip-text-h1"/>
              </FormattedHTMLMessage>
            </div>
            <div className="AsteraIndex-descrip-hardware">
              <img className="AsteraIndex-descrip-hardware" src="https://s3.ap-northeast-2.amazonaws.com/astera/ASTERA.com/Astera_Hardware_view_2.png" alt="Hardware"/>
            </div>
          </section>

          <section className={classNames('AsteraIndex-subscrib')}>
              <div className="AsteraIndex-subscrib-text-group">
                <h1 className="AsteraIndex-subscrib-h1">
                  {formatMessage({id: 'index.newsletter.heading'})}
                </h1>
              </div>
            <div className="AsteraIndex-Form-group center">
              <Form
                className="AsteraIndex-Form"
                action="/subscriptions" onSubmit={this.handleNewSubscription}
                ref={ref => {
                  this._formRef = ref;
                }}
              >
                <Input className="AsteraIndex-Form-email" type="email" name="email" placeholder={formatMessage({id: 'emailPlaceholder'})} />
                <Button className="AsteraIndex-Form-submit" type="submit">
                  <FormattedHTMLMessage id="index.newsletter.submit">
                    <h2 className="AsteraIndex-Form-submit-text"/>
                  </FormattedHTMLMessage>
                </Button>
              </Form>
            </div>
          </section>

        </div>
      </div>
    );
  },
});

module.exports = AsteraIndex;
