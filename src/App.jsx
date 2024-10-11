import React, { useEffect } from "react";
import "./index.css"; // Ensure Tailwind is included
import PokemonList from "./components/PokemonList";
import { motion } from "framer-motion";

export default function App() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl text-center font-bold mb-8"
        >
          Pokémon World
        </motion.h1>
        <PokemonList />
      </div>
    </div>
  );
}
