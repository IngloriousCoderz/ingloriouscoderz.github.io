(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{150:function(t,e,n){"use strict";n.r(e),n.d(e,"withSW",function(){return y});var r=n(38),o=n.n(r),i=n(0),u=n.n(i);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e,n,r,o,i,u){try{var c=t[i](u),a=c.value}catch(t){return void n(t)}c.done?e(a):Promise.resolve(a).then(r,o)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var y=function(t){return function(e){function n(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),s(this,p(n).apply(this,arguments))}var r,c,y;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}(n,i["Component"]),r=n,c=[{key:"componentDidMount",value:function(){"serviceWorker"in navigator&&navigator.serviceWorker.register("/service-worker.js").then(function(){return console.log("service worker registered.")}).catch(function(t){return console.warn("service worker registration failed.",t.message)})}},{key:"render",value:function(){return u.a.createElement(t,this.props)}}],y=[{key:"getInitialProps",value:function(){var e,n=(e=o.a.mark(function e(){var n,r=arguments;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n=t.getInitialProps)){e.next=7;break}return e.next=4,n.apply(void 0,r);case 4:e.t0=e.sent,e.next=8;break;case 7:e.t0={};case 8:return e.abrupt("return",e.t0);case 9:case"end":return e.stop()}},e,this)}),function(){var t=this,n=arguments;return new Promise(function(r,o){var i=e.apply(t,n);function u(t){a(i,r,o,u,c,"next",t)}function c(t){a(i,r,o,u,c,"throw",t)}u(void 0)})});return function(){return n.apply(this,arguments)}}()}],c&&f(r.prototype,c),y&&f(r,y),n}()}},38:function(t,e,n){t.exports=n(172)},695:function(t,e,n){__NEXT_REGISTER_PAGE("/hoc/withSW",function(){return t.exports=n(150),{page:t.exports.default}})}},[[695,1,0]]]);