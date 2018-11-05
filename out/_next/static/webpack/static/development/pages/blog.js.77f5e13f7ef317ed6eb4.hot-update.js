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
      className: "jsx-3648071407" + " " + "card card-1",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      className: "jsx-3648071407",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, post.data.title), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("time", {
      dateTime: post.data.date,
      className: "jsx-3648071407",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, new Date(post.data.date).toLocaleDateString()), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(nextein_post__WEBPACK_IMPORTED_MODULE_4__["Content"], _extends({}, post, {
      excerpt: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
      className: "jsx-3648071407" + " " + "read-more",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
      href: post.data.url,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      className: "jsx-3648071407",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      },
      __self: this
    }, t('read more...')))));
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "3648071407",
    css: "article.jsx-3648071407{margin-bottom:1rem;}article.jsx-3648071407>time.jsx-3648071407{display:block;margin-top:-0.5rem;margin-bottom:1rem;color:#9a9a9a;}article.jsx-3648071407>.read-more.jsx-3648071407{text-align:right;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9wYWdlcy9ibG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZCZ0IsQUFHNEIsQUFNTCxBQU9HLGNBTkUsR0FPckIsRUFYQSxjQUtxQixtQkFDTCxjQUNoQiIsImZpbGUiOiIvaG9tZS9hbnRvbnkvUHJvZ2V0dGkvSW5nbG9yaW91cyBDb2RlcnovaW5nbG9yaW91c2NvZGVyei5naXRodWIuaW8vcGFnZXMvYmxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluaydcbmltcG9ydCB7IHdpdGhQb3N0c0ZpbHRlckJ5LCBpbkNhdGVnb3J5LCBzb3J0QnlEYXRlIH0gZnJvbSAnbmV4dGVpbi9wb3N0cydcbmltcG9ydCB7IENvbnRlbnQgfSBmcm9tICduZXh0ZWluL3Bvc3QnXG5pbXBvcnQgeyB3aXRoSTE4biB9IGZyb20gJ3JlYWN0LWkxOG5leHQnXG5cbmltcG9ydCB7IGNvbXBvc2UgfSBmcm9tICd+L3V0aWxzL2NvbXBvc2UnXG5pbXBvcnQgTGF5b3V0IGZyb20gJ34vbGF5b3V0cy9kZWZhdWx0J1xuXG5jb25zdCBlbmhhbmNlID0gY29tcG9zZShcbiAgd2l0aFBvc3RzRmlsdGVyQnkoaW5DYXRlZ29yeSgnYmxvZycpKSxcbiAgd2l0aEkxOG4oKSxcbilcbmV4cG9ydCBkZWZhdWx0IGVuaGFuY2UoKHsgcG9zdHMsIHQgfSkgPT4gKFxuICA8TGF5b3V0IGhhc0JhY2tncm91bmQ9e2ZhbHNlfT5cbiAgICB7cG9zdHMuc29ydChzb3J0QnlEYXRlKS5tYXAoKHBvc3QsIGluZGV4KSA9PiAoXG4gICAgICA8YXJ0aWNsZSBrZXk9e2Bwb3N0LSR7aW5kZXh9YH0gY2xhc3NOYW1lPVwiY2FyZCBjYXJkLTFcIj5cbiAgICAgICAgPGgyPntwb3N0LmRhdGEudGl0bGV9PC9oMj5cbiAgICAgICAgPHRpbWUgZGF0ZVRpbWU9e3Bvc3QuZGF0YS5kYXRlfT5cbiAgICAgICAgICB7bmV3IERhdGUocG9zdC5kYXRhLmRhdGUpLnRvTG9jYWxlRGF0ZVN0cmluZygpfVxuICAgICAgICA8L3RpbWU+XG4gICAgICAgIDxDb250ZW50IHsuLi5wb3N0fSBleGNlcnB0IC8+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInJlYWQtbW9yZVwiPlxuICAgICAgICAgIDxMaW5rIGhyZWY9e3Bvc3QuZGF0YS51cmx9PlxuICAgICAgICAgICAgPGE+e3QoJ3JlYWQgbW9yZS4uLicpfTwvYT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvcD5cbiAgICAgIDwvYXJ0aWNsZT5cbiAgICApKX1cblxuICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgIGFydGljbGUge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgICAgICAvLyBwYWRkaW5nOiAxcmVtO1xuICAgICAgICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQwLCA0NCwgNTIsIDAuNSk7XG4gICAgICB9XG5cbiAgICAgIGFydGljbGUgPiB0aW1lIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1hcmdpbi10b3A6IC0wLjVyZW07XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgICAgIGNvbG9yOiAjOWE5YTlhO1xuICAgICAgfVxuXG4gICAgICBhcnRpY2xlID4gLnJlYWQtbW9yZSB7XG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgPC9MYXlvdXQ+XG4pKVxuIl19 */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/pages/blog.js */",
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
//# sourceMappingURL=blog.js.77f5e13f7ef317ed6eb4.hot-update.js.map