webpackHotUpdate("static\\development\\pages\\_app.js",{

/***/ "./hoc/withGA.js":
/*!***********************!*\
  !*** ./hoc/withGA.js ***!
  \***********************/
/*! exports provided: withGA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withGA", function() { return withGA; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "C:\\Users\\anton\\Projects\\ingloriouscoderz.github.io\\hoc\\withGA.js";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


var withGA = function withGA(code, Router) {
  return function (Enhanced) {
    function WithGA(props) {
      Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
        window.dataLayer = window.dataLayer || [];

        function gtag() {
          window.dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'G-1VTZM56KYZ');
      }, []);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Enhanced, _extends({}, props, {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15,
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

/***/ })

})
//# sourceMappingURL=_app.js.5827c4b9ef004accd236.hot-update.js.map