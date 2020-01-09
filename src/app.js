const path=require('path')
const express= require('express')
const hbs= require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app =  express()
const port = process.env.PORT || 3000


//Define paths for express config 
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handler and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Arpan Adhikari'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Arpan Adhikari'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        body: 'For any help contact no body!',
        name: 'Arpan Adhikari'
    })
})

// app.get('',(req,res)=>{
//     res.send('Hello Express!')
// })
// app.get('/help',(req,res)=>{
//     res.send('Help Page!')
// })

// app.get('/about',(req,res)=>{
//     res.send('About Page')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
    return  res.send({
        error: 'Provide an address'
        
    })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send(error)
        }
    
    
    forecast(latitude,longitude, (error, forecastData) => {
        if(error)
        {
           return res.send(error)
        }
       
        res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address
        })
      })
    })
    
})

app.get('*',(req,res)=>{
    res.send('404 Page Not Found')
})
app.listen(port,()=>{
    console.log('server is up and running on'+port)
})