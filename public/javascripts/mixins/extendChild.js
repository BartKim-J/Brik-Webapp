'use strict';

let React = require('react');
let classNames = require('classnames');

let ExtendChildMixin = {
  extendChild(props) {
    let child = React.Children.only(this.props.children);
    const childProps = child.props;
    for (let key in props) {
      let prop = props[key];
      if (key.startsWith('on')) {
        let childHandler = childProps[key];
        if (childHandler) {
          let handler = prop;
          prop = (e => {
            childHandler(e);
            handler(e);
          });
        }
      } else if (key === 'className') {
        prop = classNames(childProps.className, prop);
      }
      props[key] = prop;
    }
    return React.cloneElement(child, props);
  }
};

module.exports = ExtendChildMixin;
