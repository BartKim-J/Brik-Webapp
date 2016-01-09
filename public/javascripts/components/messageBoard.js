let React = require('react');
let classNames = require('classnames');

let pick = require('lodash/object/pick');

let TransitionMixin = require('../mixins/transition');

let Immutable = require('seamless-immutable');

let MessageBoard = React.createClass({
  mixins: [TransitionMixin],

  propTypes: {
    message: React.PropTypes.object
  },

  // Instance variables
  // - _ref

  getInitialState() {
    const {message} = this.props;
    return {
      activeMessage: message ?
        Immutable(pick(message, 'className', 'content')) :
        null,
      fadingClasses: ''
    };
  },

  isFading(props) {
    const {message} = props;
    return !!(message && message.isFading);
  },
  fade() {
    this.transitionIn('is-MessageBoard-fading')
      .then(() => {
        this.setState({
          activeMessage: null,
          fadingClasses: ''
        });
      });
  },

  componentWillMount() {
    this._transitions = {
      'is-MessageBoard-fading': {
        key: 'fadingClasses',
        refKey: '_ref',
        activeSuffix: 'out',
        duration: 5000
      }
    };
  },
  componentDidMount() {
    if (this.isFading(this.props)) {
      this.fade();
    }
  },
  componentWillReceiveProps(nextProps) {
    const {message: nextMessage} = nextProps;
    if (this.props.message !== nextMessage) {
      if (nextMessage) {
        this.setState({
          activeMessage: Immutable(
            pick(nextMessage, 'className', 'content')
          )
        });
      } else if (this.state.activeMessage) {
        this.setState({activeMessage: null});
      }
    }
  },
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.message !== this.props.message) {
      if (this.isFading(this.props)) {
        this.fade();
      } else if (this.isFading(prevProps)) {
        this.resetTransition('is-MessageBoard-fading');
      }
    }
  },

  render() {
    const {className, children} = this.props;
    const {activeMessage, fadingClasses} = this.state;

    return (
      <p
        className={classNames(
          'MessageBoard', className,
          activeMessage ? activeMessage.className : null,
          fadingClasses
        )}
        ref={ref => {
          this._ref = ref;
        }}
      >
        {activeMessage ? activeMessage.content : children}
      </p>
    );
  }
});

module.exports = MessageBoard;
