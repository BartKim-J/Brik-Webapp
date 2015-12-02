let React = require('react');
let classNames = require('classnames');

let assign = require('lodash/object/assign');

let ExtendChildMixin = {
  extendChild(props) {
    let child = React.Children.only(this.props.children);

    assign(props, child.props, (prop, childProp, key) => {
      if (key.startsWith('on')) {
        if (prop && childProp) {
          return (e => {
            childProp(e);
            prop(e);
          });
        }
      } else if (key === 'className') {
        return classNames(prop, childProp);
      }
      return prop || childProp;
    });

    return React.cloneElement(child, props);
  }
};

module.exports = ExtendChildMixin;
