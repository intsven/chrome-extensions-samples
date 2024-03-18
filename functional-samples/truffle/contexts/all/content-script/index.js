import { t } from '../../../chunks/inject-script-0480ddb1.js';
import { f as fe$1, p as pe$1, g as ge$1, K as K$1 } from '../../../chunks/index-a34e90a0.js';
import { y as y$1, m as m$1, x as x$1 } from '../../../chunks/react-c4f3dfbf.js';
import { D as D$1, U as U$1, n } from '../../../chunks/index-41475b1d.js';
import { r, o } from '../../../chunks/create-5399fd46.js';
import { o as o$1 } from '../../../chunks/index-7b8f310d.js';
import '../../../chunks/browser-polyfill-f636ce7e.js';
import '../../../chunks/transframe-provider-e657167f.js';

var m=Object.defineProperty,h=(e,t,n)=>(((e,t,n)=>{t in e?m(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;})(e,"symbol"!=typeof t?t+"":t,n),n),b=Object.defineProperty,g=(e,t,n)=>(((e,t,n)=>{t in e?b(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;})(e,"symbol"!=typeof t?t+"":t,n),n),w=class{constructor(e){g(this,"_isConnected"),g(this,"_messageHandler"),g(this,"_messageHandlerWrapper"),g(this,"_options"),this._options=e,this._isConnected=!1,this._messageHandler=()=>{},this._messageHandlerWrapper=e=>{var t;null!=(t=this._options)&&t.allowedOrigins&&!this._options.allowedOrigins.includes(e.origin)||this._messageHandler(e.data);};}get isConnected(){return this._isConnected}connect(){window.addEventListener("message",this._messageHandlerWrapper),this._isConnected=!0;}disconnect(){window.removeEventListener("message",this._messageHandlerWrapper),this._isConnected=!1;}sendMessage(e){var t,n,r;let i;if(i=null!=(t=this._options)&&t.providerWindow?this._options.providerWindow:null!=(n=this._options)&&n.useDirectParent?window.parent:window.top,!i)throw new Error("No parent window to send message to");null!=(r=this._options)&&r.allowedOrigins?this._options.allowedOrigins.forEach((t=>{i.postMessage(e,t);})):i.postMessage(e,"*");}onMessage(e){this._messageHandler=e;}},v=class{constructor(e){g(this,"_isListening",!1),g(this,"_messageHandler",(()=>{})),g(this,"_frameIdMap",new Map),g(this,"_options"),g(this,"_messageHandlerWrapper",(e=>{var t;if(null!=(t=this._options)&&t.allowedOrigins&&!this._options.allowedOrigins.includes(e.origin))return;const n=e.source;if(!n)throw new Error("Somehow the event source is null");const r={fromId:this._frameIdMap.get(e.source),event:e};this._messageHandler(e.data,(t=>{n.postMessage(t,e.origin);}),r);})),this._options=e;}get isListening(){return this._isListening}listen(){window.addEventListener("message",this._messageHandlerWrapper),this._isListening=!0;}close(){window.removeEventListener("message",this._messageHandlerWrapper),this._isListening=!1;}onMessage(e){this._messageHandler=e;}registerFrame(e,t){if(null==e||!e.contentWindow)throw new Error("Frame must have a contentWindow");this._frameIdMap.set(e.contentWindow,t);}};function x(){const e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e,(e=>e.toString(16).padStart(2,"0"))).join("")}var y=(e=>(e.RPC_REQUEST="rpc-request",e.RPC_RESPONSE="rpc-response",e.RPC_CALLBACK_CALL="rpc-callback-call",e.RPC_CONNECT_REQUEST="rpc-connect-request",e.RPC_CONNECT_RESPONSE="rpc-connect-response",e))(y||{});function _(e){return !0===(null==e?void 0:e._transframe)}var C=class{constructor(e,t){var n;this._interface=e,g(this,"_options"),g(this,"_api"),g(this,"_requestCallbacks",new Map),g(this,"_rpcCallbacks",new Map),g(this,"_availableMethods",new Set),g(this,"_isConnected",!1),g(this,"_isConnecting",!1),g(this,"_apiCallQueue",[]),g(this,"_buildApi",(()=>new Proxy({},{get:(e,t,n)=>["Symbol(Symbol.toPrimitive)","then"].includes(String(t))?Reflect.get(e,t,n):(...e)=>this.call(t,...e)}))),g(this,"connect",(async()=>{var e;if(this._isConnecting||this._isConnected)return;this._interface.connect();const t=function({namespace:e}){return {_transframe:!0,type:y.RPC_CONNECT_REQUEST,namespace:e}}({namespace:null==(e=this._options)?void 0:e.namespace});this._isConnecting=!0;const n=await new Promise(((e,n)=>{this._requestCallbacks.set("connect",[e,n]);let r=0;const i=()=>{this._interface.sendMessage(t),r++;};i();const s=setInterval((()=>{var e;this._isConnected?clearInterval(s):r<60?i():(clearInterval(s),this._requestCallbacks.delete("connect"),this._isConnected=!1,this._isConnecting=!1,this._apiCallQueue.forEach((([,e])=>{var t;return e(new Error(`Failed to call api method: could not connect to provider ${(null==(t=this._options)?void 0:t.namespace)??""}`))})),n(new Error(`Could not connect to provider ${(null==(e=this._options)?void 0:e.namespace)??""}`)));}),50);}));this._availableMethods.clear(),n.forEach((e=>this._availableMethods.add(e))),this._isConnected=!0,this._isConnecting=!1,this._processApiCallQueue();})),g(this,"_messageHandler",(e=>{var t;if(_(e)&&e.namespace===(null==(t=this._options)?void 0:t.namespace))if(function(e){return _(e)&&e.type===y.RPC_RESPONSE}(e)){const[t,n]=this._requestCallbacks.get(e.requestId)??[];if(!t||!n)return;e.error?n(e.result):t(e.result),this._requestCallbacks.delete(e.requestId);}else if(function(e){return _(e)&&e.type===y.RPC_CALLBACK_CALL}(e)){const t=this._rpcCallbacks.get(e.callbackId);if(!t)return;t(...e.payload);}else if(function(e){return _(e)&&e.type===y.RPC_CONNECT_RESPONSE}(e)){const[t,n]=this._requestCallbacks.get("connect")??[];if(!t||!n)return;t(e.methods),this._requestCallbacks.delete("connect");}})),g(this,"call",(async(e,...t)=>{var n;if(!this._isConnected&&!this._isConnecting)throw new Error("Cannot call any api methods: Not connected to provider");this._isConnecting&&await new Promise(((e,t)=>{this._apiCallQueue.push([e,t]);}));const r=String(e);if(!this.hasMethod(r))throw new Error(`Method ${r} is not available`);const i=t.map((e=>{if("function"==typeof e){const t=x();return this._rpcCallbacks.set(t,e),function(e){return {_transframeCallback:!0,callbackId:e}}(t)}return e})),s=function({requestId:e,method:t,payload:n,namespace:r}){return {_transframe:!0,type:y.RPC_REQUEST,requestId:e??x(),method:t,payload:n,namespace:r}}({method:r,payload:i,namespace:null==(n=this._options)?void 0:n.namespace});return this._interface.sendMessage(s),await Promise.race([new Promise(((e,t)=>{this._requestCallbacks.set(s.requestId,[e,t]);})),new Promise(((e,t)=>{var n;setTimeout((()=>{t(new Error("RPC request timed out. Check that you can connect to the provider and that the method exists."));}),(null==(n=this._options)?void 0:n.apiCallTimeout)??3e3);}))])})),this._options=t,this._api=this._buildApi(),this._interface.onMessage(this._messageHandler),!1!==(null==(n=this._options)?void 0:n.connectImmediately)&&this.connect();}_processApiCallQueue(){this._apiCallQueue.forEach((([e])=>e())),this._apiCallQueue=[];}get api(){return this._api}get isConnected(){return this._isConnected&&this._interface.isConnected}hasMethod(e){return this._availableMethods.has(e)}},E=class{constructor(e,t){this._interface=e,g(this,"_options"),g(this,"registerFrame",((e,t)=>(t??(t=x()),this._interface.registerFrame(e,t),t))),g(this,"listen",(()=>{this._interface.listen();})),g(this,"close",(()=>{this._interface.close();})),g(this,"_messageHandler",(async(e,t,n)=>{if(_(e)&&e.namespace===this._options.namespace&&(!this._options.strictMode||null!=n.fromId))if(function(e){return _(e)&&e.type===y.RPC_REQUEST}(e)){const r=e.payload.map((e=>{if(function(e){return !0===(null==e?void 0:e._transframeCallback)}(e)){const n=e.callbackId;return (...e)=>{const r=function({callbackId:e,payload:t,namespace:n}){return {_transframe:!0,type:y.RPC_CALLBACK_CALL,callbackId:e,payload:t,namespace:n}}({callbackId:n,payload:e,namespace:this._options.namespace});t(r);}}return e})),i=this._options.api[e.method];if(!i)return;let s,o=!1;try{s=await i(n,...r);}catch(e){o=!0,s=e;}const a=function({requestId:e,result:t,error:n=!1,namespace:r}){return {_transframe:!0,type:y.RPC_RESPONSE,requestId:e,result:t,error:n,namespace:r}}({requestId:e.requestId,result:s,error:o,namespace:this._options.namespace});t(a);}else if(function(e){return _(e)&&e.type===y.RPC_CONNECT_REQUEST}(e)){const n=function({namespace:e,methods:t}){return {_transframe:!0,type:y.RPC_CONNECT_RESPONSE,namespace:e,methods:t}}({methods:Object.keys(this._options.api),namespace:e.namespace});t(n);}})),this._options=t,this._interface.onMessage(this._messageHandler),(this._options.listenImmediately??1)&&this.listen();}get isListening(){return this._interface.isListening}get api(){return this._options.api}};function S(e){if(!("window"in globalThis))throw new Error('Transframe: global "window" not available. Cannot initialize a provider.');return new E(new v(e),e)}function j(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var M=function(e){return !(t=e,!t||"object"!=typeof t||function(e){var t=Object.prototype.toString.call(e);return "[object RegExp]"===t||"[object Date]"===t||function(e){return e.$$typeof===I}(e)}(e));var t;};var I="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function N(e,t){return !1!==t.clone&&t.isMergeableObject(e)?z(function(e){return Array.isArray(e)?[]:{}}(e),e,t):e}function k(e,t,n){return e.concat(t).map((function(e){return N(e,n)}))}function O(e){return Object.keys(e).concat(function(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter((function(t){return Object.propertyIsEnumerable.call(e,t)})):[]}(e))}function P(e,t){try{return t in e}catch{return !1}}function T(e,t,n){var r={};return n.isMergeableObject(e)&&O(e).forEach((function(t){r[t]=N(e[t],n);})),O(t).forEach((function(i){(function(e,t){return P(e,t)&&!(Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))})(e,i)||(P(e,i)&&n.isMergeableObject(t[i])?r[i]=function(e,t){if(!t.customMerge)return z;var n=t.customMerge(e);return "function"==typeof n?n:z}(i,n)(e[i],t[i],n):r[i]=N(t[i],n));})),r}function z(e,t,n){(n=n||{}).arrayMerge=n.arrayMerge||k,n.isMergeableObject=n.isMergeableObject||M,n.cloneUnlessOtherwiseSpecified=N;var r=Array.isArray(t);return r===Array.isArray(e)?r?n.arrayMerge(e,t,n):T(e,t,n):N(t,n)}z.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce((function(e,n){return z(e,n,t)}),{})};const L=j(z);class R{constructor(){h(this,"promise"),h(this,"resolve"),h(this,"reject"),this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t;}));}}const A=new R;async function F(e,t){return (await A.promise).get(e,t)}const D=fe$1(),W=fe$1([]),U=fe$1([]),$=pe$1((()=>U.get().map((({pageInfo:e,id:t})=>({pageInfo:e,id:t})))));D.onChange((()=>{const e=U.get(),t=e.filter((({window:e})=>{try{return null==e?void 0:e.frameElement}catch{return !1}}));e.length!==t.length&&U.set(t);}));const q=fe$1({}),H=fe$1(F("auth","accessToken"));!async function(e,t,n){(await A.promise).subscribe(e,t,n);}("auth","accessToken",(e=>{H.set(e);}));const Q={sidebarWidth:72,allowedSites:"all",activationSettings:{isTwoStep:!0,twoStepMode:"click",screenSide:"right",activationZoneWidth:14,twoStepKeepOpenWidth:50,sidebarTimeout:0,leaveWindowTimeout:500,leaveTwoStepTimeout:500}},G=fe$1(F("sidebar","config").then((e=>L(Q,e||{}))));function X(e,t){q[e].isOpen.set(t);}W.onChange((({value:e})=>{q.set(Object.fromEntries(e.map(((e,t)=>[e.id,{embedId:e.id,isOpen:!1,zIndex:t}]))));}),{trackingType:"shallow"});const Z={registerFrame(e,{pageInfo:t},n){if(e.event.source){const r=U.findIndex((t=>t.window===e.event.source));-1===r?U.push({id:Math.random().toString(36).substr(2,9),pageInfo:t,window:e.event.source,onEmbedsChange:n}):U[r].pageInfo.set(t);}}};S({namespace:"truffle-hud-unprivileged-api-v1",api:Z,strictMode:!1});const B=function(e){if(!("window"in globalThis))throw new Error('Transframe: global "window" not available. Cannot initialize a consumer.');return new C(new w(e),e)}({providerWindow:window.top||window.parent,namespace:"truffle-hud-unprivileged-api-v1",connectImmediately:!1});B.connect().catch((e=>{}));const V=B.api;var Y,K={exports:{}},J={};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */K.exports=function(){if(Y)return J;Y=1;var e=D$1,t=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,i=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function o(e,n,o){var a,l={},c=null,d=null;for(a in void 0!==o&&(c=""+o),void 0!==n.key&&(c=""+n.key),void 0!==n.ref&&(d=n.ref),n)r.call(n,a)&&!s.hasOwnProperty(a)&&(l[a]=n[a]);if(e&&e.defaultProps)for(a in n=e.defaultProps)void 0===l[a]&&(l[a]=n[a]);return {$$typeof:t,type:e,key:c,ref:d,props:l,_owner:i.current}}return J.Fragment=n,J.jsx=o,J.jsxs=o,J}();var ee=K.exports;const te=({children:e,defaultPosition:t,requiredClassName:n$1,ignoreClassName:r})=>{const[i,s]=n.exports.useState({current:t,start:{x:0,y:0},pressed:!1,draggable:!0});return n.exports.useEffect((()=>{const e=()=>{s((e=>({...e,current:{x:Math.min(e.current.x,window.innerWidth-25),y:Math.min(e.current.y,window.innerHeight-25)}})));};return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),n.exports.useEffect((()=>{const e=e=>{s((t=>({...t,current:{x:e.clientX-t.start.x,y:e.clientY-t.start.y}})));};return i.pressed?window.addEventListener("mousemove",e):window.removeEventListener("mousemove",e),()=>window.removeEventListener("mousemove",e)}),[i.pressed]),ee.jsx("div",{draggable:!0,style:{width:"fit-content",position:"absolute",top:i.current.y+"px",left:i.current.x+"px",userSelect:i.pressed?"none":"inherit"},onMouseDown:e=>{const t=e.target,i=t.className;r&&i.includes(r)||(n$1&&!i.includes(n$1)&&s((e=>({...e,draggable:!1}))),("A"===t.tagName||i.includes("prevent-drag"))&&s((e=>({...e,draggable:!1}))));},onDragStart:e=>{e.preventDefault(),i.draggable&&s((t=>({...t,pressed:!0,start:{x:e.clientX-t.current.x,y:e.clientY-t.current.y}})));},onMouseUp:()=>{s((e=>({...e,pressed:!1,draggable:!0})));},children:e})},ne=[];function re(e){if(!ne.includes(e)){try{document.adoptedStyleSheets=[...document.adoptedStyleSheets,e];}catch{const t=document.createElement("style");t.textContent=Array.from(e.cssRules).map((e=>e.cssText||"")).join("\n"),document.head.appendChild(t);}ne.push(e);}}function ie(e,...t){var n;let r="";e.forEach(((e,n)=>{const i=t[n];r+=e,i&&(r+=i);}));const i=new CSSStyleSheet;return null==(n=i.replaceSync)||n.call(i,r),i}const se=ie`.c-embed-window {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  outline: 0.25px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0 20px 70px rgba(0, 0, 0, 0.55);
  border: 0.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  background: #1f1f1f;
  min-width: 64px;
  min-height: 64px;
  overflow: hidden;
  user-select: none;
}
.c-embed-window.focused-window {
  user-select: none;
}
.c-embed-window > .title-bar {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
  background: #171717;
  padding: 10px;
  width: 100%;
  height: 32px;
  overflow: hidden;
  color: white;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  font-family: "Inter", sans-serif;
}
.c-embed-window > .title-bar > .actions {
  display: flex;
  gap: 12px;
  margin-left: auto;
}
.c-embed-window > .title-bar > .actions > .close-window-btn,
.c-embed-window > .title-bar > .actions > .pop-out-btn {
  all: unset;
  cursor: pointer;
  border: 0;
  border-radius: 0;
  background: none;
}
.c-embed-window > .title-bar:hover {
  cursor: grab;
}
.c-embed-window > .title-bar:active {
  cursor: grabbing;
}
.c-embed-window > .content {
  position: relative;
  height: 100%;
}
.c-embed-window > .content > .embed-iframe {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  border: none;
  padding: 0;
  width: 100%;
  height: 100%;
}`,oe="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1LjgzMzQgNS4zNDE3NUwxNC42NTg0IDQuMTY2NzVMMTAuMDAwMSA4LjgyNTA4TDUuMzQxNzUgNC4xNjY3NUw0LjE2Njc1IDUuMzQxNzVMOC44MjUwOCAxMC4wMDAxTDQuMTY2NzUgMTQuNjU4NEw1LjM0MTc1IDE1LjgzMzRMMTAuMDAwMSAxMS4xNzUxTDE0LjY1ODQgMTUuODMzNEwxNS44MzM0IDE0LjY1ODRMMTEuMTc1MSAxMC4wMDAxTDE1LjgzMzQgNS4zNDE3NVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=",ae=ie`.truffle-sidebar {
  all: unset;
  position: fixed;
  z-index: 2147483602;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none !important; /* !important in case any crazy sites try applying pointer-events: all to all elements with !important */
  --local-two-step-width: 16px;
  /* if a site styles elements globally, we need to unset those styles so they don't affect ours */
  /* don't unset for svg or path elements, since we want to keep their styles */
}
.truffle-sidebar *:not(svg):not(path) {
  all: unset;
}
.truffle-sidebar.truffle-sidebar-right > .truffle-sidebar-bar {
  right: 0;
  transform: translateX(var(--local-sidebar-width));
}
.truffle-sidebar.truffle-sidebar-right > .truffle-sidebar-activation-zone {
  right: 0;
}
.truffle-sidebar.truffle-sidebar-right > .truffle-sidebar-deactivation-zone {
  left: 0;
}
.truffle-sidebar.truffle-sidebar-right > .truffle-sidebar-two-step {
  right: 0;
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
  transform: translateX(var(--local-two-step-width));
}
.truffle-sidebar.truffle-sidebar-left > .truffle-sidebar-bar {
  transform: translateX(calc(-1 * var(--local-sidebar-width)));
}
.truffle-sidebar.truffle-sidebar-left > .truffle-sidebar-activation-zone {
  left: 0;
}
.truffle-sidebar.truffle-sidebar-left > .truffle-sidebar-deactivation-zone {
  right: 0;
}
.truffle-sidebar.truffle-sidebar-left > .truffle-sidebar-two-step {
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  transform: translateX(calc(-1 * var(--local-two-step-width)));
}
.truffle-sidebar.truffle-sidebar-left > .truffle-sidebar-two-step > .truffle-sidebar-two-step-svg {
  transform: rotate(180deg);
}
.truffle-sidebar.truffle-sidebar-is-open > .truffle-sidebar-activation-zone, .truffle-sidebar.truffle-sidebar-is-two-step-open > .truffle-sidebar-activation-zone {
  pointer-events: none !important;
}
.truffle-sidebar.truffle-sidebar-is-open > .truffle-sidebar-deactivation-zone, .truffle-sidebar.truffle-sidebar-is-two-step-open > .truffle-sidebar-deactivation-zone {
  position: absolute;
  z-index: 1; /* below sidebar bar */
  top: 0;
  display: block;
  width: 100%;
  width: calc(100% - var(--local-keep-open-width));
  height: 100%;
  pointer-events: all !important;
}
.truffle-sidebar.truffle-sidebar-is-open > .truffle-sidebar-bar {
  pointer-events: all;
  transform: translateX(0);
}
.truffle-sidebar.truffle-sidebar-is-two-step-open > .truffle-sidebar-two-step {
  pointer-events: all;
  transform: translateX(0);
}
.truffle-sidebar > .truffle-sidebar-bar {
  position: absolute;
  z-index: 2; /* above overlay */
  overflow: hidden;
  width: var(--local-sidebar-width);
  height: 100%;
  pointer-events: none;
  transform: translateX(0px);
  transition: transform 0.1s ease-in-out;
}
.truffle-sidebar > .truffle-sidebar-bar > .truffle-sidebar-iframe {
  width: var(--local-sidebar-width);
  height: 100%;
  border: none;
}
.truffle-sidebar > .truffle-sidebar-two-step {
  position: absolute;
  top: 50%;
  width: var(--local-two-step-width);
  height: 64px;
  margin-top: -32px;
  background: #f357a1;
  cursor: pointer;
  transform: translateX(0px);
  transition: transform 0.1s ease-in-out;
}
.truffle-sidebar > .truffle-sidebar-two-step > .truffle-sidebar-two-step-svg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  fill: #fff;
}
.truffle-sidebar > .truffle-sidebar-activation-zone {
  position: absolute;
  z-index: 1; /* below sidebar bar */
  top: 0;
  display: block;
  width: var(--local-activation-zone-width);
  height: 100%;
  pointer-events: all !important;
}`;var le,ce={exports:{}};
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/le=ce,function(){var e={}.hasOwnProperty;function t(){for(var e="",t=0;t<arguments.length;t++){var i=arguments[t];i&&(e=r(e,n(i)));}return e}function n(n){if("string"==typeof n||"number"==typeof n)return n;if("object"!=typeof n)return "";if(Array.isArray(n))return t.apply(null,n);if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]"))return n.toString();var i="";for(var s in n)e.call(n,s)&&n[s]&&(i=r(i,s));return i}function r(e,t){return t?e?e+" "+t:e+t:e}le.exports?(t.default=t,le.exports=t):window.classNames=t;}();const de=j(ce.exports),ue=fe$1(72),fe=y$1((()=>{re(ae);const e=m$1(!1),t=m$1(!1),n$1=n.exports.useRef(null);n.exports.useEffect((()=>{n$1.current&&Oe.registerFrame(n$1.current,"sidebar");}),[n$1]);const r=n.exports.useRef(0),i=n.exports.useCallback((n=>{clearTimeout(r.current),r.current=window.setTimeout((()=>{e.set(!1),t.set(!1);}),n);}),[]),s=n.exports.useCallback((()=>{clearTimeout(r.current),e.set(!0);}),[]),a=n.exports.useCallback((()=>{clearTimeout(r.current),t.set(!0);}),[]);!function({closeSidebarTimeoutRef:e,attemptToCloseSidebar:t}){n.exports.useEffect((()=>{const n=()=>t(G.activationSettings.leaveWindowTimeout.peek()),r=()=>clearTimeout(e.current),i=document.documentElement;return i.addEventListener("mouseleave",n),i.addEventListener("mouseenter",r),()=>{i.removeEventListener("mouseleave",n),i.removeEventListener("mouseenter",r);}}),[]);}({closeSidebarTimeoutRef:r,attemptToCloseSidebar:i});const l=m$1(F("settings","experimentalSidebar")),{screenSide:d,activationZoneWidth:u,isTwoStep:f,twoStepMode:p,twoStepKeepOpenWidth:m}=G.activationSettings.get(),h=f?m:u,b=ue.get(),g=l.get()||W.get().length,w=e.get()&&g,v=t.get()&&g;return ee.jsx(ee.Fragment,{children:ee.jsxs("div",{className:de("truffle-sidebar",`truffle-sidebar-${d}`,{"truffle-sidebar-is-open":w,"truffle-sidebar-is-two-step-open":v}),style:{"--local-sidebar-width":`${b}px`,"--local-activation-zone-width":`${u}px`,"--local-keep-open-width":`${h}px`},children:[f?ee.jsx("div",{className:"truffle-sidebar-two-step",onMouseEnter:"hover"===p?s:void 0,onClick:"click"===p?s:void 0,children:ee.jsx(pe,{})}):null,ee.jsx("div",{className:"truffle-sidebar-bar",onMouseEnter:s,children:ee.jsx("iframe",{src:"https://app.truffle.vip/sidebar",className:"truffle-sidebar-iframe",ref:n$1})}),g?ee.jsxs(ee.Fragment,{children:[ee.jsx("div",{className:"truffle-sidebar-activation-zone",onMouseEnter:f?a:s}),ee.jsx("div",{className:"truffle-sidebar-deactivation-zone",onMouseMove:()=>i(0)})]}):null]})})})),pe=()=>ee.jsx("svg",{className:"truffle-sidebar-two-step-svg",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"20",viewBox:"0 0 16 20",fill:"none",children:ee.jsx("path",{d:"M11.0871 13.825L7.27044 10L11.0871 6.175L9.91211 5L4.91211 10L9.91211 15L11.0871 13.825Z",fill:"white"})});const me=fe$1([]),he=e=>{me.set((t=>t.filter((t=>t.id!==e))));};const be="truffle-embed",ge="truffle-embed",we=pe$1((async()=>(W.get()||[]).filter((e=>!e.windowProps)))),ve=function(e,t){let n;return (...r)=>{clearTimeout(n),n=window.setTimeout((()=>{e(...r);}),t);}}((function(){const e=we.get(),t=_e.get(),n=D.get(),r=t.filter(Ce),i=e.filter((e=>!r.find((t=>e.id===t.embed.id)))),s=r.filter((t=>e.find((e=>e.id===t.embed.id))&&function(e,t){return e.contentPageOwnerRef===t.contentPageOwnerRef}(t,n))),o=r.filter((e=>!s.includes(e))),a=i.map((e=>({embed:e,contentPageOwnerRef:n.contentPageOwnerRef,element:Ee(e)})));o.forEach(Se),_e.set(s.concat(a));}),100);we.onChange((()=>{ve();})),D.onChange((()=>ve())),setInterval((()=>{ve();}),5e3);const xe=new R;async function ye(e){const t=await xe.promise;null==t||t(e);}const _e=fe$1([]);function Ce(e){var t;return !(null==(t=e.element)||!t.parentNode)}function Ee(e){const t=document.querySelector(e.parentQuerySelector);if(!t)return null;const n=document.createElement("iframe");return n.src=`https://app.truffle.vip/embed/${e.id}`,n.id=function(e){return `${ge}-${e.id}`}(e),n.className=be,n.allow="fullscreen; microphone; camera; autoplay; encrypted-media;",Object.assign(n.style,e.defaultStyles),n.dataset.truffleEmbedId=e.id,n.dataset.orgId=e.orgId,n.contentWindow?(Oe.registerFrame(n,e.id),ye(n)):n.addEventListener("load",(()=>{Oe.registerFrame(n,e.id),ye(n);})),t.appendChild(n),n}function Se(e){var t;null==(t=e.element)||t.remove();}const je=[];window.addEventListener("blur",(()=>{_e.get().find((e=>{document.activeElement==e.element&&je.forEach((t=>{t(e.embed);}));}));}));const Me=[];D.onChange((({value:e})=>{Me.forEach((t=>t(e)));}));const Ie=[];$.onChange((({value:e})=>{Ie.forEach((t=>t(e)));}));const Ne={pageInfoGet:async(e,t)=>(t&&Me.push(t),D.get()),framesGet:async(e,t)=>(t&&Ie.push(t),$.get()),environmentGetInfo:async()=>({truffleVersion:"4.4.16",isExperimental:await F("settings","experimental"),isExperimentalSidebar:await F("settings","experimentalSidebar"),deviceType:"desktop"}),sidebarSetWidth:(e,t)=>{ue.set(t);},embedSetAll:async(e,t)=>{W.set(t);},embedSetAllFramed:async(e,t)=>{const n=t.reduce(((e,t)=>{const n=t.frameId;return e[n]||(e[n]=[]),e[n].push(t),e}),{});Object.entries(n).forEach((([e,t])=>{const n=U.get().find((t=>t.id===e));n&&n.onEmbedsChange(t);}));},embedGetDevEmbeds:async()=>async function(e){const t=F("embed","devEmbeds").then((t=>Object.entries(t).filter((([,t])=>(null==e?void 0:e.contentPageType.includes(t.contentPageType))&&(!t.contentPageId||(null==e?void 0:e.contentPageId)===t.contentPageId))).map((([e,t])=>(t.id=e,t)))));return Promise.race([t,new Promise((e=>setTimeout((()=>e([])),1e3)))])}(D.get()),embedOnFocus:(e,t)=>{je.push(t);},embedSetStyles:({fromId:e},t)=>{if(!e)return;const n=ke(e);if(!n)return;const r=n.element;r&&Object.assign(r.style,t);},embedSetContainer:({fromId:e},t,n="append")=>{var r;if(!e)return;const i=document.querySelector(t);if(!i)throw new Error(`Could not find container element with query selector ${t}.`);const s=null==(r=ke(e))?void 0:r.element;if(!s)throw new Error(`Could not find embed iframe with id ${e}.`);"append"===n?i.appendChild(s):"prepend"===n&&i.prepend(s);},embedShowToast:({fromId:e},t,n)=>{var r;const i=W.get().find((t=>t.id===e));i&&((e,t)=>{const n=crypto.randomUUID(),{title:r,body:i,iconUrl:s,onClick:o}=e,a={title:r,body:i,iconUrl:s,onClick:o,id:n,close:()=>he(n)};me.push(a),setTimeout((()=>{he(n);}),1e3*t);})({title:t.title||(null==(r=i.windowProps)?void 0:r.title)||i.name||"Notification",iconUrl:t.iconUrl||i.iconUrl,body:t.body,onClick:n||(()=>null)},5);},embedWindowGetVisibility:({fromId:e})=>{var t,n;return !!e&&!(null==(n=null==(t=q[e])?void 0:t.isOpen)||!n.get())},embedWindowSetVisibility:({fromId:e},{embedId:t,isVisible:n})=>{var r,i;t||(t=e),t&&(null==(i=null==(r=q[t])?void 0:r.isOpen)||i.set(n));}};function ke(e){return _e.get().find((t=>t.embed.id===e))}const Oe=S({namespace:"truffle-hud-privileged-api-v1",api:Ne});Oe.registerFrame(function(e){return {contentWindow:e}}(window));const Pe=400,Te=400,ze=y$1((({embedInfo:e,isFocused:t})=>{re(se);const{id:n$1,windowProps:{title:r,shouldAllowPopout:i,initialDimensions:s,isResizable:o,resizeBounds:a}}=e,[l,d]=n.exports.useState(!1);n.exports.useEffect((()=>{t&&je.forEach((t=>{t(e);}));}),[t]);const u=n.exports.useRef(null);return n.exports.useEffect((()=>{const e=u.current;e&&(Oe.registerFrame(e,n$1),ye(e));}),[u]),ee.jsx(te,{defaultPosition:{x:72,y:0},children:ee.jsxs("div",{className:"c-embed-window "+(t?"focused-window":""),id:`${n$1}-window`,onMouseDown:()=>{d(!0);},onMouseUp:()=>d(!1),style:{resize:o?"both":"none",width:`${(null==s?void 0:s.x)??Pe}px`,height:`${(null==s?void 0:s.y)??Te}px`,...a||{}},children:[ee.jsxs("div",{className:"title-bar",children:[r,ee.jsxs("div",{className:"actions",children:[i?ee.jsx("button",{className:"pop-out-btn",onClick:()=>{((e,t,n)=>{const r=t??Pe,i=n??Te,s=(window.innerWidth-r)/2,o=(window.innerHeight-i)/2;window.open(e,"_blank",`width=${r},height=${i},left=${s},top=${o}`);})(`https://app.truffle.vip/embed/${n$1}`,null==s?void 0:s.x,null==s?void 0:s.y),X(n$1,!1);},children:ee.jsx("img",{src:"https://cdn.bio/assets/icons/open_in_new.svg"})}):null,ee.jsx("button",{className:"close-window-btn",onClick:()=>X(n$1,!1),children:ee.jsx("img",{src:oe})})]})]}),ee.jsx("div",{className:"content",children:ee.jsx("iframe",{ref:u,id:`${n$1}-iframe`,src:`https://app.truffle.vip/embed/${n$1}`,className:"embed-iframe",style:{pointerEvents:l||!t?"none":"inherit"}})})]})})})),Le=ie`.addon-window-container {
  position: fixed;
  top: 0;
}`,Re=y$1((()=>{re(Le);const e=x$1((()=>W.get().length)),t=function(e){if(!e)return !1;const[t,n,r]=e.split(".");return !JSON.parse(atob(n)).isAnon}(H.get());return ee.jsx(ee.Fragment,{children:W.map((n=>{const r=n.peek();if(!r.windowProps)return;const s=q[r.id];return ee.jsx("div",{className:"addon-window-container",onMouseDown:()=>function(e){K$1((()=>{const t=W.peek().length-1,n=q[e],r=n.zIndex.peek();Object.values(q.peek()).forEach((({zIndex:e,embedId:t})=>{e>r&&q[t].zIndex.set(e-1);})),n.zIndex.set(t);}));}(r.id),style:{zIndex:s.zIndex.get()+1e4,visibility:s.isOpen.get()?"visible":"hidden"},children:ee.jsx(ze,{embedInfo:r,isFocused:s.isOpen.get()&&s.zIndex.get()===e.get()-1,isLoggedIn:t})},r.id)}))})}));const Ae=ie`.c-toast {
  background: #ffffff;
  border: 1px solid black;
  border-radius: 4px;
  box-sizing: border-box;
  width: 320px;
  height: 56px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.15);
}
.c-toast > .icon {
  margin: 8px;
  width: 40px;
  height: 40px;
}
.c-toast > .text-container {
  margin: 0;
  width: 100%;
  font-family: "Inter", sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 44px;
}
.c-toast > .text-container > .title {
  font-size: 12px;
  color: rgba(14, 14, 14, 0.8);
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
}
.c-toast > .text-container > .body {
  font-size: 16px;
  color: #0e0e0e;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
}
.c-toast > .close-button {
  flex-shrink: 0;
  flex-grow: 0;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 0;
  height: 100%;
  border: none;
  width: 43px;
  cursor: pointer;
}
.c-toast > .close-button > img {
  width: 20px;
  height: 20px;
  filter: invert(1);
}`,Fe=e=>{re(Ae);const{title:t,body:n,iconUrl:r,close:i,onClick:s}=e;return ee.jsxs("div",{className:"c-toast",onClick:()=>null==s?void 0:s(),children:[ee.jsx("img",{className:"icon",src:r}),ee.jsxs("div",{className:"text-container",children:[ee.jsx("div",{className:"title",children:t}),ee.jsx("div",{className:"body",children:n})]}),ee.jsx("button",{className:"close-button",onClick:e=>{e.stopPropagation(),i();},children:ee.jsx("img",{src:oe})})]})},De=ie`.c-alert-manager {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10900;
}`,We=y$1((()=>(re(De),ee.jsx("div",{className:"c-alert-manager",children:me.get().map((e=>ee.jsx(Fe,{...e},e.id)))})))),Ue=y$1((()=>ee.jsxs(ee.Fragment,{children:[ee.jsx(fe,{}),ee.jsx(Re,{}),ee.jsx(We,{})]}))),$e=["youtube.com","twitch.tv","twitter.com","x.com","tiktok.com","instagram.com","patreon.com","kick.com"];const qe=r({providerWindow:window,namespace:"truffle-injected-api-v1"}).api,He=r({providerWindow:window,namespace:"truffle-injected-privileged-api-v1",connectImmediately:!1});He.connect().catch((e=>{console.warn("failed to connect to transframe",e);}));const Qe=He.api,Ge=o({namespace:"truffle-content-privileged-api-v1",api:{fetchObserve:(e,{urlRegexString:t},n)=>Qe.fetchObserve({urlRegexString:t},n)},strictMode:!0,allowedOrigins:["https://app.truffle.vip","https://truffle.vip"]});t("./contexts/all/injected-script/index.js",{id:"truffle-injected"}),(async e=>{const{storageGetFn:t,storageSetFn:n$1,storageSubscribeFn:i,getPageInfoFn:s,onNewIframe:o}=e;((function({getFn:e,setFn:t,subscribeFn:n}){A.resolve({get:e,set:t,subscribe:n});}))({getFn:t,setFn:n$1,subscribeFn:i}),function(e){xe.resolve(e);}(o);const a=await s((e=>{D.set(e);}));D.set(a);const l=async()=>{const e=window.self===window.top,n$1=await t("settings","experimentalSidebar"),i=await ge$1((()=>G.get()))??{},s=await ge$1((()=>D.get()));let{allowedSites:o}=i;n$1||(o="social");const a="social"!==o||function(e){return $e.some((t=>{var n;return null==(n=null==e?void 0:e.url)?void 0:n.includes(t)}))}(s);if(e&&a){const e=document.createElement("div");e.id="truffle-container",document.body.appendChild(e),U$1.exports.render(n.exports.createElement(Ue),e);}else if(a&&!e){const e=e=>{W.set(e);};D.onChange((({value:t})=>{V.registerFrame({pageInfo:t},e);}),{initial:!0});}};"loading"===document.readyState?window.addEventListener("DOMContentLoaded",l):l();})({storageGetFn:(e,t)=>o$1[e].get(t),storageSubscribeFn:(e,t,n)=>o$1[e].subscribe((async()=>n(await o$1[e].get(t)))),storageSetFn:(e,t,n)=>o$1[e].set(t,n),getPageInfoFn:qe.pageInfoGet,onNewIframe:e=>{Ge.registerFrame(e);}});
