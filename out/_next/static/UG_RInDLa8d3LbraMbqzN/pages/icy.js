(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{675:function(e,a,t){__NEXT_REGISTER_PAGE("/icy",function(){return e.exports=t(676),{page:e.exports.default}})},676:function(e,a,t){"use strict";t.r(a);var r=t(5),n=t.n(r),c=t(0),s=t.n(c),l=t(8),o=t(6),i=t(7),m=t(147);function u(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function y(e,a){return function(e){if(Array.isArray(e))return e}(e)||function(e,a){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var t=[],r=!0,n=!1,c=void 0;try{for(var s,l=e[Symbol.iterator]();!(r=(s=l.next()).done)&&(t.push(s.value),!a||t.length!==a);r=!0);}catch(e){n=!0,c=e}finally{try{r||null==l.return||l.return()}finally{if(n)throw c}}return t}(e,a)||function(e,a){if(!e)return;if("string"==typeof e)return x(e,a);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return x(e,a)}(e,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,r=new Array(a);t<a;t++)r[t]=e[t];return r}var d=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];a.default=function(){var e=y(Object(c.useState)([{image:"I",reverse:!1,eye:!0},{image:"C",reverse:!1,eye:!1}]),2),a=e[0],t=e[1],r=function(e){return function(r){return function(n){var c=n.target,s=c.checked,l=c.value,o="on"===l;t(a.map(function(a,t){return t===r?function(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?Object(arguments[a]):{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(a){u(e,a,t[a])})}return e}({},a,u({},e,o?s:l)):a}))}}},x=r("image"),E=r("reverse"),f=r("eye"),j=y(a,2),p=j[0],v=j[1];return s.a.createElement(o.a,{path:"icy",title:"Icy",description:"Play with Icy, our 3D logo, and customize it to your liking!"},s.a.createElement(l.a,null,s.a.createElement("article",{className:"jsx-3071024856 card card-1"},s.a.createElement("h1",{className:"jsx-3071024856"},"Icy"),s.a.createElement("p",{className:"jsx-3071024856"},"Meet Icy, our Inglorious Logo! It's a CSS3 cube with SVG faces that captures mouse movement (or finger swipe on mobile). Its name is Icy because its faces are an “I” and a “C”. Also, its catchphrase is “I see...”"),s.a.createElement("p",{className:"jsx-3071024856"},"Why don't you try and make your own Inglorious logo? You can give life to Amy, or Guy, or even Qzy!")),s.a.createElement(i.a,null,s.a.createElement("div",{className:"jsx-3071024856 col-xs-12 col-md-4"},s.a.createElement("article",{className:"jsx-3071024856 card card-1"},s.a.createElement("h2",{className:"jsx-3071024856"},"This is your own ",a[0].image,a[1].image.toLowerCase(),"y"),s.a.createElement("p",{className:"jsx-3071024856"},"Simply play with the parameters below and see it change live!"),s.a.createElement("form",{className:"jsx-3071024856"},s.a.createElement(i.a,null,s.a.createElement("div",{className:"jsx-3071024856 col-xs-6"},s.a.createElement("label",{className:"jsx-3071024856"},"Left side")),s.a.createElement("div",{className:"jsx-3071024856 col-xs-6"},s.a.createElement("select",{autoFocus:!0,value:p.image,onChange:x(0),className:"jsx-3071024856"},d.map(function(e){return s.a.createElement("option",{key:e,className:"jsx-3071024856"},e)}))),s.a.createElement("div",{className:"jsx-3071024856 col-xs-6"},s.a.createElement("label",{className:"jsx-3071024856"},"Reverse")),s.a.createElement("div",{className:"jsx-3071024856 col-xs-6"},s.a.createElement("input",{type:"checkbox",checked:p.reverse,onChange:E(0),className:"jsx-3071024856"})),s.a.createElement("div",{className:"jsx-3071024856 col-xs-6"},s.a.createElement("label",{className:"jsx-3071024856"},"Eye")),s.a.createElement("div",{className:"jsx-3071024856 col-xs-6"},s.a.createElement("input",{type:"checkbox",checked:p.eye,onChange:f(0),className:"jsx-3071024856"}))),s.a.createElement(i.a,null,s.a.createElement("div",{className:"jsx-3071024856 col-xs-6"},s.a.createElement("label",{className:"jsx-3071024856"},"Right side")),s.a.createElement("div",{className:"jsx-3071024856 col-xs-6"},s.a.createElement("select",{value:v.image,onChange:x(1),className:"jsx-3071024856"},d.map(function(e){return s.a.createElement("option",{key:e,className:"jsx-3071024856"},e)}))),s.a.createElement("div",{className:"jsx-3071024856 col-xs-6"},s.a.createElement("label",{className:"jsx-3071024856"},"Reverse")),s.a.createElement("div",{className:"jsx-3071024856 col-xs-6"},s.a.createElement("input",{type:"checkbox",checked:v.reverse,onChange:E(1),className:"jsx-3071024856"})),s.a.createElement("div",{className:"jsx-3071024856 col-xs-6"},s.a.createElement("label",{className:"jsx-3071024856"},"Eye")),s.a.createElement("div",{className:"jsx-3071024856 col-xs-6"},s.a.createElement("input",{type:"checkbox",checked:v.eye,onChange:f(1),className:"jsx-3071024856"})))))),s.a.createElement("div",{className:"jsx-3071024856 col-xs-12 col-md-8"},s.a.createElement("section",{className:"jsx-3071024856 card card-1 logo-container"},s.a.createElement(m.a,{size:280,faces:a,preventScroll:!0}))))),s.a.createElement(n.a,{styleId:"3071024856",css:[".logo-container.jsx-3071024856{padding-bottom:0.25rem;}"]}))}},7:function(e,a,t){"use strict";var r=t(0),n=t.n(r);a.a=function(e){var a=e.children;return n.a.createElement("div",{className:"row"},a)}}},[[675,1,0]]]);