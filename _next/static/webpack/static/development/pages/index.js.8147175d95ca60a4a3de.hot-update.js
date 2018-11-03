webpackHotUpdate("static/development/pages/index.js",{

/***/ "./layouts/Default/index.js":
/*!**********************************!*\
  !*** ./layouts/Default/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ "./node_modules/next/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./metal-wallpaper.jpg */ "./layouts/Default/metal-wallpaper.jpg");
/* harmony import */ var _metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Header */ "./layouts/Default/Header.js");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Footer */ "./layouts/Default/Footer.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/i18n */ "./utils/i18n.js");
var _jsxFileName = "/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/layouts/Default/index.js";








var changeLanguage = function changeLanguage(lng) {
  _utils_i18n__WEBPACK_IMPORTED_MODULE_6__["default"].changeLanguage(lng);
};

var Layout = function Layout(_ref) {
  var _ref$isHome = _ref.isHome,
      isHome = _ref$isHome === void 0 ? false : _ref$isHome,
      children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]) + " " + "layout",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("title", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, "Inglorious Coderz"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    onClick: function onClick() {
      return changeLanguage('de');
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, "de"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    onClick: function onClick() {
      return changeLanguage('en');
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, "en"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, t('Welcome to React'))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Header__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]) + " " + "content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, children), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Footer__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "979146733",
    css: "@font-face{font-family:'Ethnocentric';src:url('/static/fonts/ethnocentric_rg.ttf');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6, U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193, U+2212,U+2215,U+FEFF,U+FFFD;}@font-face{font-family:'Orbitron';src:url('/static/fonts/orbitron.woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6, U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193, U+2212,U+2215,U+FEFF,U+FFFD;-webkit-letter-spacing:0.05em;-moz-letter-spacing:0.05em;-ms-letter-spacing:0.05em;letter-spacing:0.05em;}@font-face{font-family:'Ubuntu';src:url('/static/fonts/ubuntu.woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6, U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193, U+2212,U+2215,U+FEFF,U+FFFD;}@font-face{font-family:'Roboto';src:local('Roboto'),local('Roboto-Regular'),:url('/static/fonts/Roboto-Regular.ttf');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6, U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193, U+2212,U+2215,U+FEFF,U+FFFD;}html,body,#__next{height:100%;}html{font-family:'Roboto','Ubuntu',sans-serif;font-size:16px;line-height:1.5;color:#bbb;}body{max-width:1024px;margin:0 auto;background:black;background-image:url(".concat(_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a, ");background-position-x:center;background-attachment:fixed;}a{color:#429aef;-webkit-text-decoration:none;text-decoration:none;}a:hover{-webkit-filter:brightness(125%);filter:brightness(125%);-webkit-text-decoration:underline;text-decoration:underline;}h1,h2,h3{font-family:'Ethnocentric';font-weight:normal;color:#98c379;}p{margin-top:0;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9sYXlvdXRzL0RlZmF1bHQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0N1QixBQUdvQyxBQVFKLEFBU0YsQUFRQSxBQVdULEFBSStCLEFBUTFCLEFBU0gsQUFLVSxBQU9HLEFBTWQsWUF0Q2YsQ0F1Q0EsQ0FsQnVCLEdBVFAsSUEvQndCLEFBU0csRUFsQkQsSUFSSyxBQXFFMUIsSUFwQkYsVUFURixLQThCRCxFQXBCcUMsUUFUbkMsQUFxQlUsR0ExQ00sQ0FtRGxDLEdBNURrQyxDQStDbEMsUUF2RGtDLEFBdUNyQixXQUNiLGdCQVErQixPQXRCRyxVQWtDbEMsWUFYOEIsNEJBQzlCLDBEQWhDQSxJQVR3QixTQVJ4QixrQ0EwQkEsOERBakJBIiwiZmlsZSI6Ii9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9sYXlvdXRzL0RlZmF1bHQvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5cbmltcG9ydCB3YWxscGFwZXIgZnJvbSAnLi9tZXRhbC13YWxscGFwZXIuanBnJ1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlcidcbmltcG9ydCBGb290ZXIgZnJvbSAnLi9Gb290ZXInXG5cbmltcG9ydCBpMThuIGZyb20gJy4uLy4uL3V0aWxzL2kxOG4nXG5cbmNvbnN0IGNoYW5nZUxhbmd1YWdlID0gbG5nID0+IHtcbiAgaTE4bi5jaGFuZ2VMYW5ndWFnZShsbmcpXG59XG5cbmNvbnN0IExheW91dCA9ICh7IGlzSG9tZSA9IGZhbHNlLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0XCI+XG4gICAgPEhlYWQ+XG4gICAgICA8dGl0bGU+SW5nbG9yaW91cyBDb2Rlcno8L3RpdGxlPlxuICAgICAgPG1ldGFcbiAgICAgICAgbmFtZT1cInZpZXdwb3J0XCJcbiAgICAgICAgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAsIG1heGltdW0tc2NhbGU9MS4wLCB1c2VyLXNjYWxhYmxlPW5vXCJcbiAgICAgIC8+XG4gICAgPC9IZWFkPlxuXG4gICAgPGRpdj5cbiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gY2hhbmdlTGFuZ3VhZ2UoJ2RlJyl9PmRlPC9idXR0b24+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGNoYW5nZUxhbmd1YWdlKCdlbicpfT5lbjwvYnV0dG9uPlxuICAgICAgPGgxPnt0KCdXZWxjb21lIHRvIFJlYWN0Jyl9PC9oMT5cbiAgICA8L2Rpdj5cblxuICAgIDxIZWFkZXIgLz5cblxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPntjaGlsZHJlbn08L2Rpdj5cblxuICAgIDxGb290ZXIgLz5cblxuICAgIDxzdHlsZSBqc3ggZ2xvYmFsPntgXG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdFdGhub2NlbnRyaWMnO1xuICAgICAgICBzcmM6IHVybCgnL3N0YXRpYy9mb250cy9ldGhub2NlbnRyaWNfcmcudHRmJyk7XG4gICAgICAgIHVuaWNvZGUtcmFuZ2U6IFUrMDAwMC0wMEZGLCBVKzAxMzEsIFUrMDE1Mi0wMTUzLCBVKzAyQkItMDJCQywgVSswMkM2LFxuICAgICAgICAgIFUrMDJEQSwgVSswMkRDLCBVKzIwMDAtMjA2RiwgVSsyMDc0LCBVKzIwQUMsIFUrMjEyMiwgVSsyMTkxLCBVKzIxOTMsXG4gICAgICAgICAgVSsyMjEyLCBVKzIyMTUsIFUrRkVGRiwgVStGRkZEO1xuICAgICAgfVxuXG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdPcmJpdHJvbic7XG4gICAgICAgIHNyYzogdXJsKCcvc3RhdGljL2ZvbnRzL29yYml0cm9uLndvZmYyJyk7XG4gICAgICAgIHVuaWNvZGUtcmFuZ2U6IFUrMDAwMC0wMEZGLCBVKzAxMzEsIFUrMDE1Mi0wMTUzLCBVKzAyQkItMDJCQywgVSswMkM2LFxuICAgICAgICAgIFUrMDJEQSwgVSswMkRDLCBVKzIwMDAtMjA2RiwgVSsyMDc0LCBVKzIwQUMsIFUrMjEyMiwgVSsyMTkxLCBVKzIxOTMsXG4gICAgICAgICAgVSsyMjEyLCBVKzIyMTUsIFUrRkVGRiwgVStGRkZEO1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xuICAgICAgfVxuXG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdVYnVudHUnO1xuICAgICAgICBzcmM6IHVybCgnL3N0YXRpYy9mb250cy91YnVudHUud29mZjInKTtcbiAgICAgICAgdW5pY29kZS1yYW5nZTogVSswMDAwLTAwRkYsIFUrMDEzMSwgVSswMTUyLTAxNTMsIFUrMDJCQi0wMkJDLCBVKzAyQzYsXG4gICAgICAgICAgVSswMkRBLCBVKzAyREMsIFUrMjAwMC0yMDZGLCBVKzIwNzQsIFUrMjBBQywgVSsyMTIyLCBVKzIxOTEsIFUrMjE5MyxcbiAgICAgICAgICBVKzIyMTIsIFUrMjIxNSwgVStGRUZGLCBVK0ZGRkQ7XG4gICAgICB9XG5cbiAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICBmb250LWZhbWlseTogJ1JvYm90byc7XG4gICAgICAgIHNyYzogbG9jYWwoJ1JvYm90bycpLCBsb2NhbCgnUm9ib3RvLVJlZ3VsYXInKSxcbiAgICAgICAgICB1cmwoJy9zdGF0aWMvZm9udHMvUm9ib3RvLVJlZ3VsYXIudHRmJyk7XG4gICAgICAgIHVuaWNvZGUtcmFuZ2U6IFUrMDAwMC0wMEZGLCBVKzAxMzEsIFUrMDE1Mi0wMTUzLCBVKzAyQkItMDJCQywgVSswMkM2LFxuICAgICAgICAgIFUrMDJEQSwgVSswMkRDLCBVKzIwMDAtMjA2RiwgVSsyMDc0LCBVKzIwQUMsIFUrMjEyMiwgVSsyMTkxLCBVKzIxOTMsXG4gICAgICAgICAgVSsyMjEyLCBVKzIyMTUsIFUrRkVGRiwgVStGRkZEO1xuICAgICAgfVxuXG4gICAgICBodG1sLFxuICAgICAgYm9keSxcbiAgICAgICNfX25leHQge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIGh0bWwge1xuICAgICAgICBmb250LWZhbWlseTogJ1JvYm90bycsICdVYnVudHUnLCBzYW5zLXNlcmlmO1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgICAgIGNvbG9yOiAjYmJiO1xuICAgICAgfVxuXG4gICAgICBib2R5IHtcbiAgICAgICAgLy8gbWF4LXdpZHRoOiAzOHJlbTtcbiAgICAgICAgbWF4LXdpZHRoOiAxMDI0cHg7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7d2FsbHBhcGVyfSk7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb24teDogY2VudGVyO1xuICAgICAgICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xuICAgICAgfVxuXG4gICAgICBhIHtcbiAgICAgICAgY29sb3I6ICM0MjlhZWY7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIH1cblxuICAgICAgYTpob3ZlciB7XG4gICAgICAgIGZpbHRlcjogYnJpZ2h0bmVzcygxMjUlKTtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgICB9XG5cbiAgICAgIGgxLFxuICAgICAgaDIsXG4gICAgICBoMyB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnRXRobm9jZW50cmljJztcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgY29sb3I6ICM5OGMzNzk7XG4gICAgICB9XG5cbiAgICAgIHAge1xuICAgICAgICBtYXJnaW4tdG9wOiAwO1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cblxuICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgIC5sYXlvdXQge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcbiAgICAgIH1cblxuICAgICAgLmNvbnRlbnQge1xuICAgICAgICBwYWRkaW5nOiAke2lzSG9tZSA/IDAgOiAnMXJlbSd9O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2lzSG9tZSA/ICd0cmFuc3BhcmVudCcgOiAncmdiYSg0MCwgNDQsIDUyLCAwLjUpJ307XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0XG4iXX0= */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/layouts/Default/index.js */"),
    dynamic: [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a],
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "3328289704",
    css: ".layout.__jsx-style-dynamic-selector{height:100%;display:grid;grid-template-rows:auto 1fr auto;}.content.__jsx-style-dynamic-selector{padding:".concat(isHome ? 0 : '1rem', ";background-color:").concat(isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)', ";}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9sYXlvdXRzL0RlZmF1bHQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUhnQixBQUdxQixBQU15QixZQUx4QixhQUNvQixZQUthLHFCQUpoRCx5QkFLQSIsImZpbGUiOiIvaG9tZS9hbnRvbnkvUHJvZ2V0dGkvSW5nbG9yaW91cyBDb2RlcnovaW5nbG9yaW91c2NvZGVyei5naXRodWIuaW8vbGF5b3V0cy9EZWZhdWx0L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuXG5pbXBvcnQgd2FsbHBhcGVyIGZyb20gJy4vbWV0YWwtd2FsbHBhcGVyLmpwZydcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9IZWFkZXInXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vRm9vdGVyJ1xuXG5pbXBvcnQgaTE4biBmcm9tICcuLi8uLi91dGlscy9pMThuJ1xuXG5jb25zdCBjaGFuZ2VMYW5ndWFnZSA9IGxuZyA9PiB7XG4gIGkxOG4uY2hhbmdlTGFuZ3VhZ2UobG5nKVxufVxuXG5jb25zdCBMYXlvdXQgPSAoeyBpc0hvbWUgPSBmYWxzZSwgY2hpbGRyZW4gfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dFwiPlxuICAgIDxIZWFkPlxuICAgICAgPHRpdGxlPkluZ2xvcmlvdXMgQ29kZXJ6PC90aXRsZT5cbiAgICAgIDxtZXRhXG4gICAgICAgIG5hbWU9XCJ2aWV3cG9ydFwiXG4gICAgICAgIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEuMCwgdXNlci1zY2FsYWJsZT1ub1wiXG4gICAgICAvPlxuICAgIDwvSGVhZD5cblxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGNoYW5nZUxhbmd1YWdlKCdkZScpfT5kZTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBjaGFuZ2VMYW5ndWFnZSgnZW4nKX0+ZW48L2J1dHRvbj5cbiAgICAgIDxoMT57dCgnV2VsY29tZSB0byBSZWFjdCcpfTwvaDE+XG4gICAgPC9kaXY+XG5cbiAgICA8SGVhZGVyIC8+XG5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj57Y2hpbGRyZW59PC9kaXY+XG5cbiAgICA8Rm9vdGVyIC8+XG5cbiAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnRXRobm9jZW50cmljJztcbiAgICAgICAgc3JjOiB1cmwoJy9zdGF0aWMvZm9udHMvZXRobm9jZW50cmljX3JnLnR0ZicpO1xuICAgICAgICB1bmljb2RlLXJhbmdlOiBVKzAwMDAtMDBGRiwgVSswMTMxLCBVKzAxNTItMDE1MywgVSswMkJCLTAyQkMsIFUrMDJDNixcbiAgICAgICAgICBVKzAyREEsIFUrMDJEQywgVSsyMDAwLTIwNkYsIFUrMjA3NCwgVSsyMEFDLCBVKzIxMjIsIFUrMjE5MSwgVSsyMTkzLFxuICAgICAgICAgIFUrMjIxMiwgVSsyMjE1LCBVK0ZFRkYsIFUrRkZGRDtcbiAgICAgIH1cblxuICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnT3JiaXRyb24nO1xuICAgICAgICBzcmM6IHVybCgnL3N0YXRpYy9mb250cy9vcmJpdHJvbi53b2ZmMicpO1xuICAgICAgICB1bmljb2RlLXJhbmdlOiBVKzAwMDAtMDBGRiwgVSswMTMxLCBVKzAxNTItMDE1MywgVSswMkJCLTAyQkMsIFUrMDJDNixcbiAgICAgICAgICBVKzAyREEsIFUrMDJEQywgVSsyMDAwLTIwNkYsIFUrMjA3NCwgVSsyMEFDLCBVKzIxMjIsIFUrMjE5MSwgVSsyMTkzLFxuICAgICAgICAgIFUrMjIxMiwgVSsyMjE1LCBVK0ZFRkYsIFUrRkZGRDtcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcbiAgICAgIH1cblxuICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnVWJ1bnR1JztcbiAgICAgICAgc3JjOiB1cmwoJy9zdGF0aWMvZm9udHMvdWJ1bnR1LndvZmYyJyk7XG4gICAgICAgIHVuaWNvZGUtcmFuZ2U6IFUrMDAwMC0wMEZGLCBVKzAxMzEsIFUrMDE1Mi0wMTUzLCBVKzAyQkItMDJCQywgVSswMkM2LFxuICAgICAgICAgIFUrMDJEQSwgVSswMkRDLCBVKzIwMDAtMjA2RiwgVSsyMDc0LCBVKzIwQUMsIFUrMjEyMiwgVSsyMTkxLCBVKzIxOTMsXG4gICAgICAgICAgVSsyMjEyLCBVKzIyMTUsIFUrRkVGRiwgVStGRkZEO1xuICAgICAgfVxuXG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xuICAgICAgICBzcmM6IGxvY2FsKCdSb2JvdG8nKSwgbG9jYWwoJ1JvYm90by1SZWd1bGFyJyksXG4gICAgICAgICAgdXJsKCcvc3RhdGljL2ZvbnRzL1JvYm90by1SZWd1bGFyLnR0ZicpO1xuICAgICAgICB1bmljb2RlLXJhbmdlOiBVKzAwMDAtMDBGRiwgVSswMTMxLCBVKzAxNTItMDE1MywgVSswMkJCLTAyQkMsIFUrMDJDNixcbiAgICAgICAgICBVKzAyREEsIFUrMDJEQywgVSsyMDAwLTIwNkYsIFUrMjA3NCwgVSsyMEFDLCBVKzIxMjIsIFUrMjE5MSwgVSsyMTkzLFxuICAgICAgICAgIFUrMjIxMiwgVSsyMjE1LCBVK0ZFRkYsIFUrRkZGRDtcbiAgICAgIH1cblxuICAgICAgaHRtbCxcbiAgICAgIGJvZHksXG4gICAgICAjX19uZXh0IHtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgfVxuXG4gICAgICBodG1sIHtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCAnVWJ1bnR1Jywgc2Fucy1zZXJpZjtcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgICBjb2xvcjogI2JiYjtcbiAgICAgIH1cblxuICAgICAgYm9keSB7XG4gICAgICAgIC8vIG1heC13aWR0aDogMzhyZW07XG4gICAgICAgIG1heC13aWR0aDogMTAyNHB4O1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgYmFja2dyb3VuZDogYmxhY2s7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke3dhbGxwYXBlcn0pO1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDtcbiAgICAgIH1cblxuICAgICAgYSB7XG4gICAgICAgIGNvbG9yOiAjNDI5YWVmO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIGE6aG92ZXIge1xuICAgICAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMTI1JSk7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgICAgfVxuXG4gICAgICBoMSxcbiAgICAgIGgyLFxuICAgICAgaDMge1xuICAgICAgICBmb250LWZhbWlseTogJ0V0aG5vY2VudHJpYyc7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgIGNvbG9yOiAjOThjMzc5O1xuICAgICAgfVxuXG4gICAgICBwIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgIH1cbiAgICBgfTwvc3R5bGU+XG5cbiAgICA8c3R5bGUganN4PntgXG4gICAgICAubGF5b3V0IHtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIGF1dG87XG4gICAgICB9XG5cbiAgICAgIC5jb250ZW50IHtcbiAgICAgICAgcGFkZGluZzogJHtpc0hvbWUgPyAwIDogJzFyZW0nfTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtpc0hvbWUgPyAndHJhbnNwYXJlbnQnIDogJ3JnYmEoNDAsIDQ0LCA1MiwgMC41KSd9O1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IExheW91dFxuIl19 */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/layouts/Default/index.js */"),
    dynamic: [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)'],
    __self: this
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ })

})
//# sourceMappingURL=index.js.8147175d95ca60a4a3de.hot-update.js.map