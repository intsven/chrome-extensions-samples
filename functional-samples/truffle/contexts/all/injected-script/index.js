import { d } from '../../../chunks/index-34a19201.js';
import { o as o$1 } from '../../../chunks/create-5399fd46.js';
import { n } from '../../../chunks/util-dbc6d9af.js';
import '../../../chunks/index-a34e90a0.js';
import '../../../chunks/transframe-provider-e657167f.js';

const r=[];d.onChange((({value:e})=>{r.forEach((t=>t(e)));}));o$1({namespace:"truffle-injected-api-v1",api:{pageInfoGet:(t,n)=>(n&&r.push(n),d.get())},strictMode:!0}).registerFrame(n(window));const i=[];let s=!1;const c={fetchObserve:(e,{urlRegexString:t},n)=>{const r=Math.random().toString();i.push({id:r,urlRegexString:t,onFetch:n}),s||a();},addFetchListener:(e,{urlRegexString:t},n)=>{const r=Math.random().toString();return i.push({id:r,urlRegexString:t,onFetch:n}),s||a(),{listenerId:r}},removeFetchListener:(e,{listenerId:t})=>{const n=i.findIndex((({id:e})=>e===t));-1!==n&&i.splice(n,1);}},o=o$1({namespace:"truffle-injected-privileged-api-v1",api:c,strictMode:!0});o$1({namespace:"truffle-injected-privileged-api-v2",api:c,strictMode:!1,allowedOrigins:["https://app.truffle.vip"]}),o.registerFrame(n(window));const a=()=>{s=!0;const e=window.fetch.bind(window);window.fetch=async function(t,n){const r=e(t,n);try{let e;if("string"==typeof t)e=t;else if(t instanceof Request)e=t.url;else {if(!(t instanceof URL))return r;e=t.href;}const n=i.filter((({urlRegexString:t})=>new RegExp(t).test(e)));if(0===n.length)return r;const s=await r;try{const t=s.text.bind(s),r=s.json.bind(s);s.text=async function(){const r=await t();try{const t={responseText:r,url:e};return n.forEach((({onFetch:e})=>e(t))),r}catch(e){return r}},s.json=async function(){const t=await r();try{const r={responseText:JSON.stringify(t),url:e};return n.forEach((({onFetch:e})=>e(r))),t}catch(e){return t}};}catch(e){return s}}catch(e){return r}return r};};
