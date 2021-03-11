const Provider = class {
    constructor() {
        this.ids = {}, this.videos = [], this.setBadge(), this.initHandlers()
    }
    run() {
        setInterval(() => this.search(), 1e3)
    }
    search() {}
    initHandlers() {
        const a = $(document.body);
        a.on("click", ".mtz-item", a => this.download(a)), a.on("click", ".mtz-modal-close-icon", a => this.closeModal(a)), a.on("click", ".mtz-modal-overlay", a => this.closeModal(a))
    }
    addVideo(a, b) {
        this.ids[a] = !0, this.getVideoData(a, c => c.variants.length ? void this.getAllSizes(c.variants, d => {
            c.variants = d, this.videos = this.videos.concat(c), this.setBadge(), this.renderBtn(a, b)
        }) : console.warn("empty video variants!"))
    }
    getVideoData() {}
    setBadge() {
    }
    renderBtn(a, b) {
        const c = this.videos.find(b => b.vid === a);
        if (!c) return console.error("bad vid!");
        const d = c.variants.map(a => `<div class="download-btn-dropdown-item" quality="${a.quality}">${a.quality}</div>
        `).join("");
        $(`
            <div  class="download-btn" vid="${a}">
                <span>Download</span>
                <div class="download-btn-dropdown">${d}</div>
            </div>
        `).appendTo(b).on("click", a => {
            a.stopPropagation(), this.download(a.target)
        })
    }
    download(a) {
        const b = a.closest("[vid]").getAttribute("vid"),
            c = a.getAttribute("quality");
        if (!c) return;
        const d = this.videos.find(a => a.vid == b),
            e = d.variants.find(a => a.quality === c),
            f = {
                title: d.title,
                url: e.url
            };
        if (!d || !e) return console.error("something bad happened!");
        if (e && 1 < e.length);
        chrome.runtime.sendMessage({
            action: "downloadVideo",
            data: f
        }), this.incrementCounter()
    }
    getAllSizes(a, b) {
        if (!GET_FILE_SIZE) return b(a);
        const c = a.map(a => this.getFileSize(a.url));
        Promise.all(c).then(c => {
            a.forEach((b, d) => a[d].size = c[d]), b(a)
        })
    }
    getFileSize(a) {
        return new Promise(b => {
            const c = new XMLHttpRequest;
            c.open("HEAD", a, !0), c.onload = () => {
                if (200 === c.status) {
                    const a = +c.getResponseHeader("Content-Length");
                    return b(a)
                }
                b(0)
            }, c.onerror = () => b(0), c.send()
        })
    }
    incrementCounter() {
        let a = +localStorage.getItem("mtz-sptf-download-count");
        a++, localStorage.setItem("mtz-sptf-download-count", a + ""), (5 == a || 30 === a || 70 === a) && new ShareModal
    }
    getCookie(a) {
        var b = "; " + document.cookie,
            c = b.split("; " + a + "=");
        if (2 == c.length) return c.pop().split(";").shift()
    }
    betweenStr(a, b, c) {
        if (!b && !c) return a;
        let d = "";
        const e = a.indexOf(b);
        if (-1 === e && (d = ""), 0 <= e && (d = a.substr(e + b.length, a.length)), !c) return d;
        const f = d.indexOf(c);
        return -1 === f && -1 !== e || -1 === f ? "" : (d = d.substr(0, f), d)
    }
    sortFormatsByWidth(a) {
        return a.sort((c, a) => a.formatWidth >= c.formatWidth ? 1 : -1)
    }
    filterUnique(a) {
        return a.reduce((a, b) => {
            const c = a.findIndex(a => a.formatNote === b.formatNote);
            return -1 === c ? [...a, b] : a
        }, [])
    }
    closeModal(a) {
        const b = $(a.target);
        b.closest(".mtz-modal-body").length || b.closest(".mtz-modal-overlay").remove()
    }
};
