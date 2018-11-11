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
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4065912617", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4065912617", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]) + " " + "social",
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
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4065912617", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]) + " " + "languages",
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
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4065912617", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
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
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4065912617", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4065912617", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4065912617", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, "Inglorious"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4065912617", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]) + " " + "shade",
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
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4065912617", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4065912617", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: this
  }, "Coderz"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4065912617", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]) + " " + "shade",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  }, "\xA0"))))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4065912617", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: this
  }, t('A fistful of heroes striving to create a better world through better software.')), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("nav", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4065912617", [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a]]]),
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
    styleId: "4065912617",
    css: "header.__jsx-style-dynamic-selector{background:black;background-image:url(".concat(_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a, ");background-position-x:center;background-attachment:fixed;padding:1rem;position:-webkit-sticky;position:sticky;top:0;z-index:1000;}header.__jsx-style-dynamic-selector>.social.__jsx-style-dynamic-selector{float:left;}header.__jsx-style-dynamic-selector>.languages.__jsx-style-dynamic-selector{float:right;}header.__jsx-style-dynamic-selector>h1.__jsx-style-dynamic-selector{margin:0;}header.__jsx-style-dynamic-selector>h1.__jsx-style-dynamic-selector>a.__jsx-style-dynamic-selector{color:#666;display:grid;justify-items:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;grid-template-columns:4fr 1fr 4fr;}.shade.__jsx-style-dynamic-selector{position:relative;margin:-1.5rem 0 0;padding:0;display:block;background:#111;width:100%;height:1.5rem;opacity:0.25;text-align:center;}@media (max-width:640px){.shade.__jsx-style-dynamic-selector{margin:-0.75rem 0 0;height:1rem;}}header.__jsx-style-dynamic-selector>p.__jsx-style-dynamic-selector{text-align:center;margin:0.5rem;}nav.__jsx-style-dynamic-selector{text-align:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9sYXlvdXRzL2RlZmF1bHQvaGVhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNGZ0IsQUFHMEIsQUFXTixBQUlDLEFBSUgsQUFJRSxBQVFPLEFBYUksQUFNSixBQUtBLFNBbkNwQixFQVJBLEFBWWUsQ0FSZixLQWZxRCxDQStCaEMsQUFtQkwsQUFLRCxFQVhDLElBcEJPLFFBcUJyQixBQU1GLEtBbkJZLFFBUFMsRUFRTCxjQUNFLE9BakNhLFNBa0NsQixXQUNHLElBb0JDLEtBdERhLEtBbUNmLGFBQ0ssVUFuQ0wsUUFvQ2YsS0FuQ2tCLEFBc0JrQixXQStCcEMsdUJBOUJBLE1BdEJRLE1BQ08sYUFDZiIsImZpbGUiOiIvaG9tZS9hbnRvbnkvUHJvZ2V0dGkvSW5nbG9yaW91cyBDb2RlcnovaW5nbG9yaW91c2NvZGVyei5naXRodWIuaW8vbGF5b3V0cy9kZWZhdWx0L2hlYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluaydcbmltcG9ydCB7IHdpdGhJMThuIH0gZnJvbSAncmVhY3QtaTE4bmV4dCdcblxuaW1wb3J0IHdhbGxwYXBlciBmcm9tICd+L3N0YXRpYy9pbWFnZXMvbWV0YWwtd2FsbHBhcGVyLmpwZydcbmltcG9ydCBMb2dvIGZyb20gJ34vY29tcG9uZW50cy9sb2dvJ1xuaW1wb3J0IEJ1dHRvbiBmcm9tICd+L2NvbXBvbmVudHMvYnV0dG9uJ1xuaW1wb3J0IGkxOG4gZnJvbSAnfi91dGlscy9pMThuJ1xuXG5jb25zdCBsaW5rcyA9IFtcbiAgeyBpZDogJ3doeScsIHRpdGxlOiAnV2h5JyB9LFxuICB7IGlkOiAnd2hvJywgdGl0bGU6ICdXaG8nIH0sXG4gIHsgaWQ6ICdob3cnLCB0aXRsZTogJ0hvdycgfSxcbiAgeyBpZDogJ3doYXQnLCB0aXRsZTogJ1doYXQnIH0sXG4gIHsgaWQ6ICd3aGVuJywgdGl0bGU6ICdXaGVuJyB9LFxuICB7IGlkOiAnd2hlcmUnLCB0aXRsZTogJ1doZXJlJyB9LFxuICB7IGlkOiAnYmxvZycsIHRpdGxlOiAnQmxvZycgfSxcbiAge1xuICAgIGlkOiAnZ2l0aHViJyxcbiAgICB0aXRsZTogJ0dpdGh1YicsXG4gICAgaHJlZjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9Jbmdsb3Jpb3VzQ29kZXJ6JyxcbiAgICB0YXJnZXQ6ICdfYmxhbmsnLFxuICAgIHJlbDogJ25vb3BlbmVyIG5vcmVmZXJyZXInLFxuICB9LFxuXVxuXG5jb25zdCBjaGFuZ2VMYW5ndWFnZSA9IGxhbmd1YWdlID0+IGV2ZW50ID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBpMThuLmNoYW5nZUxhbmd1YWdlKGxhbmd1YWdlKVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoSTE4bigpKCh7IHQgfSkgPT4gKFxuICA8aGVhZGVyPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwic29jaWFsXCI+XG4gICAgICA8QnV0dG9uXG4gICAgICAgIGhyZWY9XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vY29tcGFueS9pbmdsb3Jpb3VzLWNvZGVyei9cIlxuICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XG4gICAgICAgIExcbiAgICAgIDwvQnV0dG9uPlxuICAgICAgPEJ1dHRvblxuICAgICAgICBocmVmPVwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL0luZ2xvcmlvdXNDb2RlcnovXCJcbiAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxuICAgICAgICBGXG4gICAgICA8L0J1dHRvbj5cbiAgICAgIDxCdXR0b25cbiAgICAgICAgaHJlZj1cImh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20vaW5nbG9yaW91c2NvZGVyei9cIlxuICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XG4gICAgICAgIElcbiAgICAgIDwvQnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzc05hbWU9XCJsYW5ndWFnZXNcIj5cbiAgICAgIDxCdXR0b24gb25DbGljaz17Y2hhbmdlTGFuZ3VhZ2UoJ2l0Jyl9Pml0PC9CdXR0b24+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e2NoYW5nZUxhbmd1YWdlKCdlbicpfT5lbjwvQnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgPGgxPlxuICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgPGE+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxzcGFuPkluZ2xvcmlvdXM8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzaGFkZVwiPiZuYnNwOzwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8TG9nbyBzaXplPXs2NH0gLz5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHNwYW4+Q29kZXJ6PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2hhZGVcIj4mbmJzcDs8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvTGluaz5cbiAgICA8L2gxPlxuXG4gICAgPHA+XG4gICAgICB7dChcbiAgICAgICAgJ0EgZmlzdGZ1bCBvZiBoZXJvZXMgc3RyaXZpbmcgdG8gY3JlYXRlIGEgYmV0dGVyIHdvcmxkIHRocm91Z2ggYmV0dGVyIHNvZnR3YXJlLicsXG4gICAgICApfVxuICAgIDwvcD5cblxuICAgIDxuYXY+XG4gICAgICB7bGlua3MubWFwKGxpbmsgPT4gKFxuICAgICAgICA8QnV0dG9uIGtleT17bGluay5pZH0gey4uLmxpbmt9IC8+XG4gICAgICApKX1cbiAgICA8L25hdj5cblxuICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgIGhlYWRlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IGJsYWNrO1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHt3YWxscGFwZXJ9KTtcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbi14OiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XG4gICAgICAgIHBhZGRpbmc6IDFyZW07XG4gICAgICAgIHBvc2l0aW9uOiBzdGlja3k7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgei1pbmRleDogMTAwMDtcbiAgICAgIH1cblxuICAgICAgaGVhZGVyID4gLnNvY2lhbCB7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgfVxuXG4gICAgICBoZWFkZXIgPiAubGFuZ3VhZ2VzIHtcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgfVxuXG4gICAgICBoZWFkZXIgPiBoMSB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgIH1cblxuICAgICAgaGVhZGVyID4gaDEgPiBhIHtcbiAgICAgICAgY29sb3I6ICM2NjY7XG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA0ZnIgMWZyIDRmcjtcbiAgICAgIH1cblxuICAgICAgLnNoYWRlIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBtYXJnaW46IC0xLjVyZW0gMCAwO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYmFja2dyb3VuZDogIzExMTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMS41cmVtO1xuICAgICAgICBvcGFjaXR5OiAwLjI1O1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA2NDBweCkge1xuICAgICAgICAuc2hhZGUge1xuICAgICAgICAgIG1hcmdpbjogLTAuNzVyZW0gMCAwO1xuICAgICAgICAgIGhlaWdodDogMXJlbTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBoZWFkZXIgPiBwIHtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBtYXJnaW46IDAuNXJlbTtcbiAgICAgIH1cblxuICAgICAgbmF2IHtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICA8L2hlYWRlcj5cbikpXG4iXX0= */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/layouts/default/header.js */"),
    dynamic: [_static_images_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_4___default.a],
    __self: this
  }));
}));

/***/ })

})
//# sourceMappingURL=what.js.44b43f6f3eb4f699bda8.hot-update.js.map