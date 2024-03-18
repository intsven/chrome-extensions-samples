import { o as o$1 } from '../../../chunks/index-7b8f310d.js';
import { n } from '../../../chunks/util-dbc6d9af.js';
import { o } from '../../../chunks/create-5399fd46.js';
import { t } from '../../../chunks/inject-script-0480ddb1.js';
import { i } from '../../../chunks/add-body-attributes-ef235285.js';
import '../../../chunks/browser-polyfill-f636ce7e.js';
import '../../../chunks/transframe-provider-e657167f.js';

o({namespace:"truffle-youtube-chat-content-api-v1",api:{activeChatterUpdate:async(e,{channelId:a,chatterChannelId:n})=>{const c=await o$1.auth.get("accessToken");c&&await fetch(`https://platform-chat-api.truffle.vip/c/${a}/active-chatters`,{method:"POST",headers:{"Content-Type":"application/json","x-access-token":c},body:JSON.stringify({chatterChannelId:n})});},chatterGet:async(e,{channelId:a,chatterChannelId:n})=>{try{const e=await o$1.auth.get("accessToken");if(!e)return;const c=await fetch(`https://platform-chat-api.truffle.vip/c/${a}/chatter?chatterChannelId=${n}`,{method:"GET",headers:{"Content-Type":"application/json","x-access-token":e}});return await c.json()}catch(t){return console.warn("error fetching chatter",t),null}}},strictMode:!0}).registerFrame(n(window)),t("./contexts/youtube-chat/injected-script/index.js",{id:"truffle-youtube-chat-injected"});const r=()=>{i([{settingsKey:"chatStyles",dataAttribute:"data-mogul-use-chat-styles"},{settingsKey:"hideEmojiFountain",dataAttribute:"data-mogul-hide-emoji-fountain"}]);};"complete"===document.readyState||"interactive"===document.readyState?r():window.addEventListener("DOMContentLoaded",r);
