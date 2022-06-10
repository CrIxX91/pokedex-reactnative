import { useEffect, useState } from "react"
import { pokemonapi } from "../api/pokeapiApi";
import { PokemonFull } from "../interfaces/pkminterfaces";

export const  usePokemon = (id:string)=>{
    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState<PokemonFull>({}as PokemonFull);

    const loadPokemon = async() => {
        const resp = await pokemonapi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon(resp.data);
        setIsLoading(false);
    }

     useEffect(() => {
       loadPokemon();
     }, [])
     
    return{
        isLoading,
        pokemon
    }

}