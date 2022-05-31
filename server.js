const express = require('express')
const app = express()
const PORT = 3000
const pokemon = require("./Models/pokemon")

app.set('view engine', 'ejs')
app.set('views','./Views')

app.get('/', (req, res)=> {
    console.log(req);
    res.send('Welcome to the Pokemon App!')
})

app.get('/pokemon',(req, res) => {
    res.render('Index', {data: pokemon})
})

app.get('/pokemon/:id',(req, res) => {
    res.send(req.params.id)
})

app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`)
})