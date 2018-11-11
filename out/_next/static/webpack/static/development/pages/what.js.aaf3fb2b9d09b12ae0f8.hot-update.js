webpackHotUpdate("static/development/pages/what.js",{

/***/ "./components/button.js":
/*!******************************!*\
  !*** ./components/button.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ext_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ext-link */ "./components/ext-link.js");
var _jsxFileName = "/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/components/button.js";





var Button = function Button(_ref) {
  var id = _ref.id,
      href = _ref.href,
      target = _ref.target,
      rel = _ref.rel,
      onClick = _ref.onClick,
      title = _ref.title,
      children = _ref.children,
      t = _ref.t;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: href || "/".concat(id),
    target: target,
    rel: rel,
    onClick: onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, t(title || children));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_i18next__WEBPACK_IMPORTED_MODULE_2__["withI18n"])()(function (props) {
  var id = props.id,
      href = props.href,
      target = props.target,
      onClick = props.onClick;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, target ? Object(_ext_link__WEBPACK_IMPORTED_MODULE_3__["default"])(props) : onClick ? Button(props) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    prefetch: true,
    href: href || "/".concat(id),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, Button(props)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("style", {
    jsx: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, "\n        a {\n          flex: 1;\n          background-color: rgba(40, 44, 52, 0.5);\n          margin: 0.25rem;\n          border: 1px solid #429aef;\n          padding: 0.25rem;\n          text-transform: uppercase;\n        }\n      "));
}));

/***/ })

})
//# sourceMappingURL=what.js.aaf3fb2b9d09b12ae0f8.hot-update.js.map