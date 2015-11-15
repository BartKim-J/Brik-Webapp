'use strict';

let React = require('react');
let Helmet = require('react-helmet');

let {
  Collapse,
  CollapseButton, CollapseTarget
} = require('../collapse');

let Markdown = require('../markdown');
let {EmailLink} = require('../tags');

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
        <div className="container SpendJobs-container">
          <header className="SpendJobs-container-header text-center">
            <h1 className="SpendJobs-h1">
              Join <span className="logo">spend.</span><span className="visible-md-inline"> Journey</span>
            </h1>
            <p className="SpendJobs-h1-p">
              {`Working at ${BRAND} is more than a job`}
            </p>
          </header>
          <div className="SpendJobs-sections">
            <section className="SpendJobs-section">
              <h2 className="SpendJobs-h2">
                What is <span className="logo">spend.</span>?
              </h2>
              <p className="SpendJobs-p SpendJobs-h2-p">
                {`${BRAND}를 만드는 X Engineering은, 많은 사람들에게 가치 있게 사용되는 좋은 기술로 더욱 행복한 세상을 만들고자 하는 IoT 스타트업입니다. 다양한 간편결제 서비스가 존재하는 온라인에서 뿐만 아니라, 전체 상거래의 90% 이상을 차지하는 오프라인 결제분야에서도 간편결제를 제공하고자 ${BRAND}를 개발합니다.`}
              </p>
              <p className="SpendJobs-p">
                {`더 많은 사람들이 ${BRAND}를 통해 간편한 소비생활을 할 수 있도록, X Engineering과 함께 끊임없이 노력할 도전자를 찾습니다.`}
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
                        <CollapseButton>
                          <div className="SpendJobs-opening-category">
                            {category}
                            <span className="SpendJobs-opening-category-arrow" />
                          </div>
                        </CollapseButton>
                        <CollapseTarget>
                          <div className="SpendJobs-opening-desc">
                            <Markdown>{desc}</Markdown>
                          </div>
                        </CollapseTarget>
                      </li>
                    </Collapse>
                  ))}
              </ul>
            </section>
          </div>
          <footer className="SpendJobs-container-footer text-center">
            Don't see the position you're looking for?<br className="visible-md-inline" />
            We'd still love to hear from you! Email us at <EmailLink email="contact@xengineering.co" />
          </footer>
        </div>
      );
    }
  }
});

module.exports = SpendJobs;
