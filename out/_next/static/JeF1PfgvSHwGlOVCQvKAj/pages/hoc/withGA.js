(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{11:function(e,t,n){e.exports=n(142)},150:function(e,t,n){"use strict";n.r(t),n.d(t,"withGA",function(){return g});var o=n(11),r=n.n(o),i=n(0),a=n.n(i);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t,n,o,r,i,a){try{var c=e[i](a),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(o,r)}function f(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var y="undefined"!=typeof window,g=function(e,t){return function(n){return function(o){function g(){var e,t,n,o,r,i,a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,g);for(var u=arguments.length,f=new Array(u),l=0;l<u;l++)f[l]=arguments[l];return n=this,t=!(o=(e=p(g)).call.apply(e,[this].concat(f)))||"object"!==c(o)&&"function"!=typeof o?s(n):o,r=s(s(t)),a=function(){var e=location,t=e.pathname,n=e.search;ga("send","pageview",t+n)},(i="pageview")in r?Object.defineProperty(r,i,{value:a,enumerable:!0,configurable:!0,writable:!0}):r[i]=a,t}var w,b,v;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(g,i["Component"]),w=g,b=[{key:"componentDidMount",value:function(){var n=this;if(y&&!window._ga_initialized){var o,r,i,a,c,u;o=window,r=document,i="script",a="ga",o.GoogleAnalyticsObject=a,o.ga=o.ga||function(){(o.ga.q=o.ga.q||[]).push(arguments)},o.ga.l=1*new Date,c=r.createElement(i),u=r.getElementsByTagName(i)[0],c.async=1,c.src="https://www.google-analytics.com/analytics.js",u.parentNode.insertBefore(c,u),ga("create",e,{storage:"none",clientId:localStorage.getItem("ga:clientId")}),ga(function(e){localStorage.setItem("ga:clientId",e.get("clientId"))}),window._ga_initialized=!0,this.pageview();var f=t.onRouteChangeComplete;t.onRouteChangeComplete=function(){"function"==typeof f&&f(),n.pageview()}}}},{key:"render",value:function(){return a.a.createElement(n,this.props)}}],v=[{key:"getInitialProps",value:function(){var e,t=(e=r.a.mark(function e(){var t,o=arguments;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=n.getInitialProps)){e.next=7;break}return e.next=4,t.apply(void 0,o);case 4:e.t0=e.sent,e.next=8;break;case 7:e.t0={};case 8:return e.abrupt("return",e.t0);case 9:case"end":return e.stop()}},e,this)}),function(){var t=this,n=arguments;return new Promise(function(o,r){var i=e.apply(t,n);function a(e){u(i,o,r,a,c,"next",e)}function c(e){u(i,o,r,a,c,"throw",e)}a(void 0)})});return function(){return t.apply(this,arguments)}}()}],b&&f(w.prototype,b),v&&f(w,v),g}()}}},700:function(e,t,n){__NEXT_REGISTER_PAGE("/hoc/withGA",function(){return e.exports=n(150),{page:e.exports.default}})}},[[700,1,0]]]);