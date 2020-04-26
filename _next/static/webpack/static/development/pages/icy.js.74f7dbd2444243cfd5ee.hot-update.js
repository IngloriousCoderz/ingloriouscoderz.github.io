webpackHotUpdate("static/development/pages/icy.js",{

/***/ "./components/icy/index.js":
/*!*********************************!*\
  !*** ./components/icy/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icy */ "./components/icy/icy.js");
var _jsxFileName = "/home/antony/Projects/Inglorious Coderz/ingloriouscoderz.github.io/components/icy/index.js";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var MAX_HEAD_TILT_X = 400;
var MAX_HEAD_TILT_Y = 400;

function FLogoContainer(_ref) {
  var size = _ref.size,
      faces = _ref.faces,
      preventScroll = _ref.preventScroll;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    x: 0,
    y: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      coords = _useState2[0],
      setCoords = _useState2[1];

  var logo = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  var center = null;
  var moveEvent = null;

  var onMove = function onMove(event) {
    var _ref2 = moveEvent === 'touchmove' ? event.touches[0] : event,
        target = _ref2.target,
        pageX = _ref2.pageX,
        pageY = _ref2.pageY;

    if (preventScroll && closestAncestor(target, 'logo')) {
      event.preventDefault();
    }

    setCoords({
      x: saturate(pageX - center.x, MAX_HEAD_TILT_X),
      y: saturate(pageY - center.y, MAX_HEAD_TILT_Y)
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var _logo$current$getBoun = logo.current.getBoundingClientRect(),
        left = _logo$current$getBoun.left,
        top = _logo$current$getBoun.top,
        width = _logo$current$getBoun.width,
        height = _logo$current$getBoun.height;

    center = {
      x: window.pageXOffset + left + width / 2,
      y: window.pageYOffset + top + height / 2
    };
    moveEvent = isTouchDevice() ? 'touchmove' : 'mousemove';
    document.addEventListener(moveEvent, onMove, {
      passive: !preventScroll
    });
    return function () {
      document.removeEventListener(moveEvent, onMove);
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_icy__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
    size: size,
    faces: faces
  }, coords, {
    ref: logo,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 10
    }
  }));
}

var LogoContainer = /*#__PURE__*/function (_PureComponent) {
  _inherits(LogoContainer, _PureComponent);

  var _super = _createSuper(LogoContainer);

  function LogoContainer() {
    var _this;

    _classCallCheck(this, LogoContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      x: 0,
      y: 0
    });

    _defineProperty(_assertThisInitialized(_this), "logo", react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef());

    _defineProperty(_assertThisInitialized(_this), "onMove", function (event) {
      var preventScroll = _this.props.preventScroll;

      var _ref3 = _this.moveEvent === 'touchmove' ? event.touches[0] : event,
          target = _ref3.target,
          pageX = _ref3.pageX,
          pageY = _ref3.pageY;

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
          left = _this$logo$current$ge.left,
          top = _this$logo$current$ge.top,
          width = _this$logo$current$ge.width,
          height = _this$logo$current$ge.height;

      this.center = {
        x: window.pageXOffset + left + width / 2,
        y: window.pageYOffset + top + height / 2
      };
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_icy__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
        size: size,
        faces: faces
      }, this.state, {
        ref: this.logo,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100,
          columnNumber: 12
        }
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
/* harmony default export */ __webpack_exports__["default"] = (Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(LogoContainer));

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
//# sourceMappingURL=icy.js.74f7dbd2444243cfd5ee.hot-update.js.map