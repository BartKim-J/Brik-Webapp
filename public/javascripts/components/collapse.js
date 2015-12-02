let React = require('react');
let classNames = require('classnames');

let ExtendChildMixin = require('../mixins/extendChild');

let {PseudoButton} = require('./tags');
let {WindowListener} = require('./windowListener');

const TRANSITION_DURATION = 500;

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
      isActive: this.props.initialIsActive
    };
  },

  handleButtonClick(e) {
    let childClassList = this._childRef.classList;
    if (this.state.isActive) {
      if (this._deactivateTimeout) {
        clearTimeout(this._deactivateTimeout);
        this._deactivateTimeout = null;
        childClassList.add('is-Collapse-active-in');
      } else {
        childClassList.remove('is-Collapse-active-in');
        this._deactivateTimeout = setTimeout(() => {
          this.setState({isActive: false});
          this._deactivateTimeout = null;
        }, TRANSITION_DURATION);
      }
    } else {
      childClassList.add('is-Collapse-active');
      this._childRef.offsetWidth; // force reflow
      this.setState({isActive: true});
    }
  },

  childContextTypes: {
    isActive: React.PropTypes.bool.isRequired,
    onButtonClick: React.PropTypes.func.isRequired
  },
  getChildContext() {
    const {isActive} = this.state;
    return {
      isActive,
      onButtonClick: this.handleButtonClick
    };
  },

  render() {
    return this.extendChild({
      className: this.state.isActive ?
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
    isActive: React.PropTypes.bool.isRequired
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
      if (this.context.isActive) {
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
