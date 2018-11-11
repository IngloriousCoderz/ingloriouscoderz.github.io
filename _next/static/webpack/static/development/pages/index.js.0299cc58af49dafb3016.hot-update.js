webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/logo/index.js":
/*!**********************************!*\
  !*** ./components/logo/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/components/logo/index.js";



function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var _default =
/*#__PURE__*/
function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_default)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      transform: "scaleY(1.2) translateZ(".concat(-_this.props.size, "px) rotateX(-40deg)\n  rotateY(-45deg)")
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "logo", react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseMove", function (event) {
      var clientX = event.clientX,
          clientY = event.clientY;
      var size = _this.props.size;
      var vector = {
        x: saturate(clientX - _this.center.x, MAX_HEAD_TILT_X),
        y: saturate(clientY - _this.center.y, MAX_HEAD_TILT_Y) // const polar = {
        //   r: Math.sqrt(vector.x * vector.x + vector.y * vector.y),
        //   a: Math.atan(vector.y / vector.x),
        // }

      };

      _this.setState({
        transform: "scaleY(1.2) translateZ(".concat(-size, "px) rotateX(calc(-40deg - 0.001 * ").concat(vector.y, "rad)) rotateY(calc(-45deg + 0.001 * ").concat(vector.x, "rad))")
      });
    });

    return _this;
  }

  _createClass(_default, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$logo$current$ge = this.logo.current.getBoundingClientRect(),
          x = _this$logo$current$ge.x,
          width = _this$logo$current$ge.width,
          y = _this$logo$current$ge.y,
          height = _this$logo$current$ge.height;

      this.center = {
        x: x + width / 2,
        y: y + height / 2
      };
      document.addEventListener('mousemove', this.onMouseMove);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mousemove', this.onMouseMove);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          size = _this$props.size,
          _this$props$letters = _this$props.letters,
          letters = _this$props$letters === void 0 ? 'IC' : _this$props$letters;
      var transform = this.state.transform;

      var _letters = _slicedToArray(letters, 2),
          left = _letters[0],
          right = _letters[1];

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        ref: this.logo,
        className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["332844000", [size, size, size, transform, size / 2, size / 2]]]) + " " + "logo",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["332844000", [size, size, size, transform, size / 2, size / 2]]]) + " " + "cube",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["332844000", [size, size, size, transform, size / 2, size / 2]]]) + " " + "cube__face cube__face--front",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
        src: __webpack_require__("./components/logo/faces sync recursive ^\\.\\/.*\\.svg$")("./".concat(left, ".svg")),
        alt: left,
        className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["332844000", [size, size, size, transform, size / 2, size / 2]]]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
        src: __webpack_require__(/*! ./eye.svg */ "./components/logo/eye.svg"),
        alt: "eye",
        className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["332844000", [size, size, size, transform, size / 2, size / 2]]]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["332844000", [size, size, size, transform, size / 2, size / 2]]]) + " " + "cube__face cube__face--right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
        src: __webpack_require__("./components/logo/faces sync recursive ^\\.\\/.*\\.svg$")("./".concat(right, ".svg")),
        alt: right,
        className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["332844000", [size, size, size, transform, size / 2, size / 2]]]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
        styleId: "332844000",
        css: ".logo.__jsx-style-dynamic-selector{width:".concat(size, "px;-webkit-perspective:").concat(size, "px;-moz-perspective:").concat(size, "px;-ms-perspective:").concat(size, "px;perspective:").concat(size, "px;margin-top:-1rem;}.cube.__jsx-style-dynamic-selector{height:").concat(size, "px;-webkit-transform-style:preserve-3d;-ms-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transform:").concat(transform, ";-ms-transform:").concat(transform, ";transform:").concat(transform, ";-webkit-transition:ease-out 0.2s;transition:ease-out 0.2s;}.cube__face.__jsx-style-dynamic-selector{position:absolute;width:100%;height:100%;-webkit-transform-origin:bottom center;-ms-transform-origin:bottom center;transform-origin:bottom center;}.cube__face.__jsx-style-dynamic-selector>img.__jsx-style-dynamic-selector{position:absolute;}.cube__face--front.__jsx-style-dynamic-selector{-webkit-transform:rotateY(0deg) translateZ(").concat(size / 2, "px) skew(12deg);-ms-transform:rotateY(0deg) translateZ(").concat(size / 2, "px) skew(12deg);transform:rotateY(0deg) translateZ(").concat(size / 2, "px) skew(12deg);}.cube__face--right.__jsx-style-dynamic-selector{-webkit-transform:rotateY(90deg) translateZ(").concat(size / 2, "px) skew(-12deg);-ms-transform:rotateY(90deg) translateZ(").concat(size / 2, "px) skew(-12deg);transform:rotateY(90deg) translateZ(").concat(size / 2, "px) skew(-12deg);}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9jb21wb25lbnRzL2xvZ28vaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUVvQixBQUdrRCxBQU1DLEFBT3BCLEFBT0EsQUFJNkQsQUFJRSxrQkFkdEUsQUFPYixXQU5jLFFBZCtCLENBTWYsR0FTRyw2RkFSUSxZQVN6QyxnRkFmbUIsaUJBQ25CLE1Bc0JBLE1BSUEsUUFwQjJCLDBEQUMzQiIsImZpbGUiOiIvaG9tZS9hbnRvbnkvUHJvZ2V0dGkvSW5nbG9yaW91cyBDb2RlcnovaW5nbG9yaW91c2NvZGVyei5naXRodWIuaW8vY29tcG9uZW50cy9sb2dvL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmNvbnN0IE1BWF9IRUFEX1RJTFRfWCA9IDQwMFxuY29uc3QgTUFYX0hFQURfVElMVF9ZID0gNDAwXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGUgPSB7XG4gICAgdHJhbnNmb3JtOiBgc2NhbGVZKDEuMikgdHJhbnNsYXRlWigkey10aGlzLnByb3BzLnNpemV9cHgpIHJvdGF0ZVgoLTQwZGVnKVxuICByb3RhdGVZKC00NWRlZylgLFxuICB9XG5cbiAgbG9nbyA9IFJlYWN0LmNyZWF0ZVJlZigpXG5cbiAgb25Nb3VzZU1vdmUgPSBldmVudCA9PiB7XG4gICAgY29uc3QgeyBjbGllbnRYLCBjbGllbnRZIH0gPSBldmVudFxuICAgIGNvbnN0IHsgc2l6ZSB9ID0gdGhpcy5wcm9wc1xuXG4gICAgY29uc3QgdmVjdG9yID0ge1xuICAgICAgeDogc2F0dXJhdGUoY2xpZW50WCAtIHRoaXMuY2VudGVyLngsIE1BWF9IRUFEX1RJTFRfWCksXG4gICAgICB5OiBzYXR1cmF0ZShjbGllbnRZIC0gdGhpcy5jZW50ZXIueSwgTUFYX0hFQURfVElMVF9ZKSxcbiAgICB9XG5cbiAgICAvLyBjb25zdCBwb2xhciA9IHtcbiAgICAvLyAgIHI6IE1hdGguc3FydCh2ZWN0b3IueCAqIHZlY3Rvci54ICsgdmVjdG9yLnkgKiB2ZWN0b3IueSksXG4gICAgLy8gICBhOiBNYXRoLmF0YW4odmVjdG9yLnkgLyB2ZWN0b3IueCksXG4gICAgLy8gfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0cmFuc2Zvcm06IGBzY2FsZVkoMS4yKSB0cmFuc2xhdGVaKCR7LXNpemV9cHgpIHJvdGF0ZVgoY2FsYygtNDBkZWcgLSAwLjAwMSAqICR7XG4gICAgICAgIHZlY3Rvci55XG4gICAgICB9cmFkKSkgcm90YXRlWShjYWxjKC00NWRlZyArIDAuMDAxICogJHt2ZWN0b3IueH1yYWQpKWAsXG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgeCwgd2lkdGgsIHksIGhlaWdodCB9ID0gdGhpcy5sb2dvLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB0aGlzLmNlbnRlciA9IHtcbiAgICAgIHg6IHggKyB3aWR0aCAvIDIsXG4gICAgICB5OiB5ICsgaGVpZ2h0IC8gMixcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHNpemUsIGxldHRlcnMgPSAnSUMnIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgeyB0cmFuc2Zvcm0gfSA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCBbbGVmdCwgcmlnaHRdID0gbGV0dGVyc1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nb1wiIHJlZj17dGhpcy5sb2dvfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdWJlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdWJlX19mYWNlIGN1YmVfX2ZhY2UtLWZyb250XCI+XG4gICAgICAgICAgICA8aW1nIHNyYz17cmVxdWlyZShgLi9mYWNlcy8ke2xlZnR9LnN2Z2ApfSBhbHQ9e2xlZnR9IC8+XG4gICAgICAgICAgICA8aW1nIHNyYz17cmVxdWlyZSgnLi9leWUuc3ZnJyl9IGFsdD1cImV5ZVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdWJlX19mYWNlIGN1YmVfX2ZhY2UtLXJpZ2h0XCI+XG4gICAgICAgICAgICA8aW1nIHNyYz17cmVxdWlyZShgLi9mYWNlcy8ke3JpZ2h0fS5zdmdgKX0gYWx0PXtyaWdodH0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgIC5sb2dvIHtcbiAgICAgICAgICAgIHdpZHRoOiAke3NpemV9cHg7XG4gICAgICAgICAgICBwZXJzcGVjdGl2ZTogJHtzaXplfXB4O1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogLTFyZW07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmN1YmUge1xuICAgICAgICAgICAgaGVpZ2h0OiAke3NpemV9cHg7XG4gICAgICAgICAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiAke3RyYW5zZm9ybX07XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBlYXNlLW91dCAwLjJzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5jdWJlX19mYWNlIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogYm90dG9tIGNlbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuY3ViZV9fZmFjZSA+IGltZyB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmN1YmVfX2ZhY2UtLWZyb250IHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgwZGVnKSB0cmFuc2xhdGVaKCR7c2l6ZSAvIDJ9cHgpIHNrZXcoMTJkZWcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5jdWJlX19mYWNlLS1yaWdodCB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoOTBkZWcpIHRyYW5zbGF0ZVooJHtzaXplIC8gMn1weCkgc2tldygtMTJkZWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgYH08L3N0eWxlPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmZ1bmN0aW9uIHNhdHVyYXRlKG51bSwgbGltaXQpIHtcbiAgaWYgKG51bSA8IC1saW1pdCkgcmV0dXJuIC1saW1pdFxuICBpZiAobnVtID4gbGltaXQpIHJldHVybiBsaW1pdFxuICByZXR1cm4gbnVtXG59XG4iXX0= */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/components/logo/index.js */"),
        dynamic: [size, size, size, transform, size / 2, size / 2],
        __self: this
      }));
    }
  }]);

  return _default;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);



function saturate(num, limit) {
  if (num < -limit) return -limit;
  if (num > limit) return limit;
  return num;
}

/***/ })

})
//# sourceMappingURL=index.js.0299cc58af49dafb3016.hot-update.js.map