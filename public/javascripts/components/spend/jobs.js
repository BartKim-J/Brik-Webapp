let React = require('react');
let Helmet = require('react-helmet');

let Collapse = require('../collapse');
let {EmailLink} = require('../links');
let Markdown = require('../markdown');
let Logo = require('./logo');
let {intlShape} = require('react-intl');

let {FormattedHTMLMessage} = require('../intl');

let SpendJobs = React.createClass({
  propTypes: {
    openings: React.PropTypes.object,

    onEmpty: React.PropTypes.func.isRequired
  },

  contextTypes: {
    intl: intlShape.isRequired
  },

  componentDidMount() {
    const {openings, onEmpty} = this.props;
    if (!openings) {
      onEmpty();
    }
  },

  render() {
    return (
      <div className="SpendJobs">
        <Helmet title={`Jobs${CONF.TITLE_SUFFIX}`} />
        {this.renderContainer()}
      </div>
    );
  },
  renderContainer() {
    const {openings} = this.props;
    let {formatMessage} = this.context.intl;
    if (openings) {
      const {BRAND} = CONF;
      return (
        <div className="container-fluid SpendJobs-container">
          <header className="SpendJobs-container-header text-center">
            <FormattedHTMLMessage id="jobs.title">
              <h1 className="SpendJobs-h1" />
            </FormattedHTMLMessage>
            <p className="SpendJobs-h1-p">
              {formatMessage({id: 'jobs.description'})}
            </p>
          </header>
          <div className="SpendJobs-sections">
            <section className="SpendJobs-section">
              <FormattedHTMLMessage id="jobs.whatIsSpend">
                <h2 className="SpendJobs-h2" />
              </FormattedHTMLMessage>
              <p className="SpendJobs-p SpendJobs-h2-p">
                {formatMessage({id: 'jobs.whatIsSpendDescription'})}
              </p>
              <p className="SpendJobs-p">
                {formatMessage({id: 'jobs.weAreLooking'})}
              </p>
            </section>
            <section
              className="SpendJobs-section SpendJobs-section-openRoles
                SpendJobs-section-last"
            >
              <header className="SpendJobs-section-openRoles-header">
                <div className="row">
                  <div className="col-md-6">
                    <h2 className="SpendJobs-h2 SpendJobs-section-openRoles-h2">
                      {formatMessage({id: 'jobs.openRoles'})}
                    </h2>
                  </div>
                  <div className="col-md-6">
                    <div className="SpendJobs-section-openRoles-contact">
                      <EmailLink
                        email="recruit@xengineering.co"
                        eventLabel="in: Jobs Page Open Roles" />
                    </div>
                  </div>
                </div>
              </header>
              <ul className="listUnstyled">
                {openings.data.asMutable()
                  .map(({category, desc}, i) => (
                    <Collapse key={i}>
                      <li className="SpendJobs-opening">
                        <Collapse.Button
                          eventLabel={`in: Jobs Page Open Roles, label: "${category}"`}
                        >
                          <div className="SpendJobs-opening-category">
                            {category}
                            <span className="SpendJobs-opening-category-arrow" />
                          </div>
                        </Collapse.Button>
                        <Collapse.Target>
                          <div className="SpendJobs-opening-desc">
                            <Markdown>{desc}</Markdown>
                          </div>
                        </Collapse.Target>
                      </li>
                    </Collapse>
                  ))}
              </ul>
            </section>
            <div className="SpendJobs-container-footer text-center">
              {formatMessage({id: 'jobs.additionalPositions'})}<br className="visible-md-inline visible-lg-inline" />{' '}
              <FormattedHTMLMessage id="jobs.hearFromYou">
                <p/>
              </FormattedHTMLMessage>
            </div>
          </div>
        </div>
      );
    }
  }
});

module.exports = SpendJobs;
