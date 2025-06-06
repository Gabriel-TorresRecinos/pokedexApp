'use client';
import { Josefin_Slab } from "next/font/google";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Pokemons() {
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams(); // Corrected way to get dynamic route params
    const offset = 0; // Define offset
    const limit = 20; // Define limit

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then((response) => response.json())  // Corrected `.json()` usage
            .then((json) => {
                setIsLoading(false);
                setPokemon(json);
            })
            .catch((error) => console.error("Error fetching Pokémon:", error)); // Handle errors
    }, []);

    return <p>Pokémon ID: {id}</p>;
}
