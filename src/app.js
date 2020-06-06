const path=require('path')
const express= require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app= express()
const port=process.env.PORT || 3000

console.log(__dirname)
console.log(path.join(__dirname,'../public'))
//define  paths for Express COnfig
const viewPath=path.join(__dirname,'../templates/views')
const patrialsPath=path.join(__dirname,'../templates/partials')
console.log(viewPath)


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(patrialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
res.render('index',{
    title:'Weather App',
    Name:'Palem Ravi Kiran '
})
})

app.get('/help',(req,res)=>{ 
    res.render('help',{
        helpMsg:'Please contact ravikiran4290@gmail.com for futher details',
        title:'Help',
        Name:'Palem Ravi'
        
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        Name:'Palem Ravi'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'You must provide Address '
        })
    }
        
    geocode(req.query.address , (error,{latitude,longitude,Place}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude ,(error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                Place,
                address:req.query.address  
            })
        })
    })
    // res.send({
    //     "forecast":{
    //         "Temperature":28,
    //         "Feels Like":30,
    //         "Rain %":30

    //     },
    //     "Location":req.query.address                    
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    return res.send({
        error :'You must provide a serach value'
    })
    console.log(req.query)
    res.send({
        Products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        Name:'Palem Ravi Kiran',
        title:'404',
        errorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        Name:'Palem Ravi Kiran',
        title:'404',
        errorMessage:' Page not found'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port  ' ,port)
})
