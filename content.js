class Content {
    constructor() {
        this.pr = null, this.initProvider(), this.initRuntimeListener()
    }
    initProvider() {
        this.pr = new FBProvider, this.pr && this.pr.run()
    }
    initRuntimeListener() {
        chrome.runtime.onMessage.addListener((a, b, c) => {
            "getVideo" === a.action && this.pr && c(this.pr.videos)
        })
    }
}
let downloadQuery = new URL(window.location.href).searchParams.get("isdowloadquery");
window.self !== window.top || downloadQuery || (window.onload = function() {
    new Content
});
