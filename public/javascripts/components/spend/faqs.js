'use strict';

let React = require('react');
let Helmet = require('react-helmet');

let SpendFaqs = React.createClass({
  render() {
    return (
      <div className="SpendFaqs">
        <Helmet title={`FAQs${CONF.TITLE_SUFFIX}`} />

        <h1>FAQs</h1>
      </div>
    );
  }
});

module.exports = SpendFaqs;
