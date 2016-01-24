let React = require('react');

let TrackClickMixin = {
  trackClick({category, action = 'click', label = undefined}) {
    ga('send', 'event', category, action, label);
  }
};

module.exports = TrackClickMixin;
