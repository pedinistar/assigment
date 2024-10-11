import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        setPokemons(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setIsLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full p-4 pl-12 bg-zinc-800 border-2 border-purple-500 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-all duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredPokemons.map((pokemon) => (
            <motion.div
              key={pokemon.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold capitalize mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">
                {pokemon.name}
              </h3>
              <div className="relative">
                <div className="absolute opacity-75 blur rounded-full"></div>
                <img
                  src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
                  alt={pokemon.name}
                  className="relative z-10 mx-auto mb-4 transform hover:scale-110 transition-transform duration-300"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
