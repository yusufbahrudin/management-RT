!(function (t) {
  var e, i
  ;(e = 'Dhaka'),
    (i = ''),
    t.simpleWeather({
      location: e,
      woeid: i,
      unit: 'f',
      success: function (e) {
        ;(text =
          '<i class="wi wi-yahoo-' +
          e.code +
          '"></i><h2> ' +
          e.temp +
          '&deg;' +
          e.units.temp +
          '</h2>'),
          (text += '<div class="city">' + e.city + ', ' + e.region + '</div>'),
          (text += '<div class="currently">' + e.currently + '</div>'),
          (text += '<div class="celcious">' + e.alt.temp + '&deg;C</div>'),
          t('#weather-one').html(text)
      },
      error: function (e) {
        t('#weather-one').html('<p>' + e + '</p>')
      }
    })
})(jQuery)
