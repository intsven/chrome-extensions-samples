import { r } from './browser-polyfill-f636ce7e.js';

function t(t,{id:n}){const m=document.head||document.documentElement,o=document.createElement("script");o.type="module",o.id=n,o.dataset.runtime=r.runtime.id,o.src=r.runtime.getURL(t),m.prepend(o);}

export { t };
