(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70ed6cc5"],{1844:function(e,t,n){},"56f2":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"Mask"},[e.userTopic?n("div",[n("panel",{staticClass:"panelTopic",attrs:{width:"70%"},scopedSlots:e._u([{key:"headered",fn:function(){return[n("span",{staticClass:"green",on:{click:e.goback}},[e._v("主页 ")]),n("span",{staticStyle:{color:"gray"}},[e._v("/ ")]),n("span",{staticClass:"green"},[e._v(e._s(e.userTopic.loginname)+"的主页")])]},proxy:!0}])}),n("panel",{staticClass:"panelTopic",attrs:{width:"70%"},scopedSlots:e._u([{key:"headered",fn:function(){return[n("span",{staticStyle:{color:"gray"}},[e._v(e._s(e.userTopic.loginname)+" 最近创建的话题")])]},proxy:!0},{key:"content",fn:function(){return[e.userTopic.recent_topics.length?e._l(e.userTopic.recent_topics,(function(e){return n("div",{key:e.id},[n("list-demo",{attrs:{item:e}})],1)})):n("div",{staticClass:"none"},[n("span",[e._v(e._s(e.userTopic.loginname)+"最近没有创建话题哦，请看看其他的")])])]},proxy:!0}])})],1):n("div",[e._v("请稍等")]),n("div",{staticClass:"bottom"},[e._v("已经到底了")])])},o=[],c=n("11e2"),i=n("fcbd"),a={name:"usernameTopic",created:function(){this.userTopic=JSON.parse(sessionStorage.getItem("usernameTopic")),console.log(this.userTopic)},components:{panel:c["a"],listDemo:i["a"]},methods:{goback:function(){this.$router.back()}},data:function(){return{userTopic:null}}},r=a,u=(n("6334"),n("2877")),l=Object(u["a"])(r,s,o,!1,null,null,null);t["default"]=l.exports},6334:function(e,t,n){"use strict";n("1844")}}]);
//# sourceMappingURL=chunk-70ed6cc5.bf22f519.js.map