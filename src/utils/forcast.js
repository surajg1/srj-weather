const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/01fef66c0f56179092b635bbadf67dc6/' + latitude + ',' + longitude;

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback("Soory some forcasting the Location", undefined);
        } else if (response.body.error) {
            callback("Unable to find Location", undefined);
        } else {
            callback(undefined, {
                // callback(latitude, longitude)
                summary: response.body.daily.data[0].summary,
                temp: response.body.currently.temperature,
                RP: response.body.currently.precipProbability

            })
        }

    })

}


module.exports = forcast