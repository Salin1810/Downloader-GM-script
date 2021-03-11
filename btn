const FBProvider = class extends Provider {
    constructor() {
        super(), this.initHandlers(), this.async_get_token = $("script:contains(\"async_get_token\")").text().split("async_get_token\":\"").pop().split("\"")[0];
        this.user_id = $("script:contains(\"async_get_token\")").text().split("USER_ID\":\"").pop().split("\"")[0]
    }
    search() {
        window.location.href !== this.location && (this.videos = [], this.setBadge(), $("*").removeClass("getfvid"), this.location = window.location.href), $(".bp9cbjyn.i09qtzwb.jeutjz8y.j83agx80.btwxx1t3.pmk7jnqg.dpja2al7.pnx7fd3z.e4zzj2sf.k4urcfbm.tghn160j").not(".getfvid").each((a, b) => {
            var c = $(b),
                d = !1;
            const e = c.parent();
            c.addClass("getfvid");
            try {
                var f = null;
                try {
                    var g = c.parents("div.k4urcfbm.kr520xx4.pmk7jnqg.datstx6m").find("a[href*=\"/videos/\"]").attr("href");
                    if (g || (g = c("a.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8.b1v8xokw").attr("href")), g) f = g, d = !0;
                    else if ("object" != typeof g) return console.log("Data must be object!")
                } catch (a) {
                    f = location.href
                }
                var h = this.GetVideoIdFromURL(f);
                this.GetVideosFromURL(f, !1).catch(() => {
                    this.getVideoFromPost(h)
                }), "number" == typeof h && "string" == typeof f && this.pushVideo(h, e, {
                    vid: h,
                    variants: [],
                    title: ""
                }, !1, f)
            } catch (a) {}
        })
    }
    initHandlers() {
        const a = $(document.body);
        a.on("click", ".mtz-item", a => this.download(a)), a.on("click", ".mtz-modal-close-icon", a => this.closeModal(a)), a.on("click", ".mtz-modal-overlay", a => this.closeModal(a))
    }
    GetVideoIdFromURL(a) {
        var b = null;
        try {
            var c = this.parseURL(a),
                d = c.query,
                e = c.path,
                f = this.ParseQuery(d);
            if (0 <= e.indexOf("ajax/sharer")) b = f.id;
            else if (0 <= e.indexOf("/videos/")) {
                var g = e.split("/").filter(a => 0 < a.length);
                b = g[g.length - 1]
            } else 0 <= e.indexOf("/watch/") ? b = f.v : 0 <= e.indexOf("permalink.php") && (b = f.story_fbid);
            if (!b) throw new Error("Id not found");
            b = parseInt(b)
        } catch (a) {
            return null
        }
        return b
    }
    getVideoFromPost(a, b = !1) {
        var c = this.GetVideoIdFromURL(a);
        this.Fetch(`https://m.facebook.com/story.php?story_fbid=${c}&id=${this.user_id}`, !1).then(a => {
            let b = this.findOnceMatch(a, /video&quot;,&quot;src&quot;:\s*&quot;([^\"]+)&quot;/);
            if (b) {
                const d = b[0].replaceAll("\\", "").replaceAll("&amp;", "&").split("&quot;")[0];
                let e = this.findOnceMatch(a, /img _lt3 _4s0y\" style="background: url\(&#039;\s*([^\"]+)&#039;/);
                e = e[0] ? e[0].replaceAll("\\", "").replaceAll("3a ", ":").replaceAll("3d ", "=").replaceAll("26 ", "&") : "";
                const f = $("<div />", {
                        html: a.split("<strong>")[1].split("</strong>")[0] + " - " + a.split("<abbr>")[1].split("</abbr>")[0]
                    }).text(),
                    g = {
                        vid: c[0] || c,
                        provider: "fb",
                        variants: {
                            url: d,
                            quality: "SD"
                        },
                        ext: "mp4",
                        title: `video_${c}`
                    };
                return g
            }
        })
    }
    GetVideosFromURL(a, b = !1) {
        var c;
        this;
        if (!b) {
            if (c = this.GetVideoIdFromURL(a), null === c) return console.log(new Error("Wrong video id"));
            a = "https://www.facebook.com/video.php?v=" + c, a = "https://www.facebook.com/plugins/video.php?" + $.param({
                href: a
            }), a = `https://www.facebook.com/video/video_data_async/?video_id=${c}&fb_dtsg_ag=${this.async_get_token}&__user=${this.user_id}&__a=1`
        }
        return this.Fetch(a, !1).then(b => {
            var d = $("<output>").append(b),
                e = $("title", d).text(),
                f = $("description", d).attr("content"),
                g = this.findMatch(b, /\"ownerName\":\s*\"([^\"]+)\"/gi, "ownerName"),
                h = this.findMatch(b, /\"video_id\":\s*\"([^\"]+)\"/gi, "video_id"),
                i = this.findMatch(b, /\"sd_src_no_ratelimit\":\s*\"([^\"]+)\"/gi, "sd_src_no_ratelimit"),
                j = this.findMatch(b, /\"hd_src_no_ratelimit\":\s*\"([^\"]+)\"/gi, "hd_src_no_ratelimit");
            if (g.length || (g = this.findOnceMatch(b, /ownerName:\s*\"([^\"]+)\"/)), h.length || (h = this.findOnceMatch(b, /video_id:\s*\"([^\"]+)\"/), !h.length && (h = [c])), i.length || (i = this.findOnceMatch(b, /sd_src_no_ratelimit:\s*\"([^\"]+)\"/), !i.length && (i = this.findMatch(b, /\"sd_src\":\s*\"([^\"]+)\"/gi, "sd_src")), !i.length && (i = $("meta[property=\"og:video:url\"]", d).attr("content"), i && (i = [i]))), j.length || (j = this.findOnceMatch(b, /hd_src_no_ratelimit:\s*\"([^\"]+)\"/), !j.length && (j = this.findMatch(b, /\"hd_src\":\s*\"([^\"]+)\"/gi, "hd_src"))), g.length || (g = ["Facebook video"]), !h || !i || h.length < i.length) throw new Error("Not found all ids");
            if (!i.length && !j.length) throw new Error("Not found videos - " + a);
            const k = [];
            j[0] && k.push({
                url: j[0],
                quality: "HD"
            }), i[0] && k.push({
                url: i[0],
                quality: "SD"
            });
            const l = {
                vid: h[0],
                provider: "fb",
                variants: k,
                ext: "mp4",
                type: "video/mp4",
                title: `video_${h}` || d.find("img.img").attr("src")
            };
            return l
        })
    }
    pushVideo(a, b, c, d, e) {
        this.ids[a] = !0, this.videos = this.videos.concat(c), this.setBadge(), this.renderBtn(a, b, d, e)
    }
    renderBtn(a, b, c, d) {
            const e = this.videos.find(b => b.vid === a);
            if (!e) return console.error("bad vid!");
            $(`
            <div class="download-btn" vid="${a}" hard="${c}">
                <span class="prepare">Download</span>
                <div class="download-btn-dropdown"></div>
       
            </div>
        `).appendTo(b).on("click", b => {
                if (b.stopPropagation(), $(b.target).hasClass("prepare")) $(b.target).removeClass("prepare"), $(b.target).text("Loading..."), this.GetVideosFromURL(d, c).then(c => {
                    if (0 < c.variants.length) {
                        const d = c.variants.map(a => `
                                <div class="download-btn-dropdown-item download" title="Download ${a.quality} Quality" url="${a.url}" quality="${a.quality}">${a.quality}</div>
                            `).join("");
                        $(`div[vid="${a}"] .download-btn-dropdown`).append(d), this.updateVideos(c), $(b.target).text("Ready!")
                    } else $(b.target).text("error!")
                });
                else if ($(b.target).hasClass("download")) {
                    const a = {
                        title: $(b.target).attr("title"),
                        url: $(b.target).attr("url")
                    };
                    chrome.runtime.sendMessage({
                        action: "downloadVideo",
                        data: a
                    }), this.incrementCounter()
                }
            })
    }
    updateVideos(a) {
        for (let b = 0; b < this.videos.length; b++)
            if (this.videos[b].vid == a.vid) {
                this.videos[b] = {
                    ...a
                };
                break
            }
    }
    hashCode() {
        return Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
    }
    parseURL(a) {
        for (var b = {
                strictMode: !1,
                key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
                q: {
                    name: "queryKey",
                    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                },
                parser: {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                }
            }, c = b.parser[b.strictMode ? "strict" : "loose"].exec(a), d = {}, e = 14; e--;) d[b.key[e]] = c[e] || "";
        var f = {};
        return "" !== d.protocol && (f.scheme = d.protocol), "" !== d.host && (f.host = d.host), "" !== d.port && (f.port = d.port), "" !== d.user && (f.user = d.user), "" !== d.password && (f.pass = d.password), "" !== d.path && (f.path = d.path), "" !== d.query && (f.query = d.query), "" !== d.anchor && (f.fragment = d.anchor), f
    }
    Fetch(a, b) {
        return void 0 === b && (b = !0), new Promise(function(c) {
            chrome.runtime.sendMessage({
                action: "makeXHRrequest",
                url: a,
                responseType: "text"
            }, a => {
                c(b ? JSON.parse(a) : a)
            })
        })
    }
    ParseQuery() {
        var a = {},
            b = /[?&]?([^=]+)(?:=([^&]*))?/g;
        for (var c in b)
            if (b.hasOwnProperty(c)) {
                var d = b[c].split("=");
                a[d[0]] = decodeURIComponent(d[1] || "")
            } return a
    }
    findOnceMatch(a, b) {
        var c = a.match(b);
        return c ? [c[1]] : []
    }
    findMatch(a, b, c) {
        var d = a.match(b);
        return d ? d.filter(function(a, b, c) {
            return c.indexOf(a) === b && a
        }).map(a => {
            var b = JSON.parse("{" + a + "}");
            return b[c]
        }) : []
    }
    incrementCounter() {
        let a = +localStorage.getItem("mtz-sptf-download-count");
        a++, localStorage.setItem("mtz-sptf-download-count", a + ""), (3 == a || 30 === a || 70 === a) && new ShareModal
    }
    closeModal(a) {
        const b = $(a.target);
        b.closest(".mtz-modal-body").length || b.closest(".mtz-modal-overlay").remove()
    }
};
FBProvider.location = "https://facebook.com";
