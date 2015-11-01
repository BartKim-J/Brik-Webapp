'use strict';

let React = require('react');
let Helmet = require('react-helmet');

let SpendAbout = React.createClass({
  render() {
    return (
      <div className="SpendAbout">
        <Helmet title={`About${CONF.TITLE_SUFFIX}`} />

        <h1>About</h1>
      </div>
    );
  }
});

module.exports = SpendAbout;
