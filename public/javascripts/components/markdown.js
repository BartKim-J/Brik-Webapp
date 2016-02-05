let React = require('react');
let classNames = require('classnames');
let marked = require('marked');

let omit = require('lodash/object/omit');

marked.setOptions({
  breaks: true,
  smartypants: true
});

let Markdown = React.createClass({
  makeMarkup() {
    return {
      __html: marked(this.props.children)
    };
  },

  render() {
    return (
      <div
        {...omit(this.props, 'children')}
        className={classNames('Markdown', this.props.className)}
        dangerouslySetInnerHTML={this.makeMarkup()} />
    );
  }
});

module.exports = Markdown;
