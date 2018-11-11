webpackHotUpdate("static/development/pages/what.js",{

/***/ "./layouts/default/header.js":
/*!***********************************!*\
  !*** ./layouts/default/header.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../static/images/metal-wallpaper.jpg */ "./static/images/metal-wallpaper.jpg");
/* harmony import */ var _static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_logo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/logo */ "./components/logo/index.js");
/* harmony import */ var _components_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/button */ "./components/button.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/i18n */ "./utils/i18n.js");
var _jsxFileName = "/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/layouts/default/header.js";



function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







var links = [{
  id: 'why',
  title: 'Why'
}, {
  id: 'who',
  title: 'Who'
}, {
  id: 'how',
  title: 'How'
}, {
  id: 'what',
  title: 'What'
}, {
  id: 'when',
  title: 'When'
}, {
  id: 'where',
  title: 'Where'
}, {
  id: 'blog',
  title: 'Blog'
}, {
  id: 'github',
  title: 'Github',
  href: 'https://github.com/IngloriousCoderz',
  target: '_blank',
  rel: 'noopener noreferrer'
}];

var changeLanguage = function changeLanguage(language) {
  return function (event) {
    event.preventDefault();
    _utils_i18n__WEBPACK_IMPORTED_MODULE_7__["default"].changeLanguage(language);
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_i18next__WEBPACK_IMPORTED_MODULE_3__["withI18n"])()(function (_ref) {
  var t = _ref.t;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("header", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["934239374", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["934239374", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]) + " " + "social",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    href: "https://www.linkedin.com/company/inglorious-coderz/",
    target: "_blank",
    rel: "noopener noreferrer",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }, "L"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    href: "https://www.facebook.com/IngloriousCoderz/",
    target: "_blank",
    rel: "noopener noreferrer",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }, "F"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    href: "https://www.instagram.com/ingloriouscoderz/",
    target: "_blank",
    rel: "noopener noreferrer",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, "I")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["934239374", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]) + " " + "languages",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    onClick: changeLanguage('it'),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }, "it"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    onClick: changeLanguage('en'),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, "en")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["934239374", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["934239374", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["934239374", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["934239374", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, "Inglorious"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["934239374", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]) + " " + "shade",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: this
  }, "\xA0")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_logo__WEBPACK_IMPORTED_MODULE_5__["default"], {
    size: 64,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["934239374", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["934239374", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: this
  }, "Coderz"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["934239374", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]) + " " + "shade",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  }, "\xA0"))))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["934239374", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: this
  }, t('A fistful of heroes striving to create a better world through better software.')), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("nav", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["934239374", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    },
    __self: this
  }, links.map(function (link) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_button__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({
      key: link.id
    }, link, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83
      },
      __self: this
    }));
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "934239374",
    css: "header.__jsx-style-dynamic-selector{background:black;background-image:url(".concat(_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a, ");background-position-x:center;background-attachment:fixed;padding:1rem;position:-webkit-sticky;position:sticky;top:0;z-index:1000;}header.__jsx-style-dynamic-selector>.languages.__jsx-style-dynamic-selector{text-align:right;}header.__jsx-style-dynamic-selector>h1.__jsx-style-dynamic-selector{margin:0;}header.__jsx-style-dynamic-selector>h1.__jsx-style-dynamic-selector>a.__jsx-style-dynamic-selector{color:#666;display:grid;justify-items:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;grid-template-columns:4fr 1fr 4fr;}.shade.__jsx-style-dynamic-selector{position:relative;margin:-1.5rem 0 0;padding:0;display:block;background:#111;width:100%;height:1.5rem;opacity:0.25;text-align:center;}@media (max-width:640px){.shade.__jsx-style-dynamic-selector{margin:-0.75rem 0 0;height:1rem;}}header.__jsx-style-dynamic-selector>p.__jsx-style-dynamic-selector{text-align:center;margin:0.5rem;}nav.__jsx-style-dynamic-selector{text-align:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9sYXlvdXRzL2RlZmF1bHQvaGVhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNGZ0IsQUFHMEIsQUFXQSxBQUlSLEFBSUUsQUFRTyxBQWFJLEFBTUosQUFLQSxTQW5DcEIsRUFJZSxNQW5Cc0MsQUFXckQsQ0FnQnFCLEFBbUJMLEFBS0QsRUFYQyxJQXBCTyxRQXFCckIsQUFNRixLQW5CWSxRQVBTLEVBUUwsY0FDRSxPQTdCYSxTQThCbEIsV0FDRyxJQW9CQyxLQWxEYSxLQStCZixhQUNLLFVBL0JMLFFBZ0NmLEtBL0JrQixBQWtCa0IsV0ErQnBDLHVCQTlCQSxNQWxCUSxNQUNPLGFBQ2YiLCJmaWxlIjoiL2hvbWUvYW50b255L1Byb2dldHRpL0luZ2xvcmlvdXMgQ29kZXJ6L2luZ2xvcmlvdXNjb2RlcnouZ2l0aHViLmlvL2xheW91dHMvZGVmYXVsdC9oZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5pbXBvcnQgeyB3aXRoSTE4biB9IGZyb20gJ3JlYWN0LWkxOG5leHQnXG5cbmltcG9ydCB3YWxscGFwZXIgZnJvbSAnfi9zdGF0aWMvaW1hZ2VzL21ldGFsLXdhbGxwYXBlci5qcGcnXG5pbXBvcnQgTG9nbyBmcm9tICd+L2NvbXBvbmVudHMvbG9nbydcbmltcG9ydCBCdXR0b24gZnJvbSAnfi9jb21wb25lbnRzL2J1dHRvbidcbmltcG9ydCBpMThuIGZyb20gJ34vdXRpbHMvaTE4bidcblxuY29uc3QgbGlua3MgPSBbXG4gIHsgaWQ6ICd3aHknLCB0aXRsZTogJ1doeScgfSxcbiAgeyBpZDogJ3dobycsIHRpdGxlOiAnV2hvJyB9LFxuICB7IGlkOiAnaG93JywgdGl0bGU6ICdIb3cnIH0sXG4gIHsgaWQ6ICd3aGF0JywgdGl0bGU6ICdXaGF0JyB9LFxuICB7IGlkOiAnd2hlbicsIHRpdGxlOiAnV2hlbicgfSxcbiAgeyBpZDogJ3doZXJlJywgdGl0bGU6ICdXaGVyZScgfSxcbiAgeyBpZDogJ2Jsb2cnLCB0aXRsZTogJ0Jsb2cnIH0sXG4gIHtcbiAgICBpZDogJ2dpdGh1YicsXG4gICAgdGl0bGU6ICdHaXRodWInLFxuICAgIGhyZWY6ICdodHRwczovL2dpdGh1Yi5jb20vSW5nbG9yaW91c0NvZGVyeicsXG4gICAgdGFyZ2V0OiAnX2JsYW5rJyxcbiAgICByZWw6ICdub29wZW5lciBub3JlZmVycmVyJyxcbiAgfSxcbl1cblxuY29uc3QgY2hhbmdlTGFuZ3VhZ2UgPSBsYW5ndWFnZSA9PiBldmVudCA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgaTE4bi5jaGFuZ2VMYW5ndWFnZShsYW5ndWFnZSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aEkxOG4oKSgoeyB0IH0pID0+IChcbiAgPGhlYWRlcj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNvY2lhbFwiPlxuICAgICAgPEJ1dHRvblxuICAgICAgICBocmVmPVwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2NvbXBhbnkvaW5nbG9yaW91cy1jb2RlcnovXCJcbiAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxuICAgICAgICBMXG4gICAgICA8L0J1dHRvbj5cbiAgICAgIDxCdXR0b25cbiAgICAgICAgaHJlZj1cImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9Jbmdsb3Jpb3VzQ29kZXJ6L1wiXG4gICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cbiAgICAgICAgRlxuICAgICAgPC9CdXR0b24+XG4gICAgICA8QnV0dG9uXG4gICAgICAgIGhyZWY9XCJodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL2luZ2xvcmlvdXNjb2RlcnovXCJcbiAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxuICAgICAgICBJXG4gICAgICA8L0J1dHRvbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3NOYW1lPVwibGFuZ3VhZ2VzXCI+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e2NoYW5nZUxhbmd1YWdlKCdpdCcpfT5pdDwvQnV0dG9uPlxuICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtjaGFuZ2VMYW5ndWFnZSgnZW4nKX0+ZW48L0J1dHRvbj5cbiAgICA8L2Rpdj5cblxuICAgIDxoMT5cbiAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XG4gICAgICAgIDxhPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c3Bhbj5Jbmdsb3Jpb3VzPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2hhZGVcIj4mbmJzcDs8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPExvZ28gc2l6ZT17NjR9IC8+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxzcGFuPkNvZGVyejwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNoYWRlXCI+Jm5ic3A7PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2E+XG4gICAgICA8L0xpbms+XG4gICAgPC9oMT5cblxuICAgIDxwPlxuICAgICAge3QoXG4gICAgICAgICdBIGZpc3RmdWwgb2YgaGVyb2VzIHN0cml2aW5nIHRvIGNyZWF0ZSBhIGJldHRlciB3b3JsZCB0aHJvdWdoIGJldHRlciBzb2Z0d2FyZS4nLFxuICAgICAgKX1cbiAgICA8L3A+XG5cbiAgICA8bmF2PlxuICAgICAge2xpbmtzLm1hcChsaW5rID0+IChcbiAgICAgICAgPEJ1dHRvbiBrZXk9e2xpbmsuaWR9IHsuLi5saW5rfSAvPlxuICAgICAgKSl9XG4gICAgPC9uYXY+XG5cbiAgICA8c3R5bGUganN4PntgXG4gICAgICBoZWFkZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7d2FsbHBhcGVyfSk7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb24teDogY2VudGVyO1xuICAgICAgICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xuICAgICAgICBwYWRkaW5nOiAxcmVtO1xuICAgICAgICBwb3NpdGlvbjogc3RpY2t5O1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHotaW5kZXg6IDEwMDA7XG4gICAgICB9XG5cbiAgICAgIGhlYWRlciA+IC5sYW5ndWFnZXMge1xuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgIH1cblxuICAgICAgaGVhZGVyID4gaDEge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICB9XG5cbiAgICAgIGhlYWRlciA+IGgxID4gYSB7XG4gICAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNGZyIDFmciA0ZnI7XG4gICAgICB9XG5cbiAgICAgIC5zaGFkZSB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgbWFyZ2luOiAtMS41cmVtIDAgMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGJhY2tncm91bmQ6ICMxMTE7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEuNXJlbTtcbiAgICAgICAgb3BhY2l0eTogMC4yNTtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNjQwcHgpIHtcbiAgICAgICAgLnNoYWRlIHtcbiAgICAgICAgICBtYXJnaW46IC0wLjc1cmVtIDAgMDtcbiAgICAgICAgICBoZWlnaHQ6IDFyZW07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaGVhZGVyID4gcCB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luOiAwLjVyZW07XG4gICAgICB9XG5cbiAgICAgIG5hdiB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgPC9oZWFkZXI+XG4pKVxuIl19 */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/layouts/default/header.js */"),
    dynamic: [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a],
    __self: this
  }));
}));

/***/ })

})
//# sourceMappingURL=what.js.364ad839727ab8c346c7.hot-update.js.map