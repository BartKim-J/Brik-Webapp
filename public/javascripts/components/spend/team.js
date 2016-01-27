let React = require('react');
let Tooltip = require('rc-tooltip');
let Helmet = require('react-helmet');

let {RImage, ImageBlock} = require('../images');
let {BlankLink, LinkBlock} = require('../links');
let {Link} = require('../router');
let WindowListener = require('../windowListener');

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
    if (this.props.team) {
      return (
        <div className="container-fluid SpendTeam-container">
          <header className="SpendTeam-container-header text-center">
            <h1 className="SpendTeam-h1">
              Meet the team behind <Logo />
            </h1>
            <p className="SpendTeam-h1-p">
              We dream about <span className="text-nowrap">incredible things</span>
            </p>
          </header>
          {this.renderTeam()}
          <footer className="SpendTeam-container-footer">
            <div className="row">
              <div className="col-md-8">
                <div className="SpendTeam-container-footer-header">
                  <h2 className="SpendTeam-container-footer-h2">
                    Join the Team
                  </h2>
                  <p className="SpendTeam-container-footer-h2-p">
                    We're hiring for a number of different positions
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <LinkBlock className="SpendTeam-container-footer-LinkBlock">
                  <Link className="SpendTeam-jobsLink" url="/jobs" clickEvent={{category: 'View Openings'}}>View Openings</Link>
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
            .map(({
              name, role, image,
              links, desc
            }, i) => (
              <li className="SpendTeam-member pull-left" key={i}>
                <ImageBlock>
                  {this.renderMemberImage({name, image, links, desc})}
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
  renderMemberImage({
    name, image,
    desc
  }) {
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
            <header className="SpendTeam-member-detail-overlay-header">
              <span className="SpendTeam-member-detail-name">{name}</span>
              {/* [['twitter', twitter], ['facebook', facebook]]
                .filter(([type, data]) => data)
                .map(([type, data]) => (
                  <BlankLink className="SpendTeam-member-detail-link" href={data} key={type} clickEvent={{category: 'Team Member', label: `name: "${name}", link type: ${type}`}}><i className={`fa fa-${type}`} /></BlankLink>
                )) */}
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
