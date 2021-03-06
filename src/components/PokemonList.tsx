import React, { useMemo, useCallback } from 'react';
import { FetchedPokemonInterface } from '../interfaces';
import { useGlobalContext } from '../store';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import ErrorMessage from './ErrorMessage';

export default function PokemonList(): JSX.Element {
	const { pokemon, changePage, prevPage, nextPage, searchedPokemon, failedFetch, searchPokemon } = useGlobalContext();

	const memoizedGrid = useMemo(
		() => {
			return (
				<div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
					{searchedPokemon ? (
						<PokemonCard url={`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`} />
					) : (
						pokemon.map((p: FetchedPokemonInterface) => <PokemonCard key={p.name} url={p.url} />)
					)}
				</div>
			);
		},
		[ searchedPokemon, pokemon ]
	);

	const logoReset = useCallback(
		() => {
			searchPokemon('');
		},
		[ searchPokemon ]
	);

	const changePageHandler = (dir: string) => {
		changePage(dir);
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	};

	return (
		<div className="px-4 lg:px-48 py-8 lg:py-12">
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
				<button onClick={() => logoReset()} className="text-left">
					<h1 className="font-bold text-5xl">
						P<span className="text-red-600">o</span>kemayne
					</h1>
				</button>
				<SearchBar />
			</div>
			{failedFetch ? <ErrorMessage /> : memoizedGrid}
			{!searchedPokemon && (
				<div className="mt-4 flex flex-row justify-between">
					<button
						type="button"
						onClick={() => changePageHandler('prev')}
						className="p-4 sm:p-6 bg-gray-300 rounded-lg text-2xl font-bold hover:bg-gray-400 disabled:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed"
						disabled={prevPage ? false : true}
					>
						Previous page
					</button>
					<button
						type="button"
						onClick={() => changePageHandler('next')}
						className="p-4 sm:p-6 bg-gray-300 rounded-lg text-2xl font-bold hover:bg-gray-400 disabled:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed"
						disabled={nextPage ? false : true}
					>
						Next page
					</button>
				</div>
			)}
		</div>
	);
}
