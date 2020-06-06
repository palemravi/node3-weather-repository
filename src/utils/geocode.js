const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGFsZW1yYXZpIiwiYSI6ImNrYWh1a2wwaDA5ZmUycXFmczRvYXk2cDkifQ.Vx8z8Tg7yJwJyhfRUu-bSg'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to reach Internet!', undefined)
        } else if (!body.features[0]) {
            callback('Enter valid location ', undefined)
        } else {
            
            console.log(url)

            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                Place : body.features[0].place_name
                })
    }
    })
}
module.exports=geocode