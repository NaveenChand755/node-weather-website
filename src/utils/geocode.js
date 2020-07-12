const request = require('request')
const geocode = (address , callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmF2ZWVuY2hhbmQiLCJhIjoiY2tjaDZ4M2pqMHo4aDJybm5sdTEzYXgxcSJ9.M3z-De4vw4Zh00N664uztg&limit=1'
    request({url:url, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location service', undefined)
        }else if(body.features.length === 0 ){
            callback('unable to find location Please Try Again', undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode