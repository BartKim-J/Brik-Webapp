let React = require('react');
let Helmet = require('react-helmet');

let Collapse = require('../collapse');
let {EmailLink} = require('../links');
let Markdown = require('../markdown');
let Logo = require('./logo');

let SpendJobs = React.createClass({
  propTypes: {
    openings: React.PropTypes.object,

    onEmpty: React.PropTypes.func.isRequired
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
    if (openings) {
      const {BRAND} = CONF;
      return (
        <div className="container-fluid SpendJobs-container">
          <header className="SpendJobs-container-header text-center">
            <h1 className="SpendJobs-h1">
              Join <Logo /><span className="visible-md-inline visible-lg-inline"> Journey</span>
            </h1>
            <p className="SpendJobs-h1-p">
              {`Working at ${BRAND} is more than a job`}
            </p>
          </header>
          <div className="SpendJobs-sections">
            <section className="SpendJobs-section">
              <h2 className="SpendJobs-h2">
                What is <Logo />?
              </h2>
              <p className="SpendJobs-p SpendJobs-h2-p">
                {`We are developing SpendWallet that can be used not only online but also offline that comprises 90% of total commercial transaction. X Engineering believes that everyone stands to benefit from the advance of technology.`}
              </p>
              <p className="SpendJobs-p">
                {`We are looking for X Engineer who can join the journey of developing a valuable product with technology we create.`}
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
                      Open Roles
                    </h2>
                  </div>
                  <div className="col-md-6">
                    <div className="SpendJobs-section-openRoles-contact">
                      <EmailLink email="contact@xengineering.co" />
                    </div>
                  </div>
                </div>
              </header>
              <ul className="listUnstyled">
                {openings.data.asMutable()
                  .map(({category, desc}, i) => (
                    <Collapse key={i}>
                      <li className="SpendJobs-opening">
                        <Collapse.Button>
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
              Don't see the position you're looking for?<br className="visible-md-inline visible-lg-inline" />{' '}
              We'd still love to hear from you! Email us at <EmailLink email="contact@xengineering.co" />
            </div>
          </div>
        </div>
      );
    }
  }
});

module.exports = SpendJobs;
