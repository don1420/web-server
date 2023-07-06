const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=99bd0f3f0e3888763eb1bf3a937ce609&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`

    request({url, json: true}, function (error, response, body) {
        if (error) {
            callback('Unable to connect to Weatherstack API', undefined)
          } else if (body.error) {
            callback('Unable to find location', undefined)
          } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weather_descriptions: body.current. weather_descriptions[0]
            })
          }
    })
}

module.exports = forecast