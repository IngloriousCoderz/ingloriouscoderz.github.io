webpackHotUpdate("static/development/pages/blog.js",{

/***/ "./node_modules/nextein/dist/components/link.js":
/*!******************************************************!*\
  !*** ./node_modules/nextein/dist/components/link.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _link = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");

var _link2 = _interopRequireDefault(_link);

var _load = __webpack_require__(/*! ../entries/load */ "./node_modules/nextein/dist/entries/load.js");

var _load2 = _interopRequireDefault(_load);

var _map = __webpack_require__(/*! ../entries/map */ "./node_modules/nextein/dist/entries/map.js");

var _map2 = _interopRequireDefault(_map);

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/nextein/dist/components/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NexteinLink = function (_Component) {
  _inherits(NexteinLink, _Component);

  function NexteinLink() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NexteinLink);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NexteinLink.__proto__ || Object.getPrototypeOf(NexteinLink)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      href: _this.props.href,
      as: _this.props.as
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NexteinLink, [{
    key: 'componentDidMount',
    value: async function componentDidMount() {
      var all = await (0, _load2.default)();
      var map = (0, _map2.default)(all);
      var href = this.state.href;

      if (href) {
        var entry = map[href];
        if (entry) {
          this.setState({
            href: { pathname: (0, _utils.prefixed)(entry.pathname), query: entry.query },
            as: href
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          href = _state.href,
          as = _state.as;

      var _props = this.props,
          data = _props.data,
          children = _props.children,
          content = _props.content,
          raw = _props.raw,
          rest = _objectWithoutProperties(_props, ['data', 'children', 'content', 'raw']); // content & raw are not used but required to remove them from rest

      if (data) {
        var _data$page = data.page,
            page = _data$page === undefined ? 'post' : _data$page,
            _entry = data._entry,
            url = data.url;

        href = { pathname: '/' + page, query: { _entry: _entry } };
        as = url;
      }

      href = (0, _utils.prefixed)(href);
      as = (0, _utils.prefixed)(as);

      return _react2.default.createElement(
        _link2.default,
        _extends({}, rest, { href: href, as: as }),
        children
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(state, _ref2) {
      var href = _ref2.href,
          as = _ref2.as;

      if (state.href !== href) {
        return { href: href, as: as };
      }
      return null;
    }
  }]);

  return NexteinLink;
}(_react.Component);

exports.default = NexteinLink;

/***/ }),

/***/ "./node_modules/nextein/link.js":
/*!**************************************!*\
  !*** ./node_modules/nextein/link.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/components/link */ "./node_modules/nextein/dist/components/link.js")

/***/ }),

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
      className: "jsx-3346563976",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      className: "jsx-3346563976",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, post.data.title), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(nextein_post__WEBPACK_IMPORTED_MODULE_4__["Content"], _extends({}, post, {
      excerpt: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(nextein_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
      data: post.data,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      className: "jsx-3346563976",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, t('Read more >'))));
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "3346563976",
    css: "article.jsx-3346563976{margin-bottom:1rem;padding:1rem;background-color:rgba(40,44,52,0.5);}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9wYWdlcy9ibG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCZ0IsQUFHNEIsbUJBQ04sYUFDMEIsb0NBQ3pDIiwiZmlsZSI6Ii9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9wYWdlcy9ibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnbmV4dGVpbi9saW5rJ1xuaW1wb3J0IHsgd2l0aFBvc3RzRmlsdGVyQnksIGluQ2F0ZWdvcnksIHNvcnRCeURhdGUgfSBmcm9tICduZXh0ZWluL3Bvc3RzJ1xuaW1wb3J0IHsgQ29udGVudCB9IGZyb20gJ25leHRlaW4vcG9zdCdcbmltcG9ydCB7IHdpdGhJMThuIH0gZnJvbSAncmVhY3QtaTE4bmV4dCdcblxuaW1wb3J0IHsgY29tcG9zZSB9IGZyb20gJ34vdXRpbHMvY29tcG9zZSdcbmltcG9ydCBMYXlvdXQgZnJvbSAnfi9sYXlvdXRzL2RlZmF1bHQnXG5cbmNvbnN0IGVuaGFuY2UgPSBjb21wb3NlKFxuICB3aXRoUG9zdHNGaWx0ZXJCeShpbkNhdGVnb3J5KCdibG9nJykpLFxuICB3aXRoSTE4bigpLFxuKVxuZXhwb3J0IGRlZmF1bHQgZW5oYW5jZSgoeyBwb3N0cywgdCB9KSA9PiAoXG4gIDxMYXlvdXQgaGFzQmFja2dyb3VuZD17ZmFsc2V9PlxuICAgIHtwb3N0cy5zb3J0KHNvcnRCeURhdGUpLm1hcCgocG9zdCwgaW5kZXgpID0+IChcbiAgICAgIDxhcnRpY2xlIGtleT17YHBvc3QtJHtpbmRleH1gfT5cbiAgICAgICAgPGgyPntwb3N0LmRhdGEudGl0bGV9PC9oMj5cbiAgICAgICAgPENvbnRlbnQgey4uLnBvc3R9IGV4Y2VycHQgLz5cbiAgICAgICAgPExpbmsgZGF0YT17cG9zdC5kYXRhfT5cbiAgICAgICAgICA8YT57dCgnUmVhZCBtb3JlID4nKX08L2E+XG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvYXJ0aWNsZT5cbiAgICApKX1cblxuICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgIGFydGljbGUge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgICAgICBwYWRkaW5nOiAxcmVtO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQwLCA0NCwgNTIsIDAuNSk7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICA8L0xheW91dD5cbikpXG4iXX0= */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/pages/blog.js */",
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
//# sourceMappingURL=blog.js.106675707d476f7711f0.hot-update.js.map