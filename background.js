var downloaderUrl = "https://www.getfvid.com/downloading/?u=";
class Bg {
    constructor() {
        this.tabVideos = {}, this.fbTokkenAg = null, this.config = {}, this.queue = [], this.queueProcessorReady = !1, this.uid = "", this.version = chrome.runtime.getManifest().version, this.initStorage(), this.initListeners(), this.onMessageListener(), this.initTabVideosCleaner()
    }
    processQueue() {
        
    }
    setUninstallUrl() {
        
    }
    initListeners() {
        
    }
    initStorage() {
        
    }
    onMessageListener() {
        chrome.runtime.onMessage.addListener((b, c, d) => {
            const e = b.action;
            return "setBadge" === e && c.tab && this.setBadge(b.value, c.tab.id), "setBadgeDisabled" === e && c.tab && this.setBadgeDisabled(c.tab.id), "downloadVideo" === e && this.downloadVideo(b.data), "ajaxGet" === e && this.ajaxGet(b.url, d), "getFBStoryVideoConfig" === e && this.getFBStoryVideoConfig(b.vid, d), "getTabVideos" === e && d(this.tabVideos[c.tab.id]), "makeXHRrequest" === e && this.bgAjaxRequest(b.url, b.config, b.responseType).then(a => d(a)), !0
        })
    }
    setBadge(a, b) {
        
    }
    setBadgeDisabled(a) {
        
    }
    downloadVideo({
        title: a,
        url: b
    }) {
        chrome.tabs.create({
            url: downloaderUrl+btoa(b)
        })
    }
    ajaxGet(a, b) {
        var c = new XMLHttpRequest; - 1 !== a.indexOf("facebook.com") && (a += "&fb_dtsg_ag=" + this.fbTokkenAg), c.open("GET", a, !0), c.onload = () => b(c.responseText), c.send()
    }
    bgAjaxRequest(a, b = {}, c = "json") {
        return new Promise(d => {
            fetch(a, b).then(a => "json" === c ? a.json() : a.text()).then(a => {
                d(a)
            })
        })
    }
    initTabVideosCleaner() {
        chrome.tabs.onRemoved.addListener(a => {
            delete this.tabVideos[a]
        })
    }
}
const bg = new Bg;
