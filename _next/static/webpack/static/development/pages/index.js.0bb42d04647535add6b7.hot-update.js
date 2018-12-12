webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/logo/index.js":
/*!**********************************!*\
  !*** ./components/logo/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logo */ "./components/logo/logo.js");
var _jsxFileName = "/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/components/logo/index.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var MAX_HEAD_TILT_X = 400;
var MAX_HEAD_TILT_Y = 400;

var LogoContainer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(LogoContainer, _PureComponent);

  function LogoContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LogoContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LogoContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      x: 0,
      y: 0
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "logo", react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMove", function (event) {
      var preventScroll = _this.props.preventScroll;

      var _ref = _this.moveEvent === 'touchmove' ? event.touches[0] : event,
          target = _ref.target,
          pageX = _ref.pageX,
          pageY = _ref.pageY;

      if (preventScroll && closestAncestor(target, 'logo')) {
        event.preventDefault();
      }

      var x = saturate(pageX - _this.center.x, MAX_HEAD_TILT_X);
      var y = saturate(pageY - _this.center.y, MAX_HEAD_TILT_Y);

      _this.setState({
        x: x,
        y: y
      });
    });

    return _this;
  }

  _createClass(LogoContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var preventScroll = this.props.preventScroll;

      var _this$logo$current$ge = this.logo.current.getBoundingClientRect(),
          x = _this$logo$current$ge.x,
          y = _this$logo$current$ge.y,
          width = _this$logo$current$ge.width,
          height = _this$logo$current$ge.height;

      this.center = {
        x: window.pageXOffset + x + width / 2,
        y: window.pageYOffset + y + height / 2
      };
      console.log(this.logo.current.getBoundingClientRect());
      this.moveEvent = isTouchDevice() ? 'touchmove' : 'mousemove';
      document.addEventListener(this.moveEvent, this.onMove, {
        passive: !preventScroll
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener(this.moveEvent, this.onMove);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          size = _this$props.size,
          faces = _this$props.faces;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_logo__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
        size: size,
        faces: faces
      }, this.state, {
        ref: this.logo,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: this
      }));
    }
  }]);

  return LogoContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

LogoContainer.defaultProps = {
  size: 64,
  faces: [{
    image: 'I',
    reverse: false,
    eye: true
  }, {
    image: 'C',
    reverse: false,
    eye: false
  }],
  preventScroll: false
};
/* harmony default export */ __webpack_exports__["default"] = (LogoContainer);

function isTouchDevice() {
  if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  } // include the 'heartz' as a way to have a non matching mediaQuery to help terminate the join
  // https://git.io/vznFH


  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return window.matchMedia(query).matches;
}

function saturate(num, limit) {
  if (num < -limit) return -limit;
  if (num > limit) return limit;
  return num;
}

function closestAncestor(el, className) {
  var limit = 4;
  var i = 0;
  var closest = el;

  while (closest && i < limit) {
    if (closest.className == null || typeof closest.className.split !== 'function') {
      return null;
    }

    var classes = closest.className.split(' ');

    if (classes.includes(className)) {
      return closest;
    }

    closest = closest.parentNode;
    i++;
  }
}

/***/ })

})
//# sourceMappingURL=index.js.0bb42d04647535add6b7.hot-update.js.map