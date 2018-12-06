webpackHotUpdate("static/development/pages/logo.js",{

/***/ "./pages/logo.js":
/*!***********************!*\
  !*** ./pages/logo.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _layouts_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layouts/default */ "./layouts/default/index.js");
/* harmony import */ var _components_row__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/row */ "./components/row.js");
/* harmony import */ var _components_logo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/logo */ "./components/logo/index.js");
var _jsxFileName = "/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/pages/logo.js";



function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var availableImages = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var _default =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(_default, _PureComponent);

  function _default() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_default)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      faces: [{
        image: 'A',
        reverse: false,
        eye: true
      }, {
        image: 'A',
        reverse: false,
        eye: true
      }]
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "changeFeature", function (feature) {
      return function (which) {
        return function (event) {
          var _event$target = event.target,
              checked = _event$target.checked,
              value = _event$target.value;
          var isCheckbox = value === 'on';

          _this.setState(function (_ref) {
            var faces = _ref.faces;
            return {
              faces: faces.map(function (face, index) {
                return index === which ? _objectSpread({}, face, _defineProperty({}, feature, isCheckbox ? checked : value)) : face;
              })
            };
          });
        };
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "changeLetter", _this.changeFeature('image'));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "changeReverse", _this.changeFeature('reverse'));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "changeEye", _this.changeFeature('eye'));

    return _this;
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      var faces = this.state.faces;

      var _faces = _slicedToArray(faces, 2),
          left = _faces[0],
          right = _faces[1];

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_layouts_default__WEBPACK_IMPORTED_MODULE_2__["default"], {
        path: "logo",
        title: "Logo",
        description: "",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_row__WEBPACK_IMPORTED_MODULE_3__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-12 col-md-4",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", {
        className: "jsx-2406577514" + " " + "card card-1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      }, "Create your own Inglorious logo!"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        },
        __self: this
      }, "Simply play with the parameters below and see it live!"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_row__WEBPACK_IMPORTED_MODULE_3__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        },
        __self: this
      }, "First image:")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
        autoFocus: true,
        value: left.image,
        onChange: this.changeLetter(0),
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        },
        __self: this
      }, availableImages.map(function (image) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
          key: image,
          className: "jsx-2406577514",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 85
          },
          __self: this
        }, image);
      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        },
        __self: this
      }, "Reverse:")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        type: "checkbox",
        checked: left.reverse,
        onChange: this.changeReverse(0),
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }, "Eye:")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        type: "checkbox",
        checked: left.eye,
        onChange: this.changeEye(0),
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_row__WEBPACK_IMPORTED_MODULE_3__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, "Second image:")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
        value: right.image,
        onChange: this.changeLetter(1),
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }, availableImages.map(function (image) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
          key: image,
          className: "jsx-2406577514",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 120
          },
          __self: this
        }, image);
      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }, "Reverse:")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        type: "checkbox",
        checked: right.reverse,
        onChange: this.changeReverse(1),
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        },
        __self: this
      }, "Eye:")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        type: "checkbox",
        checked: right.eye,
        onChange: this.changeEye(1),
        className: "jsx-2406577514",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        },
        __self: this
      })))))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-2406577514" + " " + "col-xs-12 col-md-8",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 151
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", {
        className: "jsx-2406577514" + " " + "card card-1 logo-container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 152
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_logo__WEBPACK_IMPORTED_MODULE_4__["default"], {
        size: 280,
        faces: faces,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 153
        },
        __self: this
      })))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
        styleId: "2406577514",
        css: ".logo-container.jsx-2406577514{margin-bottom:3.5rem;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9wYWdlcy9sb2dvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZKb0IsQUFHa0MscUJBQ3ZCIiwiZmlsZSI6Ii9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9wYWdlcy9sb2dvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgTGF5b3V0IGZyb20gJ34vbGF5b3V0cy9kZWZhdWx0J1xuaW1wb3J0IFJvdyBmcm9tICd+L2NvbXBvbmVudHMvcm93J1xuaW1wb3J0IExvZ28gZnJvbSAnfi9jb21wb25lbnRzL2xvZ28nXG5cbmNvbnN0IGF2YWlsYWJsZUltYWdlcyA9IFtcbiAgJ0EnLFxuICAnQicsXG4gICdDJyxcbiAgJ0QnLFxuICAnRScsXG4gICdGJyxcbiAgJ0cnLFxuICAnSCcsXG4gICdJJyxcbiAgJ0onLFxuICAnSycsXG4gICdMJyxcbiAgJ00nLFxuICAnTicsXG4gICdPJyxcbiAgJ1AnLFxuICAnUScsXG4gICdSJyxcbiAgJ1MnLFxuICAnVCcsXG4gICdVJyxcbiAgJ1YnLFxuICAnVycsXG4gICdYJyxcbiAgJ1knLFxuICAnWicsXG5dXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRlID0ge1xuICAgIGZhY2VzOiBbXG4gICAgICB7IGltYWdlOiAnQScsIHJldmVyc2U6IGZhbHNlLCBleWU6IHRydWUgfSxcbiAgICAgIHsgaW1hZ2U6ICdBJywgcmV2ZXJzZTogZmFsc2UsIGV5ZTogdHJ1ZSB9LFxuICAgIF0sXG4gIH1cblxuICBjaGFuZ2VGZWF0dXJlID0gZmVhdHVyZSA9PiB3aGljaCA9PiBldmVudCA9PiB7XG4gICAgY29uc3QgeyBjaGVja2VkLCB2YWx1ZSB9ID0gZXZlbnQudGFyZ2V0XG4gICAgY29uc3QgaXNDaGVja2JveCA9IHZhbHVlID09PSAnb24nXG5cbiAgICB0aGlzLnNldFN0YXRlKCh7IGZhY2VzIH0pID0+ICh7XG4gICAgICBmYWNlczogZmFjZXMubWFwKChmYWNlLCBpbmRleCkgPT5cbiAgICAgICAgaW5kZXggPT09IHdoaWNoXG4gICAgICAgICAgPyB7IC4uLmZhY2UsIFtmZWF0dXJlXTogaXNDaGVja2JveCA/IGNoZWNrZWQgOiB2YWx1ZSB9XG4gICAgICAgICAgOiBmYWNlLFxuICAgICAgKSxcbiAgICB9KSlcbiAgfVxuXG4gIGNoYW5nZUxldHRlciA9IHRoaXMuY2hhbmdlRmVhdHVyZSgnaW1hZ2UnKVxuICBjaGFuZ2VSZXZlcnNlID0gdGhpcy5jaGFuZ2VGZWF0dXJlKCdyZXZlcnNlJylcbiAgY2hhbmdlRXllID0gdGhpcy5jaGFuZ2VGZWF0dXJlKCdleWUnKVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGZhY2VzIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgW2xlZnQsIHJpZ2h0XSA9IGZhY2VzXG5cbiAgICByZXR1cm4gKFxuICAgICAgPExheW91dCBwYXRoPVwibG9nb1wiIHRpdGxlPVwiTG9nb1wiIGRlc2NyaXB0aW9uPVwiXCI+XG4gICAgICAgIDxSb3c+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLW1kLTRcIj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImNhcmQgY2FyZC0xXCI+XG4gICAgICAgICAgICAgIDxoMT5DcmVhdGUgeW91ciBvd24gSW5nbG9yaW91cyBsb2dvITwvaDE+XG5cbiAgICAgICAgICAgICAgPHA+U2ltcGx5IHBsYXkgd2l0aCB0aGUgcGFyYW1ldGVycyBiZWxvdyBhbmQgc2VlIGl0IGxpdmUhPC9wPlxuXG4gICAgICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgICAgIDxSb3c+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5GaXJzdCBpbWFnZTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bGVmdC5pbWFnZX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VMZXR0ZXIoMCl9PlxuICAgICAgICAgICAgICAgICAgICAgIHthdmFpbGFibGVJbWFnZXMubWFwKGltYWdlID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtpbWFnZX0+e2ltYWdlfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5SZXZlcnNlOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtsZWZ0LnJldmVyc2V9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlUmV2ZXJzZSgwKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5FeWU6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2xlZnQuZXllfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZUV5ZSgwKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvUm93PlxuXG4gICAgICAgICAgICAgICAgPFJvdz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNlY29uZCBpbWFnZTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e3JpZ2h0LmltYWdlfSBvbkNoYW5nZT17dGhpcy5jaGFuZ2VMZXR0ZXIoMSl9PlxuICAgICAgICAgICAgICAgICAgICAgIHthdmFpbGFibGVJbWFnZXMubWFwKGltYWdlID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtpbWFnZX0+e2ltYWdlfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5SZXZlcnNlOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtyaWdodC5yZXZlcnNlfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZVJldmVyc2UoMSl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+RXllOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtyaWdodC5leWV9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlRXllKDEpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1tZC04XCI+XG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJjYXJkIGNhcmQtMSBsb2dvLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICA8TG9nbyBzaXplPXsyODB9IGZhY2VzPXtmYWNlc30gLz5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Sb3c+XG5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgIC5sb2dvLWNvbnRhaW5lciB7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAzLjVyZW07XG4gICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICA8L0xheW91dD5cbiAgICApXG4gIH1cbn1cbiJdfQ== */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/pages/logo.js */",
        __self: this
      }));
    }
  }]);

  return _default;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]);


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
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/logo")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=logo.js.b2980209604b796e38e4.hot-update.js.map