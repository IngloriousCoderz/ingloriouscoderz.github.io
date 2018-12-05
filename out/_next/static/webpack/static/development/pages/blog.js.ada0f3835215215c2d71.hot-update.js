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
/* harmony import */ var nextein_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nextein/link */ "./node_modules/nextein/link.js");
/* harmony import */ var nextein_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nextein_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nextein_posts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nextein/posts */ "./node_modules/nextein/posts.js");
/* harmony import */ var nextein_posts__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nextein_posts__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nextein_post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nextein/post */ "./node_modules/nextein/post.js");
/* harmony import */ var nextein_post__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nextein_post__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _utils_compose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/compose */ "./utils/compose.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/i18n */ "./utils/i18n.js");
/* harmony import */ var _layouts_default__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../layouts/default */ "./layouts/default/index.js");
/* harmony import */ var _components_ext_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/ext-link */ "./components/ext-link.js");
/* harmony import */ var _components_pre__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/pre */ "./components/pre.js");
var _jsxFileName = "/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/pages/blog.js";



function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }










var enhance = Object(_utils_compose__WEBPACK_IMPORTED_MODULE_6__["compose"])(Object(nextein_posts__WEBPACK_IMPORTED_MODULE_3__["withPostsFilterBy"])(Object(nextein_posts__WEBPACK_IMPORTED_MODULE_3__["inCategory"])('blog')), Object(react_i18next__WEBPACK_IMPORTED_MODULE_5__["withI18n"])());
/* harmony default export */ __webpack_exports__["default"] = (enhance(function (_ref) {
  var posts = _ref.posts,
      t = _ref.t;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_layouts_default__WEBPACK_IMPORTED_MODULE_8__["default"], {
    hasBackground: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("article", {
    className: "jsx-2421455553" + " " + "card card-1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
    className: "jsx-2421455553",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, "Blog"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
    className: "jsx-2421455553",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, "This is where we share some of our experiences with software and entrepreneurship in general.")), posts.sort(nextein_posts__WEBPACK_IMPORTED_MODULE_3__["sortByDate"]).map(function (post, index) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("article", {
      key: "post-".concat(index),
      className: "jsx-2421455553" + " " + "card card-1",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
      className: "jsx-2421455553",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    }, post.data.title), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("time", {
      dateTime: post.data.date,
      className: "jsx-2421455553",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: this
    }, new Date(post.data.date).toLocaleDateString(_utils_i18n__WEBPACK_IMPORTED_MODULE_7__["default"].language)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(nextein_post__WEBPACK_IMPORTED_MODULE_4__["Content"], _extends({}, post, {
      excerpt: true,
      renderers: {
        a: _components_ext_link__WEBPACK_IMPORTED_MODULE_9__["default"],
        pre: _components_pre__WEBPACK_IMPORTED_MODULE_10__["default"]
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
      className: "jsx-2421455553" + " " + "text-right",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(nextein_link__WEBPACK_IMPORTED_MODULE_2___default.a, _extends({}, post, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      className: "jsx-2421455553",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: this
    }, t('read more›')))));
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "2421455553",
    css: "article.jsx-2421455553>time.jsx-2421455553{display:block;margin-top:-0.5rem;margin-bottom:1rem;color:#9a9a9a;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9wYWdlcy9ibG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStDZ0IsQUFHdUIsY0FDSyxtQkFDQSxtQkFDTCxjQUNoQiIsImZpbGUiOiIvaG9tZS9hbnRvbnkvUHJvZ2V0dGkvSW5nbG9yaW91cyBDb2RlcnovaW5nbG9yaW91c2NvZGVyei5naXRodWIuaW8vcGFnZXMvYmxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gJ25leHRlaW4vbGluaydcbmltcG9ydCB7IHdpdGhQb3N0c0ZpbHRlckJ5LCBpbkNhdGVnb3J5LCBzb3J0QnlEYXRlIH0gZnJvbSAnbmV4dGVpbi9wb3N0cydcbmltcG9ydCB7IENvbnRlbnQgfSBmcm9tICduZXh0ZWluL3Bvc3QnXG5pbXBvcnQgeyB3aXRoSTE4biB9IGZyb20gJ3JlYWN0LWkxOG5leHQnXG5cbmltcG9ydCB7IGNvbXBvc2UgfSBmcm9tICd+L3V0aWxzL2NvbXBvc2UnXG5pbXBvcnQgaTE4biBmcm9tICd+L3V0aWxzL2kxOG4nXG5pbXBvcnQgTGF5b3V0IGZyb20gJ34vbGF5b3V0cy9kZWZhdWx0J1xuaW1wb3J0IEV4dExpbmsgZnJvbSAnfi9jb21wb25lbnRzL2V4dC1saW5rJ1xuaW1wb3J0IFByZSBmcm9tICd+L2NvbXBvbmVudHMvcHJlJ1xuXG5jb25zdCBlbmhhbmNlID0gY29tcG9zZShcbiAgd2l0aFBvc3RzRmlsdGVyQnkoaW5DYXRlZ29yeSgnYmxvZycpKSxcbiAgd2l0aEkxOG4oKSxcbilcbmV4cG9ydCBkZWZhdWx0IGVuaGFuY2UoKHsgcG9zdHMsIHQgfSkgPT4gKFxuICA8TGF5b3V0IGhhc0JhY2tncm91bmQ9e2ZhbHNlfT5cbiAgICA8YXJ0aWNsZSBjbGFzc05hbWU9XCJjYXJkIGNhcmQtMVwiPlxuICAgICAgPGgxPkJsb2c8L2gxPlxuICAgICAgPHA+XG4gICAgICAgIFRoaXMgaXMgd2hlcmUgd2Ugc2hhcmUgc29tZSBvZiBvdXIgZXhwZXJpZW5jZXMgd2l0aCBzb2Z0d2FyZSBhbmRcbiAgICAgICAgZW50cmVwcmVuZXVyc2hpcCBpbiBnZW5lcmFsLlxuICAgICAgPC9wPlxuICAgIDwvYXJ0aWNsZT5cblxuICAgIHtwb3N0cy5zb3J0KHNvcnRCeURhdGUpLm1hcCgocG9zdCwgaW5kZXgpID0+IChcbiAgICAgIDxhcnRpY2xlIGtleT17YHBvc3QtJHtpbmRleH1gfSBjbGFzc05hbWU9XCJjYXJkIGNhcmQtMVwiPlxuICAgICAgICA8aDE+e3Bvc3QuZGF0YS50aXRsZX08L2gxPlxuICAgICAgICA8dGltZSBkYXRlVGltZT17cG9zdC5kYXRhLmRhdGV9PlxuICAgICAgICAgIHtuZXcgRGF0ZShwb3N0LmRhdGEuZGF0ZSkudG9Mb2NhbGVEYXRlU3RyaW5nKGkxOG4ubGFuZ3VhZ2UpfVxuICAgICAgICA8L3RpbWU+XG4gICAgICAgIDxDb250ZW50XG4gICAgICAgICAgey4uLnBvc3R9XG4gICAgICAgICAgZXhjZXJwdFxuICAgICAgICAgIHJlbmRlcmVycz17e1xuICAgICAgICAgICAgYTogRXh0TGluayxcbiAgICAgICAgICAgIHByZTogUHJlLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICA8TGluayB7Li4ucG9zdH0+XG4gICAgICAgICAgICA8YT57dCgncmVhZCBtb3Jl4oC6Jyl9PC9hPlxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgPC9wPlxuICAgICAgPC9hcnRpY2xlPlxuICAgICkpfVxuXG4gICAgPHN0eWxlIGpzeD57YFxuICAgICAgYXJ0aWNsZSA+IHRpbWUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbWFyZ2luLXRvcDogLTAuNXJlbTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgICAgICAgY29sb3I6ICM5YTlhOWE7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICA8L0xheW91dD5cbikpXG4iXX0= */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/pages/blog.js */",
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
//# sourceMappingURL=blog.js.ada0f3835215215c2d71.hot-update.js.map