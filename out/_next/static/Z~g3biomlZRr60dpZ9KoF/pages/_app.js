(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{11:function(t,e,n){t.exports=n(140)},150:function(t,e,n){"use strict";n.r(e),n.d(e,"withGA",function(){return h});var r=n(11),o=n.n(r),a=n(0),i=n.n(a);function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,e,n,r,o,a,i){try{var u=t[a](i),c=u.value}catch(t){return void n(t)}u.done?e(c):Promise.resolve(c).then(r,o)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function p(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var y="undefined"!=typeof window,h=function(t,e){return function(n){return function(r){function h(){var t,e,n,r,o,a,i;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,h);for(var c=arguments.length,s=new Array(c),l=0;l<c;l++)s[l]=arguments[l];return n=this,e=!(r=(t=f(h)).call.apply(t,[this].concat(s)))||"object"!==u(r)&&"function"!=typeof r?p(n):r,o=p(p(e)),i=function(){var t=location,e=t.pathname,n=t.search;ga("send","pageview",e+n)},(a="pageview")in o?Object.defineProperty(o,a,{value:i,enumerable:!0,configurable:!0,writable:!0}):o[a]=i,e}var v,d,b;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}(h,a["Component"]),v=h,d=[{key:"componentDidMount",value:function(){var n=this;if(y&&!window._ga_initialized){var r,o,a,i,u,c;r=window,o=document,a="script",i="ga",r.GoogleAnalyticsObject=i,r.ga=r.ga||function(){(r.ga.q=r.ga.q||[]).push(arguments)},r.ga.l=1*new Date,u=o.createElement(a),c=o.getElementsByTagName(a)[0],u.async=1,u.src="https://www.google-analytics.com/analytics.js",c.parentNode.insertBefore(u,c),ga("create",t,{storage:"none",clientId:localStorage.getItem("ga:clientId")}),ga(function(t){localStorage.setItem("ga:clientId",t.get("clientId"))}),window._ga_initialized=!0,this.pageview();var s=e.onRouteChangeComplete;e.onRouteChangeComplete=function(){"function"==typeof s&&s(),n.pageview()}}}},{key:"render",value:function(){return i.a.createElement(n,this.props)}}],b=[{key:"getInitialProps",value:function(){var t,e=(t=o.a.mark(function t(){var e,r=arguments;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e=n.getInitialProps)){t.next=7;break}return t.next=4,e.apply(void 0,r);case 4:t.t0=t.sent,t.next=8;break;case 7:t.t0={};case 8:return t.abrupt("return",t.t0);case 9:case"end":return t.stop()}},t,this)}),function(){var e=this,n=arguments;return new Promise(function(r,o){var a=t.apply(e,n);function i(t){c(a,r,o,i,u,"next",t)}function u(t){c(a,r,o,i,u,"throw",t)}i(void 0)})});return function(){return e.apply(this,arguments)}}()}],d&&s(v.prototype,d),b&&s(v,b),h}()}}},151:function(t,e,n){"use strict";n.r(e),n.d(e,"withSW",function(){return h});var r=n(11),o=n.n(r),a=n(0),i=n.n(a);function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,e,n,r,o,a,i){try{var u=t[a](i),c=u.value}catch(t){return void n(t)}u.done?e(c):Promise.resolve(c).then(r,o)}function s(t){return function(){var e=this,n=arguments;return new Promise(function(r,o){var a=t.apply(e,n);function i(t){c(a,r,o,i,u,"next",t)}function u(t){c(a,r,o,i,u,"throw",t)}i(void 0)})}}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,e){return!e||"object"!==u(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function y(t,e){return(y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var h=function(t){return function(e){function n(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),l(this,p(n).apply(this,arguments))}var r,u,c;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&y(t,e)}(n,a["Component"]),r=n,u=[{key:"componentDidMount",value:function(){var t=s(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(!1 in navigator)){t.next=2;break}return t.abrupt("return");case 2:return t.prev=2,t.next=5,navigator.serviceWorker.register("/service-worker.js");case 5:console.log("service worker registered."),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(2),console.warn("service worker registration failed.",t.t0.message);case 11:case"end":return t.stop()}},t,this,[[2,8]])}));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){return i.a.createElement(t,this.props)}}],c=[{key:"getInitialProps",value:function(){var e=s(o.a.mark(function e(){var n,r=arguments;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n=t.getInitialProps)){e.next=7;break}return e.next=4,n.apply(void 0,r);case 4:e.t0=e.sent,e.next=8;break;case 7:e.t0={};case 8:return e.abrupt("return",e.t0);case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}],u&&f(r.prototype,u),c&&f(r,c),n}()}},471:function(t,e,n){t.exports=n(606)},502:function(t,e,n){t.exports=n(86)},605:function(t,e,n){__NEXT_REGISTER_PAGE("/_app",function(){return t.exports=n(753),{page:t.exports.default}})},606:function(t,e,n){"use strict";var r=n(53),o=n(15);Object.defineProperty(e,"__esModule",{value:!0}),e.createUrl=k,e.Container=e.default=void 0;var a=o(n(139)),i=o(n(141)),u=o(n(607)),c=o(n(21)),s=o(n(22)),f=o(n(40)),l=o(n(41)),p=o(n(42)),y=o(n(38)),h=r(n(0)),v=o(n(6)),d=n(59),b=n(86),g=function(t){function e(){return(0,c.default)(this,e),(0,f.default)(this,(0,l.default)(e).apply(this,arguments))}var n;return(0,p.default)(e,t),(0,s.default)(e,[{key:"getChildContext",value:function(){return{headManager:this.props.headManager,router:(0,b.makePublicRouterInstance)(this.props.router)}}},{key:"componentDidCatch",value:function(t){throw t}},{key:"render",value:function(){var t=this.props,e=t.router,n=t.Component,r=t.pageProps,o=k(e);return h.default.createElement(w,null,h.default.createElement(n,(0,u.default)({},r,{url:o})))}}],[{key:"getInitialProps",value:(n=(0,i.default)(a.default.mark(function t(e){var n,r,o;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.Component,e.router,r=e.ctx,t.next=3,(0,d.loadGetInitialProps)(n,r);case 3:return o=t.sent,t.abrupt("return",{pageProps:o});case 5:case"end":return t.stop()}},t,this)})),function(t){return n.apply(this,arguments)})}]),e}(h.Component);e.default=g,(0,y.default)(g,"childContextTypes",{headManager:v.default.object,router:v.default.object});var w=function(t){function e(){return(0,c.default)(this,e),(0,f.default)(this,(0,l.default)(e).apply(this,arguments))}return(0,p.default)(e,t),(0,s.default)(e,[{key:"componentDidMount",value:function(){this.scrollToHash()}},{key:"componentDidUpdate",value:function(){this.scrollToHash()}},{key:"scrollToHash",value:function(){var t=window.location.hash;if(t=!!t&&t.substring(1)){var e=document.getElementById(t);e&&setTimeout(function(){return e.scrollIntoView()},0)}}},{key:"render",value:function(){return this.props.children}}]),e}(h.Component);e.Container=w;var m=(0,d.execOnce)(function(){0});function k(t){var e=t.pathname,n=t.asPath,r=t.query;return{get query(){return m(),r},get pathname(){return m(),e},get asPath(){return m(),n},back:function(){m(),t.back()},push:function(e,n){return m(),t.push(e,n)},pushTo:function(e,n){m();var r=n?e:null,o=n||e;return t.push(r,o)},replace:function(e,n){return m(),t.replace(e,n)},replaceTo:function(e,n){m();var r=n?e:null,o=n||e;return t.replace(r,o)}}}},607:function(t,e,n){var r=n(147);function o(){return t.exports=o=r||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o.apply(this,arguments)}t.exports=o},753:function(t,e,n){"use strict";n.r(e);var r=n(11),o=n.n(r),a=n(0),i=n.n(a),u=n(471),c=n.n(u),s=n(502),f=n.n(s),l=n(152),p=n.n(l),y=n(8),h=n(73),v=(n(641),n(643),{title:"",description:"A fistful of heroes striving to create a better world through better software.",canonical:"https://www.ingloriouscoderz.it",titleTemplate:"%s | Inglorious Coderz",openGraph:{type:"website",locale:"en_US",url:"https://www.ingloriouscoderz.it",title:"Inglorious Coderz",description:"A fistful of heroes striving to create a better world through better software.",defaultImageWidth:1200,defaultImageHeight:1200,images:[{url:"https://www.ingloriouscoderz.it/static/images/backgrounds/metal-800x600.png",width:800,height:600,alt:"Inglorious Coderz"}],site_name:"Inglorious Coderz"}}),d=n(150),b=n(151);function g(t){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function w(t,e,n,r,o,a,i){try{var u=t[a](i),c=u.value}catch(t){return void n(t)}u.done?e(c):Promise.resolve(c).then(r,o)}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function k(t,e){return!e||"object"!==g(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function P(t){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function O(t,e){return(O=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var _=Object(h.a)(b.withSW,Object(d.withGA)("UA-61816704-1",f.a),Object(y.d)());e.default=_(function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),k(this,P(e).apply(this,arguments))}var n,r,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&O(t,e)}(e,c.a),n=e,r=[{key:"render",value:function(){var t=this.props,e=t.Component,n=t.pageProps;return i.a.createElement(u.Container,null,i.a.createElement(p.a,{config:v}),i.a.createElement(e,n))}}],a=[{key:"getInitialProps",value:function(){var t,e=(t=o.a.mark(function t(e){var n,r,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.Component,e.router,r=e.ctx,a={},!n.getInitialProps){t.next=6;break}return t.next=5,n.getInitialProps(r);case 5:a=t.sent;case 6:return t.abrupt("return",{pageProps:a});case 7:case"end":return t.stop()}},t,this)}),function(){var e=this,n=arguments;return new Promise(function(r,o){var a=t.apply(e,n);function i(t){w(a,r,o,i,u,"next",t)}function u(t){w(a,r,o,i,u,"throw",t)}i(void 0)})});return function(t){return e.apply(this,arguments)}}()}],r&&m(n.prototype,r),a&&m(n,a),e}())}},[[605,1,0,2]]]);