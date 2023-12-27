/*
 Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
;(function () {
  var g = /"/g
  CKEDITOR.plugins.add('autolink', {
    requires: 'clipboard,textmatch',
    init: function (c) {
      function f(a) {
        a = { text: a, link: a.replace(g, '%22') }
        a = a.link.match(CKEDITOR.config.autolink_urlRegex) ? h.output(a) : k.output(a)
        if (c.plugins.link) {
          a = CKEDITOR.dom.element.createFromHtml(a)
          var b = CKEDITOR.plugins.link.parseLinkAttributes(c, a),
            b = CKEDITOR.plugins.link.getLinkAttributes(c, b)
          CKEDITOR.tools.isEmpty(b.set) || a.setAttributes(b.set)
          b.removed.length && a.removeAttributes(b.removed)
          a.removeAttribute('data-cke-saved-href')
          a = a.getOuterHtml()
        }
        return a
      }
      function l(a, b) {
        var c = a.slice(0, b).split(/\s+/)
        return (c = c[c.length - 1]) && e(c) ? { start: a.lastIndexOf(c), end: b } : null
      }
      function e(a) {
        return (
          a.match(CKEDITOR.config.autolink_urlRegex) || a.match(CKEDITOR.config.autolink_emailRegex)
        )
      }
      var h = new CKEDITOR.template('\x3ca href\x3d"{link}"\x3e{text}\x3c/a\x3e'),
        k = new CKEDITOR.template('\x3ca href\x3d"mailto:{link}"\x3e{text}\x3c/a\x3e')
      c.on('paste', function (a) {
        if (a.data.dataTransfer.getTransferType(c) != CKEDITOR.DATA_TRANSFER_INTERNAL) {
          var b = a.data.dataValue
          ;-1 < b.indexOf('\x3c') || !e(b) || ((a.data.dataValue = f(b)), (a.data.type = 'html'))
        }
      })
      if (!CKEDITOR.env.ie || CKEDITOR.env.edge)
        c.on('contentDom', function () {
          var a = c.config.autolink_commitKeystrokes || CKEDITOR.config.autolink_commitKeystrokes
          c.on('key', function (b) {
            if (-1 != CKEDITOR.tools.indexOf(a, b.data.keyCode)) {
              var d = CKEDITOR.plugins.textMatch.match(c.getSelection().getRanges()[0], l)
              if (
                d &&
                ((b = c.getSelection()),
                !b.getRanges()[0].startContainer.getAscendant('a', !0) &&
                  (b.selectRanges([d.range]),
                  c.insertHtml(f(d.text), 'text'),
                  !CKEDITOR.env.webkit))
              ) {
                var d = b.getRanges()[0],
                  e = c.createRange()
                e.setStartAfter(d.startContainer)
                b.selectRanges([e])
              }
            }
          })
        })
    }
  })
  CKEDITOR.config.autolink_commitKeystrokes = [13, 32]
  CKEDITOR.config.autolink_urlRegex =
    /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#]+\.?)+(\/[^\s]*)?[^\s\.,]$/i
  CKEDITOR.config.autolink_emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
})()
