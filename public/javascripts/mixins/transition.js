let React = require('react');

let TransitionMixin = {
  // Instance variables
  // - _transitions
  // - _transitionTimeouts

  transitionIn(name) {
    let {key, refKey} = this._transitions[name];
    let ref = this[refKey];
    let timeout = this._transitionTimeouts ?
      this._transitionTimeouts[name] :
      null;
    if (timeout) {
      clearTimeout(timeout);
      this._transitionTimeouts[name] = null;
    } else {
      ref.classList.add(name);
      ref.offsetWidth; // force reflow
    }
    this.setState({[key]: `${name} ${name}-in`});
  },
  transitionOut(name) {
    let {key, duration} = this._transitions[name];
    this.setState({[key]: name});
    if (!this._transitionTimeouts) {
      this._transitionTimeouts = {};
    }
    this._transitionTimeouts[name] = setTimeout(() => {
      this.setState({[key]: ''});
      this._transitionTimeouts[name] = null;
    }, duration);
  },
  toggleTransition(name) {
    let {key} = this._transitions[name];
    let timeout = this._transitionTimeouts ?
      this._transitionTimeouts[name] :
      null;
    if (this.state[key] === '' || timeout) {
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
