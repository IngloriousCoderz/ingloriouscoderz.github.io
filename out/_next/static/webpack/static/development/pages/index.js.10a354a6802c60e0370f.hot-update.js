webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/icy/index.js":
/*!*********************************!*\
  !*** ./components/icy/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icy */ "./components/icy/icy.js");
var _this = undefined,
    _jsxFileName = "/home/antony/Projects/Inglorious Coderz/ingloriouscoderz.github.io/components/icy/index.js";



function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var MAX_HEAD_TILT_X = 400;
var MAX_HEAD_TILT_Y = 400;
/* harmony default export */ __webpack_exports__["default"] = (Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(function (_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 64 : _ref$size,
      _ref$faces = _ref.faces,
      faces = _ref$faces === void 0 ? [{
    image: 'I',
    reverse: false,
    eye: true
  }, {
    image: 'C',
    reverse: false,
    eye: false
  }] : _ref$faces,
      _ref$preventScroll = _ref.preventScroll,
      preventScroll = _ref$preventScroll === void 0 ? false : _ref$preventScroll;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    x: 0,
    y: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      coords = _useState2[0],
      setCoords = _useState2[1];

  var logo = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  var center = null;
  var moveEvent = null;

  var onMove = function onMove(event) {
    var _ref2 = moveEvent === 'touchmove' ? event.touches[0] : event,
        target = _ref2.target,
        pageX = _ref2.pageX,
        pageY = _ref2.pageY;

    if (preventScroll && closestAncestor(target, 'logo')) {
      event.preventDefault();
    }

    setCoords({
      x: saturate(pageX - center.x, MAX_HEAD_TILT_X),
      y: saturate(pageY - center.y, MAX_HEAD_TILT_Y)
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var _logo$current$getBoun = logo.current.getBoundingClientRect(),
        left = _logo$current$getBoun.left,
        top = _logo$current$getBoun.top,
        width = _logo$current$getBoun.width,
        height = _logo$current$getBoun.height;

    center = {
      x: window.pageXOffset + left + width / 2,
      y: window.pageYOffset + top + height / 2
    };
    moveEvent = isTouchDevice() ? 'touchmove' : 'mousemove';
    document.addEventListener(moveEvent, onMove, {
      passive: !preventScroll
    });
    return function () {
      document.removeEventListener(moveEvent, onMove);
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_icy__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
    size: size,
    faces: faces
  }, coords, {
    ref: logo,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 12
    }
  }));
}));

function isTouchDevice() {
  if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  } // include the 'heartz' as a way to have a non matching mediaQuery to help terminate the join
  // https://git.io/vznFH


  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return window.matchMedia(query).matches;
}

function saturate(num, limit) {
  if (num < -limit) return -limit;
  if (num > limit) return limit;
  return num;
}

function closestAncestor(el, className) {
  var limit = 4;
  var i = 0;
  var closest = el;

  while (closest && i < limit) {
    if (closest.className == null || typeof closest.className.split !== 'function') {
      return null;
    }

    var classes = closest.className.split(' ');

    if (classes.includes(className)) {
      return closest;
    }

    closest = closest.parentNode;
    i++;
  }
}

/***/ })

})
//# sourceMappingURL=index.js.10a354a6802c60e0370f.hot-update.js.map