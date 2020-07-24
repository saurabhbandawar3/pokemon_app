const { describe } = require("joi")
const assert = require('assert');
const Pokemon = require('../models/pokemonModel');

let poke;
beforeEach(() => {
    poke = new Pokemon({ name: 'poke' });
    poke.save()
        .then(() => done());
});

test('get pokemon types', () => {
    Pokemon.find().distinct().then(poke_types => {
        expect(poke_types).not.toBeNull();
        expect(poke_types[0].toContain('Bug'));
        expect(poke_types[0].toContain('Grass'));
        expect(poke_types.length).toBe(17)
    });
});

test('get pokemon by name', () => {
    Pokemon.find({ name: 'Bulbasaur' }, (pokemon) => {
        expect(pokemon).not.toBeNull();
        expect(pokemon[0]['types']).toContain('Grass');
        expect(pokemon[0]['resistant']).toContain('Water')
    });
});


test('get pokemon by Id', () => {
    Pokemon.findById('5f09e867e617d52a599d03d6', (pokemon) => {
        expect(pokemon).not.toBeNull();
        expect(pokemon[0]['name']).toBe('Bulbasaur');
        expect(pokemon[0]['types']).toContain('Grass');
        expect(pokemon[0]['resistant']).toContain('Water')
    });
});

test('get pokemon by Id', () => {
    Pokemon.findOneAndUpdate({ _id: '5f09e867e617d52a599d03d6' }, { "isfavorite": true }, (pokemon) => {
        expect(pokemon).not.toBeNull();
        expect(pokemon[0]['name']).toBe('Bulbasaur');
        expect(pokemon[0]['isfavorite']).toBe(true);
        expect(pokemon[0]['types']).toContain('Grass');
        expect(pokemon[0]['resistant']).toContain('Water')
    });
});

test('filter pokemons by types, name, isfavorite', () => {
    Pokemon.find({
        $or: [
            { types: { $in: ['Grass'] } },
            { name: 'Bulbasaur' },
            { isfavorite: true },
        ],
    }, (pokemon) => {
        expect(pokemon).not.toBeNull();
        expect(pokemon[0]['name']).toBe('Bulbasaur');
        expect(pokemon[0]['isfavorite']).toBe(true);
        expect(pokemon[0]['types']).toContain('Grass');
        expect(pokemon[0]['resistant']).toContain('Water')
        expect(pokemon.length).toBe(1)
    })
        .skip(0)
        .limit(1)
        .sort({ name: 1 });
});
