(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{12:function(e,t,n){e.exports=n(136)},459:function(e,t,n){e.exports=n(586)},488:function(e,t,n){e.exports=n(90)},585:function(e,t,n){__NEXT_REGISTER_PAGE("/_app",function(){return e.exports=n(740),{page:e.exports.default}})},586:function(e,t,n){"use strict";var r=n(58),o=n(9);Object.defineProperty(t,"__esModule",{value:!0}),t.createUrl=x,t.Container=t.default=void 0;var a=o(n(135)),u=o(n(137)),i=o(n(587)),c=o(n(25)),s=o(n(26)),f=o(n(41)),l=o(n(42)),p=o(n(43)),d=o(n(40)),h=r(n(0)),v=o(n(4)),g=n(65),y=n(90),w=function(e){function t(){return(0,c.default)(this,t),(0,f.default)(this,(0,l.default)(t).apply(this,arguments))}return(0,p.default)(t,e),(0,s.default)(t,[{key:"getChildContext",value:function(){return{headManager:this.props.headManager,router:(0,y.makePublicRouterInstance)(this.props.router)}}},{key:"componentDidCatch",value:function(e){throw e}},{key:"render",value:function(){var e=this.props,t=e.router,n=e.Component,r=e.pageProps,o=x(t);return h.default.createElement(m,null,h.default.createElement(n,(0,i.default)({},r,{url:o})))}}],[{key:"getInitialProps",value:function(){var e=(0,u.default)(a.default.mark(function e(t){var n,r,o;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.Component,t.router,r=t.ctx,e.next=3,(0,g.loadGetInitialProps)(n,r);case 3:return o=e.sent,e.abrupt("return",{pageProps:o});case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}]),t}(h.Component);t.default=w,(0,d.default)(w,"childContextTypes",{headManager:v.default.object,router:v.default.object});var m=function(e){function t(){return(0,c.default)(this,t),(0,f.default)(this,(0,l.default)(t).apply(this,arguments))}return(0,p.default)(t,e),(0,s.default)(t,[{key:"componentDidMount",value:function(){this.scrollToHash()}},{key:"componentDidUpdate",value:function(){this.scrollToHash()}},{key:"scrollToHash",value:function(){var e=window.location.hash;if(e=!!e&&e.substring(1)){var t=document.getElementById(e);t&&setTimeout(function(){return t.scrollIntoView()},0)}}},{key:"render",value:function(){return this.props.children}}]),t}(h.Component);t.Container=m;var b=(0,g.execOnce)(function(){0});function x(e){var t=e.pathname,n=e.asPath,r=e.query;return{get query(){return b(),r},get pathname(){return b(),t},get asPath(){return b(),n},back:function(){b(),e.back()},push:function(t,n){return b(),e.push(t,n)},pushTo:function(t,n){b();var r=n?t:null,o=n||t;return e.push(r,o)},replace:function(t,n){return b(),e.replace(t,n)},replaceTo:function(t,n){b();var r=n?t:null,o=n||t;return e.replace(r,o)}}}},587:function(e,t,n){var r=n(141);function o(){return e.exports=o=r||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o.apply(this,arguments)}e.exports=o},740:function(e,t,n){"use strict";n.r(t);var r=n(12),o=n.n(r),a=n(0),u=n.n(a),i=n(459),c=n.n(i),s=n(488),f=n.n(s),l=n(145),p=n.n(l),d=n(8),h=n(77),v=(n(626),n(628),{title:"",description:"A fistful of heroes striving to create a better world through better software.",canonical:"https://www.ingloriouscoderz.it",titleTemplate:"%s | Inglorious Coderz",openGraph:{type:"website",locale:"en_US",url:"https://www.ingloriouscoderz.it",title:"Inglorious Coderz",description:"A fistful of heroes striving to create a better world through better software.",defaultImageWidth:1200,defaultImageHeight:1200,images:[{url:"https://www.ingloriouscoderz.it/static/images/backgrounds/metal-800x600.png",width:800,height:600,alt:"Inglorious Coderz"}],site_name:"Inglorious Coderz"}});function g(e,t,n,r,o,a,u){try{var i=e[a](u),c=i.value}catch(e){return void n(e)}i.done?t(c):Promise.resolve(c).then(r,o)}var y="undefined"!=typeof window,w="ga:clientId";function m(e,t,n,r,o,a,u){try{var i=e[a](u),c=i.value}catch(e){return void n(e)}i.done?t(c):Promise.resolve(c).then(r,o)}function b(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var a=e.apply(t,n);function u(e){m(a,r,o,u,i,"next",e)}function i(e){m(a,r,o,u,i,"throw",e)}u(void 0)})}}var x=function(){var e=b(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("serviceWorker"in navigator){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,navigator.serviceWorker.register("/service-worker.js");case 5:console.log("service worker registered."),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),console.warn("service worker registration failed.",e.t0.message);case 11:case"end":return e.stop()}},e,null,[[2,8]])}));return function(){return e.apply(this,arguments)}}();function k(e){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function P(e,t,n,r,o,a,u){try{var i=e[a](u),c=i.value}catch(e){return void n(e)}i.done?t(c):Promise.resolve(c).then(r,o)}function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function C(e,t){return(C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=E(e);if(t){var o=E(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===k(t)||"function"==typeof t))return t;return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,n)}}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var O,j,T=Object(h.a)(function(e){function t(t){return Object(a.useEffect)(function(){x()},[]),u.a.createElement(e,t)}return t.getInitialProps=b(o.a.mark(function t(){var n,r=arguments;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n=e.getInitialProps)){t.next=7;break}return t.next=4,n.apply(void 0,r);case 4:t.t0=t.sent,t.next=8;break;case 7:t.t0={};case 8:return t.abrupt("return",t.t0);case 9:case"end":return t.stop()}},t)})),t},(O="UA-61816704-1",j=f.a,function(e){function t(t){Object(a.useEffect)(function(){if(y&&!window._ga_initialized){var e,t,r,o,a,u;e=window,t=document,r="script",o="ga",e.GoogleAnalyticsObject=o,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,a=t.createElement(r),u=t.getElementsByTagName(r)[0],a.async=1,a.src="https://www.google-analytics.com/analytics.js",u.parentNode.insertBefore(a,u),ga("create",O,{storage:"none",clientId:localStorage.getItem(w)}),ga(function(e){localStorage.setItem(w,e.get("clientId"))}),window._ga_initialized=!0,n();var i=j.onRouteChangeComplete;j.onRouteChangeComplete=function(){"function"==typeof i&&i(),n()}}},[]);var n=function(){var e=location,t=e.pathname,n=e.search;ga("send","pageview",t+n)};return u.a.createElement(e,t)}return t.getInitialProps=(n=o.a.mark(function t(){var n,r=arguments;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n=e.getInitialProps)){t.next=7;break}return t.next=4,n.apply(void 0,r);case 4:t.t0=t.sent,t.next=8;break;case 7:t.t0={};case 8:return t.abrupt("return",t.t0);case 9:case"end":return t.stop()}},t)}),function(){var e=this,t=arguments;return new Promise(function(r,o){var a=n.apply(e,t);function u(e){g(a,r,o,u,i,"next",e)}function i(e){g(a,r,o,u,i,"throw",e)}u(void 0)})}),t;var n}),Object(d.d)());t.default=T(function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(s,c.a);var t,n,r,a=_(s);function s(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),a.apply(this,arguments)}return t=s,n=[{key:"render",value:function(){var e=this.props,t=e.Component,n=e.pageProps;return u.a.createElement(i.Container,null,u.a.createElement(p.a,{config:v}),u.a.createElement(t,n))}}],r=[{key:"getInitialProps",value:function(){var e,t=(e=o.a.mark(function e(t){var n,r,a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.Component,t.router,r=t.ctx,a={},!n.getInitialProps){e.next=6;break}return e.next=5,n.getInitialProps(r);case 5:a=e.sent;case 6:return e.abrupt("return",{pageProps:a});case 7:case"end":return e.stop()}},e)}),function(){var t=this,n=arguments;return new Promise(function(r,o){var a=e.apply(t,n);function u(e){P(a,r,o,u,i,"next",e)}function i(e){P(a,r,o,u,i,"throw",e)}u(void 0)})});return function(e){return t.apply(this,arguments)}}()}],n&&I(t.prototype,n),r&&I(t,r),s}())}},[[585,1,0,2]]]);