'use strict';

let React = require('react');

let {Link} = require('../router');

let SpendMenu = React.createClass({
  render() {
    return (
      <div className="SpendMenu">
        <div className="SpendMenu-logo">
          <Link url="/"><span className="logo">spend.</span></Link>
        </div>
        <ul>
          <li><Link url="/about">About</Link></li>
          <li><Link url="/jobs">Jobs</Link></li>
          <li><Link url="/faq">FAQ</Link></li>
        </ul>
      </div>
    );
  }
});

module.exports = SpendMenu;
