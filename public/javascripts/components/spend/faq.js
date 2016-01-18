let React = require('react');
let classNames = require('classnames');
let Helmet = require('react-helmet');

let Collapse = require('../collapse');
let {EmailLink, LinkBlock} = require('../links');
let Markdown = require('../markdown');

let SpendFaq = React.createClass({
  propTypes: {
    sections: React.PropTypes.object,

    onEmpty: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    const {sections, onEmpty} = this.props;
    if (!sections) {
      onEmpty();
    }
  },

  render() {
    return (
      <div className="SpendFaq">
        <Helmet title={`FAQ${CONF.TITLE_SUFFIX}`} />
        {this.renderContainer()}
      </div>
    );
  },
  renderContainer() {
    if (this.props.sections) {
      return (
        <div className="container-fluid SpendFaq-container">
          <header className="SpendFaq-container-header text-center">
            <h1 className="SpendFaq-h1">
              F<span className="visible-md-inline visible-lg-inline">requently </span>A<span className="visible-md-inline visible-lg-inline">sked </span>Q<span className="visible-md-inline visible-lg-inline">uestions</span>
            </h1>
            <p className="SpendFaq-h1-p">
              You can find some answers to commonly asked questions below.
            </p>
          </header>
          {this.renderSections()}
          <footer className="SpendFaq-container-footer">
            <div className="row">
              <div className="col-md-6">
                <div className="SpendFaq-container-footer-header">
                  <h2 className="SpendFaq-container-footer-h2">
                    Do you need more help?
                  </h2>
                  <p
                    className="SpendFaq-container-footer-h2-p
                      SpendFaq-container-footer-h2-p-last"
                  >
                    Directly ask us about anything
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <LinkBlock className="SpendFaq-container-footer-LinkBlock">
                  <EmailLink className="SpendFaq-emailUsLink" email="contact@xengineering.co">Email Us</EmailLink>
                </LinkBlock>
              </div>
            </div>
          </footer>
        </div>
      );
    }
  },
  renderSections() {
    const {col1, col2} = this.props.sections;
    return (
      <div className="SpendFaq-sections">
        <div className="row">
          {[
            [col1, 'SpendFaq-section-first'],
            [col2, 'SpendFaq-col-md-6-section-first', 'SpendFaq-section-last']
          ].map(([col, firstClassName, lastClassName = null], i) => (
            <div className="col-md-6" key={i}>
              {col.asMutable()
                .map(({title, entries}, i) => (
                  <section
                    className={classNames('SpendFaq-section', {
                      [firstClassName]: i === 0
                    }, (
                      lastClassName ? {
                        [lastClassName]: i === col.length - 1
                      } : null
                    ))}
                    key={i}
                  >
                    <h3 className="SpendFaq-h3">{title}</h3>
                    <ul className="listUnstyled">
                      {entries.asMutable()
                        .map(({question, answer}, i) => (
                          <Collapse key={i}>
                            <li
                              className={classNames('SpendFaq-qna', {
                                'SpendFaq-qna-last': i === entries.length - 1
                              })}
                            >
                              <Collapse.Button>
                                <p className="SpendFaq-question">
                                  <span className="SpendFaq-question-inner">{question}</span>
                                </p>
                              </Collapse.Button>
                              <Collapse.Target>
                                <div className="SpendFaq-answer">
                                  <Markdown>{answer}</Markdown>
                                </div>
                              </Collapse.Target>
                            </li>
                          </Collapse>
                        ))}
                    </ul>
                  </section>
                ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
});

module.exports = SpendFaq;
