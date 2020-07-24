const pokemons = require('./routes/pokemon')

const express = require('express');
const app = express();

var mongoose = require('mongoose');

const db_url = 'mongodb+srv://poke_db:password123456@cluster0.rxgwu.mongodb.net/poke_db?retryWrites=true&w=majority';

mongoose.connect(
    db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', pokemons);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));