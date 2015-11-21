let React = require('react');
let Helmet = require('react-helmet');

let SpendIndex = React.createClass({
  render() {
    return (
      <div className="SpendIndex">
        <Helmet title={CONF.BRAND} />

        <h1>Index</h1>
      </div>
    );
  }
});

module.exports = SpendIndex;
