let React = require('react');
let classNames = require('classnames');
let Helmet = require('react-helmet');
let {intlShape} = require('react-intl');

let Collapse = require('../collapse');
let {EmailLink, LinkBlock} = require('../links');
let Markdown = require('../markdown');

let {FormattedHTMLMessage} = require('../intl');

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

  contextTypes: {
    intl: intlShape.isRequired
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
      let {formatMessage} = this.context.intl;
      return (
        <div className="container-fluid SpendFaq-container">
          <header className="SpendFaq-container-header text-center">
            <FormattedHTMLMessage id="faq.title">
              <h1 className="SpendFaq-h1" />
            </FormattedHTMLMessage>
            <p className="SpendFaq-h1-p">
              {formatMessage({id: 'faq.description'})}
            </p>
          </header>
          {this.renderSections()}
          <footer className="SpendFaq-container-footer">
            <div className="row">
              <div className="col-md-6">
                <div className="SpendFaq-container-footer-header">
                  <h2 className="SpendFaq-container-footer-h2">
                    {formatMessage({id: 'faq.furtherAssistance'})}
                  </h2>
                  <p
                    className="SpendFaq-container-footer-h2-p
                      SpendFaq-container-footer-h2-p-last">
                      {formatMessage({id: 'faq.dontHesitate'})}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <LinkBlock className="SpendFaq-container-footer-LinkBlock">
                  <EmailLink className="SpendFaq-emailUsLink" email="contact@xengineering.co" eventLabel="label: Email Us, in: FAQ">{formatMessage({id: 'faq.emailUs'})}</EmailLink>
                </LinkBlock>
              </div>
            </div>
          </footer>
        </div>
      );
    }
  },
  renderSections() {
    const {col1, col2} = this.props.sections.data;
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
                              <Collapse.Button
                                eventLabel={`in: "FAQ Page ${title} Section", label: "${question}"`}
                              >
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
