webpackHotUpdate("static/development/pages/blog.js",{

/***/ "./pages/blog.js":
/*!***********************!*\
  !*** ./pages/blog.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nextein_posts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nextein/posts */ "./node_modules/nextein/posts.js");
/* harmony import */ var nextein_posts__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nextein_posts__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nextein_post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nextein/post */ "./node_modules/nextein/post.js");
/* harmony import */ var nextein_post__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nextein_post__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _utils_compose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/compose */ "./utils/compose.js");
/* harmony import */ var _layouts_default__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../layouts/default */ "./layouts/default/index.js");
var _jsxFileName = "/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/pages/blog.js";



function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







var enhance = Object(_utils_compose__WEBPACK_IMPORTED_MODULE_6__["compose"])(Object(nextein_posts__WEBPACK_IMPORTED_MODULE_3__["withPostsFilterBy"])(Object(nextein_posts__WEBPACK_IMPORTED_MODULE_3__["inCategory"])('blog')), Object(react_i18next__WEBPACK_IMPORTED_MODULE_5__["withI18n"])());
/* harmony default export */ __webpack_exports__["default"] = (enhance(function (_ref) {
  var posts = _ref.posts,
      t = _ref.t;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_layouts_default__WEBPACK_IMPORTED_MODULE_7__["default"], {
    hasBackground: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, posts.sort(nextein_posts__WEBPACK_IMPORTED_MODULE_3__["sortByDate"]).map(function (post, index) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("article", {
      key: "post-".concat(index),
      className: "jsx-3623041514" + " " + "card card-1",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      className: "jsx-3623041514",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, post.data.title, " ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("small", {
      className: "jsx-3623041514",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, post.data.date)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(nextein_post__WEBPACK_IMPORTED_MODULE_4__["Content"], _extends({}, post, {
      excerpt: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
      className: "jsx-3623041514" + " " + "read-more",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
      href: post.data.url,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      className: "jsx-3623041514",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: this
    }, t('read more...')))));
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "3623041514",
    css: "article.jsx-3623041514{margin-bottom:1rem;padding:1rem;background-color:rgba(40,44,52,0.5);}.read-more.jsx-3623041514{text-align:right;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9wYWdlcy9ibG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRCZ0IsQUFHNEIsQUFNRixpQkFDbkIsRUFOZSxhQUMwQixvQ0FDekMiLCJmaWxlIjoiL2hvbWUvYW50b255L1Byb2dldHRpL0luZ2xvcmlvdXMgQ29kZXJ6L2luZ2xvcmlvdXNjb2RlcnouZ2l0aHViLmlvL3BhZ2VzL2Jsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5pbXBvcnQgeyB3aXRoUG9zdHNGaWx0ZXJCeSwgaW5DYXRlZ29yeSwgc29ydEJ5RGF0ZSB9IGZyb20gJ25leHRlaW4vcG9zdHMnXG5pbXBvcnQgeyBDb250ZW50IH0gZnJvbSAnbmV4dGVpbi9wb3N0J1xuaW1wb3J0IHsgd2l0aEkxOG4gfSBmcm9tICdyZWFjdC1pMThuZXh0J1xuXG5pbXBvcnQgeyBjb21wb3NlIH0gZnJvbSAnfi91dGlscy9jb21wb3NlJ1xuaW1wb3J0IExheW91dCBmcm9tICd+L2xheW91dHMvZGVmYXVsdCdcblxuY29uc3QgZW5oYW5jZSA9IGNvbXBvc2UoXG4gIHdpdGhQb3N0c0ZpbHRlckJ5KGluQ2F0ZWdvcnkoJ2Jsb2cnKSksXG4gIHdpdGhJMThuKCksXG4pXG5leHBvcnQgZGVmYXVsdCBlbmhhbmNlKCh7IHBvc3RzLCB0IH0pID0+IChcbiAgPExheW91dCBoYXNCYWNrZ3JvdW5kPXtmYWxzZX0+XG4gICAge3Bvc3RzLnNvcnQoc29ydEJ5RGF0ZSkubWFwKChwb3N0LCBpbmRleCkgPT4gKFxuICAgICAgPGFydGljbGUga2V5PXtgcG9zdC0ke2luZGV4fWB9IGNsYXNzTmFtZT1cImNhcmQgY2FyZC0xXCI+XG4gICAgICAgIDxoMj5cbiAgICAgICAgICB7cG9zdC5kYXRhLnRpdGxlfSA8c21hbGw+e3Bvc3QuZGF0YS5kYXRlfTwvc21hbGw+XG4gICAgICAgIDwvaDI+XG4gICAgICAgIDxDb250ZW50IHsuLi5wb3N0fSBleGNlcnB0IC8+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInJlYWQtbW9yZVwiPlxuICAgICAgICAgIDxMaW5rIGhyZWY9e3Bvc3QuZGF0YS51cmx9PlxuICAgICAgICAgICAgPGE+e3QoJ3JlYWQgbW9yZS4uLicpfTwvYT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvcD5cbiAgICAgIDwvYXJ0aWNsZT5cbiAgICApKX1cblxuICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgIGFydGljbGUge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgICAgICBwYWRkaW5nOiAxcmVtO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQwLCA0NCwgNTIsIDAuNSk7XG4gICAgICB9XG5cbiAgICAgIC5yZWFkLW1vcmUge1xuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgIH1cbiAgICBgfTwvc3R5bGU+XG4gIDwvTGF5b3V0PlxuKSlcbiJdfQ== */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/pages/blog.js */",
    __self: this
  }));
}));
    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/blog")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=blog.js.060a37a3c508e0e83a0c.hot-update.js.map