﻿/*
Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
    if (!window.CKEDITOR || !window.CKEDITOR.dom) {
        window.CKEDITOR || (window.CKEDITOR = function () {
            var b = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i, f = {
                timestamp: "L4K9", version: "4.16.1 (Full)", revision: "cae20318d4", rnd: Math.floor(900 * Math.random()) + 100, _: { pending: [], basePathSrcPattern: b }, status: "unloaded", basePath: function () {
                    var a = window.CKEDITOR_BASEPATH || ""; if (!a) for (var d = document.getElementsByTagName("script"), h = 0; h < d.length; h++) { var l = d[h].src.match(b); if (l) { a = l[1]; break } } -1 == a.indexOf(":/") &&
                        "//" != a.slice(0, 2) && (a = 0 === a.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + a : location.href.match(/^[^\?]*\/(?:)/)[0] + a); if (!a) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.'; return a
                }(), getUrl: function (a) {
                    -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a); this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "\x26" : "?") + "t\x3d" + this.timestamp);
                    return a
                }, domReady: function () {
                    function a() { try { document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), window.removeEventListener("load", a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), window.detachEvent("onload", a), b()) } catch (l) { } } function b() { for (var a; a = d.shift();)a() } var d = []; return function (b) {
                        function e() { try { document.documentElement.doScroll("left") } catch (g) { setTimeout(e, 1); return } a() } d.push(b); "complete" ===
                            document.readyState && setTimeout(a, 1); if (1 == d.length) if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1); else if (document.attachEvent) { document.attachEvent("onreadystatechange", a); window.attachEvent("onload", a); b = !1; try { b = !window.frameElement } catch (k) { } document.documentElement.doScroll && b && e() }
                    }
                }()
            }, d = window.CKEDITOR_GETURL; if (d) { var a = f.getUrl; f.getUrl = function (b) { return d.call(f, b) || a.call(f, b) } } return f
        }()); (function () {
            var b = {}; CKEDITOR.event ||
                (CKEDITOR.event = function () { }, CKEDITOR.event.implementOn = function (b) { var d = CKEDITOR.event.prototype, a; for (a in d) null == b[a] && (b[a] = d[a]) }, CKEDITOR.event.prototype = function () {
                    function f(b) { var m = d(this); return m[b] || (m[b] = new a(b)) } var d = function (a) { a = a.getPrivate && a.getPrivate() || a._ || (a._ = {}); return a.events || (a.events = {}) }, a = function (a) { this.name = a; this.listeners = [] }; a.prototype = { getListenerIndex: function (a) { for (var b = 0, d = this.listeners; b < d.length; b++)if (d[b].fn == a) return b; return -1 } }; return {
                        define: function (a,
                            b) { var d = f.call(this, a); CKEDITOR.tools.extend(d, b, !0) }, on: function (a, d, h, l, e) { function k(n, e, k, q) { n = { name: a, sender: this, editor: n, data: e, listenerData: l, stop: k, cancel: q, removeListener: g }; return !1 === d.call(h, n) ? b : n.data } function g() { n.removeListener(a, d) } var n = this, q = f.call(this, a); if (0 > q.getListenerIndex(d)) { q = q.listeners; h || (h = this); isNaN(e) && (e = 10); k.fn = d; k.priority = e; for (var u = q.length - 1; 0 <= u; u--)if (q[u].priority <= e) return q.splice(u + 1, 0, k), { removeListener: g }; q.unshift(k) } return { removeListener: g } },
                        once: function () { var a = Array.prototype.slice.call(arguments), b = a[1]; a[1] = function (a) { a.removeListener(); return b.apply(this, arguments) }; return this.on.apply(this, a) }, capture: function () { CKEDITOR.event.useCapture = 1; var a = this.on.apply(this, arguments); CKEDITOR.event.useCapture = 0; return a }, fire: function () {
                            var a = 0, m = function () { a = 1 }, h = 0, l = function () { h = 1 }; return function (e, k, g) {
                                var n = d(this)[e]; e = a; var q = h; a = h = 0; if (n) {
                                    var f = n.listeners; if (f.length) for (var f = f.slice(0), r, p = 0; p < f.length; p++) {
                                        if (n.errorProof) try {
                                            r =
                                            f[p].call(this, g, k, m, l)
                                        } catch (v) { } else r = f[p].call(this, g, k, m, l); r === b ? h = 1 : "undefined" != typeof r && (k = r); if (a || h) break
                                    }
                                } k = h ? !1 : "undefined" == typeof k ? !0 : k; a = e; h = q; return k
                            }
                        }(), fireOnce: function (a, b, h) { b = this.fire(a, b, h); delete d(this)[a]; return b }, removeListener: function (a, b) { var h = d(this)[a]; if (h) { var l = h.getListenerIndex(b); 0 <= l && h.listeners.splice(l, 1) } }, removeAllListeners: function () { var a = d(this), b; for (b in a) delete a[b] }, hasListeners: function (a) { return (a = d(this)[a]) && 0 < a.listeners.length }
                    }
                }())
        })();
        CKEDITOR.editor || (CKEDITOR.editor = function () { CKEDITOR._.pending.push([this, arguments]); CKEDITOR.event.call(this) }, CKEDITOR.editor.prototype.fire = function (b, f) { b in { instanceReady: 1, loaded: 1 } && (this[b] = !0); return CKEDITOR.event.prototype.fire.call(this, b, f, this) }, CKEDITOR.editor.prototype.fireOnce = function (b, f) { b in { instanceReady: 1, loaded: 1 } && (this[b] = !0); return CKEDITOR.event.prototype.fireOnce.call(this, b, f, this) }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)); CKEDITOR.env || (CKEDITOR.env =
            function () {
                var b = navigator.userAgent.toLowerCase(), f = b.match(/edge[ \/](\d+.?\d*)/), d = -1 < b.indexOf("trident/"), d = !(!f && !d), d = {
                    ie: d, edge: !!f, webkit: !d && -1 < b.indexOf(" applewebkit/"), air: -1 < b.indexOf(" adobeair/"), mac: -1 < b.indexOf("macintosh"), quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode), mobile: -1 < b.indexOf("mobile"), iOS: /(ipad|iphone|ipod)/.test(b), isCustomDomain: function () {
                        if (!this.ie) return !1; var a = document.domain, b = window.location.hostname; return a !=
                            b && a != "[" + b + "]"
                    }, secure: "https:" == location.protocol
                }; d.gecko = "Gecko" == navigator.product && !d.webkit && !d.ie; d.webkit && (-1 < b.indexOf("chrome") ? d.chrome = !0 : d.safari = !0); var a = 0; d.ie && (a = f ? parseFloat(f[1]) : d.quirks || !document.documentMode ? parseFloat(b.match(/msie (\d+)/)[1]) : document.documentMode, d.ie9Compat = 9 == a, d.ie8Compat = 8 == a, d.ie7Compat = 7 == a, d.ie6Compat = 7 > a || d.quirks); d.gecko && (f = b.match(/rv:([\d\.]+)/)) && (f = f[1].split("."), a = 1E4 * f[0] + 100 * (f[1] || 0) + 1 * (f[2] || 0)); d.air && (a = parseFloat(b.match(/ adobeair\/(\d+)/)[1]));
                d.webkit && (a = parseFloat(b.match(/ applewebkit\/(\d+)/)[1])); d.version = a; d.isCompatible = !(d.ie && 7 > a) && !(d.gecko && 4E4 > a) && !(d.webkit && 534 > a); d.hidpi = 2 <= window.devicePixelRatio; d.needsBrFiller = d.gecko || d.webkit || d.ie && 10 < a; d.needsNbspFiller = d.ie && 11 > a; d.cssClass = "cke_browser_" + (d.ie ? "ie" : d.gecko ? "gecko" : d.webkit ? "webkit" : "unknown"); d.quirks && (d.cssClass += " cke_browser_quirks"); d.ie && (d.cssClass += " cke_browser_ie" + (d.quirks ? "6 cke_browser_iequirks" : d.version)); d.air && (d.cssClass += " cke_browser_air");
                d.iOS && (d.cssClass += " cke_browser_ios"); d.hidpi && (d.cssClass += " cke_hidpi"); return d
            }()); "unloaded" == CKEDITOR.status && function () {
                CKEDITOR.event.implementOn(CKEDITOR); CKEDITOR.loadFullCore = function () { if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1; else { delete CKEDITOR.loadFullCore; var b = document.createElement("script"); b.type = "text/javascript"; b.src = CKEDITOR.basePath + "ckeditor.js"; document.getElementsByTagName("head")[0].appendChild(b) } }; CKEDITOR.loadFullCoreTimeout = 0; CKEDITOR.add =
                    function (b) { (this._.pending || (this._.pending = [])).push(b) }; (function () { CKEDITOR.domReady(function () { var b = CKEDITOR.loadFullCore, f = CKEDITOR.loadFullCoreTimeout; b && (CKEDITOR.status = "basic_ready", b && b._load ? b() : f && setTimeout(function () { CKEDITOR.loadFullCore && CKEDITOR.loadFullCore() }, 1E3 * f)) }) })(); CKEDITOR.status = "basic_loaded"
            }(); "use strict"; CKEDITOR.VERBOSITY_WARN = 1; CKEDITOR.VERBOSITY_ERROR = 2; CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR; CKEDITOR.warn = function (b, f) {
                CKEDITOR.verbosity &
                CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", { type: "warn", errorCode: b, additionalData: f })
            }; CKEDITOR.error = function (b, f) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log", { type: "error", errorCode: b, additionalData: f }) }; CKEDITOR.on("log", function (b) {
                if (window.console && window.console.log) {
                    var f = console[b.data.type] ? b.data.type : "log", d = b.data.errorCode; if (b = b.data.additionalData) console[f]("[CKEDITOR] Error code: " + d + ".", b); else console[f]("[CKEDITOR] Error code: " + d + "."); console[f]("[CKEDITOR] For more information about this error go to https://ckeditor.com/docs/ckeditor4/latest/guide/dev_errors.html#" +
                        d)
                }
            }, null, null, 999); CKEDITOR.dom = {}; (function () {
                function b(a, b, g) { this._minInterval = a; this._context = g; this._lastOutput = this._scheduledTimer = 0; this._output = CKEDITOR.tools.bind(b, g || {}); var e = this; this.input = function () { function a() { e._lastOutput = (new Date).getTime(); e._scheduledTimer = 0; e._call() } if (!e._scheduledTimer || !1 !== e._reschedule()) { var b = (new Date).getTime() - e._lastOutput; b < e._minInterval ? e._scheduledTimer = setTimeout(a, e._minInterval - b) : a() } } } function f(a, g, e) {
                    b.call(this, a, g, e); this._args =
                        []; var c = this; this.input = CKEDITOR.tools.override(this.input, function (a) { return function () { c._args = Array.prototype.slice.call(arguments); a.call(this) } })
                } var d = [], a = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "", c = /&/g, m = />/g, h = /</g, l = /"/g, e = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g, k = { lt: "\x3c", gt: "\x3e", amp: "\x26", quot: '"', nbsp: " ", shy: "­" }, g = function (a, b) { return "#" == b[0] ? String.fromCharCode(parseInt(b.slice(1), 10)) : k[b] }; CKEDITOR.on("reset", function () { d = [] }); CKEDITOR.tools =
                {
                    arrayCompare: function (a, b) { if (!a && !b) return !0; if (!a || !b || a.length != b.length) return !1; for (var g = 0; g < a.length; g++)if (a[g] != b[g]) return !1; return !0 }, getIndex: function (a, b) { for (var g = 0; g < a.length; ++g)if (b(a[g])) return g; return -1 }, clone: function (a) {
                        var b; if (a && a instanceof Array) { b = []; for (var g = 0; g < a.length; g++)b[g] = CKEDITOR.tools.clone(a[g]); return b } if (null === a || "object" != typeof a || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window ===
                            a) return a; b = new a.constructor; for (g in a) b[g] = CKEDITOR.tools.clone(a[g]); return b
                    }, capitalize: function (a, b) { return a.charAt(0).toUpperCase() + (b ? a.slice(1) : a.slice(1).toLowerCase()) }, extend: function (a) { var b = arguments.length, g, e; "boolean" == typeof (g = arguments[b - 1]) ? b-- : "boolean" == typeof (g = arguments[b - 2]) && (e = arguments[b - 1], b -= 2); for (var c = 1; c < b; c++) { var k = arguments[c] || {}; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(k), function (b) { if (!0 === g || null == a[b]) if (!e || b in e) a[b] = k[b] }) } return a },
                    prototypedCopy: function (a) { var b = function () { }; b.prototype = a; return new b }, copy: function (a) { var b = {}, g; for (g in a) b[g] = a[g]; return b }, isArray: function (a) { return "[object Array]" == Object.prototype.toString.call(a) }, isEmpty: function (a) { for (var b in a) if (a.hasOwnProperty(b)) return !1; return !0 }, cssVendorPrefix: function (b, g, e) { if (e) return a + b + ":" + g + ";" + b + ":" + g; e = {}; e[b] = g; e[a + b] = g; return e }, cssStyleToDomStyle: function () {
                        var a = document.createElement("div").style, b = "undefined" != typeof a.cssFloat ? "cssFloat" :
                            "undefined" != typeof a.styleFloat ? "styleFloat" : "float"; return function (a) { return "float" == a ? b : a.replace(/-./g, function (a) { return a.substr(1).toUpperCase() }) }
                    }(), buildStyleHtml: function (a) { a = [].concat(a); for (var b, g = [], e = 0; e < a.length; e++)if (b = a[e]) /@import|[{}]/.test(b) ? g.push("\x3cstyle\x3e" + b + "\x3c/style\x3e") : g.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + b + '"\x3e'); return g.join("") }, htmlEncode: function (a) {
                        return void 0 === a || null === a ? "" : String(a).replace(c, "\x26amp;").replace(m,
                            "\x26gt;").replace(h, "\x26lt;")
                    }, htmlDecode: function (a) { return a.replace(e, g) }, htmlEncodeAttr: function (a) { return CKEDITOR.tools.htmlEncode(a).replace(l, "\x26quot;") }, htmlDecodeAttr: function (a) { return CKEDITOR.tools.htmlDecode(a) }, transformPlainTextToHtml: function (a, b) {
                        var g = b == CKEDITOR.ENTER_BR, e = this.htmlEncode(a.replace(/\r\n/g, "\n")), e = e.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"), c = b == CKEDITOR.ENTER_P ? "p" : "div"; if (!g) {
                            var k = /\n{2}/g; if (k.test(e)) var l = "\x3c" + c + "\x3e", d = "\x3c/" + c + "\x3e", e = l +
                                e.replace(k, function () { return d + l }) + d
                        } e = e.replace(/\n/g, "\x3cbr\x3e"); g || (e = e.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + c + "\x3e)"), function (a) { return CKEDITOR.tools.repeat(a, 2) })); e = e.replace(/^ | $/g, "\x26nbsp;"); return e = e.replace(/(>|\s) /g, function (a, b) { return b + "\x26nbsp;" }).replace(/ (?=<)/g, "\x26nbsp;")
                    }, getNextNumber: function () { var a = 0; return function () { return ++a } }(), getNextId: function () { return "cke_" + this.getNextNumber() }, getUniqueId: function () {
                        for (var a = "e", b = 0; 8 > b; b++)a += Math.floor(65536 *
                            (1 + Math.random())).toString(16).substring(1); return a
                    }, override: function (a, b) { var g = b(a); g.prototype = a.prototype; return g }, setTimeout: function (a, b, g, e, c) { c || (c = window); g || (g = c); return c.setTimeout(function () { e ? a.apply(g, [].concat(e)) : a.apply(g) }, b || 0) }, throttle: function (a, b, g) { return new this.buffers.throttle(a, b, g) }, trim: function () { var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g; return function (b) { return b.replace(a, "") } }(), ltrim: function () { var a = /^[ \t\n\r]+/g; return function (b) { return b.replace(a, "") } }(),
                    rtrim: function () { var a = /[ \t\n\r]+$/g; return function (b) { return b.replace(a, "") } }(), indexOf: function (a, b) { if ("function" == typeof b) for (var g = 0, e = a.length; g < e; g++) { if (b(a[g])) return g } else { if (a.indexOf) return a.indexOf(b); g = 0; for (e = a.length; g < e; g++)if (a[g] === b) return g } return -1 }, search: function (a, b) { var g = CKEDITOR.tools.indexOf(a, b); return 0 <= g ? a[g] : null }, bind: function (a, b) { var g = Array.prototype.slice.call(arguments, 2); return function () { return a.apply(b, g.concat(Array.prototype.slice.call(arguments))) } },
                    createClass: function (a) {
                        var b = a.$, g = a.base, e = a.privates || a._, c = a.proto; a = a.statics; !b && (b = function () { g && this.base.apply(this, arguments) }); if (e) var k = b, b = function () { var a = this._ || (this._ = {}), b; for (b in e) { var g = e[b]; a[b] = "function" == typeof g ? CKEDITOR.tools.bind(g, this) : g } k.apply(this, arguments) }; g && (b.prototype = this.prototypedCopy(g.prototype), b.prototype.constructor = b, b.base = g, b.baseProto = g.prototype, b.prototype.base = function t() { this.base = g.prototype.base; g.apply(this, arguments); this.base = t }); c &&
                            this.extend(b.prototype, c, !0); a && this.extend(b, a, !0); return b
                    }, addFunction: function (a, b) { return d.push(function () { return a.apply(b || this, arguments) }) - 1 }, removeFunction: function (a) { d[a] = null }, callFunction: function (a) { var b = d[a]; return b && b.apply(window, Array.prototype.slice.call(arguments, 1)) }, cssLength: function () { var a = /^-?\d+\.?\d*px$/, b; return function (g) { b = CKEDITOR.tools.trim(g + "") + "px"; return a.test(b) ? b : g || "" } }(), convertToPx: function () {
                        var a; return function (b) {
                            a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e',
                                CKEDITOR.document), CKEDITOR.document.getBody().append(a)); if (!/%$/.test(b)) { var g = 0 > parseFloat(b); g && (b = b.replace("-", "")); a.setStyle("width", b); b = a.$.clientWidth; return g ? -b : b } return b
                        }
                    }(), repeat: function (a, b) { return Array(b + 1).join(a) }, tryThese: function () { for (var a, b = 0, g = arguments.length; b < g; b++) { var e = arguments[b]; try { a = e(); break } catch (c) { } } return a }, genKey: function () { return Array.prototype.slice.call(arguments).join("-") }, defer: function (a) {
                        return function () {
                            var b = arguments, g = this; window.setTimeout(function () {
                                a.apply(g,
                                    b)
                            }, 0)
                        }
                    }, normalizeCssText: function (a, b) { var g = [], e, c = CKEDITOR.tools.parseCssText(a, !0, b); for (e in c) g.push(e + ":" + c[e]); g.sort(); return g.length ? g.join(";") + ";" : "" }, convertRgbToHex: function (a) { return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function (a, b, g, e) { a = [b, g, e]; for (b = 0; 3 > b; b++)a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2); return "#" + a.join("") }) }, normalizeHex: function (a) {
                        return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function (a, b, g, e) {
                            a = b.toLowerCase(); 3 == a.length &&
                                (a = a.split(""), a = [a[0], a[0], a[1], a[1], a[2], a[2]].join("")); return "#" + a + e
                        })
                    }, _isValidColorFormat: function (a) { if (!a) return !1; a = a.replace(/\s+/g, ""); return /^[a-z0-9()#%,./]+$/i.test(a) }, parseCssText: function (a, b, g) {
                        var e = {}; g && (a = (new CKEDITOR.dom.element("span")).setAttribute("style", a).getAttribute("style") || ""); a && (a = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a))); if (!a || ";" == a) return e; a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (a, g, c) {
                            b && (g =
                                g.toLowerCase(), "font-family" == g && (c = c.replace(/\s*,\s*/g, ",")), c = CKEDITOR.tools.trim(c)); e[g] = c
                        }); return e
                    }, writeCssText: function (a, b) { var g, e = []; for (g in a) e.push(g + ":" + a[g]); b && e.sort(); return e.join("; ") }, objectCompare: function (a, b, g) { var e; if (!a && !b) return !0; if (!a || !b) return !1; for (e in a) if (a[e] != b[e]) return !1; if (!g) for (e in b) if (a[e] != b[e]) return !1; return !0 }, objectKeys: function (a) { return CKEDITOR.tools.object.keys(a) }, convertArrayToObject: function (a, b) {
                        var g = {}; 1 == arguments.length && (b = !0);
                        for (var e = 0, c = a.length; e < c; ++e)g[a[e]] = b; return g
                    }, getStyledSpans: function (a, b) { var g = CKEDITOR.env.ie && 8 == CKEDITOR.env.version ? a.toUpperCase() : a, g = b.find("span[style*\x3d" + g + "]").toArray(); return CKEDITOR.tools.array.filter(g, function (b) { return !!b.getStyle(a) }) }, fixDomain: function () { for (var a; ;)try { a = window.parent.document.domain; break } catch (b) { a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain; if (!a) break; document.domain = a } return !!a }, eventsBuffer: function (a, b, g) { return new this.buffers.event(a, b, g) },
                    enableHtml5Elements: function (a, b) { for (var g = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "), e = g.length, c; e--;)c = a.createElement(g[e]), b && a.appendChild(c) }, checkIfAnyArrayItemMatches: function (a, b) { for (var g = 0, e = a.length; g < e; ++g)if (a[g].match(b)) return !0; return !1 }, checkIfAnyObjectPropertyMatches: function (a, b) { for (var g in a) if (g.match(b)) return !0; return !1 }, keystrokeToString: function (a,
                        b) { var g = this.keystrokeToArray(a, b); g.display = g.display.join("+"); g.aria = g.aria.join("+"); return g }, keystrokeToArray: function (a, b) { var g = b & 16711680, e = b & 65535, c = CKEDITOR.env.mac, k = [], l = []; g & CKEDITOR.CTRL && (k.push(c ? "⌘" : a[17]), l.push(c ? a[224] : a[17])); g & CKEDITOR.ALT && (k.push(c ? "⌥" : a[18]), l.push(a[18])); g & CKEDITOR.SHIFT && (k.push(c ? "⇧" : a[16]), l.push(a[16])); e && (a[e] ? (k.push(a[e]), l.push(a[e])) : (k.push(String.fromCharCode(e)), l.push(String.fromCharCode(e)))); return { display: k, aria: l } }, transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",
                    getCookie: function (a) { a = a.toLowerCase(); for (var b = document.cookie.split(";"), g, e, c = 0; c < b.length; c++)if (g = b[c].split("\x3d"), e = decodeURIComponent(CKEDITOR.tools.trim(g[0]).toLowerCase()), e === a) return decodeURIComponent(1 < g.length ? g[1] : ""); return null }, setCookie: function (a, b) { document.cookie = encodeURIComponent(a) + "\x3d" + encodeURIComponent(b) + ";path\x3d/" }, getCsrfToken: function () {
                        var a = CKEDITOR.tools.getCookie("ckCsrfToken"); if (!a || 40 != a.length) {
                            var a = [], b = ""; if (window.crypto && window.crypto.getRandomValues) a =
                                new Uint8Array(40), window.crypto.getRandomValues(a); else for (var g = 0; 40 > g; g++)a.push(Math.floor(256 * Math.random())); for (g = 0; g < a.length; g++)var e = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[g] % 36), b = b + (.5 < Math.random() ? e.toUpperCase() : e); a = b; CKEDITOR.tools.setCookie("ckCsrfToken", a)
                        } return a
                    }, escapeCss: function (a) { return a ? window.CSS && CSS.escape ? CSS.escape(a) : isNaN(parseInt(a.charAt(0), 10)) ? a : "\\3" + a.charAt(0) + " " + a.substring(1, a.length) : "" }, getMouseButton: function (a) {
                        return (a = a && a.data ? a.data.$ :
                            a) ? CKEDITOR.tools.normalizeMouseButton(a.button) : !1
                    }, normalizeMouseButton: function (a, b) { if (!CKEDITOR.env.ie || 9 <= CKEDITOR.env.version && !CKEDITOR.env.ie6Compat) return a; for (var g = [[CKEDITOR.MOUSE_BUTTON_LEFT, 1], [CKEDITOR.MOUSE_BUTTON_MIDDLE, 4], [CKEDITOR.MOUSE_BUTTON_RIGHT, 2]], e = 0; e < g.length; e++) { var c = g[e]; if (c[0] === a && b) return c[1]; if (!b && c[1] === a) return c[0] } }, convertHexStringToBytes: function (a) { var b = [], g = a.length / 2, e; for (e = 0; e < g; e++)b.push(parseInt(a.substr(2 * e, 2), 16)); return b }, convertBytesToBase64: function (a) {
                        var b =
                            "", g = a.length, e; for (e = 0; e < g; e += 3) { var c = a.slice(e, e + 3), k = c.length, l = [], d; if (3 > k) for (d = k; 3 > d; d++)c[d] = 0; l[0] = (c[0] & 252) >> 2; l[1] = (c[0] & 3) << 4 | c[1] >> 4; l[2] = (c[1] & 15) << 2 | (c[2] & 192) >> 6; l[3] = c[2] & 63; for (d = 0; 4 > d; d++)b = d <= k ? b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(l[d]) : b + "\x3d" } return b
                    }, style: {
                        parse: {
                            _borderStyle: "none hidden dotted dashed solid double groove ridge inset outset".split(" "), _widthRegExp: /^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/,
                            _rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi, _hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi, background: function (a) { var b = {}, g = this._findColor(a); g.length && (b.color = g[0], CKEDITOR.tools.array.forEach(g, function (b) { a = a.replace(b, "") })); if (a = CKEDITOR.tools.trim(a)) b.unprocessed = a; return b }, margin: function (a) {
                                return CKEDITOR.tools.style.parse.sideShorthand(a, function (a) {
                                    return a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset|revert)/g) ||
                                        ["0px"]
                                })
                            }, sideShorthand: function (a, b) { function g(a) { e.top = c[a[0]]; e.right = c[a[1]]; e.bottom = c[a[2]]; e.left = c[a[3]] } var e = {}, c = b ? b(a) : a.split(/\s+/); switch (c.length) { case 1: g([0, 0, 0, 0]); break; case 2: g([0, 1, 0, 1]); break; case 3: g([0, 1, 2, 1]); break; case 4: g([0, 1, 2, 3]) }return e }, border: function (a) { return CKEDITOR.tools.style.border.fromCssRule(a) }, _findColor: function (a) {
                                var b = [], g = CKEDITOR.tools.array, b = b.concat(a.match(this._rgbaRegExp) || []), b = b.concat(a.match(this._hslaRegExp) || []); return b = b.concat(g.filter(a.split(/\s+/),
                                    function (a) { return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) ? !0 : a.toLowerCase() in CKEDITOR.tools.style.parse._colors }))
                            }
                        }
                    }, array: {
                        filter: function (a, b, g) { var e = []; this.forEach(a, function (c, k) { b.call(g, c, k, a) && e.push(c) }); return e }, find: function (a, b, g) { for (var e = a.length, c = 0; c < e;) { if (b.call(g, a[c], c, a)) return a[c]; c++ } }, forEach: function (a, b, g) { var e = a.length, c; for (c = 0; c < e; c++)b.call(g, a[c], c, a) }, map: function (a, b, g) { for (var e = [], c = 0; c < a.length; c++)e.push(b.call(g, a[c], c, a)); return e }, reduce: function (a,
                            b, g, e) { for (var c = 0; c < a.length; c++)g = b.call(e, g, a[c], c, a); return g }, every: function (a, b, g) { if (!a.length) return !0; b = this.filter(a, b, g); return a.length === b.length }, some: function (a, b, g) { for (var e = 0; e < a.length; e++)if (b.call(g, a[e], e, a)) return !0; return !1 }, zip: function (a, b) { return CKEDITOR.tools.array.map(a, function (a, g) { return [a, b[g]] }) }, unique: function (a) { return this.filter(a, function (b, g) { return g === CKEDITOR.tools.array.indexOf(a, b) }) }
                    }, object: {
                        DONT_ENUMS: "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),
                        entries: function (a) { return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(a), function (b) { return [b, a[b]] }) }, values: function (a) { return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(a), function (b) { return a[b] }) }, keys: function (a) {
                            var b = Object.prototype.hasOwnProperty, g = [], e = CKEDITOR.tools.object.DONT_ENUMS; if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (!a || "object" !== typeof a)) { b = []; if ("string" === typeof a) for (g = 0; g < a.length; g++)b.push(String(g)); return b } for (var c in a) g.push(c); if (CKEDITOR.env.ie &&
                                9 > CKEDITOR.env.version) for (c = 0; c < e.length; c++)b.call(a, e[c]) && g.push(e[c]); return g
                        }, findKey: function (a, b) { if ("object" !== typeof a) return null; for (var g in a) if (a[g] === b) return g; return null }, merge: function (a, b) { var g = CKEDITOR.tools, e = g.clone(a), c = g.clone(b); g.array.forEach(g.object.keys(c), function (a) { e[a] = "object" === typeof c[a] && "object" === typeof e[a] ? g.object.merge(e[a], c[a]) : c[a] }); return e }
                    }, getAbsoluteRectPosition: function (a, b) {
                        function g(a) {
                            if (a) {
                                var b = a.getClientRect(); e.top += b.top; e.left +=
                                    b.left; "x" in e && "y" in e && (e.x += b.x, e.y += b.y); g(a.getWindow().getFrame())
                            }
                        } var e = CKEDITOR.tools.copy(b); g(a.getFrame()); var c = CKEDITOR.document.getWindow().getScrollPosition(); e.top += c.y; e.left += c.x; "x" in e && "y" in e && (e.y += c.y, e.x += c.x); e.right = e.left + e.width; e.bottom = e.top + e.height; return e
                    }
                }; b.prototype = {
                    reset: function () { this._lastOutput = 0; this._clearTimer() }, _reschedule: function () { return !1 }, _call: function () { this._output() }, _clearTimer: function () {
                        this._scheduledTimer && clearTimeout(this._scheduledTimer);
                        this._scheduledTimer = 0
                    }
                }; f.prototype = CKEDITOR.tools.prototypedCopy(b.prototype); f.prototype._reschedule = function () { this._scheduledTimer && this._clearTimer() }; f.prototype._call = function () { this._output.apply(this._context, this._args) }; CKEDITOR.tools.buffers = {}; CKEDITOR.tools.buffers.event = b; CKEDITOR.tools.buffers.throttle = f; CKEDITOR.tools.style.border = CKEDITOR.tools.createClass({
                    $: function (a) { a = a || {}; this.width = a.width; this.style = a.style; this.color = a.color; this._.normalize() }, _: {
                        normalizeMap: {
                            color: [[/windowtext/g,
                                "black"]]
                        }, normalize: function () { for (var a in this._.normalizeMap) { var b = this[a]; b && (this[a] = CKEDITOR.tools.array.reduce(this._.normalizeMap[a], function (a, b) { return a.replace(b[0], b[1]) }, b)) } }
                    }, proto: { toString: function () { return CKEDITOR.tools.array.filter([this.width, this.style, this.color], function (a) { return !!a }).join(" ") } }, statics: {
                        fromCssRule: function (a) {
                            var b = {}, g = a.split(/\s+/g); a = CKEDITOR.tools.style.parse._findColor(a); a.length && (b.color = a[0]); CKEDITOR.tools.array.forEach(g, function (a) {
                                b.style ||
                                -1 === CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle, a) ? !b.width && CKEDITOR.tools.style.parse._widthRegExp.test(a) && (b.width = a) : b.style = a
                            }); return new CKEDITOR.tools.style.border(b)
                        }, splitCssValues: function (a, b) {
                            b = b || {}; var g = CKEDITOR.tools.array.reduce(["width", "style", "color"], function (g, e) { var c = a["border-" + e] || b[e]; g[e] = c ? CKEDITOR.tools.style.parse.sideShorthand(c) : null; return g }, {}); return CKEDITOR.tools.array.reduce(["top", "right", "bottom", "left"], function (b, e) {
                                var c = {}, k; for (k in g) {
                                    var l =
                                        a["border-" + e + "-" + k]; c[k] = l ? l : g[k] && g[k][e]
                                } b["border-" + e] = new CKEDITOR.tools.style.border(c); return b
                            }, {})
                        }
                    }
                }); CKEDITOR.tools.array.indexOf = CKEDITOR.tools.indexOf; CKEDITOR.tools.array.isArray = CKEDITOR.tools.isArray; CKEDITOR.MOUSE_BUTTON_LEFT = 0; CKEDITOR.MOUSE_BUTTON_MIDDLE = 1; CKEDITOR.MOUSE_BUTTON_RIGHT = 2
            })(); CKEDITOR.dtd = function () {
                var b = CKEDITOR.tools.extend, f = function (a, b) { for (var e = CKEDITOR.tools.clone(a), c = 1; c < arguments.length; c++) { b = arguments[c]; for (var l in b) delete e[l] } return e }, d = {}, a = {},
                c = { address: 1, article: 1, aside: 1, blockquote: 1, details: 1, div: 1, dl: 1, fieldset: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, hr: 1, main: 1, menu: 1, nav: 1, ol: 1, p: 1, pre: 1, section: 1, table: 1, ul: 1 }, m = { command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1 }, h = {}, l = { "#": 1 }, e = { center: 1, dir: 1, noframes: 1 }; b(d, {
                    a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1,
                    mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, "var": 1, video: 1, wbr: 1
                }, l, { acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1 }); b(a, c, d, e); f = {
                    a: f(d, { a: 1, button: 1 }), abbr: d, address: a, area: h, article: a, aside: a, audio: b({ source: 1, track: 1 }, a), b: d, base: h, bdi: d, bdo: d, blockquote: a, body: a, br: h, button: f(d, { a: 1, button: 1 }), canvas: d, caption: a, cite: d, code: d, col: h, colgroup: { col: 1 }, command: h,
                    datalist: b({ option: 1 }, d), dd: a, del: d, details: b({ summary: 1 }, a), dfn: d, div: a, dl: { dt: 1, dd: 1 }, dt: a, em: d, embed: h, fieldset: b({ legend: 1 }, a), figcaption: a, figure: b({ figcaption: 1 }, a), footer: a, form: a, h1: d, h2: d, h3: d, h4: d, h5: d, h6: d, head: b({ title: 1, base: 1 }, m), header: a, hgroup: { h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, hr: h, html: b({ head: 1, body: 1 }, a, m), i: d, iframe: l, img: h, input: h, ins: d, kbd: d, keygen: h, label: d, legend: d, li: a, link: h, main: a, map: a, mark: d, menu: b({ li: 1 }, a), meta: h, meter: f(d, { meter: 1 }), nav: a, noscript: b({ link: 1, meta: 1, style: 1 },
                        d), object: b({ param: 1 }, d), ol: { li: 1 }, optgroup: { option: 1 }, option: l, output: d, p: d, param: h, pre: d, progress: f(d, { progress: 1 }), q: d, rp: d, rt: d, ruby: b({ rp: 1, rt: 1 }, d), s: d, samp: d, script: l, section: a, select: { optgroup: 1, option: 1 }, small: d, source: h, span: d, strong: d, style: l, sub: d, summary: b({ h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, d), sup: d, table: { caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1 }, tbody: { tr: 1 }, td: a, textarea: l, tfoot: { tr: 1 }, th: a, thead: { tr: 1 }, time: f(d, { time: 1 }), title: l, tr: { th: 1, td: 1 }, track: h, u: d, ul: { li: 1 }, "var": d,
                    video: b({ source: 1, track: 1 }, a), wbr: h, acronym: d, applet: b({ param: 1 }, a), basefont: h, big: d, center: a, dialog: h, dir: { li: 1 }, font: d, isindex: h, noframes: a, strike: d, tt: d
                }; b(f, {
                    $block: b({ audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1 }, c, e), $blockLimit: { article: 1, aside: 1, audio: 1, body: 1, caption: 1, details: 1, dir: 1, div: 1, dl: 1, fieldset: 1, figcaption: 1, figure: 1, footer: 1, form: 1, header: 1, hgroup: 1, main: 1, menu: 1, nav: 1, ol: 1, section: 1, table: 1, td: 1, th: 1, tr: 1, ul: 1, video: 1 }, $cdata: { script: 1, style: 1 }, $editable: {
                        address: 1, article: 1,
                        aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, figcaption: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, main: 1, nav: 1, p: 1, pre: 1, section: 1
                    }, $empty: { area: 1, base: 1, basefont: 1, br: 1, col: 1, command: 1, dialog: 1, embed: 1, hr: 1, img: 1, input: 1, isindex: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1 }, $inline: d, $list: { dl: 1, ol: 1, ul: 1 }, $listItem: { dd: 1, dt: 1, li: 1 }, $nonBodyContent: b({ body: 1, head: 1, html: 1 }, f.head), $nonEditable: {
                        applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1,
                        option: 1, param: 1, script: 1, textarea: 1, video: 1
                    }, $object: { applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1 }, $removeEmpty: { abbr: 1, acronym: 1, b: 1, bdi: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, mark: 1, meter: 1, output: 1, q: 1, ruby: 1, s: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, time: 1, tt: 1, u: 1, "var": 1 }, $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 }, $tableContent: {
                        caption: 1, col: 1, colgroup: 1, tbody: 1,
                        td: 1, tfoot: 1, th: 1, thead: 1, tr: 1
                    }, $transparent: { a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1 }, $intermediate: { caption: 1, colgroup: 1, dd: 1, dt: 1, figcaption: 1, legend: 1, li: 1, optgroup: 1, option: 1, rp: 1, rt: 1, summary: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }
                }); return f
            }(); CKEDITOR.dom.event = function (b) { this.$ = b }; CKEDITOR.dom.event.prototype = {
                getKey: function () { return this.$.keyCode || this.$.which }, getKeystroke: function () {
                    var b = this.getKey(); if (this.$.ctrlKey || this.$.metaKey) b += CKEDITOR.CTRL;
                    this.$.shiftKey && (b += CKEDITOR.SHIFT); this.$.altKey && (b += CKEDITOR.ALT); return b
                }, preventDefault: function (b) { var f = this.$; f.preventDefault ? f.preventDefault() : f.returnValue = !1; b && this.stopPropagation() }, stopPropagation: function () { var b = this.$; b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0 }, getTarget: function () { var b = this.$.target || this.$.srcElement; return b ? new CKEDITOR.dom.node(b) : null }, getPhase: function () { return this.$.eventPhase || 2 }, getPageOffset: function () {
                    var b = this.getTarget().getDocument().$;
                    return { x: this.$.pageX || this.$.clientX + (b.documentElement.scrollLeft || b.body.scrollLeft), y: this.$.pageY || this.$.clientY + (b.documentElement.scrollTop || b.body.scrollTop) }
                }
            }; CKEDITOR.CTRL = 1114112; CKEDITOR.SHIFT = 2228224; CKEDITOR.ALT = 4456448; CKEDITOR.EVENT_PHASE_CAPTURING = 1; CKEDITOR.EVENT_PHASE_AT_TARGET = 2; CKEDITOR.EVENT_PHASE_BUBBLING = 3; CKEDITOR.dom.domObject = function (b) { b && (this.$ = b) }; CKEDITOR.dom.domObject.prototype = function () {
                var b = function (b, d) {
                    return function (a) {
                        "undefined" != typeof CKEDITOR && b.fire(d,
                            new CKEDITOR.dom.event(a))
                    }
                }; return {
                    getPrivate: function () { var b; (b = this.getCustomData("_")) || this.setCustomData("_", b = {}); return b }, on: function (f) { var d = this.getCustomData("_cke_nativeListeners"); d || (d = {}, this.setCustomData("_cke_nativeListeners", d)); d[f] || (d = d[f] = b(this, f), this.$.addEventListener ? this.$.addEventListener(f, d, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + f, d)); return CKEDITOR.event.prototype.on.apply(this, arguments) }, removeListener: function (b) {
                        CKEDITOR.event.prototype.removeListener.apply(this,
                            arguments); if (!this.hasListeners(b)) { var d = this.getCustomData("_cke_nativeListeners"), a = d && d[b]; a && (this.$.removeEventListener ? this.$.removeEventListener(b, a, !1) : this.$.detachEvent && this.$.detachEvent("on" + b, a), delete d[b]) }
                    }, removeAllListeners: function () {
                        try { var b = this.getCustomData("_cke_nativeListeners"), d; for (d in b) { var a = b[d]; this.$.detachEvent ? this.$.detachEvent("on" + d, a) : this.$.removeEventListener && this.$.removeEventListener(d, a, !1); delete b[d] } } catch (c) {
                            if (!CKEDITOR.env.edge || -2146828218 !==
                                c.number) throw c;
                        } CKEDITOR.event.prototype.removeAllListeners.call(this)
                    }
                }
            }(); (function (b) {
                var f = {}; CKEDITOR.on("reset", function () { f = {} }); b.equals = function (b) { try { return b && b.$ === this.$ } catch (a) { return !1 } }; b.setCustomData = function (b, a) { var c = this.getUniqueId(); (f[c] || (f[c] = {}))[b] = a; return this }; b.getCustomData = function (b) { var a = this.$["data-cke-expando"]; return (a = a && f[a]) && b in a ? a[b] : null }; b.removeCustomData = function (b) {
                    var a = this.$["data-cke-expando"], a = a && f[a], c, m; a && (c = a[b], m = b in a, delete a[b]);
                    return m ? c : null
                }; b.clearCustomData = function () { this.removeAllListeners(); var b = this.getUniqueId(); b && delete f[b] }; b.getUniqueId = function () { return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber()) }; CKEDITOR.event.implementOn(b)
            })(CKEDITOR.dom.domObject.prototype); CKEDITOR.dom.node = function (b) {
                return b ? new CKEDITOR.dom[b.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : b.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : b.nodeType == CKEDITOR.NODE_TEXT ? "text" : b.nodeType == CKEDITOR.NODE_COMMENT ?
                    "comment" : b.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](b) : this
            }; CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject; CKEDITOR.NODE_ELEMENT = 1; CKEDITOR.NODE_DOCUMENT = 9; CKEDITOR.NODE_TEXT = 3; CKEDITOR.NODE_COMMENT = 8; CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11; CKEDITOR.POSITION_IDENTICAL = 0; CKEDITOR.POSITION_DISCONNECTED = 1; CKEDITOR.POSITION_FOLLOWING = 2; CKEDITOR.POSITION_PRECEDING = 4; CKEDITOR.POSITION_IS_CONTAINED = 8; CKEDITOR.POSITION_CONTAINS = 16; CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype,
                {
                    appendTo: function (b, f) { b.append(this, f); return b }, clone: function (b, f) {
                        function d(a) { a["data-cke-expando"] && (a["data-cke-expando"] = !1); if (a.nodeType == CKEDITOR.NODE_ELEMENT || a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) if (f || a.nodeType != CKEDITOR.NODE_ELEMENT || a.removeAttribute("id", !1), b) { a = a.childNodes; for (var c = 0; c < a.length; c++)d(a[c]) } } function a(c) {
                            if (c.type == CKEDITOR.NODE_ELEMENT || c.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                                if (c.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                                    var d = c.getName(); ":" == d[0] &&
                                        c.renameNode(d.substring(1))
                                } if (b) for (d = 0; d < c.getChildCount(); d++)a(c.getChild(d))
                            }
                        } var c = this.$.cloneNode(b); d(c); c = new CKEDITOR.dom.node(c); CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && a(c); return c
                    }, hasPrevious: function () { return !!this.$.previousSibling }, hasNext: function () { return !!this.$.nextSibling }, insertAfter: function (b) { b.$.parentNode.insertBefore(this.$, b.$.nextSibling); return b }, insertBefore: function (b) {
                        b.$.parentNode.insertBefore(this.$,
                            b.$); return b
                    }, insertBeforeMe: function (b) { this.$.parentNode.insertBefore(b.$, this.$); return b }, getAddress: function (b) { for (var f = [], d = this.getDocument().$.documentElement, a = this; a && a != d;) { var c = a.getParent(); c && f.unshift(this.getIndex.call(a, b)); a = c } return f }, getDocument: function () { return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument) }, getIndex: function (b) {
                        function f(a, b) {
                            var c = b ? a.getNext() : a.getPrevious(); return c && c.type == CKEDITOR.NODE_TEXT ? c.isEmpty() ? f(c, b) : c :
                                null
                        } var d = this, a = -1, c; if (!this.getParent() || b && d.type == CKEDITOR.NODE_TEXT && d.isEmpty() && !f(d) && !f(d, !0)) return -1; do if (!b || d.equals(this) || d.type != CKEDITOR.NODE_TEXT || !c && !d.isEmpty()) a++, c = d.type == CKEDITOR.NODE_TEXT; while (d = d.getPrevious()); return a
                    }, getNextSourceNode: function (b, f, d) {
                        if (d && !d.call) { var a = d; d = function (b) { return !b.equals(a) } } b = !b && this.getFirst && this.getFirst(); var c; if (!b) { if (this.type == CKEDITOR.NODE_ELEMENT && d && !1 === d(this, !0)) return null; b = this.getNext() } for (; !b && (c = (c || this).getParent());) {
                            if (d &&
                                !1 === d(c, !0)) return null; b = c.getNext()
                        } return !b || d && !1 === d(b) ? null : f && f != b.type ? b.getNextSourceNode(!1, f, d) : b
                    }, getPreviousSourceNode: function (b, f, d) {
                        if (d && !d.call) { var a = d; d = function (b) { return !b.equals(a) } } b = !b && this.getLast && this.getLast(); var c; if (!b) { if (this.type == CKEDITOR.NODE_ELEMENT && d && !1 === d(this, !0)) return null; b = this.getPrevious() } for (; !b && (c = (c || this).getParent());) { if (d && !1 === d(c, !0)) return null; b = c.getPrevious() } return !b || d && !1 === d(b) ? null : f && b.type != f ? b.getPreviousSourceNode(!1, f, d) :
                            b
                    }, getPrevious: function (b) { var f = this.$, d; do d = (f = f.previousSibling) && 10 != f.nodeType && new CKEDITOR.dom.node(f); while (d && b && !b(d)); return d }, getNext: function (b) { var f = this.$, d; do d = (f = f.nextSibling) && new CKEDITOR.dom.node(f); while (d && b && !b(d)); return d }, getParent: function (b) { var f = this.$.parentNode; return f && (f.nodeType == CKEDITOR.NODE_ELEMENT || b && f.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(f) : null }, getParents: function (b) {
                        var f = this, d = []; do d[b ? "push" : "unshift"](f); while (f = f.getParent());
                        return d
                    }, getCommonAncestor: function (b) { if (b.equals(this)) return this; if (b.contains && b.contains(this)) return b; var f = this.contains ? this : this.getParent(); do if (f.contains(b)) return f; while (f = f.getParent()); return null }, getPosition: function (b) {
                        var f = this.$, d = b.$; if (f.compareDocumentPosition) return f.compareDocumentPosition(d); if (f == d) return CKEDITOR.POSITION_IDENTICAL; if (this.type == CKEDITOR.NODE_ELEMENT && b.type == CKEDITOR.NODE_ELEMENT) {
                            if (f.contains) {
                                if (f.contains(d)) return CKEDITOR.POSITION_CONTAINS +
                                    CKEDITOR.POSITION_PRECEDING; if (d.contains(f)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                            } if ("sourceIndex" in f) return 0 > f.sourceIndex || 0 > d.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : f.sourceIndex < d.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
                        } f = this.getAddress(); b = b.getAddress(); for (var d = Math.min(f.length, b.length), a = 0; a < d; a++)if (f[a] != b[a]) return f[a] < b[a] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING; return f.length < b.length ? CKEDITOR.POSITION_CONTAINS +
                            CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                    }, getAscendant: function (b, f) { var d = this.$, a, c; f || (d = d.parentNode); "function" == typeof b ? (c = !0, a = b) : (c = !1, a = function (a) { a = "string" == typeof a.nodeName ? a.nodeName.toLowerCase() : ""; return "string" == typeof b ? a == b : a in b }); for (; d;) { if (a(c ? new CKEDITOR.dom.node(d) : d)) return new CKEDITOR.dom.node(d); try { d = d.parentNode } catch (m) { d = null } } return null }, hasAscendant: function (b, f) {
                        var d = this.$; f || (d = d.parentNode); for (; d;) {
                            if (d.nodeName &&
                                d.nodeName.toLowerCase() == b) return !0; d = d.parentNode
                        } return !1
                    }, move: function (b, f) { b.append(this.remove(), f) }, remove: function (b) { var f = this.$, d = f.parentNode; if (d) { if (b) for (; b = f.firstChild;)d.insertBefore(f.removeChild(b), f); d.removeChild(f) } return this }, replace: function (b) { this.insertBefore(b); b.remove() }, trim: function () { this.ltrim(); this.rtrim() }, ltrim: function () {
                        for (var b; this.getFirst && (b = this.getFirst());) {
                            if (b.type == CKEDITOR.NODE_TEXT) {
                                var f = CKEDITOR.tools.ltrim(b.getText()), d = b.getLength(); if (f) f.length <
                                    d && (b.split(d - f.length), this.$.removeChild(this.$.firstChild)); else { b.remove(); continue }
                            } break
                        }
                    }, rtrim: function () { for (var b; this.getLast && (b = this.getLast());) { if (b.type == CKEDITOR.NODE_TEXT) { var f = CKEDITOR.tools.rtrim(b.getText()), d = b.getLength(); if (f) f.length < d && (b.split(f.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild)); else { b.remove(); continue } } break } CKEDITOR.env.needsBrFiller && (b = this.$.lastChild) && 1 == b.type && "br" == b.nodeName.toLowerCase() && b.parentNode.removeChild(b) }, isReadOnly: function (b) {
                        var f =
                            this; this.type != CKEDITOR.NODE_ELEMENT && (f = this.getParent()); CKEDITOR.env.edge && f && f.is("textarea", "input") && (b = !0); if (!b && f && "undefined" != typeof f.$.isContentEditable) return !(f.$.isContentEditable || f.data("cke-editable")); for (; f;) { if (f.data("cke-editable")) return !1; if (f.hasAttribute("contenteditable")) return "false" == f.getAttribute("contenteditable"); f = f.getParent() } return !0
                    }
                }); CKEDITOR.dom.window = function (b) { CKEDITOR.dom.domObject.call(this, b) }; CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject;
        CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
            focus: function () { this.$.focus() }, getViewPaneSize: function () { var b = this.$.document, f = "CSS1Compat" == b.compatMode; return { width: (f ? b.documentElement.clientWidth : b.body.clientWidth) || 0, height: (f ? b.documentElement.clientHeight : b.body.clientHeight) || 0 } }, getScrollPosition: function () {
                var b = this.$; if ("pageXOffset" in b) return { x: b.pageXOffset || 0, y: b.pageYOffset || 0 }; b = b.document; return {
                    x: b.documentElement.scrollLeft || b.body.scrollLeft || 0, y: b.documentElement.scrollTop ||
                        b.body.scrollTop || 0
                }
            }, getFrame: function () { var b = this.$.frameElement; return b ? new CKEDITOR.dom.element.get(b) : null }
        }); CKEDITOR.dom.document = function (b) { CKEDITOR.dom.domObject.call(this, b) }; CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject; CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
            type: CKEDITOR.NODE_DOCUMENT, appendStyleSheet: function (b) {
                if (this.$.createStyleSheet) this.$.createStyleSheet(b); else {
                    var f = new CKEDITOR.dom.element("link"); f.setAttributes({
                        rel: "stylesheet", type: "text/css",
                        href: b
                    }); this.getHead().append(f)
                }
            }, appendStyleText: function (b) { if (this.$.createStyleSheet) { var f = this.$.createStyleSheet(""); f.cssText = b } else { var d = new CKEDITOR.dom.element("style", this); d.append(new CKEDITOR.dom.text(b, this)); this.getHead().append(d) } return f || d.$.sheet }, createElement: function (b, f) { var d = new CKEDITOR.dom.element(b, this); f && (f.attributes && d.setAttributes(f.attributes), f.styles && d.setStyles(f.styles)); return d }, createText: function (b) { return new CKEDITOR.dom.text(b, this) }, focus: function () { this.getWindow().focus() },
            getActive: function () { var b; try { b = this.$.activeElement } catch (f) { return null } return new CKEDITOR.dom.element(b) }, getById: function (b) { return (b = this.$.getElementById(b)) ? new CKEDITOR.dom.element(b) : null }, getByAddress: function (b, f) {
                for (var d = this.$.documentElement, a = 0; d && a < b.length; a++) { var c = b[a]; if (f) for (var m = -1, h = 0; h < d.childNodes.length; h++) { var l = d.childNodes[h]; if (!0 !== f || 3 != l.nodeType || !l.previousSibling || 3 != l.previousSibling.nodeType) if (m++, m == c) { d = l; break } } else d = d.childNodes[c] } return d ? new CKEDITOR.dom.node(d) :
                    null
            }, getElementsByTag: function (b, f) { CKEDITOR.env.ie && 8 >= document.documentMode || !f || (b = f + ":" + b); return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(b)) }, getHead: function () { var b = this.$.getElementsByTagName("head")[0]; return b = b ? new CKEDITOR.dom.element(b) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0) }, getBody: function () { return new CKEDITOR.dom.element(this.$.body) }, getDocumentElement: function () { return new CKEDITOR.dom.element(this.$.documentElement) }, getWindow: function () {
                return new CKEDITOR.dom.window(this.$.parentWindow ||
                    this.$.defaultView)
            }, write: function (b) { this.$.open("text/html", "replace"); CKEDITOR.env.ie && (b = b.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' + CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e")); this.$.write(b); this.$.close() }, find: function (b) { return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b)) }, findOne: function (b) { return (b = this.$.querySelector(b)) ? new CKEDITOR.dom.element(b) : null }, _getHtml5ShivFrag: function () {
                var b = this.getCustomData("html5ShivFrag"); b ||
                    (b = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(b, !0), this.setCustomData("html5ShivFrag", b)); return b
            }
        }); CKEDITOR.dom.nodeList = function (b) { this.$ = b }; CKEDITOR.dom.nodeList.prototype = { count: function () { return this.$.length }, getItem: function (b) { return 0 > b || b >= this.$.length ? null : (b = this.$[b]) ? new CKEDITOR.dom.node(b) : null }, toArray: function () { return CKEDITOR.tools.array.map(this.$, function (b) { return new CKEDITOR.dom.node(b) }) } }; CKEDITOR.dom.element = function (b, f) {
            "string" == typeof b &&
            (b = (f ? f.$ : document).createElement(b)); CKEDITOR.dom.domObject.call(this, b)
        }; CKEDITOR.dom.element.get = function (b) { return (b = "string" == typeof b ? document.getElementById(b) || document.getElementsByName(b)[0] : b) && (b.$ ? b : new CKEDITOR.dom.element(b)) }; CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node; CKEDITOR.dom.element.createFromHtml = function (b, f) { var d = new CKEDITOR.dom.element("div", f); d.setHtml(b); return d.getFirst().remove() }; CKEDITOR.dom.element.setMarker = function (b, f, d, a) {
            var c = f.getCustomData("list_marker_id") ||
                f.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"), m = f.getCustomData("list_marker_names") || f.setCustomData("list_marker_names", {}).getCustomData("list_marker_names"); b[c] = f; m[d] = 1; return f.setCustomData(d, a)
        }; CKEDITOR.dom.element.clearAllMarkers = function (b) { for (var f in b) CKEDITOR.dom.element.clearMarkers(b, b[f], 1) }; CKEDITOR.dom.element.clearMarkers = function (b, f, d) {
            var a = f.getCustomData("list_marker_names"), c = f.getCustomData("list_marker_id"), m; for (m in a) f.removeCustomData(m);
            f.removeCustomData("list_marker_names"); d && (f.removeCustomData("list_marker_id"), delete b[c])
        }; (function () {
            function b(a, b) { return -1 < (" " + a + " ").replace(m, " ").indexOf(" " + b + " ") } function f(a) { var b = !0; a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), b = !1); return function () { b || a.removeAttribute("id") } } function d(a, b) { var c = CKEDITOR.tools.escapeCss(a.$.id); return "#" + c + " " + b.split(/,\s*/).join(", #" + c + " ") } function a(a) {
                for (var b = 0, c = 0, g = h[a].length; c < g; c++)b += parseFloat(this.getComputedStyle(h[a][c]) ||
                    0, 10) || 0; return b
            } var c = document.createElement("_").classList, c = "undefined" !== typeof c && null !== String(c.add).match(/\[Native code\]/gi), m = /[\n\t\r]/g; CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
                type: CKEDITOR.NODE_ELEMENT, addClass: c ? function (a) { this.$.classList.add(a); return this } : function (a) { var e = this.$.className; e && (b(e, a) || (e += " " + a)); this.$.className = e || a; return this }, removeClass: c ? function (a) { var b = this.$; b.classList.remove(a); b.className || b.removeAttribute("class"); return this } : function (a) {
                    var e =
                        this.getAttribute("class"); e && b(e, a) && ((e = e.replace(new RegExp("(?:^|\\s+)" + a + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", e) : this.removeAttribute("class")); return this
                }, hasClass: function (a) { return b(this.$.className, a) }, append: function (a, b) { "string" == typeof a && (a = this.getDocument().createElement(a)); b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$); return a }, appendHtml: function (a) {
                    if (this.$.childNodes.length) {
                        var b = new CKEDITOR.dom.element("div", this.getDocument());
                        b.setHtml(a); b.moveChildren(this)
                    } else this.setHtml(a)
                }, appendText: function (a) { null != this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? this.$.text += a : this.append(new CKEDITOR.dom.text(a)) }, appendBogus: function (a) { if (a || CKEDITOR.env.needsBrFiller) { for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());)a = a.getPrevious(); a && a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a)) } }, breakParent: function (a,
                    b) { var c = new CKEDITOR.dom.range(this.getDocument()); c.setStartAfter(this); c.setEndAfter(a); var g = c.extractContents(!1, b || !1), d; c.insertNode(this.remove()); if (CKEDITOR.env.ie && !CKEDITOR.env.edge) { for (c = new CKEDITOR.dom.element("div"); d = g.getFirst();)d.$.style.backgroundColor && (d.$.style.backgroundColor = d.$.style.backgroundColor), c.append(d); c.insertAfter(this); c.remove(!0) } else g.insertAfterNode(this) }, contains: document.compareDocumentPosition ? function (a) {
                        return !!(this.$.compareDocumentPosition(a.$) &
                            16)
                    } : function (a) { var b = this.$; return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) : b != a.$ && b.contains(a.$) }, focus: function () { function a() { try { this.$.focus() } catch (b) { } } return function (b) { b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this) } }(), getHtml: function () { var a = this.$.innerHTML; return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a }, getOuterHtml: function () {
                        if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, ""); var a = this.$.ownerDocument.createElement("div"); a.appendChild(this.$.cloneNode(!0));
                        return a.innerHTML
                    }, getClientRect: function (a) { var b = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect()); !b.width && (b.width = b.right - b.left); !b.height && (b.height = b.bottom - b.top); return a ? CKEDITOR.tools.getAbsoluteRectPosition(this.getWindow(), b) : b }, setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function (a) {
                        try { var b = this.$; if (this.getParent()) return b.innerHTML = a; var c = this.getDocument()._getHtml5ShivFrag(); c.appendChild(b); b.innerHTML = a; c.removeChild(b); return a } catch (g) {
                            this.$.innerHTML = "";
                            b = new CKEDITOR.dom.element("body", this.getDocument()); b.$.innerHTML = a; for (b = b.getChildren(); b.count();)this.append(b.getItem(0)); return a
                        }
                    } : function (a) { return this.$.innerHTML = a }, setText: function () { var a = document.createElement("p"); a.innerHTML = "x"; a = a.textContent; return function (b) { this.$[a ? "textContent" : "innerText"] = b } }(), getAttribute: function () {
                        var a = function (a) { return this.$.getAttribute(a, 2) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) {
                            switch (a) {
                                case "class": a =
                                    "className"; break; case "http-equiv": a = "httpEquiv"; break; case "name": return this.$.name; case "tabindex": return a = this.$.getAttribute(a, 2), 0 !== a && 0 === this.$.tabIndex && (a = null), a; case "checked": return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null; case "hspace": case "value": return this.$[a]; case "style": return this.$.style.cssText; case "contenteditable": case "contentEditable": return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") :
                                        null
                            }return this.$.getAttribute(a, 2)
                        } : a
                    }(), getAttributes: function (a) { var b = {}, c = this.$.attributes, g; a = CKEDITOR.tools.isArray(a) ? a : []; for (g = 0; g < c.length; g++)-1 === CKEDITOR.tools.indexOf(a, c[g].name) && (b[c[g].name] = c[g].value); return b }, getChildren: function () { return new CKEDITOR.dom.nodeList(this.$.childNodes) }, getClientSize: function () { return { width: this.$.clientWidth, height: this.$.clientHeight } }, getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function (a) {
                        var b = this.getWindow().$.getComputedStyle(this.$,
                            null); return b ? b.getPropertyValue(a) : ""
                    } : function (a) { return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)] }, getDtd: function () { var a = CKEDITOR.dtd[this.getName()]; this.getDtd = function () { return a }; return a }, getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag, getTabIndex: function () { var a = this.$.tabIndex; return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1 }, getText: function () { return this.$.textContent || this.$.innerText || "" },
                getWindow: function () { return this.getDocument().getWindow() }, getId: function () { return this.$.id || null }, getNameAtt: function () { return this.$.name || null }, getName: function () { var a = this.$.nodeName.toLowerCase(); if (CKEDITOR.env.ie && 8 >= document.documentMode) { var b = this.$.scopeName; "HTML" != b && (a = b.toLowerCase() + ":" + a) } this.getName = function () { return a }; return this.getName() }, getValue: function () { return this.$.value }, getFirst: function (a) {
                    var b = this.$.firstChild; (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getNext(a));
                    return b
                }, getLast: function (a) { var b = this.$.lastChild; (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getPrevious(a)); return b }, getStyle: function (a) { return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] }, is: function () { var a = this.getName(); if ("object" == typeof arguments[0]) return !!arguments[0][a]; for (var b = 0; b < arguments.length; b++)if (arguments[b] == a) return !0; return !1 }, isEditable: function (a) {
                    var b = this.getName(); return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") ||
                        CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[b] || CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
                }, isIdentical: function (a) {
                    var b = this.clone(0, 1); a = a.clone(0, 1); b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); if (b.$.isEqualNode) return b.$.style.cssText =
                        CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$); b = b.getOuterHtml(); a = a.getOuterHtml(); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) { var c = this.getParent(); c.type == CKEDITOR.NODE_ELEMENT && (c = c.clone(), c.setHtml(b), b = c.getHtml(), c.setHtml(a), a = c.getHtml()) } return b == a
                }, isVisible: function () {
                    var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"), b, c; a && CKEDITOR.env.webkit &&
                        (b = this.getWindow(), !b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement) && (a = (new CKEDITOR.dom.element(c)).isVisible())); return !!a
                }, isEmptyInlineRemoveable: function () { if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1; for (var a = this.getChildren(), b = 0, c = a.count(); b < c; b++) { var g = a.getItem(b); if (g.type != CKEDITOR.NODE_ELEMENT || !g.data("cke-bookmark")) if (g.type == CKEDITOR.NODE_ELEMENT && !g.isEmptyInlineRemoveable() || g.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(g.getText())) return !1 } return !0 },
                hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function () { for (var a = this.$.attributes, b = 0; b < a.length; b++) { var c = a[b]; switch (c.nodeName) { case "class": if (this.getAttribute("class")) return !0; case "data-cke-expando": continue; default: if (c.specified) return !0 } } return !1 } : function () { var a = this.$.attributes, b = a.length, c = { "data-cke-expando": 1, _moz_dirty: 1 }; return 0 < b && (2 < b || !c[a[0].nodeName] || 2 == b && !c[a[1].nodeName]) }, hasAttribute: function () {
                    function a(b) {
                        var c = this.$.attributes.getNamedItem(b);
                        if ("input" == this.getName()) switch (b) { case "class": return 0 < this.$.className.length; case "checked": return !!this.$.checked; case "value": return b = this.getAttribute("type"), "checkbox" == b || "radio" == b ? "on" != this.$.value : !!this.$.value }return c ? c.specified : !1
                    } return CKEDITOR.env.ie ? 8 > CKEDITOR.env.version ? function (b) { return "name" == b ? !!this.$.name : a.call(this, b) } : a : function (a) { return !!this.$.attributes.getNamedItem(a) }
                }(), hide: function () { this.setStyle("display", "none") }, moveChildren: function (a, b) {
                    var c = this.$;
                    a = a.$; if (c != a) { var g; if (b) for (; g = c.lastChild;)a.insertBefore(c.removeChild(g), a.firstChild); else for (; g = c.firstChild;)a.appendChild(c.removeChild(g)) }
                }, mergeSiblings: function () {
                    function a(b, c, g) {
                        if (c && c.type == CKEDITOR.NODE_ELEMENT) {
                            for (var d = []; c.data("cke-bookmark") || c.isEmptyInlineRemoveable();)if (d.push(c), c = g ? c.getNext() : c.getPrevious(), !c || c.type != CKEDITOR.NODE_ELEMENT) return; if (b.isIdentical(c)) {
                                for (var h = g ? b.getLast() : b.getFirst(); d.length;)d.shift().move(b, !g); c.moveChildren(b, !g); c.remove();
                                h && h.type == CKEDITOR.NODE_ELEMENT && h.mergeSiblings()
                            }
                        }
                    } return function (b) { if (!1 === b || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) a(this, this.getNext(), !0), a(this, this.getPrevious()) }
                }(), show: function () { this.setStyles({ display: "", visibility: "" }) }, setAttribute: function () {
                    var a = function (a, b) { this.$.setAttribute(a, b); return this }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (b, c) {
                        "class" == b ? this.$.className = c : "style" == b ? this.$.style.cssText = c : "tabindex" == b ?
                            this.$.tabIndex = c : "checked" == b ? this.$.checked = c : "contenteditable" == b ? a.call(this, "contentEditable", c) : a.apply(this, arguments); return this
                    } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function (b, c) { if ("src" == b && c.match(/^http:\/\//)) try { a.apply(this, arguments) } catch (g) { } else a.apply(this, arguments); return this } : a
                }(), setAttributes: function (a) { for (var b in a) this.setAttribute(b, a[b]); return this }, setValue: function (a) { this.$.value = a; return this }, removeAttribute: function () {
                    var a = function (a) { this.$.removeAttribute(a) };
                    return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) { "class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable"); this.$.removeAttribute(a) } : a
                }(), removeAttributes: function (a) { if (CKEDITOR.tools.isArray(a)) for (var b = 0; b < a.length; b++)this.removeAttribute(a[b]); else for (b in a = a || this.getAttributes(), a) a.hasOwnProperty(b) && this.removeAttribute(b) }, removeStyle: function (a) {
                    var b = this.$.style; if (b.removeProperty || "border" != a && "margin" != a && "padding" !=
                        a) b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute("style"); else { var c = ["top", "left", "right", "bottom"], g; "border" == a && (g = ["color", "style", "width"]); for (var b = [], d = 0; d < c.length; d++)if (g) for (var h = 0; h < g.length; h++)b.push([a, c[d], g[h]].join("-")); else b.push([a, c[d]].join("-")); for (a = 0; a < b.length; a++)this.removeStyle(b[a]) }
                }, setStyle: function (a, b) { this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b; return this }, setStyles: function (a) {
                    for (var b in a) this.setStyle(b,
                        a[b]); return this
                }, setOpacity: function (a) { CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a) }, unselectable: function () { this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none")); if (CKEDITOR.env.ie) { this.setAttribute("unselectable", "on"); for (var a, b = this.getElementsByTag("*"), c = 0, g = b.count(); c < g; c++)a = b.getItem(c), a.setAttribute("unselectable", "on") } }, getPositionedAncestor: function () {
                    for (var a =
                        this; "html" != a.getName();) { if ("static" != a.getComputedStyle("position")) return a; a = a.getParent() } return null
                }, getDocumentPosition: function (a) {
                    var b = 0, c = 0, g = this.getDocument(), d = g.getBody(), h = "BackCompat" == g.$.compatMode; if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ? 8 !== CKEDITOR.env.version : 1)) {
                        var m = this.$.getBoundingClientRect(), f = g.$.documentElement, p = f.clientTop || d.$.clientTop || 0, v = f.clientLeft || d.$.clientLeft || 0, y = !0; CKEDITOR.env.ie && (y = g.getDocumentElement().contains(this),
                            g = g.getBody().contains(this), y = h && g || !h && y); y && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (b = d.$.scrollLeft || f.scrollLeft, c = d.$.scrollTop || f.scrollTop) : (c = h ? d.$ : f, b = c.scrollLeft, c = c.scrollTop), b = m.left + b - v, c = m.top + c - p)
                    } else for (p = this, v = null; p && "body" != p.getName() && "html" != p.getName();) {
                        b += p.$.offsetLeft - p.$.scrollLeft; c += p.$.offsetTop - p.$.scrollTop; p.equals(this) || (b += p.$.clientLeft || 0, c += p.$.clientTop || 0); for (; v && !v.equals(p);)b -= v.$.scrollLeft, c -= v.$.scrollTop, v = v.getParent();
                        v = p; p = (m = p.$.offsetParent) ? new CKEDITOR.dom.element(m) : null
                    } a && (m = this.getWindow(), p = a.getWindow(), !m.equals(p) && m.$.frameElement && (a = (new CKEDITOR.dom.element(m.$.frameElement)).getDocumentPosition(a), b += a.x, c += a.y)); document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko || h || (b += this.$.clientLeft ? 1 : 0, c += this.$.clientTop ? 1 : 0); return { x: b, y: c }
                }, scrollIntoView: function (a) {
                    var b = this.getParent(); if (b) {
                        do if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight <
                            b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), b.is("html")) { var c = b.getWindow(); try { var g = c.$.frameElement; g && (b = new CKEDITOR.dom.element(g)) } catch (d) { } } while (b = b.getParent())
                    }
                }, scrollIntoParent: function (a, b, c) {
                    var g, d, h, m; function f(b, g) { /body|html/.test(a.getName()) ? a.getWindow().$.scrollBy(b, g) : (a.$.scrollLeft += b, a.$.scrollTop += g) } function p(a, b) {
                        var g = { x: 0, y: 0 }; if (!a.is(y ? "body" : "html")) { var c = a.$.getBoundingClientRect(); g.x = c.left; g.y = c.top } c = a.getWindow(); c.equals(b) || (c = p(CKEDITOR.dom.element.get(c.$.frameElement),
                            b), g.x += c.x, g.y += c.y); return g
                    } function v(a, b) { return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0 } !a && (a = this.getWindow()); h = a.getDocument(); var y = "BackCompat" == h.$.compatMode; a instanceof CKEDITOR.dom.window && (a = y ? h.getBody() : h.getDocumentElement()); CKEDITOR.env.webkit && (h = this.getEditor(!1)) && (h._.previousScrollTop = null); h = a.getWindow(); d = p(this, h); var t = p(a, h), B = this.$.offsetHeight; g = this.$.offsetWidth; var w = a.$.clientHeight, z = a.$.clientWidth; h = d.x - v(this, "left") - t.x || 0; m = d.y - v(this, "top") -
                        t.y || 0; g = d.x + g + v(this, "right") - (t.x + z) || 0; d = d.y + B + v(this, "bottom") - (t.y + w) || 0; (0 > m || 0 < d) && f(0, !0 === b ? m : !1 === b ? d : 0 > m ? m : d); c && (0 > h || 0 < g) && f(0 > h ? h : g, 0)
                }, setState: function (a, b, c) {
                    b = b || "cke"; switch (a) {
                        case CKEDITOR.TRISTATE_ON: this.addClass(b + "_on"); this.removeClass(b + "_off"); this.removeClass(b + "_disabled"); c && this.setAttribute("aria-pressed", !0); c && this.removeAttribute("aria-disabled"); break; case CKEDITOR.TRISTATE_DISABLED: this.addClass(b + "_disabled"); this.removeClass(b + "_off"); this.removeClass(b + "_on");
                            c && this.setAttribute("aria-disabled", !0); c && this.removeAttribute("aria-pressed"); break; default: this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled")
                    }
                }, getFrameDocument: function () { var a = this.$; try { a.contentWindow.document } catch (b) { a.src = a.src } return a && new CKEDITOR.dom.document(a.contentWindow.document) }, copyAttributes: function (a, b) {
                    var c = this.$.attributes; b = b || {}; for (var g = 0; g < c.length; g++) {
                        var d =
                            c[g], h = d.nodeName.toLowerCase(), m; if (!(h in b)) if ("checked" == h && (m = this.getAttribute(h))) a.setAttribute(h, m); else if (!CKEDITOR.env.ie || this.hasAttribute(h)) m = this.getAttribute(h), null === m && (m = d.nodeValue), a.setAttribute(h, m)
                    } "" !== this.$.style.cssText && (a.$.style.cssText = this.$.style.cssText)
                }, renameNode: function (a) {
                    if (this.getName() != a) {
                        var b = this.getDocument(); a = new CKEDITOR.dom.element(a, b); this.copyAttributes(a); this.moveChildren(a); this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$);
                        a.$["data-cke-expando"] = this.$["data-cke-expando"]; this.$ = a.$; delete this.getName
                    }
                }, getChild: function () { function a(b, c) { var g = b.childNodes; if (0 <= c && c < g.length) return g[c] } return function (b) { var c = this.$; if (b.slice) for (b = b.slice(); 0 < b.length && c;)c = a(c, b.shift()); else c = a(c, b); return c ? new CKEDITOR.dom.node(c) : null } }(), getChildCount: function () { return this.$.childNodes.length }, disableContextMenu: function () {
                    function a(b) { return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass("cke_enable_context_menu") } this.on("contextmenu",
                        function (b) { b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault() })
                }, getDirection: function (a) { return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir") }, data: function (a, b) { a = "data-" + a; if (void 0 === b) return this.getAttribute(a); !1 === b ? this.removeAttribute(a) : this.setAttribute(a, b); return null }, getEditor: function (a) {
                    var b = CKEDITOR.instances, c, g, d; a =
                        a || void 0 === a; for (c in b) if (g = b[c], g.element.equals(this) && g.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !a && (d = g.editable()) && (d.equals(this) || d.contains(this))) return g; return null
                }, find: function (a) { var b = f(this); a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(d(this, a))); b(); return a }, findOne: function (a) { var b = f(this); a = this.$.querySelector(d(this, a)); b(); return a ? new CKEDITOR.dom.element(a) : null }, forEach: function (a, b, c) {
                    if (!(c || b && this.type != b)) var g = a(this); if (!1 !== g) {
                        c = this.getChildren();
                        for (var d = 0; d < c.count(); d++)g = c.getItem(d), g.type == CKEDITOR.NODE_ELEMENT ? g.forEach(a, b) : b && g.type != b || a(g)
                    }
                }, fireEventHandler: function (a, b) { var c = "on" + a, g = this.$; if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) { var d = g.ownerDocument.createEventObject(), h; for (h in b) d[h] = b[h]; g.fireEvent(c, d) } else g[g[a] ? a : c](b) }, isDetached: function () {
                    var a = this.getDocument(), b = a.getDocumentElement(); return b.equals(this) || b.contains(this) ? !CKEDITOR.env.ie || 8 < CKEDITOR.env.version && !CKEDITOR.env.quirks ? !a.$.defaultView :
                        !1 : !0
                }
            }); var h = { width: ["border-left-width", "border-right-width", "padding-left", "padding-right"], height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"] }; CKEDITOR.dom.element.prototype.setSize = function (b, c, d) { "number" == typeof c && (!d || CKEDITOR.env.ie && CKEDITOR.env.quirks || (c -= a.call(this, b)), this.setStyle(b, c + "px")) }; CKEDITOR.dom.element.prototype.getSize = function (b, c) {
                var d = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(b)], this.$["client" + CKEDITOR.tools.capitalize(b)]) ||
                    0; c && (d -= a.call(this, b)); return d
            }
        })(); CKEDITOR.dom.documentFragment = function (b) { b = b || CKEDITOR.document; this.$ = b.type == CKEDITOR.NODE_DOCUMENT ? b.$.createDocumentFragment() : b }; CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, insertAfterNode: function (b) { b = b.$; b.parentNode.insertBefore(this.$, b.nextSibling) }, getHtml: function () {
                var b = new CKEDITOR.dom.element("div"); this.clone(1, 1).appendTo(b); return b.getHtml().replace(/\s*data-cke-expando=".*?"/g,
                    "")
            }
        }, !0, { append: 1, appendBogus: 1, clone: 1, getFirst: 1, getHtml: 1, getLast: 1, getParent: 1, getNext: 1, getPrevious: 1, appendTo: 1, moveChildren: 1, insertBefore: 1, insertAfterNode: 1, replace: 1, trim: 1, type: 1, ltrim: 1, rtrim: 1, getDocument: 1, getChildCount: 1, getChild: 1, getChildren: 1 }); CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.document.prototype, !0, { find: 1, findOne: 1 }); (function () {
            function b(a, b) {
                var g = this.range; if (this._.end) return null; if (!this._.start) {
                    this._.start = 1; if (g.collapsed) return this.end(),
                        null; g.optimize()
                } var c, e = g.startContainer; c = g.endContainer; var d = g.startOffset, h = g.endOffset, k, m = this.guard, n = this.type, f = a ? "getPreviousSourceNode" : "getNextSourceNode"; if (!a && !this._.guardLTR) { var l = c.type == CKEDITOR.NODE_ELEMENT ? c : c.getParent(), D = c.type == CKEDITOR.NODE_ELEMENT ? c.getChild(h) : c.getNext(); this._.guardLTR = function (a, b) { return (!b || !l.equals(a)) && (!D || !a.equals(D)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(g.root)) } } if (a && !this._.guardRTL) {
                    var F = e.type == CKEDITOR.NODE_ELEMENT ? e : e.getParent(),
                    G = e.type == CKEDITOR.NODE_ELEMENT ? d ? e.getChild(d - 1) : null : e.getPrevious(); this._.guardRTL = function (a, b) { return (!b || !F.equals(a)) && (!G || !a.equals(G)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(g.root)) }
                } var I = a ? this._.guardRTL : this._.guardLTR; k = m ? function (a, b) { return !1 === I(a, b) ? !1 : m(a, b) } : I; this.current ? c = this.current[f](!1, n, k) : (a ? c.type == CKEDITOR.NODE_ELEMENT && (c = 0 < h ? c.getChild(h - 1) : !1 === k(c, !0) ? null : c.getPreviousSourceNode(!0, n, k)) : (c = e, c.type == CKEDITOR.NODE_ELEMENT && ((c = c.getChild(d)) || (c = !1 ===
                    k(e, !0) ? null : e.getNextSourceNode(!0, n, k)))), c && !1 === k(c) && (c = null)); for (; c && !this._.end;) { this.current = c; if (!this.evaluator || !1 !== this.evaluator(c)) { if (!b) return c } else if (b && this.evaluator) return !1; c = c[f](!1, n, k) } this.end(); return this.current = null
            } function f(a) { for (var g, c = null; g = b.call(this, a);)c = g; return c } CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
                $: function (a) { this.range = a; this._ = {} }, proto: {
                    end: function () { this._.end = 1 }, next: function () { return b.call(this) }, previous: function () {
                        return b.call(this,
                            1)
                    }, checkForward: function () { return !1 !== b.call(this, 0, 1) }, checkBackward: function () { return !1 !== b.call(this, 1, 1) }, lastForward: function () { return f.call(this) }, lastBackward: function () { return f.call(this, 1) }, reset: function () { delete this.current; this._ = {} }
                }
            }); var d = { block: 1, "list-item": 1, table: 1, "table-row-group": 1, "table-header-group": 1, "table-footer-group": 1, "table-row": 1, "table-column-group": 1, "table-column": 1, "table-cell": 1, "table-caption": 1 }, a = { absolute: 1, fixed: 1 }; CKEDITOR.dom.element.prototype.isBlockBoundary =
                function (b) { return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in a || !d[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || b && this.is(b)) : !0 }; CKEDITOR.dom.walker.blockBoundary = function (a) { return function (b) { return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a)) } }; CKEDITOR.dom.walker.listItemBoundary = function () { return this.blockBoundary({ br: 1 }) }; CKEDITOR.dom.walker.bookmark = function (a, b) {
                    function g(a) { return a && a.getName && "span" == a.getName() && a.data("cke-bookmark") }
                    return function (c) { var e, d; e = c && c.type != CKEDITOR.NODE_ELEMENT && (d = c.getParent()) && g(d); e = a ? e : e || g(c); return !!(b ^ e) }
                }; CKEDITOR.dom.walker.whitespaces = function (a) { return function (b) { var g; b && b.type == CKEDITOR.NODE_TEXT && (g = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE); return !!(a ^ g) } }; CKEDITOR.dom.walker.invisible = function (a) {
                    var b = CKEDITOR.dom.walker.whitespaces(), g = CKEDITOR.env.webkit ? 1 : 0; return function (c) {
                        b(c) ? c = 1 : (c.type == CKEDITOR.NODE_TEXT &&
                            (c = c.getParent()), c = c.$.offsetWidth <= g); return !!(a ^ c)
                    }
                }; CKEDITOR.dom.walker.nodeType = function (a, b) { return function (g) { return !!(b ^ g.type == a) } }; CKEDITOR.dom.walker.bogus = function (a) { function b(a) { return !m(a) && !h(a) } return function (g) { var e = CKEDITOR.env.needsBrFiller ? g.is && g.is("br") : g.getText && c.test(g.getText()); e && (e = g.getParent(), g = g.getNext(b), e = e.isBlockBoundary() && (!g || g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary())); return !!(a ^ e) } }; CKEDITOR.dom.walker.temp = function (a) {
                    return function (b) {
                        b.type !=
                        CKEDITOR.NODE_ELEMENT && (b = b.getParent()); b = b && b.hasAttribute("data-cke-temp"); return !!(a ^ b)
                    }
                }; var c = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, m = CKEDITOR.dom.walker.whitespaces(), h = CKEDITOR.dom.walker.bookmark(), l = CKEDITOR.dom.walker.temp(), e = function (a) { return h(a) || m(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty) }; CKEDITOR.dom.walker.ignored = function (a) { return function (b) { b = m(b) || h(b) || l(b); return !!(a ^ b) } }; var k = CKEDITOR.dom.walker.ignored(); CKEDITOR.dom.walker.empty =
                    function (a) { return function (b) { for (var g = 0, c = b.getChildCount(); g < c; ++g)if (!k(b.getChild(g))) return !!a; return !a } }; var g = CKEDITOR.dom.walker.empty(), n = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function (a) { var b = {}, g; for (g in a) CKEDITOR.dtd[g]["#"] && (b[g] = 1); return b }(CKEDITOR.dtd.$block), { caption: 1, td: 1, th: 1 }); CKEDITOR.dom.walker.editable = function (a) {
                        return function (b) {
                            b = k(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") ||
                                "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(n) && g(b)) ? !0 : !1; return !!(a ^ b)
                        }
                    }; CKEDITOR.dom.element.prototype.getBogus = function () { var a = this; do a = a.getPreviousSourceNode(); while (e(a)); return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && c.test(a.getText())) ? a : !1 }
        })(); CKEDITOR.dom.range = function (b) {
            this.endOffset = this.endContainer = this.startOffset = this.startContainer = null; this.collapsed = !0; var f = b instanceof CKEDITOR.dom.document; this.document = f ? b : b.getDocument();
            this.root = f ? b.getBody() : b
        }; (function () {
            function b(a) { a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset } function f(a, b, c, e, d) {
                function h(a, b, g, c) { var e = g ? a.getPrevious() : a.getNext(); if (c && f) return e; w || c ? b.append(a.clone(!0, d), g) : (a.remove(), l && b.append(a, g)); return e } function k() { var a, b, g, c = Math.min(J.length, L.length); for (a = 0; a < c; a++)if (b = J[a], g = L[a], !b.equals(g)) return a; return a - 1 } function m() {
                    var b = Q - 1, c = I && M && !z.equals(A); b < N - 1 ||
                        b < K - 1 || c ? (c ? a.moveToPosition(A, CKEDITOR.POSITION_BEFORE_START) : K == b + 1 && G ? a.moveToPosition(L[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(L[b + 1], CKEDITOR.POSITION_BEFORE_START), e && (b = J[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (c = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), c.insertAfter(b), b.mergeSiblings(!1), a.moveToBookmark({ startNode: c }))) : a.collapse(!0)
                } a.optimizeBookmark(); var f = 0 === b, l = 1 == b, w = 2 == b; b = w ||
                    l; var z = a.startContainer, A = a.endContainer, C = a.startOffset, D = a.endOffset, F, G, I, M, E, R; if (w && A.type == CKEDITOR.NODE_TEXT && (z.equals(A) || z.type === CKEDITOR.NODE_ELEMENT && z.getFirst().equals(A))) c.append(a.document.createText(A.substring(C, D))); else {
                        A.type == CKEDITOR.NODE_TEXT ? w ? R = !0 : A = A.split(D) : 0 < A.getChildCount() ? D >= A.getChildCount() ? (A = A.getChild(D - 1), G = !0) : A = A.getChild(D) : M = G = !0; z.type == CKEDITOR.NODE_TEXT ? w ? E = !0 : z.split(C) : 0 < z.getChildCount() ? 0 === C ? (z = z.getChild(C), F = !0) : z = z.getChild(C - 1) : I = F = !0; for (var J =
                            z.getParents(), L = A.getParents(), Q = k(), N = J.length - 1, K = L.length - 1, O = c, Y, U, Z, ia = -1, X = Q; X <= N; X++) { U = J[X]; Z = U.getNext(); for (X != N || U.equals(L[X]) && N < K ? b && (Y = O.append(U.clone(0, d))) : F ? h(U, O, !1, I) : E && O.append(a.document.createText(U.substring(C))); Z;) { if (Z.equals(L[X])) { ia = X; break } Z = h(Z, O) } O = Y } O = c; for (X = Q; X <= K; X++)if (c = L[X], Z = c.getPrevious(), c.equals(J[X])) b && (O = O.getChild(0)); else {
                                X != K || c.equals(J[X]) && K < N ? b && (Y = O.append(c.clone(0, d))) : G ? h(c, O, !1, M) : R && O.append(a.document.createText(c.substring(0, D))); if (X >
                                    ia) for (; Z;)Z = h(Z, O, !0); O = Y
                            } w || m()
                    }
            } function d() { var a = !1, b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(!0), e = CKEDITOR.dom.walker.bogus(); return function (d) { return c(d) || b(d) ? !0 : e(d) && !a ? a = !0 : d.type == CKEDITOR.NODE_TEXT && (d.hasAscendant("pre") || CKEDITOR.tools.trim(d.getText()).length) || d.type == CKEDITOR.NODE_ELEMENT && !d.is(m) ? !1 : !0 } } function a(a) {
                var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(1); return function (e) {
                    return c(e) || b(e) ? !0 : !a && h(e) || e.type == CKEDITOR.NODE_ELEMENT &&
                        e.is(CKEDITOR.dtd.$removeEmpty)
                }
            } function c(a) { return function () { var b; return this[a ? "getPreviousNode" : "getNextNode"](function (a) { !b && k(a) && (b = a); return e(a) && !(h(a) && a.equals(b)) }) } } var m = { abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1 }, h = CKEDITOR.dom.walker.bogus(), l = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, e = CKEDITOR.dom.walker.editable(), k = CKEDITOR.dom.walker.ignored(!0); CKEDITOR.dom.range.prototype =
            {
                clone: function () { var a = new CKEDITOR.dom.range(this.root); a._setStartContainer(this.startContainer); a.startOffset = this.startOffset; a._setEndContainer(this.endContainer); a.endOffset = this.endOffset; a.collapsed = this.collapsed; return a }, collapse: function (a) { a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer), this.startOffset = this.endOffset); this.collapsed = !0 }, cloneContents: function (a) {
                    var b = new CKEDITOR.dom.documentFragment(this.document);
                    this.collapsed || f(this, 2, b, !1, "undefined" == typeof a ? !0 : a); return b
                }, deleteContents: function (a) { this.collapsed || f(this, 0, null, a) }, extractContents: function (a, b) { var c = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || f(this, 1, c, a, "undefined" == typeof b ? !0 : b); return c }, equals: function (a) { return this.startOffset === a.startOffset && this.endOffset === a.endOffset && this.startContainer.equals(a.startContainer) && this.endContainer.equals(a.endContainer) }, createBookmark: function (a) {
                    function b(a) {
                        return a.getAscendant(function (a) {
                            var b;
                            if (b = a.data && a.data("cke-temp")) b = -1 === CKEDITOR.tools.array.indexOf(["cke_copybin", "cke_pastebin"], a.getAttribute("id")); return b
                        }, !0)
                    } var c = this.startContainer, e = this.endContainer, d = this.collapsed, h, k, m, f; h = this.document.createElement("span"); h.data("cke-bookmark", 1); h.setStyle("display", "none"); h.setHtml("\x26nbsp;"); a && (m = "cke_bm_" + CKEDITOR.tools.getNextNumber(), h.setAttribute("id", m + (d ? "C" : "S"))); d || (k = h.clone(), k.setHtml("\x26nbsp;"), a && k.setAttribute("id", m + "E"), f = this.clone(), b(e) && (e = b(e),
                        f.moveToPosition(e, CKEDITOR.POSITION_AFTER_END)), f.collapse(), f.insertNode(k)); f = this.clone(); b(c) && (e = b(c), f.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START)); f.collapse(!0); f.insertNode(h); k ? (this.setStartAfter(h), this.setEndBefore(k)) : this.moveToPosition(h, CKEDITOR.POSITION_AFTER_END); return { startNode: a ? m + (d ? "C" : "S") : h, endNode: a ? m + "E" : k, serializable: a, collapsed: d }
                }, createBookmark2: function () {
                    function a(b) {
                        var g = b.container, e = b.offset, d; d = g; var h = e; d = d.type != CKEDITOR.NODE_ELEMENT || 0 === h || h == d.getChildCount() ?
                            0 : d.getChild(h - 1).type == CKEDITOR.NODE_TEXT && d.getChild(h).type == CKEDITOR.NODE_TEXT; d && (g = g.getChild(e - 1), e = g.getLength()); if (g.type == CKEDITOR.NODE_ELEMENT && 0 < e) { a: { for (d = g; e--;)if (h = d.getChild(e).getIndex(!0), 0 <= h) { e = h; break a } e = -1 } e += 1 } if (g.type == CKEDITOR.NODE_TEXT) {
                                d = g; for (h = 0; (d = d.getPrevious()) && d.type == CKEDITOR.NODE_TEXT;)h += d.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length; d = h; g.isEmpty() ? (h = g.getPrevious(c), d ? (e = d, g = h ? h.getNext() : g.getParent().getFirst()) : (g = g.getParent(),
                                    e = h ? h.getIndex(!0) + 1 : 0)) : e += d
                            } b.container = g; b.offset = e
                    } function b(a, g) { var c = g.getCustomData("cke-fillingChar"); if (c) { var e = a.container; c.equals(e) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= a.offset && (a.offset = e.getIndex(), a.container = e.getParent())) } } var c = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0); return function (c) {
                        var e = this.collapsed, d = { container: this.startContainer, offset: this.startOffset }, h = { container: this.endContainer, offset: this.endOffset }; c && (a(d), b(d, this.root),
                            e || (a(h), b(h, this.root))); return { start: d.container.getAddress(c), end: e ? null : h.container.getAddress(c), startOffset: d.offset, endOffset: h.offset, normalized: c, collapsed: e, is2: !0 }
                    }
                }(), moveToBookmark: function (a) {
                    if (a.is2) { var b = this.document.getByAddress(a.start, a.normalized), c = a.startOffset, e = a.end && this.document.getByAddress(a.end, a.normalized); a = a.endOffset; this.setStart(b, c); e ? this.setEnd(e, a) : this.collapse(!0) } else b = (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode, a = c ? this.document.getById(a.endNode) :
                        a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) : this.collapse(!0)
                }, getBoundaryNodes: function () {
                    var a = this.startContainer, b = this.endContainer, c = this.startOffset, e = this.endOffset, d; if (a.type == CKEDITOR.NODE_ELEMENT) if (d = a.getChildCount(), d > c) a = a.getChild(c); else if (1 > d) a = a.getPreviousSourceNode(); else { for (a = a.$; a.lastChild;)a = a.lastChild; a = new CKEDITOR.dom.node(a); a = a.getNextSourceNode() || a } if (b.type == CKEDITOR.NODE_ELEMENT) if (d = b.getChildCount(), d > e) b = b.getChild(e).getPreviousSourceNode(!0);
                    else if (1 > d) b = b.getPreviousSourceNode(); else { for (b = b.$; b.lastChild;)b = b.lastChild; b = new CKEDITOR.dom.node(b) } a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b); return { startNode: a, endNode: b }
                }, getCommonAncestor: function (a, b) { var c = this.startContainer, e = this.endContainer, c = c.equals(e) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(e); return b && !c.is ? c.getParent() : c }, optimize: function () {
                    var a = this.startContainer, b = this.startOffset;
                    a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a)); a = this.endContainer; b = this.endOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
                }, optimizeBookmark: function () { var a = this.startContainer, b = this.endContainer; a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START); b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END) }, trim: function (a,
                    b) {
                        var c = this.startContainer, e = this.startOffset, d = this.collapsed; if ((!a || d) && c && c.type == CKEDITOR.NODE_TEXT) { if (e) if (e >= c.getLength()) e = c.getIndex() + 1, c = c.getParent(); else { var h = c.split(e), e = c.getIndex() + 1, c = c.getParent(); this.startContainer.equals(this.endContainer) ? this.setEnd(h, this.endOffset - this.startOffset) : c.equals(this.endContainer) && (this.endOffset += 1) } else e = c.getIndex(), c = c.getParent(); this.setStart(c, e); if (d) { this.collapse(!0); return } } c = this.endContainer; e = this.endOffset; b || d || !c || c.type !=
                            CKEDITOR.NODE_TEXT || (e ? (e >= c.getLength() || c.split(e), e = c.getIndex() + 1) : e = c.getIndex(), c = c.getParent(), this.setEnd(c, e))
                }, enlarge: function (a, b) {
                    function c(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a } var e = new RegExp(/[^\s\ufeff]/); switch (a) {
                        case CKEDITOR.ENLARGE_INLINE: var d = 1; case CKEDITOR.ENLARGE_ELEMENT: var h = function (a, b) {
                            var c = new CKEDITOR.dom.range(m); c.setStart(a, b); c.setEndAt(m, CKEDITOR.POSITION_BEFORE_END); var c = new CKEDITOR.dom.walker(c), g; for (c.guard =
                                function (a) { return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) }; g = c.next();) { if (g.type != CKEDITOR.NODE_TEXT) return !1; F = g != a ? g.getText() : g.substring(b); if (e.test(F)) return !1 } return !0
                        }; if (this.collapsed) break; var k = this.getCommonAncestor(), m = this.root, f, l, w, z, A, C = !1, D, F; D = this.startContainer; var G = this.startOffset; D.type == CKEDITOR.NODE_TEXT ? (G && (D = !CKEDITOR.tools.trim(D.substring(0, G)).length && D, C = !!D), D && ((z = D.getPrevious()) || (w = D.getParent()))) : (G && (z = D.getChild(G - 1) || D.getLast()), z || (w = D));
                            for (w = c(w); w || z;) {
                                if (w && !z) { !A && w.equals(k) && (A = !0); if (d ? w.isBlockBoundary() : !m.contains(w)) break; C && "inline" == w.getComputedStyle("display") || (C = !1, A ? f = w : this.setStartBefore(w)); z = w.getPrevious() } for (; z;)if (D = !1, z.type == CKEDITOR.NODE_COMMENT) z = z.getPrevious(); else {
                                    if (z.type == CKEDITOR.NODE_TEXT) F = z.getText(), e.test(F) && (z = null), D = /[\s\ufeff]$/.test(F); else if ((z.$.offsetWidth > (CKEDITOR.env.webkit ? 1 : 0) || b && z.is("br")) && !z.data("cke-bookmark")) if (C && CKEDITOR.dtd.$removeEmpty[z.getName()]) {
                                        F = z.getText();
                                        if (e.test(F)) z = null; else for (var G = z.$.getElementsByTagName("*"), I = 0, M; M = G[I++];)if (!CKEDITOR.dtd.$removeEmpty[M.nodeName.toLowerCase()]) { z = null; break } z && (D = !!F.length)
                                    } else z = null; D && (C ? A ? f = w : w && this.setStartBefore(w) : C = !0); if (z) { D = z.getPrevious(); if (!w && !D) { w = z; z = null; break } z = D } else w = null
                                } w && (w = c(w.getParent()))
                            } D = this.endContainer; G = this.endOffset; w = z = null; A = C = !1; D.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(D.substring(G)).length ? C = !0 : (C = !D.getLength(), G == D.getLength() ? (z = D.getNext()) || (w = D.getParent()) :
                                h(D, G) && (w = D.getParent())) : (z = D.getChild(G)) || (w = D); for (; w || z;) {
                                    if (w && !z) { !A && w.equals(k) && (A = !0); if (d ? w.isBlockBoundary() : !m.contains(w)) break; C && "inline" == w.getComputedStyle("display") || (C = !1, A ? l = w : w && this.setEndAfter(w)); z = w.getNext() } for (; z;) {
                                        D = !1; if (z.type == CKEDITOR.NODE_TEXT) F = z.getText(), h(z, 0) || (z = null), D = /^[\s\ufeff]/.test(F); else if (z.type == CKEDITOR.NODE_ELEMENT) {
                                            if ((0 < z.$.offsetWidth || b && z.is("br")) && !z.data("cke-bookmark")) if (C && CKEDITOR.dtd.$removeEmpty[z.getName()]) {
                                                F = z.getText(); if (e.test(F)) z =
                                                    null; else for (G = z.$.getElementsByTagName("*"), I = 0; M = G[I++];)if (!CKEDITOR.dtd.$removeEmpty[M.nodeName.toLowerCase()]) { z = null; break } z && (D = !!F.length)
                                            } else z = null
                                        } else D = 1; D && C && (A ? l = w : this.setEndAfter(w)); if (z) { D = z.getNext(); if (!w && !D) { w = z; z = null; break } z = D } else w = null
                                    } w && (w = c(w.getParent()))
                                } f && l && (k = f.contains(l) ? l : f, this.setStartBefore(k), this.setEndAfter(k)); break; case CKEDITOR.ENLARGE_BLOCK_CONTENTS: case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS: w = new CKEDITOR.dom.range(this.root); m = this.root; w.setStartAt(m,
                                    CKEDITOR.POSITION_AFTER_START); w.setEnd(this.startContainer, this.startOffset); w = new CKEDITOR.dom.walker(w); var E, R, J = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? { br: 1 } : null), L = null, Q = function (a) { if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable")) if (L) { if (L.equals(a)) { L = null; return } } else L = a; else if (L) return; var b = J(a); b || (E = a); return b }, d = function (a) { var b = Q(a); !b && a.is && a.is("br") && (R = a); return b }; w.guard = Q; w = w.lastBackward(); E = E || m; this.setStartAt(E,
                                        !E.is("br") && (!w && this.checkStartOfBlock() || w && E.contains(w)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END); if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) { w = this.clone(); w = new CKEDITOR.dom.walker(w); var N = CKEDITOR.dom.walker.whitespaces(), K = CKEDITOR.dom.walker.bookmark(); w.evaluator = function (a) { return !N(a) && !K(a) }; if ((w = w.previous()) && w.type == CKEDITOR.NODE_ELEMENT && w.is("br")) break } w = this.clone(); w.collapse(); w.setEndAt(m, CKEDITOR.POSITION_BEFORE_END); w = new CKEDITOR.dom.walker(w); w.guard =
                                            a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? d : Q; E = L = R = null; w = w.lastForward(); E = E || m; this.setEndAt(E, !w && this.checkEndOfBlock() || w && E.contains(w) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START); R && this.setEndAfter(R)
                    }
                }, shrink: function (a, b, c) {
                    var e = "boolean" === typeof c ? c : c && "boolean" === typeof c.shrinkOnBlockBoundary ? c.shrinkOnBlockBoundary : !0, d = c && c.skipBogus; if (!this.collapsed) {
                        a = a || CKEDITOR.SHRINK_TEXT; var h = this.clone(), k = this.startContainer, m = this.endContainer, f = this.startOffset, l = this.endOffset,
                            w = c = 1; k && k.type == CKEDITOR.NODE_TEXT && (f ? f >= k.getLength() ? h.setStartAfter(k) : (h.setStartBefore(k), c = 0) : h.setStartBefore(k)); m && m.type == CKEDITOR.NODE_TEXT && (l ? l >= m.getLength() ? h.setEndAfter(m) : (h.setEndAfter(m), w = 0) : h.setEndBefore(m)); var h = new CKEDITOR.dom.walker(h), z = CKEDITOR.dom.walker.bookmark(), A = CKEDITOR.dom.walker.bogus(); h.evaluator = function (b) { return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT) }; var C; h.guard = function (b, c) {
                                if (d && A(b) || z(b)) return !0; if (a == CKEDITOR.SHRINK_ELEMENT &&
                                    b.type == CKEDITOR.NODE_TEXT || c && b.equals(C) || !1 === e && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return !1; c || b.type != CKEDITOR.NODE_ELEMENT || (C = b); return !0
                            }; c && (k = h[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(k, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START); w && (h.reset(), (h = h[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(h, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END));
                        return !(!c && !w)
                    }
                }, insertNode: function (a) { this.optimizeBookmark(); this.trim(!1, !0); var b = this.startContainer, c = b.getChild(this.startOffset); c ? a.insertBefore(c) : b.append(a); a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++; this.setStartBefore(a) }, moveToPosition: function (a, b) { this.setStartAt(a, b); this.collapse(!0) }, moveToRange: function (a) { this.setStart(a.startContainer, a.startOffset); this.setEnd(a.endContainer, a.endOffset) }, selectNodeContents: function (a) {
                    this.setStart(a, 0); this.setEnd(a,
                        a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
                }, setStart: function (a, c) { a.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[a.getName()] && (c = a.getIndex(), a = a.getParent()); this._setStartContainer(a); this.startOffset = c; this.endContainer || (this._setEndContainer(a), this.endOffset = c); b(this) }, setEnd: function (a, c) {
                    a.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[a.getName()] && (c = a.getIndex() + 1, a = a.getParent()); this._setEndContainer(a); this.endOffset = c; this.startContainer || (this._setStartContainer(a),
                        this.startOffset = c); b(this)
                }, setStartAfter: function (a) { this.setStart(a.getParent(), a.getIndex() + 1) }, setStartBefore: function (a) { this.setStart(a.getParent(), a.getIndex()) }, setEndAfter: function (a) { this.setEnd(a.getParent(), a.getIndex() + 1) }, setEndBefore: function (a) { this.setEnd(a.getParent(), a.getIndex()) }, setStartAt: function (a, c) {
                    switch (c) {
                        case CKEDITOR.POSITION_AFTER_START: this.setStart(a, 0); break; case CKEDITOR.POSITION_BEFORE_END: a.type == CKEDITOR.NODE_TEXT ? this.setStart(a, a.getLength()) : this.setStart(a,
                            a.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setStartBefore(a); break; case CKEDITOR.POSITION_AFTER_END: this.setStartAfter(a)
                    }b(this)
                }, setEndAt: function (a, c) { switch (c) { case CKEDITOR.POSITION_AFTER_START: this.setEnd(a, 0); break; case CKEDITOR.POSITION_BEFORE_END: a.type == CKEDITOR.NODE_TEXT ? this.setEnd(a, a.getLength()) : this.setEnd(a, a.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setEndBefore(a); break; case CKEDITOR.POSITION_AFTER_END: this.setEndAfter(a) }b(this) }, fixBlock: function (a,
                    b) { var c = this.createBookmark(), e = this.document.createElement(b); this.collapse(a); this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS); this.extractContents().appendTo(e); e.trim(); this.insertNode(e); var d = e.getBogus(); d && d.remove(); e.appendBogus(); this.moveToBookmark(c); return e }, splitBlock: function (a, b) {
                        var c = new CKEDITOR.dom.elementPath(this.startContainer, this.root), e = new CKEDITOR.dom.elementPath(this.endContainer, this.root), d = c.block, h = e.block, k = null; if (!c.blockLimit.equals(e.blockLimit)) return null; "br" !=
                            a && (d || (d = this.fixBlock(!0, a), h = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), h || (h = this.fixBlock(!1, a))); c = d && this.checkStartOfBlock(); e = h && this.checkEndOfBlock(); this.deleteContents(); d && d.equals(h) && (e ? (k = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(h, CKEDITOR.POSITION_AFTER_END), h = null) : c ? (k = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START), d = null) : (h = this.splitElement(d, b ||
                                !1), d.is("ul", "ol") || d.appendBogus())); return { previousBlock: d, nextBlock: h, wasStartOfBlock: c, wasEndOfBlock: e, elementPath: k }
                    }, splitElement: function (a, b) { if (!this.collapsed) return null; this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END); var c = this.extractContents(!1, b || !1), e = a.clone(!1, b || !1); c.appendTo(e); e.insertAfter(a); this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END); return e }, removeEmptyBlocksAtEnd: function () {
                        function a(g) {
                            return function (a) {
                                return b(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() ||
                                    g.is("table") && a.is("caption") ? !1 : !0
                            }
                        } var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(!1); return function (b) { for (var c = this.createBookmark(), e = this[b ? "endPath" : "startPath"](), d = e.block || e.blockLimit, h; d && !d.equals(e.root) && !d.getFirst(a(d));)h = d.getParent(), this[b ? "setEndAt" : "setStartAt"](d, CKEDITOR.POSITION_AFTER_END), d.remove(1), d = h; this.moveToBookmark(c) }
                    }(), startPath: function () { return new CKEDITOR.dom.elementPath(this.startContainer, this.root) }, endPath: function () {
                        return new CKEDITOR.dom.elementPath(this.endContainer,
                            this.root)
                    }, checkBoundaryOfElement: function (b, c) { var e = c == CKEDITOR.START, d = this.clone(); d.collapse(e); d[e ? "setStartAt" : "setEndAt"](b, e ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END); d = new CKEDITOR.dom.walker(d); d.evaluator = a(e); return d[e ? "checkBackward" : "checkForward"]() }, checkStartOfBlock: function () {
                        var a = this.startContainer, b = this.startOffset; CKEDITOR.env.ie && b && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0, b)), l.test(a) && this.trim(0, 1)); this.trim(); a = new CKEDITOR.dom.elementPath(this.startContainer,
                            this.root); b = this.clone(); b.collapse(!0); b.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(b); a.evaluator = d(); return a.checkBackward()
                    }, checkEndOfBlock: function () {
                        var a = this.endContainer, b = this.endOffset; CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(b)), l.test(a) && this.trim(1, 0)); this.trim(); a = new CKEDITOR.dom.elementPath(this.endContainer, this.root); b = this.clone(); b.collapse(!1); b.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                        a = new CKEDITOR.dom.walker(b); a.evaluator = d(); return a.checkForward()
                    }, getPreviousNode: function (a, b, c) { var e = this.clone(); e.collapse(1); e.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START); c = new CKEDITOR.dom.walker(e); c.evaluator = a; c.guard = b; return c.previous() }, getNextNode: function (a, b, c) { var e = this.clone(); e.collapse(); e.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END); c = new CKEDITOR.dom.walker(e); c.evaluator = a; c.guard = b; return c.next() }, checkReadOnly: function () {
                        function a(b, c) {
                            for (; b;) {
                                if (b.type ==
                                    CKEDITOR.NODE_ELEMENT) { if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0; if (b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c))) break } b = b.getParent()
                            } return 1
                        } return function () { var b = this.startContainer, c = this.endContainer; return !(a(b, c) && a(c, b)) }
                    }(), moveToElementEditablePosition: function (a, b) {
                        if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START),
                            !0; for (var c = 0; a;) {
                                if (a.type == CKEDITOR.NODE_TEXT) { b && this.endContainer && this.checkEndOfBlock() && l.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START); c = 1; break } if (a.type == CKEDITOR.NODE_ELEMENT) if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), c = 1; else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
                                else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), this.setEndAfter(a), !0; var e = a, d = c, h = void 0; e.type == CKEDITOR.NODE_ELEMENT && e.isEditable(!1) && (h = e[b ? "getLast" : "getFirst"](k)); d || h || (h = e[b ? "getPrevious" : "getNext"](k)); a = h
                            } return !!c
                    }, moveToClosestEditablePosition: function (a, b) {
                        var c, e = 0, d, h, k = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START]; a ? (c = new CKEDITOR.dom.range(this.root), c.moveToPosition(a, k[b ? 0 : 1])) : c = this.clone(); if (a &&
                            !a.is(CKEDITOR.dtd.$block)) e = 1; else if (d = c[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) e = 1, (h = d.type == CKEDITOR.NODE_ELEMENT) && d.is(CKEDITOR.dtd.$block) && "false" == d.getAttribute("contenteditable") ? (c.setStartAt(d, CKEDITOR.POSITION_BEFORE_START), c.setEndAt(d, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && h && d.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (c.setEnd(d, 0), c.collapse()) : c.moveToPosition(d, k[b ? 1 : 0]); e && this.moveToRange(c); return !!e
                    }, moveToElementEditStart: function (a) { return this.moveToElementEditablePosition(a) },
                moveToElementEditEnd: function (a) { return this.moveToElementEditablePosition(a, !0) }, getEnclosedNode: function () { var a = this.clone(); a.optimize(); if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null; var a = new CKEDITOR.dom.walker(a), b = CKEDITOR.dom.walker.bookmark(!1, !0), c = CKEDITOR.dom.walker.whitespaces(!0); a.evaluator = function (a) { return c(a) && b(a) }; var e = a.next(); a.reset(); return e && e.equals(a.previous()) ? e : null }, getTouchedStartNode: function () {
                    var a = this.startContainer;
                    return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
                }, getTouchedEndNode: function () { var a = this.endContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a }, getNextEditableNode: c(), getPreviousEditableNode: c(1), _getTableElement: function (a) {
                    a = a || { td: 1, th: 1, tr: 1, tbody: 1, thead: 1, tfoot: 1, table: 1 }; var b = this.getTouchedStartNode(), c = this.getTouchedEndNode(), e = b.getAscendant("table", !0), c = c.getAscendant("table", !0); return e && !this.root.contains(e) ?
                        null : this.getEnclosedNode() ? this.getEnclosedNode().getAscendant(a, !0) : e && c && (e.equals(c) || e.contains(c) || c.contains(e)) ? b.getAscendant(a, !0) : null
                }, scrollIntoView: function () {
                    var a = new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document), b, c, e, d = this.clone(); d.optimize(); (e = d.startContainer.type == CKEDITOR.NODE_TEXT) ? (c = d.startContainer.getText(), b = d.startContainer.split(d.startOffset), a.insertAfter(d.startContainer)) : d.insertNode(a); a.scrollIntoView(); e && (d.startContainer.setText(c),
                        b.remove()); a.remove()
                }, getClientRects: function () {
                    function a(b, c) {
                        var e = CKEDITOR.tools.array.map(b, function (a) { return a }), g = new CKEDITOR.dom.range(c.root), d, h, k; c.startContainer instanceof CKEDITOR.dom.element && (h = 0 === c.startOffset && c.startContainer.hasAttribute("data-widget")); c.endContainer instanceof CKEDITOR.dom.element && (k = (k = c.endOffset === (c.endContainer.getChildCount ? c.endContainer.getChildCount() : c.endContainer.length)) && c.endContainer.hasAttribute("data-widget")); h && g.setStart(c.startContainer.getParent(),
                            c.startContainer.getIndex()); k && g.setEnd(c.endContainer.getParent(), c.endContainer.getIndex() + 1); if (h || k) c = g; g = c.cloneContents().find("[data-cke-widget-id]").toArray(); if (g = CKEDITOR.tools.array.map(g, function (a) { var b = c.root.editor; a = a.getAttribute("data-cke-widget-id"); return b.widgets.instances[a].element })) return g = CKEDITOR.tools.array.map(g, function (a) {
                                var b; b = a.getParent().hasClass("cke_widget_wrapper") ? a.getParent() : a; d = this.root.getDocument().$.createRange(); d.setStart(b.getParent().$, b.getIndex());
                                d.setEnd(b.getParent().$, b.getIndex() + 1); b = d.getClientRects(); b.widgetRect = a.getClientRect(); return b
                            }, c), CKEDITOR.tools.array.forEach(g, function (a) { function b(g) { CKEDITOR.tools.array.forEach(e, function (b, d) { var h = CKEDITOR.tools.objectCompare(a[g], b); h || (h = CKEDITOR.tools.objectCompare(a.widgetRect, b)); h && (Array.prototype.splice.call(e, d, a.length - g, a.widgetRect), c = !0) }); c || (g < e.length - 1 ? b(g + 1) : e.push(a.widgetRect)) } var c; b(0) }), e
                    } function b(a, c, g) {
                        var d; c.collapsed ? g.startContainer instanceof CKEDITOR.dom.element ?
                            (a = g.checkStartOfBlock(), d = new CKEDITOR.dom.text("​"), a ? g.startContainer.append(d, !0) : 0 === g.startOffset ? d.insertBefore(g.startContainer.getFirst()) : (g = g.startContainer.getChildren().getItem(g.startOffset - 1), d.insertAfter(g)), c.setStart(d.$, 0), c.setEnd(d.$, 0), a = c.getClientRects(), d.remove()) : g.startContainer instanceof CKEDITOR.dom.text && ("" === g.startContainer.getText() ? (g.startContainer.setText("​"), a = c.getClientRects(), g.startContainer.setText("")) : a = [e(g.createBookmark())]) : a = [e(g.createBookmark())];
                        return a
                    } function c(a, b, g) { a = CKEDITOR.tools.extend({}, a); b && (a = CKEDITOR.tools.getAbsoluteRectPosition(g.document.getWindow(), a)); !a.width && (a.width = a.right - a.left); !a.height && (a.height = a.bottom - a.top); return a } function e(a) {
                        var b = a.startNode; a = a.endNode; var c; b.setText("​"); b.removeStyle("display"); a ? (a.setText("​"), a.removeStyle("display"), c = [b.getClientRect(), a.getClientRect()], a.remove()) : c = [b.getClientRect(), b.getClientRect()]; b.remove(); return {
                            right: Math.max(c[0].right, c[1].right), bottom: Math.max(c[0].bottom,
                                c[1].bottom), left: Math.min(c[0].left, c[1].left), top: Math.min(c[0].top, c[1].top), width: Math.abs(c[0].left - c[1].left), height: Math.max(c[0].bottom, c[1].bottom) - Math.min(c[0].top, c[1].top)
                        }
                    } return void 0 !== this.document.getSelection ? function (e) {
                        var d = this.root.getDocument().$.createRange(), h; d.setStart(this.startContainer.$, this.startOffset); d.setEnd(this.endContainer.$, this.endOffset); h = d.getClientRects(); h = a(h, this); h.length || (h = b(h, d, this)); return CKEDITOR.tools.array.map(h, function (a) {
                            return c(a,
                                e, this)
                        }, this)
                    } : function (a) { return [c(e(this.createBookmark()), a, this)] }
                }(), _setStartContainer: function (a) { this.startContainer = a }, _setEndContainer: function (a) { this.endContainer = a }, _find: function (a, b) {
                    var c = this.getCommonAncestor(), e = this.getBoundaryNodes(), d = [], h, k, m, f; if (c && c.find) for (k = c.find(a), h = 0; h < k.count(); h++)if (c = k.getItem(h), b || !c.isReadOnly()) m = c.getPosition(e.startNode) & CKEDITOR.POSITION_FOLLOWING || e.startNode.equals(c), f = c.getPosition(e.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED ||
                        e.endNode.equals(c), m && f && d.push(c); return d
                }
            }; CKEDITOR.dom.range.mergeRanges = function (a) {
                return CKEDITOR.tools.array.reduce(a, function (a, b) {
                    var c = a[a.length - 1], e = !1; b = b.clone(); b.enlarge(CKEDITOR.ENLARGE_ELEMENT); if (c) { var g = new CKEDITOR.dom.range(b.root), e = new CKEDITOR.dom.walker(g), d = CKEDITOR.dom.walker.whitespaces(); g.setStart(c.endContainer, c.endOffset); g.setEnd(b.startContainer, b.startOffset); for (g = e.next(); d(g) || b.endContainer.equals(g);)g = e.next(); e = !g } e ? c.setEnd(b.endContainer, b.endOffset) :
                        a.push(b); return a
                }, [])
            }
        })(); CKEDITOR.POSITION_AFTER_START = 1; CKEDITOR.POSITION_BEFORE_END = 2; CKEDITOR.POSITION_BEFORE_START = 3; CKEDITOR.POSITION_AFTER_END = 4; CKEDITOR.ENLARGE_ELEMENT = 1; CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2; CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3; CKEDITOR.ENLARGE_INLINE = 4; CKEDITOR.START = 1; CKEDITOR.END = 2; CKEDITOR.SHRINK_ELEMENT = 1; CKEDITOR.SHRINK_TEXT = 2; "use strict"; (function () {
            function b(a) {
                1 > arguments.length || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ ||
                    (this._ = {}))
            } function f(a) { var b = []; a.forEach(function (a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0); return b } function d(a, b, c, e) {
                a: { null == e && (e = f(c)); for (var h; h = e.shift();)if (h.getDtd().p) { e = { element: h, remaining: e }; break a } e = null } if (!e) return 0; if ((h = CKEDITOR.filter.instances[e.element.data("cke-filter")]) && !h.check(b)) return d(a, b, c, e.remaining); b = new CKEDITOR.dom.range(e.element); b.selectNodeContents(e.element); b = b.createIterator(); b.enlargeBr =
                    a.enlargeBr; b.enforceRealBlocks = a.enforceRealBlocks; b.activeFilter = b.filter = h; a._.nestedEditable = { element: e.element, container: c, remaining: e.remaining, iterator: b }; return 1
            } function a(a, b, c) { if (!b) return !1; a = a.clone(); a.collapse(!c); return a.checkBoundaryOfElement(b, c ? CKEDITOR.START : CKEDITOR.END) } var c = /^[\r\n\t ]+$/, m = CKEDITOR.dom.walker.bookmark(!1, !0), h = CKEDITOR.dom.walker.whitespaces(!0), l = function (a) { return m(a) && h(a) }, e = { dd: 1, dt: 1, li: 1 }; b.prototype = {
                getNextParagraph: function (b) {
                    var g, h, f, u, r;
                    b = b || "p"; if (this._.nestedEditable) { if (g = this._.nestedEditable.iterator.getNextParagraph(b)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, g; this.activeFilter = this.filter; if (d(this, b, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(b); this._.nestedEditable = null } if (!this.range.root.getDtd()[b]) return null; if (!this._.started) {
                        var p = this.range.clone();
                        h = p.startPath(); var v = p.endPath(), y = !p.collapsed && a(p, h.block), t = !p.collapsed && a(p, v.block, 1); p.shrink(CKEDITOR.SHRINK_ELEMENT, !0); y && p.setStartAt(h.block, CKEDITOR.POSITION_BEFORE_END); t && p.setEndAt(v.block, CKEDITOR.POSITION_AFTER_START); h = p.endContainer.hasAscendant("pre", !0) || p.startContainer.hasAscendant("pre", !0); p.enlarge(this.forceBrBreak && !h || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS); p.collapsed || (h = new CKEDITOR.dom.walker(p.clone()), v = CKEDITOR.dom.walker.bookmark(!0,
                            !0), h.evaluator = v, this._.nextNode = h.next(), h = new CKEDITOR.dom.walker(p.clone()), h.evaluator = v, h = h.previous(), this._.lastNode = h.getNextSourceNode(!0, null, p.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (v = this.range.clone(), v.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), v.checkEndOfBlock() && (v = new CKEDITOR.dom.elementPath(v.endContainer, v.root), this._.lastNode = (v.block ||
                                v.blockLimit).getNextSourceNode(!0))), this._.lastNode && p.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = p.document.createText(""), this._.lastNode.insertAfter(h)), p = null); this._.started = 1; h = p
                    } v = this._.nextNode; p = this._.lastNode; for (this._.nextNode = null; v;) {
                        var y = 0, t = v.hasAscendant("pre"), B = v.type != CKEDITOR.NODE_ELEMENT, w = 0; if (B) v.type == CKEDITOR.NODE_TEXT && c.test(v.getText()) && (B = 0); else {
                            var z = v.getName(); if (CKEDITOR.dtd.$block[z] && "false" == v.getAttribute("contenteditable")) {
                                g =
                                v; d(this, b, g); break
                            } else if (v.isBlockBoundary(this.forceBrBreak && !t && { br: 1 })) { if ("br" == z) B = 1; else if (!h && !v.getChildCount() && "hr" != z) { g = v; f = v.equals(p); break } h && (h.setEndAt(v, CKEDITOR.POSITION_BEFORE_START), "br" != z && (this._.nextNode = v)); y = 1 } else { if (v.getFirst()) { h || (h = this.range.clone(), h.setStartAt(v, CKEDITOR.POSITION_BEFORE_START)); v = v.getFirst(); continue } B = 1 }
                        } B && !h && (h = this.range.clone(), h.setStartAt(v, CKEDITOR.POSITION_BEFORE_START)); f = (!y || B) && v.equals(p); if (h && !y) for (; !v.getNext(l) && !f;) {
                            z =
                            v.getParent(); if (z.isBlockBoundary(this.forceBrBreak && !t && { br: 1 })) { y = 1; B = 0; f || z.equals(p); h.setEndAt(z, CKEDITOR.POSITION_BEFORE_END); break } v = z; B = 1; f = v.equals(p); w = 1
                        } B && h.setEndAt(v, CKEDITOR.POSITION_AFTER_END); v = this._getNextSourceNode(v, w, p); if ((f = !v) || y && h) break
                    } if (!g) {
                        if (!h) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null; g = new CKEDITOR.dom.elementPath(h.startContainer, h.root); v = g.blockLimit; y = { div: 1, th: 1, td: 1 }; g = g.block; !g && v && !this.enforceRealBlocks && y[v.getName()] &&
                            h.checkStartOfBlock() && h.checkEndOfBlock() && !v.equals(h.root) ? g = v : !g || this.enforceRealBlocks && g.is(e) ? (g = this.range.document.createElement(b), h.extractContents().appendTo(g), g.trim(), h.insertNode(g), u = r = !0) : "li" != g.getName() ? h.checkStartOfBlock() && h.checkEndOfBlock() || (g = g.clone(!1), h.extractContents().appendTo(g), g.trim(), r = h.splitBlock(), u = !r.wasStartOfBlock, r = !r.wasEndOfBlock, h.insertNode(g)) : f || (this._.nextNode = g.equals(p) ? null : this._getNextSourceNode(h.getBoundaryNodes().endNode, 1, p))
                    } u && (u =
                        g.getPrevious()) && u.type == CKEDITOR.NODE_ELEMENT && ("br" == u.getName() ? u.remove() : u.getLast() && "br" == u.getLast().$.nodeName.toLowerCase() && u.getLast().remove()); r && (u = g.getLast()) && u.type == CKEDITOR.NODE_ELEMENT && "br" == u.getName() && (!CKEDITOR.env.needsBrFiller || u.getPrevious(m) || u.getNext(m)) && u.remove(); this._.nextNode || (this._.nextNode = f || g.equals(p) || !p ? null : this._getNextSourceNode(g, 1, p)); return g
                }, _getNextSourceNode: function (a, b, c) {
                    function e(a) { return !(a.equals(c) || a.equals(d)) } var d = this.range.root;
                    for (a = a.getNextSourceNode(b, null, e); !m(a);)a = a.getNextSourceNode(b, null, e); return a
                }
            }; CKEDITOR.dom.range.prototype.createIterator = function () { return new b(this) }
        })(); CKEDITOR.command = function (b, f) {
            this.uiItems = []; this.exec = function (a) { if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1; this.editorFocus && b.focus(); return !1 === this.fire("exec") ? !0 : !1 !== f.exec.call(this, b, a) }; this.refresh = function (a, b) {
                if (!this.readOnly && a.readOnly) return !0; if (this.context && !b.isContextFor(this.context) ||
                    !this.checkAllowed(!0)) return this.disable(), !0; this.startDisabled || this.enable(); this.modes && !this.modes[a.mode] && this.disable(); return !1 === this.fire("refresh", { editor: a, path: b }) ? !0 : f.refresh && !1 !== f.refresh.apply(this, arguments)
            }; var d; this.checkAllowed = function (a) { return a || "boolean" != typeof d ? d = b.activeFilter.checkFeature(this) : d }; CKEDITOR.tools.extend(this, f, { modes: { wysiwyg: 1 }, editorFocus: 1, contextSensitive: !!f.context, state: CKEDITOR.TRISTATE_DISABLED }); CKEDITOR.event.call(this)
        }; CKEDITOR.command.prototype =
        {
            enable: function () { this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF) }, disable: function () { this.setState(CKEDITOR.TRISTATE_DISABLED) }, setState: function (b) { if (this.state == b || b != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1; this.previousState = this.state; this.state = b; this.fire("state"); return !0 }, toggleState: function () {
                this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) :
                this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
            }
        }; CKEDITOR.event.implementOn(CKEDITOR.command.prototype); CKEDITOR.ENTER_P = 1; CKEDITOR.ENTER_BR = 2; CKEDITOR.ENTER_DIV = 3; CKEDITOR.config = {
            customConfig: "config.js", autoUpdateElement: !0, language: "", defaultLanguage: "en", contentsLangDirection: "", enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR, docType: "\x3c!DOCTYPE html\x3e", bodyId: "", bodyClass: "", fullPage: !1, height: 200, contentsCss: CKEDITOR.getUrl("contents.css"),
            extraPlugins: "", removePlugins: "", protectedSource: [], tabIndex: 0, width: "", baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
        }; (function () {
            function b(a, b, c, e, g) {
                var d, k; a = []; for (d in b) {
                    k = b[d]; k = "boolean" == typeof k ? {} : "function" == typeof k ? { match: k } : I(k); "$" != d.charAt(0) && (k.elements = d); c && (k.featureName = c.toLowerCase()); var m = k; m.elements = h(m.elements, /\s+/) || null; m.propertiesOnly = m.propertiesOnly || !0 === m.elements; var f = /\s*,\s*/, l = void 0; for (l in R) {
                        m[l] = h(m[l],
                            f) || null; var n = m, v = J[l], z = h(m[J[l]], f), q = m[l], K = [], A = !0, t = void 0; z ? A = !1 : z = {}; for (t in q) "!" == t.charAt(0) && (t = t.slice(1), K.push(t), z[t] = !0, A = !1); for (; t = K.pop();)q[t] = q["!" + t], delete q["!" + t]; n[v] = (A ? !1 : z) || null
                    } m.match = m.match || null; e.push(k); a.push(k)
                } b = g.elements; g = g.generic; var N; c = 0; for (e = a.length; c < e; ++c) {
                    d = I(a[c]); k = !0 === d.classes || !0 === d.styles || !0 === d.attributes; m = d; l = v = f = void 0; for (f in R) m[f] = y(m[f]); n = !0; for (l in J) {
                        f = J[l]; v = m[f]; z = []; q = void 0; for (q in v) -1 < q.indexOf("*") ? z.push(new RegExp("^" +
                            q.replace(/\*/g, ".*") + "$")) : z.push(q); v = z; v.length && (m[f] = v, n = !1)
                    } m.nothingRequired = n; m.noProperties = !(m.attributes || m.classes || m.styles); if (!0 === d.elements || null === d.elements) g[k ? "unshift" : "push"](d); else for (N in m = d.elements, delete d.elements, m) if (b[N]) b[N][k ? "unshift" : "push"](d); else b[N] = [d]
                }
            } function f(a, b, c, e) {
                if (!a.match || a.match(b)) if (e || l(a, b)) if (a.propertiesOnly || (c.valid = !0), c.allAttributes || (c.allAttributes = d(a.attributes, b.attributes, c.validAttributes)), c.allStyles || (c.allStyles = d(a.styles,
                    b.styles, c.validStyles)), !c.allClasses) { a = a.classes; b = b.classes; e = c.validClasses; if (a) if (!0 === a) a = !0; else { for (var g = 0, h = b.length, k; g < h; ++g)k = b[g], e[k] || (e[k] = a(k)); a = !1 } else a = !1; c.allClasses = a }
            } function d(a, b, c) { if (!a) return !1; if (!0 === a) return !0; for (var e in b) c[e] || (c[e] = a(e)); return !1 } function a(a, b, e) {
                if (!a.match || a.match(b)) {
                    if (a.noProperties) return !1; e.hadInvalidAttribute = c(a.attributes, b.attributes) || e.hadInvalidAttribute; e.hadInvalidStyle = c(a.styles, b.styles) || e.hadInvalidStyle; a = a.classes;
                    b = b.classes; if (a) { for (var g = !1, d = !0 === a, h = b.length; h--;)if (d || a(b[h])) b.splice(h, 1), g = !0; a = g } else a = !1; e.hadInvalidClass = a || e.hadInvalidClass
                }
            } function c(a, b) { if (!a) return !1; var c = !1, e = !0 === a, g; for (g in b) if (e || a(g)) delete b[g], c = !0; return c } function m(a, b, c) { if (a.disabled || a.customConfig && !c || !b) return !1; a._.cachedChecks = {}; return !0 } function h(a, b) {
                if (!a) return !1; if (!0 === a) return a; if ("string" == typeof a) return a = M(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b)); if (CKEDITOR.tools.isArray(a)) return a.length ?
                    CKEDITOR.tools.convertArrayToObject(a) : !1; var c = {}, e = 0, g; for (g in a) c[g] = a[g], e++; return e ? c : !1
            } function l(a, b) { if (a.nothingRequired) return !0; var c, g, d, h; if (d = a.requiredClasses) for (h = b.classes, c = 0; c < d.length; ++c)if (g = d[c], "string" == typeof g) { if (-1 == CKEDITOR.tools.indexOf(h, g)) return !1 } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(h, g)) return !1; return e(b.styles, a.requiredStyles) && e(b.attributes, a.requiredAttributes) } function e(a, b) {
                if (!b) return !0; for (var c = 0, e; c < b.length; ++c)if (e = b[c], "string" ==
                    typeof e) { if (!(e in a)) return !1 } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, e)) return !1; return !0
            } function k(a) { if (!a) return {}; a = a.split(/\s*,\s*/).sort(); for (var b = {}; a.length;)b[a.shift()] = "cke-test"; return b } function g(a) { var b, c, e, g, d = {}, h = 1; for (a = M(a); b = a.match(L);)(c = b[2]) ? (e = n(c, "styles"), g = n(c, "attrs"), c = n(c, "classes")) : e = g = c = null, d["$" + h++] = { elements: b[1], classes: c, styles: e, attributes: g }, a = a.slice(b[0].length); return d } function n(a, b) { var c = a.match(Q[b]); return c ? M(c[1]) : null }
            function q(a) { var b = a.styleBackup = a.attributes.style, c = a.classBackup = a.attributes["class"]; a.styles || (a.styles = CKEDITOR.tools.parseCssText(b || "", 1)); a.classes || (a.classes = c ? c.split(/\s+/) : []) } function u(b, c, e, g) {
                var d = 0, h; g.toHtml && (c.name = c.name.replace(N, "$1")); if (g.doCallbacks && b.elementCallbacks) { a: { h = b.elementCallbacks; for (var k = 0, m = h.length, l; k < m; ++k)if (l = h[k](c)) { h = l; break a } h = void 0 } if (h) return h } if (g.doTransform && (h = b._.transformations[c.name])) { q(c); for (k = 0; k < h.length; ++k)z(b, c, h[k]); p(c) } if (g.doFilter) {
                    a: {
                        k =
                        c.name; m = b._; b = m.allowedRules.elements[k]; h = m.allowedRules.generic; k = m.disallowedRules.elements[k]; m = m.disallowedRules.generic; l = g.skipRequired; var n = { valid: !1, validAttributes: {}, validClasses: {}, validStyles: {}, allAttributes: !1, allClasses: !1, allStyles: !1, hadInvalidAttribute: !1, hadInvalidClass: !1, hadInvalidStyle: !1 }, A, t; if (b || h) {
                            q(c); if (k) for (A = 0, t = k.length; A < t; ++A)if (!1 === a(k[A], c, n)) { b = null; break a } if (m) for (A = 0, t = m.length; A < t; ++A)a(m[A], c, n); if (b) for (A = 0, t = b.length; A < t; ++A)f(b[A], c, n, l); if (h) for (A =
                                0, t = h.length; A < t; ++A)f(h[A], c, n, l); b = n
                        } else b = null
                    } if (!b || !b.valid) return e.push(c), 1; t = b.validAttributes; var y = b.validStyles; h = b.validClasses; var k = c.attributes, M = c.styles, m = c.classes; l = c.classBackup; var C = c.styleBackup, P, G, u = [], n = [], w = /^data-cke-/; A = !1; delete k.style; delete k["class"]; delete c.classBackup; delete c.styleBackup; if (!b.allAttributes) for (P in k) t[P] || (w.test(P) ? P == (G = P.replace(/^data-cke-saved-/, "")) || t[G] || (delete k[P], A = !0) : (delete k[P], A = !0)); if (!b.allStyles || b.hadInvalidStyle) {
                        for (P in M) b.allStyles ||
                            y[P] ? u.push(P + ":" + M[P]) : A = !0; u.length && (k.style = u.sort().join("; "))
                    } else C && (k.style = C); if (!b.allClasses || b.hadInvalidClass) { for (P = 0; P < m.length; ++P)(b.allClasses || h[m[P]]) && n.push(m[P]); n.length && (k["class"] = n.sort().join(" ")); l && n.length < l.split(/\s+/).length && (A = !0) } else l && (k["class"] = l); A && (d = 1); if (!g.skipFinalValidation && !v(c)) return e.push(c), 1
                } g.toHtml && (c.name = c.name.replace(K, "cke:$1")); return d
            } function r(a) {
                var b = [], c; for (c in a) -1 < c.indexOf("*") && b.push(c.replace(/\*/g, ".*")); return b.length ?
                    new RegExp("^(?:" + b.join("|") + ")$") : null
            } function p(a) { var b = a.attributes, c; delete b.style; delete b["class"]; if (c = CKEDITOR.tools.writeCssText(a.styles, !0)) b.style = c; a.classes.length && (b["class"] = a.classes.sort().join(" ")) } function v(a) { switch (a.name) { case "a": if (!(a.children.length || a.attributes.name || a.attributes.id)) return !1; break; case "img": if (!a.attributes.src) return !1 }return !0 } function y(a) { if (!a) return !1; if (!0 === a) return !0; var b = r(a); return function (c) { return c in a || b && c.match(b) } } function t() { return new CKEDITOR.htmlParser.element("br") }
            function B(a) { return a.type == CKEDITOR.NODE_ELEMENT && ("br" == a.name || G.$block[a.name]) } function w(a, b, c) {
                var e = a.name; if (G.$empty[e] || !a.children.length) "hr" == e && "br" == b ? a.replaceWith(t()) : (a.parent && c.push({ check: "it", el: a.parent }), a.remove()); else if (G.$block[e] || "tr" == e) if ("br" == b) a.previous && !B(a.previous) && (b = t(), b.insertBefore(a)), a.next && !B(a.next) && (b = t(), b.insertAfter(a)), a.replaceWithChildren(); else {
                    var e = a.children, g; b: {
                        g = G[b]; for (var d = 0, h = e.length, k; d < h; ++d)if (k = e[d], k.type == CKEDITOR.NODE_ELEMENT &&
                            !g[k.name]) { g = !1; break b } g = !0
                    } if (g) a.name = b, a.attributes = {}, c.push({ check: "parent-down", el: a }); else {
                        g = a.parent; for (var d = g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == g.name, m, f, h = e.length; 0 < h;)k = e[--h], d && (k.type == CKEDITOR.NODE_TEXT || k.type == CKEDITOR.NODE_ELEMENT && G.$inline[k.name]) ? (m || (m = new CKEDITOR.htmlParser.element(b), m.insertAfter(a), c.push({ check: "parent-down", el: m })), m.add(k, 0)) : (m = null, f = G[g.name] || G.span, k.insertAfter(a), g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || k.type != CKEDITOR.NODE_ELEMENT ||
                            f[k.name] || c.push({ check: "el-up", el: k })); a.remove()
                    }
                } else e in { style: 1, script: 1 } ? a.remove() : (a.parent && c.push({ check: "it", el: a.parent }), a.replaceWithChildren())
            } function z(a, b, c) { var e, g; for (e = 0; e < c.length; ++e)if (g = c[e], !(g.check && !a.check(g.check, !1) || g.left && !g.left(b))) { g.right(b, O); break } } function A(a, b) {
                var c = b.getDefinition(), e = c.attributes, g = c.styles, d, h, k, m; if (a.name != c.element) return !1; for (d in e) if ("class" == d) for (c = e[d].split(/\s+/), k = a.classes.join("|"); m = c.pop();) { if (-1 == k.indexOf(m)) return !1 } else if (a.attributes[d] !=
                    e[d]) return !1; for (h in g) if (a.styles[h] != g[h]) return !1; return !0
            } function C(a, b) { var c, e; "string" == typeof a ? c = a : a instanceof CKEDITOR.style ? e = a : (c = a[0], e = a[1]); return [{ element: c, left: e, right: function (a, c) { c.transform(a, b) } }] } function D(a) { return function (b) { return A(b, a) } } function F(a) { return function (b, c) { c[a](b) } } var G = CKEDITOR.dtd, I = CKEDITOR.tools.copy, M = CKEDITOR.tools.trim, E = ["", "p", "br", "div"]; CKEDITOR.FILTER_SKIP_TREE = 2; CKEDITOR.filter = function (a, b) {
                this.allowedContent = []; this.disallowedContent =
                    []; this.elementCallbacks = null; this.disabled = !1; this.editor = null; this.id = CKEDITOR.tools.getNextNumber(); this._ = { allowedRules: { elements: {}, generic: [] }, disallowedRules: { elements: {}, generic: [] }, transformations: {}, cachedTests: {}, cachedChecks: {} }; CKEDITOR.filter.instances[this.id] = this; var c = this.editor = a instanceof CKEDITOR.editor ? a : null; if (c && !b) {
                        this.customConfig = !0; var e = c.config.allowedContent; !0 === e ? this.disabled = !0 : (e || (this.customConfig = !1), this.allow(e, "config", 1), this.allow(c.config.extraAllowedContent,
                            "extra", 1), this.allow(E[c.enterMode] + " " + E[c.shiftEnterMode], "default", 1), this.disallow(c.config.disallowedContent))
                    } else this.customConfig = !1, this.allow(b || a, "default", 1)
            }; CKEDITOR.filter.instances = {}; CKEDITOR.filter.prototype = {
                allow: function (a, c, e) {
                    if (!m(this, a, e)) return !1; var d, h; if ("string" == typeof a) a = g(a); else if (a instanceof CKEDITOR.style) {
                        if (a.toAllowedContentRules) return this.allow(a.toAllowedContentRules(this.editor), c, e); d = a.getDefinition(); a = {}; e = d.attributes; a[d.element] = d = {
                            styles: d.styles,
                            requiredStyles: d.styles && CKEDITOR.tools.object.keys(d.styles)
                        }; e && (e = I(e), d.classes = e["class"] ? e["class"].split(/\s+/) : null, d.requiredClasses = d.classes, delete e["class"], d.attributes = e, d.requiredAttributes = e && CKEDITOR.tools.object.keys(e))
                    } else if (CKEDITOR.tools.isArray(a)) { for (d = 0; d < a.length; ++d)h = this.allow(a[d], c, e); return h } b(this, a, c, this.allowedContent, this._.allowedRules); return !0
                }, applyTo: function (a, b, c, e) {
                    if (this.disabled) return !1; var g = this, d = [], h = this.editor && this.editor.config.protectedSource,
                        k, m = !1, f = { doFilter: !c, doTransform: !0, doCallbacks: !0, toHtml: b }; a.forEach(function (a) {
                            if (a.type == CKEDITOR.NODE_ELEMENT) { if ("off" == a.attributes["data-cke-filter"]) return !1; if (!b || "span" != a.name || !~CKEDITOR.tools.object.keys(a.attributes).join("|").indexOf("data-cke-")) if (k = u(g, a, d, f), k & 1) m = !0; else if (k & 2) return !1 } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                                var c; a: {
                                    var e = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, "")); c = []; var l, n, v; if (h) for (n = 0; n <
                                        h.length; ++n)if ((v = e.match(h[n])) && v[0].length == e.length) { c = !0; break a } e = CKEDITOR.htmlParser.fragment.fromHtml(e); 1 == e.children.length && (l = e.children[0]).type == CKEDITOR.NODE_ELEMENT && u(g, l, c, f); c = !c.length
                                } c || d.push(a)
                            }
                        }, null, !0); d.length && (m = !0); var l; a = []; e = E[e || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)]; for (var n; c = d.pop();)c.type == CKEDITOR.NODE_ELEMENT ? w(c, e, a) : c.remove(); for (; l = a.pop();)if (c = l.el, c.parent) switch (n = G[c.parent.name] || G.span, l.check) {
                            case "it": G.$removeEmpty[c.name] &&
                                !c.children.length ? w(c, e, a) : v(c) || w(c, e, a); break; case "el-up": c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n[c.name] || w(c, e, a); break; case "parent-down": c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n[c.name] || w(c.parent, e, a)
                        }return m
                }, checkFeature: function (a) { if (this.disabled || !a) return !0; a.toFeature && (a = a.toFeature(this.editor)); return !a.requiredContent || this.check(a.requiredContent) }, disable: function () { this.disabled = !0 }, disallow: function (a) {
                    if (!m(this, a, !0)) return !1; "string" == typeof a && (a =
                        g(a)); b(this, a, null, this.disallowedContent, this._.disallowedRules); return !0
                }, addContentForms: function (a) { if (!this.disabled && a) { var b, c, e = [], g; for (b = 0; b < a.length && !g; ++b)c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (g = c); if (g) { for (b = 0; b < a.length; ++b)e.push(C(a[b], g)); this.addTransformations(e) } } }, addElementCallback: function (a) { this.elementCallbacks || (this.elementCallbacks = []); this.elementCallbacks.push(a) }, addFeature: function (a) {
                    if (this.disabled || !a) return !0; a.toFeature &&
                        (a = a.toFeature(this.editor)); this.allow(a.allowedContent, a.name); this.addTransformations(a.contentTransformations); this.addContentForms(a.contentForms); return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
                }, addTransformations: function (a) {
                    var b, c; if (!this.disabled && a) {
                        var e = this._.transformations, g; for (g = 0; g < a.length; ++g) {
                            b = a[g]; var d = void 0, h = void 0, k = void 0, m = void 0, f = void 0, l = void 0; c = []; for (h = 0; h < b.length; ++h)k = b[h], "string" == typeof k ? (k =
                                k.split(/\s*:\s*/), m = k[0], f = null, l = k[1]) : (m = k.check, f = k.left, l = k.right), d || (d = k, d = d.element ? d.element : m ? m.match(/^([a-z0-9]+)/i)[0] : d.left.getDefinition().element), f instanceof CKEDITOR.style && (f = D(f)), c.push({ check: m == d ? null : m, left: f, right: "string" == typeof l ? F(l) : l }); b = d; e[b] || (e[b] = []); e[b].push(c)
                        }
                    }
                }, check: function (a, b, c) {
                    if (this.disabled) return !0; if (CKEDITOR.tools.isArray(a)) { for (var e = a.length; e--;)if (this.check(a[e], b, c)) return !0; return !1 } var d, h; if ("string" == typeof a) {
                        h = a + "\x3c" + (!1 === b ? "0" :
                            "1") + (c ? "1" : "0") + "\x3e"; if (h in this._.cachedChecks) return this._.cachedChecks[h]; d = g(a).$1; var m = d.styles, e = d.classes; d.name = d.elements; d.classes = e = e ? e.split(/\s*,\s*/) : []; d.styles = k(m); d.attributes = k(d.attributes); d.children = []; e.length && (d.attributes["class"] = e.join(" ")); m && (d.attributes.style = CKEDITOR.tools.writeCssText(d.styles))
                    } else d = a.getDefinition(), m = d.styles, e = d.attributes || {}, m && !CKEDITOR.tools.isEmpty(m) ? (m = I(m), e.style = CKEDITOR.tools.writeCssText(m, !0)) : m = {}, d = {
                        name: d.element, attributes: e,
                        classes: e["class"] ? e["class"].split(/\s+/) : [], styles: m, children: []
                    }; var m = CKEDITOR.tools.clone(d), f = [], l; if (!1 !== b && (l = this._.transformations[d.name])) { for (e = 0; e < l.length; ++e)z(this, d, l[e]); p(d) } u(this, m, f, { doFilter: !0, doTransform: !1 !== b, skipRequired: !c, skipFinalValidation: !c }); 0 < f.length ? c = !1 : ((b = d.attributes["class"]) && (d.attributes["class"] = d.attributes["class"].split(" ").sort().join(" ")), c = CKEDITOR.tools.objectCompare(d.attributes, m.attributes, !0), b && (d.attributes["class"] = b)); "string" == typeof a &&
                        (this._.cachedChecks[h] = c); return c
                }, getAllowedEnterMode: function () { var a = ["p", "div", "br"], b = { p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR }; return function (c, e) { var g = a.slice(), d; if (this.check(E[c])) return c; for (e || (g = g.reverse()); d = g.pop();)if (this.check(d)) return b[d]; return CKEDITOR.ENTER_BR } }(), clone: function () {
                    var a = new CKEDITOR.filter, b = CKEDITOR.tools.clone; a.allowedContent = b(this.allowedContent); a._.allowedRules = b(this._.allowedRules); a.disallowedContent = b(this.disallowedContent);
                    a._.disallowedRules = b(this._.disallowedRules); a._.transformations = b(this._.transformations); a.disabled = this.disabled; a.editor = this.editor; return a
                }, destroy: function () { delete CKEDITOR.filter.instances[this.id]; delete this._; delete this.allowedContent; delete this.disallowedContent }
            }; var R = { styles: 1, attributes: 1, classes: 1 }, J = { styles: "requiredStyles", attributes: "requiredAttributes", classes: "requiredClasses" }, L = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
                Q = { styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/ }, N = /^cke:(object|embed|param)$/, K = /^(object|embed|param)$/, O; O = CKEDITOR.filter.transformationsTools = {
                    sizeToStyle: function (a) { this.lengthToStyle(a, "width"); this.lengthToStyle(a, "height") }, sizeToAttribute: function (a) { this.lengthToAttribute(a, "width"); this.lengthToAttribute(a, "height") }, lengthToStyle: function (a, b, c) { c = c || b; if (!(c in a.styles)) { var e = a.attributes[b]; e && (/^\d+$/.test(e) && (e += "px"), a.styles[c] = e) } delete a.attributes[b] },
                    lengthToAttribute: function (a, b, c) { c = c || b; if (!(c in a.attributes)) { var e = a.styles[b], g = e && e.match(/^(\d+)(?:\.\d*)?px$/); g ? a.attributes[c] = g[1] : "cke-test" == e && (a.attributes[c] = "cke-test") } delete a.styles[b] }, alignmentToStyle: function (a) { if (!("float" in a.styles)) { var b = a.attributes.align; if ("left" == b || "right" == b) a.styles["float"] = b } delete a.attributes.align }, alignmentToAttribute: function (a) { if (!("align" in a.attributes)) { var b = a.styles["float"]; if ("left" == b || "right" == b) a.attributes.align = b } delete a.styles["float"] },
                    splitBorderShorthand: function (a) { if (a.styles.border) { var b = CKEDITOR.tools.style.parse.border(a.styles.border); b.color && (a.styles["border-color"] = b.color); b.style && (a.styles["border-style"] = b.style); b.width && (a.styles["border-width"] = b.width); delete a.styles.border } }, listTypeToStyle: function (a) {
                        if (a.attributes.type) switch (a.attributes.type) {
                            case "a": a.styles["list-style-type"] = "lower-alpha"; break; case "A": a.styles["list-style-type"] = "upper-alpha"; break; case "i": a.styles["list-style-type"] = "lower-roman";
                                break; case "I": a.styles["list-style-type"] = "upper-roman"; break; case "1": a.styles["list-style-type"] = "decimal"; break; default: a.styles["list-style-type"] = a.attributes.type
                        }
                    }, splitMarginShorthand: function (a) {
                        function b(e) { a.styles["margin-top"] = c[e[0]]; a.styles["margin-right"] = c[e[1]]; a.styles["margin-bottom"] = c[e[2]]; a.styles["margin-left"] = c[e[3]] } if (a.styles.margin) {
                            var c = a.styles.margin.match(/(auto|0|(?:\-?[\.\d]+(?:\w+|%)))/g) || ["0px"]; switch (c.length) {
                                case 1: b([0, 0, 0, 0]); break; case 2: b([0, 1, 0,
                                    1]); break; case 3: b([0, 1, 2, 1]); break; case 4: b([0, 1, 2, 3])
                            }delete a.styles.margin
                        }
                    }, matchesStyle: A, transform: function (a, b) { if ("string" == typeof b) a.name = b; else { var c = b.getDefinition(), e = c.styles, g = c.attributes, d, h, k, m; a.name = c.element; for (d in g) if ("class" == d) for (c = a.classes.join("|"), k = g[d].split(/\s+/); m = k.pop();)-1 == c.indexOf(m) && a.classes.push(m); else a.attributes[d] = g[d]; for (h in e) a.styles[h] = e[h] } }
                }
        })(); (function () {
            CKEDITOR.focusManager = function (b) {
                if (b.focusManager) return b.focusManager; this.hasFocus =
                    !1; this.currentActive = null; this._ = { editor: b }; return this
            }; CKEDITOR.focusManager._ = { blurDelay: 200 }; CKEDITOR.focusManager.prototype = {
                focus: function (b) { this._.timer && clearTimeout(this._.timer); b && (this.currentActive = b); this.hasFocus || this._.locked || ((b = CKEDITOR.currentInstance) && b.focusManager.blur(1), this.hasFocus = !0, (b = this._.editor.container) && b.addClass("cke_focus"), this._.editor.fire("focus")) }, lock: function () { this._.locked = 1 }, unlock: function () { delete this._.locked }, blur: function (b) {
                    function f() {
                        if (this.hasFocus) {
                            this.hasFocus =
                            !1; var a = this._.editor.container; a && a.removeClass("cke_focus"); this._.editor.fire("blur")
                        }
                    } if (!this._.locked) { this._.timer && clearTimeout(this._.timer); var d = CKEDITOR.focusManager._.blurDelay; b || !d ? f.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function () { delete this._.timer; f.call(this) }, d, this) }
                }, add: function (b, f) {
                    var d = b.getCustomData("focusmanager"); if (!d || d != this) {
                        d && d.remove(b); var d = "focus", a = "blur"; f && (CKEDITOR.env.ie ? (d = "focusin", a = "focusout") : CKEDITOR.event.useCapture = 1); var c = {
                            blur: function () {
                                b.equals(this.currentActive) &&
                                this.blur()
                            }, focus: function () { this.focus(b) }
                        }; b.on(d, c.focus, this); b.on(a, c.blur, this); f && (CKEDITOR.event.useCapture = 0); b.setCustomData("focusmanager", this); b.setCustomData("focusmanager_handlers", c)
                    }
                }, remove: function (b) { b.removeCustomData("focusmanager"); var f = b.removeCustomData("focusmanager_handlers"); b.removeListener("blur", f.blur); b.removeListener("focus", f.focus) }
            }
        })(); CKEDITOR.keystrokeHandler = function (b) {
            if (b.keystrokeHandler) return b.keystrokeHandler; this.keystrokes = {}; this.blockedKeystrokes =
                {}; this._ = { editor: b }; return this
        }; (function () { var b, f = function (a) { a = a.data; var c = a.getKeystroke(), d = this.keystrokes[c], h = this._.editor; b = !1 === h.fire("key", { keyCode: c, domEvent: a }); b || (d && (b = !1 !== h.execCommand(d, { from: "keystrokeHandler" })), b || (b = !!this.blockedKeystrokes[c])); b && a.preventDefault(!0); return !b }, d = function (a) { b && (b = !1, a.data.preventDefault(!0)) }; CKEDITOR.keystrokeHandler.prototype = { attach: function (a) { a.on("keydown", f, this); if (CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", d, this) } } })();
        (function () {
            CKEDITOR.lang = {
                languages: { af: 1, ar: 1, az: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, en: 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, "fr-ca": 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, "pt-br": 1, pt: 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, "sr-latn": 1, sr: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, "zh-cn": 1, zh: 1 }, rtl: { ar: 1, fa: 1, he: 1, ku: 1, ug: 1 }, load: function (b, f, d) {
                    b && CKEDITOR.lang.languages[b] ||
                    (b = this.detect(f, b)); var a = this; f = function () { a[b].dir = a.rtl[b] ? "rtl" : "ltr"; d(b, a[b]) }; this[b] ? f() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + b + ".js"), f, this)
                }, detect: function (b, f) { var d = this.languages; f = f || navigator.userLanguage || navigator.language || b; var a = f.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), c = a[1], a = a[2]; d[c + "-" + a] ? c = c + "-" + a : d[c] || (c = null); CKEDITOR.lang.detect = c ? function () { return c } : function (a) { return a }; return c || b }
            }
        })(); CKEDITOR.scriptLoader = function () {
            var b = {}, f = {}; return {
                load: function (d,
                    a, c, m) {
                        var h = "string" == typeof d; h && (d = [d]); c || (c = CKEDITOR); var l = d.length, e = l, k = [], g = [], n = function (b) { a && (h ? a.call(c, b) : a.call(c, k, g)) }; if (0 === e) n(!0); else {
                            var q = function (a, b) { (b ? k : g).push(a); 0 >= --e && (m && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), n(b)) }, u = function (a, c) { b[a] = 1; var e = f[a]; delete f[a]; for (var g = 0; g < e.length; g++)e[g](a, c) }, r = function (c) {
                                if (b[c]) q(c, !0); else {
                                    var e = f[c] || (f[c] = []); e.push(q); if (!(1 < e.length)) {
                                        var g = new CKEDITOR.dom.element("script"); g.setAttributes({
                                            type: "text/javascript",
                                            src: c
                                        }); a && (CKEDITOR.env.ie && (8 >= CKEDITOR.env.version || CKEDITOR.env.ie9Compat) ? g.$.onreadystatechange = function () { if ("loaded" == g.$.readyState || "complete" == g.$.readyState) g.$.onreadystatechange = null, u(c, !0) } : (g.$.onload = function () { setTimeout(function () { g.$.onload = null; g.$.onerror = null; u(c, !0) }, 0) }, g.$.onerror = function () { g.$.onload = null; g.$.onerror = null; u(c, !1) })); g.appendTo(CKEDITOR.document.getHead())
                                    }
                                }
                            }; m && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait"); for (var p = 0; p < l; p++)r(d[p])
                        }
                },
                queue: function () { function b() { var c; (c = a[0]) && this.load(c.scriptUrl, c.callback, CKEDITOR, 0) } var a = []; return function (c, m) { var h = this; a.push({ scriptUrl: c, callback: function () { m && m.apply(this, arguments); a.shift(); b.call(h) } }); 1 == a.length && b.call(this) } }()
            }
        }(); CKEDITOR.resourceManager = function (b, f) { this.basePath = b; this.fileName = f; this.registered = {}; this.loaded = {}; this.externals = {}; this._ = { waitingList: {} } }; CKEDITOR.resourceManager.prototype = {
            add: function (b, f) {
                if (this.registered[b]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' +
                    b + '" is already registered.'); var d = this.registered[b] = f || {}; d.name = b; d.path = this.getPath(b); CKEDITOR.fire(b + CKEDITOR.tools.capitalize(this.fileName) + "Ready", d); return this.get(b)
            }, get: function (b) { return this.registered[b] || null }, getPath: function (b) { var f = this.externals[b]; return CKEDITOR.getUrl(f && f.dir || this.basePath + b + "/") }, getFilePath: function (b) { var f = this.externals[b]; return CKEDITOR.getUrl(this.getPath(b) + (f ? f.file : this.fileName + ".js")) }, addExternal: function (b, f, d) {
                d || (f = f.replace(/[^\/]+$/,
                    function (a) { d = a; return "" })); d = d || this.fileName + ".js"; b = b.split(","); for (var a = 0; a < b.length; a++)this.externals[b[a]] = { dir: f, file: d }
            }, load: function (b, f, d) {
                CKEDITOR.tools.isArray(b) || (b = b ? [b] : []); for (var a = this.loaded, c = this.registered, m = [], h = {}, l = {}, e = 0; e < b.length; e++) { var k = b[e]; if (k) if (a[k] || c[k]) l[k] = this.get(k); else { var g = this.getFilePath(k); m.push(g); g in h || (h[g] = []); h[g].push(k) } } CKEDITOR.scriptLoader.load(m, function (b, c) {
                    if (c.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' +
                        h[c[0]].join(",") + '" was not found at "' + c[0] + '".'); for (var e = 0; e < b.length; e++)for (var g = h[b[e]], k = 0; k < g.length; k++) { var m = g[k]; l[m] = this.get(m); a[m] = 1 } f.call(d, l)
                }, this)
            }
        }; CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"); CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (b) {
            var f = {}; return function (d, a, c) {
                var m = {}, h = function (d) {
                    b.call(this, d, function (b) {
                        CKEDITOR.tools.extend(m, b); var d = [], g; for (g in b) {
                            var l = b[g], q = l && l.requires; if (!f[g]) {
                                if (l.icons) for (var u =
                                    l.icons.split(","), r = u.length; r--;)CKEDITOR.skin.addIcon(u[r], l.path + "icons/" + (CKEDITOR.env.hidpi && l.hidpi ? "hidpi/" : "") + u[r] + ".png"); l.isSupportedEnvironment = l.isSupportedEnvironment || function () { return !0 }; f[g] = 1
                            } if (q) for (q.split && (q = q.split(",")), l = 0; l < q.length; l++)m[q[l]] || d.push(q[l])
                        } if (d.length) h.call(this, d); else { for (g in m) l = m[g], l.onLoad && !l.onLoad._called && (!1 === l.onLoad() && delete m[g], l.onLoad._called = 1); a && a.call(c || window, m) }
                    }, this)
                }; h.call(this, d)
            }
        }); CKEDITOR.plugins.setLang = function (b,
            f, d) { var a = this.get(b); b = a.langEntries || (a.langEntries = {}); a = a.lang || (a.lang = []); a.split && (a = a.split(",")); -1 == CKEDITOR.tools.indexOf(a, f) && a.push(f); b[f] = d }; CKEDITOR.ui = function (b) { if (b.ui) return b.ui; this.items = {}; this.instances = {}; this.editor = b; this._ = { handlers: {} }; return this }; CKEDITOR.ui.prototype = {
                add: function (b, f, d) { d.name = b.toLowerCase(); var a = this.items[b] = { type: f, command: d.command || null, args: Array.prototype.slice.call(arguments, 2) }; CKEDITOR.tools.extend(a, d) }, get: function (b) { return this.instances[b] },
                create: function (b) { var f = this.items[b], d = f && this._.handlers[f.type], a = f && f.command && this.editor.getCommand(f.command), d = d && d.create.apply(this, f.args); this.instances[b] = d; a && a.uiItems.push(d); d && !d.type && (d.type = f.type); return d }, addHandler: function (b, f) { this._.handlers[b] = f }, space: function (b) { return CKEDITOR.document.getById(this.spaceId(b)) }, spaceId: function (b) { return this.editor.id + "_" + b }
            }; CKEDITOR.event.implementOn(CKEDITOR.ui); (function () {
                function b(b, c, e) {
                    CKEDITOR.event.call(this); b = b && CKEDITOR.tools.clone(b);
                    if (void 0 !== c) {
                        if (!(c instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element."); if (!e) throw Error("One of the element modes must be specified."); if (CKEDITOR.env.ie && CKEDITOR.env.quirks && e == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks."); if (!d(c, e)) throw Error('The specified element mode is not supported on element: "' + c.getName() + '".'); this.element = c; this.elementMode = e; this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO &&
                            (c.getId() || c.getNameAtt())
                    } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE; this._ = {}; this.commands = {}; this.templates = {}; this.name = this.name || f(); this.id = CKEDITOR.tools.getNextId(); this.status = "unloaded"; this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config); this.ui = new CKEDITOR.ui(this); this.focusManager = new CKEDITOR.focusManager(this); this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this); this.on("readOnly", a); this.on("selectionChange", function (a) { m(this, a.data.path) }); this.on("activeFilterChange",
                        function () { m(this, this.elementPath(), !0) }); this.on("mode", a); CKEDITOR.dom.selection.setupEditorOptimization(this); this.on("instanceReady", function () { if (this.config.startupFocus) { if ("end" === this.config.startupFocus) { var a = this.createRange(); a.selectNodeContents(this.editable()); a.shrink(CKEDITOR.SHRINK_ELEMENT, !0); a.collapse(); this.getSelection().selectRanges([a]) } this.focus() } }); CKEDITOR.fire("instanceCreated", null, this); CKEDITOR.add(this); CKEDITOR.tools.setTimeout(function () {
                            this.isDestroyed() ||
                            this.isDetached() || l(this, b)
                        }, 0, this)
                } function f() { do var a = "editor" + ++r; while (CKEDITOR.instances[a]); return a } function d(a, b) { return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1 } function a() { var a = this.commands, b; for (b in a) c(this, a[b]) } function c(a, b) { b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]() } function m(a, b, c) {
                    if (b) {
                        var e, g, d = a.commands;
                        for (g in d) e = d[g], (c || e.contextSensitive) && e.refresh(a, b)
                    }
                } function h(a) { var b = a.config.customConfig; if (!b) return !1; var b = CKEDITOR.getUrl(b), c = p[b] || (p[b] = {}); c.fn ? (c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && h(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function () { c.fn = c.fn || CKEDITOR.editorConfig || function () { }; h(a) }); return !0 } function l(a, b) {
                    a.on("customConfigLoaded", function () {
                        if (b) {
                            if (b.on) for (var c in b.on) a.on(c, b.on[c]); CKEDITOR.tools.extend(a.config,
                                b, !0); delete a.config.on
                        } c = a.config; a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1; a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : !1; a.tabIndex = c.tabIndex || a.element &&
                            a.element.getAttribute("tabindex") || 0; a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode; a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode; c.skin && (CKEDITOR.skinName = c.skin); a.fireOnce("configLoaded"); a.dataProcessor = new CKEDITOR.htmlDataProcessor(a); a.filter = a.activeFilter = new CKEDITOR.filter(a); e(a)
                    }); b && null != b.customConfig && (a.config.customConfig = b.customConfig); h(a) || a.fireOnce("customConfigLoaded")
                } function e(a) {
                    CKEDITOR.skin.loadPart("editor",
                        function () { k(a) })
                } function k(a) { CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function (b, c) { var e = a.config.title; a.langCode = b; a.lang = CKEDITOR.tools.prototypedCopy(c); a.title = "string" == typeof e || !1 === e ? e : [a.lang.editor, a.name].join(", "); a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir); a.fire("langLoaded"); g(a) }) } function g(a) {
                    a.getStylesSet(function (b) {
                        a.once("loaded", function () {
                            a.fire("stylesSet",
                                { styles: b })
                        }, null, null, 1); n(a)
                    })
                } function n(a) {
                    function b(a) { if (!a) return ""; CKEDITOR.tools.isArray(a) && (a = a.join(",")); return a.replace(/\s/g, "") } var c = a.config, e = b(c.plugins), g = b(c.extraPlugins), d = b(c.removePlugins); if (g) var h = new RegExp("(?:^|,)(?:" + g.replace(/,/g, "|") + ")(?\x3d,|$)", "g"), e = e.replace(h, ""), e = e + ("," + g); if (d) var k = new RegExp("(?:^|,)(?:" + d.replace(/,/g, "|") + ")(?\x3d,|$)", "g"), e = e.replace(k, ""); CKEDITOR.env.air && (e += ",adobeair"); CKEDITOR.plugins.load(e.split(","), function (b) {
                        var e =
                            [], g = [], d = []; a.plugins = CKEDITOR.tools.extend({}, a.plugins, b); for (var h in b) {
                                var m = b[h], f = m.lang, l = null, n = m.requires, z; CKEDITOR.tools.isArray(n) && (n = n.join(",")); if (n && (z = n.match(k))) for (; n = z.pop();)CKEDITOR.error("editor-plugin-required", { plugin: n.replace(",", ""), requiredBy: h }); f && !a.lang[h] && (f.split && (f = f.split(",")), 0 <= CKEDITOR.tools.indexOf(f, a.langCode) ? l = a.langCode : (l = a.langCode.replace(/-.*/, ""), l = l != a.langCode && 0 <= CKEDITOR.tools.indexOf(f, l) ? l : 0 <= CKEDITOR.tools.indexOf(f, "en") ? "en" : f[0]),
                                    m.langEntries && m.langEntries[l] ? (a.lang[h] = m.langEntries[l], l = null) : d.push(CKEDITOR.getUrl(m.path + "lang/" + l + ".js"))); g.push(l); e.push(m)
                            } CKEDITOR.scriptLoader.load(d, function () {
                                if (!a.isDestroyed() && !a.isDetached()) {
                                    for (var b = ["beforeInit", "init", "afterInit"], d = 0; d < b.length; d++)for (var h = 0; h < e.length; h++) { var k = e[h]; 0 === d && g[h] && k.lang && k.langEntries && (a.lang[k.name] = k.langEntries[g[h]]); if (k[b[d]]) k[b[d]](a) } a.fireOnce("pluginsLoaded"); c.keystrokes && a.setKeystroke(a.config.keystrokes); for (h = 0; h < a.config.blockedKeystrokes.length; h++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[h]] =
                                        1; a.status = "loaded"; a.fireOnce("loaded"); CKEDITOR.fire("instanceLoaded", null, a)
                                }
                            })
                    })
                } function q() { var a = this.element; if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) { var b = this.getData(); this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b)); a.is("textarea") ? a.setValue(b) : a.setHtml(b); return !0 } return !1 } function u(a, b) {
                    function c(a) { var b = a.startContainer, e = a.endContainer; return b.is && (b.is("tr") || b.is("td") && b.equals(e) && a.endOffset === b.getChildCount()) ? !0 : !1 } function e(a) {
                        var b = a.startContainer;
                        return b.is("tr") ? a.cloneContents() : b.clone(!0)
                    } for (var g = new CKEDITOR.dom.documentFragment, d, h, k, m = 0; m < a.length; m++) { var f = a[m], l = f.startContainer.getAscendant("tr", !0); c(f) ? (d || (d = l.getAscendant("table").clone(), d.append(l.getAscendant({ thead: 1, tbody: 1, tfoot: 1 }).clone()), g.append(d), d = d.findOne("thead, tbody, tfoot")), h && h.equals(l) || (h = l, k = l.clone(), d.append(k)), k.append(e(f))) : g.append(f.cloneContents()) } return d ? g : b.getHtmlFromRange(a[0])
                } b.prototype = CKEDITOR.editor.prototype; CKEDITOR.editor =
                    b; var r = 0, p = {}; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                        plugins: { detectConflict: function (a, b) { for (var c = 0; c < b.length; c++) { var e = b[c]; if (this[e]) return CKEDITOR.warn("editor-plugin-conflict", { plugin: a, replacedWith: e }), !0 } return !1 } }, addCommand: function (a, b) { b.name = a.toLowerCase(); var e = b instanceof CKEDITOR.command ? b : new CKEDITOR.command(this, b); this.mode && c(this, e); return this.commands[a] = e }, _attachToForm: function () {
                            function a(b) {
                                c.updateElement(); c._.required && !e.getValue() && !1 === c.fire("required") &&
                                    b.data.preventDefault()
                            } function b(a) { return !!(a && a.call && a.apply) } var c = this, e = c.element, g = new CKEDITOR.dom.element(e.$.form); e.is("textarea") && g && (g.on("submit", a), b(g.$.submit) && (g.$.submit = CKEDITOR.tools.override(g.$.submit, function (b) { return function () { a(); b.apply ? b.apply(this) : b() } })), c.on("destroy", function () { g.removeListener("submit", a) }))
                        }, destroy: function (a) {
                            var b = CKEDITOR.filter.instances, c = this; this.fire("beforeDestroy"); !a && q.call(this); this.editable(null); this.filter && delete this.filter;
                            CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(b), function (a) { a = b[a]; c === a.editor && a.destroy() }); delete this.activeFilter; this.status = "destroyed"; this.fire("destroy"); this.removeAllListeners(); CKEDITOR.remove(this); CKEDITOR.fire("instanceDestroyed", null, this)
                        }, elementPath: function (a) { if (!a) { a = this.getSelection(); if (!a) return null; a = a.getStartElement() } return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null }, createRange: function () {
                            var a = this.editable(); return a ? new CKEDITOR.dom.range(a) :
                                null
                        }, execCommand: function (a, b) { var c = this.getCommand(a), e = { name: a, commandData: b || {}, command: c }; return c && c.state != CKEDITOR.TRISTATE_DISABLED && !1 !== this.fire("beforeCommandExec", e) && (e.returnValue = c.exec(e.commandData), !c.async && !1 !== this.fire("afterCommandExec", e)) ? e.returnValue : !1 }, getCommand: function (a) { return this.commands[a] }, getData: function (a) {
                            !a && this.fire("beforeGetData"); var b = this._.data; "string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ?
                                b.getValue() : b.getHtml() : ""); b = { dataValue: b }; !a && this.fire("getData", b); return b.dataValue
                        }, getSnapshot: function () { var a = this.fire("getSnapshot"); "string" != typeof a && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : ""); return a }, loadSnapshot: function (a) { this.fire("loadSnapshot", a) }, setData: function (a, b, c) {
                            var e = !0, g = b; b && "object" == typeof b && (c = b.internal, g = b.callback, e = !b.noSnapshot); !c && e && this.fire("saveSnapshot"); if (g || !c) this.once("dataReady",
                                function (a) { !c && e && this.fire("saveSnapshot"); g && g.call(a.editor) }); a = { dataValue: a }; !c && this.fire("setData", a); this._.data = a.dataValue; !c && this.fire("afterSetData", a)
                        }, setReadOnly: function (a) { a = null == a || a; this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly")) }, insertHtml: function (a, b, c) { this.fire("insertHtml", { dataValue: a, mode: b, range: c }) }, insertText: function (a) { this.fire("insertText", a) }, insertElement: function (a) {
                            this.fire("insertElement",
                                a)
                        }, getSelectedHtml: function (a) { var b = this.editable(), c = this.getSelection(), c = c && c.getRanges(); if (!b || !c || 0 === c.length) return null; b = u(c, b); return a ? b.getHtml() : b }, extractSelectedHtml: function (a, b) { var c = this.editable(), e = this.getSelection().getRanges(), g = new CKEDITOR.dom.documentFragment, d; if (!c || 0 === e.length) return null; for (d = 0; d < e.length; d++)g.append(c.extractHtmlFromRange(e[d], b)); b || this.getSelection().selectRanges([e[0]]); return a ? g.getHtml() : g }, focus: function () { this.fire("beforeFocus") }, checkDirty: function () {
                            return "ready" ==
                                this.status && this._.previousValue !== this.getSnapshot()
                        }, resetDirty: function () { this._.previousValue = this.getSnapshot() }, updateElement: function () { return q.call(this) }, setKeystroke: function () { for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [[].slice.call(arguments, 0)], c, e, g = b.length; g--;)c = b[g], e = 0, CKEDITOR.tools.isArray(c) && (e = c[1], c = c[0]), e ? a[c] = e : delete a[c] }, getCommandKeystroke: function (a, b) {
                            var c = "string" === typeof a ? this.getCommand(a) : a, e = []; if (c) {
                                var g =
                                    CKEDITOR.tools.object.findKey(this.commands, c), d = this.keystrokeHandler.keystrokes; if (c.fakeKeystroke) e.push(c.fakeKeystroke); else for (var h in d) d[h] === g && e.push(h)
                            } return b ? e : e[0] || null
                        }, addFeature: function (a) { return this.filter.addFeature(a) }, setActiveFilter: function (a) {
                            a || (a = this.filter); this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode,
                                !0)))
                        }, setActiveEnterMode: function (a, b) { a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode; b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode; if (this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange") }, showNotification: function (a) { alert(a) }, isDetached: function () { return !!this.container && this.container.isDetached() }, isDestroyed: function () { return "destroyed" === this.status }
                    }); CKEDITOR.editor._getEditorElement =
                        function (a) { if (!CKEDITOR.env.isCompatible) return null; var b = CKEDITOR.dom.element.get(a); return b ? b.getEditor() ? (CKEDITOR.error("editor-element-conflict", { editorName: b.getEditor().name }), null) : b : (CKEDITOR.error("editor-incorrect-element", { element: a }), null) }
            })(); CKEDITOR.ELEMENT_MODE_NONE = 0; CKEDITOR.ELEMENT_MODE_REPLACE = 1; CKEDITOR.ELEMENT_MODE_APPENDTO = 2; CKEDITOR.ELEMENT_MODE_INLINE = 3; CKEDITOR.htmlParser = function () { this._ = { htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--!?>)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g } };
        (function () {
            var b = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, f = { checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1 }; CKEDITOR.htmlParser.prototype = {
                onTagOpen: function () { }, onTagClose: function () { }, onText: function () { }, onCDATA: function () { }, onComment: function () { }, parse: function (d) {
                    for (var a, c, m = 0, h; a = this._.htmlPartsRegex.exec(d);) {
                        c = a.index; if (c > m) if (m = d.substring(m, c), h) h.push(m); else this.onText(m);
                        m = this._.htmlPartsRegex.lastIndex; if (c = a[1]) if (c = c.toLowerCase(), h && CKEDITOR.dtd.$cdata[c] && (this.onCDATA(h.join("")), h = null), !h) { this.onTagClose(c); continue } if (h) h.push(a[0]); else if (c = a[3]) { if (c = c.toLowerCase(), !/="/.test(c)) { var l = {}, e, k = a[4]; a = !!a[5]; if (k) for (; e = b.exec(k);) { var g = e[1].toLowerCase(); e = e[2] || e[3] || e[4] || ""; l[g] = !e && f[g] ? g : CKEDITOR.tools.htmlDecodeAttr(e) } this.onTagOpen(c, l, a); !h && CKEDITOR.dtd.$cdata[c] && (h = []) } } else if (c = a[2]) this.onComment(c)
                    } if (d.length > m) this.onText(d.substring(m,
                        d.length))
                }
            }
        })(); CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
            $: function () { this._ = { output: [] } }, proto: {
                openTag: function (b) { this._.output.push("\x3c", b) }, openTagClose: function (b, f) { f ? this._.output.push(" /\x3e") : this._.output.push("\x3e") }, attribute: function (b, f) { "string" == typeof f && (f = CKEDITOR.tools.htmlEncodeAttr(f)); this._.output.push(" ", b, '\x3d"', f, '"') }, closeTag: function (b) { this._.output.push("\x3c/", b, "\x3e") }, text: function (b) { this._.output.push(b) }, comment: function (b) {
                    this._.output.push("\x3c!--",
                        b, "--\x3e")
                }, write: function (b) { this._.output.push(b) }, reset: function () { this._.output = []; this._.indent = !1 }, getHtml: function (b) { var f = this._.output.join(""); b && this.reset(); return f }
            }
        }); "use strict"; (function () {
            CKEDITOR.htmlParser.node = function () { }; CKEDITOR.htmlParser.node.prototype = {
                remove: function () { var b = this.parent.children, f = CKEDITOR.tools.indexOf(b, this), d = this.previous, a = this.next; d && (d.next = a); a && (a.previous = d); b.splice(f, 1); this.parent = null }, replaceWith: function (b) {
                    var f = this.parent.children,
                    d = CKEDITOR.tools.indexOf(f, this), a = b.previous = this.previous, c = b.next = this.next; a && (a.next = b); c && (c.previous = b); f[d] = b; b.parent = this.parent; this.parent = null
                }, insertAfter: function (b) { var f = b.parent.children, d = CKEDITOR.tools.indexOf(f, b), a = b.next; f.splice(d + 1, 0, this); this.next = b.next; this.previous = b; b.next = this; a && (a.previous = this); this.parent = b.parent }, insertBefore: function (b) {
                    var f = b.parent.children, d = CKEDITOR.tools.indexOf(f, b); f.splice(d, 0, this); this.next = b; (this.previous = b.previous) && (b.previous.next =
                        this); b.previous = this; this.parent = b.parent
                }, getAscendant: function (b) { var f = "function" == typeof b ? b : "string" == typeof b ? function (a) { return a.name == b } : function (a) { return a.name in b }, d = this.parent; for (; d && d.type == CKEDITOR.NODE_ELEMENT;) { if (f(d)) return d; d = d.parent } return null }, wrapWith: function (b) { this.replaceWith(b); b.add(this); return b }, getIndex: function () { return CKEDITOR.tools.indexOf(this.parent.children, this) }, getFilterContext: function (b) { return b || {} }
            }
        })(); "use strict"; CKEDITOR.htmlParser.comment =
            function (b) { this.value = b; this._ = { isBlockLike: !1 } }; CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_COMMENT, filter: function (b, f) { var d = this.value; if (!(d = b.onComment(f, d, this))) return this.remove(), !1; if ("string" != typeof d) return this.replaceWith(d), !1; this.value = d; return !0 }, writeHtml: function (b, f) { f && this.filter(f); b.comment(this.value) } }); "use strict"; (function () {
                CKEDITOR.htmlParser.text = function (b) { this.value = b; this._ = { isBlockLike: !1 } };
                CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function (b, f) { if (!(this.value = b.onText(f, this.value, this))) return this.remove(), !1 }, writeHtml: function (b, f) { f && this.filter(f); b.text(this.value) } })
            })(); "use strict"; (function () { CKEDITOR.htmlParser.cdata = function (b) { this.value = b }; CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function () { }, writeHtml: function (b) { b.write(this.value) } }) })();
        "use strict"; CKEDITOR.htmlParser.fragment = function () { this.children = []; this.parent = null; this._ = { isBlockLike: !0, hasInlineStarted: !1 } }; (function () {
            function b(a) { return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name] } var f = CKEDITOR.tools.extend({ table: 1, ul: 1, ol: 1, dl: 1 }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), d = { ol: 1, ul: 1 }, a = CKEDITOR.tools.extend({}, { html: 1 }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
                style: 1,
                script: 1
            }), c = { ul: "li", ol: "li", dl: "dd", table: "tbody", tbody: "tr", thead: "tr", tfoot: "tr", tr: "td" }; CKEDITOR.htmlParser.fragment.fromHtml = function (m, h, l) {
                function e(a) { var b; if (0 < v.length) for (var c = 0; c < v.length; c++) { var e = v[c], g = e.name, d = CKEDITOR.dtd[g], h = t.name && CKEDITOR.dtd[t.name]; h && !h[g] || a && d && !d[a] && CKEDITOR.dtd[a] ? g == t.name && (n(t, t.parent, 1), c--) : (b || (k(), b = 1), e = e.clone(), e.parent = t, t = e, v.splice(c, 1), c--) } } function k() { for (; y.length;)n(y.shift(), t) } function g(a) {
                    if (a._.isBlockLike && "pre" != a.name &&
                        "textarea" != a.name) { var b = a.children.length, c = a.children[b - 1], e; c && c.type == CKEDITOR.NODE_TEXT && ((e = CKEDITOR.tools.rtrim(c.value)) ? c.value = e : a.children.length = b - 1) }
                } function n(a, c, e) { c = c || t || p; var d = t; void 0 === a.previous && (q(c, a) && (t = c, r.onTagOpen(l, {}), a.returnPoint = c = t), g(a), b(a) && !a.children.length || c.add(a), "pre" == a.name && (w = !1), "textarea" == a.name && (B = !1)); a.returnPoint ? (t = a.returnPoint, delete a.returnPoint) : t = e ? c : d } function q(a, b) {
                    if ((a == p || "body" == a.name) && l && (!a.name || CKEDITOR.dtd[a.name][l])) {
                        var c,
                        e; return (c = b.attributes && (e = b.attributes["data-cke-real-element-type"]) ? e : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                    }
                } function u(a, b) { return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1 } var r = new CKEDITOR.htmlParser, p = h instanceof CKEDITOR.htmlParser.element ? h : "string" == typeof h ? new CKEDITOR.htmlParser.element(h) : new CKEDITOR.htmlParser.fragment, v = [], y = [], t = p, B = "textarea" == p.name,
                    w = "pre" == p.name; r.onTagOpen = function (c, g, h, m) {
                        g = new CKEDITOR.htmlParser.element(c, g); g.isUnknown && h && (g.isEmpty = !0); g.isOptionalClose = m; if (b(g)) v.push(g); else {
                            if ("pre" == c) w = !0; else { if ("br" == c && w) { t.add(new CKEDITOR.htmlParser.text("\n")); return } "textarea" == c && (B = !0) } if ("br" == c) y.push(g); else {
                                for (; !(m = (h = t.name) ? CKEDITOR.dtd[h] || (t._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : a, g.isUnknown || t.isUnknown || m[c]);)if (t.isOptionalClose) r.onTagClose(h); else if (c in d && h in d) h = t.children, (h = h[h.length -
                                    1]) && "li" == h.name || n(h = new CKEDITOR.htmlParser.element("li"), t), !g.returnPoint && (g.returnPoint = t), t = h; else if (c in CKEDITOR.dtd.$listItem && !u(c, h)) r.onTagOpen("li" == c ? "ul" : "dl", {}, 0, 1); else if (h in f && !u(c, h)) !g.returnPoint && (g.returnPoint = t), t = t.parent; else if (h in CKEDITOR.dtd.$inline && v.unshift(t), t.parent) n(t, t.parent, 1); else { g.isOrphan = 1; break } e(c); k(); g.parent = t; g.isEmpty ? n(g) : t = g
                            }
                        }
                    }; r.onTagClose = function (a) {
                        for (var b = v.length - 1; 0 <= b; b--)if (a == v[b].name) { v.splice(b, 1); return } for (var c = [], e =
                            [], g = t; g != p && g.name != a;)g._.isBlockLike || e.unshift(g), c.push(g), g = g.returnPoint || g.parent; if (g != p) { for (b = 0; b < c.length; b++) { var d = c[b]; n(d, d.parent) } t = g; g._.isBlockLike && k(); n(g, g.parent); g == t && (t = t.parent); v = v.concat(e) } "body" == a && (l = !1)
                    }; r.onText = function (b) {
                        if (!(t._.hasInlineStarted && !y.length || w || B) && (b = CKEDITOR.tools.ltrim(b), 0 === b.length)) return; var g = t.name, d = g ? CKEDITOR.dtd[g] || (t._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : a; if (!B && !d["#"] && g in f) r.onTagOpen(c[g] || ""), r.onText(b); else {
                            k();
                            e(); w || B || (b = b.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")); b = new CKEDITOR.htmlParser.text(b); if (q(t, b)) this.onTagOpen(l, {}, 0, 1); t.add(b)
                        }
                    }; r.onCDATA = function (a) { t.add(new CKEDITOR.htmlParser.cdata(a)) }; r.onComment = function (a) { k(); e(); t.add(new CKEDITOR.htmlParser.comment(a)) }; r.parse(m); for (k(); t != p;)n(t, t.parent, 1); g(p); return p
            }; CKEDITOR.htmlParser.fragment.prototype = {
                type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, add: function (a, b) {
                    isNaN(b) && (b = this.children.length); var c = 0 < b ? this.children[b - 1] : null; if (c) {
                        if (a._.isBlockLike &&
                            c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value), 0 === c.value.length)) { this.children.pop(); this.add(a); return } c.next = a
                    } a.previous = c; a.parent = this; this.children.splice(b, 0, a); this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
                }, filter: function (a, b) { b = this.getFilterContext(b); a.onRoot(b, this); this.filterChildren(a, !1, b) }, filterChildren: function (a, b, c) {
                    if (this.childrenFilteredBy != a.id) {
                        c = this.getFilterContext(c);
                        if (b && !this.parent) a.onRoot(c, this); this.childrenFilteredBy = a.id; for (b = 0; b < this.children.length; b++)!1 === this.children[b].filter(a, c) && b--
                    }
                }, writeHtml: function (a, b) { b && this.filter(b); this.writeChildrenHtml(a) }, writeChildrenHtml: function (a, b, c) { var e = this.getFilterContext(); if (c && !this.parent && b) b.onRoot(e, this); b && this.filterChildren(b, !1, e); b = 0; c = this.children; for (e = c.length; b < e; b++)c[b].writeHtml(a) }, forEach: function (a, b, c) {
                    if (!(c || b && this.type != b)) var e = a(this); if (!1 !== e) {
                        c = this.children; for (var d =
                            0; d < c.length; d++)e = c[d], e.type == CKEDITOR.NODE_ELEMENT ? e.forEach(a, b) : b && e.type != b || a(e)
                    }
                }, getFilterContext: function (a) { return a || {} }
            }
        })(); "use strict"; (function () {
            function b() { this.rules = [] } function f(d, a, c, m) { var h, f; for (h in a) (f = d[h]) || (f = d[h] = new b), f.add(a[h], c, m) } CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
                $: function (d) {
                    this.id = CKEDITOR.tools.getNextNumber(); this.elementNameRules = new b; this.attributeNameRules = new b; this.elementsRules = {}; this.attributesRules = {}; this.textRules = new b;
                    this.commentRules = new b; this.rootRules = new b; d && this.addRules(d, 10)
                }, proto: {
                    addRules: function (b, a) {
                        var c; "number" == typeof a ? c = a : a && "priority" in a && (c = a.priority); "number" != typeof c && (c = 10); "object" != typeof a && (a = {}); b.elementNames && this.elementNameRules.addMany(b.elementNames, c, a); b.attributeNames && this.attributeNameRules.addMany(b.attributeNames, c, a); b.elements && f(this.elementsRules, b.elements, c, a); b.attributes && f(this.attributesRules, b.attributes, c, a); b.text && this.textRules.add(b.text, c, a); b.comment &&
                            this.commentRules.add(b.comment, c, a); b.root && this.rootRules.add(b.root, c, a)
                    }, applyTo: function (b) { b.filter(this) }, onElementName: function (b, a) { return this.elementNameRules.execOnName(b, a) }, onAttributeName: function (b, a) { return this.attributeNameRules.execOnName(b, a) }, onText: function (b, a, c) { return this.textRules.exec(b, a, c) }, onComment: function (b, a, c) { return this.commentRules.exec(b, a, c) }, onRoot: function (b, a) { return this.rootRules.exec(b, a) }, onElement: function (b, a) {
                        for (var c = [this.elementsRules["^"], this.elementsRules[a.name],
                        this.elementsRules.$], m, h = 0; 3 > h; h++)if (m = c[h]) { m = m.exec(b, a, this); if (!1 === m) return null; if (m && m != a) return this.onNode(b, m); if (a.parent && !a.name) break } return a
                    }, onNode: function (b, a) { var c = a.type; return c == CKEDITOR.NODE_ELEMENT ? this.onElement(b, a) : c == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(b, a.value, a)) : c == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(b, a.value, a)) : null }, onAttribute: function (b, a, c, m) { return (c = this.attributesRules[c]) ? c.exec(b, m, a, this) : m }
                }
            });
            CKEDITOR.htmlParser.filterRulesGroup = b; b.prototype = {
                add: function (b, a, c) { this.rules.splice(this.findIndex(a), 0, { value: b, priority: a, options: c }) }, addMany: function (b, a, c) { for (var m = [this.findIndex(a), 0], h = 0, f = b.length; h < f; h++)m.push({ value: b[h], priority: a, options: c }); this.rules.splice.apply(this.rules, m) }, findIndex: function (b) { for (var a = this.rules, c = a.length - 1; 0 <= c && b < a[c].priority;)c--; return c + 1 }, exec: function (b, a) {
                    var c = a instanceof CKEDITOR.htmlParser.node || a instanceof CKEDITOR.htmlParser.fragment,
                    m = Array.prototype.slice.call(arguments, 1), h = this.rules, f = h.length, e, k, g, n; for (n = 0; n < f; n++)if (c && (e = a.type, k = a.name), g = h[n], !(b.nonEditable && !g.options.applyToAll || b.nestedEditable && g.options.excludeNestedEditable)) { g = g.value.apply(null, m); if (!1 === g || c && g && (g.name != k || g.type != e)) return g; null != g && (m[0] = a = g) } return a
                }, execOnName: function (b, a) {
                    for (var c = 0, m = this.rules, h = m.length, f; a && c < h; c++)f = m[c], b.nonEditable && !f.options.applyToAll || b.nestedEditable && f.options.excludeNestedEditable || (a = a.replace(f.value[0],
                        f.value[1])); return a
                }
            }
        })(); (function () {
            function b(b, e) {
                function g(a) { return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", { "data-cke-bogus": 1 }) } function k(b, c) {
                    return function (e) {
                        if (e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            var h = [], k = d(e), l, q; if (k) for (f(k, 1) && h.push(k); k;)m(k) && (l = a(k)) && f(l) && ((q = a(l)) && !m(q) ? h.push(l) : (g(n).insertAfter(l), l.remove())), k = k.previous; for (k = 0; k < h.length; k++)h[k].remove(); if (h = !b || !1 !== ("function" == typeof c ? c(e) :
                                c)) n || CKEDITOR.env.needsBrFiller || e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ? n || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || e.name in CKEDITOR.dtd.tr || e.name in CKEDITOR.dtd.$listItem) ? (h = d(e), h = !h || "form" == e.name && "input" == h.name) : h = !1 : h = !1; h && e.add(g(b))
                        }
                    }
                } function f(a, b) {
                    if ((!n || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0; var c; return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(y)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0,
                        c.index))).insertBefore(a), a.value = c[0]), !CKEDITOR.env.needsBrFiller && n && (!b || a.parent.name in q) || !n && ((c = a.previous) && "br" == c.name || !c || m(c))) ? !0 : !1
                } var l = { elements: {} }, n = "html" == e, q = CKEDITOR.tools.extend({}, z), A; for (A in q) "#" in B[A] || delete q[A]; for (A in q) l.elements[A] = k(n, b.config.fillEmptyBlocks); l.root = k(n, !1); l.elements.br = function (b) {
                    return function (e) {
                        if (e.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            var d = e.attributes; if ("data-cke-bogus" in d || "data-cke-eol" in d) delete d["data-cke-bogus"];
                            else { for (d = e.next; d && c(d);)d = d.next; var k = a(e); !d && m(e.parent) ? h(e.parent, g(b)) : m(d) && k && !m(k) && g(b).insertBefore(d) }
                        }
                    }
                }(n); return l
            } function f(a, b) { return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 } function d(a) { for (a = a.children[a.children.length - 1]; a && c(a);)a = a.previous; return a } function a(a) { for (a = a.previous; a && c(a);)a = a.previous; return a } function c(a) { return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"] }
            function m(a) { return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in z || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) } function h(a, b) { var c = a.children[a.children.length - 1]; a.children.push(b); b.parent = a; c && (c.next = b, b.previous = c) } function l(a) { a = a.attributes; "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1); a.contenteditable = "false" } function e(a) { a = a.attributes; switch (a["data-cke-editable"]) { case "true": a.contenteditable = "true"; break; case "1": delete a.contenteditable } } function k(a) {
                return a.replace(G,
                    function (a, b, c) { return "\x3c" + b + c.replace(I, function (a, b) { return M.test(b) && -1 == c.indexOf("data-cke-saved-" + b) ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a }) + "\x3e" })
            } function g(a, b) { return a.replace(b, function (a, b, c) { 0 === a.indexOf("\x3ctextarea") && (a = b + u(c).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") + "\x3c/textarea\x3e"); return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e" }) } function n(a) { return a.replace(J, function (a, b) { return decodeURIComponent(b) }) } function q(a) {
                return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
                    function (a) { return "\x3c!--" + t + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e" })
            } function u(a) { return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }) } function r(a, b) { var c = b._.dataStore; return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }).replace(/\{cke_protected_(\d+)\}/g, function (a, b) { return c && c[b] || "" }) } function p(a, b) {
                var c = [], e = b.config.protectedSource, g = b._.dataStore || (b._.dataStore =
                    { id: 1 }), d = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g, e = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(e); a = a.replace(/\x3c!--[\s\S]*?--\x3e/g, function (a) { return "\x3c!--{cke_tempcomment}" + (c.push(a) - 1) + "--\x3e" }); for (var h = 0; h < e.length; h++)a = a.replace(e[h], function (a) { a = a.replace(d, function (a, b, e) { return c[e] }); return /cke_temp(comment)?/.test(a) ? a : "\x3c!--{cke_temp}" + (c.push(a) - 1) + "--\x3e" }); a = a.replace(d, function (a, b, e) {
                        return "\x3c!--" + t + (b ? "{C}" :
                            "") + encodeURIComponent(c[e]).replace(/--/g, "%2D%2D") + "--\x3e"
                    }); a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function (a) { return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function (a, b) { g[g.id] = decodeURIComponent(b); return "{cke_protected_" + g.id++ + "}" }) }); return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function (a, c, e, g) { return "\x3c" + c + e + "\x3e" + r(u(g), b) + "\x3c/" + c + "\x3e" })
            } var v; CKEDITOR.htmlDataProcessor = function (a) {
                var c,
                e, d = this; this.editor = a; this.dataFilter = c = new CKEDITOR.htmlParser.filter; this.htmlFilter = e = new CKEDITOR.htmlParser.filter; this.writer = new CKEDITOR.htmlParser.basicWriter; c.addRules(A); c.addRules(C, { applyToAll: !0 }); c.addRules(b(a, "data"), { applyToAll: !0 }); e.addRules(D); e.addRules(F, { applyToAll: !0 }); e.addRules(b(a, "html"), { applyToAll: !0 }); a.on("toHtml", function (b) {
                    b = b.data; var c = b.dataValue, e, c = v(c), c = p(c, a), c = g(c, R), c = k(c), c = g(c, E), c = c.replace(L, "$1cke:$2"), c = c.replace(N, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),
                        c = c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), c = c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2"); e = b.context || a.editable().getName(); var d; CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" == e && (e = "div", c = "\x3cpre\x3e" + c + "\x3c/pre\x3e", d = 1); e = a.document.createElement(e); e.setHtml("a" + c); c = e.getHtml().substr(1); c = c.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), ""); d && (c = c.replace(/^<pre>|<\/pre>$/gi, "")); c = c.replace(Q, "$1$2"); c = n(c); c = u(c); e = !1 === b.fixForBody ? !1 :
                            f(b.enterMode, a.config.autoParagraph); c = CKEDITOR.htmlParser.fragment.fromHtml(c, b.context, e); e && (d = c, !d.children.length && CKEDITOR.dtd[d.name][e] && (e = new CKEDITOR.htmlParser.element(e), d.add(e))); b.dataValue = c
                }, null, null, 5); a.on("toHtml", function (b) { b.data.filter.applyTo(b.data.dataValue, !0, b.data.dontFilter, b.data.enterMode) && a.fire("dataFiltered") }, null, null, 6); a.on("toHtml", function (a) { a.data.dataValue.filterChildren(d.dataFilter, !0) }, null, null, 10); a.on("toHtml", function (a) {
                    a = a.data; var b = a.dataValue,
                        c = new CKEDITOR.htmlParser.basicWriter; b.writeChildrenHtml(c); b = c.getHtml(!0); a.dataValue = q(b)
                }, null, null, 15); a.on("toDataFormat", function (b) { var c = b.data.dataValue; b.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, "")); b.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, b.data.context, f(b.data.enterMode, a.config.autoParagraph)) }, null, null, 5); a.on("toDataFormat", function (a) { a.data.dataValue.filterChildren(d.htmlFilter, !0) }, null, null, 10); a.on("toDataFormat", function (a) {
                    a.data.filter.applyTo(a.data.dataValue,
                        !1, !0)
                }, null, null, 11); a.on("toDataFormat", function (b) { var c = b.data.dataValue, e = d.writer; e.reset(); c.writeChildrenHtml(e); c = e.getHtml(!0); c = u(c); c = r(c, a); b.data.dataValue = c }, null, null, 15)
            }; CKEDITOR.htmlDataProcessor.prototype = {
                toHtml: function (a, b, c, e) {
                    var g = this.editor, d, h, k, m; b && "object" == typeof b ? (d = b.context, c = b.fixForBody, e = b.dontFilter, h = b.filter, k = b.enterMode, m = b.protectedWhitespaces) : d = b; d || null === d || (d = g.editable().getName()); return g.fire("toHtml", {
                        dataValue: a, context: d, fixForBody: c, dontFilter: e,
                        filter: h || g.filter, enterMode: k || g.enterMode, protectedWhitespaces: m
                    }).dataValue
                }, toDataFormat: function (a, b) { var c, e, g; b && (c = b.context, e = b.filter, g = b.enterMode); c || null === c || (c = this.editor.editable().getName()); return this.editor.fire("toDataFormat", { dataValue: a, filter: e || this.editor.filter, context: c, enterMode: g || this.editor.enterMode }).dataValue }, protectSource: function (a) { return p(a, this.editor) }, unprotectSource: function (a) { return r(a, this.editor) }
            }; var y = /(?:&nbsp;|\xa0)$/, t = "{cke_protected}", B = CKEDITOR.dtd,
                w = "caption colgroup col thead tfoot tbody".split(" "), z = CKEDITOR.tools.extend({}, B.$blockLimit, B.$block), A = { elements: { input: l, textarea: l } }, C = { attributeNames: [[/^on/, "data-cke-pa-on"], [/^srcdoc/, "data-cke-pa-srcdoc"], [/^data-cke-expando$/, ""]], elements: { iframe: function (a) { if (a.attributes && a.attributes.src) { var b = a.attributes.src.toLowerCase().replace(/[^a-z]/gi, ""); if (0 === b.indexOf("javascript") || 0 === b.indexOf("data")) a.attributes["data-cke-pa-src"] = a.attributes.src, delete a.attributes.src } } } }, D = {
                    elements: {
                        embed: function (a) {
                            var b =
                                a.parent; if (b && "object" == b.name) { var c = b.attributes.width, b = b.attributes.height; c && (a.attributes.width = c); b && (a.attributes.height = b) }
                        }, a: function (a) { var b = a.attributes; if (!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"])) return !1 }
                    }
                }, F = {
                    elementNames: [[/^cke:/, ""], [/^\?xml:namespace$/, ""]], attributeNames: [[/^data-cke-(saved|pa)-/, ""], [/^data-cke-.*/, ""], ["hidefocus", ""]], elements: {
                        $: function (a) {
                            var b = a.attributes; if (b) {
                                if (b["data-cke-temp"]) return !1; for (var c = ["name", "href", "src"],
                                    e, g = 0; g < c.length; g++)e = "data-cke-saved-" + c[g], e in b && delete b[c[g]]
                            } return a
                        }, table: function (a) { a.children.slice(0).sort(function (a, b) { var c, e; a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(w, a.name), e = CKEDITOR.tools.indexOf(w, b.name)); -1 < c && -1 < e && c != e || (c = a.parent ? a.getIndex() : -1, e = b.parent ? b.getIndex() : -1); return c > e ? 1 : -1 }) }, param: function (a) { a.children = []; a.isEmpty = !0; return a }, span: function (a) { "Apple-style-span" == a.attributes["class"] && delete a.name }, html: function (a) {
                            delete a.attributes.contenteditable;
                            delete a.attributes["class"]
                        }, body: function (a) { delete a.attributes.spellcheck; delete a.attributes.contenteditable }, style: function (a) { var b = a.children[0]; b && b.value && (b.value = CKEDITOR.tools.trim(b.value)); a.attributes.type || (a.attributes.type = "text/css") }, title: function (a) { var b = a.children[0]; !b && h(a, b = new CKEDITOR.htmlParser.text); b.value = a.attributes["data-cke-title"] || "" }, input: e, textarea: e
                    }, attributes: { "class": function (a) { return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1 } }
                };
            CKEDITOR.env.ie && (F.attributes.style = function (a) { return a.replace(/(^|;)([^\:]+)/g, function (a) { return a.toLowerCase() }) }); var G = /<(a|area|img|input|source)\b([^>]*)>/gi, I = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, M = /^(href|src|name)$/i, E = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, R = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, J = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, L = /(<\/?)((?:object|embed|param|html|body|head|title)([\s][^>]*)?>)/gi,
                Q = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, N = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi; v = function () {
                    function a(c) { return CKEDITOR.tools.array.reduce(c.split(""), function (a, c) { var e = c.toLowerCase(), g = c.toUpperCase(), d = b(e); e !== g && (d += "|" + b(g)); return a + ("(" + d + ")") }, "") } function b(a) { var c; c = a.charCodeAt(0); var e = c.toString(16); c = { htmlCode: "\x26#" + c + ";?", hex: "\x26#x0*" + e + ";?", entity: { "\x3c": "\x26lt;", "\x3e": "\x26gt;", ":": "\x26colon;" }[a] }; for (var g in c) c[g] && (a += "|" + c[g]); return a } var c =
                        new RegExp("(" + a("\x3ccke:encoded\x3e") + "(.*?)" + a("\x3c/cke:encoded\x3e") + ")|(" + a("\x3c") + a("/") + "?" + a("cke:encoded\x3e") + ")", "gi"), e = new RegExp("((" + a("{cke_protected") + ")(_[0-9]*)?" + a("}") + ")", "gi"); return function (a) { return a.replace(c, "").replace(e, "") }
                }()
        })(); "use strict"; CKEDITOR.htmlParser.element = function (b, f) {
            this.name = b; this.attributes = f || {}; this.children = []; var d = b || "", a = d.match(/^cke:(.*)/); a && (d = a[1]); d = !!(CKEDITOR.dtd.$nonBodyContent[d] || CKEDITOR.dtd.$block[d] || CKEDITOR.dtd.$listItem[d] ||
                CKEDITOR.dtd.$tableContent[d] || CKEDITOR.dtd.$nonEditable[d] || "br" == d); this.isEmpty = !!CKEDITOR.dtd.$empty[b]; this.isUnknown = !CKEDITOR.dtd[b]; this._ = { isBlockLike: d, hasInlineStarted: this.isEmpty || !d }
        }; CKEDITOR.htmlParser.cssStyle = function (b) {
            var f = {}; ((b instanceof CKEDITOR.htmlParser.element ? b.attributes.style : b) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (b, a, c) { "font-family" == a && (c = c.replace(/["']/g, "")); f[a.toLowerCase()] = c }); return {
                rules: f, populate: function (b) {
                    var a =
                        this.toString(); a && (b instanceof CKEDITOR.dom.element ? b.setAttribute("style", a) : b instanceof CKEDITOR.htmlParser.element ? b.attributes.style = a : b.style = a)
                }, toString: function () { var b = [], a; for (a in f) f[a] && b.push(a, ":", f[a], ";"); return b.join("") }
            }
        }; (function () {
            function b(a) { return function (b) { return b.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? b.name == a : b.name in a) } } var f = function (a, b) { a = a[0]; b = b[0]; return a < b ? -1 : a > b ? 1 : 0 }, d = CKEDITOR.htmlParser.fragment.prototype; CKEDITOR.htmlParser.element.prototype =
                CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                    type: CKEDITOR.NODE_ELEMENT, add: d.add, clone: function () { return new CKEDITOR.htmlParser.element(this.name, this.attributes) }, filter: function (a, b) {
                        var d = this, h, f; b = d.getFilterContext(b); if (!d.parent) a.onRoot(b, d); for (; ;) {
                            h = d.name; if (!(f = a.onElementName(b, h))) return this.remove(), !1; d.name = f; if (!(d = a.onElement(b, d))) return this.remove(), !1; if (d !== this) return this.replaceWith(d), !1; if (d.name == h) break; if (d.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(d),
                                !1; if (!d.name) return this.replaceWithChildren(), !1
                        } h = d.attributes; var e, k; for (e in h) { for (f = h[e]; ;)if (k = a.onAttributeName(b, e)) if (k != e) delete h[e], e = k; else break; else { delete h[e]; break } k && (!1 === (f = a.onAttribute(b, d, k, f)) ? delete h[k] : h[k] = f) } d.isEmpty || this.filterChildren(a, !1, b); return !0
                    }, filterChildren: d.filterChildren, writeHtml: function (a, b) {
                        b && this.filter(b); var d = this.name, h = [], l = this.attributes, e, k; a.openTag(d, l); for (e in l) h.push([e, l[e]]); a.sortAttributes && h.sort(f); e = 0; for (k = h.length; e < k; e++)l =
                            h[e], a.attribute(l[0], l[1]); a.openTagClose(d, this.isEmpty); this.writeChildrenHtml(a); this.isEmpty || a.closeTag(d)
                    }, writeChildrenHtml: d.writeChildrenHtml, replaceWithChildren: function () { for (var a = this.children, b = a.length; b;)a[--b].insertAfter(this); this.remove() }, forEach: d.forEach, getFirst: function (a) { if (!a) return this.children.length ? this.children[0] : null; "function" != typeof a && (a = b(a)); for (var c = 0, d = this.children.length; c < d; ++c)if (a(this.children[c])) return this.children[c]; return null }, getHtml: function () {
                        var a =
                            new CKEDITOR.htmlParser.basicWriter; this.writeChildrenHtml(a); return a.getHtml()
                    }, setHtml: function (a) { a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children; for (var b = 0, d = a.length; b < d; ++b)a[b].parent = this }, getOuterHtml: function () { var a = new CKEDITOR.htmlParser.basicWriter; this.writeHtml(a); return a.getHtml() }, split: function (a) {
                        for (var b = this.children.splice(a, this.children.length - a), d = this.clone(), h = 0; h < b.length; ++h)b[h].parent = d; d.children = b; b[0] && (b[0].previous = null); 0 < a && (this.children[a -
                            1].next = null); this.parent.add(d, this.getIndex() + 1); return d
                    }, find: function (a, b) { void 0 === b && (b = !1); var d = [], h; for (h = 0; h < this.children.length; h++) { var f = this.children[h]; "function" == typeof a && a(f) ? d.push(f) : "string" == typeof a && f.name === a && d.push(f); b && f.find && (d = d.concat(f.find(a, b))) } return d }, findOne: function (a, b) {
                        var d = null, h = CKEDITOR.tools.array.find(this.children, function (h) { var e = "function" === typeof a ? a(h) : h.name === a; if (e || !b) return e; h.children && h.findOne && (d = h.findOne(a, !0)); return !!d }); return d ||
                            h || null
                    }, addClass: function (a) { if (!this.hasClass(a)) { var b = this.attributes["class"] || ""; this.attributes["class"] = b + (b ? " " : "") + a } }, removeClass: function (a) { var b = this.attributes["class"]; b && ((b = CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"]) }, hasClass: function (a) { var b = this.attributes["class"]; return b ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(b) : !1 }, getFilterContext: function (a) {
                        var b = []; a || (a = {
                            nonEditable: !1,
                            nestedEditable: !1
                        }); a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable && !a.nestedEditable && "true" == this.attributes.contenteditable && b.push("nestedEditable", !0) : b.push("nonEditable", !0); if (b.length) { a = CKEDITOR.tools.copy(a); for (var d = 0; d < b.length; d += 2)a[b[d]] = b[d + 1] } return a
                    }
                }, !0)
        })(); (function () {
            var b = /{([^}]+)}/g; CKEDITOR.template = function (b) { this.source = "function" === typeof b ? b : String(b) }; CKEDITOR.template.prototype.output = function (f, d) {
                var a = ("function" === typeof this.source ? this.source(f) :
                    this.source).replace(b, function (a, b) { return void 0 !== f[b] ? f[b] : a }); return d ? d.push(a) : a
            }
        })(); delete CKEDITOR.loadFullCore; CKEDITOR.instances = {}; CKEDITOR.document = new CKEDITOR.dom.document(document); CKEDITOR.add = function (b) {
            function f() { CKEDITOR.currentInstance == b && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance")) } CKEDITOR.instances[b.name] = b; b.on("focus", function () { CKEDITOR.currentInstance != b && (CKEDITOR.currentInstance = b, CKEDITOR.fire("currentInstance")) }); b.on("blur", f); b.on("destroy",
                f); CKEDITOR.fire("instance", null, b)
        }; CKEDITOR.remove = function (b) { delete CKEDITOR.instances[b.name] }; (function () { var b = {}; CKEDITOR.addTemplate = function (f, d) { var a = b[f]; if (a) return a; a = { name: f, source: d }; CKEDITOR.fire("template", a); return b[f] = new CKEDITOR.template(a.source) }; CKEDITOR.getTemplate = function (f) { return b[f] } })(); (function () { var b = []; CKEDITOR.addCss = function (f) { b.push(f) }; CKEDITOR.getCss = function () { return b.join("\n") } })(); CKEDITOR.on("instanceDestroyed", function () {
            CKEDITOR.tools.isEmpty(this.instances) &&
            CKEDITOR.fire("reset")
        }); CKEDITOR.TRISTATE_ON = 1; CKEDITOR.TRISTATE_OFF = 2; CKEDITOR.TRISTATE_DISABLED = 0; (function () {
            CKEDITOR.inline = function (b, f) {
                b = CKEDITOR.editor._getEditorElement(b); if (!b) return null; var d = new CKEDITOR.editor(f, b, CKEDITOR.ELEMENT_MODE_INLINE), a = b.is("textarea") ? b : null; a ? (d.setData(a.getValue(), null, !0), b = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' + !!d.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + a.getValue() + "\x3c/div\x3e", CKEDITOR.document), b.insertAfter(a),
                    a.hide(), a.$.form && d._attachToForm()) : (f && "undefined" !== typeof f.readOnly && !f.readOnly && b.setAttribute("contenteditable", "true"), d.setData(b.getHtml(), null, !0)); d.on("loaded", function () { d.fire("uiReady"); d.editable(b); d.container = b; d.ui.contentsElement = b; d.setData(d.getData(1)); d.resetDirty(); d.fire("contentDom"); d.mode = "wysiwyg"; d.fire("mode"); d.status = "ready"; d.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, d) }, null, null, 1E4); d.on("destroy", function () {
                        var b = d.container; a && b && (b.clearCustomData(),
                            b.remove()); a && a.show(); d.element.clearCustomData(); delete d.element
                    }); return d
            }; CKEDITOR.inlineAll = function () { var b, f, d; for (d in CKEDITOR.dtd.$editable) for (var a = CKEDITOR.document.getElementsByTag(d), c = 0, m = a.count(); c < m; c++)b = a.getItem(c), "true" != b.getAttribute("contenteditable") || b.getEditor() || (f = { element: b, config: {} }, !1 !== CKEDITOR.fire("inline", f) && CKEDITOR.inline(b, f.config)) }; CKEDITOR.domReady(function () { !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll() })
        })(); CKEDITOR.replaceClass = "ckeditor";
        (function () {
            function b(a, b, m, h) {
                a = CKEDITOR.editor._getEditorElement(a); if (!a) return null; var l = new CKEDITOR.editor(b, a, h); h == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), l._.required = a.hasAttribute("required"), a.removeAttribute("required")); m && l.setData(m, null, !0); l.on("loaded", function () {
                    l.isDestroyed() || l.isDetached() || (d(l), h == CKEDITOR.ELEMENT_MODE_REPLACE && l.config.autoUpdateElement && a.$.form && l._attachToForm(), l.setMode(l.config.startupMode, function () {
                        l.resetDirty(); l.status =
                            "ready"; l.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, l)
                    }))
                }); l.on("destroy", f); return l
            } function f() { var a = this.container, b = this.element; a && (a.clearCustomData(), a.remove()); b && (b.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (b.show(), this._.required && b.setAttribute("required", "required")), delete this.element) } function d(a) {
                var b = a.name, d = a.element, h = a.elementMode, f = a.fire("uiSpace", { space: "top", html: "" }).html, e = a.fire("uiSpace", { space: "bottom", html: "" }).html,
                k = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : "") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
                b = CKEDITOR.dom.element.createFromHtml(k.output({ id: a.id, name: b, langDir: a.lang.dir, langCode: a.langCode, voiceLabel: a.title, topHtml: f ? '\x3cspan id\x3d"' + a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + f + "\x3c/span\x3e" : "", contentId: a.ui.spaceId("contents"), bottomHtml: e ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + e + "\x3c/span\x3e" : "", outerEl: CKEDITOR.env.ie ? "span" : "div" })); h == CKEDITOR.ELEMENT_MODE_REPLACE ?
                    (d.hide(), b.insertAfter(d)) : d.append(b); a.container = b; a.ui.contentsElement = a.ui.space("contents"); f && a.ui.space("top").unselectable(); e && a.ui.space("bottom").unselectable(); d = a.config.width; h = a.config.height; d && b.setStyle("width", CKEDITOR.tools.cssLength(d)); h && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(h)); b.disableContextMenu(); CKEDITOR.env.webkit && b.on("focus", function () { a.focus() }); a.fireOnce("uiReady")
            } CKEDITOR.replace = function (a, c) { return b(a, c, null, CKEDITOR.ELEMENT_MODE_REPLACE) };
            CKEDITOR.appendTo = function (a, c, d) { return b(a, c, d, CKEDITOR.ELEMENT_MODE_APPENDTO) }; CKEDITOR.replaceAll = function () { for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) { var d = null, h = a[b]; if (h.name || h.id) { if ("string" == typeof arguments[0]) { if (!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(h.className)) continue } else if ("function" == typeof arguments[0] && (d = {}, !1 === arguments[0](h, d))) continue; this.replace(h, d) } } }; CKEDITOR.editor.prototype.addMode = function (a, b) {
                (this._.modes || (this._.modes =
                    {}))[a] = b
            }; CKEDITOR.editor.prototype.setMode = function (a, b) {
                var d = this, h = this._.modes; if (a != d.mode && h && h[a]) {
                    d.fire("beforeSetMode", a); if (d.mode) { var f = d.checkDirty(), h = d._.previousModeData, e, k = 0; d.fire("beforeModeUnload"); d.editable(0); d._.previousMode = d.mode; d._.previousModeData = e = d.getData(1); "source" == d.mode && h == e && (d.fire("lockSnapshot", { forceUpdate: !0 }), k = 1); d.ui.space("contents").setHtml(""); d.mode = "" } else d._.previousModeData = d.getData(1); this._.modes[a](function () {
                        d.mode = a; void 0 !== f && !f &&
                            d.resetDirty(); k ? d.fire("unlockSnapshot") : "wysiwyg" == a && d.fire("saveSnapshot"); setTimeout(function () { d.isDestroyed() || d.isDetached() || (d.fire("mode"), b && b.call(d)) }, 0)
                    })
                }
            }; CKEDITOR.editor.prototype.resize = function (a, b, d, h) {
                var f = this.container, e = this.ui.space("contents"), k = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement; h = h ? this.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }) : f; if (a || 0 === a) a = CKEDITOR.tools.convertToPx(CKEDITOR.tools.cssLength(a));
                h.setSize("width", a, !0); k && (k.style.width = "1%"); b = CKEDITOR.tools.convertToPx(CKEDITOR.tools.cssLength(b)); var g = (h.$.offsetHeight || 0) - (e.$.clientHeight || 0), f = Math.max(b - (d ? 0 : g), 0); b = d ? b + g : b; e.setStyle("height", CKEDITOR.tools.cssLength(f)); k && (k.style.width = "100%"); this.fire("resize", { outerHeight: b, contentsHeight: f, outerWidth: a || h.getSize("width") })
            }; CKEDITOR.editor.prototype.getResizable = function (a) { return a ? this.ui.space("contents") : this.container }; CKEDITOR.domReady(function () {
                CKEDITOR.replaceClass &&
                CKEDITOR.replaceAll(CKEDITOR.replaceClass)
            })
        })(); CKEDITOR.config.startupMode = "wysiwyg"; (function () {
            function b(b) {
                var c = b.editor, e = b.data.path, g = e.blockLimit, d = b.data.selection, k = d.getRanges()[0], m; if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) if (d = f(d, e)) d.appendBogus(), m = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.edge && c._.previousActive; h(c, e.block, g) && k.collapsed && !k.getCommonAncestor().isReadOnly() && (e = k.clone(), e.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), g = new CKEDITOR.dom.walker(e),
                    g.guard = function (b) { return !a(b) || b.type == CKEDITOR.NODE_COMMENT || b.isReadOnly() }, !g.checkForward() || e.checkStartOfBlock() && e.checkEndOfBlock()) && (c = k.fixBlock(!0, c.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller || (c = c.getFirst(a)) && c.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(c.getText()).match(/^(?:&nbsp;|\xa0)$/) && c.remove(), m = 1, b.cancel()); m && k.select()
            } function f(b, c) {
                if (b.isFake) return 0; var e = c.block || c.blockLimit, g = e && e.getLast(a); if (!(!e || !e.isBlockBoundary() ||
                    g && g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary() || e.is("pre") || e.getBogus())) return e
            } function d(a) { var b = a.data.getTarget(); b.is("input") && (b = b.getAttribute("type"), "submit" != b && "reset" != b || a.data.preventDefault()) } function a(a) { return n(a) && q(a) } function c(a, b) { return function (c) { var e = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget; (e = e && e.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(e) : null) && (b.equals(e) || b.contains(e)) || a.call(this, c) } } function m(b) {
                function c(b) {
                    return function (c,
                        g) { g && c.type == CKEDITOR.NODE_ELEMENT && c.is(d) && (e = c); if (!(g || !a(c) || b && r(c))) return !1 }
                } var e, g = b.getRanges()[0]; b = b.root; var d = { table: 1, ul: 1, ol: 1, dl: 1 }; if (g.startPath().contains(d)) { var h = g.clone(); h.collapse(1); h.setStartAt(b, CKEDITOR.POSITION_AFTER_START); b = new CKEDITOR.dom.walker(h); b.guard = c(); b.checkBackward(); if (e) return h = g.clone(), h.collapse(), h.setEndAt(e, CKEDITOR.POSITION_AFTER_END), b = new CKEDITOR.dom.walker(h), b.guard = c(!0), e = !1, b.checkForward(), e } return null
            } function h(a, b, c) {
                return !1 !==
                    a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && "true" == b.getAttribute("contenteditable"))
            } function l(a) { return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ? a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 } function e(a) { a && a.isEmptyInlineRemoveable() && a.remove() } function k(a) { var b = a.editor; b.getSelection().scrollIntoView(); setTimeout(function () { b.fire("saveSnapshot") }, 0) } function g(a, b, c) {
                var e = a.getCommonAncestor(b); for (b = a = c ?
                    b : a; (a = a.getParent()) && !e.equals(a) && 1 == a.getChildCount();)b = a; b.remove()
            } var n, q, u, r, p, v, y, t, B, w; CKEDITOR.editable = CKEDITOR.tools.createClass({
                base: CKEDITOR.dom.element, $: function (a, b) { this.base(b.$ || b); this.editor = a; this.status = "unloaded"; this.hasFocus = !1; this.setup() }, proto: {
                    focus: function () {
                        var a; if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) { a.focus(); return } CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus &&
                            this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop); try { if (!CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document)) if (CKEDITOR.env.chrome) { var b = this.$.scrollTop; this.$.focus(); this.$.scrollTop = b } else this.$.focus(); else this.$.setActive() } catch (c) { if (!CKEDITOR.env.ie) throw c; } CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
                    },
                    on: function (a, b) { var e = Array.prototype.slice.call(arguments, 0); CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", b = c(b, this), e[0] = a, e[1] = b); return CKEDITOR.dom.element.prototype.on.apply(this, e) }, attachListener: function (a) { !this._.listeners && (this._.listeners = []); var b = Array.prototype.slice.call(arguments, 1), b = a.on.apply(a, b); this._.listeners.push(b); return b }, clearListeners: function () { var a = this._.listeners; try { for (; a.length;)a.pop().removeListener() } catch (b) { } }, restoreAttrs: function () {
                        var a =
                            this._.attrChanges, b, c; for (c in a) a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c, b) : this.removeAttribute(c))
                    }, attachClass: function (a) { var b = this.getCustomData("classes"); this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes", b), this.addClass(a)) }, changeAttr: function (a, b) { var c = this.getAttribute(a); b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), this.setAttribute(a, b)) }, insertText: function (a) {
                        this.editor.focus(); this.insertHtml(this.transformPlainTextToHtml(a),
                            "text")
                    }, transformPlainTextToHtml: function (a) { var b = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode; return CKEDITOR.tools.transformPlainTextToHtml(a, b) }, insertHtml: function (a, b, c) { var e = this.editor; e.focus(); e.fire("saveSnapshot"); c || (c = e.getSelection().getRanges()[0]); v(this, b || "html", a, c); c.select(); k(this); this.editor.fire("afterInsertHtml", {}) }, insertHtmlIntoRange: function (a, b, c) {
                        v(this, c || "html", a, b); this.editor.fire("afterInsertHtml",
                            { intoRange: b })
                    }, insertElement: function (b, c) {
                        var e = this.editor; e.focus(); e.fire("saveSnapshot"); var g = e.activeEnterMode, e = e.getSelection(), d = b.getName(), d = CKEDITOR.dtd.$block[d]; c || (c = e.getRanges()[0]); this.insertElementIntoRange(b, c) && (c.moveToPosition(b, CKEDITOR.POSITION_AFTER_END), d && ((d = b.getNext(function (b) { return a(b) && !r(b) })) && d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$block) ? d.getDtd()["#"] ? c.moveToElementEditStart(d) : c.moveToElementEditEnd(b) : d || g == CKEDITOR.ENTER_BR || (d = c.fixBlock(!0,
                            g == CKEDITOR.ENTER_DIV ? "div" : "p"), c.moveToElementEditStart(d)))); e.selectRanges([c]); k(this)
                    }, insertElementIntoSelection: function (a) { this.insertElement(a) }, insertElementIntoRange: function (a, b) {
                        var c = this.editor, g = c.config.enterMode, d = a.getName(), h = CKEDITOR.dtd.$block[d]; if (b.checkReadOnly()) return !1; b.deleteContents(1); b.startContainer.type == CKEDITOR.NODE_ELEMENT && (b.startContainer.is({ tr: 1, table: 1, tbody: 1, thead: 1, tfoot: 1 }) ? y(b) : b.startContainer.is(CKEDITOR.dtd.$list) && t(b)); var k, f; if (h) for (; (k = b.getCommonAncestor(0,
                            1)) && (f = CKEDITOR.dtd[k.getName()]) && (!f || !f[d]);)if (k.getName() in CKEDITOR.dtd.span) { var h = b.splitElement(k), m = b.createBookmark(); e(k); e(h); b.moveToBookmark(m) } else b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(k), b.collapse(!0), k.remove()) : b.splitBlock(g == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable()); b.insertNode(a); return !0
                    }, setData: function (a, b) { b || (a = this.editor.dataProcessor.toHtml(a)); this.setHtml(a); this.fixInitialSelection(); "unloaded" == this.status && (this.status = "ready"); this.editor.fire("dataReady") },
                    getData: function (a) { var b = this.getHtml(); a || (b = this.editor.dataProcessor.toDataFormat(b)); return b }, setReadOnly: function (a) { this.setAttribute("contenteditable", !a) }, detach: function () { this.status = "detached"; this.editor.setData(this.editor.getData(), { internal: !0 }); this.clearListeners(); try { this._.cleanCustomData() } catch (a) { if (!CKEDITOR.env.ie || -2146828218 !== a.number) throw a; } this.editor.fire("contentDomUnload"); delete this.editor.document; delete this.editor.window; delete this.editor }, isInline: function () { return this.getDocument().equals(CKEDITOR.document) },
                    fixInitialSelection: function () {
                        function a() { var b = c.getDocument().$, e = b.getSelection(), g; a: if (e.anchorNode && e.anchorNode == c.$) g = !0; else { if (CKEDITOR.env.webkit && (g = c.getDocument().getActive()) && g.equals(c) && !e.anchorNode) { g = !0; break a } g = void 0 } g && (g = new CKEDITOR.dom.range(c), g.moveToElementEditStart(c), b = b.createRange(), b.setStart(g.startContainer.$, g.startOffset), b.collapse(!0), e.removeAllRanges(), e.addRange(b)) } function b() {
                            var a = c.getDocument().$, e = a.selection, g = c.getDocument().getActive(); "None" ==
                                e.type && g.equals(c) && (e = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), e.moveToElementEditStart(c), e = e.startContainer, e.type != CKEDITOR.NODE_ELEMENT && (e = e.getParent()), a.moveToElementText(e.$), a.collapse(!0), a.select())
                        } var c = this; if (CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks)) this.hasFocus && (this.focus(), b()); else if (this.hasFocus) this.focus(), a(); else this.once("focus", function () { a() }, null, null, -999)
                    }, getHtmlFromRange: function (a) {
                        if (a.collapsed) return new CKEDITOR.dom.documentFragment(a.document);
                        a = { doc: this.getDocument(), range: a.clone() }; B.eol.detect(a, this); B.bogus.exclude(a); B.cell.shrink(a); a.fragment = a.range.cloneContents(); B.tree.rebuild(a, this); B.eol.fix(a, this); return new CKEDITOR.dom.documentFragment(a.fragment.$)
                    }, extractHtmlFromRange: function (a, b) {
                        var c = w, e = { range: a, doc: a.document }, g = this.getHtmlFromRange(a); if (a.collapsed) return a.optimize(), g; a.enlarge(CKEDITOR.ENLARGE_INLINE, 1); c.table.detectPurge(e); e.bookmark = a.createBookmark(); delete e.range; var d = this.editor.createRange();
                        d.moveToPosition(e.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START); e.targetBookmark = d.createBookmark(); c.list.detectMerge(e, this); c.table.detectRanges(e, this); c.block.detectMerge(e, this); e.tableContentsRanges ? (c.table.deleteRanges(e), a.moveToBookmark(e.bookmark), e.range = a) : (a.moveToBookmark(e.bookmark), e.range = a, a.extractContents(c.detectExtractMerge(e))); a.moveToBookmark(e.targetBookmark); a.optimize(); c.fixUneditableRangePosition(a); c.list.merge(e, this); c.table.purge(e, this); c.block.merge(e, this);
                        if (b) { c = a.startPath(); if (e = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) { a: { var e = c.block.getElementsByTag("span"), d = 0, h; if (e) for (; h = e.getItem(d++);)if (!q(h)) { e = !0; break a } e = !1 } e = !e } e && (a.moveToPosition(c.block, CKEDITOR.POSITION_BEFORE_START), c.block.remove()) } else c.autoParagraph(this.editor, a), u(a.startContainer) && a.startContainer.appendBogus(); a.startContainer.mergeSiblings(); return g
                    }, setup: function () {
                        var b = this.editor; this.attachListener(b, "beforeGetData", function () {
                            var a =
                                this.getData(); this.is("textarea") || !1 !== b.config.ignoreEmptyParagraph && (a = a.replace(p, function (a, b) { return b })); b.setData(a, null, 1)
                        }, this); this.attachListener(b, "getSnapshot", function (a) { a.data = this.getData(1) }, this); this.attachListener(b, "afterSetData", function () { this.setData(b.getData(1)) }, this); this.attachListener(b, "loadSnapshot", function (a) { this.setData(a.data, 1) }, this); this.attachListener(b, "beforeFocus", function () { var a = b.getSelection(); (a = a && a.getNative()) && "Control" == a.type || this.focus() },
                            this); this.attachListener(b, "insertHtml", function (a) { this.insertHtml(a.data.dataValue, a.data.mode, a.data.range) }, this); this.attachListener(b, "insertElement", function (a) { this.insertElement(a.data) }, this); this.attachListener(b, "insertText", function (a) { this.insertText(a.data) }, this); this.setReadOnly(b.readOnly); this.attachClass("cke_editable"); b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") : b.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && b.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO ||
                                this.attachClass("cke_editable_themed"); this.attachClass("cke_contents_" + b.config.contentsLangDirection); b.keystrokeHandler.blockedKeystrokes[8] = +b.readOnly; b.keystrokeHandler.attach(this); this.on("blur", function () { this.hasFocus = !1 }, null, null, -1); this.on("focus", function () { this.hasFocus = !0 }, null, null, -1); if (CKEDITOR.env.webkit) this.on("scroll", function () { b._.previousScrollTop = b.editable().$.scrollTop }, null, null, -1); if (CKEDITOR.env.edge && 14 < CKEDITOR.env.version) {
                                    var c = function () {
                                        var a = b.editable();
                                        null != b._.previousScrollTop && a.getDocument().equals(CKEDITOR.document) && (a.$.scrollTop = b._.previousScrollTop, b._.previousScrollTop = null, this.removeListener("scroll", c))
                                    }; this.on("scroll", c)
                                } b.focusManager.add(this); this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, b.once("contentDom", function () { b.focusManager.focus(this) }, this)); this.isInline() && this.changeAttr("tabindex", b.tabIndex); if (!this.is("textarea")) {
                                    b.document = this.getDocument(); b.window = this.getWindow(); var e = b.document; this.changeAttr("spellcheck",
                                        !b.config.disableNativeSpellChecker); var h = b.config.contentsLangDirection; this.getDirection(1) != h && this.changeAttr("dir", h); var k = CKEDITOR.getCss(); if (k) { var h = e.getHead(), f = h.getCustomData("stylesheet"); f ? k != f.getText() && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? f.$.styleSheet.cssText = k : f.setText(k)) : (k = e.appendStyleText(k), k = new CKEDITOR.dom.element(k.ownerNode || k.owningElement), h.setCustomData("stylesheet", k), k.data("cke-temp", 1)) } h = e.getCustomData("stylesheet_ref") || 0; e.setCustomData("stylesheet_ref",
                                            h + 1); this.setCustomData("cke_includeReadonly", !b.config.disableReadonlyStyling); this.attachListener(this, "click", function (a) { a = a.data; var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a"); b && 2 != a.$.button && b.isReadOnly() && a.preventDefault() }); var l = { 8: 1, 46: 1 }; this.attachListener(b, "key", function (a) {
                                                if (b.readOnly) return !0; var c = a.data.domEvent.getKey(), e; a = b.getSelection(); if (0 !== a.getRanges().length) {
                                                    if (c in l) {
                                                        var g, d = a.getRanges()[0], h = d.startPath(), k, f, q, c = 8 == c; CKEDITOR.env.ie &&
                                                            11 > CKEDITOR.env.version && (g = a.getSelectedElement()) || (g = m(a)) ? (b.fire("saveSnapshot"), d.moveToPosition(g, CKEDITOR.POSITION_BEFORE_START), g.remove(), d.select(), b.fire("saveSnapshot"), e = 1) : d.collapsed && ((k = h.block) && (q = k[c ? "getPrevious" : "getNext"](n)) && q.type == CKEDITOR.NODE_ELEMENT && q.is("table") && d[c ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (b.fire("saveSnapshot"), d[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && k.remove(), d["moveToElementEdit" + (c ? "End" : "Start")](q), d.select(), b.fire("saveSnapshot"),
                                                                e = 1) : h.blockLimit && h.blockLimit.is("td") && (f = h.blockLimit.getAscendant("table")) && d.checkBoundaryOfElement(f, c ? CKEDITOR.START : CKEDITOR.END) && (q = f[c ? "getPrevious" : "getNext"](n)) ? (b.fire("saveSnapshot"), d["moveToElementEdit" + (c ? "End" : "Start")](q), d.checkStartOfBlock() && d.checkEndOfBlock() ? q.remove() : d.select(), b.fire("saveSnapshot"), e = 1) : (f = h.contains(["td", "th", "caption"])) && d.checkBoundaryOfElement(f, c ? CKEDITOR.START : CKEDITOR.END) && (e = 1))
                                                    } return !e
                                                }
                                            }); b.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller &&
                                                this.attachListener(this, "keyup", function (c) { c.data.getKeystroke() in l && !this.getFirst(a) && (this.appendBogus(), c = b.createRange(), c.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), c.select()) }); this.attachListener(this, "dblclick", function (a) { if (b.readOnly) return !1; a = { element: a.data.getTarget() }; b.fire("doubleclick", a) }); CKEDITOR.env.ie && this.attachListener(this, "click", d); CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown", function (a) {
                                                    var c = a.data.getTarget(); c.is("img", "hr",
                                                        "input", "textarea", "select") && !c.isReadOnly() && (b.getSelection().selectElement(c), c.is("input", "textarea", "select") && a.data.preventDefault())
                                                }); CKEDITOR.env.edge && this.attachListener(this, "mouseup", function (a) { (a = a.data.getTarget()) && a.is("img") && !a.isReadOnly() && b.getSelection().selectElement(a) }); CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function (a) {
                                                    if (2 == a.data.$.button && (a = a.data.getTarget(), !a.getAscendant("table") && !a.getOuterHtml().replace(p, ""))) {
                                                        var c = b.createRange(); c.moveToElementEditStart(a);
                                                        c.select(!0)
                                                    }
                                                }); CKEDITOR.env.webkit && (this.attachListener(this, "click", function (a) { a.data.getTarget().is("input", "select") && a.data.preventDefault() }), this.attachListener(this, "mouseup", function (a) { a.data.getTarget().is("input", "textarea") && a.data.preventDefault() })); CKEDITOR.env.webkit && this.attachListener(b, "key", function (a) {
                                                    if (b.readOnly) return !0; var c = a.data.domEvent.getKey(); if (c in l && (a = b.getSelection(), 0 !== a.getRanges().length)) {
                                                        var c = 8 == c, e = a.getRanges()[0]; a = e.startPath(); if (e.collapsed) a: {
                                                            var d =
                                                                a.block; if (d && e[c ? "checkStartOfBlock" : "checkEndOfBlock"]() && e.moveToClosestEditablePosition(d, !c) && e.collapsed) {
                                                                    if (e.startContainer.type == CKEDITOR.NODE_ELEMENT) { var h = e.startContainer.getChild(e.startOffset - (c ? 1 : 0)); if (h && h.type == CKEDITOR.NODE_ELEMENT && h.is("hr")) { b.fire("saveSnapshot"); h.remove(); a = !0; break a } } e = e.startPath().block; if (!e || e && e.contains(d)) a = void 0; else {
                                                                        b.fire("saveSnapshot"); var k; (k = (c ? e : d).getBogus()) && k.remove(); k = b.getSelection(); h = k.createBookmarks(); (c ? d : e).moveChildren(c ?
                                                                            e : d, !1); a.lastElement.mergeSiblings(); g(d, e, !c); k.selectBookmarks(h); a = !0
                                                                    }
                                                                } else a = !1
                                                        } else c = e, k = a.block, e = c.endPath().block, k && e && !k.equals(e) ? (b.fire("saveSnapshot"), (d = k.getBogus()) && d.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), e.getParent() && (e.moveChildren(k, !1), a.lastElement.mergeSiblings(), g(k, e, !0)), c = b.getSelection().getRanges()[0], c.collapse(1), c.optimize(), "" === c.startContainer.getHtml() && c.startContainer.appendBogus(), c.select(), a = !0) : a = !1; if (!a) return; b.getSelection().scrollIntoView();
                                                        b.fire("saveSnapshot"); return !1
                                                    }
                                                }, this, null, 100)
                                }
                    }, getUniqueId: function () { var a; try { this._.expandoNumber = a = CKEDITOR.dom.domObject.prototype.getUniqueId.call(this) } catch (b) { a = this._ && this._.expandoNumber } return a }
                }, _: {
                    cleanCustomData: function () {
                        this.removeClass("cke_editable"); this.restoreAttrs(); for (var a = this.removeCustomData("classes"); a && a.length;)this.removeClass(a.pop()); if (!this.is("textarea")) {
                            var a = this.getDocument(), b = a.getHead(); if (b.getCustomData("stylesheet")) {
                                var c = a.getCustomData("stylesheet_ref");
                                --c ? a.setCustomData("stylesheet_ref", c) : (a.removeCustomData("stylesheet_ref"), b.removeCustomData("stylesheet").remove())
                            }
                        }
                    }
                }
            }); CKEDITOR.editor.prototype.editable = function (a) { var b = this._.editable; if (b && a) return 0; if (!arguments.length) return b; a ? b = a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), b = null); return this._.editable = b }; CKEDITOR.on("instanceLoaded", function (a) {
                var c = a.editor; c.on("insertElement", function (a) {
                    a = a.data; a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") ||
                        a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1"), a.setAttribute("contentEditable", !1))
                }); c.on("selectionChange", function (a) { if (!c.readOnly) { var e = c.getSelection(); e && !e.isLocked && (e = c.checkDirty(), c.fire("lockSnapshot"), b(a), c.fire("unlockSnapshot"), !e && c.resetDirty()) } })
            }); CKEDITOR.on("instanceCreated", function (a) {
                var b = a.editor; b.on("mode", function () {
                    var a = b.editable(); if (a && a.isInline()) {
                        var c = b.title; a.changeAttr("role",
                            "textbox"); a.changeAttr("aria-multiline", "true"); a.changeAttr("aria-label", c); c && a.changeAttr("title", c); var e = b.fire("ariaEditorHelpLabel", {}).label; if (e && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) { var g = CKEDITOR.tools.getNextId(), e = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + e + "\x3c/span\x3e"); c.append(e); a.changeAttr("aria-describedby", g) }
                    }
                })
            }); CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
            n = CKEDITOR.dom.walker.whitespaces(!0); q = CKEDITOR.dom.walker.bookmark(!1, !0); u = CKEDITOR.dom.walker.empty(); r = CKEDITOR.dom.walker.bogus(); p = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi; v = function () {
                function b(a) { return a.type == CKEDITOR.NODE_ELEMENT } function c(a, e) {
                    var g, d, h, k, f = [], m = e.range.startContainer; g = e.range.startPath(); for (var m = n[m.getName()], l = 0, q = a.getChildren(), v = q.count(), t = -1, u = -1, p = 0, y = g.contains(n.$list); l <
                        v; ++l)g = q.getItem(l), b(g) ? (h = g.getName(), y && h in CKEDITOR.dtd.$list ? f = f.concat(c(g, e)) : (k = !!m[h], "br" != h || !g.data("cke-eol") || l && l != v - 1 || (p = (d = l ? f[l - 1].node : q.getItem(l + 1)) && (!b(d) || !d.is("br")), d = d && b(d) && n.$block[d.getName()]), -1 != t || k || (t = l), k || (u = l), f.push({ isElement: 1, isLineBreak: p, isBlock: g.isBlockBoundary(), hasBlockSibling: d, node: g, name: h, allowed: k }), d = p = 0)) : f.push({ isElement: 0, node: g, allowed: 1 }); -1 < t && (f[t].firstNotAllowed = 1); -1 < u && (f[u].lastNotAllowed = 1); return f
                } function g(a, c) {
                    var e = [],
                    d = a.getChildren(), h = d.count(), k, f = 0, m = n[c], l = !a.is(n.$inline) || a.is("br"); for (l && e.push(" "); f < h; f++)k = d.getItem(f), b(k) && !k.is(m) ? e = e.concat(g(k, c)) : e.push(k); l && e.push(" "); return e
                } function d(a) { return b(a.startContainer) && a.startContainer.getChild(a.startOffset - 1) } function k(a) { return a && b(a) && (a.is(n.$removeEmpty) || a.is("a") && !a.isBlockBoundary()) } function f(a, c, e, g) {
                    var d = a.clone(), h, k; d.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); (h = (new CKEDITOR.dom.walker(d)).next()) && b(h) && q[h.getName()] &&
                        (k = h.getPrevious()) && b(k) && !k.getParent().equals(a.startContainer) && e.contains(k) && g.contains(h) && h.isIdentical(k) && (h.moveChildren(k), h.remove(), f(a, c, e, g))
                } function m(a, c) { function e(a, c) { if (c.isBlock && c.isElement && !c.node.is("br") && b(a) && a.is("br")) return a.remove(), 1 } var g = c.endContainer.getChild(c.endOffset), d = c.endContainer.getChild(c.endOffset - 1); g && e(g, a[a.length - 1]); d && e(d, a[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse()) } var n = CKEDITOR.dtd, q = {
                    p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1,
                    h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1
                }, v = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, t = CKEDITOR.tools.extend({}, n.$inline); delete t.br; return function (q, u, N, K) {
                    var y = q.editor, r = !1, w; "unfiltered_html" == u && (u = "html", r = !0); if (!K.checkReadOnly()) {
                        var B = (new CKEDITOR.dom.elementPath(K.startContainer, K.root)).blockLimit || K.root; u = { type: u, dontFilter: r, editable: q, editor: y, range: K, blockLimit: B, mergeCandidates: [], zombies: [] }; var r = u.range, B = u.mergeCandidates, E = "html" === u.type, x, V, W, ba, ca; "text" == u.type &&
                            r.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (V = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", r.document), r.insertNode(V), r.setStartAfter(V)); W = new CKEDITOR.dom.elementPath(r.startContainer); u.endPath = ba = new CKEDITOR.dom.elementPath(r.endContainer); if (!r.collapsed) { x = ba.block || ba.blockLimit; var da = r.getCommonAncestor(); x && !x.equals(da) && !x.contains(da) && r.checkEndOfBlock() && u.zombies.push(x); r.deleteContents() } for (; (ca = d(r)) && b(ca) && ca.isBlockBoundary() && W.contains(ca);)r.moveToPosition(ca,
                                CKEDITOR.POSITION_BEFORE_END); f(r, u.blockLimit, W, ba); V && (r.setEndBefore(V), r.collapse(), V.remove()); V = r.startPath(); if (x = V.contains(k, !1, 1)) w = r.splitElement(x), u.inlineStylesRoot = x, u.inlineStylesPeak = V.lastElement; V = r.createBookmark(); E && (e(x), e(w)); (x = V.startNode.getPrevious(a)) && b(x) && k(x) && B.push(x); (x = V.startNode.getNext(a)) && b(x) && k(x) && B.push(x); for (x = V.startNode; (x = x.getParent()) && k(x);)B.push(x); r.moveToBookmark(V); w = q.getHtml(); w = "" === w || w.match(p); y.enterMode === CKEDITOR.ENTER_DIV && w && ((y =
                                    q.getFirst()) && y.remove(), K.setStartAt(q, CKEDITOR.POSITION_AFTER_START), K.collapse(!0)); if (q = N) {
                                        q = u.range; if ("text" == u.type && u.inlineStylesRoot) { K = u.inlineStylesPeak; y = K.getDocument().createText("{cke-peak}"); for (w = u.inlineStylesRoot.getParent(); !K.equals(w);)y = y.appendTo(K.clone()), K = K.getParent(); N = y.getOuterHtml().split("{cke-peak}").join(N) } K = u.blockLimit.getName(); if (/^\s+|\s+$/.test(N) && "span" in CKEDITOR.dtd[K]) { var aa = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e'; N = aa + N + aa } N =
                                            u.editor.dataProcessor.toHtml(N, { context: null, fixForBody: !1, protectedWhitespaces: !!aa, dontFilter: u.dontFilter, filter: u.editor.activeFilter, enterMode: u.editor.activeEnterMode }); K = q.document.createElement("body"); K.setHtml(N); aa && (K.getFirst().remove(), K.getLast().remove()); if ((aa = q.startPath().block) && (1 != aa.getChildCount() || !aa.getBogus())) a: {
                                                var S; if (1 == K.getChildCount() && b(S = K.getFirst()) && S.is(v) && !S.hasAttribute("contenteditable")) {
                                                    aa = S.getElementsByTag("*"); q = 0; for (w = aa.count(); q < w; q++)if (y =
                                                        aa.getItem(q), !y.is(t)) break a; S.moveChildren(S.getParent(1)); S.remove()
                                                }
                                            } u.dataWrapper = K; q = N
                                    } if (q) {
                                        S = u.range; q = S.document; K = u.blockLimit; w = 0; var T, aa = [], fa, H; N = V = 0; var P, y = S.startContainer; ca = u.endPath.elements[0]; var ea, r = ca.getPosition(y), B = !!ca.getCommonAncestor(y) && r != CKEDITOR.POSITION_IDENTICAL && !(r & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED), y = c(u.dataWrapper, u); for (m(y, S); w < y.length; w++) {
                                            r = y[w]; if (E = r.isLineBreak) E = S, x = K, ba = W = void 0, r.hasBlockSibling ? E = 1 : (W = E.startContainer.getAscendant(n.$block,
                                                1)) && W.is({ div: 1, p: 1 }) ? (ba = W.getPosition(x), ba == CKEDITOR.POSITION_IDENTICAL || ba == CKEDITOR.POSITION_CONTAINS ? E = 0 : (x = E.splitElement(W), E.moveToPosition(x, CKEDITOR.POSITION_AFTER_START), E = 1)) : E = 0; if (E) N = 0 < w; else {
                                                    E = S.startPath(); !r.isBlock && h(u.editor, E.block, E.blockLimit) && (H = l(u.editor)) && (H = q.createElement(H), H.appendBogus(), S.insertNode(H), CKEDITOR.env.needsBrFiller && (T = H.getBogus()) && T.remove(), S.moveToPosition(H, CKEDITOR.POSITION_BEFORE_END)); if ((E = S.startPath().block) && !E.equals(fa)) {
                                                        if (T = E.getBogus()) T.remove(),
                                                            aa.push(E); fa = E
                                                    } r.firstNotAllowed && (V = 1); if (V && r.isElement) { E = S.startContainer; for (x = null; E && !n[E.getName()][r.name];) { if (E.equals(K)) { E = null; break } x = E; E = E.getParent() } if (E) x && (P = S.splitElement(x), u.zombies.push(P), u.zombies.push(x)); else { x = K.getName(); ea = !w; E = w == y.length - 1; x = g(r.node, x); W = []; ba = x.length; for (var da = 0, ha = void 0, ga = 0, ka = -1; da < ba; da++)ha = x[da], " " == ha ? (ga || ea && !da || (W.push(new CKEDITOR.dom.text(" ")), ka = W.length), ga = 1) : (W.push(ha), ga = 0); E && ka == W.length && W.pop(); ea = W } } if (ea) {
                                                        for (; E = ea.pop();)S.insertNode(E);
                                                        ea = 0
                                                    } else S.insertNode(r.node); r.lastNotAllowed && w < y.length - 1 && ((P = B ? ca : P) && S.setEndAt(P, CKEDITOR.POSITION_AFTER_START), V = 0); S.collapse()
                                                }
                                        } 1 != y.length ? T = !1 : (T = y[0], T = T.isElement && "false" == T.node.getAttribute("contenteditable")); T && (N = !0, E = y[0].node, S.setStartAt(E, CKEDITOR.POSITION_BEFORE_START), S.setEndAt(E, CKEDITOR.POSITION_AFTER_END)); u.dontMoveCaret = N; u.bogusNeededBlocks = aa
                                    } T = u.range; var ja; ea = u.bogusNeededBlocks; for (fa = T.createBookmark(); H = u.zombies.pop();)H.getParent() && (P = T.clone(), P.moveToElementEditStart(H),
                                        P.removeEmptyBlocksAtEnd()); if (ea) for (; H = ea.pop();)CKEDITOR.env.needsBrFiller ? H.appendBogus() : H.append(T.document.createText(" ")); for (; H = u.mergeCandidates.pop();)H.mergeSiblings(); CKEDITOR.env.webkit && T.startPath() && (H = T.startPath(), H.block ? H.block.$.normalize() : H.blockLimit && H.blockLimit.$.normalize()); T.moveToBookmark(fa); if (!u.dontMoveCaret) {
                                            for (H = d(T); H && b(H) && !H.is(n.$empty);) {
                                                if (H.isBlockBoundary()) T.moveToPosition(H, CKEDITOR.POSITION_BEFORE_END); else {
                                                    if (k(H) && H.getHtml().match(/(\s|&nbsp;)$/g)) {
                                                        ja =
                                                        null; break
                                                    } ja = T.clone(); ja.moveToPosition(H, CKEDITOR.POSITION_BEFORE_END)
                                                } H = H.getLast(a)
                                            } ja && T.moveToRange(ja)
                                        }
                    }
                }
            }(); y = function () {
                function a(b) { b = new CKEDITOR.dom.walker(b); b.guard = function (a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent) }; b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }; return b } function b(a, c, e) { c = a.getDocument().createElement(c); a.append(c, e); return c } function c(a) {
                    var b = a.count(), e; for (b; 0 < b--;)e = a.getItem(b), CKEDITOR.tools.trim(e.getHtml()) ||
                        (e.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && e.getChildCount() && e.getFirst().remove())
                } return function (e) {
                    var g = e.startContainer, d = g.getAscendant("table", 1), h = !1; c(d.getElementsByTag("td")); c(d.getElementsByTag("th")); d = e.clone(); d.setStart(g, 0); d = a(d).lastBackward(); d || (d = e.clone(), d.setEndAt(g, CKEDITOR.POSITION_BEFORE_END), d = a(d).lastForward(), h = !0); d || (d = g); d.is("table") ? (e.setStartAt(d, CKEDITOR.POSITION_BEFORE_START), e.collapse(!0), d.remove()) : (d.is({ tbody: 1, thead: 1, tfoot: 1 }) && (d =
                        b(d, "tr", h)), d.is("tr") && (d = b(d, d.getParent().is("thead") ? "th" : "td", h)), (g = d.getBogus()) && g.remove(), e.moveToPosition(d, h ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
                }
            }(); t = function () {
                function a(b) { b = new CKEDITOR.dom.walker(b); b.guard = function (a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$list) || a.is(CKEDITOR.dtd.$listItem) }; b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$listItem) }; return b } return function (b) {
                    var c =
                        b.startContainer, e = !1, g; g = b.clone(); g.setStart(c, 0); g = a(g).lastBackward(); g || (g = b.clone(), g.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), g = a(g).lastForward(), e = !0); g || (g = c); g.is(CKEDITOR.dtd.$list) ? (b.setStartAt(g, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), g.remove()) : ((c = g.getBogus()) && c.remove(), b.moveToPosition(g, e ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), b.select())
                }
            }(); B = {
                eol: {
                    detect: function (a, b) {
                        var c = a.range, e = c.clone(), g = c.clone(), d = new CKEDITOR.dom.elementPath(c.startContainer,
                            b), h = new CKEDITOR.dom.elementPath(c.endContainer, b); e.collapse(1); g.collapse(); d.block && e.checkBoundaryOfElement(d.block, CKEDITOR.END) && (c.setStartAfter(d.block), a.prependEolBr = 1); h.block && g.checkBoundaryOfElement(h.block, CKEDITOR.START) && (c.setEndBefore(h.block), a.appendEolBr = 1)
                    }, fix: function (a, b) { var c = b.getDocument(), e; a.appendEolBr && (e = this.createEolBr(c), a.fragment.append(e)); !a.prependEolBr || e && !e.getPrevious() || a.fragment.append(this.createEolBr(c), 1) }, createEolBr: function (a) {
                        return a.createElement("br",
                            { attributes: { "data-cke-eol": 1 } })
                    }
                }, bogus: { exclude: function (a) { var b = a.range.getBoundaryNodes(), c = b.startNode, b = b.endNode; !b || !r(b) || c && c.equals(b) || a.range.setEndBefore(b) } }, tree: {
                    rebuild: function (a, b) {
                        var c = a.range, e = c.getCommonAncestor(), g = new CKEDITOR.dom.elementPath(e, b), d = new CKEDITOR.dom.elementPath(c.startContainer, b), c = new CKEDITOR.dom.elementPath(c.endContainer, b), h; e.type == CKEDITOR.NODE_TEXT && (e = e.getParent()); if (g.blockLimit.is({ tr: 1, table: 1 })) { var k = g.contains("table").getParent(); h = function (a) { return !a.equals(k) } } else if (g.block &&
                            g.block.is(CKEDITOR.dtd.$listItem) && (d = d.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !d.equals(c))) { var f = g.contains(CKEDITOR.dtd.$list).getParent(); h = function (a) { return !a.equals(f) } } h || (h = function (a) { return !a.equals(g.block) && !a.equals(g.blockLimit) }); this.rebuildFragment(a, b, e, h)
                    }, rebuildFragment: function (a, b, c, e) { for (var g; c && !c.equals(b) && e(c);)g = c.clone(0, 1), a.fragment.appendTo(g), a.fragment = g, c = c.getParent() }
                }, cell: {
                    shrink: function (a) {
                        a = a.range; var b = a.startContainer, c = a.endContainer,
                            e = a.startOffset, g = a.endOffset; b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is("tr") && ++e == g && a.shrink(CKEDITOR.SHRINK_TEXT)
                    }
                }
            }; w = function () {
                function a(b, c) { var e = b.getParent(); if (e.is(CKEDITOR.dtd.$inline)) b[c ? "insertBefore" : "insertAfter"](e) } function b(c, e, g) { a(e); a(g, 1); for (var d; d = g.getNext();)d.insertAfter(e), e = d; u(c) && c.remove() } function c(a, b) { var e = new CKEDITOR.dom.range(a); e.setStartAfter(b.startNode); e.setEndBefore(b.endNode); return e } return {
                    list: {
                        detectMerge: function (a, b) {
                            var e = c(b, a.bookmark),
                            g = e.startPath(), d = e.endPath(), h = g.contains(CKEDITOR.dtd.$list), k = d.contains(CKEDITOR.dtd.$list); a.mergeList = h && k && h.getParent().equals(k.getParent()) && !h.equals(k); a.mergeListItems = g.block && d.block && g.block.is(CKEDITOR.dtd.$listItem) && d.block.is(CKEDITOR.dtd.$listItem); if (a.mergeList || a.mergeListItems) e = e.clone(), e.setStartBefore(a.bookmark.startNode), e.setEndAfter(a.bookmark.endNode), a.mergeListBookmark = e.createBookmark()
                        }, merge: function (a, c) {
                            if (a.mergeListBookmark) {
                                var e = a.mergeListBookmark.startNode,
                                g = a.mergeListBookmark.endNode, d = new CKEDITOR.dom.elementPath(e, c), h = new CKEDITOR.dom.elementPath(g, c); if (a.mergeList) { var k = d.contains(CKEDITOR.dtd.$list), f = h.contains(CKEDITOR.dtd.$list); k.equals(f) || (f.moveChildren(k), f.remove()) } a.mergeListItems && (d = d.contains(CKEDITOR.dtd.$listItem), h = h.contains(CKEDITOR.dtd.$listItem), d.equals(h) || b(h, e, g)); e.remove(); g.remove()
                            }
                        }
                    }, block: {
                        detectMerge: function (a, b) {
                            if (!a.tableContentsRanges && !a.mergeListBookmark) {
                                var c = new CKEDITOR.dom.range(b); c.setStartBefore(a.bookmark.startNode);
                                c.setEndAfter(a.bookmark.endNode); a.mergeBlockBookmark = c.createBookmark()
                            }
                        }, merge: function (a, c) { if (a.mergeBlockBookmark && !a.purgeTableBookmark) { var e = a.mergeBlockBookmark.startNode, g = a.mergeBlockBookmark.endNode, d = new CKEDITOR.dom.elementPath(e, c), h = new CKEDITOR.dom.elementPath(g, c), d = d.block, h = h.block; d && h && !d.equals(h) && b(h, e, g); e.remove(); g.remove() } }
                    }, table: function () {
                        function a(c) {
                            var g = [], d, h = new CKEDITOR.dom.walker(c), k = c.startPath().contains(e), f = c.endPath().contains(e), m = {}; h.guard = function (a,
                                h) {
                                    if (a.type == CKEDITOR.NODE_ELEMENT) { var l = "visited_" + (h ? "out" : "in"); if (a.getCustomData(l)) return; CKEDITOR.dom.element.setMarker(m, a, l, 1) } if (h && k && a.equals(k)) d = c.clone(), d.setEndAt(k, CKEDITOR.POSITION_BEFORE_END), g.push(d); else if (!h && f && a.equals(f)) d = c.clone(), d.setStartAt(f, CKEDITOR.POSITION_AFTER_START), g.push(d); else {
                                        if (l = !h) l = a.type == CKEDITOR.NODE_ELEMENT && a.is(e) && (!k || b(a, k)) && (!f || b(a, f)); if (!l && (l = h)) if (a.is(e)) var l = k && k.getAscendant("table", !0), n = f && f.getAscendant("table", !0), q = a.getAscendant("table",
                                            !0), l = l && l.contains(q) || n && n.contains(q); else l = void 0; l && (d = c.clone(), d.selectNodeContents(a), g.push(d))
                                    }
                            }; h.lastForward(); CKEDITOR.dom.element.clearAllMarkers(m); return g
                        } function b(a, c) { var e = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED, g = a.getPosition(c); return g === CKEDITOR.POSITION_IDENTICAL ? !1 : 0 === (g & e) } var e = { td: 1, th: 1, caption: 1 }; return {
                            detectPurge: function (a) {
                                var b = a.range, c = b.clone(); c.enlarge(CKEDITOR.ENLARGE_ELEMENT); var c = new CKEDITOR.dom.walker(c), g = 0; c.evaluator = function (a) {
                                    a.type ==
                                    CKEDITOR.NODE_ELEMENT && a.is(e) && ++g
                                }; c.checkForward(); if (1 < g) { var c = b.startPath().contains("table"), d = b.endPath().contains("table"); c && d && b.checkBoundaryOfElement(c, CKEDITOR.START) && b.checkBoundaryOfElement(d, CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c), b.setEndAfter(d), a.purgeTableBookmark = b.createBookmark()) }
                            }, detectRanges: function (g, d) {
                                var h = c(d, g.bookmark), k = h.clone(), f, m, l = h.getCommonAncestor(); l.is(CKEDITOR.dtd.$tableContent) && !l.is(e) && (l = l.getAscendant("table", !0)); m = l; l = new CKEDITOR.dom.elementPath(h.startContainer,
                                    m); m = new CKEDITOR.dom.elementPath(h.endContainer, m); l = l.contains("table"); m = m.contains("table"); if (l || m) l && m && b(l, m) ? (g.tableSurroundingRange = k, k.setStartAt(l, CKEDITOR.POSITION_AFTER_END), k.setEndAt(m, CKEDITOR.POSITION_BEFORE_START), k = h.clone(), k.setEndAt(l, CKEDITOR.POSITION_AFTER_END), f = h.clone(), f.setStartAt(m, CKEDITOR.POSITION_BEFORE_START), f = a(k).concat(a(f))) : l ? m || (g.tableSurroundingRange = k, k.setStartAt(l, CKEDITOR.POSITION_AFTER_END), h.setEndAt(l, CKEDITOR.POSITION_AFTER_END)) : (g.tableSurroundingRange =
                                        k, k.setEndAt(m, CKEDITOR.POSITION_BEFORE_START), h.setStartAt(m, CKEDITOR.POSITION_AFTER_START)), g.tableContentsRanges = f ? f : a(h)
                            }, deleteRanges: function (a) { for (var b; b = a.tableContentsRanges.pop();)b.extractContents(), u(b.startContainer) && b.startContainer.appendBogus(); a.tableSurroundingRange && a.tableSurroundingRange.extractContents() }, purge: function (a) {
                                if (a.purgeTableBookmark) {
                                    var b = a.doc, c = a.range.clone(), b = b.createElement("p"); b.insertBefore(a.purgeTableBookmark.startNode); c.moveToBookmark(a.purgeTableBookmark);
                                    c.deleteContents(); a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START)
                                }
                            }
                        }
                    }(), detectExtractMerge: function (a) { return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) && a.range.endPath().contains(CKEDITOR.dtd.$listItem)) }, fixUneditableRangePosition: function (a) { a.startContainer.getDtd()["#"] || a.moveToClosestEditablePosition(null, !0) }, autoParagraph: function (a, b) {
                        var c = b.startPath(), e; h(a, c.block, c.blockLimit) && (e = l(a)) && (e = b.document.createElement(e), e.appendBogus(), b.insertNode(e), b.moveToPosition(e,
                            CKEDITOR.POSITION_AFTER_START))
                    }
                }
            }()
        })(); (function () {
            function b(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) } function f(a, c) {
                if (0 === a.length || b(a[0].getEnclosedNode())) return !1; var e, g; if ((e = !c && 1 === a.length) && !(e = a[0].collapsed)) {
                    var d = a[0]; e = d.startContainer.getAscendant({ td: 1, th: 1 }, !0); var h = d.endContainer.getAscendant({ td: 1, th: 1 }, !0); g = CKEDITOR.tools.trim; e && e.equals(h) && !e.findOne("td, th, tr, tbody, table") ? (d = d.cloneContents(), e = d.getFirst() ? g(d.getFirst().getText()) !==
                        g(e.getText()) : !0) : e = !1
                } if (e) return !1; for (g = 0; g < a.length; g++)if (e = a[g]._getTableElement(), !e) return !1; return !0
            } function d(a) { function b(a) { a = a.find("td, th"); var c = [], e; for (e = 0; e < a.count(); e++)c.push(a.getItem(e)); return c } var c = [], e, g; for (g = 0; g < a.length; g++)e = a[g]._getTableElement(), e.is && e.is({ td: 1, th: 1 }) ? c.push(e) : c = c.concat(b(e)); return c } function a(a) {
                a = d(a); var b = "", c = [], e, g; for (g = 0; g < a.length; g++)e && !e.equals(a[g].getAscendant("tr")) ? (b += c.join("\t") + "\n", e = a[g].getAscendant("tr"), c = []) : 0 ===
                    g && (e = a[g].getAscendant("tr")), c.push(a[g].getText()); return b += c.join("\t")
            } function c(b) { var c = this.root.editor, e = c.getSelection(1); this.reset(); w = !0; e.root.once("selectionchange", function (a) { a.cancel() }, null, null, 0); e.selectRanges([b[0]]); e = this._.cache; e.ranges = new CKEDITOR.dom.rangeList(b); e.type = CKEDITOR.SELECTION_TEXT; e.selectedElement = b[0]._getTableElement(); e.selectedText = a(b); e.nativeSel = null; this.isFake = 1; this.rev = y++; c._.fakeSelection = this; w = !1; this.root.fire("selectionchange") } function m() {
                var a =
                    this._.fakeSelection, c; if (a) {
                        c = this.getSelection(1); var e; if (!(e = !c) && (e = !c.isHidden())) {
                            e = a; var g = c.getRanges(), d = e.getRanges(), h = g.length && g[0]._getTableElement() && g[0]._getTableElement().getAscendant("table", !0), k = d.length && d[0]._getTableElement() && d[0]._getTableElement().getAscendant("table", !0), m = 1 === g.length && g[0]._getTableElement() && g[0]._getTableElement().is("table"), l = 1 === d.length && d[0]._getTableElement() && d[0]._getTableElement().is("table"); if (b(e.getSelectedElement())) e = !1; else {
                                var n = 1 ===
                                    g.length && g[0].collapsed, d = f(g, !!CKEDITOR.env.webkit) && f(d); h = h && k ? h.equals(k) || k.contains(h) : !1; h && (n || d) ? (m && !l && e.selectRanges(g), e = !0) : e = !1
                            } e = !e
                        } e && (a.reset(), a = 0)
                    } if (!a && (a = c || this.getSelection(1), !a || a.getType() == CKEDITOR.SELECTION_NONE)) return; this.fire("selectionCheck", a); c = this.elementPath(); c.compare(this._.selectionPreviousPath) || (e = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(c.blockLimit), !CKEDITOR.env.webkit && !CKEDITOR.env.gecko || e || (this._.previousActive =
                        this.document.getActive()), this._.selectionPreviousPath = c, this.fire("selectionChange", { selection: a, path: c }))
            } function h() { A = !0; z || (l.call(this), z = CKEDITOR.tools.setTimeout(l, 200, this)) } function l() { z = null; A && (CKEDITOR.tools.setTimeout(m, 0, this), A = !1) } function e(a) { return C(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1 } function k(a) {
                function b(c, e) { return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (e ? "End" : "Start")](c) : !1 } if (!(a.root instanceof CKEDITOR.editable)) return !1;
                var c = a.startContainer, g = a.getPreviousNode(e, null, c), d = a.getNextNode(e, null, c); return b(g) || b(d, 1) || !(g || d || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? !0 : !1
            } function g(a) { n(a, !1); var b = a.getDocument().createText(t); a.setCustomData("cke-fillingChar", b); return b } function n(a, b) {
                var c = a && a.removeCustomData("cke-fillingChar"); if (c) {
                    if (!1 !== b) {
                        var e = a.getDocument().getSelection().getNative(), g = e && "None" != e.type && e.getRangeAt(0), d = t.length; if (c.getLength() > d && g && g.intersectsNode(c.$)) {
                            var h =
                                [{ node: e.anchorNode, offset: e.anchorOffset }, { node: e.focusNode, offset: e.focusOffset }]; e.anchorNode == c.$ && e.anchorOffset > d && (h[0].offset -= d); e.focusNode == c.$ && e.focusOffset > d && (h[1].offset -= d)
                        }
                    } c.setText(q(c.getText(), 1)); h && (c = a.getDocument().$, e = c.getSelection(), c = c.createRange(), c.setStart(h[0].node, h[0].offset), c.collapse(!0), e.removeAllRanges(), e.addRange(c), e.extend(h[1].node, h[1].offset))
                }
            } function q(a, b) { return b ? a.replace(B, function (a, b) { return b ? " " : "" }) : a.replace(t, "") } function u(a, b) {
                var c =
                    b && CKEDITOR.tools.htmlEncode(b) || "\x26nbsp;", c = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' + (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px;width:0;height:0;overflow:hidden;") + '"\x3e' + c + "\x3c/div\x3e", a.document); a.fire("lockSnapshot"); a.editable().append(c); var e = a.getSelection(1), g = a.createRange(), d = e.root.on("selectionchange", function (a) { a.cancel() }, null, null, 0); g.setStartAt(c, CKEDITOR.POSITION_AFTER_START);
                g.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); e.selectRanges([g]); d.removeListener(); a.fire("unlockSnapshot"); a._.hiddenSelectionContainer = c
            } function r(a) {
                var b = { 37: 1, 39: 1, 8: 1, 46: 1 }; return function (c) {
                    var e = c.data.getKeystroke(); if (b[e]) {
                        var g = a.getSelection(), d = g.getRanges()[0]; g.isCollapsed() && (d = d[38 > e ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && "false" == d.getAttribute("contenteditable") && (g = g.getStartElement(), !g.isBlockBoundary() || "" !== (void 0 === g.$.textContent ?
                            g.$.innerText : g.$.textContent) || 8 !== e && 46 !== e || (g.remove(), a.fire("saveSnapshot")), a.getSelection().fake(d), c.data.preventDefault(), c.cancel())
                    }
                }
            } function p(a) {
                for (var b = 0; b < a.length; b++) {
                    var c = a[b]; c.getCommonAncestor().isReadOnly() && a.splice(b, 1); if (!c.collapsed) {
                        if (c.startContainer.isReadOnly()) for (var e = c.startContainer, g; e && !((g = e.type == CKEDITOR.NODE_ELEMENT) && e.is("body") || !e.isReadOnly());)g && "false" == e.getAttribute("contentEditable") && c.setStartAfter(e), e = e.getParent(); e = c.startContainer;
                        g = c.endContainer; var d = c.startOffset, h = c.endOffset, k = c.clone(); e && e.type == CKEDITOR.NODE_TEXT && (d >= e.getLength() ? k.setStartAfter(e) : k.setStartBefore(e)); g && g.type == CKEDITOR.NODE_TEXT && (h ? k.setEndAfter(g) : k.setEndBefore(g)); e = new CKEDITOR.dom.walker(k); e.evaluator = function (e) { if (e.type == CKEDITOR.NODE_ELEMENT && e.isReadOnly()) { var g = c.clone(); c.setEndBefore(e); c.collapsed && a.splice(b--, 1); e.getPosition(k.endContainer) & CKEDITOR.POSITION_CONTAINS || (g.setStartAfter(e), g.collapsed || a.splice(b + 1, 0, g)); return !0 } return !1 };
                        e.next()
                    }
                } return a
            } var v = "function" != typeof window.getSelection, y = 1, t = CKEDITOR.tools.repeat("​", 7), B = new RegExp(t + "( )?", "g"), w, z, A, C = CKEDITOR.dom.walker.invisible(1), D = function () {
                function a(b) { return function (a) { var c = a.editor.createRange(); c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]); return !1 } } function b(a) {
                    return function (b) {
                        var c = b.editor, e = c.createRange(), g; if (!c.readOnly) return (g = e.moveToClosestEditablePosition(b.selected, a)) || (g = e.moveToClosestEditablePosition(b.selected,
                            !a)), g && c.getSelection().selectRanges([e]), c.fire("saveSnapshot"), b.selected.remove(), g || (e.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([e])), c.fire("saveSnapshot"), !1
                    }
                } var c = a(), e = a(1); return { 37: c, 38: c, 39: e, 40: e, 8: b(), 46: b(1) }
            }(); CKEDITOR.on("instanceCreated", function (a) {
                function b() { var a = c.getSelection(); a && a.removeAllRanges() } var c = a.editor; c.on("contentDom", function () {
                    function a() { y = new CKEDITOR.dom.selection(c.getSelection()); y.lock() } function b() {
                        k.removeListener("mouseup",
                            b); q.removeListener("mouseup", b); var a = CKEDITOR.document.$.selection, c = a.createRange(); "None" != a.type && c.parentElement() && c.parentElement().ownerDocument == d.$ && c.select()
                    } function e(a) { var b, c; b = (b = this.document.getActive()) ? "input" === b.getName() || "textarea" === b.getName() : !1; b || (b = this.getSelection(1), (c = g(b)) && !c.equals(f) && (b.selectElement(c), a.data.preventDefault())) } function g(a) {
                        a = a.getRanges()[0]; return a ? (a = a.startContainer.getAscendant(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") },
                            !0)) && "false" === a.getAttribute("contenteditable") ? a : null : null
                    } var d = c.document, k = CKEDITOR.document, f = c.editable(), l = d.getBody(), q = d.getDocumentElement(), u = f.isInline(), t, y; CKEDITOR.env.gecko && f.attachListener(f, "focus", function (a) { a.removeListener(); 0 !== t && (a = c.getSelection().getNative()) && a.isCollapsed && a.anchorNode == f.$ && (a = c.createRange(), a.moveToElementEditStart(f), a.select()) }, null, null, -2); f.attachListener(f, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusin" : "focus", function () {
                        if (t && (CKEDITOR.env.webkit ||
                            CKEDITOR.env.gecko)) { t = c._.previousActive && c._.previousActive.equals(d.getActive()); var a = null != c._.previousScrollTop && c._.previousScrollTop != f.$.scrollTop; CKEDITOR.env.webkit && t && a && (f.$.scrollTop = c._.previousScrollTop) } c.unlockSelection(t); t = 0
                    }, null, null, -1); f.attachListener(f, "mousedown", function () { t = 0 }); if (CKEDITOR.env.ie || CKEDITOR.env.gecko || u) v ? f.attachListener(f, "beforedeactivate", a, null, null, -1) : f.attachListener(c, "selectionCheck", a, null, null, -1), f.attachListener(f, CKEDITOR.env.webkit || CKEDITOR.env.gecko ?
                        "focusout" : "blur", function () { var a = y && (y.isFake || 2 > y.getRanges().length); CKEDITOR.env.gecko && !u && a || (c.lockSelection(y), t = 1) }, null, null, -1), f.attachListener(f, "mousedown", function () { t = 0 }); if (CKEDITOR.env.ie && !u) {
                            var p; f.attachListener(f, "mousedown", function (a) { 2 == a.data.$.button && ((a = c.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (p = c.window.getScrollPosition())) }); f.attachListener(f, "mouseup", function (a) {
                                2 == a.data.$.button && p && (c.document.$.documentElement.scrollLeft = p.x, c.document.$.documentElement.scrollTop =
                                    p.y); p = null
                            }); if ("BackCompat" != d.$.compatMode) {
                                if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) {
                                    var w, A; q.on("mousedown", function (a) {
                                        function b(a) { a = a.data.$; if (w) { var c = l.$.createTextRange(); try { c.moveToPoint(a.clientX, a.clientY) } catch (e) { } w.setEndPoint(0 > A.compareEndPoints("StartToStart", c) ? "EndToEnd" : "StartToStart", c); w.select() } } function c() { q.removeListener("mousemove", b); k.removeListener("mouseup", c); q.removeListener("mouseup", c); w.select() } a = a.data; if (a.getTarget().is("html") && a.$.y < q.$.clientHeight &&
                                            a.$.x < q.$.clientWidth) { w = l.$.createTextRange(); try { w.moveToPoint(a.$.clientX, a.$.clientY) } catch (e) { } A = w.duplicate(); q.on("mousemove", b); k.on("mouseup", c); q.on("mouseup", c) }
                                    })
                                } if (7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version) q.on("mousedown", function (a) { a.data.getTarget().is("html") && (k.on("mouseup", b), q.on("mouseup", b)) })
                            }
                        } f.attachListener(f, "selectionchange", m, c); f.attachListener(f, "keyup", h, c); f.attachListener(f, "touchstart", h, c); f.attachListener(f, "touchend", h, c); CKEDITOR.env.ie && f.attachListener(f,
                            "keydown", e, c); f.attachListener(f, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusin" : "focus", function () { c.forceNextSelectionCheck(); c.selectionChange(1) }); if (u && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) { var B; f.attachListener(f, "mousedown", function () { B = 1 }); f.attachListener(d.getDocumentElement(), "mouseup", function () { B && h.call(c); B = 0 }) } else f.attachListener(CKEDITOR.env.ie ? f : d.getDocumentElement(), "mouseup", h, c); CKEDITOR.env.webkit && f.attachListener(d, "keydown", function (a) {
                                switch (a.data.getKey()) {
                                    case 13: case 33: case 34: case 35: case 36: case 37: case 39: case 8: case 45: case 46: f.hasFocus &&
                                        n(f)
                                }
                            }, null, null, -1); f.attachListener(f, "keydown", r(c), null, null, -1)
                }); c.on("setData", function () { c.unlockSelection(); CKEDITOR.env.webkit && b() }); c.on("contentDomUnload", function () { c.unlockSelection() }); if (CKEDITOR.env.ie9Compat) c.on("beforeDestroy", b, null, null, 9); c.on("dataReady", function () { delete c._.fakeSelection; delete c._.hiddenSelectionContainer; c.selectionChange(1) }); c.on("loadSnapshot", function () {
                    var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT), b = c.editable().getLast(a); b && b.hasAttribute("data-cke-hidden-sel") &&
                        (b.remove(), CKEDITOR.env.gecko && (a = c.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove())
                }, null, null, 100); c.on("key", function (a) { if ("wysiwyg" == c.mode) { var b = c.getSelection(); if (b.isFake) { var e = D[a.data.keyCode]; if (e) return e({ editor: c, selected: b.getSelectedElement(), selection: b, keyEvent: a }) } } })
            }); if (CKEDITOR.env.webkit) CKEDITOR.on("instanceReady", function (a) {
                var b = a.editor; b.on("selectionChange", function () {
                    var a = b.editable(), c = a.getCustomData("cke-fillingChar");
                    c && (c.getCustomData("ready") ? (n(a), a.editor.fire("selectionCheck")) : c.setCustomData("ready", 1))
                }, null, null, -1); b.on("beforeSetMode", function () { n(b.editable()) }, null, null, -1); b.on("getSnapshot", function (a) { a.data && (a.data = q(a.data)) }, b, null, 20); b.on("toDataFormat", function (a) { a.data.dataValue = q(a.data.dataValue) }, null, null, 0)
            }); CKEDITOR.editor.prototype.selectionChange = function (a) { (a ? m : h).call(this) }; CKEDITOR.editor.prototype.getSelection = function (a) {
                return !this._.savedSelection && !this._.fakeSelection ||
                    a ? (a = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection
            }; CKEDITOR.editor.prototype.getSelectedRanges = function (a) { var b = this.getSelection(); return b && b.getRanges(a) || [] }; CKEDITOR.editor.prototype.lockSelection = function (a) { a = a || this.getSelection(1); return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1 }; CKEDITOR.editor.prototype.unlockSelection = function (a) {
                var b = this._.savedSelection; return b ?
                    (b.unlock(a), delete this._.savedSelection, !0) : !1
            }; CKEDITOR.editor.prototype.forceNextSelectionCheck = function () { delete this._.selectionPreviousPath }; CKEDITOR.dom.document.prototype.getSelection = function () { return new CKEDITOR.dom.selection(this) }; CKEDITOR.dom.range.prototype.select = function () { var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root); a.selectRanges([this]); return a }; CKEDITOR.SELECTION_NONE = 1; CKEDITOR.SELECTION_TEXT = 2; CKEDITOR.SELECTION_ELEMENT =
                3; CKEDITOR.dom.selection = function (a) {
                    if (a instanceof CKEDITOR.dom.selection) { var b = a; a = a.root } var c = a instanceof CKEDITOR.dom.element; this.rev = b ? b.rev : y++; this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument(); this.root = c ? a : this.document.getBody(); this.isLocked = 0; this._ = { cache: {} }; if (b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this; a = this.getNative(); var e, g; if (a) if (a.getRangeAt) e = (g = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(g.commonAncestorContainer);
                    else { try { g = a.createRange() } catch (d) { } e = g && CKEDITOR.dom.element.get(g.item && g.item(0) || g.parentElement()) } if (!e || e.type != CKEDITOR.NODE_ELEMENT && e.type != CKEDITOR.NODE_TEXT || !this.root.equals(e) && !this.root.contains(e)) this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList; return this
                }; var F = {
                    img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1,
                    select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1
                }; CKEDITOR.tools.extend(CKEDITOR.dom.selection, { _removeFillingCharSequenceString: q, _createFillingCharSequenceNode: g, FILLING_CHAR_SEQUENCE: t }); CKEDITOR.dom.selection.prototype = {
                    getNative: function () { return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = v ? this.document.$.selection : this.document.getWindow().$.getSelection() }, getType: v ? function () {
                        var a = this._.cache; if (a.type) return a.type; var b = CKEDITOR.SELECTION_NONE;
                        try { var c = this.getNative(), e = c.type; "Text" == e && (b = CKEDITOR.SELECTION_TEXT); "Control" == e && (b = CKEDITOR.SELECTION_ELEMENT); c.createRange().parentElement() && (b = CKEDITOR.SELECTION_TEXT) } catch (g) { } return a.type = b
                    } : function () {
                        var a = this._.cache; if (a.type) return a.type; var b = CKEDITOR.SELECTION_TEXT, c = this.getNative(); if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE; else if (1 == c.rangeCount) {
                            var c = c.getRangeAt(0), e = c.startContainer; e == c.endContainer && 1 == e.nodeType && 1 == c.endOffset - c.startOffset && F[e.childNodes[c.startOffset].nodeName.toLowerCase()] &&
                                (b = CKEDITOR.SELECTION_ELEMENT)
                        } return a.type = b
                    }, getRanges: function () {
                        var a = v ? function () {
                            function a(b) { return (new CKEDITOR.dom.node(b)).getIndex() } var b = function (b, c) {
                                b = b.duplicate(); b.collapse(c); var e = b.parentElement(); if (!e.hasChildNodes()) return { container: e, offset: 0 }; for (var g = e.children, d, h, k = b.duplicate(), f = 0, m = g.length - 1, l = -1, n, q; f <= m;)if (l = Math.floor((f + m) / 2), d = g[l], k.moveToElementText(d), n = k.compareEndPoints("StartToStart", b), 0 < n) m = l - 1; else if (0 > n) f = l + 1; else return { container: e, offset: a(d) };
                                if (-1 == l || l == g.length - 1 && 0 > n) { k.moveToElementText(e); k.setEndPoint("StartToStart", b); k = k.text.replace(/(\r\n|\r)/g, "\n").length; g = e.childNodes; if (!k) return d = g[g.length - 1], d.nodeType != CKEDITOR.NODE_TEXT ? { container: e, offset: g.length } : { container: d, offset: d.nodeValue.length }; for (e = g.length; 0 < k && 0 < e;)h = g[--e], h.nodeType == CKEDITOR.NODE_TEXT && (q = h, k -= h.nodeValue.length); return { container: q, offset: -k } } k.collapse(0 < n ? !0 : !1); k.setEndPoint(0 < n ? "StartToStart" : "EndToStart", b); k = k.text.replace(/(\r\n|\r)/g, "\n").length;
                                if (!k) return { container: e, offset: a(d) + (0 < n ? 0 : 1) }; for (; 0 < k;)try { h = d[0 < n ? "previousSibling" : "nextSibling"], h.nodeType == CKEDITOR.NODE_TEXT && (k -= h.nodeValue.length, q = h), d = h } catch (v) { return { container: e, offset: a(d) } } return { container: q, offset: 0 < n ? -k : q.nodeValue.length + k }
                            }; return function () {
                                var a = this.getNative(), c = a && a.createRange(), e = this.getType(); if (!a) return []; if (e == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root), e = b(c, !0), a.setStart(new CKEDITOR.dom.node(e.container), e.offset), e = b(c),
                                    a.setEnd(new CKEDITOR.dom.node(e.container), e.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse(), [a]; if (e == CKEDITOR.SELECTION_ELEMENT) { for (var e = [], g = 0; g < c.length; g++) { for (var d = c.item(g), h = d.parentNode, k = 0, a = new CKEDITOR.dom.range(this.root); k < h.childNodes.length && h.childNodes[k] != d; k++); a.setStart(new CKEDITOR.dom.node(h), k); a.setEnd(new CKEDITOR.dom.node(h), k + 1); e.push(a) } return e } return []
                            }
                        }() : function () {
                            var a =
                                [], b, c = this.getNative(); if (!c) return a; for (var e = 0; e < c.rangeCount; e++) { var g = c.getRangeAt(e); b = new CKEDITOR.dom.range(this.root); b.setStart(new CKEDITOR.dom.node(g.startContainer), g.startOffset); b.setEnd(new CKEDITOR.dom.node(g.endContainer), g.endOffset); a.push(b) } return a
                        }; return function (b) { var c = this._.cache, e = c.ranges; e || (c.ranges = e = new CKEDITOR.dom.rangeList(a.call(this))); return b ? p(new CKEDITOR.dom.rangeList(e.slice())) : e }
                    }(), getStartElement: function () {
                        var a = this._.cache; if (void 0 !== a.startElement) return a.startElement;
                        var b; switch (this.getType()) {
                            case CKEDITOR.SELECTION_ELEMENT: return this.getSelectedElement(); case CKEDITOR.SELECTION_TEXT: var c = this.getRanges()[0]; if (c) {
                                if (c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); else {
                                    for (c.optimize(); b = c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary();)c.setStartAfter(b); b = c.startContainer; if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent(); if ((b = b.getChild(c.startOffset)) && b.type ==
                                        CKEDITOR.NODE_ELEMENT) for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;)b = c, c = c.getFirst(); else b = c.startContainer
                                } b = b.$
                            }
                        }return a.startElement = b ? new CKEDITOR.dom.element(b) : null
                    }, getSelectedElement: function () {
                        var a = this._.cache; if (void 0 !== a.selectedElement) return a.selectedElement; var b = this, c = CKEDITOR.tools.tryThese(function () { return b.getNative().createRange().item(0) }, function () {
                            for (var a = b.getRanges()[0].clone(), c, e, g = 2; g && !((c = a.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && F[c.getName()] &&
                                (e = c)); g--)a.shrink(CKEDITOR.SHRINK_ELEMENT); return e && e.$
                        }); return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
                    }, getSelectedText: function () { var a = this._.cache; if (void 0 !== a.selectedText) return a.selectedText; var b = this.getNative(), b = v ? "Control" == b.type ? "" : b.createRange().text : b.toString(); return a.selectedText = b }, lock: function () { this.getRanges(); this.getStartElement(); this.getSelectedElement(); this.getSelectedText(); this._.cache.nativeSel = null; this.isLocked = 1 }, unlock: function (a) {
                        if (this.isLocked) {
                            if (a) var b =
                                this.getSelectedElement(), e = this.getRanges(), g = this.isFake; this.isLocked = 0; this.reset(); a && (a = b || e[0] && e[0].getCommonAncestor()) && a.getAscendant("body", 1) && ((a = this.root.editor) && a.plugins.tableselection && a.plugins.tableselection.isSupportedEnvironment(a) && f(e) ? c.call(this, e) : g ? this.fake(b) : b && 2 > e.length ? this.selectElement(b) : this.selectRanges(e))
                        }
                    }, reset: function () {
                        this._.cache = {}; this.isFake = 0; var a = this.root.editor; if (a && a._.fakeSelection) if (this.rev == a._.fakeSelection.rev) {
                            delete a._.fakeSelection;
                            var b = a._.hiddenSelectionContainer; if (b) { var c = a.checkDirty(); a.fire("lockSnapshot"); b.remove(); a.fire("unlockSnapshot"); !c && a.resetDirty() } delete a._.hiddenSelectionContainer
                        } else CKEDITOR.warn("selection-fake-reset"); this.rev = y++
                    }, selectElement: function (a) { var b = new CKEDITOR.dom.range(this.root); b.setStartBefore(a); b.setEndAfter(a); this.selectRanges([b]) }, selectRanges: function (a) {
                        var b = this.root.editor, e = b && b._.hiddenSelectionContainer; this.reset(); if (e) for (var e = this.root, d, h = 0; h < a.length; ++h)d =
                            a[h], d.endContainer.equals(e) && (d.endOffset = Math.min(d.endOffset, e.getChildCount())); if (a.length) if (this.isLocked) { var m = CKEDITOR.document.getActive(); this.unlock(); this.selectRanges(a); this.lock(); m && !m.equals(this.root) && m.focus() } else {
                                var l; a: {
                                    var q, u; if (1 == a.length && !(u = a[0]).collapsed && (l = u.getEnclosedNode()) && l.type == CKEDITOR.NODE_ELEMENT && (u = u.clone(), u.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (q = u.getEnclosedNode()) && q.type == CKEDITOR.NODE_ELEMENT && (l = q), "false" == l.getAttribute("contenteditable"))) break a;
                                    l = void 0
                                } if (l) this.fake(l); else if (b && b.plugins.tableselection && b.plugins.tableselection.isSupportedEnvironment(b) && f(a) && !w && !a[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored")) c.call(this, a); else {
                                    if (v) {
                                        q = CKEDITOR.dom.walker.whitespaces(!0); l = /\ufeff|\u00a0/; u = { table: 1, tbody: 1, tr: 1 }; 1 < a.length && (b = a[a.length - 1], a[0].setEnd(b.endContainer, b.endOffset)); b = a[0]; a = b.collapsed; var t, y, p; if ((e = b.getEnclosedNode()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in F && (!e.is("a") ||
                                            !e.getText())) try { p = e.$.createControlRange(); p.addElement(e.$); p.select(); return } catch (r) { } if (b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.getName() in u || b.endContainer.type == CKEDITOR.NODE_ELEMENT && b.endContainer.getName() in u) b.shrink(CKEDITOR.NODE_ELEMENT, !0), a = b.collapsed; p = b.createBookmark(); u = p.startNode; a || (m = p.endNode); p = b.document.$.body.createTextRange(); p.moveToElementText(u.$); p.moveStart("character", 1); m ? (l = b.document.$.body.createTextRange(), l.moveToElementText(m.$),
                                                p.setEndPoint("EndToEnd", l), p.moveEnd("character", -1)) : (t = u.getNext(q), y = u.hasAscendant("pre"), t = !(t && t.getText && t.getText().match(l)) && (y || !u.hasPrevious() || u.getPrevious().is && u.getPrevious().is("br")), y = b.document.createElement("span"), y.setHtml("\x26#65279;"), y.insertBefore(u), t && b.document.createText("﻿").insertBefore(u)); b.setStartBefore(u); u.remove(); a ? (t ? (p.moveStart("character", -1), p.select(), b.document.$.selection.clear()) : p.select(), b.moveToPosition(y, CKEDITOR.POSITION_BEFORE_START), y.remove()) :
                                                    (b.setEndBefore(m), m.remove(), p.select())
                                    } else {
                                        m = this.getNative(); if (!m) return; this.removeAllRanges(); for (p = 0; p < a.length; p++) {
                                            if (p < a.length - 1 && (t = a[p], y = a[p + 1], l = t.clone(), l.setStart(t.endContainer, t.endOffset), l.setEnd(y.startContainer, y.startOffset), !l.collapsed && (l.shrink(CKEDITOR.NODE_ELEMENT, !0), b = l.getCommonAncestor(), l = l.getEnclosedNode(), b.isReadOnly() || l && l.isReadOnly()))) { y.setStart(t.startContainer, t.startOffset); a.splice(p--, 1); continue } b = a[p]; y = this.document.$.createRange(); b.collapsed &&
                                                CKEDITOR.env.webkit && k(b) && (l = g(this.root), b.insertNode(l), (t = l.getNext()) && !l.getPrevious() && t.type == CKEDITOR.NODE_ELEMENT && "br" == t.getName() ? (n(this.root), b.moveToPosition(t, CKEDITOR.POSITION_BEFORE_START)) : b.moveToPosition(l, CKEDITOR.POSITION_AFTER_END)); y.setStart(b.startContainer.$, b.startOffset); try { y.setEnd(b.endContainer.$, b.endOffset) } catch (A) { if (0 <= A.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")) b.collapse(1), y.setEnd(b.endContainer.$, b.endOffset); else throw A; } m.addRange(y)
                                        }
                                    } this.reset();
                                    this.root.fire("selectionchange")
                                }
                            }
                    }, fake: function (a, b) { var c = this.root.editor; void 0 === b && a.hasAttribute("aria-label") && (b = a.getAttribute("aria-label")); this.reset(); u(c, b); var e = this._.cache, g = new CKEDITOR.dom.range(this.root); g.setStartBefore(a); g.setEndAfter(a); e.ranges = new CKEDITOR.dom.rangeList(g); e.selectedElement = e.startElement = a; e.type = CKEDITOR.SELECTION_ELEMENT; e.selectedText = e.nativeSel = null; this.isFake = 1; this.rev = y++; c._.fakeSelection = this; this.root.fire("selectionchange") }, isHidden: function () {
                        var a =
                            this.getCommonAncestor(); a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent()); return !(!a || !a.data("cke-hidden-sel"))
                    }, isInTable: function (a) { return f(this.getRanges(), a) }, isCollapsed: function () { var a = this.getRanges(); return 1 === a.length && a[0].collapsed }, createBookmarks: function (a) { a = this.getRanges().createBookmarks(a); this.isFake && (a.isFake = 1); return a }, createBookmarks2: function (a) { a = this.getRanges().createBookmarks2(a); this.isFake && (a.isFake = 1); return a }, selectBookmarks: function (a) {
                        for (var b = [], c, e = 0; e <
                            a.length; e++) { var g = new CKEDITOR.dom.range(this.root); g.moveToBookmark(a[e]); b.push(g) } a.isFake && (c = f(b) ? b[0]._getTableElement() : b[0].getEnclosedNode(), c && c.type == CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), a.isFake = 0)); a.isFake && !f(b) ? this.fake(c) : this.selectRanges(b); return this
                    }, getCommonAncestor: function () { var a = this.getRanges(); return a.length ? a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) : null }, scrollIntoView: function () {
                        this.getType() != CKEDITOR.SELECTION_NONE &&
                        this.getRanges()[0].scrollIntoView()
                    }, removeAllRanges: function () { if (this.getType() != CKEDITOR.SELECTION_NONE) { var a = this.getNative(); try { a && a[v ? "empty" : "removeAllRanges"]() } catch (b) { } this.reset() } }
                }
        })(); "use strict"; CKEDITOR.STYLE_BLOCK = 1; CKEDITOR.STYLE_INLINE = 2; CKEDITOR.STYLE_OBJECT = 3; (function () {
            function b(a, b) { for (var c, e; (a = a.getParent()) && !a.equals(b);)if (a.getAttribute("data-nostyle")) c = a; else if (!e) { var g = a.getAttribute("contentEditable"); "false" == g ? c = a : "true" == g && (e = 1) } return c } function f(a,
                b, c, e) { return (a.getPosition(b) | e) == e && (!c.childRule || c.childRule(a)) } function d(a) {
                    var e = a.document; if (a.collapsed) e = y(this, e), a.insertNode(e), a.moveToPosition(e, CKEDITOR.POSITION_BEFORE_END); else {
                        var g = this.element, h = this._.definition, k, m = h.ignoreReadonly, l = m || h.includeReadonly; null == l && (l = a.root.getCustomData("cke_includeReadonly")); var n = CKEDITOR.dtd[g]; n || (k = !0, n = CKEDITOR.dtd.span); a.enlarge(CKEDITOR.ENLARGE_INLINE, 1); a.trim(); var q = a.createBookmark(), u = q.startNode, v = q.endNode, t = u, p; if (!m) {
                            var w =
                                a.getCommonAncestor(), m = b(u, w), w = b(v, w); m && (t = m.getNextSourceNode(!0)); w && (v = w)
                        } for (t.getPosition(v) == CKEDITOR.POSITION_FOLLOWING && (t = 0); t;) {
                            m = !1; if (t.equals(v)) t = null, m = !0; else {
                                var A = t.type == CKEDITOR.NODE_ELEMENT ? t.getName() : null, w = A && "false" == t.getAttribute("contentEditable"), B = A && -1 !== CKEDITOR.tools.array.indexOf(CKEDITOR.style.unstylableElements, A), B = A && (t.getAttribute("data-nostyle") || B); if (A && t.data("cke-bookmark") || t.type === CKEDITOR.NODE_COMMENT) { t = t.getNextSourceNode(!0); continue } if (w && l &&
                                    CKEDITOR.dtd.$block[A]) for (var z = t, C = c(z), F = void 0, H = C.length, P = 0, z = H && new CKEDITOR.dom.range(z.getDocument()); P < H; ++P) { var F = C[P], ea = CKEDITOR.filter.instances[F.data("cke-filter")]; if (ea ? ea.check(this) : 1) z.selectNodeContents(F), d.call(this, z) } C = A ? !n[A] || B ? 0 : w && !l ? 0 : f(t, v, h, x) : 1; if (C) if (F = t.getParent(), C = h, H = g, P = k, !F || !(F.getDtd() || CKEDITOR.dtd.span)[H] && !P || C.parentRule && !C.parentRule(F)) m = !0; else {
                                        if (p || A && CKEDITOR.dtd.$removeEmpty[A] && (t.getPosition(v) | x) != x || (p = a.clone(), p.setStartBefore(t)), A =
                                            t.type, A == CKEDITOR.NODE_TEXT || w || A == CKEDITOR.NODE_ELEMENT && !t.getChildCount()) { for (var A = t, ha; (m = !A.getNext(M)) && (ha = A.getParent(), n[ha.getName()]) && f(ha, u, h, J);)A = ha; p.setEndAfter(A) }
                                    } else m = !0; t = t.getNextSourceNode(B || w)
                            } if (m && p && !p.collapsed) {
                                for (var m = y(this, e), w = m.hasAttributes(), B = p.getCommonAncestor(), A = {}, C = {}, F = {}, H = {}, ga, D, I; m && B;) {
                                    if (B.getName() == g) {
                                        for (ga in h.attributes) !H[ga] && (I = B.getAttribute(D)) && (m.getAttribute(ga) == I ? C[ga] = 1 : H[ga] = 1); for (D in h.styles) !F[D] && (I = B.getStyle(D)) &&
                                            (m.getStyle(D) == I ? A[D] = 1 : F[D] = 1)
                                    } B = B.getParent()
                                } for (ga in C) m.removeAttribute(ga); for (D in A) m.removeStyle(D); w && !m.hasAttributes() && (m = null); m ? (p.extractContents().appendTo(m), p.insertNode(m), r.call(this, m), m.mergeSiblings(), CKEDITOR.env.ie || m.$.normalize()) : (m = new CKEDITOR.dom.element("span"), p.extractContents().appendTo(m), p.insertNode(m), r.call(this, m), m.remove(!0)); p = null
                            }
                        } a.moveToBookmark(q); a.shrink(CKEDITOR.SHRINK_TEXT); a.shrink(CKEDITOR.NODE_ELEMENT, !0)
                    }
                } function a(a) {
                    function b() {
                        for (var a =
                            new CKEDITOR.dom.elementPath(e.getParent()), c = new CKEDITOR.dom.elementPath(l.getParent()), g = null, d = null, h = 0; h < a.elements.length; h++) { var k = a.elements[h]; if (k == a.block || k == a.blockLimit) break; n.checkElementRemovable(k, !0) && (g = k) } for (h = 0; h < c.elements.length; h++) { k = c.elements[h]; if (k == c.block || k == c.blockLimit) break; n.checkElementRemovable(k, !0) && (d = k) } d && l.breakParent(d); g && e.breakParent(g)
                    } a.enlarge(CKEDITOR.ENLARGE_INLINE, 1); var c = a.createBookmark(), e = c.startNode, g = this._.definition.alwaysRemoveElement;
                    if (a.collapsed) {
                        for (var d = new CKEDITOR.dom.elementPath(e.getParent(), a.root), h, k = 0, f; k < d.elements.length && (f = d.elements[k]) && f != d.block && f != d.blockLimit; k++)if (this.checkElementRemovable(f)) { var m; !g && a.collapsed && (a.checkBoundaryOfElement(f, CKEDITOR.END) || (m = a.checkBoundaryOfElement(f, CKEDITOR.START))) ? (h = f, h.match = m ? "start" : "end") : (f.mergeSiblings(), f.is(this.element) ? u.call(this, f) : p(f, w(this)[f.getName()])) } if (h) {
                            g = e; for (k = 0; ; k++) {
                                f = d.elements[k]; if (f.equals(h)) break; else if (f.match) continue;
                                else f = f.clone(); f.append(g); g = f
                            } g["start" == h.match ? "insertBefore" : "insertAfter"](h)
                        }
                    } else { var l = c.endNode, n = this; b(); for (d = e; !d.equals(l);)h = d.getNextSourceNode(), d.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(d) && (d.getName() == this.element ? u.call(this, d) : p(d, w(this)[d.getName()]), h.type == CKEDITOR.NODE_ELEMENT && h.contains(e) && (b(), h = e.getNext())), d = h } a.moveToBookmark(c); a.shrink(CKEDITOR.NODE_ELEMENT, !0)
                } function c(a) {
                    var b = []; a.forEach(function (a) {
                        if ("true" == a.getAttribute("contenteditable")) return b.push(a),
                            !1
                    }, CKEDITOR.NODE_ELEMENT, !0); return b
                } function m(a) { var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0); (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && t(a, this) } function h(a) { var b = a.getCommonAncestor(!0, !0); if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) { var b = this._.definition, c = b.attributes; if (c) for (var e in c) a.removeAttribute(e, c[e]); if (b.styles) for (var g in b.styles) b.styles.hasOwnProperty(g) && a.removeStyle(g) } } function l(a) {
                    var b =
                        a.createBookmark(!0), c = a.createIterator(); c.enforceRealBlocks = !0; this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR); for (var e, g = a.document, d; e = c.getNextParagraph();)!e.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (d = y(this, g, e), k(e, d)); a.moveToBookmark(b)
                } function e(a) {
                    var b = a.createBookmark(1), c = a.createIterator(); c.enforceRealBlocks = !0; c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR; for (var e, g; e = c.getNextParagraph();)this.checkElementRemovable(e) && (e.is("pre") ?
                        ((g = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && e.copyAttributes(g), k(e, g)) : u.call(this, e)); a.moveToBookmark(b)
                } function k(a, b) {
                    var c = !b; c && (b = a.getDocument().createElement("div"), a.copyAttributes(b)); var e = b && b.is("pre"), d = a.is("pre"), h = !e && d; if (e && !d) {
                        d = b; (h = a.getBogus()) && h.remove(); h = a.getHtml(); h = n(h, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""); h = h.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"); h = h.replace(/([ \t\n\r]+|&nbsp;)/g,
                            " "); h = h.replace(/<br\b[^>]*>/gi, "\n"); if (CKEDITOR.env.ie) { var k = a.getDocument().createElement("div"); k.append(d); d.$.outerHTML = "\x3cpre\x3e" + h + "\x3c/pre\x3e"; d.copyAttributes(k.getFirst()); d = k.getFirst().remove() } else d.setHtml(h); b = d
                    } else h ? b = q(c ? [a.getHtml()] : g(a), b) : a.moveChildren(b); b.replace(a); if (e) {
                        var c = b, f; (f = c.getPrevious(E)) && f.type == CKEDITOR.NODE_ELEMENT && f.is("pre") && (e = n(f.getHtml(), /\n$/, "") + "\n\n" + n(c.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? c.$.outerHTML = "\x3cpre\x3e" + e + "\x3c/pre\x3e" :
                            c.setHtml(e), f.remove())
                    } else c && v(b)
                } function g(a) { var b = []; n(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function (a, b, c) { return b + "\x3c/pre\x3e" + c + "\x3cpre\x3e" }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (a, c) { b.push(c) }); return b } function n(a, b, c) { var e = "", g = ""; a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function (a, b, c) { b && (e = b); c && (g = c); return "" }); return e + a.replace(b, c) + g } function q(a, b) {
                    var c;
                    1 < a.length && (c = new CKEDITOR.dom.documentFragment(b.getDocument())); for (var e = 0; e < a.length; e++) {
                        var g = a[e], g = g.replace(/(\r\n|\r)/g, "\n"), g = n(g, /^[ \t]*\n/, ""), g = n(g, /\n$/, ""), g = n(g, /^[ \t]+|[ \t]+$/g, function (a, b) { return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }), g = g.replace(/\n/g, "\x3cbr\x3e"), g = g.replace(/[ \t]{2,}/g, function (a) { return CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }); if (c) {
                            var d = b.clone(); d.setHtml(g);
                            c.append(d)
                        } else b.setHtml(g)
                    } return c || b
                } function u(a, b) {
                    var c = this._.definition, e = c.attributes, c = c.styles, g = w(this)[a.getName()], d = CKEDITOR.tools.isEmpty(e) && CKEDITOR.tools.isEmpty(c), h; for (h in e) if ("class" != h && !this._.definition.fullMatch || a.getAttribute(h) == z(h, e[h])) b && "data-" == h.slice(0, 5) || (d = a.hasAttribute(h), a.removeAttribute(h)); for (var k in c) this._.definition.fullMatch && a.getStyle(k) != z(k, c[k], !0) || (d = d || !!a.getStyle(k), a.removeStyle(k)); p(a, g, D[a.getName()]); d && (this._.definition.alwaysRemoveElement ?
                        v(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? v(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
                } function r(a) { for (var b = w(this), c = a.getElementsByTag(this.element), e, g = c.count(); 0 <= --g;)e = c.getItem(g), e.isReadOnly() || u.call(this, e, !0); for (var d in b) if (d != this.element) for (c = a.getElementsByTag(d), g = c.count() - 1; 0 <= g; g--)e = c.getItem(g), e.isReadOnly() || p(e, b[d]) } function p(a, b, c) {
                    if (b = b && b.attributes) for (var e = 0; e < b.length; e++) {
                        var g = b[e][0],
                        d; if (d = a.getAttribute(g)) { var h = b[e][1]; (null === h || h.test && h.test(d) || "string" == typeof h && d == h) && a.removeAttribute(g) }
                    } c || v(a)
                } function v(a, b) {
                    if (!a.hasAttributes() || b) if (CKEDITOR.dtd.$block[a.getName()]) { var c = a.getPrevious(E), e = a.getNext(E); !c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({ br: 1 }) || a.append("br", 1); !e || e.type != CKEDITOR.NODE_TEXT && e.isBlockBoundary({ br: 1 }) || a.append("br"); a.remove(!0) } else c = a.getFirst(), e = a.getLast(), a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(),
                        e && !c.equals(e) && e.type == CKEDITOR.NODE_ELEMENT && e.mergeSiblings())
                } function y(a, b, c) { var e; e = a.element; "*" == e && (e = "span"); e = new CKEDITOR.dom.element(e, b); c && c.copyAttributes(e); e = t(e, a); b.getCustomData("doc_processing_style") && e.hasAttribute("id") ? e.removeAttribute("id") : b.setCustomData("doc_processing_style", 1); return e } function t(a, b) {
                    var c = b._.definition, e = c.attributes, c = CKEDITOR.style.getStyleText(c); if (e) for (var g in e) a.setAttribute(g, e[g]); c && a.setAttribute("style", c); a.getDocument().removeCustomData("doc_processing_style");
                    return a
                } function B(a, b) { for (var c in a) a[c] = a[c].replace(I, function (a, c) { return b[c] }) } function w(a) { if (a._.overrides) return a._.overrides; var b = a._.overrides = {}, c = a._.definition.overrides; if (c) { CKEDITOR.tools.isArray(c) || (c = [c]); for (var e = 0; e < c.length; e++) { var g = c[e], d, h; "string" == typeof g ? d = g.toLowerCase() : (d = g.element ? g.element.toLowerCase() : a.element, h = g.attributes); g = b[d] || (b[d] = {}); if (h) { var g = g.attributes = g.attributes || [], k; for (k in h) g.push([k.toLowerCase(), h[k]]) } } } return b } function z(a,
                    b, c) { var e = new CKEDITOR.dom.element("span"); e[c ? "setStyle" : "setAttribute"](a, b); return e[c ? "getStyle" : "getAttribute"](a) } function A(a, b) { function c(a, b) { return "font-family" == b.toLowerCase() ? a.replace(/["']/g, "") : a } "string" == typeof a && (a = CKEDITOR.tools.parseCssText(a)); "string" == typeof b && (b = CKEDITOR.tools.parseCssText(b, !0)); for (var e in a) if (!(e in b) || c(b[e], e) != c(a[e], e) && "inherit" != a[e] && "inherit" != b[e]) return !1; return !0 } function C(a, b, c) {
                        var e = a.getRanges(); b = b ? this.removeFromRange : this.applyToRange;
                        for (var g, d = e.createIterator(); g = d.getNextRange();)b.call(this, g, c); a.selectRanges(e)
                    } var D = { address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1 }, F = { a: 1, blockquote: 1, embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1, audio: 1, video: 1 }, G = /\s*(?:;\s*|$)/, I = /#\((.+?)\)/g, M = CKEDITOR.dom.walker.bookmark(0,
                        1), E = CKEDITOR.dom.walker.whitespaces(1); CKEDITOR.style = function (a, b) {
                            if ("string" == typeof a.type) return new CKEDITOR.style.customHandlers[a.type](a); var c = a.attributes; c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style); b && (a = CKEDITOR.tools.clone(a), B(a.attributes, b), B(a.styles, b)); c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() : a.element : "*"; this.type = a.type || (D[c] ? CKEDITOR.STYLE_BLOCK : F[c] ? CKEDITOR.STYLE_OBJECT :
                                CKEDITOR.STYLE_INLINE); "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT); this._ = { definition: a }
                        }; CKEDITOR.style.prototype = {
                            apply: function (a) { if (a instanceof CKEDITOR.dom.document) return C.call(this, a.getSelection()); if (this.checkApplicable(a.elementPath(), a)) { var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); C.call(this, a.getSelection(), 0, a); this._.enterMode = b } }, remove: function (a) {
                                if (a instanceof CKEDITOR.dom.document) return C.call(this, a.getSelection(), 1); if (this.checkApplicable(a.elementPath(),
                                    a)) { var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); C.call(this, a.getSelection(), 1, a); this._.enterMode = b }
                            }, applyToRange: function (a) { this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? d : this.type == CKEDITOR.STYLE_BLOCK ? l : this.type == CKEDITOR.STYLE_OBJECT ? m : null; return this.applyToRange(a) }, removeFromRange: function (b) { this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? a : this.type == CKEDITOR.STYLE_BLOCK ? e : this.type == CKEDITOR.STYLE_OBJECT ? h : null; return this.removeFromRange(b) }, applyToObject: function (a) {
                                t(a,
                                    this)
                            }, checkActive: function (a, b) { switch (this.type) { case CKEDITOR.STYLE_BLOCK: return this.checkElementRemovable(a.block || a.blockLimit, !0, b); case CKEDITOR.STYLE_OBJECT: case CKEDITOR.STYLE_INLINE: for (var c = a.elements, e = 0, g; e < c.length; e++)if (g = c[e], this.type != CKEDITOR.STYLE_INLINE || g != a.block && g != a.blockLimit) { if (this.type == CKEDITOR.STYLE_OBJECT) { var d = g.getName(); if (!("string" == typeof this.element ? d == this.element : d in this.element)) continue } if (this.checkElementRemovable(g, !0, b)) return !0 } }return !1 }, checkApplicable: function (a,
                                b, c) { b && b instanceof CKEDITOR.filter && (c = b); if (c && !c.check(this)) return !1; switch (this.type) { case CKEDITOR.STYLE_OBJECT: return !!a.contains(this.element); case CKEDITOR.STYLE_BLOCK: return !!a.blockLimit.getDtd()[this.element] }return !0 }, checkElementMatch: function (a, b) {
                                    var c = this._.definition; if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1; var e = a.getName(); if ("string" == typeof this.element ? e == this.element : e in this.element) {
                                        if (!b && !a.hasAttributes()) return !0; if (e = c._AC) c = e; else {
                                            var e = {}, g = 0, d = c.attributes;
                                            if (d) for (var h in d) g++, e[h] = d[h]; if (h = CKEDITOR.style.getStyleText(c)) e.style || g++, e.style = h; e._length = g; c = c._AC = e
                                        } if (c._length) { for (var k in c) if ("_length" != k) if (e = a.getAttribute(k) || "", "style" == k ? A(c[k], e) : c[k] == e) { if (!b) return !0 } else if (b) return !1; if (b) return !0 } else return !0
                                    } return !1
                                }, checkElementRemovable: function (a, b, c) {
                                    if (this.checkElementMatch(a, b, c)) return !0; if (b = w(this)[a.getName()]) {
                                        var e; if (!(b = b.attributes)) return !0; for (c = 0; c < b.length; c++)if (e = b[c][0], e = a.getAttribute(e)) {
                                            var g = b[c][1];
                                            if (null === g) return !0; if ("string" == typeof g) { if (e == g) return !0 } else if (g.test(e)) return !0
                                        }
                                    } return !1
                                }, buildPreview: function (a) { var b = this._.definition, c = [], e = b.element; "bdo" == e && (e = "span"); var c = ["\x3c", e], g = b.attributes; if (g) for (var d in g) c.push(" ", d, '\x3d"', g[d], '"'); (g = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', g, '"'); c.push("\x3e", a || b.name, "\x3c/", e, "\x3e"); return c.join("") }, getDefinition: function () { return this._.definition }
                        }; CKEDITOR.style.getStyleText = function (a) {
                            var b = a._ST; if (b) return b;
                            var b = a.styles, c = a.attributes && a.attributes.style || "", e = ""; c.length && (c = c.replace(G, ";")); for (var g in b) { var d = b[g], h = (g + ":" + d).replace(G, ";"); "inherit" == d ? e += h : c += h } c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0)); return a._ST = c + e
                        }; CKEDITOR.style.customHandlers = {}; CKEDITOR.style.unstylableElements = []; CKEDITOR.style.addCustomHandler = function (a) {
                            var b = function (a) { this._ = { definition: a }; this.setup && this.setup(a) }; b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype),
                                { assignedTo: CKEDITOR.STYLE_OBJECT }, a, !0); return this.customHandlers[a.type] = b
                        }; var x = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED, J = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
        })(); CKEDITOR.styleCommand = function (b, f) { this.requiredContent = this.allowedContent = this.style = b; CKEDITOR.tools.extend(this, f, !0) }; CKEDITOR.styleCommand.prototype.exec = function (b) {
            b.focus(); this.state == CKEDITOR.TRISTATE_OFF ? b.applyStyle(this.style) :
                this.state == CKEDITOR.TRISTATE_ON && b.removeStyle(this.style)
        }; CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"); CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet); CKEDITOR.loadStylesSet = function (b, f, d) { CKEDITOR.stylesSet.addExternal(b, f, ""); CKEDITOR.stylesSet.load(b, d) }; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            attachStyleStateChange: function (b, f) {
                var d = this._.styleStateChangeCallbacks; d || (d = this._.styleStateChangeCallbacks = [], this.on("selectionChange",
                    function (a) { for (var b = 0; b < d.length; b++) { var f = d[b], h = f.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF; f.fn.call(this, h) } })); d.push({ style: b, fn: f })
            }, applyStyle: function (b) { b.apply(this) }, removeStyle: function (b) { b.remove(this) }, getStylesSet: function (b) {
                if (this._.stylesDefinitions) b(this._.stylesDefinitions); else {
                    var f = this, d = f.config.stylesCombo_stylesSet || f.config.stylesSet; if (!1 === d) b(null); else if (d instanceof Array) f._.stylesDefinitions = d, b(d); else {
                        d || (d = "default");
                        var d = d.split(":"), a = d[0]; CKEDITOR.stylesSet.addExternal(a, d[1] ? d.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), ""); CKEDITOR.stylesSet.load(a, function (c) { f._.stylesDefinitions = c[a]; b(f._.stylesDefinitions) })
                    }
                }
            }
        }); (function () {
            if (window.Promise) CKEDITOR.tools.promise = Promise; else {
                var b = CKEDITOR.getUrl("vendor/promise.js"); if ("function" === typeof window.define && window.define.amd && "function" === typeof window.require) return window.require([b], function (b) { CKEDITOR.tools.promise = b }); CKEDITOR.scriptLoader.load(b,
                    function (f) { if (!f) return CKEDITOR.error("no-vendor-lib", { path: b }); if ("undefined" !== typeof window.ES6Promise) return CKEDITOR.tools.promise = ES6Promise })
            }
        })(); (function () {
            function b(a, b, m) { a.once("selectionCheck", function (a) { if (!f) { var l = a.data.getRanges()[0]; m.equals(l) ? a.cancel() : b.equals(l) && (d = !0) } }, null, null, -1) } var f = !0, d = !1; CKEDITOR.dom.selection.setupEditorOptimization = function (a) {
                a.on("selectionCheck", function (a) { a.data && !d && a.data.optimizeInElementEnds(); d = !1 }); a.on("contentDom", function () {
                    var b =
                        a.editable(); b && (b.attachListener(b, "keydown", function (a) { this._.shiftPressed = a.data.$.shiftKey }, this), b.attachListener(b, "keyup", function (a) { this._.shiftPressed = a.data.$.shiftKey }, this))
                })
            }; CKEDITOR.dom.selection.prototype.optimizeInElementEnds = function () {
                var a = this.getRanges()[0], c = this.root.editor, d; if (this.root.editor._.shiftPressed || this.isFake || a.isCollapsed || a.startContainer.equals(a.endContainer)) d = !1; else if (0 === a.endOffset) d = !0; else {
                    d = a.startContainer.type === CKEDITOR.NODE_TEXT; var h = a.endContainer.type ===
                        CKEDITOR.NODE_TEXT, l = d ? a.startContainer.getLength() : a.startContainer.getChildCount(); d = a.startOffset === l || d ^ h
                } d && (d = a.clone(), a.shrink(CKEDITOR.SHRINK_TEXT, !1, { skipBogus: !CKEDITOR.env.webkit }), f = !1, b(c, a, d), a.select(), f = !0)
            }
        })(); (function () {
            function b(a, b) { d(a) ? a = Math.round(b * (parseFloat(a) / 100)) : "string" === typeof a && a.match(/^\d+$/gm) && (a = parseInt(a, 10)); return a } function f(a, b) { d(a) ? a = b * (parseFloat(a) / 100) : "string" === typeof a && a.match(/^\d?\.\d+/gm) && (a = parseFloat(a)); return a } function d(a) {
                return "string" ===
                    typeof a && a.match(/^((\d*\.\d+)|(\d+))%{1}$/gm)
            } function a(a, b, c) { return !isNaN(a) && a >= b && a <= c } function c(a) { a = a.toString(16); return 1 == a.length ? "0" + a : a } CKEDITOR.tools.color = CKEDITOR.tools.createClass({
                $: function (a, b) { this._.initialColorCode = a; this._.defaultValue = b; this._.parseInput(a) }, proto: {
                    getHex: function () { if (!this._.isValidColor) return this._.defaultValue; var a = this._.blendAlphaColor(this._.red, this._.green, this._.blue, this._.alpha); return this._.formatHexString(a[0], a[1], a[2]) }, getHexWithAlpha: function () {
                        if (!this._.isValidColor) return this._.defaultValue;
                        var a = Math.round(this._.alpha * CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE); return this._.formatHexString(this._.red, this._.green, this._.blue, a)
                    }, getRgb: function () { if (!this._.isValidColor) return this._.defaultValue; var a = this._.blendAlphaColor(this._.red, this._.green, this._.blue, this._.alpha); return this._.formatRgbString("rgb", a[0], a[1], a[2]) }, getRgba: function () { return this._.isValidColor ? this._.formatRgbString("rgba", this._.red, this._.green, this._.blue, this._.alpha) : this._.defaultValue }, getHsl: function () {
                        if (!this._.isValidColor) return this._.defaultValue;
                        var a = this._.blendAlphaColor(this._.red, this._.green, this._.blue, this._.alpha), a = this._.rgbToHsl(a[0], a[1], a[2]); return this._.formatHslString("hsl", a[0], a[1], a[2])
                    }, getHsla: function () { if (!this._.isValidColor) return this._.defaultValue; var a = this._.rgbToHsl(this._.red, this._.green, this._.blue); return this._.formatHslString("hsla", a[0], a[1], a[2], this._.alpha) }, getInitialValue: function () { return this._.initialColorCode }
                }, _: {
                    initialColorCode: "", isValidColor: !0, red: 0, green: 0, blue: 0, alpha: 1, blendAlphaColor: function (a,
                        b, c, e) { return CKEDITOR.tools.array.map([a, b, c], function (a) { return Math.round(CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE - e * (CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE - a)) }) }, formatHexString: function (a, b, d, e) { a = "#" + c(a) + c(b) + c(d); void 0 !== e && (a += c(e)); return a.toUpperCase() }, formatRgbString: function (a, b, c, e, d) { b = [b, c, e]; void 0 !== d && b.push(d); return a + "(" + b.join(",") + ")" }, formatHslString: function (a, b, c, e, d) { return a + "(" + b + "," + c + "%," + e + "%" + (void 0 !== d ? "," + d : "") + ")" }, parseInput: function (a) {
                            if ("string" !==
                                typeof a) this._.isValidColor = !1; else { a = CKEDITOR.tools.trim(a); var b = this._.matchStringToNamedColor(a); b && (a = b); var b = this._.extractColorChannelsFromHex(a), c = this._.extractColorChannelsFromRgba(a); a = this._.extractColorChannelsFromHsla(a); (a = b || c || a) ? (this._.red = a[0], this._.green = a[1], this._.blue = a[2], this._.alpha = a[3]) : this._.isValidColor = !1 }
                        }, matchStringToNamedColor: function (a) { return CKEDITOR.tools.color.namedColors[a.toLowerCase()] || null }, extractColorChannelsFromHex: function (a) {
                            a.match(CKEDITOR.tools.color.hex3CharsRegExp) &&
                            (a = this._.hex3ToHex6(a)); if (!a.match(CKEDITOR.tools.color.hex6CharsRegExp) && !a.match(CKEDITOR.tools.color.hex8CharsRegExp)) return null; a = a.split(""); var b = 1; a[7] && a[8] && (b = parseInt(a[7] + a[8], 16), b /= CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE, b = Number(b.toFixed(1))); return [parseInt(a[1] + a[2], 16), parseInt(a[3] + a[4], 16), parseInt(a[5] + a[6], 16), b]
                        }, extractColorChannelsFromRgba: function (a) {
                            var c = this._.extractColorChannelsByPattern(a, CKEDITOR.tools.color.rgbRegExp); if (!c || (a = 0 === a.indexOf("rgba")) && 4 !==
                                c.length || !a && 3 !== c.length) return null; var d = b(c[0], CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE), e = b(c[1], CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE), k = b(c[2], CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE), g = 1; a && (g = f(c[3], CKEDITOR.tools.color.MAX_ALPHA_CHANNEL_VALUE)); return this._.areColorChannelsValid(d, e, k, g) ? [d, e, k, g] : null
                        }, extractColorChannelsFromHsla: function (a) {
                            var c = this._.extractColorChannelsByPattern(a, CKEDITOR.tools.color.hslRegExp); if (!c || (a = 0 === a.indexOf("hsla")) && 4 !== c.length || !a && 3 !==
                                c.length) return null; var d = b(c[0], CKEDITOR.tools.color.MAX_HUE_CHANNEL_VALUE), e = f(c[1], CKEDITOR.tools.color.MAX_SATURATION_LIGHTNESS_CHANNEL_VALUE), k = f(c[2], CKEDITOR.tools.color.MAX_SATURATION_LIGHTNESS_CHANNEL_VALUE), g = 1, d = this._.hslToRgb(d, e, k); a && (g = f(c[3], CKEDITOR.tools.color.MAX_ALPHA_CHANNEL_VALUE)); d.push(g); return this._.areColorChannelsValid(d[0], d[1], d[2], d[3]) ? d : null
                        }, hex3ToHex6: function (a) { a = a.split(""); return "#" + a[1] + a[1] + a[2] + a[2] + a[3] + a[3] }, extractColorChannelsByPattern: function (a,
                            b) { var c = a.match(b); if (!c) return null; c = c[2].split(","); return c = CKEDITOR.tools.array.map(c, function (a) { return CKEDITOR.tools.trim(a) }) }, areColorChannelsValid: function (b, c, d, e) { return a(b, 0, CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE) && a(c, 0, CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE) && a(d, 0, CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE) && a(e, 0, CKEDITOR.tools.color.MAX_ALPHA_CHANNEL_VALUE) }, hslToRgb: function (a, b, c) {
                                var e = function (e) {
                                    var g = (e + a / 30) % 12; e = b * Math.min(c, 1 - c); g = Math.min(g - 3, 9 - g, 1); g = Math.max(-1,
                                        g); return Math.round((c - e * g) * CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE)
                                }; return [e(0), e(8), e(4)]
                            }, rgbToHsl: function (a, b, c) {
                                a /= CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE; b /= CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE; var e = c / CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE, d = Math.max(a, b, e), g = Math.min(a, b, e); c = d - g; var f = 0; switch (d) { case a: f = (b - e) / c % 6; break; case b: f = (e - a) / c + 2; break; case e: f = (a - b) / c + 4 }a = 0 === c ? 0 : 60 * f; b = (d + g) / 2; d = 0; 1 !== b && 0 !== b && (d = c / (1 - Math.abs(2 * b - 1))); a = Math.round(a); d = 100 * Math.round(d); return [a,
                                    d, 100 * b]
                            }
                }, statics: {
                    MAX_RGB_CHANNEL_VALUE: 255, MAX_ALPHA_CHANNEL_VALUE: 1, MAX_HUE_CHANNEL_VALUE: 360, MAX_SATURATION_LIGHTNESS_CHANNEL_VALUE: 1, hex3CharsRegExp: /#([0-9a-f]{3}$)/gim, hex6CharsRegExp: /#([0-9a-f]{6}$)/gim, hex8CharsRegExp: /#([0-9a-f]{8}$)/gim, rgbRegExp: /(rgb[a]?)\(([.,\d\s%]*)\)/i, hslRegExp: /(hsl[a]?)\(([.,\d\s%]*)\)/i, namedColors: {
                        aliceblue: "#F0F8FF", antiquewhite: "#FAEBD7", aqua: "#00FFFF", aquamarine: "#7FFFD4", azure: "#F0FFFF", beige: "#F5F5DC", bisque: "#FFE4C4", black: "#000000", blanchedalmond: "#FFEBCD",
                        blue: "#0000FF", blueviolet: "#8A2BE2", brown: "#A52A2A", burlywood: "#DEB887", cadetblue: "#5F9EA0", chartreuse: "#7FFF00", chocolate: "#D2691E", coral: "#FF7F50", cornflowerblue: "#6495ED", cornsilk: "#FFF8DC", crimson: "#DC143C", cyan: "#00FFFF", darkblue: "#00008B", darkcyan: "#008B8B", darkgoldenrod: "#B8860B", darkgray: "#A9A9A9", darkgreen: "#006400", darkgrey: "#A9A9A9", darkkhaki: "#BDB76B", darkmagenta: "#8B008B", darkolivegreen: "#556B2F", darkorange: "#FF8C00", darkorchid: "#9932CC", darkred: "#8B0000", darksalmon: "#E9967A", darkseagreen: "#8FBC8F",
                        darkslateblue: "#483D8B", darkslategray: "#2F4F4F", darkslategrey: "#2F4F4F", darkturquoise: "#00CED1", darkviolet: "#9400D3", deeppink: "#FF1493", deepskyblue: "#00BFFF", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1E90FF", firebrick: "#B22222", floralwhite: "#FFFAF0", forestgreen: "#228B22", fuchsia: "#FF00FF", gainsboro: "#DCDCDC", ghostwhite: "#F8F8FF", gold: "#FFD700", goldenrod: "#DAA520", gray: "#808080", green: "#008000", greenyellow: "#ADFF2F", grey: "#808080", honeydew: "#F0FFF0", hotpink: "#FF69B4", indianred: "#CD5C5C", indigo: "#4B0082",
                        ivory: "#FFFFF0", khaki: "#F0E68C", lavender: "#E6E6FA", lavenderblush: "#FFF0F5", lawngreen: "#7CFC00", lemonchiffon: "#FFFACD", lightblue: "#ADD8E6", lightcoral: "#F08080", lightcyan: "#E0FFFF", lightgoldenrodyellow: "#FAFAD2", lightgray: "#D3D3D3", lightgreen: "#90EE90", lightgrey: "#D3D3D3", lightpink: "#FFB6C1", lightsalmon: "#FFA07A", lightseagreen: "#20B2AA", lightskyblue: "#87CEFA", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#B0C4DE", lightyellow: "#FFFFE0", lime: "#00FF00", limegreen: "#32CD32", linen: "#FAF0E6",
                        magenta: "#FF00FF", maroon: "#800000", mediumaquamarine: "#66CDAA", mediumblue: "#0000CD", mediumorchid: "#BA55D3", mediumpurple: "#9370DB", mediumseagreen: "#3CB371", mediumslateblue: "#7B68EE", mediumspringgreen: "#00FA9A", mediumturquoise: "#48D1CC", mediumvioletred: "#C71585", midnightblue: "#191970", mintcream: "#F5FFFA", mistyrose: "#FFE4E1", moccasin: "#FFE4B5", navajowhite: "#FFDEAD", navy: "#000080", oldlace: "#FDF5E6", olive: "#808000", olivedrab: "#6B8E23", orange: "#FFA500", orangered: "#FF4500", orchid: "#DA70D6", palegoldenrod: "#EEE8AA",
                        palegreen: "#98FB98", paleturquoise: "#AFEEEE", palevioletred: "#DB7093", papayawhip: "#FFEFD5", peachpuff: "#FFDAB9", peru: "#CD853F", pink: "#FFC0CB", plum: "#DDA0DD", powderblue: "#B0E0E6", purple: "#800080", rebeccapurple: "#663399", red: "#FF0000", rosybrown: "#BC8F8F", royalblue: "#4169E1", saddlebrown: "#8B4513", salmon: "#FA8072", sandybrown: "#F4A460", seagreen: "#2E8B57", seashell: "#FFF5EE", sienna: "#A0522D", silver: "#C0C0C0", skyblue: "#87CEEB", slateblue: "#6A5ACD", slategray: "#708090", slategrey: "#708090", snow: "#FFFAFA", springgreen: "#00FF7F",
                        steelblue: "#4682B4", tan: "#D2B48C", teal: "#008080", thistle: "#D8BFD8", tomato: "#FF6347", turquoise: "#40E0D0", violet: "#EE82EE", windowtext: "windowtext", wheat: "#F5DEB3", white: "#FFFFFF", whitesmoke: "#F5F5F5", yellow: "#FFFF00", yellowgreen: "#9ACD32"
                    }
                }
            }); CKEDITOR.tools.style.parse._colors = CKEDITOR.tools.color.namedColors
        })(); CKEDITOR.dom.comment = function (b, f) { "string" == typeof b && (b = (f ? f.$ : document).createComment(b)); CKEDITOR.dom.domObject.call(this, b) }; CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node; CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype,
            { type: CKEDITOR.NODE_COMMENT, getOuterHtml: function () { return "\x3c!--" + this.$.nodeValue + "--\x3e" } }); "use strict"; (function () {
                var b = {}, f = {}, d; for (d in CKEDITOR.dtd.$blockLimit) d in CKEDITOR.dtd.$list || (b[d] = 1); for (d in CKEDITOR.dtd.$block) d in CKEDITOR.dtd.$blockLimit || d in CKEDITOR.dtd.$empty || (f[d] = 1); CKEDITOR.dom.elementPath = function (a, c) {
                    var d = null, h = null, l = [], e = a, k; c = c || a.getDocument().getBody(); e || (e = c); do if (e.type == CKEDITOR.NODE_ELEMENT) {
                        l.push(e); if (!this.lastElement && (this.lastElement = e, e.is(CKEDITOR.dtd.$object) ||
                            "false" == e.getAttribute("contenteditable"))) continue; if (e.equals(c)) break; if (!h && (k = e.getName(), "true" == e.getAttribute("contenteditable") ? h = e : !d && f[k] && (d = e), b[k])) { if (k = !d && "div" == k) { a: { k = e.getChildren(); for (var g = 0, n = k.count(); g < n; g++) { var q = k.getItem(g); if (q.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[q.getName()]) { k = !0; break a } } k = !1 } k = !k } k ? d = e : h = e }
                    } while (e = e.getParent()); h || (h = c); this.block = d; this.blockLimit = h; this.root = c; this.elements = l
                }
            })(); CKEDITOR.dom.elementPath.prototype = {
                compare: function (b) {
                    var f =
                        this.elements; b = b && b.elements; if (!b || f.length != b.length) return !1; for (var d = 0; d < f.length; d++)if (!f[d].equals(b[d])) return !1; return !0
                }, contains: function (b, f, d) {
                    var a = 0, c; "string" == typeof b && (c = function (a) { return a.getName() == b }); b instanceof CKEDITOR.dom.element ? c = function (a) { return a.equals(b) } : CKEDITOR.tools.isArray(b) ? c = function (a) { return -1 < CKEDITOR.tools.indexOf(b, a.getName()) } : "function" == typeof b ? c = b : "object" == typeof b && (c = function (a) { return a.getName() in b }); var m = this.elements, h = m.length; f &&
                        (d ? a += 1 : --h); d && (m = Array.prototype.slice.call(m, 0), m.reverse()); for (; a < h; a++)if (c(m[a])) return m[a]; return null
                }, isContextFor: function (b) { var f; return b in CKEDITOR.dtd.$block ? (f = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!f.getDtd()[b]) : !0 }, direction: function () { return (this.block || this.blockLimit || this.root).getDirection(1) }
            }; CKEDITOR.dom.text = function (b, f) { "string" == typeof b && (b = (f ? f.$ : document).createTextNode(b)); this.$ = b }; CKEDITOR.dom.text.prototype =
                new CKEDITOR.dom.node; CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
                    type: CKEDITOR.NODE_TEXT, getLength: function () { return this.$.nodeValue.length }, getText: function () { return this.$.nodeValue }, setText: function (b) { this.$.nodeValue = b }, isEmpty: function (b) { var f = this.getText(); b && (f = CKEDITOR.tools.trim(f)); return !f || f === CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE }, split: function (b) {
                        var f = this.$.parentNode, d = f.childNodes.length, a = this.getLength(), c = this.getDocument(), m = new CKEDITOR.dom.text(this.$.splitText(b),
                            c); f.childNodes.length == d && (b >= a ? (m = c.createText(""), m.insertAfter(this)) : (b = c.createText(""), b.insertAfter(m), b.remove())); return m
                    }, substring: function (b, f) { return "number" != typeof f ? this.$.nodeValue.substr(b) : this.$.nodeValue.substring(b, f) }
                }); (function () {
                    function b(b, a, c) {
                        var f = b.serializable, h = a[c ? "endContainer" : "startContainer"], l = c ? "endOffset" : "startOffset", e = f ? a.document.getById(b.startNode) : b.startNode; b = f ? a.document.getById(b.endNode) : b.endNode; h.equals(e.getPrevious()) ? (a.startOffset = a.startOffset -
                            h.getLength() - b.getPrevious().getLength(), h = b.getNext()) : h.equals(b.getPrevious()) && (a.startOffset -= h.getLength(), h = b.getNext()); h.equals(e.getParent()) && a[l]++; h.equals(b.getParent()) && a[l]++; a[c ? "endContainer" : "startContainer"] = h; return a
                    } CKEDITOR.dom.rangeList = function (b) { if (b instanceof CKEDITOR.dom.rangeList) return b; b ? b instanceof CKEDITOR.dom.range && (b = [b]) : b = []; return CKEDITOR.tools.extend(b, f) }; var f = {
                        createIterator: function () {
                            var b = this, a = CKEDITOR.dom.walker.bookmark(), c = [], f; return {
                                getNextRange: function (h) {
                                    f =
                                    void 0 === f ? 0 : f + 1; var l = b[f]; if (l && 1 < b.length) { if (!f) for (var e = b.length - 1; 0 <= e; e--)c.unshift(b[e].createBookmark(!0)); if (h) for (var k = 0; b[f + k + 1];) { var g = l.document; h = 0; e = g.getById(c[k].endNode); for (g = g.getById(c[k + 1].startNode); ;) { e = e.getNextSourceNode(!1); if (g.equals(e)) h = 1; else if (a(e) || e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary()) continue; break } if (!h) break; k++ } for (l.moveToBookmark(c.shift()); k--;)e = b[++f], e.moveToBookmark(c.shift()), l.setEnd(e.endContainer, e.endOffset) } return l
                                }
                            }
                        }, createBookmarks: function (d) {
                            for (var a =
                                [], c, f = 0; f < this.length; f++) { a.push(c = this[f].createBookmark(d, !0)); for (var h = f + 1; h < this.length; h++)this[h] = b(c, this[h]), this[h] = b(c, this[h], !0) } return a
                        }, createBookmarks2: function (b) { for (var a = [], c = 0; c < this.length; c++)a.push(this[c].createBookmark2(b)); return a }, moveToBookmarks: function (b) { for (var a = 0; a < this.length; a++)this[a].moveToBookmark(b[a]) }
                    }
                })(); (function () {
                    function b() { return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/") } function f(a) {
                        var c =
                            CKEDITOR.skin["ua_" + a], e = CKEDITOR.env; if (c) for (var c = c.split(",").sort(function (a, b) { return a > b ? -1 : 1 }), d = 0, h; d < c.length; d++)if (h = c[d], e.ie && (h.replace(/^ie/, "") == e.version || e.quirks && "iequirks" == h) && (h = "ie"), e[h]) { a += "_" + c[d]; break } return CKEDITOR.getUrl(b() + a + ".css")
                    } function d(a, b) { m[a] || (CKEDITOR.document.appendStyleSheet(f(a)), m[a] = 1); b && b() } function a(a) { var b = a.getById(h); b || (b = a.getHead().append("style"), b.setAttribute("id", h), b.setAttribute("type", "text/css")); return b } function c(a, b, c) {
                        var e,
                        d, h; if (CKEDITOR.env.webkit) for (b = b.split("}").slice(0, -1), d = 0; d < b.length; d++)b[d] = b[d].split("{"); for (var f = 0; f < a.length; f++)if (CKEDITOR.env.webkit) for (d = 0; d < b.length; d++) { h = b[d][1]; for (e = 0; e < c.length; e++)h = h.replace(c[e][0], c[e][1]); a[f].$.sheet.addRule(b[d][0], h) } else { h = b; for (e = 0; e < c.length; e++)h = h.replace(c[e][0], c[e][1]); CKEDITOR.env.ie && 11 > CKEDITOR.env.version ? a[f].$.styleSheet.cssText += h : a[f].$.innerHTML += h }
                    } var m = {}; CKEDITOR.skin = {
                        path: b, loadPart: function (a, c) {
                            CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ?
                            CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(b() + "skin.js"), function () { d(a, c) }) : d(a, c)
                        }, getPath: function (a) { return CKEDITOR.getUrl(f(a)) }, icons: {}, addIcon: function (a, b, c, e) { a = a.toLowerCase(); this.icons[a] || (this.icons[a] = { path: b, offset: c || 0, bgsize: e || "16px" }) }, getIconStyle: function (a, b, c, e, d) {
                            var h; a && (a = a.toLowerCase(), b && (h = this.icons[a + "-rtl"]), h || (h = this.icons[a])); a = c || h && h.path || ""; e = e || h && h.offset; d = d || h && h.bgsize || "16px"; a && (a = a.replace(/'/g, "\\'")); return a && "background-image:url('" + CKEDITOR.getUrl(a) +
                                "');background-position:0 " + e + "px;background-size:" + d + ";"
                        }
                    }; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, { getUiColor: function () { return this.uiColor }, setUiColor: function (b) { var g = a(CKEDITOR.document); return (this.setUiColor = function (a) { this.uiColor = a; var b = CKEDITOR.skin.chameleon, d = "", h = ""; "function" == typeof b && (d = b(this, "editor"), h = b(this, "panel")); a = [[e, a]]; c([g], d, a); c(l, h, a) }).call(this, b) } }); var h = "cke_ui_color", l = [], e = /\$color/g; CKEDITOR.on("instanceLoaded", function (b) {
                        if (!CKEDITOR.env.ie ||
                            !CKEDITOR.env.quirks) { var g = b.editor; b = function (b) { b = (b.data[0] || b.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument(); if (!b.getById("cke_ui_color")) { var d = a(b); l.push(d); g.on("destroy", function () { l = CKEDITOR.tools.array.filter(l, function (a) { return d !== a }) }); (b = g.getUiColor()) && c([d], CKEDITOR.skin.chameleon(g, "panel"), [[e, b]]) } }; g.on("panelShow", b); g.on("menuShow", b); g.config.uiColor && g.setUiColor(g.config.uiColor) }
                    })
                })(); (function () {
                    var b = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e',
                        CKEDITOR.document); b.appendTo(CKEDITOR.document.getHead()); try { var f = b.getComputedStyle("border-top-color"), d = b.getComputedStyle("border-right-color"); CKEDITOR.env.hc = !(!f || f != d) } catch (a) { CKEDITOR.env.hc = !1 } b.remove(); CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc"); CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}"); CKEDITOR.status = "loaded"; CKEDITOR.fireOnce("loaded"); if (b = CKEDITOR._.pending) for (delete CKEDITOR._.pending, f = 0; f < b.length; f++)CKEDITOR.editor.prototype.constructor.apply(b[f][0],
                            b[f][1]), CKEDITOR.add(b[f][0])
                })(); CKEDITOR.skin.name = "moono-lisa"; CKEDITOR.skin.ua_editor = "ie,iequirks,ie8,gecko"; CKEDITOR.skin.ua_dialog = "ie,iequirks,ie8"; CKEDITOR.skin.chameleon = function () {
                    var b = function () { return function (b, a) { for (var c = b.match(/[^#]./g), f = 0; 3 > f; f++) { var h = f, l; l = parseInt(c[f], 16); l = ("0" + (0 > a ? 0 | l * (1 + a) : 0 | l + (255 - l) * a).toString(16)).slice(-2); c[h] = l } return "#" + c.join("") } }(), f = {
                        editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "),
                        panel: new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
                    };
                    return function (d, a) { var c = b(d.uiColor, .4), c = { id: "." + d.id, defaultBorder: b(c, -.2), toolbarElementsBorder: b(c, -.25), defaultBackground: c, lightBackground: b(c, .8), darkBackground: b(c, -.15), ckeButtonOn: b(c, .4), ckeResizer: b(c, -.4), ckeColorauto: b(c, .8), dialogBody: b(c, .7), dialogTab: b(c, .65), dialogTabSelected: "#FFF", dialogTabSelectedBorder: "#FFF", elementsPathColor: b(c, -.6), menubuttonHover: b(c, .1), menubuttonIcon: b(c, .5), menubuttonIconHover: b(c, .3) }; return f[a].output(c).replace(/\[/g, "{").replace(/\]/g, "}") }
                }();
        CKEDITOR.plugins.add("dialogui", {
            onLoad: function () {
                var b = function (a) { this._ || (this._ = {}); this._["default"] = this._.initValue = a["default"] || ""; this._.required = a.required || !1; for (var b = [this._], c = 1; c < arguments.length; c++)b.push(arguments[c]); b.push(!0); CKEDITOR.tools.extend.apply(CKEDITOR.tools, b); return this._ }, f = { build: function (a, b, c) { return new CKEDITOR.ui.dialog.textInput(a, b, c) } }, d = { build: function (a, b, c) { return new CKEDITOR.ui.dialog[b.type](a, b, c) } }, a = {
                    isChanged: function () {
                        return this.getValue() !=
                            this.getInitValue()
                    }, reset: function (a) { this.setValue(this.getInitValue(), a) }, setInitValue: function () { this._.initValue = this.getValue() }, resetInitValue: function () { this._.initValue = this._["default"] }, getInitValue: function () { return this._.initValue }
                }, c = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onChange: function (a, b) {
                        this._.domOnChangeRegistered || (a.on("load", function () {
                            this.getInputElement().on("change", function () { a.parts.dialog.isVisible() && this.fire("change", { value: this.getValue() }) },
                                this)
                        }, this), this._.domOnChangeRegistered = !0); this.on("change", b)
                    }
                }, !0), m = /^on([A-Z]\w+)/, h = function (a) { for (var b in a) (m.test(b) || "title" == b || "type" == b) && delete a[b]; return a }, l = function (a) { a = a.data.getKeystroke(); a == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : a == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl") }; CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                    labeledElement: function (a, c, g, d) {
                        if (!(4 > arguments.length)) {
                            var h = b.call(this, c); h.labelId = CKEDITOR.tools.getNextId() +
                                "_label"; this._.children = []; var f = { role: c.role || "presentation" }; c.includeLabel && (f["aria-labelledby"] = h.labelId); CKEDITOR.ui.dialog.uiElement.call(this, a, c, g, "div", null, f, function () {
                                    var b = [], g = c.required ? " cke_required" : ""; "horizontal" != c.labelLayout ? b.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" ', ' id\x3d"' + h.labelId + '"', h.inputId ? ' for\x3d"' + h.inputId + '"' : "", (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", c.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
                                        c.controlStyle ? ' style\x3d"' + c.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', d.call(this, a, c), "\x3c/div\x3e") : (g = {
                                            type: "hbox", widths: c.widths, padding: 0, children: [{ type: "html", html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" id\x3d"' + h.labelId + '" for\x3d"' + h.inputId + '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(c.label) + "\x3c/label\x3e" }, {
                                                type: "html", html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' + (c.controlStyle ? ' style\x3d"' + c.controlStyle +
                                                    '"' : "") + "\x3e" + d.call(this, a, c) + "\x3c/span\x3e"
                                            }]
                                        }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(a, g, b)); return b.join("")
                                })
                        }
                    }, textInput: function (a, c, g) {
                        if (!(3 > arguments.length)) {
                            b.call(this, c); var d = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", h = { "class": "cke_dialog_ui_input_" + c.type, id: d, type: c.type }; c.validate && (this.validate = c.validate); c.maxLength && (h.maxlength = c.maxLength); c.size && (h.size = c.size); c.inputStyle && (h.style = c.inputStyle); var f = this, m = !1; a.on("load", function () {
                                f.getInputElement().on("keydown",
                                    function (a) { 13 == a.data.getKeystroke() && (m = !0) }); f.getInputElement().on("keyup", function (b) { 13 == b.data.getKeystroke() && m && (a.getButton("ok") && setTimeout(function () { a.getButton("ok").click() }, 0), m = !1); f.bidi && l.call(f, b) }, null, null, 1E3)
                            }); CKEDITOR.ui.dialog.labeledElement.call(this, a, c, g, function () {
                                var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_', c.type, '" role\x3d"presentation"']; c.width && a.push('style\x3d"width:' + c.width + '" '); a.push("\x3e\x3cinput "); h["aria-labelledby"] = this._.labelId; this._.required &&
                                    (h["aria-required"] = this._.required); for (var b in h) a.push(b + '\x3d"' + h[b] + '" '); a.push(" /\x3e\x3c/div\x3e"); return a.join("")
                            })
                        }
                    }, textarea: function (a, c, g) {
                        if (!(3 > arguments.length)) {
                            b.call(this, c); var d = this, h = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", f = {}; c.validate && (this.validate = c.validate); f.rows = c.rows || 5; f.cols = c.cols || 20; f["class"] = "cke_dialog_ui_input_textarea " + (c["class"] || ""); "undefined" != typeof c.inputStyle && (f.style = c.inputStyle); c.dir && (f.dir = c.dir); if (d.bidi) a.on("load",
                                function () { d.getInputElement().on("keyup", l) }, d); CKEDITOR.ui.dialog.labeledElement.call(this, a, c, g, function () { f["aria-labelledby"] = this._.labelId; this._.required && (f["aria-required"] = this._.required); var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', h, '" '], b; for (b in f) a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(f[b]) + '" '); a.push("\x3e", CKEDITOR.tools.htmlEncode(d._["default"]), "\x3c/textarea\x3e\x3c/div\x3e"); return a.join("") })
                        }
                    }, checkbox: function (a,
                        c, g) {
                            if (!(3 > arguments.length)) {
                                var d = b.call(this, c, { "default": !!c["default"] }); c.validate && (this.validate = c.validate); CKEDITOR.ui.dialog.uiElement.call(this, a, c, g, "span", null, null, function () {
                                    var b = CKEDITOR.tools.extend({}, c, { id: c.id ? c.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox" }, !0), g = [], f = CKEDITOR.tools.getNextId() + "_label", l = { "class": "cke_dialog_ui_checkbox_input", type: "checkbox", "aria-labelledby": f }; h(b); c["default"] && (l.checked = "checked"); "undefined" != typeof b.inputStyle && (b.style = b.inputStyle);
                                    d.checkbox = new CKEDITOR.ui.dialog.uiElement(a, b, g, "input", null, l); g.push(' \x3clabel id\x3d"', f, '" for\x3d"', l.id, '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(c.label), "\x3c/label\x3e"); return g.join("")
                                })
                            }
                    }, radio: function (a, c, g) {
                        if (!(3 > arguments.length)) {
                            b.call(this, c); this._["default"] || (this._["default"] = this._.initValue = c.items[0][1]); c.validate && (this.validate = c.validate); var d = [], f = this; c.role = "radiogroup"; c.includeLabel = !0; CKEDITOR.ui.dialog.labeledElement.call(this,
                                a, c, g, function () {
                                    for (var b = [], g = [], l = (c.id ? c.id : CKEDITOR.tools.getNextId()) + "_radio", m = 0; m < c.items.length; m++) {
                                        var y = c.items[m], t = void 0 !== y[2] ? y[2] : y[0], B = void 0 !== y[1] ? y[1] : y[0], w = CKEDITOR.tools.getNextId() + "_radio_input", z = w + "_label", w = CKEDITOR.tools.extend({}, c, { id: w, title: null, type: null }, !0), t = CKEDITOR.tools.extend({}, w, { title: t }, !0), A = { type: "radio", "class": "cke_dialog_ui_radio_input", name: l, value: B, "aria-labelledby": z }, C = []; f._["default"] == B && (A.checked = "checked"); h(w); h(t); "undefined" != typeof w.inputStyle &&
                                            (w.style = w.inputStyle); w.keyboardFocusable = !0; d.push(new CKEDITOR.ui.dialog.uiElement(a, w, C, "input", null, A)); C.push(" "); new CKEDITOR.ui.dialog.uiElement(a, t, C, "label", null, { id: z, "for": A.id }, y[0]); b.push(C.join(""))
                                    } new CKEDITOR.ui.dialog.hbox(a, d, b, g); return g.join("")
                                }); this._.children = d
                        }
                    }, button: function (a, c, g) {
                        if (arguments.length) {
                            "function" == typeof c && (c = c(a.getParentEditor())); b.call(this, c, { disabled: c.disabled || !1 }); CKEDITOR.event.implementOn(this); var d = this; a.on("load", function () {
                                var a = this.getElement();
                                (function () { a.on("click", function (a) { d.click(); a.data.preventDefault() }); a.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1 } && (d.click(), a.data.preventDefault()) }) })(); a.unselectable()
                            }, this); var h = CKEDITOR.tools.extend({}, c); delete h.style; var f = CKEDITOR.tools.getNextId() + "_label"; CKEDITOR.ui.dialog.uiElement.call(this, a, h, g, "a", null, { style: c.style, href: "javascript:void(0)", title: c.label, hidefocus: "true", "class": c["class"], role: "button", "aria-labelledby": f }, '\x3cspan id\x3d"' + f + '" class\x3d"cke_dialog_ui_button"\x3e' +
                                CKEDITOR.tools.htmlEncode(c.label) + "\x3c/span\x3e")
                        }
                    }, select: function (a, c, g) {
                        if (!(3 > arguments.length)) {
                            var d = b.call(this, c); c.validate && (this.validate = c.validate); d.inputId = CKEDITOR.tools.getNextId() + "_select"; CKEDITOR.ui.dialog.labeledElement.call(this, a, c, g, function () {
                                var b = CKEDITOR.tools.extend({}, c, { id: c.id ? c.id + "_select" : CKEDITOR.tools.getNextId() + "_select" }, !0), g = [], f = [], l = { id: d.inputId, "class": "cke_dialog_ui_input_select", "aria-labelledby": this._.labelId }; g.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
                                    c.type, '" role\x3d"presentation"'); c.width && g.push('style\x3d"width:' + c.width + '" '); g.push("\x3e"); void 0 !== c.size && (l.size = c.size); void 0 !== c.multiple && (l.multiple = c.multiple); h(b); for (var m = 0, y; m < c.items.length && (y = c.items[m]); m++)f.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== y[1] ? y[1] : y[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(y[0])); "undefined" != typeof b.inputStyle && (b.style = b.inputStyle); d.select = new CKEDITOR.ui.dialog.uiElement(a, b, g, "select", null,
                                        l, f.join("")); g.push("\x3c/div\x3e"); return g.join("")
                            })
                        }
                    }, file: function (a, c, g) {
                        if (!(3 > arguments.length)) {
                            void 0 === c["default"] && (c["default"] = ""); var d = CKEDITOR.tools.extend(b.call(this, c), { definition: c, buttons: [] }); c.validate && (this.validate = c.validate); a.on("load", function () { CKEDITOR.document.getById(d.frameId).getParent().addClass("cke_dialog_ui_input_file") }); CKEDITOR.ui.dialog.labeledElement.call(this, a, c, g, function () {
                                d.frameId = CKEDITOR.tools.getNextId() + "_fileInput"; var a = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
                                    d.frameId, '" title\x3d"', c.label, '" src\x3d"javascript:void(']; a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0"); a.push(')"\x3e\x3c/iframe\x3e'); return a.join("")
                            })
                        }
                    }, fileButton: function (a, c, g) {
                        var d = this; if (!(3 > arguments.length)) {
                            b.call(this, c); c.validate && (this.validate = c.validate); var h = CKEDITOR.tools.extend({}, c), f = h.onClick; h.className = (h.className ? h.className + " " : "") + "cke_dialog_ui_button"; h.onClick = function (b) {
                                var g =
                                    c["for"]; b = f ? f.call(this, b) : !1; !1 !== b && ("xhr" !== b && a.getContentElement(g[0], g[1]).submit(), this.disable())
                            }; a.on("load", function () { a.getContentElement(c["for"][0], c["for"][1])._.buttons.push(d) }); CKEDITOR.ui.dialog.button.call(this, a, h, g)
                        }
                    }, html: function () {
                        var a = /^\s*<[\w:]+\s+([^>]*)?>/, b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, c = /\/$/; return function (d, h, f) {
                            if (!(3 > arguments.length)) {
                                var l = [], m = h.html; "\x3c" != m.charAt(0) && (m = "\x3cspan\x3e" + m + "\x3c/span\x3e"); var v = h.focus; if (v) {
                                    var y = this.focus;
                                    this.focus = function () { ("function" == typeof v ? v : y).call(this); this.fire("focus") }; h.isFocusable && (this.isFocusable = this.isFocusable); this.keyboardFocusable = !0
                                } CKEDITOR.ui.dialog.uiElement.call(this, d, h, l, "span", null, null, ""); l = l.join("").match(a); m = m.match(b) || ["", "", ""]; c.test(m[1]) && (m[1] = m[1].slice(0, -1), m[2] = "/" + m[2]); f.push([m[1], " ", l[1] || "", m[2]].join(""))
                            }
                        }
                    }(), fieldset: function (a, b, c, d, h) {
                        var f = h.label; this._ = { children: b }; CKEDITOR.ui.dialog.uiElement.call(this, a, h, d, "fieldset", null, null, function () {
                            var a =
                                []; f && a.push("\x3clegend" + (h.labelStyle ? ' style\x3d"' + h.labelStyle + '"' : "") + "\x3e" + f + "\x3c/legend\x3e"); for (var b = 0; b < c.length; b++)a.push(c[b]); return a.join("")
                        })
                    }
                }, !0); CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement; CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    setLabel: function (a) {
                        var b = CKEDITOR.document.getById(this._.labelId); 1 > b.getChildCount() ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue =
                            a; return this
                    }, getLabel: function () { var a = CKEDITOR.document.getById(this._.labelId); return !a || 1 > a.getChildCount() ? "" : a.getChild(0).getText() }, eventProcessors: c
                }, !0); CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    click: function () { return this._.disabled ? !1 : this.fire("click", { dialog: this._.dialog }) }, enable: function () { this._.disabled = !1; var a = this.getElement(); a && a.removeClass("cke_disabled") }, disable: function () { this._.disabled = !0; this.getElement().addClass("cke_disabled") },
                    isVisible: function () { return this.getElement().getFirst().isVisible() }, isEnabled: function () { return !this._.disabled }, eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, { onClick: function (a, b) { this.on("click", function () { b.apply(this, arguments) }) } }, !0), accessKeyUp: function () { this.click() }, accessKeyDown: function () { this.focus() }, keyboardFocusable: !0
                }, !0); CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                    getInputElement: function () { return CKEDITOR.document.getById(this._.inputId) },
                    focus: function () { var a = this.selectParentTab(); setTimeout(function () { var b = a.getInputElement(); b && b.$.focus() }, 0) }, select: function () { var a = this.selectParentTab(); setTimeout(function () { var b = a.getInputElement(); b && (b.$.focus(), b.$.select()) }, 0) }, accessKeyUp: function () { this.select() }, setValue: function (a) { if (this.bidi) { var b = a && a.charAt(0); (b = "‪" == b ? "ltr" : "‫" == b ? "rtl" : null) && (a = a.slice(1)); this.setDirectionMarker(b) } a || (a = ""); return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments) },
                    getValue: function () { var a = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this); if (this.bidi && a) { var b = this.getDirectionMarker(); b && (a = ("ltr" == b ? "‪" : "‫") + a) } return a }, setDirectionMarker: function (a) { var b = this.getInputElement(); a ? b.setAttributes({ dir: a, "data-cke-dir-marker": a }) : this.getDirectionMarker() && b.removeAttributes(["dir", "data-cke-dir-marker"]) }, getDirectionMarker: function () { return this.getInputElement().data("cke-dir-marker") }, keyboardFocusable: !0
                }, a, !0); CKEDITOR.ui.dialog.textarea.prototype =
                    new CKEDITOR.ui.dialog.textInput; CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                        getInputElement: function () { return this._.select.getElement() }, add: function (a, b, c) { var d = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document), h = this.getInputElement().$; d.$.text = a; d.$.value = void 0 === b || null === b ? a : b; void 0 === c || null === c ? CKEDITOR.env.ie ? h.add(d.$) : h.add(d.$, null) : h.add(d.$, c); return this }, remove: function (a) {
                            this.getInputElement().$.remove(a);
                            return this
                        }, clear: function () { for (var a = this.getInputElement().$; 0 < a.length;)a.remove(0); return this }, keyboardFocusable: !0
                    }, a, !0); CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        getInputElement: function () { return this._.checkbox.getElement() }, setValue: function (a, b) { this.getInputElement().$.checked = a; !b && this.fire("change", { value: a }) }, getValue: function () { return this.getInputElement().$.checked }, accessKeyUp: function () { this.setValue(!this.getValue()) }, eventProcessors: {
                            onChange: function (a,
                                b) { if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return c.onChange.apply(this, arguments); a.on("load", function () { var a = this._.checkbox.getElement(); a.on("propertychange", function (b) { b = b.data.$; "checked" == b.propertyName && this.fire("change", { value: a.$.checked }) }, this) }, this); this.on("change", b); return null }
                        }, keyboardFocusable: !0
                    }, a, !0); CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        setValue: function (a, b) {
                            for (var c = this._.children, d, h = 0; h < c.length && (d = c[h]); h++)d.getElement().$.checked =
                                d.getValue() == a; !b && this.fire("change", { value: a })
                        }, getValue: function () { for (var a = this._.children, b = 0; b < a.length; b++)if (a[b].getElement().$.checked) return a[b].getValue(); return null }, accessKeyUp: function () { var a = this._.children, b; for (b = 0; b < a.length; b++)if (a[b].getElement().$.checked) { a[b].getElement().focus(); return } a[0].getElement().focus() }, eventProcessors: {
                            onChange: function (a, b) {
                                if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return c.onChange.apply(this, arguments); a.on("load", function () {
                                    for (var a =
                                        this._.children, b = this, c = 0; c < a.length; c++)a[c].getElement().on("propertychange", function (a) { a = a.data.$; "checked" == a.propertyName && this.$.checked && b.fire("change", { value: this.getAttribute("value") }) })
                                }, this); this.on("change", b); return null
                            }
                        }
                    }, a, !0); CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, a, {
                        getInputElement: function () {
                            var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument(); return 0 < a.$.forms.length ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) :
                                this.getElement()
                        }, submit: function () { this.getInputElement().getParent().$.submit(); return this }, getAction: function () { return this.getInputElement().getParent().$.action }, registerEvents: function (a) { var b = /^on([A-Z]\w+)/, c, d = function (a, b, c, e) { a.on("formLoaded", function () { a.getInputElement().on(c, e, a) }) }, h; for (h in a) if (c = h.match(b)) this.eventProcessors[h] ? this.eventProcessors[h].call(this, this._.dialog, a[h]) : d(this, this._.dialog, c[1].toLowerCase(), a[h]); return this }, reset: function () {
                            function a() {
                                c.$.open();
                                var e = ""; d.size && (e = d.size - (CKEDITOR.env.ie ? 7 : 0)); var t = b.frameId + "_input"; c.$.write(['\x3chtml dir\x3d"' + m + '" lang\x3d"' + v + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e', '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + m + '" lang\x3d"' + v + '" action\x3d"', CKEDITOR.tools.htmlEncode(d.action), '"\x3e\x3clabel id\x3d"', b.labelId, '" for\x3d"', t, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(d.label),
                                    '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', t, '" aria-labelledby\x3d"', b.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(d.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < e ? e : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + f + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + l + ")}", "\x3c/script\x3e"].join(""));
                                c.$.close(); for (e = 0; e < h.length; e++)h[e].enable()
                            } var b = this._, c = CKEDITOR.document.getById(b.frameId).getFrameDocument(), d = b.definition, h = b.buttons, f = this.formLoadedNumber, l = this.formUnloadNumber, m = b.dialog._.editor.lang.dir, v = b.dialog._.editor.langCode; f || (f = this.formLoadedNumber = CKEDITOR.tools.addFunction(function () { this.fire("formLoaded") }, this), l = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () { this.getInputElement().clearCustomData() }, this), this.getDialog()._.editor.on("destroy", function () {
                                CKEDITOR.tools.removeFunction(f);
                                CKEDITOR.tools.removeFunction(l)
                            })); CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
                        }, getValue: function () { return this.getInputElement().$.value || "" }, setInitValue: function () { this._.initValue = "" }, eventProcessors: { onChange: function (a, b) { this._.domOnChangeRegistered || (this.on("formLoaded", function () { this.getInputElement().on("change", function () { this.fire("change", { value: this.getValue() }) }, this) }, this), this._.domOnChangeRegistered = !0); this.on("change", b) } }, keyboardFocusable: !0
                    }, !0); CKEDITOR.ui.dialog.fileButton.prototype =
                        new CKEDITOR.ui.dialog.button; CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype); CKEDITOR.dialog.addUIElement("text", f); CKEDITOR.dialog.addUIElement("password", f); CKEDITOR.dialog.addUIElement("tel", f); CKEDITOR.dialog.addUIElement("textarea", d); CKEDITOR.dialog.addUIElement("checkbox", d); CKEDITOR.dialog.addUIElement("radio", d); CKEDITOR.dialog.addUIElement("button", d); CKEDITOR.dialog.addUIElement("select", d); CKEDITOR.dialog.addUIElement("file", d); CKEDITOR.dialog.addUIElement("fileButton",
                            d); CKEDITOR.dialog.addUIElement("html", d); CKEDITOR.dialog.addUIElement("fieldset", { build: function (a, b, c) { for (var d = b.children, h, f = [], l = [], m = 0; m < d.length && (h = d[m]); m++) { var v = []; f.push(v); l.push(CKEDITOR.dialog._.uiElementBuilders[h.type].build(a, h, v)) } return new CKEDITOR.ui.dialog[b.type](a, l, f, c, b) } })
            }
        }); CKEDITOR.DIALOG_RESIZE_NONE = 0; CKEDITOR.DIALOG_RESIZE_WIDTH = 1; CKEDITOR.DIALOG_RESIZE_HEIGHT = 2; CKEDITOR.DIALOG_RESIZE_BOTH = 3; CKEDITOR.DIALOG_STATE_IDLE = 1; CKEDITOR.DIALOG_STATE_BUSY = 2; (function () {
            function b(a) {
                a._.tabBarMode =
                !0; a._.tabs[a._.currentTabId][0].focus(); a._.currentFocusIndex = -1
            } function f() { for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null } function d() {
                for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
                return null
            } function a(a, b) { for (var c = a.$.getElementsByTagName("input"), e = 0, d = c.length; e < d; e++) { var g = new CKEDITOR.dom.element(c[e]); "text" == g.getAttribute("type").toLowerCase() && (b ? (g.setAttribute("value", g.getCustomData("fake_value") || ""), g.removeCustomData("fake_value")) : (g.setCustomData("fake_value", g.getAttribute("value")), g.setAttribute("value", ""))) } } function c(a, b) {
                var c = this.getInputElement(); c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0)); a || (this.select ? this.select() :
                    this.focus()); b && alert(b); this.fire("validated", { valid: a, msg: b })
            } function m() { var a = this.getInputElement(); a && a.removeAttribute("aria-invalid") } function h(a) {
                var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", M).output({ id: CKEDITOR.tools.getNextNumber(), editorId: a.id, langDir: a.lang.dir, langCode: a.langCode, editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog", closeTitle: a.lang.common.close, hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : "" })), c = b.getChild([0, 0, 0, 0, 0]), e = c.getChild(0),
                d = c.getChild(1); a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c); !CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent())); e.unselectable(); d.unselectable(); return {
                    element: b,
                    parts: { dialog: b.getChild(0), title: e, close: d, tabs: c.getChild(2), contents: c.getChild([3, 0, 0, 0]), footer: c.getChild([3, 0, 1, 0]) }
                }
            } function l(a, b, c) { this.element = b; this.focusIndex = c; this.tabIndex = 0; this.isFocusable = function () { return !b.getAttribute("disabled") && b.isVisible() }; this.focus = function () { a._.currentFocusIndex = this.focusIndex; this.element.focus() }; b.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1, 13: 1 } && this.fire("click") }); b.on("focus", function () { this.fire("mouseover") }); b.on("blur", function () { this.fire("mouseout") }) }
            function e(a) { function b() { a.layout() } var c = CKEDITOR.document.getWindow(); c.on("resize", b); a.on("hide", function () { c.removeListener("resize", b) }) } function k(a, b) { this.dialog = a; for (var c = b.contents, e = 0, d; d = c[e]; e++)c[e] = d && new g(a, d); CKEDITOR.tools.extend(this, b) } function g(a, b) { this._ = { dialog: a }; CKEDITOR.tools.extend(this, b) } function n(a) {
                function b(c) {
                    var k = a.getSize(), l = a.parts.dialog.getParent().getClientSize(), m = c.data.$.screenX, n = c.data.$.screenY, q = m - e.x, t = n - e.y; e = { x: m, y: n }; d.x += q; d.y += t; m = d.x +
                        f[3] < h ? -f[3] : d.x - f[1] > l.width - k.width - h ? l.width - k.width + ("rtl" == g.lang.dir ? 0 : f[1]) : d.x; k = d.y + f[0] < h ? -f[0] : d.y - f[2] > l.height - k.height - h ? l.height - k.height + f[2] : d.y; m = Math.floor(m); k = Math.floor(k); a.move(m, k, 1); c.data.preventDefault()
                } function c() { CKEDITOR.document.removeListener("mousemove", b); CKEDITOR.document.removeListener("mouseup", c); if (CKEDITOR.env.ie6Compat) { var a = F.getChild(0).getFrameDocument(); a.removeListener("mousemove", b); a.removeListener("mouseup", c) } } var e = null, d = null, g = a.getParentEditor(),
                    h = g.config.dialog_magnetDistance, f = CKEDITOR.skin.margins || [0, 0, 0, 0]; "undefined" == typeof h && (h = 20); a.parts.title.on("mousedown", function (g) { if (!a._.moved) { var h = a._.element; h.getFirst().setStyle("position", "absolute"); h.removeStyle("display"); a._.moved = !0; a.layout() } e = { x: g.data.$.screenX, y: g.data.$.screenY }; CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup", c); d = a.getPosition(); CKEDITOR.env.ie6Compat && (h = F.getChild(0).getFrameDocument(), h.on("mousemove", b), h.on("mouseup", c)); g.data.preventDefault() },
                        a)
            } function q(a) {
                function b(c) {
                    var n = "rtl" == g.lang.dir, q = m.width, t = m.height, v = q + (c.data.$.screenX - l.x) * (n ? -1 : 1) * (a._.moved ? 1 : 2), P = t + (c.data.$.screenY - l.y) * (a._.moved ? 1 : 2), y = a._.element.getFirst(), y = n && parseInt(y.getComputedStyle("right"), 10), w = a.getPosition(); w.x = w.x || 0; w.y = w.y || 0; w.y + P > k.height && (P = k.height - w.y); (n ? y : w.x) + v > k.width && (v = k.width - (n ? y : w.x)); P = Math.floor(P); v = Math.floor(v); if (d == CKEDITOR.DIALOG_RESIZE_WIDTH || d == CKEDITOR.DIALOG_RESIZE_BOTH) q = Math.max(e.minWidth || 0, v - h); if (d == CKEDITOR.DIALOG_RESIZE_HEIGHT ||
                        d == CKEDITOR.DIALOG_RESIZE_BOTH) t = Math.max(e.minHeight || 0, P - f); a.resize(q, t); a._.moved && u(a, a._.position.x, a._.position.y); a._.moved || a.layout(); c.data.preventDefault()
                } function c() { CKEDITOR.document.removeListener("mouseup", c); CKEDITOR.document.removeListener("mousemove", b); n && (n.remove(), n = null); if (CKEDITOR.env.ie6Compat) { var a = F.getChild(0).getFrameDocument(); a.removeListener("mouseup", c); a.removeListener("mousemove", b) } } var e = a.definition, d = e.resizable; if (d != CKEDITOR.DIALOG_RESIZE_NONE) {
                    var g =
                        a.getParentEditor(), h, f, k, l, m, n, q = CKEDITOR.tools.addFunction(function (e) {
                            function d(a) { return a.isVisible() } m = a.getSize(); var g = a.parts.contents, q = g.$.getElementsByTagName("iframe").length, t = !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks); q && (n = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%; left:0; top:0;"\x3e\x3c/div\x3e'), g.append(n)); f = m.height - a.parts.contents.getFirst(d).getSize("height", t);
                            h = m.width - a.parts.contents.getFirst(d).getSize("width", 1); l = { x: e.screenX, y: e.screenY }; k = CKEDITOR.document.getWindow().getViewPaneSize(); CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup", c); CKEDITOR.env.ie6Compat && (g = F.getChild(0).getFrameDocument(), g.on("mousemove", b), g.on("mouseup", c)); e.preventDefault && e.preventDefault()
                        }); a.on("load", function () {
                            var b = ""; d == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : d == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical"); b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' +
                                b + " cke_resizer_" + g.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(g.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + q + ', event )"\x3e' + ("ltr" == g.lang.dir ? "◢" : "◣") + "\x3c/div\x3e"); a.parts.footer.append(b, 1)
                        }); g.on("destroy", function () { CKEDITOR.tools.removeFunction(q) })
                }
            } function u(a, b, c) {
                var e = a.parts.dialog.getParent().getClientSize(), d = a.getSize(), g = a._.viewportRatio, h = Math.max(e.width - d.width, 0), e = Math.max(e.height - d.height, 0); g.width = h ? b / h : g.width; g.height = e ? c / e : g.height;
                a._.viewportRatio = g
            } function r(a) { a.data.preventDefault(1) } function p(a) {
                var b = a.config, c = CKEDITOR.skinName || a.config.skin, e = b.dialog_backgroundCoverColor || ("moono-lisa" == c ? "black" : "white"), c = b.dialog_backgroundCoverOpacity, d = b.baseFloatZIndex, b = CKEDITOR.tools.genKey(e, c, d), g = L[b]; CKEDITOR.document.getBody().addClass("cke_dialog_open"); g ? g.show() : (d = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", d, "; top: 0px; left: 0px; ", "; width: 100%; height: 100%;",
                    CKEDITOR.env.ie6Compat ? "" : "background-color: " + e, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (e = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" + e + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", d.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'), d.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + e + "' );document.close();") + "})())"), d.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')),
                    d.push("\x3c/div\x3e"), g = CKEDITOR.dom.element.createFromHtml(d.join("")), g.setOpacity(void 0 !== c ? c : .5), g.on("keydown", r), g.on("keypress", r), g.on("keyup", r), g.appendTo(CKEDITOR.document.getBody()), L[b] = g); a.focusManager.add(g); F = g; CKEDITOR.env.mac && CKEDITOR.env.webkit || g.focus()
            } function v(a) { CKEDITOR.document.getBody().removeClass("cke_dialog_open"); F && (a.focusManager.remove(F), F.hide()) } function y(a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, e = a.data.$.shiftKey, d = String.fromCharCode(a.data.$.keyCode);
                (b = Q[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + d]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
            } function t(a) { var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, e = a.data.$.shiftKey, d = String.fromCharCode(a.data.$.keyCode); (b = Q[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + d]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())) } function B(a, b, c, e, d) {
                (Q[c] || (Q[c] = [])).push({
                    uiElement: a,
                    dialog: b, key: c, keyup: d || a.accessKeyUp, keydown: e || a.accessKeyDown
                })
            } function w(a) { for (var b in Q) { for (var c = Q[b], e = c.length - 1; 0 <= e; e--)c[e].dialog != a && c[e].uiElement != a || c.splice(e, 1); 0 === c.length && delete Q[b] } } function z(a, b) { a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]) } function A() { } var C = CKEDITOR.tools.cssLength, D, F, G = !1, I = !CKEDITOR.env.ie || CKEDITOR.env.edge, M = '\x3cdiv class\x3d"cke_reset_all cke_dialog_container {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" style\x3d"' + (I ?
                "display:flex" : "") + '" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' + CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"' + (I ? "margin:auto" : "position:absolute") + '" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
            CKEDITOR.dialog = function (a, e) {
                function g() { var a = C._.focusList; a.sort(function (a, b) { return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex }); for (var b = a.length, c = 0; c < b; c++)a[c].focusIndex = c } function l(a) {
                    var b = C._.focusList; a = a || 0; if (!(1 > b.length)) {
                        var c = C._.currentFocusIndex; C._.tabBarMode && 0 > a && (c = 0); try { b[c].getInputElement().$.blur() } catch (e) { } var d = c, g = 1 < C._.pageCount; do {
                            d += a; if (g && !C._.tabBarMode && (d == b.length || -1 == d)) {
                                C._.tabBarMode = !0; C._.tabs[C._.currentTabId][0].focus();
                                C._.currentFocusIndex = -1; return
                            } d = (d + b.length) % b.length; if (d == c) break
                        } while (a && !b[d].isFocusable()); b[d].focus(); "text" == b[d].type && b[d].select()
                    }
                } function t(c) {
                    if (C == CKEDITOR.dialog._.currentTop) {
                        var e = c.data.getKeystroke(), g = "rtl" == a.lang.dir, h = [37, 38, 39, 40]; B = r = 0; if (9 == e || e == CKEDITOR.SHIFT + 9) l(e == CKEDITOR.SHIFT + 9 ? -1 : 1), B = 1; else if (e == CKEDITOR.ALT + 121 && !C._.tabBarMode && 1 < C.getPageCount()) b(C), B = 1; else if (-1 != CKEDITOR.tools.indexOf(h, e) && C._.tabBarMode) e = -1 != CKEDITOR.tools.indexOf([g ? 39 : 37, 38], e) ?
                            f.call(C) : d.call(C), C.selectPage(e), C._.tabs[e][0].focus(), B = 1; else if (13 != e && 32 != e || !C._.tabBarMode) if (13 == e) e = c.data.getTarget(), e.is("a", "button", "select", "textarea") || e.is("input") && "button" == e.$.type || ((e = this.getButton("ok")) && CKEDITOR.tools.setTimeout(e.click, 0, e), B = 1), r = 1; else if (27 == e) (e = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(e.click, 0, e) : !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(), r = 1; else return; else this.selectPage(this._.currentTabId), this._.tabBarMode = !1, this._.currentFocusIndex =
                                -1, l(1), B = 1; v(c)
                    }
                } function v(a) { B ? a.data.preventDefault(1) : r && a.data.stopPropagation() } var y = CKEDITOR.dialog._.dialogDefinitions[e], u = CKEDITOR.tools.clone(D), w = a.config.dialog_buttonsOrder || "OS", A = a.lang.dir, p = {}, B, r; ("OS" == w && CKEDITOR.env.mac || "rtl" == w && "ltr" == A || "ltr" == w && "rtl" == A) && u.buttons.reverse(); y = CKEDITOR.tools.extend(y(a), u); y = CKEDITOR.tools.clone(y); y = new k(this, y); u = h(a); this._ = {
                    editor: a, element: u.element, name: e, model: null, contentSize: { width: 0, height: 0 }, size: { width: 0, height: 0 }, contents: {},
                    buttons: {}, accessKeyMap: {}, viewportRatio: { width: .5, height: .5 }, tabs: {}, tabIdList: [], currentTabId: null, currentTabIndex: null, pageCount: 0, lastTab: null, tabBarMode: !1, focusList: [], currentFocusIndex: 0, hasFocus: !1
                }; this.parts = u.parts; CKEDITOR.tools.setTimeout(function () { a.fire("ariaWidget", this.parts.contents) }, 0, this); u = { top: 0, visibility: "hidden" }; CKEDITOR.env.ie6Compat && (u.position = "absolute"); u["rtl" == A ? "right" : "left"] = 0; this.parts.dialog.setStyles(u); CKEDITOR.event.call(this); this.definition = y = CKEDITOR.fire("dialogDefinition",
                    { name: e, definition: y, dialog: this }, a).definition; if (!("removeDialogTabs" in a._) && a.config.removeDialogTabs) { u = a.config.removeDialogTabs.split(";"); for (A = 0; A < u.length; A++)if (w = u[A].split(":"), 2 == w.length) { var z = w[0]; p[z] || (p[z] = []); p[z].push(w[1]) } a._.removeDialogTabs = p } if (a._.removeDialogTabs && (p = a._.removeDialogTabs[e])) for (A = 0; A < p.length; A++)y.removeContents(p[A]); if (y.onLoad) this.on("load", y.onLoad); if (y.onShow) this.on("show", y.onShow); if (y.onHide) this.on("hide", y.onHide); if (y.onOk) this.on("ok",
                        function (b) { a.fire("saveSnapshot"); setTimeout(function () { a.fire("saveSnapshot") }, 0); !1 === y.onOk.call(this, b) && (b.data.hide = !1) }); this.state = CKEDITOR.DIALOG_STATE_IDLE; if (y.onCancel) this.on("cancel", function (a) { !1 === y.onCancel.call(this, a) && (a.data.hide = !1) }); var C = this, F = function (a) { var b = C._.contents, c = !1, e; for (e in b) for (var d in b[e]) if (c = a.call(this, b[e][d])) return }; this.on("ok", function (a) {
                            F(function (b) {
                                if (b.validate) {
                                    var e = b.validate(this), d = "string" == typeof e || !1 === e; d && (a.data.hide = !1, a.stop());
                                    c.call(b, !d, "string" == typeof e ? e : void 0); return d
                                }
                            })
                        }, this, null, 0); this.on("cancel", function (b) { F(function (c) { if (c.isChanged()) return a.config.dialog_noConfirmCancel || confirm(a.lang.common.confirmCancel) || (b.data.hide = !1), !0 }) }, this, null, 0); this.parts.close.on("click", function (a) { !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(); a.data.preventDefault() }, this); this.changeFocus = l; var I = this._.element; a.focusManager.add(I, 1); this.on("show", function () {
                            I.on("keydown", t, this); if (CKEDITOR.env.gecko) I.on("keypress",
                                v, this)
                        }); this.on("hide", function () { I.removeListener("keydown", t); CKEDITOR.env.gecko && I.removeListener("keypress", v); F(function (a) { m.apply(a) }) }); this.on("iframeAdded", function (a) { (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", t, this, null, 0) }); this.on("show", function () {
                            g(); var b = 1 < C._.pageCount; a.config.dialog_startupFocusTab && b ? (C._.tabBarMode = !0, C._.tabs[C._.currentTabId][0].focus(), C._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = b ? -1 : this._.focusList.length -
                                1, y.onFocus ? (b = y.onFocus.call(this)) && b.focus() : l(1))
                        }, this, null, 4294967295); if (CKEDITOR.env.ie6Compat) this.on("load", function () { var a = this.getElement(), b = a.getFirst(); b.remove(); b.appendTo(a) }, this); n(this); q(this); (new CKEDITOR.dom.text(y.title, CKEDITOR.document)).appendTo(this.parts.title); for (A = 0; A < y.contents.length; A++)(p = y.contents[A]) && this.addPage(p); this.parts.tabs.on("click", function (a) {
                            var c = a.data.getTarget(); c.hasClass("cke_dialog_tab") && (c = c.$.id, this.selectPage(c.substring(4, c.lastIndexOf("_"))),
                                b(this), a.data.preventDefault())
                        }, this); A = []; p = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, { type: "hbox", className: "cke_dialog_footer_buttons", widths: [], children: y.buttons }, A).getChild(); this.parts.footer.setHtml(A.join("")); for (A = 0; A < p.length; A++)this._.buttons[p[A].id] = p[A]
            }; CKEDITOR.dialog.prototype = {
                destroy: function () { this.hide(); this._.element.remove() }, resize: function (a, b) {
                    if (!this._.contentSize || this._.contentSize.width != a || this._.contentSize.height != b) {
                        CKEDITOR.dialog.fire("resize",
                            { dialog: this, width: a, height: b }, this._.editor); this.fire("resize", { width: a, height: b }, this._.editor); this.parts.contents.setStyles({ width: a + "px", height: b + "px" }); if ("rtl" == this._.editor.lang.dir && this._.position) { var c = this.parts.dialog.getParent().getClientSize().width; this._.position.x = c - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10) } this._.contentSize = { width: a, height: b }
                    }
                }, getSize: function () {
                    var a = this._.element.getFirst(); return {
                        width: a.$.offsetWidth || 0, height: a.$.offsetHeight ||
                            0
                    }
                }, move: function (a, b, c) {
                    var e = this._.element.getFirst(), d = "rtl" == this._.editor.lang.dir; CKEDITOR.env.ie && e.setStyle("zoom", "100%"); var g = this.parts.dialog.getParent().getClientSize(), h = this.getSize(), f = this._.viewportRatio, k = Math.max(g.width - h.width, 0), g = Math.max(g.height - h.height, 0); this._.position && this._.position.x == a && this._.position.y == b ? (a = Math.floor(k * f.width), b = Math.floor(g * f.height)) : u(this, a, b); this._.position = { x: a, y: b }; d && (a = k - a); b = { top: (0 < b ? b : 0) + "px" }; b[d ? "right" : "left"] = (0 < a ? a : 0) + "px";
                    e.setStyles(b); c && (this._.moved = 1)
                }, getPosition: function () { return CKEDITOR.tools.extend({}, this._.position) }, show: function () {
                    var a = this._.element, b = this.definition, c = CKEDITOR.document.getBody(), d = this._.editor.config.baseFloatZIndex; a.getParent() && a.getParent().equals(c) ? a.setStyle("display", I ? "flex" : "block") : a.appendTo(c); this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight); this.reset(); null === this._.currentTabId &&
                        this.selectPage(this.definition.contents[0].id); null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = d); this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10); this.getElement().setStyle("z-index", CKEDITOR.dialog._.currentZIndex); null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, p(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, c = this._.parentDialog.getElement().getFirst(), c.$.style.zIndex -=
                            Math.floor(d / 2), this._.parentDialog.getElement().setStyle("z-index", c.$.style.zIndex), CKEDITOR.dialog._.currentTop = this); a.on("keydown", y); a.on("keyup", t); this._.hasFocus = !1; for (var g in b.contents) if (b.contents[g]) {
                                var a = b.contents[g], d = this._.tabs[a.id], c = a.requiredContent, h = 0; if (d) {
                                    for (var f in this._.contents[a.id]) {
                                        var k = this._.contents[a.id][f]; "hbox" != k.type && "vbox" != k.type && k.getInputElement() && (k.requiredContent && !this._.editor.activeFilter.check(k.requiredContent) ? k.disable() : (k.enable(),
                                            h++))
                                    } !h || c && !this._.editor.activeFilter.check(c) ? d[0].addClass("cke_dialog_tab_disabled") : d[0].removeClass("cke_dialog_tab_disabled")
                                }
                            } CKEDITOR.tools.setTimeout(function () { this.layout(); e(this); this.parts.dialog.setStyle("visibility", ""); this.fireOnce("load", {}); CKEDITOR.ui.fire("ready", this); this.fire("show", {}); this._.editor.fire("dialogShow", this); this._.parentDialog || this._.editor.focusManager.lock(); this.foreach(function (a) { a.setInitValue && a.setInitValue() }) }, 100, this)
                }, layout: function () {
                    var a =
                        this.parts.dialog; if (this._.moved || !I) { var b = this.getSize(), c = CKEDITOR.document.getWindow().getViewPaneSize(), e; this._.moved && this._.position ? (e = this._.position.x, b = this._.position.y) : (e = (c.width - b.width) / 2, b = (c.height - b.height) / 2); CKEDITOR.env.ie6Compat || (a.setStyle("position", "absolute"), a.removeStyle("margin")); e = Math.floor(e); b = Math.floor(b); this.move(e, b) }
                }, foreach: function (a) { for (var b in this._.contents) for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]); return this }, reset: function () {
                    var a =
                        function (a) { a.reset && a.reset(1) }; return function () { this.foreach(a); return this }
                }(), setupContent: function () { var a = arguments; this.foreach(function (b) { b.setup && b.setup.apply(b, a) }) }, commitContent: function () { var a = arguments; this.foreach(function (b) { CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur(); b.commit && b.commit.apply(b, a) }) }, hide: function () {
                    if (this.parts.dialog.isVisible()) {
                        this.fire("hide", {}); this._.editor.fire("dialogHide", this); this.selectPage(this._.tabIdList[0]);
                        var a = this._.element; a.setStyle("display", "none"); this.parts.dialog.setStyle("visibility", "hidden"); for (w(this); CKEDITOR.dialog._.currentTop != this;)CKEDITOR.dialog._.currentTop.hide(); if (this._.parentDialog) { var b = this._.parentDialog.getElement().getFirst(); this._.parentDialog.getElement().removeStyle("z-index"); b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2)) } else v(this._.editor); if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -=
                            10; else { CKEDITOR.dialog._.currentZIndex = null; a.removeListener("keydown", y); a.removeListener("keyup", t); var c = this._.editor; c.focus(); setTimeout(function () { c.focusManager.unlock(); CKEDITOR.env.iOS && c.window.focus() }, 0) } delete this._.parentDialog; this.foreach(function (a) { a.resetInitValue && a.resetInitValue() }); this.setState(CKEDITOR.DIALOG_STATE_IDLE)
                    }
                }, addPage: function (a) {
                    if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                        for (var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) +
                            '"' : "", e = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, { type: "vbox", className: "cke_dialog_page_contents", children: a.elements, expand: !!a.expand, padding: a.padding, style: a.style || "width: 100%;" }, b), d = this._.contents[a.id] = {}, g = e.getChild(), h = 0; e = g.shift();)e.notAllowed || "hbox" == e.type || "vbox" == e.type || h++, d[e.id] = e, "function" == typeof e.getChild && g.push.apply(g, e.getChild()); h || (a.hidden = !0); b = CKEDITOR.dom.element.createFromHtml(b.join("")); b.setAttribute("role", "tabpanel"); b.setStyle("min-height",
                                "100%"); e = CKEDITOR.env; d = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber(); c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', d, '"', e.gecko && !e.hc ? "" : ' href\x3d"javascript:void(0)"', ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"].join("")); b.setAttribute("aria-labelledby", d); this._.tabs[a.id] = [c, b]; this._.tabIdList.push(a.id); !a.hidden && this._.pageCount++;
                        this._.lastTab = c; this.updateStyle(); b.setAttribute("name", a.id); b.appendTo(this.parts.contents); c.unselectable(); this.parts.tabs.append(c); a.accessKey && (B(this, this, "CTRL+" + a.accessKey, A, z), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
                    }
                }, selectPage: function (b) {
                    if (this._.currentTabId != b && !this._.tabs[b][0].hasClass("cke_dialog_tab_disabled") && !1 !== this.fire("selectPage", { page: b, currentPage: this._.currentTabId })) {
                        for (var c in this._.tabs) {
                            var e = this._.tabs[c][0], d = this._.tabs[c][1]; c != b && (e.removeClass("cke_dialog_tab_selected"),
                                e.removeAttribute("aria-selected"), d.hide()); d.setAttribute("aria-hidden", c != b)
                        } var g = this._.tabs[b]; g[0].addClass("cke_dialog_tab_selected"); g[0].setAttribute("aria-selected", !0); CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (a(g[1]), g[1].show(), setTimeout(function () { a(g[1], 1) }, 0)) : g[1].show(); this._.currentTabId = b; this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, b)
                    }
                }, updateStyle: function () { this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page") }, hidePage: function (a) {
                    var b =
                        this._.tabs[a] && this._.tabs[a][0]; b && 1 != this._.pageCount && b.isVisible() && (a == this._.currentTabId && this.selectPage(f.call(this)), b.hide(), this._.pageCount--, this.updateStyle())
                }, showPage: function (a) { if (a = this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle() }, getElement: function () { return this._.element }, getName: function () { return this._.name }, getContentElement: function (a, b) { var c = this._.contents[a]; return c && c[b] }, getValueOf: function (a, b) { return this.getContentElement(a, b).getValue() },
                setValueOf: function (a, b, c) { return this.getContentElement(a, b).setValue(c) }, getButton: function (a) { return this._.buttons[a] }, click: function (a) { return this._.buttons[a].click() }, disableButton: function (a) { return this._.buttons[a].disable() }, enableButton: function (a) { return this._.buttons[a].enable() }, getPageCount: function () { return this._.pageCount }, getParentEditor: function () { return this._.editor }, getSelectedElement: function () { return this.getParentEditor().getSelection().getSelectedElement() }, addFocusable: function (a,
                    b) { if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new l(this, a, b)); else { this._.focusList.splice(b, 0, new l(this, a, b)); for (var c = b + 1; c < this._.focusList.length; c++)this._.focusList[c].focusIndex++ } }, setState: function (a) {
                        if (this.state != a) {
                            this.state = a; if (a == CKEDITOR.DIALOG_STATE_BUSY) {
                                if (!this.parts.spinner) {
                                    var b = this.getParentEditor().lang.dir, c = { attributes: { "class": "cke_dialog_spinner" }, styles: { "float": "rtl" == b ? "right" : "left" } }; c.styles["margin-" + ("rtl" == b ? "left" : "right")] =
                                        "8px"; this.parts.spinner = CKEDITOR.document.createElement("div", c); this.parts.spinner.setHtml("\x26#8987;"); this.parts.spinner.appendTo(this.parts.title, 1)
                                } this.parts.spinner.show(); this.getButton("ok").disable()
                            } else a == CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable()); this.fire("state", a)
                        }
                    }, getModel: function (a) { return this._.model ? this._.model : this.definition.getModel ? this.definition.getModel(a) : null }, setModel: function (a) { this._.model = a }, getMode: function (a) {
                        if (this.definition.getMode) return this.definition.getMode(a);
                        a = this.getModel(a); return !a || a instanceof CKEDITOR.dom.element && !a.getParent() ? CKEDITOR.dialog.CREATION_MODE : CKEDITOR.dialog.EDITING_MODE
                    }
            }; CKEDITOR.tools.extend(CKEDITOR.dialog, {
                CREATION_MODE: 0, EDITING_MODE: 1, add: function (a, b) { this._.dialogDefinitions[a] && "function" != typeof b || (this._.dialogDefinitions[a] = b) }, exists: function (a) { return !!this._.dialogDefinitions[a] }, getCurrent: function () { return CKEDITOR.dialog._.currentTop }, isTabEnabled: function (a, b, c) {
                    a = a.config.removeDialogTabs; return !(a && a.match(new RegExp("(?:^|;)" +
                        b + ":" + c + "(?:$|;)", "i")))
                }, okButton: function () { var a = function (a, b) { b = b || {}; return CKEDITOR.tools.extend({ id: "ok", type: "button", label: a.lang.common.ok, "class": "cke_dialog_ui_button_ok", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("ok", { hide: !0 }).hide && a.hide() } }, b, !0) }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, !0) }; return a }(), cancelButton: function () {
                    var a = function (a, b) {
                        b = b || {}; return CKEDITOR.tools.extend({
                            id: "cancel", type: "button",
                            label: a.lang.common.cancel, "class": "cke_dialog_ui_button_cancel", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("cancel", { hide: !0 }).hide && a.hide() }
                        }, b, !0)
                    }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, !0) }; return a
                }(), addUIElement: function (a, b) { this._.uiElementBuilders[a] = b }
            }); CKEDITOR.dialog._ = { uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null }; CKEDITOR.event.implementOn(CKEDITOR.dialog); CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
            D = { resizable: CKEDITOR.DIALOG_RESIZE_BOTH, minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton] }; var E = function (a, b, c) { for (var e = 0, d; d = a[e]; e++)if (d.id == b || c && d[c] && (d = E(d[c], b, c))) return d; return null }, x = function (a, b, c, e, d) { if (c) { for (var g = 0, h; h = a[g]; g++) { if (h.id == c) return a.splice(g, 0, b), b; if (e && h[e] && (h = x(h[e], b, c, e, !0))) return h } if (d) return null } a.push(b); return b }, J = function (a, b, c) {
                for (var e = 0, d; d = a[e]; e++) {
                    if (d.id == b) return a.splice(e, 1); if (c && d[c] && (d = J(d[c],
                        b, c))) return d
                } return null
            }; k.prototype = { getContents: function (a) { return E(this.contents, a) }, getButton: function (a) { return E(this.buttons, a) }, addContents: function (a, b) { return x(this.contents, a, b) }, addButton: function (a, b) { return x(this.buttons, a, b) }, removeContents: function (a) { J(this.contents, a) }, removeButton: function (a) { J(this.buttons, a) } }; g.prototype = {
                get: function (a) { return E(this.elements, a, "children") }, add: function (a, b) { return x(this.elements, a, b, "children") }, remove: function (a) {
                    J(this.elements, a,
                        "children")
                }
            }; var L = {}, Q = {}; (function () {
                CKEDITOR.ui.dialog = {
                    uiElement: function (a, b, c, e, d, g, h) {
                        if (!(4 > arguments.length)) {
                            var f = (e.call ? e(b) : e) || "div", k = ["\x3c", f, " "], l = (d && d.call ? d(b) : d) || {}, m = (g && g.call ? g(b) : g) || {}, n = (h && h.call ? h.call(this, a, b) : h) || "", q = this.domId = m.id || CKEDITOR.tools.getNextId() + "_uiElement"; b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (l.display = "none", this.notAllowed = !0); m.id = q; var t = {}; b.type && (t["cke_dialog_ui_" + b.type] = 1); b.className && (t[b.className] =
                                1); b.disabled && (t.cke_disabled = 1); for (var v = m["class"] && m["class"].split ? m["class"].split(" ") : [], q = 0; q < v.length; q++)v[q] && (t[v[q]] = 1); v = []; for (q in t) v.push(q); m["class"] = v.join(" "); b.title && (m.title = b.title); t = (b.style || "").split(";"); b.align && (v = b.align, l["margin-left"] = "left" == v ? 0 : "auto", l["margin-right"] = "right" == v ? 0 : "auto"); for (q in l) t.push(q + ":" + l[q]); b.hidden && t.push("display:none"); for (q = t.length - 1; 0 <= q; q--)"" === t[q] && t.splice(q, 1); 0 < t.length && (m.style = (m.style ? m.style + "; " : "") + t.join("; "));
                            for (q in m) k.push(q + '\x3d"' + CKEDITOR.tools.htmlEncode(m[q]) + '" '); k.push("\x3e", n, "\x3c/", f, "\x3e"); c.push(k.join("")); (this._ || (this._ = {})).dialog = a; "boolean" == typeof b.isChanged && (this.isChanged = function () { return b.isChanged }); "function" == typeof b.isChanged && (this.isChanged = b.isChanged); "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function (a) { return function (c) { a.call(this, b.setValue.call(this, c)) } })); "function" == typeof b.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue,
                                function (a) { return function () { return b.getValue.call(this, a.call(this)) } })); CKEDITOR.event.implementOn(this); this.registerEvents(b); this.accessKeyUp && this.accessKeyDown && b.accessKey && B(this, a, "CTRL+" + b.accessKey); var y = this; a.on("load", function () {
                                    var b = y.getInputElement(); if (b) {
                                        var c = y.type in { checkbox: 1, ratio: 1 } && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : ""; b.on("focus", function () { a._.tabBarMode = !1; a._.hasFocus = !0; y.fire("focus"); c && this.addClass(c) }); b.on("blur", function () {
                                            y.fire("blur");
                                            c && this.removeClass(c)
                                        })
                                    }
                                }); CKEDITOR.tools.extend(this, b); this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function () { a._.currentFocusIndex = y.focusIndex }))
                        }
                    }, hbox: function (a, b, c, e, d) {
                        if (!(4 > arguments.length)) {
                            this._ || (this._ = {}); var g = this._.children = b, h = d && d.widths || null, f = d && d.height || null, k, l = { role: "presentation" }; d && d.align && (l.align = d.align); CKEDITOR.ui.dialog.uiElement.call(this, a, d || { type: "hbox" }, e, "table", {}, l, function () {
                                var a =
                                    ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e']; for (k = 0; k < c.length; k++) {
                                        var b = "cke_dialog_ui_hbox_child", e = []; 0 === k && (b = "cke_dialog_ui_hbox_first"); k == c.length - 1 && (b = "cke_dialog_ui_hbox_last"); a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" '); h ? h[k] && e.push("width:" + C(h[k])) : e.push("width:" + Math.floor(100 / c.length) + "%"); f && e.push("height:" + C(f)); d && void 0 !== d.padding && e.push("padding:" + C(d.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks && g[k].align && e.push("text-align:" + g[k].align);
                                        0 < e.length && a.push('style\x3d"' + e.join("; ") + '" '); a.push("\x3e", c[k], "\x3c/td\x3e")
                                    } a.push("\x3c/tr\x3e\x3c/tbody\x3e"); return a.join("")
                            })
                        }
                    }, vbox: function (a, b, c, e, d) {
                        if (!(3 > arguments.length)) {
                            this._ || (this._ = {}); var g = this._.children = b, h = d && d.width || null, f = d && d.heights || null; CKEDITOR.ui.dialog.uiElement.call(this, a, d || { type: "vbox" }, e, "div", null, { role: "presentation" }, function () {
                                var b = ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" ']; b.push('style\x3d"'); d && d.expand && b.push("height:100%;");
                                b.push("width:" + C(h || "100%"), ";"); CKEDITOR.env.webkit && b.push("float:none;"); b.push('"'); b.push('align\x3d"', CKEDITOR.tools.htmlEncode(d && d.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" '); b.push("\x3e\x3ctbody\x3e"); for (var e = 0; e < c.length; e++) {
                                    var k = []; b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" '); h && k.push("width:" + C(h || "100%")); f ? k.push("height:" + C(f[e])) : d && d.expand && k.push("height:" + Math.floor(100 / c.length) + "%"); d && void 0 !== d.padding && k.push("padding:" + C(d.padding)); CKEDITOR.env.ie &&
                                        CKEDITOR.env.quirks && g[e].align && k.push("text-align:" + g[e].align); 0 < k.length && b.push('style\x3d"', k.join("; "), '" '); b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', c[e], "\x3c/td\x3e\x3c/tr\x3e")
                                } b.push("\x3c/tbody\x3e\x3c/table\x3e"); return b.join("")
                            })
                        }
                    }
                }
            })(); CKEDITOR.ui.dialog.uiElement.prototype = {
                getElement: function () { return CKEDITOR.document.getById(this.domId) }, getInputElement: function () { return this.getElement() }, getDialog: function () { return this._.dialog }, setValue: function (a, b) {
                    this.getInputElement().setValue(a);
                    !b && this.fire("change", { value: a }); return this
                }, getValue: function () { return this.getInputElement().getValue() }, isChanged: function () { return !1 }, selectParentTab: function () { for (var a = this.getInputElement(); (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents");); if (!a) return this; a = a.getAttribute("name"); this._.dialog._.currentTabId != a && this._.dialog.selectPage(a); return this }, focus: function () { this.selectParentTab().getInputElement().focus(); return this }, registerEvents: function (a) {
                    var b =
                        /^on([A-Z]\w+)/, c, e = function (a, b, c, e) { b.on("load", function () { a.getInputElement().on(c, e, a) }) }, d; for (d in a) if (c = d.match(b)) this.eventProcessors[d] ? this.eventProcessors[d].call(this, this._.dialog, a[d]) : e(this, this._.dialog, c[1].toLowerCase(), a[d]); return this
                }, eventProcessors: { onLoad: function (a, b) { a.on("load", b, this) }, onShow: function (a, b) { a.on("show", b, this) }, onHide: function (a, b) { a.on("hide", b, this) } }, accessKeyDown: function () { this.focus() }, accessKeyUp: function () { }, disable: function () {
                    var a = this.getElement();
                    this.getInputElement().setAttribute("disabled", "true"); a.addClass("cke_disabled")
                }, enable: function () { var a = this.getElement(); this.getInputElement().removeAttribute("disabled"); a.removeClass("cke_disabled") }, isEnabled: function () { return !this.getElement().hasClass("cke_disabled") }, isVisible: function () { return this.getInputElement().isVisible() }, isFocusable: function () { return this.isEnabled() && this.isVisible() ? !0 : !1 }
            }; CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,
                { getChild: function (a) { if (1 > arguments.length) return this._.children.concat(); a.splice || (a = [a]); return 2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null } }, !0); CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox; (function () {
                    var a = {
                        build: function (a, b, c) {
                            for (var e = b.children, d, g = [], h = [], f = 0; f < e.length && (d = e[f]); f++) { var k = []; g.push(k); h.push(CKEDITOR.dialog._.uiElementBuilders[d.type].build(a, d, k)) } return new CKEDITOR.ui.dialog[b.type](a,
                                h, g, c, b)
                        }
                    }; CKEDITOR.dialog.addUIElement("hbox", a); CKEDITOR.dialog.addUIElement("vbox", a)
                })(); CKEDITOR.dialogCommand = function (a, b) { this.dialogName = a; CKEDITOR.tools.extend(this, b, !0) }; CKEDITOR.dialogCommand.prototype = { exec: function (a) { var b = this.tabId; a.openDialog(this.dialogName, function (a) { b && a.selectPage(b) }) }, canUndo: !1, editorFocus: 1 }; (function () {
                    var a = /^([a]|[^a])+$/, b = /^\d*$/, c = /^\d*(?:\.\d+)?$/, e = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, d = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                    g = /^(--|-?([a-zA-Z_]|\\))(\\|[a-zA-Z0-9-_])*\s*?:\s*?[^:;]+$/; CKEDITOR.VALIDATE_OR = 1; CKEDITOR.VALIDATE_AND = 2; CKEDITOR.dialog.validate = {
                        functions: function () {
                            var a = arguments; return function () {
                                var b = this && this.getValue ? this.getValue() : a[0], c, e = CKEDITOR.VALIDATE_AND, d = [], g; for (g = 0; g < a.length; g++)if ("function" == typeof a[g]) d.push(a[g]); else break; g < a.length && "string" == typeof a[g] && (c = a[g], g++); g < a.length && "number" == typeof a[g] && (e = a[g]); var h = e == CKEDITOR.VALIDATE_AND ? !0 : !1; for (g = 0; g < d.length; g++)h = e ==
                                    CKEDITOR.VALIDATE_AND ? h && d[g](b) : h || d[g](b); return h ? !0 : c
                            }
                        }, regex: function (a, b) { return function (c) { c = this && this.getValue ? this.getValue() : c; return a.test(c) ? !0 : b } }, notEmpty: function (b) { return this.regex(a, b) }, integer: function (a) { return this.regex(b, a) }, number: function (a) { return this.regex(c, a) }, cssLength: function (a) { return this.functions(function (a) { return d.test(CKEDITOR.tools.trim(a)) }, a) }, htmlLength: function (a) { return this.functions(function (a) { return e.test(CKEDITOR.tools.trim(a)) }, a) }, inlineStyle: function (a) {
                            return this.functions(function (a) {
                                a =
                                CKEDITOR.tools.trim(a).split(";"); "" === a[a.length - 1] && a.pop(); return CKEDITOR.tools.array.every(a, function (a) { return g.test(CKEDITOR.tools.trim(a)) })
                            }, a)
                        }, equals: function (a, b) { return this.functions(function (b) { return b == a }, b) }, notEqual: function (a, b) { return this.functions(function (b) { return b != a }, b) }
                    }; CKEDITOR.on("instanceDestroyed", function (a) {
                        if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) { for (var b; b = CKEDITOR.dialog._.currentTop;)b.hide(); for (var c in L) L[c].remove(); L = {} } a = a.editor._.storedDialogs;
                        for (var e in a) a[e].destroy()
                    })
                })(); CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                    openDialog: function (a, b, c) {
                        var e = null, d = CKEDITOR.dialog._.dialogDefinitions[a]; null === CKEDITOR.dialog._.currentTop && p(this); if ("function" == typeof d) d = this._.storedDialogs || (this._.storedDialogs = {}), e = d[a] || (d[a] = new CKEDITOR.dialog(this, a)), e.setModel(c), b && b.call(e, e), e.show(); else {
                            if ("failed" == d) throw v(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.'); "string" == typeof d &&
                                CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function () { "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed"); this.openDialog(a, b, c) }, this, 0, 1)
                        } CKEDITOR.skin.loadPart("dialog"); if (e) e.once("hide", function () { e.setModel(null) }, null, null, 999); return e
                    }
                }); CKEDITOR.plugins.add("dialog", {
                    requires: "dialogui", init: function (a) {
                        G || (CKEDITOR.document.appendStyleSheet(this.path + "styles/dialog.css"), G = !0); a.on("doubleclick", function (b) { b.data.dialog && a.openDialog(b.data.dialog) },
                            null, null, 999)
                    }
                })
        })(); (function () {
            CKEDITOR.plugins.add("a11yhelp", {
                requires: "dialog", availableLangs: { af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, fr: 1, "fr-ca": 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1 }, init: function (b) {
                    var f = this; b.addCommand("a11yHelp",
                        { exec: function () { var d = b.langCode, d = f.availableLangs[d] ? d : f.availableLangs[d.replace(/-.*/, "")] ? d.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(f.path + "dialogs/lang/" + d + ".js"), function () { b.lang.a11yhelp = f.langEntries[d]; b.openDialog("a11yHelp") }) }, modes: { wysiwyg: 1, source: 1 }, readOnly: 1, canUndo: !1 }); b.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp"); CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js"); b.on("ariaEditorHelpLabel", function (d) { d.data.label = b.lang.common.editorHelp })
                }
            })
        })();
        CKEDITOR.plugins.add("about", { requires: "dialog", init: function (b) { var f = b.addCommand("about", new CKEDITOR.dialogCommand("about")); f.modes = { wysiwyg: 1, source: 1 }; f.canUndo = !1; f.readOnly = 1; b.ui.addButton && b.ui.addButton("About", { label: b.lang.about.dlgTitle, command: "about", toolbar: "about" }); CKEDITOR.dialog.add("about", this.path + "dialogs/about.js") } }); CKEDITOR.plugins.add("basicstyles", {
            init: function (b) {
                var f = 0, d = function (c, d, e, k) {
                    if (k) {
                        k = new CKEDITOR.style(k); var g = a[e]; g.unshift(k); b.attachStyleStateChange(k,
                            function (a) { !b.readOnly && b.getCommand(e).setState(a) }); b.addCommand(e, new CKEDITOR.styleCommand(k, { contentForms: g })); b.ui.addButton && b.ui.addButton(c, { label: d, command: e, toolbar: "basicstyles," + (f += 10) })
                    }
                }, a = {
                    bold: ["strong", "b", ["span", function (a) { a = a.styles["font-weight"]; return "bold" == a || 700 <= +a }]], italic: ["em", "i", ["span", function (a) { return "italic" == a.styles["font-style"] }]], underline: ["u", ["span", function (a) { return "underline" == a.styles["text-decoration"] }]], strike: ["s", "strike", ["span", function (a) {
                        return "line-through" ==
                            a.styles["text-decoration"]
                    }]], subscript: ["sub"], superscript: ["sup"]
                }, c = b.config, m = b.lang.basicstyles; d("Bold", m.bold, "bold", c.coreStyles_bold); d("Italic", m.italic, "italic", c.coreStyles_italic); d("Underline", m.underline, "underline", c.coreStyles_underline); d("Strike", m.strike, "strike", c.coreStyles_strike); d("Subscript", m.subscript, "subscript", c.coreStyles_subscript); d("Superscript", m.superscript, "superscript", c.coreStyles_superscript); b.setKeystroke([[CKEDITOR.CTRL + 66, "bold"], [CKEDITOR.CTRL + 73, "italic"],
                [CKEDITOR.CTRL + 85, "underline"]])
            }
        }); CKEDITOR.config.coreStyles_bold = { element: "strong", overrides: "b" }; CKEDITOR.config.coreStyles_italic = { element: "em", overrides: "i" }; CKEDITOR.config.coreStyles_underline = { element: "u" }; CKEDITOR.config.coreStyles_strike = { element: "s", overrides: "strike" }; CKEDITOR.config.coreStyles_subscript = { element: "sub" }; CKEDITOR.config.coreStyles_superscript = { element: "sup" }; (function () {
            function b(a, b, c, e) {
                if (!a.isReadOnly() && !a.equals(c.editable())) {
                    CKEDITOR.dom.element.setMarker(e, a,
                        "bidi_processed", 1); e = a; for (var d = c.editable(); (e = e.getParent()) && !e.equals(d);)if (e.getCustomData("bidi_processed")) { a.removeStyle("direction"); a.removeAttribute("dir"); return } e = "useComputedState" in c.config ? c.config.useComputedState : 1; (e ? a.getComputedStyle("direction") : a.getStyle("direction") || a.hasAttribute("dir")) != b && (a.removeStyle("direction"), e ? (a.removeAttribute("dir"), b != a.getComputedStyle("direction") && a.setAttribute("dir", b)) : a.setAttribute("dir", b), c.forceNextSelectionCheck())
                }
            } function f(a,
                b, c) { var e = a.getCommonAncestor(!1, !0); a = a.clone(); a.enlarge(c == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS); if (a.checkBoundaryOfElement(e, CKEDITOR.START) && a.checkBoundaryOfElement(e, CKEDITOR.END)) { for (var d; e && e.type == CKEDITOR.NODE_ELEMENT && (d = e.getParent()) && 1 == d.getChildCount() && !(e.getName() in b);)e = d; return e.type == CKEDITOR.NODE_ELEMENT && e.getName() in b && e } } function d(a) {
                    return {
                        context: "p", allowedContent: {
                            "h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td": {
                                propertiesOnly: !0,
                                attributes: "dir"
                            }
                        }, requiredContent: "p[dir]", refresh: function (a, b) {
                            var c = a.config.useComputedState, e, c = void 0 === c || c; if (!c) { e = b.lastElement; for (var d = a.editable(); e && !(e.getName() in h || e.equals(d));) { var g = e.getParent(); if (!g) break; e = g } } e = e || b.block || b.blockLimit; e.equals(a.editable()) && (d = a.getSelection().getRanges()[0].getEnclosedNode()) && d.type == CKEDITOR.NODE_ELEMENT && (e = d); e && (c = c ? e.getComputedStyle("direction") : e.getStyle("direction") || e.getAttribute("dir"), a.getCommand("bidirtl").setState("rtl" ==
                                c ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF), a.getCommand("bidiltr").setState("ltr" == c ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)); c = (b.block || b.blockLimit || a.editable()).getDirection(1); c != (a._.selDir || a.lang.dir) && (a._.selDir = c, a.fire("contentDirChanged", c))
                        }, exec: function (e) {
                            var d = e.getSelection(), h = e.config.enterMode, k = d.getRanges(); if (k && k.length) {
                                for (var l = {}, v = d.createBookmarks(), k = k.createIterator(), y, t = 0; y = k.getNextRange(1);) {
                                    var B = y.getEnclosedNode(); B && (!B || B.type == CKEDITOR.NODE_ELEMENT &&
                                        B.getName() in m) || (B = f(y, c, h)); B && b(B, a, e, l); var w = new CKEDITOR.dom.walker(y), z = v[t].startNode, A = v[t++].endNode; w.evaluator = function (a) { var b = h == CKEDITOR.ENTER_P ? "p" : "div", e; if (e = (a ? a.type == CKEDITOR.NODE_ELEMENT : !1) && a.getName() in c) { if (b = a.is(b)) b = (b = a.getParent()) ? b.type == CKEDITOR.NODE_ELEMENT : !1; e = !(b && a.getParent().is("blockquote")) } return !!(e && a.getPosition(z) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(A) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING) };
                                    for (; B = w.next();)b(B, a, e, l); y = y.createIterator(); for (y.enlargeBr = h != CKEDITOR.ENTER_BR; B = y.getNextParagraph(h == CKEDITOR.ENTER_P ? "p" : "div");)b(B, a, e, l)
                                } CKEDITOR.dom.element.clearAllMarkers(l); e.forceNextSelectionCheck(); d.selectBookmarks(v); e.focus()
                            }
                        }
                    }
                } function a(a) {
                    var b = a == l.setAttribute, c = a == l.removeAttribute, e = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/; return function (d, h) {
                        if (!this.isReadOnly()) {
                            var f; if (f = d == (b || c ? "dir" : "direction") || "style" == d && (c || e.test(h))) {
                                a: {
                                    f = this; for (var k = f.getDocument().getBody().getParent(); f;) {
                                        if (f.equals(k)) {
                                            f =
                                            !1; break a
                                        } f = f.getParent()
                                    } f = !0
                                } f = !f
                            } if (f && (f = this.getDirection(1), k = a.apply(this, arguments), f != this.getDirection(1))) return this.getDocument().fire("dirChanged", this), k
                        } return a.apply(this, arguments)
                    }
                } var c = { table: 1, ul: 1, ol: 1, blockquote: 1, div: 1 }, m = {}, h = {}; CKEDITOR.tools.extend(m, c, { tr: 1, p: 1, div: 1, li: 1 }); CKEDITOR.tools.extend(h, m, { td: 1 }); CKEDITOR.plugins.add("bidi", {
                    init: function (a) {
                        function b(c, e, d, h, f) {
                            a.addCommand(d, new CKEDITOR.command(a, h)); a.ui.addButton && a.ui.addButton(c, {
                                label: e, command: d,
                                toolbar: "bidi," + f
                            })
                        } if (!a.blockless) { var c = a.lang.bidi; b("BidiLtr", c.ltr, "bidiltr", d("ltr"), 10); b("BidiRtl", c.rtl, "bidirtl", d("rtl"), 20); a.on("contentDom", function () { a.document.on("dirChanged", function (b) { a.fire("dirChanged", { node: b.data, dir: b.data.getDirection(1) }) }) }); a.on("contentDirChanged", function (b) { b = (a.lang.dir != b.data ? "add" : "remove") + "Class"; var c = a.ui.space(a.config.toolbarLocation); if (c) c[b]("cke_mixed_dir_content") }) }
                    }
                }); for (var l = CKEDITOR.dom.element.prototype, e = ["setStyle", "removeStyle",
                    "setAttribute", "removeAttribute"], k = 0; k < e.length; k++)l[e[k]] = CKEDITOR.tools.override(l[e[k]], a)
        })(); (function () {
            var b = {
                exec: function (b) {
                    var d = b.getCommand("blockquote").state, a = b.getSelection(), c = a && a.getRanges()[0]; if (c) {
                        var m = a.createBookmarks(); if (CKEDITOR.env.ie) {
                            var h = m[0].startNode, l = m[0].endNode, e; if (h && "blockquote" == h.getParent().getName()) for (e = h; e = e.getNext();)if (e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary()) { h.move(e, !0); break } if (l && "blockquote" == l.getParent().getName()) for (e = l; e =
                                e.getPrevious();)if (e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary()) { l.move(e); break }
                        } var k = c.createIterator(); k.enlargeBr = b.config.enterMode != CKEDITOR.ENTER_BR; if (d == CKEDITOR.TRISTATE_OFF) {
                            for (h = []; d = k.getNextParagraph();)h.push(d); 1 > h.length && (d = b.document.createElement(b.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), l = m.shift(), c.insertNode(d), d.append(new CKEDITOR.dom.text("﻿", b.document)), c.moveToBookmark(l), c.selectNodeContents(d), c.collapse(!0), l = c.createBookmark(), h.push(d), m.unshift(l));
                            e = h[0].getParent(); c = []; for (l = 0; l < h.length; l++)d = h[l], e = e.getCommonAncestor(d.getParent()); for (d = { table: 1, tbody: 1, tr: 1, ol: 1, ul: 1 }; d[e.getName()];)e = e.getParent(); for (l = null; 0 < h.length;) { for (d = h.shift(); !d.getParent().equals(e);)d = d.getParent(); d.equals(l) || c.push(d); l = d } for (; 0 < c.length;)if (d = c.shift(), "blockquote" == d.getName()) { for (l = new CKEDITOR.dom.documentFragment(b.document); d.getFirst();)l.append(d.getFirst().remove()), h.push(l.getLast()); l.replace(d) } else h.push(d); c = b.document.createElement("blockquote");
                            for (c.insertBefore(h[0]); 0 < h.length;)d = h.shift(), c.append(d)
                        } else if (d == CKEDITOR.TRISTATE_ON) {
                            l = []; for (e = {}; d = k.getNextParagraph();) { for (h = c = null; d.getParent();) { if ("blockquote" == d.getParent().getName()) { c = d.getParent(); h = d; break } d = d.getParent() } c && h && !h.getCustomData("blockquote_moveout") && (l.push(h), CKEDITOR.dom.element.setMarker(e, h, "blockquote_moveout", !0)) } CKEDITOR.dom.element.clearAllMarkers(e); d = []; h = []; for (e = {}; 0 < l.length;)k = l.shift(), c = k.getParent(), k.getPrevious() ? k.getNext() ? (k.breakParent(k.getParent()),
                                h.push(k.getNext())) : k.remove().insertAfter(c) : k.remove().insertBefore(c), c.getCustomData("blockquote_processed") || (h.push(c), CKEDITOR.dom.element.setMarker(e, c, "blockquote_processed", !0)), d.push(k); CKEDITOR.dom.element.clearAllMarkers(e); for (l = h.length - 1; 0 <= l; l--) { c = h[l]; a: { e = c; for (var k = 0, g = e.getChildCount(), n = void 0; k < g && (n = e.getChild(k)); k++)if (n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary()) { e = !1; break a } e = !0 } e && c.remove() } if (b.config.enterMode == CKEDITOR.ENTER_BR) for (c = !0; d.length;)if (k = d.shift(),
                                    "div" == k.getName()) { l = new CKEDITOR.dom.documentFragment(b.document); !c || !k.getPrevious() || k.getPrevious().type == CKEDITOR.NODE_ELEMENT && k.getPrevious().isBlockBoundary() || l.append(b.document.createElement("br")); for (c = k.getNext() && !(k.getNext().type == CKEDITOR.NODE_ELEMENT && k.getNext().isBlockBoundary()); k.getFirst();)k.getFirst().remove().appendTo(l); c && l.append(b.document.createElement("br")); l.replace(k); c = !1 }
                        } a.selectBookmarks(m); b.focus()
                    }
                }, refresh: function (b, d) {
                    this.setState(b.elementPath(d.block ||
                        d.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                }, context: "blockquote", allowedContent: "blockquote", requiredContent: "blockquote"
            }; CKEDITOR.plugins.add("blockquote", { init: function (f) { f.blockless || (f.addCommand("blockquote", b), f.ui.addButton && f.ui.addButton("Blockquote", { label: f.lang.blockquote.toolbar, command: "blockquote", toolbar: "blocks,10" })) } })
        })(); "use strict"; (function () {
            function b(b, a) {
                CKEDITOR.tools.extend(this, a, {
                    editor: b, id: "cke-" + CKEDITOR.tools.getUniqueId(),
                    area: b._.notificationArea
                }); a.type || (this.type = "info"); this.element = this._createElement(); b.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element)
            } function f(b) { var a = this; this.editor = b; this.notifications = []; this.element = this._createElement(); this._uiBuffer = CKEDITOR.tools.eventsBuffer(10, this._layout, this); this._changeBuffer = CKEDITOR.tools.eventsBuffer(500, this._layout, this); b.on("destroy", function () { a._removeListeners(); a.element.remove() }) } CKEDITOR.plugins.add("notification",
                {
                    init: function (b) {
                        function a(a) { var b = new CKEDITOR.dom.element("div"); b.setStyles({ position: "fixed", "margin-left": "-9999px" }); b.setAttributes({ "aria-live": "assertive", "aria-atomic": "true" }); b.setText(a); CKEDITOR.document.getBody().append(b); setTimeout(function () { b.remove() }, 100) } b._.notificationArea = new f(b); b.showNotification = function (a, f, h) { var l, e; "progress" == f ? l = h : e = h; a = new CKEDITOR.plugins.notification(b, { message: a, type: f, progress: l, duration: e }); a.show(); return a }; b.on("key", function (c) {
                            if (27 ==
                                c.data.keyCode) { var f = b._.notificationArea.notifications; f.length && (a(b.lang.notification.closed), f[f.length - 1].hide(), c.cancel()) }
                        })
                    }
                }); b.prototype = {
                    show: function () { !1 !== this.editor.fire("notificationShow", { notification: this }) && (this.area.add(this), this._hideAfterTimeout()) }, update: function (b) {
                        var a = !0; !1 === this.editor.fire("notificationUpdate", { notification: this, options: b }) && (a = !1); var c = this.element, f = c.findOne(".cke_notification_message"), h = c.findOne(".cke_notification_progress"), l = b.type; c.removeAttribute("role");
                        b.progress && "progress" != this.type && (l = "progress"); l && (c.removeClass(this._getClass()), c.removeAttribute("aria-label"), this.type = l, c.addClass(this._getClass()), c.setAttribute("aria-label", this.type), "progress" != this.type || h ? "progress" != this.type && h && h.remove() : (h = this._createProgressElement(), h.insertBefore(f))); void 0 !== b.message && (this.message = b.message, f.setHtml(this.message)); void 0 !== b.progress && (this.progress = b.progress, h && h.setStyle("width", this._getPercentageProgress())); a && b.important && (c.setAttribute("role",
                            "alert"), this.isVisible() || this.area.add(this)); this.duration = b.duration; this._hideAfterTimeout()
                    }, hide: function () { !1 !== this.editor.fire("notificationHide", { notification: this }) && this.area.remove(this) }, isVisible: function () { return 0 <= CKEDITOR.tools.indexOf(this.area.notifications, this) }, _createElement: function () {
                        var b = this, a, c, f = this.editor.lang.common.close; a = new CKEDITOR.dom.element("div"); a.addClass("cke_notification"); a.addClass(this._getClass()); a.setAttributes({ id: this.id, role: "alert", "aria-label": this.type });
                        "progress" == this.type && a.append(this._createProgressElement()); c = new CKEDITOR.dom.element("p"); c.addClass("cke_notification_message"); c.setHtml(this.message); a.append(c); c = CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"' + f + '" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e'); a.append(c); c.on("click", function () { b.editor.focus(); b.hide() }); return a
                    }, _getClass: function () {
                        return "progress" ==
                            this.type ? "cke_notification_info" : "cke_notification_" + this.type
                    }, _createProgressElement: function () { var b = new CKEDITOR.dom.element("span"); b.addClass("cke_notification_progress"); b.setStyle("width", this._getPercentageProgress()); return b }, _getPercentageProgress: function () { return Math.round(100 * (this.progress || 0)) + "%" }, _hideAfterTimeout: function () {
                        var b = this, a; this._hideTimeoutId && clearTimeout(this._hideTimeoutId); if ("number" == typeof this.duration) a = this.duration; else if ("info" == this.type || "success" ==
                            this.type) a = "number" == typeof this.editor.config.notification_duration ? this.editor.config.notification_duration : 5E3; a && (b._hideTimeoutId = setTimeout(function () { b.hide() }, a))
                    }
                }; f.prototype = {
                    add: function (b) { this.notifications.push(b); this.element.append(b.element); 1 == this.element.getChildCount() && (CKEDITOR.document.getBody().append(this.element), this._attachListeners()); this._layout() }, remove: function (b) {
                        var a = CKEDITOR.tools.indexOf(this.notifications, b); 0 > a || (this.notifications.splice(a, 1), b.element.remove(),
                            this.element.getChildCount() || (this._removeListeners(), this.element.remove()))
                    }, _createElement: function () { var b = this.editor, a = b.config, c = new CKEDITOR.dom.element("div"); c.addClass("cke_notifications_area"); c.setAttribute("id", "cke_notifications_area_" + b.name); c.setStyle("z-index", a.baseFloatZIndex - 2); return c }, _attachListeners: function () {
                        var b = CKEDITOR.document.getWindow(), a = this.editor; b.on("scroll", this._uiBuffer.input); b.on("resize", this._uiBuffer.input); a.on("change", this._changeBuffer.input);
                        a.on("floatingSpaceLayout", this._layout, this, null, 20); a.on("blur", this._layout, this, null, 20)
                    }, _removeListeners: function () { var b = CKEDITOR.document.getWindow(), a = this.editor; b.removeListener("scroll", this._uiBuffer.input); b.removeListener("resize", this._uiBuffer.input); a.removeListener("change", this._changeBuffer.input); a.removeListener("floatingSpaceLayout", this._layout); a.removeListener("blur", this._layout) }, _layout: function () {
                        function b() { a.setStyle("left", y(t + f.width - n - q)) } var a = this.element, c =
                            this.editor, f = c.ui.contentsElement.getClientRect(), h = c.ui.contentsElement.getDocumentPosition(), l, e, k = a.getClientRect(), g, n = this._notificationWidth, q = this._notificationMargin; g = CKEDITOR.document.getWindow(); var u = g.getScrollPosition(), r = g.getViewPaneSize(), p = CKEDITOR.document.getBody(), v = p.getDocumentPosition(), y = CKEDITOR.tools.cssLength; n && q || (g = this.element.getChild(0), n = this._notificationWidth = g.getClientRect().width, q = this._notificationMargin = parseInt(g.getComputedStyle("margin-left"), 10) + parseInt(g.getComputedStyle("margin-right"),
                                10)); c.toolbar && (l = c.ui.space(c.config.toolbarLocation), e = l.getClientRect()); l && l.isVisible() && e.bottom > f.top && e.bottom < f.bottom - k.height ? a.setStyles({ position: "fixed", top: y(e.bottom) }) : 0 < f.top ? a.setStyles({ position: "absolute", top: y(h.y) }) : h.y + f.height - k.height > u.y ? a.setStyles({ position: "fixed", top: 0 }) : a.setStyles({ position: "absolute", top: y(h.y + f.height - k.height) }); var t = "fixed" == a.getStyle("position") ? f.left : "static" != p.getComputedStyle("position") ? h.x - v.x : h.x; f.width < n + q ? h.x + n + q > u.x + r.width ? b() :
                                    a.setStyle("left", y(t)) : h.x + n + q > u.x + r.width ? a.setStyle("left", y(t)) : h.x + f.width / 2 + n / 2 + q > u.x + r.width ? a.setStyle("left", y(t - h.x + u.x + r.width - n - q)) : 0 > f.left + f.width - n - q ? b() : 0 > f.left + f.width / 2 - n / 2 ? a.setStyle("left", y(t - h.x + u.x)) : a.setStyle("left", y(t + f.width / 2 - n / 2 - q / 2))
                    }
                }; CKEDITOR.plugins.notification = b
        })(); (function () {
            var b = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"';
            CKEDITOR.env.gecko && CKEDITOR.env.mac && (b += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (b += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var f = ""; CKEDITOR.env.ie && (f = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var b = b + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" onclick\x3d"' + f + 'CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"') +
                '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcutSpace}{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e', d = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"), a = CKEDITOR.addTemplate("button", b); CKEDITOR.plugins.add("button",
                    { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler) } }); CKEDITOR.UI_BUTTON = "button"; CKEDITOR.ui.button = function (a) { CKEDITOR.tools.extend(this, a, { title: a.label, click: a.click || function (b) { b.execCommand(a.command) } }); this._ = {} }; CKEDITOR.ui.button.handler = { create: function (a) { return new CKEDITOR.ui.button(a) } }; CKEDITOR.ui.button.prototype = {
                        render: function (b, f) {
                            function h() {
                                var a = b.mode; a && (a = this.modes[a] ? void 0 !== l[a] ? l[a] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    a = b.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : a, this.setState(a), this.refresh && this.refresh())
                            } var l = null, e = CKEDITOR.env, k = this._.id = CKEDITOR.tools.getNextId(), g = "", n = this.command, q, u, r; this._.editor = b; var p = { id: k, button: this, editor: b, focus: function () { CKEDITOR.document.getById(k).focus() }, execute: function () { this.button.click(b) }, attach: function (a) { this.button.attach(a) } }, v = CKEDITOR.tools.addFunction(function (a) { if (p.onkey) return a = new CKEDITOR.dom.event(a), !1 !== p.onkey(p, a.getKeystroke()) }),
                                y = CKEDITOR.tools.addFunction(function (a) { var b; p.onfocus && (b = !1 !== p.onfocus(p, new CKEDITOR.dom.event(a))); return b }), t = 0; p.clickFn = q = CKEDITOR.tools.addFunction(function () { t && (b.unlockSelection(1), t = 0); p.execute(); e.iOS && b.focus() }); this.modes ? (l = {}, b.on("beforeModeUnload", function () { b.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (l[b.mode] = this._.state) }, this), b.on("activeFilterChange", h, this), b.on("mode", h, this), !this.readOnly && b.on("readOnly", h, this)) : n && (n = b.getCommand(n)) && (n.on("state", function () { this.setState(n.state) },
                                    this), g += n.state == CKEDITOR.TRISTATE_ON ? "on" : n.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off"); var B; if (this.directional) b.on("contentDirChanged", function (a) { var e = CKEDITOR.document.getById(this._.id), d = e.getFirst(); a = a.data; a != b.lang.dir ? e.addClass("cke_" + a) : e.removeClass("cke_ltr").removeClass("cke_rtl"); d.setAttribute("style", CKEDITOR.skin.getIconStyle(B, "rtl" == a, this.icon, this.iconOffset)) }, this); n ? (u = b.getCommandKeystroke(n)) && (r = CKEDITOR.tools.keystrokeToString(b.lang.common.keyboard, u)) :
                                        g += "off"; u = this.name || this.command; var w = null, z = this.icon; B = u; this.icon && !/\./.test(this.icon) ? (B = this.icon, z = null) : (this.icon && (w = this.icon), CKEDITOR.env.hidpi && this.iconHiDpi && (w = this.iconHiDpi)); w ? (CKEDITOR.skin.addIcon(w, w), z = null) : w = B; g = {
                                            id: k, name: u, iconName: B, label: this.label, cls: (this.hasArrow ? "cke_button_expandable " : "") + (this.className || ""), state: g, ariaDisabled: "disabled" == g ? "true" : "false", title: this.title + (r ? " (" + r.display + ")" : ""), ariaShortcutSpace: r ? "\x26nbsp;" : "", ariaShortcut: r ? b.lang.common.keyboardShortcut +
                                                " " + r.aria : "", titleJs: e.gecko && !e.hc ? "" : (this.title || "").replace("'", ""), hasArrow: "string" === typeof this.hasArrow && this.hasArrow || (this.hasArrow ? "true" : "false"), keydownFn: v, focusFn: y, clickFn: q, style: CKEDITOR.skin.getIconStyle(w, "rtl" == b.lang.dir, z, this.iconOffset), arrowHtml: this.hasArrow ? d.output() : ""
                                        }; a.output(g, f); if (this.onRender) this.onRender(); return p
                        }, setState: function (a) {
                            if (this._.state == a) return !1; this._.state = a; var b = CKEDITOR.document.getById(this._.id); return b ? (b.setState(a, "cke_button"),
                                b.setAttribute("aria-disabled", a == CKEDITOR.TRISTATE_DISABLED), this.hasArrow ? b.setAttribute("aria-expanded", a == CKEDITOR.TRISTATE_ON) : a === CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
                        }, getState: function () { return this._.state }, toFeature: function (a) { if (this._.feature) return this._.feature; var b = this; this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b); return this._.feature = b }
                    }; CKEDITOR.ui.prototype.addButton = function (a,
                        b) { this.add(a, CKEDITOR.UI_BUTTON, b) }
        })(); (function () {
            function b(a) {
                function b() { for (var e = d(), g = CKEDITOR.tools.clone(a.config.toolbarGroups) || f(a), k = 0; k < g.length; k++) { var m = g[k]; if ("/" != m) { "string" == typeof m && (m = g[k] = { name: m }); var p, v = m.groups; if (v) for (var y = 0; y < v.length; y++)p = v[y], (p = e[p]) && l(m, p); (p = e[m.name]) && l(m, p) } } return g } function d() {
                    var b = {}, e, g, h; for (e in a.ui.items) g = a.ui.items[e], h = g.toolbar || "others", h = h.split(","), g = h[0], h = parseInt(h[1] || -1, 10), b[g] || (b[g] = []), b[g].push({ name: e, order: h });
                    for (g in b) b[g] = b[g].sort(function (a, b) { return a.order == b.order ? 0 : 0 > b.order ? -1 : 0 > a.order ? 1 : a.order < b.order ? -1 : 1 }); return b
                } function l(b, e) { if (e.length) { b.items ? b.items.push(a.ui.create("-")) : b.items = []; for (var d; d = e.shift();)d = "string" == typeof d ? d : d.name, k && -1 != CKEDITOR.tools.indexOf(k, d) || (d = a.ui.create(d)) && a.addFeature(d) && b.items.push(d) } } function e(a) {
                    var b = [], c, e, d; for (c = 0; c < a.length; ++c)e = a[c], d = {}, "/" == e ? b.push(e) : CKEDITOR.tools.isArray(e) ? (l(d, CKEDITOR.tools.clone(e)), b.push(d)) : e.items &&
                        (l(d, CKEDITOR.tools.clone(e.items)), d.name = e.name, b.push(d)); return b
                } var k = a.config.removeButtons, k = k && k.split(","), g = a.config.toolbar; "string" == typeof g && (g = a.config["toolbar_" + g]); return a.toolbar = g ? e(g) : b()
            } function f(a) {
                return a._.toolbarGroups || (a._.toolbarGroups = [{ name: "document", groups: ["mode", "document", "doctools"] }, { name: "clipboard", groups: ["clipboard", "undo"] }, { name: "editing", groups: ["find", "selection", "spellchecker"] }, { name: "forms" }, "/", { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
                { name: "paragraph", groups: ["list", "indent", "blocks", "align", "bidi"] }, { name: "links" }, { name: "insert" }, "/", { name: "styles" }, { name: "colors" }, { name: "tools" }, { name: "others" }, { name: "about" }])
            } var d = function () { this.toolbars = []; this.focusCommandExecuted = !1 }; d.prototype.focus = function () { for (var a = 0, b; b = this.toolbars[a++];)for (var d = 0, f; f = b.items[d++];)if (f.focus) { f.focus(); return } }; var a = {
                modes: { wysiwyg: 1, source: 1 }, readOnly: 1, exec: function (a) {
                    a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ?
                        setTimeout(function () { a.toolbox.focus() }, 100) : a.toolbox.focus())
                }
            }; CKEDITOR.plugins.add("toolbar", {
                requires: "button", init: function (c) {
                    var f, h = function (a, b) {
                        var d, g = "rtl" == c.lang.dir, n = c.config.toolbarGroupCycling, q = g ? 37 : 39, g = g ? 39 : 37, n = void 0 === n || n; switch (b) {
                            case 9: case CKEDITOR.SHIFT + 9: for (; !d || !d.items.length;)if (d = 9 == b ? (d ? d.next : a.toolbar.next) || c.toolbox.toolbars[0] : (d ? d.previous : a.toolbar.previous) || c.toolbox.toolbars[c.toolbox.toolbars.length - 1], d.items.length) for (a = d.items[f ? d.items.length -
                                1 : 0]; a && !a.focus;)(a = f ? a.previous : a.next) || (d = 0); a && a.focus(); return !1; case q: d = a; do d = d.next, !d && n && (d = a.toolbar.items[0]); while (d && !d.focus); d ? d.focus() : h(a, 9); return !1; case 40: return a.button && a.button.hasArrow ? a.execute() : h(a, 40 == b ? q : g), !1; case g: case 38: d = a; do d = d.previous, !d && n && (d = a.toolbar.items[a.toolbar.items.length - 1]); while (d && !d.focus); d ? d.focus() : (f = 1, h(a, CKEDITOR.SHIFT + 9), f = 0); return !1; case 27: return c.focus(), !1; case 13: case 32: return a.execute(), !1
                        }return !0
                    }; c.on("uiSpace", function (a) {
                        if (a.data.space ==
                            c.config.toolbarLocation) {
                                a.removeListener(); c.toolbox = new d; var e = CKEDITOR.tools.getNextId(), f = ['\x3cspan id\x3d"', e, '" class\x3d"cke_voice_label"\x3e', c.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + c.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', e, '" onmousedown\x3d"return false;"\x3e'], e = !1 !== c.config.toolbarStartupExpanded, g, m; c.config.toolbarCanCollapse && c.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && f.push('\x3cspan class\x3d"cke_toolbox_main"' +
                                    (e ? "\x3e" : ' style\x3d"display:none"\x3e')); for (var q = c.toolbox.toolbars, u = b(c), r = u.length, p = 0; p < r; p++) {
                                        var v, y = 0, t, B = u[p], w = "/" !== B && ("/" === u[p + 1] || p == r - 1), z; if (B) if (g && (f.push("\x3c/span\x3e"), m = g = 0), "/" === B) f.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e'); else {
                                            z = B.items || B; for (var A = 0; A < z.length; A++) {
                                                var C = z[A], D; if (C) {
                                                    var F = function (a) {
                                                        a = a.render(c, f); G = y.items.push(a) - 1; 0 < G && (a.previous = y.items[G - 1], a.previous.next = a); a.toolbar = y; a.onkey = h; a.onfocus = function () {
                                                            c.toolbox.focusCommandExecuted ||
                                                            c.focus()
                                                        }
                                                    }; if (C.type == CKEDITOR.UI_SEPARATOR) m = g && C; else {
                                                        D = !1 !== C.canGroup; if (!y) {
                                                            v = CKEDITOR.tools.getNextId(); y = { id: v, items: [] }; t = B.name && (c.lang.toolbar.toolbarGroups[B.name] || B.name); f.push('\x3cspan id\x3d"', v, '" class\x3d"cke_toolbar' + (w ? ' cke_toolbar_last"' : '"'), t ? ' aria-labelledby\x3d"' + v + '_label"' : "", ' role\x3d"toolbar"\x3e'); t && f.push('\x3cspan id\x3d"', v, '_label" class\x3d"cke_voice_label"\x3e', t, "\x3c/span\x3e"); f.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e'); var G = q.push(y) -
                                                                1; 0 < G && (y.previous = q[G - 1], y.previous.next = y)
                                                        } D ? g || (f.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), g = 1) : g && (f.push("\x3c/span\x3e"), g = 0); m && (F(m), m = 0); F(C)
                                                    }
                                                }
                                            } g && (f.push("\x3c/span\x3e"), m = g = 0); y && f.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
                                        }
                                    } c.config.toolbarCanCollapse && f.push("\x3c/span\x3e"); if (c.config.toolbarCanCollapse && c.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                                        var I = CKEDITOR.tools.addFunction(function () { c.execCommand("toolbarCollapse") });
                                        c.on("destroy", function () { CKEDITOR.tools.removeFunction(I) }); c.addCommand("toolbarCollapse", {
                                            readOnly: 1, exec: function (a) {
                                                var b = a.ui.space("toolbar_collapser"), c = b.getPrevious(), e = a.ui.space("contents"), d = c.getParent(), g = parseInt(e.$.style.height, 10), h = d.$.offsetHeight, f = b.hasClass("cke_toolbox_collapser_min"); f ? (c.show(), b.removeClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarCollapse)) : (c.hide(), b.addClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarExpand));
                                                b.getFirst().setText(f ? "▲" : "◀"); e.setStyle("height", g - (d.$.offsetHeight - h) + "px"); a.fire("resize", { outerHeight: a.container.$.offsetHeight, contentsHeight: e.$.offsetHeight, outerWidth: a.container.$.offsetWidth })
                                            }, modes: { wysiwyg: 1, source: 1 }
                                        }); c.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse"); f.push('\x3ca title\x3d"' + (e ? c.lang.toolbar.toolbarCollapse : c.lang.toolbar.toolbarExpand) + '" id\x3d"' + c.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');
                                        e || f.push(" cke_toolbox_collapser_min"); f.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + I + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', "\x3c/a\x3e")
                                    } f.push("\x3c/span\x3e"); a.data.html += f.join("")
                        }
                    }); c.on("destroy", function () { if (this.toolbox) { var a, b = 0, c, d, h; for (a = this.toolbox.toolbars; b < a.length; b++)for (d = a[b].items, c = 0; c < d.length; c++)h = d[c], h.clickFn && CKEDITOR.tools.removeFunction(h.clickFn), h.keyDownFn && CKEDITOR.tools.removeFunction(h.keyDownFn) } }); c.on("uiReady", function () {
                        var a =
                            c.ui.space("toolbox"); a && c.focusManager.add(a, 1)
                    }); c.addCommand("toolbarFocus", a); c.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus"); c.ui.add("-", CKEDITOR.UI_SEPARATOR, {}); c.ui.addHandler(CKEDITOR.UI_SEPARATOR, { create: function () { return { render: function (a, b) { b.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e'); return {} } } } })
                }
            }); CKEDITOR.ui.prototype.addToolbarGroup = function (a, b, d) {
                var l = f(this.editor), e = 0 === b, k = { name: a }; if (d) {
                    if (d = CKEDITOR.tools.search(l, function (a) {
                        return a.name ==
                            d
                    })) { !d.groups && (d.groups = []); if (b && (b = CKEDITOR.tools.indexOf(d.groups, b), 0 <= b)) { d.groups.splice(b + 1, 0, a); return } e ? d.groups.splice(0, 0, a) : d.groups.push(a); return } b = null
                } b && (b = CKEDITOR.tools.indexOf(l, function (a) { return a.name == b })); e ? l.splice(0, 0, a) : "number" == typeof b ? l.splice(b + 1, 0, k) : l.push(a)
            }
        })(); CKEDITOR.UI_SEPARATOR = "separator"; CKEDITOR.config.toolbarLocation = "top"; "use strict"; (function () {
            function b(a, b, c) {
                b.type || (b.type = "auto"); if (c && !1 === a.fire("beforePaste", b) || !b.dataValue && b.dataTransfer.isEmpty()) return !1;
                b.dataValue || (b.dataValue = ""); if (CKEDITOR.env.gecko && "drop" == b.method && a.toolbox) a.once("afterPaste", function () { a.toolbox.focus() }); return a.fire("paste", b)
            } function f(a) {
                function c() {
                    var b = a.editable(); if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) { var e = function (b) { a.getSelection().isCollapsed() || (a.readOnly && "cut" == b.name || D.initPasteDataTransfer(b, a), b.data.preventDefault()) }; b.on("copy", e); b.on("cut", e); b.on("cut", function () { a.readOnly || a.extractSelectedHtml() }, null, null, 999) } b.on(D.mainPasteEvent,
                        function (a) { "beforepaste" == D.mainPasteEvent && F || z(a) }); "beforepaste" == D.mainPasteEvent && (b.on("paste", function (a) { G || (h(), a.data.preventDefault(), z(a), k("paste")) }), b.on("contextmenu", f, null, null, 0), b.on("beforepaste", function (a) { !a.data || a.data.$.ctrlKey || a.data.$.shiftKey || f() }, null, null, 0)); b.on("beforecut", function () { !F && l(a) }); var d; b.attachListener(CKEDITOR.env.ie ? b : a.document.getDocumentElement(), "mouseup", function () { d = setTimeout(A, 0) }); a.on("destroy", function () { clearTimeout(d) }); b.on("keyup",
                            A)
                } function e(b) { return { type: b, canUndo: "cut" == b, startDisabled: !0, fakeKeystroke: "cut" == b ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67, exec: function () { "cut" == this.type && l(); var b; var c = this.type; if (CKEDITOR.env.ie) b = k(c); else try { b = a.document.$.execCommand(c, !1, null) } catch (e) { b = !1 } b || a.showNotification(a.lang.clipboard[this.type + "Error"]); return b } } } function d() {
                    return {
                        canUndo: !1, async: !0, fakeKeystroke: CKEDITOR.CTRL + 86, exec: function (a, c) {
                            function e(c, h) {
                                h = "undefined" !== typeof h ? h : !0; c ? (c.method = "paste", c.dataTransfer ||
                                    (c.dataTransfer = D.initPasteDataTransfer()), b(a, c, h)) : g && !a._.forcePasteDialog && a.showNotification(k, "info", a.config.clipboard_notificationDuration); a._.forcePasteDialog = !1; a.fire("afterCommandExec", { name: "paste", command: d, returnValue: !!c })
                            } c = "undefined" !== typeof c && null !== c ? c : {}; var d = this, g = "undefined" !== typeof c.notification ? c.notification : !0, h = c.type, f = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard, a.getCommandKeystroke(this)), k = "string" === typeof g ? g : a.lang.clipboard.pasteNotification.replace(/%1/,
                                '\x3ckbd aria-label\x3d"' + f.aria + '"\x3e' + f.display + "\x3c/kbd\x3e"), f = "string" === typeof c ? c : c.dataValue; h && !0 !== a.config.forcePasteAsPlainText && "allow-word" !== a.config.forcePasteAsPlainText ? a._.nextPasteType = h : delete a._.nextPasteType; "string" === typeof f ? e({ dataValue: f }) : a.getClipboardData(e)
                        }
                    }
                } function h() { G = 1; setTimeout(function () { G = 0 }, 100) } function f() { F = 1; setTimeout(function () { F = 0 }, 10) } function k(b) {
                    var c = a.document, e = c.getBody(), d = !1, h = function () { d = !0 }; e.on(b, h); 7 < CKEDITOR.env.version ? c.$.execCommand(b) :
                        c.$.selection.createRange().execCommand(b); e.removeListener(b, h); return d
                } function l() { if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) { var b = a.getSelection(), c, e, d; b.getType() == CKEDITOR.SELECTION_ELEMENT && (c = b.getSelectedElement()) && (e = b.getRanges()[0], d = a.document.createText(""), d.insertBefore(c), e.setStartBefore(d), e.setEndAfter(c), b.selectRanges([e]), setTimeout(function () { c.getParent() && (d.remove(), b.selectElement(c)) }, 0)) } } function m(b, c) {
                    var e = a.document, d = a.editable(), h = function (a) { a.cancel() }, f;
                    if (!e.getById("cke_pastebin")) {
                        var k = a.getSelection(), l = k.createBookmarks(); CKEDITOR.env.ie && k.root.fire("selectionchange"); var n = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !d.is("body") || CKEDITOR.env.ie ? "div" : "body", e); n.setAttributes({ id: "cke_pastebin", "data-cke-temp": "1" }); var q = 0, e = e.getWindow(); CKEDITOR.env.webkit ? (d.append(n), n.addClass("cke_editable"), d.is("body") || (q = "static" != d.getComputedStyle("position") ? d : CKEDITOR.dom.element.get(d.$.offsetParent), q = q.getDocumentPosition().y)) : d.getAscendant(CKEDITOR.env.ie ?
                            "body" : "html", 1).append(n); n.setStyles({ position: "absolute", top: e.getScrollPosition().y - q + 10 + "px", width: "1px", height: Math.max(1, e.getViewPaneSize().height - 20) + "px", overflow: "hidden", margin: 0, padding: 0 }); CKEDITOR.env.safari && n.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text")); (q = n.getParent().isReadOnly()) ? (n.setOpacity(0), n.setAttribute("contenteditable", !0)) : n.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right", "-10000px"); a.on("selectionChange", h, null, null, 0); if (CKEDITOR.env.webkit ||
                                CKEDITOR.env.gecko) f = d.once("blur", h, null, null, -100); q && n.focus(); q = new CKEDITOR.dom.range(n); q.selectNodeContents(n); var t = q.select(); CKEDITOR.env.ie && (f = d.once("blur", function () { a.lockSelection(t) })); var v = CKEDITOR.document.getWindow().getScrollPosition().y; setTimeout(function () {
                                    CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = v); f && f.removeListener(); CKEDITOR.env.ie && d.focus(); k.selectBookmarks(l); n.remove(); var b; CKEDITOR.env.webkit && (b = n.getFirst()) && b.is && b.hasClass("Apple-style-span") &&
                                        (n = b); a.removeListener("selectionChange", h); c(n.getHtml())
                                }, 0)
                    }
                } function B() { if ("paste" == D.mainPasteEvent) return a.fire("beforePaste", { type: "auto", method: "paste" }), !1; a.focus(); h(); var b = a.focusManager; b.lock(); if (a.editable().fire(D.mainPasteEvent) && !k("paste")) return b.unlock(), !1; b.unlock(); return !0 } function w(b) {
                    if ("wysiwyg" == a.mode) switch (b.data.keyCode) {
                        case CKEDITOR.CTRL + 86: case CKEDITOR.SHIFT + 45: b = a.editable(); h(); "paste" == D.mainPasteEvent && b.fire("beforepaste"); break; case CKEDITOR.CTRL + 88: case CKEDITOR.SHIFT +
                            46: a.fire("saveSnapshot"), setTimeout(function () { a.fire("saveSnapshot") }, 50)
                    }
                } function z(c) { var e = { type: "auto", method: "paste", dataTransfer: D.initPasteDataTransfer(c) }; e.dataTransfer.cacheData(); var d = !1 !== a.fire("beforePaste", e); d && D.canClipboardApiBeTrusted(e.dataTransfer, a) ? (c.data.preventDefault(), setTimeout(function () { b(a, e) }, 0)) : m(c, function (c) { e.dataValue = c.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, ""); d && b(a, e) }) } function A() {
                    if ("wysiwyg" == a.mode) {
                        var b = C("paste"); a.getCommand("cut").setState(C("cut"));
                        a.getCommand("copy").setState(C("copy")); a.getCommand("paste").setState(b); a.fire("pasteState", b)
                    }
                } function C(b) { var c = a.getSelection(), c = c && c.getRanges()[0]; if ((a.readOnly || c && c.checkReadOnly()) && b in { paste: 1, cut: 1 }) return CKEDITOR.TRISTATE_DISABLED; if ("paste" == b) return CKEDITOR.TRISTATE_OFF; b = a.getSelection(); c = b.getRanges(); return b.getType() == CKEDITOR.SELECTION_NONE || 1 == c.length && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF } var D = CKEDITOR.plugins.clipboard, F = 0, G = 0; (function () {
                    a.on("key",
                        w); a.on("contentDom", c); a.on("selectionChange", A); if (a.contextMenu) { a.contextMenu.addListener(function () { return { cut: C("cut"), copy: C("copy"), paste: C("paste") } }); var b = null; a.on("menuShow", function () { b && (b.removeListener(), b = null); var c = a.contextMenu.findItemByCommandName("paste"); c && c.element && (b = c.element.on("touchend", function () { a._.forcePasteDialog = !0 })) }) } if (a.ui.addButton) a.once("instanceReady", function () {
                            a._.pasteButtons && CKEDITOR.tools.array.forEach(a._.pasteButtons, function (b) {
                                if (b = a.ui.get(b)) if (b =
                                    CKEDITOR.document.getById(b._.id)) b.on("touchend", function () { a._.forcePasteDialog = !0 })
                            })
                        })
                })(); (function () { function b(c, e, d, h, f) { var k = a.lang.clipboard[e]; a.addCommand(e, d); a.ui.addButton && a.ui.addButton(c, { label: k, command: e, toolbar: "clipboard," + h }); a.addMenuItems && a.addMenuItem(e, { label: k, command: e, group: "clipboard", order: f }) } b("Cut", "cut", e("cut"), 10, 1); b("Copy", "copy", e("copy"), 20, 4); b("Paste", "paste", d(), 30, 8); a._.pasteButtons || (a._.pasteButtons = []); a._.pasteButtons.push("Paste") })(); a.getClipboardData =
                    function (b, c) {
                        function e(a) { a.removeListener(); a.cancel(); c(a.data) } function d(a) { a.removeListener(); a.cancel(); c({ type: f, dataValue: a.data.dataValue, dataTransfer: a.data.dataTransfer, method: "paste" }) } var h = !1, f = "auto"; c || (c = b, b = null); a.on("beforePaste", function (a) { a.removeListener(); h = !0; f = a.data.type }, null, null, 1E3); a.on("paste", e, null, null, 0); !1 === B() && (a.removeListener("paste", e), a._.forcePasteDialog && h && a.fire("pasteDialog") ? (a.on("pasteDialogCommit", d), a.on("dialogHide", function (a) {
                            a.removeListener();
                            a.data.removeListener("pasteDialogCommit", d); a.data._.committed || c(null)
                        })) : c(null))
                    }
            } function d(a) { if (CKEDITOR.env.webkit) { if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html" } else if (CKEDITOR.env.ie) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html" } else if (CKEDITOR.env.gecko) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html" } else return "html"; return "htmlifiedtext" } function a(a, b) {
                function c(a) {
                    return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e",
                        ~~(a / 2)) + (1 == a % 2 ? "\x3cbr\x3e" : "")
                } b = b.replace(/(?!\u3000)\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi, "\x3cbr\x3e"); b = b.replace(/<\/?[A-Z]+>/g, function (a) { return a.toLowerCase() }); if (b.match(/^[^<]$/)) return b; CKEDITOR.env.webkit && -1 < b.indexOf("\x3cdiv\x3e") && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"), b.match(/<div>(<br>|)<\/div>/) && (b = "\x3cp\x3e" + b.replace(/(<div>(<br>|)<\/div>)+/g,
                    function (a) { return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length + 1) }) + "\x3c/p\x3e"), b = b.replace(/<\/div><div>/g, "\x3cbr\x3e"), b = b.replace(/<\/?div>/g, "")); CKEDITOR.env.gecko && a.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "\x3cbr\x3e")), -1 < b.indexOf("\x3cbr\x3e\x3cbr\x3e") && (b = "\x3cp\x3e" + b.replace(/(<br>){2,}/g, function (a) { return c(a.length / 4) }) + "\x3c/p\x3e")); return h(a, b)
            } function c(a) {
                function b() {
                    var a = {}, c; for (c in CKEDITOR.dtd) "$" != c.charAt(0) && "div" != c && "span" !=
                        c && (a[c] = 1); return a
                } var c = {}; return { get: function (e) { return "plain-text" == e ? c.plainText || (c.plainText = new CKEDITOR.filter(a, "br")) : "semantic-content" == e ? ((e = c.semanticContent) || (e = new CKEDITOR.filter(a, {}), e.allow({ $1: { elements: b(), attributes: !0, styles: !1, classes: !1 } }), e = c.semanticContent = e), e) : e ? new CKEDITOR.filter(a, e) : null } }
            } function m(a, b, c) { b = CKEDITOR.htmlParser.fragment.fromHtml(b); var e = new CKEDITOR.htmlParser.basicWriter; c.applyTo(b, !0, !1, a.activeEnterMode); b.writeHtml(e); return e.getHtml() }
            function h(a, b) { a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function (a) { return CKEDITOR.tools.repeat("\x3cbr\x3e", a.length / 7 * 2) }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "\x3c$1div\x3e")); return b } function l(a) { a.data.preventDefault(); a.data.$.dataTransfer.dropEffect = "none" } function e(a) {
                var c = CKEDITOR.plugins.clipboard; a.on("contentDom", function () {
                    function e(c, d, h) {
                        d.select(); b(a, { dataTransfer: h, method: "drop" }, 1); h.sourceEditor.fire("saveSnapshot");
                        h.sourceEditor.editable().extractHtmlFromRange(c); h.sourceEditor.getSelection().selectRanges([c]); h.sourceEditor.fire("saveSnapshot")
                    } function d(e, h) { e.select(); b(a, { dataTransfer: h, method: "drop" }, 1); c.resetDragDataTransfer() } function h(b, c, e) { var d = { $: b.data.$, target: b.data.getTarget() }; c && (d.dragRange = c); e && (d.dropRange = e); !1 === a.fire(b.name, d) && b.data.preventDefault() } function f(a) { a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent()); return a.getChildCount() } var k = a.editable(), l = CKEDITOR.plugins.clipboard.getDropTarget(a),
                        m = a.ui.space("top"), B = a.ui.space("bottom"); c.preventDefaultDropOnElement(m); c.preventDefaultDropOnElement(B); k.attachListener(l, "dragstart", h); k.attachListener(a, "dragstart", c.resetDragDataTransfer, c, null, 1); k.attachListener(a, "dragstart", function (b) { c.initDragDataTransfer(b, a) }, null, null, 2); k.attachListener(a, "dragstart", function () {
                            var b = c.dragRange = a.getSelection().getRanges()[0]; CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (c.dragStartContainerChildCount = b ? f(b.startContainer) : null, c.dragEndContainerChildCount =
                                b ? f(b.endContainer) : null)
                        }, null, null, 100); k.attachListener(l, "dragend", h); k.attachListener(a, "dragend", c.initDragDataTransfer, c, null, 1); k.attachListener(a, "dragend", c.resetDragDataTransfer, c, null, 100); k.attachListener(l, "dragover", function (a) { if (CKEDITOR.env.edge) a.data.preventDefault(); else { var b = a.data.getTarget(); b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files") && a.data.preventDefault() } });
                    k.attachListener(l, "drop", function (b) { if (!b.data.$.defaultPrevented && (b.data.preventDefault(), !a.readOnly)) { var e = b.data.getTarget(); if (!e.isReadOnly() || e.type == CKEDITOR.NODE_ELEMENT && e.is("html")) { var e = c.getRangeAtDropPosition(b, a), d = c.dragRange; e && h(b, d, e) } } }, null, null, 9999); k.attachListener(a, "drop", c.initDragDataTransfer, c, null, 1); k.attachListener(a, "drop", function (b) {
                        if (b = b.data) {
                            var h = b.dropRange, f = b.dragRange, k = b.dataTransfer; k.getTransferType(a) == CKEDITOR.DATA_TRANSFER_INTERNAL ? setTimeout(function () {
                                c.internalDrop(f,
                                    h, k, a)
                            }, 0) : k.getTransferType(a) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? e(f, h, k) : d(h, k)
                        }
                    }, null, null, 9999)
                })
            } var k; CKEDITOR.plugins.add("clipboard", {
                requires: "dialog,notification,toolbar", init: function (b) {
                    function h(a) { if (!a || p === a.id) return !1; var b = a.getTypes(), b = 1 === b.length && "Files" === b[0]; a = 1 === a.getFilesCount(); return b && a } var k, l = c(b); b.config.forcePasteAsPlainText ? k = "plain-text" : b.config.pasteFilter ? k = b.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in b.config || (k = "semantic-content");
                    b.pasteFilter = l.get(k); f(b); e(b); CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js")); if (CKEDITOR.env.gecko) {
                        var r = ["image/png", "image/jpeg", "image/gif"], p; b.on("paste", function (a) {
                            var c = a.data, e = c.dataTransfer; if (!c.dataValue && "paste" == c.method && h(e) && (e = e.getFile(0), -1 != CKEDITOR.tools.indexOf(r, e.type))) {
                                var d = new FileReader; d.addEventListener("load", function () { a.data.dataValue = '\x3cimg src\x3d"' + d.result + '" /\x3e'; b.fire("paste", a.data) }, !1); d.addEventListener("abort", function () {
                                    b.fire("paste",
                                        a.data)
                                }, !1); d.addEventListener("error", function () { b.fire("paste", a.data) }, !1); d.readAsDataURL(e); p = c.dataTransfer.id; a.stop()
                            }
                        }, null, null, 1)
                    } b.on("paste", function (a) { a.data.dataTransfer || (a.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer); if (!a.data.dataValue) { var c = a.data.dataTransfer, e = c.getData("text/html"); if (e) a.data.dataValue = e, a.data.type = "html"; else if (e = c.getData("text/plain")) a.data.dataValue = b.editable().transformPlainTextToHtml(e), a.data.type = "text" } }, null, null, 1); b.on("paste",
                        function (a) {
                            var b = a.data.dataValue, c = CKEDITOR.dtd.$block; -1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function (a, b) { return b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;") })), -1 < b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi,
                                "$1")); if (b.match(/^<[^<]+cke_(editable|contents)/i)) { var e, d, g = new CKEDITOR.dom.element("div"); for (g.setHtml(b); 1 == g.getChildCount() && (e = g.getFirst()) && e.type == CKEDITOR.NODE_ELEMENT && (e.hasClass("cke_editable") || e.hasClass("cke_contents"));)g = d = e; d && (b = d.getHtml().replace(/<br>$/i, "")) } CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (b, e) { return e.toLowerCase() in c ? (a.data.preSniffing = "html", "\x3c" + e) : b }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function (b, e) {
                                    return e in
                                        c ? (a.data.endsWithEOL = 1, "\x3c/" + e + "\x3e") : b
                                }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1")); a.data.dataValue = b
                        }, null, null, 3); b.on("paste", function (c) {
                            c = c.data; var e = b._.nextPasteType || c.type, h = c.dataValue, f, k = b.config.clipboard_defaultContentType || "html", n = c.dataTransfer.getTransferType(b) == CKEDITOR.DATA_TRANSFER_EXTERNAL, q = !0 === b.config.forcePasteAsPlainText; f = "html" == e || "html" == c.preSniffing ? "html" : d(h); delete b._.nextPasteType; "htmlifiedtext" == f && (h = a(b.config, h)); if ("text" == e && "html" == f) h =
                                m(b, h, l.get("plain-text")); else if (n && b.pasteFilter && !c.dontFilter || q) h = m(b, h, b.pasteFilter); c.startsWithEOL && (h = '\x3cbr data-cke-eol\x3d"1"\x3e' + h); c.endsWithEOL && (h += '\x3cbr data-cke-eol\x3d"1"\x3e'); "auto" == e && (e = "html" == f || "html" == k ? "html" : "text"); c.type = e; c.dataValue = h; delete c.preSniffing; delete c.startsWithEOL; delete c.endsWithEOL
                        }, null, null, 6); b.on("paste", function (a) { a = a.data; a.dataValue && (b.insertHtml(a.dataValue, a.type, a.range), setTimeout(function () { b.fire("afterPaste") }, 0)) }, null, null,
                            1E3); b.on("pasteDialog", function (a) { setTimeout(function () { b.openDialog("paste", a.data) }, 0) })
                }
            }); CKEDITOR.plugins.clipboard = {
                isCustomCopyCutSupported: CKEDITOR.env.ie && 16 > CKEDITOR.env.version || CKEDITOR.env.iOS && 605 > CKEDITOR.env.version ? !1 : !0, isCustomDataTypesSupported: !CKEDITOR.env.ie || 16 <= CKEDITOR.env.version, isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version, mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste", addPasteButton: function (a, b, c) {
                    a.ui.addButton && (a.ui.addButton(b,
                        c), a._.pasteButtons || (a._.pasteButtons = []), a._.pasteButtons.push(b))
                }, canClipboardApiBeTrusted: function (a, b) { return a.getTransferType(b) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !a.isEmpty() || CKEDITOR.env.gecko && (a.getData("text/html") || a.getFilesCount()) || CKEDITOR.env.safari && 603 <= CKEDITOR.env.version && !CKEDITOR.env.iOS || CKEDITOR.env.iOS && 605 <= CKEDITOR.env.version || CKEDITOR.env.edge && 16 <= CKEDITOR.env.version ? !0 : !1 }, getDropTarget: function (a) {
                    var b = a.editable(); return CKEDITOR.env.ie &&
                        9 > CKEDITOR.env.version || b.isInline() ? b : a.document
                }, fixSplitNodesAfterDrop: function (a, b, c, e) {
                    function d(a, c, e) { var g = a; g.type == CKEDITOR.NODE_TEXT && (g = a.getParent()); if (g.equals(c) && e != c.getChildCount()) return a = b.startContainer.getChild(b.startOffset - 1), c = b.startContainer.getChild(b.startOffset), a && a.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (e = a.getLength(), a.setText(a.getText() + c.getText()), c.remove(), b.setStart(a, e), b.collapse(!0)), !0 } var h = b.startContainer; "number" == typeof e && "number" ==
                        typeof c && h.type == CKEDITOR.NODE_ELEMENT && (d(a.startContainer, h, c) || d(a.endContainer, h, e))
                }, isDropRangeAffectedByDragRange: function (a, b) { var c = b.startContainer, e = b.endOffset; return a.endContainer.equals(c) && a.endOffset <= e || a.startContainer.getParent().equals(c) && a.startContainer.getIndex() < e || a.endContainer.getParent().equals(c) && a.endContainer.getIndex() < e ? !0 : !1 }, internalDrop: function (a, c, e, d) {
                    var h = CKEDITOR.plugins.clipboard, f = d.editable(), k, l; d.fire("saveSnapshot"); d.fire("lockSnapshot", { dontUpdate: 1 });
                    CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(a, c, h.dragStartContainerChildCount, h.dragEndContainerChildCount); (l = this.isDropRangeAffectedByDragRange(a, c)) || (k = a.createBookmark(!1)); h = c.clone().createBookmark(!1); l && (k = a.createBookmark(!1)); a = k.startNode; c = k.endNode; l = h.startNode; c && a.getPosition(l) & CKEDITOR.POSITION_PRECEDING && c.getPosition(l) & CKEDITOR.POSITION_FOLLOWING && l.insertBefore(a); a = d.createRange(); a.moveToBookmark(k); f.extractHtmlFromRange(a, 1); c = d.createRange();
                    h.startNode.getCommonAncestor(f) || (h = d.getSelection().createBookmarks()[0]); c.moveToBookmark(h); b(d, { dataTransfer: e, method: "drop", range: c }, 1); d.fire("unlockSnapshot")
                }, getRangeAtDropPosition: function (a, b) {
                    var c = a.data.$, e = c.clientX, d = c.clientY, h = b.getSelection(!0).getRanges()[0], f = b.createRange(); if (a.data.testRange) return a.data.testRange; if (document.caretRangeFromPoint && b.document.$.caretRangeFromPoint(e, d)) c = b.document.$.caretRangeFromPoint(e, d), f.setStart(CKEDITOR.dom.node(c.startContainer), c.startOffset),
                        f.collapse(!0); else if (c.rangeParent) f.setStart(CKEDITOR.dom.node(c.rangeParent), c.rangeOffset), f.collapse(!0); else {
                            if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && h && b.editable().hasFocus) return h; if (document.body.createTextRange) {
                                b.focus(); c = b.document.getBody().$.createTextRange(); try {
                                    for (var k = !1, l = 0; 20 > l && !k; l++) { if (!k) try { c.moveToPoint(e, d - l), k = !0 } catch (m) { } if (!k) try { c.moveToPoint(e, d + l), k = !0 } catch (w) { } } if (k) {
                                        var z = "cke-temp-" + (new Date).getTime(); c.pasteHTML('\x3cspan id\x3d"' + z + '"\x3e​\x3c/span\x3e');
                                        var A = b.document.getById(z); f.moveToPosition(A, CKEDITOR.POSITION_BEFORE_START); A.remove()
                                    } else { var C = b.document.$.elementFromPoint(e, d), D = new CKEDITOR.dom.element(C), F; if (D.equals(b.editable()) || "html" == D.getName()) return h && h.startContainer && !h.startContainer.equals(b.editable()) ? h : null; F = D.getClientRect(); e < F.left ? f.setStartAt(D, CKEDITOR.POSITION_AFTER_START) : f.setStartAt(D, CKEDITOR.POSITION_BEFORE_END); f.collapse(!0) }
                                } catch (G) { return null }
                            } else return null
                        } return f
                }, initDragDataTransfer: function (a,
                    b) { var c = a.data.$ ? a.data.$.dataTransfer : null, e = new this.dataTransfer(c, b); "dragstart" === a.name && e.storeId(); c ? this.dragData && e.id == this.dragData.id ? e = this.dragData : this.dragData = e : this.dragData ? e = this.dragData : this.dragData = e; a.data.dataTransfer = e }, resetDragDataTransfer: function () { this.dragData = null }, initPasteDataTransfer: function (a, b) {
                        if (this.isCustomCopyCutSupported) {
                            if (a && a.data && a.data.$) {
                                var c = a.data.$.clipboardData, e = new this.dataTransfer(c, b); "copy" !== a.name && "cut" !== a.name || e.storeId(); this.copyCutData &&
                                    e.id == this.copyCutData.id ? (e = this.copyCutData, e.$ = c) : this.copyCutData = e; return e
                            } return new this.dataTransfer(null, b)
                        } return new this.dataTransfer(CKEDITOR.env.edge && a && a.data.$ && a.data.$.clipboardData || null, b)
                    }, preventDefaultDropOnElement: function (a) { a && a.on("dragover", l) }
            }; k = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text"; CKEDITOR.plugins.clipboard.dataTransfer = function (a, b) {
                a && (this.$ = a); this._ = {
                    metaRegExp: /^<meta.*?>/i, bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i, fragmentRegExp: /\s*\x3c!--StartFragment--\x3e|\x3c!--EndFragment--\x3e\s*/g,
                    data: {}, files: [], nativeHtmlCache: "", normalizeType: function (a) { a = a.toLowerCase(); return "text" == a || "text/plain" == a ? "Text" : "url" == a ? "URL" : a }
                }; this._.fallbackDataTransfer = new CKEDITOR.plugins.clipboard.fallbackDataTransfer(this); this.id = this.getData(k); this.id || (this.id = "Text" == k ? "" : "cke-" + CKEDITOR.tools.getUniqueId()); b && (this.sourceEditor = b, this.setData("text/html", b.getSelectedHtml(1)), "Text" == k || this.getData("text/plain") || this.setData("text/plain", b.getSelection().getSelectedText()))
            }; CKEDITOR.DATA_TRANSFER_INTERNAL =
                1; CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2; CKEDITOR.DATA_TRANSFER_EXTERNAL = 3; CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
                    getData: function (a, b) {
                        a = this._.normalizeType(a); var c = "text/html" == a && b ? this._.nativeHtmlCache : this._.data[a]; if (void 0 === c || null === c || "" === c) { if (this._.fallbackDataTransfer.isRequired()) c = this._.fallbackDataTransfer.getData(a, b); else try { c = this.$.getData(a) || "" } catch (e) { c = "" } "text/html" != a || b || (c = this._stripHtml(c)) } "Text" == a && CKEDITOR.env.gecko && this.getFilesCount() && "file://" ==
                            c.substring(0, 7) && (c = ""); if ("string" === typeof c) var d = c.indexOf("\x3c/html\x3e"), c = -1 !== d ? c.substring(0, d + 7) : c; return c
                    }, setData: function (a, b) { a = this._.normalizeType(a); "text/html" == a ? (this._.data[a] = this._stripHtml(b), this._.nativeHtmlCache = b) : this._.data[a] = b; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == a || "Text" == a) if ("Text" == k && "Text" == a && (this.id = b), this._.fallbackDataTransfer.isRequired()) this._.fallbackDataTransfer.setData(a, b); else try { this.$.setData(a, b) } catch (c) { } }, storeId: function () {
                        "Text" !==
                        k && this.setData(k, this.id)
                    }, getTransferType: function (a) { return this.sourceEditor ? this.sourceEditor == a ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL }, cacheData: function () {
                        function a(c) { c = b._.normalizeType(c); var e = b.getData(c); "text/html" == c && (b._.nativeHtmlCache = b.getData(c, !0), e = b._stripHtml(e)); e && (b._.data[c] = e) } if (this.$) {
                            var b = this, c, e; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) { if (this.$.types) for (c = 0; c < this.$.types.length; c++)a(this.$.types[c]) } else a("Text"),
                                a("URL"); e = this._getImageFromClipboard(); if (this.$ && this.$.files || e) { this._.files = []; if (this.$.files && this.$.files.length) for (c = 0; c < this.$.files.length; c++)this._.files.push(this.$.files[c]); 0 === this._.files.length && e && this._.files.push(e) }
                        }
                    }, getFilesCount: function () { return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0 }, getFile: function (a) {
                        return this._.files.length ? this._.files[a] : this.$ && this.$.files && this.$.files.length ?
                            this.$.files[a] : 0 === a ? this._getImageFromClipboard() : void 0
                    }, isEmpty: function () { var a = {}, b; if (this.getFilesCount()) return !1; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(this._.data), function (b) { a[b] = 1 }); if (this.$) if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) { if (this.$.types) for (var c = 0; c < this.$.types.length; c++)a[this.$.types[c]] = 1 } else a.Text = 1, a.URL = 1; "Text" != k && (a[k] = 0); for (b in a) if (a[b] && "" !== this.getData(b)) return !1; return !0 }, getTypes: function () {
                        return this.$ && this.$.types ?
                            [].slice.call(this.$.types) : []
                    }, _getImageFromClipboard: function () { var a; try { if (this.$ && this.$.items && this.$.items[0] && (a = this.$.items[0].getAsFile()) && a.type) return a } catch (b) { } }, _stripHtml: function (a) { if (a && a.length) { a = a.replace(this._.metaRegExp, ""); var b = this._.bodyRegExp.exec(a); b && b.length && (a = b[1], a = a.replace(this._.fragmentRegExp, "")) } return a }
                }; CKEDITOR.plugins.clipboard.fallbackDataTransfer = function (a) { this._dataTransfer = a; this._customDataFallbackType = "text/html" }; CKEDITOR.plugins.clipboard.fallbackDataTransfer._isCustomMimeTypeSupported =
                    null; CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes = []; CKEDITOR.plugins.clipboard.fallbackDataTransfer.prototype = {
                        isRequired: function () {
                            var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer, b = this._dataTransfer.$; if (null === a._isCustomMimeTypeSupported) if (b) { a._isCustomMimeTypeSupported = !1; if (CKEDITOR.env.edge && 17 <= CKEDITOR.env.version) return !0; try { b.setData("cke/mimetypetest", "cke test value"), a._isCustomMimeTypeSupported = "cke test value" === b.getData("cke/mimetypetest"), b.clearData("cke/mimetypetest") } catch (c) { } } else return !1;
                            return !a._isCustomMimeTypeSupported
                        }, getData: function (a, b) { var c = this._getData(this._customDataFallbackType, !0); if (b) return c; var c = this._extractDataComment(c), e = null, e = a === this._customDataFallbackType ? c.content : c.data && c.data[a] ? c.data[a] : this._getData(a, !0); return null !== e ? e : "" }, setData: function (a, b) {
                            var c = a === this._customDataFallbackType; c && (b = this._applyDataComment(b, this._getFallbackTypeData())); var e = b, d = this._dataTransfer.$; try { d.setData(a, e), c && (this._dataTransfer._.nativeHtmlCache = e) } catch (h) {
                                if (this._isUnsupportedMimeTypeError(h)) {
                                    c =
                                    CKEDITOR.plugins.clipboard.fallbackDataTransfer; -1 === CKEDITOR.tools.indexOf(c._customTypes, a) && c._customTypes.push(a); var c = this._getFallbackTypeContent(), f = this._getFallbackTypeData(); f[a] = e; try { e = this._applyDataComment(c, f), d.setData(this._customDataFallbackType, e), this._dataTransfer._.nativeHtmlCache = e } catch (k) { e = "" }
                                }
                            } return e
                        }, _getData: function (a, b) { var c = this._dataTransfer._.data; if (!b && c[a]) return c[a]; try { return this._dataTransfer.$.getData(a) } catch (e) { return null } }, _getFallbackTypeContent: function () {
                            var a =
                                this._dataTransfer._.data[this._customDataFallbackType]; a || (a = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).content); return a
                        }, _getFallbackTypeData: function () { var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes, b = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).data || {}, c = this._dataTransfer._.data; CKEDITOR.tools.array.forEach(a, function (a) { void 0 !== c[a] ? b[a] = c[a] : void 0 !== b[a] && (b[a] = b[a]) }, this); return b }, _isUnsupportedMimeTypeError: function (a) {
                            return a.message &&
                                -1 !== a.message.search(/element not found/gi)
                        }, _extractDataComment: function (a) { var b = { data: null, content: a || "" }; if (a && 16 < a.length) { var c; (c = /\x3c!--cke-data:(.*?)--\x3e/g.exec(a)) && c[1] && (b.data = JSON.parse(decodeURIComponent(c[1])), b.content = a.replace(c[0], "")) } return b }, _applyDataComment: function (a, b) { var c = ""; b && CKEDITOR.tools.object.keys(b).length && (c = "\x3c!--cke-data:" + encodeURIComponent(JSON.stringify(b)) + "--\x3e"); return c + (a && a.length ? a : "") }
                    }
        })(); CKEDITOR.config.clipboard_notificationDuration =
            1E4; CKEDITOR.plugins.add("panelbutton", {
                requires: "button", onLoad: function () {
                    function b(b) { var d = this._; d.state != CKEDITOR.TRISTATE_DISABLED && (this.createPanel(b), d.on ? d.panel.hide() : d.panel.showBlock(this._.id, this.document.getById(this._.id), 4)) } CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
                        base: CKEDITOR.ui.button, $: function (f) {
                            var d = f.panel || {}; delete f.panel; this.base(f); this.document = d.parent && d.parent.getDocument() || CKEDITOR.document; d.block = { attributes: d.attributes }; d.toolbarRelated = !0;
                            this.hasArrow = "listbox"; this.click = b; this._ = { panelDefinition: d }
                        }, statics: { handler: { create: function (b) { return new CKEDITOR.ui.panelButton(b) } } }, proto: {
                            createPanel: function (b) {
                                var d = this._; if (!d.panel) {
                                    var a = this._.panelDefinition, c = this._.panelDefinition.block, m = a.parent || CKEDITOR.document.getBody(), h = this._.panel = new CKEDITOR.ui.floatPanel(b, m, a), a = h.addBlock(d.id, c), l = this, e = b.getCommand(this.command); h.onShow = function () {
                                        l.className && this.element.addClass(l.className + "_panel"); l.setState(CKEDITOR.TRISTATE_ON);
                                        d.on = 1; l.editorFocus && b.focus(); if (l.onOpen) l.onOpen()
                                    }; h.onHide = function (a) { l.className && this.element.getFirst().removeClass(l.className + "_panel"); !l.modes && e ? l.setStateFromCommand(e) : l.setState(l.modes && l.modes[b.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); d.on = 0; if (!a && l.onClose) l.onClose() }; h.onEscape = function () { h.hide(1); l.document.getById(d.id).focus() }; if (this.onBlock) this.onBlock(h, a); a.onHide = function () { d.on = 0; !l.modes && l.command ? l.setStateFromCommand(e) : l.setState(CKEDITOR.TRISTATE_OFF) }
                                }
                            },
                            setStateFromCommand: function (b) { this.setState(b.state) }
                        }
                    })
                }, beforeInit: function (b) { b.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler) }
            }); CKEDITOR.UI_PANELBUTTON = "panelbutton"; (function () {
                CKEDITOR.plugins.add("panel", { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler) } }); CKEDITOR.UI_PANEL = "panel"; CKEDITOR.ui.panel = function (a, b) {
                    b && CKEDITOR.tools.extend(this, b); CKEDITOR.tools.extend(this, { className: "", css: [] }); this.id = CKEDITOR.tools.getNextId();
                    this.document = a; this.isFramed = this.forceIFrame || this.css.length; this._ = { blocks: {} }
                }; CKEDITOR.ui.panel.handler = { create: function (a) { return new CKEDITOR.ui.panel(a) } }; var b = CKEDITOR.addTemplate("panel", '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'), f = CKEDITOR.addTemplate("panel-frame", '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'),
                    d = CKEDITOR.addTemplate("panel-frame-inner", '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e'); CKEDITOR.ui.panel.prototype = {
                        render: function (a, c) {
                            var m = { editorId: a.id, id: this.id, langCode: a.langCode, dir: a.lang.dir, cls: this.className, frame: "", env: CKEDITOR.env.cssClass, "z-index": a.config.baseFloatZIndex + 1 };
                            this.getHolderElement = function () {
                                var a = this._.holder; if (!a) {
                                    if (this.isFramed) {
                                        var a = this.document.getById(this.id + "_frame"), b = a.getParent(), a = a.getFrameDocument(); CKEDITOR.env.iOS && b.setStyles({ overflow: "scroll", "-webkit-overflow-scrolling": "touch" }); b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () { this.isLoaded = !0; if (this.onLoad) this.onLoad() }, this)); a.write(d.output(CKEDITOR.tools.extend({
                                            css: CKEDITOR.tools.buildStyleHtml(this.css), onload: "window.parent.CKEDITOR.tools.callFunction(" +
                                                b + ");"
                                        }, m))); a.getWindow().$.CKEDITOR = CKEDITOR; a.on("keydown", function (a) { var b = a.data.getKeystroke(), c = this.document.getById(this.id).getAttribute("dir"); if ("input" !== a.data.getTarget().getName() || 37 !== b && 39 !== b) this._.onKeyDown && !1 === this._.onKeyDown(b) ? "input" === a.data.getTarget().getName() && 32 === b || a.data.preventDefault() : (27 == b || b == ("rtl" == c ? 39 : 37)) && this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault() }, this); a = a.getBody(); a.unselectable(); CKEDITOR.env.air && CKEDITOR.tools.callFunction(b)
                                    } else a =
                                        this.document.getById(this.id); this._.holder = a
                                } return a
                            }; if (this.isFramed) { var h = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : ""; m.frame = f.output({ id: this.id + "_frame", src: h }) } h = b.output(m); c && c.push(h); return h
                        }, addBlock: function (a, b) {
                            b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(), b);
                            this._.currentBlock || this.showBlock(a); return b
                        }, getBlock: function (a) { return this._.blocks[a] }, showBlock: function (a) { a = this._.blocks[a]; var b = this._.currentBlock, d = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame"); b && b.hide(); this._.currentBlock = a; CKEDITOR.fire("ariaWidget", d); a._.focusIndex = -1; this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a); a.show(); return a }, destroy: function () { this.element && this.element.remove() }
                    }; CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
                        $: function (a,
                            b) { this.element = a.append(a.getDocument().createElement("div", { attributes: { tabindex: -1, "class": "cke_panel_block" }, styles: { display: "none" } })); b && CKEDITOR.tools.extend(this, b); this.element.setAttributes({ role: this.attributes.role || "presentation", "aria-label": this.attributes["aria-label"], title: this.attributes.title || this.attributes["aria-label"] }); this.keys = {}; this._.focusIndex = -1; this.element.disableContextMenu() }, _: {
                                markItem: function (a) {
                                    -1 != a && (a = this._.getItems().getItem(this._.focusIndex = a), CKEDITOR.env.webkit &&
                                        a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a))
                                }, markFirstDisplayed: function (a) { for (var b = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && "none" == a.getStyle("display") }, d = this._.getItems(), h, f, e = d.count() - 1; 0 <= e; e--)if (h = d.getItem(e), h.getAscendant(b) || (f = h, this._.focusIndex = e), "true" == h.getAttribute("aria-selected")) { f = h; this._.focusIndex = e; break } f && (a && a(), CKEDITOR.env.webkit && f.getDocument().getWindow().focus(), f.focus(), this.onMark && this.onMark(f)) }, getItems: function () { return this.element.find("a,input") }
                            },
                        proto: {
                            show: function () { this.element.setStyle("display", "") }, hide: function () { this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none") }, onKeyDown: function (a, b) {
                                var d = this.keys[a]; switch (d) {
                                    case "next": for (var h = this._.focusIndex, d = this._.getItems(), f; f = d.getItem(++h);)if (f.getAttribute("_cke_focus") && f.$.offsetWidth) { this._.focusIndex = h; f.focus(!0); break } return f || b ? !1 : (this._.focusIndex = -1, this.onKeyDown(a, 1)); case "prev": h = this._.focusIndex; for (d = this._.getItems(); 0 < h && (f =
                                        d.getItem(--h));) { if (f.getAttribute("_cke_focus") && f.$.offsetWidth) { this._.focusIndex = h; f.focus(!0); break } f = null } return f || b ? !1 : (this._.focusIndex = d.count(), this.onKeyDown(a, 1)); case "click": case "mouseup": return h = this._.focusIndex, (f = 0 <= h && this._.getItems().getItem(h)) && f.fireEventHandler(d, { button: CKEDITOR.tools.normalizeMouseButton(CKEDITOR.MOUSE_BUTTON_LEFT, !0) }), !1
                                }return !0
                            }
                        }
                    })
            })(); CKEDITOR.plugins.add("floatpanel", { requires: "panel" }); (function () {
                function b(b, a, c, m, h) {
                    h = CKEDITOR.tools.genKey(a.getUniqueId(),
                        c.getUniqueId(), b.lang.dir, b.uiColor || "", m.css || "", h || ""); var l = f[h]; l || (l = f[h] = new CKEDITOR.ui.panel(a, m), l.element = c.append(CKEDITOR.dom.element.createFromHtml(l.render(b), a)), l.element.setStyles({ display: "none", position: "absolute" })); return l
                } var f = {}; CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
                    $: function (d, a, c, f) {
                        function h() { g.hide() } c.forceIFrame = 1; c.toolbarRelated && d.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (a = CKEDITOR.document.getById("cke_" + d.name)); var l = a.getDocument(); f = b(d, l,
                            a, c, f || 0); var e = f.element, k = e.getFirst(), g = this; e.disableContextMenu(); this.element = e; this._ = { editor: d, panel: f, parentElement: a, definition: c, document: l, iframe: k, children: [], dir: d.lang.dir, showBlockParams: null, markFirst: void 0 !== c.markFirst ? c.markFirst : !0 }; d.on("mode", h); d.on("resize", h); l.getWindow().on("resize", function () { this.reposition() }, this)
                    }, proto: {
                        addBlock: function (b, a) { return this._.panel.addBlock(b, a) }, addListBlock: function (b, a) { return this._.panel.addListBlock(b, a) }, getBlock: function (b) { return this._.panel.getBlock(b) },
                        showBlock: function (b, a, c, f, h, l) {
                            var e = this._.panel, k = e.showBlock(b); this._.showBlockParams = [].slice.call(arguments); this.allowBlur(!1); var g = this._.editor.editable(); this._.returnFocus = g.hasFocus ? g : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement); this._.hideTimeout = 0; var n = this.element, g = this._.iframe, g = CKEDITOR.env.ie && !CKEDITOR.env.edge ? g : new CKEDITOR.dom.window(g.$.contentWindow), q = n.getDocument(), u = this._.parentElement.getPositionedAncestor(), r = a.getDocumentPosition(q), q = u ? u.getDocumentPosition(q) :
                                { x: 0, y: 0 }, p = "rtl" == this._.dir, v = r.x + (f || 0) - q.x, y = r.y + (h || 0) - q.y; !p || 1 != c && 4 != c ? p || 2 != c && 3 != c || (v += a.$.offsetWidth - 1) : v += a.$.offsetWidth; if (3 == c || 4 == c) y += a.$.offsetHeight - 1; this._.panel._.offsetParentId = a.getId(); n.setStyles({ top: y + "px", left: 0, display: "" }); n.setOpacity(0); n.getFirst().removeStyle("width"); this._.editor.focusManager.add(g); this._.blurSet || (CKEDITOR.event.useCapture = !0, g.on("blur", function (a) {
                                    function b() { delete this._.returnFocus; this.hide() } this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET &&
                                        this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(b, 0, this)) : b.call(this))
                                }, this), g.on("focus", function () { this._.focused = !0; this.hideChild(); this.allowBlur(!0) }, this), CKEDITOR.env.iOS && (g.on("touchstart", function () { clearTimeout(this._.hideTimeout) }, this), g.on("touchend", function () { this._.hideTimeout = 0; this.focus() }, this)), CKEDITOR.event.useCapture = !1, this._.blurSet = 1); e.onEscape = CKEDITOR.tools.bind(function (a) {
                                    if (this.onEscape &&
                                        !1 === this.onEscape(a)) return !1
                                }, this); CKEDITOR.tools.setTimeout(function () {
                                    var a = CKEDITOR.tools.bind(function () {
                                        var a = n; a.removeStyle("width"); if (k.autoSize) {
                                            var b = k.element.getDocument(), b = (CKEDITOR.env.webkit || CKEDITOR.env.edge ? k.element : b.getBody()).$.scrollWidth; CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetWidth || 0) - (a.$.clientWidth || 0) + 3); a.setStyle("width", b + 10 + "px"); b = k.element.$.scrollHeight; CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight ||
                                                0) + 3); a.setStyle("height", b + "px"); e._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                                        } else a.removeStyle("height"); p && (v -= n.$.offsetWidth); n.setStyle("left", v + "px"); var b = e.element.getWindow(), a = n.$.getBoundingClientRect(), b = b.getViewPaneSize(), c = a.width || a.right - a.left, d = a.height || a.bottom - a.top, h = p ? a.right : b.width - a.left, g = p ? b.width - a.right : a.left; p ? h < c && (v = g > c ? v + c : b.width > c ? v - a.left : v - a.right + b.width) : h < c && (v = g > c ? v - c : b.width > c ? v - a.right + b.width : v - a.left); c = a.top; b.height -
                                            a.top < d && (y = c > d ? y - d : b.height > d ? y - a.bottom + b.height : y - a.top); CKEDITOR.env.ie && !CKEDITOR.env.edge && ((b = a = n.$.offsetParent && new CKEDITOR.dom.element(n.$.offsetParent)) && "html" == b.getName() && (b = b.getDocument().getBody()), b && "rtl" == b.getComputedStyle("direction") && (v = CKEDITOR.env.ie8Compat ? v - 2 * n.getDocument().getDocumentElement().$.scrollLeft : v - (a.$.scrollWidth - a.$.clientWidth))); var a = n.getFirst(), f; (f = a.getCustomData("activePanel")) && f.onHide && f.onHide.call(this, 1); a.setCustomData("activePanel", this);
                                        n.setStyles({ top: y + "px", left: v + "px" }); n.setOpacity(1); l && l()
                                    }, this); e.isLoaded ? a() : e.onLoad = a; CKEDITOR.tools.setTimeout(function () {
                                        var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y; this.focus(); k.element.focus(); CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a); this.allowBlur(!0); this._.markFirst && (CKEDITOR.env.ie ? CKEDITOR.tools.setTimeout(function () { k.markFirstDisplayed ? k.markFirstDisplayed() : k._.markFirstDisplayed() }, 0) : k.markFirstDisplayed ? k.markFirstDisplayed() :
                                            k._.markFirstDisplayed()); this._.editor.fire("panelShow", this)
                                    }, 0, this)
                                }, CKEDITOR.env.air ? 200 : 0, this); this.visible = 1; this.onShow && this.onShow.call(this)
                        }, reposition: function () { var b = this._.showBlockParams; this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, b)) }, focus: function () { if (CKEDITOR.env.webkit) { var b = CKEDITOR.document.getActive(); b && !b.equals(this._.iframe) && b.$.blur() } (this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus() }, blur: function () {
                            var b =
                                this._.iframe.getFrameDocument().getActive(); b && b.is("a") && (this._.lastFocused = b)
                        }, hide: function (b) {
                            if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
                                this.hideChild(); CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur(); this.element.setStyle("display", "none"); this.visible = 0; this.element.getFirst().removeCustomData("activePanel"); if (b = b && this._.returnFocus) CKEDITOR.env.webkit && b.type && b.getWindow().$.focus(), b.focus(); delete this._.lastFocused; this._.showBlockParams =
                                    null; this._.editor.fire("panelHide", this)
                            }
                        }, allowBlur: function (b) { var a = this._.panel; void 0 !== b && (a.allowBlur = b); return a.allowBlur }, showAsChild: function (b, a, c, f, h, l) {
                            if (this._.activeChild != b || b._.panel._.offsetParentId != c.getId()) this.hideChild(), b.onHide = CKEDITOR.tools.bind(function () { CKEDITOR.tools.setTimeout(function () { this._.focused || this.hide() }, 0, this) }, this), this._.activeChild = b, this._.focused = !1, b.showBlock(a, c, f, h, l), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function () {
                                b.element.getChild(0).$.style.cssText +=
                                ""
                            }, 100)
                        }, hideChild: function (b) { var a = this._.activeChild; a && (delete a.onHide, delete this._.activeChild, a.hide(), b && this.focus()) }
                    }
                }); CKEDITOR.on("instanceDestroyed", function () { var b = CKEDITOR.tools.isEmpty(CKEDITOR.instances), a; for (a in f) { var c = f[a]; b ? c.destroy() : c.element.hide() } b && (f = {}) })
            })(); (function () {
                var b, f, d; CKEDITOR.plugins.add("colorbutton", {
                    requires: "panelbutton,floatpanel", init: function (a) {
                        function c(c) {
                            function g() {
                                var b = a.config["colorButton_" + v + "Style"]; b.childRule = "back" == v ? function (a) { return h(a) } :
                                    function (a) { return !(a.is("a") || a.getElementsByTag("a").count()) || h(a) }; return b
                            } function n(b, c, e) { var d = {}; b && (d.color = b); c && (d.colorName = c); c = !CKEDITOR.tools.isEmpty(d) && new CKEDITOR.style(g(), d); a.execCommand(B, { newStyle: c }); if (b && e) for (e.addColor(b.substr(1).toUpperCase()), b = G.element.find("[role\x3doption]").toArray(), e = 0; e < b.length; e++)b[e].setAttributes({ "aria-posinset": e + 1, "aria-setsize": b.length }) } var p = c.name, v = c.type, y = c.title, t = c.order, B = c.commandName; c = c.contentTransformations || {}; var w =
                                new CKEDITOR.style(e["colorButton_" + v + "Style"]), z = CKEDITOR.tools.getNextId() + "_colorBox", A = { type: v }, C = new CKEDITOR.style(e["colorButton_" + v + "Style"], { color: "inherit" }), D = function () { return CKEDITOR.tools.addFunction(function (b, c, e) { a.focus(); a.fire("saveSnapshot"); "?" == b ? a.getColorFromDialog(function (a) { a && n(a, c, F) }, null, A) : n(b && "#" + b, c, F); e && (e.setAttribute("cke_colorlast", !0), a.once("selectionChange", function () { e.removeAttribute("cke_colorlast") })) }) }(), F = d.getRowLimit(a) ? new d(a, "back" == v ? "background-color" :
                                    "color", D) : void 0, G; a.addCommand(B, { contextSensitive: !0, exec: function (a, b) { if (!a.readOnly) { var c = b.newStyle; a.removeStyle(C); a.focus(); c && a.applyStyle(c); a.fire("saveSnapshot") } }, refresh: function (a, b) { C.checkApplicable(b, a, a.activeFilter) ? C.checkActive(b, a) ? this.setState(CKEDITOR.TRISTATE_ON) : this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED) } }); a.ui.add(p, CKEDITOR.UI_PANELBUTTON, {
                                        label: y, title: y, command: B, editorFocus: 0, toolbar: "colors," + t, allowedContent: w, requiredContent: w,
                                        contentTransformations: c, panel: { css: CKEDITOR.skin.getPath("editor"), attributes: { role: "listbox", "aria-label": k.panelTitle } }, select: function (a) { var c = e.colorButton_colors.split(","); a = CKEDITOR.tools.array.find(c, a); a = b.normalizeColor(a); l(G, a); G._.markFirstDisplayed() }, onBlock: function (b, c) {
                                            G = c; c.autoSize = !0; c.element.addClass("cke_colorblock"); c.element.setHtml(f(z, D, F ? F.getLength() : 0)); c.element.getDocument().getBody().setStyle("overflow", "hidden"); CKEDITOR.ui.fire("ready", this); var e = c.keys, d = "rtl" ==
                                                a.lang.dir; e[d ? 37 : 39] = "next"; e[40] = "next"; e[9] = "next"; e[d ? 39 : 37] = "prev"; e[38] = "prev"; e[CKEDITOR.SHIFT + 9] = "prev"; e[32] = "click"; F && F.setContainer(c.element.findOne(".cke_colorhistory"))
                                        }, onOpen: function () {
                                            var c = a.getSelection(), d = c && c.getStartElement(), h = a.elementPath(d), g = "back" == v ? "background-color" : "color"; if (h) {
                                                d = h.block || h.blockLimit || a.document.getBody(); do h = d && d.getComputedStyle(g) || "transparent"; while ("back" == v && "transparent" == h && d && (d = d.getParent())); h && "transparent" != h || (h = "#ffffff"); e.colorButton_enableAutomatic &&
                                                    G.element.findOne("#" + z).setStyle("background-color", h); if (d = c && c.getRanges()[0]) { for (var c = new CKEDITOR.dom.walker(d), f = d.collapsed ? d.startContainer : c.next(), d = ""; f;) { f.type !== CKEDITOR.NODE_ELEMENT && (f = f.getParent()); f = b.normalizeColor(f.getComputedStyle(g)); d = d || f; if (d !== f) { d = ""; break } f = c.next() } "transparent" == d && (d = ""); "fore" == v && (A.automaticTextColor = "#" + b.normalizeColor(h)); A.selectionColor = d ? "#" + d : ""; l(G, d) } return h
                                            }
                                        }
                                    })
                        } function f(c, h, g) {
                            var l = [], m = e.colorButton_colors.split(","), n = a.plugins.colordialog &&
                                e.colorButton_enableMore; g = m.length + g + (n ? 1 : 0); var t = 1; e.colorButton_enableAutomatic && (g += 1, t += 1, l.push('\x3ca class\x3d"cke_colorauto" _cke_focus\x3d1 hidefocus\x3dtrue', ' title\x3d"', k.auto, '"', ' draggable\x3d"false"', ' ondragstart\x3d"return false;"', ' onclick\x3d"CKEDITOR.tools.callFunction(', h, ',null);return false;"', " href\x3d\"javascript:void('", k.auto, "')\"", ' role\x3d"option" aria-posinset\x3d"1" aria-setsize\x3d"', g, '"\x3e', '\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e',
                                    "\x3ctr\x3e", '\x3ctd colspan\x3d"', a.config.colorButton_colorsPerRow, '" align\x3d"center"\x3e', '\x3cspan class\x3d"cke_colorbox" id\x3d"', c, '"\x3e\x3c/span\x3e', k.auto, "\x3c/td\x3e", "\x3c/tr\x3e", "\x3c/table\x3e", "\x3c/a\x3e")); l.push('\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e\x3ctbody\x3e'); for (c = 0; c < m.length; c++) {
                                        0 === c % a.config.colorButton_colorsPerRow && l.push("\x3c/tr\x3e\x3ctr\x3e"); var B = m[c].split("/"), w = B[0], B = new b(a, {
                                            color: B[1] || w, label: B[1] ? w :
                                                void 0
                                        }, h); B.setPositionIndex(t + c, g); l.push(B.getHtml())
                                    } d.getRowLimit(a) && d.renderContainer(l, a); n && l.push("\x3c/tr\x3e", "\x3ctr\x3e", '\x3ctd colspan\x3d"', a.config.colorButton_colorsPerRow, '" align\x3d"center"\x3e', '\x3ca class\x3d"cke_colormore" _cke_focus\x3d1 hidefocus\x3dtrue', ' title\x3d"', k.more, '"', ' draggable\x3d"false"', ' ondragstart\x3d"return false;"', ' onclick\x3d"CKEDITOR.tools.callFunction(', h, ",'?');return false;\"", " href\x3d\"javascript:void('", k.more, "')\"", ' role\x3d"option" aria-posinset\x3d"',
                                        g, '" aria-setsize\x3d"', g, '"\x3e', k.more, "\x3c/a\x3e", "\x3c/td\x3e"); l.push("\x3c/tr\x3e\x3c/tbody\x3e\x3c/table\x3e"); return l.join("")
                        } function h(a) { return "false" == a.getAttribute("contentEditable") || a.getAttribute("data-nostyle") } function l(a, c) {
                            var e = a._.getItems(), d = a.element.findOne("[aria-selected]"), h = a.element.findOne("[cke_colorlast]"); d && d.removeAttribute("aria-selected"); if (h) h.setAttribute("aria-selected", !0); else for (d = 0; d < e.count(); d++)if (h = e.getItem(d), c && c == b.normalizeColor(h.getAttribute("data-value"))) {
                                h.setAttribute("aria-selected",
                                    !0); break
                            }
                        } var e = a.config, k = a.lang.colorbutton; if (!CKEDITOR.env.hc) {
                            c({ name: "TextColor", type: "fore", commandName: "textColor", title: k.textColorTitle, order: 10, contentTransformations: [[{ element: "font", check: "span{color}", left: function (a) { return !!a.attributes.color }, right: function (a) { a.name = "span"; a.attributes.color && (a.styles.color = a.attributes.color); delete a.attributes.color } }]] }); var g, n = a.config.colorButton_normalizeBackground; if (void 0 === n || n) g = [[{
                                element: "span", left: function (a) {
                                    var b = CKEDITOR.tools;
                                    if ("span" != a.name || !a.styles || !a.styles.background) return !1; a = b.style.parse.background(a.styles.background); return a.color && 1 === b.object.keys(a).length
                                }, right: function (b) { var c = (new CKEDITOR.style(a.config.colorButton_backStyle, { color: b.styles.background })).getDefinition(); b.name = c.element; b.styles = c.styles; b.attributes = c.attributes || {}; return b }
                            }]]; c({ name: "BGColor", type: "back", commandName: "bgColor", title: k.bgColorTitle, order: 20, contentTransformations: g })
                        }
                    }
                }); b = CKEDITOR.tools.createClass({
                    $: function (a,
                        c, d) { this.$ = new CKEDITOR.dom.element("td"); this.color = CKEDITOR.tools._isValidColorFormat(c.color) ? c.color : ""; this.clickFn = d; this.label = c.label || b.colorNames(a)[this.color] || this.color; this.setHtml() }, statics: {
                            colorNames: function (a) { return a.lang.colorbutton.colors }, normalizeColor: function (a) {
                                var b = /^(rgb|hsl)a\(/g.test(a), d = /^rgba\((\s*0\s*,?){4}\)$/g.test(a); return b && !d ? (a = new CKEDITOR.tools.color(a), CKEDITOR.tools.normalizeHex(a.getHex() || "").replace(/#/g, "")) : CKEDITOR.tools.normalizeHex("#" + CKEDITOR.tools.convertRgbToHex(a ||
                                    "")).replace(/#/g, "")
                            }
                        }, proto: {
                            getElement: function () { return this.$ }, getHtml: function () { return this.getElement().getOuterHtml() }, setHtml: function () {
                                this.getElement().setHtml('\x3ca class\x3d"cke_colorbox" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"' + this.label + '" draggable\x3d"false" ondragstart\x3d"return false;" onclick\x3d"CKEDITOR.tools.callFunction(' + this.clickFn + ",'" + this.color + "','" + this.label + "', this); return false;\" href\x3d\"javascript:void('" + this.color + '\')" data-value\x3d"' + this.color +
                                    '" role\x3d"option"\x3e\x3cspan class\x3d"cke_colorbox" style\x3d"background-color:#' + this.color + '"\x3e\x3c/span\x3e\x3c/a\x3e')
                            }, setPositionIndex: function (a, b) { this.getElement().getChild(0).setAttributes({ "aria-posinset": a, "aria-setsize": b }) }
                        }
                }); f = CKEDITOR.tools.createClass({
                    $: function () { this.$ = new CKEDITOR.dom.element("tr"); this.$.addClass("cke_colorhistory_row"); this.boxes = [] }, proto: {
                        getElement: function () { return this.$ }, removeLastColor: function () { this.getElement().getLast().remove(); return this.boxes.pop() },
                        addNewColor: function (a) { this.boxes.unshift(a); this.getElement().append(a.getElement(), !0) }, extractColorBox: function (a) { var b = CKEDITOR.tools.getIndex(this.boxes, function (b) { return b.color === a }); if (0 > b) return null; this.boxes[b].getElement().remove(); return this.boxes.splice(b, 1)[0] }
                    }
                }); d = CKEDITOR.tools.createClass({
                    $: function (a, b, d) {
                        this.editor = a; this.cssProperty = b; this.clickFn = d; this.rows = []; this._.addNewRow(); if (this.editor.config.colorButton_renderContentColors) this.editor.once("instanceReady", function () { this.renderContentColors() },
                            this)
                    }, statics: { renderContainer: function (a, b) { a.push('\x3c/tbody\x3e\x3ctbody class\x3d"cke_colorhistory" style\x3d"display:none;"\x3e', "\x3ctr\x3e", '\x3ctd colspan\x3d"', b.config.colorButton_colorsPerRow, '" align\x3d"center"\x3e', "\x3cspan\x3e\x3chr\x3e\x3c/span\x3e", "\x3c/td\x3e", "\x3c/tr\x3e", "\x3c/tbody\x3e\x3ctbody\x3e") }, getRowLimit: function (a) { return a.config.colorButton_historyRowLimit }, getCapacity: function (a) { return d.getRowLimit(a) * a.config.colorButton_colorsPerRow }, colorList: CKEDITOR.tools.style.parse._colors },
                    _: {
                        countColors: function () { var a = CKEDITOR.tools.getStyledSpans(this.cssProperty, this.editor.editable()); return CKEDITOR.tools.array.reduce(a, function (a, b) { var h = this._.getHexCode(b, this.cssProperty, d.colorList); a[h] = a[h] || 0; a[h] += 1; return a }, {}, this) }, getHexCode: function (a, c, d) { var h = a.getStyle(c); return h in d ? d[h].substr(1) : b.normalizeColor(a.getComputedStyle(c)).toUpperCase() }, sortByOccurrencesAscending: function (a, b) {
                            var d = [], h; for (h in a) { var f = {}; f[b] = h; f.frequency = a[h]; d.push(f) } d.sort(function (a,
                                b) { return b.frequency - a.frequency }); this._.trimToCapacity(d); return d.reverse()
                        }, trimToCapacity: function (a) { a.splice(d.getCapacity(this.editor)) }, addColors: function (a) { CKEDITOR.tools.array.forEach(a, function (a) { this.addColor(a.colorCode) }, this) }, extractColorBox: function (a) { for (var b = 0; b < this.rows.length; b++) { var d = this.rows[b].extractColorBox(a); if (d) return d } return null }, moveToBeginning: function (a) { this.rows[0].addNewColor(a) }, createAtBeginning: function (a) {
                            this._.moveToBeginning(new b(this.editor,
                                { color: a }, this.clickFn))
                        }, addNewRow: function () { this.rows.push(new f); this.container && this.container.append(this.rows[this.rows.length - 1].getElement()) }, alignRows: function () { for (var a = 0; a < d.getRowLimit(this.editor) && !(this.rows[a].boxes.length <= this.editor.config.colorButton_colorsPerRow); a++)this.rows[a + 1] ? this._.moveLastBoxToNextRow(a) : a < d.getRowLimit(this.editor) - 1 ? (this._.addNewRow(), this._.moveLastBoxToNextRow(a)) : this.rows[a].removeLastColor() }, moveLastBoxToNextRow: function (a) { this.rows[a + 1].addNewColor(this.rows[a].removeLastColor()) },
                        refreshPositions: function () { var a = this._.countPanelElements(), b = this._.calculateFirstPosition(a); CKEDITOR.tools.array.forEach(this.rows, function (d) { CKEDITOR.tools.array.forEach(d.boxes, function (d) { d.setPositionIndex(b, a); b += 1 }) }) }, countPanelElements: function () { var a = this.editor.config.colorButton_colors.split(",").length + this.getLength(); this.editor.plugins.colordialog && this.editor.config.colorButton_enableMore && (a += 1); this.editor.config.colorButton_enableAutomatic && (a += 1); return a }, calculateFirstPosition: function (a) {
                            return this.editor.plugins.colordialog &&
                                this.editor.config.colorButton_enableMore ? a - this.getLength() : a - this.getLength() + 1
                        }, attachRows: function () { CKEDITOR.tools.array.forEach(this.rows, function (a) { this.container.append(a.getElement()) }, this) }
                    }, proto: {
                        setContainer: function (a) { this.container = a; this._.attachRows(); this.getLength() && this.show() }, show: function () { this.container && this.container.show() }, renderContentColors: function () {
                            var a = this._.countColors(); CKEDITOR.tools.isEmpty(a) || (a = this._.sortByOccurrencesAscending(a, "colorCode"), this._.addColors(a),
                                this._.refreshPositions())
                        }, addColor: function (a) { var b = this._.extractColorBox(a); this.container && !this.container.isVisible() && this.show(); b ? this._.moveToBeginning(b) : this._.createAtBeginning(a); this._.alignRows() }, getLength: function () { return CKEDITOR.tools.array.reduce(this.rows, function (a, b) { return a + b.boxes.length }, 0) }
                    }
                })
            })(); CKEDITOR.config.colorButton_enableMore = !0; CKEDITOR.config.colorButton_colors = "1ABC9C,2ECC71,3498DB,9B59B6,4E5F70,F1C40F,16A085,27AE60,2980B9,8E44AD,2C3E50,F39C12,E67E22,E74C3C,ECF0F1,95A5A6,DDD,FFF,D35400,C0392B,BDC3C7,7F8C8D,999,000";
        CKEDITOR.config.colorButton_foreStyle = { element: "span", styles: { color: "#(color)" }, overrides: [{ element: "font", attributes: { color: null } }] }; CKEDITOR.config.colorButton_backStyle = { element: "span", styles: { "background-color": "#(color)" } }; CKEDITOR.config.colorButton_enableAutomatic = !0; CKEDITOR.config.colorButton_colorsPerRow = 6; CKEDITOR.config.colorButton_historyRowLimit = 1; CKEDITOR.config.colorButton_renderContentColors = !0; CKEDITOR.plugins.colordialog = {
            requires: "dialog", init: function (b) {
                var f = new CKEDITOR.dialogCommand("colordialog");
                f.editorFocus = !1; b.addCommand("colordialog", f); CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js"); b.getColorFromDialog = function (d, a, c) {
                    var f, h, l, e; f = function (b) { l(this); (b = "ok" == b.name ? this.getValueOf("picker", "selectedColor") : null) && !CKEDITOR.tools._isValidColorFormat(b) && (b = null); /^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(b) && (b = "#" + b); d.call(a, b) }; h = function (a) { c && (a.data = c) }; l = function (a) { a.removeListener("ok", f); a.removeListener("cancel", f); a.removeListener("show", h) }; e = function (a) {
                        a.on("ok",
                            f); a.on("cancel", f); a.on("show", h, null, null, 5)
                    }; b.execCommand("colordialog"); if (b._.storedDialogs && b._.storedDialogs.colordialog) e(b._.storedDialogs.colordialog); else CKEDITOR.on("dialogDefinition", function (a) { if ("colordialog" == a.data.name) { var b = a.data.definition; a.removeListener(); b.onLoad = CKEDITOR.tools.override(b.onLoad, function (a) { return function () { e(this); b.onLoad = a; "function" == typeof a && a.call(this) } }) } })
                }
            }
        }; CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog); (function () {
            function b(a,
                b, c, d) { var g = new CKEDITOR.dom.walker(a); if (a = a.startContainer.getAscendant(b, !0) || a.endContainer.getAscendant(b, !0)) if (c(a), d) return; for (; a = g.next();)if (a = a.getAscendant(b, !0)) if (c(a), d) break } function f(b, c) { var e = { ul: "ol", ol: "ul" }; return -1 !== a(c, function (a) { return a.element === b || a.element === e[b] }) } function d(a) {
                    this.styles = null; this.sticky = !1; this.editor = a; this.filter = new CKEDITOR.filter(a, a.config.copyFormatting_allowRules); !0 === a.config.copyFormatting_allowRules && (this.filter.disabled = !0); a.config.copyFormatting_disallowRules &&
                        this.filter.disallow(a.config.copyFormatting_disallowRules)
                } var a = CKEDITOR.tools.indexOf, c = CKEDITOR.tools.getMouseButton, m = !1; CKEDITOR.plugins.add("copyformatting", {
                    lang: "ar,az,bg,cs,da,de,de-ch,el,en,en-au,eo,es-mx,et,eu,fa,fr,gl,hr,hu,it,ja,ko,ku,lv,nb,nl,oc,pl,pt,pt-br,ro,ru,sk,sq,sr,sr-latn,sv,tr,uk,vi,zh,zh-cn", icons: "copyformatting", hidpi: !0, init: function (b) {
                        var d = CKEDITOR.plugins.copyformatting; d._addScreenReaderContainer(); m || (CKEDITOR.document.appendStyleSheet(this.path + "styles/copyformatting.css"),
                            m = !0); b.addContentsCss && b.addContentsCss(this.path + "styles/copyformatting.css"); b.copyFormatting = new d.state(b); b.addCommand("copyFormatting", d.commands.copyFormatting); b.addCommand("applyFormatting", d.commands.applyFormatting); b.ui.addButton("CopyFormatting", { label: b.lang.copyformatting.label, command: "copyFormatting", toolbar: "cleanup,0" }); b.on("contentDom", function () {
                                var a = b.getCommand("copyFormatting"), d = b.editable(), g = d.isInline() ? d : b.document, f = b.ui.get("CopyFormatting"); d.attachListener(g, "mouseup",
                                    function (d) { c(d) === CKEDITOR.MOUSE_BUTTON_LEFT && a.state === CKEDITOR.TRISTATE_ON && b.execCommand("applyFormatting") }); d.attachListener(CKEDITOR.document, "mouseup", function (g) { c(g) !== CKEDITOR.MOUSE_BUTTON_LEFT || a.state !== CKEDITOR.TRISTATE_ON || d.contains(g.data.getTarget()) || b.execCommand("copyFormatting") }); f && (g = CKEDITOR.document.getById(f._.id), d.attachListener(g, "dblclick", function () { b.execCommand("copyFormatting", { sticky: !0 }) }), d.attachListener(g, "mouseup", function (a) { a.data.stopPropagation() }))
                            });
                        b.config.copyFormatting_keystrokeCopy && b.setKeystroke(b.config.copyFormatting_keystrokeCopy, "copyFormatting"); b.on("key", function (a) { var c = b.getCommand("copyFormatting"); a = a.data.domEvent; a.getKeystroke && 27 === a.getKeystroke() && c.state === CKEDITOR.TRISTATE_ON && b.execCommand("copyFormatting") }); b.copyFormatting.on("extractFormatting", function (a) {
                            var c = a.data.element; if (c.contains(b.editable()) || c.equals(b.editable())) return a.cancel(); c = d._convertElementToStyleDef(c); if (!b.copyFormatting.filter.check(new CKEDITOR.style(c),
                                !0, !0)) return a.cancel(); a.data.styleDef = c
                        }); b.copyFormatting.on("applyFormatting", function (c) {
                            if (!c.data.preventFormatStripping) {
                                var k = c.data.range, g = d._extractStylesFromRange(b, k), m = d._determineContext(k), q, u; if (b.copyFormatting._isContextAllowed(m)) for (u = 0; u < g.length; u++)m = g[u], q = k.createBookmark(), -1 === a(d.preservedElements, m.element) ? CKEDITOR.env.webkit && !CKEDITOR.env.chrome ? g[u].removeFromRange(c.data.range, c.editor) : g[u].remove(c.editor) : f(m.element, c.data.styles) && d._removeStylesFromElementInRange(k,
                                    m.element), k.moveToBookmark(q)
                            }
                        }); b.copyFormatting.on("applyFormatting", function (a) { var c = CKEDITOR.plugins.copyformatting, d = c._determineContext(a.data.range); "list" === d && b.copyFormatting._isContextAllowed("list") ? c._applyStylesToListContext(a.editor, a.data.range, a.data.styles) : "table" === d && b.copyFormatting._isContextAllowed("table") ? c._applyStylesToTableContext(a.editor, a.data.range, a.data.styles) : b.copyFormatting._isContextAllowed("text") && c._applyStylesToTextContext(a.editor, a.data.range, a.data.styles) },
                            null, null, 999)
                    }
                }); d.prototype._isContextAllowed = function (b) { var c = this.editor.config.copyFormatting_allowedContexts; return !0 === c || -1 !== a(c, b) }; CKEDITOR.event.implementOn(d.prototype); CKEDITOR.plugins.copyformatting = {
                    state: d, inlineBoundary: "h1 h2 h3 h4 h5 h6 p div".split(" "), excludedAttributes: ["id", "style", "href", "data-cke-saved-href", "dir"], elementsForInlineTransform: ["li"], excludedElementsFromInlineTransform: ["table", "thead", "tbody", "ul", "ol"], excludedAttributesFromInlineTransform: ["value", "type"],
                    preservedElements: "ul ol li td th tr thead tbody table".split(" "), breakOnElements: ["ul", "ol", "table"], _initialKeystrokePasteCommand: null, commands: {
                        copyFormatting: {
                            exec: function (a, b) {
                                var c = CKEDITOR.plugins.copyformatting, d = a.copyFormatting, g = b ? "keystrokeHandler" == b.from : !1, f = b ? b.sticky || g : !1, m = c._getCursorContainer(a), u = CKEDITOR.document.getDocumentElement(); if (this.state === CKEDITOR.TRISTATE_ON) return d.styles = null, d.sticky = !1, m.removeClass("cke_copyformatting_active"), u.removeClass("cke_copyformatting_disabled"),
                                    u.removeClass("cke_copyformatting_tableresize_cursor"), c._putScreenReaderMessage(a, "canceled"), c._detachPasteKeystrokeHandler(a), this.setState(CKEDITOR.TRISTATE_OFF); d.styles = c._extractStylesFromElement(a, a.elementPath().lastElement); this.setState(CKEDITOR.TRISTATE_ON); g || (m.addClass("cke_copyformatting_active"), u.addClass("cke_copyformatting_tableresize_cursor"), a.config.copyFormatting_outerCursor && u.addClass("cke_copyformatting_disabled")); d.sticky = f; c._putScreenReaderMessage(a, "copied"); c._attachPasteKeystrokeHandler(a)
                            }
                        },
                        applyFormatting: {
                            editorFocus: CKEDITOR.env.ie && !CKEDITOR.env.edge ? !1 : !0, exec: function (a, b) {
                                var c = a.getCommand("copyFormatting"), d = b ? "keystrokeHandler" == b.from : !1, g = CKEDITOR.plugins.copyformatting, f = a.copyFormatting, m = g._getCursorContainer(a), u = CKEDITOR.document.getDocumentElement(); if (d && !f.styles) return g._putScreenReaderMessage(a, "failed"), g._detachPasteKeystrokeHandler(a), !1; d = g._applyFormat(a, f.styles); f.sticky || (f.styles = null, m.removeClass("cke_copyformatting_active"), u.removeClass("cke_copyformatting_disabled"),
                                    u.removeClass("cke_copyformatting_tableresize_cursor"), c.setState(CKEDITOR.TRISTATE_OFF), g._detachPasteKeystrokeHandler(a)); g._putScreenReaderMessage(a, d ? "applied" : "canceled")
                            }
                        }
                    }, _getCursorContainer: function (a) { return a.elementMode === CKEDITOR.ELEMENT_MODE_INLINE ? a.editable() : a.editable().getParent() }, _convertElementToStyleDef: function (a) {
                        var b = CKEDITOR.tools, c = a.getAttributes(CKEDITOR.plugins.copyformatting.excludedAttributes), b = b.parseCssText(a.getAttribute("style"), !0, !0); return {
                            element: a.getName(),
                            type: CKEDITOR.STYLE_INLINE, attributes: c, styles: b
                        }
                    }, _extractStylesFromElement: function (b, c) { var e = {}, d = []; do if (c.type === CKEDITOR.NODE_ELEMENT && !c.hasAttribute("data-cke-bookmark") && (e.element = c, b.copyFormatting.fire("extractFormatting", e, b) && e.styleDef && d.push(new CKEDITOR.style(e.styleDef)), c.getName && -1 !== a(CKEDITOR.plugins.copyformatting.breakOnElements, c.getName()))) break; while ((c = c.getParent()) && c.type === CKEDITOR.NODE_ELEMENT); return d }, _extractStylesFromRange: function (a, b) {
                        for (var c = [], d = new CKEDITOR.dom.walker(b),
                            g; g = d.next();)c = c.concat(CKEDITOR.plugins.copyformatting._extractStylesFromElement(a, g)); return c
                    }, _removeStylesFromElementInRange: function (b, c) { for (var e = -1 !== a(["ol", "ul", "table"], c), d = new CKEDITOR.dom.walker(b), g; g = d.next();)if (g = g.getAscendant(c, !0)) if (g.removeAttributes(g.getAttributes()), e) break }, _getSelectedWordOffset: function (b) {
                        function c(a, b) { return a[b ? "getPrevious" : "getNext"](function (a) { return a.type !== CKEDITOR.NODE_COMMENT }) } function e(a) {
                            return a.type == CKEDITOR.NODE_ELEMENT ? (a = a.getHtml().replace(/<span.*?>&nbsp;<\/span>/g,
                                ""), a.replace(/<.*?>/g, "")) : a.getText()
                        } function d(b, g) {
                            var h = b, f = /\s/g, m = "p br ol ul li td th div caption body".split(" "), n = !1, q = !1, p, u; do { for (p = c(h, g); !p && h.getParent();) { h = h.getParent(); if (-1 !== a(m, h.getName())) { q = n = !0; break } p = c(h, g) } if (p && p.getName && -1 !== a(m, p.getName())) { n = !0; break } h = p } while (h && h.getStyle && ("none" == h.getStyle("display") || !h.getText())); for (h || (h = b); h.type !== CKEDITOR.NODE_TEXT;)h = !n || g || q ? h.getChild(0) : h.getChild(h.getChildCount() - 1); for (m = e(h); null != (q = f.exec(m)) && (u = q.index,
                                g);); if ("number" !== typeof u && !n) return d(h, g); if (n) g ? u = 0 : (f = /([\.\b]*$)/, u = (q = f.exec(m)) ? q.index : m.length); else if (g && (u += 1, u > m.length)) return d(h); return { node: h, offset: u }
                        } var g = /\b\w+\b/ig, f, m, u, r, p; u = r = p = b.startContainer; for (f = e(u); null != (m = g.exec(f));)if (m.index + m[0].length >= b.startOffset) return b = m.index, g = m.index + m[0].length, 0 === m.index && (m = d(u, !0), r = m.node, b = m.offset), g >= f.length && (f = d(u), p = f.node, g = f.offset), { startNode: r, startOffset: b, endNode: p, endOffset: g }; return null
                    }, _filterStyles: function (a) {
                        var b =
                            CKEDITOR.tools.isEmpty, c = [], d, g; for (g = 0; g < a.length; g++)d = a[g]._.definition, -1 !== CKEDITOR.tools.indexOf(CKEDITOR.plugins.copyformatting.inlineBoundary, d.element) && (d.element = a[g].element = "span"), "span" === d.element && b(d.attributes) && b(d.styles) || c.push(a[g]); return c
                    }, _determineContext: function (a) {
                        function b(c) { var d = new CKEDITOR.dom.walker(a), g; if (a.startContainer.getAscendant(c, !0) || a.endContainer.getAscendant(c, !0)) return !0; for (; g = d.next();)if (g.getAscendant(c, !0)) return !0 } return b({ ul: 1, ol: 1 }) ?
                            "list" : b("table") ? "table" : "text"
                    }, _applyStylesToTextContext: function (b, c, e) {
                        var d = CKEDITOR.plugins.copyformatting, g = d.excludedAttributesFromInlineTransform, f, m; CKEDITOR.env.webkit && !CKEDITOR.env.chrome && b.getSelection().selectRanges([c]); for (f = 0; f < e.length; f++)if (c = e[f], -1 === a(d.excludedElementsFromInlineTransform, c.element)) {
                            if (-1 !== a(d.elementsForInlineTransform, c.element)) for (c.element = c._.definition.element = "span", m = 0; m < g.length; m++)c._.definition.attributes[g[m]] && delete c._.definition.attributes[g[m]];
                            c.apply(b)
                        }
                    }, _applyStylesToListContext: function (a, c, e) { var d, g, f; for (f = 0; f < e.length; f++)d = e[f], g = c.createBookmark(), "ol" === d.element || "ul" === d.element ? b(c, { ul: 1, ol: 1 }, function (a) { var b = d; a.getName() !== b.element && a.renameNode(b.element); b.applyToObject(a) }, !0) : "li" === d.element ? b(c, "li", function (a) { d.applyToObject(a) }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(a, c, [d]), c.moveToBookmark(g) }, _applyStylesToTableContext: function (c, d, e) {
                        function f(a, b) {
                            a.getName() !== b.element && (b = b.getDefinition(),
                                b.element = a.getName(), b = new CKEDITOR.style(b)); b.applyToObject(a)
                        } var g, m, q; for (q = 0; q < e.length; q++)g = e[q], m = d.createBookmark(), -1 !== a(["table", "tr"], g.element) ? b(d, g.element, function (a) { g.applyToObject(a) }) : -1 !== a(["td", "th"], g.element) ? b(d, { td: 1, th: 1 }, function (a) { f(a, g) }) : -1 !== a(["thead", "tbody"], g.element) ? b(d, { thead: 1, tbody: 1 }, function (a) { f(a, g) }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(c, d, [g]), d.moveToBookmark(m)
                    }, _applyFormat: function (a, b) {
                        var c = a.getSelection().getRanges()[0],
                        d = CKEDITOR.plugins.copyformatting, g, f; if (!c) return !1; if (c.collapsed) { f = a.getSelection().createBookmarks(); if (!(g = d._getSelectedWordOffset(c))) return; c = a.createRange(); c.setStart(g.startNode, g.startOffset); c.setEnd(g.endNode, g.endOffset); c.select() } b = d._filterStyles(b); if (!a.copyFormatting.fire("applyFormatting", { styles: b, range: c, preventFormatStripping: !1 }, a)) return !1; f && a.getSelection().selectBookmarks(f); return !0
                    }, _putScreenReaderMessage: function (a, b) { var c = this._getScreenReaderContainer(); c && c.setText(a.lang.copyformatting.notification[b]) },
                    _addScreenReaderContainer: function () { if (this._getScreenReaderContainer()) return this._getScreenReaderContainer(); if (!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_screen_reader_only cke_copyformatting_notification"\x3e\x3cdiv aria-live\x3d"polite"\x3e\x3c/div\x3e\x3c/div\x3e')).getChild(0) }, _getScreenReaderContainer: function () { if (!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().findOne(".cke_copyformatting_notification div[aria-live]") },
                    _attachPasteKeystrokeHandler: function (a) { var b = a.config.copyFormatting_keystrokePaste; b && (this._initialKeystrokePasteCommand = a.keystrokeHandler.keystrokes[b], a.setKeystroke(b, "applyFormatting")) }, _detachPasteKeystrokeHandler: function (a) { var b = a.config.copyFormatting_keystrokePaste; b && a.setKeystroke(b, this._initialKeystrokePasteCommand || !1) }
                }; CKEDITOR.config.copyFormatting_outerCursor = !0; CKEDITOR.config.copyFormatting_allowRules = "b s u i em strong span p div td th ol ul li(*)[*]{*}"; CKEDITOR.config.copyFormatting_disallowRules =
                    "*[data-cke-widget*,data-widget*,data-cke-realelement](cke_widget*)"; CKEDITOR.config.copyFormatting_allowedContexts = !0; CKEDITOR.config.copyFormatting_keystrokeCopy = CKEDITOR.CTRL + CKEDITOR.SHIFT + 67; CKEDITOR.config.copyFormatting_keystrokePaste = CKEDITOR.CTRL + CKEDITOR.SHIFT + 86
        })(); CKEDITOR.plugins.add("menu", {
            requires: "floatpanel", beforeInit: function (b) {
                for (var f = b.config.menu_groups.split(","), d = b._.menuGroups = {}, a = b._.menuItems = {}, c = 0; c < f.length; c++)d[f[c]] = c + 1; b.addMenuGroup = function (a, b) {
                    d[a] = b ||
                        100
                }; b.addMenuItem = function (b, c) { d[c.group] && (a[b] = new CKEDITOR.menuItem(this, b, c)) }; b.addMenuItems = function (a) { for (var b in a) this.addMenuItem(b, a[b]) }; b.getMenuItem = function (b) { return a[b] }; b.removeMenuItem = function (b) { delete a[b] }
            }
        }); (function () {
            function b(a) { a.sort(function (a, b) { return a.group < b.group ? -1 : a.group > b.group ? 1 : a.order < b.order ? -1 : a.order > b.order ? 1 : 0 }) } var f = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{attrLabel}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"',
                d = ""; CKEDITOR.env.gecko && CKEDITOR.env.mac && (f += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (f += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"'); CKEDITOR.env.ie && (d = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var f = f + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" onclick\x3d"' + d + 'CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e') +
                    '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e', a = CKEDITOR.addTemplate("menuItem", f), c = CKEDITOR.addTemplate("menuArrow",
                        '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'), m = CKEDITOR.addTemplate("menuShortcut", '\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e'); CKEDITOR.menu = CKEDITOR.tools.createClass({
                            $: function (a, b) {
                                b = this._.definition = b || {}; this.id = CKEDITOR.tools.getNextId(); this.editor = a; this.items = []; this._.listeners = []; this._.level = b.level || 1; var c = CKEDITOR.tools.extend({}, b.panel, {
                                    css: [CKEDITOR.skin.getPath("editor")], level: this._.level -
                                        1, block: {}
                                }), d = c.block.attributes = c.attributes || {}; !d.role && (d.role = "menu"); this._.panelDefinition = c
                            }, _: {
                                onShow: function () { var a = this.editor.getSelection(), b = a && a.getStartElement(), c = this.editor.elementPath(), d = this._.listeners; this.removeAll(); for (var g = 0; g < d.length; g++) { var f = d[g](b, a, c); if (f) for (var m in f) { var u = this.editor.getMenuItem(m); !u || u.command && !this.editor.getCommand(u.command).state || (u.state = f[m], this.add(u)) } } }, onClick: function (a) {
                                    this.hide(); if (a.onClick) a.onClick(); else a.command &&
                                        this.editor.execCommand(a.command)
                                }, onEscape: function (a) { var b = this.parent; b ? b._.panel.hideChild(1) : 27 == a && this.hide(1); return !1 }, onHide: function () { this.onHide && this.onHide() }, showSubMenu: function (a) {
                                    var b = this._.subMenu, c = this.items[a]; if (c = c.getItems && c.getItems()) {
                                        b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, { level: this._.level + 1 }, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this)); for (var d in c) {
                                            var g = this.editor.getMenuItem(d);
                                            g && (g.state = c[d], b.add(g))
                                        } var f = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + String(a)); setTimeout(function () { b.show(f, 2) }, 0)
                                    } else this._.panel.hideChild(1)
                                }
                            }, proto: {
                                add: function (a) { a.order || (a.order = this.items.length); this.items.push(a) }, removeAll: function () { this.items = [] }, show: function (a, c, e, d) {
                                    if (!this.parent && (this._.onShow(), !this.items.length)) return; c = c || ("rtl" == this.editor.lang.dir ? 2 : 1); var g = this.items, f = this.editor, m = this._.panel, u = this._.element; if (!m) {
                                        m = this._.panel =
                                        new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level); m.onEscape = CKEDITOR.tools.bind(function (a) { if (!1 === this._.onEscape(a)) return !1 }, this); m.onShow = function () { m._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all") }; m.onHide = CKEDITOR.tools.bind(function () { this._.onHide && this._.onHide() }, this); u = m.addBlock(this.id, this._.panelDefinition.block); u.autoSize = !0; var r = u.keys; r[40] = "next"; r[9] = "next"; r[38] = "prev"; r[CKEDITOR.SHIFT +
                                            9] = "prev"; r["rtl" == f.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click"; r[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (r[13] = "mouseup"); u = this._.element = u.element; r = u.getDocument(); r.getBody().setStyle("overflow", "hidden"); r.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden"); this._.itemOverFn = CKEDITOR.tools.addFunction(function (a) { clearTimeout(this._.showSubTimeout); this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, f.config.menu_subMenuDelay || 400, this, [a]) },
                                                this); this._.itemOutFn = CKEDITOR.tools.addFunction(function () { clearTimeout(this._.showSubTimeout) }, this); this._.itemClickFn = CKEDITOR.tools.addFunction(function (a) { var b = this.items[a]; if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1); else if (b.getItems) this._.showSubMenu(a); else this._.onClick(b) }, this)
                                    } b(g); for (var r = f.elementPath(), r = ['\x3cdiv class\x3d"cke_menu' + (r && r.direction() != f.lang.dir ? " cke_mixed_dir_content" : "") + '" role\x3d"presentation"\x3e'], p = g.length, v = p && g[0].group, y = 0; y < p; y++) {
                                        var t =
                                            g[y]; v != t.group && (r.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'), v = t.group); t.render(this, y, r)
                                    } r.push("\x3c/div\x3e"); u.setHtml(r.join("")); CKEDITOR.ui.fire("ready", this); this.parent ? this.parent._.panel.showAsChild(m, this.id, a, c, e, d) : m.showBlock(this.id, a, c, e, d); f.fire("menuShow", [m])
                                }, addListener: function (a) { this._.listeners.push(a) }, hide: function (a) { this._.onHide && this._.onHide(); this._.panel && this._.panel.hide(a) }, findItemByCommandName: function (a) {
                                    var b = CKEDITOR.tools.array.filter(this.items,
                                        function (b) { return a === b.command }); return b.length ? (b = b[0], { item: b, element: this._.element.findOne("." + b.className) }) : null
                                }
                            }
                        }); CKEDITOR.menuItem = CKEDITOR.tools.createClass({
                            $: function (a, b, c) { CKEDITOR.tools.extend(this, c, { order: 0, className: "cke_menubutton__" + b }); this.group = a._.menuGroups[this.group]; this.editor = a; this.name = b }, proto: {
                                render: function (b, d, e) {
                                    var f = b.id + String(d), g = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state, n = "", q = this.editor, u, r, p = g == CKEDITOR.TRISTATE_ON ? "on" : g == CKEDITOR.TRISTATE_DISABLED ?
                                        "disabled" : "off"; this.role in { menuitemcheckbox: 1, menuitemradio: 1 } && (n = ' aria-checked\x3d"' + (g == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"'); var v = this.getItems, y = "\x26#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";", t = this.name; this.icon && !/\./.test(this.icon) && (t = this.icon); this.command && (u = q.getCommand(this.command), (u = q.getCommandKeystroke(u)) && (r = CKEDITOR.tools.keystrokeToString(q.lang.common.keyboard, u))); u = CKEDITOR.tools.htmlEncodeAttr(this.label); b = {
                                            id: f, name: this.name, iconName: t, label: this.label,
                                            attrLabel: u, cls: this.className || "", state: p, hasPopup: v ? "true" : "false", disabled: g == CKEDITOR.TRISTATE_DISABLED, title: u + (r ? " (" + r.display + ")" : ""), ariaShortcut: r ? q.lang.common.keyboardShortcut + " " + r.aria : "", href: "javascript:void('" + (u || "").replace("'") + "')", hoverFn: b._.itemOverFn, moveOutFn: b._.itemOutFn, clickFn: b._.itemClickFn, index: d, iconStyle: CKEDITOR.skin.getIconStyle(t, "rtl" == this.editor.lang.dir, t == this.icon ? null : this.icon, this.iconOffset), shortcutHtml: r ? m.output({ shortcut: r.display }) : "", arrowHtml: v ?
                                                c.output({ label: y }) : "", role: this.role ? this.role : "menuitem", ariaChecked: n
                                        }; a.output(b, e)
                                }
                            }
                        })
        })(); CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div"; CKEDITOR.plugins.add("contextmenu", {
            requires: "menu", onLoad: function () {
                CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                    base: CKEDITOR.menu, $: function (b) {
                        this.base.call(this, b, {
                            panel: {
                                css: b.config.contextmenu_contentsCss,
                                className: "cke_menu_panel", attributes: { "aria-label": b.lang.contextmenu.options }
                            }
                        })
                    }, proto: {
                        addTarget: function (b, f) {
                            function d() { c = !1 } var a, c; b.on("contextmenu", function (b) {
                                b = b.data; var d = CKEDITOR.env.webkit ? a : CKEDITOR.env.mac ? b.$.metaKey : b.$.ctrlKey; if (!f || !d) if (b.preventDefault(), !c) {
                                    if (CKEDITOR.env.mac && CKEDITOR.env.webkit) {
                                        var d = this.editor, e = (new CKEDITOR.dom.elementPath(b.getTarget(), d.editable())).contains(function (a) { return a.hasAttribute("contenteditable") }, !0); e && "false" == e.getAttribute("contenteditable") &&
                                            d.getSelection().fake(e)
                                    } var e = b.getTarget().getDocument(), k = b.getTarget().getDocument().getDocumentElement(), d = !e.equals(CKEDITOR.document), e = e.getWindow().getScrollPosition(), g = d ? b.$.clientX : b.$.pageX || e.x + b.$.clientX, m = d ? b.$.clientY : b.$.pageY || e.y + b.$.clientY; CKEDITOR.tools.setTimeout(function () { this.open(k, null, g, m) }, CKEDITOR.env.ie ? 200 : 0, this)
                                }
                            }, this); if (CKEDITOR.env.webkit) {
                                var m = function () { a = 0 }; b.on("keydown", function (b) { a = CKEDITOR.env.mac ? b.data.$.metaKey : b.data.$.ctrlKey }); b.on("keyup", m);
                                b.on("contextmenu", m)
                            } CKEDITOR.env.gecko && !CKEDITOR.env.mac && (b.on("keydown", function (a) { a.data.$.shiftKey && 121 === a.data.$.keyCode && (c = !0) }, null, null, 0), b.on("keyup", d), b.on("contextmenu", d))
                        }, open: function (b, f, d, a) { !1 !== this.editor.config.enableContextMenu && this.editor.getSelection().getType() !== CKEDITOR.SELECTION_NONE && (this.editor.focus(), b = b || CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1), this.show(b, f, d, a)) }
                    }
                })
            }, beforeInit: function (b) {
                var f = b.contextMenu = new CKEDITOR.plugins.contextMenu(b);
                b.on("contentDom", function () { f.addTarget(b.editable(), !1 !== b.config.browserContextMenuOnCtrl) }); b.addCommand("contextMenu", { exec: function (b) { var a = 0, c = 0, f = b.getSelection().getRanges(), f = f[f.length - 1].getClientRects(b.editable().isInline()); if (f = f[f.length - 1]) a = f["rtl" === b.lang.dir ? "left" : "right"], c = f.bottom; b.contextMenu.open(b.document.getBody().getParent(), null, a, c) } }); b.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu"); b.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
            }
        }); (function () {
            function b(a) {
                var b =
                    this.att; a = a && a.hasAttribute(b) && a.getAttribute(b) || ""; void 0 !== a && this.setValue(a)
            } function f() { for (var a, b = 0; b < arguments.length; b++)if (arguments[b] instanceof CKEDITOR.dom.element) { a = arguments[b]; break } if (a) { var b = this.att, d = this.getValue(); d ? a.setAttribute(b, d) : a.removeAttribute(b, d) } } var d = { id: 1, dir: 1, classes: 1, styles: 1 }; CKEDITOR.plugins.add("dialogadvtab", {
                requires: "dialog", allowedContent: function (a) {
                    a || (a = d); var b = []; a.id && b.push("id"); a.dir && b.push("dir"); var f = ""; b.length && (f += "[" + b.join(",") +
                        "]"); a.classes && (f += "(*)"); a.styles && (f += "{*}"); return f
                }, createAdvancedTab: function (a, c, m) {
                    c || (c = d); var h = a.lang.common, l = { id: "advanced", label: h.advancedTab, title: h.advancedTab, elements: [{ type: "vbox", padding: 1, children: [] }] }, e = []; if (c.id || c.dir) c.id && e.push({ id: "advId", att: "id", type: "text", requiredContent: m ? m + "[id]" : null, label: h.id, setup: b, commit: f }), c.dir && e.push({
                        id: "advLangDir", att: "dir", type: "select", requiredContent: m ? m + "[dir]" : null, label: h.langDir, "default": "", style: "width:100%", items: [[h.notSet,
                            ""], [h.langDirLTR, "ltr"], [h.langDirRTL, "rtl"]], setup: b, commit: f
                    }), l.elements[0].children.push({ type: "hbox", widths: ["50%", "50%"], children: [].concat(e) }); if (c.styles || c.classes) e = [], c.styles && e.push({
                        id: "advStyles", att: "style", type: "text", requiredContent: m ? m + "{cke-xyz}" : null, label: h.styles, "default": "", validate: CKEDITOR.dialog.validate.inlineStyle(h.invalidInlineStyle), onChange: function () { }, getStyle: function (a, b) {
                            var c = this.getValue().match(new RegExp("(?:^|;)\\s*" + a + "\\s*:\\s*([^;]*)", "i")); return c ?
                                c[1] : b
                        }, updateStyle: function (b, c) { var e = this.getValue(), d = a.document.createElement("span"); d.setAttribute("style", e); d.setStyle(b, c); e = CKEDITOR.tools.normalizeCssText(d.getAttribute("style")); this.setValue(e, 1) }, setup: b, commit: f
                    }), c.classes && e.push({ type: "hbox", widths: ["45%", "55%"], children: [{ id: "advCSSClasses", att: "class", type: "text", requiredContent: m ? m + "(cke-xyz)" : null, label: h.cssClasses, "default": "", setup: b, commit: f }] }), l.elements[0].children.push({ type: "hbox", widths: ["50%", "50%"], children: [].concat(e) });
                    return l
                }
            })
        })(); (function () {
            CKEDITOR.plugins.add("div", {
                requires: "dialog", init: function (b) {
                    if (!b.blockless) {
                        var f = b.lang.div, d = "div(*)"; CKEDITOR.dialog.isTabEnabled(b, "editdiv", "advanced") && (d += ";div[dir,id,lang,title]{*}"); b.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", {
                            allowedContent: d, requiredContent: "div", contextSensitive: !0, contentTransformations: [["div: alignmentToStyle"]], refresh: function (a, b) {
                                this.setState("div" in (a.config.div_wrapTable ? b.root : b.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF :
                                    CKEDITOR.TRISTATE_DISABLED)
                            }
                        })); b.addCommand("editdiv", new CKEDITOR.dialogCommand("editdiv", { requiredContent: "div" })); b.addCommand("removediv", {
                            requiredContent: "div", exec: function (a) {
                                function b(c) { (c = CKEDITOR.plugins.div.getSurroundDiv(a, c)) && !c.data("cke-div-added") && (k.push(c), c.data("cke-div-added")) } for (var d = a.getSelection(), h = d && d.getRanges(), f, e = d.createBookmarks(), k = [], g = 0; g < h.length; g++)f = h[g], f.collapsed ? b(d.getStartElement()) : (f = new CKEDITOR.dom.walker(f), f.evaluator = b, f.lastForward());
                                for (g = 0; g < k.length; g++)k[g].remove(!0); d.selectBookmarks(e)
                            }
                        }); b.ui.addButton && b.ui.addButton("CreateDiv", { label: f.toolbar, command: "creatediv", toolbar: "blocks,50" }); b.addMenuItems && (b.addMenuItems({ editdiv: { label: f.edit, command: "editdiv", group: "div", order: 1 }, removediv: { label: f.remove, command: "removediv", group: "div", order: 5 } }), b.contextMenu && b.contextMenu.addListener(function (a) {
                            return !a || a.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(b) ? { editdiv: CKEDITOR.TRISTATE_OFF, removediv: CKEDITOR.TRISTATE_OFF } :
                                null
                        })); CKEDITOR.dialog.add("creatediv", this.path + "dialogs/div.js"); CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js")
                    }
                }
            }); CKEDITOR.plugins.div = { getSurroundDiv: function (b, f) { var d = b.elementPath(f); return b.elementPath(d.blockLimit).contains(function (a) { return a.is("div") && !a.isReadOnly() }, 1) } }
        })(); (function () {
            function b(a, b) { CKEDITOR.tools.array.forEach(b, function (b) { a.on(b, f, null, { editor: a }) }) } function f(a) {
                var b = a.listenerData.editor; a = b.focusManager.hasFocus; var f = b.editable(), h = b.config.editorplaceholder,
                    l = /<body.*?>((?:.|[\n\r])*?)<\/body>/i, e = b.config.fullPage, b = b.getData(); e && (l = b.match(l)) && 1 < l.length && (b = l[1]); if (0 !== b.length || a) return f.removeAttribute(d); f.setAttribute(d, h)
            } CKEDITOR.plugins.add("editorplaceholder", { isSupportedEnvironment: function () { return !CKEDITOR.env.ie || 9 <= CKEDITOR.env.version }, onLoad: function () { CKEDITOR.addCss(CKEDITOR.plugins.editorplaceholder.styles) }, init: function (a) { this.isSupportedEnvironment() && a.config.editorplaceholder && b(a, ["contentDom", "focus", "blur", "change"]) } });
            var d = "data-cke-editorplaceholder"; CKEDITOR.plugins.editorplaceholder = { styles: "[" + d + "]::before {position: absolute;opacity: .8;color: #aaa;content: attr( " + d + " );}.cke_wysiwyg_div[" + d + "]::before {margin-top: 1em;}" }; CKEDITOR.config.editorplaceholder = ""
        })(); (function () {
            function b(b, d) {
                function h(a) {
                    a = g.list[a]; var e; a.equals(b.editable()) || "true" == a.getAttribute("contenteditable") ? (e = b.createRange(), e.selectNodeContents(a), e = e.select()) : (e = b.getSelection(), e.selectElement(a)); CKEDITOR.env.ie && b.fire("selectionChange",
                        { selection: e, path: new CKEDITOR.dom.elementPath(a) }); b.focus()
                } function l() { k && k.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); delete g.list } var e = b.ui.spaceId("path"), k, g = b._.elementsPath, n = g.idBase; d.html += '\x3cspan id\x3d"' + e + '_label" class\x3d"cke_voice_label"\x3e' + b.lang.elementspath.eleLabel + '\x3c/span\x3e\x3cspan id\x3d"' + e + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' + e + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e';
                b.on("uiReady", function () { var a = b.ui.space("path"); a && b.focusManager.add(a, 1) }); g.onClick = h; var q = CKEDITOR.tools.addFunction(h), u = CKEDITOR.tools.addFunction(function (a, e) {
                    var d = g.idBase, f; e = new CKEDITOR.dom.event(e); f = "rtl" == b.lang.dir; switch (e.getKeystroke()) {
                        case f ? 39 : 37: case 9: return (f = CKEDITOR.document.getById(d + (a + 1))) || (f = CKEDITOR.document.getById(d + "0")), f.focus(), !1; case f ? 37 : 39: case CKEDITOR.SHIFT + 9: return (f = CKEDITOR.document.getById(d + (a - 1))) || (f = CKEDITOR.document.getById(d + (g.list.length -
                            1))), f.focus(), !1; case 27: return b.focus(), !1; case 13: case 32: return h(a), !1
                    }return !0
                }); b.on("selectionChange", function (d) {
                    for (var f = [], h = g.list = [], m = [], l = g.filters, B = !0, w = d.data.path.elements, z = w.length; z--;) {
                        var A = w[z], C = 0; d = A.data("cke-display-name") ? A.data("cke-display-name") : A.data("cke-real-element-type") ? A.data("cke-real-element-type") : A.getName(); (B = A.hasAttribute("contenteditable") ? "true" == A.getAttribute("contenteditable") : B) || A.hasAttribute("contenteditable") || (C = 1); for (var D = 0; D < l.length; D++) {
                            var F =
                                l[D](A, d); if (!1 === F) { C = 1; break } d = F || d
                        } C || (h.unshift(A), m.unshift(d))
                    } h = h.length; for (l = 0; l < h; l++)d = m[l], B = b.lang.elementspath.eleTitle.replace(/%1/, d), d = a.output({ id: n + l, label: B, text: d, jsTitle: "javascript:void('" + d + "')", index: l, keyDownFn: u, clickFn: q }), f.unshift(d); k || (k = CKEDITOR.document.getById(e)); m = k; m.setHtml(f.join("") + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); b.fire("elementsPathUpdate", { space: m })
                }); b.on("readOnly", l); b.on("contentDomUnload", l); b.addCommand("elementsPathFocus",
                    f.toolbarFocus); b.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
            } var f = { toolbarFocus: { editorFocus: !1, readOnly: 1, exec: function (a) { (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air) } } }, d = ""; CKEDITOR.env.gecko && CKEDITOR.env.mac && (d += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (d += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var a = CKEDITOR.addTemplate("pathItem", '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' +
                d + ' hidefocus\x3d"true"  draggable\x3d"false"  ondragstart\x3d"return false;" onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e'); CKEDITOR.plugins.add("elementspath", { init: function (a) { a._.elementsPath = { idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_", filters: [] }; a.on("uiSpace", function (d) { "bottom" == d.data.space && b(a, d.data) }) } })
        })();
        (function () {
            function b(a, b, c) { c = a.config.forceEnterMode || c; if ("wysiwyg" == a.mode) { b || (b = a.activeEnterMode); var e = a.elementPath(); e && !e.isContextFor("p") && (b = CKEDITOR.ENTER_BR, c = 1); a.fire("saveSnapshot"); b == CKEDITOR.ENTER_BR ? h(a, b, null, c) : l(a, b, null, c); a.fire("saveSnapshot") } } function f(a) { a = a.getSelection().getRanges(!0); for (var b = a.length - 1; 0 < b; b--)a[b].deleteContents(); return a[0] } function d(a) {
                var b = a.startContainer.getAscendant(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable") },
                    !0); if (a.root.equals(b)) return a; b = new CKEDITOR.dom.range(b); b.moveToRange(a); return b
            } CKEDITOR.plugins.add("enterkey", { init: function (a) { a.addCommand("enter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (a) { b(a) } }); a.addCommand("shiftEnter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (a) { b(a, a.activeShiftEnterMode, 1) } }); a.setKeystroke([[13, "enter"], [CKEDITOR.SHIFT + 13, "shiftEnter"]]) } }); var a = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(), m, h, l, e; CKEDITOR.plugins.enterkey =
            {
                enterBlock: function (b, g, m, l) {
                    function u(a) { var b; if (a === CKEDITOR.ENTER_BR || -1 === CKEDITOR.tools.indexOf(["td", "th"], y.lastElement.getName()) || 1 !== y.lastElement.getChildCount()) return !1; a = y.lastElement.getChild(0).clone(!0); (b = a.getBogus()) && b.remove(); return a.getText().length ? !1 : !0 } if (m = m || f(b)) {
                        m = d(m); var r = m.document, p = m.checkStartOfBlock(), v = m.checkEndOfBlock(), y = b.elementPath(m.startContainer), t = y.block, B = g == CKEDITOR.ENTER_DIV ? "div" : "p", w; if (t && p && v) {
                            p = t.getParent(); if (p.is("li") && 1 < p.getChildCount()) {
                                r =
                                new CKEDITOR.dom.element("li"); w = b.createRange(); r.insertAfter(p); t.remove(); w.setStart(r, 0); b.getSelection().selectRanges([w]); return
                            } if (t.is("li") || t.getParent().is("li")) {
                                t.is("li") || (t = t.getParent(), p = t.getParent()); w = p.getParent(); m = !t.hasPrevious(); var z = !t.hasNext(); l = b.getSelection(); var B = l.createBookmarks(), A = t.getDirection(1), v = t.getAttribute("class"), C = t.getAttribute("style"), D = w.getDirection(1) != A; b = b.enterMode != CKEDITOR.ENTER_BR || D || C || v; if (w.is("li")) m || z ? (m && z && p.remove(), t[z ? "insertAfter" :
                                    "insertBefore"](w)) : t.breakParent(w); else { if (b) if (y.block.is("li") ? (w = r.createElement(g == CKEDITOR.ENTER_P ? "p" : "div"), D && w.setAttribute("dir", A), C && w.setAttribute("style", C), v && w.setAttribute("class", v), t.moveChildren(w)) : w = y.block, m || z) w[m ? "insertBefore" : "insertAfter"](p); else t.breakParent(p), w.insertAfter(p); else if (t.appendBogus(!0), m || z) for (; r = t[m ? "getFirst" : "getLast"]();)r[m ? "insertBefore" : "insertAfter"](p); else for (t.breakParent(p); r = t.getLast();)r.insertAfter(p); t.remove() } l.selectBookmarks(B);
                                return
                            } if (t && t.getParent().is("blockquote")) { t.breakParent(t.getParent()); t.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || t.getPrevious().remove(); t.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || t.getNext().remove(); m.moveToElementEditStart(t); m.select(); return }
                        } else if (t && t.is("pre") && !v) { h(b, g, m, l); return } if (C = m.splitBlock(B)) {
                            b = C.previousBlock; t = C.nextBlock; p = C.wasStartOfBlock; v = C.wasEndOfBlock; t ? (z = t.getParent(), z.is("li") && (t.breakParent(z), t.move(t.getNext(), 1))) : b && (z = b.getParent()) &&
                                z.is("li") && (b.breakParent(z), z = b.getNext(), m.moveToElementEditStart(z), b.move(b.getPrevious())); if (p || v) if (u(g)) m.moveToElementEditStart(m.getTouchedStartNode()); else {
                                    if (b) { if (b.is("li") || !e.test(b.getName()) && !b.is("pre")) w = b.clone() } else t && (w = t.clone()); w ? l && !w.is("li") && w.renameNode(B) : z && z.is("li") ? w = z : (w = r.createElement(B), b && (A = b.getDirection()) && w.setAttribute("dir", A)); if (r = C.elementPath) for (g = 0, l = r.elements.length; g < l; g++) {
                                        B = r.elements[g]; if (B.equals(r.block) || B.equals(r.blockLimit)) break;
                                        CKEDITOR.dtd.$removeEmpty[B.getName()] && (B = B.clone(), w.moveChildren(B), w.append(B))
                                    } w.appendBogus(); w.getParent() || m.insertNode(w); w.is("li") && w.removeAttribute("value"); !CKEDITOR.env.ie || !p || v && b.getChildCount() || (m.moveToElementEditStart(v ? b : w), m.select()); m.moveToElementEditStart(p && !v ? t : w)
                                } else t.is("li") && (w = m.clone(), w.selectNodeContents(t), w = new CKEDITOR.dom.walker(w), w.evaluator = function (b) {
                                    return !(c(b) || a(b) || b.type == CKEDITOR.NODE_ELEMENT && b.getName() in CKEDITOR.dtd.$inline && !(b.getName() in
                                        CKEDITOR.dtd.$empty))
                                }, (z = w.next()) && z.type == CKEDITOR.NODE_ELEMENT && z.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? r.createElement("br") : r.createText(" ")).insertBefore(z)), t && m.moveToElementEditStart(t); m.select(); m.scrollIntoView()
                        }
                    }
                }, enterBr: function (a, b, c, d) {
                    if (c = c || f(a)) {
                        var h = c.document, m = c.checkEndOfBlock(), p = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()), v = p.block, y = v && p.block.getName(); d || "li" != y ? (!d && m && e.test(y) ? (m = v.getDirection()) ? (h = h.createElement("div"), h.setAttribute("dir",
                            m), h.insertAfter(v), c.setStart(h, 0)) : (h.createElement("br").insertAfter(v), CKEDITOR.env.gecko && h.createText("").insertAfter(v), c.setStartAt(v.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (a = "pre" == y && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? h.createText("\r") : h.createElement("br"), c.deleteContents(), c.insertNode(a), CKEDITOR.env.needsBrFiller ? (h.createText("﻿").insertAfter(a), m && (v || p.blockLimit).appendBogus(), a.getNext().$.nodeValue = "", c.setStartAt(a.getNext(),
                                CKEDITOR.POSITION_AFTER_START)) : c.setStartAt(a, CKEDITOR.POSITION_AFTER_END)), c.collapse(!0), c.select(), c.scrollIntoView()) : l(a, b, c, d)
                    }
                }
            }; m = CKEDITOR.plugins.enterkey; h = m.enterBr; l = m.enterBlock; e = /^h[1-6]$/
        })(); (function () {
            function b(b, d) {
                var a = {}, c = [], m = { nbsp: " ", shy: "­", gt: "\x3e", lt: "\x3c", amp: "\x26", apos: "'", quot: '"' }; b = b.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (b, e) { var h = d ? "\x26" + e + ";" : m[e]; a[h] = d ? m[e] : "\x26" + e + ";"; c.push(h); return "" }); b = b.replace(/,$/, ""); if (!d && b) {
                    b = b.split(",");
                    var h = document.createElement("div"), l; h.innerHTML = "\x26" + b.join(";\x26") + ";"; l = h.innerHTML; h = null; for (h = 0; h < l.length; h++) { var e = l.charAt(h); a[e] = "\x26" + b[h] + ";"; c.push(e) }
                } a.regex = c.join(d ? "|" : ""); return a
            } CKEDITOR.plugins.add("entities", {
                afterInit: function (f) {
                    function d(a) { return e[a] } function a(a) { return "force" != c.entities_processNumerical && h[a] ? h[a] : "\x26#" + a.charCodeAt(0) + ";" } var c = f.config; if (f = (f = f.dataProcessor) && f.htmlFilter) {
                        var m = []; !1 !== c.basicEntities && m.push("nbsp,gt,lt,amp"); c.entities &&
                            (m.length && m.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
                                c.entities_latin && m.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), c.entities_greek && m.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
                                c.entities_additional && m.push(c.entities_additional)); var h = b(m.join(",")), l = h.regex ? "[" + h.regex + "]" : "a^"; delete h.regex; c.entities && c.entities_processNumerical && (l = "[^ -~]|" + l); var l = new RegExp(l, "g"), e = b("nbsp,gt,lt,amp,shy", !0), k = new RegExp(e.regex, "g"); f.addRules({ text: function (b) { return b.replace(k, d).replace(l, a) } }, { applyToAll: !0, excludeNestedEditable: !0 })
                    }
                }
            })
        })(); CKEDITOR.config.basicEntities = !0; CKEDITOR.config.entities = !0; CKEDITOR.config.entities_latin = !0; CKEDITOR.config.entities_greek = !0;
        CKEDITOR.config.entities_additional = "#39"; var la = 'src;getData;object;downloadFile;open;attributes;exportpdf-no-token;URL;exportpdf-stylesheets-inaccessible;apply;GET;styleSheets;lang;editable;exports;success;warn;fragment;addEventListener;destroy;responseType;create;fire;commands;setInterval;hasOwnProperty;\x3c/div\x3e;navigator;array;writeHtml;enable;map;processingDocument;send;message;forEach;token;exportPdf_appId;NODE_ELEMENT;msSaveBlob;init;application/json;refreshInterval;htmlParser;plugins;env;error;blob;isInline;srcElement;revokeObjectURL;html;showNotification;Authorization;bind;prototype;notification;href;function;addCommand;exportPdf_fileName;createElement;clearInterval;exportPdf_stylesheets;document,30;undefined;defineProperty;POST;application/octet-stream;exportPdf_tokenUrl;hide;exportPdfTokenInterval;img;ckeditor4-export-pdf.pdf;getDirection;__esModule;length;cssRules;cssText;x-cs-app-id;toolbar;exportpdf;warning;setRequestHeader;progress;status;fetchToken;fromHtml;tools;default;version;call;responseText;\x3cdiv class\x3d"cke_editable cke_contents_;once;config;Content-type;ExportPdf;exportPdf_options;add;toStringTag;200;buildStyleHtml;getAttribute;document;stringify;data;exportPdf;update;remove;loadend;basicWriter'.split(";");
        (function (b, f) { for (var d = ++f; --d;)b.push(b.shift()) })(la, 356); var x = function (b, f) { return la[b - 0] }; (function (b) {
            function f(a) { if (d[a]) return d[a][x("0x6a")]; var c = d[a] = { i: a, l: !1, exports: {} }; b[a][x("0x47")](c[x("0x6a")], c, c[x("0x6a")], f); c.l = !0; return c[x("0x6a")] } var d = {}; f.m = b; f.c = d; f.d = function (a, b, d) { if (!f.o(a, b)) Object[x("0x2e")](a, b, { enumerable: !0, get: d }) }; f.r = function (a) {
                if (typeof Symbol !== x("0x2d") && Symbol[x("0x50")]) Object[x("0x2e")](a, Symbol[x("0x50")], { value: "Module" }); Object[x("0x2e")](a,
                    x("0x37"), { value: !0 })
            }; f.t = function (a, b) { b & 1 && (a = f(a)); if (b & 8 || b & 4 && typeof a === x("0x5e") && a && a.__esModule) return a; var d = Object[x("0x1")](null); f.r(d); Object.defineProperty(d, x("0x45"), { enumerable: !0, value: a }); if (b & 2 && "string" != typeof a) for (var h in a) f.d(d, h, function (b) { return a[b] }[x("0x22")](null, h)); return d }; f.n = function (a) { var b = a && a[x("0x37")] ? function () { return a["default"] } : function () { return a }; f.d(b, "a", b); return b }; f.o = function (a, b) { return Object[x("0x23")][x("0x5")][x("0x47")](a, b) }; f.p =
                ""; return f(f.s = 0)
        })([function (b, f, d) { b.exports = d(1) }, function (b, f) {
            (function () {
                CKEDITOR[x("0x18")][x("0x4f")]("exportpdf", {
                    lang: "en", icons: x("0x3d"), hidpi: !0, isSupportedEnvironment: function () { return !CKEDITOR[x("0x19")].ie || 10 < CKEDITOR[x("0x19")][x("0x46")] }, beforeInit: function (b) { var a = b.config[x("0x31")], c = this.createTokenFetcher(b, a); c[x("0x14")](); b.on(x("0x57"), function (a) { a.data[x("0x10")] = c[x("0x10")] }, null, null, 16) }, init: function (b) {
                        function a() {
                            return b.plugins[x("0x24")] ? b[x("0x20")][x("0x65")](b,
                                arguments) : { update: function () { }, hide: function () { } }
                        } function c(a) { if (!b[x("0x4b")][x("0x2b")][x("0x38")] && !b[x("0x69")]()[x("0x1c")]()) { var c = []; a = a.$[x("0x67")]; try { CKEDITOR[x("0x44")][x("0x8")][x("0xf")](a, function (a) { CKEDITOR[x("0x44")][x("0x8")][x("0xf")](a[x("0x39")], function (a) { c.push(a[x("0x3a")]) }) }) } catch (e) { CKEDITOR[x("0x6c")](x("0x64"), { error: e[x("0xe")] }) } return c.join("") } } function f(a) {
                            var b = new (CKEDITOR.htmlParser[x("0x5b")]); a = CKEDITOR[x("0x17")][x("0x6d")][x("0x43")](a); a[x("0xf")](function (a) {
                                a.name ===
                                x("0x34") && (a[x("0x61")][x("0x5c")] = k(a.attributes[x("0x5c")]))
                            }, CKEDITOR[x("0x12")], !1); a[x("0x9")](b); return b.getHtml()
                        } function h(a, c) {
                            a[x("0x6e")](x("0x40"), function () { c[x("0x58")]({ progress: .8 }) }); a[x("0x6e")](x("0x5a"), function () {
                                a[x("0x41")] == x("0x51") ? (CKEDITOR[x("0x18")][x("0x3d")][x("0x5f")](l(), a.response), c.update({ message: b.lang[x("0x3d")].documentReady, type: x("0x6b"), duration: 3E3, progress: 1 })) : (e(a.response), c[x("0x32")](), b[x("0x20")](b[x("0x68")][x("0x3d")][x("0x1a")], x("0x3e")));
                                b[x("0x3")].exportPdf[x("0xa")]()
                            })
                        } function l() { var a = b[x("0x4b")][x("0x28")]; return typeof a === x("0x26") ? a() : a } function e(a) { if (a) { var b = new FileReader; b[x("0x6e")]("loadend", function (a) { a = JSON.parse(a[x("0x1d")].result); console[x("0x1a")](a) }); b.readAsText(a) } } function k(a) { var c = b[x("0x54")][x("0x29")]("a"); c.$.href = a; return c.$[x("0x25")] } this.isSupportedEnvironment() && (b[x("0x27")](x("0x57"), {
                            exec: function (e) {
                                var l = a(e[x("0x68")].exportpdf[x("0xc")], "progress", 0), q = {
                                    html: e[x("0x5d")](), css: c(e.document),
                                    options: e[x("0x4b")].exportPdf_options
                                }; this.disable(); e[x("0x4a")](x("0x57"), function (a) { l.update({ progress: .2 }); a[x("0x56")][x("0x1f")] = f(a[x("0x56")][x("0x1f")]); var c = a[x("0x56")], h = x("0x1f"); a = a[x("0x56")][x("0x1f")]; var q = e[x("0x69")]()[x("0x36")](!0); a = (b[x("0x4b")][x("0x2b")][x("0x38")] ? CKEDITOR[x("0x44")][x("0x52")](CKEDITOR[x("0x44")][x("0x8")][x("0xb")](b[x("0x4b")][x("0x2b")], k)) : "") + x("0x49") + q + '"\x3e' + a + x("0x6"); c[h] = a }, null, null, 15); e[x("0x4a")](x("0x57"), function (a) {
                                    var c = a[x("0x56")][x("0x10")];
                                    delete a[x("0x56")][x("0x10")]; var f = e[x("0x4b")].exportPdf_service; a = JSON[x("0x55")](a[x("0x56")]); var k = new XMLHttpRequest, m = b[x("0x4b")][x("0x11")] || "cke4"; k[x("0x60")](x("0x2f"), f); k[x("0x3f")](x("0x4c"), x("0x15")); k[x("0x3f")](x("0x3b"), m); if (c) k.setRequestHeader(x("0x21"), c); else CKEDITOR[x("0x6c")](x("0x62")); k[x("0x0")] = x("0x1b"); k[x("0xd")](a); l[x("0x58")]({ progress: .5 }); h(k, l)
                                }, null, null, 20); e[x("0x2")](x("0x57"), q)
                            }, modes: { wysiwyg: 1 }, readOnly: 1, canUndo: !1
                        }), b.ui.addButton && b.ui.addButton(x("0x4d"),
                            { label: b[x("0x68")][x("0x3d")][x("0x3c")], command: x("0x57"), toolbar: x("0x2c") }))
                    }, createTokenFetcher: function (b, a) {
                        var c = { refreshInterval: b[x("0x33")] || 36E5, fetchToken: function () { var b = new XMLHttpRequest; b.open(x("0x66"), a); b[x("0x6e")](x("0x5a"), function () { b[x("0x48")] && (c[x("0x10")] = b[x("0x48")]) }); b[x("0xd")]() }, init: function () { if (a) { this[x("0x42")](); var c = window[x("0x4")](this.fetchToken, this[x("0x16")]); b[x("0x4a")](x("0x6f"), function () { window[x("0x2a")](c) }) } else CKEDITOR[x("0x6c")]("exportpdf-no-token-url") } };
                        return c
                    }
                }); CKEDITOR[x("0x18")].exportpdf = { downloadFile: function (b, a) { if (CKEDITOR[x("0x19")].ie) { var c = new Blob([a], { type: x("0x30") }); window[x("0x7")][x("0x13")](c, b) } else c = CKEDITOR[x("0x54")][x("0x29")]("a", { attributes: { href: window[x("0x63")].createObjectURL(a), download: b } }), c.$.click(), c[x("0x59")](), window[x("0x63")][x("0x1e")](c[x("0x53")](x("0x25"))) } }
            })(); CKEDITOR[x("0x4b")].exportPdf_service = "https://pdf-converter.cke-cs.com/v1/convert"; CKEDITOR[x("0x4b")][x("0x31")] = ""; CKEDITOR[x("0x4b")][x("0x28")] =
                x("0x35"); CKEDITOR[x("0x4b")][x("0x2b")] = []; CKEDITOR.config[x("0x4e")] = {}
        }]); CKEDITOR.plugins.add("popup"); CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            popup: function (b, f, d, a) {
                f = f || "80%"; d = d || "70%"; "string" == typeof f && 1 < f.length && "%" == f.substr(f.length - 1, 1) && (f = parseInt(window.screen.width * parseInt(f, 10) / 100, 10)); "string" == typeof d && 1 < d.length && "%" == d.substr(d.length - 1, 1) && (d = parseInt(window.screen.height * parseInt(d, 10) / 100, 10)); 640 > f && (f = 640); 420 > d && (d = 420); var c = parseInt((window.screen.height -
                    d) / 2, 10), m = parseInt((window.screen.width - f) / 2, 10); a = (a || "location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes") + ",width\x3d" + f + ",height\x3d" + d + ",top\x3d" + c + ",left\x3d" + m; var h = window.open("", null, a, !0); if (!h) return !1; try { -1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (h.moveTo(m, c), h.resizeTo(f, d)), h.focus(), h.location.href = b } catch (l) { window.open(b, null, a, !0) } return !0
            }
        }); "use strict"; (function () {
            function b(a) {
                this.editor =
                a; this.loaders = []
            } function f(a, b, h) { var f = a.config.fileTools_defaultFileName; this.editor = a; this.lang = a.lang; "string" === typeof b ? (this.data = b, this.file = d(this.data), this.loaded = this.total = this.file.size) : (this.data = null, this.file = b, this.total = this.file.size, this.loaded = 0); h ? this.fileName = h : this.file.name ? this.fileName = this.file.name : (a = this.file.type.split("/"), f && (a[0] = f), this.fileName = a.join(".")); this.uploaded = 0; this.responseData = this.uploadTotal = null; this.status = "created"; this.abort = function () { this.changeStatus("abort") } }
            function d(b) { var d = b.match(a)[1]; b = b.replace(a, ""); b = atob(b); var h = [], f, e, k, g; for (f = 0; f < b.length; f += 512) { e = b.slice(f, f + 512); k = Array(e.length); for (g = 0; g < e.length; g++)k[g] = e.charCodeAt(g); e = new Uint8Array(k); h.push(e) } return new Blob(h, { type: d }) } CKEDITOR.plugins.add("filetools", {
                beforeInit: function (a) {
                    a.uploadRepository = new b(a); a.on("fileUploadRequest", function (a) { var b = a.data.fileLoader; b.xhr.open("POST", b.uploadUrl, !0); a.data.requestData.upload = { file: b.file, name: b.fileName } }, null, null, 5); a.on("fileUploadRequest",
                        function (b) { var d = b.data.fileLoader, f = new FormData; b = b.data.requestData; var e = a.config.fileTools_requestHeaders, k, g; for (g in b) { var n = b[g]; "object" === typeof n && n.file ? f.append(g, n.file, n.name) : f.append(g, n) } f.append("ckCsrfToken", CKEDITOR.tools.getCsrfToken()); if (e) for (k in e) d.xhr.setRequestHeader(k, e[k]); d.xhr.send(f) }, null, null, 999); a.on("fileUploadResponse", function (a) {
                            var b = a.data.fileLoader, c = b.xhr, e = a.data; try {
                                var d = JSON.parse(c.responseText); d.error && d.error.message && (e.message = d.error.message);
                                if (d.uploaded) for (var g in d) e[g] = d[g]; else a.cancel()
                            } catch (f) { e.message = b.lang.filetools.responseError, CKEDITOR.warn("filetools-response-error", { responseText: c.responseText }), a.cancel() }
                        }, null, null, 999)
                }
            }); b.prototype = { create: function (a, b, d) { d = d || f; var l = this.loaders.length; a = new d(this.editor, a, b); a.id = l; this.loaders[l] = a; this.fire("instanceCreated", a); return a }, isFinished: function () { for (var a = 0; a < this.loaders.length; ++a)if (!this.loaders[a].isFinished()) return !1; return !0 } }; f.prototype = {
                loadAndUpload: function (a,
                    b) { var d = this; this.once("loaded", function (f) { f.cancel(); d.once("update", function (a) { a.cancel() }, null, null, 0); d.upload(a, b) }, null, null, 0); this.load() }, load: function () {
                        var a = this, b = this.reader = new FileReader; a.changeStatus("loading"); this.abort = function () { a.reader.abort() }; b.onabort = function () { a.changeStatus("abort") }; b.onerror = function () { a.message = a.lang.filetools.loadError; a.changeStatus("error") }; b.onprogress = function (b) { a.loaded = b.loaded; a.update() }; b.onload = function () {
                            a.loaded = a.total; a.data = b.result;
                            a.changeStatus("loaded")
                        }; b.readAsDataURL(this.file)
                    }, upload: function (a, b) { var d = b || {}; a ? (this.uploadUrl = a, this.xhr = new XMLHttpRequest, this.attachRequestListeners(), this.editor.fire("fileUploadRequest", { fileLoader: this, requestData: d }) && this.changeStatus("uploading")) : (this.message = this.lang.filetools.noUrlError, this.changeStatus("error")) }, attachRequestListeners: function () {
                        function a() { "error" != d.status && (d.message = d.lang.filetools.networkError, d.changeStatus("error")) } function b() {
                            "abort" != d.status &&
                            d.changeStatus("abort")
                        } var d = this, f = this.xhr; d.abort = function () { f.abort(); b() }; f.onerror = a; f.onabort = b; f.upload ? (f.upload.onprogress = function (a) { a.lengthComputable && (d.uploadTotal || (d.uploadTotal = a.total), d.uploaded = a.loaded, d.update()) }, f.upload.onerror = a, f.upload.onabort = b) : (d.uploadTotal = d.total, d.update()); f.onload = function () {
                            d.update(); if ("abort" != d.status) if (d.uploaded = d.uploadTotal, 200 > f.status || 299 < f.status) d.message = d.lang.filetools["httpError" + f.status], d.message || (d.message = d.lang.filetools.httpError.replace("%1",
                                f.status)), d.changeStatus("error"); else { for (var a = { fileLoader: d }, b = ["message", "fileName", "url"], c = d.editor.fire("fileUploadResponse", a), m = 0; m < b.length; m++) { var q = b[m]; "string" === typeof a[q] && (d[q] = a[q]) } d.responseData = a; delete d.responseData.fileLoader; !1 === c ? d.changeStatus("error") : d.changeStatus("uploaded") }
                        }
                    }, changeStatus: function (a) { this.status = a; if ("error" == a || "abort" == a || "loaded" == a || "uploaded" == a) this.abort = function () { }; this.fire(a); this.update() }, update: function () { this.fire("update") }, isFinished: function () { return !!this.status.match(/^(?:loaded|uploaded|error|abort)$/) }
            };
            CKEDITOR.event.implementOn(b.prototype); CKEDITOR.event.implementOn(f.prototype); var a = /^data:(\S*?);base64,/; CKEDITOR.fileTools || (CKEDITOR.fileTools = {}); CKEDITOR.tools.extend(CKEDITOR.fileTools, {
                uploadRepository: b, fileLoader: f, getUploadUrl: function (a, b) {
                    var d = CKEDITOR.tools.capitalize; return b && a[b + "UploadUrl"] ? a[b + "UploadUrl"] : a.uploadUrl ? a.uploadUrl : b && a["filebrowser" + d(b, 1) + "UploadUrl"] ? a["filebrowser" + d(b, 1) + "UploadUrl"] + "\x26responseType\x3djson" : a.filebrowserUploadUrl ? a.filebrowserUploadUrl +
                        "\x26responseType\x3djson" : null
                }, isTypeSupported: function (a, b) { return !!a.type.match(b) }, isFileUploadSupported: "function" === typeof FileReader && "function" === typeof (new FileReader).readAsDataURL && "function" === typeof FormData && "function" === typeof (new FormData).append && "function" === typeof XMLHttpRequest && "function" === typeof Blob
            })
        })(); (function () {
            function b(a, b) { var c = []; if (b) for (var e in b) c.push(e + "\x3d" + encodeURIComponent(b[e])); else return a; return a + (-1 != a.indexOf("?") ? "\x26" : "?") + c.join("\x26") }
            function f(a) { return !a.match(/command=QuickUpload/) || a.match(/(\?|&)responseType=json/) ? a : b(a, { responseType: "json" }) } function d(a) { a += ""; return a.charAt(0).toUpperCase() + a.substr(1) } function a() {
                var a = this.getDialog(), c = a.getParentEditor(); c._.filebrowserSe = this; var e = c.config["filebrowser" + d(a.getName()) + "WindowWidth"] || c.config.filebrowserWindowWidth || "80%", a = c.config["filebrowser" + d(a.getName()) + "WindowHeight"] || c.config.filebrowserWindowHeight || "70%", g = this.filebrowser.params || {}; g.CKEditor = c.name;
                g.CKEditorFuncNum = c._.filebrowserFn; g.langCode || (g.langCode = c.langCode); g = b(this.filebrowser.url, g); c.popup(g, e, a, c.config.filebrowserWindowFeatures || c.config.fileBrowserWindowFeatures)
            } function c(a) { var b = new CKEDITOR.dom.element(a.$.form); b && ((a = b.$.elements.ckCsrfToken) ? a = new CKEDITOR.dom.element(a) : (a = new CKEDITOR.dom.element("input"), a.setAttributes({ name: "ckCsrfToken", type: "hidden" }), b.append(a)), a.setAttribute("value", CKEDITOR.tools.getCsrfToken())) } function m() {
                var a = this.getDialog(); a.getParentEditor()._.filebrowserSe =
                    this; return a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value && a.getContentElement(this["for"][0], this["for"][1]).getAction() ? !0 : !1
            } function h(a, c, e) { var d = e.params || {}; d.CKEditor = a.name; d.CKEditorFuncNum = a._.filebrowserFn; d.langCode || (d.langCode = a.langCode); c.action = b(e.url, d); c.filebrowser = e } function l(b, k, u, r) {
                if (r && r.length) for (var p, v = r.length; v--;)if (p = r[v], "hbox" != p.type && "vbox" != p.type && "fieldset" != p.type || l(b, k, u, p.children), p.filebrowser) if ("string" == typeof p.filebrowser &&
                    (p.filebrowser = { action: "fileButton" == p.type ? "QuickUpload" : "Browse", target: p.filebrowser }), "Browse" == p.filebrowser.action) { var y = p.filebrowser.url; void 0 === y && (y = b.config["filebrowser" + d(k) + "BrowseUrl"], void 0 === y && (y = b.config.filebrowserBrowseUrl)); y && (p.onClick = a, p.filebrowser.url = y, p.hidden = !1) } else if ("QuickUpload" == p.filebrowser.action && p["for"] && (y = p.filebrowser.url, void 0 === y && (y = b.config["filebrowser" + d(k) + "UploadUrl"], void 0 === y && (y = b.config.filebrowserUploadUrl)), y)) {
                        var t = p.onClick; p.onClick =
                            function (a) {
                                var d = a.sender, h = d.getDialog().getContentElement(this["for"][0], this["for"][1]).getInputElement(), k = CKEDITOR.fileTools && CKEDITOR.fileTools.isFileUploadSupported; if (t && !1 === t.call(d, a)) return !1; if (m.call(d, a)) {
                                    if ("form" !== b.config.filebrowserUploadMethod && k) return a = b.uploadRepository.create(h.$.files[0]), a.on("uploaded", function (a) { var b = a.sender.responseData; g.call(a.sender.editor, b.url, b.message) }), a.on("error", e.bind(this)), a.on("abort", e.bind(this)), a.loadAndUpload(f(y)), "xhr"; c(h);
                                    return !0
                                } return !1
                            }; p.filebrowser.url = y; p.hidden = !1; h(b, u.getContents(p["for"][0]).get(p["for"][1]), p.filebrowser)
                    }
            } function e(a) { var b = {}; try { b = JSON.parse(a.sender.xhr.response) || {} } catch (c) { } this.enable(); alert(b.error ? b.error.message : a.sender.message) } function k(a, b, c) { if (-1 !== c.indexOf(";")) { c = c.split(";"); for (var e = 0; e < c.length; e++)if (k(a, b, c[e])) return !0; return !1 } return (a = a.getContents(b).get(c).filebrowser) && a.url } function g(a, b) {
                var c = this._.filebrowserSe.getDialog(), e = this._.filebrowserSe["for"],
                d = this._.filebrowserSe.filebrowser.onSelect; e && c.getContentElement(e[0], e[1]).reset(); if ("function" != typeof b || !1 !== b.call(this._.filebrowserSe)) if (!d || !1 !== d.call(this._.filebrowserSe, a, b)) if ("string" == typeof b && b && alert(b), a && (e = this._.filebrowserSe, c = e.getDialog(), e = e.filebrowser.target || null)) if (e = e.split(":"), d = c.getContentElement(e[0], e[1])) d.setValue(a), c.selectPage(e[0])
            } CKEDITOR.plugins.add("filebrowser", {
                requires: "popup,filetools", init: function (a) {
                    a._.filebrowserFn = CKEDITOR.tools.addFunction(g,
                        a); a.on("destroy", function () { CKEDITOR.tools.removeFunction(this._.filebrowserFn) })
                }
            }); CKEDITOR.on("dialogDefinition", function (a) { if (a.editor.plugins.filebrowser) for (var b = a.data.definition, c, e = 0; e < b.contents.length; ++e)if (c = b.contents[e]) l(a.editor, a.data.name, b, c.elements), c.hidden && c.filebrowser && (c.hidden = !k(b, c.id, c.filebrowser)) })
        })(); CKEDITOR.plugins.add("find", {
            requires: "dialog", init: function (b) {
                var f = b.addCommand("find", new CKEDITOR.dialogCommand("find")), d = b.addCommand("replace", new CKEDITOR.dialogCommand("find",
                    { tabId: "replace" })); f.canUndo = !1; f.readOnly = 1; d.canUndo = !1; b.ui.addButton && (b.ui.addButton("Find", { label: b.lang.find.find, command: "find", toolbar: "find,10" }), b.ui.addButton("Replace", { label: b.lang.find.replace, command: "replace", toolbar: "find,20" })); CKEDITOR.dialog.add("find", this.path + "dialogs/find.js")
            }
        }); CKEDITOR.config.find_highlight = { element: "span", styles: { "background-color": "#004", color: "#fff" } }; (function () {
            function b(b, c) {
                var d = a.exec(b), e = a.exec(c); if (d) {
                    if (!d[2] && "px" == e[2]) return e[1]; if ("px" ==
                        d[2] && !e[2]) return e[1] + "px"
                } return c
            } var f = CKEDITOR.htmlParser.cssStyle, d = CKEDITOR.tools.cssLength, a = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i, c = { elements: { $: function (a) { var c = a.attributes; if ((c = (c = (c = c && c["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(c))) && c.children[0]) && a.attributes["data-cke-resizable"]) { var d = (new f(a)).rules; a = c.attributes; var e = d.width, d = d.height; e && (a.width = b(a.width, e)); d && (a.height = b(a.height, d)) } return c } } }; CKEDITOR.plugins.add("fakeobjects",
                { init: function (a) { a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects") }, afterInit: function (a) { (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(c, { applyToAll: !0 }) } }); CKEDITOR.editor.prototype.createFakeElement = function (a, b, c, e) {
                    var k = this.lang.fakeobjects, k = k[c] || k.unknown; b = { "class": b, "data-cke-realelement": encodeURIComponent(a.getOuterHtml()), "data-cke-real-node-type": a.type, alt: k, title: k, align: a.getAttribute("align") || "" }; CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData);
                    c && (b["data-cke-real-element-type"] = c); e && (b["data-cke-resizable"] = e, c = new f, e = a.getAttribute("width"), a = a.getAttribute("height"), e && (c.rules.width = d(e)), a && (c.rules.height = d(a)), c.populate(b)); return this.document.createElement("img", { attributes: b })
                }; CKEDITOR.editor.prototype.createFakeParserElement = function (a, b, c, e) {
                    var k = this.lang.fakeobjects, k = k[c] || k.unknown, g; g = new CKEDITOR.htmlParser.basicWriter; a.writeHtml(g); g = g.getHtml(); b = {
                        "class": b, "data-cke-realelement": encodeURIComponent(g), "data-cke-real-node-type": a.type,
                        alt: k, title: k, align: a.attributes.align || ""
                    }; CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData); c && (b["data-cke-real-element-type"] = c); e && (b["data-cke-resizable"] = e, e = a.attributes, a = new f, c = e.width, e = e.height, void 0 !== c && (a.rules.width = d(c)), void 0 !== e && (a.rules.height = d(e)), a.populate(b)); return new CKEDITOR.htmlParser.element("img", b)
                }; CKEDITOR.editor.prototype.restoreRealElement = function (a) {
                    if (a.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null; var c = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data("cke-realelement")),
                        this.document); if (a.data("cke-resizable")) { var d = a.getStyle("width"); a = a.getStyle("height"); d && c.setAttribute("width", b(c.getAttribute("width"), d)); a && c.setAttribute("height", b(c.getAttribute("height"), a)) } return c
                }
        })(); (function () {
            function b(a) { a = a.attributes; return "application/x-shockwave-flash" == a.type || d.test(a.src || "") } function f(a, b) { return a.createFakeParserElement(b, "cke_flash", "flash", !0) } var d = /\.swf(?:$|\?)/i; CKEDITOR.plugins.add("flash", {
                requires: "dialog,fakeobjects", onLoad: function () {
                    CKEDITOR.addCss("img.cke_flash{background-image: url(" +
                        CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")
                }, init: function (a) {
                    var b = "object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]"; CKEDITOR.dialog.isTabEnabled(a, "flash", "properties") && (b += ";object[align]; embed[allowscriptaccess,quality,scale,wmode]"); CKEDITOR.dialog.isTabEnabled(a, "flash", "advanced") && (b +=
                        ";object[id]{*}; embed[bgcolor]{*}(*)"); a.addCommand("flash", new CKEDITOR.dialogCommand("flash", { allowedContent: b, requiredContent: "embed" })); a.ui.addButton && a.ui.addButton("Flash", { label: a.lang.common.flash, command: "flash", toolbar: "insert,20" }); CKEDITOR.dialog.add("flash", this.path + "dialogs/flash.js"); a.addMenuItems && a.addMenuItems({ flash: { label: a.lang.flash.properties, command: "flash", group: "flash" } }); a.on("doubleclick", function (a) {
                            var b = a.data.element; b.is("img") && "flash" == b.data("cke-real-element-type") &&
                                (a.data.dialog = "flash")
                        }); a.contextMenu && a.contextMenu.addListener(function (a) { if (a && a.is("img") && !a.isReadOnly() && "flash" == a.data("cke-real-element-type")) return { flash: CKEDITOR.TRISTATE_OFF } })
                }, afterInit: function (a) {
                    var c = a.dataProcessor; (c = c && c.dataFilter) && c.addRules({
                        elements: {
                            "cke:object": function (c) {
                                var d = c.attributes; if (!(d.classid && String(d.classid).toLowerCase() || b(c))) { for (d = 0; d < c.children.length; d++)if ("cke:embed" == c.children[d].name) { if (!b(c.children[d])) break; return f(a, c) } return null } return f(a,
                                    c)
                            }, "cke:embed": function (c) { return b(c) ? f(a, c) : null }
                        }
                    }, 5)
                }
            })
        })(); CKEDITOR.tools.extend(CKEDITOR.config, { flashEmbedTagOnly: !1, flashAddEmbedTag: !0, flashConvertOnEdit: !1 }); (function () {
            function b(a) {
                var b = a.config, m = a.fire("uiSpace", { space: "top", html: "" }).html, h = function () {
                    function g(a, b, c) { e.setStyle(b, d(c)); e.setStyle("position", a) } function k(a) {
                        var b = l.getDocumentPosition(); switch (a) {
                            case "top": g("absolute", "top", b.y - t - z); break; case "pin": g("fixed", "top", C); break; case "bottom": g("absolute", "top", b.y +
                                (v.height || v.bottom - v.top) + z)
                        }m = a
                    } var m, l, p, v, y, t, B, w = b.floatSpaceDockedOffsetX || 0, z = b.floatSpaceDockedOffsetY || 0, A = b.floatSpacePinnedOffsetX || 0, C = b.floatSpacePinnedOffsetY || 0; return function (g) {
                        if (l = a.editable()) {
                            var n = g && "focus" == g.name; n && e.show(); a.fire("floatingSpaceLayout", { show: n }); e.removeStyle("left"); e.removeStyle("right"); p = e.getClientRect(); v = l.getClientRect(); y = f.getViewPaneSize(); t = p.height; B = "pageXOffset" in f.$ ? f.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft; m ? (t + z <=
                                v.top ? k("top") : t + z > y.height - v.bottom ? k("pin") : k("bottom"), g = y.width / 2, g = b.floatSpacePreferRight ? "right" : 0 < v.left && v.right < y.width && v.width > p.width ? "rtl" == b.contentsLangDirection ? "right" : "left" : g - v.left > v.right - g ? "left" : "right", p.width > y.width ? (g = "left", n = 0) : (n = "left" == g ? 0 < v.left ? v.left : 0 : v.right < y.width ? y.width - v.right : 0, n + p.width > y.width && (g = "left" == g ? "right" : "left", n = 0)), e.setStyle(g, d(("pin" == m ? A : w) + n + ("pin" == m ? 0 : "left" == g ? B : -B)))) : (m = "pin", k("pin"), h(g))
                        }
                    }
                }(); if (m) {
                    var l = new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' +
                        CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko ? " " : "") + '" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : " ") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : " ") + '\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'), e = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(l.output({
                            content: m,
                            id: a.id, langDir: a.lang.dir, langCode: a.langCode, name: a.name, style: "display:none;z-index:" + (b.baseFloatZIndex - 1), topId: a.ui.spaceId("top"), voiceLabel: a.title
                        }))), k = CKEDITOR.tools.eventsBuffer(500, h), g = CKEDITOR.tools.eventsBuffer(100, h); e.unselectable(); e.on("mousedown", function (a) { a = a.data; a.getTarget().hasAscendant("a", 1) || a.preventDefault() }); a.on("focus", function (b) { h(b); a.on("change", k.input); f.on("scroll", g.input); f.on("resize", g.input) }); a.on("blur", function () {
                            e.hide(); a.removeListener("change",
                                k.input); f.removeListener("scroll", g.input); f.removeListener("resize", g.input)
                        }); a.on("destroy", function () { f.removeListener("scroll", g.input); f.removeListener("resize", g.input); e.clearCustomData(); e.remove() }); a.focusManager.hasFocus && e.show(); a.focusManager.add(e, 1)
                }
            } var f = CKEDITOR.document.getWindow(), d = CKEDITOR.tools.cssLength; CKEDITOR.plugins.add("floatingspace", { init: function (a) { a.on("loaded", function () { b(this) }, null, null, 20) } })
        })(); CKEDITOR.plugins.add("listblock", {
            requires: "panel", onLoad: function () {
                var b =
                    CKEDITOR.addTemplate("panel-list", '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'), f = CKEDITOR.addTemplate("panel-list-item", '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" draggable\x3d"false" ondragstart\x3d"return false;" href\x3d"javascript:void(\'{val}\')"  onclick\x3d"{onclick}CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),
                d = CKEDITOR.addTemplate("panel-list-group", '\x3ch1 id\x3d"{id}" draggable\x3d"false" ondragstart\x3d"return false;" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'), a = /\'/g; CKEDITOR.ui.panel.prototype.addListBlock = function (a, b) { return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b)) }; CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.panel.block, $: function (a, b) {
                        b = b || {}; var d = b.attributes || (b.attributes = {}); (this.multiSelect = !!b.multiSelect) &&
                            (d["aria-multiselectable"] = !0); !d.role && (d.role = "listbox"); this.base.apply(this, arguments); this.element.setAttribute("role", d.role); d = this.keys; d[40] = "next"; d[9] = "next"; d[38] = "prev"; d[CKEDITOR.SHIFT + 9] = "prev"; d[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (d[13] = "mouseup"); this._.pendingHtml = []; this._.pendingList = []; this._.items = {}; this._.groups = {}
                    }, _: {
                        close: function () {
                            if (this._.started) {
                                var a = b.output({ items: this._.pendingList.join("") }); this._.pendingList = []; this._.pendingHtml.push(a);
                                delete this._.started
                            }
                        }, getClick: function () { this._.click || (this._.click = CKEDITOR.tools.addFunction(function (a) { var b = this.toggle(a); if (this.onClick) this.onClick(a, b) }, this)); return this._.click }
                    }, proto: {
                        add: function (b, d, h) {
                            var l = CKEDITOR.tools.getNextId(); this._.started || (this._.started = 1, this._.size = this._.size || 0); this._.items[b] = l; var e; e = CKEDITOR.tools.htmlEncodeAttr(b).replace(a, "\\'"); b = {
                                id: l, val: e, onclick: CKEDITOR.env.ie ? 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26' :
                                    "", clickFn: this._.getClick(), title: CKEDITOR.tools.htmlEncodeAttr(h || b), text: d || b
                            }; this._.pendingList.push(f.output(b))
                        }, startGroup: function (a) { this._.close(); var b = CKEDITOR.tools.getNextId(); this._.groups[a] = b; this._.pendingHtml.push(d.output({ id: b, label: a })) }, commit: function () { this._.close(); this.element.appendHtml(this._.pendingHtml.join("")); delete this._.size; this._.pendingHtml = [] }, toggle: function (a) { var b = this.isMarked(a); b ? this.unmark(a) : this.mark(a); return !b }, hideGroup: function (a) {
                            var b = (a =
                                this.element.getDocument().getById(this._.groups[a])) && a.getNext(); a && (a.setStyle("display", "none"), b && "ul" == b.getName() && b.setStyle("display", "none"))
                        }, hideItem: function (a) { this.element.getDocument().getById(this._.items[a]).setStyle("display", "none") }, showAll: function () {
                            var a = this._.items, b = this._.groups, d = this.element.getDocument(), f; for (f in a) d.getById(a[f]).setStyle("display", ""); for (var e in b) a = d.getById(b[e]), f = a.getNext(), a.setStyle("display", ""), f && "ul" == f.getName() && f.setStyle("display",
                                "")
                        }, mark: function (a) { this.multiSelect || this.unmarkAll(); a = this._.items[a]; var b = this.element.getDocument().getById(a); b.addClass("cke_selected"); this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0); this.onMark && this.onMark(b) }, markFirstDisplayed: function () { var a = this; this._.markFirstDisplayed(function () { a.multiSelect || a.unmarkAll() }) }, unmark: function (a) {
                            var b = this.element.getDocument(); a = this._.items[a]; var d = b.getById(a); d.removeClass("cke_selected"); b.getById(a + "_option").removeAttribute("aria-selected");
                            this.onUnmark && this.onUnmark(d)
                        }, unmarkAll: function () { var a = this._.items, b = this.element.getDocument(), d; for (d in a) { var f = a[d]; b.getById(f).removeClass("cke_selected"); b.getById(f + "_option").removeAttribute("aria-selected") } this.onUnmark && this.onUnmark() }, isMarked: function (a) { return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected") }, focus: function (a) {
                            this._.focusIndex = -1; var b = this.element.getElementsByTag("a"), d, f = -1; if (a) for (d = this.element.getDocument().getById(this._.items[a]).getFirst(); a =
                                b.getItem(++f);) { if (a.equals(d)) { this._.focusIndex = f; break } } else this.element.focus(); d && setTimeout(function () { d.focus() }, 0)
                        }
                    }
                })
            }
        }); CKEDITOR.plugins.add("richcombo", { requires: "floatpanel,listblock,button", beforeInit: function (b) { b.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler) } }); (function () {
            var b = '\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"' +
                (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"listbox"', f = ""; CKEDITOR.env.gecko && CKEDITOR.env.mac && (b += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (b += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); CKEDITOR.env.ie && (f = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var b = b + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" onclick\x3d"' +
                    f + 'CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : CKEDITOR.env.air ? "\x26nbsp;" : "") + "\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"), d = CKEDITOR.addTemplate("combo", b); CKEDITOR.UI_RICHCOMBO = "richcombo"; CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
                        $: function (a) {
                            CKEDITOR.tools.extend(this,
                                a, { canGroup: !1, title: a.label, modes: { wysiwyg: 1 }, editorFocus: 1 }); a = this.panel || {}; delete this.panel; this.id = CKEDITOR.tools.getNextNumber(); this.document = a.parent && a.parent.getDocument() || CKEDITOR.document; a.className = "cke_combopanel"; a.block = { multiSelect: a.multiSelect, attributes: a.attributes }; a.toolbarRelated = !0; this._ = { panelDefinition: a, items: {}, listeners: [] }
                        }, proto: {
                            renderHtml: function (a) { var b = []; this.render(a, b); return b.join("") }, render: function (a, b) {
                                function f() {
                                    if (this.getState() != CKEDITOR.TRISTATE_ON) {
                                        var b =
                                            this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; a.readOnly && !this.readOnly && (b = CKEDITOR.TRISTATE_DISABLED); this.setState(b); this.setValue(""); b != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh()
                                    }
                                } var h = CKEDITOR.env, l, e, k = "cke_" + this.id, g = CKEDITOR.tools.addFunction(function (b) { e && (a.unlockSelection(1), e = 0); l.execute(b) }, this), n = this; l = {
                                    id: k, combo: this, focus: function () { CKEDITOR.document.getById(k).getChild(1).focus() }, execute: function (b) {
                                        var c = n._; if (c.state != CKEDITOR.TRISTATE_DISABLED) if (n.createPanel(a),
                                            c.on) c.panel.hide(); else { n.commit(); var e = n.getValue(); e ? c.list.mark(e) : c.list.unmarkAll(); c.panel.showBlock(n.id, new CKEDITOR.dom.element(b), 4) }
                                    }, clickFn: g
                                }; this._.listeners.push(a.on("activeFilterChange", f, this)); this._.listeners.push(a.on("mode", f, this)); this._.listeners.push(a.on("selectionChange", f, this)); !this.readOnly && this._.listeners.push(a.on("readOnly", f, this)); var q = CKEDITOR.tools.addFunction(function (a, b) {
                                    a = new CKEDITOR.dom.event(a); var c = a.getKeystroke(); switch (c) {
                                        case 13: case 32: case 40: CKEDITOR.tools.callFunction(g,
                                            b); break; default: l.onkey(l, c)
                                    }a.preventDefault()
                                }), u = CKEDITOR.tools.addFunction(function () { l.onfocus && l.onfocus() }); e = 0; l.keyDownFn = q; h = { id: k, name: this.name || this.command, label: this.label, title: this.title, cls: this.className || "", titleJs: h.gecko && !h.hc ? "" : (this.title || "").replace("'", ""), keydownFn: q, focusFn: u, clickFn: g }; d.output(h, b); if (this.onRender) this.onRender(); return l
                            }, createPanel: function (a) {
                                if (!this._.panel) {
                                    var b = this._.panelDefinition, d = this._.panelDefinition.block, f = b.parent || CKEDITOR.document.getBody(),
                                    l = "cke_combopanel__" + this.name, e = new CKEDITOR.ui.floatPanel(a, f, b), b = e.addListBlock(this.id, d), k = this; e.onShow = function () { this.element.addClass(l); k.setState(CKEDITOR.TRISTATE_ON); k._.on = 1; k.editorFocus && !a.focusManager.hasFocus && a.focus(); if (k.onOpen) k.onOpen() }; e.onHide = function (b) { this.element.removeClass(l); k.setState(k.modes && k.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); k._.on = 0; if (!b && k.onClose) k.onClose() }; e.onEscape = function () { e.hide(1) }; b.onClick = function (a, b) {
                                        k.onClick &&
                                        k.onClick.call(k, a, b); e.hide()
                                    }; this._.panel = e; this._.list = b; e.getBlock(this.id).onHide = function () { k._.on = 0; k.setState(CKEDITOR.TRISTATE_OFF) }; this.init && this.init()
                                }
                            }, setValue: function (a, b) {
                                this._.value = a; var d = this.document.getById("cke_" + this.id + "_text"); d && (a || b ? d.removeClass("cke_combo_inlinelabel") : (b = this.label, d.addClass("cke_combo_inlinelabel")), d.setText("undefined" != typeof b ? b : a)); var d = "undefined" != typeof b ? b : a, f = this.label, d = d === f ? d : d + ", " + f; (f = this.document.getById("cke_" + this.id + "_label")) &&
                                    f.setText(d)
                            }, getValue: function () { return this._.value || "" }, unmarkAll: function () { this._.list.unmarkAll() }, mark: function (a) { this._.list.mark(a) }, hideItem: function (a) { this._.list.hideItem(a) }, hideGroup: function (a) { this._.list.hideGroup(a) }, showAll: function () { this._.list.showAll() }, add: function (a, b, d) { this._.items[a] = d || a; this._.list.add(a, b, d) }, startGroup: function (a) { this._.list.startGroup(a) }, commit: function () {
                                this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this));
                                this._.committed = 1
                            }, setState: function (a) { if (this._.state != a) { var b = this.document.getById("cke_" + this.id), d = b.getElementsByTag("a").getItem(0); b.setState(a, "cke_combo"); a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"); d && d.setAttribute("aria-expanded", a == CKEDITOR.TRISTATE_ON); this._.state = a } }, getState: function () { return this._.state }, enable: function () { this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState) }, disable: function () {
                                this._.state !=
                                CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED))
                            }, destroy: function () { CKEDITOR.tools.array.forEach(this._.listeners, function (a) { a.removeListener() }); this._.listeners = [] }, select: function (a) { if (!CKEDITOR.tools.isEmpty(this._.items)) for (var b in this._.items) if (a({ value: b, text: this._.items[b] })) { this.setValue(b); break } }
                        }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.richCombo(a) } } }
                    }); CKEDITOR.ui.prototype.addRichCombo = function (a, b) {
                        this.add(a,
                            CKEDITOR.UI_RICHCOMBO, b)
                    }
        })(); (function () {
            function b(b, d) {
                var h = b.config, l = d.lang, e = new CKEDITOR.style(d.styleDefinition), k = new a({ entries: d.entries, styleVariable: d.styleVariable, styleDefinition: d.styleDefinition }), g; b.addCommand(d.commandName, {
                    exec: function (a, b) {
                        var c = b.newStyle, e = b.oldStyle, d = a.getSelection().getRanges()[0], g = void 0 === c; if (e || c) if (e && d.collapsed && f({ editor: a, range: d, style: e }), g) a.removeStyle(e); else {
                            if (d = e) d = e instanceof CKEDITOR.style && c instanceof CKEDITOR.style ? CKEDITOR.style.getStyleText(e.getDefinition()) ===
                                CKEDITOR.style.getStyleText(c.getDefinition()) : !1, d = !d; d && a.removeStyle(e); a.applyStyle(c)
                        }
                    }, refresh: function (a, b) { e.checkApplicable(b, a, a.activeFilter) || this.setState(CKEDITOR.TRISTATE_DISABLED) }
                }); g = b.getCommand(d.commandName); b.ui.addRichCombo(d.comboName, {
                    label: l.label, title: l.panelTitle, command: d.commandName, toolbar: "styles," + d.order, defaultValue: "cke-default", allowedContent: e, requiredContent: e, contentTransformations: "span" === d.styleDefinition.element ? [[{
                        element: "font", check: "span", left: function (a) {
                            return !!a.attributes.size ||
                                !!a.attributes.align || !!a.attributes.face
                        }, right: function (a) { var b = " x-small small medium large x-large xx-large 48px".split(" "); a.name = "span"; a.attributes.size && (a.styles["font-size"] = b[a.attributes.size], delete a.attributes.size); a.attributes.align && (a.styles["text-align"] = a.attributes.align, delete a.attributes.align); a.attributes.face && (a.styles["font-family"] = a.attributes.face, delete a.attributes.face) }
                    }]] : null, panel: {
                        css: [CKEDITOR.skin.getPath("editor")].concat(h.contentsCss), multiSelect: !1,
                        attributes: { "aria-label": l.panelTitle }
                    }, init: function () { var a = "(" + b.lang.common.optionDefault + ")"; this.startGroup(l.panelTitle); this.add(this.defaultValue, a, a); k.addToCombo(this) }, onClick: function (a) { var e = this.getValue(); b.focus(); b.fire("saveSnapshot"); b.execCommand(d.commandName, { newStyle: k.getStyle(a), oldStyle: k.getStyle(e) }); b.fire("saveSnapshot") }, onRender: function () {
                        b.on("selectionChange", function (a) {
                            var e = this.getValue(); (a = k.getMatchingValue(b, a.data.path)) ? a != e && this.setValue(a) : this.setValue("",
                                d.defaultLabel)
                        }, this); g.on("state", function () { this.setState(g.state) }, this)
                    }, refresh: function () { this.setState(g.state) }
                })
            } function f(a) {
                var b = a.editor, f = a.range, l = a.style, e, k, g; e = b.elementPath(); if (a = e.contains(function (a) { return l.checkElementRemovable(a) })) {
                    k = f.checkBoundaryOfElement(a, CKEDITOR.START); g = f.checkBoundaryOfElement(a, CKEDITOR.END); if (k && g) { for (k = f.createBookmark(); e = a.getFirst();)e.insertBefore(a); a.remove(); f.moveToBookmark(k) } else k || g ? f.moveToPosition(a, k ? CKEDITOR.POSITION_BEFORE_START :
                        CKEDITOR.POSITION_AFTER_END) : (f.splitElement(a), f.moveToPosition(a, CKEDITOR.POSITION_AFTER_END)), d(f, e.elements.slice(), a); b.getSelection().selectRanges([f])
                }
            } function d(a, b, f) { var l = b.pop(); if (l) { if (f) return d(a, b, l.equals(f) ? null : f); f = l.clone(); a.insertNode(f); a.moveToPosition(f, CKEDITOR.POSITION_AFTER_START); d(a, b) } } var a = CKEDITOR.tools.createClass({
                $: function (a) {
                    var b = a.entries.split(";"); this._.data = {}; this._.names = []; for (var d = 0; d < b.length; d++) {
                        var f = b[d], e, k; f ? (f = f.split("/"), e = f[0], f = f[1],
                            k = {}, k[a.styleVariable] = f || e, this._.data[e] = new CKEDITOR.style(a.styleDefinition, k), this._.data[e]._.definition.name = e, this._.names.push(e)) : (b.splice(d, 1), d--)
                    }
                }, proto: { getStyle: function (a) { return this._.data[a] }, addToCombo: function (a) { for (var b = 0; b < this._.names.length; b++) { var d = this._.names[b]; a.add(d, this.getStyle(d).buildPreview(), d) } }, getMatchingValue: function (a, b) { for (var d = b.elements, f = 0, e; f < d.length; f++)if (e = d[f], e = this._.findMatchingStyleName(a, e)) return e; return null } }, _: {
                    findMatchingStyleName: function (a,
                        b) { return CKEDITOR.tools.array.find(this._.names, function (d) { return this.getStyle(d).checkElementMatch(b, !0, a) }, this) }
                }
            }); CKEDITOR.plugins.add("font", {
                requires: "richcombo", init: function (a) {
                    var d = a.config; b(a, { comboName: "Font", commandName: "font", styleVariable: "family", lang: a.lang.font, entries: d.font_names, defaultLabel: d.font_defaultLabel, styleDefinition: d.font_style, order: 30 }); b(a, {
                        comboName: "FontSize", commandName: "fontSize", styleVariable: "size", lang: a.lang.font.fontSize, entries: d.fontSize_sizes, defaultLabel: d.fontSize_defaultLabel,
                        styleDefinition: d.fontSize_style, order: 40
                    })
                }
            })
        })(); CKEDITOR.config.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif"; CKEDITOR.config.font_defaultLabel = ""; CKEDITOR.config.font_style =
            { element: "span", styles: { "font-family": "#(family)" }, overrides: [{ element: "font", attributes: { face: null } }] }; CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px"; CKEDITOR.config.fontSize_defaultLabel = ""; CKEDITOR.config.fontSize_style = { element: "span", styles: { "font-size": "#(size)" }, overrides: [{ element: "font", attributes: { size: null } }] }; CKEDITOR.plugins.add("format", {
                requires: "richcombo", init: function (b) {
                    if (!b.blockless) {
                        for (var f =
                            b.config, d = b.lang.format, a = f.format_tags.split(";"), c = {}, m = 0, h = [], l = 0; l < a.length; l++) { var e = a[l], k = new CKEDITOR.style(f["format_" + e]); if (!b.filter.customConfig || b.filter.check(k)) m++, c[e] = k, c[e]._.enterMode = b.config.enterMode, h.push(k) } 0 !== m && b.ui.addRichCombo("Format", {
                                label: d.label, title: d.panelTitle, toolbar: "styles,20", allowedContent: h, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(f.contentsCss), multiSelect: !1, attributes: { "aria-label": d.panelTitle } }, init: function () {
                                    this.startGroup(d.panelTitle);
                                    for (var a in c) { var b = d["tag_" + a]; this.add(a, c[a].buildPreview(b), b) }
                                }, onClick: function (a) { b.focus(); b.fire("saveSnapshot"); a = c[a]; var e = b.elementPath(); b.fire("stylesRemove", { type: CKEDITOR.STYLE_BLOCK }); a.checkActive(e, b) || b.applyStyle(a); setTimeout(function () { b.fire("saveSnapshot") }, 0) }, onRender: function () {
                                    b.on("selectionChange", function (a) { var e = this.getValue(); a = a.data.path; this.refresh(); for (var d in c) if (c[d].checkActive(a, b)) { d != e && this.setValue(d, b.lang.format["tag_" + d]); return } this.setValue("") },
                                        this)
                                }, onOpen: function () { this.showAll(); for (var a in c) b.activeFilter.check(c[a]) || this.hideItem(a) }, refresh: function () { var a = b.elementPath(); if (a) { if (a.isContextFor("p")) for (var e in c) if (b.activeFilter.check(c[e])) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }
                            })
                    }
                }
            }); CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div"; CKEDITOR.config.format_p = { element: "p" }; CKEDITOR.config.format_div = { element: "div" }; CKEDITOR.config.format_pre = { element: "pre" }; CKEDITOR.config.format_address = { element: "address" };
        CKEDITOR.config.format_h1 = { element: "h1" }; CKEDITOR.config.format_h2 = { element: "h2" }; CKEDITOR.config.format_h3 = { element: "h3" }; CKEDITOR.config.format_h4 = { element: "h4" }; CKEDITOR.config.format_h5 = { element: "h5" }; CKEDITOR.config.format_h6 = { element: "h6" }; CKEDITOR.plugins.add("forms", {
            requires: "dialog,fakeobjects", onLoad: function () {
                CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n"); CKEDITOR.addCss("img.cke_hidden{background-image: url(" + CKEDITOR.getUrl(this.path + "images/hiddenfield.gif") +
                    ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}"); CKEDITOR.style.unstylableElements.push("select", "option")
            }, init: function (b) {
                var f = b.lang, d = 0, a = { email: 1, password: 1, search: 1, tel: 1, text: 1, url: 1 }, c = {
                    checkbox: "input[type,name,checked,required]", radio: "input[type,name,checked,required]", textfield: "input[type,name,value,size,maxlength,required]", textarea: "textarea[cols,rows,name,required]", select: "select[name,size,multiple,required]; option[value,selected]",
                    button: "input[type,name,value]", form: "form[action,name,id,enctype,target,method]", hiddenfield: "input[type,name,value]", imagebutton: "input[type,alt,src]{width,height,border,border-width,border-style,margin,float}"
                }, m = { checkbox: "input", radio: "input", textfield: "input", textarea: "textarea", select: "select", button: "input", form: "form", hiddenfield: "input", imagebutton: "input" }, h = function (a, e, h) {
                    var l = { allowedContent: c[e], requiredContent: m[e] }; "form" == e && (l.context = "form"); b.addCommand(e, new CKEDITOR.dialogCommand(e,
                        l)); b.ui.addButton && b.ui.addButton(a, { label: f.common[a.charAt(0).toLowerCase() + a.slice(1)], command: e, toolbar: "forms," + (d += 10) }); CKEDITOR.dialog.add(e, h)
                }, l = this.path + "dialogs/"; !b.blockless && h("Form", "form", l + "form.js"); h("Checkbox", "checkbox", l + "checkbox.js"); h("Radio", "radio", l + "radio.js"); h("TextField", "textfield", l + "textfield.js"); h("Textarea", "textarea", l + "textarea.js"); h("Select", "select", l + "select.js"); h("Button", "button", l + "button.js"); var e = b.plugins.image; e && !b.plugins.image2 && h("ImageButton",
                    "imagebutton", CKEDITOR.plugins.getPath("image") + "dialogs/image.js"); h("HiddenField", "hiddenfield", l + "hiddenfield.js"); b.addMenuItems && (h = {
                        checkbox: { label: f.forms.checkboxAndRadio.checkboxTitle, command: "checkbox", group: "checkbox" }, radio: { label: f.forms.checkboxAndRadio.radioTitle, command: "radio", group: "radio" }, textfield: { label: f.forms.textfield.title, command: "textfield", group: "textfield" }, hiddenfield: { label: f.forms.hidden.title, command: "hiddenfield", group: "hiddenfield" }, button: {
                            label: f.forms.button.title,
                            command: "button", group: "button"
                        }, select: { label: f.forms.select.title, command: "select", group: "select" }, textarea: { label: f.forms.textarea.title, command: "textarea", group: "textarea" }
                    }, e && (h.imagebutton = { label: f.image.titleButton, command: "imagebutton", group: "imagebutton" }), !b.blockless && (h.form = { label: f.forms.form.menu, command: "form", group: "form" }), b.addMenuItems(h)); b.contextMenu && (!b.blockless && b.contextMenu.addListener(function (a, b, c) { if ((a = c.contains("form", 1)) && !a.isReadOnly()) return { form: CKEDITOR.TRISTATE_OFF } }),
                        b.contextMenu.addListener(function (b) {
                            if (b && !b.isReadOnly()) {
                                var c = b.getName(); if ("select" == c) return { select: CKEDITOR.TRISTATE_OFF }; if ("textarea" == c) return { textarea: CKEDITOR.TRISTATE_OFF }; if ("input" == c) { var d = b.getAttribute("type") || "text"; switch (d) { case "button": case "submit": case "reset": return { button: CKEDITOR.TRISTATE_OFF }; case "checkbox": return { checkbox: CKEDITOR.TRISTATE_OFF }; case "radio": return { radio: CKEDITOR.TRISTATE_OFF }; case "image": return e ? { imagebutton: CKEDITOR.TRISTATE_OFF } : null }if (a[d]) return { textfield: CKEDITOR.TRISTATE_OFF } } if ("img" ==
                                    c && "hiddenfield" == b.data("cke-real-element-type")) return { hiddenfield: CKEDITOR.TRISTATE_OFF }
                            }
                        })); b.on("doubleclick", function (c) {
                            var e = c.data.element; if (!b.blockless && e.is("form")) c.data.dialog = "form"; else if (e.is("select")) c.data.dialog = "select"; else if (e.is("textarea")) c.data.dialog = "textarea"; else if (e.is("img") && "hiddenfield" == e.data("cke-real-element-type")) c.data.dialog = "hiddenfield"; else if (e.is("input")) {
                                e = e.getAttribute("type") || "text"; switch (e) {
                                    case "button": case "submit": case "reset": c.data.dialog =
                                        "button"; break; case "checkbox": c.data.dialog = "checkbox"; break; case "radio": c.data.dialog = "radio"; break; case "image": c.data.dialog = "imagebutton"
                                }a[e] && (c.data.dialog = "textfield")
                            }
                        })
            }, afterInit: function (b) {
                var f = b.dataProcessor, d = f && f.htmlFilter, f = f && f.dataFilter; CKEDITOR.env.ie && d && d.addRules({ elements: { input: function (a) { a = a.attributes; var b = a.type; b || (a.type = "text"); "checkbox" != b && "radio" != b || "on" != a.value || delete a.value } } }, { applyToAll: !0 }); f && f.addRules({
                    elements: {
                        input: function (a) {
                            if ("hidden" ==
                                a.attributes.type) return b.createFakeParserElement(a, "cke_hidden", "hiddenfield")
                        }
                    }
                }, { applyToAll: !0 })
            }
        }); CKEDITOR.plugins.forms = { _setupRequiredAttribute: function (b) { this.setValue(b.hasAttribute("required")) } }; (function () {
            var b = { canUndo: !1, exec: function (b) { var d = b.document.createElement("hr"); b.insertElement(d) }, allowedContent: "hr", requiredContent: "hr" }; CKEDITOR.plugins.add("horizontalrule", {
                init: function (f) {
                    f.blockless || (f.addCommand("horizontalrule", b), f.ui.addButton && f.ui.addButton("HorizontalRule",
                        { label: f.lang.horizontalrule.toolbar, command: "horizontalrule", toolbar: "insert,40" }))
                }
            })
        })(); CKEDITOR.plugins.add("htmlwriter", { init: function (b) { var f = new CKEDITOR.htmlWriter; f.forceSimpleAmpersand = b.config.forceSimpleAmpersand; f.indentationChars = "string" === typeof b.config.dataIndentationChars ? b.config.dataIndentationChars : "\t"; b.dataProcessor.writer = f } }); CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
            base: CKEDITOR.htmlParser.basicWriter, $: function () {
                this.base(); this.indentationChars = "\t"; this.selfClosingEnd =
                    " /\x3e"; this.lineBreakChars = "\n"; this.sortAttributes = 1; this._.indent = 0; this._.indentation = ""; this._.inPre = 0; this._.rules = {}; var b = CKEDITOR.dtd, f; for (f in CKEDITOR.tools.extend({}, b.$nonBodyContent, b.$block, b.$listItem, b.$tableContent)) this.setRules(f, { indent: !b[f]["#"], breakBeforeOpen: 1, breakBeforeClose: !b[f]["#"], breakAfterClose: 1, needsSpace: f in b.$block && !(f in { li: 1, dt: 1, dd: 1 }) }); this.setRules("br", { breakAfterOpen: 1 }); this.setRules("title", { indent: 0, breakAfterOpen: 0 }); this.setRules("style", {
                        indent: 0,
                        breakBeforeClose: 1
                    }); this.setRules("pre", { breakAfterOpen: 1, indent: 0 })
            }, proto: {
                openTag: function (b) { var f = this._.rules[b]; this._.afterCloser && f && f.needsSpace && this._.needsSpace && this._.output.push("\n"); this._.indent ? this.indentation() : f && f.breakBeforeOpen && (this.lineBreak(), this.indentation()); this._.output.push("\x3c", b); this._.afterCloser = 0 }, openTagClose: function (b, f) {
                    var d = this._.rules[b]; f ? (this._.output.push(this.selfClosingEnd), d && d.breakAfterClose && (this._.needsSpace = d.needsSpace)) : (this._.output.push("\x3e"),
                        d && d.indent && (this._.indentation += this.indentationChars)); d && d.breakAfterOpen && this.lineBreak(); "pre" == b && (this._.inPre = 1)
                }, attribute: function (b, f) { "string" == typeof f && (f = CKEDITOR.tools.htmlEncodeAttr(f), this.forceSimpleAmpersand && (f = f.replace(/&amp;/g, "\x26"))); this._.output.push(" ", b, '\x3d"', f, '"') }, closeTag: function (b) {
                    var f = this._.rules[b]; f && f.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length)); this._.indent ? this.indentation() : f && f.breakBeforeClose && (this.lineBreak(),
                        this.indentation()); this._.output.push("\x3c/", b, "\x3e"); "pre" == b && (this._.inPre = 0); f && f.breakAfterClose && (this.lineBreak(), this._.needsSpace = f.needsSpace); this._.afterCloser = 1
                }, text: function (b) { this._.indent && (this.indentation(), !this._.inPre && (b = CKEDITOR.tools.ltrim(b))); this._.output.push(b) }, comment: function (b) { this._.indent && this.indentation(); this._.output.push("\x3c!--", b, "--\x3e") }, lineBreak: function () {
                    !this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars); this._.indent =
                        1
                }, indentation: function () { !this._.inPre && this._.indentation && this._.output.push(this._.indentation); this._.indent = 0 }, reset: function () { this._.output = []; this._.indent = 0; this._.indentation = ""; this._.afterCloser = 0; this._.inPre = 0; this._.needsSpace = 0 }, setRules: function (b, f) { var d = this._.rules[b]; d ? CKEDITOR.tools.extend(d, f, !0) : this._.rules[b] = f }
            }
        }); (function () {
            CKEDITOR.plugins.add("iframe", {
                requires: "dialog,fakeobjects", onLoad: function () {
                    CKEDITOR.addCss("img.cke_iframe{background-image: url(" + CKEDITOR.getUrl(this.path +
                        "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")
                }, init: function (b) {
                    var f = b.lang.iframe, d = "iframe[align,longdesc,tabindex,frameborder,height,name,scrolling,src,title,width]"; b.plugins.dialogadvtab && (d += ";iframe" + b.plugins.dialogadvtab.allowedContent({ id: 1, classes: 1, styles: 1 })); CKEDITOR.dialog.add("iframe", this.path + "dialogs/iframe.js"); b.addCommand("iframe", new CKEDITOR.dialogCommand("iframe", {
                        allowedContent: d,
                        requiredContent: "iframe"
                    })); b.ui.addButton && b.ui.addButton("Iframe", { label: f.toolbar, command: "iframe", toolbar: "insert,80" }); b.on("doubleclick", function (a) { var b = a.data.element; b.is("img") && "iframe" == b.data("cke-real-element-type") && (a.data.dialog = "iframe") }); b.addMenuItems && b.addMenuItems({ iframe: { label: f.title, command: "iframe", group: "image" } }); b.contextMenu && b.contextMenu.addListener(function (a) { if (a && a.is("img") && "iframe" == a.data("cke-real-element-type")) return { iframe: CKEDITOR.TRISTATE_OFF } })
                },
                afterInit: function (b) { var f = b.dataProcessor; (f = f && f.dataFilter) && f.addRules({ elements: { iframe: function (d) { return b.createFakeParserElement(d, "cke_iframe", "iframe", !0) } } }) }
            })
        })(); (function () {
            function b(b, a) { a || (a = b.getSelection().getSelectedElement()); if (a && a.is("img") && !a.data("cke-realelement") && !a.isReadOnly()) return a } function f(b) { var a = b.getStyle("float"); if ("inherit" == a || "none" == a) a = 0; a || (a = b.getAttribute("align")); return a } CKEDITOR.plugins.add("image", {
                requires: "dialog", init: function (d) {
                    if (!d.plugins.detectConflict("image",
                        ["easyimage", "image2"])) {
                            CKEDITOR.dialog.add("image", this.path + "dialogs/image.js"); var a = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}"; CKEDITOR.dialog.isTabEnabled(d, "image", "advanced") && (a = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)"); d.addCommand("image", new CKEDITOR.dialogCommand("image", {
                                allowedContent: a, requiredContent: "img[alt,src]", contentTransformations: [["img{width}: sizeToStyle", "img[width]: sizeToAttribute"], ["img{float}: alignmentToStyle",
                                    "img[align]: alignmentToAttribute"]]
                            })); d.ui.addButton && d.ui.addButton("Image", { label: d.lang.common.image, command: "image", toolbar: "insert,10" }); d.on("doubleclick", function (a) { var b = a.data.element; !b.is("img") || b.data("cke-realelement") || b.isReadOnly() || (a.data.dialog = "image") }); d.addMenuItems && d.addMenuItems({ image: { label: d.lang.image.menu, command: "image", group: "image" } }); d.contextMenu && d.contextMenu.addListener(function (a) { if (b(d, a)) return { image: CKEDITOR.TRISTATE_OFF } })
                    }
                }, afterInit: function (d) {
                    function a(a) {
                        var m =
                            d.getCommand("justify" + a); if (m) { if ("left" == a || "right" == a) m.on("exec", function (h) { var l = b(d), e; l && (e = f(l), e == a ? (l.removeStyle("float"), a == f(l) && l.removeAttribute("align")) : l.setStyle("float", a), h.cancel()) }); m.on("refresh", function (h) { var l = b(d); l && (l = f(l), this.setState(l == a ? CKEDITOR.TRISTATE_ON : "right" == a || "left" == a ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), h.cancel()) }) }
                    } d.plugins.image2 || (a("left"), a("right"), a("center"), a("block"))
                }
            })
        })(); CKEDITOR.config.image_removeLinkByEmptyURL = !0; (function () {
            function b(a,
                b) { var m, h; b.on("refresh", function (a) { var b = [f], c; for (c in a.data.states) b.push(a.data.states[c]); this.setState(CKEDITOR.tools.search(b, d) ? d : f) }, b, null, 100); b.on("exec", function (b) { m = a.getSelection(); h = m.createBookmarks(1); b.data || (b.data = {}); b.data.done = !1 }, b, null, 0); b.on("exec", function () { a.forceNextSelectionCheck(); m.selectBookmarks(h) }, b, null, 100) } var f = CKEDITOR.TRISTATE_DISABLED, d = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indent", {
                    init: function (a) {
                        var c = CKEDITOR.plugins.indent.genericDefinition;
                        b(a, a.addCommand("indent", new c(!0))); b(a, a.addCommand("outdent", new c)); a.ui.addButton && (a.ui.addButton("Indent", { label: a.lang.indent.indent, command: "indent", directional: !0, toolbar: "indent,20" }), a.ui.addButton("Outdent", { label: a.lang.indent.outdent, command: "outdent", directional: !0, toolbar: "indent,10" })); a.on("dirChanged", function (b) {
                            var c = a.createRange(), d = b.data.node; c.setStartBefore(d); c.setEndAfter(d); for (var e = new CKEDITOR.dom.walker(c), f; f = e.next();)if (f.type == CKEDITOR.NODE_ELEMENT) if (!f.equals(d) &&
                                f.getDirection()) c.setStartAfter(f), e = new CKEDITOR.dom.walker(c); else { var g = a.config.indentClasses; if (g) for (var n = "ltr" == b.data.dir ? ["_rtl", ""] : ["", "_rtl"], q = 0; q < g.length; q++)f.hasClass(g[q] + n[0]) && (f.removeClass(g[q] + n[0]), f.addClass(g[q] + n[1])); g = f.getStyle("margin-right"); n = f.getStyle("margin-left"); g ? f.setStyle("margin-left", g) : f.removeStyle("margin-left"); n ? f.setStyle("margin-right", n) : f.removeStyle("margin-right") }
                        })
                    }
                }); CKEDITOR.plugins.indent = {
                    genericDefinition: function (a) {
                        this.isIndent = !!a;
                        this.startDisabled = !this.isIndent
                    }, specificDefinition: function (a, b, d) { this.name = b; this.editor = a; this.jobs = {}; this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR; this.isIndent = !!d; this.relatedGlobal = d ? "indent" : "outdent"; this.indentKey = d ? 9 : CKEDITOR.SHIFT + 9; this.database = {} }, registerCommands: function (a, b) {
                        a.on("pluginsLoaded", function () {
                            for (var a in b) (function (a, b) {
                                var c = a.getCommand(b.relatedGlobal), d; for (d in b.jobs) c.on("exec", function (c) {
                                    c.data.done || (a.fire("lockSnapshot"), b.execJob(a, d) && (c.data.done =
                                        !0), a.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(b.database))
                                }, this, null, d), c.on("refresh", function (c) { c.data.states || (c.data.states = {}); c.data.states[b.name + "@" + d] = b.refreshJob(a, d, c.data.path) }, this, null, d); a.addFeature(b)
                            })(this, b[a])
                        })
                    }
                }; CKEDITOR.plugins.indent.genericDefinition.prototype = { context: "p", exec: function () { } }; CKEDITOR.plugins.indent.specificDefinition.prototype = {
                    execJob: function (a, b) { var d = this.jobs[b]; if (d.state != f) return d.exec.call(this, a) }, refreshJob: function (a,
                        b, d) { b = this.jobs[b]; a.activeFilter.checkFeature(this) ? b.state = b.refresh.call(this, a, d) : b.state = f; return b.state }, getContext: function (a) { return a.contains(this.context) }
                }
        })(); (function () {
            function b(a, b, c) {
                if (!a.getCustomData("indent_processed")) {
                    var d = this.editor, g = this.isIndent; if (b) {
                        d = a.$.className.match(this.classNameRegex); c = 0; d && (d = d[1], c = CKEDITOR.tools.indexOf(b, d) + 1); if (0 > (c += g ? 1 : -1)) return; c = Math.min(c, b.length); c = Math.max(c, 0); a.$.className = CKEDITOR.tools.ltrim(a.$.className.replace(this.classNameRegex,
                            "")); 0 < c && a.addClass(b[c - 1])
                    } else { b = f(a, c); c = parseInt(a.getStyle(b), 10); var m = d.config.indentOffset || 40; isNaN(c) && (c = 0); c += (g ? 1 : -1) * m; if (0 > c) return; c = Math.max(c, 0); c = Math.ceil(c / m) * m; a.setStyle(b, c ? c + (d.config.indentUnit || "px") : ""); "" === a.getAttribute("style") && a.removeAttribute("style") } CKEDITOR.dom.element.setMarker(this.database, a, "indent_processed", 1)
                }
            } function f(a, b) { return "ltr" == (b || a.getComputedStyle("direction")) ? "margin-left" : "margin-right" } var d = CKEDITOR.dtd.$listItem, a = CKEDITOR.dtd.$list,
                c = CKEDITOR.TRISTATE_DISABLED, m = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indentblock", {
                    requires: "indent", init: function (h) {
                        function l() {
                            e.specificDefinition.apply(this, arguments); this.allowedContent = { "div h1 h2 h3 h4 h5 h6 ol p pre ul": { propertiesOnly: !0, styles: k ? null : "margin-left,margin-right", classes: k || null } }; this.contentTransformations = [["div: splitMarginShorthand"], ["h1: splitMarginShorthand"], ["h2: splitMarginShorthand"], ["h3: splitMarginShorthand"], ["h4: splitMarginShorthand"], ["h5: splitMarginShorthand"],
                            ["h6: splitMarginShorthand"], ["ol: splitMarginShorthand"], ["p: splitMarginShorthand"], ["pre: splitMarginShorthand"], ["ul: splitMarginShorthand"]]; this.enterBr && (this.allowedContent.div = !0); this.requiredContent = (this.enterBr ? "div" : "p") + (k ? "(" + k.join(",") + ")" : "{margin-left}"); this.jobs = {
                                20: {
                                    refresh: function (a, b) {
                                        var e = b.block || b.blockLimit; if (!e.is(d)) var h = e.getAscendant(d), e = h && b.contains(h) || e; e.is(d) && (e = e.getParent()); if (this.enterBr || this.getContext(b)) {
                                            if (k) {
                                                var h = k, e = e.$.className.match(this.classNameRegex),
                                                l = this.isIndent, h = e ? l ? e[1] != h.slice(-1) : !0 : l; return h ? m : c
                                            } return this.isIndent ? m : e ? CKEDITOR[0 >= (parseInt(e.getStyle(f(e)), 10) || 0) ? "TRISTATE_DISABLED" : "TRISTATE_OFF"] : c
                                        } return c
                                    }, exec: function (c) { var e = c.getSelection(), e = e && e.getRanges()[0], d; if (d = c.elementPath().contains(a)) b.call(this, d, k); else for (e = e.createIterator(), c = c.config.enterMode, e.enforceRealBlocks = !0, e.enlargeBr = c != CKEDITOR.ENTER_BR; d = e.getNextParagraph(c == CKEDITOR.ENTER_P ? "p" : "div");)d.isReadOnly() || b.call(this, d, k); return !0 }
                                }
                            }
                        } var e =
                            CKEDITOR.plugins.indent, k = h.config.indentClasses; e.registerCommands(h, { indentblock: new l(h, "indentblock", !0), outdentblock: new l(h, "outdentblock") }); CKEDITOR.tools.extend(l.prototype, e.specificDefinition.prototype, { context: { div: 1, dl: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, p: 1, pre: 1, table: 1 }, classNameRegex: k ? new RegExp("(?:^|\\s+)(" + k.join("|") + ")(?\x3d$|\\s)") : null })
                    }
                })
        })(); (function () {
            function b(a) {
                function b(e) {
                    for (var f = m.startContainer, t = m.endContainer; f && !f.getParent().equals(e);)f = f.getParent();
                    for (; t && !t.getParent().equals(e);)t = t.getParent(); if (!f || !t) return !1; for (var p = [], w = !1; !w;)f.equals(t) && (w = !0), p.push(f), f = f.getNext(); if (1 > p.length) return !1; f = e.getParents(!0); for (t = 0; t < f.length; t++)if (f[t].getName && h[f[t].getName()]) { e = f[t]; break } for (var f = c.isIndent ? 1 : -1, t = p[0], p = p[p.length - 1], w = CKEDITOR.plugins.list.listToArray(e, g), z = w[p.getCustomData("listarray_index")].indent, t = t.getCustomData("listarray_index"); t <= p.getCustomData("listarray_index"); t++)if (w[t].indent += f, 0 < f) {
                        for (var A = w[t].parent,
                            C = t - 1; 0 <= C; C--)if (w[C].indent === f) { A = w[C].parent; break } w[t].parent = new CKEDITOR.dom.element(A.getName(), A.getDocument())
                    } for (t = p.getCustomData("listarray_index") + 1; t < w.length && w[t].indent > z; t++)w[t].indent += f; f = CKEDITOR.plugins.list.arrayToList(w, g, null, a.config.enterMode, e.getDirection()); if (!c.isIndent) { var u; if ((u = e.getParent()) && u.is("li")) for (var p = f.listNode.getChildren(), F = [], r, t = p.count() - 1; 0 <= t; t--)(r = p.getItem(t)) && r.is && r.is("li") && F.push(r) } f && f.listNode.replace(e); if (F && F.length) for (t =
                        0; t < F.length; t++) { for (r = e = F[t]; (r = r.getNext()) && r.is && r.getName() in h;)CKEDITOR.env.needsNbspFiller && !e.getFirst(d) && e.append(m.document.createText(" ")), e.append(r); e.insertAfter(u) } f && a.fire("contentDomInvalidated"); return !0
                } for (var c = this, g = this.database, h = this.context, m, u = a.getSelection(), u = (u && u.getRanges()).createIterator(); m = u.getNextRange();) {
                    for (var r = m.getCommonAncestor(); r && (r.type != CKEDITOR.NODE_ELEMENT || !h[r.getName()]);) { if (a.editable().equals(r)) { r = !1; break } r = r.getParent() } r || (r = m.startPath().contains(h)) &&
                        m.setEndAt(r, CKEDITOR.POSITION_BEFORE_END); if (!r) { var p = m.getEnclosedNode(); p && p.type == CKEDITOR.NODE_ELEMENT && p.getName() in h && (m.setStartAt(p, CKEDITOR.POSITION_AFTER_START), m.setEndAt(p, CKEDITOR.POSITION_BEFORE_END), r = p) } r && m.startContainer.type == CKEDITOR.NODE_ELEMENT && m.startContainer.getName() in h && (p = new CKEDITOR.dom.walker(m), p.evaluator = f, m.startContainer = p.next()); r && m.endContainer.type == CKEDITOR.NODE_ELEMENT && m.endContainer.getName() in h && (p = new CKEDITOR.dom.walker(m), p.evaluator = f, m.endContainer =
                            p.previous()); if (r) return b(r)
                } return 0
            } function f(a) { return a.type == CKEDITOR.NODE_ELEMENT && a.is("li") } function d(b) { return a(b) && c(b) } var a = CKEDITOR.dom.walker.whitespaces(!0), c = CKEDITOR.dom.walker.bookmark(!1, !0), m = CKEDITOR.TRISTATE_DISABLED, h = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indentlist", {
                requires: "indent", init: function (a) {
                    function c(a) {
                        d.specificDefinition.apply(this, arguments); this.requiredContent = ["ul", "ol"]; a.on("key", function (b) {
                            var c = a.elementPath(); if ("wysiwyg" == a.mode && b.data.keyCode ==
                                this.indentKey && c) { var e = this.getContext(c); !e || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, c, e) || (a.execCommand(this.relatedGlobal), b.cancel()) }
                        }, this); this.jobs[this.isIndent ? 10 : 30] = { refresh: this.isIndent ? function (a, b) { var c = this.getContext(b), e = CKEDITOR.plugins.indentList.firstItemInPath(this.context, b, c); return c && this.isIndent && !e ? h : m } : function (a, b) { return !this.getContext(b) || this.isIndent ? m : h }, exec: CKEDITOR.tools.bind(b, this) }
                    } var d = CKEDITOR.plugins.indent; d.registerCommands(a,
                        { indentlist: new c(a, "indentlist", !0), outdentlist: new c(a, "outdentlist") }); CKEDITOR.tools.extend(c.prototype, d.specificDefinition.prototype, { context: { ol: 1, ul: 1 } })
                }
            }); CKEDITOR.plugins.indentList = {}; CKEDITOR.plugins.indentList.firstItemInPath = function (a, b, c) { var d = b.contains(f); c || (c = b.contains(a)); return c && d && d.equals(c.getFirst(f)) }
        })(); (function () {
            function b(a, b) {
                b = void 0 === b || b; var d; if (b) d = a.getComputedStyle("text-align"); else {
                    for (; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align");) {
                        d =
                        a.getParent(); if (!d) break; a = d
                    } d = a.getStyle("text-align") || a.getAttribute("align") || ""
                } d && (d = d.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, "")); !d && b && (d = "rtl" == a.getComputedStyle("direction") ? "right" : "left"); return d
            } function f(a, b, d) {
                this.editor = a; this.name = b; this.value = d; this.context = "p"; b = a.config.justifyClasses; var f = a.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"; if (b) {
                    switch (d) {
                        case "left": this.cssClassName = b[0]; break; case "center": this.cssClassName = b[1]; break; case "right": this.cssClassName =
                            b[2]; break; case "justify": this.cssClassName = b[3]
                    }this.cssClassRegex = new RegExp("(?:^|\\s+)(?:" + b.join("|") + ")(?\x3d$|\\s)"); this.requiredContent = f + "(" + this.cssClassName + ")"
                } else this.requiredContent = f + "{text-align}"; this.allowedContent = { "caption div h1 h2 h3 h4 h5 h6 p pre td th li": { propertiesOnly: !0, styles: this.cssClassName ? null : "text-align", classes: this.cssClassName || null } }; a.config.enterMode == CKEDITOR.ENTER_BR && (this.allowedContent.div = !0)
            } function d(a) {
                var b = a.editor, d = b.createRange(); d.setStartBefore(a.data.node);
                d.setEndAfter(a.data.node); for (var f = new CKEDITOR.dom.walker(d), l; l = f.next();)if (l.type == CKEDITOR.NODE_ELEMENT) if (!l.equals(a.data.node) && l.getDirection()) d.setStartAfter(l), f = new CKEDITOR.dom.walker(d); else { var e = b.config.justifyClasses; e && (l.hasClass(e[0]) ? (l.removeClass(e[0]), l.addClass(e[2])) : l.hasClass(e[2]) && (l.removeClass(e[2]), l.addClass(e[0]))); e = l.getStyle("text-align"); "left" == e ? l.setStyle("text-align", "right") : "right" == e && l.setStyle("text-align", "left") }
            } f.prototype = {
                exec: function (a) {
                    var c =
                        a.getSelection(), d = a.config.enterMode; if (c) {
                            for (var f = c.createBookmarks(), l = c.getRanges(), e = this.cssClassName, k, g, n = a.config.useComputedState, n = void 0 === n || n, q = l.length - 1; 0 <= q; q--)for (k = l[q].createIterator(), k.enlargeBr = d != CKEDITOR.ENTER_BR; g = k.getNextParagraph(d == CKEDITOR.ENTER_P ? "p" : "div");)if (!g.isReadOnly()) {
                                var u = g.getName(), r; r = a.activeFilter.check(u + "{text-align}"); if ((u = a.activeFilter.check(u + "(" + e + ")")) || r) {
                                    g.removeAttribute("align"); g.removeStyle("text-align"); var p = e && (g.$.className = CKEDITOR.tools.ltrim(g.$.className.replace(this.cssClassRegex,
                                        ""))), v = this.state == CKEDITOR.TRISTATE_OFF && (!n || b(g, !0) != this.value); e && u ? v ? g.addClass(e) : p || g.removeAttribute("class") : v && r && g.setStyle("text-align", this.value)
                                }
                            } a.focus(); a.forceNextSelectionCheck(); c.selectBookmarks(f)
                        }
                }, refresh: function (a, c) {
                    var d = c.block || c.blockLimit, f = d.getName(), l = d.equals(a.editable()), f = this.cssClassName ? a.activeFilter.check(f + "(" + this.cssClassName + ")") : a.activeFilter.check(f + "{text-align}"); l && !CKEDITOR.dtd.$list[c.lastElement.getName()] ? this.setState(CKEDITOR.TRISTATE_OFF) :
                        !l && f ? this.setState(b(d, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
                }
            }; CKEDITOR.plugins.add("justify", {
                init: function (a) {
                    if (!a.blockless) {
                        var b = new f(a, "justifyleft", "left"), m = new f(a, "justifycenter", "center"), h = new f(a, "justifyright", "right"), l = new f(a, "justifyblock", "justify"); a.addCommand("justifyleft", b); a.addCommand("justifycenter", m); a.addCommand("justifyright", h); a.addCommand("justifyblock", l); a.ui.addButton &&
                            (a.ui.addButton("JustifyLeft", { label: a.lang.common.alignLeft, command: "justifyleft", toolbar: "align,10" }), a.ui.addButton("JustifyCenter", { label: a.lang.common.center, command: "justifycenter", toolbar: "align,20" }), a.ui.addButton("JustifyRight", { label: a.lang.common.alignRight, command: "justifyright", toolbar: "align,30" }), a.ui.addButton("JustifyBlock", { label: a.lang.common.justify, command: "justifyblock", toolbar: "align,40" })); a.on("dirChanged", d)
                    }
                }
            })
        })(); CKEDITOR.plugins.add("menubutton", {
            requires: "button,menu",
            onLoad: function () {
                var b = function (b) {
                    var d = this._, a = d.menu; d.state !== CKEDITOR.TRISTATE_DISABLED && (d.on && a ? a.hide() : (d.previousState = d.state, a || (a = d.menu = new CKEDITOR.menu(b, { panel: { className: "cke_menu_panel", attributes: { "aria-label": b.lang.common.options } } }), a.onHide = CKEDITOR.tools.bind(function () { var a = this.command ? b.getCommand(this.command).modes : this.modes; this.setState(!a || a[b.mode] ? d.previousState : CKEDITOR.TRISTATE_DISABLED); d.on = 0 }, this), this.onMenu && a.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON),
                        d.on = 1, setTimeout(function () { a.show(CKEDITOR.document.getById(d.id), 4) }, 0)))
                }; CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({ base: CKEDITOR.ui.button, $: function (f) { delete f.panel; this.base(f); this.hasArrow = "menu"; this.click = b }, statics: { handler: { create: function (b) { return new CKEDITOR.ui.menuButton(b) } } } })
            }, beforeInit: function (b) { b.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler) }
        }); CKEDITOR.UI_MENUBUTTON = "menubutton"; "use strict"; (function () {
            CKEDITOR.plugins.add("language", {
                requires: "menubutton",
                init: function (b) {
                    var f = b.config.language_list || ["ar:Arabic:rtl", "fr:French", "es:Spanish"], d = this, a = b.lang.language, c = {}, m, h, l, e; b.addCommand("language", { allowedContent: "span[!lang,!dir]", requiredContent: "span[lang,dir]", contextSensitive: !0, exec: function (a, b) { var e = c["language_" + b]; if (e) a[e.style.checkActive(a.elementPath(), a) ? "removeStyle" : "applyStyle"](e.style) }, refresh: function (a) { this.setState(d.getCurrentLangElement(a) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) } }); for (e = 0; e < f.length; e++)m = f[e].split(":"),
                        h = m[0], l = "language_" + h, c[l] = { label: m[1], langId: h, group: "language", order: e, ltr: "rtl" != ("" + m[2]).toLowerCase(), onClick: function () { b.execCommand("language", this.langId) }, role: "menuitemcheckbox" }, c[l].style = new CKEDITOR.style({ element: "span", attributes: { lang: h, dir: c[l].ltr ? "ltr" : "rtl" } }); c.language_remove = { label: a.remove, group: "language_remove", state: CKEDITOR.TRISTATE_DISABLED, order: c.length, onClick: function () { var a = d.getCurrentLangElement(b); a && b.execCommand("language", a.getAttribute("lang")) } }; b.addMenuGroup("language",
                            1); b.addMenuGroup("language_remove"); b.addMenuItems(c); b.ui.add("Language", CKEDITOR.UI_MENUBUTTON, { label: a.button, allowedContent: "span[!lang,!dir]", requiredContent: "span[lang,dir]", toolbar: "bidi,30", command: "language", onMenu: function () { var a = {}, e = d.getCurrentLangElement(b), f; for (f in c) a[f] = CKEDITOR.TRISTATE_OFF; a.language_remove = e ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; e && (a["language_" + e.getAttribute("lang")] = CKEDITOR.TRISTATE_ON); return a } }); b.addRemoveFormatFilter && b.addRemoveFormatFilter(function (a) {
                                return !(a.is("span") &&
                                    a.getAttribute("dir") && a.getAttribute("lang"))
                            })
                }, getCurrentLangElement: function (b) { var f = b.elementPath(); b = f && f.elements; var d; if (f) for (var a = 0; a < b.length; a++)f = b[a], !d && "span" == f.getName() && f.hasAttribute("dir") && f.hasAttribute("lang") && (d = f); return d }
            })
        })(); "use strict"; (function () {
            function b(a) { return a.replace(/'/g, "\\$\x26") } function f(a) { for (var b = a.length, c = [], e, d = 0; d < b; d++)e = a.charCodeAt(d), c.push(e); return "String.fromCharCode(" + c.join(",") + ")" } function d(a, c) {
                for (var e = a.plugins.link, d =
                    e.compiledProtectionFunction.params, e = [e.compiledProtectionFunction.name, "("], f, g, h = 0; h < d.length; h++)f = d[h].toLowerCase(), g = c[f], 0 < h && e.push(","), e.push("'", g ? b(encodeURIComponent(c[f])) : "", "'"); e.push(")"); return e.join("")
            } function a(a) { a = a.config.emailProtection || ""; var b; a && "encode" != a && (b = {}, a.replace(/^([^(]+)\(([^)]+)\)$/, function (a, c, e) { b.name = c; b.params = []; e.replace(/[^,\s]+/g, function (a) { b.params.push(a) }) })); return b } CKEDITOR.plugins.add("link", {
                requires: "dialog,fakeobjects", onLoad: function () {
                    function a(b) {
                        return c.replace(/%1/g,
                            "rtl" == b ? "right" : "left").replace(/%2/g, "cke_contents_" + b)
                    } var b = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;", c = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + b + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}"; CKEDITOR.addCss(a("ltr") + a("rtl"))
                },
                init: function (b) {
                    var c = "a[!href]"; CKEDITOR.dialog.isTabEnabled(b, "link", "advanced") && (c = c.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)")); CKEDITOR.dialog.isTabEnabled(b, "link", "target") && (c = c.replace("]", ",target,onclick]")); b.addCommand("link", new CKEDITOR.dialogCommand("link", { allowedContent: c, requiredContent: "a[href]" })); b.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", { allowedContent: "a[!name,id]", requiredContent: "a[name]" })); b.addCommand("unlink",
                        new CKEDITOR.unlinkCommand); b.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand); b.setKeystroke(CKEDITOR.CTRL + 76, "link"); b.setKeystroke(CKEDITOR.CTRL + 75, "link"); b.ui.addButton && (b.ui.addButton("Link", { label: b.lang.link.toolbar, command: "link", toolbar: "links,10" }), b.ui.addButton("Unlink", { label: b.lang.link.unlink, command: "unlink", toolbar: "links,20" }), b.ui.addButton("Anchor", { label: b.lang.link.anchor.toolbar, command: "anchor", toolbar: "links,30" })); CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
                    CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js"); b.on("doubleclick", function (a) { var c = a.data.element.getAscendant({ a: 1, img: 1 }, !0); c && !c.isReadOnly() && (c.is("a") ? (a.data.dialog = !c.getAttribute("name") || c.getAttribute("href") && c.getChildCount() ? "link" : "anchor", a.data.link = c) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, c) && (a.data.dialog = "anchor")) }, null, null, 0); b.on("doubleclick", function (a) { a.data.dialog in { link: 1, anchor: 1 } && a.data.link && b.getSelection().selectElement(a.data.link) }, null,
                        null, 20); b.addMenuItems && b.addMenuItems({ anchor: { label: b.lang.link.anchor.menu, command: "anchor", group: "anchor", order: 1 }, removeAnchor: { label: b.lang.link.anchor.remove, command: "removeAnchor", group: "anchor", order: 5 }, link: { label: b.lang.link.menu, command: "link", group: "link", order: 1 }, unlink: { label: b.lang.link.unlink, command: "unlink", group: "link", order: 5 } }); b.contextMenu && b.contextMenu.addListener(function (a) {
                            if (!a || a.isReadOnly()) return null; a = CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, a); if (!a && !(a =
                                CKEDITOR.plugins.link.getSelectedLink(b))) return null; var c = {}; a.getAttribute("href") && a.getChildCount() && (c = { link: CKEDITOR.TRISTATE_OFF, unlink: CKEDITOR.TRISTATE_OFF }); a && a.hasAttribute("name") && (c.anchor = c.removeAnchor = CKEDITOR.TRISTATE_OFF); return c
                        }); this.compiledProtectionFunction = a(b)
                }, afterInit: function (a) {
                    a.dataProcessor.dataFilter.addRules({ elements: { a: function (b) { return b.attributes.name ? b.children.length ? null : a.createFakeParserElement(b, "cke_anchor", "anchor") : null } } }); var b = a._.elementsPath &&
                        a._.elementsPath.filters; b && b.push(function (b, c) { if ("a" == c && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b) || b.getAttribute("name") && (!b.getAttribute("href") || !b.getChildCount()))) return "anchor" })
                }
            }); var c = /^javascript:/, m = /^(?:mailto)(?:(?!\?(subject|body)=).)+/i, h = /subject=([^;?:@&=$,\/]*)/i, l = /body=([^;?:@&=$,\/]*)/i, e = /^#(.*)$/, k = /^((?:http|https|ftp|news):\/\/)?(.*)$/, g = /^(_(?:self|top|parent|blank))$/, n = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,
                q = /^javascript:([^(]+)\(([^)]+)\)$/, u = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/, r = /(?:^|,)([^=]+)=(\d+|yes|no)/gi, p = /^tel:(.*)$/, v = { id: "advId", dir: "advLangDir", accessKey: "advAccessKey", name: "advName", lang: "advLangCode", tabindex: "advTabIndex", title: "advTitle", type: "advContentType", "class": "advCSSClasses", charset: "advCharset", style: "advStyles", rel: "advRel" }; CKEDITOR.plugins.link = {
                    getSelectedLink: function (a, b) {
                        var c = a.getSelection(), e = c.getSelectedElement(),
                        d = c.getRanges(), f = [], g; if (!b && e && e.is("a")) return e; for (e = 0; e < d.length; e++)if (g = c.getRanges()[e], g.shrink(CKEDITOR.SHRINK_ELEMENT, !0, { skipBogus: !0 }), (g = a.elementPath(g.getCommonAncestor()).contains("a", 1)) && b) f.push(g); else if (g) return g; return b ? f : null
                    }, getEditorAnchors: function (a) {
                        for (var b = a.editable(), c = b.isInline() && !a.plugins.divarea ? a.document : b, b = c.getElementsByTag("a"), c = c.getElementsByTag("img"), e = [], d = 0, f; f = b.getItem(d++);)(f.data("cke-saved-name") || f.hasAttribute("name")) && e.push({
                            name: f.data("cke-saved-name") ||
                                f.getAttribute("name"), id: f.getAttribute("id")
                        }); for (d = 0; f = c.getItem(d++);)(f = this.tryRestoreFakeAnchor(a, f)) && e.push({ name: f.getAttribute("name"), id: f.getAttribute("id") }); return e
                    }, fakeAnchor: !0, tryRestoreFakeAnchor: function (a, b) { if (b && b.data("cke-real-element-type") && "anchor" == b.data("cke-real-element-type")) { var c = a.restoreRealElement(b); if (c.data("cke-saved-name")) return c } }, parseLinkAttributes: function (a, b) {
                        var d = b && (b.data("cke-saved-href") || b.getAttribute("href")) || "", f = a.plugins.link.compiledProtectionFunction,
                        z = a.config.emailProtection, A = {}, C; d.match(c) && ("encode" == z ? d = d.replace(n, function (a, b, c) { c = c || ""; return "mailto:" + String.fromCharCode.apply(String, b.split(",")) + c.replace(/\\'/g, "'") }) : z && d.replace(q, function (a, b, c) { if (b == f.name) { A.type = "email"; a = A.email = {}; b = /(^')|('$)/g; c = c.match(/[^,\s]+/g); for (var e = c.length, d, g, h = 0; h < e; h++)d = decodeURIComponent, g = c[h].replace(b, "").replace(/\\'/g, "'"), g = d(g), d = f.params[h].toLowerCase(), a[d] = g; a.address = [a.name, a.domain].join("@") } })); if (!A.type) if (z = d.match(e)) A.type =
                            "anchor", A.anchor = {}, A.anchor.name = A.anchor.id = z[1]; else if (z = d.match(p)) A.type = "tel", A.tel = z[1]; else if (z = d.match(m)) { C = d.match(h); var d = d.match(l), D = A.email = {}; A.type = "email"; D.address = z[0].replace("mailto:", ""); C && (D.subject = decodeURIComponent(C[1])); d && (D.body = decodeURIComponent(d[1])) } else d && (C = d.match(k)) && (A.type = "url", A.url = {}, A.url.protocol = C[1], A.url.url = C[2]); if (b) {
                                if (d = b.getAttribute("target")) A.target = { type: d.match(g) ? d : "frame", name: d }; else if (d = (d = b.data("cke-pa-onclick") || b.getAttribute("onclick")) &&
                                    d.match(u)) for (A.target = { type: "popup", name: d[1] }; z = r.exec(d[2]);)"yes" != z[2] && "1" != z[2] || z[1] in { height: 1, width: 1, top: 1, left: 1 } ? isFinite(z[2]) && (A.target[z[1]] = z[2]) : A.target[z[1]] = !0; null !== b.getAttribute("download") && (A.download = !0); var d = {}, F; for (F in v) (z = b.getAttribute(F)) && (d[v[F]] = z); if (F = b.data("cke-saved-name") || d.advName) d.advName = F; CKEDITOR.tools.isEmpty(d) || (A.advanced = d)
                            } return A
                    }, getLinkAttributes: function (a, c) {
                        var e = a.config.emailProtection || "", g = {}; switch (c.type) {
                            case "url": var e = c.url &&
                                void 0 !== c.url.protocol ? c.url.protocol : "http://", h = c.url && CKEDITOR.tools.trim(c.url.url) || ""; g["data-cke-saved-href"] = 0 === h.indexOf("/") ? h : e + h; break; case "anchor": e = c.anchor && c.anchor.id; g["data-cke-saved-href"] = "#" + (c.anchor && c.anchor.name || e || ""); break; case "email": var k = c.email, h = k.address; switch (e) {
                                    case "": case "encode": var l = encodeURIComponent(k.subject || ""), m = encodeURIComponent(k.body || ""), k = []; l && k.push("subject\x3d" + l); m && k.push("body\x3d" + m); k = k.length ? "?" + k.join("\x26") : ""; "encode" == e ? (e =
                                        ["javascript:void(location.href\x3d'mailto:'+", f(h)], k && e.push("+'", b(k), "'"), e.push(")")) : e = ["mailto:", h, k]; break; default: e = h.split("@", 2), k.name = e[0], k.domain = e[1], e = ["javascript:", d(a, k)]
                                }g["data-cke-saved-href"] = e.join(""); break; case "tel": g["data-cke-saved-href"] = "tel:" + c.tel
                        }if (c.target) if ("popup" == c.target.type) {
                            for (var e = ["window.open(this.href, '", c.target.name || "", "', '"], n = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "), h = n.length, l = function (a) {
                                c.target[a] &&
                                n.push(a + "\x3d" + c.target[a])
                            }, k = 0; k < h; k++)n[k] += c.target[n[k]] ? "\x3dyes" : "\x3dno"; l("width"); l("left"); l("height"); l("top"); e.push(n.join(","), "'); return false;"); g["data-cke-pa-onclick"] = e.join("")
                        } else "notSet" != c.target.type && c.target.name && (g.target = c.target.name); c.download && (g.download = ""); if (c.advanced) { for (var p in v) (e = c.advanced[v[p]]) && (g[p] = e); g.name && (g["data-cke-saved-name"] = g.name) } g["data-cke-saved-href"] && (g.href = g["data-cke-saved-href"]); p = {
                            target: 1, onclick: 1, "data-cke-pa-onclick": 1,
                            "data-cke-saved-name": 1, download: 1
                        }; c.advanced && CKEDITOR.tools.extend(p, v); for (var q in g) delete p[q]; return { set: g, removed: CKEDITOR.tools.object.keys(p) }
                    }, showDisplayTextForElement: function (a, b) { var c = { img: 1, table: 1, tbody: 1, thead: 1, tfoot: 1, input: 1, select: 1, textarea: 1 }, e = b.getSelection(); return b.widgets && b.widgets.focused || e && 1 < e.getRanges().length ? !1 : !a || !a.getName || !a.is(c) }
                }; CKEDITOR.unlinkCommand = function () { }; CKEDITOR.unlinkCommand.prototype = {
                    exec: function (a) {
                        if (CKEDITOR.env.ie) {
                            var b = a.getSelection().getRanges()[0],
                            c = b.getPreviousEditableNode() && b.getPreviousEditableNode().getAscendant("a", !0) || b.getNextEditableNode() && b.getNextEditableNode().getAscendant("a", !0), e; b.collapsed && c && (e = b.createBookmark(), b.selectNodeContents(c), b.select())
                        } c = new CKEDITOR.style({ element: "a", type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1 }); a.removeStyle(c); e && (b.moveToBookmark(e), b.select())
                    }, refresh: function (a, b) {
                        var c = b.lastElement && b.lastElement.getAscendant("a", !0); c && "a" == c.getName() && c.getAttribute("href") && c.getChildCount() ?
                            this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
                    }, contextSensitive: 1, startDisabled: 1, requiredContent: "a[href]", editorFocus: 1
                }; CKEDITOR.removeAnchorCommand = function () { }; CKEDITOR.removeAnchorCommand.prototype = {
                    exec: function (a) {
                        var b = a.getSelection(), c = b.createBookmarks(), e; if (b && (e = b.getSelectedElement()) && (e.getChildCount() ? e.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, e))) e.remove(1); else if (e = CKEDITOR.plugins.link.getSelectedLink(a)) e.hasAttribute("href") ? (e.removeAttributes({
                            name: 1,
                            "data-cke-saved-name": 1
                        }), e.removeClass("cke_anchor")) : e.remove(1); b.selectBookmarks(c)
                    }, requiredContent: "a[name]"
                }; CKEDITOR.tools.extend(CKEDITOR.config, { linkShowAdvancedTab: !0, linkShowTargetTab: !0, linkDefaultProtocol: "http://" })
        })(); (function () {
            function b(a, b, c, e) {
                for (var d = CKEDITOR.plugins.list.listToArray(b.root, c), f = [], g = 0; g < b.contents.length; g++) {
                    var h = b.contents[g]; (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (f.push(h), CKEDITOR.dom.element.setMarker(c, h, "list_item_processed",
                        !0))
                } for (var h = b.root.getDocument(), k, l, g = 0; g < f.length; g++) { var m = f[g].getCustomData("listarray_index"); k = d[m].parent; k.is(this.type) || (l = h.createElement(this.type), k.copyAttributes(l, { start: 1, type: 1 }), l.removeStyle("list-style-type"), d[m].parent = l) } c = CKEDITOR.plugins.list.arrayToList(d, c, null, a.config.enterMode); for (var n, d = c.listNode.getChildCount(), g = 0; g < d && (n = c.listNode.getChild(g)); g++)n.getName() == this.type && e.push(n); c.listNode.replace(b.root); a.fire("contentDomInvalidated")
            } function f(a, b,
                c) {
                    var e = b.contents, d = b.root.getDocument(), f = []; if (1 == e.length && e[0].equals(b.root)) { var g = d.createElement("div"); e[0].moveChildren && e[0].moveChildren(g); e[0].append(g); e[0] = g } b = b.contents[0].getParent(); for (g = 0; g < e.length; g++)b = b.getCommonAncestor(e[g].getParent()); a = a.config.useComputedState; var h, k; a = void 0 === a || a; for (g = 0; g < e.length; g++)for (var l = e[g], m; m = l.getParent();) { if (m.equals(b)) { f.push(l); !k && l.getDirection() && (k = 1); l = l.getDirection(a); null !== h && (h = h && h != l ? null : l); break } l = m } if (!(1 > f.length)) {
                        e =
                        f[f.length - 1].getNext(); g = d.createElement(this.type); for (c.push(g); f.length;)c = f.shift(), a = d.createElement("li"), l = c, l.is("pre") || r.test(l.getName()) || "false" == l.getAttribute("contenteditable") ? c.appendTo(a) : (c.copyAttributes(a), h && c.getDirection() && (a.removeStyle("direction"), a.removeAttribute("dir")), c.moveChildren(a), c.remove()), a.appendTo(g); h && k && g.setAttribute("dir", h); e ? g.insertBefore(e) : g.appendTo(b)
                    }
            } function d(a, b, c) {
                function e(c) {
                    if (!(!(l = k[c ? "getFirst" : "getLast"]()) || l.is && l.isBlockBoundary() ||
                        !(m = b.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || m.is && m.isBlockBoundary({ br: 1 }))) a.document.createElement("br")[c ? "insertBefore" : "insertAfter"](l)
                } for (var d = CKEDITOR.plugins.list.listToArray(b.root, c), f = [], g = 0; g < b.contents.length; g++) { var h = b.contents[g]; (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (f.push(h), CKEDITOR.dom.element.setMarker(c, h, "list_item_processed", !0)) } h = null; for (g = 0; g < f.length; g++)h = f[g].getCustomData("listarray_index"), d[h].indent =
                    -1; for (g = h + 1; g < d.length; g++)if (d[g].indent > d[g - 1].indent + 1) { f = d[g - 1].indent + 1 - d[g].indent; for (h = d[g].indent; d[g] && d[g].indent >= h;)d[g].indent += f, g++; g-- } var k = CKEDITOR.plugins.list.arrayToList(d, c, null, a.config.enterMode, b.root.getAttribute("dir")).listNode, l, m; e(!0); e(); k.replace(b.root); a.fire("contentDomInvalidated")
            } function a(a, b) { this.name = a; this.context = this.type = b; this.allowedContent = b + " li"; this.requiredContent = b } function c(a, b, c, e) {
                for (var d, f; d = a[e ? "getLast" : "getFirst"](p);)(f = d.getDirection(1)) !==
                    b.getDirection(1) && d.setAttribute("dir", f), d.remove(), c ? d[e ? "insertBefore" : "insertAfter"](c) : b.append(d, e), c = d
            } function m(a) { function b(e) { var d = a[e ? "getPrevious" : "getNext"](q); d && d.type == CKEDITOR.NODE_ELEMENT && d.is(a.getName()) && (c(a, d, null, !e), a.remove(), a = d) } b(); b(1) } function h(a) { return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"] } function l(a, b, d) {
                a.fire("saveSnapshot"); d.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
                var f = d.extractContents(); b.trim(!1, !0); var g = b.createBookmark(), h = new CKEDITOR.dom.elementPath(b.startContainer), k = h.block, h = h.lastElement.getAscendant("li", 1) || k, l = new CKEDITOR.dom.elementPath(d.startContainer), n = l.contains(CKEDITOR.dtd.$listItem), l = l.contains(CKEDITOR.dtd.$list); k ? (k = k.getBogus()) && k.remove() : l && (k = l.getPrevious(q)) && u(k) && k.remove(); (k = f.getLast()) && k.type == CKEDITOR.NODE_ELEMENT && k.is("br") && k.remove(); (k = b.startContainer.getChild(b.startOffset)) ? f.insertBefore(k) : b.startContainer.append(f);
                n && (f = e(n)) && (h.contains(n) ? (c(f, n.getParent(), n), f.remove()) : h.append(f)); for (; d.checkStartOfBlock() && d.checkEndOfBlock();) { l = d.startPath(); f = l.block; if (!f) break; f.is("li") && (h = f.getParent(), f.equals(h.getLast(q)) && f.equals(h.getFirst(q)) && (f = h)); d.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START); f.remove() } d = d.clone(); f = a.editable(); d.setEndAt(f, CKEDITOR.POSITION_BEFORE_END); d = new CKEDITOR.dom.walker(d); d.evaluator = function (a) { return q(a) && !u(a) }; (d = d.next()) && d.type == CKEDITOR.NODE_ELEMENT && d.getName() in
                    CKEDITOR.dtd.$list && m(d); b.moveToBookmark(g); b.select(); a.fire("saveSnapshot")
            } function e(a) { return (a = a.getLast(q)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in k ? a : null } var k = { ol: 1, ul: 1 }, g = CKEDITOR.dom.walker.whitespaces(), n = CKEDITOR.dom.walker.bookmark(), q = function (a) { return !(g(a) || n(a)) }, u = CKEDITOR.dom.walker.bogus(); CKEDITOR.plugins.list = {
                listToArray: function (a, b, c, e, d) {
                    if (!k[a.getName()]) return []; e || (e = 0); c || (c = []); for (var f = 0, g = a.getChildCount(); f < g; f++) {
                        var h = a.getChild(f); h.type == CKEDITOR.NODE_ELEMENT &&
                            h.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(h, b, c, e + 1); if ("li" == h.$.nodeName.toLowerCase()) {
                                var l = { parent: a, indent: e, element: h, contents: [] }; d ? l.grandparent = d : (l.grandparent = a.getParent(), l.grandparent && "li" == l.grandparent.$.nodeName.toLowerCase() && (l.grandparent = l.grandparent.getParent())); b && CKEDITOR.dom.element.setMarker(b, h, "listarray_index", c.length); c.push(l); for (var m = 0, n = h.getChildCount(), p; m < n; m++)p = h.getChild(m), p.type == CKEDITOR.NODE_ELEMENT && k[p.getName()] ? CKEDITOR.plugins.list.listToArray(p,
                                    b, c, e + 1, l.grandparent) : l.contents.push(p)
                            }
                    } return c
                }, arrayToList: function (a, b, c, e, d) {
                    c || (c = 0); if (!a || a.length < c + 1) return null; for (var f, g = a[c].parent.getDocument(), h = new CKEDITOR.dom.documentFragment(g), l = null, m = c, p = Math.max(a[c].indent, 0), u = null, r, x, R = e == CKEDITOR.ENTER_P ? "p" : "div"; ;) {
                        var J = a[m]; f = J.grandparent; r = J.element.getDirection(1); if (J.indent == p) {
                            l && a[m].parent.getName() == l.getName() || (l = a[m].parent.clone(!1, 1), d && l.setAttribute("dir", d), h.append(l)); u = l.append(J.element.clone(0, 1)); r != l.getDirection(1) &&
                                u.setAttribute("dir", r); for (f = 0; f < J.contents.length; f++)u.append(J.contents[f].clone(1, 1)); m++
                        } else if (J.indent == Math.max(p, 0) + 1) J = a[m - 1].element.getDirection(1), m = CKEDITOR.plugins.list.arrayToList(a, null, m, e, J != r ? r : null), !u.getChildCount() && CKEDITOR.env.needsNbspFiller && 7 >= g.$.documentMode && u.append(g.createText(" ")), u.append(m.listNode), m = m.nextIndex; else if (-1 == J.indent && !c && f) {
                            k[f.getName()] ? (u = J.element.clone(!1, !0), r != f.getDirection(1) && u.setAttribute("dir", r)) : u = new CKEDITOR.dom.documentFragment(g);
                            var l = f.getDirection(1) != r, L = J.element, Q = L.getAttribute("class"), N = L.getAttribute("style"), K = u.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (e != CKEDITOR.ENTER_BR || l || N || Q), O, Y = J.contents.length, U; for (f = 0; f < Y; f++)if (O = J.contents[f], n(O) && 1 < Y) K ? U = O.clone(1, 1) : u.append(O.clone(1, 1)); else if (O.type == CKEDITOR.NODE_ELEMENT && O.isBlockBoundary()) {
                                l && !O.getDirection() && O.setAttribute("dir", r); x = O; var Z = L.getAttribute("style"); Z && x.setAttribute("style", Z.replace(/([^;])$/, "$1;") + (x.getAttribute("style") || "")); Q &&
                                    O.addClass(Q); x = null; U && (u.append(U), U = null); u.append(O.clone(1, 1))
                            } else K ? (x || (x = g.createElement(R), u.append(x), l && x.setAttribute("dir", r)), N && x.setAttribute("style", N), Q && x.setAttribute("class", Q), U && (x.append(U), U = null), x.append(O.clone(1, 1))) : u.append(O.clone(1, 1)); U && ((x || u).append(U), U = null); u.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && m != a.length - 1 && (CKEDITOR.env.needsBrFiller && (r = u.getLast()) && r.type == CKEDITOR.NODE_ELEMENT && r.is("br") && r.remove(), (r = u.getLast(q)) && r.type == CKEDITOR.NODE_ELEMENT &&
                                r.is(CKEDITOR.dtd.$block) || u.append(g.createElement("br"))); r = u.$.nodeName.toLowerCase(); "div" != r && "p" != r || u.appendBogus(); h.append(u); l = null; m++
                        } else return null; x = null; if (a.length <= m || Math.max(a[m].indent, 0) < p) break
                    } if (b) for (a = h.getFirst(); a;) { if (a.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(b, a), a.getName() in CKEDITOR.dtd.$listItem && (c = a, g = d = e = void 0, e = c.getDirection()))) { for (d = c.getParent(); d && !(g = d.getDirection());)d = d.getParent(); e == g && c.removeAttribute("dir") } a = a.getNextSourceNode() } return {
                        listNode: h,
                        nextIndex: m
                    }
                }
            }; var r = /^h[1-6]$/, p = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT); a.prototype = {
                exec: function (a) {
                    function c(a) { return k[a.root.getName()] && !e(a.root, [CKEDITOR.NODE_COMMENT]) } function e(a, b) { return CKEDITOR.tools.array.filter(a.getChildren().toArray(), function (a) { return -1 === CKEDITOR.tools.array.indexOf(b, a.type) }).length } function g(a) { var b = !0; if (0 === a.getChildCount()) return !1; a.forEach(function (a) { if (a.type !== CKEDITOR.NODE_COMMENT) return b = !1 }, null, !0); return b } this.refresh(a, a.elementPath());
                    var h = a.config, l = a.getSelection(), n = l && l.getRanges(); if (this.state == CKEDITOR.TRISTATE_OFF) { var p = a.editable(); if (p.getFirst(q)) { var u = 1 == n.length && n[0]; (h = u && u.getEnclosedNode()) && h.is && this.type == h.getName() && this.setState(CKEDITOR.TRISTATE_ON) } else h.enterMode == CKEDITOR.ENTER_BR ? p.appendBogus() : n[0].fixBlock(1, h.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), l.selectRanges(n) } for (var h = l.createBookmarks(!0), p = [], r = {}, n = n.createIterator(), x = 0; (u = n.getNextRange()) && ++x;) {
                        var I = u.getBoundaryNodes(), M = I.startNode,
                        E = I.endNode; M.type == CKEDITOR.NODE_ELEMENT && "td" == M.getName() && u.setStartAt(I.startNode, CKEDITOR.POSITION_AFTER_START); E.type == CKEDITOR.NODE_ELEMENT && "td" == E.getName() && u.setEndAt(I.endNode, CKEDITOR.POSITION_BEFORE_END); u = u.createIterator(); for (u.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; I = u.getNextParagraph();)if (!I.getCustomData("list_block") && !g(I)) {
                            CKEDITOR.dom.element.setMarker(r, I, "list_block", 1); for (var R = a.elementPath(I), M = R.elements, E = 0, R = R.blockLimit, J, L = M.length - 1; 0 <= L && (J = M[L]); L--)if (k[J.getName()] &&
                                R.contains(J)) { R.removeCustomData("list_group_object_" + x); (M = J.getCustomData("list_group_object")) ? M.contents.push(I) : (M = { root: J, contents: [I] }, p.push(M), CKEDITOR.dom.element.setMarker(r, J, "list_group_object", M)); E = 1; break } E || (E = R, E.getCustomData("list_group_object_" + x) ? E.getCustomData("list_group_object_" + x).contents.push(I) : (M = { root: E, contents: [I] }, CKEDITOR.dom.element.setMarker(r, E, "list_group_object_" + x, M), p.push(M)))
                        }
                    } for (J = []; 0 < p.length;)M = p.shift(), this.state == CKEDITOR.TRISTATE_OFF ? c(M) || (k[M.root.getName()] ?
                        b.call(this, a, M, r, J) : f.call(this, a, M, J)) : this.state == CKEDITOR.TRISTATE_ON && k[M.root.getName()] && !c(M) && d.call(this, a, M, r); for (L = 0; L < J.length; L++)m(J[L]); CKEDITOR.dom.element.clearAllMarkers(r); l.selectBookmarks(h); a.focus()
                }, refresh: function (a, b) { var c = b.contains(k, 1), e = b.blockLimit || b.root; c && e.contains(c) ? this.setState(c.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF) }
            }; CKEDITOR.plugins.add("list", {
                requires: "indentlist", init: function (b) {
                    b.blockless ||
                    (b.addCommand("numberedlist", new a("numberedlist", "ol")), b.addCommand("bulletedlist", new a("bulletedlist", "ul")), b.ui.addButton && (b.ui.addButton("NumberedList", { label: b.lang.list.numberedlist, command: "numberedlist", directional: !0, toolbar: "list,10" }), b.ui.addButton("BulletedList", { label: b.lang.list.bulletedlist, command: "bulletedlist", directional: !0, toolbar: "list,20" })), b.on("key", function (a) {
                        var c = a.data.domEvent.getKey(), d; if ("wysiwyg" == b.mode && c in { 8: 1, 46: 1 }) {
                            var f = b.getSelection().getRanges()[0],
                            g = f && f.startPath(); if (f && f.collapsed) {
                                var m = 8 == c, n = b.editable(), p = new CKEDITOR.dom.walker(f.clone()); p.evaluator = function (a) { return q(a) && !u(a) }; p.guard = function (a, b) { return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) }; c = f.clone(); if (m) {
                                    var r; (r = g.contains(k)) && f.checkBoundaryOfElement(r, CKEDITOR.START) && (r = r.getParent()) && r.is("li") && (r = e(r)) ? (d = r, r = r.getPrevious(q), c.moveToPosition(r && u(r) ? r : d, CKEDITOR.POSITION_BEFORE_START)) : (p.range.setStartAt(n, CKEDITOR.POSITION_AFTER_START), p.range.setEnd(f.startContainer,
                                        f.startOffset), (r = p.previous()) && r.type == CKEDITOR.NODE_ELEMENT && (r.getName() in k || r.is("li")) && (r.is("li") || (p.range.selectNodeContents(r), p.reset(), p.evaluator = h, r = p.previous()), d = r, c.moveToElementEditEnd(d), c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END))); if (d) l(b, c, f), a.cancel(); else {
                                            var x = g.contains(k); x && f.checkBoundaryOfElement(x, CKEDITOR.START) && (d = x.getFirst(q), f.checkBoundaryOfElement(d, CKEDITOR.START) && (r = x.getPrevious(q), e(d) ? r && (f.moveToElementEditEnd(r), f.select()) :
                                                b.execCommand("outdent"), a.cancel()))
                                        }
                                } else if (d = g.contains("li")) {
                                    if (p.range.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), m = (n = d.getLast(q)) && h(n) ? n : d, g = 0, (r = p.next()) && r.type == CKEDITOR.NODE_ELEMENT && r.getName() in k && r.equals(n) ? (g = 1, r = p.next()) : f.checkBoundaryOfElement(m, CKEDITOR.END) && (g = 2), g && r) {
                                        f = f.clone(); f.moveToElementEditStart(r); if (1 == g && (c.optimize(), !c.startContainer.equals(d))) { for (d = c.startContainer; d.is(CKEDITOR.dtd.$inline);)x = d, d = d.getParent(); x && c.moveToPosition(x, CKEDITOR.POSITION_AFTER_END) } 2 ==
                                            g && (c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END), f.endPath().block && f.moveToPosition(f.endPath().block, CKEDITOR.POSITION_AFTER_START)); l(b, c, f); a.cancel()
                                    }
                                } else p.range.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), (r = p.next()) && r.type == CKEDITOR.NODE_ELEMENT && r.is(k) && (r = r.getFirst(q), g.block && f.checkStartOfBlock() && f.checkEndOfBlock() ? (g.block.remove(), f.moveToElementEditStart(r), f.select()) : e(r) ? (f.moveToElementEditStart(r), f.select()) : (f = f.clone(), f.moveToElementEditStart(r), l(b,
                                    c, f)), a.cancel()); setTimeout(function () { b.selectionChange(1) })
                            }
                        }
                    }))
                }
            })
        })(); (function () {
            CKEDITOR.plugins.liststyle = {
                requires: "dialog,contextmenu", init: function (b) {
                    if (!b.blockless) {
                        var f; f = new CKEDITOR.dialogCommand("numberedListStyle", { requiredContent: "ol", allowedContent: "ol{list-style-type}[start]; li{list-style-type}[value]", contentTransformations: [["ol: listTypeToStyle"]] }); f = b.addCommand("numberedListStyle", f); b.addFeature(f); CKEDITOR.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js");
                        f = new CKEDITOR.dialogCommand("bulletedListStyle", { requiredContent: "ul", allowedContent: "ul{list-style-type}", contentTransformations: [["ul: listTypeToStyle"]] }); f = b.addCommand("bulletedListStyle", f); b.addFeature(f); CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js"); b.addMenuGroup("list", 108); b.addMenuItems({ numberedlist: { label: b.lang.liststyle.numberedTitle, group: "list", command: "numberedListStyle" }, bulletedlist: { label: b.lang.liststyle.bulletedTitle, group: "list", command: "bulletedListStyle" } });
                        b.contextMenu.addListener(function (b) { if (!b || b.isReadOnly()) return null; for (; b;) { var a = b.getName(); if ("ol" == a) return { numberedlist: CKEDITOR.TRISTATE_OFF }; if ("ul" == a) return { bulletedlist: CKEDITOR.TRISTATE_OFF }; b = b.getParent() } return null })
                    }
                }
            }; CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle)
        })(); "use strict"; (function () {
            function b(a, b, c) { return n(b) && n(c) && c.equals(b.getNext(function (a) { return !(S(a) || T(a) || q(a)) })) } function f(a) { this.upper = a[0]; this.lower = a[1]; this.set.apply(this, a.slice(2)) }
            function d(a) { var b = a.element; if (b && n(b) && (b = b.getAscendant(a.triggers, !0)) && a.editable.contains(b)) { var c = h(b); if ("true" == c.getAttribute("contenteditable")) return b; if (c.is(a.triggers)) return c } return null } function a(a, b, c) { w(a, b); w(a, c); a = b.size.bottom; c = c.size.top; return a && c ? 0 | (a + c) / 2 : a || c } function c(a, b, c) { return b = b[c ? "getPrevious" : "getNext"](function (b) { return b && b.type == CKEDITOR.NODE_TEXT && !S(b) || n(b) && !q(b) && !g(a, b) }) } function m(a, b, c) { return a > b && a < c } function h(a, b) {
                if (a.data("cke-editable")) return null;
                for (b || (a = a.getParent()); a && !a.data("cke-editable");) { if (a.hasAttribute("contenteditable")) return a; a = a.getParent() } return null
            } function l(a) {
                var b = a.doc, c = G('\x3cspan contenteditable\x3d"false" data-cke-magic-line\x3d"1" style\x3d"' + ba + "position:absolute;border-top:1px dashed " + a.boxColor + '"\x3e\x3c/span\x3e', b), d = CKEDITOR.getUrl(this.path + "images/" + (I.hidpi ? "hidpi/" : "") + "icon" + (a.rtl ? "-rtl" : "") + ".png"); D(c, {
                    attach: function () { this.wrap.getParent() || this.wrap.appendTo(a.editable, !0); return this },
                    lineChildren: [D(G('\x3cspan title\x3d"' + a.editor.lang.magicline.title + '" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e', b), { base: ba + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + d + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (I.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (I.hidpi ? "background-size: 9px 10px;" : ""), looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;", "top:-1px; border-radius: 0px 0px 2px 2px;"] }),
                    D(G(da, b), { base: ca + "left:0px;border-left-color:" + a.boxColor + ";", looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"] }), D(G(da, b), { base: ca + "right:0px;border-right-color:" + a.boxColor + ";", looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"] })], detach: function () { this.wrap.getParent() && this.wrap.remove(); return this }, mouseNear: function () {
                        w(a, this); var b = a.holdDistance, c = this.size;
                        return c && m(a.mouse.y, c.top - b, c.bottom + b) && m(a.mouse.x, c.left - b, c.right + b) ? !0 : !1
                    }, place: function () {
                        var b = a.view, c = a.editable, e = a.trigger, d = e.upper, f = e.lower, g = d || f, h = g.getParent(), k = {}; this.trigger = e; d && w(a, d, !0); f && w(a, f, !0); w(a, h, !0); a.inInlineMode && z(a, !0); h.equals(c) ? (k.left = b.scroll.x, k.right = -b.scroll.x, k.width = "") : (k.left = g.size.left - g.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0), k.width = g.size.outerWidth + g.size.margin.left + g.size.margin.right + b.scroll.x,
                            k.right = ""); d && f ? k.top = d.size.margin.bottom === f.size.margin.top ? 0 | d.size.bottom + d.size.margin.bottom / 2 : d.size.margin.bottom < f.size.margin.top ? d.size.bottom + d.size.margin.bottom : d.size.bottom + d.size.margin.bottom - f.size.margin.top : d ? f || (k.top = d.size.bottom + d.size.margin.bottom) : k.top = f.size.top - f.size.margin.top; e.is(K) || m(k.top, b.scroll.y - 15, b.scroll.y + 5) ? (k.top = a.inInlineMode ? 0 : b.scroll.y, this.look(K)) : e.is(O) || m(k.top, b.pane.bottom - 5, b.pane.bottom + 15) ? (k.top = a.inInlineMode ? b.editable.height + b.editable.padding.top +
                                b.editable.padding.bottom : b.pane.bottom - 1, this.look(O)) : (a.inInlineMode && (k.top -= b.editable.top + b.editable.border.top), this.look(Y)); a.inInlineMode && (k.top--, k.top += b.editable.scroll.top, k.left += b.editable.scroll.left); for (var l in k) k[l] = CKEDITOR.tools.cssLength(k[l]); this.setStyles(k)
                    }, look: function (a) { if (this.oldLook != a) { for (var b = this.lineChildren.length, c; b--;)(c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]); this.oldLook = a } }, wrap: new F("span", a.doc)
                }); for (b = c.lineChildren.length; b--;)c.lineChildren[b].appendTo(c);
                c.look(Y); c.appendTo(c.wrap); c.unselectable(); c.lineChildren[0].on("mouseup", function (b) { c.detach(); e(a, function (b) { var c = a.line.trigger; b[c.is(J) ? "insertBefore" : "insertAfter"](c.is(J) ? c.lower : c.upper) }, !0); a.editor.focus(); I.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView(); b.data.preventDefault(!0) }); c.on("mousedown", function (a) { a.data.preventDefault(!0) }); a.line = c
            } function e(a, b, c) {
                var e = new CKEDITOR.dom.range(a.doc), d = a.editor, f; I.ie && a.enterMode == CKEDITOR.ENTER_BR ? f = a.doc.createText(U) :
                    (f = (f = h(a.element, !0)) && f.data("cke-enter-mode") || a.enterMode, f = new F(R[f], a.doc), f.is("br") || a.doc.createText(U).appendTo(f)); c && d.fire("saveSnapshot"); b(f); e.moveToPosition(f, CKEDITOR.POSITION_AFTER_START); d.getSelection().selectRanges([e]); a.hotNode = f; c && d.fire("saveSnapshot")
            } function k(a, b) {
                return {
                    canUndo: !0, modes: { wysiwyg: 1 }, exec: function () {
                        function f(c) {
                            var d = I.ie && 9 > I.version ? " " : U, g = a.hotNode && a.hotNode.getText() == d && a.element.equals(a.hotNode) && a.lastCmdDirection === !!b; e(a, function (e) {
                                g &&
                                a.hotNode && a.hotNode.remove(); e[b ? "insertAfter" : "insertBefore"](c); e.setAttributes({ "data-cke-magicline-hot": 1, "data-cke-magicline-dir": !!b }); a.lastCmdDirection = !!b
                            }); I.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView(); a.line.detach()
                        } return function (e) {
                            e = e.getSelection().getStartElement(); var g; e = e.getAscendant(V, 1); if (!p(a, e) && e && !e.equals(a.editable) && !e.contains(a.editable)) {
                                (g = h(e)) && "false" == g.getAttribute("contenteditable") && (e = g); a.element = e; g = c(a, e, !b); var k; n(g) && g.is(a.triggers) &&
                                    g.is(X) && (!c(a, g, !b) || (k = c(a, g, !b)) && n(k) && k.is(a.triggers)) ? f(g) : (k = d(a, e), n(k) && (c(a, k, !b) ? (e = c(a, k, !b)) && n(e) && e.is(a.triggers) && f(k) : f(k)))
                            }
                        }
                    }()
                }
            } function g(a, b) { if (!b || b.type != CKEDITOR.NODE_ELEMENT || !b.$) return !1; var c = a.line; return c.wrap.equals(b) || c.wrap.contains(b) } function n(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.$ } function q(a) { if (!n(a)) return !1; var b; (b = u(a)) || (n(a) ? (b = { left: 1, right: 1, center: 1 }, b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])) : b = !1); return b } function u(a) {
                return !!{
                    absolute: 1,
                    fixed: 1
                }[a.getComputedStyle("position")]
            } function r(a, b) { return n(b) ? b.is(a.triggers) : null } function p(a, b) { if (!b) return !1; for (var c = b.getParents(1), e = c.length; e--;)for (var d = a.tabuList.length; d--;)if (c[e].hasAttribute(a.tabuList[d])) return !0; return !1 } function v(a, b, c) { b = b[c ? "getLast" : "getFirst"](function (b) { return a.isRelevant(b) && !b.is(ia) }); if (!b) return !1; w(a, b); return c ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y } function y(a) {
                var b = a.editable, c = a.mouse, e = a.view, d = a.triggerOffset; z(a); var h = c.y >
                    (a.inInlineMode ? e.editable.top + e.editable.height / 2 : Math.min(e.editable.height, e.pane.height) / 2), b = b[h ? "getLast" : "getFirst"](function (a) { return !(S(a) || T(a)) }); if (!b) return null; g(a, b) && (b = a.line.wrap[h ? "getPrevious" : "getNext"](function (a) { return !(S(a) || T(a)) })); if (!n(b) || q(b) || !r(a, b)) return null; w(a, b); return !h && 0 <= b.size.top && m(c.y, 0, b.size.top + d) ? (a = a.inInlineMode || 0 === e.scroll.y ? K : Y, new f([null, b, J, N, a])) : h && b.size.bottom <= e.pane.height && m(c.y, b.size.bottom - d, e.pane.height) ? (a = a.inInlineMode ||
                        m(b.size.bottom, e.pane.height - d, e.pane.height) ? O : Y, new f([b, null, L, N, a])) : null
            } function t(a) {
                var b = a.mouse, e = a.view, g = a.triggerOffset, h = d(a); if (!h) return null; w(a, h); var g = Math.min(g, 0 | h.size.outerHeight / 2), k = [], l, H; if (m(b.y, h.size.top - 1, h.size.top + g)) H = !1; else if (m(b.y, h.size.bottom - g, h.size.bottom + 1)) H = !0; else return null; if (q(h) || v(a, h, H) || h.getParent().is(Z)) return null; var p = c(a, h, !H); if (p) {
                    if (p && p.type == CKEDITOR.NODE_TEXT) return null; if (n(p)) {
                        if (q(p) || !r(a, p) || p.getParent().is(Z)) return null;
                        k = [p, h][H ? "reverse" : "concat"]().concat([Q, N])
                    }
                } else h.equals(a.editable[H ? "getLast" : "getFirst"](a.isRelevant)) ? (z(a), H && m(b.y, h.size.bottom - g, e.pane.height) && m(h.size.bottom, e.pane.height - g, e.pane.height) ? l = O : m(b.y, 0, h.size.top + g) && (l = K)) : l = Y, k = [null, h][H ? "reverse" : "concat"]().concat([H ? L : J, N, l, h.equals(a.editable[H ? "getLast" : "getFirst"](a.isRelevant)) ? H ? O : K : Y]); return 0 in k ? new f(k) : null
            } function x(a, b, c, e) {
                for (var d = b.getDocumentPosition(), f = {}, g = {}, h = {}, k = {}, l = H.length; l--;)f[H[l]] = parseInt(b.getComputedStyle.call(b,
                    "border-" + H[l] + "-width"), 10) || 0, h[H[l]] = parseInt(b.getComputedStyle.call(b, "padding-" + H[l]), 10) || 0, g[H[l]] = parseInt(b.getComputedStyle.call(b, "margin-" + H[l]), 10) || 0; c && !e || A(a, e); k.top = d.y - (c ? 0 : a.view.scroll.y); k.left = d.x - (c ? 0 : a.view.scroll.x); k.outerWidth = b.$.offsetWidth; k.outerHeight = b.$.offsetHeight; k.height = k.outerHeight - (h.top + h.bottom + f.top + f.bottom); k.width = k.outerWidth - (h.left + h.right + f.left + f.right); k.bottom = k.top + k.outerHeight; k.right = k.left + k.outerWidth; a.inInlineMode && (k.scroll = {
                        top: b.$.scrollTop,
                        left: b.$.scrollLeft
                    }); return D({ border: f, padding: h, margin: g, ignoreScroll: c }, k, !0)
            } function w(a, b, c) { if (!n(b)) return b.size = null; if (!b.size) b.size = {}; else if (b.size.ignoreScroll == c && b.size.date > new Date - W) return null; return D(b.size, x(a, b, c), { date: +new Date }, !0) } function z(a, b) { a.view.editable = x(a, a.editable, b, !0) } function A(a, b) {
                a.view || (a.view = {}); var c = a.view; if (!(!b && c && c.date > new Date - W)) {
                    var e = a.win, c = e.getScrollPosition(), e = e.getViewPaneSize(); D(a.view, {
                        scroll: {
                            x: c.x, y: c.y, width: a.doc.$.documentElement.scrollWidth -
                                e.width, height: a.doc.$.documentElement.scrollHeight - e.height
                        }, pane: { width: e.width, height: e.height, bottom: e.height + c.y }, date: +new Date
                    }, !0)
                }
            } function C(a, b, c, e) { for (var d = e, g = e, h = 0, k = !1, l = !1, m = a.view.pane.height, n = a.mouse; n.y + h < m && 0 < n.y - h;) { k || (k = b(d, e)); l || (l = b(g, e)); !k && 0 < n.y - h && (d = c(a, { x: n.x, y: n.y - h })); !l && n.y + h < m && (g = c(a, { x: n.x, y: n.y + h })); if (k && l) break; h += 2 } return new f([d, g, null, null]) } CKEDITOR.plugins.add("magicline", {
                init: function (a) {
                    var b = a.config, h = b.magicline_triggerOffset || 30, m = {
                        editor: a,
                        enterMode: b.enterMode, triggerOffset: h, holdDistance: 0 | h * (b.magicline_holdDistance || .5), boxColor: b.magicline_color || "#ff0000", rtl: "rtl" == b.contentsLangDirection, tabuList: ["data-cke-hidden-sel"].concat(b.magicline_tabuList || []), triggers: b.magicline_everywhere ? V : { table: 1, hr: 1, div: 1, ul: 1, ol: 1, dl: 1, form: 1, blockquote: 1 }
                    }, H, v, r; m.isRelevant = function (a) { return n(a) && !g(m, a) && !q(a) }; a.on("contentDom", function () {
                        var h = a.editable(), n = a.document, q = a.window; D(m, {
                            editable: h, inInlineMode: h.isInline(), doc: n, win: q,
                            hotNode: null
                        }, !0); m.boundary = m.inInlineMode ? m.editable : m.doc.getDocumentElement(); h.is(E.$inline) || (m.inInlineMode && !u(h) && h.setStyles({ position: "relative", top: null, left: null }), l.call(this, m), A(m), h.attachListener(a, "beforeUndoImage", function () { m.line.detach() }), h.attachListener(a, "beforeGetData", function () { m.line.wrap.getParent() && (m.line.detach(), a.once("getData", function () { m.line.attach() }, null, null, 1E3)) }, null, null, 0), h.attachListener(m.inInlineMode ? n : n.getWindow().getFrame(), "mouseout", function (b) {
                            if ("wysiwyg" ==
                                a.mode) if (m.inInlineMode) { var c = b.data.$.clientX; b = b.data.$.clientY; A(m); z(m, !0); var e = m.view.editable, d = m.view.scroll; c > e.left - d.x && c < e.right - d.x && b > e.top - d.y && b < e.bottom - d.y || (clearTimeout(r), r = null, m.line.detach()) } else clearTimeout(r), r = null, m.line.detach()
                        }), h.attachListener(h, "keyup", function () { m.hiddenMode = 0 }), h.attachListener(h, "keydown", function (b) { if ("wysiwyg" == a.mode) switch (b.data.getKeystroke()) { case 2228240: case 16: m.hiddenMode = 1, m.line.detach() } }), h.attachListener(m.inInlineMode ? h : n,
                            "mousemove", function (b) { v = !0; if ("wysiwyg" == a.mode && !a.readOnly && !r) { var c = { x: b.data.$.clientX, y: b.data.$.clientY }; r = setTimeout(function () { m.mouse = c; r = m.trigger = null; A(m); v && !m.hiddenMode && a.focusManager.hasFocus && !m.line.mouseNear() && (m.element = aa(m, !0)) && ((m.trigger = y(m) || t(m) || fa(m)) && !p(m, m.trigger.upper || m.trigger.lower) ? m.line.attach().place() : (m.trigger = null, m.line.detach()), v = !1) }, 30) } }), h.attachListener(q, "scroll", function () {
                                "wysiwyg" == a.mode && (m.line.detach(), I.webkit && (m.hiddenMode = 1, clearTimeout(H),
                                    H = setTimeout(function () { m.mouseDown || (m.hiddenMode = 0) }, 50)))
                            }), h.attachListener(M ? n : q, "mousedown", function () { "wysiwyg" == a.mode && (m.line.detach(), m.hiddenMode = 1, m.mouseDown = 1) }), h.attachListener(M ? n : q, "mouseup", function () { m.hiddenMode = 0; m.mouseDown = 0 }), a.addCommand("accessPreviousSpace", k(m)), a.addCommand("accessNextSpace", k(m, !0)), a.setKeystroke([[b.magicline_keystrokePrevious, "accessPreviousSpace"], [b.magicline_keystrokeNext, "accessNextSpace"]]), a.on("loadSnapshot", function () {
                                var b, c, e, d; for (d in {
                                    p: 1,
                                    br: 1, div: 1
                                }) for (b = a.document.getElementsByTag(d), e = b.count(); e--;)if ((c = b.getItem(e)).data("cke-magicline-hot")) { m.hotNode = c; m.lastCmdDirection = "true" === c.data("cke-magicline-dir") ? !0 : !1; return }
                            }), a._.magiclineBackdoor = { accessFocusSpace: e, boxTrigger: f, isLine: g, getAscendantTrigger: d, getNonEmptyNeighbour: c, getSize: x, that: m, triggerEdge: t, triggerEditable: y, triggerExpand: fa })
                    }, this)
                }
            }); var D = CKEDITOR.tools.extend, F = CKEDITOR.dom.element, G = F.createFromHtml, I = CKEDITOR.env, M = CKEDITOR.env.ie && 9 > CKEDITOR.env.version,
                E = CKEDITOR.dtd, R = {}, J = 128, L = 64, Q = 32, N = 16, K = 4, O = 2, Y = 1, U = " ", Z = E.$listItem, ia = E.$tableContent, X = D({}, E.$nonEditable, E.$empty), V = E.$block, W = 100, ba = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;", ca = ba + "border-color:transparent;display:block;border-style:solid;", da = "\x3cspan\x3e" + U + "\x3c/span\x3e"; R[CKEDITOR.ENTER_BR] = "br"; R[CKEDITOR.ENTER_P] = "p"; R[CKEDITOR.ENTER_DIV] = "div"; f.prototype = {
                    set: function (a, b, c) {
                        this.properties =
                        a + b + (c || Y); return this
                    }, is: function (a) { return (this.properties & a) == a }
                }; var aa = function () { function a(b, c) { var e = b.$.elementFromPoint(c.x, c.y); return e && e.nodeType ? new CKEDITOR.dom.element(e) : null } return function (b, c, e) { if (!b.mouse) return null; var d = b.doc, f = b.line.wrap; e = e || b.mouse; var h = a(d, e); c && g(b, h) && (f.hide(), h = a(d, e), f.show()); return !h || h.type != CKEDITOR.NODE_ELEMENT || !h.$ || I.ie && 9 > I.version && !b.boundary.equals(h) && !b.boundary.contains(h) ? null : h } }(), S = CKEDITOR.dom.walker.whitespaces(), T = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),
                    fa = function () {
                        function c(d) {
                            var f = d.element, g, h, k; if (!n(f) || f.contains(d.editable) || f.isReadOnly()) return null; k = C(d, function (a, b) { return !b.equals(a) }, function (a, b) { return aa(a, !0, b) }, f); g = k.upper; h = k.lower; if (b(d, g, h)) return k.set(Q, 8); if (g && f.contains(g)) for (; !g.getParent().equals(f);)g = g.getParent(); else g = f.getFirst(function (a) { return e(d, a) }); if (h && f.contains(h)) for (; !h.getParent().equals(f);)h = h.getParent(); else h = f.getLast(function (a) { return e(d, a) }); if (!g || !h) return null; w(d, g); w(d, h); if (!m(d.mouse.y,
                                g.size.top, h.size.bottom)) return null; for (var f = Number.MAX_VALUE, l, H, p, t; h && !h.equals(g) && (H = g.getNext(d.isRelevant));)l = Math.abs(a(d, g, H) - d.mouse.y), l < f && (f = l, p = g, t = H), g = H, w(d, g); if (!p || !t || !m(d.mouse.y, p.size.top, t.size.bottom)) return null; k.upper = p; k.lower = t; return k.set(Q, 8)
                        } function e(a, b) { return !(b && b.type == CKEDITOR.NODE_TEXT || T(b) || q(b) || g(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br")) } return function (a) {
                            var e = c(a), d; if (d = e) {
                                d = e.upper; var f = e.lower; d = !d || !f || q(f) || q(d) || f.equals(d) ||
                                    d.equals(f) || f.contains(d) || d.contains(f) ? !1 : r(a, d) && r(a, f) && b(a, d, f) ? !0 : !1
                            } return d ? e : null
                        }
                    }(), H = ["top", "left", "right", "bottom"]
        })(); CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51; CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52; (function () {
            function b(a) {
                if (!a || a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName()) return []; for (var b = [], c = ["style", "className"], e = 0; e < c.length; e++) {
                    var d = a.$.elements.namedItem(c[e]); d && (d = new CKEDITOR.dom.element(d),
                        b.push([d, d.nextSibling]), d.remove())
                } return b
            } function f(a, b) { if (a && a.type == CKEDITOR.NODE_ELEMENT && "form" == a.getName() && 0 < b.length) for (var c = b.length - 1; 0 <= c; c--) { var e = b[c][0], d = b[c][1]; d ? e.insertBefore(d) : e.appendTo(a) } } function d(a, c) { var d = b(a), e = {}, k = a.$; c || (e["class"] = k.className || "", k.className = ""); e.inline = k.style.cssText || ""; c || (k.style.cssText = "position: static; overflow: visible"); f(d); return e } function a(a, c) {
                var d = b(a), e = a.$; "class" in c && (e.className = c["class"]); "inline" in c && (e.style.cssText =
                    c.inline); f(d)
            } function c(a) { if (!a.editable().isInline()) { var b = CKEDITOR.instances, c; for (c in b) { var e = b[c]; "wysiwyg" != e.mode || e.readOnly || (e = e.document.getBody(), e.setAttribute("contentEditable", !1), e.setAttribute("contentEditable", !0)) } a.editable().hasFocus && (a.toolbox.focus(), a.focus()) } } CKEDITOR.plugins.add("maximize", {
                init: function (b) {
                    function f() { var a = k.getViewPaneSize(); b.resize(a.width, a.height, null, !0) } if (b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        var l = b.lang, e = CKEDITOR.document, k = e.getWindow(),
                        g, n, q, u = CKEDITOR.TRISTATE_OFF; b.addCommand("maximize", {
                            modes: { wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS }, readOnly: 1, editorFocus: !1, exec: function () {
                                var r = b.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }), p = b.ui.space("contents"); if ("wysiwyg" == b.mode) { var v = b.getSelection(); g = v && v.getRanges(); n = k.getScrollPosition() } else { var y = b.editable().$; g = !CKEDITOR.env.ie && [y.selectionStart, y.selectionEnd]; n = [y.scrollLeft, y.scrollTop] } if (this.state == CKEDITOR.TRISTATE_OFF) {
                                    k.on("resize",
                                        f); q = k.getScrollPosition(); for (v = b.container; v = v.getParent();)v.setCustomData("maximize_saved_styles", d(v)), v.setStyle("z-index", b.config.baseFloatZIndex - 5); p.setCustomData("maximize_saved_styles", d(p, !0)); r.setCustomData("maximize_saved_styles", d(r, !0)); p = { overflow: CKEDITOR.env.webkit ? "" : "hidden", width: 0, height: 0 }; e.getDocumentElement().setStyles(p); !CKEDITOR.env.gecko && e.getDocumentElement().setStyle("position", "fixed"); CKEDITOR.env.gecko && CKEDITOR.env.quirks || e.getBody().setStyles(p); CKEDITOR.env.ie ?
                                            setTimeout(function () { k.$.scrollTo(0, 0) }, 0) : k.$.scrollTo(0, 0); r.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute"); r.$.offsetLeft; r.setStyles({ "z-index": b.config.baseFloatZIndex - 5, left: "0px", top: "0px" }); r.addClass("cke_maximized"); f(); p = r.getDocumentPosition(); r.setStyles({ left: -1 * p.x + "px", top: -1 * p.y + "px" }); CKEDITOR.env.gecko && c(b)
                                } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                    k.removeListener("resize", f); for (var v = [p, r], t = 0; t < v.length; t++)a(v[t], v[t].getCustomData("maximize_saved_styles")),
                                        v[t].removeCustomData("maximize_saved_styles"); for (v = b.container; v = v.getParent();)a(v, v.getCustomData("maximize_saved_styles")), v.removeCustomData("maximize_saved_styles"); CKEDITOR.env.ie ? setTimeout(function () { k.$.scrollTo(q.x, q.y) }, 0) : k.$.scrollTo(q.x, q.y); r.removeClass("cke_maximized"); CKEDITOR.env.webkit && (r.setStyle("display", "inline"), setTimeout(function () { r.setStyle("display", "block") }, 0)); b.fire("resize", { outerHeight: b.container.$.offsetHeight, contentsHeight: p.$.offsetHeight, outerWidth: b.container.$.offsetWidth })
                                } this.toggleState();
                                if (v = this.uiItems[0]) p = this.state == CKEDITOR.TRISTATE_OFF ? l.maximize.maximize : l.maximize.minimize, v = CKEDITOR.document.getById(v._.id), v.getChild(1).setHtml(p), v.setAttribute("title", p), v.setAttribute("href", 'javascript:void("' + p + '");'); "wysiwyg" == b.mode ? g ? (CKEDITOR.env.gecko && c(b), b.getSelection().selectRanges(g), (y = b.getSelection().getStartElement()) && y.scrollIntoView(!0)) : k.$.scrollTo(n.x, n.y) : (g && (y.selectionStart = g[0], y.selectionEnd = g[1]), y.scrollLeft = n[0], y.scrollTop = n[1]); g = n = null; u = this.state;
                                b.fire("maximize", this.state)
                            }, canUndo: !1
                        }); b.ui.addButton && b.ui.addButton("Maximize", { label: l.maximize.maximize, command: "maximize", toolbar: "tools,10" }); b.on("mode", function () { var a = b.getCommand("maximize"); a.setState(a.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : u) }, null, null, 100)
                    }
                }
            })
        })(); CKEDITOR.plugins.add("newpage", {
            init: function (b) {
                b.addCommand("newpage", {
                    modes: { wysiwyg: 1, source: 1 }, exec: function (b) {
                        var d = this; b.setData(b.config.newpage_html || "", function () {
                            b.focus(); setTimeout(function () {
                                b.fire("afterCommandExec",
                                    { name: "newpage", command: d }); b.selectionChange()
                            }, 200)
                        })
                    }, async: !0
                }); b.ui.addButton && b.ui.addButton("NewPage", { label: b.lang.newpage.toolbar, command: "newpage", toolbar: "document,20" })
            }
        }); "use strict"; (function () {
            function b(b) { return { "aria-label": b, "class": "cke_pagebreak", contenteditable: "false", "data-cke-display-name": "pagebreak", "data-cke-pagebreak": 1, style: "page-break-after: always", title: b } } CKEDITOR.plugins.add("pagebreak", {
                requires: "fakeobjects", onLoad: function () {
                    var b = ("background:url(" + CKEDITOR.getUrl(this.path +
                        "images/pagebreak.gif") + ") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:7px;cursor:default;").replace(/;/g, " !important;"); CKEDITOR.addCss("div.cke_pagebreak{" + b + "}")
                }, init: function (b) {
                    b.blockless || (b.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd), b.ui.addButton && b.ui.addButton("PageBreak", { label: b.lang.pagebreak.toolbar, command: "pagebreak", toolbar: "insert,70" }), CKEDITOR.env.webkit && b.on("contentDom", function () {
                        b.document.on("click",
                            function (d) { d = d.data.getTarget(); d.is("div") && d.hasClass("cke_pagebreak") && b.getSelection().selectElement(d) })
                    }))
                }, afterInit: function (f) {
                    function d(a) { CKEDITOR.tools.extend(a.attributes, b(f.lang.pagebreak.alt), !0); a.children.length = 0 } var a = f.dataProcessor, c = a && a.dataFilter, a = a && a.htmlFilter, m = /page-break-after\s*:\s*always/i, h = /display\s*:\s*none/i; a && a.addRules({
                        attributes: {
                            "class": function (a, b) {
                                var c = a.replace("cke_pagebreak", ""); if (c != a) {
                                    var d = CKEDITOR.htmlParser.fragment.fromHtml('\x3cspan style\x3d"display: none;"\x3e\x26nbsp;\x3c/span\x3e').children[0];
                                    b.children.length = 0; b.add(d); d = b.attributes; delete d["aria-label"]; delete d.contenteditable; delete d.title
                                } return c
                            }
                        }
                    }, { applyToAll: !0, priority: 5 }); c && c.addRules({ elements: { div: function (a) { if (a.attributes["data-cke-pagebreak"]) d(a); else if (m.test(a.attributes.style)) { var b = a.children[0]; b && "span" == b.name && h.test(b.attributes.style) && d(a) } } } })
                }
            }); CKEDITOR.plugins.pagebreakCmd = {
                exec: function (b) { b.insertElement(CKEDITOR.plugins.pagebreak.createElement(b)) }, context: "div", allowedContent: {
                    div: { styles: "!page-break-after" },
                    span: { match: function (b) { return (b = b.parent) && "div" == b.name && b.styles && b.styles["page-break-after"] }, styles: "display" }
                }, requiredContent: "div{page-break-after}"
            }; CKEDITOR.plugins.pagebreak = { createElement: function (f) { return f.document.createElement("div", { attributes: b(f.lang.pagebreak.alt) }) } }
        })(); (function () {
            CKEDITOR.plugins.add("xml", {}); CKEDITOR.xml = function (b) {
                var f = null; if ("object" == typeof b) f = b; else if (b = (b || "").replace(/&nbsp;/g, " "), "ActiveXObject" in window) {
                    try { f = new ActiveXObject("MSXML2.DOMDocument") } catch (d) {
                        try {
                            f =
                            new ActiveXObject("Microsoft.XmlDom")
                        } catch (a) { }
                    } f && (f.async = !1, f.resolveExternals = !1, f.validateOnParse = !1, f.loadXML(b))
                } else window.DOMParser && (f = (new DOMParser).parseFromString(b, "text/xml")); this.baseXml = f
            }; CKEDITOR.xml.prototype = {
                selectSingleNode: function (b, f) { var d = this.baseXml; if (f || (f = d)) { if ("selectSingleNode" in f) return f.selectSingleNode(b); if (d.evaluate) return (d = d.evaluate(b, f, null, 9, null)) && d.singleNodeValue || null } return null }, selectNodes: function (b, f) {
                    var d = this.baseXml, a = []; if (f || (f =
                        d)) { if ("selectNodes" in f) return f.selectNodes(b); if (d.evaluate && (d = d.evaluate(b, f, null, 5, null))) for (var c; c = d.iterateNext();)a.push(c) } return a
                }, getInnerXml: function (b, f) { var d = this.selectSingleNode(b, f), a = []; if (d) for (d = d.firstChild; d;)d.xml ? a.push(d.xml) : window.XMLSerializer && a.push((new XMLSerializer).serializeToString(d)), d = d.nextSibling; return a.length ? a.join("") : null }
            }
        })(); (function () {
            CKEDITOR.plugins.add("ajax", { requires: "xml" }); CKEDITOR.ajax = function () {
                function b() {
                    if (!CKEDITOR.env.ie || "file:" !=
                        location.protocol) try { return new XMLHttpRequest } catch (a) { } try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (b) { } try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (d) { } return null
                } function f(a, b) { if (4 != a.readyState || !(200 <= a.status && 300 > a.status || 304 == a.status || 0 === a.status || 1223 == a.status)) return null; switch (b) { case "text": return a.responseText; case "xml": var d = a.responseXML; return new CKEDITOR.xml(d && d.firstChild ? d : a.responseText); case "arraybuffer": return a.response; default: return null } }
                function d(a, d, h) { var l = !!d, e = b(); if (!e) return null; l && "text" !== h && "xml" !== h && (e.responseType = h); e.open("GET", a, l); l && (e.onreadystatechange = function () { 4 == e.readyState && (d(f(e, h)), e = null) }); e.send(null); return l ? "" : f(e, h) } function a(a, d, h, l, e) { var k = b(); if (!k) return null; k.open("POST", a, !0); k.onreadystatechange = function () { 4 == k.readyState && (l && l(f(k, e)), k = null) }; k.setRequestHeader("Content-type", h || "application/x-www-form-urlencoded; charset\x3dUTF-8"); k.send(d) } return {
                    load: function (a, b, f) {
                        return d(a,
                            b, f || "text")
                    }, post: function (b, d, f, l) { return a(b, d, f, l, "text") }, loadXml: function (a, b) { return d(a, b, "xml") }, loadText: function (a, b) { return d(a, b, "text") }, loadBinary: function (a, b) { return d(a, b, "arraybuffer") }
                }
            }()
        })(); (function () {
            function b(a, b) { return CKEDITOR.tools.array.filter(a, function (a) { return a.canHandle(b) }).sort(function (a, b) { return a.priority === b.priority ? 0 : a.priority - b.priority }) } function f(a, b) { var c = a.shift(); c && c.handle(b, function () { f(a, b) }) } function d(a) {
                var b = CKEDITOR.tools.array.reduce(a,
                    function (a, b) { return CKEDITOR.tools.array.isArray(b.filters) ? a.concat(b.filters) : a }, []); return CKEDITOR.tools.array.filter(b, function (a, c) { return CKEDITOR.tools.array.indexOf(b, a) === c })
            } function a(a, b) {
                var d = 0, f, g; if (!CKEDITOR.tools.array.isArray(a) || 0 === a.length) return !0; f = CKEDITOR.tools.array.filter(a, function (a) { return -1 === CKEDITOR.tools.array.indexOf(c, a) }); if (0 < f.length) for (g = 0; g < f.length; g++)(function (a) { CKEDITOR.scriptLoader.queue(a, function (g) { g && c.push(a); ++d === f.length && b() }) })(f[g]); return 0 ===
                    f.length
            } var c = [], m = CKEDITOR.tools.createClass({ $: function () { this.handlers = [] }, proto: { register: function (a) { "number" !== typeof a.priority && (a.priority = 10); this.handlers.push(a) }, addPasteListener: function (c) { c.on("paste", function (l) { var e = b(this.handlers, l), k; if (0 !== e.length) { k = d(e); k = a(k, function () { return c.fire("paste", l.data) }); if (!k) return l.cancel(); f(e, l) } }, this, null, 3) } } }); CKEDITOR.plugins.add("pastetools", { requires: ["clipboard", "ajax"], beforeInit: function (a) { a.pasteTools = new m; a.pasteTools.addPasteListener(a) } });
            CKEDITOR.plugins.pastetools = {
                filters: {}, loadFilters: a, createFilter: function (a) { var b = CKEDITOR.tools.array.isArray(a.rules) ? a.rules : [a.rules], c = a.additionalTransforms; return function (a, d) { var f = new CKEDITOR.htmlParser.basicWriter, h = new CKEDITOR.htmlParser.filter, m; c && (a = c(a, d)); CKEDITOR.tools.array.forEach(b, function (b) { h.addRules(b(a, d, h)) }); m = CKEDITOR.htmlParser.fragment.fromHtml(a); h.applyTo(m); m.writeHtml(f); return f.getHtml() } }, getClipboardData: function (a, b) {
                    var c; return CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ||
                        "text/html" === b ? (c = a.dataTransfer.getData(b, !0)) || "text/html" !== b ? c : a.dataValue : null
                }, getConfigValue: function (a, b) { if (a && a.config) { var c = CKEDITOR.tools, d = a.config, f = c.object.keys(d), m = ["pasteTools_" + b, "pasteFromWord_" + b, "pasteFromWord" + c.capitalize(b, !0)], m = c.array.find(m, function (a) { return -1 !== c.array.indexOf(f, a) }); return d[m] } }, getContentGeneratorName: function (a) {
                    if ((a = /<meta\s+name=["']?generator["']?\s+content=["']?(\w+)/gi.exec(a)) && a.length) return a = a[1].toLowerCase(), 0 === a.indexOf("microsoft") ?
                        "microsoft" : 0 === a.indexOf("libreoffice") ? "libreoffice" : "unknown"
                }
            }; CKEDITOR.pasteFilters = CKEDITOR.plugins.pastetools.filters
        })(); (function () {
            CKEDITOR.plugins.add("pastefromgdocs", {
                requires: "pastetools", init: function (b) {
                    var f = CKEDITOR.plugins.getPath("pastetools"), d = this.path; b.pasteTools.register({
                        filters: [CKEDITOR.getUrl(f + "filter/common.js"), CKEDITOR.getUrl(d + "filter/default.js")], canHandle: function (a) { return /id=(\"|\')?docs\-internal\-guid\-/.test(a.data.dataValue) }, handle: function (a, c) {
                            var d =
                                a.data, f = CKEDITOR.plugins.pastetools.getClipboardData(d, "text/html"); d.dontFilter = !0; d.dataValue = CKEDITOR.pasteFilters.gdocs(f, b); !0 === b.config.forcePasteAsPlainText && (d.type = "text"); c()
                        }
                    })
                }
            })
        })(); (function () {
            CKEDITOR.plugins.add("pastefromlibreoffice", {
                requires: "pastetools", isSupportedEnvironment: function () { var b = CKEDITOR.env.ie && 11 >= CKEDITOR.env.version; return !(CKEDITOR.env.webkit && !CKEDITOR.env.chrome) && !b }, init: function (b) {
                    if (this.isSupportedEnvironment()) {
                        var f = CKEDITOR.plugins.getPath("pastetools"),
                        d = this.path; b.pasteTools.register({
                            priority: 100, filters: [CKEDITOR.getUrl(f + "filter/common.js"), CKEDITOR.getUrl(f + "filter/image.js"), CKEDITOR.getUrl(d + "filter/default.js")], canHandle: function (a) { a = a.data; return (a = a.dataTransfer.getData("text/html", !0) || a.dataValue) ? "libreoffice" === CKEDITOR.plugins.pastetools.getContentGeneratorName(a) : !1 }, handle: function (a, c) {
                                var d = a.data, f = d.dataValue || CKEDITOR.plugins.pastetools.getClipboardData(d, "text/html"); d.dontFilter = !0; f = CKEDITOR.pasteFilters.image(f, b, CKEDITOR.plugins.pastetools.getClipboardData(d,
                                    "text/rtf")); d.dataValue = CKEDITOR.pasteFilters.libreoffice(f, b); !0 === b.config.forcePasteAsPlainText && (d.type = "text"); c()
                            }
                        })
                    }
                }
            })
        })(); (function () {
            CKEDITOR.plugins.add("pastefromword", {
                requires: "pastetools", init: function (b) {
                    var f = 0, d = CKEDITOR.plugins.getPath("pastetools"), a = this.path, c = void 0 === b.config.pasteFromWord_inlineImages ? !0 : b.config.pasteFromWord_inlineImages, d = [CKEDITOR.getUrl(d + "filter/common.js"), CKEDITOR.getUrl(d + "filter/image.js"), CKEDITOR.getUrl(a + "filter/default.js")]; b.addCommand("pastefromword",
                        { canUndo: !1, async: !0, exec: function (a, b) { f = 1; a.execCommand("paste", { type: "html", notification: b && "undefined" !== typeof b.notification ? b.notification : !0 }) } }); CKEDITOR.plugins.clipboard.addPasteButton(b, "PasteFromWord", { label: b.lang.pastefromword.toolbar, command: "pastefromword", toolbar: "clipboard,50" }); b.pasteTools.register({
                            filters: b.config.pasteFromWordCleanupFile ? [b.config.pasteFromWordCleanupFile] : d, canHandle: function (a) {
                                a = CKEDITOR.plugins.pastetools.getClipboardData(a.data, "text/html"); var b = CKEDITOR.plugins.pastetools.getContentGeneratorName(a),
                                    c = /(class="?Mso|style=["'][^"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/, b = b ? "microsoft" === b : c.test(a); return a && (f || b)
                            }, handle: function (a, d) {
                                var l = a.data, e = CKEDITOR.plugins.pastetools.getClipboardData(l, "text/html"), k = CKEDITOR.plugins.pastetools.getClipboardData(l, "text/rtf"), e = { dataValue: e, dataTransfer: { "text/rtf": k } }; if (!1 !== b.fire("pasteFromWord", e) || f) {
                                    l.dontFilter = !0; if (f || !b.config.pasteFromWordPromptCleanup || confirm(b.lang.pastefromword.confirmCleanup)) e.dataValue = CKEDITOR.cleanWord(e.dataValue,
                                        b), CKEDITOR.plugins.clipboard.isCustomDataTypesSupported && c && CKEDITOR.pasteFilters.image && (e.dataValue = CKEDITOR.pasteFilters.image(e.dataValue, b, k)), b.fire("afterPasteFromWord", e), l.dataValue = e.dataValue, !0 === b.config.forcePasteAsPlainText ? l.type = "text" : CKEDITOR.plugins.clipboard.isCustomCopyCutSupported || "allow-word" !== b.config.forcePasteAsPlainText || (l.type = "html"); f = 0; d()
                                }
                            }
                        })
                }
            })
        })(); (function () {
            var b = {
                canUndo: !1, async: !0, exec: function (b, d) {
                    var a = b.lang, c = CKEDITOR.tools.keystrokeToString(a.common.keyboard,
                        b.getCommandKeystroke(CKEDITOR.env.ie ? b.commands.paste : this)), m = d && "undefined" !== typeof d.notification ? d.notification : !d || !d.from || "keystrokeHandler" === d.from && CKEDITOR.env.ie, a = m && "string" === typeof m ? m : a.pastetext.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + c.aria + '"\x3e' + c.display + "\x3c/kbd\x3e"); b.execCommand("paste", { type: "text", notification: m ? a : !1 })
                }
            }; CKEDITOR.plugins.add("pastetext", {
                requires: "clipboard", init: function (f) {
                    var d = CKEDITOR.env.safari ? CKEDITOR.CTRL + CKEDITOR.ALT + CKEDITOR.SHIFT +
                        86 : CKEDITOR.CTRL + CKEDITOR.SHIFT + 86; f.addCommand("pastetext", b); f.setKeystroke(d, "pastetext"); CKEDITOR.plugins.clipboard.addPasteButton(f, "PasteText", { label: f.lang.pastetext.button, command: "pastetext", toolbar: "clipboard,40" }); if (f.config.forcePasteAsPlainText) f.on("beforePaste", function (a) { "html" != a.data.type && (a.data.type = "text") }); f.on("pasteState", function (a) { f.getCommand("pastetext").setState(a.data) })
                }
            })
        })(); (function () {
            function b(b) {
                var d = CKEDITOR.plugins.getPath("preview"), a = b.config, c = b.lang.preview.preview,
                m = function () { var b = location.origin, c = location.pathname; if (!a.baseHref && !CKEDITOR.env.gecko) return ""; if (a.baseHref) return '\x3cbase href\x3d"{HREF}"\x3e'.replace("{HREF}", a.baseHref); c = c.split("/"); c.pop(); c = c.join("/"); return '\x3cbase href\x3d"{HREF}"\x3e'.replace("{HREF}", b + c + "/") }(); return a.fullPage ? b.getData().replace(/<head>/, "$\x26" + m).replace(/[^>]*(?=<\/title>)/, "$\x26 \x26mdash; " + c) : a.docType + '\x3chtml dir\x3d"' + a.contentsLangDirection + '"\x3e\x3chead\x3e' + m + "\x3ctitle\x3e" + c + "\x3c/title\x3e" +
                    CKEDITOR.tools.buildStyleHtml(a.contentsCss) + '\x3clink rel\x3d"stylesheet" media\x3d"screen" href\x3d"' + d + 'styles/screen.css"\x3e\x3c/head\x3e' + function () { var a = "\x3cbody\x3e", c = b.document && b.document.getBody(); if (!c) return a; c.getAttribute("id") && (a = a.replace("\x3e", ' id\x3d"' + c.getAttribute("id") + '"\x3e')); c.getAttribute("class") && (a = a.replace("\x3e", ' class\x3d"' + c.getAttribute("class") + '"\x3e')); return a }() + b.getData() + "\x3c/body\x3e\x3c/html\x3e"
            } CKEDITOR.plugins.add("preview", {
                init: function (b) {
                    b.addCommand("preview",
                        { modes: { wysiwyg: 1 }, canUndo: !1, readOnly: 1, exec: CKEDITOR.plugins.preview.createPreview }); b.ui.addButton && b.ui.addButton("Preview", { label: b.lang.preview.preview, command: "preview", toolbar: "document,40" })
                }
            }); CKEDITOR.plugins.preview = {
                createPreview: function (f) {
                    var d, a, c, m = { dataValue: b(f) }, h = window.screen; d = Math.round(.8 * h.width); a = Math.round(.7 * h.height); c = Math.round(.1 * h.width); h = CKEDITOR.env.ie ? "javascript:void( (function(){document.open();" + ("(" + CKEDITOR.tools.fixDomain + ")();").replace(/\/\/.*?\n/g,
                        "").replace(/parent\./g, "window.opener.") + "document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad \x3d null;})() )" : null; var l; l = CKEDITOR.plugins.getPath("preview"); l = CKEDITOR.env.gecko ? CKEDITOR.getUrl(l + "preview.html") : ""; if (!1 === f.fire("contentPreview", m)) return !1; if (h || l) window._cke_htmlToLoad = m.dataValue; f = window.open(l, null, ["toolbar\x3dyes,location\x3dno,status\x3dyes,menubar\x3dyes,scrollbars\x3dyes,resizable\x3dyes", "width\x3d" + d, "height\x3d" + a, "left\x3d" +
                            c].join()); h && f && (f.location = h); window._cke_htmlToLoad || (d = f.document, d.open(), d.write(m.dataValue), d.close()); return new CKEDITOR.dom.window(f)
                }
            }
        })(); (function () {
            CKEDITOR.plugins.add("print", { requires: "preview", init: function (b) { b.addCommand("print", CKEDITOR.plugins.print); b.ui.addButton && b.ui.addButton("Print", { label: b.lang.print.toolbar, command: "print", toolbar: "document,50" }) } }); CKEDITOR.plugins.print = {
                exec: function (b) {
                    function f() { CKEDITOR.env.gecko ? d.print() : d.document.execCommand("Print"); d.close() }
                    b = CKEDITOR.plugins.preview.createPreview(b); var d; if (b) { d = b.$; if ("complete" === d.document.readyState) return f(); b.once("load", f) }
                }, canUndo: !1, readOnly: 1, modes: { wysiwyg: 1 }
            }
        })(); CKEDITOR.plugins.add("removeformat", { init: function (b) { b.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat); b.ui.addButton && b.ui.addButton("RemoveFormat", { label: b.lang.removeformat.toolbar, command: "removeFormat", toolbar: "cleanup,10" }) } }); CKEDITOR.plugins.removeformat = {
            commands: {
                removeformat: {
                    exec: function (b) {
                        for (var f =
                            b._.removeFormatRegex || (b._.removeFormatRegex = new RegExp("^(?:" + b.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), d = b._.removeAttributes || (b._.removeAttributes = b.config.removeFormatAttributes.split(",")), a = CKEDITOR.plugins.removeformat.filter, c = b.getSelection().getRanges(), m = c.createIterator(), h = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }, l; l = m.getNextRange();) {
                                l.enlarge(CKEDITOR.ENLARGE_INLINE); var e = l.createBookmark(), k = e.startNode, g = e.endNode, n = function (c) {
                                    for (var d = b.elementPath(c),
                                        e = d.elements, g = 1, h; (h = e[g]) && !h.equals(d.block) && !h.equals(d.blockLimit); g++)f.test(h.getName()) && a(b, h) && c.breakParent(h)
                                }; n(k); if (g) for (n(g), k = k.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); k && !k.equals(g);)if (k.isReadOnly()) { if (k.getPosition(g) & CKEDITOR.POSITION_CONTAINS) break; k = k.getNext(h) } else n = k.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), "img" == k.getName() && k.data("cke-realelement") || !a(b, k) || (f.test(k.getName()) ? k.remove(1) : (k.removeAttributes(d), b.fire("removeFormatCleanup", k))), k = n; l.moveToBookmark(e)
                        } b.forceNextSelectionCheck();
                        b.getSelection().selectRanges(c)
                    }
                }
            }, filter: function (b, f) { for (var d = b._.removeFormatFilters || [], a = 0; a < d.length; a++)if (!1 === d[a](f)) return !1; return !0 }
        }; CKEDITOR.editor.prototype.addRemoveFormatFilter = function (b) { this._.removeFormatFilters || (this._.removeFormatFilters = []); this._.removeFormatFilters.push(b) }; CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var"; CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign";
        CKEDITOR.plugins.add("resize", {
            init: function (b) {
                function f(c) { var d = e.width, f = e.height, h = d + (c.data.$.screenX - l.x) * ("rtl" == m ? -1 : 1); c = f + (c.data.$.screenY - l.y); k && (d = Math.max(a.resize_minWidth, Math.min(h, a.resize_maxWidth))); g && (f = Math.max(a.resize_minHeight, Math.min(c, a.resize_maxHeight))); b.resize(k ? d : null, f) } function d() {
                    CKEDITOR.document.removeListener("mousemove", f); CKEDITOR.document.removeListener("mouseup", d); b.document && (b.document.removeListener("mousemove", f), b.document.removeListener("mouseup",
                        d))
                } var a = b.config, c = b.ui.spaceId("resizer"), m = b.element ? b.element.getDirection(1) : "ltr"; !a.resize_dir && (a.resize_dir = "vertical"); void 0 === a.resize_maxWidth && (a.resize_maxWidth = 3E3); void 0 === a.resize_maxHeight && (a.resize_maxHeight = 3E3); void 0 === a.resize_minWidth && (a.resize_minWidth = 750); void 0 === a.resize_minHeight && (a.resize_minHeight = 250); if (!1 !== a.resize_enabled) {
                    var h = null, l, e, k = ("both" == a.resize_dir || "horizontal" == a.resize_dir) && a.resize_minWidth != a.resize_maxWidth, g = ("both" == a.resize_dir || "vertical" ==
                        a.resize_dir) && a.resize_minHeight != a.resize_maxHeight, n = CKEDITOR.tools.addFunction(function (c) { h || (h = b.getResizable()); e = { width: h.$.offsetWidth || 0, height: h.$.offsetHeight || 0 }; l = { x: c.screenX, y: c.screenY }; a.resize_minWidth > e.width && (a.resize_minWidth = e.width); a.resize_minHeight > e.height && (a.resize_minHeight = e.height); CKEDITOR.document.on("mousemove", f); CKEDITOR.document.on("mouseup", d); b.document && (b.document.on("mousemove", f), b.document.on("mouseup", d)); c.preventDefault && c.preventDefault() }); b.on("destroy",
                            function () { CKEDITOR.tools.removeFunction(n) }); b.on("uiSpace", function (a) { if ("bottom" == a.data.space) { var d = ""; k && !g && (d = " cke_resizer_horizontal"); !k && g && (d = " cke_resizer_vertical"); var e = '\x3cspan id\x3d"' + c + '" class\x3d"cke_resizer' + d + " cke_resizer_" + m + '" title\x3d"' + CKEDITOR.tools.htmlEncode(b.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event)"\x3e' + ("ltr" == m ? "◢" : "◣") + "\x3c/span\x3e"; "ltr" == m && "ltr" == d ? a.data.html += e : a.data.html = e + a.data.html } }, b, null, 100); b.on("maximize",
                                function (a) { b.ui.space("resizer")[a.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]() })
                }
            }
        }); (function () { var b = { readOnly: 1, modes: { wysiwyg: 1, source: 1 }, exec: function (b) { if (b.fire("save") && (b = b.element.$.form)) try { b.submit() } catch (d) { b.submit.click && b.submit.click() } } }; CKEDITOR.plugins.add("save", { init: function (f) { f.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (f.addCommand("save", b).startDisabled = !f.element.$.form, f.ui.addButton && f.ui.addButton("Save", { label: f.lang.save.toolbar, command: "save", toolbar: "document,10" })) } }) })();
        "use strict"; CKEDITOR.plugins.add("scayt", {
            requires: "menubutton,dialog", tabToOpen: null, dialogName: "scaytDialog", onLoad: function (b) {
                "moono-lisa" == (CKEDITOR.skinName || b.config.skin) && CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path + "skins/" + CKEDITOR.skin.name + "/scayt.css")); CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path + "dialogs/dialog.css")); var f = !1; CKEDITOR.on("instanceLoaded", function (b) {
                    if (!f && CKEDITOR.plugins.autocomplete) {
                        f = !0; var a = CKEDITOR.plugins.autocomplete.prototype.getModel;
                        CKEDITOR.plugins.autocomplete.prototype.getModel = function (b) { var d = this.editor; b = a.bind(this)(b); b.on("change-isActive", function (a) { a.data ? d.fire("autocompletePanelShow") : d.fire("autocompletePanelHide") }); return b }
                    }
                })
            }, init: function (b) {
                var f = this, d = CKEDITOR.plugins.scayt; this.bindEvents(b); this.parseConfig(b); this.addRule(b); CKEDITOR.dialog.add(this.dialogName, CKEDITOR.getUrl(this.path + "dialogs/options.js")); this.addMenuItems(b); var a = b.lang.scayt, c = CKEDITOR.env; b.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON,
                    {
                        label: a.text_title, title: b.plugins.wsc ? b.lang.wsc.title : a.text_title, modes: { wysiwyg: !(c.ie && (8 > c.version || c.quirks)) }, toolbar: "spellchecker,20", refresh: function () { var a = b.ui.instances.Scayt.getState(); b.scayt && (a = d.state.scayt[b.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF); b.fire("scaytButtonState", a) }, onRender: function () { var a = this; b.on("scaytButtonState", function (b) { void 0 !== typeof b.data && a.setState(b.data) }) }, onMenu: function () {
                            var a = b.scayt; b.getMenuItem("scaytToggle").label = b.lang.scayt[a &&
                                d.state.scayt[b.name] ? "btn_disable" : "btn_enable"]; var c = { scaytToggle: CKEDITOR.TRISTATE_OFF, scaytOptions: a ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytLangs: a ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytDict: a ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytAbout: a ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, WSC: b.plugins.wsc ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED }; b.config.scayt_uiTabs[0] || delete c.scaytOptions; b.config.scayt_uiTabs[1] || delete c.scaytLangs;
                            b.config.scayt_uiTabs[2] || delete c.scaytDict; a && !CKEDITOR.plugins.scayt.isNewUdSupported(a) && (delete c.scaytDict, b.config.scayt_uiTabs[2] = 0, CKEDITOR.plugins.scayt.alarmCompatibilityMessage()); return c
                        }
                    }); b.contextMenu && b.addMenuItems && (b.contextMenu.addListener(function (a, c) { var d = b.scayt, e, k; d && (k = d.getSelectionNode()) && (e = f.menuGenerator(b, k), d.showBanner("." + b.contextMenu._.definition.panel.className.split(" ").join(" ."))); return e }), b.contextMenu._.onHide = CKEDITOR.tools.override(b.contextMenu._.onHide,
                        function (a) { return function () { var c = b.scayt; c && c.hideBanner(); return a.apply(this) } }))
            }, addMenuItems: function (b) {
                var f = this, d = CKEDITOR.plugins.scayt; b.addMenuGroup("scaytButton"); for (var a = b.config.scayt_contextMenuItemsOrder.split("|"), c = 0; c < a.length; c++)a[c] = "scayt_" + a[c]; if ((a = ["grayt_description", "grayt_suggest", "grayt_control"].concat(a)) && a.length) for (c = 0; c < a.length; c++)b.addMenuGroup(a[c], c - 10); b.addCommand("scaytToggle", {
                    exec: function (a) {
                        var b = a.scayt; d.state.scayt[a.name] = !d.state.scayt[a.name];
                        !0 === d.state.scayt[a.name] ? b || d.createScayt(a) : b && d.destroy(a)
                    }
                }); b.addCommand("scaytAbout", { exec: function (a) { a.scayt.tabToOpen = "about"; d.openDialog(f.dialogName, a) } }); b.addCommand("scaytOptions", { exec: function (a) { a.scayt.tabToOpen = "options"; d.openDialog(f.dialogName, a) } }); b.addCommand("scaytLangs", { exec: function (a) { a.scayt.tabToOpen = "langs"; d.openDialog(f.dialogName, a) } }); b.addCommand("scaytDict", { exec: function (a) { a.scayt.tabToOpen = "dictionaries"; d.openDialog(f.dialogName, a) } }); a = {
                    scaytToggle: {
                        label: b.lang.scayt.btn_enable,
                        group: "scaytButton", command: "scaytToggle"
                    }, scaytAbout: { label: b.lang.scayt.btn_about, group: "scaytButton", command: "scaytAbout" }, scaytOptions: { label: b.lang.scayt.btn_options, group: "scaytButton", command: "scaytOptions" }, scaytLangs: { label: b.lang.scayt.btn_langs, group: "scaytButton", command: "scaytLangs" }, scaytDict: { label: b.lang.scayt.btn_dictionaries, group: "scaytButton", command: "scaytDict" }
                }; b.plugins.wsc && (a.WSC = {
                    label: b.lang.wsc.toolbar, group: "scaytButton", onClick: function () {
                        var a = CKEDITOR.plugins.scayt,
                        c = b.scayt, d = b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? b.container.getText() : b.document.getBody().getText(); (d = d.replace(/\s/g, "")) ? (c && a.state.scayt[b.name] && c.setMarkupPaused && c.setMarkupPaused(!0), b.lockSelection(), b.execCommand("checkspell")) : alert("Nothing to check!")
                    }
                }); b.addMenuItems(a)
            }, bindEvents: function (b) {
                var f = CKEDITOR.plugins.scayt, d = b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE, a = function () { f.destroy(b) }, c = function () { !f.state.scayt[b.name] || b.readOnly || b.scayt || f.createScayt(b) }, m = function () {
                    var a =
                        b.editable(); a.attachListener(a, "focus", function (a) { CKEDITOR.plugins.scayt && !b.scayt && setTimeout(c, 0); a = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[b.name] && b.scayt; var f, g; if ((d || a) && b._.savedSelection) { a = b._.savedSelection.getSelectedElement(); a = !a && b._.savedSelection.getRanges(); for (var h = 0; h < a.length; h++)g = a[h], "string" === typeof g.startContainer.$.nodeValue && (f = g.startContainer.getText().length, (f < g.startOffset || f < g.endOffset) && b.unlockSelection(!1)) } }, this, null, -10)
                }, h = function () {
                    d ?
                        b.config.scayt_inlineModeImmediateMarkup ? c() : (b.on("blur", function () { setTimeout(a, 0) }), b.on("focus", c), b.focusManager.hasFocus && c()) : c(); m(); var f = b.editable(); f.attachListener(f, "mousedown", function (a) { a = a.data.getTarget(); var c = b.widgets && b.widgets.getByElement(a); c && (c.wrapper = a.getAscendant(function (a) { return a.hasAttribute("data-cke-widget-wrapper") }, !0)) }, this, null, -10)
                }; b.on("contentDom", h); b.on("beforeCommandExec", function (a) {
                    var c = b.scayt, d = !1, g = !1, h = !0; a.data.name in f.options.disablingCommandExec &&
                        "wysiwyg" == b.mode ? c && (f.destroy(b), b.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)) : "bold" !== a.data.name && "italic" !== a.data.name && "underline" !== a.data.name && "strike" !== a.data.name && "subscript" !== a.data.name && "superscript" !== a.data.name && "enter" !== a.data.name && "cut" !== a.data.name && "language" !== a.data.name || !c || ("cut" === a.data.name && (h = !1, g = !0), "language" === a.data.name && (g = d = !0), b.fire("reloadMarkupScayt", { removeOptions: { removeInside: h, forceBookmark: g, language: d }, timeout: 0 }))
                }); b.on("beforeSetMode",
                    function (a) { if ("source" == a.data) { if (a = b.scayt) f.destroy(b), b.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED); b.document && b.document.getBody().removeAttribute("_jquid") } }); b.on("afterCommandExec", function (a) { "wysiwyg" != b.mode || "undo" != a.data.name && "redo" != a.data.name || setTimeout(function () { f.reloadMarkup(b.scayt) }, 250) }); b.on("readOnly", function (a) {
                        var c; a && (c = b.scayt, !0 === a.editor.readOnly ? c && c.fire("removeMarkupInDocument", {}) : c ? f.reloadMarkup(c) : "wysiwyg" == a.editor.mode && !0 === f.state.scayt[a.editor.name] &&
                            (f.createScayt(b), a.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON)))
                    }); b.on("beforeDestroy", a); b.on("setData", function () { a(); (b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE || b.plugins.divarea) && h() }, this, null, 50); b.on("reloadMarkupScayt", function (a) {
                        var c = a.data && a.data.removeOptions, d = a.data && a.data.timeout, g = a.data && a.data.language, h = b.scayt; h && setTimeout(function () {
                            g && (c.selectionNode = b.plugins.language.getCurrentLangElement(b), c.selectionNode = c.selectionNode && c.selectionNode.$ || null); h.removeMarkupInSelectionNode(c);
                            f.reloadMarkup(h)
                        }, d || 0)
                    }); b.on("insertElement", function () { b.fire("reloadMarkupScayt", { removeOptions: { forceBookmark: !0 } }) }, this, null, 50); b.on("insertHtml", function () { b.scayt && b.scayt.setFocused && b.scayt.setFocused(!0); b.fire("reloadMarkupScayt") }, this, null, 50); b.on("insertText", function () { b.scayt && b.scayt.setFocused && b.scayt.setFocused(!0); b.fire("reloadMarkupScayt") }, this, null, 50); b.on("scaytDialogShown", function (a) { a.data.selectPage(b.scayt.tabToOpen) }); b.on("autocompletePanelShow", function (a) {
                        (a =
                            b.scayt) && a.setMarkupPaused && a.setMarkupPaused(!0)
                    }); b.on("autocompletePanelHide", function (a) { (a = b.scayt) && a.setMarkupPaused && a.setMarkupPaused(!1) })
            }, parseConfig: function (b) {
                var f = CKEDITOR.plugins.scayt; f.replaceOldOptionsNames(b.config); "boolean" !== typeof b.config.scayt_autoStartup && (b.config.scayt_autoStartup = !1); f.state.scayt[b.name] = b.config.scayt_autoStartup; "boolean" !== typeof b.config.grayt_autoStartup && (b.config.grayt_autoStartup = !1); "boolean" !== typeof b.config.scayt_inlineModeImmediateMarkup &&
                    (b.config.scayt_inlineModeImmediateMarkup = !1); f.state.grayt[b.name] = b.config.grayt_autoStartup; b.config.scayt_contextCommands || (b.config.scayt_contextCommands = "ignoreall|add"); b.config.scayt_contextMenuItemsOrder || (b.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control"); b.config.scayt_sLang || (b.config.scayt_sLang = "en_US"); if (void 0 === b.config.scayt_maxSuggestions || "number" != typeof b.config.scayt_maxSuggestions || 0 > b.config.scayt_maxSuggestions) b.config.scayt_maxSuggestions = 3; if (void 0 ===
                        b.config.scayt_minWordLength || "number" != typeof b.config.scayt_minWordLength || 1 > b.config.scayt_minWordLength) b.config.scayt_minWordLength = 3; if (void 0 === b.config.scayt_customDictionaryIds || "string" !== typeof b.config.scayt_customDictionaryIds) b.config.scayt_customDictionaryIds = ""; if (void 0 === b.config.scayt_userDictionaryName || "string" !== typeof b.config.scayt_userDictionaryName) b.config.scayt_userDictionaryName = null; if ("string" === typeof b.config.scayt_uiTabs && 3 === b.config.scayt_uiTabs.split(",").length) {
                            var d =
                                [], a = []; b.config.scayt_uiTabs = b.config.scayt_uiTabs.split(","); CKEDITOR.tools.search(b.config.scayt_uiTabs, function (b) { 1 === Number(b) || 0 === Number(b) ? (a.push(!0), d.push(Number(b))) : a.push(!1) }); null === CKEDITOR.tools.search(a, !1) ? b.config.scayt_uiTabs = d : b.config.scayt_uiTabs = [1, 1, 1]
                        } else b.config.scayt_uiTabs = [1, 1, 1]; "string" != typeof b.config.scayt_serviceProtocol && (b.config.scayt_serviceProtocol = null); "string" != typeof b.config.scayt_serviceHost && (b.config.scayt_serviceHost = null); "string" != typeof b.config.scayt_servicePort &&
                            (b.config.scayt_servicePort = null); "string" != typeof b.config.scayt_servicePath && (b.config.scayt_servicePath = null); b.config.scayt_moreSuggestions || (b.config.scayt_moreSuggestions = "on"); "string" !== typeof b.config.scayt_customerId && (b.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2"); "string" !== typeof b.config.scayt_customPunctuation && (b.config.scayt_customPunctuation = "-"); "string" !== typeof b.config.scayt_srcUrl && (f = document.location.protocol, f = -1 != f.search(/https?:/) ?
                                f : "http:", b.config.scayt_srcUrl = f + "//svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js"); "boolean" !== typeof CKEDITOR.config.scayt_handleCheckDirty && (CKEDITOR.config.scayt_handleCheckDirty = !0); "boolean" !== typeof CKEDITOR.config.scayt_handleUndoRedo && (CKEDITOR.config.scayt_handleUndoRedo = !0); CKEDITOR.config.scayt_handleUndoRedo = CKEDITOR.plugins.undo ? CKEDITOR.config.scayt_handleUndoRedo : !1; b.config.scayt_ignoreAllCapsWords && "boolean" !== typeof b.config.scayt_ignoreAllCapsWords && (b.config.scayt_ignoreAllCapsWords =
                                    !1); b.config.scayt_ignoreDomainNames && "boolean" !== typeof b.config.scayt_ignoreDomainNames && (b.config.scayt_ignoreDomainNames = !1); b.config.scayt_ignoreWordsWithMixedCases && "boolean" !== typeof b.config.scayt_ignoreWordsWithMixedCases && (b.config.scayt_ignoreWordsWithMixedCases = !1); b.config.scayt_ignoreWordsWithNumbers && "boolean" !== typeof b.config.scayt_ignoreWordsWithNumbers && (b.config.scayt_ignoreWordsWithNumbers = !1); if (b.config.scayt_disableOptionsStorage) {
                                        var f = CKEDITOR.tools.isArray(b.config.scayt_disableOptionsStorage) ?
                                            b.config.scayt_disableOptionsStorage : "string" === typeof b.config.scayt_disableOptionsStorage ? [b.config.scayt_disableOptionsStorage] : void 0, c = "all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "), m = ["lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases", "ignore-words-with-numbers"], h = CKEDITOR.tools.search, l = CKEDITOR.tools.indexOf; b.config.scayt_disableOptionsStorage = function (a) {
                                                for (var b = [], d = 0; d <
                                                    a.length; d++) { var f = a[d], q = !!h(a, "options"); if (!h(c, f) || q && h(m, function (a) { if ("lang" === a) return !1 })) return; h(m, f) && m.splice(l(m, f), 1); if ("all" === f || q && h(a, "lang")) return []; "options" === f && (m = ["lang"]) } return b = b.concat(m)
                                            }(f)
                                    }
            }, addRule: function (b) {
                var f = CKEDITOR.plugins.scayt, d = b.dataProcessor, a = d && d.htmlFilter, c = b._.elementsPath && b._.elementsPath.filters, d = d && d.dataFilter, m = b.addRemoveFormatFilter, h = function (a) { if (b.scayt && (a.hasAttribute(f.options.data_attribute_name) || a.hasAttribute(f.options.problem_grammar_data_attribute))) return !1 },
                l = function (a) { var c = !0; b.scayt && (a.hasAttribute(f.options.data_attribute_name) || a.hasAttribute(f.options.problem_grammar_data_attribute)) && (c = !1); return c }; c && c.push(h); d && d.addRules({ elements: { span: function (a) { var b = a.hasClass(f.options.misspelled_word_class) && a.attributes[f.options.data_attribute_name], c = a.hasClass(f.options.problem_grammar_class) && a.attributes[f.options.problem_grammar_data_attribute]; f && (b || c) && delete a.name; return a } } }); a && a.addRules({
                    elements: {
                        span: function (a) {
                            var b = a.hasClass(f.options.misspelled_word_class) &&
                                a.attributes[f.options.data_attribute_name], c = a.hasClass(f.options.problem_grammar_class) && a.attributes[f.options.problem_grammar_data_attribute]; f && (b || c) && delete a.name; return a
                        }
                    }
                }); m && m.call(b, l)
            }, scaytMenuDefinition: function (b) {
                var f = this, d = CKEDITOR.plugins.scayt; b = b.scayt; return {
                    scayt: {
                        scayt_ignore: { label: b.getLocal("btn_ignore"), group: "scayt_control", order: 1, exec: function (a) { a.scayt.ignoreWord() } }, scayt_ignoreall: { label: b.getLocal("btn_ignoreAll"), group: "scayt_control", order: 2, exec: function (a) { a.scayt.ignoreAllWords() } },
                        scayt_add: { label: b.getLocal("btn_addWord"), group: "scayt_control", order: 3, exec: function (a) { var b = a.scayt; setTimeout(function () { b.addWordToUserDictionary() }, 10) } }, scayt_option: { label: b.getLocal("btn_options"), group: "scayt_control", order: 4, exec: function (a) { a.scayt.tabToOpen = "options"; d.openDialog(f.dialogName, a) }, verification: function (a) { return 1 == a.config.scayt_uiTabs[0] ? !0 : !1 } }, scayt_language: {
                            label: b.getLocal("btn_langs"), group: "scayt_control", order: 5, exec: function (a) {
                                a.scayt.tabToOpen = "langs"; d.openDialog(f.dialogName,
                                    a)
                            }, verification: function (a) { return 1 == a.config.scayt_uiTabs[1] ? !0 : !1 }
                        }, scayt_dictionary: { label: b.getLocal("btn_dictionaries"), group: "scayt_control", order: 6, exec: function (a) { a.scayt.tabToOpen = "dictionaries"; d.openDialog(f.dialogName, a) }, verification: function (a) { return 1 == a.config.scayt_uiTabs[2] ? !0 : !1 } }, scayt_about: { label: b.getLocal("btn_about"), group: "scayt_control", order: 7, exec: function (a) { a.scayt.tabToOpen = "about"; d.openDialog(f.dialogName, a) } }
                    }, grayt: {
                        grayt_problemdescription: {
                            label: "Grammar problem description",
                            group: "grayt_description", order: 1, state: CKEDITOR.TRISTATE_DISABLED, exec: function (a) { }
                        }, grayt_ignore: { label: b.getLocal("btn_ignore"), group: "grayt_control", order: 2, exec: function (a) { a.scayt.ignorePhrase() } }, grayt_ignoreall: { label: b.getLocal("btn_ignoreAll"), group: "grayt_control", order: 3, exec: function (a) { a.scayt.ignoreAllPhrases() } }
                    }
                }
            }, buildSuggestionMenuItems: function (b, f, d) {
                var a = {}, c = {}, m = d ? "word" : "phrase", h = d ? "startGrammarCheck" : "startSpellCheck", l = b.scayt; if (0 < f.length && "no_any_suggestions" !== f[0]) if (d) for (d =
                    0; d < f.length; d++) {
                        var e = "scayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[d].replace(" ", "_"); b.addCommand(e, this.createCommand(CKEDITOR.plugins.scayt.suggestions[d], m, h)); d < b.config.scayt_maxSuggestions ? (b.addMenuItem(e, { label: f[d], command: e, group: "scayt_suggest", order: d + 1 }), a[e] = CKEDITOR.TRISTATE_OFF) : (b.addMenuItem(e, { label: f[d], command: e, group: "scayt_moresuggest", order: d + 1 }), c[e] = CKEDITOR.TRISTATE_OFF, "on" === b.config.scayt_moreSuggestions && (b.addMenuItem("scayt_moresuggest", {
                            label: l.getLocal("btn_moreSuggestions"),
                            group: "scayt_moresuggest", order: 10, getItems: function () { return c }
                        }), a.scayt_moresuggest = CKEDITOR.TRISTATE_OFF))
                } else for (d = 0; d < f.length; d++)e = "grayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[d].replace(" ", "_"), b.addCommand(e, this.createCommand(CKEDITOR.plugins.scayt.suggestions[d], m, h)), b.addMenuItem(e, { label: f[d], command: e, group: "grayt_suggest", order: d + 1 }), a[e] = CKEDITOR.TRISTATE_OFF; else a.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, b.addCommand("no_scayt_suggest", { exec: function () { } }), b.addMenuItem("no_scayt_suggest",
                    { label: l.getLocal("btn_noSuggestions") || "no_scayt_suggest", command: "no_scayt_suggest", group: "scayt_suggest", order: 0 }); return a
            }, menuGenerator: function (b, f) {
                var d = b.scayt, a = this.scaytMenuDefinition(b), c = {}, m = b.config.scayt_contextCommands.split("|"), h = f.getAttribute(d.getLangAttribute()) || d.getLang(), l, e, k, g; e = d.isScaytNode(f); k = d.isGraytNode(f); e ? (a = a.scayt, l = f.getAttribute(d.getScaytNodeAttributeName()), d.fire("getSuggestionsList", { lang: h, word: l }), c = this.buildSuggestionMenuItems(b, CKEDITOR.plugins.scayt.suggestions,
                    e)) : k && (a = a.grayt, c = f.getAttribute(d.getGraytNodeAttributeName()), d.getGraytNodeRuleAttributeName ? (l = f.getAttribute(d.getGraytNodeRuleAttributeName()), d.getProblemDescriptionText(c, l, h)) : d.getProblemDescriptionText(c, h), g = d.getProblemDescriptionText(c, l, h), a.grayt_problemdescription && g && (g = g.replace(/([.!?])\s/g, "$1\x3cbr\x3e"), a.grayt_problemdescription.label = g), d.fire("getGrammarSuggestionsList", { lang: h, phrase: c, rule: l }), c = this.buildSuggestionMenuItems(b, CKEDITOR.plugins.scayt.suggestions, e)); if (e &&
                        "off" == b.config.scayt_contextCommands) return c; for (var n in a) e && -1 == CKEDITOR.tools.indexOf(m, n.replace("scayt_", "")) && "all" != b.config.scayt_contextCommands || k && "grayt_problemdescription" !== n && -1 == CKEDITOR.tools.indexOf(m, n.replace("grayt_", "")) && "all" != b.config.scayt_contextCommands || (c[n] = "undefined" != typeof a[n].state ? a[n].state : CKEDITOR.TRISTATE_OFF, "function" !== typeof a[n].verification || a[n].verification(b) || delete c[n], b.addCommand(n, { exec: a[n].exec }), b.addMenuItem(n, {
                            label: b.lang.scayt[a[n].label] ||
                                a[n].label, command: n, group: a[n].group, order: a[n].order
                        })); return c
            }, createCommand: function (b, f, d) { return { exec: function (a) { a = a.scayt; var c = {}; c[f] = b; a.replaceSelectionNode(c); "startGrammarCheck" === d && a.removeMarkupInSelectionNode({ grammarOnly: !0 }); a.fire(d) } } }
        }); CKEDITOR.plugins.scayt = {
            charsToObserve: [{
                charName: "cke-fillingChar", charCode: function () {
                    var b = CKEDITOR.version, f = [4, 5, 6], d = String.fromCharCode(8203), a = Array(8).join(d), c, m; if (!b) return d; for (var b = b.split("."), h = 0; h < f.length; h++) {
                        c = f[h]; m =
                            Number(b[h]); if (m > c) return a; if (m < c) break
                    } return d
                }()
            }], state: { scayt: {}, grayt: {} }, warningCounter: 0, suggestions: [], options: { disablingCommandExec: { source: !0, newpage: !0, templates: !0 }, data_attribute_name: "data-scayt-word", misspelled_word_class: "scayt-misspell-word", problem_grammar_data_attribute: "data-grayt-phrase", problem_grammar_class: "gramm-problem" }, backCompatibilityMap: {
                scayt_service_protocol: "scayt_serviceProtocol", scayt_service_host: "scayt_serviceHost", scayt_service_port: "scayt_servicePort", scayt_service_path: "scayt_servicePath",
                scayt_customerid: "scayt_customerId"
            }, openDialog: function (b, f) { var d = f.scayt; d.isAllModulesReady && !1 === d.isAllModulesReady() || (f.lockSelection(), f.openDialog(b)) }, alarmCompatibilityMessage: function () {
                5 > this.warningCounter && (console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."),
                    this.warningCounter += 1)
            }, isNewUdSupported: function (b) { return b.getUserDictionary ? !0 : !1 }, reloadMarkup: function (b) { var f; b && (f = b.getScaytLangList(), b.reloadMarkup ? b.reloadMarkup() : (this.alarmCompatibilityMessage(), f && f.ltr && f.rtl && b.fire("startSpellCheck, startGrammarCheck"))) }, replaceOldOptionsNames: function (b) { for (var f in b) f in this.backCompatibilityMap && (b[this.backCompatibilityMap[f]] = b[f], delete b[f]) }, createScayt: function (b) {
                var f = this, d = CKEDITOR.plugins.scayt; this.loadScaytLibrary(b, function (a) {
                    function b(a) {
                        return new SCAYT.CKSCAYT(a,
                            function () { }, function () { })
                    } var m; a.window && (m = "BODY" == a.editable().$.nodeName ? a.window.getFrame() : a.editable()); if (m) {
                        m = {
                            lang: a.config.scayt_sLang, container: m.$, customDictionary: a.config.scayt_customDictionaryIds, userDictionaryName: a.config.scayt_userDictionaryName, localization: a.langCode, customer_id: a.config.scayt_customerId, customPunctuation: a.config.scayt_customPunctuation, debug: a.config.scayt_debug, data_attribute_name: f.options.data_attribute_name, misspelled_word_class: f.options.misspelled_word_class,
                            problem_grammar_data_attribute: f.options.problem_grammar_data_attribute, problem_grammar_class: f.options.problem_grammar_class, "options-to-restore": a.config.scayt_disableOptionsStorage, focused: a.editable().hasFocus, ignoreElementsRegex: a.config.scayt_elementsToIgnore, ignoreGraytElementsRegex: a.config.grayt_elementsToIgnore, minWordLength: a.config.scayt_minWordLength, graytAutoStartup: a.config.grayt_autoStartup, charsToObserve: d.charsToObserve
                        }; a.config.scayt_serviceProtocol && (m.service_protocol = a.config.scayt_serviceProtocol);
                        a.config.scayt_serviceHost && (m.service_host = a.config.scayt_serviceHost); a.config.scayt_servicePort && (m.service_port = a.config.scayt_servicePort); a.config.scayt_servicePath && (m.service_path = a.config.scayt_servicePath); "boolean" === typeof a.config.scayt_ignoreAllCapsWords && (m["ignore-all-caps-words"] = a.config.scayt_ignoreAllCapsWords); "boolean" === typeof a.config.scayt_ignoreDomainNames && (m["ignore-domain-names"] = a.config.scayt_ignoreDomainNames); "boolean" === typeof a.config.scayt_ignoreWordsWithMixedCases &&
                            (m["ignore-words-with-mixed-cases"] = a.config.scayt_ignoreWordsWithMixedCases); "boolean" === typeof a.config.scayt_ignoreWordsWithNumbers && (m["ignore-words-with-numbers"] = a.config.scayt_ignoreWordsWithNumbers); var h; try { h = b(m) } catch (l) { f.alarmCompatibilityMessage(), delete m.charsToObserve, h = b(m) } h.subscribe("suggestionListSend", function (a) {
                                for (var b = {}, c = [], d = 0; d < a.suggestionList.length; d++)b["word_" + a.suggestionList[d]] || (b["word_" + a.suggestionList[d]] = a.suggestionList[d], c.push(a.suggestionList[d]));
                                CKEDITOR.plugins.scayt.suggestions = c
                            }); h.subscribe("selectionIsChanged", function (b) { a.getSelection().isLocked && "restoreSelection" !== b.action && a.lockSelection(); "restoreSelection" === b.action && a.selectionChange(!0) }); h.subscribe("graytStateChanged", function (b) { d.state.grayt[a.name] = b.state }); h.addMarkupHandler && h.addMarkupHandler(function (b) { var c = a.editable(), d = c.getCustomData(b.charName); d && (d.$ = b.node, c.setCustomData(b.charName, d)) }); a.scayt = h; a.fire("scaytButtonState", a.readOnly ? CKEDITOR.TRISTATE_DISABLED :
                                CKEDITOR.TRISTATE_ON)
                    } else d.state.scayt[a.name] = !1
                })
            }, destroy: function (b) { b.scayt && b.scayt.destroy(); delete b.scayt; b.fire("scaytButtonState", CKEDITOR.TRISTATE_OFF) }, loadScaytLibrary: function (b, f) { var d, a = function () { CKEDITOR.fireOnce("scaytReady"); b.scayt || "function" === typeof f && f(b) }; "undefined" === typeof window.SCAYT || "function" !== typeof window.SCAYT.CKSCAYT ? (d = b.config.scayt_srcUrl, CKEDITOR.scriptLoader.load(d, function (b) { b && a() })) : window.SCAYT && "function" === typeof window.SCAYT.CKSCAYT && a() }
        };
        CKEDITOR.on("dialogDefinition", function (b) {
            var f = b.data.name; b = b.data.definition.dialog; "scaytDialog" !== f && "checkspell" !== f && (b.on("show", function (b) { b = b.sender && b.sender.getParentEditor(); var a = CKEDITOR.plugins.scayt, c = b.scayt; c && a.state.scayt[b.name] && c.setMarkupPaused && c.setMarkupPaused(!0) }), b.on("hide", function (b) { b = b.sender && b.sender.getParentEditor(); var a = CKEDITOR.plugins.scayt, c = b.scayt; c && a.state.scayt[b.name] && c.setMarkupPaused && c.setMarkupPaused(!1) })); if ("scaytDialog" === f) b.on("cancel",
                function (b) { return !1 }, this, null, -1); if ("checkspell" === f) b.on("cancel", function (b) { b = b.sender && b.sender.getParentEditor(); var a = CKEDITOR.plugins.scayt, c = b.scayt; c && a.state.scayt[b.name] && c.setMarkupPaused && c.setMarkupPaused(!1); b.unlockSelection() }, this, null, -2); if ("link" === f) b.on("ok", function (b) { var a = b.sender && b.sender.getParentEditor(); a && setTimeout(function () { a.fire("reloadMarkupScayt", { removeOptions: { removeInside: !0, forceBookmark: !0 }, timeout: 0 }) }, 0) }); if ("replace" === f) b.on("hide", function (b) {
                    b =
                    b.sender && b.sender.getParentEditor(); var a = CKEDITOR.plugins.scayt, c = b.scayt; b && setTimeout(function () { c && (c.fire("removeMarkupInDocument", {}), a.reloadMarkup(c)) }, 0)
                })
        }); CKEDITOR.on("scaytReady", function () {
            if (!0 === CKEDITOR.config.scayt_handleCheckDirty) {
                var b = CKEDITOR.editor.prototype; b.checkDirty = CKEDITOR.tools.override(b.checkDirty, function (b) {
                    return function () {
                        var a = null, c = this.scayt; if (CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt) {
                            if (a = "ready" == this.status) var f =
                                c.removeMarkupFromString(this.getSnapshot()), c = c.removeMarkupFromString(this._.previousValue), a = a && c !== f
                        } else a = b.call(this); return a
                    }
                }); b.resetDirty = CKEDITOR.tools.override(b.resetDirty, function (b) { return function () { var a = this.scayt; CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt ? this._.previousValue = a.removeMarkupFromString(this.getSnapshot()) : b.call(this) } })
            } if (!0 === CKEDITOR.config.scayt_handleUndoRedo) {
                var b = CKEDITOR.plugins.undo.Image.prototype, f = "function" ==
                    typeof b.equalsContent ? "equalsContent" : "equals"; b[f] = CKEDITOR.tools.override(b[f], function (b) { return function (a) { var c = a.editor.scayt, f = this.contents, h = a.contents, l = null; CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[a.editor.name] && a.editor.scayt && (this.contents = c.removeMarkupFromString(f) || "", a.contents = c.removeMarkupFromString(h) || ""); l = b.apply(this, arguments); this.contents = f; a.contents = h; return l } })
            }
        }); (function () {
            CKEDITOR.plugins.add("selectall", {
                init: function (b) {
                    b.addCommand("selectAll",
                        { modes: { wysiwyg: 1, source: 1 }, exec: function (b) { var d = b.editable(); if (d.is("textarea")) b = d.$, CKEDITOR.env.ie && b.createTextRange ? b.createTextRange().execCommand("SelectAll") : (b.selectionStart = 0, b.selectionEnd = b.value.length), b.focus(); else { if (d.is("body")) b.document.$.execCommand("SelectAll", !1, null); else { var a = b.createRange(); a.selectNodeContents(d); a.select() } b.forceNextSelectionCheck(); b.selectionChange() } }, canUndo: !1 }); b.ui.addButton && b.ui.addButton("SelectAll", {
                            label: b.lang.selectall.toolbar, command: "selectAll",
                            toolbar: "selection,10"
                        })
                }
            })
        })(); (function () {
            var b = { readOnly: 1, preserveState: !0, editorFocus: !1, exec: function (b) { this.toggleState(); this.refresh(b) }, refresh: function (b) { if (b.document) { var d = this.state != CKEDITOR.TRISTATE_ON || b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !b.focusManager.hasFocus ? "removeClass" : "attachClass"; b.editable()[d]("cke_show_blocks") } } }; CKEDITOR.plugins.add("showblocks", {
                onLoad: function () {
                    var b = "p div pre address blockquote h1 h2 h3 h4 h5 h6".split(" "), d, a, c, m, h = CKEDITOR.getUrl(this.path),
                    l = !(CKEDITOR.env.ie && 9 > CKEDITOR.env.version), e = l ? ":not([contenteditable\x3dfalse]):not(.cke_show_blocks_off)" : "", k, g; for (d = a = c = m = ""; k = b.pop();)g = b.length ? "," : "", d += ".cke_show_blocks " + k + e + g, c += ".cke_show_blocks.cke_contents_ltr " + k + e + g, m += ".cke_show_blocks.cke_contents_rtl " + k + e + g, a += ".cke_show_blocks " + k + e + "{background-image:url(" + CKEDITOR.getUrl(h + "images/block_" + k + ".png") + ")}"; CKEDITOR.addCss((d + "{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(a, c + "{background-position:top left;padding-left:8px}",
                        m + "{background-position:top right;padding-right:8px}")); l || CKEDITOR.addCss(".cke_show_blocks [contenteditable\x3dfalse],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}")
                }, init: function (f) {
                    function d() { a.refresh(f) }
                    if (!f.blockless) { var a = f.addCommand("showblocks", b); a.canUndo = !1; f.config.startupOutlineBlocks && a.setState(CKEDITOR.TRISTATE_ON); f.ui.addButton && f.ui.addButton("ShowBlocks", { label: f.lang.showblocks.toolbar, command: "showblocks", toolbar: "tools,20" }); f.on("mode", function () { a.state != CKEDITOR.TRISTATE_DISABLED && a.refresh(f) }); f.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (f.on("focus", d), f.on("blur", d)); f.on("contentDom", function () { a.state != CKEDITOR.TRISTATE_DISABLED && a.refresh(f) }) }
                }
            })
        })(); (function () {
            var b =
                { preserveState: !0, editorFocus: !1, readOnly: 1, exec: function (b) { this.toggleState(); this.refresh(b) }, refresh: function (b) { if (b.document) { var d = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass"; b.editable()[d]("cke_show_borders") } } }; CKEDITOR.plugins.add("showborders", {
                    modes: { wysiwyg: 1 }, onLoad: function () {
                        var b; b = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
                            "cke_show_border").replace(/%1/g, "cke_show_borders "); CKEDITOR.addCss(b)
                    }, init: function (f) {
                        var d = f.addCommand("showborders", b); d.canUndo = !1; !1 !== f.config.startupShowBorders && d.setState(CKEDITOR.TRISTATE_ON); f.on("mode", function () { d.state != CKEDITOR.TRISTATE_DISABLED && d.refresh(f) }, null, null, 100); f.on("contentDom", function () { d.state != CKEDITOR.TRISTATE_DISABLED && d.refresh(f) }); f.on("removeFormatCleanup", function (a) {
                            a = a.data; f.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && a.is("table") && (!a.hasAttribute("border") ||
                                0 >= parseInt(a.getAttribute("border"), 10)) && a.addClass("cke_show_border")
                        })
                    }, afterInit: function (b) {
                        var d = b.dataProcessor; b = d && d.dataFilter; d = d && d.htmlFilter; b && b.addRules({ elements: { table: function (a) { a = a.attributes; var b = a["class"], d = parseInt(a.border, 10); d && !(0 >= d) || b && -1 != b.indexOf("cke_show_border") || (a["class"] = (b || "") + " cke_show_border") } } }); d && d.addRules({
                            elements: {
                                table: function (a) {
                                    a = a.attributes; var b = a["class"]; b && (a["class"] = b.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/,
                                        ""))
                                }
                            }
                        })
                    }
                }); CKEDITOR.on("dialogDefinition", function (b) {
                    var d = b.data.name; if ("table" == d || "tableProperties" == d) if (b = b.data.definition, d = b.getContents("info").get("txtBorder"), d.commit = CKEDITOR.tools.override(d.commit, function (a) { return function (b, d) { a.apply(this, arguments); var f = parseInt(this.getValue(), 10); d[!f || 0 >= f ? "addClass" : "removeClass"]("cke_show_border") } }), b = (b = b.getContents("advanced")) && b.get("advCSSClasses")) b.setup = CKEDITOR.tools.override(b.setup, function (a) {
                        return function () {
                            a.apply(this,
                                arguments); this.setValue(this.getValue().replace(/cke_show_border/, ""))
                        }
                    }), b.commit = CKEDITOR.tools.override(b.commit, function (a) { return function (b, d) { a.apply(this, arguments); parseInt(d.getAttribute("border"), 10) || d.addClass("cke_show_border") } })
                })
        })(); CKEDITOR.plugins.add("smiley", {
            requires: "dialog", init: function (b) {
                b.config.smiley_path = b.config.smiley_path || this.path + "images/"; b.addCommand("smiley", new CKEDITOR.dialogCommand("smiley", { allowedContent: "img[alt,height,!src,title,width]", requiredContent: "img" }));
                b.ui.addButton && b.ui.addButton("Smiley", { label: b.lang.smiley.toolbar, command: "smiley", toolbar: "insert,50" }); CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js")
            }
        }); CKEDITOR.config.smiley_images = "regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png".split(" ");
        CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";"); (function () {
            CKEDITOR.plugins.add("sourcearea", {
                init: function (f) {
                    function d() { var a = c && this.equals(CKEDITOR.document.getActive()); this.hide(); this.setStyle("height", this.getParent().$.clientHeight + "px"); this.setStyle("width", this.getParent().$.clientWidth + "px"); this.show(); a && this.focus() } if (f.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        var a =
                            CKEDITOR.plugins.sourcearea; f.addMode("source", function (a) {
                                var c = f.ui.space("contents").getDocument().createElement("textarea"); c.setStyles(CKEDITOR.tools.extend({ width: CKEDITOR.env.ie7Compat ? "99%" : "100%", height: "100%", resize: "none", outline: "none", "text-align": "left" }, CKEDITOR.tools.cssVendorPrefix("tab-size", f.config.sourceAreaTabSize || 4))); c.setAttribute("dir", "ltr"); c.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu"); f.ui.space("contents").append(c); c = f.editable(new b(f,
                                    c)); c.setData(f.getData(1)); CKEDITOR.env.ie && (c.attachListener(f, "resize", d, c), c.attachListener(CKEDITOR.document.getWindow(), "resize", d, c), CKEDITOR.tools.setTimeout(d, 0, c)); f.fire("ariaWidget", this); a()
                            }); f.addCommand("source", a.commands.source); f.ui.addButton && f.ui.addButton("Source", { label: f.lang.sourcearea.toolbar, command: "source", toolbar: "mode,10" }); f.on("mode", function () { f.getCommand("source").setState("source" == f.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }); var c = CKEDITOR.env.ie && 9 ==
                                CKEDITOR.env.version
                    }
                }
            }); var b = CKEDITOR.tools.createClass({ base: CKEDITOR.editable, proto: { setData: function (b) { this.setValue(b); this.status = "ready"; this.editor.fire("dataReady") }, getData: function () { return this.getValue() }, insertHtml: function () { }, insertElement: function () { }, insertText: function () { }, setReadOnly: function (b) { this[(b ? "set" : "remove") + "Attribute"]("readOnly", "readonly") }, detach: function () { b.baseProto.detach.call(this); this.clearCustomData(); this.remove() } } })
        })(); CKEDITOR.plugins.sourcearea =
            { commands: { source: { modes: { wysiwyg: 1, source: 1 }, editorFocus: !1, readOnly: 1, exec: function (b) { "wysiwyg" == b.mode && b.fire("saveSnapshot"); b.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED); b.setMode("source" == b.mode ? "wysiwyg" : "source") }, canUndo: !1 } } }; CKEDITOR.plugins.add("specialchar", {
                availableLangs: {
                    af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fr: 1, "fr-ca": 1, gl: 1, he: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1,
                    lt: 1, lv: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1
                }, requires: "dialog", init: function (b) {
                    var f = this; CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js"); b.addCommand("specialchar", {
                        exec: function () {
                            var d = b.langCode, d = f.availableLangs[d] ? d : f.availableLangs[d.replace(/-.*/, "")] ? d.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(f.path + "dialogs/lang/" + d + ".js"), function () {
                                CKEDITOR.tools.extend(b.lang.specialchar,
                                    f.langEntries[d]); b.openDialog("specialchar")
                            })
                        }, modes: { wysiwyg: 1 }, canUndo: !1
                    }); b.ui.addButton && b.ui.addButton("SpecialChar", { label: b.lang.specialchar.toolbar, command: "specialchar", toolbar: "insert,50" })
                }
            }); CKEDITOR.config.specialChars = "! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" ");
        (function () {
            CKEDITOR.plugins.add("stylescombo", {
                requires: "richcombo", init: function (b) {
                    var f = b.config, d = b.lang.stylescombo, a = {}, c = [], m = []; b.on("stylesSet", function (d) {
                        if (d = d.data.styles) {
                            for (var l, e, k, g = 0, n = d.length; g < n; g++)(l = d[g], b.blockless && l.element in CKEDITOR.dtd.$block || "string" == typeof l.type && !CKEDITOR.style.customHandlers[l.type] || (e = l.name, l = new CKEDITOR.style(l), b.filter.customConfig && !b.filter.check(l))) || (l._name = e, l._.enterMode = f.enterMode, l._.type = k = l.assignedTo || l.type, l._.weight =
                                g + 1E3 * (k == CKEDITOR.STYLE_OBJECT ? 1 : k == CKEDITOR.STYLE_BLOCK ? 2 : 3), a[e] = l, c.push(l), m.push(l)); c.sort(function (a, b) { return a._.weight - b._.weight })
                        }
                    }); b.on("stylesRemove", function (c) { c = c.data && c.data.type; var d = void 0 === c, e; for (e in a) { var f = a[e]; (d || f.type === c) && b.removeStyle(f) } }); b.ui.addRichCombo("Styles", {
                        label: d.label, title: d.panelTitle, toolbar: "styles,10", allowedContent: m, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(f.contentsCss), multiSelect: !0, attributes: { "aria-label": d.panelTitle } }, init: function () {
                            var a,
                            b, e, f, g, m; g = 0; for (m = c.length; g < m; g++)a = c[g], b = a._name, f = a._.type, f != e && (this.startGroup(d["panelTitle" + String(f)]), e = f), this.add(b, a.type == CKEDITOR.STYLE_OBJECT ? b : a.buildPreview(), b); this.commit()
                        }, onClick: function (c) { b.focus(); b.fire("saveSnapshot"); c = a[c]; var d = b.elementPath(); if (c.group && c.removeStylesFromSameGroup(b)) b.applyStyle(c); else b[c.checkActive(d, b) ? "removeStyle" : "applyStyle"](c); b.fire("saveSnapshot") }, onRender: function () {
                            b.on("selectionChange", function (c) {
                                var d = this.getValue(); c = c.data.path.elements;
                                for (var e = 0, f = c.length, g; e < f; e++) { g = c[e]; for (var m in a) if (a[m].checkElementRemovable(g, !0, b)) { m != d && this.setValue(m); return } } this.setValue("")
                            }, this)
                        }, onOpen: function () {
                            var c = b.getSelection(), c = c.getSelectedElement() || c.getStartElement() || b.editable(), c = b.elementPath(c), f = [0, 0, 0, 0]; this.showAll(); this.unmarkAll(); for (var e in a) { var k = a[e], g = k._.type; k.checkApplicable(c, b, b.activeFilter) ? f[g]++ : this.hideItem(e); k.checkActive(c, b) && this.mark(e) } f[CKEDITOR.STYLE_BLOCK] || this.hideGroup(d["panelTitle" +
                                String(CKEDITOR.STYLE_BLOCK)]); f[CKEDITOR.STYLE_INLINE] || this.hideGroup(d["panelTitle" + String(CKEDITOR.STYLE_INLINE)]); f[CKEDITOR.STYLE_OBJECT] || this.hideGroup(d["panelTitle" + String(CKEDITOR.STYLE_OBJECT)])
                        }, refresh: function () { var c = b.elementPath(); if (c) { for (var d in a) if (a[d].checkApplicable(c, b, b.activeFilter)) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }, reset: function () { a = {}; c = [] }
                    })
                }
            })
        })(); (function () {
            function b(a) {
                return {
                    editorFocus: !1, canUndo: !1, modes: { wysiwyg: 1 }, exec: function (b) {
                        if (b.editable().hasFocus) {
                            var d =
                                b.getSelection(), f; if (f = (new CKEDITOR.dom.elementPath(d.getCommonAncestor(), d.root)).contains({ td: 1, th: 1 }, 1)) {
                                    var d = b.createRange(), e = CKEDITOR.tools.tryThese(function () { var b = f.getParent().$.cells[f.$.cellIndex + (a ? -1 : 1)]; b.parentNode.parentNode; return b }, function () { var b = f.getParent(), b = b.getAscendant("table").$.rows[b.$.rowIndex + (a ? -1 : 1)]; return b.cells[a ? b.cells.length - 1 : 0] }); if (e || a) if (e) e = new CKEDITOR.dom.element(e), d.moveToElementEditStart(e), d.checkStartOfBlock() && d.checkEndOfBlock() || d.selectNodeContents(e);
                                    else return !0; else { for (var k = f.getAscendant("table").$, e = f.getParent().$.cells, k = new CKEDITOR.dom.element(k.insertRow(-1), b.document), g = 0, n = e.length; g < n; g++)k.append((new CKEDITOR.dom.element(e[g], b.document)).clone(!1, !1)).appendBogus(); d.moveToElementEditStart(k) } d.select(!0); return !0
                                }
                        } return !1
                    }
                }
            } var f = { editorFocus: !1, modes: { wysiwyg: 1, source: 1 } }, d = { exec: function (a) { a.container.focusNext(!0, a.tabIndex) } }, a = { exec: function (a) { a.container.focusPrevious(!0, a.tabIndex) } }; CKEDITOR.plugins.add("tab", {
                init: function (c) {
                    for (var m =
                        !1 !== c.config.enableTabKeyTools, h = c.config.tabSpaces || 0, l = ""; h--;)l += " "; if (l) c.on("key", function (a) { 9 == a.data.keyCode && (c.insertText(l), a.cancel()) }); if (m) c.on("key", function (a) { (9 == a.data.keyCode && c.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && c.execCommand("selectPreviousCell")) && a.cancel() }); c.addCommand("blur", CKEDITOR.tools.extend(d, f)); c.addCommand("blurBack", CKEDITOR.tools.extend(a, f)); c.addCommand("selectNextCell", b()); c.addCommand("selectPreviousCell", b(!0))
                }
            })
        })(); CKEDITOR.dom.element.prototype.focusNext =
            function (b, f) {
                var d = void 0 === f ? this.getTabIndex() : f, a, c, m, h, l, e; if (0 >= d) for (l = this.getNextSourceNode(b, CKEDITOR.NODE_ELEMENT); l;) { if (l.isVisible() && 0 === l.getTabIndex()) { m = l; break } l = l.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT) } else for (l = this.getDocument().getBody().getFirst(); l = l.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
                    if (!a) if (!c && l.equals(this)) { if (c = !0, b) { if (!(l = l.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; a = 1 } } else c && !this.contains(l) && (a = 1); if (l.isVisible() && !(0 > (e = l.getTabIndex()))) {
                        if (a &&
                            e == d) { m = l; break } e > d && (!m || !h || e < h) ? (m = l, h = e) : m || 0 !== e || (m = l, h = e)
                    }
                } m && m.focus()
            }; CKEDITOR.dom.element.prototype.focusPrevious = function (b, f) {
                for (var d = void 0 === f ? this.getTabIndex() : f, a, c, m, h = 0, l, e = this.getDocument().getBody().getLast(); e = e.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
                    if (!a) if (!c && e.equals(this)) { if (c = !0, b) { if (!(e = e.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; a = 1 } } else c && !this.contains(e) && (a = 1); if (e.isVisible() && !(0 > (l = e.getTabIndex()))) if (0 >= d) {
                        if (a && 0 === l) { m = e; break } l >
                            h && (m = e, h = l)
                    } else { if (a && l == d) { m = e; break } l < d && (!m || l > h) && (m = e, h = l) }
                } m && m.focus()
            }; CKEDITOR.plugins.add("table", {
                requires: "dialog", init: function (b) {
                    function f(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } if (!b.blockless) {
                        var d = b.lang.table; b.addCommand("table", new CKEDITOR.dialogCommand("table", {
                            context: "table", allowedContent: "table{width,height,border-collapse}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];td{border*,background-color,vertical-align,width,height}[colspan,rowspan];" +
                                (b.plugins.dialogadvtab ? "table" + b.plugins.dialogadvtab.allowedContent() : ""), requiredContent: "table", contentTransformations: [["table{width}: sizeToStyle", "table[width]: sizeToAttribute"], ["td: splitBorderShorthand"], [{
                                    element: "table", right: function (a) {
                                        if (a.styles) {
                                            var b; if (a.styles.border) b = CKEDITOR.tools.style.parse.border(a.styles.border); else if (CKEDITOR.env.ie && 8 === CKEDITOR.env.version) {
                                                var d = a.styles; d["border-left"] && d["border-left"] === d["border-right"] && d["border-right"] === d["border-top"] &&
                                                    d["border-top"] === d["border-bottom"] && (b = CKEDITOR.tools.style.parse.border(d["border-top"]))
                                            } b && b.style && "solid" === b.style && b.width && 0 !== parseFloat(b.width) && (a.attributes.border = 1); "collapse" == a.styles["border-collapse"] && (a.attributes.cellspacing = 0)
                                        }
                                    }
                                }]]
                        })); b.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", f())); b.addCommand("tableDelete", f({
                            exec: function (a) {
                                var b = a.elementPath().contains("table", 1); if (b) {
                                    var d = b.getParent(), f = a.editable(); 1 != d.getChildCount() || d.is("td",
                                        "th") || d.equals(f) || (b = d); a = a.createRange(); a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START); b.remove(); a.select()
                                }
                            }
                        })); b.ui.addButton && b.ui.addButton("Table", { label: d.toolbar, command: "table", toolbar: "insert,30" }); CKEDITOR.dialog.add("table", this.path + "dialogs/table.js"); CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js"); b.addMenuItems && b.addMenuItems({
                            table: { label: d.menu, command: "tableProperties", group: "table", order: 5 }, tabledelete: {
                                label: d.deleteTable, command: "tableDelete", group: "table",
                                order: 1
                            }
                        }); b.on("doubleclick", function (a) { a.data.element.is("table") && (a.data.dialog = "tableProperties") }); b.contextMenu && b.contextMenu.addListener(function () { return { tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF } })
                    }
                }
            }); (function () {
                function b(a, b) {
                    function c(a) { return b ? b.contains(a) && a.getAscendant("table", !0).equals(b) : !0 } function d(a) {
                        var b = /^(?:td|th)$/; 0 < e.length || a.type != CKEDITOR.NODE_ELEMENT || !b.test(a.getName()) || a.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(f,
                            a, "selected_cell", !0), e.push(a))
                    } var e = [], f = {}; if (!a) return e; for (var g = a.getRanges(), h = 0; h < g.length; h++) { var k = g[h]; if (k.collapsed) (k = k.getCommonAncestor().getAscendant({ td: 1, th: 1 }, !0)) && c(k) && e.push(k); else { var k = new CKEDITOR.dom.walker(k), l; for (k.guard = d; l = k.next();)l.type == CKEDITOR.NODE_ELEMENT && l.is(CKEDITOR.dtd.table) || (l = l.getAscendant({ td: 1, th: 1 }, !0)) && !l.getCustomData("selected_cell") && c(l) && (CKEDITOR.dom.element.setMarker(f, l, "selected_cell", !0), e.push(l)) } } CKEDITOR.dom.element.clearAllMarkers(f);
                    return e
                } function f(a, c) {
                    for (var d = r(a) ? a : b(a), e = d[0], f = e.getAscendant("table"), e = e.getDocument(), g = d[0].getParent(), h = g.$.rowIndex, d = d[d.length - 1], k = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = new CKEDITOR.dom.element(f.$.rows[k]), h = c ? h : k, g = c ? g : d, d = CKEDITOR.tools.buildTableMap(f), f = d[h], h = c ? d[h - 1] : d[h + 1], d = d[0].length, e = e.createElement("tr"), k = 0; f[k] && k < d; k++) {
                        var l; 1 < f[k].rowSpan && h && f[k] == h[k] ? (l = f[k], l.rowSpan += 1) : (l = (new CKEDITOR.dom.element(f[k])).clone(), l.removeAttribute("rowSpan"), l.appendBogus(),
                            e.append(l), l = l.$); k += l.colSpan - 1
                    } c ? e.insertBefore(g) : e.insertAfter(g); return e
                } function d(a) {
                    if (a instanceof CKEDITOR.dom.selection) {
                        var c = a.getRanges(), e = b(a), f = e[0].getAscendant("table"), g = CKEDITOR.tools.buildTableMap(f), h = e[0].getParent().$.rowIndex, e = e[e.length - 1], k = e.getParent().$.rowIndex + e.$.rowSpan - 1, e = []; a.reset(); for (a = h; a <= k; a++) {
                            for (var l = g[a], m = new CKEDITOR.dom.element(f.$.rows[a]), n = 0; n < l.length; n++) {
                                var q = new CKEDITOR.dom.element(l[n]), r = q.getParent().$.rowIndex; 1 == q.$.rowSpan ? q.remove() :
                                    (--q.$.rowSpan, r == a && (r = g[a + 1], r[n - 1] ? q.insertAfter(new CKEDITOR.dom.element(r[n - 1])) : (new CKEDITOR.dom.element(f.$.rows[a + 1])).append(q, 1))); n += q.$.colSpan - 1
                            } e.push(m)
                        } g = f.$.rows; c[0].moveToPosition(f, CKEDITOR.POSITION_BEFORE_START); h = new CKEDITOR.dom.element(g[k + 1] || (0 < h ? g[h - 1] : null) || f.$.parentNode); for (a = e.length; 0 <= a; a--)d(e[a]); return f.$.parentNode ? h : (c[0].select(), null)
                    } a instanceof CKEDITOR.dom.element && (f = a.getAscendant("table"), 1 == f.$.rows.length ? f.remove() : a.remove()); return null
                } function a(a) {
                    for (var b =
                        a.getParent().$.cells, c = 0, d = 0; d < b.length; d++) { var e = b[d], c = c + e.colSpan; if (e == a.$) break } return c - 1
                } function c(b, c) { for (var d = c ? Infinity : 0, e = 0; e < b.length; e++) { var f = a(b[e]); if (c ? f < d : f > d) d = f } return d } function m(a, d) {
                    for (var e = r(a) ? a : b(a), f = e[0].getAscendant("table"), g = c(e, 1), e = c(e), h = d ? g : e, k = CKEDITOR.tools.buildTableMap(f), f = [], g = [], e = [], l = k.length, m = 0; m < l; m++) { var n = d ? k[m][h - 1] : k[m][h + 1]; f.push(k[m][h]); g.push(n) } for (m = 0; m < l; m++)f[m] && (1 < f[m].colSpan && g[m] == f[m] ? (k = f[m], k.colSpan += 1) : (h = new CKEDITOR.dom.element(f[m]),
                        k = h.clone(), k.removeAttribute("colSpan"), k.appendBogus(), k[d ? "insertBefore" : "insertAfter"].call(k, h), e.push(k), k = k.$), m += k.rowSpan - 1); return e
                } function h(a) {
                    function c(a) {
                        var b = a.getRanges(), d, e; if (1 !== b.length) return a; b = b[0]; if (b.collapsed || 0 !== b.endOffset) return a; d = b.endContainer; e = d.getName().toLowerCase(); if ("td" !== e && "th" !== e) return a; for ((e = d.getPrevious()) || (e = d.getParent().getPrevious().getLast()); e.type !== CKEDITOR.NODE_TEXT && "br" !== e.getName().toLowerCase();)if (e = e.getLast(), !e) return a;
                        b.setEndAt(e, CKEDITOR.POSITION_BEFORE_END); return b.select()
                    } CKEDITOR.env.webkit && !a.isFake && (a = c(a)); var d = a.getRanges(), e = b(a), f = e[0], g = e[e.length - 1], e = f.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(e), k, l, m = []; a.reset(); var n = 0; for (a = h.length; n < a; n++)for (var q = 0, r = h[n].length; q < r; q++)void 0 === k && h[n][q] == f.$ && (k = q), h[n][q] == g.$ && (l = q); for (n = k; n <= l; n++)for (q = 0; q < h.length; q++)g = h[q], f = new CKEDITOR.dom.element(e.$.rows[q]), g = new CKEDITOR.dom.element(g[n]), g.$ && (1 == g.$.colSpan ? g.remove() : --g.$.colSpan,
                        q += g.$.rowSpan - 1, f.$.cells.length || m.push(f)); k = h[0].length - 1 > l ? new CKEDITOR.dom.element(h[0][l + 1]) : k && -1 !== h[0][k - 1].cellIndex ? new CKEDITOR.dom.element(h[0][k - 1]) : new CKEDITOR.dom.element(e.$.parentNode); m.length == a && (d[0].moveToPosition(e, CKEDITOR.POSITION_AFTER_END), d[0].select(), e.remove()); return k
                } function l(a, b) { var c = a.getStartElement().getAscendant({ td: 1, th: 1 }, !0); if (c) { var d = c.clone(); d.appendBogus(); b ? d.insertBefore(c) : d.insertAfter(c) } } function e(a) {
                    if (a instanceof CKEDITOR.dom.selection) {
                        var c =
                            a.getRanges(), d = b(a), f = d[0] && d[0].getAscendant("table"), g; a: { var h = 0; g = d.length - 1; for (var l = {}, m, n; m = d[h++];)CKEDITOR.dom.element.setMarker(l, m, "delete_cell", !0); for (h = 0; m = d[h++];)if ((n = m.getPrevious()) && !n.getCustomData("delete_cell") || (n = m.getNext()) && !n.getCustomData("delete_cell")) { CKEDITOR.dom.element.clearAllMarkers(l); g = n; break a } CKEDITOR.dom.element.clearAllMarkers(l); h = d[0].getParent(); (h = h.getPrevious()) ? g = h.getLast() : (h = d[g].getParent(), g = (h = h.getNext()) ? h.getChild(0) : null) } a.reset(); for (a =
                                d.length - 1; 0 <= a; a--)e(d[a]); g ? k(g, !0) : f && (c[0].moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), c[0].select(), f.remove())
                    } else a instanceof CKEDITOR.dom.element && (c = a.getParent(), 1 == c.getChildCount() ? c.remove() : a.remove())
                } function k(a, b) { var c = a.getDocument(), d = CKEDITOR.document; CKEDITOR.env.ie && 10 == CKEDITOR.env.version && (d.focus(), c.focus()); c = new CKEDITOR.dom.range(c); c["moveToElementEdit" + (b ? "End" : "Start")](a) || (c.selectNodeContents(a), c.collapse(b ? !1 : !0)); c.select(!0) } function g(a, b, c) {
                    a = a[b];
                    if ("undefined" == typeof c) return a; for (b = 0; a && b < a.length; b++) { if (c.is && a[b] == c.$) return b; if (b == c) return new CKEDITOR.dom.element(a[b]) } return c.is ? -1 : null
                } function n(a, c, d) {
                    var e = b(a), f; if ((c ? 1 != e.length : 2 > e.length) || (f = a.getCommonAncestor()) && f.type == CKEDITOR.NODE_ELEMENT && f.is("table")) return !1; a = e[0]; f = a.getAscendant("table"); var h = CKEDITOR.tools.buildTableMap(f), k = h.length, l = h[0].length, m = a.getParent().$.rowIndex, n = g(h, m, a), q; if (c) {
                        var r; try {
                            var u = parseInt(a.getAttribute("rowspan"), 10) || 1; q = parseInt(a.getAttribute("colspan"),
                                10) || 1; r = h["up" == c ? m - u : "down" == c ? m + u : m]["left" == c ? n - q : "right" == c ? n + q : n]
                        } catch (x) { return !1 } if (!r || a.$ == r) return !1; e["up" == c || "left" == c ? "unshift" : "push"](new CKEDITOR.dom.element(r))
                    } c = a.getDocument(); var E = m, u = r = 0, R = !d && new CKEDITOR.dom.documentFragment(c), J = 0; for (c = 0; c < e.length; c++) {
                        q = e[c]; var L = q.getParent(), Q = q.getFirst(), N = q.$.colSpan, K = q.$.rowSpan, L = L.$.rowIndex, O = g(h, L, q), J = J + N * K, u = Math.max(u, O - n + N); r = Math.max(r, L - m + K); d || (N = q, (K = N.getBogus()) && K.remove(), N.trim(), q.getChildren().count() && (L ==
                            E || !Q || Q.isBlockBoundary && Q.isBlockBoundary({ br: 1 }) || (E = R.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !E || E.is && E.is("br") || R.append("br")), q.moveChildren(R)), c ? q.remove() : q.setHtml("")); E = L
                    } if (d) return r * u == J; R.moveChildren(a); a.appendBogus(); u >= l ? a.removeAttribute("rowSpan") : a.$.rowSpan = r; r >= k ? a.removeAttribute("colSpan") : a.$.colSpan = u; d = new CKEDITOR.dom.nodeList(f.$.rows); e = d.count(); for (c = e - 1; 0 <= c; c--)f = d.getItem(c), f.$.cells.length || (f.remove(), e++); return a
                } function q(a, c) {
                    var d = b(a); if (1 <
                        d.length) return !1; if (c) return !0; var d = d[0], e = d.getParent(), f = e.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(f), k = e.$.rowIndex, l = g(h, k, d), m = d.$.rowSpan, n; if (1 < m) { n = Math.ceil(m / 2); for (var m = Math.floor(m / 2), e = k + n, f = new CKEDITOR.dom.element(f.$.rows[e]), h = g(h, e), q, e = d.clone(), k = 0; k < h.length; k++)if (q = h[k], q.parentNode == f.$ && k > l) { e.insertBefore(new CKEDITOR.dom.element(q)); break } else q = null; q || f.append(e) } else for (m = n = 1, f = e.clone(), f.insertAfter(e), f.append(e = d.clone()), q = g(h, k), l = 0; l < q.length; l++)q[l].rowSpan++;
                    e.appendBogus(); d.$.rowSpan = n; e.$.rowSpan = m; 1 == n && d.removeAttribute("rowSpan"); 1 == m && e.removeAttribute("rowSpan"); return e
                } function u(a, c) {
                    var d = b(a); if (1 < d.length) return !1; if (c) return !0; var d = d[0], e = d.getParent(), f = e.getAscendant("table"), f = CKEDITOR.tools.buildTableMap(f), h = g(f, e.$.rowIndex, d), k = d.$.colSpan; if (1 < k) e = Math.ceil(k / 2), k = Math.floor(k / 2); else { for (var k = e = 1, l = [], m = 0; m < f.length; m++) { var n = f[m]; l.push(n[h]); 1 < n[h].rowSpan && (m += n[h].rowSpan - 1) } for (f = 0; f < l.length; f++)l[f].colSpan++ } f = d.clone();
                    f.insertAfter(d); f.appendBogus(); d.$.colSpan = e; f.$.colSpan = k; 1 == e && d.removeAttribute("colSpan"); 1 == k && f.removeAttribute("colSpan"); return f
                } var r = CKEDITOR.tools.isArray; CKEDITOR.plugins.tabletools = {
                    requires: "table,dialog,contextmenu", init: function (a) {
                        function c(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } function g(b, c) { var d = a.addCommand(b, c); a.addFeature(d) } var r = a.lang.table,
                            x = CKEDITOR.tools.style.parse, w = "td{width} td{height} td{border-color} td{background-color} td{white-space} td{vertical-align} td{text-align} td[colspan] td[rowspan] th".split(" "); g("cellProperties", new CKEDITOR.dialogCommand("cellProperties", c({
                                allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]", requiredContent: w, contentTransformations: [[{
                                    element: "td", left: function (a) { return a.styles.background && x.background(a.styles.background).color },
                                    right: function (a) { a.styles["background-color"] = x.background(a.styles.background).color }
                                }, { element: "td", check: "td{vertical-align}", left: function (a) { return a.attributes && a.attributes.valign }, right: function (a) { a.styles["vertical-align"] = a.attributes.valign; delete a.attributes.valign } }], [{
                                    element: "tr", check: "td{height}", left: function (a) { return a.styles && a.styles.height }, right: function (a) {
                                        CKEDITOR.tools.array.forEach(a.children, function (b) { b.name in { td: 1, th: 1 } && (b.attributes["cke-row-height"] = a.styles.height) });
                                        delete a.styles.height
                                    }
                                }], [{ element: "td", check: "td{height}", left: function (a) { return (a = a.attributes) && a["cke-row-height"] }, right: function (a) { a.styles.height = a.attributes["cke-row-height"]; delete a.attributes["cke-row-height"] } }]]
                            }))); CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js"); g("rowDelete", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); (a = d(a)) && k(a) } })); g("rowInsertBefore", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); a = b(a); f(a, !0) } }));
                        g("rowInsertAfter", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); a = b(a); f(a) } })); g("columnDelete", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); (a = h(a)) && k(a, !0) } })); g("columnInsertBefore", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); a = b(a); m(a, !0) } })); g("columnInsertAfter", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); a = b(a); m(a) } })); g("cellDelete", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); e(a) } })); g("cellMerge",
                            c({ allowedContent: "td[colspan,rowspan]", requiredContent: "td[colspan,rowspan]", exec: function (a, b) { b.cell = n(a.getSelection()); k(b.cell, !0) } })); g("cellMergeRight", c({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a, b) { b.cell = n(a.getSelection(), "right"); k(b.cell, !0) } })); g("cellMergeDown", c({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a, b) { b.cell = n(a.getSelection(), "down"); k(b.cell, !0) } })); g("cellVerticalSplit", c({
                                allowedContent: "td[rowspan]", requiredContent: "td[rowspan]",
                                exec: function (a) { k(u(a.getSelection())) }
                            })); g("cellHorizontalSplit", c({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a) { k(q(a.getSelection())) } })); g("cellInsertBefore", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); l(a, !0) } })); g("cellInsertAfter", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); l(a) } })); a.addMenuItems && a.addMenuItems({
                                tablecell: {
                                    label: r.cell.menu, group: "tablecell", order: 1, getItems: function () {
                                        var c = a.getSelection(), d = b(c), c =
                                        {
                                            tablecell_insertBefore: CKEDITOR.TRISTATE_OFF, tablecell_insertAfter: CKEDITOR.TRISTATE_OFF, tablecell_delete: CKEDITOR.TRISTATE_OFF, tablecell_merge: n(c, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_right: n(c, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_down: n(c, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_vertical: u(c, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_horizontal: q(c, !0) ? CKEDITOR.TRISTATE_OFF :
                                                CKEDITOR.TRISTATE_DISABLED
                                        }; a.filter.check(w) && (c.tablecell_properties = 0 < d.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); return c
                                    }
                                }, tablecell_insertBefore: { label: r.cell.insertBefore, group: "tablecell", command: "cellInsertBefore", order: 5 }, tablecell_insertAfter: { label: r.cell.insertAfter, group: "tablecell", command: "cellInsertAfter", order: 10 }, tablecell_delete: { label: r.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15 }, tablecell_merge: {
                                    label: r.cell.merge, group: "tablecell", command: "cellMerge",
                                    order: 16
                                }, tablecell_merge_right: { label: r.cell.mergeRight, group: "tablecell", command: "cellMergeRight", order: 17 }, tablecell_merge_down: { label: r.cell.mergeDown, group: "tablecell", command: "cellMergeDown", order: 18 }, tablecell_split_horizontal: { label: r.cell.splitHorizontal, group: "tablecell", command: "cellHorizontalSplit", order: 19 }, tablecell_split_vertical: { label: r.cell.splitVertical, group: "tablecell", command: "cellVerticalSplit", order: 20 }, tablecell_properties: {
                                    label: r.cell.title, group: "tablecellproperties", command: "cellProperties",
                                    order: 21
                                }, tablerow: { label: r.row.menu, group: "tablerow", order: 1, getItems: function () { return { tablerow_insertBefore: CKEDITOR.TRISTATE_OFF, tablerow_insertAfter: CKEDITOR.TRISTATE_OFF, tablerow_delete: CKEDITOR.TRISTATE_OFF } } }, tablerow_insertBefore: { label: r.row.insertBefore, group: "tablerow", command: "rowInsertBefore", order: 5 }, tablerow_insertAfter: { label: r.row.insertAfter, group: "tablerow", command: "rowInsertAfter", order: 10 }, tablerow_delete: { label: r.row.deleteRow, group: "tablerow", command: "rowDelete", order: 15 },
                                tablecolumn: { label: r.column.menu, group: "tablecolumn", order: 1, getItems: function () { return { tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF, tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF, tablecolumn_delete: CKEDITOR.TRISTATE_OFF } } }, tablecolumn_insertBefore: { label: r.column.insertBefore, group: "tablecolumn", command: "columnInsertBefore", order: 5 }, tablecolumn_insertAfter: { label: r.column.insertAfter, group: "tablecolumn", command: "columnInsertAfter", order: 10 }, tablecolumn_delete: {
                                    label: r.column.deleteColumn, group: "tablecolumn",
                                    command: "columnDelete", order: 15
                                }
                            }); a.contextMenu && a.contextMenu.addListener(function (a, b, c) { return (a = c.contains({ td: 1, th: 1 }, 1)) && !a.isReadOnly() ? { tablecell: CKEDITOR.TRISTATE_OFF, tablerow: CKEDITOR.TRISTATE_OFF, tablecolumn: CKEDITOR.TRISTATE_OFF } : null })
                    }, getCellColIndex: a, insertRow: f, insertColumn: m, getSelectedCells: b
                }; CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
            })(); CKEDITOR.tools.buildTableMap = function (b, f, d, a, c) {
                b = b.$.rows; d = d || 0; a = "number" === typeof a ? a : b.length - 1; c = "number" === typeof c ?
                    c : -1; var m = -1, h = []; for (f = f || 0; f <= a; f++) { m++; !h[m] && (h[m] = []); for (var l = -1, e = d; e <= (-1 === c ? b[f].cells.length - 1 : c); e++) { var k = b[f].cells[e]; if (!k) break; for (l++; h[m][l];)l++; for (var g = isNaN(k.colSpan) ? 1 : k.colSpan, k = isNaN(k.rowSpan) ? 1 : k.rowSpan, n = 0; n < k && !(f + n > a); n++) { h[m + n] || (h[m + n] = []); for (var q = 0; q < g; q++)h[m + n][l + q] = b[f].cells[e] } l += g - 1; if (-1 !== c && l >= c) break } } return h
            }; (function () {
                function b(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) } function f(a, b) {
                    var c = a.getAscendant("table"),
                    d = b.getAscendant("table"), f = CKEDITOR.tools.buildTableMap(c), g = e(a), h = e(b), k = [], l = {}, m, n; c.contains(d) && (b = b.getAscendant({ td: 1, th: 1 }), h = e(b)); g > h && (c = g, g = h, h = c, c = a, a = b, b = c); for (c = 0; c < f[g].length; c++)if (a.$ === f[g][c]) { m = c; break } for (c = 0; c < f[h].length; c++)if (b.$ === f[h][c]) { n = c; break } m > n && (c = m, m = n, n = c); for (c = g; c <= h; c++)for (g = m; g <= n; g++)d = new CKEDITOR.dom.element(f[c][g]), d.$ && !d.getCustomData("selected_cell") && (k.push(d), CKEDITOR.dom.element.setMarker(l, d, "selected_cell", !0)); CKEDITOR.dom.element.clearAllMarkers(l);
                    return k
                } function d(a) { return (a = a.editable().findOne(".cke_table-faked-selection")) && a.getAscendant("table") } function a(a, b) {
                    var c = a.editable().find(".cke_table-faked-selection"), d = a.editable().findOne("[data-cke-table-faked-selection-table]"), e; a.fire("lockSnapshot"); a.editable().removeClass("cke_table-faked-selection-editor"); for (e = 0; e < c.count(); e++)c.getItem(e).removeClass("cke_table-faked-selection"); d && d.data("cke-table-faked-selection-table", !1); a.fire("unlockSnapshot"); b && (p = { active: !1 }, a.getSelection().isInTable() &&
                        a.getSelection().reset())
                } function c(a, b) { var c = [], d, e; for (e = 0; e < b.length; e++)d = a.createRange(), d.setStartBefore(b[e]), d.setEndAfter(b[e]), c.push(d); a.getSelection().selectRanges(c) } function m(a) { var b = a.editable().find(".cke_table-faked-selection"); 1 > b.count() || (b = f(b.getItem(0), b.getItem(b.count() - 1)), c(a, b)) } function h(d, e, g) {
                    var h = x(d.getSelection(!0)); e = e.is("table") ? null : e; var k; (k = p.active && !p.first) && !(k = e) && (k = d.getSelection().getRanges(), k = 1 < h.length || k[0] && !k[0].collapsed ? !0 : !1); if (k) p.first =
                        e || h[0], p.dirty = e ? !1 : 1 !== h.length; else if (p.active && e && p.first.getAscendant("table").equals(e.getAscendant("table"))) { h = f(p.first, e); if (!p.dirty && 1 === h.length && !b(g.data.getTarget())) return a(d, "mouseup" === g.name); p.dirty = !0; p.last = e; c(d, h) }
                } function l(b) {
                    var c = (b = b.editor || b.sender.editor) && b.getSelection(), d = c && c.getRanges() || [], e = d && d[0].getEnclosedNode(), e = e && e.type == CKEDITOR.NODE_ELEMENT && e.is("img"), f; if (c && (a(b), c.isInTable() && c.isFake)) if (e) b.getSelection().reset(); else if (!d[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored")) {
                        1 ===
                        d.length && d[0]._getTableElement() && d[0]._getTableElement().is("table") && (f = d[0]._getTableElement()); f = x(c, f); b.fire("lockSnapshot"); for (c = 0; c < f.length; c++)f[c].addClass("cke_table-faked-selection"); 0 < f.length && (b.editable().addClass("cke_table-faked-selection-editor"), f[0].getAscendant("table").data("cke-table-faked-selection-table", "")); b.fire("unlockSnapshot")
                    }
                } function e(a) { return a.getAscendant("tr", !0).$.rowIndex } function k(c) {
                    function e(a, b) {
                        return a && b ? a.equals(b) || a.contains(b) || b.contains(a) ||
                            a.getCommonAncestor(b).is(t) : !1
                    } function f(a) { return !a.getAscendant("table", !0) && a.getDocument().equals(l.document) } function g(a, b, c, d) { if ("mousedown" === a.name && (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT || !d)) return !0; if (b = a.name === (CKEDITOR.env.gecko ? "mousedown" : "mouseup") && !f(a.data.getTarget())) a = a.data.getTarget().getAscendant({ td: 1, th: 1 }, !0), b = !(a && a.hasClass("cke_table-faked-selection")); return b } if (c.data.getTarget().getName && ("mouseup" === c.name || !b(c.data.getTarget()))) {
                        var l =
                            c.editor || c.listenerData.editor, n = l.getSelection(1), q = d(l), r = c.data.getTarget(), u = r && r.getAscendant({ td: 1, th: 1 }, !0), r = r && r.getAscendant("table", !0), t = { table: 1, thead: 1, tbody: 1, tfoot: 1, tr: 1, td: 1, th: 1 }; r && r.hasAttribute("data-cke-tableselection-ignored") || (g(c, n, q, r) && a(l, !0), !p.active && "mousedown" === c.name && CKEDITOR.tools.getMouseButton(c) === CKEDITOR.MOUSE_BUTTON_LEFT && r && (p = { active: !0 }, CKEDITOR.document.on("mouseup", k, null, { editor: l })), (u || r) && h(l, u || r, c), "mouseup" === c.name && (CKEDITOR.tools.getMouseButton(c) ===
                                CKEDITOR.MOUSE_BUTTON_LEFT && (f(c.data.getTarget()) || e(q, r)) && m(l), p = { active: !1 }, CKEDITOR.document.removeListener("mouseup", k)))
                    }
                } function g(a) { var b = a.data.getTarget().getAscendant("table", !0); b && b.hasAttribute("data-cke-tableselection-ignored") || (b = a.data.getTarget().getAscendant({ td: 1, th: 1 }, !0)) && !b.hasClass("cke_table-faked-selection") && (a.cancel(), a.data.preventDefault()) } function n(a, b) {
                    function c(a) { a.cancel() } var d = a.getSelection(), e = d.createBookmarks(), f = a.document, g = a.createRange(), h = f.getDocumentElement().$,
                        k = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, l = a.blockless || CKEDITOR.env.ie ? "span" : "div", m, n, q, p; f.getById("cke_table_copybin") || (m = f.createElement(l), n = f.createElement(l), n.setAttributes({ id: "cke_table_copybin", "data-cke-temp": "1" }), m.setStyles({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }), m.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right", "-5000px"), m.setHtml(a.getSelectedHtml(!0)), a.fire("lockSnapshot"), n.append(m), a.editable().append(n), p = a.on("selectionChange", c,
                            null, null, 0), k && (q = h.scrollTop), g.selectNodeContents(m), g.select(), k && (h.scrollTop = q), setTimeout(function () { n.remove(); d.selectBookmarks(e); p.removeListener(); a.fire("unlockSnapshot"); b && (a.extractSelectedHtml(), a.fire("saveSnapshot")) }, 100))
                } function q(a) { var b = a.editor || a.sender.editor, c = b.getSelection(); c.isInTable() && (c.getRanges()[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored") || n(b, "cut" === a.name)) } function u(a) { this._reset(); a && this.setSelectedCells(a) } function r(a,
                    b, c) { a.on("beforeCommandExec", function (c) { -1 !== CKEDITOR.tools.array.indexOf(b, c.data.name) && (c.data.selectedCells = x(a.getSelection())) }); a.on("afterCommandExec", function (d) { -1 !== CKEDITOR.tools.array.indexOf(b, d.data.name) && c(a, d.data) }) } var p = { active: !1 }, v, x, t, B, w; u.prototype = {}; u.prototype._reset = function () { this.cells = { first: null, last: null, all: [] }; this.rows = { first: null, last: null } }; u.prototype.setSelectedCells = function (a) {
                        this._reset(); a = a.slice(0); this._arraySortByDOMOrder(a); this.cells.all = a; this.cells.first =
                            a[0]; this.cells.last = a[a.length - 1]; this.rows.first = a[0].getAscendant("tr"); this.rows.last = this.cells.last.getAscendant("tr")
                    }; u.prototype.getTableMap = function () { var a = t(this.cells.first), b; a: { b = this.cells.last; var c = b.getAscendant("table"), d = e(b), c = CKEDITOR.tools.buildTableMap(c), f; for (f = 0; f < c[d].length; f++)if ((new CKEDITOR.dom.element(c[d][f])).equals(b)) { b = f; break a } b = void 0 } return CKEDITOR.tools.buildTableMap(this._getTable(), e(this.rows.first), a, e(this.rows.last), b) }; u.prototype._getTable = function () { return this.rows.first.getAscendant("table") };
                u.prototype.insertRow = function (a, b, c) { if ("undefined" === typeof a) a = 1; else if (0 >= a) return; for (var d = this.cells.first.$.cellIndex, e = this.cells.last.$.cellIndex, f = c ? [] : this.cells.all, g, h = 0; h < a; h++)g = B(c ? this.cells.all : f, b), g = CKEDITOR.tools.array.filter(g.find("td, th").toArray(), function (a) { return c ? !0 : a.$.cellIndex >= d && a.$.cellIndex <= e }), f = b ? g.concat(f) : f.concat(g); this.setSelectedCells(f) }; u.prototype.insertColumn = function (a) {
                    function b(a) { a = e(a); return a >= f && a <= g } if ("undefined" === typeof a) a = 1; else if (0 >=
                        a) return; for (var c = this.cells, d = c.all, f = e(c.first), g = e(c.last), c = 0; c < a; c++)d = d.concat(CKEDITOR.tools.array.filter(w(d), b)); this.setSelectedCells(d)
                }; u.prototype.emptyCells = function (a) { a = a || this.cells.all; for (var b = 0; b < a.length; b++)a[b].setHtml("") }; u.prototype._arraySortByDOMOrder = function (a) { a.sort(function (a, b) { return a.getPosition(b) & CKEDITOR.POSITION_PRECEDING ? -1 : 1 }) }; var z = {
                    onPaste: function (a) {
                        function b(a) { var c = e.createRange(); c.selectNodeContents(a); c.select() } function d(a) {
                            return Math.max.apply(null,
                                CKEDITOR.tools.array.map(a, function (a) { return a.length }, 0))
                        } var e = a.editor, g = e.getSelection(), h = x(g), k = g.isInTable(!0) && this.isBoundarySelection(g), l = this.findTableInPastedContent(e, a.data.dataValue), m, n; (function (a, b, c, d) {
                            a = a.getRanges(); var e = a.length && a[0]._getTableElement({ table: 1 }); if (!b.length || e && e.hasAttribute("data-cke-tableselection-ignored") || d && !c) return !1; if (b = !d) (b = a[0]) ? (b = b.clone(), b.enlarge(CKEDITOR.ENLARGE_ELEMENT), b = (b = b.getEnclosedNode()) && b.is && b.is(CKEDITOR.dtd.$tableContent)) :
                                b = void 0, b = !b; return b ? !1 : !0
                        })(g, h, l, k) && (h = h[0].getAscendant("table"), m = new u(x(g, h)), e.once("afterPaste", function () { var a; if (n) { a = new CKEDITOR.dom.element(n[0][0]); var b = n[n.length - 1]; a = f(a, new CKEDITOR.dom.element(b[b.length - 1])) } else a = m.cells.all; c(e, a) }), l ? (a.stop(), k ? (m.insertRow(1, 1 === k, !0), g.selectElement(m.rows.first)) : (m.emptyCells(), c(e, m.cells.all)), a = m.getTableMap(), n = CKEDITOR.tools.buildTableMap(l), m.insertRow(n.length - a.length), m.insertColumn(d(n) - d(a)), a = m.getTableMap(), this.pasteTable(m,
                            a, n), e.fire("saveSnapshot"), setTimeout(function () { e.fire("afterPaste") }, 0)) : (b(m.cells.first), e.once("afterPaste", function () { e.fire("lockSnapshot"); m.emptyCells(m.cells.all.slice(1)); c(e, m.cells.all); e.fire("unlockSnapshot") })))
                    }, isBoundarySelection: function (a) { a = a.getRanges()[0]; var b = a.endContainer.getAscendant("tr", !0); if (b && a.collapsed) { if (a.checkBoundaryOfElement(b, CKEDITOR.START)) return 1; if (a.checkBoundaryOfElement(b, CKEDITOR.END)) return 2 } return 0 }, findTableInPastedContent: function (a, b) {
                        var c =
                            a.dataProcessor, d = new CKEDITOR.dom.element("body"); c || (c = new CKEDITOR.htmlDataProcessor(a)); d.setHtml(c.toHtml(b), { fixForBody: !1 }); return 1 < d.getChildCount() ? null : d.findOne("table")
                    }, pasteTable: function (a, b, c) {
                        var d, e = t(a.cells.first), f = a._getTable(), g = {}, h, k, l, m; for (l = 0; l < c.length; l++)for (h = new CKEDITOR.dom.element(f.$.rows[a.rows.first.$.rowIndex + l]), m = 0; m < c[l].length; m++)if (k = new CKEDITOR.dom.element(c[l][m]), d = b[l] && b[l][m] ? new CKEDITOR.dom.element(b[l][m]) : null, k && !k.getCustomData("processed")) {
                            if (d &&
                                d.getParent()) k.replace(d); else if (0 === m || c[l][m - 1]) (d = 0 !== m ? new CKEDITOR.dom.element(c[l][m - 1]) : null) && h.equals(d.getParent()) ? k.insertAfter(d) : 0 < e ? h.$.cells[e] ? k.insertAfter(new CKEDITOR.dom.element(h.$.cells[e])) : h.append(k) : h.append(k, !0); CKEDITOR.dom.element.setMarker(g, k, "processed", !0)
                        } else k.getCustomData("processed") && d && d.remove(); CKEDITOR.dom.element.clearAllMarkers(g)
                    }
                }; CKEDITOR.plugins.tableselection = {
                    getCellsBetween: f, keyboardIntegration: function (a) {
                        function b(a) {
                            var c = a.getEnclosedNode();
                            c && "function" === typeof c.is && c.is({ td: 1, th: 1 }) ? c.setText("") : a.deleteContents(); CKEDITOR.tools.array.forEach(a._find("td"), function (a) { a.appendBogus() })
                        } var c = a.editable(); c.attachListener(c, "keydown", function (a) {
                            function c(b, d) {
                                if (!d.length) return null; var f = a.createRange(), g = CKEDITOR.dom.range.mergeRanges(d); CKEDITOR.tools.array.forEach(g, function (a) { a.enlarge(CKEDITOR.ENLARGE_ELEMENT) }); var h = g[0].getBoundaryNodes(), k = h.startNode, h = h.endNode; if (k && k.is && k.is(e)) {
                                    for (var l = k.getAscendant("table",
                                        !0), m = k.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l), n = !1, q = function (a) { return !k.contains(a) && a.is && a.is("td", "th") }; m && !q(m);)m = m.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l); !m && h && h.is && !h.is("table") && h.getNext() && (m = h.getNext().findOne("td, th"), n = !0); if (m) f["moveToElementEdit" + (n ? "Start" : "End")](m); else f.setStartBefore(k.getAscendant("table", !0)), f.collapse(!0); g[0].deleteContents(); return [f]
                                } if (k) return f.moveToElementEditablePosition(k), [f]
                            } var d = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1, 13: 1 },
                                e = CKEDITOR.tools.extend({ table: 1 }, CKEDITOR.dtd.$tableContent); delete e.td; delete e.th; return function (e) {
                                    var f = e.data.getKey(), g = e.data.getKeystroke(), h, k = 37 === f || 38 == f, l, m, n; if (d[f] && !a.readOnly && (h = a.getSelection()) && h.isInTable() && h.isFake) {
                                        l = h.getRanges(); m = l[0]._getTableElement(); n = l[l.length - 1]._getTableElement(); if (13 !== f || a.plugins.enterkey) e.data.preventDefault(), e.cancel(); if (36 < f && 41 > f) l[0].moveToElementEditablePosition(k ? m : n, !k), h.selectRanges([l[0]]); else if (13 !== f || 13 === g || g === CKEDITOR.SHIFT +
                                            13) { for (e = 0; e < l.length; e++)b(l[e]); (e = c(m, l)) ? l = e : l[0].moveToElementEditablePosition(m); h.selectRanges(l); 13 === f && a.plugins.enterkey ? (a.fire("lockSnapshot"), 13 === g ? a.execCommand("enter") : a.execCommand("shiftEnter"), a.fire("unlockSnapshot"), a.fire("saveSnapshot")) : 13 !== f && a.fire("saveSnapshot") }
                                    }
                                }
                        }(a), null, null, -1); c.attachListener(c, "keypress", function (c) {
                            var d = a.getSelection(), e = c.data.$.charCode || 13 === c.data.getKey(), f; if (!a.readOnly && d && d.isInTable() && d.isFake && e && !(c.data.getKeystroke() & CKEDITOR.CTRL)) {
                                c =
                                d.getRanges(); e = c[0].getEnclosedNode().getAscendant({ td: 1, th: 1 }, !0); for (f = 0; f < c.length; f++)b(c[f]); e && (c[0].moveToElementEditablePosition(e), d.selectRanges([c[0]]))
                            }
                        }, null, null, -1)
                    }
                }; CKEDITOR.plugins.add("tableselection", {
                    requires: "clipboard,tabletools", isSupportedEnvironment: function () { return !(CKEDITOR.env.ie && 11 > CKEDITOR.env.version) }, onLoad: function () {
                        v = CKEDITOR.plugins.tabletools; x = v.getSelectedCells; t = v.getCellColIndex; B = v.insertRow; w = v.insertColumn; CKEDITOR.document.appendStyleSheet(this.path +
                            "styles/tableselection.css")
                    }, init: function (b) {
                        this.isSupportedEnvironment() && (b.addContentsCss && b.addContentsCss(this.path + "styles/tableselection.css"), b.on("contentDom", function () {
                            var a = b.editable(), c = a.isInline() ? a : b.document, d = { editor: b }; a.attachListener(c, "mousedown", k, null, d); a.attachListener(c, "mousemove", k, null, d); a.attachListener(c, "mouseup", k, null, d); a.attachListener(a, "dragstart", g); a.attachListener(b, "selectionCheck", l); CKEDITOR.plugins.tableselection.keyboardIntegration(b); CKEDITOR.plugins.clipboard &&
                                !CKEDITOR.plugins.clipboard.isCustomCopyCutSupported && (a.attachListener(a, "cut", q), a.attachListener(a, "copy", q))
                        }), b.on("paste", z.onPaste, z), r(b, "rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "), function (a, b) { c(a, b.selectedCells) }), r(b, ["cellMerge", "cellMergeRight", "cellMergeDown"], function (a, b) { c(a, [b.commandData.cell]) }), r(b, ["cellDelete"], function (b) { a(b, !0) }))
                    }
                })
            })(); (function () {
                CKEDITOR.plugins.add("templates", {
                    requires: "dialog",
                    init: function (b) { CKEDITOR.dialog.add("templates", CKEDITOR.getUrl(this.path + "dialogs/templates.js")); b.addCommand("templates", new CKEDITOR.dialogCommand("templates")); b.ui.addButton && b.ui.addButton("Templates", { label: b.lang.templates.button, command: "templates", toolbar: "doctools,10" }) }
                }); var b = {}, f = {}; CKEDITOR.addTemplates = function (d, a) { b[d] = a }; CKEDITOR.getTemplates = function (d) { return b[d] }; CKEDITOR.loadTemplates = function (b, a) {
                    for (var c = [], m = 0, h = b.length; m < h; m++)f[b[m]] || (c.push(b[m]), f[b[m]] = 1); c.length ?
                        CKEDITOR.scriptLoader.load(c, a) : setTimeout(a, 0)
                }
            })(); CKEDITOR.config.templates_files = [CKEDITOR.getUrl("plugins/templates/templates/default.js")]; CKEDITOR.config.templates_replaceContent = !0; "use strict"; (function () {
                function b(a, b) { return CKEDITOR.tools.array.reduce(b, function (a, b) { return b(a) }, a) } var f = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90], d = { 8: 1, 46: 1 }; CKEDITOR.plugins.add("undo", {
                    init: function (b) {
                        function c(a) { l.enabled && !1 !== a.data.command.canUndo && l.save() } function d() {
                            l.enabled =
                            b.readOnly ? !1 : "wysiwyg" == b.mode; l.onChange()
                        } var l = b.undoManager = new a(b), m = l.editingHandler = new h(l), u = b.addCommand("undo", { exec: function () { l.undo() && (b.selectionChange(), this.fire("afterUndo")) }, startDisabled: !0, canUndo: !1 }), r = b.addCommand("redo", { exec: function () { l.redo() && (b.selectionChange(), this.fire("afterRedo")) }, startDisabled: !0, canUndo: !1 }); b.setKeystroke([[f[0], "undo"], [f[1], "redo"], [f[2], "redo"]]); l.onChange = function () {
                            u.setState(l.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                            r.setState(l.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                        }; b.on("beforeCommandExec", c); b.on("afterCommandExec", c); b.on("saveSnapshot", function (a) { l.save(a.data && a.data.contentOnly) }); b.on("contentDom", m.attachListeners, m); b.on("instanceReady", function () { b.fire("saveSnapshot") }); b.on("beforeModeUnload", function () { "wysiwyg" == b.mode && l.save(!0) }); b.on("mode", d); b.on("readOnly", d); b.ui.addButton && (b.ui.addButton("Undo", { label: b.lang.undo.undo, command: "undo", toolbar: "undo,10" }), b.ui.addButton("Redo",
                            { label: b.lang.undo.redo, command: "redo", toolbar: "undo,20" })); b.resetUndo = function () { l.reset(); b.fire("saveSnapshot") }; b.on("updateSnapshot", function () { l.currentImage && l.update() }); b.on("lockSnapshot", function (a) { a = a.data; l.lock(a && a.dontUpdate, a && a.forceUpdate) }); b.on("unlockSnapshot", l.unlock, l)
                    }
                }); CKEDITOR.plugins.undo = {}; var a = CKEDITOR.plugins.undo.UndoManager = function (a) {
                    this.strokesRecorded = [0, 0]; this.locked = null; this.previousKeyGroup = -1; this.limit = a.config.undoStackSize || 20; this.strokesLimit =
                        25; this._filterRules = []; this.editor = a; this.reset(); CKEDITOR.env.ie && this.addFilterRule(function (a) { return a.replace(/\s+data-cke-expando=".*?"/g, "") })
                }; a.prototype = {
                    type: function (b, c) { var d = a.getKeyGroup(b), f = this.strokesRecorded[d] + 1; c = c || f >= this.strokesLimit; this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange()); c ? (f = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change"); this.strokesRecorded[d] = f; this.previousKeyGroup = d }, keyGroupChanged: function (b) {
                        return a.getKeyGroup(b) !=
                            this.previousKeyGroup
                    }, reset: function () { this.snapshots = []; this.index = -1; this.currentImage = null; this.hasRedo = this.hasUndo = !1; this.locked = null; this.resetType() }, resetType: function () { this.strokesRecorded = [0, 0]; this.typing = !1; this.previousKeyGroup = -1 }, refreshState: function () { this.hasUndo = !!this.getNextImage(!0); this.hasRedo = !!this.getNextImage(!1); this.resetType(); this.onChange() }, save: function (a, b, d) {
                        var f = this.editor; if (this.locked || "ready" != f.status || "wysiwyg" != f.mode) return !1; var h = f.editable(); if (!h ||
                            "ready" != h.status) return !1; h = this.snapshots; b || (b = new c(f)); if (!1 === b.contents) return !1; if (this.currentImage) if (b.equalsContent(this.currentImage)) { if (a || b.equalsSelection(this.currentImage)) return !1 } else !1 !== d && f.fire("change"); h.splice(this.index + 1, h.length - this.index - 1); h.length == this.limit && h.shift(); this.index = h.push(b) - 1; this.currentImage = b; !1 !== d && this.refreshState(); return !0
                    }, restoreImage: function (a) {
                        var b = this.editor, c; a.bookmarks && (b.focus(), c = b.getSelection()); this.locked = { level: 999 }; this.editor.loadSnapshot(a.contents);
                        a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select()); this.locked = null; this.index = a.index; this.currentImage = this.snapshots[this.index]; this.update(); this.refreshState(); b.fire("change")
                    }, getNextImage: function (a) {
                        var b = this.snapshots, c = this.currentImage, d; if (c) if (a) for (d = this.index - 1; 0 <= d; d--) { if (a = b[d], !c.equalsContent(a)) return a.index = d, a } else for (d = this.index + 1; d < b.length; d++)if (a = b[d], !c.equalsContent(a)) return a.index =
                            d, a; return null
                    }, redoable: function () { return this.enabled && this.hasRedo }, undoable: function () { return this.enabled && this.hasUndo }, undo: function () { if (this.undoable()) { this.save(!0); var a = this.getNextImage(!0); if (a) return this.restoreImage(a), !0 } return !1 }, redo: function () { if (this.redoable() && (this.save(!0), this.redoable())) { var a = this.getNextImage(!1); if (a) return this.restoreImage(a), !0 } return !1 }, update: function (a) {
                        if (!this.locked) {
                            a || (a = new c(this.editor)); for (var b = this.index, d = this.snapshots; 0 < b && this.currentImage.equalsContent(d[b -
                                1]);)--b; d.splice(b, this.index - b + 1, a); this.index = b; this.currentImage = a
                        }
                    }, updateSelection: function (a) { if (!this.snapshots.length) return !1; var b = this.snapshots, c = b[b.length - 1]; return c.equalsContent(a) && !c.equalsSelection(a) ? (this.currentImage = b[b.length - 1] = a, !0) : !1 }, lock: function (a, b) { if (this.locked) this.locked.level++; else if (a) this.locked = { level: 1 }; else { var d = null; if (b) d = !0; else { var f = new c(this.editor, !0); this.currentImage && this.currentImage.equalsContent(f) && (d = f) } this.locked = { update: d, level: 1 } } },
                    unlock: function () { if (this.locked && !--this.locked.level) { var a = this.locked.update; this.locked = null; if (!0 === a) this.update(); else if (a) { var b = new c(this.editor, !0); a.equalsContent(b) || this.update() } } }, addFilterRule: function (a) { this._filterRules.push(a) }
                }; a.navigationKeyCodes = { 37: 1, 38: 1, 39: 1, 40: 1, 36: 1, 35: 1, 33: 1, 34: 1 }; a.keyGroups = { PRINTABLE: 0, FUNCTIONAL: 1 }; a.isNavigationKey = function (b) { return !!a.navigationKeyCodes[b] }; a.getKeyGroup = function (b) { var c = a.keyGroups; return d[b] ? c.FUNCTIONAL : c.PRINTABLE }; a.getOppositeKeyGroup =
                    function (b) { var c = a.keyGroups; return b == c.FUNCTIONAL ? c.PRINTABLE : c.FUNCTIONAL }; a.ieFunctionalKeysBug = function (b) { return CKEDITOR.env.ie && a.getKeyGroup(b) == a.keyGroups.FUNCTIONAL }; var c = CKEDITOR.plugins.undo.Image = function (a, c) { this.editor = a; a.fire("beforeUndoImage"); var d = a.getSnapshot(); d && (this.contents = b(d, a.undoManager._filterRules)); c || (this.bookmarks = (d = d && a.getSelection()) && d.createBookmarks2(!0)); a.fire("afterUndoImage") }, m = /\b(?:href|src|name)="[^"]*?"/gi; c.prototype = {
                        equalsContent: function (a) {
                            var b =
                                this.contents; a = a.contents; CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(m, ""), a = a.replace(m, "")); return b != a ? !1 : !0
                        }, equalsSelection: function (a) { var b = this.bookmarks; a = a.bookmarks; if (b || a) { if (!b || !a || b.length != a.length) return !1; for (var c = 0; c < b.length; c++) { var d = b[c], f = a[c]; if (d.startOffset != f.startOffset || d.endOffset != f.endOffset || !CKEDITOR.tools.arrayCompare(d.start, f.start) || !CKEDITOR.tools.arrayCompare(d.end, f.end)) return !1 } } return !0 }
                    }; var h = CKEDITOR.plugins.undo.NativeEditingHandler =
                        function (a) { this.undoManager = a; this.ignoreInputEvent = !1; this.keyEventsStack = new l; this.lastKeydownImage = null }; h.prototype = {
                            onKeydown: function (b) {
                                var d = b.data.getKey(); if (229 !== d) if (-1 < CKEDITOR.tools.indexOf(f, b.data.getKeystroke())) b.data.preventDefault(); else if (this.keyEventsStack.cleanUp(b), b = this.undoManager, this.keyEventsStack.getLast(d) || this.keyEventsStack.push(d), this.lastKeydownImage = new c(b.editor), a.isNavigationKey(d) || this.undoManager.keyGroupChanged(d)) if (b.strokesRecorded[0] || b.strokesRecorded[1]) b.save(!1,
                                    this.lastKeydownImage, !1), b.resetType()
                            }, onInput: function () { if (this.ignoreInputEvent) this.ignoreInputEvent = !1; else { var a = this.keyEventsStack.getLast(); a || (a = this.keyEventsStack.push(0)); this.keyEventsStack.increment(a.keyCode); this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs()) } }, onKeyup: function (b) {
                                var d = this.undoManager; b = b.data.getKey(); var f = this.keyEventsStack.getTotalInputs(); this.keyEventsStack.remove(b);
                                if (!(a.ieFunctionalKeysBug(b) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new c(d.editor, !0)))) if (0 < f) d.type(b); else if (a.isNavigationKey(b)) this.onNavigationKey(!0)
                            }, onNavigationKey: function (a) { var b = this.undoManager; !a && b.save(!0, null, !1) || b.updateSelection(new c(b.editor)); b.resetType() }, ignoreInputEventListener: function () { this.ignoreInputEvent = !0 }, activateInputEventListener: function () { this.ignoreInputEvent = !1 }, attachListeners: function () {
                                var b = this.undoManager.editor, c = b.editable(),
                                d = this; c.attachListener(c, "keydown", function (b) { d.onKeydown(b); if (a.ieFunctionalKeysBug(b.data.getKey())) d.onInput() }, null, null, 999); c.attachListener(c, CKEDITOR.env.ie ? "keypress" : "input", d.onInput, d, null, 999); c.attachListener(c, "keyup", d.onKeyup, d, null, 999); c.attachListener(c, "paste", d.ignoreInputEventListener, d, null, 999); c.attachListener(c, "drop", d.ignoreInputEventListener, d, null, 999); b.on("afterPaste", d.activateInputEventListener, d, null, 999); c.attachListener(c.isInline() ? c : b.document.getDocumentElement(),
                                    "click", function () { d.onNavigationKey() }, null, null, 999); c.attachListener(this.undoManager.editor, "blur", function () { d.keyEventsStack.remove(9) }, null, null, 999)
                            }
                        }; var l = CKEDITOR.plugins.undo.KeyEventsStack = function () { this.stack = [] }; l.prototype = {
                            push: function (a) { a = this.stack.push({ keyCode: a, inputs: 0 }); return this.stack[a - 1] }, getLastIndex: function (a) { if ("number" != typeof a) return this.stack.length - 1; for (var b = this.stack.length; b--;)if (this.stack[b].keyCode == a) return b; return -1 }, getLast: function (a) {
                                a = this.getLastIndex(a);
                                return -1 != a ? this.stack[a] : null
                            }, increment: function (a) { this.getLast(a).inputs++ }, remove: function (a) { a = this.getLastIndex(a); -1 != a && this.stack.splice(a, 1) }, resetInputs: function (a) { if ("number" == typeof a) this.getLast(a).inputs = 0; else for (a = this.stack.length; a--;)this.stack[a].inputs = 0 }, getTotalInputs: function () { for (var a = this.stack.length, b = 0; a--;)b += this.stack[a].inputs; return b }, cleanUp: function (a) { a = a.data.$; a.ctrlKey || a.metaKey || this.remove(17); a.shiftKey || this.remove(16); a.altKey || this.remove(18) }
                        }
            })();
        "use strict"; (function () {
            function b(a, b) { CKEDITOR.tools.extend(this, { editor: a, editable: a.editable(), doc: a.document, win: a.window }, b, !0); this.inline = this.editable.isInline(); this.inline || (this.frame = this.win.getFrame()); this.target = this[this.inline ? "editable" : "doc"] } function f(a, b) { CKEDITOR.tools.extend(this, b, { editor: a }, !0) } function d(a, b) {
                var d = a.editable(); CKEDITOR.tools.extend(this, { editor: a, editable: d, inline: d.isInline(), doc: a.document, win: a.window, container: CKEDITOR.document.getBody(), winTop: CKEDITOR.document.getWindow() },
                    b, !0); this.hidden = {}; this.visible = {}; this.inline || (this.frame = this.win.getFrame()); this.queryViewport(); var f = CKEDITOR.tools.bind(this.queryViewport, this), h = CKEDITOR.tools.bind(this.hideVisible, this), l = CKEDITOR.tools.bind(this.removeAll, this); d.attachListener(this.winTop, "resize", f); d.attachListener(this.winTop, "scroll", f); d.attachListener(this.winTop, "resize", h); d.attachListener(this.win, "scroll", h); d.attachListener(this.inline ? d : this.frame, "mouseout", function (a) {
                        var b = a.data.$.clientX; a = a.data.$.clientY;
                        this.queryViewport(); (b <= this.rect.left || b >= this.rect.right || a <= this.rect.top || a >= this.rect.bottom) && this.hideVisible(); (0 >= b || b >= this.winTopPane.width || 0 >= a || a >= this.winTopPane.height) && this.hideVisible()
                    }, this); d.attachListener(a, "resize", f); d.attachListener(a, "mode", l); a.on("destroy", l); this.lineTpl = (new CKEDITOR.template('\x3cdiv data-cke-lineutils-line\x3d"1" class\x3d"cke_reset_all" style\x3d"{lineStyle}"\x3e\x3cspan style\x3d"{tipLeftStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3cspan style\x3d"{tipRightStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3c/div\x3e')).output({
                        lineStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},
                            m, this.lineStyle, !0)), tipLeftStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, c, { left: "0px", "border-left-color": "red", "border-width": "6px 0 6px 6px" }, this.tipCss, this.tipLeftStyle, !0)), tipRightStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, c, { right: "0px", "border-right-color": "red", "border-width": "6px 6px 6px 0" }, this.tipCss, this.tipRightStyle, !0))
                    })
            } function a(a) {
                var b; if (b = a && a.type == CKEDITOR.NODE_ELEMENT) b = !(h[a.getComputedStyle("float")] || h[a.getAttribute("align")]); return b &&
                    !l[a.getComputedStyle("position")]
            } CKEDITOR.plugins.add("lineutils"); CKEDITOR.LINEUTILS_BEFORE = 1; CKEDITOR.LINEUTILS_AFTER = 2; CKEDITOR.LINEUTILS_INSIDE = 4; b.prototype = {
                start: function (a) {
                    var b = this, c = this.editor, d = this.doc, f, h, l, m, v = CKEDITOR.tools.eventsBuffer(50, function () { c.readOnly || "wysiwyg" != c.mode || (b.relations = {}, (h = d.$.elementFromPoint(l, m)) && h.nodeType && (f = new CKEDITOR.dom.element(h), b.traverseSearch(f), isNaN(l + m) || b.pixelSearch(f, l, m), a && a(b.relations, l, m))) }); this.listener = this.editable.attachListener(this.target,
                        "mousemove", function (a) { l = a.data.$.clientX; m = a.data.$.clientY; v.input() }); this.editable.attachListener(this.inline ? this.editable : this.frame, "mouseout", function () { v.reset() })
                }, stop: function () { this.listener && this.listener.removeListener() }, getRange: function () {
                    var a = {}; a[CKEDITOR.LINEUTILS_BEFORE] = CKEDITOR.POSITION_BEFORE_START; a[CKEDITOR.LINEUTILS_AFTER] = CKEDITOR.POSITION_AFTER_END; a[CKEDITOR.LINEUTILS_INSIDE] = CKEDITOR.POSITION_AFTER_START; return function (b) {
                        var c = this.editor.createRange(); c.moveToPosition(this.relations[b.uid].element,
                            a[b.type]); return c
                    }
                }(), store: function () { function b(a, c, d) { var e = a.getUniqueId(); e in d ? d[e].type |= c : d[e] = { element: a, type: c } } return function (c, d) { var f; d & CKEDITOR.LINEUTILS_AFTER && a(f = c.getNext()) && f.isVisible() && (b(f, CKEDITOR.LINEUTILS_BEFORE, this.relations), d ^= CKEDITOR.LINEUTILS_AFTER); d & CKEDITOR.LINEUTILS_INSIDE && a(f = c.getFirst()) && f.isVisible() && (b(f, CKEDITOR.LINEUTILS_BEFORE, this.relations), d ^= CKEDITOR.LINEUTILS_INSIDE); b(c, d, this.relations) } }(), traverseSearch: function (b) {
                    var c, d, f; do if (f = b.$["data-cke-expando"],
                        !(f && f in this.relations)) { if (b.equals(this.editable)) break; if (a(b)) for (c in this.lookups) (d = this.lookups[c](b)) && this.store(b, d) } while ((!b || b.type != CKEDITOR.NODE_ELEMENT || "true" != b.getAttribute("contenteditable")) && (b = b.getParent()))
                }, pixelSearch: function () {
                    function b(d, e, f, h, l) { for (var m = 0, v; l(f);) { f += h; if (25 == ++m) break; if (v = this.doc.$.elementFromPoint(e, f)) if (v == d) m = 0; else if (c(d, v) && (m = 0, a(v = new CKEDITOR.dom.element(v)))) return v } } var c = CKEDITOR.env.ie || CKEDITOR.env.webkit ? function (a, b) { return a.contains(b) } :
                        function (a, b) { return !!(a.compareDocumentPosition(b) & 16) }; return function (c, d, f) { var h = this.win.getViewPaneSize().height, k = b.call(this, c.$, d, f, -1, function (a) { return 0 < a }); d = b.call(this, c.$, d, f, 1, function (a) { return a < h }); if (k) for (this.traverseSearch(k); !k.getParent().equals(c);)k = k.getParent(); if (d) for (this.traverseSearch(d); !d.getParent().equals(c);)d = d.getParent(); for (; k || d;) { k && (k = k.getNext(a)); if (!k || k.equals(d)) break; this.traverseSearch(k); d && (d = d.getPrevious(a)); if (!d || d.equals(k)) break; this.traverseSearch(d) } }
                }(),
                greedySearch: function () { this.relations = {}; for (var b = this.editable.getElementsByTag("*"), c = 0, d, f, h; d = b.getItem(c++);)if (!d.equals(this.editable) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasAttribute("contenteditable") || !d.isReadOnly()) && a(d) && d.isVisible()) for (h in this.lookups) (f = this.lookups[h](d)) && this.store(d, f); return this.relations }
            }; f.prototype = {
                locate: function () {
                    function b(c, d) {
                        var e = c.element[d === CKEDITOR.LINEUTILS_BEFORE ? "getPrevious" : "getNext"](); return e && a(e) ? (c.siblingRect = e.getClientRect(),
                            d == CKEDITOR.LINEUTILS_BEFORE ? (c.siblingRect.bottom + c.elementRect.top) / 2 : (c.elementRect.bottom + c.siblingRect.top) / 2) : d == CKEDITOR.LINEUTILS_BEFORE ? c.elementRect.top : c.elementRect.bottom
                    } return function (a) {
                        var c; this.locations = {}; for (var d in a) c = a[d], c.elementRect = c.element.getClientRect(), c.type & CKEDITOR.LINEUTILS_BEFORE && this.store(d, CKEDITOR.LINEUTILS_BEFORE, b(c, CKEDITOR.LINEUTILS_BEFORE)), c.type & CKEDITOR.LINEUTILS_AFTER && this.store(d, CKEDITOR.LINEUTILS_AFTER, b(c, CKEDITOR.LINEUTILS_AFTER)), c.type &
                            CKEDITOR.LINEUTILS_INSIDE && this.store(d, CKEDITOR.LINEUTILS_INSIDE, (c.elementRect.top + c.elementRect.bottom) / 2); return this.locations
                    }
                }(), sort: function () { var a, b, c, d; return function (f, h) { a = this.locations; b = []; for (var l in a) for (var m in a[l]) if (c = Math.abs(f - a[l][m]), b.length) { for (d = 0; d < b.length; d++)if (c < b[d].dist) { b.splice(d, 0, { uid: +l, type: m, dist: c }); break } d == b.length && b.push({ uid: +l, type: m, dist: c }) } else b.push({ uid: +l, type: m, dist: c }); return "undefined" != typeof h ? b.slice(0, h) : b } }(), store: function (a,
                    b, c) { this.locations[a] || (this.locations[a] = {}); this.locations[a][b] = c }
            }; var c = { display: "block", width: "0px", height: "0px", "border-color": "transparent", "border-style": "solid", position: "absolute", top: "-6px" }, m = { height: "0px", "border-top": "1px dashed red", position: "absolute", "z-index": 9999 }; d.prototype = {
                removeAll: function () { for (var a in this.hidden) this.hidden[a].remove(), delete this.hidden[a]; for (a in this.visible) this.visible[a].remove(), delete this.visible[a] }, hideLine: function (a) {
                    var b = a.getUniqueId();
                    a.hide(); this.hidden[b] = a; delete this.visible[b]
                }, showLine: function (a) { var b = a.getUniqueId(); a.show(); this.visible[b] = a; delete this.hidden[b] }, hideVisible: function () { for (var a in this.visible) this.hideLine(this.visible[a]) }, placeLine: function (a, b) {
                    var c, d, f; if (c = this.getStyle(a.uid, a.type)) {
                        for (f in this.visible) if (this.visible[f].getCustomData("hash") !== this.hash) { d = this.visible[f]; break } if (!d) for (f in this.hidden) if (this.hidden[f].getCustomData("hash") !== this.hash) {
                            this.showLine(d = this.hidden[f]);
                            break
                        } d || this.showLine(d = this.addLine()); d.setCustomData("hash", this.hash); this.visible[d.getUniqueId()] = d; d.setStyles(c); b && b(d)
                    }
                }, getStyle: function (a, b) {
                    var c = this.relations[a], d = this.locations[a][b], f = {}; f.width = c.siblingRect ? Math.max(c.siblingRect.width, c.elementRect.width) : c.elementRect.width; f.top = this.inline ? d + this.winTopScroll.y - this.rect.relativeY : this.rect.top + this.winTopScroll.y + d; if (f.top - this.winTopScroll.y < this.rect.top || f.top - this.winTopScroll.y > this.rect.bottom) return !1; this.inline ?
                        f.left = c.elementRect.left - this.rect.relativeX : (0 < c.elementRect.left ? f.left = this.rect.left + c.elementRect.left : (f.width += c.elementRect.left, f.left = this.rect.left), 0 < (c = f.left + f.width - (this.rect.left + this.winPane.width)) && (f.width -= c)); f.left += this.winTopScroll.x; for (var h in f) f[h] = CKEDITOR.tools.cssLength(f[h]); return f
                }, addLine: function () { var a = CKEDITOR.dom.element.createFromHtml(this.lineTpl); a.appendTo(this.container); return a }, prepare: function (a, b) { this.relations = a; this.locations = b; this.hash = Math.random() },
                cleanup: function () { var a, b; for (b in this.visible) a = this.visible[b], a.getCustomData("hash") !== this.hash && this.hideLine(a) }, queryViewport: function () { this.winPane = this.win.getViewPaneSize(); this.winTopScroll = this.winTop.getScrollPosition(); this.winTopPane = this.winTop.getViewPaneSize(); this.rect = this.getClientRect(this.inline ? this.editable : this.frame) }, getClientRect: function (a) {
                    a = a.getClientRect(); var b = this.container.getDocumentPosition(), c = this.container.getComputedStyle("position"); a.relativeX = a.relativeY =
                        0; "static" != c && (a.relativeY = b.y, a.relativeX = b.x, a.top -= a.relativeY, a.bottom -= a.relativeY, a.left -= a.relativeX, a.right -= a.relativeX); return a
                }
            }; var h = { left: 1, right: 1, center: 1 }, l = { absolute: 1, fixed: 1 }; CKEDITOR.plugins.lineutils = { finder: b, locator: f, liner: d }
        })(); (function () {
            function b(b) { return b.getName && !b.hasAttribute("data-cke-temp") } CKEDITOR.plugins.add("widgetselection", {
                init: function (b) {
                    if (CKEDITOR.env.webkit) {
                        var d = CKEDITOR.plugins.widgetselection; b.on("contentDom", function (a) {
                            a = a.editor; var b =
                                a.editable(); b.attachListener(b, "keydown", function (a) { a.data.getKeystroke() == CKEDITOR.CTRL + 65 && CKEDITOR.tools.setTimeout(function () { d.addFillers(b) || d.removeFillers(b) }, 0) }, null, null, -1); a.on("selectionCheck", function (a) { d.removeFillers(a.editor.editable()) }); a.on("paste", function (a) { a.data.dataValue = d.cleanPasteData(a.data.dataValue) }); "selectall" in a.plugins && d.addSelectAllIntegration(a)
                        })
                    }
                }
            }); CKEDITOR.plugins.widgetselection = {
                startFiller: null, endFiller: null, fillerAttribute: "data-cke-filler-webkit",
                fillerContent: "\x26nbsp;", fillerTagName: "div", addFillers: function (f) { var d = f.editor; if (!this.isWholeContentSelected(f) && 0 < f.getChildCount()) { var a = f.getFirst(b), c = f.getLast(b); a && a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable() && (this.startFiller = this.createFiller(), f.append(this.startFiller, 1)); c && c.type == CKEDITOR.NODE_ELEMENT && !c.isEditable() && (this.endFiller = this.createFiller(!0), f.append(this.endFiller, 0)); if (this.hasFiller(f)) return d = d.createRange(), d.selectNodeContents(f), d.select(), !0 } return !1 },
                removeFillers: function (b) { if (this.hasFiller(b) && !this.isWholeContentSelected(b)) { var d = b.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dstart]"), a = b.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dend]"); this.startFiller && d && this.startFiller.equals(d) ? this.removeFiller(this.startFiller, b) : this.startFiller = d; this.endFiller && a && this.endFiller.equals(a) ? this.removeFiller(this.endFiller, b) : this.endFiller = a } }, cleanPasteData: function (b) {
                    b && b.length && (b = b.replace(this.createFillerRegex(),
                        "").replace(this.createFillerRegex(!0), "")); return b
                }, isWholeContentSelected: function (b) { var d = b.editor.getSelection().getRanges()[0]; return !d || d && d.collapsed ? !1 : (d = d.clone(), d.enlarge(CKEDITOR.ENLARGE_ELEMENT), !!(d && b && d.startContainer && d.endContainer && 0 === d.startOffset && d.endOffset === b.getChildCount() && d.startContainer.equals(b) && d.endContainer.equals(b))) }, hasFiller: function (b) { return 0 < b.find(this.fillerTagName + "[" + this.fillerAttribute + "]").count() }, createFiller: function (b) {
                    var d = new CKEDITOR.dom.element(this.fillerTagName);
                    d.setHtml(this.fillerContent); d.setAttribute(this.fillerAttribute, b ? "end" : "start"); d.setAttribute("data-cke-temp", 1); d.setStyles({ display: "block", width: 0, height: 0, padding: 0, border: 0, margin: 0, position: "absolute", top: 0, left: "-9999px", opacity: 0, overflow: "hidden" }); return d
                }, removeFiller: function (b, d) {
                    if (b) {
                        var a = d.editor, c = d.editor.getSelection().getRanges()[0].startPath(), m = a.createRange(), h, l; c.contains(b) && (h = b.getHtml(), l = !0); c = "start" == b.getAttribute(this.fillerAttribute); b.remove(); h && 0 < h.length &&
                            h != this.fillerContent ? (d.insertHtmlIntoRange(h, a.getSelection().getRanges()[0]), m.setStartAt(d.getChild(d.getChildCount() - 1), CKEDITOR.POSITION_BEFORE_END), a.getSelection().selectRanges([m])) : l && (c ? m.setStartAt(d.getFirst().getNext(), CKEDITOR.POSITION_AFTER_START) : m.setEndAt(d.getLast().getPrevious(), CKEDITOR.POSITION_BEFORE_END), d.editor.getSelection().selectRanges([m]))
                    }
                }, createFillerRegex: function (b) {
                    var d = this.createFiller(b).getOuterHtml().replace(/style="[^"]*"/gi, 'style\x3d"[^"]*"').replace(/>[^<]*</gi,
                        "\x3e[^\x3c]*\x3c"); return new RegExp((b ? "" : "^") + d + (b ? "$" : ""))
                }, addSelectAllIntegration: function (b) { var d = this; b.editable().attachListener(b, "beforeCommandExec", function (a) { var c = b.editable(); "selectAll" == a.data.name && c && d.addFillers(c) }, null, null, 9999) }
            }
        })(); "use strict"; (function () {
            function b(a) {
                this.editor = a; this.registered = {}; this.instances = {}; this.selected = []; this.widgetHoldingFocusedEditable = this.focused = null; this._ = { nextId: 0, upcasts: [], upcastCallbacks: [], filters: {} }; F(this); D(this); this.on("checkWidgets",
                    h); this.editor.on("contentDomInvalidated", this.checkWidgets, this); C(this); w(this); z(this); B(this); A(this)
            } function f(a, b, c, d, e) {
                var g = a.editor; CKEDITOR.tools.extend(this, d, {
                    editor: g, id: b, inline: "span" == c.getParent().getName(), element: c, data: CKEDITOR.tools.extend({}, "function" == typeof d.defaults ? d.defaults() : d.defaults), dataReady: !1, inited: !1, ready: !1, edit: f.prototype.edit, focusedEditable: null, definition: d, repository: a, draggable: !1 !== d.draggable, _: {
                        downcastFn: d.downcast && "string" == typeof d.downcast ?
                            d.downcasts[d.downcast] : d.downcast
                    }
                }, !0); a.fire("instanceCreated", this); K(this, d); this.init && this.init(); this.inited = !0; (a = this.element.data("cke-widget-data")) && this.setData(JSON.parse(decodeURIComponent(a))); e && this.setData(e); this.data.classes || this.setData("classes", this.getClasses()); this.dataReady = !0; da(this); this.fire("data", this.data); this.isInited() && g.editable().contains(this.wrapper) && (this.ready = !0, this.fire("ready"))
            } function d(a, b, c) {
                CKEDITOR.dom.element.call(this, b.$); this.editor = a;
                this._ = {}; b = this.filter = c.filter; CKEDITOR.dtd[this.getName()].p ? (this.enterMode = b ? b.getAllowedEnterMode(a.enterMode) : a.enterMode, this.shiftEnterMode = b ? b.getAllowedEnterMode(a.shiftEnterMode, !0) : a.shiftEnterMode) : this.enterMode = this.shiftEnterMode = CKEDITOR.ENTER_BR
            } function a(a, b) {
                a.addCommand(b.name, {
                    exec: function (a, c) {
                        function d() { a.widgets.finalizeCreation(h) } var e = a.widgets.focused; if (e && e.name == b.name) e.edit(); else if (b.insert) b.insert({ editor: a, commandData: c }); else if (b.template) {
                            var e = "function" ==
                                typeof b.defaults ? b.defaults() : b.defaults, e = CKEDITOR.dom.element.createFromHtml(b.template.output(e), a.document), f, g = a.widgets.wrapElement(e, b.name), h = new CKEDITOR.dom.documentFragment(g.getDocument()); h.append(g); (f = a.widgets.initOn(e, b, c && c.startupData)) ? (e = f.once("edit", function (b) {
                                    if (b.data.dialog) f.once("dialog", function (b) {
                                        b = b.data; var c, e; c = b.once("ok", d, null, null, 20); e = b.once("cancel", function (b) { b.data && !1 === b.data.hide || a.widgets.destroy(f, !0) }); b.once("hide", function () {
                                            c.removeListener();
                                            e.removeListener()
                                        })
                                    }); else d()
                                }, null, null, 999), f.edit(), e.removeListener()) : d()
                        }
                    }, allowedContent: b.allowedContent, requiredContent: b.requiredContent, contentForms: b.contentForms, contentTransformations: b.contentTransformations
                })
            } function c(a, b) {
                function c(a, d) { var e = b.upcast.split(","), f, g; for (g = 0; g < e.length; g++)if (f = e[g], f === a.name) return b.upcasts[f].call(this, a, d); return !1 } function d(b, c, e) {
                    var f = CKEDITOR.tools.getIndex(a._.upcasts, function (a) { return a[2] > e }); 0 > f && (f = a._.upcasts.length); a._.upcasts.splice(f,
                        0, [CKEDITOR.tools.bind(b, c), c.name, e])
                } var e = b.upcast, f = b.upcastPriority || 10; e && ("string" == typeof e ? d(c, b, f) : d(e, b, f))
            } function m(a, b) { a.focused = null; if (b.isInited()) { var c = b.editor.checkDirty(); a.fire("widgetBlurred", { widget: b }); b.setFocused(!1); !c && b.editor.resetDirty() } } function h(a) {
                a = a.data; if ("wysiwyg" == this.editor.mode) {
                    var b = this.editor.editable(), c = this.instances, d, e, g, h; if (b) {
                        for (d in c) c[d].isReady() && !b.contains(c[d].wrapper) && this.destroy(c[d], !0); if (a && a.initOnlyNew) c = this.initOnAll();
                        else { var k = b.find(".cke_widget_wrapper"), c = []; d = 0; for (e = k.count(); d < e; d++) { g = k.getItem(d); if (h = !this.getByElement(g, !0)) { a: { h = p; for (var l = g; l = l.getParent();)if (h(l)) { h = !0; break a } h = !1 } h = !h } h && b.contains(g) && (g.addClass("cke_widget_new"), c.push(this.initOn(g.getFirst(f.isDomWidgetElement)))) } } a && a.focusInited && 1 == c.length && c[0].focus()
                    }
                }
            } function l(a) {
                if ("undefined" != typeof a.attributes && a.attributes["data-widget"]) {
                    var b = e(a), c = k(a), d = !1; b && b.value && b.value.match(/^\s/g) && (b.parent.attributes["data-cke-white-space-first"] =
                        1, b.value = b.value.replace(/^\s/g, "\x26nbsp;"), d = !0); c && c.value && c.value.match(/\s$/g) && (c.parent.attributes["data-cke-white-space-last"] = 1, c.value = c.value.replace(/\s$/g, "\x26nbsp;"), d = !0); d && (a.attributes["data-cke-widget-white-space"] = 1)
                }
            } function e(a) { return a.find(function (a) { return 3 === a.type }, !0).shift() } function k(a) { return a.find(function (a) { return 3 === a.type }, !0).pop() } function g(a, b, c) {
                if (!c.allowedContent && !c.disallowedContent) return null; var d = this._.filters[a]; d || (this._.filters[a] = d =
                    {}); a = d[b]; a || (a = c.allowedContent ? new CKEDITOR.filter(c.allowedContent) : this.editor.filter.clone(), d[b] = a, c.disallowedContent && a.disallow(c.disallowedContent)); return a
            } function n(a) {
                var b = [], c = a._.upcasts, d = a._.upcastCallbacks; return {
                    toBeWrapped: b, iterator: function (a) {
                        var e, g, h, k, l; if ("data-cke-widget-wrapper" in a.attributes) return (a = a.getFirst(f.isParserWidgetElement)) && b.push([a]), !1; if ("data-widget" in a.attributes) return b.push([a]), !1; if (l = c.length) {
                            if (a.attributes["data-cke-widget-upcasted"]) return !1;
                            k = 0; for (e = d.length; k < e; ++k)if (!1 === d[k](a)) return; for (k = 0; k < l; ++k)if (e = c[k], h = {}, g = e[0](a, h)) return g instanceof CKEDITOR.htmlParser.element && (a = g), a.attributes["data-cke-widget-data"] = encodeURIComponent(JSON.stringify(h)), a.attributes["data-cke-widget-upcasted"] = 1, b.push([a, e[1]]), !1
                        }
                    }
                }
            } function q(a, b) { return { tabindex: -1, contenteditable: "false", "data-cke-widget-wrapper": 1, "data-cke-filter": "off", "class": "cke_widget_wrapper cke_widget_new cke_widget_" + (a ? "inline" : "block") + (b ? " cke_widget_" + b : "") } }
            function u(a, b, c) { if (a.type == CKEDITOR.NODE_ELEMENT) { var d = CKEDITOR.dtd[a.name]; if (d && !d[c.name]) { var d = a.split(b), e = a.parent; b = d.getIndex(); a.children.length || (--b, a.remove()); d.children.length || d.remove(); return u(e, b, c) } } a.add(c, b) } function r(a, b) { return "boolean" == typeof a.inline ? a.inline : !!CKEDITOR.dtd.$inline[b] } function p(a) { return a.hasAttribute("data-cke-temp") } function v(a, b, c, d) {
                var e = a.editor; e.fire("lockSnapshot"); c ? (d = c.data("cke-widget-editable"), d = b.editables[d], a.widgetHoldingFocusedEditable =
                    b, b.focusedEditable = d, c.addClass("cke_widget_editable_focused"), d.filter && e.setActiveFilter(d.filter), e.setActiveEnterMode(d.enterMode, d.shiftEnterMode)) : (d || b.focusedEditable.removeClass("cke_widget_editable_focused"), b.focusedEditable = null, a.widgetHoldingFocusedEditable = null, e.setActiveFilter(null), e.setActiveEnterMode(null, null)); e.fire("unlockSnapshot")
            } function x(a) { a.contextMenu && a.contextMenu.addListener(function (b) { if (b = a.widgets.getByElement(b, !0)) return b.fire("contextMenu", {}) }) } function t(a,
                b) { return CKEDITOR.tools.trim(b) } function B(a) {
                    var b = a.editor, c = CKEDITOR.plugins.lineutils; b.on("dragstart", function (c) { var d = c.data.target; f.isDomDragHandler(d) && (d = a.getByElement(d), c.data.dataTransfer.setData("cke/widget-id", d.id), b.focus(), d.focus()) }); b.on("drop", function (c) {
                        function d(a, b) { return a && b ? a.wrapper.equals(b.wrapper) || a.wrapper.contains(b.wrapper) : !1 } var e = c.data.dataTransfer, f = e.getData("cke/widget-id"), g = e.getTransferType(b), e = b.createRange(), h = function (a) {
                            a = a.getBoundaryNodes().startNode;
                            a.type !== CKEDITOR.NODE_ELEMENT && (a = a.getParent()); return b.widgets.getByElement(a)
                        }(c.data.dropRange); if ("" !== f && g === CKEDITOR.DATA_TRANSFER_CROSS_EDITORS) c.cancel(); else if (g == CKEDITOR.DATA_TRANSFER_INTERNAL) if ("" === f && 0 < b.widgets.selected.length) c.data.dataTransfer.setData("text/html", N(b)); else if (f = a.instances[f]) d(f, h) ? c.cancel() : (e.setStartBefore(f.wrapper), e.setEndAfter(f.wrapper), c.data.dragRange = e, delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount, delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount,
                            c.data.dataTransfer.setData("text/html", f.getClipboardHtml()), b.widgets.destroy(f, !0))
                    }); b.on("contentDom", function () {
                        var d = b.editable(); CKEDITOR.tools.extend(a, {
                            finder: new c.finder(b, {
                                lookups: {
                                    "default": function (b) {
                                        if (!b.is(CKEDITOR.dtd.$listItem) && b.is(CKEDITOR.dtd.$block) && !f.isDomNestedEditable(b) && !a._.draggedWidget.wrapper.contains(b)) {
                                            var c = f.getNestedEditable(d, b); if (c) {
                                                b = a._.draggedWidget; if (a.getByElement(c) == b) return; c = CKEDITOR.filter.instances[c.data("cke-filter")]; b = b.requiredContent;
                                                if (c && b && !c.check(b)) return
                                            } return CKEDITOR.LINEUTILS_BEFORE | CKEDITOR.LINEUTILS_AFTER
                                        }
                                    }
                                }
                            }), locator: new c.locator(b), liner: new c.liner(b, { lineStyle: { cursor: "move !important", "border-top-color": "#666" }, tipLeftStyle: { "border-left-color": "#666" }, tipRightStyle: { "border-right-color": "#666" } })
                        }, !0)
                    })
                } function w(a) {
                    var b = a.editor; b.on("contentDom", function () {
                        var c = b.editable(), d = c.isInline() ? c : b.document, e, g; c.attachListener(d, "mousedown", function (c) {
                            var d = c.data.getTarget(); e = d instanceof CKEDITOR.dom.element ?
                                a.getByElement(d) : null; g = 0; e && (e.inline && d.type == CKEDITOR.NODE_ELEMENT && d.hasAttribute("data-cke-widget-drag-handler") ? (g = 1, a.focused != e && b.getSelection().removeAllRanges()) : f.getNestedEditable(e.wrapper, d) ? e = null : (c.data.preventDefault(), CKEDITOR.env.ie || e.focus()))
                        }); c.attachListener(d, "mouseup", function () { g && e && e.wrapper && (g = 0, e.focus()) }); CKEDITOR.env.ie && c.attachListener(d, "mouseup", function () { setTimeout(function () { e && e.wrapper && c.contains(e.wrapper) && (e.focus(), e = null) }) })
                    }); b.on("doubleclick",
                        function (b) { var c = a.getByElement(b.data.element); if (c && !f.getNestedEditable(c.wrapper, b.data.element)) return c.fire("doubleclick", { element: b.data.element }) }, null, null, 1)
                } function z(a) {
                    a.editor.on("key", function (b) {
                        var c = a.focused, d = a.widgetHoldingFocusedEditable, e; c ? e = c.fire("key", { keyCode: b.data.keyCode }) : d && (c = b.data.keyCode, b = d.focusedEditable, c == CKEDITOR.CTRL + 65 ? (c = b.getBogus(), d = d.editor.createRange(), d.selectNodeContents(b), c && d.setEndAt(c, CKEDITOR.POSITION_BEFORE_START), d.select(), e = !1) : 8 ==
                            c || 46 == c ? (e = d.editor.getSelection().getRanges(), d = e[0], e = !(1 == e.length && d.collapsed && d.checkBoundaryOfElement(b, CKEDITOR[8 == c ? "START" : "END"]))) : e = void 0); return e
                    }, null, null, 1)
                } function A(a) { function b(d) { 1 > a.selected.length || R(c, "cut" === d.name) } var c = a.editor; c.on("contentDom", function () { var a = c.editable(); a.attachListener(a, "copy", b); a.attachListener(a, "cut", b) }) } function C(a) {
                    function b() {
                        var a = e.getSelection(); if (a && (a = a.getRanges()[0]) && !a.collapsed) {
                            var d = c(a.startContainer), f = c(a.endContainer);
                            !d && f ? (a.setEndBefore(f.wrapper), a.select()) : d && !f && (a.setStartAfter(d.wrapper), a.select())
                        }
                    } function c(a) { return a ? a.type == CKEDITOR.NODE_TEXT ? c(a.getParent()) : e.widgets.getByElement(a) : null } function d() { a.fire("checkSelection") } var e = a.editor; e.on("selectionCheck", d); e.on("contentDom", function () { e.editable().attachListener(e, "key", function () { setTimeout(d, 10) }) }); if (!CKEDITOR.env.ie) a.on("checkSelection", b); a.on("checkSelection", a.checkSelection, a); e.on("selectionChange", function (b) {
                        var c = (b = f.getNestedEditable(e.editable(),
                            b.data.selection.getStartElement())) && a.getByElement(b), d = a.widgetHoldingFocusedEditable; d ? d === c && d.focusedEditable.equals(b) || (v(a, d, null), c && b && v(a, c, b)) : c && b && v(a, c, b)
                    }); e.on("dataReady", function () { G(a).commit() }); e.on("blur", function () { var b; (b = a.focused) && m(a, b); (b = a.widgetHoldingFocusedEditable) && v(a, b, null) })
                } function D(a) {
                    var b = a.editor, c = {}; b.on("toDataFormat", function (b) {
                        var d = CKEDITOR.tools.getNextNumber(), g = []; b.data.downcastingSessionId = d; c[d] = g; b.data.dataValue.forEach(function (b) {
                            var c =
                                b.attributes, d; if ("data-cke-widget-white-space" in c) { d = e(b); var h = k(b); d.parent.attributes["data-cke-white-space-first"] && (d.value = d.value.replace(/^&nbsp;/g, " ")); h.parent.attributes["data-cke-white-space-last"] && (h.value = h.value.replace(/&nbsp;$/g, " ")) } if ("data-cke-widget-id" in c) { if (c = a.instances[c["data-cke-widget-id"]]) d = b.getFirst(f.isParserWidgetElement), g.push({ wrapper: b, element: d, widget: c, editables: {} }), "1" != d.attributes["data-cke-widget-keep-attr"] && delete d.attributes["data-widget"] } else if ("data-cke-widget-editable" in
                                    c) return 0 < g.length && (g[g.length - 1].editables[c["data-cke-widget-editable"]] = b), !1
                        }, CKEDITOR.NODE_ELEMENT, !0)
                    }, null, null, 8); b.on("toDataFormat", function (a) {
                        if (a.data.downcastingSessionId) for (var b = c[a.data.downcastingSessionId], d, e, f, g, h, k; d = b.shift();) {
                            e = d.widget; f = d.element; g = e._.downcastFn && e._.downcastFn.call(e, f); a.data.widgetsCopy && e.getClipboardHtml && (g = CKEDITOR.htmlParser.fragment.fromHtml(e.getClipboardHtml()), g = g.children[0]); for (k in d.editables) h = d.editables[k], delete h.attributes.contenteditable,
                                h.setHtml(e.editables[k].getData()); g || (g = f); d.wrapper.replaceWith(g)
                        }
                    }, null, null, 13); b.on("contentDomUnload", function () { a.destroyAll(!0) })
                } function F(a) {
                    var b = a.editor, c, d; b.on("toHtml", function (b) {
                        var d = n(a), e; for (b.data.dataValue.forEach(d.iterator, CKEDITOR.NODE_ELEMENT, !0); e = d.toBeWrapped.pop();) { var g = e[0], h = g.parent; h.type == CKEDITOR.NODE_ELEMENT && h.attributes["data-cke-widget-wrapper"] && h.replaceWith(g); a.wrapElement(e[0], e[1]) } c = b.data.protectedWhitespaces ? 3 == b.data.dataValue.children.length &&
                            f.isParserWidgetWrapper(b.data.dataValue.children[1]) : 1 == b.data.dataValue.children.length && f.isParserWidgetWrapper(b.data.dataValue.children[0])
                    }, null, null, 8); b.on("dataReady", function () { if (d) for (var c = b.editable().find(".cke_widget_wrapper"), e, g, h = 0, k = c.count(); h < k; ++h)e = c.getItem(h), g = e.getFirst(f.isDomWidgetElement), g.type == CKEDITOR.NODE_ELEMENT && g.data("widget") ? (g.replace(e), a.wrapElement(g)) : e.remove(); d = 0; a.destroyAll(!0); a.initOnAll() }); b.on("loadSnapshot", function (b) {
                        /data-cke-widget/.test(b.data) &&
                        (d = 1); a.destroyAll(!0)
                    }, null, null, 9); b.on("paste", function (a) { a = a.data; a.dataValue = a.dataValue.replace(S, t); a.range && (a = f.getNestedEditable(b.editable(), a.range.startContainer)) && (a = CKEDITOR.filter.instances[a.data("cke-filter")]) && b.setActiveFilter(a) }); b.on("afterInsertHtml", function (d) { d.data.intoRange ? a.checkWidgets({ initOnlyNew: !0 }) : (b.fire("lockSnapshot"), a.checkWidgets({ initOnlyNew: !0, focusInited: c }), b.fire("unlockSnapshot")) })
                } function G(a) {
                    var b = a.selected, c = [], d = b.slice(0), e = null; return {
                        select: function (a) {
                            0 >
                            CKEDITOR.tools.indexOf(b, a) && c.push(a); a = CKEDITOR.tools.indexOf(d, a); 0 <= a && d.splice(a, 1); return this
                        }, focus: function (a) { e = a; return this }, commit: function () {
                            var f = a.focused !== e, g, h; a.editor.fire("lockSnapshot"); for (f && (g = a.focused) && m(a, g); g = d.pop();)b.splice(CKEDITOR.tools.indexOf(b, g), 1), g.isInited() && (h = g.editor.checkDirty(), g.setSelected(!1), !h && g.editor.resetDirty()); f && e && (h = a.editor.checkDirty(), a.focused = e, a.fire("widgetFocused", { widget: e }), e.setFocused(!0), !h && a.editor.resetDirty()); for (; g =
                                c.pop();)b.push(g), g.setSelected(!0); a.editor.fire("unlockSnapshot")
                        }
                    }
                } function I(a) { a && a.addFilterRule(function (a) { return a.replace(/\s*cke_widget_selected/g, "").replace(/\s*cke_widget_focused/g, "").replace(/<span[^>]*cke_widget_drag_handler_container[^>]*.*?<\/span>/gmi, "") }) } function M(a, b, c) { var d = 0; b = J(b); var e = a.data.classes || {}, f; if (b) { for (e = CKEDITOR.tools.clone(e); f = b.pop();)c ? e[f] || (d = e[f] = 1) : e[f] && (delete e[f], d = 1); d && a.setData("classes", e) } } function E(a) { a.cancel() } function R(a, b) {
                    var c =
                        a.widgets.focused, d, e, f; fa.hasCopyBin(a) || (e = new fa(a, { beforeDestroy: function () { !b && c && c.focus(); f && a.getSelection().selectBookmarks(f); d && CKEDITOR.plugins.widgetselection.addFillers(a.editable()) }, afterDestroy: function () { b && !a.readOnly && (c ? a.widgets.del(c) : a.extractSelectedHtml(), a.fire("saveSnapshot")) } }), c || (d = CKEDITOR.env.webkit && CKEDITOR.plugins.widgetselection.isWholeContentSelected(a.editable()), f = a.getSelection().createBookmarks(!0)), e.handle(N(a)))
                } function J(a) {
                    return (a = (a = a.getDefinition().attributes) &&
                        a["class"]) ? a.split(/\s+/) : null
                } function L() { var a = CKEDITOR.document.getActive(), b = this.editor, c = b.editable(); (c.isInline() ? c : b.document.getWindow().getFrame()).equals(a) && b.focusManager.focus(c) } function Q() { CKEDITOR.env.gecko && this.editor.unlockSelection(); CKEDITOR.env.webkit || (this.editor.forceNextSelectionCheck(), this.editor.selectionChange(1)) } function N(a) {
                    var b = a.getSelectedHtml(!0); if (a.widgets.focused) return a.widgets.focused.getClipboardHtml(); a.once("toDataFormat", function (a) {
                        a.data.widgetsCopy =
                        !0
                    }, null, null, -1); return a.dataProcessor.toDataFormat(b)
                } function K(a, b) {
                    O(a); Y(a); U(a); Z(a); V(a); ba(a); ca(a); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) a.wrapper.on("dragstart", function (b) { var c = b.data.getTarget(); f.getNestedEditable(a, c) || a.inline && f.isDomDragHandler(c) || b.data.preventDefault() }); a.wrapper.removeClass("cke_widget_new"); a.element.addClass("cke_widget_element"); a.on("key", function (b) {
                        b = b.data.keyCode; if (13 == b) a.edit(); else {
                            if (b == CKEDITOR.CTRL + 67 || b == CKEDITOR.CTRL + 88) {
                                R(a.editor, b ==
                                    CKEDITOR.CTRL + 88); return
                            } if (b in T || CKEDITOR.CTRL & b || CKEDITOR.ALT & b) return
                        } return !1
                    }, null, null, 999); a.on("doubleclick", function (b) { a.edit() && b.cancel() }); if (b.data) a.on("data", b.data); if (b.edit) a.on("edit", b.edit)
                } function O(a) { (a.wrapper = a.element.getParent()).setAttribute("data-cke-widget-id", a.id) } function Y(a, b) {
                    a.partSelectors || (a.partSelectors = a.parts); if (a.parts) {
                        var c = {}, d, e; for (e in a.partSelectors) b || !a.parts[e] || "string" == typeof a.parts[e] ? (d = a.wrapper.findOne(a.partSelectors[e]), c[e] =
                            d) : c[e] = a.parts[e]; a.parts = c
                    }
                } function U(a) { var b = a.editables, c, d; a.editables = {}; if (a.editables) for (c in b) d = b[c], a.initEditable(c, "string" == typeof d ? { selector: d } : d) } function Z(a) {
                    if (!0 === a.mask) ia(a); else if (a.mask) {
                        var b = new CKEDITOR.tools.buffers.throttle(250, X, a), c = CKEDITOR.env.gecko ? 300 : 0, d, e; a.on("focus", function () { b.input(); d = a.editor.on("change", b.input); e = a.on("blur", function () { d.removeListener(); e.removeListener() }) }); a.editor.on("instanceReady", function () {
                            setTimeout(function () { b.input() },
                                c)
                        }); a.editor.on("mode", function () { setTimeout(function () { b.input() }, c) }); if (CKEDITOR.env.gecko) { var f = a.element.find("img"); CKEDITOR.tools.array.forEach(f.toArray(), function (a) { a.on("load", function () { b.input() }) }) } for (var g in a.editables) a.editables[g].on("focus", function () { a.editor.on("change", b.input); e && e.removeListener() }), a.editables[g].on("blur", function () { a.editor.removeListener("change", b.input) }); b.input()
                    }
                } function ia(a) {
                    var b = a.wrapper.findOne(".cke_widget_mask"); b || (b = new CKEDITOR.dom.element("img",
                        a.editor.document), b.setAttributes({ src: CKEDITOR.tools.transparentImageData, "class": "cke_reset cke_widget_mask" }), a.wrapper.append(b)); a.mask = b
                } function X() {
                    if (this.wrapper) {
                        this.maskPart = this.maskPart || this.mask; var a = this.parts[this.maskPart], b; if (a && "string" != typeof a) {
                            b = this.wrapper.findOne(".cke_widget_partial_mask"); b || (b = new CKEDITOR.dom.element("img", this.editor.document), b.setAttributes({ src: CKEDITOR.tools.transparentImageData, "class": "cke_reset cke_widget_partial_mask" }), this.wrapper.append(b));
                            this.mask = b; var c = b.$, d = a.$, e = !(c.offsetTop == d.offsetTop && c.offsetLeft == d.offsetLeft); if (c.offsetWidth != d.offsetWidth || c.offsetHeight != d.offsetHeight || e) c = a.getParent(), d = CKEDITOR.plugins.widget.isDomWidget(c), b.setStyles({ top: a.$.offsetTop + (d ? 0 : c.$.offsetTop) + "px", left: a.$.offsetLeft + (d ? 0 : c.$.offsetLeft) + "px", width: a.$.offsetWidth + "px", height: a.$.offsetHeight + "px" })
                        }
                    }
                } function V(a) {
                    if (a.draggable) {
                        var b = a.editor, c = a.wrapper.getLast(f.isDomDragHandlerContainer), d; c ? d = c.findOne("img") : (c = new CKEDITOR.dom.element("span",
                            b.document), c.setAttributes({ "class": "cke_reset cke_widget_drag_handler_container", style: "background:rgba(220,220,220,0.5);background-image:url(" + b.plugins.widget.path + "images/handle.png);display:none;" }), d = new CKEDITOR.dom.element("img", b.document), d.setAttributes({ "class": "cke_reset cke_widget_drag_handler", "data-cke-widget-drag-handler": "1", src: CKEDITOR.tools.transparentImageData, width: 15, title: b.lang.widget.move, height: 15, role: "presentation" }), a.inline && d.setAttribute("draggable", "true"), c.append(d),
                            a.wrapper.append(c)); a.wrapper.on("dragover", function (a) { a.data.preventDefault() }); a.wrapper.on("mouseenter", a.updateDragHandlerPosition, a); setTimeout(function () { a.on("data", a.updateDragHandlerPosition, a) }, 50); if (!a.inline && (d.on("mousedown", W, a), CKEDITOR.env.ie && 9 > CKEDITOR.env.version)) d.on("dragstart", function (a) { a.data.preventDefault(!0) }); a.dragHandlerContainer = c
                    }
                } function W(a) {
                    function b() {
                        var c; for (p.reset(); c = h.pop();)c.removeListener(); var d = k; c = a.sender; var e = this.repository.finder, f = this.repository.liner,
                            g = this.editor, l = this.editor.editable(); CKEDITOR.tools.isEmpty(f.visible) || (d = e.getRange(d[0]), this.focus(), g.fire("drop", { dropRange: d, target: d.startContainer })); l.removeClass("cke_widget_dragging"); f.hideVisible(); g.fire("dragend", { target: c })
                    } if (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT) {
                        var c = this.repository.finder, d = this.repository.locator, e = this.repository.liner, f = this.editor, g = f.editable(), h = [], k = [], l, m; this.repository._.draggedWidget = this; var n = c.greedySearch(), p = CKEDITOR.tools.eventsBuffer(50,
                            function () { l = d.locate(n); k = d.sort(m, 1); k.length && (e.prepare(n, l), e.placeLine(k[0]), e.cleanup()) }); g.addClass("cke_widget_dragging"); h.push(g.on("mousemove", function (a) { m = a.data.$.clientY; p.input() })); f.fire("dragstart", { target: a.sender }); h.push(f.document.once("mouseup", b, this)); g.isInline() || h.push(CKEDITOR.document.once("mouseup", b, this))
                    }
                } function ba(a) { var b = null; a.on("data", function () { var a = this.data.classes, c; if (b != a) { for (c in b) a && a[c] || this.removeClass(c); for (c in a) this.addClass(c); b = a } }) }
            function ca(a) { a.on("data", function () { if (a.wrapper) { var b = this.getLabel ? this.getLabel() : this.editor.lang.widget.label.replace(/%1/, this.pathName || this.element.getName()); a.wrapper.setAttribute("role", "region"); a.wrapper.setAttribute("aria-label", b) } }, null, null, 9999) } function da(a) { a.element.data("cke-widget-data", encodeURIComponent(JSON.stringify(a.data))) } function aa() {
                function a() { } function b(a, c, d) { return d && this.checkElement(a) ? (a = d.widgets.getByElement(a, !0)) && a.checkStyleActive(this) : !1 } function c(a) {
                    function b(a,
                        c, d) { for (var e = a.length, f = 0; f < e;) { if (c.call(d, a[f], f, a)) return a[f]; f++ } } function e(a) { function b(a, c) { var d = CKEDITOR.tools.object.keys(a), e = CKEDITOR.tools.object.keys(c); if (d.length !== e.length) return !1; for (var f in a) if (("object" !== typeof a[f] || "object" !== typeof c[f] || !b(a[f], c[f])) && a[f] !== c[f]) return !1; return !0 } return function (c) { return b(a.getDefinition(), c.getDefinition()) } } var f = a.widget, g; d[f] || (d[f] = {}); for (var h = 0, k = a.group.length; h < k; h++)g = a.group[h], d[f][g] || (d[f][g] = []), g = d[f][g], b(g,
                            e(a)) || g.push(a)
                } var d = {}; CKEDITOR.style.addCustomHandler({
                    type: "widget", setup: function (a) { this.widget = a.widget; (this.group = "string" == typeof a.group ? [a.group] : a.group) && c(this) }, apply: function (a) { var b; a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && (b = a.widgets.focused, this.group && this.removeStylesFromSameGroup(a), b.applyStyle(this)) }, remove: function (a) { a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && a.widgets.focused.removeStyle(this) }, removeStylesFromSameGroup: function (a) {
                        var b =
                            !1, c, e; if (!(a instanceof CKEDITOR.editor)) return !1; e = a.elementPath(); if (this.checkApplicable(e, a)) for (var f = 0, g = this.group.length; f < g; f++) { c = d[this.widget][this.group[f]]; for (var h = 0; h < c.length; h++)c[h] !== this && c[h].checkActive(e, a) && (a.widgets.focused.removeStyle(c[h]), b = !0) } return b
                    }, checkActive: function (a, b) { return this.checkElementMatch(a.lastElement, 0, b) }, checkApplicable: function (a, b) { return b instanceof CKEDITOR.editor ? this.checkElement(a.lastElement) : !1 }, checkElementMatch: b, checkElementRemovable: b,
                    checkElement: function (a) { return f.isDomWidgetWrapper(a) ? (a = a.getFirst(f.isDomWidgetElement)) && a.data("widget") == this.widget : !1 }, buildPreview: function (a) { return a || this._.definition.name }, toAllowedContentRules: function (a) {
                        if (!a) return null; a = a.widgets.registered[this.widget]; var b, c = {}; if (!a) return null; if (a.styleableElements) { b = this.getClassesArray(); if (!b) return null; c[a.styleableElements] = { classes: b, propertiesOnly: !0 }; return c } return a.styleToAllowedContentRules ? a.styleToAllowedContentRules(this) :
                            null
                    }, getClassesArray: function () { var a = this._.definition.attributes && this._.definition.attributes["class"]; return a ? CKEDITOR.tools.trim(a).split(/\s+/) : null }, applyToRange: a, removeFromRange: a, applyToObject: a
                })
            } CKEDITOR.plugins.add("widget", {
                requires: "lineutils,clipboard,widgetselection", onLoad: function () {
                    void 0 !== CKEDITOR.document.$.querySelectorAll && (CKEDITOR.addCss('.cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover\x3e.cke_widget_element{outline:2px solid #ffd25c;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid #ffd25c}.cke_widget_wrapper.cke_widget_focused\x3e.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #47a4f5}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:15px;height:0;display:block;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover\x3e.cke_widget_drag_handler_container{height:15px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}.cke_editable[contenteditable\x3d"false"] .cke_widget_drag_handler_container{display:none;}img.cke_widget_drag_handler{cursor:move;width:15px;height:15px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_widget_partial_mask{position:absolute;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}'),
                        aa())
                }, beforeInit: function (a) { void 0 !== CKEDITOR.document.$.querySelectorAll && (a.widgets = new b(a)) }, afterInit: function (a) { if (void 0 !== CKEDITOR.document.$.querySelectorAll) { var b = a.widgets.registered, c, d, e; for (d in b) c = b[d], (e = c.button) && a.ui.addButton && a.ui.addButton(CKEDITOR.tools.capitalize(c.name, !0), { label: e, command: c.name, toolbar: "insert,10" }); x(a); I(a.undoManager) } }
            }); b.prototype = {
                MIN_SELECTION_CHECK_INTERVAL: 500, add: function (b, d) {
                    var e = this.editor; d = CKEDITOR.tools.prototypedCopy(d); d.name = b;
                    d._ = d._ || {}; e.fire("widgetDefinition", d); d.template && (d.template = new CKEDITOR.template(d.template)); a(e, d); c(this, d); this.registered[b] = d; if (d.dialog && e.plugins.dialog) var f = CKEDITOR.on("dialogDefinition", function (a) { a = a.data.definition; var b = a.dialog; a.getMode || b.getName() !== d.dialog || (a.getMode = function () { var a = b.getModel(e); return a && a instanceof CKEDITOR.plugins.widget && a.ready ? CKEDITOR.dialog.EDITING_MODE : CKEDITOR.dialog.CREATION_MODE }); f.removeListener() }); return d
                }, addUpcastCallback: function (a) { this._.upcastCallbacks.push(a) },
                checkSelection: function () { if (this.editor.getSelection()) { var a = this.editor.getSelection(), b = a.getSelectedElement(), c = G(this), d; if (b && (d = this.getByElement(b, !0))) return c.focus(d).select(d).commit(); a = a.getRanges()[0]; if (!a || a.collapsed) return c.commit(); a = new CKEDITOR.dom.walker(a); for (a.evaluator = f.isDomWidgetWrapper; b = a.next();)c.select(this.getByElement(b)); c.commit() } }, checkWidgets: function (a) { this.fire("checkWidgets", CKEDITOR.tools.copy(a || {})) }, del: function (a) {
                    if (this.focused === a) {
                        var b = a.editor,
                        c = b.createRange(), d; (d = c.moveToClosestEditablePosition(a.wrapper, !0)) || (d = c.moveToClosestEditablePosition(a.wrapper, !1)); d && b.getSelection().selectRanges([c])
                    } a.wrapper.remove(); this.destroy(a, !0)
                }, destroy: function (a, b) { this.widgetHoldingFocusedEditable === a && v(this, a, null, b); a.destroy(b); delete this.instances[a.id]; this.fire("instanceDestroyed", a) }, destroyAll: function (a, b) {
                    var c, d, e = this.instances; if (b && !a) {
                        d = b.find(".cke_widget_wrapper"); for (var e = d.count(), f = 0; f < e; ++f)(c = this.getByElement(d.getItem(f),
                            !0)) && this.destroy(c)
                    } else for (d in e) c = e[d], this.destroy(c, a)
                }, finalizeCreation: function (a) { (a = a.getFirst()) && f.isDomWidgetWrapper(a) && (this.editor.insertElement(a), a = this.getByElement(a), a.ready = !0, a.fire("ready"), a.focus()) }, getByElement: function () { function a(c) { return c.is(b) && c.data("cke-widget-id") } var b = { div: 1, span: 1 }; return function (b, c) { if (!b) return null; var d = a(b); if (!c && !d) { var e = this.editor.editable(); do b = b.getParent(); while (b && !b.equals(e) && !(d = a(b))) } return this.instances[d] || null } }(),
                initOn: function (a, b, c) { b ? "string" == typeof b && (b = this.registered[b]) : b = this.registered[a.data("widget")]; if (!b) return null; var d = this.wrapElement(a, b.name); return d ? d.hasClass("cke_widget_new") ? (a = new f(this, this._.nextId++, a, b, c), a.isInited() ? this.instances[a.id] = a : null) : this.getByElement(a) : null }, initOnAll: function (a) { a = (a || this.editor.editable()).find(".cke_widget_new"); for (var b = [], c, d = a.count(); d--;)(c = this.initOn(a.getItem(d).getFirst(f.isDomWidgetElement))) && b.push(c); return b }, onWidget: function (a) {
                    var b =
                        Array.prototype.slice.call(arguments); b.shift(); for (var c in this.instances) { var d = this.instances[c]; d.name == a && d.on.apply(d, b) } this.on("instanceCreated", function (c) { c = c.data; c.name == a && c.on.apply(c, b) })
                }, parseElementClasses: function (a) { if (!a) return null; a = CKEDITOR.tools.trim(a).split(/\s+/); for (var b, c = {}, d = 0; b = a.pop();)-1 == b.indexOf("cke_") && (c[b] = d = 1); return d ? c : null }, wrapElement: function (a, b) {
                    var c = null, d, e; if (a instanceof CKEDITOR.dom.element) {
                        b = b || a.data("widget"); d = this.registered[b]; if (!d) return null;
                        if ((c = a.getParent()) && c.type == CKEDITOR.NODE_ELEMENT && c.data("cke-widget-wrapper")) return c; a.hasAttribute("data-cke-widget-keep-attr") || a.data("cke-widget-keep-attr", a.data("widget") ? 1 : 0); a.data("widget", b); (e = r(d, a.getName())) && l(a); c = new CKEDITOR.dom.element(e ? "span" : "div", a.getDocument()); c.setAttributes(q(e, b)); c.data("cke-display-name", d.pathName ? d.pathName : a.getName()); a.getParent(!0) && c.replace(a); a.appendTo(c)
                    } else if (a instanceof CKEDITOR.htmlParser.element) {
                        b = b || a.attributes["data-widget"];
                        d = this.registered[b]; if (!d) return null; if ((c = a.parent) && c.type == CKEDITOR.NODE_ELEMENT && c.attributes["data-cke-widget-wrapper"]) return c; "data-cke-widget-keep-attr" in a.attributes || (a.attributes["data-cke-widget-keep-attr"] = a.attributes["data-widget"] ? 1 : 0); b && (a.attributes["data-widget"] = b); (e = r(d, a.name)) && l(a); c = new CKEDITOR.htmlParser.element(e ? "span" : "div", q(e, b)); c.attributes["data-cke-display-name"] = d.pathName ? d.pathName : a.name; d = a.parent; var f; d && (f = a.getIndex(), a.remove()); c.add(a); d && u(d,
                            f, c)
                    } return c
                }, _tests_createEditableFilter: g
            }; CKEDITOR.event.implementOn(b.prototype); f.prototype = {
                addClass: function (a) { this.element.addClass(a); this.wrapper.addClass(f.WRAPPER_CLASS_PREFIX + a) }, applyStyle: function (a) { M(this, a, 1) }, checkStyleActive: function (a) { a = J(a); var b; if (!a) return !1; for (; b = a.pop();)if (!this.hasClass(b)) return !1; return !0 }, destroy: function (a) {
                    this.fire("destroy"); if (this.editables) for (var b in this.editables) this.destroyEditable(b, a); a || ("0" == this.element.data("cke-widget-keep-attr") &&
                        this.element.removeAttribute("data-widget"), this.element.removeAttributes(["data-cke-widget-data", "data-cke-widget-keep-attr"]), this.element.removeClass("cke_widget_element"), this.element.replace(this.wrapper)); this.wrapper = null
                }, destroyEditable: function (a, b) {
                    var c = this.editables[a], d = !0; c.removeListener("focus", Q); c.removeListener("blur", L); this.editor.focusManager.remove(c); if (c.filter) {
                        for (var e in this.repository.instances) {
                            var f = this.repository.instances[e]; f.editables && (f = f.editables[a]) && f !==
                                c && c.filter === f.filter && (d = !1)
                        } d && (c.filter.destroy(), (d = this.repository._.filters[this.name]) && delete d[a])
                    } b || (this.repository.destroyAll(!1, c), c.removeClass("cke_widget_editable"), c.removeClass("cke_widget_editable_focused"), c.removeAttributes(["contenteditable", "data-cke-widget-editable", "data-cke-enter-mode"])); delete this.editables[a]
                }, edit: function () {
                    var a = { dialog: this.dialog }, b = this; if (!1 === this.fire("edit", a) || !a.dialog) return !1; this.editor.openDialog(a.dialog, function (a) {
                        var c, d; !1 !== b.fire("dialog",
                            a) && (c = a.on("show", function () { a.setupContent(b) }), d = a.on("ok", function () { var c, d = b.on("data", function (a) { c = 1; a.cancel() }, null, null, 0); b.editor.fire("saveSnapshot"); a.commitContent(b); d.removeListener(); c && (b.fire("data", b.data), b.editor.fire("saveSnapshot")) }), a.once("hide", function () { c.removeListener(); d.removeListener() }))
                    }, b); return !0
                }, getClasses: function () { return this.repository.parseElementClasses(this.element.getAttribute("class")) }, getClipboardHtml: function () {
                    var a = this.editor.createRange();
                    a.setStartBefore(this.wrapper); a.setEndAfter(this.wrapper); return this.editor.editable().getHtmlFromRange(a).getHtml()
                }, hasClass: function (a) { return this.element.hasClass(a) }, initEditable: function (a, b) {
                    var c = this._findOneNotNested(b.selector); return c && c.is(CKEDITOR.dtd.$editable) ? (c = new d(this.editor, c, { filter: g.call(this.repository, this.name, a, b) }), this.editables[a] = c, c.setAttributes({ contenteditable: "true", "data-cke-widget-editable": a, "data-cke-enter-mode": c.enterMode }), c.filter && c.data("cke-filter",
                        c.filter.id), c.addClass("cke_widget_editable"), c.removeClass("cke_widget_editable_focused"), b.pathName && c.data("cke-display-name", b.pathName), this.editor.focusManager.add(c), c.on("focus", Q, this), CKEDITOR.env.ie && c.on("blur", L, this), c._.initialSetData = !0, c.setData(c.getHtml()), !0) : !1
                }, _findOneNotNested: function (a) { a = this.wrapper.find(a); for (var b, c, d = 0; d < a.count(); d++)if (b = a.getItem(d), c = b.getAscendant(f.isDomWidgetWrapper), this.wrapper.equals(c)) return b; return null }, isInited: function () {
                    return !(!this.wrapper ||
                        !this.inited)
                }, isReady: function () { return this.isInited() && this.ready }, focus: function () { var a = this.editor.getSelection(); if (a) { var b = this.editor.checkDirty(); a.fake(this.wrapper); !b && this.editor.resetDirty() } this.editor.focus() }, refreshMask: function () { Z(this) }, refreshParts: function (a) { Y(this, "undefined" !== typeof a ? a : !0) }, removeClass: function (a) { this.element.removeClass(a); this.wrapper.removeClass(f.WRAPPER_CLASS_PREFIX + a) }, removeStyle: function (a) { M(this, a, 0) }, setData: function (a, b) {
                    var c = this.data,
                    d = 0; if ("string" == typeof a) c[a] !== b && (c[a] = b, d = 1); else { var e = a; for (a in e) c[a] !== e[a] && (d = 1, c[a] = e[a]) } d && this.dataReady && (da(this), this.fire("data", c)); return this
                }, setFocused: function (a) { this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_focused"); this.fire(a ? "focus" : "blur"); return this }, setSelected: function (a) { this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_selected"); this.fire(a ? "select" : "deselect"); return this }, updateDragHandlerPosition: function () {
                    var a = this.editor, b = this.element.$, c = this._.dragHandlerOffset,
                    b = { x: b.offsetLeft, y: b.offsetTop - 15 }; c && b.x == c.x && b.y == c.y || (c = a.checkDirty(), a.fire("lockSnapshot"), this.dragHandlerContainer.setStyles({ top: b.y + "px", left: b.x + "px" }), this.dragHandlerContainer.removeStyle("display"), a.fire("unlockSnapshot"), !c && a.resetDirty(), this._.dragHandlerOffset = b)
                }
            }; CKEDITOR.event.implementOn(f.prototype); f.getNestedEditable = function (a, b) { return !b || b.equals(a) ? null : f.isDomNestedEditable(b) ? b : f.getNestedEditable(a, b.getParent()) }; f.isDomDragHandler = function (a) {
                return a.type ==
                    CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-drag-handler")
            }; f.isDomDragHandlerContainer = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_widget_drag_handler_container") }; f.isDomNestedEditable = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-editable") }; f.isDomWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-widget") }; f.isDomWidgetWrapper = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-wrapper") };
            f.isDomWidget = function (a) { return a ? this.isDomWidgetWrapper(a) || this.isDomWidgetElement(a) : !1 }; f.isParserWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-widget"] }; f.isParserWidgetWrapper = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-cke-widget-wrapper"] }; f.WRAPPER_CLASS_PREFIX = "cke_widget_wrapper_"; d.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype), {
                setData: function (a) {
                    this._.initialSetData ||
                    this.editor.widgets.destroyAll(!1, this); this._.initialSetData = !1; a = this.editor.dataProcessor.unprotectSource(a); a = this.editor.dataProcessor.toHtml(a, { context: this.getName(), filter: this.filter, enterMode: this.enterMode }); this.setHtml(a); this.editor.widgets.initOnAll(this)
                }, getData: function () { return this.editor.dataProcessor.toDataFormat(this.getHtml(), { context: this.getName(), filter: this.filter, enterMode: this.enterMode }) }
            }); var S = /^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?<\/span>([\s\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?<\/span>(?:<\/(?:div|span)>)?(?:<\/(?:div|span)>)?$/i,
                T = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1 }; T[CKEDITOR.SHIFT + 121] = 1; var fa = CKEDITOR.tools.createClass({
                    $: function (a, b) { this._.createCopyBin(a, b); this._.createListeners(b) }, _: {
                        createCopyBin: function (a) {
                            var b = a.document, c = CKEDITOR.env.edge && 16 <= CKEDITOR.env.version, d = !a.blockless && !CKEDITOR.env.ie || c ? "div" : "span", c = b.createElement(d), b = b.createElement(d); b.setAttributes({ id: "cke_copybin", "data-cke-temp": "1" }); c.setStyles({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }); c.setStyle("ltr" == a.config.contentsLangDirection ?
                                "left" : "right", "-5000px"); this.editor = a; this.copyBin = c; this.container = b
                        }, createListeners: function (a) { a && (a.beforeDestroy && (this.beforeDestroy = a.beforeDestroy), a.afterDestroy && (this.afterDestroy = a.afterDestroy)) }
                    }, proto: {
                        handle: function (a) {
                            var b = this.copyBin, c = this.editor, d = this.container, e = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, f = c.document.getDocumentElement().$, g = c.createRange(), h = this, k = CKEDITOR.env.mac && CKEDITOR.env.webkit, l = k ? 100 : 0, m = window.requestAnimationFrame && !k ? requestAnimationFrame : setTimeout,
                            n, p, q; b.setHtml('\x3cspan data-cke-copybin-start\x3d"1"\x3e​\x3c/span\x3e' + a + '\x3cspan data-cke-copybin-end\x3d"1"\x3e​\x3c/span\x3e'); c.fire("lockSnapshot"); d.append(b); c.editable().append(d); n = c.on("selectionChange", E, null, null, 0); p = c.widgets.on("checkSelection", E, null, null, 0); e && (q = f.scrollTop); g.selectNodeContents(b); g.select(); e && (f.scrollTop = q); return new CKEDITOR.tools.promise(function (a) {
                                m(function () {
                                    h.beforeDestroy && h.beforeDestroy(); d.remove(); n.removeListener(); p.removeListener(); c.fire("unlockSnapshot");
                                    h.afterDestroy && h.afterDestroy(); a()
                                }, l)
                            })
                        }
                    }, statics: { hasCopyBin: function (a) { return !!fa.getCopyBin(a) }, getCopyBin: function (a) { return a.document.getById("cke_copybin") } }
                }); CKEDITOR.plugins.widget = f; f.repository = b; f.nestedEditable = d
        })(); (function () {
            function b(b, a, c) { this.editor = b; this.notification = null; this._message = new CKEDITOR.template(a); this._singularMessage = c ? new CKEDITOR.template(c) : null; this._tasks = []; this._doneTasks = this._doneWeights = this._totalWeights = 0 } function f(b) {
                this._weight = b || 1; this._doneWeight =
                    0; this._isCanceled = !1
            } CKEDITOR.plugins.add("notificationaggregator", { requires: "notification" }); b.prototype = {
                createTask: function (b) { b = b || {}; var a = !this.notification, c; a && (this.notification = this._createNotification()); c = this._addTask(b); c.on("updated", this._onTaskUpdate, this); c.on("done", this._onTaskDone, this); c.on("canceled", function () { this._removeTask(c) }, this); this.update(); a && this.notification.show(); return c }, update: function () { this._updateNotification(); this.isFinished() && this.fire("finished") },
                getPercentage: function () { return 0 === this.getTaskCount() ? 1 : this._doneWeights / this._totalWeights }, isFinished: function () { return this.getDoneTaskCount() === this.getTaskCount() }, getTaskCount: function () { return this._tasks.length }, getDoneTaskCount: function () { return this._doneTasks }, _updateNotification: function () { this.notification.update({ message: this._getNotificationMessage(), progress: this.getPercentage() }) }, _getNotificationMessage: function () {
                    var b = this.getTaskCount(), a = {
                        current: this.getDoneTaskCount(), max: b,
                        percentage: Math.round(100 * this.getPercentage())
                    }; return (1 == b && this._singularMessage ? this._singularMessage : this._message).output(a)
                }, _createNotification: function () { return new CKEDITOR.plugins.notification(this.editor, { type: "progress" }) }, _addTask: function (b) { b = new f(b.weight); this._tasks.push(b); this._totalWeights += b._weight; return b }, _removeTask: function (b) {
                    var a = CKEDITOR.tools.indexOf(this._tasks, b); -1 !== a && (b._doneWeight && (this._doneWeights -= b._doneWeight), this._totalWeights -= b._weight, this._tasks.splice(a,
                        1), this.update())
                }, _onTaskUpdate: function (b) { this._doneWeights += b.data; this.update() }, _onTaskDone: function () { this._doneTasks += 1; this.update() }
            }; CKEDITOR.event.implementOn(b.prototype); f.prototype = {
                done: function () { this.update(this._weight) }, update: function (b) { if (!this.isDone() && !this.isCanceled()) { b = Math.min(this._weight, b); var a = b - this._doneWeight; this._doneWeight = b; this.fire("updated", a); this.isDone() && this.fire("done") } }, cancel: function () { this.isDone() || this.isCanceled() || (this._isCanceled = !0, this.fire("canceled")) },
                isDone: function () { return this._weight === this._doneWeight }, isCanceled: function () { return this._isCanceled }
            }; CKEDITOR.event.implementOn(f.prototype); CKEDITOR.plugins.notificationAggregator = b; CKEDITOR.plugins.notificationAggregator.task = f
        })(); "use strict"; (function () {
            CKEDITOR.plugins.add("uploadwidget", { requires: "widget,clipboard,filetools,notificationaggregator", init: function (b) { b.filter.allow("*[!data-widget,!data-cke-upload-id]") }, isSupportedEnvironment: function () { return CKEDITOR.plugins.clipboard.isFileApiSupported } });
            CKEDITOR.fileTools || (CKEDITOR.fileTools = {}); CKEDITOR.tools.extend(CKEDITOR.fileTools, {
                addUploadWidget: function (b, f, d) {
                    var a = CKEDITOR.fileTools, c = b.uploadRepository, m = d.supportedTypes ? 10 : 20; if (d.fileToElement) b.on("paste", function (d) {
                        d = d.data; var l = b.widgets.registered[f], e = d.dataTransfer, k = e.getFilesCount(), g = l.loadMethod || "loadAndUpload", m, q; if (!d.dataValue && k) for (q = 0; q < k; q++)if (m = e.getFile(q), !l.supportedTypes || a.isTypeSupported(m, l.supportedTypes)) {
                            var u = l.fileToElement(m); m = c.create(m, void 0,
                                l.loaderType); u && (m[g](l.uploadUrl, l.additionalRequestParameters), CKEDITOR.fileTools.markElement(u, f, m.id), "loadAndUpload" != g && "upload" != g || l.skipNotifications || CKEDITOR.fileTools.bindNotifications(b, m), d.dataValue += u.getOuterHtml())
                        }
                    }, null, null, m); CKEDITOR.tools.extend(d, {
                        downcast: function () { return new CKEDITOR.htmlParser.text("") }, init: function () {
                            var a = this, d = this.wrapper.findOne("[data-cke-upload-id]").data("cke-upload-id"), e = c.loaders[d], f = CKEDITOR.tools.capitalize, g, m; e.on("update", function (c) {
                                if ("abort" ===
                                    e.status && "function" === typeof a.onAbort) a.onAbort(e); if (a.wrapper && a.wrapper.getParent()) { b.fire("lockSnapshot"); c = "on" + f(e.status); if ("abort" === e.status || "function" !== typeof a[c] || !1 !== a[c](e)) m = "cke_upload_" + e.status, a.wrapper && m != g && (g && a.wrapper.removeClass(g), a.wrapper.addClass(m), g = m), "error" != e.status && "abort" != e.status || b.widgets.del(a); b.fire("unlockSnapshot") } else CKEDITOR.instances[b.name] && b.editable().find('[data-cke-upload-id\x3d"' + d + '"]').count() || e.abort(), c.removeListener()
                            }); e.update()
                        },
                        replaceWith: function (a, c) { if ("" === a.trim()) b.widgets.del(this); else { var d = this == b.widgets.focused, f = b.editable(), g = b.createRange(), m, q; d || (q = b.getSelection().createBookmarks()); g.setStartBefore(this.wrapper); g.setEndAfter(this.wrapper); d && (m = g.createBookmark()); f.insertHtmlIntoRange(a, g, c); b.widgets.checkWidgets({ initOnlyNew: !0 }); b.widgets.destroy(this, !0); d ? (g.moveToBookmark(m), g.select()) : b.getSelection().selectBookmarks(q) } }, _getLoader: function () {
                            var a = this.wrapper.findOne("[data-cke-upload-id]");
                            return a ? this.editor.uploadRepository.loaders[a.data("cke-upload-id")] : null
                        }
                    }); b.widgets.add(f, d)
                }, markElement: function (b, f, d) { b.setAttributes({ "data-cke-upload-id": d, "data-widget": f }) }, bindNotifications: function (b, f) {
                    function d() {
                        a = b._.uploadWidgetNotificaionAggregator; if (!a || a.isFinished()) a = b._.uploadWidgetNotificaionAggregator = new CKEDITOR.plugins.notificationAggregator(b, b.lang.uploadwidget.uploadMany, b.lang.uploadwidget.uploadOne), a.once("finished", function () {
                            var c = a.getTaskCount(); 0 === c ? a.notification.hide() :
                                a.notification.update({ message: 1 == c ? b.lang.uploadwidget.doneOne : b.lang.uploadwidget.doneMany.replace("%1", c), type: "success", important: 1 })
                        })
                    } var a, c = null; f.on("update", function () { !c && f.uploadTotal && (d(), c = a.createTask({ weight: f.uploadTotal })); c && "uploading" == f.status && c.update(f.uploaded) }); f.on("uploaded", function () { c && c.done() }); f.on("error", function () { c && c.cancel(); b.showNotification(f.message, "warning") }); f.on("abort", function () {
                        c && c.cancel(); CKEDITOR.instances[b.name] && b.showNotification(b.lang.uploadwidget.abort,
                            "info")
                    })
                }
            })
        })(); "use strict"; (function () {
            function b(a) { 9 >= a && (a = "0" + a); return String(a) } function f(a) { var c = new Date, c = [c.getFullYear(), c.getMonth() + 1, c.getDate(), c.getHours(), c.getMinutes(), c.getSeconds()]; d += 1; return "image-" + CKEDITOR.tools.array.map(c, b).join("") + "-" + d + "." + a } var d = 0; CKEDITOR.plugins.add("uploadimage", {
                requires: "uploadwidget", onLoad: function () { CKEDITOR.addCss(".cke_upload_uploading img{opacity: 0.3}") }, isSupportedEnvironment: function () { return CKEDITOR.plugins.clipboard.isFileApiSupported },
                init: function (a) {
                    if (this.isSupportedEnvironment()) {
                        var b = CKEDITOR.fileTools, d = b.getUploadUrl(a.config, "image"); d && (b.addUploadWidget(a, "uploadimage", {
                            supportedTypes: /image\/(jpeg|png|gif|bmp)/, uploadUrl: d, fileToElement: function () { var a = new CKEDITOR.dom.element("img"); a.setAttribute("src", "data:image/gif;base64,R0lGODlhDgAOAIAAAAAAAP///yH5BAAAAAAALAAAAAAOAA4AAAIMhI+py+0Po5y02qsKADs\x3d"); return a }, parts: { img: "img" }, onUploading: function (a) { this.parts.img.setAttribute("src", a.data) }, onUploaded: function (a) {
                                var b =
                                    this.parts.img.$; this.replaceWith('\x3cimg src\x3d"' + a.url + '" width\x3d"' + (a.responseData.width || b.naturalWidth) + '" height\x3d"' + (a.responseData.height || b.naturalHeight) + '"\x3e')
                            }
                        }), a.on("paste", function (h) {
                            if (h.data.dataValue.match(/<img[\s\S]+data:/i)) {
                                h = h.data; var l = document.implementation.createHTMLDocument(""), l = new CKEDITOR.dom.element(l.body), e, k, g; l.data("cke-editable", 1); l.appendHtml(h.dataValue); e = l.find("img"); for (g = 0; g < e.count(); g++) {
                                    k = e.getItem(g); var n = k.getAttribute("src"), q = n && "data:" ==
                                        n.substring(0, 5), u = null === k.data("cke-realelement"); q && u && !k.data("cke-upload-id") && !k.isReadOnly(1) && (q = (q = n.match(/image\/([a-z]+?);/i)) && q[1] || "jpg", n = a.uploadRepository.create(n, f(q)), n.upload(d), b.markElement(k, "uploadimage", n.id), b.bindNotifications(a, n))
                                } h.dataValue = l.getHtml()
                            }
                        }))
                    }
                }
            })
        })(); (function () {
            function b(a) {
                function b(a) {
                    var c = !1; g.attachListener(g, "keydown", function () {
                        var b = l.getBody().getElementsByTag(a); if (!c) {
                            for (var d = 0; d < b.count(); d++)b.getItem(d).setCustomData("retain", !0); c =
                                !0
                        }
                    }, null, null, 1); g.attachListener(g, "keyup", function () { var b = l.getElementsByTag(a); c && (1 == b.count() && !b.getItem(0).getCustomData("retain") && CKEDITOR.tools.isEmpty(b.getItem(0).getAttributes()) && b.getItem(0).remove(1), c = !1) })
                } var d = this.editor; if (d && !d.isDetached()) {
                    var l = a.document, e = l.body, k = l.getElementById("cke_actscrpt"); k && k.parentNode.removeChild(k); (k = l.getElementById("cke_shimscrpt")) && k.parentNode.removeChild(k); (k = l.getElementById("cke_basetagscrpt")) && k.parentNode.removeChild(k); e.contentEditable =
                        !0; CKEDITOR.env.ie && (e.hideFocus = !0, e.disabled = !0, e.removeAttribute("disabled")); delete this._.isLoadingData; this.$ = e; l = new CKEDITOR.dom.document(l); this.setup(); this.fixInitialSelection(); var g = this; CKEDITOR.env.ie && !CKEDITOR.env.edge && l.getDocumentElement().addClass(l.$.compatMode); CKEDITOR.env.ie && !CKEDITOR.env.edge && d.enterMode != CKEDITOR.ENTER_P ? b("p") : CKEDITOR.env.edge && 15 > CKEDITOR.env.version && d.enterMode != CKEDITOR.ENTER_DIV && b("div"); if (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) l.getDocumentElement().on("mousedown",
                            function (a) { a.data.getTarget().is("html") && setTimeout(function () { d.editable().focus() }) }); f(d); try { d.document.$.execCommand("2D-position", !1, !0) } catch (n) { } (CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == d.document.$.compatMode) && this.attachListener(this, "keydown", function (a) {
                                var b = a.data.getKeystroke(); if (33 == b || 34 == b) if (CKEDITOR.env.ie) setTimeout(function () { d.getSelection().scrollIntoView() }, 0); else if (d.window.$.innerHeight > this.$.offsetHeight) {
                                    var c = d.createRange(); c[33 == b ? "moveToElementEditStart" :
                                        "moveToElementEditEnd"](this); c.select(); a.data.preventDefault()
                                }
                            }); CKEDITOR.env.ie && this.attachListener(l, "blur", function () { try { l.$.selection.empty() } catch (a) { } }); CKEDITOR.env.iOS && this.attachListener(l, "touchend", function () { a.focus() }); e = d.document.getElementsByTag("title").getItem(0); e.data("cke-title", e.getText()); CKEDITOR.env.ie && (d.document.$.title = this._.docTitle); CKEDITOR.tools.setTimeout(function () {
                                "unloaded" == this.status && (this.status = "ready"); d.fire("contentDom"); this._.isPendingFocus &&
                                    (d.focus(), this._.isPendingFocus = !1); setTimeout(function () { d.fire("dataReady") }, 0)
                            }, 0, this)
                }
            } function f(a) {
                function b() { var e; a.editable().attachListener(a, "selectionChange", function () { var b = a.getSelection().getSelectedElement(); b && (e && (e.detachEvent("onresizestart", d), e = null), b.$.attachEvent("onresizestart", d), e = b.$) }) } function d(a) { a.returnValue = !1 } if (CKEDITOR.env.gecko) try {
                    var f = a.document.$; f.execCommand("enableObjectResizing", !1, !a.config.disableObjectResizing); f.execCommand("enableInlineTableEditing",
                        !1, !a.config.disableNativeTableHandles)
                } catch (e) { } else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && a.config.disableObjectResizing && b(a)
            } function d() {
                var a = []; if (8 <= CKEDITOR.document.$.documentMode) { a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}"); var b = [], d; for (d in CKEDITOR.dtd.$removeEmpty) b.push("html.CSS1Compat " + d + "[contenteditable\x3dfalse]"); a.push(b.join(",") + "{display:inline-block}") } else CKEDITOR.env.gecko && (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
                a.push("html{cursor:text;*cursor:auto}"); a.push("img,input,textarea{cursor:default}"); return a.join("\n")
            } var a; CKEDITOR.plugins.add("wysiwygarea", {
                init: function (b) {
                    b.config.fullPage && b.addFeature({ allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]", requiredContent: "body" }); b.addMode("wysiwyg", function (d) {
                        function f(g) { g && g.removeListener(); b.isDestroyed() || b.isDetached() || (b.editable(new a(b, e.$.contentWindow.document.body)), b.setData(b.getData(1), d)) } var l = "document.open();" +
                            (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();", l = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent(l) + "}())" : "", e = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' + l + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e'); e.setStyles({ width: "100%", height: "100%" }); e.addClass("cke_wysiwyg_frame").addClass("cke_reset"); l = b.ui.space("contents"); l.append(e); var k = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko;
                        if (k) e.on("load", f); var g = b.title, n = b.fire("ariaEditorHelpLabel", {}).label; g && (CKEDITOR.env.ie && n && (g += ", " + n), e.setAttribute("title", g)); if (n) { var g = CKEDITOR.tools.getNextId(), q = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + n + "\x3c/span\x3e"); l.append(q, 1); e.setAttribute("aria-describedby", g) } b.on("beforeModeUnload", function (a) { a.removeListener(); q && q.remove() }); e.setAttributes({ tabIndex: b.tabIndex, allowTransparency: "true" }); !k && f(); b.fire("ariaWidget",
                            e)
                    })
                }
            }); CKEDITOR.editor.prototype.addContentsCss = function (a) { var b = this.config, d = b.contentsCss; CKEDITOR.tools.isArray(d) || (b.contentsCss = d ? [d] : []); b.contentsCss.push(a) }; a = CKEDITOR.tools.createClass({
                $: function () { this.base.apply(this, arguments); this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function (a) { CKEDITOR.tools.setTimeout(b, 0, this, a) }, this); this._.docTitle = this.getWindow().getFrame().getAttribute("title") }, base: CKEDITOR.editable, proto: {
                    setData: function (a, b) {
                        var f = this.editor; if (b) this.setHtml(a),
                            this.fixInitialSelection(), f.fire("dataReady"); else {
                                this._.isLoadingData = !0; f._.dataStore = { id: 1 }; var l = f.config, e = l.fullPage, k = l.docType, g = CKEDITOR.tools.buildStyleHtml(d()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e'); e || (g += CKEDITOR.tools.buildStyleHtml(f.config.contentsCss)); var n = l.baseHref ? '\x3cbase href\x3d"' + l.baseHref + '" data-cke-temp\x3d"1" /\x3e' : ""; e && (a = a.replace(/<!DOCTYPE[^>]*>/i, function (a) { f.docType = k = a; return "" }).replace(/<\?xml\s[^\?]*\?>/i, function (a) {
                                    f.xmlDeclaration =
                                    a; return ""
                                })); a = f.dataProcessor.toHtml(a); e ? (/<body[\s|>]/.test(a) || (a = "\x3cbody\x3e" + a), /<html[\s|>]/.test(a) || (a = "\x3chtml\x3e" + a + "\x3c/html\x3e"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$\x26\x3ctitle\x3e\x3c/title\x3e")) : a = a.replace(/<html[^>]*>/, "$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"), n && (a = a.replace(/<head[^>]*?>/, "$\x26" + n)), a = a.replace(/<\/head\s*>/, g + "$\x26"), a = k + a) : a = l.docType + '\x3chtml dir\x3d"' + l.contentsLangDirection + '" lang\x3d"' +
                                    (l.contentsLanguage || f.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' + this._.docTitle + "\x3c/title\x3e" + n + g + "\x3c/head\x3e\x3cbody" + (l.bodyId ? ' id\x3d"' + l.bodyId + '"' : "") + (l.bodyClass ? ' class\x3d"' + l.bodyClass + '"' : "") + "\x3e" + a + "\x3c/body\x3e\x3c/html\x3e"; CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4 > CKEDITOR.env.version && (a = a.replace(/<body[^>]*>/, "$\x26\x3c!-- cke-content-start --\x3e"))); l = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ?
                                        ' defer\x3d"defer" ' : "") + "\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded\x3d1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "\x3c/script\x3e"; CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (l += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e'); n && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (l += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e');
                            a = a.replace(/(?=\s*<\/(:?head)>)/, l); this.clearCustomData(); this.clearListeners(); f.fire("contentDomUnload"); var q = this.getDocument(); try { q.write(a) } catch (u) { setTimeout(function () { q.write(a) }, 0) }
                        }
                    }, getData: function (a) {
                        if (a) return this.getHtml(); a = this.editor; var b = a.config, d = b.fullPage, f = d && a.docType, e = d && a.xmlDeclaration, k = this.getDocument(), d = d ? k.getDocumentElement().getOuterHtml() : k.getBody().getHtml(); CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (d = d.replace(/<br>(?=\s*(:?$|<\/body>))/,
                            "")); d = a.dataProcessor.toDataFormat(d); e && (d = e + "\n" + d); f && (d = f + "\n" + d); return d
                    }, focus: function () { this._.isLoadingData ? this._.isPendingFocus = !0 : a.baseProto.focus.call(this) }, detach: function () {
                        var b = this.editor, d = b.document, b = b.container.findOne("iframe.cke_wysiwyg_frame"); a.baseProto.detach.call(this); this.clearCustomData(this._.expandoNumber); d.getDocumentElement().clearCustomData(); CKEDITOR.tools.removeFunction(this._.frameLoadedHandler); b && (b.clearCustomData(), (d = b.removeCustomData("onResize")) &&
                            d.removeListener(), b.isDetached() || b.remove())
                    }
                }
            })
        })(); CKEDITOR.config.disableObjectResizing = !1; CKEDITOR.config.disableNativeTableHandles = !0; CKEDITOR.config.disableNativeSpellChecker = !0; CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,copyformatting,menu,contextmenu,dialogadvtab,div,editorplaceholder,elementspath,enterkey,entities,exportpdf,popup,filetools,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,format,forms,horizontalrule,htmlwriter,iframe,image,indent,indentblock,indentlist,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,xml,ajax,pastetools,pastefromgdocs,pastefromlibreoffice,pastefromword,pastetext,preview,print,removeformat,resize,save,scayt,selectall,showblocks,showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,tabletools,tableselection,templates,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wysiwygarea";
        CKEDITOR.config.skin = "moono-lisa"; (function () {
            var b = function (b, d) { var a = CKEDITOR.getUrl("plugins/" + d); b = b.split(","); for (var c = 0; c < b.length; c++)CKEDITOR.skin.icons[b[c]] = { path: a, offset: -b[++c], bgsize: b[++c] } }; CKEDITOR.env.hidpi ? b("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,codesnippet,384,,bgcolor,408,,textcolor,432,,copyformatting,456,,creatediv,480,,docprops-rtl,504,,docprops,528,,easyimagealigncenter,552,,easyimagealignleft,576,,easyimagealignright,600,,easyimagealt,624,,easyimagefull,648,,easyimageside,672,,easyimageupload,696,,embed,720,,embedsemantic,744,,emojipanel,768,,exportpdf,792,,find-rtl,816,,find,840,,replace,864,,flash,888,,button,912,,checkbox,936,,form,960,,hiddenfield,984,,imagebutton,1008,,radio,1032,,select-rtl,1056,,select,1080,,textarea-rtl,1104,,textarea,1128,,textfield-rtl,1152,,textfield,1176,,horizontalrule,1200,,iframe,1224,,image,1248,,indent-rtl,1272,,indent,1296,,outdent-rtl,1320,,outdent,1344,,justifyblock,1368,,justifycenter,1392,,justifyleft,1416,,justifyright,1440,,language,1464,,anchor-rtl,1488,,anchor,1512,,link,1536,,unlink,1560,,bulletedlist-rtl,1584,,bulletedlist,1608,,numberedlist-rtl,1632,,numberedlist,1656,,mathjax,1680,,maximize,1704,,newpage-rtl,1728,,newpage,1752,,pagebreak-rtl,1776,,pagebreak,1800,,pastefromword-rtl,1824,,pastefromword,1848,,pastetext-rtl,1872,,pastetext,1896,,placeholder,1920,,preview-rtl,1944,,preview,1968,,print,1992,,removeformat,2016,,save,2040,,scayt,2064,,selectall,2088,,showblocks-rtl,2112,,showblocks,2136,,smiley,2160,,source-rtl,2184,,source,2208,,sourcedialog-rtl,2232,,sourcedialog,2256,,specialchar,2280,,table,2304,,templates-rtl,2328,,templates,2352,,uicolor,2376,,redo-rtl,2400,,redo,2424,,undo-rtl,2448,,undo,2472,,simplebox,4992,auto,spellchecker,2520,",
                "icons_hidpi.png") : b("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,codesnippet,384,auto,bgcolor,408,auto,textcolor,432,auto,copyformatting,456,auto,creatediv,480,auto,docprops-rtl,504,auto,docprops,528,auto,easyimagealigncenter,552,auto,easyimagealignleft,576,auto,easyimagealignright,600,auto,easyimagealt,624,auto,easyimagefull,648,auto,easyimageside,672,auto,easyimageupload,696,auto,embed,720,auto,embedsemantic,744,auto,emojipanel,768,auto,exportpdf,792,auto,find-rtl,816,auto,find,840,auto,replace,864,auto,flash,888,auto,button,912,auto,checkbox,936,auto,form,960,auto,hiddenfield,984,auto,imagebutton,1008,auto,radio,1032,auto,select-rtl,1056,auto,select,1080,auto,textarea-rtl,1104,auto,textarea,1128,auto,textfield-rtl,1152,auto,textfield,1176,auto,horizontalrule,1200,auto,iframe,1224,auto,image,1248,auto,indent-rtl,1272,auto,indent,1296,auto,outdent-rtl,1320,auto,outdent,1344,auto,justifyblock,1368,auto,justifycenter,1392,auto,justifyleft,1416,auto,justifyright,1440,auto,language,1464,auto,anchor-rtl,1488,auto,anchor,1512,auto,link,1536,auto,unlink,1560,auto,bulletedlist-rtl,1584,auto,bulletedlist,1608,auto,numberedlist-rtl,1632,auto,numberedlist,1656,auto,mathjax,1680,auto,maximize,1704,auto,newpage-rtl,1728,auto,newpage,1752,auto,pagebreak-rtl,1776,auto,pagebreak,1800,auto,pastefromword-rtl,1824,auto,pastefromword,1848,auto,pastetext-rtl,1872,auto,pastetext,1896,auto,placeholder,1920,auto,preview-rtl,1944,auto,preview,1968,auto,print,1992,auto,removeformat,2016,auto,save,2040,auto,scayt,2064,auto,selectall,2088,auto,showblocks-rtl,2112,auto,showblocks,2136,auto,smiley,2160,auto,source-rtl,2184,auto,source,2208,auto,sourcedialog-rtl,2232,auto,sourcedialog,2256,auto,specialchar,2280,auto,table,2304,auto,templates-rtl,2328,auto,templates,2352,auto,uicolor,2376,auto,redo-rtl,2400,auto,redo,2424,auto,undo-rtl,2448,auto,undo,2472,auto,simplebox,2496,auto,spellchecker,2520,auto",
                    "icons.png")
        })()
    }
})();