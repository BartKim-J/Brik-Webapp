let React = require('react');

let {PageNotFound, ServerError} = require('../errors');

let Router = require('../router');
let {Route} = Router;

let Menu = require('./menu');
let Index = require('./spendIndex');
let Team = require('./team');
let Jobs = require('./jobs');
let Faq = require('./faq');
let Promotion = require('./promotion');
let Legal = require('./legal');
let Footer = require('./footer');

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

  // Instance variables
  // - _menuRef

  componentWillUpdate(nextProps, nextState) {
    let {documentElement, body} = document;
    let bodyStyle = body.style;
    if (this.props.menu.isOpen && !(nextProps.menu.isOpen)) {
      let pageYOffset = -window.parseInt(bodyStyle.marginTop, 10);
      this._menuRef.pauseScrolling();
      bodyStyle.marginTop = '';
      documentElement.classList.remove('is-html-scrollable');
      window.scroll(0, pageYOffset);
    }
  },
  componentDidUpdate(prevProps, prevState) {
    const {menu: prevMenu, route: prevRoute} = prevProps;
    const {isOpen: isOpenPrev} = prevMenu;
    const {menu, route} = this.props;
    const {isOpen} = menu;
    const {pathname: routePath} = route;
    let {pageYOffset} = window;
    let {documentElement, title, body} = document;

    let isRoutePopped = (prevRoute !== route && routePath);

    if (!isOpenPrev && isOpen) {
      this._menuRef.pauseScrolling();
      documentElement.classList.add('is-html-scrollable');
      body.style.marginTop = `-${pageYOffset}px`;
      this._menuRef.resumeScrolling();
    } else if (isOpenPrev && !isOpen) {
      if (isRoutePopped) {
        setTimeout(() => {
          this._menuRef.updateScrolling()
            .resumeScrolling();
        }, 1);
      } else {
        this._menuRef.resumeScrolling();
      }
    }

    if (isRoutePopped) {
      ga('set', {
        page: routePath,
        title
      });
      ga('send', 'pageview');
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
          team: '/team$',
          jobs: '/jobs$',
          faq: '/faq$',
          legal: '/legal$',
          promotion: '/promotion$'
        }}
        route={route}
        onPushRoute={pushRoute} onPopRoute={popRoute}
      >
        <div className="Spend">
          <Menu
            onToggle={toggleMenu} {...menu}
            ref={ref => {
              this._menuRef = ref;
            }} />
          {this.renderMain()}
          <Footer />
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
        data: {faqSections, jobOpenings, legalDocs, team},
        fetchData,

        postSubscription
      } = this.props;

      return [
        <Route key="index" name="index">
          <Index onNewSubscription={postSubscription} />
        </Route>,
        <Route key="team" name="team">
          <Team
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
        <Route key="legal" name="legal">
          <Legal
            docs={legalDocs}
            onEmpty={() => {
              fetchData('legalDocs');
            }} />
        </Route>,
        <Route key="promotion" name="promotion">
          <Promotion/>
        </Route>,
        <Route key="pageNotFound">
          <PageNotFound />
        </Route>
      ];
    }
  }
});

module.exports = Spend;
