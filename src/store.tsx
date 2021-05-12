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
	const [ prevPage, setPrevPage ] = useState<string>('');
	const [ nextPage, setNextPage ] = useState<string>('');

	useEffect(() => {
		getPokemon('https://pokeapi.co/api/v2/pokemon/');
	}, []);

	const getPokemon = async (url: string) => {
		try {
			const fetchResult = await getJSON(url); // not typed yet, needs to be looked into
			setPokemon(fetchResult.results);
			setPrevPage(fetchResult.previous);
			setNextPage(fetchResult.next);
		} catch (err) {
			console.error(err);
		}
	};

	// add an event listener that checks when all images loaded and only show the page after the pokemon are ready
	const changePage = async (direction: string) => {
		try {
			if (!direction) return;
			if (direction === 'prev') {
				prevPage && getPokemon(prevPage);
			}
			if (direction === 'next') {
				nextPage && getPokemon(nextPage);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return <AppContext.Provider value={{ pokemon, changePage, prevPage, nextPage }}>{children}</AppContext.Provider>;
}

export const useGlobalContext = () => {
	return useContext(AppContext);
};
