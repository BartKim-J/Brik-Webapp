const TYPES = {
  TOGGLE_MENU: 'TOGGLE_MENU'
};

module.exports = {
  TYPES,

  toggleMenu() {
    return {type: TYPES.TOGGLE_MENU};
  }
};
