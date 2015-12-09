let React = require('react');

let {PageNotFound, ServerError} = require('../errors');

let Router = require('../router');
let {Route} = Router;

let Menu = require('./menu');
let Index = require('./spendIndex');
let About = require('./about');
let Jobs = require('./jobs');
let Faq = require('./faq');

let Spend = React.createClass({
  propTypes: {
    csrfToken: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
    menu: React.PropTypes.object.isRequired,
    route: React.PropTypes.object,
    serverError: React.PropTypes.object,

    fetchData: React.PropTypes.func.isRequired,

    toggleMenu: React.PropTypes.func.isRequired,

    pushRoute: React.PropTypes.func.isRequired,
    replaceRoute: React.PropTypes.func.isRequired,
    popRoute: React.PropTypes.func.isRequired,

    postSubscription: React.PropTypes.func.isRequired
  },

  componentDidUpdate(prevProps, prevState) {
    const {isOpen: isMenuOpenPrev} = prevProps.menu;
    const {isOpen: isMenuOpen} = this.props.menu;

    let {documentElement, body} = document;
    let docClassList = documentElement.classList;
    let bodyStyle = body.style;

    if (!isMenuOpenPrev && isMenuOpen) {
      let {pageYOffset} = window;
      docClassList.add('is-html-scrollable');
      bodyStyle.marginTop = `-${pageYOffset}px`;
    } else if (isMenuOpenPrev && !isMenuOpen) {
      let pageYOffset = -window.parseInt(bodyStyle.marginTop, 10);
      bodyStyle.marginTop = '';
      docClassList.remove('is-html-scrollable');
      window.scroll(0, pageYOffset);
    }
  },

  childContextTypes: {
    csrfToken: React.PropTypes.string.isRequired
  },
  getChildContext() {
    return {
      csrfToken: this.props.csrfToken
    };
  },

  render() {
    const {
      menu, toggleMenu,
      route, pushRoute, popRoute
    } = this.props;

    return (
      <Router
        map={{
          index: '/$',
          about: '/about$',
          jobs: '/jobs$',
          faq: '/faq$'
        }}
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

        postSubscription,
        fetchData
      } = this.props;

      return [
        <Route key="index" name="index">
          <Index onNewSubscription={postSubscription} />
        </Route>,
        <Route key="about" name="about">
          <About
            team={team}
            onEmpty={() => {
              fetchData('team');
            }} />
        </Route>,
        <Route key="jobs" name="jobs">
          <Jobs
            openings={jobOpenings}
            onEmpty={() => {
              fetchData('jobOpenings');
            }} />
        </Route>,
        <Route key="faq" name="faq">
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
