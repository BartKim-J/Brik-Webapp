let React = require('react');
let classNames = require('classnames');

let ExtendChildMixin = require('../mixins/extendChild');
let TransitionMixin = require('../mixins/transition');

let {PseudoButton} = require('./buttons');
let {WindowListener} = require('./windowListener');

let Collapse = React.createClass({
  mixins: [ExtendChildMixin, TransitionMixin],

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

  getInitialState() {
    return {
      isVisuallyActive: this.props.initialIsActive
    };
  },

  componentWillMount() {
    this._transitions = {
      isVisuallyActive: {
        refKey: '_childRef',
        className: 'is-Collapse-active',
        duration: 500
      }
    };
  },

  handleButtonClick(e) {
    this.toggleTransition('isVisuallyActive');
  },

  childContextTypes: {
    isVisuallyActive: React.PropTypes.bool.isRequired,
    onButtonClick: React.PropTypes.func.isRequired
  },
  getChildContext() {
    const {isVisuallyActive} = this.state;
    return {
      isVisuallyActive,
      onButtonClick: this.handleButtonClick
    };
  },

  render() {
    return this.extendChild({
      className: this.state.isVisuallyActive ?
        'is-Collapse-active is-Collapse-active-in' :
        null,
      ref: ref => {
        this._childRef = ref;
      }
    });
  }
});

Collapse.Button = React.createClass({
  contextTypes: {
    onButtonClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <PseudoButton onClick={this.context.onButtonClick}>{this.props.children}</PseudoButton>
    );
  }
});

Collapse.Target = React.createClass({
  mixins: [ExtendChildMixin],

  contextTypes: {
    isVisuallyActive: React.PropTypes.bool.isRequired
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
      if (this.context.isVisuallyActive) {
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
        className={classNames('Collapse-Target', {
          'is-Collapse-Target-init': !isHiddenHeightDefined
        })}
      >
        <WindowListener onResize={this.handleWindowResize} />
        {this.extendChild({
          className: 'Collapse-Target-inner',
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

module.exports = Collapse;
