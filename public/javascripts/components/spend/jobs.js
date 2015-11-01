'use strict';

let React = require('react');
let Helmet = require('react-helmet');

let SpendJobs = React.createClass({
  render() {
    return (
      <div className="SpendJobs">
        <Helmet title={`Jobs${CONF.TITLE_SUFFIX}`} />

        <h1>Jobs</h1>
      </div>
    );
  }
});

module.exports = SpendJobs;
