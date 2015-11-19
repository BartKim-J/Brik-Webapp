'use strict';

let React = require('react');
let Tooltip = require('rc-tooltip');
let Helmet = require('react-helmet');
let {WindowResizeListener} = require('react-window-resize-listener');

let {Link} = require('../router');

let {
  RImage, ImageBlock,
  BlankLink, LinkBlock
} = require('../tags');

let Logo = require('./logo');

let SpendAbout = React.createClass({
  propTypes: {
    team: React.PropTypes.object,

    onEmpty: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      windowWidth: null
    };
  },

  componentDidMount() {
    const {team, onEmpty} = this.props;
    if (!team) {
      onEmpty();
    }
  },

  handleWindowResize(windowSize) {
    let {windowWidth} = windowSize;
    this.setState({windowWidth});
  },

  render() {
    return (
      <div className="SpendAbout">
        <Helmet title={`About${CONF.TITLE_SUFFIX}`} />
        <WindowResizeListener onResize={this.handleWindowResize} />

        {this.renderContainer()}
      </div>
    );
  },
  renderContainer() {
    if (this.props.team) {
      return (
        <div className="container-fluid SpendAbout-container">
          <header className="SpendAbout-container-header text-center">
            <h1 className="SpendAbout-h1">
              Meet the team behind <Logo />
            </h1>
            <p className="SpendAbout-h1-p">
              We dream about <span className="text-nowrap">incredible things</span>
            </p>
          </header>
          {this.renderTeam()}
          <footer className="SpendAbout-container-footer">
            <div className="row">
              <div className="col-md-8">
                <div className="SpendAbout-container-footer-header">
                  <h2 className="SpendAbout-container-footer-h2">
                    Join the Team
                  </h2>
                  <p className="SpendAbout-container-footer-h2-p">
                    We're hiring for a number of different positions
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <LinkBlock className="SpendAbout-container-footer-LinkBlock">
                  <Link className="SpendAbout-jobsLink" url="/about">View Openings</Link>
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
      <div className="SpendAbout-team">
        <ul className="SpendAbout-team-list listUnstyled clearfix">
          {data.asMutable()
            .map(({
              name, role, image,
              links, desc
            }, i) => (
              <li className="SpendAbout-member pull-left" key={i}>
                <ImageBlock>
                  {this.renderMemberImage({name, image, links, desc})}
                </ImageBlock>
                <div className="SpendAbout-member-caption text-center">
                  <div className="SpendAbout-member-name">{name}</div>
                  <div className="SpendAbout-member-role">{role}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  },
  renderMemberImage({
    name, image,
    links: {twitter = null, facebook = null},
    desc
  }) {
    const {windowWidth} = this.state;
    let rImageEl = (
      <RImage
        className="SpendAbout-member-RImage"
        src={image} width={140} height={140} alt={name} />
    );
    return (windowWidth && windowWidth >= 992) ?
      (<Tooltip
        overlayClassName="SpendAbout-member-detail"
        overlay={
          <div className="SpendAbout-member-detail-overlay">
            <header className="SpendAbout-member-detail-overlay-header">
              <span className="SpendAbout-member-detail-name">{name}</span>
              {[['twitter', twitter], ['facebook', facebook]]
                .filter(([name, data]) => data)
                .map(([name, data]) => (
                  <BlankLink className="SpendAbout-member-detail-link" href={data} key={name}><i className={`fa fa-${name}`} /></BlankLink>
                ))}
            </header>
            <p
              className="SpendAbout-member-detail-p
                SpendAbout-member-detail-p-last"
            >
              {desc}
            </p>
          </div>
        }
        placement="top" align={{offset: [0, 0]}}
        mouseEnterDelay={1} mouseLeaveDelay={0}
      >
        {rImageEl}
      </Tooltip>) :
      rImageEl;
  }
});

module.exports = SpendAbout;
