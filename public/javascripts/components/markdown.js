let React = require('react');
let classNames = require('classnames');
let marked = require('marked');

marked.setOptions({breaks: true});

let Markdown = React.createClass({
  makeMarkup() {
    return {
      __html: marked(this.props.children)
    };
  },

  render() {
    return (
      <div
        className={classNames('Markdown', this.props.className)}
        dangerouslySetInnerHTML={this.makeMarkup()} />
    );
  }
});

module.exports = Markdown;
