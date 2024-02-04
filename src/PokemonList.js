import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon list');
                }
                const data = await response.json();
                setPokemonList(data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokémon list:', error);
            }
        };
        fetchPokemonList();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPokemon = pokemonList.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="pokemon-list-container">
            <h1 className="pokemon-list-title">Pokemon List</h1>
            <input
                type="text"
                placeholder="Search Pokémon..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pokemon-search-input"
            />
            {loading ? (
                <p className="loading-message">Loading...</p>
            ) : (
                <ul className="pokemon-list">
                    {filteredPokemon.map((pokemon, index) => (
                        <li key={pokemon.name} className="pokemon-list-item">
                            <Link to={`/pokemon/${pokemon.name}`} className="pokemon-link">{pokemon.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PokemonList;
