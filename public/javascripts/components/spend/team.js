let React = require('react');
let Tooltip = require('rc-tooltip');
let Helmet = require('react-helmet');

let {RImage, ImageBlock} = require('../images');
let {LinkBlock} = require('../links');
let {Link} = require('../router');
let WindowListener = require('../windowListener');
let {intlShape} = require('react-intl');

let {FormattedHTMLMessage} = require('../intl');

let Logo = require('./logo');

let SpendTeam = React.createClass({
  propTypes: {
    team: React.PropTypes.object,

    onEmpty: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      isTooltip: false
    };
  },

  contextTypes: {
    intl: intlShape.isRequired
  },

  componentDidMount() {
    const {team, onEmpty} = this.props;
    if (!team) {
      onEmpty();
    }
  },

  handleScreenChange(prevScreen, screen) {
    this.setState({
      isTooltip: (screen >= WindowListener.SCREEN_NAMES.MD)
    });
  },

  render() {
    return (
      <div className="SpendTeam">
        <Helmet title={`Team${CONF.TITLE_SUFFIX}`} />
        <WindowListener onScreenChange={this.handleScreenChange} />

        {this.renderContainer()}
      </div>
    );
  },
  renderContainer() {
    let {formatMessage} = this.context.intl;
    if (this.props.team) {
      return (
        <div className="container-fluid SpendTeam-container">
          <header className="SpendTeam-container-header text-center">
            <FormattedHTMLMessage id="team.title">
              <h1 className="SpendTeam-h1" />
            </FormattedHTMLMessage>
            <p className="SpendTeam-h1-p visible-md-inline visible-lg-inline">
              {formatMessage({id: 'team.description'})}
            </p>
          </header>
          {this.renderTeam()}
          <footer className="SpendTeam-container-footer">
            <div className="row">
              <div className="col-md-8">
                <div className="SpendTeam-container-footer-header">
                  <h2 className="SpendTeam-container-footer-h2">
                    {formatMessage({id: 'team.joinTheTeam'})}
                  </h2>
                  <p className="SpendTeam-container-footer-h2-p">
                    {formatMessage({id: 'team.weAreHiring'})}
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <LinkBlock className="SpendTeam-container-footer-LinkBlock">
                  <Link className="SpendTeam-jobsLink" url="/jobs" clickEvent={{category: 'View Openings'}}>{formatMessage({id: 'team.viewOpenings'})}</Link>
                </LinkBlock>
              </div>
            </div>
          </footer>
        </div>
      );
    }
  },
  renderTeam() {
    const {data} = this.props.team;
    return (
      <div className="SpendTeam-team">
        <ul className="SpendTeam-team-list listUnstyled clearfix">
          {data.asMutable()
            .map(({name, role, image, desc}, i) => (
              <li className="SpendTeam-member pull-left" key={i}>
                <ImageBlock>
                  {this.renderMemberImage({name, image, desc})}
                </ImageBlock>
                <div className="SpendTeam-member-caption text-center">
                  <div className="SpendTeam-member-name">{name}</div>
                  <div className="SpendTeam-member-role">{role}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  },
  renderMemberImage({name, image, desc}) {
    let rImageEl = (
      <RImage
        className="SpendTeam-member-RImage"
        src={image} width={140} height={140} alt={name} />
    );
    return this.state.isTooltip ?
      (<Tooltip
        overlayClassName="SpendTeam-member-detail"
        overlay={
          <div className="SpendTeam-member-detail-overlay">
            <header className="SpendTeam-member-detail-name">
              {name}
            </header>
            <p
              className="SpendTeam-member-detail-p
                SpendTeam-member-detail-p-last"
            >
              {desc}
            </p>
          </div>
        }
        placement="top" align={{offset: [0, 0]}}
        mouseEnterDelay={0.3} mouseLeaveDelay={0}
      >
        {rImageEl}
      </Tooltip>) :
      rImageEl;
  }
});

module.exports = SpendTeam;
