const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Pokemon = require('../models/pokemonModel');

//Get pokemon list
router.get('/pokemons', async (req, res) => {
    await Pokemon.find({}, (err, pokemons) => {
        if (err)
            res.send(err);
        res.send(pokemons);
    });

});

//Query a pokemon by id
router.get('/pokemons/:id', (req, res) => {
    Pokemon.findById(req.params.id, (err, pokemon) => {
        if (err) return res.status(404).send('the pokemon with given id was not found.');
        res.send(pokemon);
    });
});

//Query a pokemon by name
router.get('/pokemon/:name', (req, res) => {
    Pokemon.find({ name: req.params.name }, (err, pokemon) => {
        if (err) return res.status(404).send('the pokemon with given name was not found.');
        res.send(pokemon);
    });
});

//Query list of pokemon types
router.get('/pokemon-types', (req, res) => {
    Pokemon.find().distinct('types', (err, pokemon) => {
        if (err) return res.status(404);
        res.send(pokemon);
    });
});

//Filter by Search by name,pokemon type,favorite and pagination(limit,skip)
router.get('/pokemon-fliter', (req, res) => {
    let typeStr = req.query.type;
    let typesArr = typeStr == undefined ? null : typeStr.split(',');

    let records_limit = parseInt(req.query.limit);
    let records_skip = parseInt(req.query.skip);

    Pokemon
        .find({
            $or: [
                { types: { $in: typesArr } },
                { name: req.query.name },
                { isfavorite: req.query.isfavorite },
            ],
        }, (err, pokemon) => {
            if (err) return res.status(404).send('the pokemon with applied filter was not found.');
            res.send(pokemon);
        })
        .skip(records_skip)
        .limit(records_limit)
        .sort({ id: 1 });
});

//Mutation to mark/unmark pokemon as favorite
router.put('/pokemons/:id', (req, res) => {
    Pokemon.findOneAndUpdate({ _id: req.params.id }, req.body, (err, pokemon) => {
        if (err) return res.status(400).send(result.error.details[0].message);
        res.send(pokemon);
    });
})

module.exports = router;