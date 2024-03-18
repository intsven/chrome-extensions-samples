import { o as o$1 } from './index-7b8f310d.js';

let e,o;async function i(n){if(await Promise.all(n.map((async({settingsKey:e,dataAttribute:o})=>{!1!==await o$1.settings.get(e)&&!document.body.hasAttribute(o)&&document.body.setAttribute(o,"");}))),o&&o.unsubscribe(),o=o$1.settings.subscribe((t=>{Object.entries(t).forEach((([t,e])=>{var o;const i=null===(o=n.find((e=>e.settingsKey===t)))||void 0===o?void 0:o.dataAttribute;i&&(e&&!document.body.hasAttribute(i)?document.body.setAttribute(i,""):document.body.hasAttribute(i)&&document.body.removeAttribute(i));}));})),e)e.disconnect();else {let t=0;e=new MutationObserver((()=>{if(t++>100)return console.warn("truffle: mutation observer disconnected due to too many mutations"),void e.disconnect();i(n);}));}e.observe(document.body,{attributes:!0,attributeFilter:n.map((({dataAttribute:t})=>t)),subtree:!1});}

export { i };
