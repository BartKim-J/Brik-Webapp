let React = require('react');
let classNames = require('classnames');

let ExtendChildMixin = require('../mixins/extendChild');

let {PseudoButton} = require('./tags');
let {WindowListener} = require('./windowListener');

let _Collapse_ = {
  ACTIVE_CLASSES: {
    ACTIVE: 'is-Collapse-active',
    IN: 'is-Collapse-active is-Collapse-active-in'
  },
  TRANSITION_DURATION: 500
};

let Collapse = React.createClass({
  mixins: [ExtendChildMixin],

  propTypes: {
    initialIsActive: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      initialIsActive: false
    };
  },

  // Instance variables
  // - _childRef
  // - _deactivateTimeout

  getInitialState() {
    return {
      activeClass: this.props.initialIsActive ?
        _Collapse_.ACTIVE_CLASSES.IN :
        ''
    };
  },

  isActive() {
    return !!(this.state.activeClass);
  },

  componentDidUpdate(prevProps, prevState) {
    const {ACTIVE_CLASSES, TRANSITION_DURATION} = _Collapse_;
    const {
      ACTIVE: ACTIVE_CLASS_ACTIVE, IN: ACTIVE_CLASS_IN
    } = ACTIVE_CLASSES;

    if (this.state.activeClass === ACTIVE_CLASS_ACTIVE) {
      switch (prevState.activeClass) {
      case '':
        this._childRef.offsetWidth; // force reflow
        this.setState({activeClass: ACTIVE_CLASS_IN});
        break;
      case ACTIVE_CLASS_IN:
        console.assert(
          !(this._deactivateTimeout),
          '`this._deactivateTimeout` should be null.'
        );
        this._deactivateTimeout = setTimeout(() => {
          this.setState({activeClass: ''});
        }, TRANSITION_DURATION);
        break;
      default:
        break;
      }
    }
  },

  handleButtonClick(e) {
    let activeClass;

    const {
      ACTIVE: ACTIVE_CLASS_ACTIVE,
      IN: ACTIVE_CLASS_IN
    } = _Collapse_.ACTIVE_CLASSES;

    switch (this.state.activeClass) {
    case '':
    case ACTIVE_CLASS_IN:
      activeClass = ACTIVE_CLASS_ACTIVE;
      break;
    case ACTIVE_CLASS_ACTIVE:
      activeClass = ACTIVE_CLASS_IN;
      break;
    default:
      // TODO: error
      break;
    }

    this.setState({activeClass});

    if (this._deactivateTimeout) {
      clearTimeout(this._deactivateTimeout);
      this._deactivateTimeout = null;
    }
  },

  childContextTypes: {
    isActive: React.PropTypes.func.isRequired,
    onButtonClick: React.PropTypes.func.isRequired
  },
  getChildContext() {
    return {
      isActive: this.isActive,
      onButtonClick: this.handleButtonClick
    };
  },

  render() {
    return this.extendChild({
      className: this.state.activeClass,
      ref: ref => {
        this._childRef = ref;
      }
    });
  }
});

let CollapseButton = React.createClass({
  contextTypes: {
    onButtonClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <PseudoButton onClick={this.context.onButtonClick}>{this.props.children}</PseudoButton>
    );
  }
});

let CollapseTarget = React.createClass({
  mixins: [ExtendChildMixin],

  contextTypes: {
    isActive: React.PropTypes.func.isRequired
  },

  // Instance variables
  // - _childRef
  // - _windowWidth

  getInitialState() {
    return {
      hiddenHeight: null
    };
  },

  calcHiddenHeight() {
    let style = window.getComputedStyle(this._childRef);
    this.setState({
      hiddenHeight: this._childRef.offsetHeight +
        window.parseInt(style.marginBottom, 10)
    });
  },

  componentDidMount() {
    this.calcHiddenHeight();
  },
  componentDidUpdate(prevProps, prevState) {
    if (typeof this.state.hiddenHeight !== 'number') {
      this.calcHiddenHeight();
    }
  },

  handleWindowResize({width}) {
    if (typeof this._windowWidth !== 'number') {
      this._windowWidth = width;
    } else if (this._windowWidth !== width) {
      if (this.context.isActive()) {
        this.calcHiddenHeight();
      } else if (this.state.hiddenHeight) {
        this.setState({hiddenHeight: null});
      }
    }
  },

  render() {
    const {hiddenHeight} = this.state;
    let isHiddenHeightDefined = (typeof hiddenHeight === 'number');

    return (
      <div
        className={classNames('CollapseTarget', {
          'is-CollapseTarget-init': !isHiddenHeightDefined
        })}
      >
        <WindowListener onResize={this.handleWindowResize} />
        {this.extendChild({
          className: 'CollapseTarget-inner',
          style: {
            marginTop: isHiddenHeightDefined ? -hiddenHeight : null
          },
          ref: ref => {
            this._childRef = ref;
          }
        })}
      </div>
    );
  }
});

module.exports = {
  Collapse,
  CollapseButton, CollapseTarget
};
