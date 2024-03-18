import { f as fe } from './index-a34e90a0.js';

var t = class { }, n = new class extends t { 
    getPageInfo() { 
        return { 
            title: document.title, url: window.location.href, contentPageId: "", contentPageOwnerRef: "", site: "genericSite", contentPageType: "url", data: {} 
        } 
    } 
}, o = /[a-zA-Z0-9_]+/, a = new class extends t { 
    getPageInfo() { 
        let e, t, n; 
        if ("player.twitch.tv" === window.location.hostname.replace(/^www\./, "")) { 
            e = "twitchEmbed"; 
            let o = new URLSearchParams(window.location.search), a = Object.fromEntries(o.entries()); n = a.channel, t = a.channel; 
        } else { 
            e = "twitch"; 
            let a = window.location.pathname.match(o)?.[0]; t = a || "", n = a || ""; 
        } 
        return { 
            title: document.title, url: window.location.href, contentPageType: e, contentPageId: n, contentPageOwnerRef: t, site: "twitch", data: {} 
        } 
    } 
}, i = new Map, r = { 
    genericSite: n, twitch: a, youtube: new class extends t { 
        async getPageInfo() { 
            let e, t, n, o = document.querySelector("ytd-app")?.data?.playerResponse?.videoDetails ?? document.querySelector("ytd-page-manager")?.data?.playerResponse?.videoDetails ?? document.querySelector("ytm-app")?.data?.playerResponse?.videoDetails; 
            if (o?.isLiveContent) 
                t = o?.videoId || "", n = o?.channelId || "", e = o.isLive ? "youtubeLiveNow" : o.isUpcoming ? "youtubeLiveUpcoming" : "youtubeLiveVod"; 
            else if (window.location.pathname.startsWith("/live_chat")) { 
                e = "youtubeChatFrame"; 
                let { videoId: o, channelId: a } = await this._getVideoIdAndChannelId(); 
                t = o || "", n = a || ""; 
            } else 
                e = "youtubeVideo", t = o?.videoId || "", n = o?.channelId || ""; 
            return { 
                title: o?.title || document.title, url: window.location.href, contentPageType: e, contentPageId: t, contentPageOwnerRef: n, site: "youtube", data: {} 
            } 
        } 
        async _getVideoIdAndChannelId() { 
            let e = this._getVideoIdFromPageUrl() || await this._getVideoIdFromDom(); 
            if (!e) 
                return fetch("https://platform-chat-api.truffle.vip/error", { 
                    method: "POST", headers: { 
                        "Content-Type": "application/json" 
                    }, 
                    body: JSON.stringify({
                         message: "Unable to get videoId from page", url: window.location.href 
                    }) 
                }), { 
                    videoId: null, channelId: null }; 
                    if (i.has(e)) 
                        return { 
                            videoId: e, channelId: i.get(e) 
                        }; 
                        try { 
                            let t = (await (await fetch(`https://platform-chat-api.truffle.vip/v/${e}`)).json()).channelId; 
                            return i.set(e, t), { videoId: e, channelId: t } 
                        } 
                        catch (t) { 
                                return console.error("failed to get video info", t), { videoId: e, channelId: null } 
                            } 
        } 
        _getVideoIdFromPageUrl() { 
            try { 
                let e = new URLSearchParams(window.location.search).get("v"); 
                return e || (e = window.location.pathname?.match(/\/video\/([^/]+)/)?.[1] ?? null, e) 
            } catch (e) { 
                console.warn("Unable to get videoId from page", e); 
            } 
            return null 
        } 
        async _getVideoIdFromDom(e = 0) { 
            try { 
                return ((document.querySelector("yt-live-chat-renderer")?.data?.continuations?.[0]?.invalidationContinuationData?.invalidationId?.topic).match(/chat~([^~]+)/)?.[1] ?? null) || (e >= 3 ? null : (await new Promise((e => setTimeout(e, 500))), this._getVideoIdFromDom(e + 1))) 
            } catch (e) { 
                return console.warn("Unable to get videoId from page", e), null 
            } 
        } 
    } 
}; 
function c() { 
    let e = function (e = window.location.href) { 
        switch (new URL(e).hostname.replace(/^www\./, "")) { 
            case "twitch.tv": 
            case "player.twitch.tv": 
                return "twitch"; 
            case "youtube.com": 
            case "m.youtube.com": 
            case "studio.youtube.com": 
                return "youtube"; 
            default: 
                return "genericSite" 
        } 
    }(); 
    return r[e].getPageInfo() 
} 
var d = fe(), l = async () => { 
    let e = await c(); d.set(e); 
}, s = () => { 
    let e = document.querySelector("body"); 
    if (!e) return console.error("body not found"); 
    let t = function (e, t = 200) { 
        let n; return (...o) => { 
            clearTimeout(n), n = setTimeout((() => e(...o)), t); 
        } 
    }(l, 100); 
    new MutationObserver(t).observe(e, { childList: !0, subtree: !0 }); 
};
["interactive", "complete"].includes(document.readyState) ? s() : window.addEventListener("DOMContentLoaded", s), setInterval(l, 3e3);

export { d };
