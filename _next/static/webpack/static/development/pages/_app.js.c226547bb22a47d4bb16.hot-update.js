webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./pages/hoc/withGA.js":
/*!*****************************!*\
  !*** ./pages/hoc/withGA.js ***!
  \*****************************/
/*! exports provided: withGA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withGA", function() { return withGA; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/home/antony/Projects/Inglorious Coderz/ingloriouscoderz.github.io/pages/hoc/withGA.js";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


var IS_BROWSER = typeof window !== 'undefined';
var GA_LOCAL_STORAGE_KEY = 'ga:clientId';
var withGA = function withGA(code, Router) {
  return function (Enhanced) {
    function WithGA(props) {
      Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
        if (!IS_BROWSER || window._ga_initialized) return;

        (function (i, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r;
          i[r] = i[r] || function () {
            ;
            (i[r].q = i[r].q || []).push(arguments);
          }, i[r].l = 1 * new Date();
          a = s.createElement(o), m = s.getElementsByTagName(o)[0];
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m);
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

        ga('create', code, {
          storage: 'none',
          clientId: localStorage.getItem(GA_LOCAL_STORAGE_KEY)
        });
        ga(function (tracker) {
          localStorage.setItem(GA_LOCAL_STORAGE_KEY, tracker.get('clientId'));
        });
        window._ga_initialized = true;
        pageview();
        var previousCallback = Router.onRouteChangeComplete;

        Router.onRouteChangeComplete = function () {
          if (typeof previousCallback === 'function') {
            previousCallback();
          }

          pageview();
        };
      }, []);

      var pageview = function pageview() {
        var _location = location,
            pathname = _location.pathname,
            search = _location.search;
        ga('send', 'pageview', pathname + search);
      };

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Enhanced, _extends({}, props, {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 12
        }
      }));
    }

    WithGA.getInitialProps = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var getEnhancedInitialProps,
          _args = arguments;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              getEnhancedInitialProps = Enhanced.getInitialProps;

              if (!getEnhancedInitialProps) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return getEnhancedInitialProps.apply(void 0, _args);

            case 4:
              _context.t0 = _context.sent;
              _context.next = 8;
              break;

            case 7:
              _context.t0 = {};

            case 8:
              return _context.abrupt("return", _context.t0);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return WithGA;
  };
};
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
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/hoc/withGA")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=_app.js.c226547bb22a47d4bb16.hot-update.js.map