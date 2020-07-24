const mongoose = require('mongoose');
const Joi = require('joi');

const PokemonSchema = mongoose.Schema({
    id: String,
    name: String,
    classification: String,
    fleeRate: String,
    maxCP: Number,
    maxHP: Number,
    types: [String],
    resistant: [String],
    weaknesses: [String],
    evolutions: [{
        id: Number,
        name: Number
    }],
    weight: {
        minimum: String,
        maximum: String
    },
    height: {
        minimum: String,
        maximum: String
    },
    attacks: {
        fast: [{
            name: String,
            type: String,
            damage: String
        }],
        special: [{
            name: String,
            type: String,
            damage: String
        }],
    },
    evolutionRequirements: {
        amount: Number,
        name: String
    },
    isfavorite: Boolean,
}, { collection: 'pokemon_data' });

const Pokemon = mongoose.model('pokemon_data',PokemonSchema);
module.exports = Pokemon;