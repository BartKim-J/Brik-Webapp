let React = require('react');
let classNames = require('classnames');

let Consolitation = React.createClass({
  componentDidMount() {
    var _containerHeight = 1000;
    var _width, _height, _scrollHeight;
    var letters = document.getElementsByTagName('span');
    var _movingElements = [];
    var _scrollPercent = 0;
    var pre = prefix();
    var _jsPrefix  = pre.lowercase;
    if(_jsPrefix == 'moz') _jsPrefix = 'Moz'
    var _cssPrefix = pre.css;
    var endPercent = 10;
    var startPercent = 6;
    var endX = 0.07;
    var endY = 0.05;
    var _positions = [
      {
        name: 'spend',
        start: {
          percent: startPercent, x: 0.05, y: 0.1
        },
        end: {
          percent: endPercent, x: endX, y: endY
        }
      },
      {
        name: 'rewards',
        start: {
          percent: startPercent, x: 0.06, y: 0.085
        },
        end: {
          percent: endPercent, x: endX, y: endY
        }
      },
      {
        name: 'membership',
        start: {
          percent: startPercent, x: 0.07, y: 0.07
        },
        end: {
          percent: endPercent, x: endX, y: endY
        }
      },
      {
        name: 'gift',
        start: {
          percent: startPercent, x: 0.08, y: 0.055
        },
        end: {
          percent: endPercent, x: endX, y: endY
        }
      },
      {
        name: 'debit',
        start: {
          percent: startPercent, x: 0.09, y: 0.04
        },
        end: {
          percent: endPercent, x: endX, y: endY
        }
      },
      {
        name: 'credit',
        start: {
          percent: startPercent, x: 0.1, y: 0.025
        },
        end: {
          percent: endPercent, x: endX, y: endY
        }
      }
    ]

    function initMovingElements() {
      for (var i = 0; i < _positions.length; i++) {
        _positions[i].diff = {
          percent: _positions[i].end.percent - _positions[i].start.percent,
          x: _positions[i].end.x - _positions[i].start.x,
          y: _positions[i].end.y - _positions[i].start.y,
        }
        _positions[i].target = {};
        _positions[i].current = {};
        var el = document.getElementsByClassName('card '+_positions[i].name)[0];
        _movingElements.push(el);
      }
    }

    function resize() {
      _width = window.innerWidth;
      _height = window.innerHeight;
      _scrollHeight = _containerHeight-_height;
    }

    function updateElements() {
      for (var i = 0; i < _movingElements.length; i++) {
        var p = _positions[i];
        if(_scrollPercent <= p.start.percent) {
          p.target.x = p.start.x*_width;
          p.target.y = p.start.y*_containerHeight;
        } else if(_scrollPercent >= p.end.percent) {
          p.target.x = p.end.x*_width;
          p.target.y = p.end.y*_containerHeight;
        } else {
          p.target.x = p.start.x*_width + (p.diff.x*(_scrollPercent-p.start.percent)/p.diff.percent*_width);
          p.target.y = p.start.y*_containerHeight + (p.diff.y*(_scrollPercent-p.start.percent)/p.diff.percent*_containerHeight);
        }

        // lerp
        if(!p.current.x) {
          p.current.x = p.target.x;
          p.current.y = p.target.y;
        } else {
          p.current.x = p.current.x + (p.target.x - p.current.x)*0.1;
          p.current.y = p.current.y + (p.target.y - p.current.y)*0.1;
        }
        _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+p.current.x+'px, '+
        p.current.y+'px, 0px)';
      }
    }

    function getScrollTop(){
      if(typeof pageYOffset!= 'undefined'){
        //most browsers except IE before #9
        return pageYOffset;
      }
      else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
      }
    }

    function loop() {
      var _scrollOffset = window.pageYOffset || window.scrollTop;
      _scrollPercent = _scrollOffset/_scrollHeight || 0;
      updateElements();

      requestAnimationFrame(loop);
    }

    /* prefix detection http://davidwalsh.name/vendor-prefix */
    function prefix() {
      var styles = window.getComputedStyle(document.documentElement, ''),
      pre = (Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1],
      dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
      return {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
      };
    }

    resize();
    initMovingElements();

    loop();

    window.addEventListener('resize', resize);

  },

  render() {
    return (
      <div className="card-container">
      <div className="card credit"></div>
      <div className="card debit"></div>
      <div className="card gift"></div>
      <div className="card membership"></div>
      <div className="card rewards"></div>
      <div className="card spend"></div>
      </div>
    );
  }
});

module.exports = Consolitation;
