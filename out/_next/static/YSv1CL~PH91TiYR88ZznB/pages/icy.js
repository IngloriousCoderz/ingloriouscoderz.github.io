(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{7:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=function(e){var t=e.children;return r.a.createElement("div",{className:"row"},t)}},707:function(e,t,a){__NEXT_REGISTER_PAGE("/icy",function(){return e.exports=a(708),{page:e.exports.default}})},708:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return v});var n=a(4),r=a.n(n),c=a(0),s=a.n(c),o=a(8),l=a(6),i=a(7),u=a(154);function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var a=[],n=!0,r=!1,c=void 0;try{for(var s,o=e[Symbol.iterator]();!(n=(s=o.next()).done)&&(a.push(s.value),!t||a.length!==t);n=!0);}catch(e){r=!0,c=e}finally{try{n||null==o.return||o.return()}finally{if(r)throw c}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function y(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function x(e,t){return(x=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function E(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var b=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],v=function(e){function t(){var e,a,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var c=arguments.length,s=new Array(c),o=0;o<c;o++)s[o]=arguments[o];return n=this,r=(e=p(t)).call.apply(e,[this].concat(s)),a=!r||"object"!==m(r)&&"function"!=typeof r?h(n):r,E(h(a),"state",{faces:[{image:"I",reverse:!1,eye:!0},{image:"C",reverse:!1,eye:!1}]}),E(h(a),"changeFeature",function(e){return function(t){return function(n){var r=n.target,c=r.checked,s=r.value,o="on"===s;a.setState(function(a){return{faces:a.faces.map(function(a,n){return n===t?function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},n=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),n.forEach(function(t){E(e,t,a[t])})}return e}({},a,E({},e,o?c:s)):a})}})}}}),E(h(a),"changeLetter",a.changeFeature("image")),E(h(a),"changeReverse",a.changeFeature("reverse")),E(h(a),"changeEye",a.changeFeature("eye")),a}var a,n,v;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&x(e,t)}(t,c["PureComponent"]),a=t,(n=[{key:"render",value:function(){var e=this.state.faces,t=f(e,2),a=t[0],n=t[1];return s.a.createElement(l.a,{path:"icy",title:"Icy",description:"Play with Icy, our 3D logo, and customize it to your liking!"},s.a.createElement(o.a,null,s.a.createElement("article",{className:"jsx-2695115017 card card-1"},s.a.createElement("h1",{className:"jsx-2695115017"},"Icy"),s.a.createElement("p",{className:"jsx-2695115017"},"Meet Icy, our Inglorious Logo! It's a CSS3 cube with SVG faces that captures mouse movement (or finger swipe on mobile). Its name is Icy because its faces are an 'I' and a 'C'. Also, its catchphrase is \"I see...\"."),s.a.createElement("p",{className:"jsx-2695115017"},"Why don't you try and make your own Inglorious logo? You can give life to Amy, or Guy, or even Qzy!")),s.a.createElement(i.a,null,s.a.createElement("div",{className:"jsx-2695115017 col-xs-12 col-md-4"},s.a.createElement("article",{className:"jsx-2695115017 card card-1"},s.a.createElement("h2",{className:"jsx-2695115017"},"This is your own ",e[0].image,e[1].image.toLowerCase(),"y"),s.a.createElement("p",{className:"jsx-2695115017"},"Simply play with the parameters below and see it change live!"),s.a.createElement("form",{className:"jsx-2695115017"},s.a.createElement(i.a,null,s.a.createElement("div",{className:"jsx-2695115017 col-xs-6"},s.a.createElement("label",{className:"jsx-2695115017"},"Left side")),s.a.createElement("div",{className:"jsx-2695115017 col-xs-6"},s.a.createElement("select",{autoFocus:!0,value:a.image,onChange:this.changeLetter(0),className:"jsx-2695115017"},b.map(function(e){return s.a.createElement("option",{key:e,className:"jsx-2695115017"},e)}))),s.a.createElement("div",{className:"jsx-2695115017 col-xs-6"},s.a.createElement("label",{className:"jsx-2695115017"},"Reverse")),s.a.createElement("div",{className:"jsx-2695115017 col-xs-6"},s.a.createElement("input",{type:"checkbox",checked:a.reverse,onChange:this.changeReverse(0),className:"jsx-2695115017"})),s.a.createElement("div",{className:"jsx-2695115017 col-xs-6"},s.a.createElement("label",{className:"jsx-2695115017"},"Eye")),s.a.createElement("div",{className:"jsx-2695115017 col-xs-6"},s.a.createElement("input",{type:"checkbox",checked:a.eye,onChange:this.changeEye(0),className:"jsx-2695115017"}))),s.a.createElement(i.a,null,s.a.createElement("div",{className:"jsx-2695115017 col-xs-6"},s.a.createElement("label",{className:"jsx-2695115017"},"Right side")),s.a.createElement("div",{className:"jsx-2695115017 col-xs-6"},s.a.createElement("select",{value:n.image,onChange:this.changeLetter(1),className:"jsx-2695115017"},b.map(function(e){return s.a.createElement("option",{key:e,className:"jsx-2695115017"},e)}))),s.a.createElement("div",{className:"jsx-2695115017 col-xs-6"},s.a.createElement("label",{className:"jsx-2695115017"},"Reverse")),s.a.createElement("div",{className:"jsx-2695115017 col-xs-6"},s.a.createElement("input",{type:"checkbox",checked:n.reverse,onChange:this.changeReverse(1),className:"jsx-2695115017"})),s.a.createElement("div",{className:"jsx-2695115017 col-xs-6"},s.a.createElement("label",{className:"jsx-2695115017"},"Eye")),s.a.createElement("div",{className:"jsx-2695115017 col-xs-6"},s.a.createElement("input",{type:"checkbox",checked:n.eye,onChange:this.changeEye(1),className:"jsx-2695115017"})))))),s.a.createElement("div",{className:"jsx-2695115017 col-xs-12 col-md-8"},s.a.createElement("section",{className:"jsx-2695115017 card card-1 logo-container"},s.a.createElement(u.a,{size:280,faces:e,preventScroll:!0}))))),s.a.createElement(r.a,{styleId:"2695115017",css:[".logo-container.jsx-2695115017{padding-bottom:0.25rem;}"]}))}}])&&y(a.prototype,n),v&&y(a,v),t}()}},[[707,1,0]]]);