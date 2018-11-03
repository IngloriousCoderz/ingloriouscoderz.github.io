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
  return _utils_i18n__WEBPACK_IMPORTED_MODULE_6__["default"].changeLanguage(lng);
};

var Layout = function Layout(_ref) {
  var _ref$isHome = _ref.isHome,
      isHome = _ref$isHome === void 0 ? false : _ref$isHome,
      children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]) + " " + "layout",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("title", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, "Inglorious Coderz"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    onClick: function onClick() {
      return changeLanguage('de');
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, "de"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    onClick: function onClick() {
      return changeLanguage('en');
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, "en"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, t('Welcome to React'))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Header__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["979146733", [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a]], ["3328289704", [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)']]]) + " " + "content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, children), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Footer__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "979146733",
    css: "@font-face{font-family:'Ethnocentric';src:url('/static/fonts/ethnocentric_rg.ttf');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6, U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193, U+2212,U+2215,U+FEFF,U+FFFD;}@font-face{font-family:'Orbitron';src:url('/static/fonts/orbitron.woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6, U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193, U+2212,U+2215,U+FEFF,U+FFFD;-webkit-letter-spacing:0.05em;-moz-letter-spacing:0.05em;-ms-letter-spacing:0.05em;letter-spacing:0.05em;}@font-face{font-family:'Ubuntu';src:url('/static/fonts/ubuntu.woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6, U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193, U+2212,U+2215,U+FEFF,U+FFFD;}@font-face{font-family:'Roboto';src:local('Roboto'),local('Roboto-Regular'),:url('/static/fonts/Roboto-Regular.ttf');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6, U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193, U+2212,U+2215,U+FEFF,U+FFFD;}html,body,#__next{height:100%;}html{font-family:'Roboto','Ubuntu',sans-serif;font-size:16px;line-height:1.5;color:#bbb;}body{max-width:1024px;margin:0 auto;background:black;background-image:url(".concat(_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a, ");background-position-x:center;background-attachment:fixed;}a{color:#429aef;-webkit-text-decoration:none;text-decoration:none;}a:hover{-webkit-filter:brightness(125%);filter:brightness(125%);-webkit-text-decoration:underline;text-decoration:underline;}h1,h2,h3{font-family:'Ethnocentric';font-weight:normal;color:#98c379;}p{margin-top:0;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9sYXlvdXRzL0RlZmF1bHQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0N1QixBQUdvQyxBQVFKLEFBU0YsQUFRQSxBQVdULEFBSStCLEFBUTFCLEFBU0gsQUFLVSxBQU9HLEFBTWQsWUF0Q2YsQ0F1Q0EsQ0FsQnVCLEdBVFAsSUEvQndCLEFBU0csRUFsQkQsSUFSSyxBQXFFMUIsSUFwQkYsVUFURixLQThCRCxFQXBCcUMsUUFUbkMsQUFxQlUsR0ExQ00sQ0FtRGxDLEdBNURrQyxDQStDbEMsUUF2RGtDLEFBdUNyQixXQUNiLGdCQVErQixPQXRCRyxVQWtDbEMsWUFYOEIsNEJBQzlCLDBEQWhDQSxJQVR3QixTQVJ4QixrQ0EwQkEsOERBakJBIiwiZmlsZSI6Ii9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9sYXlvdXRzL0RlZmF1bHQvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5cbmltcG9ydCB3YWxscGFwZXIgZnJvbSAnLi9tZXRhbC13YWxscGFwZXIuanBnJ1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlcidcbmltcG9ydCBGb290ZXIgZnJvbSAnLi9Gb290ZXInXG5cbmltcG9ydCBpMThuIGZyb20gJy4uLy4uL3V0aWxzL2kxOG4nXG5cbmNvbnN0IGNoYW5nZUxhbmd1YWdlID0gbG5nID0+IGkxOG4uY2hhbmdlTGFuZ3VhZ2UobG5nKVxuXG5jb25zdCBMYXlvdXQgPSAoeyBpc0hvbWUgPSBmYWxzZSwgY2hpbGRyZW4gfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dFwiPlxuICAgIDxIZWFkPlxuICAgICAgPHRpdGxlPkluZ2xvcmlvdXMgQ29kZXJ6PC90aXRsZT5cbiAgICAgIDxtZXRhXG4gICAgICAgIG5hbWU9XCJ2aWV3cG9ydFwiXG4gICAgICAgIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEuMCwgdXNlci1zY2FsYWJsZT1ub1wiXG4gICAgICAvPlxuICAgIDwvSGVhZD5cblxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGNoYW5nZUxhbmd1YWdlKCdkZScpfT5kZTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBjaGFuZ2VMYW5ndWFnZSgnZW4nKX0+ZW48L2J1dHRvbj5cbiAgICAgIDxoMT57dCgnV2VsY29tZSB0byBSZWFjdCcpfTwvaDE+XG4gICAgPC9kaXY+XG5cbiAgICA8SGVhZGVyIC8+XG5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj57Y2hpbGRyZW59PC9kaXY+XG5cbiAgICA8Rm9vdGVyIC8+XG5cbiAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnRXRobm9jZW50cmljJztcbiAgICAgICAgc3JjOiB1cmwoJy9zdGF0aWMvZm9udHMvZXRobm9jZW50cmljX3JnLnR0ZicpO1xuICAgICAgICB1bmljb2RlLXJhbmdlOiBVKzAwMDAtMDBGRiwgVSswMTMxLCBVKzAxNTItMDE1MywgVSswMkJCLTAyQkMsIFUrMDJDNixcbiAgICAgICAgICBVKzAyREEsIFUrMDJEQywgVSsyMDAwLTIwNkYsIFUrMjA3NCwgVSsyMEFDLCBVKzIxMjIsIFUrMjE5MSwgVSsyMTkzLFxuICAgICAgICAgIFUrMjIxMiwgVSsyMjE1LCBVK0ZFRkYsIFUrRkZGRDtcbiAgICAgIH1cblxuICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnT3JiaXRyb24nO1xuICAgICAgICBzcmM6IHVybCgnL3N0YXRpYy9mb250cy9vcmJpdHJvbi53b2ZmMicpO1xuICAgICAgICB1bmljb2RlLXJhbmdlOiBVKzAwMDAtMDBGRiwgVSswMTMxLCBVKzAxNTItMDE1MywgVSswMkJCLTAyQkMsIFUrMDJDNixcbiAgICAgICAgICBVKzAyREEsIFUrMDJEQywgVSsyMDAwLTIwNkYsIFUrMjA3NCwgVSsyMEFDLCBVKzIxMjIsIFUrMjE5MSwgVSsyMTkzLFxuICAgICAgICAgIFUrMjIxMiwgVSsyMjE1LCBVK0ZFRkYsIFUrRkZGRDtcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcbiAgICAgIH1cblxuICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnVWJ1bnR1JztcbiAgICAgICAgc3JjOiB1cmwoJy9zdGF0aWMvZm9udHMvdWJ1bnR1LndvZmYyJyk7XG4gICAgICAgIHVuaWNvZGUtcmFuZ2U6IFUrMDAwMC0wMEZGLCBVKzAxMzEsIFUrMDE1Mi0wMTUzLCBVKzAyQkItMDJCQywgVSswMkM2LFxuICAgICAgICAgIFUrMDJEQSwgVSswMkRDLCBVKzIwMDAtMjA2RiwgVSsyMDc0LCBVKzIwQUMsIFUrMjEyMiwgVSsyMTkxLCBVKzIxOTMsXG4gICAgICAgICAgVSsyMjEyLCBVKzIyMTUsIFUrRkVGRiwgVStGRkZEO1xuICAgICAgfVxuXG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xuICAgICAgICBzcmM6IGxvY2FsKCdSb2JvdG8nKSwgbG9jYWwoJ1JvYm90by1SZWd1bGFyJyksXG4gICAgICAgICAgdXJsKCcvc3RhdGljL2ZvbnRzL1JvYm90by1SZWd1bGFyLnR0ZicpO1xuICAgICAgICB1bmljb2RlLXJhbmdlOiBVKzAwMDAtMDBGRiwgVSswMTMxLCBVKzAxNTItMDE1MywgVSswMkJCLTAyQkMsIFUrMDJDNixcbiAgICAgICAgICBVKzAyREEsIFUrMDJEQywgVSsyMDAwLTIwNkYsIFUrMjA3NCwgVSsyMEFDLCBVKzIxMjIsIFUrMjE5MSwgVSsyMTkzLFxuICAgICAgICAgIFUrMjIxMiwgVSsyMjE1LCBVK0ZFRkYsIFUrRkZGRDtcbiAgICAgIH1cblxuICAgICAgaHRtbCxcbiAgICAgIGJvZHksXG4gICAgICAjX19uZXh0IHtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgfVxuXG4gICAgICBodG1sIHtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCAnVWJ1bnR1Jywgc2Fucy1zZXJpZjtcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgICBjb2xvcjogI2JiYjtcbiAgICAgIH1cblxuICAgICAgYm9keSB7XG4gICAgICAgIC8vIG1heC13aWR0aDogMzhyZW07XG4gICAgICAgIG1heC13aWR0aDogMTAyNHB4O1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgYmFja2dyb3VuZDogYmxhY2s7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke3dhbGxwYXBlcn0pO1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDtcbiAgICAgIH1cblxuICAgICAgYSB7XG4gICAgICAgIGNvbG9yOiAjNDI5YWVmO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIGE6aG92ZXIge1xuICAgICAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMTI1JSk7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgICAgfVxuXG4gICAgICBoMSxcbiAgICAgIGgyLFxuICAgICAgaDMge1xuICAgICAgICBmb250LWZhbWlseTogJ0V0aG5vY2VudHJpYyc7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgIGNvbG9yOiAjOThjMzc5O1xuICAgICAgfVxuXG4gICAgICBwIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgIH1cbiAgICBgfTwvc3R5bGU+XG5cbiAgICA8c3R5bGUganN4PntgXG4gICAgICAubGF5b3V0IHtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIGF1dG87XG4gICAgICB9XG5cbiAgICAgIC5jb250ZW50IHtcbiAgICAgICAgcGFkZGluZzogJHtpc0hvbWUgPyAwIDogJzFyZW0nfTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtpc0hvbWUgPyAndHJhbnNwYXJlbnQnIDogJ3JnYmEoNDAsIDQ0LCA1MiwgMC41KSd9O1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IExheW91dFxuIl19 */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/layouts/Default/index.js */"),
    dynamic: [_metal_wallpaper_jpg__WEBPACK_IMPORTED_MODULE_3___default.a],
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "3328289704",
    css: ".layout.__jsx-style-dynamic-selector{height:100%;display:grid;grid-template-rows:auto 1fr auto;}.content.__jsx-style-dynamic-selector{padding:".concat(isHome ? 0 : '1rem', ";background-color:").concat(isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)', ";}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9sYXlvdXRzL0RlZmF1bHQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUhnQixBQUdxQixBQU15QixZQUx4QixhQUNvQixZQUthLHFCQUpoRCx5QkFLQSIsImZpbGUiOiIvaG9tZS9hbnRvbnkvUHJvZ2V0dGkvSW5nbG9yaW91cyBDb2RlcnovaW5nbG9yaW91c2NvZGVyei5naXRodWIuaW8vbGF5b3V0cy9EZWZhdWx0L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuXG5pbXBvcnQgd2FsbHBhcGVyIGZyb20gJy4vbWV0YWwtd2FsbHBhcGVyLmpwZydcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9IZWFkZXInXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vRm9vdGVyJ1xuXG5pbXBvcnQgaTE4biBmcm9tICcuLi8uLi91dGlscy9pMThuJ1xuXG5jb25zdCBjaGFuZ2VMYW5ndWFnZSA9IGxuZyA9PiBpMThuLmNoYW5nZUxhbmd1YWdlKGxuZylcblxuY29uc3QgTGF5b3V0ID0gKHsgaXNIb21lID0gZmFsc2UsIGNoaWxkcmVuIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXRcIj5cbiAgICA8SGVhZD5cbiAgICAgIDx0aXRsZT5Jbmdsb3Jpb3VzIENvZGVyejwvdGl0bGU+XG4gICAgICA8bWV0YVxuICAgICAgICBuYW1lPVwidmlld3BvcnRcIlxuICAgICAgICBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCwgbWF4aW11bS1zY2FsZT0xLjAsIHVzZXItc2NhbGFibGU9bm9cIlxuICAgICAgLz5cbiAgICA8L0hlYWQ+XG5cbiAgICA8ZGl2PlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBjaGFuZ2VMYW5ndWFnZSgnZGUnKX0+ZGU8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gY2hhbmdlTGFuZ3VhZ2UoJ2VuJyl9PmVuPC9idXR0b24+XG4gICAgICA8aDE+e3QoJ1dlbGNvbWUgdG8gUmVhY3QnKX08L2gxPlxuICAgIDwvZGl2PlxuXG4gICAgPEhlYWRlciAvPlxuXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+e2NoaWxkcmVufTwvZGl2PlxuXG4gICAgPEZvb3RlciAvPlxuXG4gICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICBmb250LWZhbWlseTogJ0V0aG5vY2VudHJpYyc7XG4gICAgICAgIHNyYzogdXJsKCcvc3RhdGljL2ZvbnRzL2V0aG5vY2VudHJpY19yZy50dGYnKTtcbiAgICAgICAgdW5pY29kZS1yYW5nZTogVSswMDAwLTAwRkYsIFUrMDEzMSwgVSswMTUyLTAxNTMsIFUrMDJCQi0wMkJDLCBVKzAyQzYsXG4gICAgICAgICAgVSswMkRBLCBVKzAyREMsIFUrMjAwMC0yMDZGLCBVKzIwNzQsIFUrMjBBQywgVSsyMTIyLCBVKzIxOTEsIFUrMjE5MyxcbiAgICAgICAgICBVKzIyMTIsIFUrMjIxNSwgVStGRUZGLCBVK0ZGRkQ7XG4gICAgICB9XG5cbiAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICBmb250LWZhbWlseTogJ09yYml0cm9uJztcbiAgICAgICAgc3JjOiB1cmwoJy9zdGF0aWMvZm9udHMvb3JiaXRyb24ud29mZjInKTtcbiAgICAgICAgdW5pY29kZS1yYW5nZTogVSswMDAwLTAwRkYsIFUrMDEzMSwgVSswMTUyLTAxNTMsIFUrMDJCQi0wMkJDLCBVKzAyQzYsXG4gICAgICAgICAgVSswMkRBLCBVKzAyREMsIFUrMjAwMC0yMDZGLCBVKzIwNzQsIFUrMjBBQywgVSsyMTIyLCBVKzIxOTEsIFUrMjE5MyxcbiAgICAgICAgICBVKzIyMTIsIFUrMjIxNSwgVStGRUZGLCBVK0ZGRkQ7XG4gICAgICAgIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XG4gICAgICB9XG5cbiAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICBmb250LWZhbWlseTogJ1VidW50dSc7XG4gICAgICAgIHNyYzogdXJsKCcvc3RhdGljL2ZvbnRzL3VidW50dS53b2ZmMicpO1xuICAgICAgICB1bmljb2RlLXJhbmdlOiBVKzAwMDAtMDBGRiwgVSswMTMxLCBVKzAxNTItMDE1MywgVSswMkJCLTAyQkMsIFUrMDJDNixcbiAgICAgICAgICBVKzAyREEsIFUrMDJEQywgVSsyMDAwLTIwNkYsIFUrMjA3NCwgVSsyMEFDLCBVKzIxMjIsIFUrMjE5MSwgVSsyMTkzLFxuICAgICAgICAgIFUrMjIxMiwgVSsyMjE1LCBVK0ZFRkYsIFUrRkZGRDtcbiAgICAgIH1cblxuICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcbiAgICAgICAgc3JjOiBsb2NhbCgnUm9ib3RvJyksIGxvY2FsKCdSb2JvdG8tUmVndWxhcicpLFxuICAgICAgICAgIHVybCgnL3N0YXRpYy9mb250cy9Sb2JvdG8tUmVndWxhci50dGYnKTtcbiAgICAgICAgdW5pY29kZS1yYW5nZTogVSswMDAwLTAwRkYsIFUrMDEzMSwgVSswMTUyLTAxNTMsIFUrMDJCQi0wMkJDLCBVKzAyQzYsXG4gICAgICAgICAgVSswMkRBLCBVKzAyREMsIFUrMjAwMC0yMDZGLCBVKzIwNzQsIFUrMjBBQywgVSsyMTIyLCBVKzIxOTEsIFUrMjE5MyxcbiAgICAgICAgICBVKzIyMTIsIFUrMjIxNSwgVStGRUZGLCBVK0ZGRkQ7XG4gICAgICB9XG5cbiAgICAgIGh0bWwsXG4gICAgICBib2R5LFxuICAgICAgI19fbmV4dCB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgaHRtbCB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgJ1VidW50dScsIHNhbnMtc2VyaWY7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICAgICAgY29sb3I6ICNiYmI7XG4gICAgICB9XG5cbiAgICAgIGJvZHkge1xuICAgICAgICAvLyBtYXgtd2lkdGg6IDM4cmVtO1xuICAgICAgICBtYXgtd2lkdGg6IDEwMjRweDtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIGJhY2tncm91bmQ6IGJsYWNrO1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHt3YWxscGFwZXJ9KTtcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbi14OiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XG4gICAgICB9XG5cbiAgICAgIGEge1xuICAgICAgICBjb2xvcjogIzQyOWFlZjtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgfVxuXG4gICAgICBhOmhvdmVyIHtcbiAgICAgICAgZmlsdGVyOiBicmlnaHRuZXNzKDEyNSUpO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgIH1cblxuICAgICAgaDEsXG4gICAgICBoMixcbiAgICAgIGgzIHtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdFdGhub2NlbnRyaWMnO1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICBjb2xvcjogIzk4YzM3OTtcbiAgICAgIH1cblxuICAgICAgcCB7XG4gICAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuXG4gICAgPHN0eWxlIGpzeD57YFxuICAgICAgLmxheW91dCB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciBhdXRvO1xuICAgICAgfVxuXG4gICAgICAuY29udGVudCB7XG4gICAgICAgIHBhZGRpbmc6ICR7aXNIb21lID8gMCA6ICcxcmVtJ307XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7aXNIb21lID8gJ3RyYW5zcGFyZW50JyA6ICdyZ2JhKDQwLCA0NCwgNTIsIDAuNSknfTtcbiAgICAgIH1cbiAgICBgfTwvc3R5bGU+XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBMYXlvdXRcbiJdfQ== */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/layouts/Default/index.js */"),
    dynamic: [isHome ? 0 : '1rem', isHome ? 'transparent' : 'rgba(40, 44, 52, 0.5)'],
    __self: this
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ })

})
//# sourceMappingURL=index.js.8325c0d35031c31ed101.hot-update.js.map