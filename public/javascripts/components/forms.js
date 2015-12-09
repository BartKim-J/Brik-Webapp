let React = require('react');

let Form = React.createClass({
  propTypes: {
    action: React.PropTypes.string,
    method: React.PropTypes.string,

    onSubmit: React.PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      method: 'post'
    };
  },

  contextTypes: {
    csrfToken: React.PropTypes.string.isRequired
  },

  // Instance variables
  // - _ref

  reset() {
    this._ref.reset();
  },

  handleSubmit(e) {
    let inputs = this._ref.querySelectorAll(
      // TEMP: textual inputs only
      `input[type="email"],
      input[type="hidden"],
      input[type="number"],
      input[type="password"],
      input[type="search"],
      input[type="tel"],
      input[type="text"],
      input[type="url"],
      textarea`
    );
    let params = {};
    for (let i = inputs.length; i--; ) {
      let input = inputs[i];
      let {name, value} = input;
      if (name !== '_csrf' && value) {
        params[name] = value;
      }
    }
    this.props.onSubmit(params);
    e.preventDefault();
  },

  render() {
    const {
      action, method,
      className, children
    } = this.props;

    return (
      <form
        className={className}
        action={action} method={method}
        onSubmit={this.handleSubmit}
        ref={ref => {
          this._ref = ref;
        }}
      >
        <input type="hidden" name="_csrf" value={this.context.csrfToken} />
        {children}
      </form>
    );
  }
});

module.exports = {
  Form
};
