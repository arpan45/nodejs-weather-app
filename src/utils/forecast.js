const request=require('request')



const forecast=(lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/da5e592be7ef96ef902d3034b3e71bfa/'+lat+','+long+'?units=si'
    request({url,json : true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the weather service!',undefined)
        }
        else if(body.error){
            callback('Unable to fetch location.Missing arguments',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary +'It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% chance of rain')
        }
    })
}

module.exports=forecast