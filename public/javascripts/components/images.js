let React = require('react');
let classNames = require('classnames');

let pick = require('lodash/object/pick');

const IMAGE_PROP_TYPES = {
  src: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  alt: React.PropTypes.string
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
    const {className, children} = this.props;
    return (
      <div className={classNames('ImageBlock', className)}>
        {children}
      </div>
    );
  }
});

module.exports = {
  Image, RImage,
  ImageBlock
};
