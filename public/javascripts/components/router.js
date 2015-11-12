'use strict';

let React = require('react');

const ROUTE_CONTEXT_TYPES = {
  routePath: React.PropTypes.object.isRequired
};

class RoutePath {
  constructor(routePath) {
    this._routePath = routePath;
    this._resolved = null;
  }

  getResolved() {
    return this._resolved;
  }
  isResolved() {
    return (typeof this._resolved === 'string');
  }

  resolve(path) {
    let m;
    if (path.slice(-1) !== '$') {
      path += '\\b';
    }
    m = this._routePath.match(`^${path}(.*)`);
    if (m) {
      this._resolved = m[1];
    }
    return this.isResolved();
  }
}

let _Router_ = {
  history: {
    init() {
      if (Modernizr.history && !(history.state)) {
        this.replaceState();
      }
    },
    pushState(url) {
      let {location} = window;
      if (url === location.pathname) {
        location.reload(true);
      }
      if (Modernizr.history) {
        history.pushState({}, '', url);
      } else {
        window.location = url;
      }
    },
    replaceState(url = null) {
      if (Modernizr.history) {
        history.replaceState({}, '', url);
      } else if (url) {
        window.location.replace(url);
      }
    }
  }
};

let Router = React.createClass({
  propTypes: {
    route: React.PropTypes.object,

    onPushRoute: React.PropTypes.func.isRequired,
    onPopRoute: React.PropTypes.func.isRequired
  },
  getDefaultProps() {
    let result = {};
    if (typeof window !== 'undefined') {
      let {pathname} = window.location;
      result.route = {pathname};
    }
    return result;
  },

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);
    setTimeout(() => {
      _Router_.history.init();
    }, 0);
  },
  componentWillReceiveProps(nextProps) {
    const {url, urlType} = nextProps.route;
    let {history} = _Router_;

    if (url) {
      switch (urlType) {
      case 'PUSH':
        history.pushState(url);
        break;
      case 'REPLACE':
        history.replaceState(url);
        break;
      default:
        // TODO: error
        break;
      }
      nextProps.onPopRoute(window.location.pathname);
    }
  },
  shouldComponentUpdate(nextProps, nextState) {
    return !!(nextProps.route.pathname);
  },
  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  },

  handlePopState(e) {
    // Safari emits the event with null state on page load.
    if (e.state) {
      this.props.onPopRoute(window.location.pathname);
    }
  },

  childContextTypes: Object.assign({
    onPushRoute: React.PropTypes.func.isRequired
  }, ROUTE_CONTEXT_TYPES),
  getChildContext() {
    const {route, onPushRoute} = this.props;
    return {
      routePath: new RoutePath(route.pathname),
      onPushRoute
    };
  },

  render() {
    return React.Children.only(this.props.children);
  }
});

let Route = React.createClass({
  propTypes: {
    path: React.PropTypes.string
  },

  contextTypes: ROUTE_CONTEXT_TYPES,

  childContextTypes: ROUTE_CONTEXT_TYPES,
  getChildContext() {
    let {routePath} = this.context;
    return {
      routePath: new RoutePath(routePath.getResolved())
    };
  },

  render() {
    const {path, children} = this.props;
    let {routePath} = this.context;

    if (routePath.isResolved()) {
      return false;
    } else {
      if (!path || routePath.resolve(path)) {
        return React.Children.only(children);
      } else {
        return false;
      }
    }
  }
});

let Link = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  contextTypes: {
    onPushRoute: React.PropTypes.func.isRequired
  },

  handleClick(e) {
    this.context.onPushRoute(this.props.url);
    e.preventDefault();
  },

  render() {
    const {url, children} = this.props;
    return (
      <a href={url} onClick={this.handleClick}>{children}</a>
    );
  }
});

module.exports = {Router, Route, Link};
