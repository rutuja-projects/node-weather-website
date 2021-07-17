const request = require('request')

const forcast = (latitude, longitude, callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=879de601ce7831d903cd31b6a2f169f7&query=' + latitude + ',' + longitude + '&units=m'
     
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('unable to connect to weatherstack services', undefined)
        } else if(response.body.error){
            callback('unable to find the correct location!!', undefined)
        } else{
            callback(undefined,  'It is ' + response.body.current.weather_descriptions[0] + ' .It is currently '+ response.body.current.temperature + ' degree out and it feels like ' + response.body.current.feelslike + ' degree out!! '
            )
        }
    })
}

module.exports = forcast