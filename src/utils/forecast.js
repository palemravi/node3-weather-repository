const request=require('postman-request')

const forecast = (longitute,latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0d148b6c1b5ffb888f63c4e86809df5c&query='+encodeURIComponent(longitute)+','+encodeURIComponent(latitude)+'&units=m'
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            console.log(url)
            callback('Unable to reach Internet!', undefined)
        } else if (body.error) {
            console.log(url)
            callback(body.error.info, undefined)
        } else {
            console.log(url)
            callback(undefined, 
                'In ' + body.location.name+' Its currently '+body.current.weather_descriptions[0]+' It is currently'+ body.current.temperature+ ' and it feels like ' +body.current.feelslike+' Humidity is '+body.current.humidity + '. Observed at '+ body.current.observation_time+ '.'
                )
    }
})
}
module.exports=forecast