const express = require('express')
const { mongo, default: mongoose } = require('mongoose')
const pocketmonsters = require('./Models/pocketmonsters')
const app = express()
const PORT = 3000
const pokemon = require("./Models/pokemon")
require('dotenv').config()
console.log(process.env.MONGODB_URI)



app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.set('view engine', 'ejs')
app.set('views','./Views')

app.get('/', (req, res)=> {
    console.log(req);
    res.send('Welcome to the Pokemon App!')
})

app.get('/pokemon', async (req, res) => {
    try{
    const pokemons = await pocketmonsters.find()

    res.render('Index', {
        pageTitle: 'Pokemon',
        pageHeader: 'See All the Pokemon',
        pokemon: pokemons,
    })
    } catch (error) {
        console.log(error)
    }
});

app.get('/pokemon/new', (req, res) => {
    res.render('New', {
        pageTitle: 'Create',
        pageHeader: 'Create a new pokemon'
    })
});

app.post('/pokemon', async (req, res) => {
    const newPokemon = req.body
    newPokemon.img = `http://img.pokemondb.net/artwork/${req.body.name}`
    console.log(newPokemon)
    await pocketmonsters.create(newPokemon, (err, result) =>{
        if(err){
            console.log(err)
        }
        console.log(result);
    })
})

app.get('/pokemon/:id', async (req, res) => {
   try{
    console.log(req.params.id)
    const getPokemon = await pocketmonsters.findById(req.params.id)
    console.log('Pokemon Found!', getPokemon)
    

    res.render('Show', {
        pageTitle: 'PokeDex',
        pageHeader: " Gotta Catch 'Em All ",
        pokemon: getPokemon,
    });
} catch (error){
    console.log(error)
}

})


app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
    mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB is connected')
})