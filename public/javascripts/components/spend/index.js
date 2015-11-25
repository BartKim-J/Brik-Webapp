let React = require('react');
let classNames = require('classnames');

let {PageNotFound, ServerError} = require('../errors');
let {Router, Route} = require('../router');

let Menu = require('./menu');
let Index = require('./spendIndex');
let About = require('./about');
let Jobs = require('./jobs');
let Faq = require('./faq');

let Spend = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    menu: React.PropTypes.object.isRequired,
    route: React.PropTypes.object,
    serverError: React.PropTypes.object,

    fetchData: React.PropTypes.func.isRequired,

    toggleMenu: React.PropTypes.func.isRequired,

    pushRoute: React.PropTypes.func.isRequired,
    replaceRoute: React.PropTypes.func.isRequired,
    popRoute: React.PropTypes.func.isRequired
  },

  // Instance variables
  // - _htmlClassNames

  componentDidMount() {
    this._htmlClassNames = document.documentElement.className;
  },
  componentDidUpdate(prevProps, prevState) {
    const {isOpen: isMenuOpenPrev} = prevProps.menu;
    const {isOpen: isMenuOpen} = this.props.menu;
    let {documentElement, body} = document;
    let bodyStyle = body.style;
    if (!isMenuOpenPrev && isMenuOpen) {
      let {pageYOffset} = window;
      documentElement.className = classNames(
        this._htmlClassNames, 'is-html-scrollable'
      );
      bodyStyle.marginTop = `-${pageYOffset}px`;
    } else if (isMenuOpenPrev && !isMenuOpen) {
      let pageYOffset = -window.parseInt(bodyStyle.marginTop, 10);
      bodyStyle.marginTop = '';
      documentElement.className = this._htmlClassNames;
      window.scroll(0, pageYOffset);
    }
  },

  render() {
    const {
      menu, toggleMenu,
      route, pushRoute, popRoute
    } = this.props;

    return (
      <Router
        route={route}
        onPushRoute={pushRoute} onPopRoute={popRoute}
      >
        <div className="Spend">
          <Menu onToggle={toggleMenu} {...menu} />
          {this.renderMain()}
        </div>
      </Router>
    );
  },
  renderMain() {
    const {serverError} = this.props;

    if (serverError) {
      return (
        <ServerError {...serverError} />
      );
    } else {
      const {
        data: {jobOpenings, faqSections, team},
        fetchData
      } = this.props;

      return [
        <Route key="index" path="/$">
          <Index />
        </Route>,
        <Route key="about" path="/about$">
          <About
            team={team}
            onEmpty={() => {
              fetchData('team');
            }} />
        </Route>,
        <Route key="jobs" path="/jobs$">
          <Jobs
            openings={jobOpenings}
            onEmpty={() => {
              fetchData('jobOpenings');
            }} />
        </Route>,
        <Route key="faq" path="/faq$">
          <Faq
            sections={faqSections}
            onEmpty={() => {
              fetchData('faqSections');
            }} />
        </Route>,
        <Route key="pageNotFound">
          <PageNotFound />
        </Route>
      ];
    }
  }
});

module.exports = Spend;
