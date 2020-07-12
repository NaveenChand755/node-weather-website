const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();


//defines path for express  cpnfig
const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname,'../templates/views')

const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlerbars and views location 
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : ' Weather',
        name : 'Naveen'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Naveen chand'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help : 'whats your question?',
        title: 'Help',
        name : 'Naveen chand'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'you must provide an address'
        })
    }

    geocode(req.query.address,(error , {latitude, longitude , location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forcastData)=>{
            if(error){
                   return res.send({error})
            }
            res.send({
                forecast : forcastData,
                location,
                address : req.query.address
            })
        })
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        errorMessage : 'Help article not found',
        name : 'naveen'
    })

})
app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'naveen',
        errorMessage : 'Page not found'
    })
})

app.listen(3000,()=>{
    console.log("listening on port 3000")
})