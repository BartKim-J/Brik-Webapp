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
      activeClasses: this.props.initialIsActive ?
        'is-Collapse-active is-Collapse-active-in' :
        ''
    };
  },

  componentWillMount() {
    this._transitions = {
      'is-Collapse-active': {
        key: 'activeClasses',
        refKey: '_childRef',
        duration: 500
      }
    };
  },

  handleButtonClick(e) {
    this.toggleTransition('is-Collapse-active');
  },

  childContextTypes: {
    isVisuallyActive: React.PropTypes.bool.isRequired,
    onButtonClick: React.PropTypes.func.isRequired
  },
  getChildContext() {
    return {
      isVisuallyActive: !!(this.state.activeClasses),
      onButtonClick: this.handleButtonClick
    };
  },

  render() {
    return this.extendChild({
      className: this.state.activeClasses,
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
          style: isHiddenHeightDefined ?
            {marginTop: -hiddenHeight} :
            null,
          ref: ref => {
            this._childRef = ref;
          }
        })}
      </div>
    );
  }
});

module.exports = Collapse;
