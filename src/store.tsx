import React, { useContext, useState, useEffect, useCallback, ReactElement, ReactChild } from 'react';
import { FetchedPokemonInterface } from './interfaces';

export const AppContext = React.createContext<any>(null); // type any is temporary until I make the correct interface

export function AppProvider({ children }: { children: ReactChild }): ReactElement {
	const [ pokemon, setPokemon ] = useState<FetchedPokemonInterface[]>([]);
	const [ prevPage, setPrevPage ] = useState<string>('');
	const [ nextPage, setNextPage ] = useState<string>('');
	const [ searchedPokemon, setSearchedPokemon ] = useState<string | undefined>(undefined);
	const [ failedFetch, setFailedFetch ] = useState<boolean>(false);

	const getPokemon = useCallback(async (url: string) => {
		try {
			const fetchResult = await getJSON(url); // not typed yet, needs to be looked into
			setPokemon(fetchResult.results);
			setPrevPage(fetchResult.previous);
			setNextPage(fetchResult.next);
		} catch (err) {
			console.error(err);
		}
	}, []);

	useEffect(
		() => {
			getPokemon('https://pokeapi.co/api/v2/pokemon/');
		},
		[ getPokemon ]
	);

	const getJSON = async (url: string) => {
		setFailedFetch(false);
		const res = await fetch(url);
		if (!res.ok) {
			setFailedFetch(true);
			return;
		}
		const data = await res.json();
		return data;
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

	const searchPokemon = async (pokemon: string) => {
		setFailedFetch(false);
		if (pokemon === '') {
			getPokemon('https://pokeapi.co/api/v2/pokemon/');
			setSearchedPokemon('');
			return;
		}
		setSearchedPokemon(pokemon);
	};

	return (
		<AppContext.Provider
			value={{ getJSON, failedFetch, pokemon, changePage, prevPage, nextPage, searchPokemon, searchedPokemon }}
		>
			{children}
		</AppContext.Provider>
	);
}

export const useGlobalContext = (): any => {
	return useContext(AppContext);
};
