let React = require('react');
let Helmet = require('react-helmet');

let Markdown = require('../markdown');

let SpendLegal = React.createClass({
  propTypes: {
    docs: React.PropTypes.object,

    onEmpty: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    const {docs, onEmpty} = this.props;
    if (!docs) {
      onEmpty();
    }
  },

  render() {
    return (
      <div className="SpendLegal">
        <Helmet
          title={`Terms of Service & Privacy Policy${CONF.TITLE_SUFFIX}`} />

        {this.renderContainer()}
      </div>
    );
  },
  renderContainer() {
    const {docs} = this.props;
    if (docs) {
      const {terms, privacy} = docs.data;
      return (
        <div className="container-fluid">
          <section>
            <article>
              <h2>Terms of Service</h2>
              <Markdown>{terms}</Markdown>
            </article>
          </section>
          <section>
            <article>
              <h2>Privacy Policy</h2>
              <Markdown>{privacy}</Markdown>
            </article>
          </section>
        </div>
      );
    }
  }
});

module.exports = SpendLegal;
