(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{10:function(e,t,n){var a;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var o=typeof a;if("string"===o||"number"===o)e.push(a);else if(Array.isArray(a)&&a.length){var l=r.apply(null,a);l&&e.push(l)}else if("object"===o)for(var u in a)n.call(a,u)&&a[u]&&e.push(u)}}return e.join(" ")}void 0!==e&&e.exports?(r.default=r,e.exports=r):void 0===(a=function(){return r}.apply(t,[]))||(e.exports=a)}()},177:function(e,t,n){"use strict";var a=n(9),r=a(n(89)),o=a(n(25)),l=a(n(26)),u=a(n(41)),i=a(n(42)),s=a(n(43)),c=a(n(93)),d=a(n(40)),f=a(n(170)),m=a(n(141)),p=a(n(63)),h=a(n(134)),y=a(n(178)),g=a(n(0)),v=a(n(4)),w=[],E=new y.default,b=!1;function x(e){var t=e(),n={loading:!0,loaded:null,error:null};return n.promise=t.then(function(e){return n.loading=!1,n.loaded=e,e}).catch(function(e){throw n.loading=!1,n.error=e,e}),n}function k(e){var t={loading:!1,loaded:{},error:null},n=[];try{(0,h.default)(e).forEach(function(a){var r=x(e[a]);r.loading?t.loading=!0:(t.loaded[a]=r.loaded,t.error=r.error),n.push(r.promise),r.promise.then(function(e){t.loaded[a]=e}).catch(function(e){t.error=e})})}catch(e){t.error=e}return t.promise=p.default.all(n).then(function(e){return t.loading=!1,e}).catch(function(e){throw t.loading=!1,e}),t}function _(e,t){return g.default.createElement((n=e)&&n.__esModule?n.default:n,t);var n}function j(e,t){var n,a,p=(0,m.default)({loader:null,loading:null,delay:200,timeout:null,render:_,webpack:null,modules:null},t),h=null;function y(){return h||(h=e(p.loader)),h.promise}if("undefined"==typeof window&&w.push(y),!b&&"undefined"!=typeof window&&"function"==typeof p.webpack){var x=p.webpack(),k=!0,j=!1,N=void 0;try{for(var M,I=(0,f.default)(x);!(k=(M=I.next()).done);k=!0){var S=M.value;E.set(S,function(){return y()})}}catch(e){j=!0,N=e}finally{try{k||null==I.return||I.return()}finally{if(j)throw N}}}return a=n=function(t){function n(t){var a;return(0,o.default)(this,n),a=(0,u.default)(this,(0,i.default)(n).call(this,t)),(0,d.default)((0,c.default)((0,c.default)(a)),"retry",function(){a.setState({error:null,loading:!0,timedOut:!1}),h=e(p.loader),a._loadModule()}),y(),a.state={error:h.error,pastDelay:!1,timedOut:!1,loading:h.loading,loaded:h.loaded},a}return(0,s.default)(n,t),(0,l.default)(n,[{key:"componentWillMount",value:function(){this._mounted=!0,this._loadModule()}},{key:"_loadModule",value:function(){var e=this;if(this.context.loadable&&(0,r.default)(p.modules)&&p.modules.forEach(function(t){e.context.loadable.report(t)}),h.loading){"number"==typeof p.delay&&(0===p.delay?this.setState({pastDelay:!0}):this._delay=setTimeout(function(){e.setState({pastDelay:!0})},p.delay)),"number"==typeof p.timeout&&(this._timeout=setTimeout(function(){e.setState({timedOut:!0})},p.timeout));var t=function(){e._mounted&&(e.setState({error:h.error,loaded:h.loaded,loading:h.loading}),e._clearTimeouts())};h.promise.then(function(){t()}).catch(function(e){t()})}}},{key:"componentWillUnmount",value:function(){this._mounted=!1,this._clearTimeouts()}},{key:"_clearTimeouts",value:function(){clearTimeout(this._delay),clearTimeout(this._timeout)}},{key:"render",value:function(){return this.state.loading||this.state.error?g.default.createElement(p.loading,{isLoading:this.state.loading,pastDelay:this.state.pastDelay,timedOut:this.state.timedOut,error:this.state.error,retry:this.retry}):this.state.loaded?p.render(this.state.loaded,this.props):null}}],[{key:"preload",value:function(){return y()}}]),n}(g.default.Component),(0,d.default)(n,"contextTypes",{loadable:v.default.shape({report:v.default.func.isRequired})}),a}function N(e){return j(x,e)}function M(e){for(var t=[];e.length;){var n=e.pop();t.push(n())}return p.default.all(t).then(function(){if(e.length)return M(e)})}N.Map=function(e){if("function"!=typeof e.render)throw new Error("LoadableMap requires a `render(loaded, props)` function");return j(k,e)},N.preloadAll=function(){return new p.default(function(e,t){M(w).then(e,t)})},N.preloadReady=function(e){return new p.default(function(t,n){var a=e.reduce(function(e,t){var n=E.get(t);return n?(e.push(n),e):e},[]);b=!0,E.clear(),M(a).then(t,t)})},e.exports=N},178:function(e,t,n){e.exports=n(179)},179:function(e,t,n){n(87),n(57),n(64),n(180),n(181),n(182),n(183),e.exports=n(11).Map},180:function(e,t,n){"use strict";var a=n(171),r=n(140);e.exports=n(172)("Map",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{get:function(e){var t=a.getEntry(r(this,"Map"),e);return t&&t.v},set:function(e,t){return a.def(r(this,"Map"),0===e?0:e,t)}},a,!0)},181:function(e,t,n){var a=n(14);a(a.P+a.R,"Map",{toJSON:n(173)("Map")})},182:function(e,t,n){n(174)("Map")},183:function(e,t,n){n(175)("Map")},3:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(10),l=n.n(o);t.a=function(e){var t=e.max,n=void 0===t?4:t,a=e.children;return r.a.createElement("div",{className:l()("col-xs-12",{"col-sm-6":n>=2,"col-md-4":n>=3,"col-lg-3":n>=4})},a)}},495:function(e,t,n){e.exports=n(719)},7:function(e,t,n){"use strict";var a=n(0),r=n.n(a);t.a=function(e){var t=e.children;return r.a.createElement("div",{className:"row"},t)}},717:function(e,t,n){__NEXT_REGISTER_PAGE("/where",function(){return e.exports=n(718),{page:e.exports.default}})},718:function(e,t,n){"use strict";n.r(t);var a=n(5),r=n.n(a),o=n(0),l=n.n(o),u=n(495),i=n.n(u),s=n(6),c=n(7),d=n(3),f=n(2),m=n(1),p=i()(function(){return Promise.all([n.e(0),n.e(2),n.e(27)]).then(n.bind(null,499))},{ssr:!1,loadableGenerated:{webpack:function(){return[499]},modules:["../../components/map"]}}),h={torino:[7.6824892,45.0677551],roma:[12.4829321,41.8933203],rossano:[16.6329574,39.599538],pittulongu:[9.5736584,40.9489027],panama:[-79.5341802,8.9714493],sydney:[151.2070115,-33.872978],newyork:[-74.0060152,40.7127281]};t.default=function(){return l.a.createElement(s.a,{path:"where",title:"Where",description:"Places where you can find us, online or IRL."},l.a.createElement("article",{className:"jsx-3442756548 card card-1"},l.a.createElement("h1",{className:"jsx-3442756548"},"Where"),l.a.createElement("p",{className:"jsx-3442756548"},"The Inglorious Headquarters are based in Turin, Italy, but we can operate worldwide, remotely or on site."),l.a.createElement("div",{className:"jsx-3442756548 map-container"},l.a.createElement(p,{offices:h})),l.a.createElement("p",{className:"jsx-3442756548"},"If you want to contact us just drop a mail"," ",l.a.createElement(m.a,{to:"mailto:antony.mistretta@gmail.com"},"here"),". You can find us online too:")),l.a.createElement(c.a,null,l.a.createElement(d.a,null,l.a.createElement(f.a,{title:"Github"},l.a.createElement("p",{className:"jsx-3442756548"},"Our contributions to open source."),l.a.createElement("p",{className:"jsx-3442756548 text-right"},l.a.createElement(m.a,{to:"https://github.com/IngloriousCoderz/"},"go to our Github page›")))),l.a.createElement(d.a,null,l.a.createElement(f.a,{title:"Instagram"},l.a.createElement("p",{className:"jsx-3442756548"},"Some pictures about our most relevant updates."),l.a.createElement("p",{className:"jsx-3442756548 text-right"},l.a.createElement(m.a,{to:"https://www.instagram.com/ingloriouscoderz/"},"go to our Instagram page›")))),l.a.createElement(d.a,null,l.a.createElement(f.a,{title:"Facebook"},l.a.createElement("p",{className:"jsx-3442756548"},"Same as Instagram, but also some cool links and nerdy jokes."),l.a.createElement("p",{className:"jsx-3442756548 text-right"},l.a.createElement(m.a,{to:"https://www.facebook.com/IngloriousCoderz/"},"go to our Facebook page›")))),l.a.createElement(d.a,null,l.a.createElement(f.a,{title:"LinkedIn"},l.a.createElement("p",{className:"jsx-3442756548"},"Not used at present, but who knows in the future? Stay tuned!"),l.a.createElement("p",{className:"jsx-3442756548 text-right"},l.a.createElement(m.a,{to:"https://www.linkedin.com/company/inglorious-coderz/"},"go to our LinkedIn page›"))))),l.a.createElement(r.a,{styleId:"3442756548",css:[".map-container.jsx-3442756548{height:400px;margin-bottom:1rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}"]}))}},719:function(e,t,n){"use strict";var a=n(9);Object.defineProperty(t,"__esModule",{value:!0}),t.noSSR=c,t.default=function(e,t){var n=i.default,a={loading:function(e){e.error,e.isLoading;return u.default.createElement(d,null)}};"function"==typeof e.then?a.loader=function(){return e}:"function"==typeof e?a.loader=e:"object"===(0,l.default)(e)&&(a=(0,o.default)({},a,e));a=(0,o.default)({},a,t),e.render&&(a.render=function(t,n){return e.render(n,t)});if(e.modules){n=i.default.Map;var s={},f=e.modules();(0,r.default)(f).forEach(function(e){var t=f[e];"function"!=typeof t.then?s[e]=t:s[e]=function(){return t.then(function(e){return e.default||e})}}),a.loader=s}a.loadableGenerated&&delete(a=(0,o.default)({},a,a.loadableGenerated)).loadableGenerated;if("boolean"==typeof a.ssr){if(!a.ssr)return delete a.ssr,c(n,a);delete a.ssr}return n(a)};var r=a(n(134)),o=a(n(82)),l=a(n(91)),u=a(n(0)),i=a(n(177)),s="undefined"==typeof window;function c(e,t){return delete t.webpack,delete t.modules,s?function(){return u.default.createElement(t.loading,{error:null,isLoading:!0,pastDelay:!1,timedOut:!1})}:e(t)}function d(){return u.default.createElement("p",null,"loading...")}}},[[717,1,0]]]);