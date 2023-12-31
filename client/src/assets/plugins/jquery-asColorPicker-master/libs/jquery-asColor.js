!(function (e, t, a, r) {
  'use strict'
  function n(e) {
    return 6 === e.length && e[0] === e[1] && e[2] === e[3] && e[4] === e[5]
      ? e[0] + e[2] + e[4]
      : e
  }
  function i(e) {
    return parseInt(e, 16)
  }
  function o(e) {
    return 'string' == typeof e && -1 != e.indexOf('%')
  }
  function f(e) {
    return parseInt(2.55 * e.slice(0, -1), 10)
  }
  function s(e) {
    return parseFloat(e.slice(0, -1) / 100, 10)
  }
  var u,
    l,
    h,
    d =
      ((l =
        '[\\s|\\(]+(' +
        (u = '(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)') +
        ')[,|\\s]+(' +
        u +
        ')[,|\\s]+(' +
        u +
        ')\\s*\\)'),
      (h = '[\\s|\\(]+(' + u + ')[,|\\s]+(' + u + ')[,|\\s]+(' + u + ')[,|\\s]+(' + u + ')\\s*\\)'),
      {
        RGB: {
          match: new RegExp('^rgb' + l + '$', 'i'),
          parse: function (e) {
            return {
              r: o(e[1]) ? f(e[1]) : parseInt(e[1], 10),
              g: o(e[2]) ? f(e[2]) : parseInt(e[2], 10),
              b: o(e[3]) ? f(e[3]) : parseInt(e[3], 10),
              a: 1
            }
          },
          to: function (e) {
            return 'rgb(' + e.r + ', ' + e.g + ', ' + e.b + ')'
          }
        },
        RGBA: {
          match: new RegExp('^rgba' + h + '$', 'i'),
          parse: function (e) {
            return {
              r: o(e[1]) ? f(e[1]) : parseInt(e[1], 10),
              g: o(e[2]) ? f(e[2]) : parseInt(e[2], 10),
              b: o(e[3]) ? f(e[3]) : parseInt(e[3], 10),
              a: parseFloat(e[4])
            }
          },
          to: function (e) {
            return 'rgba(' + e.r + ', ' + e.g + ', ' + e.b + ', ' + e.a + ')'
          }
        },
        HSL: {
          match: new RegExp('^hsl' + l + '$', 'i'),
          parse: function (e) {
            var t = {
              h: ((e[1] % 360) + 360) % 360,
              s: o(e[2]) ? s(e[2]) : parseFloat(e[2], 10),
              l: o(e[3]) ? s(e[3]) : parseFloat(e[3], 10),
              a: 1
            }
            return c.HSLToRGB(t)
          },
          to: function (e) {
            var t = c.RGBToHSL(e)
            return (
              'hsl(' +
              parseInt(t.h, 10) +
              ', ' +
              Math.round(100 * t.s) +
              '%, ' +
              Math.round(100 * t.l) +
              '%)'
            )
          }
        },
        HSLA: {
          match: new RegExp('^hsla' + h + '$', 'i'),
          parse: function (e) {
            var t = {
              h: ((e[1] % 360) + 360) % 360,
              s: o(e[2]) ? s(e[2]) : parseFloat(e[2], 10),
              l: o(e[3]) ? s(e[3]) : parseFloat(e[3], 10),
              a: parseFloat(e[4])
            }
            return c.HSLToRGB(t)
          },
          to: function (e) {
            var t = c.RGBToHSL(e)
            return (
              'hsla(' +
              parseInt(t.h, 10) +
              ', ' +
              Math.round(100 * t.s) +
              '%, ' +
              Math.round(100 * t.l) +
              '%, ' +
              e.a +
              ')'
            )
          }
        },
        HEX: {
          match: /^#([a-f0-9]{6}|[a-f0-9]{3})$/i,
          parse: function (e) {
            var t = e[1],
              a = c.HEXtoRGB(t)
            return { r: a.r, g: a.g, b: a.b, a: 1 }
          },
          to: function (e, t) {
            var r = [e.r.toString(16), e.g.toString(16), e.b.toString(16)]
            if (
              (a.each(r, function (e, t) {
                1 === t.length && (r[e] = '0' + t)
              }),
              (r = r.join('')),
              t)
            ) {
              if (t.options.hexUseName) {
                var i = c.hasNAME(e)
                if (i) return i
              }
              t.options.shortenHex && (r = n(r))
            }
            return '#' + r
          }
        },
        TRANSPARENT: {
          match: /^transparent$/i,
          parse: function () {
            return { r: 0, g: 0, b: 0, a: 0 }
          },
          to: function () {
            return 'transparent'
          }
        },
        NAME: {
          match: /^\w+$/i,
          parse: function (e) {
            var t = c.NAMEtoRGB(e[0])
            if (t) return { r: t.r, g: t.g, b: t.b, a: 1 }
          },
          to: function (e, t) {
            return c.RGBtoNAME(e, t ? t.options.nameDegradation : r)
          }
        }
      }),
    c = (a.asColor = function (e, t) {
      'object' == typeof e && void 0 === t && ((t = e), (e = r)),
        'string' == typeof t && (t = { format: t }),
        (this.options = a.extend(!0, {}, c.defaults, t)),
        (this.value = { r: 0, g: 0, b: 0, h: 0, s: 0, v: 0, a: 1 }),
        (this._format = !1),
        (this._matchFormat = 'HEX'),
        (this._valid = !0),
        this.init(e)
    })
  ;(c.prototype = {
    constructor: c,
    init: function (e) {
      this.format(this.options.format), this.fromString(e)
    },
    isValid: function () {
      return this._valid
    },
    val: function (e) {
      return void 0 === e ? this.toString() : (this.fromString(e), this)
    },
    alpha: function (e) {
      if (void 0 === e || isNaN(e)) return this.value.a
      ;(e = parseFloat(e)) > 1 ? (e = 1) : e < 0 && (e = 0), (this.value.a = e)
    },
    matchString: function (e) {
      return c.matchString(e)
    },
    fromString: function (e, t) {
      if ('string' == typeof e) {
        e = a.trim(e)
        var r,
          n = null
        this._valid = !1
        for (var i in d)
          if (null != (n = d[i].match.exec(e)) && (r = d[i].parse(n))) {
            this.set(r),
              'TRANSPARENT' === i && (i = 'HEX'),
              (this._matchFormat = i),
              !0 === t && this.format(i)
            break
          }
      } else 'object' == typeof e && this.set(e)
    },
    format: function (e) {
      if ('string' == typeof e && (e = e.toUpperCase()) && void 0 !== d[e])
        this._format = 'TRANSPARENT' !== e ? e : 'HEX'
      else {
        if (!1 !== e) return !1 === this._format ? this._matchFormat : this._format
        this._format = !1
      }
    },
    toRGBA: function () {
      return d.RGBA.to(this.value, this)
    },
    toRGB: function () {
      return d.RGB.to(this.value, this)
    },
    toHSLA: function () {
      return d.HSLA.to(this.value, this)
    },
    toHSL: function () {
      return d.HSL.to(this.value, this)
    },
    toHEX: function () {
      return d.HEX.to(this.value, this)
    },
    toNAME: function () {
      return d.NAME.to(this.value, this)
    },
    to: function (e) {
      return 'string' == typeof e && (e = e.toUpperCase()) && void 0 !== d[e]
        ? d[e].to(this.value, this)
        : this.toString()
    },
    toString: function () {
      var e,
        t = this.value
      if (!this._valid && 'string' == typeof (t = this.options.invalidValue)) return t
      if (0 === t.a && this.options.zeroAlphaAsTransparent) return d.TRANSPARENT.to(t, this)
      if (
        ((e = !1 === this._format ? this._matchFormat : this._format),
        this.options.reduceAlpha && 1 === t.a)
      )
        switch (e) {
          case 'RGBA':
            e = 'RGB'
            break
          case 'HSLA':
            e = 'HSL'
        }
      return (
        1 !== t.a &&
          'RGBA' !== e &&
          'HSLA' !== e &&
          this.options.alphaConvert &&
          ('string' == typeof this.options.alphaConvert && (e = this.options.alphaConvert),
          void 0 !== this.options.alphaConvert[e] && (e = this.options.alphaConvert[e])),
        d[e].to(t, this)
      )
    },
    get: function () {
      return this.value
    },
    set: function (e) {
      this._valid = !0
      var t,
        a,
        r = 0,
        n = 0
      for (var i in e)
        -1 !== 'hsv'.indexOf(i)
          ? (n++, (this.value[i] = e[i]))
          : -1 !== 'rgb'.indexOf(i)
          ? (r++, (this.value[i] = e[i]))
          : 'a' === i && (this.value.a = e.a)
      r > n
        ? ((t = c.RGBtoHSV(this.value)),
          (0 === this.value.r && 0 === this.value.g && 0 === this.value.b) || (this.value.h = t.h),
          (this.value.s = t.s),
          (this.value.v = t.v))
        : n > r &&
          ((a = c.HSVtoRGB(this.value)),
          (this.value.r = a.r),
          (this.value.g = a.g),
          (this.value.b = a.b))
    }
  }),
    (c.HSLToRGB = function (e) {
      var t,
        a,
        r,
        n = e.h / 360,
        i = e.s,
        o = e.l
      return (
        (t = 2 * o - (a = o <= 0.5 ? o * (i + 1) : o + i - o * i)),
        (r = {
          r: c.hueToRGB(t, a, n + 1 / 3),
          g: c.hueToRGB(t, a, n),
          b: c.hueToRGB(t, a, n - 1 / 3)
        }),
        void 0 !== e.a && (r.a = e.a),
        0 === e.l && (r.h = e.h),
        r
      )
    }),
    (c.hueToRGB = function (e, t, a) {
      var r
      return (
        a < 0 ? (a += 1) : a > 1 && (a -= 1),
        (r =
          6 * a < 1
            ? e + (t - e) * a * 6
            : 2 * a < 1
            ? t
            : 3 * a < 2
            ? e + (t - e) * (2 / 3 - a) * 6
            : e),
        Math.round(255 * r)
      )
    }),
    (c.RGBToHSL = function (e) {
      var t,
        a,
        r = e.r / 255,
        n = e.g / 255,
        i = e.b / 255,
        o = Math.min(r, n, i),
        f = Math.max(r, n, i),
        s = f - o,
        u = f + o,
        l = 0.5 * u
      return (
        (t =
          o === f
            ? 0
            : r === f
            ? (60 * (n - i)) / s + 360
            : n === f
            ? (60 * (i - r)) / s + 120
            : (60 * (r - n)) / s + 240),
        (a = 0 === s ? 0 : l <= 0.5 ? s / u : s / (2 - u)),
        { h: Math.round(t) % 360, s: a, l: l }
      )
    }),
    (c.RGBToHEX = function (e) {
      return d.HEX.to(e)
    }),
    (c.HSLToHEX = function (e) {
      var t = c.HSLToRGB(e)
      return d.HEX.to(t)
    }),
    (c.HSVtoHEX = function (e) {
      var t = c.HSVtoRGB(e)
      return d.HEX.to(t)
    }),
    (c.RGBtoHSV = function (e) {
      var t,
        a,
        r = e.r / 255,
        n = e.g / 255,
        i = e.b / 255,
        o = Math.max(r, n, i),
        f = Math.min(r, n, i),
        s = o,
        u = o - f
      if (((a = 0 === o ? 0 : u / o), o === f)) t = 0
      else {
        switch (o) {
          case r:
            t = (n - i) / u + (n < i ? 6 : 0)
            break
          case n:
            t = (i - r) / u + 2
            break
          case i:
            t = (r - n) / u + 4
        }
        t /= 6
      }
      return { h: Math.round(360 * t), s: a, v: s }
    }),
    (c.HSVtoRGB = function (e) {
      var t,
        a,
        r,
        n = (e.h % 360) / 60,
        i = e.s,
        o = e.v,
        f = o * i,
        s = f * (1 - Math.abs((n % 2) - 1))
      return (
        (t = a = r = o - f),
        (t += [f, s, 0, 0, s, f][(n = ~~n)]),
        (a += [s, f, f, s, 0, 0][n]),
        (r += [0, 0, s, f, f, s][n]),
        { r: Math.round(255 * t), g: Math.round(255 * a), b: Math.round(255 * r) }
      )
    }),
    (c.HEXtoRGB = function (e) {
      var t
      return (
        0 === e.indexOf('#') && (e = e.substr(1)),
        3 === e.length &&
          (e = (t = e)
            ? (3 === t.length && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]),
              6 === t.length ? t : null)
            : null),
        { r: i(e.substr(0, 2)), g: i(e.substr(2, 2)), b: i(e.substr(4, 2)) }
      )
    }),
    (c.isNAME = function (e) {
      return !!c.names.hasOwnProperty(e)
    }),
    (c.NAMEtoHEX = function (e) {
      if (c.names.hasOwnProperty(e)) return '#' + c.names[e]
    }),
    (c.NAMEtoRGB = function (e) {
      var t = c.NAMEtoHEX(e)
      if (t) return c.HEXtoRGB(t)
    }),
    (c.hasNAME = function (e) {
      var t = c.RGBToHEX(e)
      return (
        0 === t.indexOf('#') && (t = t.substr(1)),
        (t = n(t)),
        !!c.hexNames.hasOwnProperty(t) && c.hexNames[t]
      )
    }),
    (c.RGBtoNAME = function (e, t) {
      var a = c.hasNAME(e)
      return a || (void 0 === t && (t = c.defaults.nameDegradation), d[t.toUpperCase()].to(e))
    }),
    (c.matchString = function (e) {
      if ('string' == typeof e) {
        e = a.trim(e)
        var t = null
        for (var r in d) if (null != (t = d[r].match.exec(e)) && d[r].parse(t)) return !0
      }
      return !1
    }),
    (c.defaults = {
      format: !1,
      shortenHex: !1,
      hexUseName: !1,
      reduceAlpha: !1,
      alphaConvert: { RGB: 'RGBA', HSL: 'HSLA', HEX: 'RGBA', NAME: 'RGBA' },
      nameDegradation: 'HEX',
      invalidValue: '',
      zeroAlphaAsTransparent: !0
    }),
    (c.names = {
      aliceblue: 'f0f8ff',
      antiquewhite: 'faebd7',
      aqua: '0ff',
      aquamarine: '7fffd4',
      azure: 'f0ffff',
      beige: 'f5f5dc',
      bisque: 'ffe4c4',
      black: '000',
      blanchedalmond: 'ffebcd',
      blue: '00f',
      blueviolet: '8a2be2',
      brown: 'a52a2a',
      burlywood: 'deb887',
      burntsienna: 'ea7e5d',
      cadetblue: '5f9ea0',
      chartreuse: '7fff00',
      chocolate: 'd2691e',
      coral: 'ff7f50',
      cornflowerblue: '6495ed',
      cornsilk: 'fff8dc',
      crimson: 'dc143c',
      cyan: '0ff',
      darkblue: '00008b',
      darkcyan: '008b8b',
      darkgoldenrod: 'b8860b',
      darkgray: 'a9a9a9',
      darkgreen: '006400',
      darkgrey: 'a9a9a9',
      darkkhaki: 'bdb76b',
      darkmagenta: '8b008b',
      darkolivegreen: '556b2f',
      darkorange: 'ff8c00',
      darkorchid: '9932cc',
      darkred: '8b0000',
      darksalmon: 'e9967a',
      darkseagreen: '8fbc8f',
      darkslateblue: '483d8b',
      darkslategray: '2f4f4f',
      darkslategrey: '2f4f4f',
      darkturquoise: '00ced1',
      darkviolet: '9400d3',
      deeppink: 'ff1493',
      deepskyblue: '00bfff',
      dimgray: '696969',
      dimgrey: '696969',
      dodgerblue: '1e90ff',
      firebrick: 'b22222',
      floralwhite: 'fffaf0',
      forestgreen: '228b22',
      fuchsia: 'f0f',
      gainsboro: 'dcdcdc',
      ghostwhite: 'f8f8ff',
      gold: 'ffd700',
      goldenrod: 'daa520',
      gray: '808080',
      green: '008000',
      greenyellow: 'adff2f',
      grey: '808080',
      honeydew: 'f0fff0',
      hotpink: 'ff69b4',
      indianred: 'cd5c5c',
      indigo: '4b0082',
      ivory: 'fffff0',
      khaki: 'f0e68c',
      lavender: 'e6e6fa',
      lavenderblush: 'fff0f5',
      lawngreen: '7cfc00',
      lemonchiffon: 'fffacd',
      lightblue: 'add8e6',
      lightcoral: 'f08080',
      lightcyan: 'e0ffff',
      lightgoldenrodyellow: 'fafad2',
      lightgray: 'd3d3d3',
      lightgreen: '90ee90',
      lightgrey: 'd3d3d3',
      lightpink: 'ffb6c1',
      lightsalmon: 'ffa07a',
      lightseagreen: '20b2aa',
      lightskyblue: '87cefa',
      lightslategray: '789',
      lightslategrey: '789',
      lightsteelblue: 'b0c4de',
      lightyellow: 'ffffe0',
      lime: '0f0',
      limegreen: '32cd32',
      linen: 'faf0e6',
      magenta: 'f0f',
      maroon: '800000',
      mediumaquamarine: '66cdaa',
      mediumblue: '0000cd',
      mediumorchid: 'ba55d3',
      mediumpurple: '9370db',
      mediumseagreen: '3cb371',
      mediumslateblue: '7b68ee',
      mediumspringgreen: '00fa9a',
      mediumturquoise: '48d1cc',
      mediumvioletred: 'c71585',
      midnightblue: '191970',
      mintcream: 'f5fffa',
      mistyrose: 'ffe4e1',
      moccasin: 'ffe4b5',
      navajowhite: 'ffdead',
      navy: '000080',
      oldlace: 'fdf5e6',
      olive: '808000',
      olivedrab: '6b8e23',
      orange: 'ffa500',
      orangered: 'ff4500',
      orchid: 'da70d6',
      palegoldenrod: 'eee8aa',
      palegreen: '98fb98',
      paleturquoise: 'afeeee',
      palevioletred: 'db7093',
      papayawhip: 'ffefd5',
      peachpuff: 'ffdab9',
      peru: 'cd853f',
      pink: 'ffc0cb',
      plum: 'dda0dd',
      powderblue: 'b0e0e6',
      purple: '800080',
      red: 'f00',
      rosybrown: 'bc8f8f',
      royalblue: '4169e1',
      saddlebrown: '8b4513',
      salmon: 'fa8072',
      sandybrown: 'f4a460',
      seagreen: '2e8b57',
      seashell: 'fff5ee',
      sienna: 'a0522d',
      silver: 'c0c0c0',
      skyblue: '87ceeb',
      slateblue: '6a5acd',
      slategray: '708090',
      slategrey: '708090',
      snow: 'fffafa',
      springgreen: '00ff7f',
      steelblue: '4682b4',
      tan: 'd2b48c',
      teal: '008080',
      thistle: 'd8bfd8',
      tomato: 'ff6347',
      turquoise: '40e0d0',
      violet: 'ee82ee',
      wheat: 'f5deb3',
      white: 'fff',
      whitesmoke: 'f5f5f5',
      yellow: 'ff0',
      yellowgreen: '9acd32'
    }),
    (c.hexNames = (function (e) {
      var t = {}
      for (var a in e) e.hasOwnProperty(a) && (t[e[a]] = a)
      return t
    })(c.names))
})(window, document, jQuery)
