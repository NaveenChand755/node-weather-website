const request = require('request')
const forecast = (latitude, longitude , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=df953613d6f28d377282fbfbbbf8f316&query='+ latitude +','+ longitude +'&units=f'
    request({url:url,json:true}, (error,{body} )=>{
        if(error){
            callback('unable to connect to weather service',undefined)
        }else if(body.error){
            callback('unable to find location please try again',undefined)
        }
        else{
            callback(undefined,  'It is currently ' + body.current.temperature + 'degrees out. It feels like ' + body.current.feelslike + 'degrees out ' )
        }
        
    })
}

module.exports = forecast
