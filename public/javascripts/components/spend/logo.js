let React = require('react');
let classNames = require('classnames');

let SpendLogo = React.createClass({
  render() {
    return (
          <span className={classNames('AsteraLogo', this.props.className)}><img className="AsteraLogo" src="https://s3.ap-northeast-2.amazonaws.com/astera/ASTERA.com/main_logo.png" alt="logo"></img></span>
    );
  }
});

module.exports = SpendLogo;
