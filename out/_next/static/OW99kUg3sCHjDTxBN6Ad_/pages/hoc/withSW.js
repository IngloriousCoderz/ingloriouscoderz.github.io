(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{150:function(e,t,n){"use strict";n.r(t),n.d(t,"withSW",function(){return s});var r=n(0),o=n.n(r);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var s=function(e){return function(t){function n(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),c(this,f(n).apply(this,arguments))}var i,s,p;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(n,r["Component"]),i=n,(s=[{key:"componentDidMount",value:function(){"serviceWorker"in navigator&&navigator.serviceWorker.register("/service-worker.js").then(function(){return console.log("service worker registered.")}).catch(function(e){return console.warn("service worker registration failed.",e.message)})}},{key:"render",value:function(){return o.a.createElement(e,this.props)}}])&&u(i.prototype,s),p&&u(i,p),n}()}},695:function(e,t,n){__NEXT_REGISTER_PAGE("/hoc/withSW",function(){return e.exports=n(150),{page:e.exports.default}})}},[[695,1,0]]]);