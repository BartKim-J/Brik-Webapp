'use strict';

let React = require('react');

let {Link} = require('../router');
let Logo = require('./logo');

let SpendMenu = React.createClass({
  render() {
    return (
      <div className="SpendMenu">
        <div className="SpendMenu-Logo">
          <Link url="/"><Logo /></Link>
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
