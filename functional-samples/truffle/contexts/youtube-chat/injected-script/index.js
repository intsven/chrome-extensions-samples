import { o } from '../../../chunks/create-5399fd46.js';
import { n } from '../../../chunks/util-dbc6d9af.js';
import '../../../chunks/transframe-provider-e657167f.js';

const t = [];
o({ 
    namespace: "truffle-youtube-chat-injected-api-v1", 
    api: { 
        adoptStyleSheetCss: (e, o) => { 
            var n; 
            if (t.includes(o) || t.length > 100) 
                return; 
            const d = new CSSStyleSheet; 
            null === (n = d.replaceSync) 
                || void 0 === n 
                || n.call(d, o), document.adoptedStyleSheets = [...document.adoptedStyleSheets, d], t.push(o); 
        } 
    } 
});
o({ 
    namespace: "truffle-youtube-chat-injected-privileged-api-v1", 
    api: { 
        getYtcfgData: async e => { 
            var o, t; 
            return (null === (o = null === window || void 0 === window ? void 0 : window.ytcfg) || void 0 === o ? void 0 : o.data_) || (null === (t = null === window || void 0 === window ? void 0 : window.ytcfg) || void 0 === t ? void 0 : t.data) 
        }, 
        webComponentMethod: async (e, { 
            querySelector: o, method: t, args: n 
        }) => { 
            const d = document.querySelector(o); 
            if (!d) 
                throw new Error(`element not found: ${o}`); 
            const i = d; 
            if (!i[t]) 
                throw new Error(`method not found: ${t}`); 
            return i[t](...n) 
        }, 
        toggleNativeChat: async (e, { state: o }) => { 
            var t, n, d, i; 
            if ("open" === o) { 
                const e = window.close; window.close = () => window, null === (n = null === (t = document.querySelector("yt-live-chat-renderer")) || void 0 === t ? void 0 : t.closePopoutWindow) || void 0 === n || n.call(t), window.close = e; 
            } else { 
                const e = window.open; window.open = () => window, null === (i = null === (d = document.querySelector("yt-live-chat-renderer")) || void 0 === d ? void 0 : d.openPopoutWindow) || void 0 === i || i.call(d, ""), window.open = e; 
            } 
        } 
    }, strictMode: !1, allowedOrigins: ["https://app.truffle.vip"] 
}).registerFrame(n(window));
