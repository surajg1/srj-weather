const request = require('request');


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3VyYWpnaG9sYXA0MzIxIiwiYSI6ImNqejNvYTh5YjA1N3gzZXBiNjh3djBheTUifQ.L4TocCDX4EtrdGJxUX9qoA'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to read the get Geo code for resones!', undefined);
        } else if (response.body.features.lenght === 0) {
            callback('Unable to find location. Try another search.', undefined);

        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode