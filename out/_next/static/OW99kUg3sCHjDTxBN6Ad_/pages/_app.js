(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{149:function(t,e,n){"use strict";n.r(e),n.d(e,"withGA",function(){return y});var r=n(38),o=n.n(r),i=n(0),u=n.n(i);function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,e,n,r,o,i,u){try{var a=t[i](u),c=a.value}catch(t){return void n(t)}a.done?e(c):Promise.resolve(c).then(r,o)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function p(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var y=function(t,e){return function(n){return function(r){function y(){var t,e,n,r,o,i,u;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,y);for(var c=arguments.length,f=new Array(c),s=0;s<c;s++)f[s]=arguments[s];return n=this,e=!(r=(t=l(y)).call.apply(t,[this].concat(f)))||"object"!==a(r)&&"function"!=typeof r?p(n):r,o=p(p(e)),u=function(){return ga("send","pageview")},(i="pageview")in o?Object.defineProperty(o,i,{value:u,enumerable:!0,configurable:!0,writable:!0}):o[i]=u,e}var h,d,v;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(y,i["Component"]),h=y,d=[{key:"componentDidMount",value:function(){var n=this;if(!window._ga_initialized){var r,o,i,u,a,c;r=window,o=document,i="script",u="ga",r.GoogleAnalyticsObject=u,r.ga=r.ga||function(){(r.ga.q=r.ga.q||[]).push(arguments)},r.ga.l=1*new Date,a=o.createElement(i),c=o.getElementsByTagName(i)[0],a.async=1,a.src="https://www.google-analytics.com/analytics.js",c.parentNode.insertBefore(a,c),ga("create",t,{storage:"none",clientId:localStorage.getItem("ga:clientId")}),ga(function(t){console.log(t),localStorage.setItem("ga:clientId",t.get("clientId"))}),window._ga_initialized=!0,this.pageview();var f=e.onRouteChangeComplete;e.onRouteChangeComplete=function(){"function"==typeof f&&f(),n.pageview()}}}},{key:"render",value:function(){return u.a.createElement(n,this.props)}}],v=[{key:"getInitialProps",value:function(){var t,e=(t=o.a.mark(function t(){var e,r=arguments;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e=n.getInitialProps)){t.next=7;break}return t.next=4,e.apply(void 0,r);case 4:t.t0=t.sent,t.next=8;break;case 7:t.t0={};case 8:return t.abrupt("return",t.t0);case 9:case"end":return t.stop()}},t,this)}),function(){var e=this,n=arguments;return new Promise(function(r,o){var i=t.apply(e,n);function u(t){c(i,r,o,u,a,"next",t)}function a(t){c(i,r,o,u,a,"throw",t)}u(void 0)})});return function(){return e.apply(this,arguments)}}()}],d&&f(h.prototype,d),v&&f(h,v),y}()}}},150:function(t,e,n){"use strict";n.r(e),n.d(e,"withSW",function(){return l});var r=n(0),o=n.n(r);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var l=function(t){return function(e){function n(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),a(this,c(n).apply(this,arguments))}var i,l,s;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(n,r["Component"]),i=n,(l=[{key:"componentDidMount",value:function(){"serviceWorker"in navigator&&navigator.serviceWorker.register("/service-worker.js").then(function(){return console.log("service worker registered.")}).catch(function(t){return console.warn("service worker registration failed.",t.message)})}},{key:"render",value:function(){return o.a.createElement(t,this.props)}}])&&u(i.prototype,l),s&&u(i,s),n}()}},38:function(t,e,n){t.exports=n(172)},471:function(t,e,n){t.exports=n(606)},501:function(t,e,n){t.exports=n(86)},605:function(t,e,n){__NEXT_REGISTER_PAGE("/_app",function(){return t.exports=n(753),{page:t.exports.default}})},606:function(t,e,n){"use strict";var r=n(53),o=n(14);Object.defineProperty(e,"__esModule",{value:!0}),e.createUrl=O,e.Container=e.default=void 0;var i=o(n(139)),u=o(n(140)),a=o(n(607)),c=o(n(20)),f=o(n(21)),l=o(n(40)),s=o(n(41)),p=o(n(42)),y=o(n(37)),h=r(n(0)),d=o(n(6)),v=n(59),b=n(86),g=function(t){function e(){return(0,c.default)(this,e),(0,l.default)(this,(0,s.default)(e).apply(this,arguments))}var n;return(0,p.default)(e,t),(0,f.default)(e,[{key:"getChildContext",value:function(){return{headManager:this.props.headManager,router:(0,b.makePublicRouterInstance)(this.props.router)}}},{key:"componentDidCatch",value:function(t){throw t}},{key:"render",value:function(){var t=this.props,e=t.router,n=t.Component,r=t.pageProps,o=O(e);return h.default.createElement(w,null,h.default.createElement(n,(0,a.default)({},r,{url:o})))}}],[{key:"getInitialProps",value:(n=(0,u.default)(i.default.mark(function t(e){var n,r,o;return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.Component,e.router,r=e.ctx,t.next=3,(0,v.loadGetInitialProps)(n,r);case 3:return o=t.sent,t.abrupt("return",{pageProps:o});case 5:case"end":return t.stop()}},t,this)})),function(t){return n.apply(this,arguments)})}]),e}(h.Component);e.default=g,(0,y.default)(g,"childContextTypes",{headManager:d.default.object,router:d.default.object});var w=function(t){function e(){return(0,c.default)(this,e),(0,l.default)(this,(0,s.default)(e).apply(this,arguments))}return(0,p.default)(e,t),(0,f.default)(e,[{key:"componentDidMount",value:function(){this.scrollToHash()}},{key:"componentDidUpdate",value:function(){this.scrollToHash()}},{key:"scrollToHash",value:function(){var t=window.location.hash;if(t=!!t&&t.substring(1)){var e=document.getElementById(t);e&&setTimeout(function(){return e.scrollIntoView()},0)}}},{key:"render",value:function(){return this.props.children}}]),e}(h.Component);e.Container=w;var m=(0,v.execOnce)(function(){0});function O(t){var e=t.pathname,n=t.asPath,r=t.query;return{get query(){return m(),r},get pathname(){return m(),e},get asPath(){return m(),n},back:function(){m(),t.back()},push:function(e,n){return m(),t.push(e,n)},pushTo:function(e,n){m();var r=n?e:null,o=n||e;return t.push(r,o)},replace:function(e,n){return m(),t.replace(e,n)},replaceTo:function(e,n){m();var r=n?e:null,o=n||e;return t.replace(r,o)}}}},607:function(t,e,n){var r=n(146);function o(){return t.exports=o=r||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o.apply(this,arguments)}t.exports=o},753:function(t,e,n){"use strict";n.r(e);var r=n(38),o=n.n(r),i=n(0),u=n.n(i),a=n(471),c=n.n(a),f=n(501),l=n.n(f),s=n(151),p=n.n(s),y=n(8),h=n(73),d=(n(641),n(643),{noindex:!0,title:"",description:"A fistful of heroes striving to create a better world through better software.",canonical:"https://www.ingloriouscoderz.it",titleTemplate:"%s | Inglorious Coderz",openGraph:{type:"website",locale:"en_US",url:"https://www.ingloriouscoderz.it",title:"Inglorious Coderz",description:"A fistful of heroes striving to create a better world through better software.",defaultImageWidth:1200,defaultImageHeight:1200,images:[{url:"https://www.ingloriouscoderz.it/static/images/metal-800x600png",width:800,height:600,alt:"Inglorious Coderz"}],site_name:"Inglorious Coderz"}}),v=n(149),b=n(150);function g(t){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function w(t,e,n,r,o,i,u){try{var a=t[i](u),c=a.value}catch(t){return void n(t)}a.done?e(c):Promise.resolve(c).then(r,o)}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function O(t,e){return!e||"object"!==g(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function P(t){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function _(t,e){return(_=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var k=Object(h.a)(b.withSW,Object(v.withGA)("UA-61816704-1",l.a),Object(y.d)());e.default=k(function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),O(this,P(e).apply(this,arguments))}var n,r,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_(t,e)}(e,c.a),n=e,r=[{key:"render",value:function(){var t=this.props,e=t.Component,n=t.pageProps;return u.a.createElement(a.Container,null,u.a.createElement(p.a,{config:d}),u.a.createElement(e,n))}}],i=[{key:"getInitialProps",value:function(){var t,e=(t=o.a.mark(function t(e){var n,r,i;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.Component,e.router,r=e.ctx,i={},!n.getInitialProps){t.next=6;break}return t.next=5,n.getInitialProps(r);case 5:i=t.sent;case 6:return t.abrupt("return",{pageProps:i});case 7:case"end":return t.stop()}},t,this)}),function(){var e=this,n=arguments;return new Promise(function(r,o){var i=t.apply(e,n);function u(t){w(i,r,o,u,a,"next",t)}function a(t){w(i,r,o,u,a,"throw",t)}u(void 0)})});return function(t){return e.apply(this,arguments)}}()}],r&&m(n.prototype,r),i&&m(n,i),e}())}},[[605,1,0,2]]]);