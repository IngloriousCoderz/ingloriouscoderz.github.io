webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/button.js":
/*!******************************!*\
  !*** ./components/button.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./link */ "./components/link.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
var _jsxFileName = "/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/components/button.js";




/* harmony default export */ __webpack_exports__["default"] = (Object(react_i18next__WEBPACK_IMPORTED_MODULE_3__["withI18n"])()(function (_ref) {
  var t = _ref.t,
      id = _ref.id,
      to = _ref.to,
      href = _ref.href,
      target = _ref.target,
      rel = _ref.rel,
      onClick = _ref.onClick,
      title = _ref.title,
      ariaLabel = _ref.ariaLabel,
      children = _ref.children;
  var Component = target || onClick ? 'a' : _link__WEBPACK_IMPORTED_MODULE_2__["default"];
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component, {
    href: to || href || "/".concat(id),
    target: target,
    rel: rel,
    onClick: onClick,
    ariaLabel: ariaLabel,
    className: "jsx-2096718123" + " " + "button",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, children && typeof children !== 'string' ? children : t(title || children), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "2096718123",
    css: ".button.jsx-2096718123{-webkit-flex:1;-ms-flex:1;flex:1;background-color:rgba(40,44,52,0.5);margin:0.25rem;border:1px solid #429aef;padding:0.25rem 0.5rem;text-transform:uppercase;line-height:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}div.jsx-2096718123{height:100%;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9jb21wb25lbnRzL2J1dHRvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQm9CLEFBR29CLEFBYUssWUFDZCxxQkFieUMsb0NBQ3hCLGVBQ1UseUJBQ0YsdUJBQ0UseUJBQ1gsY0FDRCwwRUFDVSxtR0FDSiw2RkFDckIiLCJmaWxlIjoiL2hvbWUvYW50b255L1Byb2dldHRpL0luZ2xvcmlvdXMgQ29kZXJ6L2luZ2xvcmlvdXNjb2RlcnouZ2l0aHViLmlvL2NvbXBvbmVudHMvYnV0dG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnfi9jb21wb25lbnRzL2xpbmsnXG5pbXBvcnQgeyB3aXRoSTE4biB9IGZyb20gJ3JlYWN0LWkxOG5leHQnXG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhJMThuKCkoXG4gICh7IHQsIGlkLCB0bywgaHJlZiwgdGFyZ2V0LCByZWwsIG9uQ2xpY2ssIHRpdGxlLCBhcmlhTGFiZWwsIGNoaWxkcmVuIH0pID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSB0YXJnZXQgfHwgb25DbGljayA/ICdhJyA6IExpbmtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICBocmVmPXt0byB8fCBocmVmIHx8IGAvJHtpZH1gfVxuICAgICAgICB0YXJnZXQ9e3RhcmdldH1cbiAgICAgICAgcmVsPXtyZWx9XG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgIGFyaWFMYWJlbD17YXJpYUxhYmVsfVxuICAgICAgICBjbGFzc05hbWU9XCJidXR0b25cIj5cbiAgICAgICAge2NoaWxkcmVuICYmIHR5cGVvZiBjaGlsZHJlbiAhPT0gJ3N0cmluZydcbiAgICAgICAgICA/IGNoaWxkcmVuXG4gICAgICAgICAgOiB0KHRpdGxlIHx8IGNoaWxkcmVuKX1cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgIC5idXR0b24ge1xuICAgICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDAsIDQ0LCA1MiwgMC41KTtcbiAgICAgICAgICAgIG1hcmdpbjogMC4yNXJlbTtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICM0MjlhZWY7XG4gICAgICAgICAgICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbTtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGl2IHtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgIClcbiAgfSxcbilcbiJdfQ== */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/components/button.js */",
    __self: this
  }));
}));

/***/ })

})
//# sourceMappingURL=index.js.b5f5c1602c421b86627a.hot-update.js.map