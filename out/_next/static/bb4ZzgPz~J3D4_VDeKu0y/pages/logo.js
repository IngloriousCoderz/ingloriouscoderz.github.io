(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{693:function(e,t,a){__NEXT_REGISTER_PAGE("/logo",function(){return e.exports=a(694),{page:e.exports.default}})},694:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return d});var r=a(2),n=a.n(r),s=a(0),c=a.n(s),o=a(4),l=a(141);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var x=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],d=function(e){function t(){var e,a,r,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var s=arguments.length,c=new Array(s),o=0;o<s;o++)c[o]=arguments[o];return r=this,n=(e=m(t)).call.apply(e,[this].concat(c)),a=!n||"object"!==i(n)&&"function"!=typeof n?p(r):n,v(p(p(a)),"state",{first:{letter:"A",reverse:!1},second:{letter:"A",reverse:!1}}),v(p(p(a)),"changeLetter",function(e){return function(t){var r=t.target.value;a.setState(function(t){return v({},e,{letter:r,reverse:t[e].reverse})})}}),v(p(p(a)),"changeReverse",function(e){return function(t){var r=t.target.checked;a.setState(function(t){return v({},e,{letter:t[e].letter,reverse:r})})}}),a}var a,r,d;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,s["PureComponent"]),a=t,(r=[{key:"render",value:function(){var e=this.state,t=e.first,a=e.second;return c.a.createElement(o.a,null,c.a.createElement("div",{className:"jsx-2195764778 row"},c.a.createElement("div",{className:"jsx-2195764778 col-xs-12 col-md-4"},c.a.createElement("section",{className:"jsx-2195764778 card card-1"},c.a.createElement("h1",{className:"jsx-2195764778"},"Create your own Inglorious logo"),c.a.createElement("p",{className:"jsx-2195764778"},"Simply select the two letters you want to show and see it live!"),c.a.createElement("form",{className:"jsx-2195764778"},c.a.createElement("div",{className:"jsx-2195764778 row"},c.a.createElement("div",{className:"jsx-2195764778 col-xs-6"},c.a.createElement("label",{className:"jsx-2195764778"},"First letter:")),c.a.createElement("div",{className:"jsx-2195764778 col-xs-6"},c.a.createElement("select",{autoFocus:!0,value:t.letter,onChange:this.changeLetter("first"),className:"jsx-2195764778"},x.map(function(e){return c.a.createElement("option",{key:e,className:"jsx-2195764778"},e)}))),c.a.createElement("div",{className:"jsx-2195764778 col-xs-6"},c.a.createElement("label",{className:"jsx-2195764778"},"Reverse:")),c.a.createElement("div",{className:"jsx-2195764778 col-xs-6"},c.a.createElement("input",{type:"checkbox",checked:t.reverse,onChange:this.changeReverse("first"),className:"jsx-2195764778"}))),c.a.createElement("div",{className:"jsx-2195764778 row"},c.a.createElement("div",{className:"jsx-2195764778 col-xs-6"},c.a.createElement("label",{className:"jsx-2195764778"},"Second letter:")),c.a.createElement("div",{className:"jsx-2195764778 col-xs-6"},c.a.createElement("select",{value:a.letter,onChange:this.changeLetter("second"),className:"jsx-2195764778"},x.map(function(e){return c.a.createElement("option",{key:e,className:"jsx-2195764778"},e)}))),c.a.createElement("div",{className:"jsx-2195764778 col-xs-6"},c.a.createElement("label",{className:"jsx-2195764778"},"Reverse:")),c.a.createElement("div",{className:"jsx-2195764778 col-xs-6"},c.a.createElement("input",{type:"checkbox",checked:a.reverse,onChange:this.changeReverse("second"),className:"jsx-2195764778"})))))),c.a.createElement("div",{className:"jsx-2195764778 col-xs-12 col-md-8"},c.a.createElement("section",{className:"jsx-2195764778 card card-1"},c.a.createElement(l.a,{size:280,letters:[t.letter,a.letter],reverse:[t.reverse,a.reverse]})))),c.a.createElement(n.a,{styleId:"2195764778",css:["@media (max-width:640px){.row.jsx-2195764778{margin:0;}}"]}))}}])&&u(a.prototype,r),d&&u(a,d),t}()}},[[693,1,0]]]);