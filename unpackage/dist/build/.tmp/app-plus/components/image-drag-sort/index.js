(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/image-drag-sort/index"],{"060d7":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=0,n=0,s=0,a=0,o=0,c=0,u=0,r=0,h=0,l=0,f=0,d={name:"image-drag-sort",data:function(){return{lists:this.list,active:!1,flag:!1,x:0,y:0,beginIndex:null}},props:{list:{type:Array,default:function(){return[]}},picNum:{type:Number,default:9}},mounted:function(){var t=this.lists.length;t&&this.init()},methods:{init:function(){var e=this,s=t.createSelectorQuery().in(this).select(".inner");s.boundingClientRect(function(t){i=t.width,n=t.height,o=t.top,c=t.left,e.setNodeWH()}).exec()},setNodeWH:function(){var e=this,i=t.createSelectorQuery().in(this).select(".item");i.boundingClientRect(function(t){h=t.width,l=t.height,e.setDragData()}).exec()},setDragData:function(){u=o+l/2,r=c+h/2,s=i-h,a=n-l,f=Math.round(i/h)-1},longtap:function(t){var e=t.currentTarget.offsetLeft,i=t.currentTarget.offsetTop;this.beginIndex=this.computationIndex({left:e,top:i}),this.x=e,this.y=i,this.active=!0,this.flag=!0},computationIndex:function(t){var e=t.left,i=t.top,n=0,s=Math.round(e/h),a=Math.round(i/l),o=f*a;return s&&!a&&(n=s),a&&(n=s+a+o),n},touchm:function(t){if(this.flag){var e=t.touches[0].pageX-r,i=t.touches[0].pageY-u;e<0&&(e=0),e>s&&(e=s),i<0&&(i=0),i>a&&(i=a),this.x=e,this.y=i}},touchend:function(t){this.active=!1;var e=t.currentTarget.offsetLeft,i=t.currentTarget.offsetTop;if(this.flag&&(this.x!==e||this.y!==i)){var n=this.x,s=this.y,a=this.lists.length-1,o=this.computationIndex({left:n,top:s});o>a&&(o=a);var c=this.beginIndex,u=this.lists,r=u[c];u[c]=u[o],u[o]=r,this.flag=!1}},imageTap:function(e){var i=this;t.showActionSheet({itemList:["全屏预览大图","删除（不可撤销）"],success:function(t){t.tapIndex?i.imageDel(e):i.previewImage(e)}})},previewImage:function(e){t.previewImage({current:this.lists[e],urls:this.lists})},imageDel:function(t){this.lists.splice(t,1),this.$emit("imageUpload",this.lists)},imageUpload:function(){var e=this,i=["图片（从手机相册选择）","图片（拍摄）"];t.showActionSheet({itemList:i,success:function(t){e.chooseImage(t.tapIndex)}})},chooseImage:function(e){var i=this,n=this.picNum-this.lists.length,s=e>0?"camera":"album";t.chooseImage({count:n,sizeType:["original","compressed"],sourceType:[s],success:function(e){t.showLoading({title:"上传中"}),i.upload(e.tempFilePaths)}})},upload:function(e){t.hideLoading();for(var i=this.lists,n=0,s=e.length;n<s;n++)i.push(e[n]);this.lists=i,this.$emit("imageUpload",this.lists)}},watch:{lists:function(){var t=this.lists.length;t&&this.init()}}};e.default=d}).call(this,i("6e42")["default"])},"47df":function(t,e,i){"use strict";i.r(e);var n=i("9641"),s=i("ec1d");for(var a in s)"default"!==a&&function(t){i.d(e,t,function(){return s[t]})}(a);i("5b8e");var o=i("2877"),c=Object(o["a"])(s["default"],n["a"],n["b"],!1,null,"6920c58c",null);e["default"]=c.exports},"5b8e":function(t,e,i){"use strict";var n=i("ac56"),s=i.n(n);s.a},9641:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},ac56:function(t,e,i){},ec1d:function(t,e,i){"use strict";i.r(e);var n=i("060d7"),s=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);e["default"]=s.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/image-drag-sort/index-create-component',
    {
        'components/image-drag-sort/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("47df"))
        })
    },
    [['components/image-drag-sort/index-create-component']]
]);                