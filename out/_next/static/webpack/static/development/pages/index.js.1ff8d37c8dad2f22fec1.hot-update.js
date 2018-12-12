webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/logo/logo.js":
/*!*********************************!*\
  !*** ./components/logo/logo.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/compose */ "./utils/compose.js");
var _jsxFileName = "/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/components/logo/logo.js";



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var enhance = Object(_utils_compose__WEBPACK_IMPORTED_MODULE_2__["compose"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.memo, react__WEBPACK_IMPORTED_MODULE_1___default.a.forwardRef);
/* harmony default export */ __webpack_exports__["default"] = (enhance(function (_ref, ref) {
  var size = _ref.size,
      faces = _ref.faces,
      x = _ref.x,
      y = _ref.y;

  var _faces = _slicedToArray(faces, 2),
      left = _faces[0],
      right = _faces[1];

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    ref: ref,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["555053434", [size, size, size, -size, degreesToRadians(-40) - 0.001 * y, degreesToRadians(-45) + 0.001 * x, size / 2, size / 2, left.reverse ? 'transform: rotateY(180deg);' : '', right.reverse ? 'transform: rotateY(180deg);' : '']]]) + " " + "logo",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["555053434", [size, size, size, -size, degreesToRadians(-40) - 0.001 * y, degreesToRadians(-45) + 0.001 * x, size / 2, size / 2, left.reverse ? 'transform: rotateY(180deg);' : '', right.reverse ? 'transform: rotateY(180deg);' : '']]]) + " " + "cube",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["555053434", [size, size, size, -size, degreesToRadians(-40) - 0.001 * y, degreesToRadians(-45) + 0.001 * x, size / 2, size / 2, left.reverse ? 'transform: rotateY(180deg);' : '', right.reverse ? 'transform: rotateY(180deg);' : '']]]) + " " + "cube__face cube__face--left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: __webpack_require__("./components/logo/faces sync recursive ^\\.\\/.*\\.svg$")("./".concat(left.image, ".svg")),
    alt: left.image,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["555053434", [size, size, size, -size, degreesToRadians(-40) - 0.001 * y, degreesToRadians(-45) + 0.001 * x, size / 2, size / 2, left.reverse ? 'transform: rotateY(180deg);' : '', right.reverse ? 'transform: rotateY(180deg);' : '']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }), left.eye && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: __webpack_require__(/*! ./eye.svg */ "./components/logo/eye.svg"),
    alt: "left eye",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["555053434", [size, size, size, -size, degreesToRadians(-40) - 0.001 * y, degreesToRadians(-45) + 0.001 * x, size / 2, size / 2, left.reverse ? 'transform: rotateY(180deg);' : '', right.reverse ? 'transform: rotateY(180deg);' : '']]]) + " " + "eye",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["555053434", [size, size, size, -size, degreesToRadians(-40) - 0.001 * y, degreesToRadians(-45) + 0.001 * x, size / 2, size / 2, left.reverse ? 'transform: rotateY(180deg);' : '', right.reverse ? 'transform: rotateY(180deg);' : '']]]) + " " + "cube__face cube__face--right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: __webpack_require__("./components/logo/faces sync recursive ^\\.\\/.*\\.svg$")("./".concat(right.image, ".svg")),
    alt: right.image,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["555053434", [size, size, size, -size, degreesToRadians(-40) - 0.001 * y, degreesToRadians(-45) + 0.001 * x, size / 2, size / 2, left.reverse ? 'transform: rotateY(180deg);' : '', right.reverse ? 'transform: rotateY(180deg);' : '']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }), right.eye && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: __webpack_require__(/*! ./eye.svg */ "./components/logo/eye.svg"),
    alt: "right eye",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["555053434", [size, size, size, -size, degreesToRadians(-40) - 0.001 * y, degreesToRadians(-45) + 0.001 * x, size / 2, size / 2, left.reverse ? 'transform: rotateY(180deg);' : '', right.reverse ? 'transform: rotateY(180deg);' : '']]]) + " " + "eye",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "555053434",
    css: ".logo.__jsx-style-dynamic-selector{width:".concat(size, "px;-webkit-perspective:").concat(size, "px;-moz-perspective:").concat(size, "px;-ms-perspective:").concat(size, "px;perspective:").concat(size, "px;margin:0 auto;}.cube.__jsx-style-dynamic-selector{height:").concat(size, "px;-webkit-transform-style:preserve-3d;-ms-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transform:scaleY(1.2) translateZ(").concat(-size, "px) rotateX(").concat(degreesToRadians(-40) - 0.001 * y, "rad) rotateY(").concat(degreesToRadians(-45) + 0.001 * x, "rad);-ms-transform:scaleY(1.2) translateZ(").concat(-size, "px) rotateX(").concat(degreesToRadians(-40) - 0.001 * y, "rad) rotateY(").concat(degreesToRadians(-45) + 0.001 * x, "rad);transform:scaleY(1.2) translateZ(").concat(-size, "px) rotateX(").concat(degreesToRadians(-40) - 0.001 * y, "rad) rotateY(").concat(degreesToRadians(-45) + 0.001 * x, "rad);-webkit-transition:ease-out 0.2s;transition:ease-out 0.2s;}.cube__face.__jsx-style-dynamic-selector{position:absolute;width:100%;height:100%;-webkit-transform-origin:bottom center;-ms-transform-origin:bottom center;transform-origin:bottom center;}.cube__face.__jsx-style-dynamic-selector>img.__jsx-style-dynamic-selector{position:absolute;}.cube__face--left.__jsx-style-dynamic-selector{-webkit-transform:rotateY(0deg) translateZ(").concat(size / 2, "px) skew(12deg);-ms-transform:rotateY(0deg) translateZ(").concat(size / 2, "px) skew(12deg);transform:rotateY(0deg) translateZ(").concat(size / 2, "px) skew(12deg);}.cube__face--right.__jsx-style-dynamic-selector{-webkit-transform:rotateY(90deg) translateZ(").concat(size / 2, "px) skew(-12deg);-ms-transform:rotateY(90deg) translateZ(").concat(size / 2, "px) skew(-12deg);transform:rotateY(90deg) translateZ(").concat(size / 2, "px) skew(-12deg);}.cube__face--right.__jsx-style-dynamic-selector>.eye.__jsx-style-dynamic-selector{-webkit-transform:rotateY(180deg);-ms-transform:rotateY(180deg);transform:rotateY(180deg);}.cube__face--left.__jsx-style-dynamic-selector>img.__jsx-style-dynamic-selector:first-of-type{").concat(left.reverse ? 'transform: rotateY(180deg);' : '', ";}.cube__face--right.__jsx-style-dynamic-selector>img.__jsx-style-dynamic-selector:first-of-type{").concat(right.reverse ? 'transform: rotateY(180deg);' : '', ";}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9jb21wb25lbnRzL2xvZ28vbG9nby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQmtCLEFBR2dELEFBTUMsQUFTcEIsQUFPQSxBQUk2RCxBQUlFLEFBSXZELEFBSzdCLEFBSUEsa0JBM0JjLEFBT2IsV0FOYyxBQXNCZCxBQUlBLFFBMUM2QyxDQU1mLEdBV0csaURBaUJqQyw0Q0F6QjRDLFlBUzVDLGdGQWpCZ0IsY0FDaEIsU0F3QkEsTUFJQSw0VUFwQjJCLDBEQUMzQiIsImZpbGUiOiIvaG9tZS9hbnRvbnkvUHJvZ2V0dGkvSW5nbG9yaW91cyBDb2RlcnovaW5nbG9yaW91c2NvZGVyei5naXRodWIuaW8vY29tcG9uZW50cy9sb2dvL2xvZ28uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wb3NlIH0gZnJvbSAnfi91dGlscy9jb21wb3NlJ1xuXG5jb25zdCBlbmhhbmNlID0gY29tcG9zZShcbiAgUmVhY3QubWVtbyxcbiAgUmVhY3QuZm9yd2FyZFJlZixcbilcblxuZXhwb3J0IGRlZmF1bHQgZW5oYW5jZSgoeyBzaXplLCBmYWNlcywgeCwgeSB9LCByZWYpID0+IHtcbiAgY29uc3QgW2xlZnQsIHJpZ2h0XSA9IGZhY2VzXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ29cIiByZWY9e3JlZn0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImN1YmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdWJlX19mYWNlIGN1YmVfX2ZhY2UtLWxlZnRcIj5cbiAgICAgICAgICA8aW1nIHNyYz17cmVxdWlyZShgLi9mYWNlcy8ke2xlZnQuaW1hZ2V9LnN2Z2ApfSBhbHQ9e2xlZnQuaW1hZ2V9IC8+XG4gICAgICAgICAge2xlZnQuZXllICYmIChcbiAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiZXllXCIgc3JjPXtyZXF1aXJlKCcuL2V5ZS5zdmcnKX0gYWx0PVwibGVmdCBleWVcIiAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImN1YmVfX2ZhY2UgY3ViZV9fZmFjZS0tcmlnaHRcIj5cbiAgICAgICAgICA8aW1nIHNyYz17cmVxdWlyZShgLi9mYWNlcy8ke3JpZ2h0LmltYWdlfS5zdmdgKX0gYWx0PXtyaWdodC5pbWFnZX0gLz5cbiAgICAgICAgICB7cmlnaHQuZXllICYmIChcbiAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiZXllXCIgc3JjPXtyZXF1aXJlKCcuL2V5ZS5zdmcnKX0gYWx0PVwicmlnaHQgZXllXCIgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5sb2dvIHtcbiAgICAgICAgICB3aWR0aDogJHtzaXplfXB4O1xuICAgICAgICAgIHBlcnNwZWN0aXZlOiAke3NpemV9cHg7XG4gICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIH1cblxuICAgICAgICAuY3ViZSB7XG4gICAgICAgICAgaGVpZ2h0OiAke3NpemV9cHg7XG4gICAgICAgICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlWSgxLjIpIHRyYW5zbGF0ZVooJHstc2l6ZX1weClcbiAgICAgICAgICAgIHJvdGF0ZVgoJHtkZWdyZWVzVG9SYWRpYW5zKC00MCkgLSAwLjAwMSAqIHl9cmFkKVxuICAgICAgICAgICAgcm90YXRlWSgke2RlZ3JlZXNUb1JhZGlhbnMoLTQ1KSArIDAuMDAxICogeH1yYWQpO1xuICAgICAgICAgIHRyYW5zaXRpb246IGVhc2Utb3V0IDAuMnM7XG4gICAgICAgIH1cblxuICAgICAgICAuY3ViZV9fZmFjZSB7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b20gY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLmN1YmVfX2ZhY2UgPiBpbWcge1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jdWJlX19mYWNlLS1sZWZ0IHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMGRlZykgdHJhbnNsYXRlWigke3NpemUgLyAyfXB4KSBza2V3KDEyZGVnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jdWJlX19mYWNlLS1yaWdodCB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVZKDkwZGVnKSB0cmFuc2xhdGVaKCR7c2l6ZSAvIDJ9cHgpIHNrZXcoLTEyZGVnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jdWJlX19mYWNlLS1yaWdodCA+IC5leWUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgxODBkZWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmN1YmVfX2ZhY2UtLWxlZnQgPiBpbWc6Zmlyc3Qtb2YtdHlwZSB7XG4gICAgICAgICAgJHtsZWZ0LnJldmVyc2UgPyAndHJhbnNmb3JtOiByb3RhdGVZKDE4MGRlZyk7JyA6ICcnfVxuICAgICAgICB9XG5cbiAgICAgICAgLmN1YmVfX2ZhY2UtLXJpZ2h0ID4gaW1nOmZpcnN0LW9mLXR5cGUge1xuICAgICAgICAgICR7cmlnaHQucmV2ZXJzZSA/ICd0cmFuc2Zvcm06IHJvdGF0ZVkoMTgwZGVnKTsnIDogJyd9XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICA8L2Rpdj5cbiAgKVxufSlcblxuZnVuY3Rpb24gZGVncmVlc1RvUmFkaWFucyhkZWdyZWVzKSB7XG4gIHJldHVybiAoZGVncmVlcyAqIE1hdGguUEkpIC8gMTgwXG59XG4iXX0= */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/components/logo/logo.js */"),
    dynamic: [size, size, size, -size, degreesToRadians(-40) - 0.001 * y, degreesToRadians(-45) + 0.001 * x, size / 2, size / 2, left.reverse ? 'transform: rotateY(180deg);' : '', right.reverse ? 'transform: rotateY(180deg);' : ''],
    __self: this
  }));
}));

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

/***/ })

})
//# sourceMappingURL=index.js.1ff8d37c8dad2f22fec1.hot-update.js.map