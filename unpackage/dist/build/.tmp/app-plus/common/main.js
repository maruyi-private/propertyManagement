(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0380":function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={onLaunch:function(){plus.runtime.setBadgeNumber(0),plus.screen.lockOrientation("portrait-primary");var e=this,n=function(t){e.$store.commit("updatePushMessage",t)};plus.push.addEventListener("click",function(t){n(t.content)}),plus.push.addEventListener("receive",function(e){var o=JSON.parse(e.content);for(var u in plus.runtime.setBadgeNumber(1),o)n(o[u]),t.showToast({icon:"none",title:"接收到新消息",duration:3e3})})},onShow:function(){try{var e=t.getStorageSync("hasLogin"),n=t.getStorageSync("loginToken");n&&(this.$store.commit("loginToken",n),this.getData()),e&&this.$store.commit("setHasLogin",e)}catch(o){}},onHide:function(){console.log(n("App Hide"," at App.vue:69"))},methods:{getData:function(){var t=this,e={};this.$api.userCenter(e,function(e){t.$store.commit("setMyHouse",e.data)})}}};e.default=o}).call(this,n("6e42")["default"],n("0de9")["default"])},"4f06":function(t,e,n){},"52c8":function(t,e,n){"use strict";n.r(e);var o=n("b9fe");for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);n("77f4");var r,a,i=n("2877"),c=Object(i["a"])(o["default"],r,a,!1,null,null,null);e["default"]=c.exports},"77f4":function(t,e,n){"use strict";var o=n("4f06"),u=n.n(o);u.a},"88e5":function(t,e,n){"use strict";(function(t){n("ecaf"),n("921b");var e=c(n("66fd")),o=c(n("52c8")),u=c(n("65a1")),r=c(n("8f30")),a=c(n("6023")),i=c(n("77a1"));function c(t){return t&&t.__esModule?t:{default:t}}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){l(t,e,n[e])})}return t}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var s=function(){return n.e("node-modules/uni-simple-router/component/router-link").then(n.bind(null,"79a9"))};e.default.component("router-link",s),e.default.config.productionTip=!1,e.default.prototype.$store=u.default,e.default.prototype.$api=r.default,e.default.prototype.$uitls=a.default,o.default.mpType="app";var d=new e.default(f({store:u.default,router:i.default},o.default));t(d).$mount()}).call(this,n("6e42")["createApp"])},b9fe:function(t,e,n){"use strict";n.r(e);var o=n("0380"),u=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e["default"]=u.a}},[["88e5","common/runtime","common/vendor"]]]);