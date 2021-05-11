import React, { useContext, useState, useEffect, ReactElement, ReactChild } from 'react';
import { FetchedPokemonInterface } from './interfaces';

export const AppContext = React.createContext<any>(null); // type any is temporary until I make the correct interface

export const getJSON = async (url: string) => {
	const res = await fetch(url);
	const data = await res.json();
	return data;
};

export function AppProvider({ children }: { children: ReactChild }): ReactElement {
	const [ pokemon, setPokemon ] = useState<FetchedPokemonInterface[]>([]);

	useEffect(() => {
		// add pagination with another useState() and a string argument in this function call
		getPokemon();
	}, []);
	// see comment above
	const getPokemon = async () => {
		try {
			const fetchResult = await getJSON('https://pokeapi.co/api/v2/pokemon/'); // not typed yet, needs to be looked into
			setPokemon(fetchResult.results);
		} catch (err) {
			console.error(err);
		}
	};

	return <AppContext.Provider value={{ pokemon }}>{children}</AppContext.Provider>;
}

export const useGlobalContext = () => {
	return useContext(AppContext);
};
