!function(t){var e={};function n(o){if(e[o])return e[o].exports;var c=e[o]={i:o,l:!1,exports:{}};return t[o].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var c in t)n.d(o,c,function(e){return t[e]}.bind(null,c));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=15)}({15:function(t,e,n){"use strict";var o=n(5);function c(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}document.getElementById("init_window").addEventListener("content_script_to_inject",function(t){var e=t.detail,n=e.message,r=e.data,i=e.url;switch(n){case"get_battle_room_href":$.ajax({url:i,data:r,cache:!1,global:!1,dataType:"json",method:"POST",success:function(t){var e=t.redirect,n=t.current_battle_point,c=t.battle_point_check,r=t.used_battle_point,i=t.popup;if(e&&(0,o.dispatch_inject_to_content_script)({message:"get_battle_room_href",url:e}),i&&(0,o.dispatch_inject_to_content_script)({message:"notify_error",data:i.body?i.body:"未知错误"}),"number"==typeof n&&!c){var a=r-n;a<=0&&(a=5),(0,o.dispatch_inject_to_content_script)({message:"to_use_bp",count:a})}}});break;case"to_use_bp":$.ajax({url:i,data:r,cache:!1,global:!1,dataType:"json",method:"POST",success:function(t){t.use_flag;(0,o.dispatch_inject_to_content_script)({message:"do_use_bp"})}});break;case"get_member_id":!function t(e,n,r){$.ajax({url:e+n,cache:!1,global:!1,dataType:"json",method:"GET",success:function(i){var a=i.count,u=i.list;a>10*(n-1)?(r=[].concat(c(r),c(u)),t(e,++n,r)):(0,o.dispatch_inject_to_content_script)({message:"do_get_member_id",data:r})}})}(i,1,[])}})},5:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.upload_to_server=function(t,e,n){if(t){var o={method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}};o=Object.assign(o,e),fetch(t,o).then(function(t){return t.text()}).then(function(t){return n(t)}).catch(function(t){console.log(t)})}},e.get_by_cookie=function(t,e,n){if(t){var o={credentials:"include"};o=Object.assign(o,e),fetch(t,o).then(function(t){return t.json()}).then(function(t){return n(t)}).catch(function(t){console.log(t)})}},e.post_by_cookie=function(t,e,n){if(t){var o={method:"POST",credentials:"include",headers:{"Content-Type":"application/json; charset=UTF-8"}};o=Object.assign(o,e),fetch(t,o).then(function(t){return console.log(t),t.text()}).then(function(t){console.log(t),n(JSON.parse(t))}).catch(function(t){console.log(t)})}},e.dispatch_inject_to_content_script=function(t){return document.getElementById("init_window").dispatchEvent(new CustomEvent("inject_to_content_script",{detail:t}))},e.dispatch_content_script_to_inject=function(t){return document.getElementById("init_window").dispatchEvent(new CustomEvent("content_script_to_inject",{detail:t}))}}});