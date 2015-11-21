let React = require('react');
let classNames = require('classnames');

let pick = require('lodash/object/pick');

let ExtendChildMixin = require('../mixins/extendChild');

let PseudoButton = React.createClass({
  mixins: [ExtendChildMixin],

  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    return this.extendChild({
      onClick: this.props.onClick,

      // Prevent double-click selection.
      onMouseDown: e => {
        e.preventDefault();
      },

      role: 'button'
    });
  }
});

const IMAGE_PROP_TYPES = {
  src: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  alt: React.PropTypes.string.isRequired
};

let Image = React.createClass({
  propTypes: IMAGE_PROP_TYPES,

  render() {
    return (
      <img {...this.props} />
    );
  }
});

let RImage = React.createClass({
  propTypes: IMAGE_PROP_TYPES,

  render() {
    const {src, width, height, alt, className} = this.props;
    const handlerProps = pick(
      this.props,
      (value, key) => key.startsWith('on')
    );
    return (
      <span
        className={classNames('RImage', className)}
        style={{
          display: 'inline-block',
          width
        }}
        {...handlerProps}
      >
        <span
          className="RImage-inner"
          style={{
            display: 'inline-block',
            height: 0,
            paddingBottom: `${(height/width)*100}%`
          }}
        >
          <Image
            src={src} width={width} height={height} alt={alt}
            style={{
              width: '100%',
              height: 'auto'
            }} />
        </span>
      </span>
    );
  }
});

let ImageBlock = React.createClass({
  render() {
    return (
      <div className="ImageBlock">{this.props.children}</div>
    );
  }
});

let BlankLink = React.createClass({
  propTypes: {
    href: React.PropTypes.string.isRequired
  },

  render() {
    const {href, className, children} = this.props;
    return (
      // TOOD: new window icon
      <a className={className} href={href} target="_blank">{children}</a>
    );
  }
});

let EmailLink = React.createClass({
  propTypes: {
    email: React.PropTypes.string.isRequired
  },

  render() {
    const {email, className, children} = this.props;
    return (
      <a className={className} href={`mailto:${email}`}>{React.Children.count(children) > 0 ? children : email}</a>
    );
  }
});

let LinkBlock = React.createClass({
  render() {
    const {className, children} = this.props;
    return (
      <div className={classNames('LinkBlock', className)}>
        {children}
      </div>
    );
  }
});

module.exports = {
  PseudoButton,
  Image, RImage, ImageBlock,
  BlankLink, EmailLink, LinkBlock
};
