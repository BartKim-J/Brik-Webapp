let React = require('react');
let classNames = require('classnames');

let ExtendChildMixin = {
  extendChild(props) {
    let child = React.Children.only(this.props.children);
    let newProps = {};

    for (let key in props) {
      let prop = props[key];

      if (prop) {
        let newProp = null;
        let childProp = child.props[key];

        if (childProp) {
          switch (key) {
          case 'className':
            newProp = classNames(prop, childProp);
            break;
          case 'style':
            newProp = Object.assign({}, childProp, prop);
            break;
          default:
            if (key.startsWith('on')) {
              newProp = (e => {
                childProp(e);
                prop(e);
              });
            }
            break;
          }
        }

        newProps[key] = newProp || prop;
      }
    }

    return React.cloneElement(child, newProps);
  }
};

module.exports = ExtendChildMixin;
