let React = require('react');

let TransitionMixin = {
  // Instance variables
  // - _transitions
  // - _transitionTimeouts

  transitionIn(name) {
    let {
      key, refKey,
      activeSuffix = 'in',
      duration
    } = this._transitions[name];
    let timeout = this._transitionTimeouts[name];

    let ref = this[refKey];
    let {classList} = ref;
    let activeName = `${name}-${activeSuffix}`;

    let restart = (() => {
      classList.remove(name, activeName);
      ref.offsetWidth; // force reflow
      classList.add(name);
      ref.offsetWidth; // force reflow
      classList.add(activeName);
    });

    if (timeout) {
      let {id: timeoutId, type} = timeout;

      clearTimeout(timeoutId);
      this._transitionTimeouts[name] = null;

      switch (type) {
      case 'in':
        restart();
        break;
      case 'out':
        this.setState({[key]: `${name} ${activeName}`});
        break;
      default:
        // TODO: error
        break;
      }
    } else {
      if (this.state[key]) {
        restart();
      } else {
        classList.add(name);
        ref.offsetWidth; // force reflow
        this.setState({[key]: `${name} ${activeName}`});
      }
    }

    return new Promise((resolve, reject) => {
      this._transitionTimeouts[name] = {
        id: setTimeout(() => {
          resolve();
          this._transitionTimeouts[name] = null;
        }, duration),
        type: 'in'
      };
    });
  },
  transitionOut(name) {
    let {
      key, refKey,
      activeSuffix = 'in',
      duration
    } = this._transitions[name];
    let timeout = this._transitionTimeouts[name];

    let ref = this[refKey];
    let {classList} = ref;
    let activeName = `${name}-${activeSuffix}`;

    if (timeout) {
      let {id: timeoutId, type} = timeout;

      clearTimeout(timeoutId);
      this._transitionTimeouts[name] = null;

      switch (type) {
      case 'in':
        this.setState({[key]: name});
        break;
      case 'out':
        classList.add(activeName);
        classList.remove(name);
        ref.offsetWidth; // force reflow
        classList.add(name);
        classList.remove(activeName);
        break;
      default:
        // TODO: error
        break;
      }
    } else {
      if (!(this.state[key])) {
        classList.add(activeName);
        classList.remove(name);
        ref.offsetWidth; // force reflow
      }
      this.setState({[key]: name});
    }

    return new Promise((resolve, reject) => {
      this._transitionTimeouts[name] = {
        id: setTimeout(() => {
          this.setState({[key]: ''});
          resolve();
          this._transitionTimeouts[name] = null;
        }, duration),
        type: 'out'
      };
    });
  },
  toggleTransition(name) {
    let {key} = this._transitions[name];
    let timeout = this._transitionTimeouts[name];

    if (timeout ? timeout.type === 'in' : this.state[key]) {
      this.transitionOut(name);
    } else {
      this.transitionIn(name);
    }
  },

  resetTransition(name) {
    let {key} = this._transitions[name];
    let timeout = this._transitionTimeouts[name];
    if (timeout) {
      clearTimeout(timeout.id);
      this._transitionTimeouts[name] = null;
    }
    this.setState({[key]: ''});
  },

  componentWillMount() {
    this._transitions = {};
    this._transitionTimeouts = {};
  }
};

module.exports = TransitionMixin;
