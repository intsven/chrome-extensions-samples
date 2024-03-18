import { r } from './browser-polyfill-f636ce7e.js';

const n=n=>{let s;const t=()=>{s=r.runtime.connect(n),s.onDisconnect.addListener((()=>{t();}));};function o(e){return {addListener:n=>s[e].addListener(n),removeListener:n=>s[e].removeListener(n),hasListener:n=>s[e].hasListener(n),hasListeners:()=>s[e].hasListeners()}}t();const r$1={name:(null==n?void 0:n.name)||"",disconnect:()=>s.disconnect(),onDisconnect:o("onDisconnect"),onMessage:o("onMessage"),postMessage:e=>s.postMessage(e)};return Object.defineProperty(r$1,"name",{get:()=>s.name}),r$1};

export { n };
