let React = require('react');
let classNames = require('classnames');

let capitalize = require('lodash/string/capitalize');

let {BlankLink} = require('../links');

const {FACEBOOK_URL, TWITTER_URL, LINKEDIN_URL} = CONF;

let SpendSocialLinks = React.createClass({
  statics: {
    data: [
      ['facebook', FACEBOOK_URL],
      ['twitter', TWITTER_URL],
      ['linkedin', LINKEDIN_URL, 'LinkedIn']
    ].filter(([name, url]) => url)
  },

  propTypes: {
    eventCategory: React.PropTypes.string.isRequired,
    linkClassName: React.PropTypes.string
  },

  render() {
    const {eventCategory, className, linkClassName} = this.props;
    return (
      <ul
        className={classNames(
          'SpendSocialLinks listUnstyled clearfix', className
        )}
      >
        {SpendSocialLinks.data
          .map(([name, url, displayName = capitalize(name)], i, array) => (
            <li
              className={classNames('SpendSocialLinks-item pull-left', {
                'SpendSocialLinks-item-last': i === array.length - 1
              })}
              key={name}
            >
              <BlankLink className={classNames('SpendSocialLinks-link', linkClassName)} href={url} clickEvent={{category: eventCategory, label: displayName}}><i className={`fa fa-${name} SpendSocialLinks-icon`} /></BlankLink>
          </li>
        ))}
      </ul>
    );
  }
});

module.exports = SpendSocialLinks;
