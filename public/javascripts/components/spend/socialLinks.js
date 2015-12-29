let React = require('react');
let classNames = require('classnames');

let {BlankLink} = require('../links');

const {FACEBOOK_URL, TWITTER_URL, LINKEDIN_URL} = CONF;

let SpendSocialLinks = React.createClass({
  statics: {
    data: [
      ['facebook', FACEBOOK_URL],
      ['twitter', TWITTER_URL],
      ['linkedin', LINKEDIN_URL]
    ].filter(([name, url]) => url)
  },

  propTypes: {
    linkClassName: React.PropTypes.string
  },

  render() {
    const {className, linkClassName} = this.props;
    return (
      <ul
        className={classNames(
          'SpendSocialLinks listUnstyled clearfix', className
        )}
      >
        {SpendSocialLinks.data.map(([name, url], i, array) => (
          <li
            className={classNames('SpendSocialLinks-item pull-left', {
              'SpendSocialLinks-item-last': i === array.length - 1
            })}
            key={name}
          >
            <BlankLink className={classNames('SpendSocialLinks-link', linkClassName)} href={url}><i className={`fa fa-${name} SpendSocialLinks-icon`} /></BlankLink>
          </li>
        ))}
      </ul>
    );
  }
});

module.exports = SpendSocialLinks;
