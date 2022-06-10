import {useEffect, useRef, useState} from 'react';
import {pokemonapi} from '../api/pokeapiApi';
import { PokemonResponse, PokemonResults, SimplePokemon} from '../interfaces/pkminterfaces';

export const usePokemonPaginated = () => {
    const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState<SimplePokemon[]>([]);

  const nextPage = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  const loadPokemons = async () => {
      setIsLoading(true);
    const resp = await pokemonapi.get<PokemonResponse>(nextPage.current);
    nextPage.current = resp.data.next;
    mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokemons:PokemonResults[]) =>{
      const newPokemonList: SimplePokemon[] = pokemons.map(({name,url})=>{

        const urlParts = url.split('/');
        const id = urlParts[urlParts.length-2];
        const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        
        return{id,picture,name}
      });

      setPokemonList([...pokemonList, ...newPokemonList]);
      setIsLoading(false);
    
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
        isLoading,
        pokemonList,
        loadPokemons
  };
};
