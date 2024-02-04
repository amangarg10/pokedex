import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css';

const PokemonDetail = () => {
    let { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            setPokemon(data);
        };

        if (id) {
            fetchPokemon();
        }
    }, [id]);

    if (!pokemon) return <div className="pokemon-list-container">{id ? 'Loading...' : 'No Pokemon ID provided'}</div>;

    return (
        <div className="pokemon-list-container">
            <h1 className="pokemon-list-title">{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
            <h2 className="pokemon-list-title">Abilities</h2>
            <ul className="pokemon-list">
                {pokemon.abilities.map((ability, index) => (
                    <li key={index} className="pokemon-list-item">
                        {ability.ability.name}
                    </li>
                ))}
            </ul>
            <h2 className="pokemon-list-title">Stats</h2>
            <ul className="pokemon-list">
                {pokemon.stats.map((stat, index) => (
                    <li key={index} className="pokemon-list-item">
                        {stat.stat.name}: {stat.base_stat}
                    </li>
                ))}
            </ul>
            <Link to="/" className="pokemon-link">Back</Link>
        </div>
    );
};

export default PokemonDetail;
