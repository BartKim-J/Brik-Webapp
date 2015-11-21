let React = require('react');

let pull = require('lodash/array/pull');
let debounce = require('lodash/function/debounce');
let throttle = require('lodash/function/throttle');
let camelCase = require('lodash/string/camelCase');
let capitalize = require('lodash/string/capitalize');

const PROP_TYPES = {
  onResize: React.PropTypes.func,
  onScreenChange: React.PropTypes.func,
  onScroll: React.PropTypes.func
};

const SCREEN_NAMES = {
  XS: 0,
  SM: 1,
  MD: 2,
  LG: 3
};

let _WindowListener_ = {
  HANDLE_RESIZE_WAIT: 100,
  HANDLE_SCROLL_WAIT: 100,

  handlers: {
    resize: [],
    screenChange: [],
    scroll: []
  },

  handleResize: null,
  handleScreenChange: null,
  handleScroll: null,

  screenNames: {
    prev: null,
    cur: null
  },

  getScreenName(windowWidth) {
    const {XS, SM, MD, LG} = SCREEN_NAMES;
    return (windowWidth < 768 ? XS :
      (windowWidth < 992 ? SM :
      (windowWidth < 1200 ? MD : LG)));
  },

  callHandler(type, handler = null) {
    let handlers = handler ? [handler] : this.handlers[type];
    let {
      innerWidth: width, innerHeight: height,
      pageXOffset, pageYOffset
    } = window;
    let {prev: prevScreen, cur: screen} = this.screenNames;
    let args = [];

    switch (type) {
    case 'resize':
      args.push({width, height});
      break;
    case 'screenChange':
      args.push(prevScreen, screen);
      break;
    case 'scroll':
      args.push({pageXOffset, pageYOffset});
      break;
    default:
      // TODO: error
      break;
    }

    handlers.forEach(handler => {
      handler(...args);
    });
  },

  createSharedHandler(type) {
    let handler = (type === 'screenChange') ?
      ({width}) => {
        let {prev: prevName, cur: name} = this.screenNames;
        let newName = this.getScreenName(width);
        if (name !== newName) {
          if (prevName) {
            this.screenNames.prev = name;
          }
          this.screenNames.cur = newName;
          this.callHandler('screenChange');
        }
      } :
      this.callHandler.bind(this, type, null);

    switch (type) {
    case 'resize':
      return debounce(handler, this.HANDLE_RESIZE_WAIT);
    case 'scroll':
      return throttle(handler, this.HANDLE_SCROLL_WAIT);
    default:
      return handler;
    }
  },

  listen(type, handler) {
    let handlers = this.handlers[type];
    if (handlers.length <= 0) {
      let method = `handle${capitalize(type)}`;
      if (!this[method]) {
        this[method] = this.createSharedHandler(type);
      }
      if (type === 'screenChange') {
        this.listen('resize', this.handleScreenChange);
      } else {
        window.addEventListener(type, this[method]);
      }
    }
    this.callHandler(type, handler);
    handlers.push(handler);
  },
  unlisten(type, handler) {
    pull(this.handlers[type], handler);
  }
};

let WindowListener = React.createClass({
  propTypes: PROP_TYPES,

  forHandlers(callback) {
    Object.keys(PROP_TYPES).forEach(key => {
      const handler = this.props[key];
      let type = camelCase(key.match(/^on(.+)$/)[1]);
      if (handler) {
        callback(handler, type);
      }
    });
  },

  componentDidMount() {
    this.forHandlers((handler, type) => {
      _WindowListener_.listen(type, handler);
    });
  },
  componentWillUnmount() {
    this.forHandlers((handler, type) => {
      _WindowListener_.unlisten(type, handler);
    });
  },

  render() {
    return false;
  }
});

module.exports = {
  SCREEN_NAMES,

  WindowListener
};
