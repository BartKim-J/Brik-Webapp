let React = require('react');
let Helmet = require('react-helmet');

let PageNotFound = React.createClass({
  statics: {
    TITLE: 'Page Not Found'
  },

  render() {
    const {TITLE} = PageNotFound;

    return (
      <div className="PageNotFound">
        <Helmet title={TITLE} />

        <h1>{TITLE}</h1>
        <p>
          Sorry, but the page you were trying to view does not exist.
        </p>
      </div>
    );
  }
});

let ServerError = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    detail: React.PropTypes.object
  },

  render() {
    const {title} = this.props;
    return (
      <div className="ServerError">
        <Helmet title={title} />

        <h1>{title}</h1>
        {this.renderDetail()}
      </div>
    );
  },
  renderDetail() {
    const {detail} = this.props;
    if (detail) {
      return (
        <div className="ServerError-detail">
          <h2>{detail.status}</h2>
          <pre>{detail.stack}</pre>
        </div>
      );
    }
  }
});

module.exports = {PageNotFound, ServerError};
