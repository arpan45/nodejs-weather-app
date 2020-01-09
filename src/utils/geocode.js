const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXJwYW5hZGhpa2FyaSIsImEiOiJjazRzNTB2eGowMWYwM2ZvdzNobG80OWg2In0.o7n0FI1ZsaMvq576DyotpA&limit=1&'
        request({url,json: true},(error,{body})=>{
            if(error){
                callback({error:'unable to fetch location.check internet connection'},undefined)
            }
            else if(body.features.length === 0){
                callback({error:'Invalid Location'},undefined)
            }
            else{
                callback(undefined,{
                    latitude:body.features[0].center[1],
                    longitude:body.features[0].center[0],
                    location:body.features[0].place_name
    
                })
            }
        })
    
    }
    module.exports= geocode