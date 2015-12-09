let React = require('react');

let TransitionMixin = {
  // Instance variables
  // - _transitions
  // - _transitionTimeouts

  transitionIn(name) {
    let {refKey, className} = this._transitions[name];
    let ref = this[refKey];
    let {classList} = ref;
    let timeout = this._transitionTimeouts ?
      this._transitionTimeouts[name] :
      null;
    if (timeout) {
      clearTimeout(timeout);
      this._transitionTimeouts[name] = null;
      classList.add(`${className}-in`);
    } else {
      classList.add(className);
      ref.offsetWidth; // force reflow
      this.setState({[name]: true});
    }
  },
  transitionOut(name) {
    let {refKey, className, duration} = this._transitions[name];
    this[refKey].classList.remove(`${className}-in`);
    if (!this._transitionTimeouts) {
      this._transitionTimeouts = {};
    }
    this._transitionTimeouts[name] = setTimeout(() => {
      this.setState({[name]: false});
      this._transitionTimeouts[name] = null;
    }, duration);
  },
  toggleTransition(name) {
    let timeout = this._transitionTimeouts ?
      this._transitionTimeouts[name] :
      null;
    if (!(this.state[name]) || timeout) {
      this.transitionIn(name);
    } else {
      this.transitionOut(name);
    }
  },

  componentWillMount() {
    this._transitions = {};
  }
};

module.exports = TransitionMixin;
