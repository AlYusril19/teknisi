!function(e, t) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        var r = t();
        for (var n in r)
            ("object" == typeof exports ? exports : e)[n] = r[n]
    }
}(self, (function() {
    return function() {
        var e = {
            527: function(e) {
                var t;
                "undefined" != typeof self && self,
                t = function() {
                    return function() {
                        "use strict";
                        var e = {
                            d: function(t, r) {
                                for (var n in r)
                                    e.o(r, n) && !e.o(t, n) && Object.defineProperty(t, n, {
                                        enumerable: !0,
                                        get: r[n]
                                    })
                            },
                            o: function(e, t) {
                                return Object.prototype.hasOwnProperty.call(e, t)
                            }
                        }
                          , t = {};
                        e.d(t, {
                            default: function() {
                                return Dn
                            }
                        });
                        class r {
                            constructor(e, t) {
                                this.name = void 0,
                                this.position = void 0,
                                this.length = void 0,
                                this.rawMessage = void 0;
                                let n, o, s = "KaTeX parse error: " + e;
                                const i = t && t.loc;
                                if (i && i.start <= i.end) {
                                    const e = i.lexer.input;
                                    n = i.start,
                                    o = i.end,
                                    n === e.length ? s += " at end of input: " : s += " at position " + (n + 1) + ": ";
                                    const t = e.slice(n, o).replace(/[^]/g, "$&̲");
                                    let r, a;
                                    r = n > 15 ? "…" + e.slice(n - 15, n) : e.slice(0, n),
                                    a = o + 15 < e.length ? e.slice(o, o + 15) + "…" : e.slice(o),
                                    s += r + t + a
                                }
                                const a = new Error(s);
                                return a.name = "ParseError",
                                a.__proto__ = r.prototype,
                                a.position = n,
                                null != n && null != o && (a.length = o - n),
                                a.rawMessage = e,
                                a
                            }
                        }
                        r.prototype.__proto__ = Error.prototype;
                        var n = r;
                        const o = /([A-Z])/g
                          , s = {
                            "&": "&amp;",
                            ">": "&gt;",
                            "<": "&lt;",
                            '"': "&quot;",
                            "'": "&#x27;"
                        }
                          , i = /[&><"']/g
                          , a = function(e) {
                            return "ordgroup" === e.type || "color" === e.type ? 1 === e.body.length ? a(e.body[0]) : e : "font" === e.type ? a(e.body) : e
                        };
                        var l = {
                            contains: function(e, t) {
                                return -1 !== e.indexOf(t)
                            },
                            deflt: function(e, t) {
                                return void 0 === e ? t : e
                            },
                            escape: function(e) {
                                return String(e).replace(i, (e => s[e]))
                            },
                            hyphenate: function(e) {
                                return e.replace(o, "-$1").toLowerCase()
                            },
                            getBaseElem: a,
                            isCharacterBox: function(e) {
                                const t = a(e);
                                return "mathord" === t.type || "textord" === t.type || "atom" === t.type
                            },
                            protocolFromUrl: function(e) {
                                const t = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(e);
                                return t ? ":" !== t[2] ? null : /^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(t[1]) ? t[1].toLowerCase() : null : "_relative"
                            }
                        };
                        const h = {
                            displayMode: {
                                type: "boolean",
                                description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",
                                cli: "-d, --display-mode"
                            },
                            output: {
                                type: {
                                    enum: ["htmlAndMathml", "html", "mathml"]
                                },
                                description: "Determines the markup language of the output.",
                                cli: "-F, --format <type>"
                            },
                            leqno: {
                                type: "boolean",
                                description: "Render display math in leqno style (left-justified tags)."
                            },
                            fleqn: {
                                type: "boolean",
                                description: "Render display math flush left."
                            },
                            throwOnError: {
                                type: "boolean",
                                default: !0,
                                cli: "-t, --no-throw-on-error",
                                cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error."
                            },
                            errorColor: {
                                type: "string",
                                default: "#cc0000",
                                cli: "-c, --error-color <color>",
                                cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",
                                cliProcessor: e => "#" + e
                            },
                            macros: {
                                type: "object",
                                cli: "-m, --macro <def>",
                                cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",
                                cliDefault: [],
                                cliProcessor: (e, t) => (t.push(e),
                                t)
                            },
                            minRuleThickness: {
                                type: "number",
                                description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",
                                processor: e => Math.max(0, e),
                                cli: "--min-rule-thickness <size>",
                                cliProcessor: parseFloat
                            },
                            colorIsTextColor: {
                                type: "boolean",
                                description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",
                                cli: "-b, --color-is-text-color"
                            },
                            strict: {
                                type: [{
                                    enum: ["warn", "ignore", "error"]
                                }, "boolean", "function"],
                                description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",
                                cli: "-S, --strict",
                                cliDefault: !1
                            },
                            trust: {
                                type: ["boolean", "function"],
                                description: "Trust the input, enabling all HTML features such as \\url.",
                                cli: "-T, --trust"
                            },
                            maxSize: {
                                type: "number",
                                default: 1 / 0,
                                description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",
                                processor: e => Math.max(0, e),
                                cli: "-s, --max-size <n>",
                                cliProcessor: parseInt
                            },
                            maxExpand: {
                                type: "number",
                                default: 1e3,
                                description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",
                                processor: e => Math.max(0, e),
                                cli: "-e, --max-expand <n>",
                                cliProcessor: e => "Infinity" === e ? 1 / 0 : parseInt(e)
                            },
                            globalGroup: {
                                type: "boolean",
                                cli: !1
                            }
                        };
                        function c(e) {
                            if (e.default)
                                return e.default;
                            const t = e.type
                              , r = Array.isArray(t) ? t[0] : t;
                            if ("string" != typeof r)
                                return r.enum[0];
                            switch (r) {
                            case "boolean":
                                return !1;
                            case "string":
                                return "";
                            case "number":
                                return 0;
                            case "object":
                                return {}
                            }
                        }
                        class m {
                            constructor(e) {
                                this.displayMode = void 0,
                                this.output = void 0,
                                this.leqno = void 0,
                                this.fleqn = void 0,
                                this.throwOnError = void 0,
                                this.errorColor = void 0,
                                this.macros = void 0,
                                this.minRuleThickness = void 0,
                                this.colorIsTextColor = void 0,
                                this.strict = void 0,
                                this.trust = void 0,
                                this.maxSize = void 0,
                                this.maxExpand = void 0,
                                this.globalGroup = void 0,
                                e = e || {};
                                for (const t in h)
                                    if (h.hasOwnProperty(t)) {
                                        const r = h[t];
                                        this[t] = void 0 !== e[t] ? r.processor ? r.processor(e[t]) : e[t] : c(r)
                                    }
                            }
                            reportNonstrict(e, t, r) {
                                let o = this.strict;
                                if ("function" == typeof o && (o = o(e, t, r)),
                                o && "ignore" !== o) {
                                    if (!0 === o || "error" === o)
                                        throw new n("LaTeX-incompatible input and strict mode is set to 'error': " + t + " [" + e + "]",r);
                                    "warn" === o ? "undefined" != typeof console && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + t + " [" + e + "]") : "undefined" != typeof console && console.warn("LaTeX-incompatible input and strict mode is set to unrecognized '" + o + "': " + t + " [" + e + "]")
                                }
                            }
                            useStrictBehavior(e, t, r) {
                                let n = this.strict;
                                if ("function" == typeof n)
                                    try {
                                        n = n(e, t, r)
                                    } catch (e) {
                                        n = "error"
                                    }
                                return !(!n || "ignore" === n || !0 !== n && "error" !== n && ("warn" === n ? ("undefined" != typeof console && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + t + " [" + e + "]"),
                                1) : ("undefined" != typeof console && console.warn("LaTeX-incompatible input and strict mode is set to unrecognized '" + n + "': " + t + " [" + e + "]"),
                                1)))
                            }
                            isTrusted(e) {
                                if (e.url && !e.protocol) {
                                    const t = l.protocolFromUrl(e.url);
                                    if (null == t)
                                        return !1;
                                    e.protocol = t
                                }
                                const t = "function" == typeof this.trust ? this.trust(e) : this.trust;
                                return Boolean(t)
                            }
                        }
                        class p {
                            constructor(e, t, r) {
                                this.id = void 0,
                                this.size = void 0,
                                this.cramped = void 0,
                                this.id = e,
                                this.size = t,
                                this.cramped = r
                            }
                            sup() {
                                return u[d[this.id]]
                            }
                            sub() {
                                return u[g[this.id]]
                            }
                            fracNum() {
                                return u[f[this.id]]
                            }
                            fracDen() {
                                return u[b[this.id]]
                            }
                            cramp() {
                                return u[y[this.id]]
                            }
                            text() {
                                return u[x[this.id]]
                            }
                            isTight() {
                                return this.size >= 2
                            }
                        }
                        const u = [new p(0,0,!1), new p(1,0,!0), new p(2,1,!1), new p(3,1,!0), new p(4,2,!1), new p(5,2,!0), new p(6,3,!1), new p(7,3,!0)]
                          , d = [4, 5, 4, 5, 6, 7, 6, 7]
                          , g = [5, 5, 5, 5, 7, 7, 7, 7]
                          , f = [2, 3, 4, 5, 6, 7, 6, 7]
                          , b = [3, 3, 5, 5, 7, 7, 7, 7]
                          , y = [1, 1, 3, 3, 5, 5, 7, 7]
                          , x = [0, 1, 2, 3, 2, 3, 2, 3];
                        var w = {
                            DISPLAY: u[0],
                            TEXT: u[2],
                            SCRIPT: u[4],
                            SCRIPTSCRIPT: u[6]
                        };
                        const v = [{
                            name: "latin",
                            blocks: [[256, 591], [768, 879]]
                        }, {
                            name: "cyrillic",
                            blocks: [[1024, 1279]]
                        }, {
                            name: "armenian",
                            blocks: [[1328, 1423]]
                        }, {
                            name: "brahmic",
                            blocks: [[2304, 4255]]
                        }, {
                            name: "georgian",
                            blocks: [[4256, 4351]]
                        }, {
                            name: "cjk",
                            blocks: [[12288, 12543], [19968, 40879], [65280, 65376]]
                        }, {
                            name: "hangul",
                            blocks: [[44032, 55215]]
                        }]
                          , k = [];
                        function S(e) {
                            for (let t = 0; t < k.length; t += 2)
                                if (e >= k[t] && e <= k[t + 1])
                                    return !0;
                            return !1
                        }
                        v.forEach((e => e.blocks.forEach((e => k.push(...e)))));
                        const M = {
                            doubleleftarrow: "M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",
                            doublerightarrow: "M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",
                            leftarrow: "M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",
                            leftbrace: "M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",
                            leftbraceunder: "M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",
                            leftgroup: "M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",
                            leftgroupunder: "M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",
                            leftharpoon: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",
                            leftharpoonplus: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",
                            leftharpoondown: "M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",
                            leftharpoondownplus: "M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",
                            lefthook: "M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",
                            leftlinesegment: "M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",
                            leftmapsto: "M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",
                            leftToFrom: "M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",
                            longequal: "M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",
                            midbrace: "M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",
                            midbraceunder: "M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",
                            oiintSize1: "M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z",
                            oiintSize2: "M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z",
                            oiiintSize1: "M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z",
                            oiiintSize2: "M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z",
                            rightarrow: "M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",
                            rightbrace: "M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",
                            rightbraceunder: "M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",
                            rightgroup: "M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",
                            rightgroupunder: "M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",
                            rightharpoon: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",
                            rightharpoonplus: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",
                            rightharpoondown: "M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",
                            rightharpoondownplus: "M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",
                            righthook: "M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",
                            rightlinesegment: "M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",
                            rightToFrom: "M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",
                            twoheadleftarrow: "M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",
                            twoheadrightarrow: "M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",
                            tilde1: "M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",
                            tilde2: "M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",
                            tilde3: "M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",
                            tilde4: "M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",
                            vec: "M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",
                            widehat1: "M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",
                            widehat2: "M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
                            widehat3: "M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
                            widehat4: "M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
                            widecheck1: "M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z",
                            widecheck2: "M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
                            widecheck3: "M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
                            widecheck4: "M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
                            baraboveleftarrow: "M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z",
                            rightarrowabovebar: "M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z",
                            baraboveshortleftharpoon: "M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z",
                            rightharpoonaboveshortbar: "M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z",
                            shortbaraboveleftharpoon: "M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z",
                            shortrightharpoonabovebar: "M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z"
                        };
                        class z {
                            constructor(e) {
                                this.children = void 0,
                                this.classes = void 0,
                                this.height = void 0,
                                this.depth = void 0,
                                this.maxFontSize = void 0,
                                this.style = void 0,
                                this.children = e,
                                this.classes = [],
                                this.height = 0,
                                this.depth = 0,
                                this.maxFontSize = 0,
                                this.style = {}
                            }
                            hasClass(e) {
                                return l.contains(this.classes, e)
                            }
                            toNode() {
                                const e = document.createDocumentFragment();
                                for (let t = 0; t < this.children.length; t++)
                                    e.appendChild(this.children[t].toNode());
                                return e
                            }
                            toMarkup() {
                                let e = "";
                                for (let t = 0; t < this.children.length; t++)
                                    e += this.children[t].toMarkup();
                                return e
                            }
                            toText() {
                                return this.children.map((e => e.toText())).join("")
                            }
                        }
                        var A = {
                            "AMS-Regular": {
                                32: [0, 0, 0, 0, .25],
                                65: [0, .68889, 0, 0, .72222],
                                66: [0, .68889, 0, 0, .66667],
                                67: [0, .68889, 0, 0, .72222],
                                68: [0, .68889, 0, 0, .72222],
                                69: [0, .68889, 0, 0, .66667],
                                70: [0, .68889, 0, 0, .61111],
                                71: [0, .68889, 0, 0, .77778],
                                72: [0, .68889, 0, 0, .77778],
                                73: [0, .68889, 0, 0, .38889],
                                74: [.16667, .68889, 0, 0, .5],
                                75: [0, .68889, 0, 0, .77778],
                                76: [0, .68889, 0, 0, .66667],
                                77: [0, .68889, 0, 0, .94445],
                                78: [0, .68889, 0, 0, .72222],
                                79: [.16667, .68889, 0, 0, .77778],
                                80: [0, .68889, 0, 0, .61111],
                                81: [.16667, .68889, 0, 0, .77778],
                                82: [0, .68889, 0, 0, .72222],
                                83: [0, .68889, 0, 0, .55556],
                                84: [0, .68889, 0, 0, .66667],
                                85: [0, .68889, 0, 0, .72222],
                                86: [0, .68889, 0, 0, .72222],
                                87: [0, .68889, 0, 0, 1],
                                88: [0, .68889, 0, 0, .72222],
                                89: [0, .68889, 0, 0, .72222],
                                90: [0, .68889, 0, 0, .66667],
                                107: [0, .68889, 0, 0, .55556],
                                160: [0, 0, 0, 0, .25],
                                165: [0, .675, .025, 0, .75],
                                174: [.15559, .69224, 0, 0, .94666],
                                240: [0, .68889, 0, 0, .55556],
                                295: [0, .68889, 0, 0, .54028],
                                710: [0, .825, 0, 0, 2.33334],
                                732: [0, .9, 0, 0, 2.33334],
                                770: [0, .825, 0, 0, 2.33334],
                                771: [0, .9, 0, 0, 2.33334],
                                989: [.08167, .58167, 0, 0, .77778],
                                1008: [0, .43056, .04028, 0, .66667],
                                8245: [0, .54986, 0, 0, .275],
                                8463: [0, .68889, 0, 0, .54028],
                                8487: [0, .68889, 0, 0, .72222],
                                8498: [0, .68889, 0, 0, .55556],
                                8502: [0, .68889, 0, 0, .66667],
                                8503: [0, .68889, 0, 0, .44445],
                                8504: [0, .68889, 0, 0, .66667],
                                8513: [0, .68889, 0, 0, .63889],
                                8592: [-.03598, .46402, 0, 0, .5],
                                8594: [-.03598, .46402, 0, 0, .5],
                                8602: [-.13313, .36687, 0, 0, 1],
                                8603: [-.13313, .36687, 0, 0, 1],
                                8606: [.01354, .52239, 0, 0, 1],
                                8608: [.01354, .52239, 0, 0, 1],
                                8610: [.01354, .52239, 0, 0, 1.11111],
                                8611: [.01354, .52239, 0, 0, 1.11111],
                                8619: [0, .54986, 0, 0, 1],
                                8620: [0, .54986, 0, 0, 1],
                                8621: [-.13313, .37788, 0, 0, 1.38889],
                                8622: [-.13313, .36687, 0, 0, 1],
                                8624: [0, .69224, 0, 0, .5],
                                8625: [0, .69224, 0, 0, .5],
                                8630: [0, .43056, 0, 0, 1],
                                8631: [0, .43056, 0, 0, 1],
                                8634: [.08198, .58198, 0, 0, .77778],
                                8635: [.08198, .58198, 0, 0, .77778],
                                8638: [.19444, .69224, 0, 0, .41667],
                                8639: [.19444, .69224, 0, 0, .41667],
                                8642: [.19444, .69224, 0, 0, .41667],
                                8643: [.19444, .69224, 0, 0, .41667],
                                8644: [.1808, .675, 0, 0, 1],
                                8646: [.1808, .675, 0, 0, 1],
                                8647: [.1808, .675, 0, 0, 1],
                                8648: [.19444, .69224, 0, 0, .83334],
                                8649: [.1808, .675, 0, 0, 1],
                                8650: [.19444, .69224, 0, 0, .83334],
                                8651: [.01354, .52239, 0, 0, 1],
                                8652: [.01354, .52239, 0, 0, 1],
                                8653: [-.13313, .36687, 0, 0, 1],
                                8654: [-.13313, .36687, 0, 0, 1],
                                8655: [-.13313, .36687, 0, 0, 1],
                                8666: [.13667, .63667, 0, 0, 1],
                                8667: [.13667, .63667, 0, 0, 1],
                                8669: [-.13313, .37788, 0, 0, 1],
                                8672: [-.064, .437, 0, 0, 1.334],
                                8674: [-.064, .437, 0, 0, 1.334],
                                8705: [0, .825, 0, 0, .5],
                                8708: [0, .68889, 0, 0, .55556],
                                8709: [.08167, .58167, 0, 0, .77778],
                                8717: [0, .43056, 0, 0, .42917],
                                8722: [-.03598, .46402, 0, 0, .5],
                                8724: [.08198, .69224, 0, 0, .77778],
                                8726: [.08167, .58167, 0, 0, .77778],
                                8733: [0, .69224, 0, 0, .77778],
                                8736: [0, .69224, 0, 0, .72222],
                                8737: [0, .69224, 0, 0, .72222],
                                8738: [.03517, .52239, 0, 0, .72222],
                                8739: [.08167, .58167, 0, 0, .22222],
                                8740: [.25142, .74111, 0, 0, .27778],
                                8741: [.08167, .58167, 0, 0, .38889],
                                8742: [.25142, .74111, 0, 0, .5],
                                8756: [0, .69224, 0, 0, .66667],
                                8757: [0, .69224, 0, 0, .66667],
                                8764: [-.13313, .36687, 0, 0, .77778],
                                8765: [-.13313, .37788, 0, 0, .77778],
                                8769: [-.13313, .36687, 0, 0, .77778],
                                8770: [-.03625, .46375, 0, 0, .77778],
                                8774: [.30274, .79383, 0, 0, .77778],
                                8776: [-.01688, .48312, 0, 0, .77778],
                                8778: [.08167, .58167, 0, 0, .77778],
                                8782: [.06062, .54986, 0, 0, .77778],
                                8783: [.06062, .54986, 0, 0, .77778],
                                8785: [.08198, .58198, 0, 0, .77778],
                                8786: [.08198, .58198, 0, 0, .77778],
                                8787: [.08198, .58198, 0, 0, .77778],
                                8790: [0, .69224, 0, 0, .77778],
                                8791: [.22958, .72958, 0, 0, .77778],
                                8796: [.08198, .91667, 0, 0, .77778],
                                8806: [.25583, .75583, 0, 0, .77778],
                                8807: [.25583, .75583, 0, 0, .77778],
                                8808: [.25142, .75726, 0, 0, .77778],
                                8809: [.25142, .75726, 0, 0, .77778],
                                8812: [.25583, .75583, 0, 0, .5],
                                8814: [.20576, .70576, 0, 0, .77778],
                                8815: [.20576, .70576, 0, 0, .77778],
                                8816: [.30274, .79383, 0, 0, .77778],
                                8817: [.30274, .79383, 0, 0, .77778],
                                8818: [.22958, .72958, 0, 0, .77778],
                                8819: [.22958, .72958, 0, 0, .77778],
                                8822: [.1808, .675, 0, 0, .77778],
                                8823: [.1808, .675, 0, 0, .77778],
                                8828: [.13667, .63667, 0, 0, .77778],
                                8829: [.13667, .63667, 0, 0, .77778],
                                8830: [.22958, .72958, 0, 0, .77778],
                                8831: [.22958, .72958, 0, 0, .77778],
                                8832: [.20576, .70576, 0, 0, .77778],
                                8833: [.20576, .70576, 0, 0, .77778],
                                8840: [.30274, .79383, 0, 0, .77778],
                                8841: [.30274, .79383, 0, 0, .77778],
                                8842: [.13597, .63597, 0, 0, .77778],
                                8843: [.13597, .63597, 0, 0, .77778],
                                8847: [.03517, .54986, 0, 0, .77778],
                                8848: [.03517, .54986, 0, 0, .77778],
                                8858: [.08198, .58198, 0, 0, .77778],
                                8859: [.08198, .58198, 0, 0, .77778],
                                8861: [.08198, .58198, 0, 0, .77778],
                                8862: [0, .675, 0, 0, .77778],
                                8863: [0, .675, 0, 0, .77778],
                                8864: [0, .675, 0, 0, .77778],
                                8865: [0, .675, 0, 0, .77778],
                                8872: [0, .69224, 0, 0, .61111],
                                8873: [0, .69224, 0, 0, .72222],
                                8874: [0, .69224, 0, 0, .88889],
                                8876: [0, .68889, 0, 0, .61111],
                                8877: [0, .68889, 0, 0, .61111],
                                8878: [0, .68889, 0, 0, .72222],
                                8879: [0, .68889, 0, 0, .72222],
                                8882: [.03517, .54986, 0, 0, .77778],
                                8883: [.03517, .54986, 0, 0, .77778],
                                8884: [.13667, .63667, 0, 0, .77778],
                                8885: [.13667, .63667, 0, 0, .77778],
                                8888: [0, .54986, 0, 0, 1.11111],
                                8890: [.19444, .43056, 0, 0, .55556],
                                8891: [.19444, .69224, 0, 0, .61111],
                                8892: [.19444, .69224, 0, 0, .61111],
                                8901: [0, .54986, 0, 0, .27778],
                                8903: [.08167, .58167, 0, 0, .77778],
                                8905: [.08167, .58167, 0, 0, .77778],
                                8906: [.08167, .58167, 0, 0, .77778],
                                8907: [0, .69224, 0, 0, .77778],
                                8908: [0, .69224, 0, 0, .77778],
                                8909: [-.03598, .46402, 0, 0, .77778],
                                8910: [0, .54986, 0, 0, .76042],
                                8911: [0, .54986, 0, 0, .76042],
                                8912: [.03517, .54986, 0, 0, .77778],
                                8913: [.03517, .54986, 0, 0, .77778],
                                8914: [0, .54986, 0, 0, .66667],
                                8915: [0, .54986, 0, 0, .66667],
                                8916: [0, .69224, 0, 0, .66667],
                                8918: [.0391, .5391, 0, 0, .77778],
                                8919: [.0391, .5391, 0, 0, .77778],
                                8920: [.03517, .54986, 0, 0, 1.33334],
                                8921: [.03517, .54986, 0, 0, 1.33334],
                                8922: [.38569, .88569, 0, 0, .77778],
                                8923: [.38569, .88569, 0, 0, .77778],
                                8926: [.13667, .63667, 0, 0, .77778],
                                8927: [.13667, .63667, 0, 0, .77778],
                                8928: [.30274, .79383, 0, 0, .77778],
                                8929: [.30274, .79383, 0, 0, .77778],
                                8934: [.23222, .74111, 0, 0, .77778],
                                8935: [.23222, .74111, 0, 0, .77778],
                                8936: [.23222, .74111, 0, 0, .77778],
                                8937: [.23222, .74111, 0, 0, .77778],
                                8938: [.20576, .70576, 0, 0, .77778],
                                8939: [.20576, .70576, 0, 0, .77778],
                                8940: [.30274, .79383, 0, 0, .77778],
                                8941: [.30274, .79383, 0, 0, .77778],
                                8994: [.19444, .69224, 0, 0, .77778],
                                8995: [.19444, .69224, 0, 0, .77778],
                                9416: [.15559, .69224, 0, 0, .90222],
                                9484: [0, .69224, 0, 0, .5],
                                9488: [0, .69224, 0, 0, .5],
                                9492: [0, .37788, 0, 0, .5],
                                9496: [0, .37788, 0, 0, .5],
                                9585: [.19444, .68889, 0, 0, .88889],
                                9586: [.19444, .74111, 0, 0, .88889],
                                9632: [0, .675, 0, 0, .77778],
                                9633: [0, .675, 0, 0, .77778],
                                9650: [0, .54986, 0, 0, .72222],
                                9651: [0, .54986, 0, 0, .72222],
                                9654: [.03517, .54986, 0, 0, .77778],
                                9660: [0, .54986, 0, 0, .72222],
                                9661: [0, .54986, 0, 0, .72222],
                                9664: [.03517, .54986, 0, 0, .77778],
                                9674: [.11111, .69224, 0, 0, .66667],
                                9733: [.19444, .69224, 0, 0, .94445],
                                10003: [0, .69224, 0, 0, .83334],
                                10016: [0, .69224, 0, 0, .83334],
                                10731: [.11111, .69224, 0, 0, .66667],
                                10846: [.19444, .75583, 0, 0, .61111],
                                10877: [.13667, .63667, 0, 0, .77778],
                                10878: [.13667, .63667, 0, 0, .77778],
                                10885: [.25583, .75583, 0, 0, .77778],
                                10886: [.25583, .75583, 0, 0, .77778],
                                10887: [.13597, .63597, 0, 0, .77778],
                                10888: [.13597, .63597, 0, 0, .77778],
                                10889: [.26167, .75726, 0, 0, .77778],
                                10890: [.26167, .75726, 0, 0, .77778],
                                10891: [.48256, .98256, 0, 0, .77778],
                                10892: [.48256, .98256, 0, 0, .77778],
                                10901: [.13667, .63667, 0, 0, .77778],
                                10902: [.13667, .63667, 0, 0, .77778],
                                10933: [.25142, .75726, 0, 0, .77778],
                                10934: [.25142, .75726, 0, 0, .77778],
                                10935: [.26167, .75726, 0, 0, .77778],
                                10936: [.26167, .75726, 0, 0, .77778],
                                10937: [.26167, .75726, 0, 0, .77778],
                                10938: [.26167, .75726, 0, 0, .77778],
                                10949: [.25583, .75583, 0, 0, .77778],
                                10950: [.25583, .75583, 0, 0, .77778],
                                10955: [.28481, .79383, 0, 0, .77778],
                                10956: [.28481, .79383, 0, 0, .77778],
                                57350: [.08167, .58167, 0, 0, .22222],
                                57351: [.08167, .58167, 0, 0, .38889],
                                57352: [.08167, .58167, 0, 0, .77778],
                                57353: [0, .43056, .04028, 0, .66667],
                                57356: [.25142, .75726, 0, 0, .77778],
                                57357: [.25142, .75726, 0, 0, .77778],
                                57358: [.41951, .91951, 0, 0, .77778],
                                57359: [.30274, .79383, 0, 0, .77778],
                                57360: [.30274, .79383, 0, 0, .77778],
                                57361: [.41951, .91951, 0, 0, .77778],
                                57366: [.25142, .75726, 0, 0, .77778],
                                57367: [.25142, .75726, 0, 0, .77778],
                                57368: [.25142, .75726, 0, 0, .77778],
                                57369: [.25142, .75726, 0, 0, .77778],
                                57370: [.13597, .63597, 0, 0, .77778],
                                57371: [.13597, .63597, 0, 0, .77778]
                            },
                            "Caligraphic-Regular": {
                                32: [0, 0, 0, 0, .25],
                                65: [0, .68333, 0, .19445, .79847],
                                66: [0, .68333, .03041, .13889, .65681],
                                67: [0, .68333, .05834, .13889, .52653],
                                68: [0, .68333, .02778, .08334, .77139],
                                69: [0, .68333, .08944, .11111, .52778],
                                70: [0, .68333, .09931, .11111, .71875],
                                71: [.09722, .68333, .0593, .11111, .59487],
                                72: [0, .68333, .00965, .11111, .84452],
                                73: [0, .68333, .07382, 0, .54452],
                                74: [.09722, .68333, .18472, .16667, .67778],
                                75: [0, .68333, .01445, .05556, .76195],
                                76: [0, .68333, 0, .13889, .68972],
                                77: [0, .68333, 0, .13889, 1.2009],
                                78: [0, .68333, .14736, .08334, .82049],
                                79: [0, .68333, .02778, .11111, .79611],
                                80: [0, .68333, .08222, .08334, .69556],
                                81: [.09722, .68333, 0, .11111, .81667],
                                82: [0, .68333, 0, .08334, .8475],
                                83: [0, .68333, .075, .13889, .60556],
                                84: [0, .68333, .25417, 0, .54464],
                                85: [0, .68333, .09931, .08334, .62583],
                                86: [0, .68333, .08222, 0, .61278],
                                87: [0, .68333, .08222, .08334, .98778],
                                88: [0, .68333, .14643, .13889, .7133],
                                89: [.09722, .68333, .08222, .08334, .66834],
                                90: [0, .68333, .07944, .13889, .72473],
                                160: [0, 0, 0, 0, .25]
                            },
                            "Fraktur-Regular": {
                                32: [0, 0, 0, 0, .25],
                                33: [0, .69141, 0, 0, .29574],
                                34: [0, .69141, 0, 0, .21471],
                                38: [0, .69141, 0, 0, .73786],
                                39: [0, .69141, 0, 0, .21201],
                                40: [.24982, .74947, 0, 0, .38865],
                                41: [.24982, .74947, 0, 0, .38865],
                                42: [0, .62119, 0, 0, .27764],
                                43: [.08319, .58283, 0, 0, .75623],
                                44: [0, .10803, 0, 0, .27764],
                                45: [.08319, .58283, 0, 0, .75623],
                                46: [0, .10803, 0, 0, .27764],
                                47: [.24982, .74947, 0, 0, .50181],
                                48: [0, .47534, 0, 0, .50181],
                                49: [0, .47534, 0, 0, .50181],
                                50: [0, .47534, 0, 0, .50181],
                                51: [.18906, .47534, 0, 0, .50181],
                                52: [.18906, .47534, 0, 0, .50181],
                                53: [.18906, .47534, 0, 0, .50181],
                                54: [0, .69141, 0, 0, .50181],
                                55: [.18906, .47534, 0, 0, .50181],
                                56: [0, .69141, 0, 0, .50181],
                                57: [.18906, .47534, 0, 0, .50181],
                                58: [0, .47534, 0, 0, .21606],
                                59: [.12604, .47534, 0, 0, .21606],
                                61: [-.13099, .36866, 0, 0, .75623],
                                63: [0, .69141, 0, 0, .36245],
                                65: [0, .69141, 0, 0, .7176],
                                66: [0, .69141, 0, 0, .88397],
                                67: [0, .69141, 0, 0, .61254],
                                68: [0, .69141, 0, 0, .83158],
                                69: [0, .69141, 0, 0, .66278],
                                70: [.12604, .69141, 0, 0, .61119],
                                71: [0, .69141, 0, 0, .78539],
                                72: [.06302, .69141, 0, 0, .7203],
                                73: [0, .69141, 0, 0, .55448],
                                74: [.12604, .69141, 0, 0, .55231],
                                75: [0, .69141, 0, 0, .66845],
                                76: [0, .69141, 0, 0, .66602],
                                77: [0, .69141, 0, 0, 1.04953],
                                78: [0, .69141, 0, 0, .83212],
                                79: [0, .69141, 0, 0, .82699],
                                80: [.18906, .69141, 0, 0, .82753],
                                81: [.03781, .69141, 0, 0, .82699],
                                82: [0, .69141, 0, 0, .82807],
                                83: [0, .69141, 0, 0, .82861],
                                84: [0, .69141, 0, 0, .66899],
                                85: [0, .69141, 0, 0, .64576],
                                86: [0, .69141, 0, 0, .83131],
                                87: [0, .69141, 0, 0, 1.04602],
                                88: [0, .69141, 0, 0, .71922],
                                89: [.18906, .69141, 0, 0, .83293],
                                90: [.12604, .69141, 0, 0, .60201],
                                91: [.24982, .74947, 0, 0, .27764],
                                93: [.24982, .74947, 0, 0, .27764],
                                94: [0, .69141, 0, 0, .49965],
                                97: [0, .47534, 0, 0, .50046],
                                98: [0, .69141, 0, 0, .51315],
                                99: [0, .47534, 0, 0, .38946],
                                100: [0, .62119, 0, 0, .49857],
                                101: [0, .47534, 0, 0, .40053],
                                102: [.18906, .69141, 0, 0, .32626],
                                103: [.18906, .47534, 0, 0, .5037],
                                104: [.18906, .69141, 0, 0, .52126],
                                105: [0, .69141, 0, 0, .27899],
                                106: [0, .69141, 0, 0, .28088],
                                107: [0, .69141, 0, 0, .38946],
                                108: [0, .69141, 0, 0, .27953],
                                109: [0, .47534, 0, 0, .76676],
                                110: [0, .47534, 0, 0, .52666],
                                111: [0, .47534, 0, 0, .48885],
                                112: [.18906, .52396, 0, 0, .50046],
                                113: [.18906, .47534, 0, 0, .48912],
                                114: [0, .47534, 0, 0, .38919],
                                115: [0, .47534, 0, 0, .44266],
                                116: [0, .62119, 0, 0, .33301],
                                117: [0, .47534, 0, 0, .5172],
                                118: [0, .52396, 0, 0, .5118],
                                119: [0, .52396, 0, 0, .77351],
                                120: [.18906, .47534, 0, 0, .38865],
                                121: [.18906, .47534, 0, 0, .49884],
                                122: [.18906, .47534, 0, 0, .39054],
                                160: [0, 0, 0, 0, .25],
                                8216: [0, .69141, 0, 0, .21471],
                                8217: [0, .69141, 0, 0, .21471],
                                58112: [0, .62119, 0, 0, .49749],
                                58113: [0, .62119, 0, 0, .4983],
                                58114: [.18906, .69141, 0, 0, .33328],
                                58115: [.18906, .69141, 0, 0, .32923],
                                58116: [.18906, .47534, 0, 0, .50343],
                                58117: [0, .69141, 0, 0, .33301],
                                58118: [0, .62119, 0, 0, .33409],
                                58119: [0, .47534, 0, 0, .50073]
                            },
                            "Main-Bold": {
                                32: [0, 0, 0, 0, .25],
                                33: [0, .69444, 0, 0, .35],
                                34: [0, .69444, 0, 0, .60278],
                                35: [.19444, .69444, 0, 0, .95833],
                                36: [.05556, .75, 0, 0, .575],
                                37: [.05556, .75, 0, 0, .95833],
                                38: [0, .69444, 0, 0, .89444],
                                39: [0, .69444, 0, 0, .31944],
                                40: [.25, .75, 0, 0, .44722],
                                41: [.25, .75, 0, 0, .44722],
                                42: [0, .75, 0, 0, .575],
                                43: [.13333, .63333, 0, 0, .89444],
                                44: [.19444, .15556, 0, 0, .31944],
                                45: [0, .44444, 0, 0, .38333],
                                46: [0, .15556, 0, 0, .31944],
                                47: [.25, .75, 0, 0, .575],
                                48: [0, .64444, 0, 0, .575],
                                49: [0, .64444, 0, 0, .575],
                                50: [0, .64444, 0, 0, .575],
                                51: [0, .64444, 0, 0, .575],
                                52: [0, .64444, 0, 0, .575],
                                53: [0, .64444, 0, 0, .575],
                                54: [0, .64444, 0, 0, .575],
                                55: [0, .64444, 0, 0, .575],
                                56: [0, .64444, 0, 0, .575],
                                57: [0, .64444, 0, 0, .575],
                                58: [0, .44444, 0, 0, .31944],
                                59: [.19444, .44444, 0, 0, .31944],
                                60: [.08556, .58556, 0, 0, .89444],
                                61: [-.10889, .39111, 0, 0, .89444],
                                62: [.08556, .58556, 0, 0, .89444],
                                63: [0, .69444, 0, 0, .54305],
                                64: [0, .69444, 0, 0, .89444],
                                65: [0, .68611, 0, 0, .86944],
                                66: [0, .68611, 0, 0, .81805],
                                67: [0, .68611, 0, 0, .83055],
                                68: [0, .68611, 0, 0, .88194],
                                69: [0, .68611, 0, 0, .75555],
                                70: [0, .68611, 0, 0, .72361],
                                71: [0, .68611, 0, 0, .90416],
                                72: [0, .68611, 0, 0, .9],
                                73: [0, .68611, 0, 0, .43611],
                                74: [0, .68611, 0, 0, .59444],
                                75: [0, .68611, 0, 0, .90138],
                                76: [0, .68611, 0, 0, .69166],
                                77: [0, .68611, 0, 0, 1.09166],
                                78: [0, .68611, 0, 0, .9],
                                79: [0, .68611, 0, 0, .86388],
                                80: [0, .68611, 0, 0, .78611],
                                81: [.19444, .68611, 0, 0, .86388],
                                82: [0, .68611, 0, 0, .8625],
                                83: [0, .68611, 0, 0, .63889],
                                84: [0, .68611, 0, 0, .8],
                                85: [0, .68611, 0, 0, .88472],
                                86: [0, .68611, .01597, 0, .86944],
                                87: [0, .68611, .01597, 0, 1.18888],
                                88: [0, .68611, 0, 0, .86944],
                                89: [0, .68611, .02875, 0, .86944],
                                90: [0, .68611, 0, 0, .70277],
                                91: [.25, .75, 0, 0, .31944],
                                92: [.25, .75, 0, 0, .575],
                                93: [.25, .75, 0, 0, .31944],
                                94: [0, .69444, 0, 0, .575],
                                95: [.31, .13444, .03194, 0, .575],
                                97: [0, .44444, 0, 0, .55902],
                                98: [0, .69444, 0, 0, .63889],
                                99: [0, .44444, 0, 0, .51111],
                                100: [0, .69444, 0, 0, .63889],
                                101: [0, .44444, 0, 0, .52708],
                                102: [0, .69444, .10903, 0, .35139],
                                103: [.19444, .44444, .01597, 0, .575],
                                104: [0, .69444, 0, 0, .63889],
                                105: [0, .69444, 0, 0, .31944],
                                106: [.19444, .69444, 0, 0, .35139],
                                107: [0, .69444, 0, 0, .60694],
                                108: [0, .69444, 0, 0, .31944],
                                109: [0, .44444, 0, 0, .95833],
                                110: [0, .44444, 0, 0, .63889],
                                111: [0, .44444, 0, 0, .575],
                                112: [.19444, .44444, 0, 0, .63889],
                                113: [.19444, .44444, 0, 0, .60694],
                                114: [0, .44444, 0, 0, .47361],
                                115: [0, .44444, 0, 0, .45361],
                                116: [0, .63492, 0, 0, .44722],
                                117: [0, .44444, 0, 0, .63889],
                                118: [0, .44444, .01597, 0, .60694],
                                119: [0, .44444, .01597, 0, .83055],
                                120: [0, .44444, 0, 0, .60694],
                                121: [.19444, .44444, .01597, 0, .60694],
                                122: [0, .44444, 0, 0, .51111],
                                123: [.25, .75, 0, 0, .575],
                                124: [.25, .75, 0, 0, .31944],
                                125: [.25, .75, 0, 0, .575],
                                126: [.35, .34444, 0, 0, .575],
                                160: [0, 0, 0, 0, .25],
                                163: [0, .69444, 0, 0, .86853],
                                168: [0, .69444, 0, 0, .575],
                                172: [0, .44444, 0, 0, .76666],
                                176: [0, .69444, 0, 0, .86944],
                                177: [.13333, .63333, 0, 0, .89444],
                                184: [.17014, 0, 0, 0, .51111],
                                198: [0, .68611, 0, 0, 1.04166],
                                215: [.13333, .63333, 0, 0, .89444],
                                216: [.04861, .73472, 0, 0, .89444],
                                223: [0, .69444, 0, 0, .59722],
                                230: [0, .44444, 0, 0, .83055],
                                247: [.13333, .63333, 0, 0, .89444],
                                248: [.09722, .54167, 0, 0, .575],
                                305: [0, .44444, 0, 0, .31944],
                                338: [0, .68611, 0, 0, 1.16944],
                                339: [0, .44444, 0, 0, .89444],
                                567: [.19444, .44444, 0, 0, .35139],
                                710: [0, .69444, 0, 0, .575],
                                711: [0, .63194, 0, 0, .575],
                                713: [0, .59611, 0, 0, .575],
                                714: [0, .69444, 0, 0, .575],
                                715: [0, .69444, 0, 0, .575],
                                728: [0, .69444, 0, 0, .575],
                                729: [0, .69444, 0, 0, .31944],
                                730: [0, .69444, 0, 0, .86944],
                                732: [0, .69444, 0, 0, .575],
                                733: [0, .69444, 0, 0, .575],
                                915: [0, .68611, 0, 0, .69166],
                                916: [0, .68611, 0, 0, .95833],
                                920: [0, .68611, 0, 0, .89444],
                                923: [0, .68611, 0, 0, .80555],
                                926: [0, .68611, 0, 0, .76666],
                                928: [0, .68611, 0, 0, .9],
                                931: [0, .68611, 0, 0, .83055],
                                933: [0, .68611, 0, 0, .89444],
                                934: [0, .68611, 0, 0, .83055],
                                936: [0, .68611, 0, 0, .89444],
                                937: [0, .68611, 0, 0, .83055],
                                8211: [0, .44444, .03194, 0, .575],
                                8212: [0, .44444, .03194, 0, 1.14999],
                                8216: [0, .69444, 0, 0, .31944],
                                8217: [0, .69444, 0, 0, .31944],
                                8220: [0, .69444, 0, 0, .60278],
                                8221: [0, .69444, 0, 0, .60278],
                                8224: [.19444, .69444, 0, 0, .51111],
                                8225: [.19444, .69444, 0, 0, .51111],
                                8242: [0, .55556, 0, 0, .34444],
                                8407: [0, .72444, .15486, 0, .575],
                                8463: [0, .69444, 0, 0, .66759],
                                8465: [0, .69444, 0, 0, .83055],
                                8467: [0, .69444, 0, 0, .47361],
                                8472: [.19444, .44444, 0, 0, .74027],
                                8476: [0, .69444, 0, 0, .83055],
                                8501: [0, .69444, 0, 0, .70277],
                                8592: [-.10889, .39111, 0, 0, 1.14999],
                                8593: [.19444, .69444, 0, 0, .575],
                                8594: [-.10889, .39111, 0, 0, 1.14999],
                                8595: [.19444, .69444, 0, 0, .575],
                                8596: [-.10889, .39111, 0, 0, 1.14999],
                                8597: [.25, .75, 0, 0, .575],
                                8598: [.19444, .69444, 0, 0, 1.14999],
                                8599: [.19444, .69444, 0, 0, 1.14999],
                                8600: [.19444, .69444, 0, 0, 1.14999],
                                8601: [.19444, .69444, 0, 0, 1.14999],
                                8636: [-.10889, .39111, 0, 0, 1.14999],
                                8637: [-.10889, .39111, 0, 0, 1.14999],
                                8640: [-.10889, .39111, 0, 0, 1.14999],
                                8641: [-.10889, .39111, 0, 0, 1.14999],
                                8656: [-.10889, .39111, 0, 0, 1.14999],
                                8657: [.19444, .69444, 0, 0, .70277],
                                8658: [-.10889, .39111, 0, 0, 1.14999],
                                8659: [.19444, .69444, 0, 0, .70277],
                                8660: [-.10889, .39111, 0, 0, 1.14999],
                                8661: [.25, .75, 0, 0, .70277],
                                8704: [0, .69444, 0, 0, .63889],
                                8706: [0, .69444, .06389, 0, .62847],
                                8707: [0, .69444, 0, 0, .63889],
                                8709: [.05556, .75, 0, 0, .575],
                                8711: [0, .68611, 0, 0, .95833],
                                8712: [.08556, .58556, 0, 0, .76666],
                                8715: [.08556, .58556, 0, 0, .76666],
                                8722: [.13333, .63333, 0, 0, .89444],
                                8723: [.13333, .63333, 0, 0, .89444],
                                8725: [.25, .75, 0, 0, .575],
                                8726: [.25, .75, 0, 0, .575],
                                8727: [-.02778, .47222, 0, 0, .575],
                                8728: [-.02639, .47361, 0, 0, .575],
                                8729: [-.02639, .47361, 0, 0, .575],
                                8730: [.18, .82, 0, 0, .95833],
                                8733: [0, .44444, 0, 0, .89444],
                                8734: [0, .44444, 0, 0, 1.14999],
                                8736: [0, .69224, 0, 0, .72222],
                                8739: [.25, .75, 0, 0, .31944],
                                8741: [.25, .75, 0, 0, .575],
                                8743: [0, .55556, 0, 0, .76666],
                                8744: [0, .55556, 0, 0, .76666],
                                8745: [0, .55556, 0, 0, .76666],
                                8746: [0, .55556, 0, 0, .76666],
                                8747: [.19444, .69444, .12778, 0, .56875],
                                8764: [-.10889, .39111, 0, 0, .89444],
                                8768: [.19444, .69444, 0, 0, .31944],
                                8771: [.00222, .50222, 0, 0, .89444],
                                8773: [.027, .638, 0, 0, .894],
                                8776: [.02444, .52444, 0, 0, .89444],
                                8781: [.00222, .50222, 0, 0, .89444],
                                8801: [.00222, .50222, 0, 0, .89444],
                                8804: [.19667, .69667, 0, 0, .89444],
                                8805: [.19667, .69667, 0, 0, .89444],
                                8810: [.08556, .58556, 0, 0, 1.14999],
                                8811: [.08556, .58556, 0, 0, 1.14999],
                                8826: [.08556, .58556, 0, 0, .89444],
                                8827: [.08556, .58556, 0, 0, .89444],
                                8834: [.08556, .58556, 0, 0, .89444],
                                8835: [.08556, .58556, 0, 0, .89444],
                                8838: [.19667, .69667, 0, 0, .89444],
                                8839: [.19667, .69667, 0, 0, .89444],
                                8846: [0, .55556, 0, 0, .76666],
                                8849: [.19667, .69667, 0, 0, .89444],
                                8850: [.19667, .69667, 0, 0, .89444],
                                8851: [0, .55556, 0, 0, .76666],
                                8852: [0, .55556, 0, 0, .76666],
                                8853: [.13333, .63333, 0, 0, .89444],
                                8854: [.13333, .63333, 0, 0, .89444],
                                8855: [.13333, .63333, 0, 0, .89444],
                                8856: [.13333, .63333, 0, 0, .89444],
                                8857: [.13333, .63333, 0, 0, .89444],
                                8866: [0, .69444, 0, 0, .70277],
                                8867: [0, .69444, 0, 0, .70277],
                                8868: [0, .69444, 0, 0, .89444],
                                8869: [0, .69444, 0, 0, .89444],
                                8900: [-.02639, .47361, 0, 0, .575],
                                8901: [-.02639, .47361, 0, 0, .31944],
                                8902: [-.02778, .47222, 0, 0, .575],
                                8968: [.25, .75, 0, 0, .51111],
                                8969: [.25, .75, 0, 0, .51111],
                                8970: [.25, .75, 0, 0, .51111],
                                8971: [.25, .75, 0, 0, .51111],
                                8994: [-.13889, .36111, 0, 0, 1.14999],
                                8995: [-.13889, .36111, 0, 0, 1.14999],
                                9651: [.19444, .69444, 0, 0, 1.02222],
                                9657: [-.02778, .47222, 0, 0, .575],
                                9661: [.19444, .69444, 0, 0, 1.02222],
                                9667: [-.02778, .47222, 0, 0, .575],
                                9711: [.19444, .69444, 0, 0, 1.14999],
                                9824: [.12963, .69444, 0, 0, .89444],
                                9825: [.12963, .69444, 0, 0, .89444],
                                9826: [.12963, .69444, 0, 0, .89444],
                                9827: [.12963, .69444, 0, 0, .89444],
                                9837: [0, .75, 0, 0, .44722],
                                9838: [.19444, .69444, 0, 0, .44722],
                                9839: [.19444, .69444, 0, 0, .44722],
                                10216: [.25, .75, 0, 0, .44722],
                                10217: [.25, .75, 0, 0, .44722],
                                10815: [0, .68611, 0, 0, .9],
                                10927: [.19667, .69667, 0, 0, .89444],
                                10928: [.19667, .69667, 0, 0, .89444],
                                57376: [.19444, .69444, 0, 0, 0]
                            },
                            "Main-BoldItalic": {
                                32: [0, 0, 0, 0, .25],
                                33: [0, .69444, .11417, 0, .38611],
                                34: [0, .69444, .07939, 0, .62055],
                                35: [.19444, .69444, .06833, 0, .94444],
                                37: [.05556, .75, .12861, 0, .94444],
                                38: [0, .69444, .08528, 0, .88555],
                                39: [0, .69444, .12945, 0, .35555],
                                40: [.25, .75, .15806, 0, .47333],
                                41: [.25, .75, .03306, 0, .47333],
                                42: [0, .75, .14333, 0, .59111],
                                43: [.10333, .60333, .03306, 0, .88555],
                                44: [.19444, .14722, 0, 0, .35555],
                                45: [0, .44444, .02611, 0, .41444],
                                46: [0, .14722, 0, 0, .35555],
                                47: [.25, .75, .15806, 0, .59111],
                                48: [0, .64444, .13167, 0, .59111],
                                49: [0, .64444, .13167, 0, .59111],
                                50: [0, .64444, .13167, 0, .59111],
                                51: [0, .64444, .13167, 0, .59111],
                                52: [.19444, .64444, .13167, 0, .59111],
                                53: [0, .64444, .13167, 0, .59111],
                                54: [0, .64444, .13167, 0, .59111],
                                55: [.19444, .64444, .13167, 0, .59111],
                                56: [0, .64444, .13167, 0, .59111],
                                57: [0, .64444, .13167, 0, .59111],
                                58: [0, .44444, .06695, 0, .35555],
                                59: [.19444, .44444, .06695, 0, .35555],
                                61: [-.10889, .39111, .06833, 0, .88555],
                                63: [0, .69444, .11472, 0, .59111],
                                64: [0, .69444, .09208, 0, .88555],
                                65: [0, .68611, 0, 0, .86555],
                                66: [0, .68611, .0992, 0, .81666],
                                67: [0, .68611, .14208, 0, .82666],
                                68: [0, .68611, .09062, 0, .87555],
                                69: [0, .68611, .11431, 0, .75666],
                                70: [0, .68611, .12903, 0, .72722],
                                71: [0, .68611, .07347, 0, .89527],
                                72: [0, .68611, .17208, 0, .8961],
                                73: [0, .68611, .15681, 0, .47166],
                                74: [0, .68611, .145, 0, .61055],
                                75: [0, .68611, .14208, 0, .89499],
                                76: [0, .68611, 0, 0, .69777],
                                77: [0, .68611, .17208, 0, 1.07277],
                                78: [0, .68611, .17208, 0, .8961],
                                79: [0, .68611, .09062, 0, .85499],
                                80: [0, .68611, .0992, 0, .78721],
                                81: [.19444, .68611, .09062, 0, .85499],
                                82: [0, .68611, .02559, 0, .85944],
                                83: [0, .68611, .11264, 0, .64999],
                                84: [0, .68611, .12903, 0, .7961],
                                85: [0, .68611, .17208, 0, .88083],
                                86: [0, .68611, .18625, 0, .86555],
                                87: [0, .68611, .18625, 0, 1.15999],
                                88: [0, .68611, .15681, 0, .86555],
                                89: [0, .68611, .19803, 0, .86555],
                                90: [0, .68611, .14208, 0, .70888],
                                91: [.25, .75, .1875, 0, .35611],
                                93: [.25, .75, .09972, 0, .35611],
                                94: [0, .69444, .06709, 0, .59111],
                                95: [.31, .13444, .09811, 0, .59111],
                                97: [0, .44444, .09426, 0, .59111],
                                98: [0, .69444, .07861, 0, .53222],
                                99: [0, .44444, .05222, 0, .53222],
                                100: [0, .69444, .10861, 0, .59111],
                                101: [0, .44444, .085, 0, .53222],
                                102: [.19444, .69444, .21778, 0, .4],
                                103: [.19444, .44444, .105, 0, .53222],
                                104: [0, .69444, .09426, 0, .59111],
                                105: [0, .69326, .11387, 0, .35555],
                                106: [.19444, .69326, .1672, 0, .35555],
                                107: [0, .69444, .11111, 0, .53222],
                                108: [0, .69444, .10861, 0, .29666],
                                109: [0, .44444, .09426, 0, .94444],
                                110: [0, .44444, .09426, 0, .64999],
                                111: [0, .44444, .07861, 0, .59111],
                                112: [.19444, .44444, .07861, 0, .59111],
                                113: [.19444, .44444, .105, 0, .53222],
                                114: [0, .44444, .11111, 0, .50167],
                                115: [0, .44444, .08167, 0, .48694],
                                116: [0, .63492, .09639, 0, .385],
                                117: [0, .44444, .09426, 0, .62055],
                                118: [0, .44444, .11111, 0, .53222],
                                119: [0, .44444, .11111, 0, .76777],
                                120: [0, .44444, .12583, 0, .56055],
                                121: [.19444, .44444, .105, 0, .56166],
                                122: [0, .44444, .13889, 0, .49055],
                                126: [.35, .34444, .11472, 0, .59111],
                                160: [0, 0, 0, 0, .25],
                                168: [0, .69444, .11473, 0, .59111],
                                176: [0, .69444, 0, 0, .94888],
                                184: [.17014, 0, 0, 0, .53222],
                                198: [0, .68611, .11431, 0, 1.02277],
                                216: [.04861, .73472, .09062, 0, .88555],
                                223: [.19444, .69444, .09736, 0, .665],
                                230: [0, .44444, .085, 0, .82666],
                                248: [.09722, .54167, .09458, 0, .59111],
                                305: [0, .44444, .09426, 0, .35555],
                                338: [0, .68611, .11431, 0, 1.14054],
                                339: [0, .44444, .085, 0, .82666],
                                567: [.19444, .44444, .04611, 0, .385],
                                710: [0, .69444, .06709, 0, .59111],
                                711: [0, .63194, .08271, 0, .59111],
                                713: [0, .59444, .10444, 0, .59111],
                                714: [0, .69444, .08528, 0, .59111],
                                715: [0, .69444, 0, 0, .59111],
                                728: [0, .69444, .10333, 0, .59111],
                                729: [0, .69444, .12945, 0, .35555],
                                730: [0, .69444, 0, 0, .94888],
                                732: [0, .69444, .11472, 0, .59111],
                                733: [0, .69444, .11472, 0, .59111],
                                915: [0, .68611, .12903, 0, .69777],
                                916: [0, .68611, 0, 0, .94444],
                                920: [0, .68611, .09062, 0, .88555],
                                923: [0, .68611, 0, 0, .80666],
                                926: [0, .68611, .15092, 0, .76777],
                                928: [0, .68611, .17208, 0, .8961],
                                931: [0, .68611, .11431, 0, .82666],
                                933: [0, .68611, .10778, 0, .88555],
                                934: [0, .68611, .05632, 0, .82666],
                                936: [0, .68611, .10778, 0, .88555],
                                937: [0, .68611, .0992, 0, .82666],
                                8211: [0, .44444, .09811, 0, .59111],
                                8212: [0, .44444, .09811, 0, 1.18221],
                                8216: [0, .69444, .12945, 0, .35555],
                                8217: [0, .69444, .12945, 0, .35555],
                                8220: [0, .69444, .16772, 0, .62055],
                                8221: [0, .69444, .07939, 0, .62055]
                            },
                            "Main-Italic": {
                                32: [0, 0, 0, 0, .25],
                                33: [0, .69444, .12417, 0, .30667],
                                34: [0, .69444, .06961, 0, .51444],
                                35: [.19444, .69444, .06616, 0, .81777],
                                37: [.05556, .75, .13639, 0, .81777],
                                38: [0, .69444, .09694, 0, .76666],
                                39: [0, .69444, .12417, 0, .30667],
                                40: [.25, .75, .16194, 0, .40889],
                                41: [.25, .75, .03694, 0, .40889],
                                42: [0, .75, .14917, 0, .51111],
                                43: [.05667, .56167, .03694, 0, .76666],
                                44: [.19444, .10556, 0, 0, .30667],
                                45: [0, .43056, .02826, 0, .35778],
                                46: [0, .10556, 0, 0, .30667],
                                47: [.25, .75, .16194, 0, .51111],
                                48: [0, .64444, .13556, 0, .51111],
                                49: [0, .64444, .13556, 0, .51111],
                                50: [0, .64444, .13556, 0, .51111],
                                51: [0, .64444, .13556, 0, .51111],
                                52: [.19444, .64444, .13556, 0, .51111],
                                53: [0, .64444, .13556, 0, .51111],
                                54: [0, .64444, .13556, 0, .51111],
                                55: [.19444, .64444, .13556, 0, .51111],
                                56: [0, .64444, .13556, 0, .51111],
                                57: [0, .64444, .13556, 0, .51111],
                                58: [0, .43056, .0582, 0, .30667],
                                59: [.19444, .43056, .0582, 0, .30667],
                                61: [-.13313, .36687, .06616, 0, .76666],
                                63: [0, .69444, .1225, 0, .51111],
                                64: [0, .69444, .09597, 0, .76666],
                                65: [0, .68333, 0, 0, .74333],
                                66: [0, .68333, .10257, 0, .70389],
                                67: [0, .68333, .14528, 0, .71555],
                                68: [0, .68333, .09403, 0, .755],
                                69: [0, .68333, .12028, 0, .67833],
                                70: [0, .68333, .13305, 0, .65277],
                                71: [0, .68333, .08722, 0, .77361],
                                72: [0, .68333, .16389, 0, .74333],
                                73: [0, .68333, .15806, 0, .38555],
                                74: [0, .68333, .14028, 0, .525],
                                75: [0, .68333, .14528, 0, .76888],
                                76: [0, .68333, 0, 0, .62722],
                                77: [0, .68333, .16389, 0, .89666],
                                78: [0, .68333, .16389, 0, .74333],
                                79: [0, .68333, .09403, 0, .76666],
                                80: [0, .68333, .10257, 0, .67833],
                                81: [.19444, .68333, .09403, 0, .76666],
                                82: [0, .68333, .03868, 0, .72944],
                                83: [0, .68333, .11972, 0, .56222],
                                84: [0, .68333, .13305, 0, .71555],
                                85: [0, .68333, .16389, 0, .74333],
                                86: [0, .68333, .18361, 0, .74333],
                                87: [0, .68333, .18361, 0, .99888],
                                88: [0, .68333, .15806, 0, .74333],
                                89: [0, .68333, .19383, 0, .74333],
                                90: [0, .68333, .14528, 0, .61333],
                                91: [.25, .75, .1875, 0, .30667],
                                93: [.25, .75, .10528, 0, .30667],
                                94: [0, .69444, .06646, 0, .51111],
                                95: [.31, .12056, .09208, 0, .51111],
                                97: [0, .43056, .07671, 0, .51111],
                                98: [0, .69444, .06312, 0, .46],
                                99: [0, .43056, .05653, 0, .46],
                                100: [0, .69444, .10333, 0, .51111],
                                101: [0, .43056, .07514, 0, .46],
                                102: [.19444, .69444, .21194, 0, .30667],
                                103: [.19444, .43056, .08847, 0, .46],
                                104: [0, .69444, .07671, 0, .51111],
                                105: [0, .65536, .1019, 0, .30667],
                                106: [.19444, .65536, .14467, 0, .30667],
                                107: [0, .69444, .10764, 0, .46],
                                108: [0, .69444, .10333, 0, .25555],
                                109: [0, .43056, .07671, 0, .81777],
                                110: [0, .43056, .07671, 0, .56222],
                                111: [0, .43056, .06312, 0, .51111],
                                112: [.19444, .43056, .06312, 0, .51111],
                                113: [.19444, .43056, .08847, 0, .46],
                                114: [0, .43056, .10764, 0, .42166],
                                115: [0, .43056, .08208, 0, .40889],
                                116: [0, .61508, .09486, 0, .33222],
                                117: [0, .43056, .07671, 0, .53666],
                                118: [0, .43056, .10764, 0, .46],
                                119: [0, .43056, .10764, 0, .66444],
                                120: [0, .43056, .12042, 0, .46389],
                                121: [.19444, .43056, .08847, 0, .48555],
                                122: [0, .43056, .12292, 0, .40889],
                                126: [.35, .31786, .11585, 0, .51111],
                                160: [0, 0, 0, 0, .25],
                                168: [0, .66786, .10474, 0, .51111],
                                176: [0, .69444, 0, 0, .83129],
                                184: [.17014, 0, 0, 0, .46],
                                198: [0, .68333, .12028, 0, .88277],
                                216: [.04861, .73194, .09403, 0, .76666],
                                223: [.19444, .69444, .10514, 0, .53666],
                                230: [0, .43056, .07514, 0, .71555],
                                248: [.09722, .52778, .09194, 0, .51111],
                                338: [0, .68333, .12028, 0, .98499],
                                339: [0, .43056, .07514, 0, .71555],
                                710: [0, .69444, .06646, 0, .51111],
                                711: [0, .62847, .08295, 0, .51111],
                                713: [0, .56167, .10333, 0, .51111],
                                714: [0, .69444, .09694, 0, .51111],
                                715: [0, .69444, 0, 0, .51111],
                                728: [0, .69444, .10806, 0, .51111],
                                729: [0, .66786, .11752, 0, .30667],
                                730: [0, .69444, 0, 0, .83129],
                                732: [0, .66786, .11585, 0, .51111],
                                733: [0, .69444, .1225, 0, .51111],
                                915: [0, .68333, .13305, 0, .62722],
                                916: [0, .68333, 0, 0, .81777],
                                920: [0, .68333, .09403, 0, .76666],
                                923: [0, .68333, 0, 0, .69222],
                                926: [0, .68333, .15294, 0, .66444],
                                928: [0, .68333, .16389, 0, .74333],
                                931: [0, .68333, .12028, 0, .71555],
                                933: [0, .68333, .11111, 0, .76666],
                                934: [0, .68333, .05986, 0, .71555],
                                936: [0, .68333, .11111, 0, .76666],
                                937: [0, .68333, .10257, 0, .71555],
                                8211: [0, .43056, .09208, 0, .51111],
                                8212: [0, .43056, .09208, 0, 1.02222],
                                8216: [0, .69444, .12417, 0, .30667],
                                8217: [0, .69444, .12417, 0, .30667],
                                8220: [0, .69444, .1685, 0, .51444],
                                8221: [0, .69444, .06961, 0, .51444],
                                8463: [0, .68889, 0, 0, .54028]
                            },
                            "Main-Regular": {
                                32: [0, 0, 0, 0, .25],
                                33: [0, .69444, 0, 0, .27778],
                                34: [0, .69444, 0, 0, .5],
                                35: [.19444, .69444, 0, 0, .83334],
                                36: [.05556, .75, 0, 0, .5],
                                37: [.05556, .75, 0, 0, .83334],
                                38: [0, .69444, 0, 0, .77778],
                                39: [0, .69444, 0, 0, .27778],
                                40: [.25, .75, 0, 0, .38889],
                                41: [.25, .75, 0, 0, .38889],
                                42: [0, .75, 0, 0, .5],
                                43: [.08333, .58333, 0, 0, .77778],
                                44: [.19444, .10556, 0, 0, .27778],
                                45: [0, .43056, 0, 0, .33333],
                                46: [0, .10556, 0, 0, .27778],
                                47: [.25, .75, 0, 0, .5],
                                48: [0, .64444, 0, 0, .5],
                                49: [0, .64444, 0, 0, .5],
                                50: [0, .64444, 0, 0, .5],
                                51: [0, .64444, 0, 0, .5],
                                52: [0, .64444, 0, 0, .5],
                                53: [0, .64444, 0, 0, .5],
                                54: [0, .64444, 0, 0, .5],
                                55: [0, .64444, 0, 0, .5],
                                56: [0, .64444, 0, 0, .5],
                                57: [0, .64444, 0, 0, .5],
                                58: [0, .43056, 0, 0, .27778],
                                59: [.19444, .43056, 0, 0, .27778],
                                60: [.0391, .5391, 0, 0, .77778],
                                61: [-.13313, .36687, 0, 0, .77778],
                                62: [.0391, .5391, 0, 0, .77778],
                                63: [0, .69444, 0, 0, .47222],
                                64: [0, .69444, 0, 0, .77778],
                                65: [0, .68333, 0, 0, .75],
                                66: [0, .68333, 0, 0, .70834],
                                67: [0, .68333, 0, 0, .72222],
                                68: [0, .68333, 0, 0, .76389],
                                69: [0, .68333, 0, 0, .68056],
                                70: [0, .68333, 0, 0, .65278],
                                71: [0, .68333, 0, 0, .78472],
                                72: [0, .68333, 0, 0, .75],
                                73: [0, .68333, 0, 0, .36111],
                                74: [0, .68333, 0, 0, .51389],
                                75: [0, .68333, 0, 0, .77778],
                                76: [0, .68333, 0, 0, .625],
                                77: [0, .68333, 0, 0, .91667],
                                78: [0, .68333, 0, 0, .75],
                                79: [0, .68333, 0, 0, .77778],
                                80: [0, .68333, 0, 0, .68056],
                                81: [.19444, .68333, 0, 0, .77778],
                                82: [0, .68333, 0, 0, .73611],
                                83: [0, .68333, 0, 0, .55556],
                                84: [0, .68333, 0, 0, .72222],
                                85: [0, .68333, 0, 0, .75],
                                86: [0, .68333, .01389, 0, .75],
                                87: [0, .68333, .01389, 0, 1.02778],
                                88: [0, .68333, 0, 0, .75],
                                89: [0, .68333, .025, 0, .75],
                                90: [0, .68333, 0, 0, .61111],
                                91: [.25, .75, 0, 0, .27778],
                                92: [.25, .75, 0, 0, .5],
                                93: [.25, .75, 0, 0, .27778],
                                94: [0, .69444, 0, 0, .5],
                                95: [.31, .12056, .02778, 0, .5],
                                97: [0, .43056, 0, 0, .5],
                                98: [0, .69444, 0, 0, .55556],
                                99: [0, .43056, 0, 0, .44445],
                                100: [0, .69444, 0, 0, .55556],
                                101: [0, .43056, 0, 0, .44445],
                                102: [0, .69444, .07778, 0, .30556],
                                103: [.19444, .43056, .01389, 0, .5],
                                104: [0, .69444, 0, 0, .55556],
                                105: [0, .66786, 0, 0, .27778],
                                106: [.19444, .66786, 0, 0, .30556],
                                107: [0, .69444, 0, 0, .52778],
                                108: [0, .69444, 0, 0, .27778],
                                109: [0, .43056, 0, 0, .83334],
                                110: [0, .43056, 0, 0, .55556],
                                111: [0, .43056, 0, 0, .5],
                                112: [.19444, .43056, 0, 0, .55556],
                                113: [.19444, .43056, 0, 0, .52778],
                                114: [0, .43056, 0, 0, .39167],
                                115: [0, .43056, 0, 0, .39445],
                                116: [0, .61508, 0, 0, .38889],
                                117: [0, .43056, 0, 0, .55556],
                                118: [0, .43056, .01389, 0, .52778],
                                119: [0, .43056, .01389, 0, .72222],
                                120: [0, .43056, 0, 0, .52778],
                                121: [.19444, .43056, .01389, 0, .52778],
                                122: [0, .43056, 0, 0, .44445],
                                123: [.25, .75, 0, 0, .5],
                                124: [.25, .75, 0, 0, .27778],
                                125: [.25, .75, 0, 0, .5],
                                126: [.35, .31786, 0, 0, .5],
                                160: [0, 0, 0, 0, .25],
                                163: [0, .69444, 0, 0, .76909],
                                167: [.19444, .69444, 0, 0, .44445],
                                168: [0, .66786, 0, 0, .5],
                                172: [0, .43056, 0, 0, .66667],
                                176: [0, .69444, 0, 0, .75],
                                177: [.08333, .58333, 0, 0, .77778],
                                182: [.19444, .69444, 0, 0, .61111],
                                184: [.17014, 0, 0, 0, .44445],
                                198: [0, .68333, 0, 0, .90278],
                                215: [.08333, .58333, 0, 0, .77778],
                                216: [.04861, .73194, 0, 0, .77778],
                                223: [0, .69444, 0, 0, .5],
                                230: [0, .43056, 0, 0, .72222],
                                247: [.08333, .58333, 0, 0, .77778],
                                248: [.09722, .52778, 0, 0, .5],
                                305: [0, .43056, 0, 0, .27778],
                                338: [0, .68333, 0, 0, 1.01389],
                                339: [0, .43056, 0, 0, .77778],
                                567: [.19444, .43056, 0, 0, .30556],
                                710: [0, .69444, 0, 0, .5],
                                711: [0, .62847, 0, 0, .5],
                                713: [0, .56778, 0, 0, .5],
                                714: [0, .69444, 0, 0, .5],
                                715: [0, .69444, 0, 0, .5],
                                728: [0, .69444, 0, 0, .5],
                                729: [0, .66786, 0, 0, .27778],
                                730: [0, .69444, 0, 0, .75],
                                732: [0, .66786, 0, 0, .5],
                                733: [0, .69444, 0, 0, .5],
                                915: [0, .68333, 0, 0, .625],
                                916: [0, .68333, 0, 0, .83334],
                                920: [0, .68333, 0, 0, .77778],
                                923: [0, .68333, 0, 0, .69445],
                                926: [0, .68333, 0, 0, .66667],
                                928: [0, .68333, 0, 0, .75],
                                931: [0, .68333, 0, 0, .72222],
                                933: [0, .68333, 0, 0, .77778],
                                934: [0, .68333, 0, 0, .72222],
                                936: [0, .68333, 0, 0, .77778],
                                937: [0, .68333, 0, 0, .72222],
                                8211: [0, .43056, .02778, 0, .5],
                                8212: [0, .43056, .02778, 0, 1],
                                8216: [0, .69444, 0, 0, .27778],
                                8217: [0, .69444, 0, 0, .27778],
                                8220: [0, .69444, 0, 0, .5],
                                8221: [0, .69444, 0, 0, .5],
                                8224: [.19444, .69444, 0, 0, .44445],
                                8225: [.19444, .69444, 0, 0, .44445],
                                8230: [0, .123, 0, 0, 1.172],
                                8242: [0, .55556, 0, 0, .275],
                                8407: [0, .71444, .15382, 0, .5],
                                8463: [0, .68889, 0, 0, .54028],
                                8465: [0, .69444, 0, 0, .72222],
                                8467: [0, .69444, 0, .11111, .41667],
                                8472: [.19444, .43056, 0, .11111, .63646],
                                8476: [0, .69444, 0, 0, .72222],
                                8501: [0, .69444, 0, 0, .61111],
                                8592: [-.13313, .36687, 0, 0, 1],
                                8593: [.19444, .69444, 0, 0, .5],
                                8594: [-.13313, .36687, 0, 0, 1],
                                8595: [.19444, .69444, 0, 0, .5],
                                8596: [-.13313, .36687, 0, 0, 1],
                                8597: [.25, .75, 0, 0, .5],
                                8598: [.19444, .69444, 0, 0, 1],
                                8599: [.19444, .69444, 0, 0, 1],
                                8600: [.19444, .69444, 0, 0, 1],
                                8601: [.19444, .69444, 0, 0, 1],
                                8614: [.011, .511, 0, 0, 1],
                                8617: [.011, .511, 0, 0, 1.126],
                                8618: [.011, .511, 0, 0, 1.126],
                                8636: [-.13313, .36687, 0, 0, 1],
                                8637: [-.13313, .36687, 0, 0, 1],
                                8640: [-.13313, .36687, 0, 0, 1],
                                8641: [-.13313, .36687, 0, 0, 1],
                                8652: [.011, .671, 0, 0, 1],
                                8656: [-.13313, .36687, 0, 0, 1],
                                8657: [.19444, .69444, 0, 0, .61111],
                                8658: [-.13313, .36687, 0, 0, 1],
                                8659: [.19444, .69444, 0, 0, .61111],
                                8660: [-.13313, .36687, 0, 0, 1],
                                8661: [.25, .75, 0, 0, .61111],
                                8704: [0, .69444, 0, 0, .55556],
                                8706: [0, .69444, .05556, .08334, .5309],
                                8707: [0, .69444, 0, 0, .55556],
                                8709: [.05556, .75, 0, 0, .5],
                                8711: [0, .68333, 0, 0, .83334],
                                8712: [.0391, .5391, 0, 0, .66667],
                                8715: [.0391, .5391, 0, 0, .66667],
                                8722: [.08333, .58333, 0, 0, .77778],
                                8723: [.08333, .58333, 0, 0, .77778],
                                8725: [.25, .75, 0, 0, .5],
                                8726: [.25, .75, 0, 0, .5],
                                8727: [-.03472, .46528, 0, 0, .5],
                                8728: [-.05555, .44445, 0, 0, .5],
                                8729: [-.05555, .44445, 0, 0, .5],
                                8730: [.2, .8, 0, 0, .83334],
                                8733: [0, .43056, 0, 0, .77778],
                                8734: [0, .43056, 0, 0, 1],
                                8736: [0, .69224, 0, 0, .72222],
                                8739: [.25, .75, 0, 0, .27778],
                                8741: [.25, .75, 0, 0, .5],
                                8743: [0, .55556, 0, 0, .66667],
                                8744: [0, .55556, 0, 0, .66667],
                                8745: [0, .55556, 0, 0, .66667],
                                8746: [0, .55556, 0, 0, .66667],
                                8747: [.19444, .69444, .11111, 0, .41667],
                                8764: [-.13313, .36687, 0, 0, .77778],
                                8768: [.19444, .69444, 0, 0, .27778],
                                8771: [-.03625, .46375, 0, 0, .77778],
                                8773: [-.022, .589, 0, 0, .778],
                                8776: [-.01688, .48312, 0, 0, .77778],
                                8781: [-.03625, .46375, 0, 0, .77778],
                                8784: [-.133, .673, 0, 0, .778],
                                8801: [-.03625, .46375, 0, 0, .77778],
                                8804: [.13597, .63597, 0, 0, .77778],
                                8805: [.13597, .63597, 0, 0, .77778],
                                8810: [.0391, .5391, 0, 0, 1],
                                8811: [.0391, .5391, 0, 0, 1],
                                8826: [.0391, .5391, 0, 0, .77778],
                                8827: [.0391, .5391, 0, 0, .77778],
                                8834: [.0391, .5391, 0, 0, .77778],
                                8835: [.0391, .5391, 0, 0, .77778],
                                8838: [.13597, .63597, 0, 0, .77778],
                                8839: [.13597, .63597, 0, 0, .77778],
                                8846: [0, .55556, 0, 0, .66667],
                                8849: [.13597, .63597, 0, 0, .77778],
                                8850: [.13597, .63597, 0, 0, .77778],
                                8851: [0, .55556, 0, 0, .66667],
                                8852: [0, .55556, 0, 0, .66667],
                                8853: [.08333, .58333, 0, 0, .77778],
                                8854: [.08333, .58333, 0, 0, .77778],
                                8855: [.08333, .58333, 0, 0, .77778],
                                8856: [.08333, .58333, 0, 0, .77778],
                                8857: [.08333, .58333, 0, 0, .77778],
                                8866: [0, .69444, 0, 0, .61111],
                                8867: [0, .69444, 0, 0, .61111],
                                8868: [0, .69444, 0, 0, .77778],
                                8869: [0, .69444, 0, 0, .77778],
                                8872: [.249, .75, 0, 0, .867],
                                8900: [-.05555, .44445, 0, 0, .5],
                                8901: [-.05555, .44445, 0, 0, .27778],
                                8902: [-.03472, .46528, 0, 0, .5],
                                8904: [.005, .505, 0, 0, .9],
                                8942: [.03, .903, 0, 0, .278],
                                8943: [-.19, .313, 0, 0, 1.172],
                                8945: [-.1, .823, 0, 0, 1.282],
                                8968: [.25, .75, 0, 0, .44445],
                                8969: [.25, .75, 0, 0, .44445],
                                8970: [.25, .75, 0, 0, .44445],
                                8971: [.25, .75, 0, 0, .44445],
                                8994: [-.14236, .35764, 0, 0, 1],
                                8995: [-.14236, .35764, 0, 0, 1],
                                9136: [.244, .744, 0, 0, .412],
                                9137: [.244, .745, 0, 0, .412],
                                9651: [.19444, .69444, 0, 0, .88889],
                                9657: [-.03472, .46528, 0, 0, .5],
                                9661: [.19444, .69444, 0, 0, .88889],
                                9667: [-.03472, .46528, 0, 0, .5],
                                9711: [.19444, .69444, 0, 0, 1],
                                9824: [.12963, .69444, 0, 0, .77778],
                                9825: [.12963, .69444, 0, 0, .77778],
                                9826: [.12963, .69444, 0, 0, .77778],
                                9827: [.12963, .69444, 0, 0, .77778],
                                9837: [0, .75, 0, 0, .38889],
                                9838: [.19444, .69444, 0, 0, .38889],
                                9839: [.19444, .69444, 0, 0, .38889],
                                10216: [.25, .75, 0, 0, .38889],
                                10217: [.25, .75, 0, 0, .38889],
                                10222: [.244, .744, 0, 0, .412],
                                10223: [.244, .745, 0, 0, .412],
                                10229: [.011, .511, 0, 0, 1.609],
                                10230: [.011, .511, 0, 0, 1.638],
                                10231: [.011, .511, 0, 0, 1.859],
                                10232: [.024, .525, 0, 0, 1.609],
                                10233: [.024, .525, 0, 0, 1.638],
                                10234: [.024, .525, 0, 0, 1.858],
                                10236: [.011, .511, 0, 0, 1.638],
                                10815: [0, .68333, 0, 0, .75],
                                10927: [.13597, .63597, 0, 0, .77778],
                                10928: [.13597, .63597, 0, 0, .77778],
                                57376: [.19444, .69444, 0, 0, 0]
                            },
                            "Math-BoldItalic": {
                                32: [0, 0, 0, 0, .25],
                                48: [0, .44444, 0, 0, .575],
                                49: [0, .44444, 0, 0, .575],
                                50: [0, .44444, 0, 0, .575],
                                51: [.19444, .44444, 0, 0, .575],
                                52: [.19444, .44444, 0, 0, .575],
                                53: [.19444, .44444, 0, 0, .575],
                                54: [0, .64444, 0, 0, .575],
                                55: [.19444, .44444, 0, 0, .575],
                                56: [0, .64444, 0, 0, .575],
                                57: [.19444, .44444, 0, 0, .575],
                                65: [0, .68611, 0, 0, .86944],
                                66: [0, .68611, .04835, 0, .8664],
                                67: [0, .68611, .06979, 0, .81694],
                                68: [0, .68611, .03194, 0, .93812],
                                69: [0, .68611, .05451, 0, .81007],
                                70: [0, .68611, .15972, 0, .68889],
                                71: [0, .68611, 0, 0, .88673],
                                72: [0, .68611, .08229, 0, .98229],
                                73: [0, .68611, .07778, 0, .51111],
                                74: [0, .68611, .10069, 0, .63125],
                                75: [0, .68611, .06979, 0, .97118],
                                76: [0, .68611, 0, 0, .75555],
                                77: [0, .68611, .11424, 0, 1.14201],
                                78: [0, .68611, .11424, 0, .95034],
                                79: [0, .68611, .03194, 0, .83666],
                                80: [0, .68611, .15972, 0, .72309],
                                81: [.19444, .68611, 0, 0, .86861],
                                82: [0, .68611, .00421, 0, .87235],
                                83: [0, .68611, .05382, 0, .69271],
                                84: [0, .68611, .15972, 0, .63663],
                                85: [0, .68611, .11424, 0, .80027],
                                86: [0, .68611, .25555, 0, .67778],
                                87: [0, .68611, .15972, 0, 1.09305],
                                88: [0, .68611, .07778, 0, .94722],
                                89: [0, .68611, .25555, 0, .67458],
                                90: [0, .68611, .06979, 0, .77257],
                                97: [0, .44444, 0, 0, .63287],
                                98: [0, .69444, 0, 0, .52083],
                                99: [0, .44444, 0, 0, .51342],
                                100: [0, .69444, 0, 0, .60972],
                                101: [0, .44444, 0, 0, .55361],
                                102: [.19444, .69444, .11042, 0, .56806],
                                103: [.19444, .44444, .03704, 0, .5449],
                                104: [0, .69444, 0, 0, .66759],
                                105: [0, .69326, 0, 0, .4048],
                                106: [.19444, .69326, .0622, 0, .47083],
                                107: [0, .69444, .01852, 0, .6037],
                                108: [0, .69444, .0088, 0, .34815],
                                109: [0, .44444, 0, 0, 1.0324],
                                110: [0, .44444, 0, 0, .71296],
                                111: [0, .44444, 0, 0, .58472],
                                112: [.19444, .44444, 0, 0, .60092],
                                113: [.19444, .44444, .03704, 0, .54213],
                                114: [0, .44444, .03194, 0, .5287],
                                115: [0, .44444, 0, 0, .53125],
                                116: [0, .63492, 0, 0, .41528],
                                117: [0, .44444, 0, 0, .68102],
                                118: [0, .44444, .03704, 0, .56666],
                                119: [0, .44444, .02778, 0, .83148],
                                120: [0, .44444, 0, 0, .65903],
                                121: [.19444, .44444, .03704, 0, .59028],
                                122: [0, .44444, .04213, 0, .55509],
                                160: [0, 0, 0, 0, .25],
                                915: [0, .68611, .15972, 0, .65694],
                                916: [0, .68611, 0, 0, .95833],
                                920: [0, .68611, .03194, 0, .86722],
                                923: [0, .68611, 0, 0, .80555],
                                926: [0, .68611, .07458, 0, .84125],
                                928: [0, .68611, .08229, 0, .98229],
                                931: [0, .68611, .05451, 0, .88507],
                                933: [0, .68611, .15972, 0, .67083],
                                934: [0, .68611, 0, 0, .76666],
                                936: [0, .68611, .11653, 0, .71402],
                                937: [0, .68611, .04835, 0, .8789],
                                945: [0, .44444, 0, 0, .76064],
                                946: [.19444, .69444, .03403, 0, .65972],
                                947: [.19444, .44444, .06389, 0, .59003],
                                948: [0, .69444, .03819, 0, .52222],
                                949: [0, .44444, 0, 0, .52882],
                                950: [.19444, .69444, .06215, 0, .50833],
                                951: [.19444, .44444, .03704, 0, .6],
                                952: [0, .69444, .03194, 0, .5618],
                                953: [0, .44444, 0, 0, .41204],
                                954: [0, .44444, 0, 0, .66759],
                                955: [0, .69444, 0, 0, .67083],
                                956: [.19444, .44444, 0, 0, .70787],
                                957: [0, .44444, .06898, 0, .57685],
                                958: [.19444, .69444, .03021, 0, .50833],
                                959: [0, .44444, 0, 0, .58472],
                                960: [0, .44444, .03704, 0, .68241],
                                961: [.19444, .44444, 0, 0, .6118],
                                962: [.09722, .44444, .07917, 0, .42361],
                                963: [0, .44444, .03704, 0, .68588],
                                964: [0, .44444, .13472, 0, .52083],
                                965: [0, .44444, .03704, 0, .63055],
                                966: [.19444, .44444, 0, 0, .74722],
                                967: [.19444, .44444, 0, 0, .71805],
                                968: [.19444, .69444, .03704, 0, .75833],
                                969: [0, .44444, .03704, 0, .71782],
                                977: [0, .69444, 0, 0, .69155],
                                981: [.19444, .69444, 0, 0, .7125],
                                982: [0, .44444, .03194, 0, .975],
                                1009: [.19444, .44444, 0, 0, .6118],
                                1013: [0, .44444, 0, 0, .48333],
                                57649: [0, .44444, 0, 0, .39352],
                                57911: [.19444, .44444, 0, 0, .43889]
                            },
                            "Math-Italic": {
                                32: [0, 0, 0, 0, .25],
                                48: [0, .43056, 0, 0, .5],
                                49: [0, .43056, 0, 0, .5],
                                50: [0, .43056, 0, 0, .5],
                                51: [.19444, .43056, 0, 0, .5],
                                52: [.19444, .43056, 0, 0, .5],
                                53: [.19444, .43056, 0, 0, .5],
                                54: [0, .64444, 0, 0, .5],
                                55: [.19444, .43056, 0, 0, .5],
                                56: [0, .64444, 0, 0, .5],
                                57: [.19444, .43056, 0, 0, .5],
                                65: [0, .68333, 0, .13889, .75],
                                66: [0, .68333, .05017, .08334, .75851],
                                67: [0, .68333, .07153, .08334, .71472],
                                68: [0, .68333, .02778, .05556, .82792],
                                69: [0, .68333, .05764, .08334, .7382],
                                70: [0, .68333, .13889, .08334, .64306],
                                71: [0, .68333, 0, .08334, .78625],
                                72: [0, .68333, .08125, .05556, .83125],
                                73: [0, .68333, .07847, .11111, .43958],
                                74: [0, .68333, .09618, .16667, .55451],
                                75: [0, .68333, .07153, .05556, .84931],
                                76: [0, .68333, 0, .02778, .68056],
                                77: [0, .68333, .10903, .08334, .97014],
                                78: [0, .68333, .10903, .08334, .80347],
                                79: [0, .68333, .02778, .08334, .76278],
                                80: [0, .68333, .13889, .08334, .64201],
                                81: [.19444, .68333, 0, .08334, .79056],
                                82: [0, .68333, .00773, .08334, .75929],
                                83: [0, .68333, .05764, .08334, .6132],
                                84: [0, .68333, .13889, .08334, .58438],
                                85: [0, .68333, .10903, .02778, .68278],
                                86: [0, .68333, .22222, 0, .58333],
                                87: [0, .68333, .13889, 0, .94445],
                                88: [0, .68333, .07847, .08334, .82847],
                                89: [0, .68333, .22222, 0, .58056],
                                90: [0, .68333, .07153, .08334, .68264],
                                97: [0, .43056, 0, 0, .52859],
                                98: [0, .69444, 0, 0, .42917],
                                99: [0, .43056, 0, .05556, .43276],
                                100: [0, .69444, 0, .16667, .52049],
                                101: [0, .43056, 0, .05556, .46563],
                                102: [.19444, .69444, .10764, .16667, .48959],
                                103: [.19444, .43056, .03588, .02778, .47697],
                                104: [0, .69444, 0, 0, .57616],
                                105: [0, .65952, 0, 0, .34451],
                                106: [.19444, .65952, .05724, 0, .41181],
                                107: [0, .69444, .03148, 0, .5206],
                                108: [0, .69444, .01968, .08334, .29838],
                                109: [0, .43056, 0, 0, .87801],
                                110: [0, .43056, 0, 0, .60023],
                                111: [0, .43056, 0, .05556, .48472],
                                112: [.19444, .43056, 0, .08334, .50313],
                                113: [.19444, .43056, .03588, .08334, .44641],
                                114: [0, .43056, .02778, .05556, .45116],
                                115: [0, .43056, 0, .05556, .46875],
                                116: [0, .61508, 0, .08334, .36111],
                                117: [0, .43056, 0, .02778, .57246],
                                118: [0, .43056, .03588, .02778, .48472],
                                119: [0, .43056, .02691, .08334, .71592],
                                120: [0, .43056, 0, .02778, .57153],
                                121: [.19444, .43056, .03588, .05556, .49028],
                                122: [0, .43056, .04398, .05556, .46505],
                                160: [0, 0, 0, 0, .25],
                                915: [0, .68333, .13889, .08334, .61528],
                                916: [0, .68333, 0, .16667, .83334],
                                920: [0, .68333, .02778, .08334, .76278],
                                923: [0, .68333, 0, .16667, .69445],
                                926: [0, .68333, .07569, .08334, .74236],
                                928: [0, .68333, .08125, .05556, .83125],
                                931: [0, .68333, .05764, .08334, .77986],
                                933: [0, .68333, .13889, .05556, .58333],
                                934: [0, .68333, 0, .08334, .66667],
                                936: [0, .68333, .11, .05556, .61222],
                                937: [0, .68333, .05017, .08334, .7724],
                                945: [0, .43056, .0037, .02778, .6397],
                                946: [.19444, .69444, .05278, .08334, .56563],
                                947: [.19444, .43056, .05556, 0, .51773],
                                948: [0, .69444, .03785, .05556, .44444],
                                949: [0, .43056, 0, .08334, .46632],
                                950: [.19444, .69444, .07378, .08334, .4375],
                                951: [.19444, .43056, .03588, .05556, .49653],
                                952: [0, .69444, .02778, .08334, .46944],
                                953: [0, .43056, 0, .05556, .35394],
                                954: [0, .43056, 0, 0, .57616],
                                955: [0, .69444, 0, 0, .58334],
                                956: [.19444, .43056, 0, .02778, .60255],
                                957: [0, .43056, .06366, .02778, .49398],
                                958: [.19444, .69444, .04601, .11111, .4375],
                                959: [0, .43056, 0, .05556, .48472],
                                960: [0, .43056, .03588, 0, .57003],
                                961: [.19444, .43056, 0, .08334, .51702],
                                962: [.09722, .43056, .07986, .08334, .36285],
                                963: [0, .43056, .03588, 0, .57141],
                                964: [0, .43056, .1132, .02778, .43715],
                                965: [0, .43056, .03588, .02778, .54028],
                                966: [.19444, .43056, 0, .08334, .65417],
                                967: [.19444, .43056, 0, .05556, .62569],
                                968: [.19444, .69444, .03588, .11111, .65139],
                                969: [0, .43056, .03588, 0, .62245],
                                977: [0, .69444, 0, .08334, .59144],
                                981: [.19444, .69444, 0, .08334, .59583],
                                982: [0, .43056, .02778, 0, .82813],
                                1009: [.19444, .43056, 0, .08334, .51702],
                                1013: [0, .43056, 0, .05556, .4059],
                                57649: [0, .43056, 0, .02778, .32246],
                                57911: [.19444, .43056, 0, .08334, .38403]
                            },
                            "SansSerif-Bold": {
                                32: [0, 0, 0, 0, .25],
                                33: [0, .69444, 0, 0, .36667],
                                34: [0, .69444, 0, 0, .55834],
                                35: [.19444, .69444, 0, 0, .91667],
                                36: [.05556, .75, 0, 0, .55],
                                37: [.05556, .75, 0, 0, 1.02912],
                                38: [0, .69444, 0, 0, .83056],
                                39: [0, .69444, 0, 0, .30556],
                                40: [.25, .75, 0, 0, .42778],
                                41: [.25, .75, 0, 0, .42778],
                                42: [0, .75, 0, 0, .55],
                                43: [.11667, .61667, 0, 0, .85556],
                                44: [.10556, .13056, 0, 0, .30556],
                                45: [0, .45833, 0, 0, .36667],
                                46: [0, .13056, 0, 0, .30556],
                                47: [.25, .75, 0, 0, .55],
                                48: [0, .69444, 0, 0, .55],
                                49: [0, .69444, 0, 0, .55],
                                50: [0, .69444, 0, 0, .55],
                                51: [0, .69444, 0, 0, .55],
                                52: [0, .69444, 0, 0, .55],
                                53: [0, .69444, 0, 0, .55],
                                54: [0, .69444, 0, 0, .55],
                                55: [0, .69444, 0, 0, .55],
                                56: [0, .69444, 0, 0, .55],
                                57: [0, .69444, 0, 0, .55],
                                58: [0, .45833, 0, 0, .30556],
                                59: [.10556, .45833, 0, 0, .30556],
                                61: [-.09375, .40625, 0, 0, .85556],
                                63: [0, .69444, 0, 0, .51945],
                                64: [0, .69444, 0, 0, .73334],
                                65: [0, .69444, 0, 0, .73334],
                                66: [0, .69444, 0, 0, .73334],
                                67: [0, .69444, 0, 0, .70278],
                                68: [0, .69444, 0, 0, .79445],
                                69: [0, .69444, 0, 0, .64167],
                                70: [0, .69444, 0, 0, .61111],
                                71: [0, .69444, 0, 0, .73334],
                                72: [0, .69444, 0, 0, .79445],
                                73: [0, .69444, 0, 0, .33056],
                                74: [0, .69444, 0, 0, .51945],
                                75: [0, .69444, 0, 0, .76389],
                                76: [0, .69444, 0, 0, .58056],
                                77: [0, .69444, 0, 0, .97778],
                                78: [0, .69444, 0, 0, .79445],
                                79: [0, .69444, 0, 0, .79445],
                                80: [0, .69444, 0, 0, .70278],
                                81: [.10556, .69444, 0, 0, .79445],
                                82: [0, .69444, 0, 0, .70278],
                                83: [0, .69444, 0, 0, .61111],
                                84: [0, .69444, 0, 0, .73334],
                                85: [0, .69444, 0, 0, .76389],
                                86: [0, .69444, .01528, 0, .73334],
                                87: [0, .69444, .01528, 0, 1.03889],
                                88: [0, .69444, 0, 0, .73334],
                                89: [0, .69444, .0275, 0, .73334],
                                90: [0, .69444, 0, 0, .67223],
                                91: [.25, .75, 0, 0, .34306],
                                93: [.25, .75, 0, 0, .34306],
                                94: [0, .69444, 0, 0, .55],
                                95: [.35, .10833, .03056, 0, .55],
                                97: [0, .45833, 0, 0, .525],
                                98: [0, .69444, 0, 0, .56111],
                                99: [0, .45833, 0, 0, .48889],
                                100: [0, .69444, 0, 0, .56111],
                                101: [0, .45833, 0, 0, .51111],
                                102: [0, .69444, .07639, 0, .33611],
                                103: [.19444, .45833, .01528, 0, .55],
                                104: [0, .69444, 0, 0, .56111],
                                105: [0, .69444, 0, 0, .25556],
                                106: [.19444, .69444, 0, 0, .28611],
                                107: [0, .69444, 0, 0, .53056],
                                108: [0, .69444, 0, 0, .25556],
                                109: [0, .45833, 0, 0, .86667],
                                110: [0, .45833, 0, 0, .56111],
                                111: [0, .45833, 0, 0, .55],
                                112: [.19444, .45833, 0, 0, .56111],
                                113: [.19444, .45833, 0, 0, .56111],
                                114: [0, .45833, .01528, 0, .37222],
                                115: [0, .45833, 0, 0, .42167],
                                116: [0, .58929, 0, 0, .40417],
                                117: [0, .45833, 0, 0, .56111],
                                118: [0, .45833, .01528, 0, .5],
                                119: [0, .45833, .01528, 0, .74445],
                                120: [0, .45833, 0, 0, .5],
                                121: [.19444, .45833, .01528, 0, .5],
                                122: [0, .45833, 0, 0, .47639],
                                126: [.35, .34444, 0, 0, .55],
                                160: [0, 0, 0, 0, .25],
                                168: [0, .69444, 0, 0, .55],
                                176: [0, .69444, 0, 0, .73334],
                                180: [0, .69444, 0, 0, .55],
                                184: [.17014, 0, 0, 0, .48889],
                                305: [0, .45833, 0, 0, .25556],
                                567: [.19444, .45833, 0, 0, .28611],
                                710: [0, .69444, 0, 0, .55],
                                711: [0, .63542, 0, 0, .55],
                                713: [0, .63778, 0, 0, .55],
                                728: [0, .69444, 0, 0, .55],
                                729: [0, .69444, 0, 0, .30556],
                                730: [0, .69444, 0, 0, .73334],
                                732: [0, .69444, 0, 0, .55],
                                733: [0, .69444, 0, 0, .55],
                                915: [0, .69444, 0, 0, .58056],
                                916: [0, .69444, 0, 0, .91667],
                                920: [0, .69444, 0, 0, .85556],
                                923: [0, .69444, 0, 0, .67223],
                                926: [0, .69444, 0, 0, .73334],
                                928: [0, .69444, 0, 0, .79445],
                                931: [0, .69444, 0, 0, .79445],
                                933: [0, .69444, 0, 0, .85556],
                                934: [0, .69444, 0, 0, .79445],
                                936: [0, .69444, 0, 0, .85556],
                                937: [0, .69444, 0, 0, .79445],
                                8211: [0, .45833, .03056, 0, .55],
                                8212: [0, .45833, .03056, 0, 1.10001],
                                8216: [0, .69444, 0, 0, .30556],
                                8217: [0, .69444, 0, 0, .30556],
                                8220: [0, .69444, 0, 0, .55834],
                                8221: [0, .69444, 0, 0, .55834]
                            },
                            "SansSerif-Italic": {
                                32: [0, 0, 0, 0, .25],
                                33: [0, .69444, .05733, 0, .31945],
                                34: [0, .69444, .00316, 0, .5],
                                35: [.19444, .69444, .05087, 0, .83334],
                                36: [.05556, .75, .11156, 0, .5],
                                37: [.05556, .75, .03126, 0, .83334],
                                38: [0, .69444, .03058, 0, .75834],
                                39: [0, .69444, .07816, 0, .27778],
                                40: [.25, .75, .13164, 0, .38889],
                                41: [.25, .75, .02536, 0, .38889],
                                42: [0, .75, .11775, 0, .5],
                                43: [.08333, .58333, .02536, 0, .77778],
                                44: [.125, .08333, 0, 0, .27778],
                                45: [0, .44444, .01946, 0, .33333],
                                46: [0, .08333, 0, 0, .27778],
                                47: [.25, .75, .13164, 0, .5],
                                48: [0, .65556, .11156, 0, .5],
                                49: [0, .65556, .11156, 0, .5],
                                50: [0, .65556, .11156, 0, .5],
                                51: [0, .65556, .11156, 0, .5],
                                52: [0, .65556, .11156, 0, .5],
                                53: [0, .65556, .11156, 0, .5],
                                54: [0, .65556, .11156, 0, .5],
                                55: [0, .65556, .11156, 0, .5],
                                56: [0, .65556, .11156, 0, .5],
                                57: [0, .65556, .11156, 0, .5],
                                58: [0, .44444, .02502, 0, .27778],
                                59: [.125, .44444, .02502, 0, .27778],
                                61: [-.13, .37, .05087, 0, .77778],
                                63: [0, .69444, .11809, 0, .47222],
                                64: [0, .69444, .07555, 0, .66667],
                                65: [0, .69444, 0, 0, .66667],
                                66: [0, .69444, .08293, 0, .66667],
                                67: [0, .69444, .11983, 0, .63889],
                                68: [0, .69444, .07555, 0, .72223],
                                69: [0, .69444, .11983, 0, .59722],
                                70: [0, .69444, .13372, 0, .56945],
                                71: [0, .69444, .11983, 0, .66667],
                                72: [0, .69444, .08094, 0, .70834],
                                73: [0, .69444, .13372, 0, .27778],
                                74: [0, .69444, .08094, 0, .47222],
                                75: [0, .69444, .11983, 0, .69445],
                                76: [0, .69444, 0, 0, .54167],
                                77: [0, .69444, .08094, 0, .875],
                                78: [0, .69444, .08094, 0, .70834],
                                79: [0, .69444, .07555, 0, .73611],
                                80: [0, .69444, .08293, 0, .63889],
                                81: [.125, .69444, .07555, 0, .73611],
                                82: [0, .69444, .08293, 0, .64584],
                                83: [0, .69444, .09205, 0, .55556],
                                84: [0, .69444, .13372, 0, .68056],
                                85: [0, .69444, .08094, 0, .6875],
                                86: [0, .69444, .1615, 0, .66667],
                                87: [0, .69444, .1615, 0, .94445],
                                88: [0, .69444, .13372, 0, .66667],
                                89: [0, .69444, .17261, 0, .66667],
                                90: [0, .69444, .11983, 0, .61111],
                                91: [.25, .75, .15942, 0, .28889],
                                93: [.25, .75, .08719, 0, .28889],
                                94: [0, .69444, .0799, 0, .5],
                                95: [.35, .09444, .08616, 0, .5],
                                97: [0, .44444, .00981, 0, .48056],
                                98: [0, .69444, .03057, 0, .51667],
                                99: [0, .44444, .08336, 0, .44445],
                                100: [0, .69444, .09483, 0, .51667],
                                101: [0, .44444, .06778, 0, .44445],
                                102: [0, .69444, .21705, 0, .30556],
                                103: [.19444, .44444, .10836, 0, .5],
                                104: [0, .69444, .01778, 0, .51667],
                                105: [0, .67937, .09718, 0, .23889],
                                106: [.19444, .67937, .09162, 0, .26667],
                                107: [0, .69444, .08336, 0, .48889],
                                108: [0, .69444, .09483, 0, .23889],
                                109: [0, .44444, .01778, 0, .79445],
                                110: [0, .44444, .01778, 0, .51667],
                                111: [0, .44444, .06613, 0, .5],
                                112: [.19444, .44444, .0389, 0, .51667],
                                113: [.19444, .44444, .04169, 0, .51667],
                                114: [0, .44444, .10836, 0, .34167],
                                115: [0, .44444, .0778, 0, .38333],
                                116: [0, .57143, .07225, 0, .36111],
                                117: [0, .44444, .04169, 0, .51667],
                                118: [0, .44444, .10836, 0, .46111],
                                119: [0, .44444, .10836, 0, .68334],
                                120: [0, .44444, .09169, 0, .46111],
                                121: [.19444, .44444, .10836, 0, .46111],
                                122: [0, .44444, .08752, 0, .43472],
                                126: [.35, .32659, .08826, 0, .5],
                                160: [0, 0, 0, 0, .25],
                                168: [0, .67937, .06385, 0, .5],
                                176: [0, .69444, 0, 0, .73752],
                                184: [.17014, 0, 0, 0, .44445],
                                305: [0, .44444, .04169, 0, .23889],
                                567: [.19444, .44444, .04169, 0, .26667],
                                710: [0, .69444, .0799, 0, .5],
                                711: [0, .63194, .08432, 0, .5],
                                713: [0, .60889, .08776, 0, .5],
                                714: [0, .69444, .09205, 0, .5],
                                715: [0, .69444, 0, 0, .5],
                                728: [0, .69444, .09483, 0, .5],
                                729: [0, .67937, .07774, 0, .27778],
                                730: [0, .69444, 0, 0, .73752],
                                732: [0, .67659, .08826, 0, .5],
                                733: [0, .69444, .09205, 0, .5],
                                915: [0, .69444, .13372, 0, .54167],
                                916: [0, .69444, 0, 0, .83334],
                                920: [0, .69444, .07555, 0, .77778],
                                923: [0, .69444, 0, 0, .61111],
                                926: [0, .69444, .12816, 0, .66667],
                                928: [0, .69444, .08094, 0, .70834],
                                931: [0, .69444, .11983, 0, .72222],
                                933: [0, .69444, .09031, 0, .77778],
                                934: [0, .69444, .04603, 0, .72222],
                                936: [0, .69444, .09031, 0, .77778],
                                937: [0, .69444, .08293, 0, .72222],
                                8211: [0, .44444, .08616, 0, .5],
                                8212: [0, .44444, .08616, 0, 1],
                                8216: [0, .69444, .07816, 0, .27778],
                                8217: [0, .69444, .07816, 0, .27778],
                                8220: [0, .69444, .14205, 0, .5],
                                8221: [0, .69444, .00316, 0, .5]
                            },
                            "SansSerif-Regular": {
                                32: [0, 0, 0, 0, .25],
                                33: [0, .69444, 0, 0, .31945],
                                34: [0, .69444, 0, 0, .5],
                                35: [.19444, .69444, 0, 0, .83334],
                                36: [.05556, .75, 0, 0, .5],
                                37: [.05556, .75, 0, 0, .83334],
                                38: [0, .69444, 0, 0, .75834],
                                39: [0, .69444, 0, 0, .27778],
                                40: [.25, .75, 0, 0, .38889],
                                41: [.25, .75, 0, 0, .38889],
                                42: [0, .75, 0, 0, .5],
                                43: [.08333, .58333, 0, 0, .77778],
                                44: [.125, .08333, 0, 0, .27778],
                                45: [0, .44444, 0, 0, .33333],
                                46: [0, .08333, 0, 0, .27778],
                                47: [.25, .75, 0, 0, .5],
                                48: [0, .65556, 0, 0, .5],
                                49: [0, .65556, 0, 0, .5],
                                50: [0, .65556, 0, 0, .5],
                                51: [0, .65556, 0, 0, .5],
                                52: [0, .65556, 0, 0, .5],
                                53: [0, .65556, 0, 0, .5],
                                54: [0, .65556, 0, 0, .5],
                                55: [0, .65556, 0, 0, .5],
                                56: [0, .65556, 0, 0, .5],
                                57: [0, .65556, 0, 0, .5],
                                58: [0, .44444, 0, 0, .27778],
                                59: [.125, .44444, 0, 0, .27778],
                                61: [-.13, .37, 0, 0, .77778],
                                63: [0, .69444, 0, 0, .47222],
                                64: [0, .69444, 0, 0, .66667],
                                65: [0, .69444, 0, 0, .66667],
                                66: [0, .69444, 0, 0, .66667],
                                67: [0, .69444, 0, 0, .63889],
                                68: [0, .69444, 0, 0, .72223],
                                69: [0, .69444, 0, 0, .59722],
                                70: [0, .69444, 0, 0, .56945],
                                71: [0, .69444, 0, 0, .66667],
                                72: [0, .69444, 0, 0, .70834],
                                73: [0, .69444, 0, 0, .27778],
                                74: [0, .69444, 0, 0, .47222],
                                75: [0, .69444, 0, 0, .69445],
                                76: [0, .69444, 0, 0, .54167],
                                77: [0, .69444, 0, 0, .875],
                                78: [0, .69444, 0, 0, .70834],
                                79: [0, .69444, 0, 0, .73611],
                                80: [0, .69444, 0, 0, .63889],
                                81: [.125, .69444, 0, 0, .73611],
                                82: [0, .69444, 0, 0, .64584],
                                83: [0, .69444, 0, 0, .55556],
                                84: [0, .69444, 0, 0, .68056],
                                85: [0, .69444, 0, 0, .6875],
                                86: [0, .69444, .01389, 0, .66667],
                                87: [0, .69444, .01389, 0, .94445],
                                88: [0, .69444, 0, 0, .66667],
                                89: [0, .69444, .025, 0, .66667],
                                90: [0, .69444, 0, 0, .61111],
                                91: [.25, .75, 0, 0, .28889],
                                93: [.25, .75, 0, 0, .28889],
                                94: [0, .69444, 0, 0, .5],
                                95: [.35, .09444, .02778, 0, .5],
                                97: [0, .44444, 0, 0, .48056],
                                98: [0, .69444, 0, 0, .51667],
                                99: [0, .44444, 0, 0, .44445],
                                100: [0, .69444, 0, 0, .51667],
                                101: [0, .44444, 0, 0, .44445],
                                102: [0, .69444, .06944, 0, .30556],
                                103: [.19444, .44444, .01389, 0, .5],
                                104: [0, .69444, 0, 0, .51667],
                                105: [0, .67937, 0, 0, .23889],
                                106: [.19444, .67937, 0, 0, .26667],
                                107: [0, .69444, 0, 0, .48889],
                                108: [0, .69444, 0, 0, .23889],
                                109: [0, .44444, 0, 0, .79445],
                                110: [0, .44444, 0, 0, .51667],
                                111: [0, .44444, 0, 0, .5],
                                112: [.19444, .44444, 0, 0, .51667],
                                113: [.19444, .44444, 0, 0, .51667],
                                114: [0, .44444, .01389, 0, .34167],
                                115: [0, .44444, 0, 0, .38333],
                                116: [0, .57143, 0, 0, .36111],
                                117: [0, .44444, 0, 0, .51667],
                                118: [0, .44444, .01389, 0, .46111],
                                119: [0, .44444, .01389, 0, .68334],
                                120: [0, .44444, 0, 0, .46111],
                                121: [.19444, .44444, .01389, 0, .46111],
                                122: [0, .44444, 0, 0, .43472],
                                126: [.35, .32659, 0, 0, .5],
                                160: [0, 0, 0, 0, .25],
                                168: [0, .67937, 0, 0, .5],
                                176: [0, .69444, 0, 0, .66667],
                                184: [.17014, 0, 0, 0, .44445],
                                305: [0, .44444, 0, 0, .23889],
                                567: [.19444, .44444, 0, 0, .26667],
                                710: [0, .69444, 0, 0, .5],
                                711: [0, .63194, 0, 0, .5],
                                713: [0, .60889, 0, 0, .5],
                                714: [0, .69444, 0, 0, .5],
                                715: [0, .69444, 0, 0, .5],
                                728: [0, .69444, 0, 0, .5],
                                729: [0, .67937, 0, 0, .27778],
                                730: [0, .69444, 0, 0, .66667],
                                732: [0, .67659, 0, 0, .5],
                                733: [0, .69444, 0, 0, .5],
                                915: [0, .69444, 0, 0, .54167],
                                916: [0, .69444, 0, 0, .83334],
                                920: [0, .69444, 0, 0, .77778],
                                923: [0, .69444, 0, 0, .61111],
                                926: [0, .69444, 0, 0, .66667],
                                928: [0, .69444, 0, 0, .70834],
                                931: [0, .69444, 0, 0, .72222],
                                933: [0, .69444, 0, 0, .77778],
                                934: [0, .69444, 0, 0, .72222],
                                936: [0, .69444, 0, 0, .77778],
                                937: [0, .69444, 0, 0, .72222],
                                8211: [0, .44444, .02778, 0, .5],
                                8212: [0, .44444, .02778, 0, 1],
                                8216: [0, .69444, 0, 0, .27778],
                                8217: [0, .69444, 0, 0, .27778],
                                8220: [0, .69444, 0, 0, .5],
                                8221: [0, .69444, 0, 0, .5]
                            },
                            "Script-Regular": {
                                32: [0, 0, 0, 0, .25],
                                65: [0, .7, .22925, 0, .80253],
                                66: [0, .7, .04087, 0, .90757],
                                67: [0, .7, .1689, 0, .66619],
                                68: [0, .7, .09371, 0, .77443],
                                69: [0, .7, .18583, 0, .56162],
                                70: [0, .7, .13634, 0, .89544],
                                71: [0, .7, .17322, 0, .60961],
                                72: [0, .7, .29694, 0, .96919],
                                73: [0, .7, .19189, 0, .80907],
                                74: [.27778, .7, .19189, 0, 1.05159],
                                75: [0, .7, .31259, 0, .91364],
                                76: [0, .7, .19189, 0, .87373],
                                77: [0, .7, .15981, 0, 1.08031],
                                78: [0, .7, .3525, 0, .9015],
                                79: [0, .7, .08078, 0, .73787],
                                80: [0, .7, .08078, 0, 1.01262],
                                81: [0, .7, .03305, 0, .88282],
                                82: [0, .7, .06259, 0, .85],
                                83: [0, .7, .19189, 0, .86767],
                                84: [0, .7, .29087, 0, .74697],
                                85: [0, .7, .25815, 0, .79996],
                                86: [0, .7, .27523, 0, .62204],
                                87: [0, .7, .27523, 0, .80532],
                                88: [0, .7, .26006, 0, .94445],
                                89: [0, .7, .2939, 0, .70961],
                                90: [0, .7, .24037, 0, .8212],
                                160: [0, 0, 0, 0, .25]
                            },
                            "Size1-Regular": {
                                32: [0, 0, 0, 0, .25],
                                40: [.35001, .85, 0, 0, .45834],
                                41: [.35001, .85, 0, 0, .45834],
                                47: [.35001, .85, 0, 0, .57778],
                                91: [.35001, .85, 0, 0, .41667],
                                92: [.35001, .85, 0, 0, .57778],
                                93: [.35001, .85, 0, 0, .41667],
                                123: [.35001, .85, 0, 0, .58334],
                                125: [.35001, .85, 0, 0, .58334],
                                160: [0, 0, 0, 0, .25],
                                710: [0, .72222, 0, 0, .55556],
                                732: [0, .72222, 0, 0, .55556],
                                770: [0, .72222, 0, 0, .55556],
                                771: [0, .72222, 0, 0, .55556],
                                8214: [-99e-5, .601, 0, 0, .77778],
                                8593: [1e-5, .6, 0, 0, .66667],
                                8595: [1e-5, .6, 0, 0, .66667],
                                8657: [1e-5, .6, 0, 0, .77778],
                                8659: [1e-5, .6, 0, 0, .77778],
                                8719: [.25001, .75, 0, 0, .94445],
                                8720: [.25001, .75, 0, 0, .94445],
                                8721: [.25001, .75, 0, 0, 1.05556],
                                8730: [.35001, .85, 0, 0, 1],
                                8739: [-.00599, .606, 0, 0, .33333],
                                8741: [-.00599, .606, 0, 0, .55556],
                                8747: [.30612, .805, .19445, 0, .47222],
                                8748: [.306, .805, .19445, 0, .47222],
                                8749: [.306, .805, .19445, 0, .47222],
                                8750: [.30612, .805, .19445, 0, .47222],
                                8896: [.25001, .75, 0, 0, .83334],
                                8897: [.25001, .75, 0, 0, .83334],
                                8898: [.25001, .75, 0, 0, .83334],
                                8899: [.25001, .75, 0, 0, .83334],
                                8968: [.35001, .85, 0, 0, .47222],
                                8969: [.35001, .85, 0, 0, .47222],
                                8970: [.35001, .85, 0, 0, .47222],
                                8971: [.35001, .85, 0, 0, .47222],
                                9168: [-99e-5, .601, 0, 0, .66667],
                                10216: [.35001, .85, 0, 0, .47222],
                                10217: [.35001, .85, 0, 0, .47222],
                                10752: [.25001, .75, 0, 0, 1.11111],
                                10753: [.25001, .75, 0, 0, 1.11111],
                                10754: [.25001, .75, 0, 0, 1.11111],
                                10756: [.25001, .75, 0, 0, .83334],
                                10758: [.25001, .75, 0, 0, .83334]
                            },
                            "Size2-Regular": {
                                32: [0, 0, 0, 0, .25],
                                40: [.65002, 1.15, 0, 0, .59722],
                                41: [.65002, 1.15, 0, 0, .59722],
                                47: [.65002, 1.15, 0, 0, .81111],
                                91: [.65002, 1.15, 0, 0, .47222],
                                92: [.65002, 1.15, 0, 0, .81111],
                                93: [.65002, 1.15, 0, 0, .47222],
                                123: [.65002, 1.15, 0, 0, .66667],
                                125: [.65002, 1.15, 0, 0, .66667],
                                160: [0, 0, 0, 0, .25],
                                710: [0, .75, 0, 0, 1],
                                732: [0, .75, 0, 0, 1],
                                770: [0, .75, 0, 0, 1],
                                771: [0, .75, 0, 0, 1],
                                8719: [.55001, 1.05, 0, 0, 1.27778],
                                8720: [.55001, 1.05, 0, 0, 1.27778],
                                8721: [.55001, 1.05, 0, 0, 1.44445],
                                8730: [.65002, 1.15, 0, 0, 1],
                                8747: [.86225, 1.36, .44445, 0, .55556],
                                8748: [.862, 1.36, .44445, 0, .55556],
                                8749: [.862, 1.36, .44445, 0, .55556],
                                8750: [.86225, 1.36, .44445, 0, .55556],
                                8896: [.55001, 1.05, 0, 0, 1.11111],
                                8897: [.55001, 1.05, 0, 0, 1.11111],
                                8898: [.55001, 1.05, 0, 0, 1.11111],
                                8899: [.55001, 1.05, 0, 0, 1.11111],
                                8968: [.65002, 1.15, 0, 0, .52778],
                                8969: [.65002, 1.15, 0, 0, .52778],
                                8970: [.65002, 1.15, 0, 0, .52778],
                                8971: [.65002, 1.15, 0, 0, .52778],
                                10216: [.65002, 1.15, 0, 0, .61111],
                                10217: [.65002, 1.15, 0, 0, .61111],
                                10752: [.55001, 1.05, 0, 0, 1.51112],
                                10753: [.55001, 1.05, 0, 0, 1.51112],
                                10754: [.55001, 1.05, 0, 0, 1.51112],
                                10756: [.55001, 1.05, 0, 0, 1.11111],
                                10758: [.55001, 1.05, 0, 0, 1.11111]
                            },
                            "Size3-Regular": {
                                32: [0, 0, 0, 0, .25],
                                40: [.95003, 1.45, 0, 0, .73611],
                                41: [.95003, 1.45, 0, 0, .73611],
                                47: [.95003, 1.45, 0, 0, 1.04445],
                                91: [.95003, 1.45, 0, 0, .52778],
                                92: [.95003, 1.45, 0, 0, 1.04445],
                                93: [.95003, 1.45, 0, 0, .52778],
                                123: [.95003, 1.45, 0, 0, .75],
                                125: [.95003, 1.45, 0, 0, .75],
                                160: [0, 0, 0, 0, .25],
                                710: [0, .75, 0, 0, 1.44445],
                                732: [0, .75, 0, 0, 1.44445],
                                770: [0, .75, 0, 0, 1.44445],
                                771: [0, .75, 0, 0, 1.44445],
                                8730: [.95003, 1.45, 0, 0, 1],
                                8968: [.95003, 1.45, 0, 0, .58334],
                                8969: [.95003, 1.45, 0, 0, .58334],
                                8970: [.95003, 1.45, 0, 0, .58334],
                                8971: [.95003, 1.45, 0, 0, .58334],
                                10216: [.95003, 1.45, 0, 0, .75],
                                10217: [.95003, 1.45, 0, 0, .75]
                            },
                            "Size4-Regular": {
                                32: [0, 0, 0, 0, .25],
                                40: [1.25003, 1.75, 0, 0, .79167],
                                41: [1.25003, 1.75, 0, 0, .79167],
                                47: [1.25003, 1.75, 0, 0, 1.27778],
                                91: [1.25003, 1.75, 0, 0, .58334],
                                92: [1.25003, 1.75, 0, 0, 1.27778],
                                93: [1.25003, 1.75, 0, 0, .58334],
                                123: [1.25003, 1.75, 0, 0, .80556],
                                125: [1.25003, 1.75, 0, 0, .80556],
                                160: [0, 0, 0, 0, .25],
                                710: [0, .825, 0, 0, 1.8889],
                                732: [0, .825, 0, 0, 1.8889],
                                770: [0, .825, 0, 0, 1.8889],
                                771: [0, .825, 0, 0, 1.8889],
                                8730: [1.25003, 1.75, 0, 0, 1],
                                8968: [1.25003, 1.75, 0, 0, .63889],
                                8969: [1.25003, 1.75, 0, 0, .63889],
                                8970: [1.25003, 1.75, 0, 0, .63889],
                                8971: [1.25003, 1.75, 0, 0, .63889],
                                9115: [.64502, 1.155, 0, 0, .875],
                                9116: [1e-5, .6, 0, 0, .875],
                                9117: [.64502, 1.155, 0, 0, .875],
                                9118: [.64502, 1.155, 0, 0, .875],
                                9119: [1e-5, .6, 0, 0, .875],
                                9120: [.64502, 1.155, 0, 0, .875],
                                9121: [.64502, 1.155, 0, 0, .66667],
                                9122: [-99e-5, .601, 0, 0, .66667],
                                9123: [.64502, 1.155, 0, 0, .66667],
                                9124: [.64502, 1.155, 0, 0, .66667],
                                9125: [-99e-5, .601, 0, 0, .66667],
                                9126: [.64502, 1.155, 0, 0, .66667],
                                9127: [1e-5, .9, 0, 0, .88889],
                                9128: [.65002, 1.15, 0, 0, .88889],
                                9129: [.90001, 0, 0, 0, .88889],
                                9130: [0, .3, 0, 0, .88889],
                                9131: [1e-5, .9, 0, 0, .88889],
                                9132: [.65002, 1.15, 0, 0, .88889],
                                9133: [.90001, 0, 0, 0, .88889],
                                9143: [.88502, .915, 0, 0, 1.05556],
                                10216: [1.25003, 1.75, 0, 0, .80556],
                                10217: [1.25003, 1.75, 0, 0, .80556],
                                57344: [-.00499, .605, 0, 0, 1.05556],
                                57345: [-.00499, .605, 0, 0, 1.05556],
                                57680: [0, .12, 0, 0, .45],
                                57681: [0, .12, 0, 0, .45],
                                57682: [0, .12, 0, 0, .45],
                                57683: [0, .12, 0, 0, .45]
                            },
                            "Typewriter-Regular": {
                                32: [0, 0, 0, 0, .525],
                                33: [0, .61111, 0, 0, .525],
                                34: [0, .61111, 0, 0, .525],
                                35: [0, .61111, 0, 0, .525],
                                36: [.08333, .69444, 0, 0, .525],
                                37: [.08333, .69444, 0, 0, .525],
                                38: [0, .61111, 0, 0, .525],
                                39: [0, .61111, 0, 0, .525],
                                40: [.08333, .69444, 0, 0, .525],
                                41: [.08333, .69444, 0, 0, .525],
                                42: [0, .52083, 0, 0, .525],
                                43: [-.08056, .53055, 0, 0, .525],
                                44: [.13889, .125, 0, 0, .525],
                                45: [-.08056, .53055, 0, 0, .525],
                                46: [0, .125, 0, 0, .525],
                                47: [.08333, .69444, 0, 0, .525],
                                48: [0, .61111, 0, 0, .525],
                                49: [0, .61111, 0, 0, .525],
                                50: [0, .61111, 0, 0, .525],
                                51: [0, .61111, 0, 0, .525],
                                52: [0, .61111, 0, 0, .525],
                                53: [0, .61111, 0, 0, .525],
                                54: [0, .61111, 0, 0, .525],
                                55: [0, .61111, 0, 0, .525],
                                56: [0, .61111, 0, 0, .525],
                                57: [0, .61111, 0, 0, .525],
                                58: [0, .43056, 0, 0, .525],
                                59: [.13889, .43056, 0, 0, .525],
                                60: [-.05556, .55556, 0, 0, .525],
                                61: [-.19549, .41562, 0, 0, .525],
                                62: [-.05556, .55556, 0, 0, .525],
                                63: [0, .61111, 0, 0, .525],
                                64: [0, .61111, 0, 0, .525],
                                65: [0, .61111, 0, 0, .525],
                                66: [0, .61111, 0, 0, .525],
                                67: [0, .61111, 0, 0, .525],
                                68: [0, .61111, 0, 0, .525],
                                69: [0, .61111, 0, 0, .525],
                                70: [0, .61111, 0, 0, .525],
                                71: [0, .61111, 0, 0, .525],
                                72: [0, .61111, 0, 0, .525],
                                73: [0, .61111, 0, 0, .525],
                                74: [0, .61111, 0, 0, .525],
                                75: [0, .61111, 0, 0, .525],
                                76: [0, .61111, 0, 0, .525],
                                77: [0, .61111, 0, 0, .525],
                                78: [0, .61111, 0, 0, .525],
                                79: [0, .61111, 0, 0, .525],
                                80: [0, .61111, 0, 0, .525],
                                81: [.13889, .61111, 0, 0, .525],
                                82: [0, .61111, 0, 0, .525],
                                83: [0, .61111, 0, 0, .525],
                                84: [0, .61111, 0, 0, .525],
                                85: [0, .61111, 0, 0, .525],
                                86: [0, .61111, 0, 0, .525],
                                87: [0, .61111, 0, 0, .525],
                                88: [0, .61111, 0, 0, .525],
                                89: [0, .61111, 0, 0, .525],
                                90: [0, .61111, 0, 0, .525],
                                91: [.08333, .69444, 0, 0, .525],
                                92: [.08333, .69444, 0, 0, .525],
                                93: [.08333, .69444, 0, 0, .525],
                                94: [0, .61111, 0, 0, .525],
                                95: [.09514, 0, 0, 0, .525],
                                96: [0, .61111, 0, 0, .525],
                                97: [0, .43056, 0, 0, .525],
                                98: [0, .61111, 0, 0, .525],
                                99: [0, .43056, 0, 0, .525],
                                100: [0, .61111, 0, 0, .525],
                                101: [0, .43056, 0, 0, .525],
                                102: [0, .61111, 0, 0, .525],
                                103: [.22222, .43056, 0, 0, .525],
                                104: [0, .61111, 0, 0, .525],
                                105: [0, .61111, 0, 0, .525],
                                106: [.22222, .61111, 0, 0, .525],
                                107: [0, .61111, 0, 0, .525],
                                108: [0, .61111, 0, 0, .525],
                                109: [0, .43056, 0, 0, .525],
                                110: [0, .43056, 0, 0, .525],
                                111: [0, .43056, 0, 0, .525],
                                112: [.22222, .43056, 0, 0, .525],
                                113: [.22222, .43056, 0, 0, .525],
                                114: [0, .43056, 0, 0, .525],
                                115: [0, .43056, 0, 0, .525],
                                116: [0, .55358, 0, 0, .525],
                                117: [0, .43056, 0, 0, .525],
                                118: [0, .43056, 0, 0, .525],
                                119: [0, .43056, 0, 0, .525],
                                120: [0, .43056, 0, 0, .525],
                                121: [.22222, .43056, 0, 0, .525],
                                122: [0, .43056, 0, 0, .525],
                                123: [.08333, .69444, 0, 0, .525],
                                124: [.08333, .69444, 0, 0, .525],
                                125: [.08333, .69444, 0, 0, .525],
                                126: [0, .61111, 0, 0, .525],
                                127: [0, .61111, 0, 0, .525],
                                160: [0, 0, 0, 0, .525],
                                176: [0, .61111, 0, 0, .525],
                                184: [.19445, 0, 0, 0, .525],
                                305: [0, .43056, 0, 0, .525],
                                567: [.22222, .43056, 0, 0, .525],
                                711: [0, .56597, 0, 0, .525],
                                713: [0, .56555, 0, 0, .525],
                                714: [0, .61111, 0, 0, .525],
                                715: [0, .61111, 0, 0, .525],
                                728: [0, .61111, 0, 0, .525],
                                730: [0, .61111, 0, 0, .525],
                                770: [0, .61111, 0, 0, .525],
                                771: [0, .61111, 0, 0, .525],
                                776: [0, .61111, 0, 0, .525],
                                915: [0, .61111, 0, 0, .525],
                                916: [0, .61111, 0, 0, .525],
                                920: [0, .61111, 0, 0, .525],
                                923: [0, .61111, 0, 0, .525],
                                926: [0, .61111, 0, 0, .525],
                                928: [0, .61111, 0, 0, .525],
                                931: [0, .61111, 0, 0, .525],
                                933: [0, .61111, 0, 0, .525],
                                934: [0, .61111, 0, 0, .525],
                                936: [0, .61111, 0, 0, .525],
                                937: [0, .61111, 0, 0, .525],
                                8216: [0, .61111, 0, 0, .525],
                                8217: [0, .61111, 0, 0, .525],
                                8242: [0, .61111, 0, 0, .525],
                                9251: [.11111, .21944, 0, 0, .525]
                            }
                        };
                        const T = {
                            slant: [.25, .25, .25],
                            space: [0, 0, 0],
                            stretch: [0, 0, 0],
                            shrink: [0, 0, 0],
                            xHeight: [.431, .431, .431],
                            quad: [1, 1.171, 1.472],
                            extraSpace: [0, 0, 0],
                            num1: [.677, .732, .925],
                            num2: [.394, .384, .387],
                            num3: [.444, .471, .504],
                            denom1: [.686, .752, 1.025],
                            denom2: [.345, .344, .532],
                            sup1: [.413, .503, .504],
                            sup2: [.363, .431, .404],
                            sup3: [.289, .286, .294],
                            sub1: [.15, .143, .2],
                            sub2: [.247, .286, .4],
                            supDrop: [.386, .353, .494],
                            subDrop: [.05, .071, .1],
                            delim1: [2.39, 1.7, 1.98],
                            delim2: [1.01, 1.157, 1.42],
                            axisHeight: [.25, .25, .25],
                            defaultRuleThickness: [.04, .049, .049],
                            bigOpSpacing1: [.111, .111, .111],
                            bigOpSpacing2: [.166, .166, .166],
                            bigOpSpacing3: [.2, .2, .2],
                            bigOpSpacing4: [.6, .611, .611],
                            bigOpSpacing5: [.1, .143, .143],
                            sqrtRuleThickness: [.04, .04, .04],
                            ptPerEm: [10, 10, 10],
                            doubleRuleSep: [.2, .2, .2],
                            arrayRuleWidth: [.04, .04, .04],
                            fboxsep: [.3, .3, .3],
                            fboxrule: [.04, .04, .04]
                        }
                          , B = {
                            "Å": "A",
                            "Ð": "D",
                            "Þ": "o",
                            "å": "a",
                            "ð": "d",
                            "þ": "o",
                            "А": "A",
                            "Б": "B",
                            "В": "B",
                            "Г": "F",
                            "Д": "A",
                            "Е": "E",
                            "Ж": "K",
                            "З": "3",
                            "И": "N",
                            "Й": "N",
                            "К": "K",
                            "Л": "N",
                            "М": "M",
                            "Н": "H",
                            "О": "O",
                            "П": "N",
                            "Р": "P",
                            "С": "C",
                            "Т": "T",
                            "У": "y",
                            "Ф": "O",
                            "Х": "X",
                            "Ц": "U",
                            "Ч": "h",
                            "Ш": "W",
                            "Щ": "W",
                            "Ъ": "B",
                            "Ы": "X",
                            "Ь": "B",
                            "Э": "3",
                            "Ю": "X",
                            "Я": "R",
                            "а": "a",
                            "б": "b",
                            "в": "a",
                            "г": "r",
                            "д": "y",
                            "е": "e",
                            "ж": "m",
                            "з": "e",
                            "и": "n",
                            "й": "n",
                            "к": "n",
                            "л": "n",
                            "м": "m",
                            "н": "n",
                            "о": "o",
                            "п": "n",
                            "р": "p",
                            "с": "c",
                            "т": "o",
                            "у": "y",
                            "ф": "b",
                            "х": "x",
                            "ц": "n",
                            "ч": "n",
                            "ш": "w",
                            "щ": "w",
                            "ъ": "a",
                            "ы": "m",
                            "ь": "a",
                            "э": "e",
                            "ю": "m",
                            "я": "r"
                        };
                        function C(e, t, r) {
                            if (!A[t])
                                throw new Error("Font metrics not found for font: " + t + ".");
                            let n = e.charCodeAt(0)
                              , o = A[t][n];
                            if (!o && e[0]in B && (n = B[e[0]].charCodeAt(0),
                            o = A[t][n]),
                            o || "text" !== r || S(n) && (o = A[t][77]),
                            o)
                                return {
                                    depth: o[0],
                                    height: o[1],
                                    italic: o[2],
                                    skew: o[3],
                                    width: o[4]
                                }
                        }
                        const N = {}
                          , q = [[1, 1, 1], [2, 1, 1], [3, 1, 1], [4, 2, 1], [5, 2, 1], [6, 3, 1], [7, 4, 2], [8, 6, 3], [9, 7, 6], [10, 8, 7], [11, 10, 9]]
                          , I = [.5, .6, .7, .8, .9, 1, 1.2, 1.44, 1.728, 2.074, 2.488]
                          , R = function(e, t) {
                            return t.size < 2 ? e : q[e - 1][t.size - 1]
                        };
                        class H {
                            constructor(e) {
                                this.style = void 0,
                                this.color = void 0,
                                this.size = void 0,
                                this.textSize = void 0,
                                this.phantom = void 0,
                                this.font = void 0,
                                this.fontFamily = void 0,
                                this.fontWeight = void 0,
                                this.fontShape = void 0,
                                this.sizeMultiplier = void 0,
                                this.maxSize = void 0,
                                this.minRuleThickness = void 0,
                                this._fontMetrics = void 0,
                                this.style = e.style,
                                this.color = e.color,
                                this.size = e.size || H.BASESIZE,
                                this.textSize = e.textSize || this.size,
                                this.phantom = !!e.phantom,
                                this.font = e.font || "",
                                this.fontFamily = e.fontFamily || "",
                                this.fontWeight = e.fontWeight || "",
                                this.fontShape = e.fontShape || "",
                                this.sizeMultiplier = I[this.size - 1],
                                this.maxSize = e.maxSize,
                                this.minRuleThickness = e.minRuleThickness,
                                this._fontMetrics = void 0
                            }
                            extend(e) {
                                const t = {
                                    style: this.style,
                                    size: this.size,
                                    textSize: this.textSize,
                                    color: this.color,
                                    phantom: this.phantom,
                                    font: this.font,
                                    fontFamily: this.fontFamily,
                                    fontWeight: this.fontWeight,
                                    fontShape: this.fontShape,
                                    maxSize: this.maxSize,
                                    minRuleThickness: this.minRuleThickness
                                };
                                for (const r in e)
                                    e.hasOwnProperty(r) && (t[r] = e[r]);
                                return new H(t)
                            }
                            havingStyle(e) {
                                return this.style === e ? this : this.extend({
                                    style: e,
                                    size: R(this.textSize, e)
                                })
                            }
                            havingCrampedStyle() {
                                return this.havingStyle(this.style.cramp())
                            }
                            havingSize(e) {
                                return this.size === e && this.textSize === e ? this : this.extend({
                                    style: this.style.text(),
                                    size: e,
                                    textSize: e,
                                    sizeMultiplier: I[e - 1]
                                })
                            }
                            havingBaseStyle(e) {
                                e = e || this.style.text();
                                const t = R(H.BASESIZE, e);
                                return this.size === t && this.textSize === H.BASESIZE && this.style === e ? this : this.extend({
                                    style: e,
                                    size: t
                                })
                            }
                            havingBaseSizing() {
                                let e;
                                switch (this.style.id) {
                                case 4:
                                case 5:
                                    e = 3;
                                    break;
                                case 6:
                                case 7:
                                    e = 1;
                                    break;
                                default:
                                    e = 6
                                }
                                return this.extend({
                                    style: this.style.text(),
                                    size: e
                                })
                            }
                            withColor(e) {
                                return this.extend({
                                    color: e
                                })
                            }
                            withPhantom() {
                                return this.extend({
                                    phantom: !0
                                })
                            }
                            withFont(e) {
                                return this.extend({
                                    font: e
                                })
                            }
                            withTextFontFamily(e) {
                                return this.extend({
                                    fontFamily: e,
                                    font: ""
                                })
                            }
                            withTextFontWeight(e) {
                                return this.extend({
                                    fontWeight: e,
                                    font: ""
                                })
                            }
                            withTextFontShape(e) {
                                return this.extend({
                                    fontShape: e,
                                    font: ""
                                })
                            }
                            sizingClasses(e) {
                                return e.size !== this.size ? ["sizing", "reset-size" + e.size, "size" + this.size] : []
                            }
                            baseSizingClasses() {
                                return this.size !== H.BASESIZE ? ["sizing", "reset-size" + this.size, "size" + H.BASESIZE] : []
                            }
                            fontMetrics() {
                                return this._fontMetrics || (this._fontMetrics = function(e) {
                                    let t;
                                    if (t = e >= 5 ? 0 : e >= 3 ? 1 : 2,
                                    !N[t]) {
                                        const e = N[t] = {
                                            cssEmPerMu: T.quad[t] / 18
                                        };
                                        for (const r in T)
                                            T.hasOwnProperty(r) && (e[r] = T[r][t])
                                    }
                                    return N[t]
                                }(this.size)),
                                this._fontMetrics
                            }
                            getColor() {
                                return this.phantom ? "transparent" : this.color
                            }
                        }
                        H.BASESIZE = 6;
                        var O = H;
                        const E = {
                            pt: 1,
                            mm: 7227 / 2540,
                            cm: 7227 / 254,
                            in: 72.27,
                            bp: 1.00375,
                            pc: 12,
                            dd: 1238 / 1157,
                            cc: 14856 / 1157,
                            nd: 685 / 642,
                            nc: 1370 / 107,
                            sp: 1 / 65536,
                            px: 1.00375
                        }
                          , L = {
                            ex: !0,
                            em: !0,
                            mu: !0
                        }
                          , D = function(e) {
                            return "string" != typeof e && (e = e.unit),
                            e in E || e in L || "ex" === e
                        }
                          , P = function(e, t) {
                            let r;
                            if (e.unit in E)
                                r = E[e.unit] / t.fontMetrics().ptPerEm / t.sizeMultiplier;
                            else if ("mu" === e.unit)
                                r = t.fontMetrics().cssEmPerMu;
                            else {
                                let o;
                                if (o = t.style.isTight() ? t.havingStyle(t.style.text()) : t,
                                "ex" === e.unit)
                                    r = o.fontMetrics().xHeight;
                                else {
                                    if ("em" !== e.unit)
                                        throw new n("Invalid unit: '" + e.unit + "'");
                                    r = o.fontMetrics().quad
                                }
                                o !== t && (r *= o.sizeMultiplier / t.sizeMultiplier)
                            }
                            return Math.min(e.number * r, t.maxSize)
                        }
                          , V = function(e) {
                            return +e.toFixed(4) + "em"
                        }
                          , F = function(e) {
                            return e.filter((e => e)).join(" ")
                        }
                          , G = function(e, t, r) {
                            if (this.classes = e || [],
                            this.attributes = {},
                            this.height = 0,
                            this.depth = 0,
                            this.maxFontSize = 0,
                            this.style = r || {},
                            t) {
                                t.style.isTight() && this.classes.push("mtight");
                                const e = t.getColor();
                                e && (this.style.color = e)
                            }
                        }
                          , U = function(e) {
                            const t = document.createElement(e);
                            t.className = F(this.classes);
                            for (const e in this.style)
                                this.style.hasOwnProperty(e) && (t.style[e] = this.style[e]);
                            for (const e in this.attributes)
                                this.attributes.hasOwnProperty(e) && t.setAttribute(e, this.attributes[e]);
                            for (let e = 0; e < this.children.length; e++)
                                t.appendChild(this.children[e].toNode());
                            return t
                        }
                          , Y = function(e) {
                            let t = "<" + e;
                            this.classes.length && (t += ' class="' + l.escape(F(this.classes)) + '"');
                            let r = "";
                            for (const e in this.style)
                                this.style.hasOwnProperty(e) && (r += l.hyphenate(e) + ":" + this.style[e] + ";");
                            r && (t += ' style="' + l.escape(r) + '"');
                            for (const e in this.attributes)
                                this.attributes.hasOwnProperty(e) && (t += " " + e + '="' + l.escape(this.attributes[e]) + '"');
                            t += ">";
                            for (let e = 0; e < this.children.length; e++)
                                t += this.children[e].toMarkup();
                            return t += "</" + e + ">",
                            t
                        };
                        class X {
                            constructor(e, t, r, n) {
                                this.children = void 0,
                                this.attributes = void 0,
                                this.classes = void 0,
                                this.height = void 0,
                                this.depth = void 0,
                                this.width = void 0,
                                this.maxFontSize = void 0,
                                this.style = void 0,
                                G.call(this, e, r, n),
                                this.children = t || []
                            }
                            setAttribute(e, t) {
                                this.attributes[e] = t
                            }
                            hasClass(e) {
                                return l.contains(this.classes, e)
                            }
                            toNode() {
                                return U.call(this, "span")
                            }
                            toMarkup() {
                                return Y.call(this, "span")
                            }
                        }
                        class W {
                            constructor(e, t, r, n) {
                                this.children = void 0,
                                this.attributes = void 0,
                                this.classes = void 0,
                                this.height = void 0,
                                this.depth = void 0,
                                this.maxFontSize = void 0,
                                this.style = void 0,
                                G.call(this, t, n),
                                this.children = r || [],
                                this.setAttribute("href", e)
                            }
                            setAttribute(e, t) {
                                this.attributes[e] = t
                            }
                            hasClass(e) {
                                return l.contains(this.classes, e)
                            }
                            toNode() {
                                return U.call(this, "a")
                            }
                            toMarkup() {
                                return Y.call(this, "a")
                            }
                        }
                        class _ {
                            constructor(e, t, r) {
                                this.src = void 0,
                                this.alt = void 0,
                                this.classes = void 0,
                                this.height = void 0,
                                this.depth = void 0,
                                this.maxFontSize = void 0,
                                this.style = void 0,
                                this.alt = t,
                                this.src = e,
                                this.classes = ["mord"],
                                this.style = r
                            }
                            hasClass(e) {
                                return l.contains(this.classes, e)
                            }
                            toNode() {
                                const e = document.createElement("img");
                                e.src = this.src,
                                e.alt = this.alt,
                                e.className = "mord";
                                for (const t in this.style)
                                    this.style.hasOwnProperty(t) && (e.style[t] = this.style[t]);
                                return e
                            }
                            toMarkup() {
                                let e = '<img src="' + l.escape(this.src) + '" alt="' + l.escape(this.alt) + '"'
                                  , t = "";
                                for (const e in this.style)
                                    this.style.hasOwnProperty(e) && (t += l.hyphenate(e) + ":" + this.style[e] + ";");
                                return t && (e += ' style="' + l.escape(t) + '"'),
                                e += "'/>",
                                e
                            }
                        }
                        const j = {
                            "î": "ı̂",
                            "ï": "ı̈",
                            "í": "ı́",
                            "ì": "ı̀"
                        };
                        class $ {
                            constructor(e, t, r, n, o, s, i, a) {
                                this.text = void 0,
                                this.height = void 0,
                                this.depth = void 0,
                                this.italic = void 0,
                                this.skew = void 0,
                                this.width = void 0,
                                this.maxFontSize = void 0,
                                this.classes = void 0,
                                this.style = void 0,
                                this.text = e,
                                this.height = t || 0,
                                this.depth = r || 0,
                                this.italic = n || 0,
                                this.skew = o || 0,
                                this.width = s || 0,
                                this.classes = i || [],
                                this.style = a || {},
                                this.maxFontSize = 0;
                                const l = function(e) {
                                    for (let t = 0; t < v.length; t++) {
                                        const r = v[t];
                                        for (let t = 0; t < r.blocks.length; t++) {
                                            const n = r.blocks[t];
                                            if (e >= n[0] && e <= n[1])
                                                return r.name
                                        }
                                    }
                                    return null
                                }(this.text.charCodeAt(0));
                                l && this.classes.push(l + "_fallback"),
                                /[îïíì]/.test(this.text) && (this.text = j[this.text])
                            }
                            hasClass(e) {
                                return l.contains(this.classes, e)
                            }
                            toNode() {
                                const e = document.createTextNode(this.text);
                                let t = null;
                                this.italic > 0 && (t = document.createElement("span"),
                                t.style.marginRight = V(this.italic)),
                                this.classes.length > 0 && (t = t || document.createElement("span"),
                                t.className = F(this.classes));
                                for (const e in this.style)
                                    this.style.hasOwnProperty(e) && (t = t || document.createElement("span"),
                                    t.style[e] = this.style[e]);
                                return t ? (t.appendChild(e),
                                t) : e
                            }
                            toMarkup() {
                                let e = !1
                                  , t = "<span";
                                this.classes.length && (e = !0,
                                t += ' class="',
                                t += l.escape(F(this.classes)),
                                t += '"');
                                let r = "";
                                this.italic > 0 && (r += "margin-right:" + this.italic + "em;");
                                for (const e in this.style)
                                    this.style.hasOwnProperty(e) && (r += l.hyphenate(e) + ":" + this.style[e] + ";");
                                r && (e = !0,
                                t += ' style="' + l.escape(r) + '"');
                                const n = l.escape(this.text);
                                return e ? (t += ">",
                                t += n,
                                t += "</span>",
                                t) : n
                            }
                        }
                        class Z {
                            constructor(e, t) {
                                this.children = void 0,
                                this.attributes = void 0,
                                this.children = e || [],
                                this.attributes = t || {}
                            }
                            toNode() {
                                const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                                for (const t in this.attributes)
                                    Object.prototype.hasOwnProperty.call(this.attributes, t) && e.setAttribute(t, this.attributes[t]);
                                for (let t = 0; t < this.children.length; t++)
                                    e.appendChild(this.children[t].toNode());
                                return e
                            }
                            toMarkup() {
                                let e = '<svg xmlns="http://www.w3.org/2000/svg"';
                                for (const t in this.attributes)
                                    Object.prototype.hasOwnProperty.call(this.attributes, t) && (e += " " + t + '="' + l.escape(this.attributes[t]) + '"');
                                e += ">";
                                for (let t = 0; t < this.children.length; t++)
                                    e += this.children[t].toMarkup();
                                return e += "</svg>",
                                e
                            }
                        }
                        class K {
                            constructor(e, t) {
                                this.pathName = void 0,
                                this.alternate = void 0,
                                this.pathName = e,
                                this.alternate = t
                            }
                            toNode() {
                                const e = document.createElementNS("http://www.w3.org/2000/svg", "path");
                                return this.alternate ? e.setAttribute("d", this.alternate) : e.setAttribute("d", M[this.pathName]),
                                e
                            }
                            toMarkup() {
                                return this.alternate ? '<path d="' + l.escape(this.alternate) + '"/>' : '<path d="' + l.escape(M[this.pathName]) + '"/>'
                            }
                        }
                        class J {
                            constructor(e) {
                                this.attributes = void 0,
                                this.attributes = e || {}
                            }
                            toNode() {
                                const e = document.createElementNS("http://www.w3.org/2000/svg", "line");
                                for (const t in this.attributes)
                                    Object.prototype.hasOwnProperty.call(this.attributes, t) && e.setAttribute(t, this.attributes[t]);
                                return e
                            }
                            toMarkup() {
                                let e = "<line";
                                for (const t in this.attributes)
                                    Object.prototype.hasOwnProperty.call(this.attributes, t) && (e += " " + t + '="' + l.escape(this.attributes[t]) + '"');
                                return e += "/>",
                                e
                            }
                        }
                        function Q(e) {
                            if (e instanceof $)
                                return e;
                            throw new Error("Expected symbolNode but got " + String(e) + ".")
                        }
                        const ee = {
                            bin: 1,
                            close: 1,
                            inner: 1,
                            open: 1,
                            punct: 1,
                            rel: 1
                        }
                          , te = {
                            "accent-token": 1,
                            mathord: 1,
                            "op-token": 1,
                            spacing: 1,
                            textord: 1
                        }
                          , re = {
                            math: {},
                            text: {}
                        };
                        var ne = re;
                        function oe(e, t, r, n, o, s) {
                            re[e][o] = {
                                font: t,
                                group: r,
                                replace: n
                            },
                            s && n && (re[e][n] = re[e][o])
                        }
                        const se = "math"
                          , ie = "text"
                          , ae = "main"
                          , le = "ams"
                          , he = "accent-token"
                          , ce = "bin"
                          , me = "close"
                          , pe = "inner"
                          , ue = "mathord"
                          , de = "op-token"
                          , ge = "open"
                          , fe = "punct"
                          , be = "rel"
                          , ye = "spacing"
                          , xe = "textord";
                        oe(se, ae, be, "≡", "\\equiv", !0),
                        oe(se, ae, be, "≺", "\\prec", !0),
                        oe(se, ae, be, "≻", "\\succ", !0),
                        oe(se, ae, be, "∼", "\\sim", !0),
                        oe(se, ae, be, "⊥", "\\perp"),
                        oe(se, ae, be, "⪯", "\\preceq", !0),
                        oe(se, ae, be, "⪰", "\\succeq", !0),
                        oe(se, ae, be, "≃", "\\simeq", !0),
                        oe(se, ae, be, "∣", "\\mid", !0),
                        oe(se, ae, be, "≪", "\\ll", !0),
                        oe(se, ae, be, "≫", "\\gg", !0),
                        oe(se, ae, be, "≍", "\\asymp", !0),
                        oe(se, ae, be, "∥", "\\parallel"),
                        oe(se, ae, be, "⋈", "\\bowtie", !0),
                        oe(se, ae, be, "⌣", "\\smile", !0),
                        oe(se, ae, be, "⊑", "\\sqsubseteq", !0),
                        oe(se, ae, be, "⊒", "\\sqsupseteq", !0),
                        oe(se, ae, be, "≐", "\\doteq", !0),
                        oe(se, ae, be, "⌢", "\\frown", !0),
                        oe(se, ae, be, "∋", "\\ni", !0),
                        oe(se, ae, be, "∝", "\\propto", !0),
                        oe(se, ae, be, "⊢", "\\vdash", !0),
                        oe(se, ae, be, "⊣", "\\dashv", !0),
                        oe(se, ae, be, "∋", "\\owns"),
                        oe(se, ae, fe, ".", "\\ldotp"),
                        oe(se, ae, fe, "⋅", "\\cdotp"),
                        oe(se, ae, xe, "#", "\\#"),
                        oe(ie, ae, xe, "#", "\\#"),
                        oe(se, ae, xe, "&", "\\&"),
                        oe(ie, ae, xe, "&", "\\&"),
                        oe(se, ae, xe, "ℵ", "\\aleph", !0),
                        oe(se, ae, xe, "∀", "\\forall", !0),
                        oe(se, ae, xe, "ℏ", "\\hbar", !0),
                        oe(se, ae, xe, "∃", "\\exists", !0),
                        oe(se, ae, xe, "∇", "\\nabla", !0),
                        oe(se, ae, xe, "♭", "\\flat", !0),
                        oe(se, ae, xe, "ℓ", "\\ell", !0),
                        oe(se, ae, xe, "♮", "\\natural", !0),
                        oe(se, ae, xe, "♣", "\\clubsuit", !0),
                        oe(se, ae, xe, "℘", "\\wp", !0),
                        oe(se, ae, xe, "♯", "\\sharp", !0),
                        oe(se, ae, xe, "♢", "\\diamondsuit", !0),
                        oe(se, ae, xe, "ℜ", "\\Re", !0),
                        oe(se, ae, xe, "♡", "\\heartsuit", !0),
                        oe(se, ae, xe, "ℑ", "\\Im", !0),
                        oe(se, ae, xe, "♠", "\\spadesuit", !0),
                        oe(se, ae, xe, "§", "\\S", !0),
                        oe(ie, ae, xe, "§", "\\S"),
                        oe(se, ae, xe, "¶", "\\P", !0),
                        oe(ie, ae, xe, "¶", "\\P"),
                        oe(se, ae, xe, "†", "\\dag"),
                        oe(ie, ae, xe, "†", "\\dag"),
                        oe(ie, ae, xe, "†", "\\textdagger"),
                        oe(se, ae, xe, "‡", "\\ddag"),
                        oe(ie, ae, xe, "‡", "\\ddag"),
                        oe(ie, ae, xe, "‡", "\\textdaggerdbl"),
                        oe(se, ae, me, "⎱", "\\rmoustache", !0),
                        oe(se, ae, ge, "⎰", "\\lmoustache", !0),
                        oe(se, ae, me, "⟯", "\\rgroup", !0),
                        oe(se, ae, ge, "⟮", "\\lgroup", !0),
                        oe(se, ae, ce, "∓", "\\mp", !0),
                        oe(se, ae, ce, "⊖", "\\ominus", !0),
                        oe(se, ae, ce, "⊎", "\\uplus", !0),
                        oe(se, ae, ce, "⊓", "\\sqcap", !0),
                        oe(se, ae, ce, "∗", "\\ast"),
                        oe(se, ae, ce, "⊔", "\\sqcup", !0),
                        oe(se, ae, ce, "◯", "\\bigcirc", !0),
                        oe(se, ae, ce, "∙", "\\bullet", !0),
                        oe(se, ae, ce, "‡", "\\ddagger"),
                        oe(se, ae, ce, "≀", "\\wr", !0),
                        oe(se, ae, ce, "⨿", "\\amalg"),
                        oe(se, ae, ce, "&", "\\And"),
                        oe(se, ae, be, "⟵", "\\longleftarrow", !0),
                        oe(se, ae, be, "⇐", "\\Leftarrow", !0),
                        oe(se, ae, be, "⟸", "\\Longleftarrow", !0),
                        oe(se, ae, be, "⟶", "\\longrightarrow", !0),
                        oe(se, ae, be, "⇒", "\\Rightarrow", !0),
                        oe(se, ae, be, "⟹", "\\Longrightarrow", !0),
                        oe(se, ae, be, "↔", "\\leftrightarrow", !0),
                        oe(se, ae, be, "⟷", "\\longleftrightarrow", !0),
                        oe(se, ae, be, "⇔", "\\Leftrightarrow", !0),
                        oe(se, ae, be, "⟺", "\\Longleftrightarrow", !0),
                        oe(se, ae, be, "↦", "\\mapsto", !0),
                        oe(se, ae, be, "⟼", "\\longmapsto", !0),
                        oe(se, ae, be, "↗", "\\nearrow", !0),
                        oe(se, ae, be, "↩", "\\hookleftarrow", !0),
                        oe(se, ae, be, "↪", "\\hookrightarrow", !0),
                        oe(se, ae, be, "↘", "\\searrow", !0),
                        oe(se, ae, be, "↼", "\\leftharpoonup", !0),
                        oe(se, ae, be, "⇀", "\\rightharpoonup", !0),
                        oe(se, ae, be, "↙", "\\swarrow", !0),
                        oe(se, ae, be, "↽", "\\leftharpoondown", !0),
                        oe(se, ae, be, "⇁", "\\rightharpoondown", !0),
                        oe(se, ae, be, "↖", "\\nwarrow", !0),
                        oe(se, ae, be, "⇌", "\\rightleftharpoons", !0),
                        oe(se, le, be, "≮", "\\nless", !0),
                        oe(se, le, be, "", "\\@nleqslant"),
                        oe(se, le, be, "", "\\@nleqq"),
                        oe(se, le, be, "⪇", "\\lneq", !0),
                        oe(se, le, be, "≨", "\\lneqq", !0),
                        oe(se, le, be, "", "\\@lvertneqq"),
                        oe(se, le, be, "⋦", "\\lnsim", !0),
                        oe(se, le, be, "⪉", "\\lnapprox", !0),
                        oe(se, le, be, "⊀", "\\nprec", !0),
                        oe(se, le, be, "⋠", "\\npreceq", !0),
                        oe(se, le, be, "⋨", "\\precnsim", !0),
                        oe(se, le, be, "⪹", "\\precnapprox", !0),
                        oe(se, le, be, "≁", "\\nsim", !0),
                        oe(se, le, be, "", "\\@nshortmid"),
                        oe(se, le, be, "∤", "\\nmid", !0),
                        oe(se, le, be, "⊬", "\\nvdash", !0),
                        oe(se, le, be, "⊭", "\\nvDash", !0),
                        oe(se, le, be, "⋪", "\\ntriangleleft"),
                        oe(se, le, be, "⋬", "\\ntrianglelefteq", !0),
                        oe(se, le, be, "⊊", "\\subsetneq", !0),
                        oe(se, le, be, "", "\\@varsubsetneq"),
                        oe(se, le, be, "⫋", "\\subsetneqq", !0),
                        oe(se, le, be, "", "\\@varsubsetneqq"),
                        oe(se, le, be, "≯", "\\ngtr", !0),
                        oe(se, le, be, "", "\\@ngeqslant"),
                        oe(se, le, be, "", "\\@ngeqq"),
                        oe(se, le, be, "⪈", "\\gneq", !0),
                        oe(se, le, be, "≩", "\\gneqq", !0),
                        oe(se, le, be, "", "\\@gvertneqq"),
                        oe(se, le, be, "⋧", "\\gnsim", !0),
                        oe(se, le, be, "⪊", "\\gnapprox", !0),
                        oe(se, le, be, "⊁", "\\nsucc", !0),
                        oe(se, le, be, "⋡", "\\nsucceq", !0),
                        oe(se, le, be, "⋩", "\\succnsim", !0),
                        oe(se, le, be, "⪺", "\\succnapprox", !0),
                        oe(se, le, be, "≆", "\\ncong", !0),
                        oe(se, le, be, "", "\\@nshortparallel"),
                        oe(se, le, be, "∦", "\\nparallel", !0),
                        oe(se, le, be, "⊯", "\\nVDash", !0),
                        oe(se, le, be, "⋫", "\\ntriangleright"),
                        oe(se, le, be, "⋭", "\\ntrianglerighteq", !0),
                        oe(se, le, be, "", "\\@nsupseteqq"),
                        oe(se, le, be, "⊋", "\\supsetneq", !0),
                        oe(se, le, be, "", "\\@varsupsetneq"),
                        oe(se, le, be, "⫌", "\\supsetneqq", !0),
                        oe(se, le, be, "", "\\@varsupsetneqq"),
                        oe(se, le, be, "⊮", "\\nVdash", !0),
                        oe(se, le, be, "⪵", "\\precneqq", !0),
                        oe(se, le, be, "⪶", "\\succneqq", !0),
                        oe(se, le, be, "", "\\@nsubseteqq"),
                        oe(se, le, ce, "⊴", "\\unlhd"),
                        oe(se, le, ce, "⊵", "\\unrhd"),
                        oe(se, le, be, "↚", "\\nleftarrow", !0),
                        oe(se, le, be, "↛", "\\nrightarrow", !0),
                        oe(se, le, be, "⇍", "\\nLeftarrow", !0),
                        oe(se, le, be, "⇏", "\\nRightarrow", !0),
                        oe(se, le, be, "↮", "\\nleftrightarrow", !0),
                        oe(se, le, be, "⇎", "\\nLeftrightarrow", !0),
                        oe(se, le, be, "△", "\\vartriangle"),
                        oe(se, le, xe, "ℏ", "\\hslash"),
                        oe(se, le, xe, "▽", "\\triangledown"),
                        oe(se, le, xe, "◊", "\\lozenge"),
                        oe(se, le, xe, "Ⓢ", "\\circledS"),
                        oe(se, le, xe, "®", "\\circledR"),
                        oe(ie, le, xe, "®", "\\circledR"),
                        oe(se, le, xe, "∡", "\\measuredangle", !0),
                        oe(se, le, xe, "∄", "\\nexists"),
                        oe(se, le, xe, "℧", "\\mho"),
                        oe(se, le, xe, "Ⅎ", "\\Finv", !0),
                        oe(se, le, xe, "⅁", "\\Game", !0),
                        oe(se, le, xe, "‵", "\\backprime"),
                        oe(se, le, xe, "▲", "\\blacktriangle"),
                        oe(se, le, xe, "▼", "\\blacktriangledown"),
                        oe(se, le, xe, "■", "\\blacksquare"),
                        oe(se, le, xe, "⧫", "\\blacklozenge"),
                        oe(se, le, xe, "★", "\\bigstar"),
                        oe(se, le, xe, "∢", "\\sphericalangle", !0),
                        oe(se, le, xe, "∁", "\\complement", !0),
                        oe(se, le, xe, "ð", "\\eth", !0),
                        oe(ie, ae, xe, "ð", "ð"),
                        oe(se, le, xe, "╱", "\\diagup"),
                        oe(se, le, xe, "╲", "\\diagdown"),
                        oe(se, le, xe, "□", "\\square"),
                        oe(se, le, xe, "□", "\\Box"),
                        oe(se, le, xe, "◊", "\\Diamond"),
                        oe(se, le, xe, "¥", "\\yen", !0),
                        oe(ie, le, xe, "¥", "\\yen", !0),
                        oe(se, le, xe, "✓", "\\checkmark", !0),
                        oe(ie, le, xe, "✓", "\\checkmark"),
                        oe(se, le, xe, "ℶ", "\\beth", !0),
                        oe(se, le, xe, "ℸ", "\\daleth", !0),
                        oe(se, le, xe, "ℷ", "\\gimel", !0),
                        oe(se, le, xe, "ϝ", "\\digamma", !0),
                        oe(se, le, xe, "ϰ", "\\varkappa"),
                        oe(se, le, ge, "┌", "\\@ulcorner", !0),
                        oe(se, le, me, "┐", "\\@urcorner", !0),
                        oe(se, le, ge, "└", "\\@llcorner", !0),
                        oe(se, le, me, "┘", "\\@lrcorner", !0),
                        oe(se, le, be, "≦", "\\leqq", !0),
                        oe(se, le, be, "⩽", "\\leqslant", !0),
                        oe(se, le, be, "⪕", "\\eqslantless", !0),
                        oe(se, le, be, "≲", "\\lesssim", !0),
                        oe(se, le, be, "⪅", "\\lessapprox", !0),
                        oe(se, le, be, "≊", "\\approxeq", !0),
                        oe(se, le, ce, "⋖", "\\lessdot"),
                        oe(se, le, be, "⋘", "\\lll", !0),
                        oe(se, le, be, "≶", "\\lessgtr", !0),
                        oe(se, le, be, "⋚", "\\lesseqgtr", !0),
                        oe(se, le, be, "⪋", "\\lesseqqgtr", !0),
                        oe(se, le, be, "≑", "\\doteqdot"),
                        oe(se, le, be, "≓", "\\risingdotseq", !0),
                        oe(se, le, be, "≒", "\\fallingdotseq", !0),
                        oe(se, le, be, "∽", "\\backsim", !0),
                        oe(se, le, be, "⋍", "\\backsimeq", !0),
                        oe(se, le, be, "⫅", "\\subseteqq", !0),
                        oe(se, le, be, "⋐", "\\Subset", !0),
                        oe(se, le, be, "⊏", "\\sqsubset", !0),
                        oe(se, le, be, "≼", "\\preccurlyeq", !0),
                        oe(se, le, be, "⋞", "\\curlyeqprec", !0),
                        oe(se, le, be, "≾", "\\precsim", !0),
                        oe(se, le, be, "⪷", "\\precapprox", !0),
                        oe(se, le, be, "⊲", "\\vartriangleleft"),
                        oe(se, le, be, "⊴", "\\trianglelefteq"),
                        oe(se, le, be, "⊨", "\\vDash", !0),
                        oe(se, le, be, "⊪", "\\Vvdash", !0),
                        oe(se, le, be, "⌣", "\\smallsmile"),
                        oe(se, le, be, "⌢", "\\smallfrown"),
                        oe(se, le, be, "≏", "\\bumpeq", !0),
                        oe(se, le, be, "≎", "\\Bumpeq", !0),
                        oe(se, le, be, "≧", "\\geqq", !0),
                        oe(se, le, be, "⩾", "\\geqslant", !0),
                        oe(se, le, be, "⪖", "\\eqslantgtr", !0),
                        oe(se, le, be, "≳", "\\gtrsim", !0),
                        oe(se, le, be, "⪆", "\\gtrapprox", !0),
                        oe(se, le, ce, "⋗", "\\gtrdot"),
                        oe(se, le, be, "⋙", "\\ggg", !0),
                        oe(se, le, be, "≷", "\\gtrless", !0),
                        oe(se, le, be, "⋛", "\\gtreqless", !0),
                        oe(se, le, be, "⪌", "\\gtreqqless", !0),
                        oe(se, le, be, "≖", "\\eqcirc", !0),
                        oe(se, le, be, "≗", "\\circeq", !0),
                        oe(se, le, be, "≜", "\\triangleq", !0),
                        oe(se, le, be, "∼", "\\thicksim"),
                        oe(se, le, be, "≈", "\\thickapprox"),
                        oe(se, le, be, "⫆", "\\supseteqq", !0),
                        oe(se, le, be, "⋑", "\\Supset", !0),
                        oe(se, le, be, "⊐", "\\sqsupset", !0),
                        oe(se, le, be, "≽", "\\succcurlyeq", !0),
                        oe(se, le, be, "⋟", "\\curlyeqsucc", !0),
                        oe(se, le, be, "≿", "\\succsim", !0),
                        oe(se, le, be, "⪸", "\\succapprox", !0),
                        oe(se, le, be, "⊳", "\\vartriangleright"),
                        oe(se, le, be, "⊵", "\\trianglerighteq"),
                        oe(se, le, be, "⊩", "\\Vdash", !0),
                        oe(se, le, be, "∣", "\\shortmid"),
                        oe(se, le, be, "∥", "\\shortparallel"),
                        oe(se, le, be, "≬", "\\between", !0),
                        oe(se, le, be, "⋔", "\\pitchfork", !0),
                        oe(se, le, be, "∝", "\\varpropto"),
                        oe(se, le, be, "◀", "\\blacktriangleleft"),
                        oe(se, le, be, "∴", "\\therefore", !0),
                        oe(se, le, be, "∍", "\\backepsilon"),
                        oe(se, le, be, "▶", "\\blacktriangleright"),
                        oe(se, le, be, "∵", "\\because", !0),
                        oe(se, le, be, "⋘", "\\llless"),
                        oe(se, le, be, "⋙", "\\gggtr"),
                        oe(se, le, ce, "⊲", "\\lhd"),
                        oe(se, le, ce, "⊳", "\\rhd"),
                        oe(se, le, be, "≂", "\\eqsim", !0),
                        oe(se, ae, be, "⋈", "\\Join"),
                        oe(se, le, be, "≑", "\\Doteq", !0),
                        oe(se, le, ce, "∔", "\\dotplus", !0),
                        oe(se, le, ce, "∖", "\\smallsetminus"),
                        oe(se, le, ce, "⋒", "\\Cap", !0),
                        oe(se, le, ce, "⋓", "\\Cup", !0),
                        oe(se, le, ce, "⩞", "\\doublebarwedge", !0),
                        oe(se, le, ce, "⊟", "\\boxminus", !0),
                        oe(se, le, ce, "⊞", "\\boxplus", !0),
                        oe(se, le, ce, "⋇", "\\divideontimes", !0),
                        oe(se, le, ce, "⋉", "\\ltimes", !0),
                        oe(se, le, ce, "⋊", "\\rtimes", !0),
                        oe(se, le, ce, "⋋", "\\leftthreetimes", !0),
                        oe(se, le, ce, "⋌", "\\rightthreetimes", !0),
                        oe(se, le, ce, "⋏", "\\curlywedge", !0),
                        oe(se, le, ce, "⋎", "\\curlyvee", !0),
                        oe(se, le, ce, "⊝", "\\circleddash", !0),
                        oe(se, le, ce, "⊛", "\\circledast", !0),
                        oe(se, le, ce, "⋅", "\\centerdot"),
                        oe(se, le, ce, "⊺", "\\intercal", !0),
                        oe(se, le, ce, "⋒", "\\doublecap"),
                        oe(se, le, ce, "⋓", "\\doublecup"),
                        oe(se, le, ce, "⊠", "\\boxtimes", !0),
                        oe(se, le, be, "⇢", "\\dashrightarrow", !0),
                        oe(se, le, be, "⇠", "\\dashleftarrow", !0),
                        oe(se, le, be, "⇇", "\\leftleftarrows", !0),
                        oe(se, le, be, "⇆", "\\leftrightarrows", !0),
                        oe(se, le, be, "⇚", "\\Lleftarrow", !0),
                        oe(se, le, be, "↞", "\\twoheadleftarrow", !0),
                        oe(se, le, be, "↢", "\\leftarrowtail", !0),
                        oe(se, le, be, "↫", "\\looparrowleft", !0),
                        oe(se, le, be, "⇋", "\\leftrightharpoons", !0),
                        oe(se, le, be, "↶", "\\curvearrowleft", !0),
                        oe(se, le, be, "↺", "\\circlearrowleft", !0),
                        oe(se, le, be, "↰", "\\Lsh", !0),
                        oe(se, le, be, "⇈", "\\upuparrows", !0),
                        oe(se, le, be, "↿", "\\upharpoonleft", !0),
                        oe(se, le, be, "⇃", "\\downharpoonleft", !0),
                        oe(se, ae, be, "⊶", "\\origof", !0),
                        oe(se, ae, be, "⊷", "\\imageof", !0),
                        oe(se, le, be, "⊸", "\\multimap", !0),
                        oe(se, le, be, "↭", "\\leftrightsquigarrow", !0),
                        oe(se, le, be, "⇉", "\\rightrightarrows", !0),
                        oe(se, le, be, "⇄", "\\rightleftarrows", !0),
                        oe(se, le, be, "↠", "\\twoheadrightarrow", !0),
                        oe(se, le, be, "↣", "\\rightarrowtail", !0),
                        oe(se, le, be, "↬", "\\looparrowright", !0),
                        oe(se, le, be, "↷", "\\curvearrowright", !0),
                        oe(se, le, be, "↻", "\\circlearrowright", !0),
                        oe(se, le, be, "↱", "\\Rsh", !0),
                        oe(se, le, be, "⇊", "\\downdownarrows", !0),
                        oe(se, le, be, "↾", "\\upharpoonright", !0),
                        oe(se, le, be, "⇂", "\\downharpoonright", !0),
                        oe(se, le, be, "⇝", "\\rightsquigarrow", !0),
                        oe(se, le, be, "⇝", "\\leadsto"),
                        oe(se, le, be, "⇛", "\\Rrightarrow", !0),
                        oe(se, le, be, "↾", "\\restriction"),
                        oe(se, ae, xe, "‘", "`"),
                        oe(se, ae, xe, "$", "\\$"),
                        oe(ie, ae, xe, "$", "\\$"),
                        oe(ie, ae, xe, "$", "\\textdollar"),
                        oe(se, ae, xe, "%", "\\%"),
                        oe(ie, ae, xe, "%", "\\%"),
                        oe(se, ae, xe, "_", "\\_"),
                        oe(ie, ae, xe, "_", "\\_"),
                        oe(ie, ae, xe, "_", "\\textunderscore"),
                        oe(se, ae, xe, "∠", "\\angle", !0),
                        oe(se, ae, xe, "∞", "\\infty", !0),
                        oe(se, ae, xe, "′", "\\prime"),
                        oe(se, ae, xe, "△", "\\triangle"),
                        oe(se, ae, xe, "Γ", "\\Gamma", !0),
                        oe(se, ae, xe, "Δ", "\\Delta", !0),
                        oe(se, ae, xe, "Θ", "\\Theta", !0),
                        oe(se, ae, xe, "Λ", "\\Lambda", !0),
                        oe(se, ae, xe, "Ξ", "\\Xi", !0),
                        oe(se, ae, xe, "Π", "\\Pi", !0),
                        oe(se, ae, xe, "Σ", "\\Sigma", !0),
                        oe(se, ae, xe, "Υ", "\\Upsilon", !0),
                        oe(se, ae, xe, "Φ", "\\Phi", !0),
                        oe(se, ae, xe, "Ψ", "\\Psi", !0),
                        oe(se, ae, xe, "Ω", "\\Omega", !0),
                        oe(se, ae, xe, "A", "Α"),
                        oe(se, ae, xe, "B", "Β"),
                        oe(se, ae, xe, "E", "Ε"),
                        oe(se, ae, xe, "Z", "Ζ"),
                        oe(se, ae, xe, "H", "Η"),
                        oe(se, ae, xe, "I", "Ι"),
                        oe(se, ae, xe, "K", "Κ"),
                        oe(se, ae, xe, "M", "Μ"),
                        oe(se, ae, xe, "N", "Ν"),
                        oe(se, ae, xe, "O", "Ο"),
                        oe(se, ae, xe, "P", "Ρ"),
                        oe(se, ae, xe, "T", "Τ"),
                        oe(se, ae, xe, "X", "Χ"),
                        oe(se, ae, xe, "¬", "\\neg", !0),
                        oe(se, ae, xe, "¬", "\\lnot"),
                        oe(se, ae, xe, "⊤", "\\top"),
                        oe(se, ae, xe, "⊥", "\\bot"),
                        oe(se, ae, xe, "∅", "\\emptyset"),
                        oe(se, le, xe, "∅", "\\varnothing"),
                        oe(se, ae, ue, "α", "\\alpha", !0),
                        oe(se, ae, ue, "β", "\\beta", !0),
                        oe(se, ae, ue, "γ", "\\gamma", !0),
                        oe(se, ae, ue, "δ", "\\delta", !0),
                        oe(se, ae, ue, "ϵ", "\\epsilon", !0),
                        oe(se, ae, ue, "ζ", "\\zeta", !0),
                        oe(se, ae, ue, "η", "\\eta", !0),
                        oe(se, ae, ue, "θ", "\\theta", !0),
                        oe(se, ae, ue, "ι", "\\iota", !0),
                        oe(se, ae, ue, "κ", "\\kappa", !0),
                        oe(se, ae, ue, "λ", "\\lambda", !0),
                        oe(se, ae, ue, "μ", "\\mu", !0),
                        oe(se, ae, ue, "ν", "\\nu", !0),
                        oe(se, ae, ue, "ξ", "\\xi", !0),
                        oe(se, ae, ue, "ο", "\\omicron", !0),
                        oe(se, ae, ue, "π", "\\pi", !0),
                        oe(se, ae, ue, "ρ", "\\rho", !0),
                        oe(se, ae, ue, "σ", "\\sigma", !0),
                        oe(se, ae, ue, "τ", "\\tau", !0),
                        oe(se, ae, ue, "υ", "\\upsilon", !0),
                        oe(se, ae, ue, "ϕ", "\\phi", !0),
                        oe(se, ae, ue, "χ", "\\chi", !0),
                        oe(se, ae, ue, "ψ", "\\psi", !0),
                        oe(se, ae, ue, "ω", "\\omega", !0),
                        oe(se, ae, ue, "ε", "\\varepsilon", !0),
                        oe(se, ae, ue, "ϑ", "\\vartheta", !0),
                        oe(se, ae, ue, "ϖ", "\\varpi", !0),
                        oe(se, ae, ue, "ϱ", "\\varrho", !0),
                        oe(se, ae, ue, "ς", "\\varsigma", !0),
                        oe(se, ae, ue, "φ", "\\varphi", !0),
                        oe(se, ae, ce, "∗", "*", !0),
                        oe(se, ae, ce, "+", "+"),
                        oe(se, ae, ce, "−", "-", !0),
                        oe(se, ae, ce, "⋅", "\\cdot", !0),
                        oe(se, ae, ce, "∘", "\\circ", !0),
                        oe(se, ae, ce, "÷", "\\div", !0),
                        oe(se, ae, ce, "±", "\\pm", !0),
                        oe(se, ae, ce, "×", "\\times", !0),
                        oe(se, ae, ce, "∩", "\\cap", !0),
                        oe(se, ae, ce, "∪", "\\cup", !0),
                        oe(se, ae, ce, "∖", "\\setminus", !0),
                        oe(se, ae, ce, "∧", "\\land"),
                        oe(se, ae, ce, "∨", "\\lor"),
                        oe(se, ae, ce, "∧", "\\wedge", !0),
                        oe(se, ae, ce, "∨", "\\vee", !0),
                        oe(se, ae, xe, "√", "\\surd"),
                        oe(se, ae, ge, "⟨", "\\langle", !0),
                        oe(se, ae, ge, "∣", "\\lvert"),
                        oe(se, ae, ge, "∥", "\\lVert"),
                        oe(se, ae, me, "?", "?"),
                        oe(se, ae, me, "!", "!"),
                        oe(se, ae, me, "⟩", "\\rangle", !0),
                        oe(se, ae, me, "∣", "\\rvert"),
                        oe(se, ae, me, "∥", "\\rVert"),
                        oe(se, ae, be, "=", "="),
                        oe(se, ae, be, ":", ":"),
                        oe(se, ae, be, "≈", "\\approx", !0),
                        oe(se, ae, be, "≅", "\\cong", !0),
                        oe(se, ae, be, "≥", "\\ge"),
                        oe(se, ae, be, "≥", "\\geq", !0),
                        oe(se, ae, be, "←", "\\gets"),
                        oe(se, ae, be, ">", "\\gt", !0),
                        oe(se, ae, be, "∈", "\\in", !0),
                        oe(se, ae, be, "", "\\@not"),
                        oe(se, ae, be, "⊂", "\\subset", !0),
                        oe(se, ae, be, "⊃", "\\supset", !0),
                        oe(se, ae, be, "⊆", "\\subseteq", !0),
                        oe(se, ae, be, "⊇", "\\supseteq", !0),
                        oe(se, le, be, "⊈", "\\nsubseteq", !0),
                        oe(se, le, be, "⊉", "\\nsupseteq", !0),
                        oe(se, ae, be, "⊨", "\\models"),
                        oe(se, ae, be, "←", "\\leftarrow", !0),
                        oe(se, ae, be, "≤", "\\le"),
                        oe(se, ae, be, "≤", "\\leq", !0),
                        oe(se, ae, be, "<", "\\lt", !0),
                        oe(se, ae, be, "→", "\\rightarrow", !0),
                        oe(se, ae, be, "→", "\\to"),
                        oe(se, le, be, "≱", "\\ngeq", !0),
                        oe(se, le, be, "≰", "\\nleq", !0),
                        oe(se, ae, ye, " ", "\\ "),
                        oe(se, ae, ye, " ", "\\space"),
                        oe(se, ae, ye, " ", "\\nobreakspace"),
                        oe(ie, ae, ye, " ", "\\ "),
                        oe(ie, ae, ye, " ", " "),
                        oe(ie, ae, ye, " ", "\\space"),
                        oe(ie, ae, ye, " ", "\\nobreakspace"),
                        oe(se, ae, ye, null, "\\nobreak"),
                        oe(se, ae, ye, null, "\\allowbreak"),
                        oe(se, ae, fe, ",", ","),
                        oe(se, ae, fe, ";", ";"),
                        oe(se, le, ce, "⊼", "\\barwedge", !0),
                        oe(se, le, ce, "⊻", "\\veebar", !0),
                        oe(se, ae, ce, "⊙", "\\odot", !0),
                        oe(se, ae, ce, "⊕", "\\oplus", !0),
                        oe(se, ae, ce, "⊗", "\\otimes", !0),
                        oe(se, ae, xe, "∂", "\\partial", !0),
                        oe(se, ae, ce, "⊘", "\\oslash", !0),
                        oe(se, le, ce, "⊚", "\\circledcirc", !0),
                        oe(se, le, ce, "⊡", "\\boxdot", !0),
                        oe(se, ae, ce, "△", "\\bigtriangleup"),
                        oe(se, ae, ce, "▽", "\\bigtriangledown"),
                        oe(se, ae, ce, "†", "\\dagger"),
                        oe(se, ae, ce, "⋄", "\\diamond"),
                        oe(se, ae, ce, "⋆", "\\star"),
                        oe(se, ae, ce, "◃", "\\triangleleft"),
                        oe(se, ae, ce, "▹", "\\triangleright"),
                        oe(se, ae, ge, "{", "\\{"),
                        oe(ie, ae, xe, "{", "\\{"),
                        oe(ie, ae, xe, "{", "\\textbraceleft"),
                        oe(se, ae, me, "}", "\\}"),
                        oe(ie, ae, xe, "}", "\\}"),
                        oe(ie, ae, xe, "}", "\\textbraceright"),
                        oe(se, ae, ge, "{", "\\lbrace"),
                        oe(se, ae, me, "}", "\\rbrace"),
                        oe(se, ae, ge, "[", "\\lbrack", !0),
                        oe(ie, ae, xe, "[", "\\lbrack", !0),
                        oe(se, ae, me, "]", "\\rbrack", !0),
                        oe(ie, ae, xe, "]", "\\rbrack", !0),
                        oe(se, ae, ge, "(", "\\lparen", !0),
                        oe(se, ae, me, ")", "\\rparen", !0),
                        oe(ie, ae, xe, "<", "\\textless", !0),
                        oe(ie, ae, xe, ">", "\\textgreater", !0),
                        oe(se, ae, ge, "⌊", "\\lfloor", !0),
                        oe(se, ae, me, "⌋", "\\rfloor", !0),
                        oe(se, ae, ge, "⌈", "\\lceil", !0),
                        oe(se, ae, me, "⌉", "\\rceil", !0),
                        oe(se, ae, xe, "\\", "\\backslash"),
                        oe(se, ae, xe, "∣", "|"),
                        oe(se, ae, xe, "∣", "\\vert"),
                        oe(ie, ae, xe, "|", "\\textbar", !0),
                        oe(se, ae, xe, "∥", "\\|"),
                        oe(se, ae, xe, "∥", "\\Vert"),
                        oe(ie, ae, xe, "∥", "\\textbardbl"),
                        oe(ie, ae, xe, "~", "\\textasciitilde"),
                        oe(ie, ae, xe, "\\", "\\textbackslash"),
                        oe(ie, ae, xe, "^", "\\textasciicircum"),
                        oe(se, ae, be, "↑", "\\uparrow", !0),
                        oe(se, ae, be, "⇑", "\\Uparrow", !0),
                        oe(se, ae, be, "↓", "\\downarrow", !0),
                        oe(se, ae, be, "⇓", "\\Downarrow", !0),
                        oe(se, ae, be, "↕", "\\updownarrow", !0),
                        oe(se, ae, be, "⇕", "\\Updownarrow", !0),
                        oe(se, ae, de, "∐", "\\coprod"),
                        oe(se, ae, de, "⋁", "\\bigvee"),
                        oe(se, ae, de, "⋀", "\\bigwedge"),
                        oe(se, ae, de, "⨄", "\\biguplus"),
                        oe(se, ae, de, "⋂", "\\bigcap"),
                        oe(se, ae, de, "⋃", "\\bigcup"),
                        oe(se, ae, de, "∫", "\\int"),
                        oe(se, ae, de, "∫", "\\intop"),
                        oe(se, ae, de, "∬", "\\iint"),
                        oe(se, ae, de, "∭", "\\iiint"),
                        oe(se, ae, de, "∏", "\\prod"),
                        oe(se, ae, de, "∑", "\\sum"),
                        oe(se, ae, de, "⨂", "\\bigotimes"),
                        oe(se, ae, de, "⨁", "\\bigoplus"),
                        oe(se, ae, de, "⨀", "\\bigodot"),
                        oe(se, ae, de, "∮", "\\oint"),
                        oe(se, ae, de, "∯", "\\oiint"),
                        oe(se, ae, de, "∰", "\\oiiint"),
                        oe(se, ae, de, "⨆", "\\bigsqcup"),
                        oe(se, ae, de, "∫", "\\smallint"),
                        oe(ie, ae, pe, "…", "\\textellipsis"),
                        oe(se, ae, pe, "…", "\\mathellipsis"),
                        oe(ie, ae, pe, "…", "\\ldots", !0),
                        oe(se, ae, pe, "…", "\\ldots", !0),
                        oe(se, ae, pe, "⋯", "\\@cdots", !0),
                        oe(se, ae, pe, "⋱", "\\ddots", !0),
                        oe(se, ae, xe, "⋮", "\\varvdots"),
                        oe(se, ae, he, "ˊ", "\\acute"),
                        oe(se, ae, he, "ˋ", "\\grave"),
                        oe(se, ae, he, "¨", "\\ddot"),
                        oe(se, ae, he, "~", "\\tilde"),
                        oe(se, ae, he, "ˉ", "\\bar"),
                        oe(se, ae, he, "˘", "\\breve"),
                        oe(se, ae, he, "ˇ", "\\check"),
                        oe(se, ae, he, "^", "\\hat"),
                        oe(se, ae, he, "⃗", "\\vec"),
                        oe(se, ae, he, "˙", "\\dot"),
                        oe(se, ae, he, "˚", "\\mathring"),
                        oe(se, ae, ue, "", "\\@imath"),
                        oe(se, ae, ue, "", "\\@jmath"),
                        oe(se, ae, xe, "ı", "ı"),
                        oe(se, ae, xe, "ȷ", "ȷ"),
                        oe(ie, ae, xe, "ı", "\\i", !0),
                        oe(ie, ae, xe, "ȷ", "\\j", !0),
                        oe(ie, ae, xe, "ß", "\\ss", !0),
                        oe(ie, ae, xe, "æ", "\\ae", !0),
                        oe(ie, ae, xe, "œ", "\\oe", !0),
                        oe(ie, ae, xe, "ø", "\\o", !0),
                        oe(ie, ae, xe, "Æ", "\\AE", !0),
                        oe(ie, ae, xe, "Œ", "\\OE", !0),
                        oe(ie, ae, xe, "Ø", "\\O", !0),
                        oe(ie, ae, he, "ˊ", "\\'"),
                        oe(ie, ae, he, "ˋ", "\\`"),
                        oe(ie, ae, he, "ˆ", "\\^"),
                        oe(ie, ae, he, "˜", "\\~"),
                        oe(ie, ae, he, "ˉ", "\\="),
                        oe(ie, ae, he, "˘", "\\u"),
                        oe(ie, ae, he, "˙", "\\."),
                        oe(ie, ae, he, "¸", "\\c"),
                        oe(ie, ae, he, "˚", "\\r"),
                        oe(ie, ae, he, "ˇ", "\\v"),
                        oe(ie, ae, he, "¨", '\\"'),
                        oe(ie, ae, he, "˝", "\\H"),
                        oe(ie, ae, he, "◯", "\\textcircled");
                        const we = {
                            "--": !0,
                            "---": !0,
                            "``": !0,
                            "''": !0
                        };
                        oe(ie, ae, xe, "–", "--", !0),
                        oe(ie, ae, xe, "–", "\\textendash"),
                        oe(ie, ae, xe, "—", "---", !0),
                        oe(ie, ae, xe, "—", "\\textemdash"),
                        oe(ie, ae, xe, "‘", "`", !0),
                        oe(ie, ae, xe, "‘", "\\textquoteleft"),
                        oe(ie, ae, xe, "’", "'", !0),
                        oe(ie, ae, xe, "’", "\\textquoteright"),
                        oe(ie, ae, xe, "“", "``", !0),
                        oe(ie, ae, xe, "“", "\\textquotedblleft"),
                        oe(ie, ae, xe, "”", "''", !0),
                        oe(ie, ae, xe, "”", "\\textquotedblright"),
                        oe(se, ae, xe, "°", "\\degree", !0),
                        oe(ie, ae, xe, "°", "\\degree"),
                        oe(ie, ae, xe, "°", "\\textdegree", !0),
                        oe(se, ae, xe, "£", "\\pounds"),
                        oe(se, ae, xe, "£", "\\mathsterling", !0),
                        oe(ie, ae, xe, "£", "\\pounds"),
                        oe(ie, ae, xe, "£", "\\textsterling", !0),
                        oe(se, le, xe, "✠", "\\maltese"),
                        oe(ie, le, xe, "✠", "\\maltese");
                        for (let e = 0; e < 14; e++) {
                            const t = '0123456789/@."'.charAt(e);
                            oe(se, ae, xe, t, t)
                        }
                        for (let e = 0; e < 25; e++) {
                            const t = '0123456789!@*()-=+";:?/.,'.charAt(e);
                            oe(ie, ae, xe, t, t)
                        }
                        const ve = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                        for (let e = 0; e < 52; e++) {
                            const t = ve.charAt(e);
                            oe(se, ae, ue, t, t),
                            oe(ie, ae, xe, t, t)
                        }
                        oe(se, le, xe, "C", "ℂ"),
                        oe(ie, le, xe, "C", "ℂ"),
                        oe(se, le, xe, "H", "ℍ"),
                        oe(ie, le, xe, "H", "ℍ"),
                        oe(se, le, xe, "N", "ℕ"),
                        oe(ie, le, xe, "N", "ℕ"),
                        oe(se, le, xe, "P", "ℙ"),
                        oe(ie, le, xe, "P", "ℙ"),
                        oe(se, le, xe, "Q", "ℚ"),
                        oe(ie, le, xe, "Q", "ℚ"),
                        oe(se, le, xe, "R", "ℝ"),
                        oe(ie, le, xe, "R", "ℝ"),
                        oe(se, le, xe, "Z", "ℤ"),
                        oe(ie, le, xe, "Z", "ℤ"),
                        oe(se, ae, ue, "h", "ℎ"),
                        oe(ie, ae, ue, "h", "ℎ");
                        let ke = "";
                        for (let e = 0; e < 52; e++) {
                            const t = ve.charAt(e);
                            ke = String.fromCharCode(55349, 56320 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke),
                            ke = String.fromCharCode(55349, 56372 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke),
                            ke = String.fromCharCode(55349, 56424 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke),
                            ke = String.fromCharCode(55349, 56580 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke),
                            ke = String.fromCharCode(55349, 56684 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke),
                            ke = String.fromCharCode(55349, 56736 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke),
                            ke = String.fromCharCode(55349, 56788 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke),
                            ke = String.fromCharCode(55349, 56840 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke),
                            ke = String.fromCharCode(55349, 56944 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke),
                            e < 26 && (ke = String.fromCharCode(55349, 56632 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke),
                            ke = String.fromCharCode(55349, 56476 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke))
                        }
                        ke = String.fromCharCode(55349, 56668),
                        oe(se, ae, ue, "k", ke),
                        oe(ie, ae, xe, "k", ke);
                        for (let e = 0; e < 10; e++) {
                            const t = e.toString();
                            ke = String.fromCharCode(55349, 57294 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke),
                            ke = String.fromCharCode(55349, 57314 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke),
                            ke = String.fromCharCode(55349, 57324 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke),
                            ke = String.fromCharCode(55349, 57334 + e),
                            oe(se, ae, ue, t, ke),
                            oe(ie, ae, xe, t, ke)
                        }
                        for (let e = 0; e < 3; e++) {
                            const t = "ÐÞþ".charAt(e);
                            oe(se, ae, ue, t, t),
                            oe(ie, ae, xe, t, t)
                        }
                        const Se = [["mathbf", "textbf", "Main-Bold"], ["mathbf", "textbf", "Main-Bold"], ["mathnormal", "textit", "Math-Italic"], ["mathnormal", "textit", "Math-Italic"], ["boldsymbol", "boldsymbol", "Main-BoldItalic"], ["boldsymbol", "boldsymbol", "Main-BoldItalic"], ["mathscr", "textscr", "Script-Regular"], ["", "", ""], ["", "", ""], ["", "", ""], ["mathfrak", "textfrak", "Fraktur-Regular"], ["mathfrak", "textfrak", "Fraktur-Regular"], ["mathbb", "textbb", "AMS-Regular"], ["mathbb", "textbb", "AMS-Regular"], ["mathboldfrak", "textboldfrak", "Fraktur-Regular"], ["mathboldfrak", "textboldfrak", "Fraktur-Regular"], ["mathsf", "textsf", "SansSerif-Regular"], ["mathsf", "textsf", "SansSerif-Regular"], ["mathboldsf", "textboldsf", "SansSerif-Bold"], ["mathboldsf", "textboldsf", "SansSerif-Bold"], ["mathitsf", "textitsf", "SansSerif-Italic"], ["mathitsf", "textitsf", "SansSerif-Italic"], ["", "", ""], ["", "", ""], ["mathtt", "texttt", "Typewriter-Regular"], ["mathtt", "texttt", "Typewriter-Regular"]]
                          , Me = [["mathbf", "textbf", "Main-Bold"], ["", "", ""], ["mathsf", "textsf", "SansSerif-Regular"], ["mathboldsf", "textboldsf", "SansSerif-Bold"], ["mathtt", "texttt", "Typewriter-Regular"]]
                          , ze = function(e, t, r) {
                            return ne[r][e] && ne[r][e].replace && (e = ne[r][e].replace),
                            {
                                value: e,
                                metrics: C(e, t, r)
                            }
                        }
                          , Ae = function(e, t, r, n, o) {
                            const s = ze(e, t, r)
                              , i = s.metrics;
                            let a;
                            if (e = s.value,
                            i) {
                                let t = i.italic;
                                ("text" === r || n && "mathit" === n.font) && (t = 0),
                                a = new $(e,i.height,i.depth,t,i.skew,i.width,o)
                            } else
                                "undefined" != typeof console && console.warn("No character metrics for '" + e + "' in style '" + t + "' and mode '" + r + "'"),
                                a = new $(e,0,0,0,0,0,o);
                            if (n) {
                                a.maxFontSize = n.sizeMultiplier,
                                n.style.isTight() && a.classes.push("mtight");
                                const e = n.getColor();
                                e && (a.style.color = e)
                            }
                            return a
                        }
                          , Te = (e, t) => {
                            if (F(e.classes) !== F(t.classes) || e.skew !== t.skew || e.maxFontSize !== t.maxFontSize)
                                return !1;
                            if (1 === e.classes.length) {
                                const t = e.classes[0];
                                if ("mbin" === t || "mord" === t)
                                    return !1
                            }
                            for (const r in e.style)
                                if (e.style.hasOwnProperty(r) && e.style[r] !== t.style[r])
                                    return !1;
                            for (const r in t.style)
                                if (t.style.hasOwnProperty(r) && e.style[r] !== t.style[r])
                                    return !1;
                            return !0
                        }
                          , Be = function(e) {
                            let t = 0
                              , r = 0
                              , n = 0;
                            for (let o = 0; o < e.children.length; o++) {
                                const s = e.children[o];
                                s.height > t && (t = s.height),
                                s.depth > r && (r = s.depth),
                                s.maxFontSize > n && (n = s.maxFontSize)
                            }
                            e.height = t,
                            e.depth = r,
                            e.maxFontSize = n
                        }
                          , Ce = function(e, t, r, n) {
                            const o = new X(e,t,r,n);
                            return Be(o),
                            o
                        }
                          , Ne = (e, t, r, n) => new X(e,t,r,n)
                          , qe = function(e) {
                            const t = new z(e);
                            return Be(t),
                            t
                        }
                          , Ie = function(e, t, r) {
                            let n, o = "";
                            switch (e) {
                            case "amsrm":
                                o = "AMS";
                                break;
                            case "textrm":
                                o = "Main";
                                break;
                            case "textsf":
                                o = "SansSerif";
                                break;
                            case "texttt":
                                o = "Typewriter";
                                break;
                            default:
                                o = e
                            }
                            return n = "textbf" === t && "textit" === r ? "BoldItalic" : "textbf" === t ? "Bold" : "textit" === t ? "Italic" : "Regular",
                            o + "-" + n
                        }
                          , Re = {
                            mathbf: {
                                variant: "bold",
                                fontName: "Main-Bold"
                            },
                            mathrm: {
                                variant: "normal",
                                fontName: "Main-Regular"
                            },
                            textit: {
                                variant: "italic",
                                fontName: "Main-Italic"
                            },
                            mathit: {
                                variant: "italic",
                                fontName: "Main-Italic"
                            },
                            mathnormal: {
                                variant: "italic",
                                fontName: "Math-Italic"
                            },
                            mathbb: {
                                variant: "double-struck",
                                fontName: "AMS-Regular"
                            },
                            mathcal: {
                                variant: "script",
                                fontName: "Caligraphic-Regular"
                            },
                            mathfrak: {
                                variant: "fraktur",
                                fontName: "Fraktur-Regular"
                            },
                            mathscr: {
                                variant: "script",
                                fontName: "Script-Regular"
                            },
                            mathsf: {
                                variant: "sans-serif",
                                fontName: "SansSerif-Regular"
                            },
                            mathtt: {
                                variant: "monospace",
                                fontName: "Typewriter-Regular"
                            }
                        }
                          , He = {
                            vec: ["vec", .471, .714],
                            oiintSize1: ["oiintSize1", .957, .499],
                            oiintSize2: ["oiintSize2", 1.472, .659],
                            oiiintSize1: ["oiiintSize1", 1.304, .499],
                            oiiintSize2: ["oiiintSize2", 1.98, .659]
                        };
                        var Oe = {
                            fontMap: Re,
                            makeSymbol: Ae,
                            mathsym: function(e, t, r, n) {
                                return void 0 === n && (n = []),
                                "boldsymbol" === r.font && ze(e, "Main-Bold", t).metrics ? Ae(e, "Main-Bold", t, r, n.concat(["mathbf"])) : "\\" === e || "main" === ne[t][e].font ? Ae(e, "Main-Regular", t, r, n) : Ae(e, "AMS-Regular", t, r, n.concat(["amsrm"]))
                            },
                            makeSpan: Ce,
                            makeSvgSpan: Ne,
                            makeLineSpan: function(e, t, r) {
                                const n = Ce([e], [], t);
                                return n.height = Math.max(r || t.fontMetrics().defaultRuleThickness, t.minRuleThickness),
                                n.style.borderBottomWidth = V(n.height),
                                n.maxFontSize = 1,
                                n
                            },
                            makeAnchor: function(e, t, r, n) {
                                const o = new W(e,t,r,n);
                                return Be(o),
                                o
                            },
                            makeFragment: qe,
                            wrapFragment: function(e, t) {
                                return e instanceof z ? Ce([], [e], t) : e
                            },
                            makeVList: function(e, t) {
                                const {children: r, depth: n} = function(e) {
                                    if ("individualShift" === e.positionType) {
                                        const t = e.children
                                          , r = [t[0]]
                                          , n = -t[0].shift - t[0].elem.depth;
                                        let o = n;
                                        for (let e = 1; e < t.length; e++) {
                                            const n = -t[e].shift - o - t[e].elem.depth
                                              , s = n - (t[e - 1].elem.height + t[e - 1].elem.depth);
                                            o += n,
                                            r.push({
                                                type: "kern",
                                                size: s
                                            }),
                                            r.push(t[e])
                                        }
                                        return {
                                            children: r,
                                            depth: n
                                        }
                                    }
                                    let t;
                                    if ("top" === e.positionType) {
                                        let r = e.positionData;
                                        for (let t = 0; t < e.children.length; t++) {
                                            const n = e.children[t];
                                            r -= "kern" === n.type ? n.size : n.elem.height + n.elem.depth
                                        }
                                        t = r
                                    } else if ("bottom" === e.positionType)
                                        t = -e.positionData;
                                    else {
                                        const r = e.children[0];
                                        if ("elem" !== r.type)
                                            throw new Error('First child must have type "elem".');
                                        if ("shift" === e.positionType)
                                            t = -r.elem.depth - e.positionData;
                                        else {
                                            if ("firstBaseline" !== e.positionType)
                                                throw new Error("Invalid positionType " + e.positionType + ".");
                                            t = -r.elem.depth
                                        }
                                    }
                                    return {
                                        children: e.children,
                                        depth: t
                                    }
                                }(e);
                                let o = 0;
                                for (let e = 0; e < r.length; e++) {
                                    const t = r[e];
                                    if ("elem" === t.type) {
                                        const e = t.elem;
                                        o = Math.max(o, e.maxFontSize, e.height)
                                    }
                                }
                                o += 2;
                                const s = Ce(["pstrut"], []);
                                s.style.height = V(o);
                                const i = [];
                                let a = n
                                  , l = n
                                  , h = n;
                                for (let e = 0; e < r.length; e++) {
                                    const t = r[e];
                                    if ("kern" === t.type)
                                        h += t.size;
                                    else {
                                        const e = t.elem
                                          , r = t.wrapperClasses || []
                                          , n = t.wrapperStyle || {}
                                          , a = Ce(r, [s, e], void 0, n);
                                        a.style.top = V(-o - h - e.depth),
                                        t.marginLeft && (a.style.marginLeft = t.marginLeft),
                                        t.marginRight && (a.style.marginRight = t.marginRight),
                                        i.push(a),
                                        h += e.height + e.depth
                                    }
                                    a = Math.min(a, h),
                                    l = Math.max(l, h)
                                }
                                const c = Ce(["vlist"], i);
                                let m;
                                if (c.style.height = V(l),
                                a < 0) {
                                    const e = Ce([], [])
                                      , t = Ce(["vlist"], [e]);
                                    t.style.height = V(-a);
                                    const r = Ce(["vlist-s"], [new $("​")]);
                                    m = [Ce(["vlist-r"], [c, r]), Ce(["vlist-r"], [t])]
                                } else
                                    m = [Ce(["vlist-r"], [c])];
                                const p = Ce(["vlist-t"], m);
                                return 2 === m.length && p.classes.push("vlist-t2"),
                                p.height = l,
                                p.depth = -a,
                                p
                            },
                            makeOrd: function(e, t, r) {
                                const o = e.mode
                                  , s = e.text
                                  , i = ["mord"]
                                  , a = "math" === o || "text" === o && t.font
                                  , l = a ? t.font : t.fontFamily;
                                let h = ""
                                  , c = "";
                                if (55349 === s.charCodeAt(0) && ([h,c] = function(e, t) {
                                    const r = 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320) + 65536
                                      , o = "math" === t ? 0 : 1;
                                    if (119808 <= r && r < 120484) {
                                        const e = Math.floor((r - 119808) / 26);
                                        return [Se[e][2], Se[e][o]]
                                    }
                                    if (120782 <= r && r <= 120831) {
                                        const e = Math.floor((r - 120782) / 10);
                                        return [Me[e][2], Me[e][o]]
                                    }
                                    if (120485 === r || 120486 === r)
                                        return [Se[0][2], Se[0][o]];
                                    if (120486 < r && r < 120782)
                                        return ["", ""];
                                    throw new n("Unsupported character: " + e)
                                }(s, o)),
                                h.length > 0)
                                    return Ae(s, h, o, t, i.concat(c));
                                if (l) {
                                    let e, n;
                                    if ("boldsymbol" === l) {
                                        const t = function(e, t, r, n, o) {
                                            return "textord" !== o && ze(e, "Math-BoldItalic", t).metrics ? {
                                                fontName: "Math-BoldItalic",
                                                fontClass: "boldsymbol"
                                            } : {
                                                fontName: "Main-Bold",
                                                fontClass: "mathbf"
                                            }
                                        }(s, o, 0, 0, r);
                                        e = t.fontName,
                                        n = [t.fontClass]
                                    } else
                                        a ? (e = Re[l].fontName,
                                        n = [l]) : (e = Ie(l, t.fontWeight, t.fontShape),
                                        n = [l, t.fontWeight, t.fontShape]);
                                    if (ze(s, e, o).metrics)
                                        return Ae(s, e, o, t, i.concat(n));
                                    if (we.hasOwnProperty(s) && "Typewriter" === e.slice(0, 10)) {
                                        const r = [];
                                        for (let a = 0; a < s.length; a++)
                                            r.push(Ae(s[a], e, o, t, i.concat(n)));
                                        return qe(r)
                                    }
                                }
                                if ("mathord" === r)
                                    return Ae(s, "Math-Italic", o, t, i.concat(["mathnormal"]));
                                if ("textord" === r) {
                                    const e = ne[o][s] && ne[o][s].font;
                                    if ("ams" === e) {
                                        const e = Ie("amsrm", t.fontWeight, t.fontShape);
                                        return Ae(s, e, o, t, i.concat("amsrm", t.fontWeight, t.fontShape))
                                    }
                                    if ("main" !== e && e) {
                                        const r = Ie(e, t.fontWeight, t.fontShape);
                                        return Ae(s, r, o, t, i.concat(r, t.fontWeight, t.fontShape))
                                    }
                                    {
                                        const e = Ie("textrm", t.fontWeight, t.fontShape);
                                        return Ae(s, e, o, t, i.concat(t.fontWeight, t.fontShape))
                                    }
                                }
                                throw new Error("unexpected type: " + r + " in makeOrd")
                            },
                            makeGlue: (e, t) => {
                                const r = Ce(["mspace"], [], t)
                                  , n = P(e, t);
                                return r.style.marginRight = V(n),
                                r
                            }
                            ,
                            staticSvg: function(e, t) {
                                const [r,n,o] = He[e]
                                  , s = new K(r)
                                  , i = new Z([s],{
                                    width: V(n),
                                    height: V(o),
                                    style: "width:" + V(n),
                                    viewBox: "0 0 " + 1e3 * n + " " + 1e3 * o,
                                    preserveAspectRatio: "xMinYMin"
                                })
                                  , a = Ne(["overlay"], [i], t);
                                return a.height = o,
                                a.style.height = V(o),
                                a.style.width = V(n),
                                a
                            },
                            svgData: He,
                            tryCombineChars: e => {
                                for (let t = 0; t < e.length - 1; t++) {
                                    const r = e[t]
                                      , n = e[t + 1];
                                    r instanceof $ && n instanceof $ && Te(r, n) && (r.text += n.text,
                                    r.height = Math.max(r.height, n.height),
                                    r.depth = Math.max(r.depth, n.depth),
                                    r.italic = n.italic,
                                    e.splice(t + 1, 1),
                                    t--)
                                }
                                return e
                            }
                        };
                        const Ee = {
                            number: 3,
                            unit: "mu"
                        }
                          , Le = {
                            number: 4,
                            unit: "mu"
                        }
                          , De = {
                            number: 5,
                            unit: "mu"
                        }
                          , Pe = {
                            mord: {
                                mop: Ee,
                                mbin: Le,
                                mrel: De,
                                minner: Ee
                            },
                            mop: {
                                mord: Ee,
                                mop: Ee,
                                mrel: De,
                                minner: Ee
                            },
                            mbin: {
                                mord: Le,
                                mop: Le,
                                mopen: Le,
                                minner: Le
                            },
                            mrel: {
                                mord: De,
                                mop: De,
                                mopen: De,
                                minner: De
                            },
                            mopen: {},
                            mclose: {
                                mop: Ee,
                                mbin: Le,
                                mrel: De,
                                minner: Ee
                            },
                            mpunct: {
                                mord: Ee,
                                mop: Ee,
                                mrel: De,
                                mopen: Ee,
                                mclose: Ee,
                                mpunct: Ee,
                                minner: Ee
                            },
                            minner: {
                                mord: Ee,
                                mop: Ee,
                                mbin: Le,
                                mrel: De,
                                mopen: Ee,
                                mpunct: Ee,
                                minner: Ee
                            }
                        }
                          , Ve = {
                            mord: {
                                mop: Ee
                            },
                            mop: {
                                mord: Ee,
                                mop: Ee
                            },
                            mbin: {},
                            mrel: {},
                            mopen: {},
                            mclose: {
                                mop: Ee
                            },
                            mpunct: {},
                            minner: {
                                mop: Ee
                            }
                        }
                          , Fe = {}
                          , Ge = {}
                          , Ue = {};
                        function Ye(e) {
                            let {type: t, names: r, props: n, handler: o, htmlBuilder: s, mathmlBuilder: i} = e;
                            const a = {
                                type: t,
                                numArgs: n.numArgs,
                                argTypes: n.argTypes,
                                allowedInArgument: !!n.allowedInArgument,
                                allowedInText: !!n.allowedInText,
                                allowedInMath: void 0 === n.allowedInMath || n.allowedInMath,
                                numOptionalArgs: n.numOptionalArgs || 0,
                                infix: !!n.infix,
                                primitive: !!n.primitive,
                                handler: o
                            };
                            for (let e = 0; e < r.length; ++e)
                                Fe[r[e]] = a;
                            t && (s && (Ge[t] = s),
                            i && (Ue[t] = i))
                        }
                        function Xe(e) {
                            let {type: t, htmlBuilder: r, mathmlBuilder: n} = e;
                            Ye({
                                type: t,
                                names: [],
                                props: {
                                    numArgs: 0
                                },
                                handler() {
                                    throw new Error("Should never be called.")
                                },
                                htmlBuilder: r,
                                mathmlBuilder: n
                            })
                        }
                        const We = function(e) {
                            return "ordgroup" === e.type && 1 === e.body.length ? e.body[0] : e
                        }
                          , _e = function(e) {
                            return "ordgroup" === e.type ? e.body : [e]
                        }
                          , je = Oe.makeSpan
                          , $e = ["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"]
                          , Ze = ["rightmost", "mrel", "mclose", "mpunct"]
                          , Ke = {
                            display: w.DISPLAY,
                            text: w.TEXT,
                            script: w.SCRIPT,
                            scriptscript: w.SCRIPTSCRIPT
                        }
                          , Je = {
                            mord: "mord",
                            mop: "mop",
                            mbin: "mbin",
                            mrel: "mrel",
                            mopen: "mopen",
                            mclose: "mclose",
                            mpunct: "mpunct",
                            minner: "minner"
                        }
                          , Qe = function(e, t, r, n) {
                            void 0 === n && (n = [null, null]);
                            const o = [];
                            for (let r = 0; r < e.length; r++) {
                                const n = st(e[r], t);
                                if (n instanceof z) {
                                    const e = n.children;
                                    o.push(...e)
                                } else
                                    o.push(n)
                            }
                            if (Oe.tryCombineChars(o),
                            !r)
                                return o;
                            let s = t;
                            if (1 === e.length) {
                                const r = e[0];
                                "sizing" === r.type ? s = t.havingSize(r.size) : "styling" === r.type && (s = t.havingStyle(Ke[r.style]))
                            }
                            const i = je([n[0] || "leftmost"], [], t)
                              , a = je([n[1] || "rightmost"], [], t)
                              , h = "root" === r;
                            return et(o, ( (e, t) => {
                                const r = t.classes[0]
                                  , n = e.classes[0];
                                "mbin" === r && l.contains(Ze, n) ? t.classes[0] = "mord" : "mbin" === n && l.contains($e, r) && (e.classes[0] = "mord")
                            }
                            ), {
                                node: i
                            }, a, h),
                            et(o, ( (e, t) => {
                                const r = nt(t)
                                  , n = nt(e)
                                  , o = r && n ? e.hasClass("mtight") ? Ve[r][n] : Pe[r][n] : null;
                                if (o)
                                    return Oe.makeGlue(o, s)
                            }
                            ), {
                                node: i
                            }, a, h),
                            o
                        }
                          , et = function(e, t, r, n, o) {
                            n && e.push(n);
                            let s = 0;
                            for (; s < e.length; s++) {
                                const n = e[s]
                                  , i = tt(n);
                                if (i) {
                                    et(i.children, t, r, null, o);
                                    continue
                                }
                                const a = !n.hasClass("mspace");
                                if (a) {
                                    const o = t(n, r.node);
                                    o && (r.insertAfter ? r.insertAfter(o) : (e.unshift(o),
                                    s++))
                                }
                                a ? r.node = n : o && n.hasClass("newline") && (r.node = je(["leftmost"])),
                                r.insertAfter = (t => r => {
                                    e.splice(t + 1, 0, r),
                                    s++
                                }
                                )(s)
                            }
                            n && e.pop()
                        }
                          , tt = function(e) {
                            return e instanceof z || e instanceof W || e instanceof X && e.hasClass("enclosing") ? e : null
                        }
                          , rt = function(e, t) {
                            const r = tt(e);
                            if (r) {
                                const e = r.children;
                                if (e.length) {
                                    if ("right" === t)
                                        return rt(e[e.length - 1], "right");
                                    if ("left" === t)
                                        return rt(e[0], "left")
                                }
                            }
                            return e
                        }
                          , nt = function(e, t) {
                            return e ? (t && (e = rt(e, t)),
                            Je[e.classes[0]] || null) : null
                        }
                          , ot = function(e, t) {
                            const r = ["nulldelimiter"].concat(e.baseSizingClasses());
                            return je(t.concat(r))
                        }
                          , st = function(e, t, r) {
                            if (!e)
                                return je();
                            if (Ge[e.type]) {
                                let n = Ge[e.type](e, t);
                                if (r && t.size !== r.size) {
                                    n = je(t.sizingClasses(r), [n], t);
                                    const e = t.sizeMultiplier / r.sizeMultiplier;
                                    n.height *= e,
                                    n.depth *= e
                                }
                                return n
                            }
                            throw new n("Got group of unknown type: '" + e.type + "'")
                        };
                        function it(e, t) {
                            const r = je(["base"], e, t)
                              , n = je(["strut"]);
                            return n.style.height = V(r.height + r.depth),
                            r.depth && (n.style.verticalAlign = V(-r.depth)),
                            r.children.unshift(n),
                            r
                        }
                        function at(e, t) {
                            let r = null;
                            1 === e.length && "tag" === e[0].type && (r = e[0].tag,
                            e = e[0].body);
                            const n = Qe(e, t, "root");
                            let o;
                            2 === n.length && n[1].hasClass("tag") && (o = n.pop());
                            const s = [];
                            let i, a = [];
                            for (let e = 0; e < n.length; e++)
                                if (a.push(n[e]),
                                n[e].hasClass("mbin") || n[e].hasClass("mrel") || n[e].hasClass("allowbreak")) {
                                    let r = !1;
                                    for (; e < n.length - 1 && n[e + 1].hasClass("mspace") && !n[e + 1].hasClass("newline"); )
                                        e++,
                                        a.push(n[e]),
                                        n[e].hasClass("nobreak") && (r = !0);
                                    r || (s.push(it(a, t)),
                                    a = [])
                                } else
                                    n[e].hasClass("newline") && (a.pop(),
                                    a.length > 0 && (s.push(it(a, t)),
                                    a = []),
                                    s.push(n[e]));
                            a.length > 0 && s.push(it(a, t)),
                            r ? (i = it(Qe(r, t, !0)),
                            i.classes = ["tag"],
                            s.push(i)) : o && s.push(o);
                            const l = je(["katex-html"], s);
                            if (l.setAttribute("aria-hidden", "true"),
                            i) {
                                const e = i.children[0];
                                e.style.height = V(l.height + l.depth),
                                l.depth && (e.style.verticalAlign = V(-l.depth))
                            }
                            return l
                        }
                        function lt(e) {
                            return new z(e)
                        }
                        class ht {
                            constructor(e, t, r) {
                                this.type = void 0,
                                this.attributes = void 0,
                                this.children = void 0,
                                this.classes = void 0,
                                this.type = e,
                                this.attributes = {},
                                this.children = t || [],
                                this.classes = r || []
                            }
                            setAttribute(e, t) {
                                this.attributes[e] = t
                            }
                            getAttribute(e) {
                                return this.attributes[e]
                            }
                            toNode() {
                                const e = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
                                for (const t in this.attributes)
                                    Object.prototype.hasOwnProperty.call(this.attributes, t) && e.setAttribute(t, this.attributes[t]);
                                this.classes.length > 0 && (e.className = F(this.classes));
                                for (let t = 0; t < this.children.length; t++)
                                    e.appendChild(this.children[t].toNode());
                                return e
                            }
                            toMarkup() {
                                let e = "<" + this.type;
                                for (const t in this.attributes)
                                    Object.prototype.hasOwnProperty.call(this.attributes, t) && (e += " " + t + '="',
                                    e += l.escape(this.attributes[t]),
                                    e += '"');
                                this.classes.length > 0 && (e += ' class ="' + l.escape(F(this.classes)) + '"'),
                                e += ">";
                                for (let t = 0; t < this.children.length; t++)
                                    e += this.children[t].toMarkup();
                                return e += "</" + this.type + ">",
                                e
                            }
                            toText() {
                                return this.children.map((e => e.toText())).join("")
                            }
                        }
                        class ct {
                            constructor(e) {
                                this.text = void 0,
                                this.text = e
                            }
                            toNode() {
                                return document.createTextNode(this.text)
                            }
                            toMarkup() {
                                return l.escape(this.toText())
                            }
                            toText() {
                                return this.text
                            }
                        }
                        var mt = {
                            MathNode: ht,
                            TextNode: ct,
                            SpaceNode: class {
                                constructor(e) {
                                    this.width = void 0,
                                    this.character = void 0,
                                    this.width = e,
                                    this.character = e >= .05555 && e <= .05556 ? " " : e >= .1666 && e <= .1667 ? " " : e >= .2222 && e <= .2223 ? " " : e >= .2777 && e <= .2778 ? "  " : e >= -.05556 && e <= -.05555 ? " ⁣" : e >= -.1667 && e <= -.1666 ? " ⁣" : e >= -.2223 && e <= -.2222 ? " ⁣" : e >= -.2778 && e <= -.2777 ? " ⁣" : null
                                }
                                toNode() {
                                    if (this.character)
                                        return document.createTextNode(this.character);
                                    {
                                        const e = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
                                        return e.setAttribute("width", V(this.width)),
                                        e
                                    }
                                }
                                toMarkup() {
                                    return this.character ? "<mtext>" + this.character + "</mtext>" : '<mspace width="' + V(this.width) + '"/>'
                                }
                                toText() {
                                    return this.character ? this.character : " "
                                }
                            }
                            ,
                            newDocumentFragment: lt
                        };
                        const pt = function(e, t, r) {
                            return !ne[t][e] || !ne[t][e].replace || 55349 === e.charCodeAt(0) || we.hasOwnProperty(e) && r && (r.fontFamily && "tt" === r.fontFamily.slice(4, 6) || r.font && "tt" === r.font.slice(4, 6)) || (e = ne[t][e].replace),
                            new mt.TextNode(e)
                        }
                          , ut = function(e) {
                            return 1 === e.length ? e[0] : new mt.MathNode("mrow",e)
                        }
                          , dt = function(e, t) {
                            if ("texttt" === t.fontFamily)
                                return "monospace";
                            if ("textsf" === t.fontFamily)
                                return "textit" === t.fontShape && "textbf" === t.fontWeight ? "sans-serif-bold-italic" : "textit" === t.fontShape ? "sans-serif-italic" : "textbf" === t.fontWeight ? "bold-sans-serif" : "sans-serif";
                            if ("textit" === t.fontShape && "textbf" === t.fontWeight)
                                return "bold-italic";
                            if ("textit" === t.fontShape)
                                return "italic";
                            if ("textbf" === t.fontWeight)
                                return "bold";
                            const r = t.font;
                            if (!r || "mathnormal" === r)
                                return null;
                            const n = e.mode;
                            if ("mathit" === r)
                                return "italic";
                            if ("boldsymbol" === r)
                                return "textord" === e.type ? "bold" : "bold-italic";
                            if ("mathbf" === r)
                                return "bold";
                            if ("mathbb" === r)
                                return "double-struck";
                            if ("mathfrak" === r)
                                return "fraktur";
                            if ("mathscr" === r || "mathcal" === r)
                                return "script";
                            if ("mathsf" === r)
                                return "sans-serif";
                            if ("mathtt" === r)
                                return "monospace";
                            let o = e.text;
                            return l.contains(["\\imath", "\\jmath"], o) ? null : (ne[n][o] && ne[n][o].replace && (o = ne[n][o].replace),
                            C(o, Oe.fontMap[r].fontName, n) ? Oe.fontMap[r].variant : null)
                        }
                          , gt = function(e, t, r) {
                            if (1 === e.length) {
                                const n = bt(e[0], t);
                                return r && n instanceof ht && "mo" === n.type && (n.setAttribute("lspace", "0em"),
                                n.setAttribute("rspace", "0em")),
                                [n]
                            }
                            const n = [];
                            let o;
                            for (let r = 0; r < e.length; r++) {
                                const s = bt(e[r], t);
                                if (s instanceof ht && o instanceof ht) {
                                    if ("mtext" === s.type && "mtext" === o.type && s.getAttribute("mathvariant") === o.getAttribute("mathvariant")) {
                                        o.children.push(...s.children);
                                        continue
                                    }
                                    if ("mn" === s.type && "mn" === o.type) {
                                        o.children.push(...s.children);
                                        continue
                                    }
                                    if ("mi" === s.type && 1 === s.children.length && "mn" === o.type) {
                                        const e = s.children[0];
                                        if (e instanceof ct && "." === e.text) {
                                            o.children.push(...s.children);
                                            continue
                                        }
                                    } else if ("mi" === o.type && 1 === o.children.length) {
                                        const e = o.children[0];
                                        if (e instanceof ct && "̸" === e.text && ("mo" === s.type || "mi" === s.type || "mn" === s.type)) {
                                            const e = s.children[0];
                                            e instanceof ct && e.text.length > 0 && (e.text = e.text.slice(0, 1) + "̸" + e.text.slice(1),
                                            n.pop())
                                        }
                                    }
                                }
                                n.push(s),
                                o = s
                            }
                            return n
                        }
                          , ft = function(e, t, r) {
                            return ut(gt(e, t, r))
                        }
                          , bt = function(e, t) {
                            if (!e)
                                return new mt.MathNode("mrow");
                            if (Ue[e.type])
                                return Ue[e.type](e, t);
                            throw new n("Got group of unknown type: '" + e.type + "'")
                        };
                        function yt(e, t, r, n, o) {
                            const s = gt(e, r);
                            let i;
                            i = 1 === s.length && s[0]instanceof ht && l.contains(["mrow", "mtable"], s[0].type) ? s[0] : new mt.MathNode("mrow",s);
                            const a = new mt.MathNode("annotation",[new mt.TextNode(t)]);
                            a.setAttribute("encoding", "application/x-tex");
                            const h = new mt.MathNode("semantics",[i, a])
                              , c = new mt.MathNode("math",[h]);
                            c.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"),
                            n && c.setAttribute("display", "block");
                            return Oe.makeSpan([o ? "katex" : "katex-mathml"], [c])
                        }
                        const xt = function(e) {
                            return new O({
                                style: e.displayMode ? w.DISPLAY : w.TEXT,
                                maxSize: e.maxSize,
                                minRuleThickness: e.minRuleThickness
                            })
                        }
                          , wt = function(e, t) {
                            if (t.displayMode) {
                                const r = ["katex-display"];
                                t.leqno && r.push("leqno"),
                                t.fleqn && r.push("fleqn"),
                                e = Oe.makeSpan(r, [e])
                            }
                            return e
                        }
                          , vt = {
                            widehat: "^",
                            widecheck: "ˇ",
                            widetilde: "~",
                            utilde: "~",
                            overleftarrow: "←",
                            underleftarrow: "←",
                            xleftarrow: "←",
                            overrightarrow: "→",
                            underrightarrow: "→",
                            xrightarrow: "→",
                            underbrace: "⏟",
                            overbrace: "⏞",
                            overgroup: "⏠",
                            undergroup: "⏡",
                            overleftrightarrow: "↔",
                            underleftrightarrow: "↔",
                            xleftrightarrow: "↔",
                            Overrightarrow: "⇒",
                            xRightarrow: "⇒",
                            overleftharpoon: "↼",
                            xleftharpoonup: "↼",
                            overrightharpoon: "⇀",
                            xrightharpoonup: "⇀",
                            xLeftarrow: "⇐",
                            xLeftrightarrow: "⇔",
                            xhookleftarrow: "↩",
                            xhookrightarrow: "↪",
                            xmapsto: "↦",
                            xrightharpoondown: "⇁",
                            xleftharpoondown: "↽",
                            xrightleftharpoons: "⇌",
                            xleftrightharpoons: "⇋",
                            xtwoheadleftarrow: "↞",
                            xtwoheadrightarrow: "↠",
                            xlongequal: "=",
                            xtofrom: "⇄",
                            xrightleftarrows: "⇄",
                            xrightequilibrium: "⇌",
                            xleftequilibrium: "⇋",
                            "\\cdrightarrow": "→",
                            "\\cdleftarrow": "←",
                            "\\cdlongequal": "="
                        }
                          , kt = {
                            overrightarrow: [["rightarrow"], .888, 522, "xMaxYMin"],
                            overleftarrow: [["leftarrow"], .888, 522, "xMinYMin"],
                            underrightarrow: [["rightarrow"], .888, 522, "xMaxYMin"],
                            underleftarrow: [["leftarrow"], .888, 522, "xMinYMin"],
                            xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
                            "\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"],
                            xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
                            "\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"],
                            Overrightarrow: [["doublerightarrow"], .888, 560, "xMaxYMin"],
                            xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
                            xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
                            overleftharpoon: [["leftharpoon"], .888, 522, "xMinYMin"],
                            xleftharpoonup: [["leftharpoon"], .888, 522, "xMinYMin"],
                            xleftharpoondown: [["leftharpoondown"], .888, 522, "xMinYMin"],
                            overrightharpoon: [["rightharpoon"], .888, 522, "xMaxYMin"],
                            xrightharpoonup: [["rightharpoon"], .888, 522, "xMaxYMin"],
                            xrightharpoondown: [["rightharpoondown"], .888, 522, "xMaxYMin"],
                            xlongequal: [["longequal"], .888, 334, "xMinYMin"],
                            "\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"],
                            xtwoheadleftarrow: [["twoheadleftarrow"], .888, 334, "xMinYMin"],
                            xtwoheadrightarrow: [["twoheadrightarrow"], .888, 334, "xMaxYMin"],
                            overleftrightarrow: [["leftarrow", "rightarrow"], .888, 522],
                            overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
                            underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548],
                            underleftrightarrow: [["leftarrow", "rightarrow"], .888, 522],
                            xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
                            xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
                            xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716],
                            xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716],
                            xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
                            xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
                            overlinesegment: [["leftlinesegment", "rightlinesegment"], .888, 522],
                            underlinesegment: [["leftlinesegment", "rightlinesegment"], .888, 522],
                            overgroup: [["leftgroup", "rightgroup"], .888, 342],
                            undergroup: [["leftgroupunder", "rightgroupunder"], .888, 342],
                            xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
                            xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528],
                            xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901],
                            xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716],
                            xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716]
                        };
                        var St = function(e) {
                            const t = new mt.MathNode("mo",[new mt.TextNode(vt[e.replace(/^\\/, "")])]);
                            return t.setAttribute("stretchy", "true"),
                            t
                        }
                          , Mt = function(e, t) {
                            const {span: r, minWidth: n, height: o} = function() {
                                let r = 4e5;
                                const n = e.label.slice(1);
                                if (l.contains(["widehat", "widecheck", "widetilde", "utilde"], n)) {
                                    const s = "ordgroup" === (o = e.base).type ? o.body.length : 1;
                                    let i, a, l;
                                    if (s > 5)
                                        "widehat" === n || "widecheck" === n ? (i = 420,
                                        r = 2364,
                                        l = .42,
                                        a = n + "4") : (i = 312,
                                        r = 2340,
                                        l = .34,
                                        a = "tilde4");
                                    else {
                                        const e = [1, 1, 2, 2, 3, 3][s];
                                        "widehat" === n || "widecheck" === n ? (r = [0, 1062, 2364, 2364, 2364][e],
                                        i = [0, 239, 300, 360, 420][e],
                                        l = [0, .24, .3, .3, .36, .42][e],
                                        a = n + e) : (r = [0, 600, 1033, 2339, 2340][e],
                                        i = [0, 260, 286, 306, 312][e],
                                        l = [0, .26, .286, .3, .306, .34][e],
                                        a = "tilde" + e)
                                    }
                                    const h = new K(a)
                                      , c = new Z([h],{
                                        width: "100%",
                                        height: V(l),
                                        viewBox: "0 0 " + r + " " + i,
                                        preserveAspectRatio: "none"
                                    });
                                    return {
                                        span: Oe.makeSvgSpan([], [c], t),
                                        minWidth: 0,
                                        height: l
                                    }
                                }
                                {
                                    const e = []
                                      , o = kt[n]
                                      , [s,i,a] = o
                                      , l = a / 1e3
                                      , h = s.length;
                                    let c, m;
                                    if (1 === h)
                                        c = ["hide-tail"],
                                        m = [o[3]];
                                    else if (2 === h)
                                        c = ["halfarrow-left", "halfarrow-right"],
                                        m = ["xMinYMin", "xMaxYMin"];
                                    else {
                                        if (3 !== h)
                                            throw new Error("Correct katexImagesData or update code here to support\n                    " + h + " children.");
                                        c = ["brace-left", "brace-center", "brace-right"],
                                        m = ["xMinYMin", "xMidYMin", "xMaxYMin"]
                                    }
                                    for (let n = 0; n < h; n++) {
                                        const o = new K(s[n])
                                          , p = new Z([o],{
                                            width: "400em",
                                            height: V(l),
                                            viewBox: "0 0 " + r + " " + a,
                                            preserveAspectRatio: m[n] + " slice"
                                        })
                                          , u = Oe.makeSvgSpan([c[n]], [p], t);
                                        if (1 === h)
                                            return {
                                                span: u,
                                                minWidth: i,
                                                height: l
                                            };
                                        u.style.height = V(l),
                                        e.push(u)
                                    }
                                    return {
                                        span: Oe.makeSpan(["stretchy"], e, t),
                                        minWidth: i,
                                        height: l
                                    }
                                }
                                var o
                            }();
                            return r.height = o,
                            r.style.height = V(o),
                            n > 0 && (r.style.minWidth = V(n)),
                            r
                        };
                        function zt(e, t) {
                            if (!e || e.type !== t)
                                throw new Error("Expected node of type " + t + ", but got " + (e ? "node of type " + e.type : String(e)));
                            return e
                        }
                        function At(e) {
                            const t = Tt(e);
                            if (!t)
                                throw new Error("Expected node of symbol group type, but got " + (e ? "node of type " + e.type : String(e)));
                            return t
                        }
                        function Tt(e) {
                            return e && ("atom" === e.type || te.hasOwnProperty(e.type)) ? e : null
                        }
                        const Bt = (e, t) => {
                            let r, n, o;
                            e && "supsub" === e.type ? (n = zt(e.base, "accent"),
                            r = n.base,
                            e.base = r,
                            o = function(e) {
                                if (e instanceof X)
                                    return e;
                                throw new Error("Expected span<HtmlDomNode> but got " + String(e) + ".")
                            }(st(e, t)),
                            e.base = n) : (n = zt(e, "accent"),
                            r = n.base);
                            const s = st(r, t.havingCrampedStyle());
                            let i = 0;
                            if (n.isShifty && l.isCharacterBox(r)) {
                                const e = l.getBaseElem(r);
                                i = Q(st(e, t.havingCrampedStyle())).skew
                            }
                            const a = "\\c" === n.label;
                            let h, c = a ? s.height + s.depth : Math.min(s.height, t.fontMetrics().xHeight);
                            if (n.isStretchy)
                                h = Mt(n, t),
                                h = Oe.makeVList({
                                    positionType: "firstBaseline",
                                    children: [{
                                        type: "elem",
                                        elem: s
                                    }, {
                                        type: "elem",
                                        elem: h,
                                        wrapperClasses: ["svg-align"],
                                        wrapperStyle: i > 0 ? {
                                            width: "calc(100% - " + V(2 * i) + ")",
                                            marginLeft: V(2 * i)
                                        } : void 0
                                    }]
                                }, t);
                            else {
                                let e, r;
                                "\\vec" === n.label ? (e = Oe.staticSvg("vec", t),
                                r = Oe.svgData.vec[1]) : (e = Oe.makeOrd({
                                    mode: n.mode,
                                    text: n.label
                                }, t, "textord"),
                                e = Q(e),
                                e.italic = 0,
                                r = e.width,
                                a && (c += e.depth)),
                                h = Oe.makeSpan(["accent-body"], [e]);
                                const o = "\\textcircled" === n.label;
                                o && (h.classes.push("accent-full"),
                                c = s.height);
                                let l = i;
                                o || (l -= r / 2),
                                h.style.left = V(l),
                                "\\textcircled" === n.label && (h.style.top = ".2em"),
                                h = Oe.makeVList({
                                    positionType: "firstBaseline",
                                    children: [{
                                        type: "elem",
                                        elem: s
                                    }, {
                                        type: "kern",
                                        size: -c
                                    }, {
                                        type: "elem",
                                        elem: h
                                    }]
                                }, t)
                            }
                            const m = Oe.makeSpan(["mord", "accent"], [h], t);
                            return o ? (o.children[0] = m,
                            o.height = Math.max(m.height, o.height),
                            o.classes[0] = "mord",
                            o) : m
                        }
                          , Ct = (e, t) => {
                            const r = e.isStretchy ? St(e.label) : new mt.MathNode("mo",[pt(e.label, e.mode)])
                              , n = new mt.MathNode("mover",[bt(e.base, t), r]);
                            return n.setAttribute("accent", "true"),
                            n
                        }
                          , Nt = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map((e => "\\" + e)).join("|"));
                        Ye({
                            type: "accent",
                            names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"],
                            props: {
                                numArgs: 1
                            },
                            handler: (e, t) => {
                                const r = We(t[0])
                                  , n = !Nt.test(e.funcName)
                                  , o = !n || "\\widehat" === e.funcName || "\\widetilde" === e.funcName || "\\widecheck" === e.funcName;
                                return {
                                    type: "accent",
                                    mode: e.parser.mode,
                                    label: e.funcName,
                                    isStretchy: n,
                                    isShifty: o,
                                    base: r
                                }
                            }
                            ,
                            htmlBuilder: Bt,
                            mathmlBuilder: Ct
                        }),
                        Ye({
                            type: "accent",
                            names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\c", "\\r", "\\H", "\\v", "\\textcircled"],
                            props: {
                                numArgs: 1,
                                allowedInText: !0,
                                allowedInMath: !0,
                                argTypes: ["primitive"]
                            },
                            handler: (e, t) => {
                                const r = t[0];
                                let n = e.parser.mode;
                                return "math" === n && (e.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + e.funcName + " works only in text mode"),
                                n = "text"),
                                {
                                    type: "accent",
                                    mode: n,
                                    label: e.funcName,
                                    isStretchy: !1,
                                    isShifty: !0,
                                    base: r
                                }
                            }
                            ,
                            htmlBuilder: Bt,
                            mathmlBuilder: Ct
                        }),
                        Ye({
                            type: "accentUnder",
                            names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"],
                            props: {
                                numArgs: 1
                            },
                            handler: (e, t) => {
                                let {parser: r, funcName: n} = e;
                                const o = t[0];
                                return {
                                    type: "accentUnder",
                                    mode: r.mode,
                                    label: n,
                                    base: o
                                }
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                const r = st(e.base, t)
                                  , n = Mt(e, t)
                                  , o = "\\utilde" === e.label ? .12 : 0
                                  , s = Oe.makeVList({
                                    positionType: "top",
                                    positionData: r.height,
                                    children: [{
                                        type: "elem",
                                        elem: n,
                                        wrapperClasses: ["svg-align"]
                                    }, {
                                        type: "kern",
                                        size: o
                                    }, {
                                        type: "elem",
                                        elem: r
                                    }]
                                }, t);
                                return Oe.makeSpan(["mord", "accentunder"], [s], t)
                            }
                            ,
                            mathmlBuilder: (e, t) => {
                                const r = St(e.label)
                                  , n = new mt.MathNode("munder",[bt(e.base, t), r]);
                                return n.setAttribute("accentunder", "true"),
                                n
                            }
                        });
                        const qt = e => {
                            const t = new mt.MathNode("mpadded",e ? [e] : []);
                            return t.setAttribute("width", "+0.6em"),
                            t.setAttribute("lspace", "0.3em"),
                            t
                        }
                        ;
                        Ye({
                            type: "xArrow",
                            names: ["\\xleftarrow", "\\xrightarrow", "\\xLeftarrow", "\\xRightarrow", "\\xleftrightarrow", "\\xLeftrightarrow", "\\xhookleftarrow", "\\xhookrightarrow", "\\xmapsto", "\\xrightharpoondown", "\\xrightharpoonup", "\\xleftharpoondown", "\\xleftharpoonup", "\\xrightleftharpoons", "\\xleftrightharpoons", "\\xlongequal", "\\xtwoheadrightarrow", "\\xtwoheadleftarrow", "\\xtofrom", "\\xrightleftarrows", "\\xrightequilibrium", "\\xleftequilibrium", "\\\\cdrightarrow", "\\\\cdleftarrow", "\\\\cdlongequal"],
                            props: {
                                numArgs: 1,
                                numOptionalArgs: 1
                            },
                            handler(e, t, r) {
                                let {parser: n, funcName: o} = e;
                                return {
                                    type: "xArrow",
                                    mode: n.mode,
                                    label: o,
                                    body: t[0],
                                    below: r[0]
                                }
                            },
                            htmlBuilder(e, t) {
                                const r = t.style;
                                let n = t.havingStyle(r.sup());
                                const o = Oe.wrapFragment(st(e.body, n, t), t)
                                  , s = "\\x" === e.label.slice(0, 2) ? "x" : "cd";
                                let i;
                                o.classes.push(s + "-arrow-pad"),
                                e.below && (n = t.havingStyle(r.sub()),
                                i = Oe.wrapFragment(st(e.below, n, t), t),
                                i.classes.push(s + "-arrow-pad"));
                                const a = Mt(e, t)
                                  , l = -t.fontMetrics().axisHeight + .5 * a.height;
                                let h, c = -t.fontMetrics().axisHeight - .5 * a.height - .111;
                                if ((o.depth > .25 || "\\xleftequilibrium" === e.label) && (c -= o.depth),
                                i) {
                                    const e = -t.fontMetrics().axisHeight + i.height + .5 * a.height + .111;
                                    h = Oe.makeVList({
                                        positionType: "individualShift",
                                        children: [{
                                            type: "elem",
                                            elem: o,
                                            shift: c
                                        }, {
                                            type: "elem",
                                            elem: a,
                                            shift: l
                                        }, {
                                            type: "elem",
                                            elem: i,
                                            shift: e
                                        }]
                                    }, t)
                                } else
                                    h = Oe.makeVList({
                                        positionType: "individualShift",
                                        children: [{
                                            type: "elem",
                                            elem: o,
                                            shift: c
                                        }, {
                                            type: "elem",
                                            elem: a,
                                            shift: l
                                        }]
                                    }, t);
                                return h.children[0].children[0].children[1].classes.push("svg-align"),
                                Oe.makeSpan(["mrel", "x-arrow"], [h], t)
                            },
                            mathmlBuilder(e, t) {
                                const r = St(e.label);
                                let n;
                                if (r.setAttribute("minsize", "x" === e.label.charAt(0) ? "1.75em" : "3.0em"),
                                e.body) {
                                    const o = qt(bt(e.body, t));
                                    if (e.below) {
                                        const s = qt(bt(e.below, t));
                                        n = new mt.MathNode("munderover",[r, s, o])
                                    } else
                                        n = new mt.MathNode("mover",[r, o])
                                } else if (e.below) {
                                    const o = qt(bt(e.below, t));
                                    n = new mt.MathNode("munder",[r, o])
                                } else
                                    n = qt(),
                                    n = new mt.MathNode("mover",[r, n]);
                                return n
                            }
                        });
                        const It = Oe.makeSpan;
                        function Rt(e, t) {
                            const r = Qe(e.body, t, !0);
                            return It([e.mclass], r, t)
                        }
                        function Ht(e, t) {
                            let r;
                            const n = gt(e.body, t);
                            return "minner" === e.mclass ? r = new mt.MathNode("mpadded",n) : "mord" === e.mclass ? e.isCharacterBox ? (r = n[0],
                            r.type = "mi") : r = new mt.MathNode("mi",n) : (e.isCharacterBox ? (r = n[0],
                            r.type = "mo") : r = new mt.MathNode("mo",n),
                            "mbin" === e.mclass ? (r.attributes.lspace = "0.22em",
                            r.attributes.rspace = "0.22em") : "mpunct" === e.mclass ? (r.attributes.lspace = "0em",
                            r.attributes.rspace = "0.17em") : "mopen" === e.mclass || "mclose" === e.mclass ? (r.attributes.lspace = "0em",
                            r.attributes.rspace = "0em") : "minner" === e.mclass && (r.attributes.lspace = "0.0556em",
                            r.attributes.width = "+0.1111em")),
                            r
                        }
                        Ye({
                            type: "mclass",
                            names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"],
                            props: {
                                numArgs: 1,
                                primitive: !0
                            },
                            handler(e, t) {
                                let {parser: r, funcName: n} = e;
                                const o = t[0];
                                return {
                                    type: "mclass",
                                    mode: r.mode,
                                    mclass: "m" + n.slice(5),
                                    body: _e(o),
                                    isCharacterBox: l.isCharacterBox(o)
                                }
                            },
                            htmlBuilder: Rt,
                            mathmlBuilder: Ht
                        });
                        const Ot = e => {
                            const t = "ordgroup" === e.type && e.body.length ? e.body[0] : e;
                            return "atom" !== t.type || "bin" !== t.family && "rel" !== t.family ? "mord" : "m" + t.family
                        }
                        ;
                        Ye({
                            type: "mclass",
                            names: ["\\@binrel"],
                            props: {
                                numArgs: 2
                            },
                            handler(e, t) {
                                let {parser: r} = e;
                                return {
                                    type: "mclass",
                                    mode: r.mode,
                                    mclass: Ot(t[0]),
                                    body: _e(t[1]),
                                    isCharacterBox: l.isCharacterBox(t[1])
                                }
                            }
                        }),
                        Ye({
                            type: "mclass",
                            names: ["\\stackrel", "\\overset", "\\underset"],
                            props: {
                                numArgs: 2
                            },
                            handler(e, t) {
                                let {parser: r, funcName: n} = e;
                                const o = t[1]
                                  , s = t[0];
                                let i;
                                i = "\\stackrel" !== n ? Ot(o) : "mrel";
                                const a = {
                                    type: "op",
                                    mode: o.mode,
                                    limits: !0,
                                    alwaysHandleSupSub: !0,
                                    parentIsSupSub: !1,
                                    symbol: !1,
                                    suppressBaseShift: "\\stackrel" !== n,
                                    body: _e(o)
                                }
                                  , h = {
                                    type: "supsub",
                                    mode: s.mode,
                                    base: a,
                                    sup: "\\underset" === n ? null : s,
                                    sub: "\\underset" === n ? s : null
                                };
                                return {
                                    type: "mclass",
                                    mode: r.mode,
                                    mclass: i,
                                    body: [h],
                                    isCharacterBox: l.isCharacterBox(h)
                                }
                            },
                            htmlBuilder: Rt,
                            mathmlBuilder: Ht
                        }),
                        Ye({
                            type: "pmb",
                            names: ["\\pmb"],
                            props: {
                                numArgs: 1,
                                allowedInText: !0
                            },
                            handler(e, t) {
                                let {parser: r} = e;
                                return {
                                    type: "pmb",
                                    mode: r.mode,
                                    mclass: Ot(t[0]),
                                    body: _e(t[0])
                                }
                            },
                            htmlBuilder(e, t) {
                                const r = Qe(e.body, t, !0)
                                  , n = Oe.makeSpan([e.mclass], r, t);
                                return n.style.textShadow = "0.02em 0.01em 0.04px",
                                n
                            },
                            mathmlBuilder(e, t) {
                                const r = gt(e.body, t)
                                  , n = new mt.MathNode("mstyle",r);
                                return n.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px"),
                                n
                            }
                        });
                        const Et = {
                            ">": "\\\\cdrightarrow",
                            "<": "\\\\cdleftarrow",
                            "=": "\\\\cdlongequal",
                            A: "\\uparrow",
                            V: "\\downarrow",
                            "|": "\\Vert",
                            ".": "no arrow"
                        }
                          , Lt = e => "textord" === e.type && "@" === e.text;
                        function Dt(e, t, r) {
                            const n = Et[e];
                            switch (n) {
                            case "\\\\cdrightarrow":
                            case "\\\\cdleftarrow":
                                return r.callFunction(n, [t[0]], [t[1]]);
                            case "\\uparrow":
                            case "\\downarrow":
                                {
                                    const e = {
                                        type: "atom",
                                        text: n,
                                        mode: "math",
                                        family: "rel"
                                    }
                                      , o = {
                                        type: "ordgroup",
                                        mode: "math",
                                        body: [r.callFunction("\\\\cdleft", [t[0]], []), r.callFunction("\\Big", [e], []), r.callFunction("\\\\cdright", [t[1]], [])]
                                    };
                                    return r.callFunction("\\\\cdparent", [o], [])
                                }
                            case "\\\\cdlongequal":
                                return r.callFunction("\\\\cdlongequal", [], []);
                            case "\\Vert":
                                {
                                    const e = {
                                        type: "textord",
                                        text: "\\Vert",
                                        mode: "math"
                                    };
                                    return r.callFunction("\\Big", [e], [])
                                }
                            default:
                                return {
                                    type: "textord",
                                    text: " ",
                                    mode: "math"
                                }
                            }
                        }
                        Ye({
                            type: "cdlabel",
                            names: ["\\\\cdleft", "\\\\cdright"],
                            props: {
                                numArgs: 1
                            },
                            handler(e, t) {
                                let {parser: r, funcName: n} = e;
                                return {
                                    type: "cdlabel",
                                    mode: r.mode,
                                    side: n.slice(4),
                                    label: t[0]
                                }
                            },
                            htmlBuilder(e, t) {
                                const r = t.havingStyle(t.style.sup())
                                  , n = Oe.wrapFragment(st(e.label, r, t), t);
                                return n.classes.push("cd-label-" + e.side),
                                n.style.bottom = V(.8 - n.depth),
                                n.height = 0,
                                n.depth = 0,
                                n
                            },
                            mathmlBuilder(e, t) {
                                let r = new mt.MathNode("mrow",[bt(e.label, t)]);
                                return r = new mt.MathNode("mpadded",[r]),
                                r.setAttribute("width", "0"),
                                "left" === e.side && r.setAttribute("lspace", "-1width"),
                                r.setAttribute("voffset", "0.7em"),
                                r = new mt.MathNode("mstyle",[r]),
                                r.setAttribute("displaystyle", "false"),
                                r.setAttribute("scriptlevel", "1"),
                                r
                            }
                        }),
                        Ye({
                            type: "cdlabelparent",
                            names: ["\\\\cdparent"],
                            props: {
                                numArgs: 1
                            },
                            handler(e, t) {
                                let {parser: r} = e;
                                return {
                                    type: "cdlabelparent",
                                    mode: r.mode,
                                    fragment: t[0]
                                }
                            },
                            htmlBuilder(e, t) {
                                const r = Oe.wrapFragment(st(e.fragment, t), t);
                                return r.classes.push("cd-vert-arrow"),
                                r
                            },
                            mathmlBuilder(e, t) {
                                return new mt.MathNode("mrow",[bt(e.fragment, t)])
                            }
                        }),
                        Ye({
                            type: "textord",
                            names: ["\\@char"],
                            props: {
                                numArgs: 1,
                                allowedInText: !0
                            },
                            handler(e, t) {
                                let {parser: r} = e;
                                const o = zt(t[0], "ordgroup").body;
                                let s = "";
                                for (let e = 0; e < o.length; e++)
                                    s += zt(o[e], "textord").text;
                                let i, a = parseInt(s);
                                if (isNaN(a))
                                    throw new n("\\@char has non-numeric argument " + s);
                                if (a < 0 || a >= 1114111)
                                    throw new n("\\@char with invalid code point " + s);
                                return a <= 65535 ? i = String.fromCharCode(a) : (a -= 65536,
                                i = String.fromCharCode(55296 + (a >> 10), 56320 + (1023 & a))),
                                {
                                    type: "textord",
                                    mode: r.mode,
                                    text: i
                                }
                            }
                        });
                        const Pt = (e, t) => {
                            const r = Qe(e.body, t.withColor(e.color), !1);
                            return Oe.makeFragment(r)
                        }
                          , Vt = (e, t) => {
                            const r = gt(e.body, t.withColor(e.color))
                              , n = new mt.MathNode("mstyle",r);
                            return n.setAttribute("mathcolor", e.color),
                            n
                        }
                        ;
                        Ye({
                            type: "color",
                            names: ["\\textcolor"],
                            props: {
                                numArgs: 2,
                                allowedInText: !0,
                                argTypes: ["color", "original"]
                            },
                            handler(e, t) {
                                let {parser: r} = e;
                                const n = zt(t[0], "color-token").color
                                  , o = t[1];
                                return {
                                    type: "color",
                                    mode: r.mode,
                                    color: n,
                                    body: _e(o)
                                }
                            },
                            htmlBuilder: Pt,
                            mathmlBuilder: Vt
                        }),
                        Ye({
                            type: "color",
                            names: ["\\color"],
                            props: {
                                numArgs: 1,
                                allowedInText: !0,
                                argTypes: ["color"]
                            },
                            handler(e, t) {
                                let {parser: r, breakOnTokenText: n} = e;
                                const o = zt(t[0], "color-token").color;
                                r.gullet.macros.set("\\current@color", o);
                                const s = r.parseExpression(!0, n);
                                return {
                                    type: "color",
                                    mode: r.mode,
                                    color: o,
                                    body: s
                                }
                            },
                            htmlBuilder: Pt,
                            mathmlBuilder: Vt
                        }),
                        Ye({
                            type: "cr",
                            names: ["\\\\"],
                            props: {
                                numArgs: 0,
                                numOptionalArgs: 0,
                                allowedInText: !0
                            },
                            handler(e, t, r) {
                                let {parser: n} = e;
                                const o = "[" === n.gullet.future().text ? n.parseSizeGroup(!0) : null
                                  , s = !n.settings.displayMode || !n.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
                                return {
                                    type: "cr",
                                    mode: n.mode,
                                    newLine: s,
                                    size: o && zt(o, "size").value
                                }
                            },
                            htmlBuilder(e, t) {
                                const r = Oe.makeSpan(["mspace"], [], t);
                                return e.newLine && (r.classes.push("newline"),
                                e.size && (r.style.marginTop = V(P(e.size, t)))),
                                r
                            },
                            mathmlBuilder(e, t) {
                                const r = new mt.MathNode("mspace");
                                return e.newLine && (r.setAttribute("linebreak", "newline"),
                                e.size && r.setAttribute("height", V(P(e.size, t)))),
                                r
                            }
                        });
                        const Ft = {
                            "\\global": "\\global",
                            "\\long": "\\\\globallong",
                            "\\\\globallong": "\\\\globallong",
                            "\\def": "\\gdef",
                            "\\gdef": "\\gdef",
                            "\\edef": "\\xdef",
                            "\\xdef": "\\xdef",
                            "\\let": "\\\\globallet",
                            "\\futurelet": "\\\\globalfuture"
                        }
                          , Gt = e => {
                            const t = e.text;
                            if (/^(?:[\\{}$&#^_]|EOF)$/.test(t))
                                throw new n("Expected a control sequence",e);
                            return t
                        }
                          , Ut = (e, t, r, n) => {
                            let o = e.gullet.macros.get(r.text);
                            null == o && (r.noexpand = !0,
                            o = {
                                tokens: [r],
                                numArgs: 0,
                                unexpandable: !e.gullet.isExpandable(r.text)
                            }),
                            e.gullet.macros.set(t, o, n)
                        }
                        ;
                        Ye({
                            type: "internal",
                            names: ["\\global", "\\long", "\\\\globallong"],
                            props: {
                                numArgs: 0,
                                allowedInText: !0
                            },
                            handler(e) {
                                let {parser: t, funcName: r} = e;
                                t.consumeSpaces();
                                const o = t.fetch();
                                if (Ft[o.text])
                                    return "\\global" !== r && "\\\\globallong" !== r || (o.text = Ft[o.text]),
                                    zt(t.parseFunction(), "internal");
                                throw new n("Invalid token after macro prefix",o)
                            }
                        }),
                        Ye({
                            type: "internal",
                            names: ["\\def", "\\gdef", "\\edef", "\\xdef"],
                            props: {
                                numArgs: 0,
                                allowedInText: !0,
                                primitive: !0
                            },
                            handler(e) {
                                let {parser: t, funcName: r} = e
                                  , o = t.gullet.popToken();
                                const s = o.text;
                                if (/^(?:[\\{}$&#^_]|EOF)$/.test(s))
                                    throw new n("Expected a control sequence",o);
                                let i, a = 0;
                                const l = [[]];
                                for (; "{" !== t.gullet.future().text; )
                                    if (o = t.gullet.popToken(),
                                    "#" === o.text) {
                                        if ("{" === t.gullet.future().text) {
                                            i = t.gullet.future(),
                                            l[a].push("{");
                                            break
                                        }
                                        if (o = t.gullet.popToken(),
                                        !/^[1-9]$/.test(o.text))
                                            throw new n('Invalid argument number "' + o.text + '"');
                                        if (parseInt(o.text) !== a + 1)
                                            throw new n('Argument number "' + o.text + '" out of order');
                                        a++,
                                        l.push([])
                                    } else {
                                        if ("EOF" === o.text)
                                            throw new n("Expected a macro definition");
                                        l[a].push(o.text)
                                    }
                                let {tokens: h} = t.gullet.consumeArg();
                                return i && h.unshift(i),
                                "\\edef" !== r && "\\xdef" !== r || (h = t.gullet.expandTokens(h),
                                h.reverse()),
                                t.gullet.macros.set(s, {
                                    tokens: h,
                                    numArgs: a,
                                    delimiters: l
                                }, r === Ft[r]),
                                {
                                    type: "internal",
                                    mode: t.mode
                                }
                            }
                        }),
                        Ye({
                            type: "internal",
                            names: ["\\let", "\\\\globallet"],
                            props: {
                                numArgs: 0,
                                allowedInText: !0,
                                primitive: !0
                            },
                            handler(e) {
                                let {parser: t, funcName: r} = e;
                                const n = Gt(t.gullet.popToken());
                                t.gullet.consumeSpaces();
                                const o = (e => {
                                    let t = e.gullet.popToken();
                                    return "=" === t.text && (t = e.gullet.popToken(),
                                    " " === t.text && (t = e.gullet.popToken())),
                                    t
                                }
                                )(t);
                                return Ut(t, n, o, "\\\\globallet" === r),
                                {
                                    type: "internal",
                                    mode: t.mode
                                }
                            }
                        }),
                        Ye({
                            type: "internal",
                            names: ["\\futurelet", "\\\\globalfuture"],
                            props: {
                                numArgs: 0,
                                allowedInText: !0,
                                primitive: !0
                            },
                            handler(e) {
                                let {parser: t, funcName: r} = e;
                                const n = Gt(t.gullet.popToken())
                                  , o = t.gullet.popToken()
                                  , s = t.gullet.popToken();
                                return Ut(t, n, s, "\\\\globalfuture" === r),
                                t.gullet.pushToken(s),
                                t.gullet.pushToken(o),
                                {
                                    type: "internal",
                                    mode: t.mode
                                }
                            }
                        });
                        const Yt = function(e, t, r) {
                            const n = C(ne.math[e] && ne.math[e].replace || e, t, r);
                            if (!n)
                                throw new Error("Unsupported symbol " + e + " and font size " + t + ".");
                            return n
                        }
                          , Xt = function(e, t, r, n) {
                            const o = r.havingBaseStyle(t)
                              , s = Oe.makeSpan(n.concat(o.sizingClasses(r)), [e], r)
                              , i = o.sizeMultiplier / r.sizeMultiplier;
                            return s.height *= i,
                            s.depth *= i,
                            s.maxFontSize = o.sizeMultiplier,
                            s
                        }
                          , Wt = function(e, t, r) {
                            const n = t.havingBaseStyle(r)
                              , o = (1 - t.sizeMultiplier / n.sizeMultiplier) * t.fontMetrics().axisHeight;
                            e.classes.push("delimcenter"),
                            e.style.top = V(o),
                            e.height -= o,
                            e.depth += o
                        }
                          , _t = function(e, t, r, n, o, s) {
                            const i = function(e, t, r, n) {
                                return Oe.makeSymbol(e, "Size" + t + "-Regular", r, n)
                            }(e, t, o, n)
                              , a = Xt(Oe.makeSpan(["delimsizing", "size" + t], [i], n), w.TEXT, n, s);
                            return r && Wt(a, n, w.TEXT),
                            a
                        }
                          , jt = function(e, t, r) {
                            let n;
                            return n = "Size1-Regular" === t ? "delim-size1" : "delim-size4",
                            {
                                type: "elem",
                                elem: Oe.makeSpan(["delimsizinginner", n], [Oe.makeSpan([], [Oe.makeSymbol(e, t, r)])])
                            }
                        }
                          , $t = function(e, t, r) {
                            const n = A["Size4-Regular"][e.charCodeAt(0)] ? A["Size4-Regular"][e.charCodeAt(0)][4] : A["Size1-Regular"][e.charCodeAt(0)][4]
                              , o = new K("inner",function(e, t) {
                                switch (e) {
                                case "⎜":
                                    return "M291 0 H417 V" + t + " H291z M291 0 H417 V" + t + " H291z";
                                case "∣":
                                    return "M145 0 H188 V" + t + " H145z M145 0 H188 V" + t + " H145z";
                                case "∥":
                                    return "M145 0 H188 V" + t + " H145z M145 0 H188 V" + t + " H145zM367 0 H410 V" + t + " H367z M367 0 H410 V" + t + " H367z";
                                case "⎟":
                                    return "M457 0 H583 V" + t + " H457z M457 0 H583 V" + t + " H457z";
                                case "⎢":
                                    return "M319 0 H403 V" + t + " H319z M319 0 H403 V" + t + " H319z";
                                case "⎥":
                                    return "M263 0 H347 V" + t + " H263z M263 0 H347 V" + t + " H263z";
                                case "⎪":
                                    return "M384 0 H504 V" + t + " H384z M384 0 H504 V" + t + " H384z";
                                case "⏐":
                                    return "M312 0 H355 V" + t + " H312z M312 0 H355 V" + t + " H312z";
                                case "‖":
                                    return "M257 0 H300 V" + t + " H257z M257 0 H300 V" + t + " H257zM478 0 H521 V" + t + " H478z M478 0 H521 V" + t + " H478z";
                                default:
                                    return ""
                                }
                            }(e, Math.round(1e3 * t)))
                              , s = new Z([o],{
                                width: V(n),
                                height: V(t),
                                style: "width:" + V(n),
                                viewBox: "0 0 " + 1e3 * n + " " + Math.round(1e3 * t),
                                preserveAspectRatio: "xMinYMin"
                            })
                              , i = Oe.makeSvgSpan([], [s], r);
                            return i.height = t,
                            i.style.height = V(t),
                            i.style.width = V(n),
                            {
                                type: "elem",
                                elem: i
                            }
                        }
                          , Zt = {
                            type: "kern",
                            size: -.008
                        }
                          , Kt = ["|", "\\lvert", "\\rvert", "\\vert"]
                          , Jt = ["\\|", "\\lVert", "\\rVert", "\\Vert"]
                          , Qt = function(e, t, r, n, o, s) {
                            let i, a, h, c, m = "", p = 0;
                            i = h = c = e,
                            a = null;
                            let u = "Size1-Regular";
                            "\\uparrow" === e ? h = c = "⏐" : "\\Uparrow" === e ? h = c = "‖" : "\\downarrow" === e ? i = h = "⏐" : "\\Downarrow" === e ? i = h = "‖" : "\\updownarrow" === e ? (i = "\\uparrow",
                            h = "⏐",
                            c = "\\downarrow") : "\\Updownarrow" === e ? (i = "\\Uparrow",
                            h = "‖",
                            c = "\\Downarrow") : l.contains(Kt, e) ? (h = "∣",
                            m = "vert",
                            p = 333) : l.contains(Jt, e) ? (h = "∥",
                            m = "doublevert",
                            p = 556) : "[" === e || "\\lbrack" === e ? (i = "⎡",
                            h = "⎢",
                            c = "⎣",
                            u = "Size4-Regular",
                            m = "lbrack",
                            p = 667) : "]" === e || "\\rbrack" === e ? (i = "⎤",
                            h = "⎥",
                            c = "⎦",
                            u = "Size4-Regular",
                            m = "rbrack",
                            p = 667) : "\\lfloor" === e || "⌊" === e ? (h = i = "⎢",
                            c = "⎣",
                            u = "Size4-Regular",
                            m = "lfloor",
                            p = 667) : "\\lceil" === e || "⌈" === e ? (i = "⎡",
                            h = c = "⎢",
                            u = "Size4-Regular",
                            m = "lceil",
                            p = 667) : "\\rfloor" === e || "⌋" === e ? (h = i = "⎥",
                            c = "⎦",
                            u = "Size4-Regular",
                            m = "rfloor",
                            p = 667) : "\\rceil" === e || "⌉" === e ? (i = "⎤",
                            h = c = "⎥",
                            u = "Size4-Regular",
                            m = "rceil",
                            p = 667) : "(" === e || "\\lparen" === e ? (i = "⎛",
                            h = "⎜",
                            c = "⎝",
                            u = "Size4-Regular",
                            m = "lparen",
                            p = 875) : ")" === e || "\\rparen" === e ? (i = "⎞",
                            h = "⎟",
                            c = "⎠",
                            u = "Size4-Regular",
                            m = "rparen",
                            p = 875) : "\\{" === e || "\\lbrace" === e ? (i = "⎧",
                            a = "⎨",
                            c = "⎩",
                            h = "⎪",
                            u = "Size4-Regular") : "\\}" === e || "\\rbrace" === e ? (i = "⎫",
                            a = "⎬",
                            c = "⎭",
                            h = "⎪",
                            u = "Size4-Regular") : "\\lgroup" === e || "⟮" === e ? (i = "⎧",
                            c = "⎩",
                            h = "⎪",
                            u = "Size4-Regular") : "\\rgroup" === e || "⟯" === e ? (i = "⎫",
                            c = "⎭",
                            h = "⎪",
                            u = "Size4-Regular") : "\\lmoustache" === e || "⎰" === e ? (i = "⎧",
                            c = "⎭",
                            h = "⎪",
                            u = "Size4-Regular") : "\\rmoustache" !== e && "⎱" !== e || (i = "⎫",
                            c = "⎩",
                            h = "⎪",
                            u = "Size4-Regular");
                            const d = Yt(i, u, o)
                              , g = d.height + d.depth
                              , f = Yt(h, u, o)
                              , b = f.height + f.depth
                              , y = Yt(c, u, o)
                              , x = y.height + y.depth;
                            let v = 0
                              , k = 1;
                            if (null !== a) {
                                const e = Yt(a, u, o);
                                v = e.height + e.depth,
                                k = 2
                            }
                            const S = g + x + v
                              , M = S + Math.max(0, Math.ceil((t - S) / (k * b))) * k * b;
                            let z = n.fontMetrics().axisHeight;
                            r && (z *= n.sizeMultiplier);
                            const A = M / 2 - z
                              , T = [];
                            if (m.length > 0) {
                                const e = M - g - x
                                  , t = Math.round(1e3 * M)
                                  , r = function(e, t) {
                                    switch (e) {
                                    case "lbrack":
                                        return "M403 1759 V84 H666 V0 H319 V1759 v" + t + " v1759 h347 v-84\nH403z M403 1759 V0 H319 V1759 v" + t + " v1759 h84z";
                                    case "rbrack":
                                        return "M347 1759 V0 H0 V84 H263 V1759 v" + t + " v1759 H0 v84 H347z\nM347 1759 V0 H263 V1759 v" + t + " v1759 h84z";
                                    case "vert":
                                        return "M145 15 v585 v" + t + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -t + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + t + " v585 h43z";
                                    case "doublevert":
                                        return "M145 15 v585 v" + t + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -t + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + t + " v585 h43z\nM367 15 v585 v" + t + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -t + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M410 15 H367 v585 v" + t + " v585 h43z";
                                    case "lfloor":
                                        return "M319 602 V0 H403 V602 v" + t + " v1715 h263 v84 H319z\nMM319 602 V0 H403 V602 v" + t + " v1715 H319z";
                                    case "rfloor":
                                        return "M319 602 V0 H403 V602 v" + t + " v1799 H0 v-84 H319z\nMM319 602 V0 H403 V602 v" + t + " v1715 H319z";
                                    case "lceil":
                                        return "M403 1759 V84 H666 V0 H319 V1759 v" + t + " v602 h84z\nM403 1759 V0 H319 V1759 v" + t + " v602 h84z";
                                    case "rceil":
                                        return "M347 1759 V0 H0 V84 H263 V1759 v" + t + " v602 h84z\nM347 1759 V0 h-84 V1759 v" + t + " v602 h84z";
                                    case "lparen":
                                        return "M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1\nc-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,\n-36,557 l0," + (t + 84) + "c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,\n949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9\nc0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,\n-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189\nl0,-" + (t + 92) + "c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,\n-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z";
                                    case "rparen":
                                        return "M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,\n63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5\nc11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0," + (t + 9) + "\nc-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664\nc-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11\nc0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17\nc242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558\nl0,-" + (t + 144) + "c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,\n-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z";
                                    default:
                                        throw new Error("Unknown stretchy delimiter.")
                                    }
                                }(m, Math.round(1e3 * e))
                                  , o = new K(m,r)
                                  , s = (p / 1e3).toFixed(3) + "em"
                                  , i = (t / 1e3).toFixed(3) + "em"
                                  , a = new Z([o],{
                                    width: s,
                                    height: i,
                                    viewBox: "0 0 " + p + " " + t
                                })
                                  , l = Oe.makeSvgSpan([], [a], n);
                                l.height = t / 1e3,
                                l.style.width = s,
                                l.style.height = i,
                                T.push({
                                    type: "elem",
                                    elem: l
                                })
                            } else {
                                if (T.push(jt(c, u, o)),
                                T.push(Zt),
                                null === a) {
                                    const e = M - g - x + .016;
                                    T.push($t(h, e, n))
                                } else {
                                    const e = (M - g - x - v) / 2 + .016;
                                    T.push($t(h, e, n)),
                                    T.push(Zt),
                                    T.push(jt(a, u, o)),
                                    T.push(Zt),
                                    T.push($t(h, e, n))
                                }
                                T.push(Zt),
                                T.push(jt(i, u, o))
                            }
                            const B = n.havingBaseStyle(w.TEXT)
                              , C = Oe.makeVList({
                                positionType: "bottom",
                                positionData: A,
                                children: T
                            }, B);
                            return Xt(Oe.makeSpan(["delimsizing", "mult"], [C], B), w.TEXT, n, s)
                        }
                          , er = .08
                          , tr = function(e, t, r, n, o) {
                            const s = function(e, t, r) {
                                t *= 1e3;
                                let n = "";
                                switch (e) {
                                case "sqrtMain":
                                    n = function(e, t) {
                                        return "M95," + (622 + e + 80) + "\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl" + e / 2.075 + " -" + e + "\nc5.3,-9.3,12,-14,20,-14\nH400000v" + (40 + e) + "H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM" + (834 + e) + " 80h400000v" + (40 + e) + "h-400000z"
                                    }(t);
                                    break;
                                case "sqrtSize1":
                                    n = function(e, t) {
                                        return "M263," + (601 + e + 80) + "c0.7,0,18,39.7,52,119\nc34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120\nc340,-704.7,510.7,-1060.3,512,-1067\nl" + e / 2.084 + " -" + e + "\nc4.7,-7.3,11,-11,19,-11\nH40000v" + (40 + e) + "H1012.3\ns-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232\nc-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1\ns-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26\nc-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z\nM" + (1001 + e) + " 80h400000v" + (40 + e) + "h-400000z"
                                    }(t);
                                    break;
                                case "sqrtSize2":
                                    n = function(e, t) {
                                        return "M983 " + (10 + e + 80) + "\nl" + e / 3.13 + " -" + e + "\nc4,-6.7,10,-10,18,-10 H400000v" + (40 + e) + "\nH1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7\ns-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744\nc-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30\nc26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722\nc56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5\nc53.7,-170.3,84.5,-266.8,92.5,-289.5z\nM" + (1001 + e) + " 80h400000v" + (40 + e) + "h-400000z"
                                    }(t);
                                    break;
                                case "sqrtSize3":
                                    n = function(e, t) {
                                        return "M424," + (2398 + e + 80) + "\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl" + e / 4.223 + " -" + e + "c4,-6.7,10,-10,18,-10 H400000\nv" + (40 + e) + "H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M" + (1001 + e) + " 80\nh400000v" + (40 + e) + "h-400000z"
                                    }(t);
                                    break;
                                case "sqrtSize4":
                                    n = function(e, t) {
                                        return "M473," + (2713 + e + 80) + "\nc339.3,-1799.3,509.3,-2700,510,-2702 l" + e / 5.298 + " -" + e + "\nc3.3,-7.3,9.3,-11,18,-11 H400000v" + (40 + e) + "H1017.7\ns-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200\nc0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26\ns76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,\n606zM" + (1001 + e) + " 80h400000v" + (40 + e) + "H1017.7z"
                                    }(t);
                                    break;
                                case "sqrtTall":
                                    n = function(e, t, r) {
                                        return "M702 " + (e + 80) + "H400000" + (40 + e) + "\nH742v" + (r - 54 - 80 - e) + "l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1\nh-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170\nc-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667\n219 661 l218 661zM702 80H400000v" + (40 + e) + "H742z"
                                    }(t, 0, r)
                                }
                                return n
                            }(e, n, r)
                              , i = new K(e,s)
                              , a = new Z([i],{
                                width: "400em",
                                height: V(t),
                                viewBox: "0 0 400000 " + r,
                                preserveAspectRatio: "xMinYMin slice"
                            });
                            return Oe.makeSvgSpan(["hide-tail"], [a], o)
                        }
                          , rr = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "\\surd"]
                          , nr = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱"]
                          , or = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"]
                          , sr = [0, 1.2, 1.8, 2.4, 3]
                          , ir = [{
                            type: "small",
                            style: w.SCRIPTSCRIPT
                        }, {
                            type: "small",
                            style: w.SCRIPT
                        }, {
                            type: "small",
                            style: w.TEXT
                        }, {
                            type: "large",
                            size: 1
                        }, {
                            type: "large",
                            size: 2
                        }, {
                            type: "large",
                            size: 3
                        }, {
                            type: "large",
                            size: 4
                        }]
                          , ar = [{
                            type: "small",
                            style: w.SCRIPTSCRIPT
                        }, {
                            type: "small",
                            style: w.SCRIPT
                        }, {
                            type: "small",
                            style: w.TEXT
                        }, {
                            type: "stack"
                        }]
                          , lr = [{
                            type: "small",
                            style: w.SCRIPTSCRIPT
                        }, {
                            type: "small",
                            style: w.SCRIPT
                        }, {
                            type: "small",
                            style: w.TEXT
                        }, {
                            type: "large",
                            size: 1
                        }, {
                            type: "large",
                            size: 2
                        }, {
                            type: "large",
                            size: 3
                        }, {
                            type: "large",
                            size: 4
                        }, {
                            type: "stack"
                        }]
                          , hr = function(e) {
                            if ("small" === e.type)
                                return "Main-Regular";
                            if ("large" === e.type)
                                return "Size" + e.size + "-Regular";
                            if ("stack" === e.type)
                                return "Size4-Regular";
                            throw new Error("Add support for delim type '" + e.type + "' here.")
                        }
                          , cr = function(e, t, r, n) {
                            for (let o = Math.min(2, 3 - n.style.size); o < r.length && "stack" !== r[o].type; o++) {
                                const s = Yt(e, hr(r[o]), "math");
                                let i = s.height + s.depth;
                                if ("small" === r[o].type && (i *= n.havingBaseStyle(r[o].style).sizeMultiplier),
                                i > t)
                                    return r[o]
                            }
                            return r[r.length - 1]
                        }
                          , mr = function(e, t, r, n, o, s) {
                            let i;
                            "<" === e || "\\lt" === e || "⟨" === e ? e = "\\langle" : ">" !== e && "\\gt" !== e && "⟩" !== e || (e = "\\rangle"),
                            i = l.contains(or, e) ? ir : l.contains(rr, e) ? lr : ar;
                            const a = cr(e, t, i, n);
                            return "small" === a.type ? function(e, t, r, n, o, s) {
                                const i = Oe.makeSymbol(e, "Main-Regular", o, n)
                                  , a = Xt(i, t, n, s);
                                return r && Wt(a, n, t),
                                a
                            }(e, a.style, r, n, o, s) : "large" === a.type ? _t(e, a.size, r, n, o, s) : Qt(e, t, r, n, o, s)
                        };
                        var pr = {
                            sqrtImage: function(e, t) {
                                const r = t.havingBaseSizing()
                                  , n = cr("\\surd", e * r.sizeMultiplier, lr, r);
                                let o = r.sizeMultiplier;
                                const s = Math.max(0, t.minRuleThickness - t.fontMetrics().sqrtRuleThickness);
                                let i, a, l = 0, h = 0, c = 0;
                                return "small" === n.type ? (c = 1e3 + 1e3 * s + 80,
                                e < 1 ? o = 1 : e < 1.4 && (o = .7),
                                l = (1 + s + er) / o,
                                h = (1 + s) / o,
                                i = tr("sqrtMain", l, c, s, t),
                                i.style.minWidth = "0.853em",
                                a = .833 / o) : "large" === n.type ? (c = 1080 * sr[n.size],
                                h = (sr[n.size] + s) / o,
                                l = (sr[n.size] + s + er) / o,
                                i = tr("sqrtSize" + n.size, l, c, s, t),
                                i.style.minWidth = "1.02em",
                                a = 1 / o) : (l = e + s + er,
                                h = e + s,
                                c = Math.floor(1e3 * e + s) + 80,
                                i = tr("sqrtTall", l, c, s, t),
                                i.style.minWidth = "0.742em",
                                a = 1.056),
                                i.height = h,
                                i.style.height = V(l),
                                {
                                    span: i,
                                    advanceWidth: a,
                                    ruleWidth: (t.fontMetrics().sqrtRuleThickness + s) * o
                                }
                            },
                            sizedDelim: function(e, t, r, o, s) {
                                if ("<" === e || "\\lt" === e || "⟨" === e ? e = "\\langle" : ">" !== e && "\\gt" !== e && "⟩" !== e || (e = "\\rangle"),
                                l.contains(rr, e) || l.contains(or, e))
                                    return _t(e, t, !1, r, o, s);
                                if (l.contains(nr, e))
                                    return Qt(e, sr[t], !1, r, o, s);
                                throw new n("Illegal delimiter: '" + e + "'")
                            },
                            sizeToMaxHeight: sr,
                            customSizedDelim: mr,
                            leftRightDelim: function(e, t, r, n, o, s) {
                                const i = n.fontMetrics().axisHeight * n.sizeMultiplier
                                  , a = 5 / n.fontMetrics().ptPerEm
                                  , l = Math.max(t - i, r + i)
                                  , h = Math.max(l / 500 * 901, 2 * l - a);
                                return mr(e, h, !0, n, o, s)
                            }
                        };
                        const ur = {
                            "\\bigl": {
                                mclass: "mopen",
                                size: 1
                            },
                            "\\Bigl": {
                                mclass: "mopen",
                                size: 2
                            },
                            "\\biggl": {
                                mclass: "mopen",
                                size: 3
                            },
                            "\\Biggl": {
                                mclass: "mopen",
                                size: 4
                            },
                            "\\bigr": {
                                mclass: "mclose",
                                size: 1
                            },
                            "\\Bigr": {
                                mclass: "mclose",
                                size: 2
                            },
                            "\\biggr": {
                                mclass: "mclose",
                                size: 3
                            },
                            "\\Biggr": {
                                mclass: "mclose",
                                size: 4
                            },
                            "\\bigm": {
                                mclass: "mrel",
                                size: 1
                            },
                            "\\Bigm": {
                                mclass: "mrel",
                                size: 2
                            },
                            "\\biggm": {
                                mclass: "mrel",
                                size: 3
                            },
                            "\\Biggm": {
                                mclass: "mrel",
                                size: 4
                            },
                            "\\big": {
                                mclass: "mord",
                                size: 1
                            },
                            "\\Big": {
                                mclass: "mord",
                                size: 2
                            },
                            "\\bigg": {
                                mclass: "mord",
                                size: 3
                            },
                            "\\Bigg": {
                                mclass: "mord",
                                size: 4
                            }
                        }
                          , dr = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "<", ">", "\\langle", "⟨", "\\rangle", "⟩", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."];
                        function gr(e, t) {
                            const r = Tt(e);
                            if (r && l.contains(dr, r.text))
                                return r;
                            throw new n(r ? "Invalid delimiter '" + r.text + "' after '" + t.funcName + "'" : "Invalid delimiter type '" + e.type + "'",e)
                        }
                        function fr(e) {
                            if (!e.body)
                                throw new Error("Bug: The leftright ParseNode wasn't fully parsed.")
                        }
                        Ye({
                            type: "delimsizing",
                            names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"],
                            props: {
                                numArgs: 1,
                                argTypes: ["primitive"]
                            },
                            handler: (e, t) => {
                                const r = gr(t[0], e);
                                return {
                                    type: "delimsizing",
                                    mode: e.parser.mode,
                                    size: ur[e.funcName].size,
                                    mclass: ur[e.funcName].mclass,
                                    delim: r.text
                                }
                            }
                            ,
                            htmlBuilder: (e, t) => "." === e.delim ? Oe.makeSpan([e.mclass]) : pr.sizedDelim(e.delim, e.size, t, e.mode, [e.mclass]),
                            mathmlBuilder: e => {
                                const t = [];
                                "." !== e.delim && t.push(pt(e.delim, e.mode));
                                const r = new mt.MathNode("mo",t);
                                "mopen" === e.mclass || "mclose" === e.mclass ? r.setAttribute("fence", "true") : r.setAttribute("fence", "false"),
                                r.setAttribute("stretchy", "true");
                                const n = V(pr.sizeToMaxHeight[e.size]);
                                return r.setAttribute("minsize", n),
                                r.setAttribute("maxsize", n),
                                r
                            }
                        }),
                        Ye({
                            type: "leftright-right",
                            names: ["\\right"],
                            props: {
                                numArgs: 1,
                                primitive: !0
                            },
                            handler: (e, t) => {
                                const r = e.parser.gullet.macros.get("\\current@color");
                                if (r && "string" != typeof r)
                                    throw new n("\\current@color set to non-string in \\right");
                                return {
                                    type: "leftright-right",
                                    mode: e.parser.mode,
                                    delim: gr(t[0], e).text,
                                    color: r
                                }
                            }
                        }),
                        Ye({
                            type: "leftright",
                            names: ["\\left"],
                            props: {
                                numArgs: 1,
                                primitive: !0
                            },
                            handler: (e, t) => {
                                const r = gr(t[0], e)
                                  , n = e.parser;
                                ++n.leftrightDepth;
                                const o = n.parseExpression(!1);
                                --n.leftrightDepth,
                                n.expect("\\right", !1);
                                const s = zt(n.parseFunction(), "leftright-right");
                                return {
                                    type: "leftright",
                                    mode: n.mode,
                                    body: o,
                                    left: r.text,
                                    right: s.delim,
                                    rightColor: s.color
                                }
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                fr(e);
                                const r = Qe(e.body, t, !0, ["mopen", "mclose"]);
                                let n, o, s = 0, i = 0, a = !1;
                                for (let e = 0; e < r.length; e++)
                                    r[e].isMiddle ? a = !0 : (s = Math.max(r[e].height, s),
                                    i = Math.max(r[e].depth, i));
                                if (s *= t.sizeMultiplier,
                                i *= t.sizeMultiplier,
                                n = "." === e.left ? ot(t, ["mopen"]) : pr.leftRightDelim(e.left, s, i, t, e.mode, ["mopen"]),
                                r.unshift(n),
                                a)
                                    for (let t = 1; t < r.length; t++) {
                                        const n = r[t].isMiddle;
                                        n && (r[t] = pr.leftRightDelim(n.delim, s, i, n.options, e.mode, []))
                                    }
                                if ("." === e.right)
                                    o = ot(t, ["mclose"]);
                                else {
                                    const r = e.rightColor ? t.withColor(e.rightColor) : t;
                                    o = pr.leftRightDelim(e.right, s, i, r, e.mode, ["mclose"])
                                }
                                return r.push(o),
                                Oe.makeSpan(["minner"], r, t)
                            }
                            ,
                            mathmlBuilder: (e, t) => {
                                fr(e);
                                const r = gt(e.body, t);
                                if ("." !== e.left) {
                                    const t = new mt.MathNode("mo",[pt(e.left, e.mode)]);
                                    t.setAttribute("fence", "true"),
                                    r.unshift(t)
                                }
                                if ("." !== e.right) {
                                    const t = new mt.MathNode("mo",[pt(e.right, e.mode)]);
                                    t.setAttribute("fence", "true"),
                                    e.rightColor && t.setAttribute("mathcolor", e.rightColor),
                                    r.push(t)
                                }
                                return ut(r)
                            }
                        }),
                        Ye({
                            type: "middle",
                            names: ["\\middle"],
                            props: {
                                numArgs: 1,
                                primitive: !0
                            },
                            handler: (e, t) => {
                                const r = gr(t[0], e);
                                if (!e.parser.leftrightDepth)
                                    throw new n("\\middle without preceding \\left",r);
                                return {
                                    type: "middle",
                                    mode: e.parser.mode,
                                    delim: r.text
                                }
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                let r;
                                if ("." === e.delim)
                                    r = ot(t, []);
                                else {
                                    r = pr.sizedDelim(e.delim, 1, t, e.mode, []);
                                    const n = {
                                        delim: e.delim,
                                        options: t
                                    };
                                    r.isMiddle = n
                                }
                                return r
                            }
                            ,
                            mathmlBuilder: (e, t) => {
                                const r = "\\vert" === e.delim || "|" === e.delim ? pt("|", "text") : pt(e.delim, e.mode)
                                  , n = new mt.MathNode("mo",[r]);
                                return n.setAttribute("fence", "true"),
                                n.setAttribute("lspace", "0.05em"),
                                n.setAttribute("rspace", "0.05em"),
                                n
                            }
                        });
                        const br = (e, t) => {
                            const r = Oe.wrapFragment(st(e.body, t), t)
                              , n = e.label.slice(1);
                            let o, s = t.sizeMultiplier, i = 0;
                            const a = l.isCharacterBox(e.body);
                            if ("sout" === n)
                                o = Oe.makeSpan(["stretchy", "sout"]),
                                o.height = t.fontMetrics().defaultRuleThickness / s,
                                i = -.5 * t.fontMetrics().xHeight;
                            else if ("phase" === n) {
                                const e = P({
                                    number: .6,
                                    unit: "pt"
                                }, t)
                                  , n = P({
                                    number: .35,
                                    unit: "ex"
                                }, t);
                                s /= t.havingBaseSizing().sizeMultiplier;
                                const a = r.height + r.depth + e + n;
                                r.style.paddingLeft = V(a / 2 + e);
                                const l = Math.floor(1e3 * a * s)
                                  , c = "M400000 " + (h = l) + " H0 L" + h / 2 + " 0 l65 45 L145 " + (h - 80) + " H400000z"
                                  , m = new Z([new K("phase",c)],{
                                    width: "400em",
                                    height: V(l / 1e3),
                                    viewBox: "0 0 400000 " + l,
                                    preserveAspectRatio: "xMinYMin slice"
                                });
                                o = Oe.makeSvgSpan(["hide-tail"], [m], t),
                                o.style.height = V(a),
                                i = r.depth + e + n
                            } else {
                                /cancel/.test(n) ? a || r.classes.push("cancel-pad") : "angl" === n ? r.classes.push("anglpad") : r.classes.push("boxpad");
                                let s = 0
                                  , l = 0
                                  , h = 0;
                                /box/.test(n) ? (h = Math.max(t.fontMetrics().fboxrule, t.minRuleThickness),
                                s = t.fontMetrics().fboxsep + ("colorbox" === n ? 0 : h),
                                l = s) : "angl" === n ? (h = Math.max(t.fontMetrics().defaultRuleThickness, t.minRuleThickness),
                                s = 4 * h,
                                l = Math.max(0, .25 - r.depth)) : (s = a ? .2 : 0,
                                l = s),
                                o = function(e, t, r, n, o) {
                                    let s;
                                    const i = e.height + e.depth + r + n;
                                    if (/fbox|color|angl/.test(t)) {
                                        if (s = Oe.makeSpan(["stretchy", t], [], o),
                                        "fbox" === t) {
                                            const e = o.color && o.getColor();
                                            e && (s.style.borderColor = e)
                                        }
                                    } else {
                                        const e = [];
                                        /^[bx]cancel$/.test(t) && e.push(new J({
                                            x1: "0",
                                            y1: "0",
                                            x2: "100%",
                                            y2: "100%",
                                            "stroke-width": "0.046em"
                                        })),
                                        /^x?cancel$/.test(t) && e.push(new J({
                                            x1: "0",
                                            y1: "100%",
                                            x2: "100%",
                                            y2: "0",
                                            "stroke-width": "0.046em"
                                        }));
                                        const r = new Z(e,{
                                            width: "100%",
                                            height: V(i)
                                        });
                                        s = Oe.makeSvgSpan([], [r], o)
                                    }
                                    return s.height = i,
                                    s.style.height = V(i),
                                    s
                                }(r, n, s, l, t),
                                /fbox|boxed|fcolorbox/.test(n) ? (o.style.borderStyle = "solid",
                                o.style.borderWidth = V(h)) : "angl" === n && .049 !== h && (o.style.borderTopWidth = V(h),
                                o.style.borderRightWidth = V(h)),
                                i = r.depth + l,
                                e.backgroundColor && (o.style.backgroundColor = e.backgroundColor,
                                e.borderColor && (o.style.borderColor = e.borderColor))
                            }
                            var h;
                            let c;
                            if (e.backgroundColor)
                                c = Oe.makeVList({
                                    positionType: "individualShift",
                                    children: [{
                                        type: "elem",
                                        elem: o,
                                        shift: i
                                    }, {
                                        type: "elem",
                                        elem: r,
                                        shift: 0
                                    }]
                                }, t);
                            else {
                                const e = /cancel|phase/.test(n) ? ["svg-align"] : [];
                                c = Oe.makeVList({
                                    positionType: "individualShift",
                                    children: [{
                                        type: "elem",
                                        elem: r,
                                        shift: 0
                                    }, {
                                        type: "elem",
                                        elem: o,
                                        shift: i,
                                        wrapperClasses: e
                                    }]
                                }, t)
                            }
                            return /cancel/.test(n) && (c.height = r.height,
                            c.depth = r.depth),
                            /cancel/.test(n) && !a ? Oe.makeSpan(["mord", "cancel-lap"], [c], t) : Oe.makeSpan(["mord"], [c], t)
                        }
                          , yr = (e, t) => {
                            let r = 0;
                            const n = new mt.MathNode(e.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose",[bt(e.body, t)]);
                            switch (e.label) {
                            case "\\cancel":
                                n.setAttribute("notation", "updiagonalstrike");
                                break;
                            case "\\bcancel":
                                n.setAttribute("notation", "downdiagonalstrike");
                                break;
                            case "\\phase":
                                n.setAttribute("notation", "phasorangle");
                                break;
                            case "\\sout":
                                n.setAttribute("notation", "horizontalstrike");
                                break;
                            case "\\fbox":
                                n.setAttribute("notation", "box");
                                break;
                            case "\\angl":
                                n.setAttribute("notation", "actuarial");
                                break;
                            case "\\fcolorbox":
                            case "\\colorbox":
                                if (r = t.fontMetrics().fboxsep * t.fontMetrics().ptPerEm,
                                n.setAttribute("width", "+" + 2 * r + "pt"),
                                n.setAttribute("height", "+" + 2 * r + "pt"),
                                n.setAttribute("lspace", r + "pt"),
                                n.setAttribute("voffset", r + "pt"),
                                "\\fcolorbox" === e.label) {
                                    const r = Math.max(t.fontMetrics().fboxrule, t.minRuleThickness);
                                    n.setAttribute("style", "border: " + r + "em solid " + String(e.borderColor))
                                }
                                break;
                            case "\\xcancel":
                                n.setAttribute("notation", "updiagonalstrike downdiagonalstrike")
                            }
                            return e.backgroundColor && n.setAttribute("mathbackground", e.backgroundColor),
                            n
                        }
                        ;
                        Ye({
                            type: "enclose",
                            names: ["\\colorbox"],
                            props: {
                                numArgs: 2,
                                allowedInText: !0,
                                argTypes: ["color", "text"]
                            },
                            handler(e, t, r) {
                                let {parser: n, funcName: o} = e;
                                const s = zt(t[0], "color-token").color
                                  , i = t[1];
                                return {
                                    type: "enclose",
                                    mode: n.mode,
                                    label: o,
                                    backgroundColor: s,
                                    body: i
                                }
                            },
                            htmlBuilder: br,
                            mathmlBuilder: yr
                        }),
                        Ye({
                            type: "enclose",
                            names: ["\\fcolorbox"],
                            props: {
                                numArgs: 3,
                                allowedInText: !0,
                                argTypes: ["color", "color", "text"]
                            },
                            handler(e, t, r) {
                                let {parser: n, funcName: o} = e;
                                const s = zt(t[0], "color-token").color
                                  , i = zt(t[1], "color-token").color
                                  , a = t[2];
                                return {
                                    type: "enclose",
                                    mode: n.mode,
                                    label: o,
                                    backgroundColor: i,
                                    borderColor: s,
                                    body: a
                                }
                            },
                            htmlBuilder: br,
                            mathmlBuilder: yr
                        }),
                        Ye({
                            type: "enclose",
                            names: ["\\fbox"],
                            props: {
                                numArgs: 1,
                                argTypes: ["hbox"],
                                allowedInText: !0
                            },
                            handler(e, t) {
                                let {parser: r} = e;
                                return {
                                    type: "enclose",
                                    mode: r.mode,
                                    label: "\\fbox",
                                    body: t[0]
                                }
                            }
                        }),
                        Ye({
                            type: "enclose",
                            names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\phase"],
                            props: {
                                numArgs: 1
                            },
                            handler(e, t) {
                                let {parser: r, funcName: n} = e;
                                const o = t[0];
                                return {
                                    type: "enclose",
                                    mode: r.mode,
                                    label: n,
                                    body: o
                                }
                            },
                            htmlBuilder: br,
                            mathmlBuilder: yr
                        }),
                        Ye({
                            type: "enclose",
                            names: ["\\angl"],
                            props: {
                                numArgs: 1,
                                argTypes: ["hbox"],
                                allowedInText: !1
                            },
                            handler(e, t) {
                                let {parser: r} = e;
                                return {
                                    type: "enclose",
                                    mode: r.mode,
                                    label: "\\angl",
                                    body: t[0]
                                }
                            }
                        });
                        const xr = {};
                        function wr(e) {
                            let {type: t, names: r, props: n, handler: o, htmlBuilder: s, mathmlBuilder: i} = e;
                            const a = {
                                type: t,
                                numArgs: n.numArgs || 0,
                                allowedInText: !1,
                                numOptionalArgs: 0,
                                handler: o
                            };
                            for (let e = 0; e < r.length; ++e)
                                xr[r[e]] = a;
                            s && (Ge[t] = s),
                            i && (Ue[t] = i)
                        }
                        const vr = {};
                        function kr(e, t) {
                            vr[e] = t
                        }
                        class Sr {
                            constructor(e, t, r) {
                                this.lexer = void 0,
                                this.start = void 0,
                                this.end = void 0,
                                this.lexer = e,
                                this.start = t,
                                this.end = r
                            }
                            static range(e, t) {
                                return t ? e && e.loc && t.loc && e.loc.lexer === t.loc.lexer ? new Sr(e.loc.lexer,e.loc.start,t.loc.end) : null : e && e.loc
                            }
                        }
                        class Mr {
                            constructor(e, t) {
                                this.text = void 0,
                                this.loc = void 0,
                                this.noexpand = void 0,
                                this.treatAsRelax = void 0,
                                this.text = e,
                                this.loc = t
                            }
                            range(e, t) {
                                return new Mr(t,Sr.range(this, e))
                            }
                        }
                        function zr(e) {
                            const t = [];
                            e.consumeSpaces();
                            let r = e.fetch().text;
                            for ("\\relax" === r && (e.consume(),
                            e.consumeSpaces(),
                            r = e.fetch().text); "\\hline" === r || "\\hdashline" === r; )
                                e.consume(),
                                t.push("\\hdashline" === r),
                                e.consumeSpaces(),
                                r = e.fetch().text;
                            return t
                        }
                        const Ar = e => {
                            if (!e.parser.settings.displayMode)
                                throw new n("{" + e.envName + "} can be used only in display mode.")
                        }
                        ;
                        function Tr(e) {
                            if (-1 === e.indexOf("ed"))
                                return -1 === e.indexOf("*")
                        }
                        function Br(e, t, r) {
                            let {hskipBeforeAndAfter: o, addJot: s, cols: i, arraystretch: a, colSeparationType: l, autoTag: h, singleRow: c, emptySingleRow: m, maxNumCols: p, leqno: u} = t;
                            if (e.gullet.beginGroup(),
                            c || e.gullet.macros.set("\\cr", "\\\\\\relax"),
                            !a) {
                                const t = e.gullet.expandMacroAsText("\\arraystretch");
                                if (null == t)
                                    a = 1;
                                else if (a = parseFloat(t),
                                !a || a < 0)
                                    throw new n("Invalid \\arraystretch: " + t)
                            }
                            e.gullet.beginGroup();
                            let d = [];
                            const g = [d]
                              , f = []
                              , b = []
                              , y = null != h ? [] : void 0;
                            function x() {
                                h && e.gullet.macros.set("\\@eqnsw", "1", !0)
                            }
                            function w() {
                                y && (e.gullet.macros.get("\\df@tag") ? (y.push(e.subparse([new Mr("\\df@tag")])),
                                e.gullet.macros.set("\\df@tag", void 0, !0)) : y.push(Boolean(h) && "1" === e.gullet.macros.get("\\@eqnsw")))
                            }
                            for (x(),
                            b.push(zr(e)); ; ) {
                                let t = e.parseExpression(!1, c ? "\\end" : "\\\\");
                                e.gullet.endGroup(),
                                e.gullet.beginGroup(),
                                t = {
                                    type: "ordgroup",
                                    mode: e.mode,
                                    body: t
                                },
                                r && (t = {
                                    type: "styling",
                                    mode: e.mode,
                                    style: r,
                                    body: [t]
                                }),
                                d.push(t);
                                const o = e.fetch().text;
                                if ("&" === o) {
                                    if (p && d.length === p) {
                                        if (c || l)
                                            throw new n("Too many tab characters: &",e.nextToken);
                                        e.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.")
                                    }
                                    e.consume()
                                } else {
                                    if ("\\end" === o) {
                                        w(),
                                        1 === d.length && "styling" === t.type && 0 === t.body[0].body.length && (g.length > 1 || !m) && g.pop(),
                                        b.length < g.length + 1 && b.push([]);
                                        break
                                    }
                                    if ("\\\\" !== o)
                                        throw new n("Expected & or \\\\ or \\cr or \\end",e.nextToken);
                                    {
                                        let t;
                                        e.consume(),
                                        " " !== e.gullet.future().text && (t = e.parseSizeGroup(!0)),
                                        f.push(t ? t.value : null),
                                        w(),
                                        b.push(zr(e)),
                                        d = [],
                                        g.push(d),
                                        x()
                                    }
                                }
                            }
                            return e.gullet.endGroup(),
                            e.gullet.endGroup(),
                            {
                                type: "array",
                                mode: e.mode,
                                addJot: s,
                                arraystretch: a,
                                body: g,
                                cols: i,
                                rowGaps: f,
                                hskipBeforeAndAfter: o,
                                hLinesBeforeRow: b,
                                colSeparationType: l,
                                tags: y,
                                leqno: u
                            }
                        }
                        function Cr(e) {
                            return "d" === e.slice(0, 1) ? "display" : "text"
                        }
                        const Nr = function(e, t) {
                            let r, o;
                            const s = e.body.length
                              , i = e.hLinesBeforeRow;
                            let a = 0
                              , h = new Array(s);
                            const c = []
                              , m = Math.max(t.fontMetrics().arrayRuleWidth, t.minRuleThickness)
                              , p = 1 / t.fontMetrics().ptPerEm;
                            let u = 5 * p;
                            e.colSeparationType && "small" === e.colSeparationType && (u = t.havingStyle(w.SCRIPT).sizeMultiplier / t.sizeMultiplier * .2778);
                            const d = "CD" === e.colSeparationType ? P({
                                number: 3,
                                unit: "ex"
                            }, t) : 12 * p
                              , g = 3 * p
                              , f = e.arraystretch * d
                              , b = .7 * f
                              , y = .3 * f;
                            let x = 0;
                            function v(e) {
                                for (let t = 0; t < e.length; ++t)
                                    t > 0 && (x += .25),
                                    c.push({
                                        pos: x,
                                        isDashed: e[t]
                                    })
                            }
                            for (v(i[0]),
                            r = 0; r < e.body.length; ++r) {
                                const n = e.body[r];
                                let s = b
                                  , l = y;
                                a < n.length && (a = n.length);
                                const c = new Array(n.length);
                                for (o = 0; o < n.length; ++o) {
                                    const e = st(n[o], t);
                                    l < e.depth && (l = e.depth),
                                    s < e.height && (s = e.height),
                                    c[o] = e
                                }
                                const m = e.rowGaps[r];
                                let p = 0;
                                m && (p = P(m, t),
                                p > 0 && (p += y,
                                l < p && (l = p),
                                p = 0)),
                                e.addJot && (l += g),
                                c.height = s,
                                c.depth = l,
                                x += s,
                                c.pos = x,
                                x += l + p,
                                h[r] = c,
                                v(i[r + 1])
                            }
                            const k = x / 2 + t.fontMetrics().axisHeight
                              , S = e.cols || []
                              , M = [];
                            let z, A;
                            const T = [];
                            if (e.tags && e.tags.some((e => e)))
                                for (r = 0; r < s; ++r) {
                                    const n = h[r]
                                      , o = n.pos - k
                                      , s = e.tags[r];
                                    let i;
                                    i = !0 === s ? Oe.makeSpan(["eqn-num"], [], t) : Oe.makeSpan([], !1 === s ? [] : Qe(s, t, !0), t),
                                    i.depth = n.depth,
                                    i.height = n.height,
                                    T.push({
                                        type: "elem",
                                        elem: i,
                                        shift: o
                                    })
                                }
                            for (o = 0,
                            A = 0; o < a || A < S.length; ++o,
                            ++A) {
                                let i, c = S[A] || {}, p = !0;
                                for (; "separator" === c.type; ) {
                                    if (p || (z = Oe.makeSpan(["arraycolsep"], []),
                                    z.style.width = V(t.fontMetrics().doubleRuleSep),
                                    M.push(z)),
                                    "|" !== c.separator && ":" !== c.separator)
                                        throw new n("Invalid separator type: " + c.separator);
                                    {
                                        const e = "|" === c.separator ? "solid" : "dashed"
                                          , r = Oe.makeSpan(["vertical-separator"], [], t);
                                        r.style.height = V(x),
                                        r.style.borderRightWidth = V(m),
                                        r.style.borderRightStyle = e,
                                        r.style.margin = "0 " + V(-m / 2);
                                        const n = x - k;
                                        n && (r.style.verticalAlign = V(-n)),
                                        M.push(r)
                                    }
                                    A++,
                                    c = S[A] || {},
                                    p = !1
                                }
                                if (o >= a)
                                    continue;
                                (o > 0 || e.hskipBeforeAndAfter) && (i = l.deflt(c.pregap, u),
                                0 !== i && (z = Oe.makeSpan(["arraycolsep"], []),
                                z.style.width = V(i),
                                M.push(z)));
                                let d = [];
                                for (r = 0; r < s; ++r) {
                                    const e = h[r]
                                      , t = e[o];
                                    if (!t)
                                        continue;
                                    const n = e.pos - k;
                                    t.depth = e.depth,
                                    t.height = e.height,
                                    d.push({
                                        type: "elem",
                                        elem: t,
                                        shift: n
                                    })
                                }
                                d = Oe.makeVList({
                                    positionType: "individualShift",
                                    children: d
                                }, t),
                                d = Oe.makeSpan(["col-align-" + (c.align || "c")], [d]),
                                M.push(d),
                                (o < a - 1 || e.hskipBeforeAndAfter) && (i = l.deflt(c.postgap, u),
                                0 !== i && (z = Oe.makeSpan(["arraycolsep"], []),
                                z.style.width = V(i),
                                M.push(z)))
                            }
                            if (h = Oe.makeSpan(["mtable"], M),
                            c.length > 0) {
                                const e = Oe.makeLineSpan("hline", t, m)
                                  , r = Oe.makeLineSpan("hdashline", t, m)
                                  , n = [{
                                    type: "elem",
                                    elem: h,
                                    shift: 0
                                }];
                                for (; c.length > 0; ) {
                                    const t = c.pop()
                                      , o = t.pos - k;
                                    t.isDashed ? n.push({
                                        type: "elem",
                                        elem: r,
                                        shift: o
                                    }) : n.push({
                                        type: "elem",
                                        elem: e,
                                        shift: o
                                    })
                                }
                                h = Oe.makeVList({
                                    positionType: "individualShift",
                                    children: n
                                }, t)
                            }
                            if (0 === T.length)
                                return Oe.makeSpan(["mord"], [h], t);
                            {
                                let e = Oe.makeVList({
                                    positionType: "individualShift",
                                    children: T
                                }, t);
                                return e = Oe.makeSpan(["tag"], [e], t),
                                Oe.makeFragment([h, e])
                            }
                        }
                          , qr = {
                            c: "center ",
                            l: "left ",
                            r: "right "
                        }
                          , Ir = function(e, t) {
                            const r = []
                              , n = new mt.MathNode("mtd",[],["mtr-glue"])
                              , o = new mt.MathNode("mtd",[],["mml-eqn-num"]);
                            for (let s = 0; s < e.body.length; s++) {
                                const i = e.body[s]
                                  , a = [];
                                for (let e = 0; e < i.length; e++)
                                    a.push(new mt.MathNode("mtd",[bt(i[e], t)]));
                                e.tags && e.tags[s] && (a.unshift(n),
                                a.push(n),
                                e.leqno ? a.unshift(o) : a.push(o)),
                                r.push(new mt.MathNode("mtr",a))
                            }
                            let s = new mt.MathNode("mtable",r);
                            const i = .5 === e.arraystretch ? .1 : .16 + e.arraystretch - 1 + (e.addJot ? .09 : 0);
                            s.setAttribute("rowspacing", V(i));
                            let a = ""
                              , l = "";
                            if (e.cols && e.cols.length > 0) {
                                const t = e.cols;
                                let r = ""
                                  , n = !1
                                  , o = 0
                                  , i = t.length;
                                "separator" === t[0].type && (a += "top ",
                                o = 1),
                                "separator" === t[t.length - 1].type && (a += "bottom ",
                                i -= 1);
                                for (let e = o; e < i; e++)
                                    "align" === t[e].type ? (l += qr[t[e].align],
                                    n && (r += "none "),
                                    n = !0) : "separator" === t[e].type && n && (r += "|" === t[e].separator ? "solid " : "dashed ",
                                    n = !1);
                                s.setAttribute("columnalign", l.trim()),
                                /[sd]/.test(r) && s.setAttribute("columnlines", r.trim())
                            }
                            if ("align" === e.colSeparationType) {
                                const t = e.cols || [];
                                let r = "";
                                for (let e = 1; e < t.length; e++)
                                    r += e % 2 ? "0em " : "1em ";
                                s.setAttribute("columnspacing", r.trim())
                            } else
                                "alignat" === e.colSeparationType || "gather" === e.colSeparationType ? s.setAttribute("columnspacing", "0em") : "small" === e.colSeparationType ? s.setAttribute("columnspacing", "0.2778em") : "CD" === e.colSeparationType ? s.setAttribute("columnspacing", "0.5em") : s.setAttribute("columnspacing", "1em");
                            let h = "";
                            const c = e.hLinesBeforeRow;
                            a += c[0].length > 0 ? "left " : "",
                            a += c[c.length - 1].length > 0 ? "right " : "";
                            for (let e = 1; e < c.length - 1; e++)
                                h += 0 === c[e].length ? "none " : c[e][0] ? "dashed " : "solid ";
                            return /[sd]/.test(h) && s.setAttribute("rowlines", h.trim()),
                            "" !== a && (s = new mt.MathNode("menclose",[s]),
                            s.setAttribute("notation", a.trim())),
                            e.arraystretch && e.arraystretch < 1 && (s = new mt.MathNode("mstyle",[s]),
                            s.setAttribute("scriptlevel", "1")),
                            s
                        }
                          , Rr = function(e, t) {
                            -1 === e.envName.indexOf("ed") && Ar(e);
                            const r = []
                              , o = e.envName.indexOf("at") > -1 ? "alignat" : "align"
                              , s = "split" === e.envName
                              , i = Br(e.parser, {
                                cols: r,
                                addJot: !0,
                                autoTag: s ? void 0 : Tr(e.envName),
                                emptySingleRow: !0,
                                colSeparationType: o,
                                maxNumCols: s ? 2 : void 0,
                                leqno: e.parser.settings.leqno
                            }, "display");
                            let a, l = 0;
                            const h = {
                                type: "ordgroup",
                                mode: e.mode,
                                body: []
                            };
                            if (t[0] && "ordgroup" === t[0].type) {
                                let e = "";
                                for (let r = 0; r < t[0].body.length; r++)
                                    e += zt(t[0].body[r], "textord").text;
                                a = Number(e),
                                l = 2 * a
                            }
                            const c = !l;
                            i.body.forEach((function(e) {
                                for (let t = 1; t < e.length; t += 2) {
                                    const r = zt(e[t], "styling");
                                    zt(r.body[0], "ordgroup").body.unshift(h)
                                }
                                if (c)
                                    l < e.length && (l = e.length);
                                else {
                                    const t = e.length / 2;
                                    if (a < t)
                                        throw new n("Too many math in a row: expected " + a + ", but got " + t,e[0])
                                }
                            }
                            ));
                            for (let e = 0; e < l; ++e) {
                                let t = "r"
                                  , n = 0;
                                e % 2 == 1 ? t = "l" : e > 0 && c && (n = 1),
                                r[e] = {
                                    type: "align",
                                    align: t,
                                    pregap: n,
                                    postgap: 0
                                }
                            }
                            return i.colSeparationType = c ? "align" : "alignat",
                            i
                        };
                        wr({
                            type: "array",
                            names: ["array", "darray"],
                            props: {
                                numArgs: 1
                            },
                            handler(e, t) {
                                const r = (Tt(t[0]) ? [t[0]] : zt(t[0], "ordgroup").body).map((function(e) {
                                    const t = At(e).text;
                                    if (-1 !== "lcr".indexOf(t))
                                        return {
                                            type: "align",
                                            align: t
                                        };
                                    if ("|" === t)
                                        return {
                                            type: "separator",
                                            separator: "|"
                                        };
                                    if (":" === t)
                                        return {
                                            type: "separator",
                                            separator: ":"
                                        };
                                    throw new n("Unknown column alignment: " + t,e)
                                }
                                ))
                                  , o = {
                                    cols: r,
                                    hskipBeforeAndAfter: !0,
                                    maxNumCols: r.length
                                };
                                return Br(e.parser, o, Cr(e.envName))
                            },
                            htmlBuilder: Nr,
                            mathmlBuilder: Ir
                        }),
                        wr({
                            type: "array",
                            names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"],
                            props: {
                                numArgs: 0
                            },
                            handler(e) {
                                const t = {
                                    matrix: null,
                                    pmatrix: ["(", ")"],
                                    bmatrix: ["[", "]"],
                                    Bmatrix: ["\\{", "\\}"],
                                    vmatrix: ["|", "|"],
                                    Vmatrix: ["\\Vert", "\\Vert"]
                                }[e.envName.replace("*", "")];
                                let r = "c";
                                const o = {
                                    hskipBeforeAndAfter: !1,
                                    cols: [{
                                        type: "align",
                                        align: r
                                    }]
                                };
                                if ("*" === e.envName.charAt(e.envName.length - 1)) {
                                    const t = e.parser;
                                    if (t.consumeSpaces(),
                                    "[" === t.fetch().text) {
                                        if (t.consume(),
                                        t.consumeSpaces(),
                                        r = t.fetch().text,
                                        -1 === "lcr".indexOf(r))
                                            throw new n("Expected l or c or r",t.nextToken);
                                        t.consume(),
                                        t.consumeSpaces(),
                                        t.expect("]"),
                                        t.consume(),
                                        o.cols = [{
                                            type: "align",
                                            align: r
                                        }]
                                    }
                                }
                                const s = Br(e.parser, o, Cr(e.envName))
                                  , i = Math.max(0, ...s.body.map((e => e.length)));
                                return s.cols = new Array(i).fill({
                                    type: "align",
                                    align: r
                                }),
                                t ? {
                                    type: "leftright",
                                    mode: e.mode,
                                    body: [s],
                                    left: t[0],
                                    right: t[1],
                                    rightColor: void 0
                                } : s
                            },
                            htmlBuilder: Nr,
                            mathmlBuilder: Ir
                        }),
                        wr({
                            type: "array",
                            names: ["smallmatrix"],
                            props: {
                                numArgs: 0
                            },
                            handler(e) {
                                const t = Br(e.parser, {
                                    arraystretch: .5
                                }, "script");
                                return t.colSeparationType = "small",
                                t
                            },
                            htmlBuilder: Nr,
                            mathmlBuilder: Ir
                        }),
                        wr({
                            type: "array",
                            names: ["subarray"],
                            props: {
                                numArgs: 1
                            },
                            handler(e, t) {
                                const r = (Tt(t[0]) ? [t[0]] : zt(t[0], "ordgroup").body).map((function(e) {
                                    const t = At(e).text;
                                    if (-1 !== "lc".indexOf(t))
                                        return {
                                            type: "align",
                                            align: t
                                        };
                                    throw new n("Unknown column alignment: " + t,e)
                                }
                                ));
                                if (r.length > 1)
                                    throw new n("{subarray} can contain only one column");
                                let o = {
                                    cols: r,
                                    hskipBeforeAndAfter: !1,
                                    arraystretch: .5
                                };
                                if (o = Br(e.parser, o, "script"),
                                o.body.length > 0 && o.body[0].length > 1)
                                    throw new n("{subarray} can contain only one column");
                                return o
                            },
                            htmlBuilder: Nr,
                            mathmlBuilder: Ir
                        }),
                        wr({
                            type: "array",
                            names: ["cases", "dcases", "rcases", "drcases"],
                            props: {
                                numArgs: 0
                            },
                            handler(e) {
                                const t = Br(e.parser, {
                                    arraystretch: 1.2,
                                    cols: [{
                                        type: "align",
                                        align: "l",
                                        pregap: 0,
                                        postgap: 1
                                    }, {
                                        type: "align",
                                        align: "l",
                                        pregap: 0,
                                        postgap: 0
                                    }]
                                }, Cr(e.envName));
                                return {
                                    type: "leftright",
                                    mode: e.mode,
                                    body: [t],
                                    left: e.envName.indexOf("r") > -1 ? "." : "\\{",
                                    right: e.envName.indexOf("r") > -1 ? "\\}" : ".",
                                    rightColor: void 0
                                }
                            },
                            htmlBuilder: Nr,
                            mathmlBuilder: Ir
                        }),
                        wr({
                            type: "array",
                            names: ["align", "align*", "aligned", "split"],
                            props: {
                                numArgs: 0
                            },
                            handler: Rr,
                            htmlBuilder: Nr,
                            mathmlBuilder: Ir
                        }),
                        wr({
                            type: "array",
                            names: ["gathered", "gather", "gather*"],
                            props: {
                                numArgs: 0
                            },
                            handler(e) {
                                l.contains(["gather", "gather*"], e.envName) && Ar(e);
                                const t = {
                                    cols: [{
                                        type: "align",
                                        align: "c"
                                    }],
                                    addJot: !0,
                                    colSeparationType: "gather",
                                    autoTag: Tr(e.envName),
                                    emptySingleRow: !0,
                                    leqno: e.parser.settings.leqno
                                };
                                return Br(e.parser, t, "display")
                            },
                            htmlBuilder: Nr,
                            mathmlBuilder: Ir
                        }),
                        wr({
                            type: "array",
                            names: ["alignat", "alignat*", "alignedat"],
                            props: {
                                numArgs: 1
                            },
                            handler: Rr,
                            htmlBuilder: Nr,
                            mathmlBuilder: Ir
                        }),
                        wr({
                            type: "array",
                            names: ["equation", "equation*"],
                            props: {
                                numArgs: 0
                            },
                            handler(e) {
                                Ar(e);
                                const t = {
                                    autoTag: Tr(e.envName),
                                    emptySingleRow: !0,
                                    singleRow: !0,
                                    maxNumCols: 1,
                                    leqno: e.parser.settings.leqno
                                };
                                return Br(e.parser, t, "display")
                            },
                            htmlBuilder: Nr,
                            mathmlBuilder: Ir
                        }),
                        wr({
                            type: "array",
                            names: ["CD"],
                            props: {
                                numArgs: 0
                            },
                            handler(e) {
                                return Ar(e),
                                function(e) {
                                    const t = [];
                                    for (e.gullet.beginGroup(),
                                    e.gullet.macros.set("\\cr", "\\\\\\relax"),
                                    e.gullet.beginGroup(); ; ) {
                                        t.push(e.parseExpression(!1, "\\\\")),
                                        e.gullet.endGroup(),
                                        e.gullet.beginGroup();
                                        const r = e.fetch().text;
                                        if ("&" !== r && "\\\\" !== r) {
                                            if ("\\end" === r) {
                                                0 === t[t.length - 1].length && t.pop();
                                                break
                                            }
                                            throw new n("Expected \\\\ or \\cr or \\end",e.nextToken)
                                        }
                                        e.consume()
                                    }
                                    let r = [];
                                    const o = [r];
                                    for (let a = 0; a < t.length; a++) {
                                        const l = t[a];
                                        let h = {
                                            type: "styling",
                                            body: [],
                                            mode: "math",
                                            style: "display"
                                        };
                                        for (let t = 0; t < l.length; t++)
                                            if (Lt(l[t])) {
                                                r.push(h),
                                                t += 1;
                                                const o = At(l[t]).text
                                                  , a = new Array(2);
                                                if (a[0] = {
                                                    type: "ordgroup",
                                                    mode: "math",
                                                    body: []
                                                },
                                                a[1] = {
                                                    type: "ordgroup",
                                                    mode: "math",
                                                    body: []
                                                },
                                                "=|.".indexOf(o) > -1)
                                                    ;
                                                else {
                                                    if (!("<>AV".indexOf(o) > -1))
                                                        throw new n('Expected one of "<>AV=|." after @',l[t]);
                                                    for (let e = 0; e < 2; e++) {
                                                        let r = !0;
                                                        for (let h = t + 1; h < l.length; h++) {
                                                            if (i = o,
                                                            ("mathord" === (s = l[h]).type || "atom" === s.type) && s.text === i) {
                                                                r = !1,
                                                                t = h;
                                                                break
                                                            }
                                                            if (Lt(l[h]))
                                                                throw new n("Missing a " + o + " character to complete a CD arrow.",l[h]);
                                                            a[e].body.push(l[h])
                                                        }
                                                        if (r)
                                                            throw new n("Missing a " + o + " character to complete a CD arrow.",l[t])
                                                    }
                                                }
                                                const c = {
                                                    type: "styling",
                                                    body: [Dt(o, a, e)],
                                                    mode: "math",
                                                    style: "display"
                                                };
                                                r.push(c),
                                                h = {
                                                    type: "styling",
                                                    body: [],
                                                    mode: "math",
                                                    style: "display"
                                                }
                                            } else
                                                h.body.push(l[t]);
                                        a % 2 == 0 ? r.push(h) : r.shift(),
                                        r = [],
                                        o.push(r)
                                    }
                                    var s, i;
                                    return e.gullet.endGroup(),
                                    e.gullet.endGroup(),
                                    {
                                        type: "array",
                                        mode: "math",
                                        body: o,
                                        arraystretch: 1,
                                        addJot: !0,
                                        rowGaps: [null],
                                        cols: new Array(o[0].length).fill({
                                            type: "align",
                                            align: "c",
                                            pregap: .25,
                                            postgap: .25
                                        }),
                                        colSeparationType: "CD",
                                        hLinesBeforeRow: new Array(o.length + 1).fill([])
                                    }
                                }(e.parser)
                            },
                            htmlBuilder: Nr,
                            mathmlBuilder: Ir
                        }),
                        kr("\\nonumber", "\\gdef\\@eqnsw{0}"),
                        kr("\\notag", "\\nonumber"),
                        Ye({
                            type: "text",
                            names: ["\\hline", "\\hdashline"],
                            props: {
                                numArgs: 0,
                                allowedInText: !0,
                                allowedInMath: !0
                            },
                            handler(e, t) {
                                throw new n(e.funcName + " valid only within array environment")
                            }
                        });
                        var Hr = xr;
                        Ye({
                            type: "environment",
                            names: ["\\begin", "\\end"],
                            props: {
                                numArgs: 1,
                                argTypes: ["text"]
                            },
                            handler(e, t) {
                                let {parser: r, funcName: o} = e;
                                const s = t[0];
                                if ("ordgroup" !== s.type)
                                    throw new n("Invalid environment name",s);
                                let i = "";
                                for (let e = 0; e < s.body.length; ++e)
                                    i += zt(s.body[e], "textord").text;
                                if ("\\begin" === o) {
                                    if (!Hr.hasOwnProperty(i))
                                        throw new n("No such environment: " + i,s);
                                    const e = Hr[i]
                                      , {args: t, optArgs: o} = r.parseArguments("\\begin{" + i + "}", e)
                                      , a = {
                                        mode: r.mode,
                                        envName: i,
                                        parser: r
                                    }
                                      , l = e.handler(a, t, o);
                                    r.expect("\\end", !1);
                                    const h = r.nextToken
                                      , c = zt(r.parseFunction(), "environment");
                                    if (c.name !== i)
                                        throw new n("Mismatch: \\begin{" + i + "} matched by \\end{" + c.name + "}",h);
                                    return l
                                }
                                return {
                                    type: "environment",
                                    mode: r.mode,
                                    name: i,
                                    nameGroup: s
                                }
                            }
                        });
                        const Or = (e, t) => {
                            const r = e.font
                              , n = t.withFont(r);
                            return st(e.body, n)
                        }
                          , Er = (e, t) => {
                            const r = e.font
                              , n = t.withFont(r);
                            return bt(e.body, n)
                        }
                          , Lr = {
                            "\\Bbb": "\\mathbb",
                            "\\bold": "\\mathbf",
                            "\\frak": "\\mathfrak",
                            "\\bm": "\\boldsymbol"
                        };
                        Ye({
                            type: "font",
                            names: ["\\mathrm", "\\mathit", "\\mathbf", "\\mathnormal", "\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf", "\\mathtt", "\\Bbb", "\\bold", "\\frak"],
                            props: {
                                numArgs: 1,
                                allowedInArgument: !0
                            },
                            handler: (e, t) => {
                                let {parser: r, funcName: n} = e;
                                const o = We(t[0]);
                                let s = n;
                                return s in Lr && (s = Lr[s]),
                                {
                                    type: "font",
                                    mode: r.mode,
                                    font: s.slice(1),
                                    body: o
                                }
                            }
                            ,
                            htmlBuilder: Or,
                            mathmlBuilder: Er
                        }),
                        Ye({
                            type: "mclass",
                            names: ["\\boldsymbol", "\\bm"],
                            props: {
                                numArgs: 1
                            },
                            handler: (e, t) => {
                                let {parser: r} = e;
                                const n = t[0]
                                  , o = l.isCharacterBox(n);
                                return {
                                    type: "mclass",
                                    mode: r.mode,
                                    mclass: Ot(n),
                                    body: [{
                                        type: "font",
                                        mode: r.mode,
                                        font: "boldsymbol",
                                        body: n
                                    }],
                                    isCharacterBox: o
                                }
                            }
                        }),
                        Ye({
                            type: "font",
                            names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
                            props: {
                                numArgs: 0,
                                allowedInText: !0
                            },
                            handler: (e, t) => {
                                let {parser: r, funcName: n, breakOnTokenText: o} = e;
                                const {mode: s} = r
                                  , i = r.parseExpression(!0, o);
                                return {
                                    type: "font",
                                    mode: s,
                                    font: "math" + n.slice(1),
                                    body: {
                                        type: "ordgroup",
                                        mode: r.mode,
                                        body: i
                                    }
                                }
                            }
                            ,
                            htmlBuilder: Or,
                            mathmlBuilder: Er
                        });
                        const Dr = (e, t) => {
                            let r = t;
                            return "display" === e ? r = r.id >= w.SCRIPT.id ? r.text() : w.DISPLAY : "text" === e && r.size === w.DISPLAY.size ? r = w.TEXT : "script" === e ? r = w.SCRIPT : "scriptscript" === e && (r = w.SCRIPTSCRIPT),
                            r
                        }
                          , Pr = (e, t) => {
                            const r = Dr(e.size, t.style)
                              , n = r.fracNum()
                              , o = r.fracDen();
                            let s;
                            s = t.havingStyle(n);
                            const i = st(e.numer, s, t);
                            if (e.continued) {
                                const e = 8.5 / t.fontMetrics().ptPerEm
                                  , r = 3.5 / t.fontMetrics().ptPerEm;
                                i.height = i.height < e ? e : i.height,
                                i.depth = i.depth < r ? r : i.depth
                            }
                            s = t.havingStyle(o);
                            const a = st(e.denom, s, t);
                            let l, h, c, m, p, u, d, g, f, b;
                            if (e.hasBarLine ? (e.barSize ? (h = P(e.barSize, t),
                            l = Oe.makeLineSpan("frac-line", t, h)) : l = Oe.makeLineSpan("frac-line", t),
                            h = l.height,
                            c = l.height) : (l = null,
                            h = 0,
                            c = t.fontMetrics().defaultRuleThickness),
                            r.size === w.DISPLAY.size || "display" === e.size ? (m = t.fontMetrics().num1,
                            p = h > 0 ? 3 * c : 7 * c,
                            u = t.fontMetrics().denom1) : (h > 0 ? (m = t.fontMetrics().num2,
                            p = c) : (m = t.fontMetrics().num3,
                            p = 3 * c),
                            u = t.fontMetrics().denom2),
                            l) {
                                const e = t.fontMetrics().axisHeight;
                                m - i.depth - (e + .5 * h) < p && (m += p - (m - i.depth - (e + .5 * h))),
                                e - .5 * h - (a.height - u) < p && (u += p - (e - .5 * h - (a.height - u)));
                                d = Oe.makeVList({
                                    positionType: "individualShift",
                                    children: [{
                                        type: "elem",
                                        elem: a,
                                        shift: u
                                    }, {
                                        type: "elem",
                                        elem: l,
                                        shift: -(e - .5 * h)
                                    }, {
                                        type: "elem",
                                        elem: i,
                                        shift: -m
                                    }]
                                }, t)
                            } else {
                                const e = m - i.depth - (a.height - u);
                                e < p && (m += .5 * (p - e),
                                u += .5 * (p - e)),
                                d = Oe.makeVList({
                                    positionType: "individualShift",
                                    children: [{
                                        type: "elem",
                                        elem: a,
                                        shift: u
                                    }, {
                                        type: "elem",
                                        elem: i,
                                        shift: -m
                                    }]
                                }, t)
                            }
                            return s = t.havingStyle(r),
                            d.height *= s.sizeMultiplier / t.sizeMultiplier,
                            d.depth *= s.sizeMultiplier / t.sizeMultiplier,
                            g = r.size === w.DISPLAY.size ? t.fontMetrics().delim1 : r.size === w.SCRIPTSCRIPT.size ? t.havingStyle(w.SCRIPT).fontMetrics().delim2 : t.fontMetrics().delim2,
                            f = null == e.leftDelim ? ot(t, ["mopen"]) : pr.customSizedDelim(e.leftDelim, g, !0, t.havingStyle(r), e.mode, ["mopen"]),
                            b = e.continued ? Oe.makeSpan([]) : null == e.rightDelim ? ot(t, ["mclose"]) : pr.customSizedDelim(e.rightDelim, g, !0, t.havingStyle(r), e.mode, ["mclose"]),
                            Oe.makeSpan(["mord"].concat(s.sizingClasses(t)), [f, Oe.makeSpan(["mfrac"], [d]), b], t)
                        }
                          , Vr = (e, t) => {
                            let r = new mt.MathNode("mfrac",[bt(e.numer, t), bt(e.denom, t)]);
                            if (e.hasBarLine) {
                                if (e.barSize) {
                                    const n = P(e.barSize, t);
                                    r.setAttribute("linethickness", V(n))
                                }
                            } else
                                r.setAttribute("linethickness", "0px");
                            const n = Dr(e.size, t.style);
                            if (n.size !== t.style.size) {
                                r = new mt.MathNode("mstyle",[r]);
                                const e = n.size === w.DISPLAY.size ? "true" : "false";
                                r.setAttribute("displaystyle", e),
                                r.setAttribute("scriptlevel", "0")
                            }
                            if (null != e.leftDelim || null != e.rightDelim) {
                                const t = [];
                                if (null != e.leftDelim) {
                                    const r = new mt.MathNode("mo",[new mt.TextNode(e.leftDelim.replace("\\", ""))]);
                                    r.setAttribute("fence", "true"),
                                    t.push(r)
                                }
                                if (t.push(r),
                                null != e.rightDelim) {
                                    const r = new mt.MathNode("mo",[new mt.TextNode(e.rightDelim.replace("\\", ""))]);
                                    r.setAttribute("fence", "true"),
                                    t.push(r)
                                }
                                return ut(t)
                            }
                            return r
                        }
                        ;
                        Ye({
                            type: "genfrac",
                            names: ["\\dfrac", "\\frac", "\\tfrac", "\\dbinom", "\\binom", "\\tbinom", "\\\\atopfrac", "\\\\bracefrac", "\\\\brackfrac"],
                            props: {
                                numArgs: 2,
                                allowedInArgument: !0
                            },
                            handler: (e, t) => {
                                let {parser: r, funcName: n} = e;
                                const o = t[0]
                                  , s = t[1];
                                let i, a = null, l = null, h = "auto";
                                switch (n) {
                                case "\\dfrac":
                                case "\\frac":
                                case "\\tfrac":
                                    i = !0;
                                    break;
                                case "\\\\atopfrac":
                                    i = !1;
                                    break;
                                case "\\dbinom":
                                case "\\binom":
                                case "\\tbinom":
                                    i = !1,
                                    a = "(",
                                    l = ")";
                                    break;
                                case "\\\\bracefrac":
                                    i = !1,
                                    a = "\\{",
                                    l = "\\}";
                                    break;
                                case "\\\\brackfrac":
                                    i = !1,
                                    a = "[",
                                    l = "]";
                                    break;
                                default:
                                    throw new Error("Unrecognized genfrac command")
                                }
                                switch (n) {
                                case "\\dfrac":
                                case "\\dbinom":
                                    h = "display";
                                    break;
                                case "\\tfrac":
                                case "\\tbinom":
                                    h = "text"
                                }
                                return {
                                    type: "genfrac",
                                    mode: r.mode,
                                    continued: !1,
                                    numer: o,
                                    denom: s,
                                    hasBarLine: i,
                                    leftDelim: a,
                                    rightDelim: l,
                                    size: h,
                                    barSize: null
                                }
                            }
                            ,
                            htmlBuilder: Pr,
                            mathmlBuilder: Vr
                        }),
                        Ye({
                            type: "genfrac",
                            names: ["\\cfrac"],
                            props: {
                                numArgs: 2
                            },
                            handler: (e, t) => {
                                let {parser: r, funcName: n} = e;
                                const o = t[0]
                                  , s = t[1];
                                return {
                                    type: "genfrac",
                                    mode: r.mode,
                                    continued: !0,
                                    numer: o,
                                    denom: s,
                                    hasBarLine: !0,
                                    leftDelim: null,
                                    rightDelim: null,
                                    size: "display",
                                    barSize: null
                                }
                            }
                        }),
                        Ye({
                            type: "infix",
                            names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
                            props: {
                                numArgs: 0,
                                infix: !0
                            },
                            handler(e) {
                                let t, {parser: r, funcName: n, token: o} = e;
                                switch (n) {
                                case "\\over":
                                    t = "\\frac";
                                    break;
                                case "\\choose":
                                    t = "\\binom";
                                    break;
                                case "\\atop":
                                    t = "\\\\atopfrac";
                                    break;
                                case "\\brace":
                                    t = "\\\\bracefrac";
                                    break;
                                case "\\brack":
                                    t = "\\\\brackfrac";
                                    break;
                                default:
                                    throw new Error("Unrecognized infix genfrac command")
                                }
                                return {
                                    type: "infix",
                                    mode: r.mode,
                                    replaceWith: t,
                                    token: o
                                }
                            }
                        });
                        const Fr = ["display", "text", "script", "scriptscript"]
                          , Gr = function(e) {
                            let t = null;
                            return e.length > 0 && (t = e,
                            t = "." === t ? null : t),
                            t
                        };
                        Ye({
                            type: "genfrac",
                            names: ["\\genfrac"],
                            props: {
                                numArgs: 6,
                                allowedInArgument: !0,
                                argTypes: ["math", "math", "size", "text", "math", "math"]
                            },
                            handler(e, t) {
                                let {parser: r} = e;
                                const n = t[4]
                                  , o = t[5]
                                  , s = We(t[0])
                                  , i = "atom" === s.type && "open" === s.family ? Gr(s.text) : null
                                  , a = We(t[1])
                                  , l = "atom" === a.type && "close" === a.family ? Gr(a.text) : null
                                  , h = zt(t[2], "size");
                                let c, m = null;
                                h.isBlank ? c = !0 : (m = h.value,
                                c = m.number > 0);
                                let p = "auto"
                                  , u = t[3];
                                if ("ordgroup" === u.type) {
                                    if (u.body.length > 0) {
                                        const e = zt(u.body[0], "textord");
                                        p = Fr[Number(e.text)]
                                    }
                                } else
                                    u = zt(u, "textord"),
                                    p = Fr[Number(u.text)];
                                return {
                                    type: "genfrac",
                                    mode: r.mode,
                                    numer: n,
                                    denom: o,
                                    continued: !1,
                                    hasBarLine: c,
                                    barSize: m,
                                    leftDelim: i,
                                    rightDelim: l,
                                    size: p
                                }
                            },
                            htmlBuilder: Pr,
                            mathmlBuilder: Vr
                        }),
                        Ye({
                            type: "infix",
                            names: ["\\above"],
                            props: {
                                numArgs: 1,
                                argTypes: ["size"],
                                infix: !0
                            },
                            handler(e, t) {
                                let {parser: r, funcName: n, token: o} = e;
                                return {
                                    type: "infix",
                                    mode: r.mode,
                                    replaceWith: "\\\\abovefrac",
                                    size: zt(t[0], "size").value,
                                    token: o
                                }
                            }
                        }),
                        Ye({
                            type: "genfrac",
                            names: ["\\\\abovefrac"],
                            props: {
                                numArgs: 3,
                                argTypes: ["math", "size", "math"]
                            },
                            handler: (e, t) => {
                                let {parser: r, funcName: n} = e;
                                const o = t[0]
                                  , s = function(e) {
                                    if (!e)
                                        throw new Error("Expected non-null, but got " + String(e));
                                    return e
                                }(zt(t[1], "infix").size)
                                  , i = t[2]
                                  , a = s.number > 0;
                                return {
                                    type: "genfrac",
                                    mode: r.mode,
                                    numer: o,
                                    denom: i,
                                    continued: !1,
                                    hasBarLine: a,
                                    barSize: s,
                                    leftDelim: null,
                                    rightDelim: null,
                                    size: "auto"
                                }
                            }
                            ,
                            htmlBuilder: Pr,
                            mathmlBuilder: Vr
                        });
                        const Ur = (e, t) => {
                            const r = t.style;
                            let n, o;
                            "supsub" === e.type ? (n = e.sup ? st(e.sup, t.havingStyle(r.sup()), t) : st(e.sub, t.havingStyle(r.sub()), t),
                            o = zt(e.base, "horizBrace")) : o = zt(e, "horizBrace");
                            const s = st(o.base, t.havingBaseStyle(w.DISPLAY))
                              , i = Mt(o, t);
                            let a;
                            if (o.isOver ? (a = Oe.makeVList({
                                positionType: "firstBaseline",
                                children: [{
                                    type: "elem",
                                    elem: s
                                }, {
                                    type: "kern",
                                    size: .1
                                }, {
                                    type: "elem",
                                    elem: i
                                }]
                            }, t),
                            a.children[0].children[0].children[1].classes.push("svg-align")) : (a = Oe.makeVList({
                                positionType: "bottom",
                                positionData: s.depth + .1 + i.height,
                                children: [{
                                    type: "elem",
                                    elem: i
                                }, {
                                    type: "kern",
                                    size: .1
                                }, {
                                    type: "elem",
                                    elem: s
                                }]
                            }, t),
                            a.children[0].children[0].children[0].classes.push("svg-align")),
                            n) {
                                const e = Oe.makeSpan(["mord", o.isOver ? "mover" : "munder"], [a], t);
                                a = o.isOver ? Oe.makeVList({
                                    positionType: "firstBaseline",
                                    children: [{
                                        type: "elem",
                                        elem: e
                                    }, {
                                        type: "kern",
                                        size: .2
                                    }, {
                                        type: "elem",
                                        elem: n
                                    }]
                                }, t) : Oe.makeVList({
                                    positionType: "bottom",
                                    positionData: e.depth + .2 + n.height + n.depth,
                                    children: [{
                                        type: "elem",
                                        elem: n
                                    }, {
                                        type: "kern",
                                        size: .2
                                    }, {
                                        type: "elem",
                                        elem: e
                                    }]
                                }, t)
                            }
                            return Oe.makeSpan(["mord", o.isOver ? "mover" : "munder"], [a], t)
                        }
                        ;
                        Ye({
                            type: "horizBrace",
                            names: ["\\overbrace", "\\underbrace"],
                            props: {
                                numArgs: 1
                            },
                            handler(e, t) {
                                let {parser: r, funcName: n} = e;
                                return {
                                    type: "horizBrace",
                                    mode: r.mode,
                                    label: n,
                                    isOver: /^\\over/.test(n),
                                    base: t[0]
                                }
                            },
                            htmlBuilder: Ur,
                            mathmlBuilder: (e, t) => {
                                const r = St(e.label);
                                return new mt.MathNode(e.isOver ? "mover" : "munder",[bt(e.base, t), r])
                            }
                        }),
                        Ye({
                            type: "href",
                            names: ["\\href"],
                            props: {
                                numArgs: 2,
                                argTypes: ["url", "original"],
                                allowedInText: !0
                            },
                            handler: (e, t) => {
                                let {parser: r} = e;
                                const n = t[1]
                                  , o = zt(t[0], "url").url;
                                return r.settings.isTrusted({
                                    command: "\\href",
                                    url: o
                                }) ? {
                                    type: "href",
                                    mode: r.mode,
                                    href: o,
                                    body: _e(n)
                                } : r.formatUnsupportedCmd("\\href")
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                const r = Qe(e.body, t, !1);
                                return Oe.makeAnchor(e.href, [], r, t)
                            }
                            ,
                            mathmlBuilder: (e, t) => {
                                let r = ft(e.body, t);
                                return r instanceof ht || (r = new ht("mrow",[r])),
                                r.setAttribute("href", e.href),
                                r
                            }
                        }),
                        Ye({
                            type: "href",
                            names: ["\\url"],
                            props: {
                                numArgs: 1,
                                argTypes: ["url"],
                                allowedInText: !0
                            },
                            handler: (e, t) => {
                                let {parser: r} = e;
                                const n = zt(t[0], "url").url;
                                if (!r.settings.isTrusted({
                                    command: "\\url",
                                    url: n
                                }))
                                    return r.formatUnsupportedCmd("\\url");
                                const o = [];
                                for (let e = 0; e < n.length; e++) {
                                    let t = n[e];
                                    "~" === t && (t = "\\textasciitilde"),
                                    o.push({
                                        type: "textord",
                                        mode: "text",
                                        text: t
                                    })
                                }
                                const s = {
                                    type: "text",
                                    mode: r.mode,
                                    font: "\\texttt",
                                    body: o
                                };
                                return {
                                    type: "href",
                                    mode: r.mode,
                                    href: n,
                                    body: _e(s)
                                }
                            }
                        }),
                        Ye({
                            type: "hbox",
                            names: ["\\hbox"],
                            props: {
                                numArgs: 1,
                                argTypes: ["text"],
                                allowedInText: !0,
                                primitive: !0
                            },
                            handler(e, t) {
                                let {parser: r} = e;
                                return {
                                    type: "hbox",
                                    mode: r.mode,
                                    body: _e(t[0])
                                }
                            },
                            htmlBuilder(e, t) {
                                const r = Qe(e.body, t, !1);
                                return Oe.makeFragment(r)
                            },
                            mathmlBuilder(e, t) {
                                return new mt.MathNode("mrow",gt(e.body, t))
                            }
                        }),
                        Ye({
                            type: "html",
                            names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"],
                            props: {
                                numArgs: 2,
                                argTypes: ["raw", "original"],
                                allowedInText: !0
                            },
                            handler: (e, t) => {
                                let {parser: r, funcName: o, token: s} = e;
                                const i = zt(t[0], "raw").string
                                  , a = t[1];
                                let l;
                                r.settings.strict && r.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
                                const h = {};
                                switch (o) {
                                case "\\htmlClass":
                                    h.class = i,
                                    l = {
                                        command: "\\htmlClass",
                                        class: i
                                    };
                                    break;
                                case "\\htmlId":
                                    h.id = i,
                                    l = {
                                        command: "\\htmlId",
                                        id: i
                                    };
                                    break;
                                case "\\htmlStyle":
                                    h.style = i,
                                    l = {
                                        command: "\\htmlStyle",
                                        style: i
                                    };
                                    break;
                                case "\\htmlData":
                                    {
                                        const e = i.split(",");
                                        for (let t = 0; t < e.length; t++) {
                                            const r = e[t].split("=");
                                            if (2 !== r.length)
                                                throw new n("Error parsing key-value for \\htmlData");
                                            h["data-" + r[0].trim()] = r[1].trim()
                                        }
                                        l = {
                                            command: "\\htmlData",
                                            attributes: h
                                        };
                                        break
                                    }
                                default:
                                    throw new Error("Unrecognized html command")
                                }
                                return r.settings.isTrusted(l) ? {
                                    type: "html",
                                    mode: r.mode,
                                    attributes: h,
                                    body: _e(a)
                                } : r.formatUnsupportedCmd(o)
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                const r = Qe(e.body, t, !1)
                                  , n = ["enclosing"];
                                e.attributes.class && n.push(...e.attributes.class.trim().split(/\s+/));
                                const o = Oe.makeSpan(n, r, t);
                                for (const t in e.attributes)
                                    "class" !== t && e.attributes.hasOwnProperty(t) && o.setAttribute(t, e.attributes[t]);
                                return o
                            }
                            ,
                            mathmlBuilder: (e, t) => ft(e.body, t)
                        }),
                        Ye({
                            type: "htmlmathml",
                            names: ["\\html@mathml"],
                            props: {
                                numArgs: 2,
                                allowedInText: !0
                            },
                            handler: (e, t) => {
                                let {parser: r} = e;
                                return {
                                    type: "htmlmathml",
                                    mode: r.mode,
                                    html: _e(t[0]),
                                    mathml: _e(t[1])
                                }
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                const r = Qe(e.html, t, !1);
                                return Oe.makeFragment(r)
                            }
                            ,
                            mathmlBuilder: (e, t) => ft(e.mathml, t)
                        });
                        const Yr = function(e) {
                            if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e))
                                return {
                                    number: +e,
                                    unit: "bp"
                                };
                            {
                                const t = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);
                                if (!t)
                                    throw new n("Invalid size: '" + e + "' in \\includegraphics");
                                const r = {
                                    number: +(t[1] + t[2]),
                                    unit: t[3]
                                };
                                if (!D(r))
                                    throw new n("Invalid unit: '" + r.unit + "' in \\includegraphics.");
                                return r
                            }
                        };
                        Ye({
                            type: "includegraphics",
                            names: ["\\includegraphics"],
                            props: {
                                numArgs: 1,
                                numOptionalArgs: 1,
                                argTypes: ["raw", "url"],
                                allowedInText: !1
                            },
                            handler: (e, t, r) => {
                                let {parser: o} = e
                                  , s = {
                                    number: 0,
                                    unit: "em"
                                }
                                  , i = {
                                    number: .9,
                                    unit: "em"
                                }
                                  , a = {
                                    number: 0,
                                    unit: "em"
                                }
                                  , l = "";
                                if (r[0]) {
                                    const e = zt(r[0], "raw").string.split(",");
                                    for (let t = 0; t < e.length; t++) {
                                        const r = e[t].split("=");
                                        if (2 === r.length) {
                                            const e = r[1].trim();
                                            switch (r[0].trim()) {
                                            case "alt":
                                                l = e;
                                                break;
                                            case "width":
                                                s = Yr(e);
                                                break;
                                            case "height":
                                                i = Yr(e);
                                                break;
                                            case "totalheight":
                                                a = Yr(e);
                                                break;
                                            default:
                                                throw new n("Invalid key: '" + r[0] + "' in \\includegraphics.")
                                            }
                                        }
                                    }
                                }
                                const h = zt(t[0], "url").url;
                                return "" === l && (l = h,
                                l = l.replace(/^.*[\\/]/, ""),
                                l = l.substring(0, l.lastIndexOf("."))),
                                o.settings.isTrusted({
                                    command: "\\includegraphics",
                                    url: h
                                }) ? {
                                    type: "includegraphics",
                                    mode: o.mode,
                                    alt: l,
                                    width: s,
                                    height: i,
                                    totalheight: a,
                                    src: h
                                } : o.formatUnsupportedCmd("\\includegraphics")
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                const r = P(e.height, t);
                                let n = 0;
                                e.totalheight.number > 0 && (n = P(e.totalheight, t) - r);
                                let o = 0;
                                e.width.number > 0 && (o = P(e.width, t));
                                const s = {
                                    height: V(r + n)
                                };
                                o > 0 && (s.width = V(o)),
                                n > 0 && (s.verticalAlign = V(-n));
                                const i = new _(e.src,e.alt,s);
                                return i.height = r,
                                i.depth = n,
                                i
                            }
                            ,
                            mathmlBuilder: (e, t) => {
                                const r = new mt.MathNode("mglyph",[]);
                                r.setAttribute("alt", e.alt);
                                const n = P(e.height, t);
                                let o = 0;
                                if (e.totalheight.number > 0 && (o = P(e.totalheight, t) - n,
                                r.setAttribute("valign", V(-o))),
                                r.setAttribute("height", V(n + o)),
                                e.width.number > 0) {
                                    const n = P(e.width, t);
                                    r.setAttribute("width", V(n))
                                }
                                return r.setAttribute("src", e.src),
                                r
                            }
                        }),
                        Ye({
                            type: "kern",
                            names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
                            props: {
                                numArgs: 1,
                                argTypes: ["size"],
                                primitive: !0,
                                allowedInText: !0
                            },
                            handler(e, t) {
                                let {parser: r, funcName: n} = e;
                                const o = zt(t[0], "size");
                                if (r.settings.strict) {
                                    const e = "m" === n[1]
                                      , t = "mu" === o.value.unit;
                                    e ? (t || r.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + n + " supports only mu units, not " + o.value.unit + " units"),
                                    "math" !== r.mode && r.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + n + " works only in math mode")) : t && r.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + n + " doesn't support mu units")
                                }
                                return {
                                    type: "kern",
                                    mode: r.mode,
                                    dimension: o.value
                                }
                            },
                            htmlBuilder(e, t) {
                                return Oe.makeGlue(e.dimension, t)
                            },
                            mathmlBuilder(e, t) {
                                const r = P(e.dimension, t);
                                return new mt.SpaceNode(r)
                            }
                        }),
                        Ye({
                            type: "lap",
                            names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
                            props: {
                                numArgs: 1,
                                allowedInText: !0
                            },
                            handler: (e, t) => {
                                let {parser: r, funcName: n} = e;
                                const o = t[0];
                                return {
                                    type: "lap",
                                    mode: r.mode,
                                    alignment: n.slice(5),
                                    body: o
                                }
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                let r;
                                "clap" === e.alignment ? (r = Oe.makeSpan([], [st(e.body, t)]),
                                r = Oe.makeSpan(["inner"], [r], t)) : r = Oe.makeSpan(["inner"], [st(e.body, t)]);
                                const n = Oe.makeSpan(["fix"], []);
                                let o = Oe.makeSpan([e.alignment], [r, n], t);
                                const s = Oe.makeSpan(["strut"]);
                                return s.style.height = V(o.height + o.depth),
                                o.depth && (s.style.verticalAlign = V(-o.depth)),
                                o.children.unshift(s),
                                o = Oe.makeSpan(["thinbox"], [o], t),
                                Oe.makeSpan(["mord", "vbox"], [o], t)
                            }
                            ,
                            mathmlBuilder: (e, t) => {
                                const r = new mt.MathNode("mpadded",[bt(e.body, t)]);
                                if ("rlap" !== e.alignment) {
                                    const t = "llap" === e.alignment ? "-1" : "-0.5";
                                    r.setAttribute("lspace", t + "width")
                                }
                                return r.setAttribute("width", "0px"),
                                r
                            }
                        }),
                        Ye({
                            type: "styling",
                            names: ["\\(", "$"],
                            props: {
                                numArgs: 0,
                                allowedInText: !0,
                                allowedInMath: !1
                            },
                            handler(e, t) {
                                let {funcName: r, parser: n} = e;
                                const o = n.mode;
                                n.switchMode("math");
                                const s = "\\(" === r ? "\\)" : "$"
                                  , i = n.parseExpression(!1, s);
                                return n.expect(s),
                                n.switchMode(o),
                                {
                                    type: "styling",
                                    mode: n.mode,
                                    style: "text",
                                    body: i
                                }
                            }
                        }),
                        Ye({
                            type: "text",
                            names: ["\\)", "\\]"],
                            props: {
                                numArgs: 0,
                                allowedInText: !0,
                                allowedInMath: !1
                            },
                            handler(e, t) {
                                throw new n("Mismatched " + e.funcName)
                            }
                        });
                        const Xr = (e, t) => {
                            switch (t.style.size) {
                            case w.DISPLAY.size:
                                return e.display;
                            case w.TEXT.size:
                                return e.text;
                            case w.SCRIPT.size:
                                return e.script;
                            case w.SCRIPTSCRIPT.size:
                                return e.scriptscript;
                            default:
                                return e.text
                            }
                        }
                        ;
                        Ye({
                            type: "mathchoice",
                            names: ["\\mathchoice"],
                            props: {
                                numArgs: 4,
                                primitive: !0
                            },
                            handler: (e, t) => {
                                let {parser: r} = e;
                                return {
                                    type: "mathchoice",
                                    mode: r.mode,
                                    display: _e(t[0]),
                                    text: _e(t[1]),
                                    script: _e(t[2]),
                                    scriptscript: _e(t[3])
                                }
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                const r = Xr(e, t)
                                  , n = Qe(r, t, !1);
                                return Oe.makeFragment(n)
                            }
                            ,
                            mathmlBuilder: (e, t) => {
                                const r = Xr(e, t);
                                return ft(r, t)
                            }
                        });
                        const Wr = (e, t, r, n, o, s, i) => {
                            e = Oe.makeSpan([], [e]);
                            const a = r && l.isCharacterBox(r);
                            let h, c, m;
                            if (t) {
                                const e = st(t, n.havingStyle(o.sup()), n);
                                c = {
                                    elem: e,
                                    kern: Math.max(n.fontMetrics().bigOpSpacing1, n.fontMetrics().bigOpSpacing3 - e.depth)
                                }
                            }
                            if (r) {
                                const e = st(r, n.havingStyle(o.sub()), n);
                                h = {
                                    elem: e,
                                    kern: Math.max(n.fontMetrics().bigOpSpacing2, n.fontMetrics().bigOpSpacing4 - e.height)
                                }
                            }
                            if (c && h) {
                                const t = n.fontMetrics().bigOpSpacing5 + h.elem.height + h.elem.depth + h.kern + e.depth + i;
                                m = Oe.makeVList({
                                    positionType: "bottom",
                                    positionData: t,
                                    children: [{
                                        type: "kern",
                                        size: n.fontMetrics().bigOpSpacing5
                                    }, {
                                        type: "elem",
                                        elem: h.elem,
                                        marginLeft: V(-s)
                                    }, {
                                        type: "kern",
                                        size: h.kern
                                    }, {
                                        type: "elem",
                                        elem: e
                                    }, {
                                        type: "kern",
                                        size: c.kern
                                    }, {
                                        type: "elem",
                                        elem: c.elem,
                                        marginLeft: V(s)
                                    }, {
                                        type: "kern",
                                        size: n.fontMetrics().bigOpSpacing5
                                    }]
                                }, n)
                            } else if (h) {
                                const t = e.height - i;
                                m = Oe.makeVList({
                                    positionType: "top",
                                    positionData: t,
                                    children: [{
                                        type: "kern",
                                        size: n.fontMetrics().bigOpSpacing5
                                    }, {
                                        type: "elem",
                                        elem: h.elem,
                                        marginLeft: V(-s)
                                    }, {
                                        type: "kern",
                                        size: h.kern
                                    }, {
                                        type: "elem",
                                        elem: e
                                    }]
                                }, n)
                            } else {
                                if (!c)
                                    return e;
                                {
                                    const t = e.depth + i;
                                    m = Oe.makeVList({
                                        positionType: "bottom",
                                        positionData: t,
                                        children: [{
                                            type: "elem",
                                            elem: e
                                        }, {
                                            type: "kern",
                                            size: c.kern
                                        }, {
                                            type: "elem",
                                            elem: c.elem,
                                            marginLeft: V(s)
                                        }, {
                                            type: "kern",
                                            size: n.fontMetrics().bigOpSpacing5
                                        }]
                                    }, n)
                                }
                            }
                            const p = [m];
                            if (h && 0 !== s && !a) {
                                const e = Oe.makeSpan(["mspace"], [], n);
                                e.style.marginRight = V(s),
                                p.unshift(e)
                            }
                            return Oe.makeSpan(["mop", "op-limits"], p, n)
                        }
                          , _r = ["\\smallint"]
                          , jr = (e, t) => {
                            let r, n, o, s = !1;
                            "supsub" === e.type ? (r = e.sup,
                            n = e.sub,
                            o = zt(e.base, "op"),
                            s = !0) : o = zt(e, "op");
                            const i = t.style;
                            let a, h = !1;
                            if (i.size === w.DISPLAY.size && o.symbol && !l.contains(_r, o.name) && (h = !0),
                            o.symbol) {
                                const e = h ? "Size2-Regular" : "Size1-Regular";
                                let r = "";
                                if ("\\oiint" !== o.name && "\\oiiint" !== o.name || (r = o.name.slice(1),
                                o.name = "oiint" === r ? "\\iint" : "\\iiint"),
                                a = Oe.makeSymbol(o.name, e, "math", t, ["mop", "op-symbol", h ? "large-op" : "small-op"]),
                                r.length > 0) {
                                    const e = a.italic
                                      , n = Oe.staticSvg(r + "Size" + (h ? "2" : "1"), t);
                                    a = Oe.makeVList({
                                        positionType: "individualShift",
                                        children: [{
                                            type: "elem",
                                            elem: a,
                                            shift: 0
                                        }, {
                                            type: "elem",
                                            elem: n,
                                            shift: h ? .08 : 0
                                        }]
                                    }, t),
                                    o.name = "\\" + r,
                                    a.classes.unshift("mop"),
                                    a.italic = e
                                }
                            } else if (o.body) {
                                const e = Qe(o.body, t, !0);
                                1 === e.length && e[0]instanceof $ ? (a = e[0],
                                a.classes[0] = "mop") : a = Oe.makeSpan(["mop"], e, t)
                            } else {
                                const e = [];
                                for (let r = 1; r < o.name.length; r++)
                                    e.push(Oe.mathsym(o.name[r], o.mode, t));
                                a = Oe.makeSpan(["mop"], e, t)
                            }
                            let c = 0
                              , m = 0;
                            return (a instanceof $ || "\\oiint" === o.name || "\\oiiint" === o.name) && !o.suppressBaseShift && (c = (a.height - a.depth) / 2 - t.fontMetrics().axisHeight,
                            m = a.italic),
                            s ? Wr(a, r, n, t, i, m, c) : (c && (a.style.position = "relative",
                            a.style.top = V(c)),
                            a)
                        }
                          , $r = (e, t) => {
                            let r;
                            if (e.symbol)
                                r = new ht("mo",[pt(e.name, e.mode)]),
                                l.contains(_r, e.name) && r.setAttribute("largeop", "false");
                            else if (e.body)
                                r = new ht("mo",gt(e.body, t));
                            else {
                                r = new ht("mi",[new ct(e.name.slice(1))]);
                                const t = new ht("mo",[pt("⁡", "text")]);
                                r = e.parentIsSupSub ? new ht("mrow",[r, t]) : lt([r, t])
                            }
                            return r
                        }
                          , Zr = {
                            "∏": "\\prod",
                            "∐": "\\coprod",
                            "∑": "\\sum",
                            "⋀": "\\bigwedge",
                            "⋁": "\\bigvee",
                            "⋂": "\\bigcap",
                            "⋃": "\\bigcup",
                            "⨀": "\\bigodot",
                            "⨁": "\\bigoplus",
                            "⨂": "\\bigotimes",
                            "⨄": "\\biguplus",
                            "⨆": "\\bigsqcup"
                        };
                        Ye({
                            type: "op",
                            names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "∏", "∐", "∑", "⋀", "⋁", "⋂", "⋃", "⨀", "⨁", "⨂", "⨄", "⨆"],
                            props: {
                                numArgs: 0
                            },
                            handler: (e, t) => {
                                let {parser: r, funcName: n} = e
                                  , o = n;
                                return 1 === o.length && (o = Zr[o]),
                                {
                                    type: "op",
                                    mode: r.mode,
                                    limits: !0,
                                    parentIsSupSub: !1,
                                    symbol: !0,
                                    name: o
                                }
                            }
                            ,
                            htmlBuilder: jr,
                            mathmlBuilder: $r
                        }),
                        Ye({
                            type: "op",
                            names: ["\\mathop"],
                            props: {
                                numArgs: 1,
                                primitive: !0
                            },
                            handler: (e, t) => {
                                let {parser: r} = e;
                                const n = t[0];
                                return {
                                    type: "op",
                                    mode: r.mode,
                                    limits: !1,
                                    parentIsSupSub: !1,
                                    symbol: !1,
                                    body: _e(n)
                                }
                            }
                            ,
                            htmlBuilder: jr,
                            mathmlBuilder: $r
                        });
                        const Kr = {
                            "∫": "\\int",
                            "∬": "\\iint",
                            "∭": "\\iiint",
                            "∮": "\\oint",
                            "∯": "\\oiint",
                            "∰": "\\oiiint"
                        };
                        Ye({
                            type: "op",
                            names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"],
                            props: {
                                numArgs: 0
                            },
                            handler(e) {
                                let {parser: t, funcName: r} = e;
                                return {
                                    type: "op",
                                    mode: t.mode,
                                    limits: !1,
                                    parentIsSupSub: !1,
                                    symbol: !1,
                                    name: r
                                }
                            },
                            htmlBuilder: jr,
                            mathmlBuilder: $r
                        }),
                        Ye({
                            type: "op",
                            names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"],
                            props: {
                                numArgs: 0
                            },
                            handler(e) {
                                let {parser: t, funcName: r} = e;
                                return {
                                    type: "op",
                                    mode: t.mode,
                                    limits: !0,
                                    parentIsSupSub: !1,
                                    symbol: !1,
                                    name: r
                                }
                            },
                            htmlBuilder: jr,
                            mathmlBuilder: $r
                        }),
                        Ye({
                            type: "op",
                            names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "∫", "∬", "∭", "∮", "∯", "∰"],
                            props: {
                                numArgs: 0
                            },
                            handler(e) {
                                let {parser: t, funcName: r} = e
                                  , n = r;
                                return 1 === n.length && (n = Kr[n]),
                                {
                                    type: "op",
                                    mode: t.mode,
                                    limits: !1,
                                    parentIsSupSub: !1,
                                    symbol: !0,
                                    name: n
                                }
                            },
                            htmlBuilder: jr,
                            mathmlBuilder: $r
                        });
                        const Jr = (e, t) => {
                            let r, n, o, s, i = !1;
                            if ("supsub" === e.type ? (r = e.sup,
                            n = e.sub,
                            o = zt(e.base, "operatorname"),
                            i = !0) : o = zt(e, "operatorname"),
                            o.body.length > 0) {
                                const e = o.body.map((e => {
                                    const t = e.text;
                                    return "string" == typeof t ? {
                                        type: "textord",
                                        mode: e.mode,
                                        text: t
                                    } : e
                                }
                                ))
                                  , r = Qe(e, t.withFont("mathrm"), !0);
                                for (let e = 0; e < r.length; e++) {
                                    const t = r[e];
                                    t instanceof $ && (t.text = t.text.replace(/\u2212/, "-").replace(/\u2217/, "*"))
                                }
                                s = Oe.makeSpan(["mop"], r, t)
                            } else
                                s = Oe.makeSpan(["mop"], [], t);
                            return i ? Wr(s, r, n, t, t.style, 0, 0) : s
                        }
                        ;
                        function Qr(e, t, r) {
                            const n = Qe(e, t, !1)
                              , o = t.sizeMultiplier / r.sizeMultiplier;
                            for (let e = 0; e < n.length; e++) {
                                const s = n[e].classes.indexOf("sizing");
                                s < 0 ? Array.prototype.push.apply(n[e].classes, t.sizingClasses(r)) : n[e].classes[s + 1] === "reset-size" + t.size && (n[e].classes[s + 1] = "reset-size" + r.size),
                                n[e].height *= o,
                                n[e].depth *= o
                            }
                            return Oe.makeFragment(n)
                        }
                        Ye({
                            type: "operatorname",
                            names: ["\\operatorname@", "\\operatornamewithlimits"],
                            props: {
                                numArgs: 1
                            },
                            handler: (e, t) => {
                                let {parser: r, funcName: n} = e;
                                const o = t[0];
                                return {
                                    type: "operatorname",
                                    mode: r.mode,
                                    body: _e(o),
                                    alwaysHandleSupSub: "\\operatornamewithlimits" === n,
                                    limits: !1,
                                    parentIsSupSub: !1
                                }
                            }
                            ,
                            htmlBuilder: Jr,
                            mathmlBuilder: (e, t) => {
                                let r = gt(e.body, t.withFont("mathrm"))
                                  , n = !0;
                                for (let e = 0; e < r.length; e++) {
                                    const t = r[e];
                                    if (t instanceof mt.SpaceNode)
                                        ;
                                    else if (t instanceof mt.MathNode)
                                        switch (t.type) {
                                        case "mi":
                                        case "mn":
                                        case "ms":
                                        case "mspace":
                                        case "mtext":
                                            break;
                                        case "mo":
                                            {
                                                const e = t.children[0];
                                                1 === t.children.length && e instanceof mt.TextNode ? e.text = e.text.replace(/\u2212/, "-").replace(/\u2217/, "*") : n = !1;
                                                break
                                            }
                                        default:
                                            n = !1
                                        }
                                    else
                                        n = !1
                                }
                                if (n) {
                                    const e = r.map((e => e.toText())).join("");
                                    r = [new mt.TextNode(e)]
                                }
                                const o = new mt.MathNode("mi",r);
                                o.setAttribute("mathvariant", "normal");
                                const s = new mt.MathNode("mo",[pt("⁡", "text")]);
                                return e.parentIsSupSub ? new mt.MathNode("mrow",[o, s]) : mt.newDocumentFragment([o, s])
                            }
                        }),
                        kr("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@"),
                        Xe({
                            type: "ordgroup",
                            htmlBuilder(e, t) {
                                return e.semisimple ? Oe.makeFragment(Qe(e.body, t, !1)) : Oe.makeSpan(["mord"], Qe(e.body, t, !0), t)
                            },
                            mathmlBuilder(e, t) {
                                return ft(e.body, t, !0)
                            }
                        }),
                        Ye({
                            type: "overline",
                            names: ["\\overline"],
                            props: {
                                numArgs: 1
                            },
                            handler(e, t) {
                                let {parser: r} = e;
                                const n = t[0];
                                return {
                                    type: "overline",
                                    mode: r.mode,
                                    body: n
                                }
                            },
                            htmlBuilder(e, t) {
                                const r = st(e.body, t.havingCrampedStyle())
                                  , n = Oe.makeLineSpan("overline-line", t)
                                  , o = t.fontMetrics().defaultRuleThickness
                                  , s = Oe.makeVList({
                                    positionType: "firstBaseline",
                                    children: [{
                                        type: "elem",
                                        elem: r
                                    }, {
                                        type: "kern",
                                        size: 3 * o
                                    }, {
                                        type: "elem",
                                        elem: n
                                    }, {
                                        type: "kern",
                                        size: o
                                    }]
                                }, t);
                                return Oe.makeSpan(["mord", "overline"], [s], t)
                            },
                            mathmlBuilder(e, t) {
                                const r = new mt.MathNode("mo",[new mt.TextNode("‾")]);
                                r.setAttribute("stretchy", "true");
                                const n = new mt.MathNode("mover",[bt(e.body, t), r]);
                                return n.setAttribute("accent", "true"),
                                n
                            }
                        }),
                        Ye({
                            type: "phantom",
                            names: ["\\phantom"],
                            props: {
                                numArgs: 1,
                                allowedInText: !0
                            },
                            handler: (e, t) => {
                                let {parser: r} = e;
                                const n = t[0];
                                return {
                                    type: "phantom",
                                    mode: r.mode,
                                    body: _e(n)
                                }
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                const r = Qe(e.body, t.withPhantom(), !1);
                                return Oe.makeFragment(r)
                            }
                            ,
                            mathmlBuilder: (e, t) => {
                                const r = gt(e.body, t);
                                return new mt.MathNode("mphantom",r)
                            }
                        }),
                        Ye({
                            type: "hphantom",
                            names: ["\\hphantom"],
                            props: {
                                numArgs: 1,
                                allowedInText: !0
                            },
                            handler: (e, t) => {
                                let {parser: r} = e;
                                const n = t[0];
                                return {
                                    type: "hphantom",
                                    mode: r.mode,
                                    body: n
                                }
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                let r = Oe.makeSpan([], [st(e.body, t.withPhantom())]);
                                if (r.height = 0,
                                r.depth = 0,
                                r.children)
                                    for (let e = 0; e < r.children.length; e++)
                                        r.children[e].height = 0,
                                        r.children[e].depth = 0;
                                return r = Oe.makeVList({
                                    positionType: "firstBaseline",
                                    children: [{
                                        type: "elem",
                                        elem: r
                                    }]
                                }, t),
                                Oe.makeSpan(["mord"], [r], t)
                            }
                            ,
                            mathmlBuilder: (e, t) => {
                                const r = gt(_e(e.body), t)
                                  , n = new mt.MathNode("mphantom",r)
                                  , o = new mt.MathNode("mpadded",[n]);
                                return o.setAttribute("height", "0px"),
                                o.setAttribute("depth", "0px"),
                                o
                            }
                        }),
                        Ye({
                            type: "vphantom",
                            names: ["\\vphantom"],
                            props: {
                                numArgs: 1,
                                allowedInText: !0
                            },
                            handler: (e, t) => {
                                let {parser: r} = e;
                                const n = t[0];
                                return {
                                    type: "vphantom",
                                    mode: r.mode,
                                    body: n
                                }
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                const r = Oe.makeSpan(["inner"], [st(e.body, t.withPhantom())])
                                  , n = Oe.makeSpan(["fix"], []);
                                return Oe.makeSpan(["mord", "rlap"], [r, n], t)
                            }
                            ,
                            mathmlBuilder: (e, t) => {
                                const r = gt(_e(e.body), t)
                                  , n = new mt.MathNode("mphantom",r)
                                  , o = new mt.MathNode("mpadded",[n]);
                                return o.setAttribute("width", "0px"),
                                o
                            }
                        }),
                        Ye({
                            type: "raisebox",
                            names: ["\\raisebox"],
                            props: {
                                numArgs: 2,
                                argTypes: ["size", "hbox"],
                                allowedInText: !0
                            },
                            handler(e, t) {
                                let {parser: r} = e;
                                const n = zt(t[0], "size").value
                                  , o = t[1];
                                return {
                                    type: "raisebox",
                                    mode: r.mode,
                                    dy: n,
                                    body: o
                                }
                            },
                            htmlBuilder(e, t) {
                                const r = st(e.body, t)
                                  , n = P(e.dy, t);
                                return Oe.makeVList({
                                    positionType: "shift",
                                    positionData: -n,
                                    children: [{
                                        type: "elem",
                                        elem: r
                                    }]
                                }, t)
                            },
                            mathmlBuilder(e, t) {
                                const r = new mt.MathNode("mpadded",[bt(e.body, t)])
                                  , n = e.dy.number + e.dy.unit;
                                return r.setAttribute("voffset", n),
                                r
                            }
                        }),
                        Ye({
                            type: "internal",
                            names: ["\\relax"],
                            props: {
                                numArgs: 0,
                                allowedInText: !0
                            },
                            handler(e) {
                                let {parser: t} = e;
                                return {
                                    type: "internal",
                                    mode: t.mode
                                }
                            }
                        }),
                        Ye({
                            type: "rule",
                            names: ["\\rule"],
                            props: {
                                numArgs: 2,
                                numOptionalArgs: 1,
                                argTypes: ["size", "size", "size"]
                            },
                            handler(e, t, r) {
                                let {parser: n} = e;
                                const o = r[0]
                                  , s = zt(t[0], "size")
                                  , i = zt(t[1], "size");
                                return {
                                    type: "rule",
                                    mode: n.mode,
                                    shift: o && zt(o, "size").value,
                                    width: s.value,
                                    height: i.value
                                }
                            },
                            htmlBuilder(e, t) {
                                const r = Oe.makeSpan(["mord", "rule"], [], t)
                                  , n = P(e.width, t)
                                  , o = P(e.height, t)
                                  , s = e.shift ? P(e.shift, t) : 0;
                                return r.style.borderRightWidth = V(n),
                                r.style.borderTopWidth = V(o),
                                r.style.bottom = V(s),
                                r.width = n,
                                r.height = o + s,
                                r.depth = -s,
                                r.maxFontSize = 1.125 * o * t.sizeMultiplier,
                                r
                            },
                            mathmlBuilder(e, t) {
                                const r = P(e.width, t)
                                  , n = P(e.height, t)
                                  , o = e.shift ? P(e.shift, t) : 0
                                  , s = t.color && t.getColor() || "black"
                                  , i = new mt.MathNode("mspace");
                                i.setAttribute("mathbackground", s),
                                i.setAttribute("width", V(r)),
                                i.setAttribute("height", V(n));
                                const a = new mt.MathNode("mpadded",[i]);
                                return o >= 0 ? a.setAttribute("height", V(o)) : (a.setAttribute("height", V(o)),
                                a.setAttribute("depth", V(-o))),
                                a.setAttribute("voffset", V(o)),
                                a
                            }
                        });
                        const en = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"];
                        Ye({
                            type: "sizing",
                            names: en,
                            props: {
                                numArgs: 0,
                                allowedInText: !0
                            },
                            handler: (e, t) => {
                                let {breakOnTokenText: r, funcName: n, parser: o} = e;
                                const s = o.parseExpression(!1, r);
                                return {
                                    type: "sizing",
                                    mode: o.mode,
                                    size: en.indexOf(n) + 1,
                                    body: s
                                }
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                const r = t.havingSize(e.size);
                                return Qr(e.body, r, t)
                            }
                            ,
                            mathmlBuilder: (e, t) => {
                                const r = t.havingSize(e.size)
                                  , n = gt(e.body, r)
                                  , o = new mt.MathNode("mstyle",n);
                                return o.setAttribute("mathsize", V(r.sizeMultiplier)),
                                o
                            }
                        }),
                        Ye({
                            type: "smash",
                            names: ["\\smash"],
                            props: {
                                numArgs: 1,
                                numOptionalArgs: 1,
                                allowedInText: !0
                            },
                            handler: (e, t, r) => {
                                let {parser: n} = e
                                  , o = !1
                                  , s = !1;
                                const i = r[0] && zt(r[0], "ordgroup");
                                if (i) {
                                    let e = "";
                                    for (let t = 0; t < i.body.length; ++t)
                                        if (e = i.body[t].text,
                                        "t" === e)
                                            o = !0;
                                        else {
                                            if ("b" !== e) {
                                                o = !1,
                                                s = !1;
                                                break
                                            }
                                            s = !0
                                        }
                                } else
                                    o = !0,
                                    s = !0;
                                const a = t[0];
                                return {
                                    type: "smash",
                                    mode: n.mode,
                                    body: a,
                                    smashHeight: o,
                                    smashDepth: s
                                }
                            }
                            ,
                            htmlBuilder: (e, t) => {
                                const r = Oe.makeSpan([], [st(e.body, t)]);
                                if (!e.smashHeight && !e.smashDepth)
                                    return r;
                                if (e.smashHeight && (r.height = 0,
                                r.children))
                                    for (let e = 0; e < r.children.length; e++)
                                        r.children[e].height = 0;
                                if (e.smashDepth && (r.depth = 0,
                                r.children))
                                    for (let e = 0; e < r.children.length; e++)
                                        r.children[e].depth = 0;
                                const n = Oe.makeVList({
                                    positionType: "firstBaseline",
                                    children: [{
                                        type: "elem",
                                        elem: r
                                    }]
                                }, t);
                                return Oe.makeSpan(["mord"], [n], t)
                            }
                            ,
                            mathmlBuilder: (e, t) => {
                                const r = new mt.MathNode("mpadded",[bt(e.body, t)]);
                                return e.smashHeight && r.setAttribute("height", "0px"),
                                e.smashDepth && r.setAttribute("depth", "0px"),
                                r
                            }
                        }),
                        Ye({
                            type: "sqrt",
                            names: ["\\sqrt"],
                            props: {
                                numArgs: 1,
                                numOptionalArgs: 1
                            },
                            handler(e, t, r) {
                                let {parser: n} = e;
                                const o = r[0]
                                  , s = t[0];
                                return {
                                    type: "sqrt",
                                    mode: n.mode,
                                    body: s,
                                    index: o
                                }
                            },
                            htmlBuilder(e, t) {
                                let r = st(e.body, t.havingCrampedStyle());
                                0 === r.height && (r.height = t.fontMetrics().xHeight),
                                r = Oe.wrapFragment(r, t);
                                const n = t.fontMetrics().defaultRuleThickness;
                                let o = n;
                                t.style.id < w.TEXT.id && (o = t.fontMetrics().xHeight);
                                let s = n + o / 4;
                                const i = r.height + r.depth + s + n
                                  , {span: a, ruleWidth: l, advanceWidth: h} = pr.sqrtImage(i, t)
                                  , c = a.height - l;
                                c > r.height + r.depth + s && (s = (s + c - r.height - r.depth) / 2);
                                const m = a.height - r.height - s - l;
                                r.style.paddingLeft = V(h);
                                const p = Oe.makeVList({
                                    positionType: "firstBaseline",
                                    children: [{
                                        type: "elem",
                                        elem: r,
                                        wrapperClasses: ["svg-align"]
                                    }, {
                                        type: "kern",
                                        size: -(r.height + m)
                                    }, {
                                        type: "elem",
                                        elem: a
                                    }, {
                                        type: "kern",
                                        size: l
                                    }]
                                }, t);
                                if (e.index) {
                                    const r = t.havingStyle(w.SCRIPTSCRIPT)
                                      , n = st(e.index, r, t)
                                      , o = .6 * (p.height - p.depth)
                                      , s = Oe.makeVList({
                                        positionType: "shift",
                                        positionData: -o,
                                        children: [{
                                            type: "elem",
                                            elem: n
                                        }]
                                    }, t)
                                      , i = Oe.makeSpan(["root"], [s]);
                                    return Oe.makeSpan(["mord", "sqrt"], [i, p], t)
                                }
                                return Oe.makeSpan(["mord", "sqrt"], [p], t)
                            },
                            mathmlBuilder(e, t) {
                                const {body: r, index: n} = e;
                                return n ? new mt.MathNode("mroot",[bt(r, t), bt(n, t)]) : new mt.MathNode("msqrt",[bt(r, t)])
                            }
                        });
                        const tn = {
                            display: w.DISPLAY,
                            text: w.TEXT,
                            script: w.SCRIPT,
                            scriptscript: w.SCRIPTSCRIPT
                        };
                        Ye({
                            type: "styling",
                            names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],
                            props: {
                                numArgs: 0,
                                allowedInText: !0,
                                primitive: !0
                            },
                            handler(e, t) {
                                let {breakOnTokenText: r, funcName: n, parser: o} = e;
                                const s = o.parseExpression(!0, r)
                                  , i = n.slice(1, n.length - 5);
                                return {
                                    type: "styling",
                                    mode: o.mode,
                                    style: i,
                                    body: s
                                }
                            },
                            htmlBuilder(e, t) {
                                const r = tn[e.style]
                                  , n = t.havingStyle(r).withFont("");
                                return Qr(e.body, n, t)
                            },
                            mathmlBuilder(e, t) {
                                const r = tn[e.style]
                                  , n = t.havingStyle(r)
                                  , o = gt(e.body, n)
                                  , s = new mt.MathNode("mstyle",o)
                                  , i = {
                                    display: ["0", "true"],
                                    text: ["0", "false"],
                                    script: ["1", "false"],
                                    scriptscript: ["2", "false"]
                                }[e.style];
                                return s.setAttribute("scriptlevel", i[0]),
                                s.setAttribute("displaystyle", i[1]),
                                s
                            }
                        }),
                        Xe({
                            type: "supsub",
                            htmlBuilder(e, t) {
                                const r = function(e, t) {
                                    const r = e.base;
                                    return r ? "op" === r.type ? r.limits && (t.style.size === w.DISPLAY.size || r.alwaysHandleSupSub) ? jr : null : "operatorname" === r.type ? r.alwaysHandleSupSub && (t.style.size === w.DISPLAY.size || r.limits) ? Jr : null : "accent" === r.type ? l.isCharacterBox(r.base) ? Bt : null : "horizBrace" === r.type && !e.sub === r.isOver ? Ur : null : null
                                }(e, t);
                                if (r)
                                    return r(e, t);
                                const {base: n, sup: o, sub: s} = e
                                  , i = st(n, t);
                                let a, h;
                                const c = t.fontMetrics();
                                let m = 0
                                  , p = 0;
                                const u = n && l.isCharacterBox(n);
                                if (o) {
                                    const e = t.havingStyle(t.style.sup());
                                    a = st(o, e, t),
                                    u || (m = i.height - e.fontMetrics().supDrop * e.sizeMultiplier / t.sizeMultiplier)
                                }
                                if (s) {
                                    const e = t.havingStyle(t.style.sub());
                                    h = st(s, e, t),
                                    u || (p = i.depth + e.fontMetrics().subDrop * e.sizeMultiplier / t.sizeMultiplier)
                                }
                                let d;
                                d = t.style === w.DISPLAY ? c.sup1 : t.style.cramped ? c.sup3 : c.sup2;
                                const g = t.sizeMultiplier
                                  , f = V(.5 / c.ptPerEm / g);
                                let b, y = null;
                                if (h) {
                                    const t = e.base && "op" === e.base.type && e.base.name && ("\\oiint" === e.base.name || "\\oiiint" === e.base.name);
                                    (i instanceof $ || t) && (y = V(-i.italic))
                                }
                                if (a && h) {
                                    m = Math.max(m, d, a.depth + .25 * c.xHeight),
                                    p = Math.max(p, c.sub2);
                                    const e = 4 * c.defaultRuleThickness;
                                    if (m - a.depth - (h.height - p) < e) {
                                        p = e - (m - a.depth) + h.height;
                                        const t = .8 * c.xHeight - (m - a.depth);
                                        t > 0 && (m += t,
                                        p -= t)
                                    }
                                    b = Oe.makeVList({
                                        positionType: "individualShift",
                                        children: [{
                                            type: "elem",
                                            elem: h,
                                            shift: p,
                                            marginRight: f,
                                            marginLeft: y
                                        }, {
                                            type: "elem",
                                            elem: a,
                                            shift: -m,
                                            marginRight: f
                                        }]
                                    }, t)
                                } else if (h) {
                                    p = Math.max(p, c.sub1, h.height - .8 * c.xHeight);
                                    b = Oe.makeVList({
                                        positionType: "shift",
                                        positionData: p,
                                        children: [{
                                            type: "elem",
                                            elem: h,
                                            marginLeft: y,
                                            marginRight: f
                                        }]
                                    }, t)
                                } else {
                                    if (!a)
                                        throw new Error("supsub must have either sup or sub.");
                                    m = Math.max(m, d, a.depth + .25 * c.xHeight),
                                    b = Oe.makeVList({
                                        positionType: "shift",
                                        positionData: -m,
                                        children: [{
                                            type: "elem",
                                            elem: a,
                                            marginRight: f
                                        }]
                                    }, t)
                                }
                                const x = nt(i, "right") || "mord";
                                return Oe.makeSpan([x], [i, Oe.makeSpan(["msupsub"], [b])], t)
                            },
                            mathmlBuilder(e, t) {
                                let r, n, o = !1;
                                e.base && "horizBrace" === e.base.type && (n = !!e.sup,
                                n === e.base.isOver && (o = !0,
                                r = e.base.isOver)),
                                !e.base || "op" !== e.base.type && "operatorname" !== e.base.type || (e.base.parentIsSupSub = !0);
                                const s = [bt(e.base, t)];
                                let i;
                                if (e.sub && s.push(bt(e.sub, t)),
                                e.sup && s.push(bt(e.sup, t)),
                                o)
                                    i = r ? "mover" : "munder";
                                else if (e.sub)
                                    if (e.sup) {
                                        const r = e.base;
                                        i = r && "op" === r.type && r.limits && t.style === w.DISPLAY || r && "operatorname" === r.type && r.alwaysHandleSupSub && (t.style === w.DISPLAY || r.limits) ? "munderover" : "msubsup"
                                    } else {
                                        const r = e.base;
                                        i = r && "op" === r.type && r.limits && (t.style === w.DISPLAY || r.alwaysHandleSupSub) || r && "operatorname" === r.type && r.alwaysHandleSupSub && (r.limits || t.style === w.DISPLAY) ? "munder" : "msub"
                                    }
                                else {
                                    const r = e.base;
                                    i = r && "op" === r.type && r.limits && (t.style === w.DISPLAY || r.alwaysHandleSupSub) || r && "operatorname" === r.type && r.alwaysHandleSupSub && (r.limits || t.style === w.DISPLAY) ? "mover" : "msup"
                                }
                                return new mt.MathNode(i,s)
                            }
                        }),
                        Xe({
                            type: "atom",
                            htmlBuilder(e, t) {
                                return Oe.mathsym(e.text, e.mode, t, ["m" + e.family])
                            },
                            mathmlBuilder(e, t) {
                                const r = new mt.MathNode("mo",[pt(e.text, e.mode)]);
                                if ("bin" === e.family) {
                                    const n = dt(e, t);
                                    "bold-italic" === n && r.setAttribute("mathvariant", n)
                                } else
                                    "punct" === e.family ? r.setAttribute("separator", "true") : "open" !== e.family && "close" !== e.family || r.setAttribute("stretchy", "false");
                                return r
                            }
                        });
                        const rn = {
                            mi: "italic",
                            mn: "normal",
                            mtext: "normal"
                        };
                        Xe({
                            type: "mathord",
                            htmlBuilder(e, t) {
                                return Oe.makeOrd(e, t, "mathord")
                            },
                            mathmlBuilder(e, t) {
                                const r = new mt.MathNode("mi",[pt(e.text, e.mode, t)])
                                  , n = dt(e, t) || "italic";
                                return n !== rn[r.type] && r.setAttribute("mathvariant", n),
                                r
                            }
                        }),
                        Xe({
                            type: "textord",
                            htmlBuilder(e, t) {
                                return Oe.makeOrd(e, t, "textord")
                            },
                            mathmlBuilder(e, t) {
                                const r = pt(e.text, e.mode, t)
                                  , n = dt(e, t) || "normal";
                                let o;
                                return o = "text" === e.mode ? new mt.MathNode("mtext",[r]) : /[0-9]/.test(e.text) ? new mt.MathNode("mn",[r]) : "\\prime" === e.text ? new mt.MathNode("mo",[r]) : new mt.MathNode("mi",[r]),
                                n !== rn[o.type] && o.setAttribute("mathvariant", n),
                                o
                            }
                        });
                        const nn = {
                            "\\nobreak": "nobreak",
                            "\\allowbreak": "allowbreak"
                        }
                          , on = {
                            " ": {},
                            "\\ ": {},
                            "~": {
                                className: "nobreak"
                            },
                            "\\space": {},
                            "\\nobreakspace": {
                                className: "nobreak"
                            }
                        };
                        Xe({
                            type: "spacing",
                            htmlBuilder(e, t) {
                                if (on.hasOwnProperty(e.text)) {
                                    const r = on[e.text].className || "";
                                    if ("text" === e.mode) {
                                        const n = Oe.makeOrd(e, t, "textord");
                                        return n.classes.push(r),
                                        n
                                    }
                                    return Oe.makeSpan(["mspace", r], [Oe.mathsym(e.text, e.mode, t)], t)
                                }
                                if (nn.hasOwnProperty(e.text))
                                    return Oe.makeSpan(["mspace", nn[e.text]], [], t);
                                throw new n('Unknown type of space "' + e.text + '"')
                            },
                            mathmlBuilder(e, t) {
                                let r;
                                if (!on.hasOwnProperty(e.text)) {
                                    if (nn.hasOwnProperty(e.text))
                                        return new mt.MathNode("mspace");
                                    throw new n('Unknown type of space "' + e.text + '"')
                                }
                                return r = new mt.MathNode("mtext",[new mt.TextNode(" ")]),
                                r
                            }
                        });
                        const sn = () => {
                            const e = new mt.MathNode("mtd",[]);
                            return e.setAttribute("width", "50%"),
                            e
                        }
                        ;
                        Xe({
                            type: "tag",
                            mathmlBuilder(e, t) {
                                const r = new mt.MathNode("mtable",[new mt.MathNode("mtr",[sn(), new mt.MathNode("mtd",[ft(e.body, t)]), sn(), new mt.MathNode("mtd",[ft(e.tag, t)])])]);
                                return r.setAttribute("width", "100%"),
                                r
                            }
                        });
                        const an = {
                            "\\text": void 0,
                            "\\textrm": "textrm",
                            "\\textsf": "textsf",
                            "\\texttt": "texttt",
                            "\\textnormal": "textrm"
                        }
                          , ln = {
                            "\\textbf": "textbf",
                            "\\textmd": "textmd"
                        }
                          , hn = {
                            "\\textit": "textit",
                            "\\textup": "textup"
                        }
                          , cn = (e, t) => {
                            const r = e.font;
                            return r ? an[r] ? t.withTextFontFamily(an[r]) : ln[r] ? t.withTextFontWeight(ln[r]) : t.withTextFontShape(hn[r]) : t
                        }
                        ;
                        Ye({
                            type: "text",
                            names: ["\\text", "\\textrm", "\\textsf", "\\texttt", "\\textnormal", "\\textbf", "\\textmd", "\\textit", "\\textup"],
                            props: {
                                numArgs: 1,
                                argTypes: ["text"],
                                allowedInArgument: !0,
                                allowedInText: !0
                            },
                            handler(e, t) {
                                let {parser: r, funcName: n} = e;
                                const o = t[0];
                                return {
                                    type: "text",
                                    mode: r.mode,
                                    body: _e(o),
                                    font: n
                                }
                            },
                            htmlBuilder(e, t) {
                                const r = cn(e, t)
                                  , n = Qe(e.body, r, !0);
                                return Oe.makeSpan(["mord", "text"], n, r)
                            },
                            mathmlBuilder(e, t) {
                                const r = cn(e, t);
                                return ft(e.body, r)
                            }
                        }),
                        Ye({
                            type: "underline",
                            names: ["\\underline"],
                            props: {
                                numArgs: 1,
                                allowedInText: !0
                            },
                            handler(e, t) {
                                let {parser: r} = e;
                                return {
                                    type: "underline",
                                    mode: r.mode,
                                    body: t[0]
                                }
                            },
                            htmlBuilder(e, t) {
                                const r = st(e.body, t)
                                  , n = Oe.makeLineSpan("underline-line", t)
                                  , o = t.fontMetrics().defaultRuleThickness
                                  , s = Oe.makeVList({
                                    positionType: "top",
                                    positionData: r.height,
                                    children: [{
                                        type: "kern",
                                        size: o
                                    }, {
                                        type: "elem",
                                        elem: n
                                    }, {
                                        type: "kern",
                                        size: 3 * o
                                    }, {
                                        type: "elem",
                                        elem: r
                                    }]
                                }, t);
                                return Oe.makeSpan(["mord", "underline"], [s], t)
                            },
                            mathmlBuilder(e, t) {
                                const r = new mt.MathNode("mo",[new mt.TextNode("‾")]);
                                r.setAttribute("stretchy", "true");
                                const n = new mt.MathNode("munder",[bt(e.body, t), r]);
                                return n.setAttribute("accentunder", "true"),
                                n
                            }
                        }),
                        Ye({
                            type: "vcenter",
                            names: ["\\vcenter"],
                            props: {
                                numArgs: 1,
                                argTypes: ["original"],
                                allowedInText: !1
                            },
                            handler(e, t) {
                                let {parser: r} = e;
                                return {
                                    type: "vcenter",
                                    mode: r.mode,
                                    body: t[0]
                                }
                            },
                            htmlBuilder(e, t) {
                                const r = st(e.body, t)
                                  , n = t.fontMetrics().axisHeight
                                  , o = .5 * (r.height - n - (r.depth + n));
                                return Oe.makeVList({
                                    positionType: "shift",
                                    positionData: o,
                                    children: [{
                                        type: "elem",
                                        elem: r
                                    }]
                                }, t)
                            },
                            mathmlBuilder(e, t) {
                                return new mt.MathNode("mpadded",[bt(e.body, t)],["vcenter"])
                            }
                        }),
                        Ye({
                            type: "verb",
                            names: ["\\verb"],
                            props: {
                                numArgs: 0,
                                allowedInText: !0
                            },
                            handler(e, t, r) {
                                throw new n("\\verb ended by end of line instead of matching delimiter")
                            },
                            htmlBuilder(e, t) {
                                const r = mn(e)
                                  , n = []
                                  , o = t.havingStyle(t.style.text());
                                for (let t = 0; t < r.length; t++) {
                                    let s = r[t];
                                    "~" === s && (s = "\\textasciitilde"),
                                    n.push(Oe.makeSymbol(s, "Typewriter-Regular", e.mode, o, ["mord", "texttt"]))
                                }
                                return Oe.makeSpan(["mord", "text"].concat(o.sizingClasses(t)), Oe.tryCombineChars(n), o)
                            },
                            mathmlBuilder(e, t) {
                                const r = new mt.TextNode(mn(e))
                                  , n = new mt.MathNode("mtext",[r]);
                                return n.setAttribute("mathvariant", "monospace"),
                                n
                            }
                        });
                        const mn = e => e.body.replace(/ /g, e.star ? "␣" : " ");
                        var pn = Fe;
                        const un = "[ \r\n\t]"
                          , dn = "(\\\\[a-zA-Z@]+)" + un + "*"
                          , gn = "[̀-ͯ]"
                          , fn = new RegExp(gn + "+$")
                          , bn = "(" + un + "+)|\\\\(\n|[ \r\t]+\n?)[ \r\t]*|([!-\\[\\]-‧‪-퟿豈-￿]" + gn + "*|[\ud800-\udbff][\udc00-\udfff]" + gn + "*|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5|" + dn + "|\\\\[^\ud800-\udfff])";
                        class yn {
                            constructor(e, t) {
                                this.input = void 0,
                                this.settings = void 0,
                                this.tokenRegex = void 0,
                                this.catcodes = void 0,
                                this.input = e,
                                this.settings = t,
                                this.tokenRegex = new RegExp(bn,"g"),
                                this.catcodes = {
                                    "%": 14,
                                    "~": 13
                                }
                            }
                            setCatcode(e, t) {
                                this.catcodes[e] = t
                            }
                            lex() {
                                const e = this.input
                                  , t = this.tokenRegex.lastIndex;
                                if (t === e.length)
                                    return new Mr("EOF",new Sr(this,t,t));
                                const r = this.tokenRegex.exec(e);
                                if (null === r || r.index !== t)
                                    throw new n("Unexpected character: '" + e[t] + "'",new Mr(e[t],new Sr(this,t,t + 1)));
                                const o = r[6] || r[3] || (r[2] ? "\\ " : " ");
                                if (14 === this.catcodes[o]) {
                                    const t = e.indexOf("\n", this.tokenRegex.lastIndex);
                                    return -1 === t ? (this.tokenRegex.lastIndex = e.length,
                                    this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")) : this.tokenRegex.lastIndex = t + 1,
                                    this.lex()
                                }
                                return new Mr(o,new Sr(this,t,this.tokenRegex.lastIndex))
                            }
                        }
                        class xn {
                            constructor(e, t) {
                                void 0 === e && (e = {}),
                                void 0 === t && (t = {}),
                                this.current = void 0,
                                this.builtins = void 0,
                                this.undefStack = void 0,
                                this.current = t,
                                this.builtins = e,
                                this.undefStack = []
                            }
                            beginGroup() {
                                this.undefStack.push({})
                            }
                            endGroup() {
                                if (0 === this.undefStack.length)
                                    throw new n("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
                                const e = this.undefStack.pop();
                                for (const t in e)
                                    e.hasOwnProperty(t) && (null == e[t] ? delete this.current[t] : this.current[t] = e[t])
                            }
                            endGroups() {
                                for (; this.undefStack.length > 0; )
                                    this.endGroup()
                            }
                            has(e) {
                                return this.current.hasOwnProperty(e) || this.builtins.hasOwnProperty(e)
                            }
                            get(e) {
                                return this.current.hasOwnProperty(e) ? this.current[e] : this.builtins[e]
                            }
                            set(e, t, r) {
                                if (void 0 === r && (r = !1),
                                r) {
                                    for (let t = 0; t < this.undefStack.length; t++)
                                        delete this.undefStack[t][e];
                                    this.undefStack.length > 0 && (this.undefStack[this.undefStack.length - 1][e] = t)
                                } else {
                                    const t = this.undefStack[this.undefStack.length - 1];
                                    t && !t.hasOwnProperty(e) && (t[e] = this.current[e])
                                }
                                null == t ? delete this.current[e] : this.current[e] = t
                            }
                        }
                        var wn = vr;
                        kr("\\noexpand", (function(e) {
                            const t = e.popToken();
                            return e.isExpandable(t.text) && (t.noexpand = !0,
                            t.treatAsRelax = !0),
                            {
                                tokens: [t],
                                numArgs: 0
                            }
                        }
                        )),
                        kr("\\expandafter", (function(e) {
                            const t = e.popToken();
                            return e.expandOnce(!0),
                            {
                                tokens: [t],
                                numArgs: 0
                            }
                        }
                        )),
                        kr("\\@firstoftwo", (function(e) {
                            return {
                                tokens: e.consumeArgs(2)[0],
                                numArgs: 0
                            }
                        }
                        )),
                        kr("\\@secondoftwo", (function(e) {
                            return {
                                tokens: e.consumeArgs(2)[1],
                                numArgs: 0
                            }
                        }
                        )),
                        kr("\\@ifnextchar", (function(e) {
                            const t = e.consumeArgs(3);
                            e.consumeSpaces();
                            const r = e.future();
                            return 1 === t[0].length && t[0][0].text === r.text ? {
                                tokens: t[1],
                                numArgs: 0
                            } : {
                                tokens: t[2],
                                numArgs: 0
                            }
                        }
                        )),
                        kr("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}"),
                        kr("\\TextOrMath", (function(e) {
                            const t = e.consumeArgs(2);
                            return "text" === e.mode ? {
                                tokens: t[0],
                                numArgs: 0
                            } : {
                                tokens: t[1],
                                numArgs: 0
                            }
                        }
                        ));
                        const vn = {
                            0: 0,
                            1: 1,
                            2: 2,
                            3: 3,
                            4: 4,
                            5: 5,
                            6: 6,
                            7: 7,
                            8: 8,
                            9: 9,
                            a: 10,
                            A: 10,
                            b: 11,
                            B: 11,
                            c: 12,
                            C: 12,
                            d: 13,
                            D: 13,
                            e: 14,
                            E: 14,
                            f: 15,
                            F: 15
                        };
                        kr("\\char", (function(e) {
                            let t, r = e.popToken(), o = "";
                            if ("'" === r.text)
                                t = 8,
                                r = e.popToken();
                            else if ('"' === r.text)
                                t = 16,
                                r = e.popToken();
                            else if ("`" === r.text)
                                if (r = e.popToken(),
                                "\\" === r.text[0])
                                    o = r.text.charCodeAt(1);
                                else {
                                    if ("EOF" === r.text)
                                        throw new n("\\char` missing argument");
                                    o = r.text.charCodeAt(0)
                                }
                            else
                                t = 10;
                            if (t) {
                                if (o = vn[r.text],
                                null == o || o >= t)
                                    throw new n("Invalid base-" + t + " digit " + r.text);
                                let s;
                                for (; null != (s = vn[e.future().text]) && s < t; )
                                    o *= t,
                                    o += s,
                                    e.popToken()
                            }
                            return "\\@char{" + o + "}"
                        }
                        ));
                        const kn = (e, t, r) => {
                            let o = e.consumeArg().tokens;
                            if (1 !== o.length)
                                throw new n("\\newcommand's first argument must be a macro name");
                            const s = o[0].text
                              , i = e.isDefined(s);
                            if (i && !t)
                                throw new n("\\newcommand{" + s + "} attempting to redefine " + s + "; use \\renewcommand");
                            if (!i && !r)
                                throw new n("\\renewcommand{" + s + "} when command " + s + " does not yet exist; use \\newcommand");
                            let a = 0;
                            if (o = e.consumeArg().tokens,
                            1 === o.length && "[" === o[0].text) {
                                let t = ""
                                  , r = e.expandNextToken();
                                for (; "]" !== r.text && "EOF" !== r.text; )
                                    t += r.text,
                                    r = e.expandNextToken();
                                if (!t.match(/^\s*[0-9]+\s*$/))
                                    throw new n("Invalid number of arguments: " + t);
                                a = parseInt(t),
                                o = e.consumeArg().tokens
                            }
                            return e.macros.set(s, {
                                tokens: o,
                                numArgs: a
                            }),
                            ""
                        }
                        ;
                        kr("\\newcommand", (e => kn(e, !1, !0))),
                        kr("\\renewcommand", (e => kn(e, !0, !1))),
                        kr("\\providecommand", (e => kn(e, !0, !0))),
                        kr("\\message", (e => {
                            const t = e.consumeArgs(1)[0];
                            return console.log(t.reverse().map((e => e.text)).join("")),
                            ""
                        }
                        )),
                        kr("\\errmessage", (e => {
                            const t = e.consumeArgs(1)[0];
                            return console.error(t.reverse().map((e => e.text)).join("")),
                            ""
                        }
                        )),
                        kr("\\show", (e => {
                            const t = e.popToken()
                              , r = t.text;
                            return console.log(t, e.macros.get(r), pn[r], ne.math[r], ne.text[r]),
                            ""
                        }
                        )),
                        kr("\\bgroup", "{"),
                        kr("\\egroup", "}"),
                        kr("~", "\\nobreakspace"),
                        kr("\\lq", "`"),
                        kr("\\rq", "'"),
                        kr("\\aa", "\\r a"),
                        kr("\\AA", "\\r A"),
                        kr("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`©}"),
                        kr("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}"),
                        kr("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}"),
                        kr("ℬ", "\\mathscr{B}"),
                        kr("ℰ", "\\mathscr{E}"),
                        kr("ℱ", "\\mathscr{F}"),
                        kr("ℋ", "\\mathscr{H}"),
                        kr("ℐ", "\\mathscr{I}"),
                        kr("ℒ", "\\mathscr{L}"),
                        kr("ℳ", "\\mathscr{M}"),
                        kr("ℛ", "\\mathscr{R}"),
                        kr("ℭ", "\\mathfrak{C}"),
                        kr("ℌ", "\\mathfrak{H}"),
                        kr("ℨ", "\\mathfrak{Z}"),
                        kr("\\Bbbk", "\\Bbb{k}"),
                        kr("·", "\\cdotp"),
                        kr("\\llap", "\\mathllap{\\textrm{#1}}"),
                        kr("\\rlap", "\\mathrlap{\\textrm{#1}}"),
                        kr("\\clap", "\\mathclap{\\textrm{#1}}"),
                        kr("\\mathstrut", "\\vphantom{(}"),
                        kr("\\underbar", "\\underline{\\text{#1}}"),
                        kr("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}'),
                        kr("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}"),
                        kr("\\ne", "\\neq"),
                        kr("≠", "\\neq"),
                        kr("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}"),
                        kr("∉", "\\notin"),
                        kr("≘", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}"),
                        kr("≙", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}"),
                        kr("≚", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}"),
                        kr("≛", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}"),
                        kr("≝", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}"),
                        kr("≞", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}"),
                        kr("≟", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}"),
                        kr("⟂", "\\perp"),
                        kr("‼", "\\mathclose{!\\mkern-0.8mu!}"),
                        kr("∌", "\\notni"),
                        kr("⌜", "\\ulcorner"),
                        kr("⌝", "\\urcorner"),
                        kr("⌞", "\\llcorner"),
                        kr("⌟", "\\lrcorner"),
                        kr("©", "\\copyright"),
                        kr("®", "\\textregistered"),
                        kr("️", "\\textregistered"),
                        kr("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}'),
                        kr("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}'),
                        kr("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}'),
                        kr("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}'),
                        kr("\\vdots", "\\mathord{\\varvdots\\rule{0pt}{15pt}}"),
                        kr("⋮", "\\vdots"),
                        kr("\\varGamma", "\\mathit{\\Gamma}"),
                        kr("\\varDelta", "\\mathit{\\Delta}"),
                        kr("\\varTheta", "\\mathit{\\Theta}"),
                        kr("\\varLambda", "\\mathit{\\Lambda}"),
                        kr("\\varXi", "\\mathit{\\Xi}"),
                        kr("\\varPi", "\\mathit{\\Pi}"),
                        kr("\\varSigma", "\\mathit{\\Sigma}"),
                        kr("\\varUpsilon", "\\mathit{\\Upsilon}"),
                        kr("\\varPhi", "\\mathit{\\Phi}"),
                        kr("\\varPsi", "\\mathit{\\Psi}"),
                        kr("\\varOmega", "\\mathit{\\Omega}"),
                        kr("\\substack", "\\begin{subarray}{c}#1\\end{subarray}"),
                        kr("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax"),
                        kr("\\boxed", "\\fbox{$\\displaystyle{#1}$}"),
                        kr("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;"),
                        kr("\\implies", "\\DOTSB\\;\\Longrightarrow\\;"),
                        kr("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
                        const Sn = {
                            ",": "\\dotsc",
                            "\\not": "\\dotsb",
                            "+": "\\dotsb",
                            "=": "\\dotsb",
                            "<": "\\dotsb",
                            ">": "\\dotsb",
                            "-": "\\dotsb",
                            "*": "\\dotsb",
                            ":": "\\dotsb",
                            "\\DOTSB": "\\dotsb",
                            "\\coprod": "\\dotsb",
                            "\\bigvee": "\\dotsb",
                            "\\bigwedge": "\\dotsb",
                            "\\biguplus": "\\dotsb",
                            "\\bigcap": "\\dotsb",
                            "\\bigcup": "\\dotsb",
                            "\\prod": "\\dotsb",
                            "\\sum": "\\dotsb",
                            "\\bigotimes": "\\dotsb",
                            "\\bigoplus": "\\dotsb",
                            "\\bigodot": "\\dotsb",
                            "\\bigsqcup": "\\dotsb",
                            "\\And": "\\dotsb",
                            "\\longrightarrow": "\\dotsb",
                            "\\Longrightarrow": "\\dotsb",
                            "\\longleftarrow": "\\dotsb",
                            "\\Longleftarrow": "\\dotsb",
                            "\\longleftrightarrow": "\\dotsb",
                            "\\Longleftrightarrow": "\\dotsb",
                            "\\mapsto": "\\dotsb",
                            "\\longmapsto": "\\dotsb",
                            "\\hookrightarrow": "\\dotsb",
                            "\\doteq": "\\dotsb",
                            "\\mathbin": "\\dotsb",
                            "\\mathrel": "\\dotsb",
                            "\\relbar": "\\dotsb",
                            "\\Relbar": "\\dotsb",
                            "\\xrightarrow": "\\dotsb",
                            "\\xleftarrow": "\\dotsb",
                            "\\DOTSI": "\\dotsi",
                            "\\int": "\\dotsi",
                            "\\oint": "\\dotsi",
                            "\\iint": "\\dotsi",
                            "\\iiint": "\\dotsi",
                            "\\iiiint": "\\dotsi",
                            "\\idotsint": "\\dotsi",
                            "\\DOTSX": "\\dotsx"
                        };
                        kr("\\dots", (function(e) {
                            let t = "\\dotso";
                            const r = e.expandAfterFuture().text;
                            return r in Sn ? t = Sn[r] : ("\\not" === r.slice(0, 4) || r in ne.math && l.contains(["bin", "rel"], ne.math[r].group)) && (t = "\\dotsb"),
                            t
                        }
                        ));
                        const Mn = {
                            ")": !0,
                            "]": !0,
                            "\\rbrack": !0,
                            "\\}": !0,
                            "\\rbrace": !0,
                            "\\rangle": !0,
                            "\\rceil": !0,
                            "\\rfloor": !0,
                            "\\rgroup": !0,
                            "\\rmoustache": !0,
                            "\\right": !0,
                            "\\bigr": !0,
                            "\\biggr": !0,
                            "\\Bigr": !0,
                            "\\Biggr": !0,
                            $: !0,
                            ";": !0,
                            ".": !0,
                            ",": !0
                        };
                        kr("\\dotso", (function(e) {
                            return e.future().text in Mn ? "\\ldots\\," : "\\ldots"
                        }
                        )),
                        kr("\\dotsc", (function(e) {
                            const t = e.future().text;
                            return t in Mn && "," !== t ? "\\ldots\\," : "\\ldots"
                        }
                        )),
                        kr("\\cdots", (function(e) {
                            return e.future().text in Mn ? "\\@cdots\\," : "\\@cdots"
                        }
                        )),
                        kr("\\dotsb", "\\cdots"),
                        kr("\\dotsm", "\\cdots"),
                        kr("\\dotsi", "\\!\\cdots"),
                        kr("\\dotsx", "\\ldots\\,"),
                        kr("\\DOTSI", "\\relax"),
                        kr("\\DOTSB", "\\relax"),
                        kr("\\DOTSX", "\\relax"),
                        kr("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax"),
                        kr("\\,", "\\tmspace+{3mu}{.1667em}"),
                        kr("\\thinspace", "\\,"),
                        kr("\\>", "\\mskip{4mu}"),
                        kr("\\:", "\\tmspace+{4mu}{.2222em}"),
                        kr("\\medspace", "\\:"),
                        kr("\\;", "\\tmspace+{5mu}{.2777em}"),
                        kr("\\thickspace", "\\;"),
                        kr("\\!", "\\tmspace-{3mu}{.1667em}"),
                        kr("\\negthinspace", "\\!"),
                        kr("\\negmedspace", "\\tmspace-{4mu}{.2222em}"),
                        kr("\\negthickspace", "\\tmspace-{5mu}{.277em}"),
                        kr("\\enspace", "\\kern.5em "),
                        kr("\\enskip", "\\hskip.5em\\relax"),
                        kr("\\quad", "\\hskip1em\\relax"),
                        kr("\\qquad", "\\hskip2em\\relax"),
                        kr("\\tag", "\\@ifstar\\tag@literal\\tag@paren"),
                        kr("\\tag@paren", "\\tag@literal{({#1})}"),
                        kr("\\tag@literal", (e => {
                            if (e.macros.get("\\df@tag"))
                                throw new n("Multiple \\tag");
                            return "\\gdef\\df@tag{\\text{#1}}"
                        }
                        )),
                        kr("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}"),
                        kr("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)"),
                        kr("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}"),
                        kr("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1"),
                        kr("\\newline", "\\\\\\relax"),
                        kr("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
                        const zn = V(A["Main-Regular"]["T".charCodeAt(0)][1] - .7 * A["Main-Regular"]["A".charCodeAt(0)][1]);
                        kr("\\LaTeX", "\\textrm{\\html@mathml{L\\kern-.36em\\raisebox{" + zn + "}{\\scriptstyle A}\\kern-.15em\\TeX}{LaTeX}}"),
                        kr("\\KaTeX", "\\textrm{\\html@mathml{K\\kern-.17em\\raisebox{" + zn + "}{\\scriptstyle A}\\kern-.15em\\TeX}{KaTeX}}"),
                        kr("\\hspace", "\\@ifstar\\@hspacer\\@hspace"),
                        kr("\\@hspace", "\\hskip #1\\relax"),
                        kr("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax"),
                        kr("\\ordinarycolon", ":"),
                        kr("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}"),
                        kr("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}'),
                        kr("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}'),
                        kr("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}'),
                        kr("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}'),
                        kr("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}'),
                        kr("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}'),
                        kr("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}'),
                        kr("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}'),
                        kr("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}'),
                        kr("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}'),
                        kr("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}'),
                        kr("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}'),
                        kr("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}'),
                        kr("∷", "\\dblcolon"),
                        kr("∹", "\\eqcolon"),
                        kr("≔", "\\coloneqq"),
                        kr("≕", "\\eqqcolon"),
                        kr("⩴", "\\Coloneqq"),
                        kr("\\ratio", "\\vcentcolon"),
                        kr("\\coloncolon", "\\dblcolon"),
                        kr("\\colonequals", "\\coloneqq"),
                        kr("\\coloncolonequals", "\\Coloneqq"),
                        kr("\\equalscolon", "\\eqqcolon"),
                        kr("\\equalscoloncolon", "\\Eqqcolon"),
                        kr("\\colonminus", "\\coloneq"),
                        kr("\\coloncolonminus", "\\Coloneq"),
                        kr("\\minuscolon", "\\eqcolon"),
                        kr("\\minuscoloncolon", "\\Eqcolon"),
                        kr("\\coloncolonapprox", "\\Colonapprox"),
                        kr("\\coloncolonsim", "\\Colonsim"),
                        kr("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}"),
                        kr("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}"),
                        kr("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}"),
                        kr("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}"),
                        kr("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}"),
                        kr("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}"),
                        kr("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}"),
                        kr("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}"),
                        kr("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}"),
                        kr("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}"),
                        kr("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}"),
                        kr("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}"),
                        kr("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}"),
                        kr("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{≩}"),
                        kr("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{≨}"),
                        kr("\\ngeqq", "\\html@mathml{\\@ngeqq}{≱}"),
                        kr("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{≱}"),
                        kr("\\nleqq", "\\html@mathml{\\@nleqq}{≰}"),
                        kr("\\nleqslant", "\\html@mathml{\\@nleqslant}{≰}"),
                        kr("\\nshortmid", "\\html@mathml{\\@nshortmid}{∤}"),
                        kr("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{∦}"),
                        kr("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{⊈}"),
                        kr("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{⊉}"),
                        kr("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{⊊}"),
                        kr("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{⫋}"),
                        kr("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{⊋}"),
                        kr("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{⫌}"),
                        kr("\\imath", "\\html@mathml{\\@imath}{ı}"),
                        kr("\\jmath", "\\html@mathml{\\@jmath}{ȷ}"),
                        kr("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}"),
                        kr("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}"),
                        kr("⟦", "\\llbracket"),
                        kr("⟧", "\\rrbracket"),
                        kr("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}"),
                        kr("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}"),
                        kr("⦃", "\\lBrace"),
                        kr("⦄", "\\rBrace"),
                        kr("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`⦵}}"),
                        kr("⦵", "\\minuso"),
                        kr("\\darr", "\\downarrow"),
                        kr("\\dArr", "\\Downarrow"),
                        kr("\\Darr", "\\Downarrow"),
                        kr("\\lang", "\\langle"),
                        kr("\\rang", "\\rangle"),
                        kr("\\uarr", "\\uparrow"),
                        kr("\\uArr", "\\Uparrow"),
                        kr("\\Uarr", "\\Uparrow"),
                        kr("\\N", "\\mathbb{N}"),
                        kr("\\R", "\\mathbb{R}"),
                        kr("\\Z", "\\mathbb{Z}"),
                        kr("\\alef", "\\aleph"),
                        kr("\\alefsym", "\\aleph"),
                        kr("\\Alpha", "\\mathrm{A}"),
                        kr("\\Beta", "\\mathrm{B}"),
                        kr("\\bull", "\\bullet"),
                        kr("\\Chi", "\\mathrm{X}"),
                        kr("\\clubs", "\\clubsuit"),
                        kr("\\cnums", "\\mathbb{C}"),
                        kr("\\Complex", "\\mathbb{C}"),
                        kr("\\Dagger", "\\ddagger"),
                        kr("\\diamonds", "\\diamondsuit"),
                        kr("\\empty", "\\emptyset"),
                        kr("\\Epsilon", "\\mathrm{E}"),
                        kr("\\Eta", "\\mathrm{H}"),
                        kr("\\exist", "\\exists"),
                        kr("\\harr", "\\leftrightarrow"),
                        kr("\\hArr", "\\Leftrightarrow"),
                        kr("\\Harr", "\\Leftrightarrow"),
                        kr("\\hearts", "\\heartsuit"),
                        kr("\\image", "\\Im"),
                        kr("\\infin", "\\infty"),
                        kr("\\Iota", "\\mathrm{I}"),
                        kr("\\isin", "\\in"),
                        kr("\\Kappa", "\\mathrm{K}"),
                        kr("\\larr", "\\leftarrow"),
                        kr("\\lArr", "\\Leftarrow"),
                        kr("\\Larr", "\\Leftarrow"),
                        kr("\\lrarr", "\\leftrightarrow"),
                        kr("\\lrArr", "\\Leftrightarrow"),
                        kr("\\Lrarr", "\\Leftrightarrow"),
                        kr("\\Mu", "\\mathrm{M}"),
                        kr("\\natnums", "\\mathbb{N}"),
                        kr("\\Nu", "\\mathrm{N}"),
                        kr("\\Omicron", "\\mathrm{O}"),
                        kr("\\plusmn", "\\pm"),
                        kr("\\rarr", "\\rightarrow"),
                        kr("\\rArr", "\\Rightarrow"),
                        kr("\\Rarr", "\\Rightarrow"),
                        kr("\\real", "\\Re"),
                        kr("\\reals", "\\mathbb{R}"),
                        kr("\\Reals", "\\mathbb{R}"),
                        kr("\\Rho", "\\mathrm{P}"),
                        kr("\\sdot", "\\cdot"),
                        kr("\\sect", "\\S"),
                        kr("\\spades", "\\spadesuit"),
                        kr("\\sub", "\\subset"),
                        kr("\\sube", "\\subseteq"),
                        kr("\\supe", "\\supseteq"),
                        kr("\\Tau", "\\mathrm{T}"),
                        kr("\\thetasym", "\\vartheta"),
                        kr("\\weierp", "\\wp"),
                        kr("\\Zeta", "\\mathrm{Z}"),
                        kr("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}"),
                        kr("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}"),
                        kr("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits"),
                        kr("\\bra", "\\mathinner{\\langle{#1}|}"),
                        kr("\\ket", "\\mathinner{|{#1}\\rangle}"),
                        kr("\\braket", "\\mathinner{\\langle{#1}\\rangle}"),
                        kr("\\Bra", "\\left\\langle#1\\right|"),
                        kr("\\Ket", "\\left|#1\\right\\rangle");
                        const An = e => t => {
                            const r = t.consumeArg().tokens
                              , n = t.consumeArg().tokens
                              , o = t.consumeArg().tokens
                              , s = t.consumeArg().tokens
                              , i = t.macros.get("|")
                              , a = t.macros.get("\\|");
                            t.macros.beginGroup();
                            const l = t => r => {
                                e && (r.macros.set("|", i),
                                o.length && r.macros.set("\\|", a));
                                let s = t;
                                return !t && o.length && "|" === r.future().text && (r.popToken(),
                                s = !0),
                                {
                                    tokens: s ? o : n,
                                    numArgs: 0
                                }
                            }
                            ;
                            t.macros.set("|", l(!1)),
                            o.length && t.macros.set("\\|", l(!0));
                            const h = t.consumeArg().tokens
                              , c = t.expandTokens([...s, ...h, ...r]);
                            return t.macros.endGroup(),
                            {
                                tokens: c.reverse(),
                                numArgs: 0
                            }
                        }
                        ;
                        kr("\\bra@ket", An(!1)),
                        kr("\\bra@set", An(!0)),
                        kr("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}"),
                        kr("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}"),
                        kr("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}"),
                        kr("\\angln", "{\\angl n}"),
                        kr("\\blue", "\\textcolor{##6495ed}{#1}"),
                        kr("\\orange", "\\textcolor{##ffa500}{#1}"),
                        kr("\\pink", "\\textcolor{##ff00af}{#1}"),
                        kr("\\red", "\\textcolor{##df0030}{#1}"),
                        kr("\\green", "\\textcolor{##28ae7b}{#1}"),
                        kr("\\gray", "\\textcolor{gray}{#1}"),
                        kr("\\purple", "\\textcolor{##9d38bd}{#1}"),
                        kr("\\blueA", "\\textcolor{##ccfaff}{#1}"),
                        kr("\\blueB", "\\textcolor{##80f6ff}{#1}"),
                        kr("\\blueC", "\\textcolor{##63d9ea}{#1}"),
                        kr("\\blueD", "\\textcolor{##11accd}{#1}"),
                        kr("\\blueE", "\\textcolor{##0c7f99}{#1}"),
                        kr("\\tealA", "\\textcolor{##94fff5}{#1}"),
                        kr("\\tealB", "\\textcolor{##26edd5}{#1}"),
                        kr("\\tealC", "\\textcolor{##01d1c1}{#1}"),
                        kr("\\tealD", "\\textcolor{##01a995}{#1}"),
                        kr("\\tealE", "\\textcolor{##208170}{#1}"),
                        kr("\\greenA", "\\textcolor{##b6ffb0}{#1}"),
                        kr("\\greenB", "\\textcolor{##8af281}{#1}"),
                        kr("\\greenC", "\\textcolor{##74cf70}{#1}"),
                        kr("\\greenD", "\\textcolor{##1fab54}{#1}"),
                        kr("\\greenE", "\\textcolor{##0d923f}{#1}"),
                        kr("\\goldA", "\\textcolor{##ffd0a9}{#1}"),
                        kr("\\goldB", "\\textcolor{##ffbb71}{#1}"),
                        kr("\\goldC", "\\textcolor{##ff9c39}{#1}"),
                        kr("\\goldD", "\\textcolor{##e07d10}{#1}"),
                        kr("\\goldE", "\\textcolor{##a75a05}{#1}"),
                        kr("\\redA", "\\textcolor{##fca9a9}{#1}"),
                        kr("\\redB", "\\textcolor{##ff8482}{#1}"),
                        kr("\\redC", "\\textcolor{##f9685d}{#1}"),
                        kr("\\redD", "\\textcolor{##e84d39}{#1}"),
                        kr("\\redE", "\\textcolor{##bc2612}{#1}"),
                        kr("\\maroonA", "\\textcolor{##ffbde0}{#1}"),
                        kr("\\maroonB", "\\textcolor{##ff92c6}{#1}"),
                        kr("\\maroonC", "\\textcolor{##ed5fa6}{#1}"),
                        kr("\\maroonD", "\\textcolor{##ca337c}{#1}"),
                        kr("\\maroonE", "\\textcolor{##9e034e}{#1}"),
                        kr("\\purpleA", "\\textcolor{##ddd7ff}{#1}"),
                        kr("\\purpleB", "\\textcolor{##c6b9fc}{#1}"),
                        kr("\\purpleC", "\\textcolor{##aa87ff}{#1}"),
                        kr("\\purpleD", "\\textcolor{##7854ab}{#1}"),
                        kr("\\purpleE", "\\textcolor{##543b78}{#1}"),
                        kr("\\mintA", "\\textcolor{##f5f9e8}{#1}"),
                        kr("\\mintB", "\\textcolor{##edf2df}{#1}"),
                        kr("\\mintC", "\\textcolor{##e0e5cc}{#1}"),
                        kr("\\grayA", "\\textcolor{##f6f7f7}{#1}"),
                        kr("\\grayB", "\\textcolor{##f0f1f2}{#1}"),
                        kr("\\grayC", "\\textcolor{##e3e5e6}{#1}"),
                        kr("\\grayD", "\\textcolor{##d6d8da}{#1}"),
                        kr("\\grayE", "\\textcolor{##babec2}{#1}"),
                        kr("\\grayF", "\\textcolor{##888d93}{#1}"),
                        kr("\\grayG", "\\textcolor{##626569}{#1}"),
                        kr("\\grayH", "\\textcolor{##3b3e40}{#1}"),
                        kr("\\grayI", "\\textcolor{##21242c}{#1}"),
                        kr("\\kaBlue", "\\textcolor{##314453}{#1}"),
                        kr("\\kaGreen", "\\textcolor{##71B307}{#1}");
                        const Tn = {
                            "^": !0,
                            _: !0,
                            "\\limits": !0,
                            "\\nolimits": !0
                        };
                        class Bn {
                            constructor(e, t, r) {
                                this.settings = void 0,
                                this.expansionCount = void 0,
                                this.lexer = void 0,
                                this.macros = void 0,
                                this.stack = void 0,
                                this.mode = void 0,
                                this.settings = t,
                                this.expansionCount = 0,
                                this.feed(e),
                                this.macros = new xn(wn,t.macros),
                                this.mode = r,
                                this.stack = []
                            }
                            feed(e) {
                                this.lexer = new yn(e,this.settings)
                            }
                            switchMode(e) {
                                this.mode = e
                            }
                            beginGroup() {
                                this.macros.beginGroup()
                            }
                            endGroup() {
                                this.macros.endGroup()
                            }
                            endGroups() {
                                this.macros.endGroups()
                            }
                            future() {
                                return 0 === this.stack.length && this.pushToken(this.lexer.lex()),
                                this.stack[this.stack.length - 1]
                            }
                            popToken() {
                                return this.future(),
                                this.stack.pop()
                            }
                            pushToken(e) {
                                this.stack.push(e)
                            }
                            pushTokens(e) {
                                this.stack.push(...e)
                            }
                            scanArgument(e) {
                                let t, r, n;
                                if (e) {
                                    if (this.consumeSpaces(),
                                    "[" !== this.future().text)
                                        return null;
                                    t = this.popToken(),
                                    ({tokens: n, end: r} = this.consumeArg(["]"]))
                                } else
                                    ({tokens: n, start: t, end: r} = this.consumeArg());
                                return this.pushToken(new Mr("EOF",r.loc)),
                                this.pushTokens(n),
                                t.range(r, "")
                            }
                            consumeSpaces() {
                                for (; " " === this.future().text; )
                                    this.stack.pop()
                            }
                            consumeArg(e) {
                                const t = []
                                  , r = e && e.length > 0;
                                r || this.consumeSpaces();
                                const o = this.future();
                                let s, i = 0, a = 0;
                                do {
                                    if (s = this.popToken(),
                                    t.push(s),
                                    "{" === s.text)
                                        ++i;
                                    else if ("}" === s.text) {
                                        if (--i,
                                        -1 === i)
                                            throw new n("Extra }",s)
                                    } else if ("EOF" === s.text)
                                        throw new n("Unexpected end of input in a macro argument, expected '" + (e && r ? e[a] : "}") + "'",s);
                                    if (e && r)
                                        if ((0 === i || 1 === i && "{" === e[a]) && s.text === e[a]) {
                                            if (++a,
                                            a === e.length) {
                                                t.splice(-a, a);
                                                break
                                            }
                                        } else
                                            a = 0
                                } while (0 !== i || r);
                                return "{" === o.text && "}" === t[t.length - 1].text && (t.pop(),
                                t.shift()),
                                t.reverse(),
                                {
                                    tokens: t,
                                    start: o,
                                    end: s
                                }
                            }
                            consumeArgs(e, t) {
                                if (t) {
                                    if (t.length !== e + 1)
                                        throw new n("The length of delimiters doesn't match the number of args!");
                                    const r = t[0];
                                    for (let e = 0; e < r.length; e++) {
                                        const t = this.popToken();
                                        if (r[e] !== t.text)
                                            throw new n("Use of the macro doesn't match its definition",t)
                                    }
                                }
                                const r = [];
                                for (let n = 0; n < e; n++)
                                    r.push(this.consumeArg(t && t[n + 1]).tokens);
                                return r
                            }
                            countExpansion(e) {
                                if (this.expansionCount += e,
                                this.expansionCount > this.settings.maxExpand)
                                    throw new n("Too many expansions: infinite loop or need to increase maxExpand setting")
                            }
                            expandOnce(e) {
                                const t = this.popToken()
                                  , r = t.text
                                  , o = t.noexpand ? null : this._getExpansion(r);
                                if (null == o || e && o.unexpandable) {
                                    if (e && null == o && "\\" === r[0] && !this.isDefined(r))
                                        throw new n("Undefined control sequence: " + r);
                                    return this.pushToken(t),
                                    !1
                                }
                                this.countExpansion(1);
                                let s = o.tokens;
                                const i = this.consumeArgs(o.numArgs, o.delimiters);
                                if (o.numArgs) {
                                    s = s.slice();
                                    for (let e = s.length - 1; e >= 0; --e) {
                                        let t = s[e];
                                        if ("#" === t.text) {
                                            if (0 === e)
                                                throw new n("Incomplete placeholder at end of macro body",t);
                                            if (t = s[--e],
                                            "#" === t.text)
                                                s.splice(e + 1, 1);
                                            else {
                                                if (!/^[1-9]$/.test(t.text))
                                                    throw new n("Not a valid argument number",t);
                                                s.splice(e, 2, ...i[+t.text - 1])
                                            }
                                        }
                                    }
                                }
                                return this.pushTokens(s),
                                s.length
                            }
                            expandAfterFuture() {
                                return this.expandOnce(),
                                this.future()
                            }
                            expandNextToken() {
                                for (; ; )
                                    if (!1 === this.expandOnce()) {
                                        const e = this.stack.pop();
                                        return e.treatAsRelax && (e.text = "\\relax"),
                                        e
                                    }
                                throw new Error
                            }
                            expandMacro(e) {
                                return this.macros.has(e) ? this.expandTokens([new Mr(e)]) : void 0
                            }
                            expandTokens(e) {
                                const t = []
                                  , r = this.stack.length;
                                for (this.pushTokens(e); this.stack.length > r; )
                                    if (!1 === this.expandOnce(!0)) {
                                        const e = this.stack.pop();
                                        e.treatAsRelax && (e.noexpand = !1,
                                        e.treatAsRelax = !1),
                                        t.push(e)
                                    }
                                return this.countExpansion(t.length),
                                t
                            }
                            expandMacroAsText(e) {
                                const t = this.expandMacro(e);
                                return t ? t.map((e => e.text)).join("") : t
                            }
                            _getExpansion(e) {
                                const t = this.macros.get(e);
                                if (null == t)
                                    return t;
                                if (1 === e.length) {
                                    const t = this.lexer.catcodes[e];
                                    if (null != t && 13 !== t)
                                        return
                                }
                                const r = "function" == typeof t ? t(this) : t;
                                if ("string" == typeof r) {
                                    let e = 0;
                                    if (-1 !== r.indexOf("#")) {
                                        const t = r.replace(/##/g, "");
                                        for (; -1 !== t.indexOf("#" + (e + 1)); )
                                            ++e
                                    }
                                    const t = new yn(r,this.settings)
                                      , n = [];
                                    let o = t.lex();
                                    for (; "EOF" !== o.text; )
                                        n.push(o),
                                        o = t.lex();
                                    return n.reverse(),
                                    {
                                        tokens: n,
                                        numArgs: e
                                    }
                                }
                                return r
                            }
                            isDefined(e) {
                                return this.macros.has(e) || pn.hasOwnProperty(e) || ne.math.hasOwnProperty(e) || ne.text.hasOwnProperty(e) || Tn.hasOwnProperty(e)
                            }
                            isExpandable(e) {
                                const t = this.macros.get(e);
                                return null != t ? "string" == typeof t || "function" == typeof t || !t.unexpandable : pn.hasOwnProperty(e) && !pn[e].primitive
                            }
                        }
                        const Cn = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/
                          , Nn = Object.freeze({
                            "₊": "+",
                            "₋": "-",
                            "₌": "=",
                            "₍": "(",
                            "₎": ")",
                            "₀": "0",
                            "₁": "1",
                            "₂": "2",
                            "₃": "3",
                            "₄": "4",
                            "₅": "5",
                            "₆": "6",
                            "₇": "7",
                            "₈": "8",
                            "₉": "9",
                            "ₐ": "a",
                            "ₑ": "e",
                            "ₕ": "h",
                            "ᵢ": "i",
                            "ⱼ": "j",
                            "ₖ": "k",
                            "ₗ": "l",
                            "ₘ": "m",
                            "ₙ": "n",
                            "ₒ": "o",
                            "ₚ": "p",
                            "ᵣ": "r",
                            "ₛ": "s",
                            "ₜ": "t",
                            "ᵤ": "u",
                            "ᵥ": "v",
                            "ₓ": "x",
                            "ᵦ": "β",
                            "ᵧ": "γ",
                            "ᵨ": "ρ",
                            "ᵩ": "ϕ",
                            "ᵪ": "χ",
                            "⁺": "+",
                            "⁻": "-",
                            "⁼": "=",
                            "⁽": "(",
                            "⁾": ")",
                            "⁰": "0",
                            "¹": "1",
                            "²": "2",
                            "³": "3",
                            "⁴": "4",
                            "⁵": "5",
                            "⁶": "6",
                            "⁷": "7",
                            "⁸": "8",
                            "⁹": "9",
                            "ᴬ": "A",
                            "ᴮ": "B",
                            "ᴰ": "D",
                            "ᴱ": "E",
                            "ᴳ": "G",
                            "ᴴ": "H",
                            "ᴵ": "I",
                            "ᴶ": "J",
                            "ᴷ": "K",
                            "ᴸ": "L",
                            "ᴹ": "M",
                            "ᴺ": "N",
                            "ᴼ": "O",
                            "ᴾ": "P",
                            "ᴿ": "R",
                            "ᵀ": "T",
                            "ᵁ": "U",
                            "ⱽ": "V",
                            "ᵂ": "W",
                            "ᵃ": "a",
                            "ᵇ": "b",
                            "ᶜ": "c",
                            "ᵈ": "d",
                            "ᵉ": "e",
                            "ᶠ": "f",
                            "ᵍ": "g",
                            "ʰ": "h",
                            "ⁱ": "i",
                            "ʲ": "j",
                            "ᵏ": "k",
                            "ˡ": "l",
                            "ᵐ": "m",
                            "ⁿ": "n",
                            "ᵒ": "o",
                            "ᵖ": "p",
                            "ʳ": "r",
                            "ˢ": "s",
                            "ᵗ": "t",
                            "ᵘ": "u",
                            "ᵛ": "v",
                            "ʷ": "w",
                            "ˣ": "x",
                            "ʸ": "y",
                            "ᶻ": "z",
                            "ᵝ": "β",
                            "ᵞ": "γ",
                            "ᵟ": "δ",
                            "ᵠ": "ϕ",
                            "ᵡ": "χ",
                            "ᶿ": "θ"
                        })
                          , qn = {
                            "́": {
                                text: "\\'",
                                math: "\\acute"
                            },
                            "̀": {
                                text: "\\`",
                                math: "\\grave"
                            },
                            "̈": {
                                text: '\\"',
                                math: "\\ddot"
                            },
                            "̃": {
                                text: "\\~",
                                math: "\\tilde"
                            },
                            "̄": {
                                text: "\\=",
                                math: "\\bar"
                            },
                            "̆": {
                                text: "\\u",
                                math: "\\breve"
                            },
                            "̌": {
                                text: "\\v",
                                math: "\\check"
                            },
                            "̂": {
                                text: "\\^",
                                math: "\\hat"
                            },
                            "̇": {
                                text: "\\.",
                                math: "\\dot"
                            },
                            "̊": {
                                text: "\\r",
                                math: "\\mathring"
                            },
                            "̋": {
                                text: "\\H"
                            },
                            "̧": {
                                text: "\\c"
                            }
                        }
                          , In = {
                            "á": "á",
                            "à": "à",
                            "ä": "ä",
                            "ǟ": "ǟ",
                            "ã": "ã",
                            "ā": "ā",
                            "ă": "ă",
                            "ắ": "ắ",
                            "ằ": "ằ",
                            "ẵ": "ẵ",
                            "ǎ": "ǎ",
                            "â": "â",
                            "ấ": "ấ",
                            "ầ": "ầ",
                            "ẫ": "ẫ",
                            "ȧ": "ȧ",
                            "ǡ": "ǡ",
                            "å": "å",
                            "ǻ": "ǻ",
                            "ḃ": "ḃ",
                            "ć": "ć",
                            "ḉ": "ḉ",
                            "č": "č",
                            "ĉ": "ĉ",
                            "ċ": "ċ",
                            "ç": "ç",
                            "ď": "ď",
                            "ḋ": "ḋ",
                            "ḑ": "ḑ",
                            "é": "é",
                            "è": "è",
                            "ë": "ë",
                            "ẽ": "ẽ",
                            "ē": "ē",
                            "ḗ": "ḗ",
                            "ḕ": "ḕ",
                            "ĕ": "ĕ",
                            "ḝ": "ḝ",
                            "ě": "ě",
                            "ê": "ê",
                            "ế": "ế",
                            "ề": "ề",
                            "ễ": "ễ",
                            "ė": "ė",
                            "ȩ": "ȩ",
                            "ḟ": "ḟ",
                            "ǵ": "ǵ",
                            "ḡ": "ḡ",
                            "ğ": "ğ",
                            "ǧ": "ǧ",
                            "ĝ": "ĝ",
                            "ġ": "ġ",
                            "ģ": "ģ",
                            "ḧ": "ḧ",
                            "ȟ": "ȟ",
                            "ĥ": "ĥ",
                            "ḣ": "ḣ",
                            "ḩ": "ḩ",
                            "í": "í",
                            "ì": "ì",
                            "ï": "ï",
                            "ḯ": "ḯ",
                            "ĩ": "ĩ",
                            "ī": "ī",
                            "ĭ": "ĭ",
                            "ǐ": "ǐ",
                            "î": "î",
                            "ǰ": "ǰ",
                            "ĵ": "ĵ",
                            "ḱ": "ḱ",
                            "ǩ": "ǩ",
                            "ķ": "ķ",
                            "ĺ": "ĺ",
                            "ľ": "ľ",
                            "ļ": "ļ",
                            "ḿ": "ḿ",
                            "ṁ": "ṁ",
                            "ń": "ń",
                            "ǹ": "ǹ",
                            "ñ": "ñ",
                            "ň": "ň",
                            "ṅ": "ṅ",
                            "ņ": "ņ",
                            "ó": "ó",
                            "ò": "ò",
                            "ö": "ö",
                            "ȫ": "ȫ",
                            "õ": "õ",
                            "ṍ": "ṍ",
                            "ṏ": "ṏ",
                            "ȭ": "ȭ",
                            "ō": "ō",
                            "ṓ": "ṓ",
                            "ṑ": "ṑ",
                            "ŏ": "ŏ",
                            "ǒ": "ǒ",
                            "ô": "ô",
                            "ố": "ố",
                            "ồ": "ồ",
                            "ỗ": "ỗ",
                            "ȯ": "ȯ",
                            "ȱ": "ȱ",
                            "ő": "ő",
                            "ṕ": "ṕ",
                            "ṗ": "ṗ",
                            "ŕ": "ŕ",
                            "ř": "ř",
                            "ṙ": "ṙ",
                            "ŗ": "ŗ",
                            "ś": "ś",
                            "ṥ": "ṥ",
                            "š": "š",
                            "ṧ": "ṧ",
                            "ŝ": "ŝ",
                            "ṡ": "ṡ",
                            "ş": "ş",
                            "ẗ": "ẗ",
                            "ť": "ť",
                            "ṫ": "ṫ",
                            "ţ": "ţ",
                            "ú": "ú",
                            "ù": "ù",
                            "ü": "ü",
                            "ǘ": "ǘ",
                            "ǜ": "ǜ",
                            "ǖ": "ǖ",
                            "ǚ": "ǚ",
                            "ũ": "ũ",
                            "ṹ": "ṹ",
                            "ū": "ū",
                            "ṻ": "ṻ",
                            "ŭ": "ŭ",
                            "ǔ": "ǔ",
                            "û": "û",
                            "ů": "ů",
                            "ű": "ű",
                            "ṽ": "ṽ",
                            "ẃ": "ẃ",
                            "ẁ": "ẁ",
                            "ẅ": "ẅ",
                            "ŵ": "ŵ",
                            "ẇ": "ẇ",
                            "ẘ": "ẘ",
                            "ẍ": "ẍ",
                            "ẋ": "ẋ",
                            "ý": "ý",
                            "ỳ": "ỳ",
                            "ÿ": "ÿ",
                            "ỹ": "ỹ",
                            "ȳ": "ȳ",
                            "ŷ": "ŷ",
                            "ẏ": "ẏ",
                            "ẙ": "ẙ",
                            "ź": "ź",
                            "ž": "ž",
                            "ẑ": "ẑ",
                            "ż": "ż",
                            "Á": "Á",
                            "À": "À",
                            "Ä": "Ä",
                            "Ǟ": "Ǟ",
                            "Ã": "Ã",
                            "Ā": "Ā",
                            "Ă": "Ă",
                            "Ắ": "Ắ",
                            "Ằ": "Ằ",
                            "Ẵ": "Ẵ",
                            "Ǎ": "Ǎ",
                            "Â": "Â",
                            "Ấ": "Ấ",
                            "Ầ": "Ầ",
                            "Ẫ": "Ẫ",
                            "Ȧ": "Ȧ",
                            "Ǡ": "Ǡ",
                            "Å": "Å",
                            "Ǻ": "Ǻ",
                            "Ḃ": "Ḃ",
                            "Ć": "Ć",
                            "Ḉ": "Ḉ",
                            "Č": "Č",
                            "Ĉ": "Ĉ",
                            "Ċ": "Ċ",
                            "Ç": "Ç",
                            "Ď": "Ď",
                            "Ḋ": "Ḋ",
                            "Ḑ": "Ḑ",
                            "É": "É",
                            "È": "È",
                            "Ë": "Ë",
                            "Ẽ": "Ẽ",
                            "Ē": "Ē",
                            "Ḗ": "Ḗ",
                            "Ḕ": "Ḕ",
                            "Ĕ": "Ĕ",
                            "Ḝ": "Ḝ",
                            "Ě": "Ě",
                            "Ê": "Ê",
                            "Ế": "Ế",
                            "Ề": "Ề",
                            "Ễ": "Ễ",
                            "Ė": "Ė",
                            "Ȩ": "Ȩ",
                            "Ḟ": "Ḟ",
                            "Ǵ": "Ǵ",
                            "Ḡ": "Ḡ",
                            "Ğ": "Ğ",
                            "Ǧ": "Ǧ",
                            "Ĝ": "Ĝ",
                            "Ġ": "Ġ",
                            "Ģ": "Ģ",
                            "Ḧ": "Ḧ",
                            "Ȟ": "Ȟ",
                            "Ĥ": "Ĥ",
                            "Ḣ": "Ḣ",
                            "Ḩ": "Ḩ",
                            "Í": "Í",
                            "Ì": "Ì",
                            "Ï": "Ï",
                            "Ḯ": "Ḯ",
                            "Ĩ": "Ĩ",
                            "Ī": "Ī",
                            "Ĭ": "Ĭ",
                            "Ǐ": "Ǐ",
                            "Î": "Î",
                            "İ": "İ",
                            "Ĵ": "Ĵ",
                            "Ḱ": "Ḱ",
                            "Ǩ": "Ǩ",
                            "Ķ": "Ķ",
                            "Ĺ": "Ĺ",
                            "Ľ": "Ľ",
                            "Ļ": "Ļ",
                            "Ḿ": "Ḿ",
                            "Ṁ": "Ṁ",
                            "Ń": "Ń",
                            "Ǹ": "Ǹ",
                            "Ñ": "Ñ",
                            "Ň": "Ň",
                            "Ṅ": "Ṅ",
                            "Ņ": "Ņ",
                            "Ó": "Ó",
                            "Ò": "Ò",
                            "Ö": "Ö",
                            "Ȫ": "Ȫ",
                            "Õ": "Õ",
                            "Ṍ": "Ṍ",
                            "Ṏ": "Ṏ",
                            "Ȭ": "Ȭ",
                            "Ō": "Ō",
                            "Ṓ": "Ṓ",
                            "Ṑ": "Ṑ",
                            "Ŏ": "Ŏ",
                            "Ǒ": "Ǒ",
                            "Ô": "Ô",
                            "Ố": "Ố",
                            "Ồ": "Ồ",
                            "Ỗ": "Ỗ",
                            "Ȯ": "Ȯ",
                            "Ȱ": "Ȱ",
                            "Ő": "Ő",
                            "Ṕ": "Ṕ",
                            "Ṗ": "Ṗ",
                            "Ŕ": "Ŕ",
                            "Ř": "Ř",
                            "Ṙ": "Ṙ",
                            "Ŗ": "Ŗ",
                            "Ś": "Ś",
                            "Ṥ": "Ṥ",
                            "Š": "Š",
                            "Ṧ": "Ṧ",
                            "Ŝ": "Ŝ",
                            "Ṡ": "Ṡ",
                            "Ş": "Ş",
                            "Ť": "Ť",
                            "Ṫ": "Ṫ",
                            "Ţ": "Ţ",
                            "Ú": "Ú",
                            "Ù": "Ù",
                            "Ü": "Ü",
                            "Ǘ": "Ǘ",
                            "Ǜ": "Ǜ",
                            "Ǖ": "Ǖ",
                            "Ǚ": "Ǚ",
                            "Ũ": "Ũ",
                            "Ṹ": "Ṹ",
                            "Ū": "Ū",
                            "Ṻ": "Ṻ",
                            "Ŭ": "Ŭ",
                            "Ǔ": "Ǔ",
                            "Û": "Û",
                            "Ů": "Ů",
                            "Ű": "Ű",
                            "Ṽ": "Ṽ",
                            "Ẃ": "Ẃ",
                            "Ẁ": "Ẁ",
                            "Ẅ": "Ẅ",
                            "Ŵ": "Ŵ",
                            "Ẇ": "Ẇ",
                            "Ẍ": "Ẍ",
                            "Ẋ": "Ẋ",
                            "Ý": "Ý",
                            "Ỳ": "Ỳ",
                            "Ÿ": "Ÿ",
                            "Ỹ": "Ỹ",
                            "Ȳ": "Ȳ",
                            "Ŷ": "Ŷ",
                            "Ẏ": "Ẏ",
                            "Ź": "Ź",
                            "Ž": "Ž",
                            "Ẑ": "Ẑ",
                            "Ż": "Ż",
                            "ά": "ά",
                            "ὰ": "ὰ",
                            "ᾱ": "ᾱ",
                            "ᾰ": "ᾰ",
                            "έ": "έ",
                            "ὲ": "ὲ",
                            "ή": "ή",
                            "ὴ": "ὴ",
                            "ί": "ί",
                            "ὶ": "ὶ",
                            "ϊ": "ϊ",
                            "ΐ": "ΐ",
                            "ῒ": "ῒ",
                            "ῑ": "ῑ",
                            "ῐ": "ῐ",
                            "ό": "ό",
                            "ὸ": "ὸ",
                            "ύ": "ύ",
                            "ὺ": "ὺ",
                            "ϋ": "ϋ",
                            "ΰ": "ΰ",
                            "ῢ": "ῢ",
                            "ῡ": "ῡ",
                            "ῠ": "ῠ",
                            "ώ": "ώ",
                            "ὼ": "ὼ",
                            "Ύ": "Ύ",
                            "Ὺ": "Ὺ",
                            "Ϋ": "Ϋ",
                            "Ῡ": "Ῡ",
                            "Ῠ": "Ῠ",
                            "Ώ": "Ώ",
                            "Ὼ": "Ὼ"
                        };
                        class Rn {
                            constructor(e, t) {
                                this.mode = void 0,
                                this.gullet = void 0,
                                this.settings = void 0,
                                this.leftrightDepth = void 0,
                                this.nextToken = void 0,
                                this.mode = "math",
                                this.gullet = new Bn(e,t,this.mode),
                                this.settings = t,
                                this.leftrightDepth = 0
                            }
                            expect(e, t) {
                                if (void 0 === t && (t = !0),
                                this.fetch().text !== e)
                                    throw new n("Expected '" + e + "', got '" + this.fetch().text + "'",this.fetch());
                                t && this.consume()
                            }
                            consume() {
                                this.nextToken = null
                            }
                            fetch() {
                                return null == this.nextToken && (this.nextToken = this.gullet.expandNextToken()),
                                this.nextToken
                            }
                            switchMode(e) {
                                this.mode = e,
                                this.gullet.switchMode(e)
                            }
                            parse() {
                                this.settings.globalGroup || this.gullet.beginGroup(),
                                this.settings.colorIsTextColor && this.gullet.macros.set("\\color", "\\textcolor");
                                try {
                                    const e = this.parseExpression(!1);
                                    return this.expect("EOF"),
                                    this.settings.globalGroup || this.gullet.endGroup(),
                                    e
                                } finally {
                                    this.gullet.endGroups()
                                }
                            }
                            subparse(e) {
                                const t = this.nextToken;
                                this.consume(),
                                this.gullet.pushToken(new Mr("}")),
                                this.gullet.pushTokens(e);
                                const r = this.parseExpression(!1);
                                return this.expect("}"),
                                this.nextToken = t,
                                r
                            }
                            parseExpression(e, t) {
                                const r = [];
                                for (; ; ) {
                                    "math" === this.mode && this.consumeSpaces();
                                    const n = this.fetch();
                                    if (-1 !== Rn.endOfExpression.indexOf(n.text))
                                        break;
                                    if (t && n.text === t)
                                        break;
                                    if (e && pn[n.text] && pn[n.text].infix)
                                        break;
                                    const o = this.parseAtom(t);
                                    if (!o)
                                        break;
                                    "internal" !== o.type && r.push(o)
                                }
                                return "text" === this.mode && this.formLigatures(r),
                                this.handleInfixNodes(r)
                            }
                            handleInfixNodes(e) {
                                let t, r = -1;
                                for (let o = 0; o < e.length; o++)
                                    if ("infix" === e[o].type) {
                                        if (-1 !== r)
                                            throw new n("only one infix operator per group",e[o].token);
                                        r = o,
                                        t = e[o].replaceWith
                                    }
                                if (-1 !== r && t) {
                                    let n, o;
                                    const s = e.slice(0, r)
                                      , i = e.slice(r + 1);
                                    let a;
                                    return n = 1 === s.length && "ordgroup" === s[0].type ? s[0] : {
                                        type: "ordgroup",
                                        mode: this.mode,
                                        body: s
                                    },
                                    o = 1 === i.length && "ordgroup" === i[0].type ? i[0] : {
                                        type: "ordgroup",
                                        mode: this.mode,
                                        body: i
                                    },
                                    a = "\\\\abovefrac" === t ? this.callFunction(t, [n, e[r], o], []) : this.callFunction(t, [n, o], []),
                                    [a]
                                }
                                return e
                            }
                            handleSupSubscript(e) {
                                const t = this.fetch()
                                  , r = t.text;
                                this.consume(),
                                this.consumeSpaces();
                                const o = this.parseGroup(e);
                                if (!o)
                                    throw new n("Expected group after '" + r + "'",t);
                                return o
                            }
                            formatUnsupportedCmd(e) {
                                const t = [];
                                for (let r = 0; r < e.length; r++)
                                    t.push({
                                        type: "textord",
                                        mode: "text",
                                        text: e[r]
                                    });
                                const r = {
                                    type: "text",
                                    mode: this.mode,
                                    body: t
                                };
                                return {
                                    type: "color",
                                    mode: this.mode,
                                    color: this.settings.errorColor,
                                    body: [r]
                                }
                            }
                            parseAtom(e) {
                                const t = this.parseGroup("atom", e);
                                if ("text" === this.mode)
                                    return t;
                                let r, o;
                                for (; ; ) {
                                    this.consumeSpaces();
                                    const e = this.fetch();
                                    if ("\\limits" === e.text || "\\nolimits" === e.text) {
                                        if (t && "op" === t.type) {
                                            const r = "\\limits" === e.text;
                                            t.limits = r,
                                            t.alwaysHandleSupSub = !0
                                        } else {
                                            if (!t || "operatorname" !== t.type)
                                                throw new n("Limit controls must follow a math operator",e);
                                            t.alwaysHandleSupSub && (t.limits = "\\limits" === e.text)
                                        }
                                        this.consume()
                                    } else if ("^" === e.text) {
                                        if (r)
                                            throw new n("Double superscript",e);
                                        r = this.handleSupSubscript("superscript")
                                    } else if ("_" === e.text) {
                                        if (o)
                                            throw new n("Double subscript",e);
                                        o = this.handleSupSubscript("subscript")
                                    } else if ("'" === e.text) {
                                        if (r)
                                            throw new n("Double superscript",e);
                                        const t = {
                                            type: "textord",
                                            mode: this.mode,
                                            text: "\\prime"
                                        }
                                          , o = [t];
                                        for (this.consume(); "'" === this.fetch().text; )
                                            o.push(t),
                                            this.consume();
                                        "^" === this.fetch().text && o.push(this.handleSupSubscript("superscript")),
                                        r = {
                                            type: "ordgroup",
                                            mode: this.mode,
                                            body: o
                                        }
                                    } else {
                                        if (!Nn[e.text])
                                            break;
                                        {
                                            const t = Cn.test(e.text)
                                              , n = [];
                                            for (n.push(new Mr(Nn[e.text])),
                                            this.consume(); ; ) {
                                                const e = this.fetch().text;
                                                if (!Nn[e])
                                                    break;
                                                if (Cn.test(e) !== t)
                                                    break;
                                                n.unshift(new Mr(Nn[e])),
                                                this.consume()
                                            }
                                            const s = this.subparse(n);
                                            t ? o = {
                                                type: "ordgroup",
                                                mode: "math",
                                                body: s
                                            } : r = {
                                                type: "ordgroup",
                                                mode: "math",
                                                body: s
                                            }
                                        }
                                    }
                                }
                                return r || o ? {
                                    type: "supsub",
                                    mode: this.mode,
                                    base: t,
                                    sup: r,
                                    sub: o
                                } : t
                            }
                            parseFunction(e, t) {
                                const r = this.fetch()
                                  , o = r.text
                                  , s = pn[o];
                                if (!s)
                                    return null;
                                if (this.consume(),
                                t && "atom" !== t && !s.allowedInArgument)
                                    throw new n("Got function '" + o + "' with no arguments" + (t ? " as " + t : ""),r);
                                if ("text" === this.mode && !s.allowedInText)
                                    throw new n("Can't use function '" + o + "' in text mode",r);
                                if ("math" === this.mode && !1 === s.allowedInMath)
                                    throw new n("Can't use function '" + o + "' in math mode",r);
                                const {args: i, optArgs: a} = this.parseArguments(o, s);
                                return this.callFunction(o, i, a, r, e)
                            }
                            callFunction(e, t, r, o, s) {
                                const i = {
                                    funcName: e,
                                    parser: this,
                                    token: o,
                                    breakOnTokenText: s
                                }
                                  , a = pn[e];
                                if (a && a.handler)
                                    return a.handler(i, t, r);
                                throw new n("No function handler for " + e)
                            }
                            parseArguments(e, t) {
                                const r = t.numArgs + t.numOptionalArgs;
                                if (0 === r)
                                    return {
                                        args: [],
                                        optArgs: []
                                    };
                                const o = []
                                  , s = [];
                                for (let i = 0; i < r; i++) {
                                    let r = t.argTypes && t.argTypes[i];
                                    const a = i < t.numOptionalArgs;
                                    (t.primitive && null == r || "sqrt" === t.type && 1 === i && null == s[0]) && (r = "primitive");
                                    const l = this.parseGroupOfType("argument to '" + e + "'", r, a);
                                    if (a)
                                        s.push(l);
                                    else {
                                        if (null == l)
                                            throw new n("Null argument, please report this as a bug");
                                        o.push(l)
                                    }
                                }
                                return {
                                    args: o,
                                    optArgs: s
                                }
                            }
                            parseGroupOfType(e, t, r) {
                                switch (t) {
                                case "color":
                                    return this.parseColorGroup(r);
                                case "size":
                                    return this.parseSizeGroup(r);
                                case "url":
                                    return this.parseUrlGroup(r);
                                case "math":
                                case "text":
                                    return this.parseArgumentGroup(r, t);
                                case "hbox":
                                    {
                                        const e = this.parseArgumentGroup(r, "text");
                                        return null != e ? {
                                            type: "styling",
                                            mode: e.mode,
                                            body: [e],
                                            style: "text"
                                        } : null
                                    }
                                case "raw":
                                    {
                                        const e = this.parseStringGroup("raw", r);
                                        return null != e ? {
                                            type: "raw",
                                            mode: "text",
                                            string: e.text
                                        } : null
                                    }
                                case "primitive":
                                    {
                                        if (r)
                                            throw new n("A primitive argument cannot be optional");
                                        const t = this.parseGroup(e);
                                        if (null == t)
                                            throw new n("Expected group as " + e,this.fetch());
                                        return t
                                    }
                                case "original":
                                case null:
                                case void 0:
                                    return this.parseArgumentGroup(r);
                                default:
                                    throw new n("Unknown group type as " + e,this.fetch())
                                }
                            }
                            consumeSpaces() {
                                for (; " " === this.fetch().text; )
                                    this.consume()
                            }
                            parseStringGroup(e, t) {
                                const r = this.gullet.scanArgument(t);
                                if (null == r)
                                    return null;
                                let n, o = "";
                                for (; "EOF" !== (n = this.fetch()).text; )
                                    o += n.text,
                                    this.consume();
                                return this.consume(),
                                r.text = o,
                                r
                            }
                            parseRegexGroup(e, t) {
                                const r = this.fetch();
                                let o, s = r, i = "";
                                for (; "EOF" !== (o = this.fetch()).text && e.test(i + o.text); )
                                    s = o,
                                    i += s.text,
                                    this.consume();
                                if ("" === i)
                                    throw new n("Invalid " + t + ": '" + r.text + "'",r);
                                return r.range(s, i)
                            }
                            parseColorGroup(e) {
                                const t = this.parseStringGroup("color", e);
                                if (null == t)
                                    return null;
                                const r = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(t.text);
                                if (!r)
                                    throw new n("Invalid color: '" + t.text + "'",t);
                                let o = r[0];
                                return /^[0-9a-f]{6}$/i.test(o) && (o = "#" + o),
                                {
                                    type: "color-token",
                                    mode: this.mode,
                                    color: o
                                }
                            }
                            parseSizeGroup(e) {
                                let t, r = !1;
                                if (this.gullet.consumeSpaces(),
                                t = e || "{" === this.gullet.future().text ? this.parseStringGroup("size", e) : this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size"),
                                !t)
                                    return null;
                                e || 0 !== t.text.length || (t.text = "0pt",
                                r = !0);
                                const o = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t.text);
                                if (!o)
                                    throw new n("Invalid size: '" + t.text + "'",t);
                                const s = {
                                    number: +(o[1] + o[2]),
                                    unit: o[3]
                                };
                                if (!D(s))
                                    throw new n("Invalid unit: '" + s.unit + "'",t);
                                return {
                                    type: "size",
                                    mode: this.mode,
                                    value: s,
                                    isBlank: r
                                }
                            }
                            parseUrlGroup(e) {
                                this.gullet.lexer.setCatcode("%", 13),
                                this.gullet.lexer.setCatcode("~", 12);
                                const t = this.parseStringGroup("url", e);
                                if (this.gullet.lexer.setCatcode("%", 14),
                                this.gullet.lexer.setCatcode("~", 13),
                                null == t)
                                    return null;
                                const r = t.text.replace(/\\([#$%&~_^{}])/g, "$1");
                                return {
                                    type: "url",
                                    mode: this.mode,
                                    url: r
                                }
                            }
                            parseArgumentGroup(e, t) {
                                const r = this.gullet.scanArgument(e);
                                if (null == r)
                                    return null;
                                const n = this.mode;
                                t && this.switchMode(t),
                                this.gullet.beginGroup();
                                const o = this.parseExpression(!1, "EOF");
                                this.expect("EOF"),
                                this.gullet.endGroup();
                                const s = {
                                    type: "ordgroup",
                                    mode: this.mode,
                                    loc: r.loc,
                                    body: o
                                };
                                return t && this.switchMode(n),
                                s
                            }
                            parseGroup(e, t) {
                                const r = this.fetch()
                                  , o = r.text;
                                let s;
                                if ("{" === o || "\\begingroup" === o) {
                                    this.consume();
                                    const e = "{" === o ? "}" : "\\endgroup";
                                    this.gullet.beginGroup();
                                    const t = this.parseExpression(!1, e)
                                      , n = this.fetch();
                                    this.expect(e),
                                    this.gullet.endGroup(),
                                    s = {
                                        type: "ordgroup",
                                        mode: this.mode,
                                        loc: Sr.range(r, n),
                                        body: t,
                                        semisimple: "\\begingroup" === o || void 0
                                    }
                                } else if (s = this.parseFunction(t, e) || this.parseSymbol(),
                                null == s && "\\" === o[0] && !Tn.hasOwnProperty(o)) {
                                    if (this.settings.throwOnError)
                                        throw new n("Undefined control sequence: " + o,r);
                                    s = this.formatUnsupportedCmd(o),
                                    this.consume()
                                }
                                return s
                            }
                            formLigatures(e) {
                                let t = e.length - 1;
                                for (let r = 0; r < t; ++r) {
                                    const n = e[r]
                                      , o = n.text;
                                    "-" === o && "-" === e[r + 1].text && (r + 1 < t && "-" === e[r + 2].text ? (e.splice(r, 3, {
                                        type: "textord",
                                        mode: "text",
                                        loc: Sr.range(n, e[r + 2]),
                                        text: "---"
                                    }),
                                    t -= 2) : (e.splice(r, 2, {
                                        type: "textord",
                                        mode: "text",
                                        loc: Sr.range(n, e[r + 1]),
                                        text: "--"
                                    }),
                                    t -= 1)),
                                    "'" !== o && "`" !== o || e[r + 1].text !== o || (e.splice(r, 2, {
                                        type: "textord",
                                        mode: "text",
                                        loc: Sr.range(n, e[r + 1]),
                                        text: o + o
                                    }),
                                    t -= 1)
                                }
                            }
                            parseSymbol() {
                                const e = this.fetch();
                                let t = e.text;
                                if (/^\\verb[^a-zA-Z]/.test(t)) {
                                    this.consume();
                                    let e = t.slice(5);
                                    const r = "*" === e.charAt(0);
                                    if (r && (e = e.slice(1)),
                                    e.length < 2 || e.charAt(0) !== e.slice(-1))
                                        throw new n("\\verb assertion failed --\n                    please report what input caused this bug");
                                    return e = e.slice(1, -1),
                                    {
                                        type: "verb",
                                        mode: "text",
                                        body: e,
                                        star: r
                                    }
                                }
                                In.hasOwnProperty(t[0]) && !ne[this.mode][t[0]] && (this.settings.strict && "math" === this.mode && this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + t[0] + '" used in math mode', e),
                                t = In[t[0]] + t.slice(1));
                                const r = fn.exec(t);
                                let o;
                                if (r && (t = t.substring(0, r.index),
                                "i" === t ? t = "ı" : "j" === t && (t = "ȷ")),
                                ne[this.mode][t]) {
                                    this.settings.strict && "math" === this.mode && "ÐÞþ".indexOf(t) >= 0 && this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + t[0] + '" used in math mode', e);
                                    const r = ne[this.mode][t].group
                                      , n = Sr.range(e);
                                    let s;
                                    if (ee.hasOwnProperty(r)) {
                                        const e = r;
                                        s = {
                                            type: "atom",
                                            mode: this.mode,
                                            family: e,
                                            loc: n,
                                            text: t
                                        }
                                    } else
                                        s = {
                                            type: r,
                                            mode: this.mode,
                                            loc: n,
                                            text: t
                                        };
                                    o = s
                                } else {
                                    if (!(t.charCodeAt(0) >= 128))
                                        return null;
                                    this.settings.strict && (S(t.charCodeAt(0)) ? "math" === this.mode && this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + t[0] + '" used in math mode', e) : this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + t[0] + '" (' + t.charCodeAt(0) + ")", e)),
                                    o = {
                                        type: "textord",
                                        mode: "text",
                                        loc: Sr.range(e),
                                        text: t
                                    }
                                }
                                if (this.consume(),
                                r)
                                    for (let t = 0; t < r[0].length; t++) {
                                        const s = r[0][t];
                                        if (!qn[s])
                                            throw new n("Unknown accent ' " + s + "'",e);
                                        const i = qn[s][this.mode] || qn[s].text;
                                        if (!i)
                                            throw new n("Accent " + s + " unsupported in " + this.mode + " mode",e);
                                        o = {
                                            type: "accent",
                                            mode: this.mode,
                                            loc: Sr.range(e),
                                            label: i,
                                            isStretchy: !1,
                                            isShifty: !0,
                                            base: o
                                        }
                                    }
                                return o
                            }
                        }
                        Rn.endOfExpression = ["}", "\\endgroup", "\\end", "\\right", "&"];
                        var Hn = function(e, t) {
                            if (!("string" == typeof e || e instanceof String))
                                throw new TypeError("KaTeX can only parse string typed expression");
                            const r = new Rn(e,t);
                            delete r.gullet.macros.current["\\df@tag"];
                            let o = r.parse();
                            if (delete r.gullet.macros.current["\\current@color"],
                            delete r.gullet.macros.current["\\color"],
                            r.gullet.macros.get("\\df@tag")) {
                                if (!t.displayMode)
                                    throw new n("\\tag works only in display equations");
                                o = [{
                                    type: "tag",
                                    mode: "text",
                                    body: o,
                                    tag: r.subparse([new Mr("\\df@tag")])
                                }]
                            }
                            return o
                        };
                        let On = function(e, t, r) {
                            t.textContent = "";
                            const n = Ln(e, r).toNode();
                            t.appendChild(n)
                        };
                        "undefined" != typeof document && "CSS1Compat" !== document.compatMode && ("undefined" != typeof console && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."),
                        On = function() {
                            throw new n("KaTeX doesn't work in quirks mode.")
                        }
                        );
                        const En = function(e, t, r) {
                            if (r.throwOnError || !(e instanceof n))
                                throw e;
                            const o = Oe.makeSpan(["katex-error"], [new $(t)]);
                            return o.setAttribute("title", e.toString()),
                            o.setAttribute("style", "color:" + r.errorColor),
                            o
                        }
                          , Ln = function(e, t) {
                            const r = new m(t);
                            try {
                                return function(e, t, r) {
                                    const n = xt(r);
                                    let o;
                                    if ("mathml" === r.output)
                                        return yt(e, t, n, r.displayMode, !0);
                                    if ("html" === r.output) {
                                        const t = at(e, n);
                                        o = Oe.makeSpan(["katex"], [t])
                                    } else {
                                        const s = yt(e, t, n, r.displayMode, !1)
                                          , i = at(e, n);
                                        o = Oe.makeSpan(["katex"], [s, i])
                                    }
                                    return wt(o, r)
                                }(Hn(e, r), e, r)
                            } catch (t) {
                                return En(t, e, r)
                            }
                        };
                        var Dn = {
                            version: "0.16.10",
                            render: On,
                            renderToString: function(e, t) {
                                return Ln(e, t).toMarkup()
                            },
                            ParseError: n,
                            SETTINGS_SCHEMA: h,
                            __parse: function(e, t) {
                                const r = new m(t);
                                return Hn(e, r)
                            },
                            __renderToDomTree: Ln,
                            __renderToHTMLTree: function(e, t) {
                                const r = new m(t);
                                try {
                                    return function(e, t, r) {
                                        const n = at(e, xt(r))
                                          , o = Oe.makeSpan(["katex"], [n]);
                                        return wt(o, r)
                                    }(Hn(e, r), 0, r)
                                } catch (t) {
                                    return En(t, e, r)
                                }
                            },
                            __setFontMetrics: function(e, t) {
                                A[e] = t
                            },
                            __defineSymbol: oe,
                            __defineFunction: Ye,
                            __defineMacro: kr,
                            __domTree: {
                                Span: X,
                                Anchor: W,
                                SymbolNode: $,
                                SvgNode: Z,
                                PathNode: K,
                                LineNode: J
                            }
                        };
                        return t.default
                    }()
                }
                ,
                e.exports = t()
            }
        }
          , t = {};
        function r(n) {
            var o = t[n];
            if (void 0 !== o)
                return o.exports;
            var s = t[n] = {
                exports: {}
            };
            return e[n].call(s.exports, s, s.exports, r),
            s.exports
        }
        r.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return r.d(t, {
                a: t
            }),
            t
        }
        ,
        r.d = function(e, t) {
            for (var n in t)
                r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
                    enumerable: !0,
                    get: t[n]
                })
        }
        ,
        r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        r.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ;
        var n = {};
        return function() {
            "use strict";
            r.r(n),
            r.d(n, {
                katex: function() {
                    return t.a
                }
            });
            var e = r(527)
              , t = r.n(e);
            try {
                window.katex = t()
            } catch (e) {}
        }(),
        n
    }()
}
));
