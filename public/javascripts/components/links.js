let React = require('react');
let classNames = require('classnames');

let TrackClickMixin = require('../mixins/trackClick');

let BlankLink = React.createClass({
  mixins: [TrackClickMixin],

  propTypes: {
    clickEvent: React.PropTypes.object.isRequired,
    href: React.PropTypes.string.isRequired
  },

  handleClick(e) {
    this.trackClick(this.props.clickEvent);
  },

  render() {
    const {href, className, children} = this.props;
    return (
      // TOOD: new window icon
      <a className={className} href={href} target="_blank" onClick={this.handleClick}>{children}</a>
    );
  }
});

let EmailLink = React.createClass({
  mixins: [TrackClickMixin],

  propTypes: {
    email: React.PropTypes.string.isRequired,
    eventLabel: React.PropTypes.string.isRequired
  },

  handleClick(e) {
    const {email, eventLabel} = this.props;
    this.trackClick({
      category: 'Email Link',
      label: `email: ${email}, ${eventLabel}`
    });
  },

  render() {
    const {email, className, children} = this.props;
    return (
      <a className={className} href={`mailto:${email}`} onClick={this.handleClick}>{React.Children.count(children) > 0 ? children : email}</a>
    );
  }
});

let ScrollLink = React.createClass({
  mixins: [TrackClickMixin],

  handleClick(e) {
    //const {clickEventScrollToID} = this.props;
    //scroll.To(clickEventScrollToID);
    /*$(".SpendIndex-newsletter.first").velocity("scroll", {
      duration: 400,
      offset: -403,
      easing: [400, 32],
      progress: function(elements, c, r, s, t) {
        if (r < 200) {
          $(".SpendIndex-newsletter.first").addClass("animated flash")
        }
      }
    });*/
    window.location = "http://igg.me/at/spendwallet";
  },

  render() {
    const {className, children} = this.props;
    return (
      <a className={className} onClick={this.handleClick}>{children}</a>
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
  BlankLink, EmailLink,
  LinkBlock, ScrollLink
};

var scroll = (function() {

    var elementPosition = function(a) {
        return function() {
            return a.getBoundingClientRect().top - 403;
        };
    };

    var scrolling = function( elementID ) {

        var el = document.getElementsByClassName(elementID)[0],
            elPos = elementPosition( el ),
            duration = 200,
            increment = Math.round( Math.abs( elPos() )/40 ),
            time = Math.round( duration/increment ),
            prev = 0,
            E;

        function scroller() {
            E = elPos();

            if (E === prev) {
                return;
            } else {
                prev = E;
            }

            increment = (E > -20 && E < 20) ? ((E > - 5 && E < 5) ? 1 : 5) : increment;

            if (E > 1 || E < -1) {
                if (E < 0) {
                    window.scrollBy(0, -increment);
                } else {
                    window.scrollBy(0, increment);
                }
                setTimeout(scroller, time);
            } else {
              console.log("klart!!!!!!!");
            }
        }

        scroller();
    };

    return {
        To: scrolling
    }

})();
