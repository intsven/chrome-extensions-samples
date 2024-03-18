import { t as t$1 } from '../../../chunks/inject_script.util-bdbb08c6.js';
import { t } from '../../../chunks/index-8b25a992.js';
import { r } from '../../../chunks/browser-polyfill-f636ce7e.js';
import { n as n$1 } from '../../../chunks/connectRuntime-9650ce98.js';
import { o as o$1 } from '../../../chunks/storage-af31cd6f.js';
import { o as o$2 } from '../../../chunks/index-7b8f310d.js';
import { n } from '../../../chunks/util-dbc6d9af.js';
import { o } from '../../../chunks/create-5399fd46.js';
import '../../../chunks/transframe-provider-e657167f.js';

o({api:{getGlobalUserAccessToken:async()=>{const e=await o$2.auth.get("accessToken");if(!e)throw new Error("no access token");return e},setGlobalUserAccessToken:async(e,s)=>{await o$2.auth.set("accessToken",s);}},namespace:"truffle-legacy-privileged-api-v1",strictMode:!0}).registerFrame(n(window)),new class extends t{constructor(){super(),this.fetch=async(e,s)=>{const t=Math.random().toString();return this.port.postMessage({nonce:t,path:e,body:s}),new Promise((e=>{const s=a=>{var o;(null===(o=null==a?void 0:a.meta)||void 0===o?void 0:o.nonce)===t&&(this.port.onMessage.removeListener(s),e(a));};this.port.onMessage.addListener(s);}))},this.extensionId=r.runtime.id,this.port=this.connectToBackground(),this.port.onMessage.addListener(this.onMessage),window.addEventListener("message",(async e=>{var s,t,a;if(e.source!==window||(null===(s=e.data)||void 0===s?void 0:s.id)!==this.extensionId||"response"===(null===(t=e.data)||void 0===t?void 0:t.type))return;let n;switch(null===(a=e.data)||void 0===a?void 0:a.type){case"fetch":n=await this.fetch(e.data.data[0],e.data.data[1]);break;case"storage.get":{const[s,t]=e.data.data.split(".");n=await o$1[s].get(t);break}case"storage.set":{const[s,t]=e.data.data[0].split(".");n=await o$1[s].set(t,e.data.data[1]);break}}window.postMessage({id:this.extensionId,nonce:e.data.nonce,type:"response",data:n});}));}connectToBackground(){return n$1()}async onMessage(e){window.postMessage(e);}},t$1("legacy/injected/embed/index.js");
