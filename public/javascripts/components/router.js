let React = require('react');

let rest = require('lodash/array/rest');

const ROUTE_CONTEXT_TYPES = {
  routeNames: React.PropTypes.array.isRequired
};

let history = {
  init() {
    if (Modernizr.history && !(window.history.state)) {
      this.replaceState();
    }
  },
  pushState(url) {
    let {history: winHistory, location} = window;
    if (url === location.pathname) {
      location.reload(true);
    } else {
      if (Modernizr.history) {
        winHistory.pushState({}, '', url);
      } else {
        window.location = url;
      }
    }
  },
  replaceState(url = null) {
    let {history: winHistory, location} = window;
    if (Modernizr.history) {
      winHistory.replaceState({}, '', url);
    } else if (url) {
      location.replace(url);
    }
  }
};

let Router = React.createClass({
  propTypes: {
    map: React.PropTypes.object.isRequired,
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

  route(map = this.props.map, route = this.props.route) {
    for (let name in map) {
      let value = map[name];
      let test = value, children = null;
      let m;
      if (typeof value === 'object') {
        ({test, children} = value);
      }
      if (test.slice(-1) !== '$') {
        test += '\\b';
      }
      m = route.pathname.match(`^${test}(.*)`);
      if (m) {
        let names = [name];
        if (children) {
          names.push(...this.route(children, m[1]));
        }
        return names;
      }
    }
    return [];
  },

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);
    setTimeout(() => {
      history.init();
    }, 0);
  },
  componentWillReceiveProps(nextProps) {
    const {url, urlType} = nextProps.route;
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
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.route !== this.props.route) {
      // TODO: restore scroll position when moving back
      window.scroll(0, 0);
    }
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
    const {onPushRoute} = this.props;
    return {
      routeNames: this.route(),
      onPushRoute
    };
  },

  render() {
    return React.Children.only(this.props.children);
  }
});

Router.Route = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },

  contextTypes: ROUTE_CONTEXT_TYPES,

  childContextTypes: ROUTE_CONTEXT_TYPES,
  getChildContext() {
    return {
      routeNames: rest(this.context.routeNames)
    };
  },

  render() {
    const {name, children} = this.props;
    return (name == this.context.routeNames[0]) ?
      React.Children.only(children) :
      false;
  }
});

Router.Link = React.createClass({
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
    const {url, className, children} = this.props;
    return (
      <a className={className} href={url} onClick={this.handleClick}>{children}</a>
    );
  }
});

module.exports = Router;
