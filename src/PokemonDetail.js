import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css';

const PokemonDetail = () => {
    let { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon data');
                }
                const data = await response.json();
                setPokemon(data);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        const fetchPokemonSpecies = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon species data');
                }
                const data = await response.json();
                setDescription(data.flavor_text_entries[0].flavor_text);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokémon species data:', error);
            }
        };

        if (id) {
            fetchPokemon();
            fetchPokemonSpecies();
        }
    }, [id]);

    if (loading) return <div className="pokemon-list-container">Loading...</div>;
    if (!pokemon) return <div className="pokemon-list-container">No Pokemon ID provided</div>;

    return (
        <div className="pokemon-list-container">
            <h1 className="pokemon-list-title">{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
            <h2 className="pokemon-section-title">Abilities</h2>
            <ul className="pokemon-list">
                {pokemon.abilities.map((ability, index) => (
                    <li key={index} className="pokemon-list-item">
                        {ability.ability.name}
                    </li>
                ))}
            </ul>
            <h2 className="pokemon-section-title">Stats</h2>
            <ul className="pokemon-list">
                {pokemon.stats.map((stat, index) => (
                    <li key={index} className="pokemon-list-item">
                        {stat.stat.name}: {stat.base_stat}
                    </li>
                ))}
            </ul>
            <h2 className="pokemon-section-title">Description</h2>
            <p className="pokemon-description">{description}</p>
            <Link to="/" className="pokemon-link">Back</Link>
        </div>
    );
};

export default PokemonDetail;
