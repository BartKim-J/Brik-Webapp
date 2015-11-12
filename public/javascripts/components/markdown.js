'use strict';

let React = require('react');
let marked = require('marked');

let Markdown = React.createClass({
  makeMarkup() {
    return {
      __html: marked(this.props.children)
    };
  },

  render() {
    return (
      <div
        className="Markdown"
        dangerouslySetInnerHTML={this.makeMarkup()} />
    );
  }
});

module.exports = Markdown;
