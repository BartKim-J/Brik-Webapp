const TYPES = {
  PUSH_ROUTE: 'PUSH_ROUTE',
  REPLACE_ROUTE: 'REPLACE_ROUTE',
  POP_ROUTE: 'POP_ROUTE'
};

module.exports = {
  TYPES,

  pushRoute(url) {
    return {type: TYPES.PUSH_ROUTE, url};
  },
  replaceRoute(url) {
    return {type: TYPES.REPLACE_ROUTE, url};
  },
  popRoute(pathname) {
    return {type: TYPES.POP_ROUTE, pathname};
  }
};
