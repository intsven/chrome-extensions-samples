import { e } from '../../../chunks/background.injected-3706b340.js';
import '../../../chunks/index-8b25a992.js';

!async function(n){const e=window.fetch.bind(window);window.fetch=async function(t,c){var i;const o=await e(t,c);try{(null===(i=null==c?void 0:c.headers)||void 0===i?void 0:i["Client-Id"])&&n.fetch("/twitch/set-gql-headers",c.headers);}catch(n){console.log("err saving gql");}return o};}(new e);
